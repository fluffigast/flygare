import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { WindDirectionCompass } from "../../components/wind-direction-compass";
import WindStreamlines from "../../components/decorations/wind-streamlines";

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

// Beaufort-skalan → svenskt namn + färg-ton (max 12).
function beaufort(ms: number): { level: number; name: string; tone: string } {
  const scale: Array<[number, string, string]> = [
    [0.3, "Stilla", "#94a3b8"],
    [1.6, "Nästan stilla", "#94a3b8"],
    [3.4, "Lätt bris", "#38bdf8"],
    [5.5, "Måttlig bris", "#0ea5e9"],
    [8.0, "Frisk bris", "#0284c7"],
    [10.8, "Styv bris", "#0369a1"],
    [13.9, "Hård vind", "#075985"],
    [17.2, "Styv kuling", "#f59e0b"],
    [20.8, "Hård kuling", "#ea580c"],
    [24.5, "Halv storm", "#dc2626"],
    [28.5, "Storm", "#991b1b"],
    [32.7, "Svår storm", "#7f1d1d"],
  ];
  for (let i = 0; i < scale.length; i++) {
    if (ms <= scale[i][0]) return { level: i, name: scale[i][1], tone: scale[i][2] };
  }
  return { level: 12, name: "Orkan", tone: "#450a0a" };
}

