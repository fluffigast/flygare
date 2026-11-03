import React, { useEffect, useState } from "react";
import { NavigationIcon } from "lucide-react";

type HolfuyReading = {
  stationName: string;
  stationId: number;
  windKmh?: number;
  gustKmh?: number;
  directionDeg?: number;
  temperatureC?: number;
  measuredAt?: string;
  age?: string;
  url: string;
};

const STATIONS: Array<{ id: number; label: string; url: string }> = [
  {
    id: 215,
    label: "Åreskutan",
    url: "https://holfuy.com/en/weather/215",
  },
  {
    id: 1230,
    label: "Draklanda",
    url: "https://holfuy.com/en/weather/1230",
  },
];

// Konvertera km/h → m/s
const toMs = (kmh?: number): number | undefined =>
  kmh == null ? undefined : kmh / 3.6;

const colorForMs = (ms?: number): string => {
  if (ms == null) return "var(--slate, #62748e)";
  if (ms >= 15) return "var(--signal-danger, #dc2626)";
  if (ms >= 9) return "var(--signal-safety, #b45309)";
  return "var(--signal-ok, #16a34a)";
};

const compass = (deg?: number): string => {
  if (deg == null) return "";
  const names = ["N", "NÖ", "Ö", "SÖ", "S", "SV", "V", "NV"];
  const i = Math.round(deg / 45) % 8;
  return names[i];
};

/**
 * Live vind-widget som läser från Holfuy (via deras public JSON-endpoint).
 * Cachar 10 minuter via localStorage. Vid fel visas senast kända värden
 * och en tyst "Live-data otillgänglig"-rad, aldrig tom ruta.
 */
const HolfuyWidget: React.FC = () => {
  const [readings, setReadings] = useState<HolfuyReading[]>([]);
  const [loading, setLoading] = useState(true);
  const [stale, setStale] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const cacheKey = "flygare-holfuy-v1";
    const CACHE_MS = 10 * 60 * 1000;

    const loadFromCache = (): HolfuyReading[] | null => {
      try {
        const raw = window.localStorage.getItem(cacheKey);
        if (!raw) return null;
        const parsed = JSON.parse(raw) as { at: number; data: HolfuyReading[] };
        if (Date.now() - parsed.at > CACHE_MS * 6) return null;
        return parsed.data;
      } catch {
        return null;
      }
    };

    const saveCache = (data: HolfuyReading[]) => {
      try {
        window.localStorage.setItem(cacheKey, JSON.stringify({ at: Date.now(), data }));
      } catch {
        /* ignore */
      }
    };

    const fetchStation = async (station: typeof STATIONS[number]): Promise<HolfuyReading> => {
      const url = `https://api.holfuy.com/live/?s=${station.id}&pw=anon&m=JSON&tu=KMH&su=C`;
      try {
        const res = await fetch(url, { signal: AbortSignal.timeout(6000) });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        return {
          stationId: station.id,
          stationName: station.label,
          windKmh: json?.wind?.speed,
          gustKmh: json?.wind?.gust,
          directionDeg: json?.wind?.direction,
          temperatureC: json?.temperature,
          measuredAt: json?.dateTime,
          url: station.url,
        };
      } catch {
        return {
          stationId: station.id,
          stationName: station.label,
          url: station.url,
        };
      }
    };

    const cached = loadFromCache();
    if (cached) {
      setReadings(cached);
      setLoading(false);
    }

    (async () => {
      const results = await Promise.all(STATIONS.map(fetchStation));
      if (cancelled) return;
      const anySuccess = results.some((r) => r.windKmh != null);
      if (anySuccess) {
        setReadings(results);
        saveCache(results);
        setStale(false);
      } else {
        setStale(true);
        if (!cached) setReadings(results);
      }
      setLoading(false);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading && readings.length === 0) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[0, 1].map((i) => (
          <div
            key={i}
            className="animate-pulse p-5"
            style={{
              background: "#fafbfc",
              border: "1px solid var(--border, #e2e8f0)",
              borderRadius: "var(--radius, 10px)",
              minHeight: 140,
            }}
            aria-hidden="true"
          >
            <div className="h-4 w-24 rounded mb-3" style={{ background: "var(--border, #e2e8f0)" }} />
            <div className="h-8 w-32 rounded mb-2" style={{ background: "var(--border, #e2e8f0)" }} />
            <div className="h-3 w-full rounded" style={{ background: "var(--border, #e2e8f0)" }} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {readings.map((r) => {
          const ms = toMs(r.windKmh);
          const gustMs = toMs(r.gustKmh);
          const color = colorForMs(ms);
          return (
            <a
              key={r.stationId}
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-3 p-5 transition-colors hover:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent,#3774a3)] focus-visible:ring-offset-2"
              style={{
                background: "#fafbfc",
                border: "1px solid var(--border, #e2e8f0)",
                borderRadius: "var(--radius, 10px)",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <div className="flex items-baseline justify-between">
                <p className="text-xs uppercase tracking-wider font-semibold" style={{ color: "var(--slate, #62748e)" }}>
                  {r.stationName}
                </p>
                <span className="text-xs" style={{ color: "var(--slate-2, #6b7d95)" }}>Holfuy ↗</span>
              </div>
              {ms != null ? (
                <>
                  <div className="flex items-center gap-3">
                    <span
                      className="inline-block w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ background: color }}
                      aria-hidden="true"
                    />
                    <p
                      className="font-mono tabular-nums font-semibold text-2xl"
                      style={{ color }}
                      aria-label={`Vindstyrka ${ms.toFixed(1).replace(".", ",")} meter per sekund, ${compass(r.directionDeg)}`}
                    >
                      {ms.toFixed(1).replace(".", ",")} m/s
                    </p>
                  </div>
                  <div className="flex items-center gap-3 text-sm" style={{ color: "var(--slate-3, #45556c)" }}>
                    {r.directionDeg != null && (
                      <span className="inline-flex items-center gap-2">
                        <span
                          className="inline-flex items-center justify-center w-6 h-6 rounded-full"
                          style={{
                            border: "1px solid var(--border, #e2e8f0)",
                            transform: `rotate(${r.directionDeg}deg)`,
                            transformOrigin: "center",
                          }}
                          aria-hidden="true"
                        >
                          <NavigationIcon size={12} strokeWidth={1.8} />
                        </span>
                        {compass(r.directionDeg)}
                      </span>
                    )}
                    {gustMs != null && gustMs > (ms ?? 0) + 0.3 && (
                      <span className="font-mono tabular-nums">byar {gustMs.toFixed(1).replace(".", ",")} m/s</span>
                    )}
                    {r.temperatureC != null && (
                      <span className="font-mono tabular-nums">{r.temperatureC.toFixed(1).replace(".", ",")}°C</span>
                    )}
                  </div>
                </>
              ) : (
                <p className="text-sm" style={{ color: "var(--slate-3, #45556c)" }}>
                  Live-data otillgänglig — öppna Holfuy direkt.
                </p>
              )}
            </a>
          );
        })}
      </div>
      {stale && readings.some((r) => r.windKmh != null) && (
        <p className="text-xs" style={{ color: "var(--slate, #62748e)" }} role="status">
          Live-anrop misslyckades — visar cachad data.
        </p>
      )}
    </div>
  );
};

export default HolfuyWidget;
