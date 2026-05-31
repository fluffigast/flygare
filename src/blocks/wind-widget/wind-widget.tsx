import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { MoveUpIcon } from "lucide-react";

interface MeacData {
  wind_ms: number | null;
  wind_max: number | null;
  wind_avg: number | null;
  wind_min: number | null;
  wind_dir: number | null;
  temp_c: number | null;
  time: string | null;
}

interface SkistarReading {
  location: string;
  temp_c: number | null;
  wind_ms: number | null;
  gust_ms: number | null;
  wind_dir: string | null;
}

interface WindResponse {
  meac?: MeacData | null;
  skistar?: { readings: SkistarReading[]; updated: string | null } | null;
  // flat format fallback
  wind_ms?: number;
  wind_dir?: number;
  temp_c?: number;
  wind_max?: number;
  wind_avg?: number;
  wind_min?: number;
  time?: string;
}

function dirLabel(deg: number): string {
  const dirs = ["N", "NO", "O", "SO", "S", "SV", "V", "NV"];
  return dirs[Math.round(deg / 45) % 8];
}

const WindWidget: React.FC = () => {
  const [data, setData] = useState<WindResponse | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load(attempt = 0) {
      try {
        const res = await fetch("/api/wind");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const d = await res.json();
        if (cancelled) return;
        if (d.meac !== undefined) {
          setData(d);
        } else if (d.wind_ms !== undefined) {
          setData({ meac: d, skistar: null });
        }
      } catch {
        if (cancelled) return;
        if (attempt < 1) {
          setTimeout(() => load(attempt + 1), 2000);
        } else {
          setError(true);
        }
      }
    }

    load();
    return () => { cancelled = true; };
  }, []);

  const meac = data?.meac;
  const skistar = data?.skistar;
  const top = skistar?.readings?.find((r) => r.location === "top");
  const valley = skistar?.readings?.find((r) => r.location === "valley");

  if (error) {
    return (
      <section className="flex flex-col gap-3">
        <h2 className="font-serif text-2xl">Aktuellt väder</h2>
        <p className="text-muted-foreground text-sm">
          Vinddata kunde inte hämtas.{" "}
          <a href="https://meac.se/sub_2/hummeln/wind.asp" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            Se MEAC direkt →
          </a>
        </p>
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-3">
      <div className="flex justify-between items-end">
        <h2 className="font-serif text-2xl">Aktuellt väder</h2>
        <Link to="/flyga-i-are/vader" className="text-sm text-muted-foreground hover:text-primary transition-colors">
          Alla vädertjänster →
        </Link>
      </div>

      {!data && (
        <p className="text-muted-foreground text-sm py-4">Hämtar vinddata...</p>
      )}

      {data && !meac && !top && !valley && (
        <p className="text-muted-foreground text-sm">
          Inga aktuella mätningar just nu.{" "}
          <a href="https://meac.se/sub_2/hummeln/wind.asp" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            Se MEAC direkt →
          </a>
        </p>
      )}

      {data && (meac || top || valley) && (
        <div className="flex flex-col gap-3">

          {/* MEAC sensor — the primary source */}
          {meac && (
            <div className="border border-border rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    MEAC Hummeln — Live
                  </span>
                </div>
                <span className="text-xs text-muted-foreground font-mono">{meac.time ?? ""}</span>
              </div>

              <div className="flex items-center gap-4">
                {/* Wind arrow */}
                {meac.wind_dir != null && (
                  <div className="flex flex-col items-center gap-0.5 shrink-0">
                    <div className="w-8 h-8 text-foreground" style={{ transform: `rotate(${meac.wind_dir}deg)` }}>
                      <MoveUpIcon className="w-8 h-8" />
                    </div>
                    <span className="text-xs text-muted-foreground">{dirLabel(meac.wind_dir)}</span>
                  </div>
                )}

                {/* Speed */}
                <div className="flex items-baseline gap-1.5">
                  <span className="font-serif text-4xl font-bold tabular-nums">
                    {meac.wind_ms?.toFixed(1) ?? "—"}
                  </span>
                  <span className="text-muted-foreground text-sm">m/s</span>
                </div>

                {/* Stats */}
                <div className="flex gap-4 ml-auto text-sm">
                  <div>
                    <p className="text-muted-foreground text-xs">Max</p>
                    <p className="font-semibold tabular-nums">{meac.wind_max ?? "—"}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Medel</p>
                    <p className="font-semibold tabular-nums">{meac.wind_avg ?? "—"}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Temp</p>
                    <p className="font-semibold tabular-nums">{meac.temp_c != null ? `${meac.temp_c}°` : "—"}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Skistar stations — top & valley */}
          {(top || valley) && (
            <div className="grid grid-cols-2 gap-3">
              {top && (
                <div className="border border-border rounded-lg p-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                    Skistar Toppen
                  </p>
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-serif text-2xl font-bold tabular-nums">
                      {top.wind_ms ?? "—"}
                    </span>
                    <span className="text-muted-foreground text-xs">m/s</span>
                    {top.gust_ms != null && (
                      <span className="text-muted-foreground text-xs">(by {top.gust_ms})</span>
                    )}
                  </div>
                  {top.temp_c != null && (
                    <p className="text-muted-foreground text-sm mt-1">{top.temp_c}°C</p>
                  )}
                </div>
              )}
              {valley && (
                <div className="border border-border rounded-lg p-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                    Skistar Dalen
                  </p>
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-serif text-2xl font-bold tabular-nums">
                      {valley.wind_ms ?? "—"}
                    </span>
                    <span className="text-muted-foreground text-xs">m/s</span>
                    {valley.gust_ms != null && (
                      <span className="text-muted-foreground text-xs">(by {valley.gust_ms})</span>
                    )}
                  </div>
                  {valley.temp_c != null && (
                    <p className="text-muted-foreground text-sm mt-1">{valley.temp_c}°C</p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Source links */}
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
            <a href="https://meac.se/sub_2/hummeln/wind.asp" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">MEAC</a>
            <a href="https://www.windguru.cz/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Windguru</a>
            <a href="https://www.yr.no/nb/detaljer/tabell/2-2720396" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Yr.no</a>
            <a href="https://www.smhi.se/vader/prognoser/fjallvader" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">SMHI</a>
            <a href="https://xcmeteo.com/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">XCMeteo</a>
          </div>
        </div>
      )}
    </section>
  );
};

export default WindWidget;
