import React, { useEffect, useState } from "react";
import { Link } from "react-router";

interface MeacData {
  source: string;
  type: string;
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
  meac: MeacData | null;
  skistar: {
    source: string;
    updated: string | null;
    readings: SkistarReading[];
  } | null;
  timestamp: string;
}

function dirLabel(deg: number): string {
  const dirs = ["N", "NO", "O", "SO", "S", "SV", "V", "NV"];
  return dirs[Math.round(deg / 45) % 8];
}

function dirLabelFull(deg: number): string {
  const dirs = ["Nordlig", "Nordostlig", "Östlig", "Sydostlig", "Sydlig", "Sydvästlig", "Västlig", "Nordvästlig"];
  return dirs[Math.round(deg / 45) % 8];
}

const WindWidget: React.FC = () => {
  const [data, setData] = useState<WindResponse | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/wind")
      .then((res) => res.ok ? res.json() : Promise.reject())
      .then(setData)
      .catch(() => setError(true));
  }, []);

  const meac = data?.meac;
  const skistar = data?.skistar;
  const topReading = skistar?.readings?.find((r) => r.location === "top");
  const valleyReading = skistar?.readings?.find((r) => r.location === "valley");

  return (
    <section className="flex flex-col gap-4">
      <div className="flex justify-between items-end">
        <div>
          <p className="font-serif italic text-muted-foreground text-sm">Aktuellt</p>
          <h2 className="font-serif text-2xl md:text-3xl">Vind i Åre</h2>
        </div>
        <Link to="/flyga-i-are/vader" className="text-sm text-primary hover:underline">
          Prognos & tjänster →
        </Link>
      </div>

      {/* Main wind card — dark instrument panel */}
      <div className="rounded-xl overflow-hidden" style={{ background: "linear-gradient(135deg, #0a1628 0%, #1a3050 100%)" }}>

        {error && (
          <div className="p-8 text-center">
            <p className="text-white/50 text-sm">Vinddata otillgänglig just nu</p>
            <a href="https://meac.se/sub_2/hummeln/wind.asp" target="_blank" rel="noopener noreferrer"
              className="text-sm mt-2 inline-block" style={{ color: "#5ec4d4" }}>
              Se MEAC direkt →
            </a>
          </div>
        )}

        {!error && !data && (
          <div className="p-8 text-center">
            <div className="inline-block w-5 h-5 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
          </div>
        )}

        {data && (
          <div className="p-5 md:p-8">
            {/* Top row: Hero wind reading + compass */}
            <div className="flex items-start gap-6 md:gap-10">

              {/* Wind compass */}
              <div className="flex flex-col items-center gap-1 shrink-0">
                <div className="relative w-16 h-16 md:w-20 md:h-20">
                  {/* Compass ring */}
                  <svg viewBox="0 0 80 80" className="w-full h-full">
                    <circle cx="40" cy="40" r="36" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                    <circle cx="40" cy="40" r="30" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                    {/* Cardinal marks */}
                    {[0, 90, 180, 270].map((d) => (
                      <line key={d}
                        x1={40 + 33 * Math.sin(d * Math.PI / 180)}
                        y1={40 - 33 * Math.cos(d * Math.PI / 180)}
                        x2={40 + 36 * Math.sin(d * Math.PI / 180)}
                        y2={40 - 36 * Math.cos(d * Math.PI / 180)}
                        stroke="rgba(255,255,255,0.3)" strokeWidth="2"
                      />
                    ))}
                    {/* Wind arrow */}
                    {meac?.wind_dir != null && (
                      <g transform={`rotate(${meac.wind_dir} 40 40)`}>
                        <line x1="40" y1="40" x2="40" y2="12" stroke="#5ec4d4" strokeWidth="2.5" strokeLinecap="round" />
                        <polygon points="40,8 36,16 44,16" fill="#5ec4d4" />
                      </g>
                    )}
                    {/* Center dot */}
                    <circle cx="40" cy="40" r="3" fill="#d4a853" />
                  </svg>
                </div>
                {meac?.wind_dir != null && (
                  <span className="text-xs font-mono" style={{ color: "#5ec4d4" }}>
                    {dirLabel(meac.wind_dir)} {meac.wind_dir}°
                  </span>
                )}
              </div>

              {/* Hero speed */}
              <div className="flex-1">
                <div className="flex items-baseline gap-2">
                  <span className="font-serif font-bold text-white leading-none" style={{ fontSize: "clamp(3rem, 8vw, 4.5rem)" }}>
                    {meac?.wind_ms != null ? meac.wind_ms.toFixed(1) : "—"}
                  </span>
                  <span className="text-white/40 text-lg">m/s</span>
                </div>
                {meac?.wind_dir != null && (
                  <p className="text-white/50 text-sm mt-1">
                    {dirLabelFull(meac.wind_dir)} vind
                  </p>
                )}
                {meac?.temp_c != null && (
                  <p className="text-sm mt-2" style={{ color: "#d4a853" }}>
                    {meac.temp_c}°C
                  </p>
                )}
              </div>
            </div>

            {/* Stats row */}
            {meac && (
              <div className="grid grid-cols-3 gap-4 mt-6 pt-5 border-t border-white/10">
                <div>
                  <p className="text-white/30 text-xs uppercase tracking-wider">Max</p>
                  <p className="text-white font-semibold">{meac.wind_max ?? "—"} <span className="text-white/40 text-xs">m/s</span></p>
                </div>
                <div>
                  <p className="text-white/30 text-xs uppercase tracking-wider">Medel</p>
                  <p className="text-white font-semibold">{meac.wind_avg ?? "—"} <span className="text-white/40 text-xs">m/s</span></p>
                </div>
                <div>
                  <p className="text-white/30 text-xs uppercase tracking-wider">Min</p>
                  <p className="text-white font-semibold">{meac.wind_min ?? "—"} <span className="text-white/40 text-xs">m/s</span></p>
                </div>
              </div>
            )}

            {/* Skistar stations */}
            {(topReading || valleyReading) && (
              <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-white/10">
                {topReading && (
                  <div className="flex flex-col gap-1">
                    <p className="text-white/30 text-xs uppercase tracking-wider">Toppen</p>
                    <p className="text-white text-sm">
                      {topReading.wind_ms ?? "—"} m/s
                      {topReading.gust_ms ? ` (${topReading.gust_ms})` : ""}
                    </p>
                    {topReading.temp_c != null && (
                      <p className="text-white/40 text-xs">{topReading.temp_c}°C</p>
                    )}
                  </div>
                )}
                {valleyReading && (
                  <div className="flex flex-col gap-1">
                    <p className="text-white/30 text-xs uppercase tracking-wider">Dalen</p>
                    <p className="text-white text-sm">
                      {valleyReading.wind_ms ?? "—"} m/s
                      {valleyReading.gust_ms ? ` (${valleyReading.gust_ms})` : ""}
                    </p>
                    {valleyReading.temp_c != null && (
                      <p className="text-white/40 text-xs">{valleyReading.temp_c}°C</p>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Footer */}
            <div className="flex justify-between items-center mt-5 pt-4 border-t border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-white/30 text-xs">
                  MEAC Hummeln{skistar ? " + Skistar" : ""}
                </span>
              </div>
              <span className="text-white/20 text-xs font-mono">
                {meac?.time ?? ""}
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default WindWidget;
