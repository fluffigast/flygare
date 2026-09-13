import React from "react";

/**
 * CompassRoseWatermark — stor kompassros som subtil dekoration.
 *
 * Används i tävlings/väder-relaterade sidor. Sitter absolut, roterar
 * VÄLDIGT långsamt (60s per varv) med respekt för prefers-reduced-motion.
 */
export const CompassRoseWatermark: React.FC<{
  className?: string;
  opacity?: number;
  animate?: boolean;
}> = ({ className, opacity = 0.07, animate = false }) => (
  <svg
    className={className}
    viewBox="0 0 400 400"
    preserveAspectRatio="xMidYMid meet"
    aria-hidden
    style={{ opacity }}
  >
    <defs>
      <style>
        {animate
          ? `
          .rose-spin {
            transform-origin: 200px 200px;
            animation: rose-spin 120s linear infinite;
          }
          @keyframes rose-spin {
            from { transform: rotate(0deg); }
            to   { transform: rotate(360deg); }
          }
          @media (prefers-reduced-motion: reduce) {
            .rose-spin { animation: none; }
          }
        `
          : ""}
      </style>
    </defs>

    <g className={animate ? "rose-spin" : undefined}>
      {/* Ytterring */}
      <circle
        cx="200"
        cy="200"
        r="180"
        fill="none"
        stroke="var(--ink-2, #0f172b)"
        strokeWidth="0.6"
      />
      <circle
        cx="200"
        cy="200"
        r="160"
        fill="none"
        stroke="var(--slate-3, #45556c)"
        strokeWidth="0.4"
      />
      <circle
        cx="200"
        cy="200"
        r="90"
        fill="none"
        stroke="var(--slate-3, #45556c)"
        strokeWidth="0.4"
      />

      {/* Kompassros-stjärna — 16 punkter (cardinal + intercardinal + halva) */}
      {Array.from({ length: 32 }).map((_, i) => {
        const deg = (i * 360) / 32;
        const rad = (deg - 90) * (Math.PI / 180);
        const isMajor = i % 4 === 0;
        const r1 = 90;
        const r2 = isMajor ? 175 : i % 2 === 0 ? 145 : 115;
        const x1 = 200 + r1 * Math.cos(rad);
        const y1 = 200 + r1 * Math.sin(rad);
        const x2 = 200 + r2 * Math.cos(rad);
        const y2 = 200 + r2 * Math.sin(rad);
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={isMajor ? "var(--ink-2, #0f172b)" : "var(--slate-3, #45556c)"}
            strokeWidth={isMajor ? 0.7 : 0.4}
            strokeLinecap="round"
          />
        );
      })}

      {/* Kardinal-labels inuti */}
      {[
        { t: "N", x: 200, y: 40 },
        { t: "E", x: 360, y: 200 },
        { t: "S", x: 200, y: 360 },
        { t: "W", x: 40, y: 200 },
      ].map(({ t, x, y }) => (
        <text
          key={t}
          x={x}
          y={y}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="22"
          fontWeight="700"
          fontFamily="serif"
          fill="var(--ink-2, #0f172b)"
          opacity="0.5"
        >
          {t}
        </text>
      ))}
    </g>
  </svg>
);

export default CompassRoseWatermark;
