import React, { useMemo } from "react";

/**
 * WindStreamlines — statiska stiliserade vind-linjer roterade till
 * windDir. Inga animationer (respekterar prefers-reduced-motion + user
 * feedback om för mycket "shader-arbete").
 */
export const WindStreamlines: React.FC<{
  windDir: number;
  speedMs?: number;
  className?: string;
  lines?: number;
  opacity?: number;
}> = ({ windDir, className, lines = 6, opacity = 0.14 }) => {
  const toDeg = (windDir + 180) % 360;

  const streams = useMemo(() => {
    return Array.from({ length: lines }).map((_, i) => {
      const y = 15 + (i * (90 / lines));
      const length = 20 + ((i * 37) % 25);
      const xStart = 10 + ((i * 11) % 40);
      const strokeWidth = 0.5 + ((i * 3) % 4) * 0.15;
      return { y, length, xStart, strokeWidth, key: `s${i}` };
    });
  }, [lines]);

  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden
      style={{ opacity }}
    >
      <g transform={`rotate(${toDeg - 90} 50 50)`}>
        {streams.map((s) => (
          <line
            key={s.key}
            x1={s.xStart}
            y1={s.y}
            x2={s.xStart + s.length}
            y2={s.y}
            stroke="var(--hero-accent, #3774a3)"
            strokeWidth={s.strokeWidth}
            strokeLinecap="round"
          />
        ))}
      </g>
    </svg>
  );
};

export default WindStreamlines;
