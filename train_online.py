#!/usr/bin/env python3
"""Train wind prediction model from real forecast→actual pairs.

Uses scraped data where each record has:
  - current readings (actual wind at scrape time)
  - hourly forecasts from Skistar
  - forecasts from MET, SMHI, AI at scrape time

For each scrape at time T, we pair the forecasts for hour H
with the actual reading from a later scrape closest to hour H.

This produces real MOS (Model Output Statistics) training pairs:
  input: what the forecast said + current conditions
  target: what actually happened
"""

import json
import math
import os
import sys
import shutil
from collections import defaultdict
from datetime import datetime, timezone
from pathlib import Path

import lightgbm as lgb
import numpy as np

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "function_app"))
from ml.features import FEATURE_COLS, cyclical

MODEL_DIR = Path(__file__).parent / "model"
BLOB_DATA = Path("/tmp/blob-data.jsonl")
JSONL_DATA = Path("/tmp/training-pairs.jsonl")


def load_blob_records(path: Path) -> list[dict]:
    """Load scraped forecast records from blob JSONL."""
    records = []
    if not path.exists():
        return records
    for line in path.read_text().strip().split("\n"):
        if not line.strip():
            continue
        try:
            records.append(json.loads(line))
        except json.JSONDecodeError:
            continue
    print(f"Loaded {len(records)} blob records")
    return records


def load_jsonl_pairs(path: Path) -> list[dict]:
    """Load training pair records (actual + forecasts at same time)."""
    records = []
    if not path.exists():
        return records
    for line in path.read_text().strip().split("\n"):
        if not line.strip():
            continue
        try:
            records.append(json.loads(line))
        except json.JSONDecodeError:
            continue
    print(f"Loaded {len(records)} JSONL pairs")
    return records


def build_actuals_lookup(pairs: list[dict]) -> dict[tuple, list[float]]:
    """Build lookup: (area, location, date, hour) → [actual wind readings]."""
    actuals = defaultdict(list)
    for p in pairs:
        try:
            dt = datetime.fromisoformat(p["time"].replace("Z", "+00:00"))
        except (ValueError, KeyError):
            continue
        date_str = dt.strftime("%Y-%m-%d")
        hour = dt.hour
        area = p.get("area", "")
        for loc in ["top", "valley"]:
            wind = p.get(f"{loc}_wind")
            if wind is not None and wind > 0:
                actuals[(area, loc, date_str, hour)].append(wind)
    return actuals


def build_dataset(pairs: list[dict], actuals: dict) -> tuple[np.ndarray, np.ndarray]:
    """Build training pairs from JSONL data.

    For each record, we know:
      - actual wind at time T (top_wind, valley_wind)
      - what each model forecasted at time T

    We pair current conditions with actual readings at future hours.
    """
    X_rows, y_rows = [], []

    for p in pairs:
        try:
            dt = datetime.fromisoformat(p["time"].replace("Z", "+00:00"))
        except (ValueError, KeyError):
            continue

        area = p.get("area", "")
        hour = dt.hour + dt.minute / 60
        day_of_year = dt.timetuple().tm_yday
        hour_sin, hour_cos = cyclical(hour, 24)
        day_sin, day_cos = cyclical(day_of_year, 365.25)

        for loc in ["top", "valley"]:
            cur_wind = p.get(f"{loc}_wind")
            if cur_wind is None or cur_wind <= 0:
                continue

            # Current observation as context
            cw = cur_wind
            # Use Skistar forecast as the "forecast" baseline
            fw = p.get(f"ski_{loc}", cw)
            if fw is None:
                fw = cw

            # For gust and temp we don't have per-pair data, use wind as proxy
            fg = fw * 1.3  # estimated gust
            ft = 0  # no temp in pairs
            ct = 0
            cg = cw * 1.3

            is_top = 1 if loc == "top" else 0

            # Look ahead: find actual at future hours
            for h_ahead in range(1, 7):
                target_hour = (dt.hour + h_ahead) % 24
                target_key = (area, loc, dt.strftime("%Y-%m-%d"), target_hour)

                if target_key not in actuals:
                    continue

                target_wind = float(np.mean(actuals[target_key]))
                th_sin, th_cos = cyclical(target_hour, 24)

                features = {
                    "hour_sin": hour_sin,
                    "hour_cos": hour_cos,
                    "day_sin": day_sin,
                    "day_cos": day_cos,
                    "target_hour_sin": th_sin,
                    "target_hour_cos": th_cos,
                    "hours_ahead": h_ahead,
                    "forecast_wind": fw,
                    "forecast_gust": fg,
                    "forecast_temp": ft,
                    "forecast_dir_sin": 0,
                    "forecast_dir_cos": 0,
                    "forecast_gust_ratio": fg / max(fw, 0.1),
                    "cur_wind": cw,
                    "cur_gust": cg,
                    "cur_temp": ct,
                    "cur_gust_ratio": cg / max(cw, 0.1),
                    "bias_wind": fw - cw,
                    "bias_temp": 0,
                    "is_top": is_top,
                }

                row = [features.get(c, 0) for c in FEATURE_COLS]
                X_rows.append(row)
                y_rows.append(target_wind)

    return np.array(X_rows, dtype=np.float32), np.array(y_rows, dtype=np.float32)


