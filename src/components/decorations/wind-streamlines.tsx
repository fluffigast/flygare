import React, { useMemo } from "react";

/**
 * WindStreamlines — animerade linjer som strömmar i vindens riktning.
 *
 * Rendrar N stiliserade "vind-strökar" som roterar till windDir och
 * animeras med olika hastigheter/delays för organisk känsla. Använd
 * som bakgrund i WindWidget för att visualisera vinden lekfullt.
 *
 * Speed styr både animation-duration och stroke-tjocklek.
 * Respekterar prefers-reduced-motion (byter till statiska streck).
 */
export const WindStreamlines: React.FC<{
  windDir: number;      // 0-360, "from" convention
  speedMs?: number;     // m/s — påverkar animation-hastighet
  className?: string;
  lines?: number;       // default 6
  opacity?: number;     // default 0.35
}> = ({ windDir, speedMs = 5, className, lines = 6, opacity = 0.35 }) => {
  // Konvertera "from" → "to" (dit vinden går)
  const toDeg = (windDir + 180) % 360;

  // Snabbare vind = kortare loop
  const baseDuration = Math.max(1.5, 6 - speedMs * 0.4);

  // Deterministiska seeds så samma props → samma layout
  const streams = useMemo(() => {
    return Array.from({ length: lines }).map((_, i) => {
      // Sprid stroke:arna över svg-ytan
      const y = 15 + (i * (90 / lines));
      const length = 20 + ((i * 37) % 25); // 20-45
      const duration = baseDuration + ((i * 13) % 10) * 0.15;
      const delay = -((i * 71) % 100) * (duration / 100);
      const strokeWidth = 0.6 + ((i * 3) % 5) * 0.15; // 0.6-1.3
      return { y, length, duration, delay, strokeWidth, key: `s${i}` };
    });
  }, [lines, baseDuration]);

  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden
      style={{ opacity }}
    >
      <defs>
        <style>{`
          @keyframes wind-flow {
            0%   { transform: translateX(-30px); opacity: 0; }
            15%  { opacity: 1; }
            85%  { opacity: 1; }
            100% { transform: translateX(130px); opacity: 0; }
          }
          .wind-stream {
            animation: wind-flow linear infinite;
          }
          @media (prefers-reduced-motion: reduce) {
            .wind-stream { animation: none; opacity: 0.5; }
          }
        `}</style>
      </defs>

      {/* Rotera hela strömfältet till vindens riktning */}
      <g transform={`rotate(${toDeg - 90} 50 50)`}>
        {streams.map((s) => (
          <line
            key={s.key}
            className="wind-stream"
            x1={0}
            y1={s.y}
            x2={s.length}
            y2={s.y}
            stroke="var(--hero-accent, #3774a3)"
            strokeWidth={s.strokeWidth}
            strokeLinecap="round"
            style={{
              animationDuration: `${s.duration}s`,
              animationDelay: `${s.delay}s`,
            }}
          />
        ))}
      </g>
    </svg>
  );
};

export default WindStreamlines;
