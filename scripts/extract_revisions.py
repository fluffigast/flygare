#!/usr/bin/env python3
"""Extract forecast revision history from blob data.

For each scraped forecast, tracks how Skistar's prediction for each future hour
changed over time. Shows forecast stability — a forecast that keeps changing
is less reliable than one that's stable.

Output: revision_stats.json with per-hour revision patterns.
"""

import json
import os
import sys
from collections import defaultdict
from pathlib import Path


def extract_revisions(blob_path: str = "/tmp/blob-data.jsonl") -> dict:
    """Extract how forecasts changed for each target hour."""
    if not Path(blob_path).exists():
        print(f"No blob data at {blob_path}")
        return {}

    # Group by (date, target_hour, location) → list of (scrape_time, predicted_wind)
    revisions: dict[str, list[dict]] = defaultdict(list)

    with open(blob_path) as f:
        for line in f:
            if not line.strip():
                continue
            try:
                rec = json.loads(line)
            except json.JSONDecodeError:
                continue

            scraped_at = rec.get("scraped_at", "")
            if not scraped_at:
                continue

            date = scraped_at[:10]
            area = rec.get("area", "")
            if area != "areby":
                continue

            for h in rec.get("hourly", []):
                target = h.get("from", "")
                for r in h.get("readings", []):
                    loc = r.get("location", "")
                    wind = r.get("wind_ms")
                    if wind is None:
                        continue

                    key = f"{date}_{target}_{loc}"
                    revisions[key].append({
                        "scrapedAt": scraped_at,
                        "wind": wind,
                    })

    # Compute stability stats per target hour
    stats = {}
    for key, snapshots in revisions.items():
        if len(snapshots) < 2:
            continue

        winds = [s["wind"] for s in snapshots]
        spread = max(winds) - min(winds)
        changes = sum(1 for i in range(1, len(winds)) if winds[i] != winds[i - 1])

        parts = key.split("_")
        date, hour, loc = parts[0], parts[1], parts[2]

        if date not in stats:
            stats[date] = {}
        if hour not in stats[date]:
            stats[date][hour] = {}

        stats[date][hour][loc] = {
            "snapshots": len(snapshots),
            "spread": spread,
            "changes": changes,
            "values": winds[-10:],  # last 10 predictions
            "first": winds[0],
            "last": winds[-1],
            "drift": winds[-1] - winds[0],
        }

    return stats


def summarize(stats: dict):
    """Print summary of forecast stability."""
    for date in sorted(stats.keys())[-3:]:
        print(f"\n=== {date} ===")
        for hour in sorted(stats[date].keys()):
            for loc in ["top", "valley"]:
                if loc not in stats[date][hour]:
                    continue
                s = stats[date][hour][loc]
                stability = "stable" if s["spread"] <= 2 else "unstable" if s["spread"] >= 5 else "moderate"
                print(f"  {hour} {loc:7s}: {s['first']}→{s['last']} (spread {s['spread']}, {s['changes']} changes, {stability})")


if __name__ == "__main__":
    stats = extract_revisions()
    if stats:
        summarize(stats)
        out = Path(__file__).parent.parent / "model" / "revision_stats.json"
        out.write_text(json.dumps(stats, indent=2))
        print(f"\nSaved to {out}")
    else:
        print("No revision data found")