// Enkel Beaufort-visualisering — 12 cellsegments där aktuell nivå färgläggs.
const BeaufortBar: React.FC<{ level: number; tone: string }> = ({ level, tone }) => (
  <div className="flex gap-0.5 h-2 items-stretch">
    {Array.from({ length: 12 }).map((_, i) => (
      <div
        key={i}
        className="flex-1 rounded-[1px] transition-all"
        style={{
          background: i < level ? tone : "var(--border, #e2e8f0)",
          opacity: i < level ? 0.55 + (i / 12) * 0.45 : 1,
        }}
      />
    ))}
  </div>
);

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

  const sourceLinks = (
    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
      <a href="https://meac.se/sub_2/hummeln/wind.asp" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">MEAC</a>
      <a href="https://www.windguru.cz/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Windguru</a>
      <a href="https://www.yr.no/nb/detaljer/tabell/2-2720396" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Yr.no</a>
      <a href="https://www.smhi.se/vader/prognoser/fjallvader" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">SMHI</a>
      <a href="https://xcmeteo.com/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">XCMeteo</a>
    </div>
  );

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
        {sourceLinks}
      </section>
    );
  }

  const bf = meac?.wind_ms != null ? beaufort(meac.wind_ms) : null;

  return (
    <section className="flex flex-col gap-3">
      <div className="flex justify-between items-end">
        <h2 className="font-serif text-2xl">Aktuellt väder</h2>
        <Link to="/flyga-i-are/vader" className="text-sm text-muted-foreground hover:text-primary transition-colors">
          Alla vädertjänster →
        </Link>
      </div>

      {!data && (
        <p className="text-muted-foreground text-sm py-4">Hämtar vinddata…</p>
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

          {/* MEAC — huvudpanel med bakgrunds-streamlines */}
          {meac && (
            <div
              className="relative overflow-hidden rounded-lg p-5"
              style={{
                border: "1px solid var(--border, #e2e8f0)",
                background:
                  "linear-gradient(135deg, #ffffff 0%, #fafbfc 50%, #f5f8fb 100%)",
              }}
            >
              {/* Vind-strömfältet i bakgrunden, riktat efter live vindriktning */}
              {meac.wind_dir != null && meac.wind_ms != null && (
                <WindStreamlines
                  className="pointer-events-none absolute inset-0 w-full h-full"
                  windDir={meac.wind_dir}
                  speedMs={meac.wind_ms}
                  lines={8}
                  opacity={0.22}
                />
              )}

              <div className="relative flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    MEAC Hummeln — Live
                  </span>
                </div>
                <span className="text-xs text-muted-foreground font-mono">{meac.time ?? ""}</span>
              </div>

              <div className="relative flex items-center gap-5">
                {/* Kompass — större */}
                {meac.wind_dir != null && (
                  <div className="flex flex-col items-center gap-1.5 shrink-0">
                    <WindDirectionCompass
                      windDir={meac.wind_dir}
                      size={96}
                      showLabels
                    />
                    <span className="text-xs font-semibold tabular-nums" style={{ color: "var(--ink-2, #0f172b)" }}>
                      {dirLabel(meac.wind_dir)} · {Math.round(meac.wind_dir)}°
                    </span>
                  </div>
                )}

                {/* Speed + Beaufort */}
                <div className="flex flex-col gap-2 flex-1 min-w-0">
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-serif text-5xl font-bold tabular-nums leading-none">
                      {meac.wind_ms?.toFixed(1) ?? "—"}
                    </span>
                    <span className="text-muted-foreground text-sm">m/s</span>
                  </div>
                  {bf && (
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-between items-baseline">
                        <span className="text-xs font-semibold" style={{ color: bf.tone }}>
                          {bf.name}
                        </span>
                        <span className="text-[10px] text-muted-foreground tabular-nums">
                          Bft {bf.level}
                        </span>
                      </div>
                      <BeaufortBar level={bf.level} tone={bf.tone} />
                    </div>
                  )}
                </div>
              </div>

              {/* Stats-rad under */}
              <div className="relative mt-4 pt-3 flex justify-between text-sm" style={{ borderTop: "1px solid var(--border, #e2e8f0)" }}>
                <div className="flex flex-col items-center flex-1">
                  <p className="text-muted-foreground text-[10px] uppercase tracking-wider">Max</p>
                  <p className="font-semibold tabular-nums">{meac.wind_max ?? "—"}<span className="text-xs text-muted-foreground ml-0.5">m/s</span></p>
                </div>
                <div className="flex flex-col items-center flex-1" style={{ borderLeft: "1px solid var(--border, #e2e8f0)" }}>
                  <p className="text-muted-foreground text-[10px] uppercase tracking-wider">Medel</p>
                  <p className="font-semibold tabular-nums">{meac.wind_avg ?? "—"}<span className="text-xs text-muted-foreground ml-0.5">m/s</span></p>
                </div>
                <div className="flex flex-col items-center flex-1" style={{ borderLeft: "1px solid var(--border, #e2e8f0)" }}>
                  <p className="text-muted-foreground text-[10px] uppercase tracking-wider">Min</p>
                  <p className="font-semibold tabular-nums">{meac.wind_min ?? "—"}<span className="text-xs text-muted-foreground ml-0.5">m/s</span></p>
                </div>
                <div className="flex flex-col items-center flex-1" style={{ borderLeft: "1px solid var(--border, #e2e8f0)" }}>
                  <p className="text-muted-foreground text-[10px] uppercase tracking-wider">Temp</p>
                  <p className="font-semibold tabular-nums">{meac.temp_c != null ? `${meac.temp_c}°` : "—"}</p>
                </div>
              </div>
            </div>
          )}

          {/* Skistar stationer */}
          {(top || valley) && (
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Skistar Toppen", data: top },
                { label: "Skistar Dalen", data: valley },
              ].filter((s) => s.data).map((s) => (
                <div key={s.label} className="border border-border rounded-lg p-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                    {s.label}
                  </p>
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-serif text-2xl font-bold tabular-nums">
                      {s.data!.wind_ms ?? "—"}
                    </span>
                    <span className="text-muted-foreground text-xs">m/s</span>
                    {s.data!.gust_ms != null && (
                      <span className="text-muted-foreground text-xs">(by {s.data!.gust_ms})</span>
                    )}
                  </div>
                  {s.data!.temp_c != null && (
                    <p className="text-muted-foreground text-sm mt-1">{s.data!.temp_c}°C</p>
                  )}
                </div>
              ))}
            </div>
          )}

        </div>
      )}

      {sourceLinks}
    </section>
  );
};

export default WindWidget;