def train():
    """Train with proper time-split validation."""
    # Load data
    pairs = load_jsonl_pairs(JSONL_DATA)
    blob_records = load_blob_records(BLOB_DATA)

    # Build actuals from all pair data
    actuals = build_actuals_lookup(pairs)
    print(f"Actuals lookup: {len(actuals)} unique (area, loc, date, hour) entries")

    # Also add actuals from blob current readings
    for rec in blob_records:
        try:
            dt = datetime.fromisoformat(rec.get("scraped_at", "").replace("Z", "+00:00"))
        except (ValueError, AttributeError):
            continue
        area = rec.get("area", "")
        for c in rec.get("current", []):
            loc = c.get("location", "")
            wind = c.get("wind_ms")
            if wind is not None and wind > 0:
                actuals[(area, loc, dt.strftime("%Y-%m-%d"), dt.hour)].append(wind)

    print(f"Actuals lookup (with blob): {len(actuals)} entries")

    # Build training pairs from JSONL
    X_jsonl, y_jsonl = build_dataset(pairs, actuals)
    print(f"JSONL pairs: {X_jsonl.shape[0]} samples")

    if X_jsonl.shape[0] < 50:
        print(f"Not enough real forecast→actual pairs ({X_jsonl.shape[0]}). Need at least 50.")
        return None

    X = X_jsonl
    y = y_jsonl
    print(f"\nTotal dataset: {X.shape[0]} samples, {X.shape[1]} features")

    # TIME-SPLIT VALIDATION (last 20%)
    split = int(X.shape[0] * 0.8)
    X_train, X_test = X[:split], X[split:]
    y_train, y_test = y[:split], y[split:]
    print(f"Train: {X_train.shape[0]}, Test: {X_test.shape[0]}")

    # Backup previous models
    MODEL_DIR.mkdir(exist_ok=True)
    prev_dir = MODEL_DIR / "previous"
    prev_dir.mkdir(exist_ok=True)
    for f in ["median.txt", "low.txt", "high.txt", "metrics.json", "manifest.json", "approach.txt"]:
        src = MODEL_DIR / f
        if src.exists():
            shutil.copy2(src, prev_dir / f)

    # Train 3 models
    models = {}
    for name, objective, alpha in [
        ("median", "regression", None),
        ("low", "quantile", 0.1),
        ("high", "quantile", 0.9),
    ]:
        params = {
            "objective": objective,
            "metric": "mae",
            "num_leaves": 31,
            "learning_rate": 0.05,
            "n_estimators": 200,
            "min_child_samples": 20,
            "reg_alpha": 0.3,
            "reg_lambda": 0.5,
            "subsample": 0.8,
            "colsample_bytree": 0.8,
            "verbose": -1,
        }
        if alpha is not None:
            params["alpha"] = alpha

        model = lgb.LGBMRegressor(**params)
        model.fit(X_train, y_train)
        models[name] = model
        model.booster_.save_model(str(MODEL_DIR / f"{name}.txt"))

    # Evaluate on TEST set (honest metrics)
    preds_test = np.clip(models["median"].predict(X_test), 0, None)
    preds_train = np.clip(models["median"].predict(X_train), 0, None)

    # Baseline: persistence (use forecast_wind as prediction)
    forecast_idx = FEATURE_COLS.index("forecast_wind")
    baseline_test = X_test[:, forecast_idx]

    test_mae = float(np.mean(np.abs(preds_test - y_test)))
    test_rmse = float(np.sqrt(np.mean((preds_test - y_test) ** 2)))
    train_mae = float(np.mean(np.abs(preds_train - y_train)))
    baseline_mae = float(np.mean(np.abs(baseline_test - y_test)))
    improvement = (1 - test_mae / max(baseline_mae, 0.01)) * 100

    metrics = {
        "samples_train": int(X_train.shape[0]),
        "samples_test": int(X_test.shape[0]),
        "train_mae": round(train_mae, 2),
        "test_mae": round(test_mae, 2),
        "test_rmse": round(test_rmse, 2),
        "baseline_mae": round(baseline_mae, 2),
        "improvement_pct": round(improvement, 1),
        "approach": "direct_prediction",
        "trained_at": datetime.now(timezone.utc).isoformat(),
    }

    print(f"\n{'='*50}")
    print(f"RESULTS (evaluated on held-out test set)")
    print(f"{'='*50}")
    print(f"  Train MAE:     {train_mae:.2f} m/s")
    print(f"  Test MAE:      {test_mae:.2f} m/s")
    print(f"  Test RMSE:     {test_rmse:.2f} m/s")
    print(f"  Baseline MAE:  {baseline_mae:.2f} m/s (persistence)")
    print(f"  Improvement:   {improvement:.1f}%")
    print(f"  Train samples: {X_train.shape[0]}")
    print(f"  Test samples:  {X_test.shape[0]}")

    (MODEL_DIR / "metrics.json").write_text(json.dumps(metrics, indent=2))
    (MODEL_DIR / "approach.txt").write_text("direct_prediction")

    # Save manifest
    manifest = {
        "version": datetime.now(timezone.utc).strftime("%Y%m%d_%H%M%S"),
        "trained_at": datetime.now(timezone.utc).isoformat(),
        "samples": int(X.shape[0]),
        "features": FEATURE_COLS,
        "feature_count": len(FEATURE_COLS),
        "approach": "direct_prediction",
        "metrics": metrics,
    }
    (MODEL_DIR / "manifest.json").write_text(json.dumps(manifest, indent=2))

    # Compare with previous (only compare test_mae vs test_mae)
    prev_metrics = prev_dir / "metrics.json"
    if prev_metrics.exists():
        prev = json.loads(prev_metrics.read_text())
        prev_test_mae = prev.get("test_mae")
        if prev_test_mae is not None:
            print(f"\n  Previous test MAE: {prev_test_mae}")
            if test_mae > prev_test_mae * 1.15:
                print(f"  ⚠ New model is 15%+ worse. Rolling back.")
                for f in ["median.txt", "low.txt", "high.txt", "metrics.json", "manifest.json", "approach.txt"]:
                    src = prev_dir / f
                    if src.exists():
                        shutil.copy2(src, MODEL_DIR / f)
                print(f"  Rolled back to previous model.")
                return None
        else:
            print(f"\n  Previous model had no test_mae (trained without validation). Accepting new model.")

    print(f"\n  Models saved to {MODEL_DIR}")
    return models, metrics


if __name__ == "__main__":
    train()
