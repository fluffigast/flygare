import React from "react";

/**
 * CalendarScene — subtil line-art: en kalender med ringad datum.
 */
export const CalendarScene: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 200 200"
    preserveAspectRatio="xMidYMid meet"
    aria-hidden
  >
    <g stroke="var(--ink-2, #0f172b)" fill="none" strokeLinecap="round">
      {/* Ring-fästen upptill */}
      <line x1="60" y1="20" x2="60" y2="35" strokeWidth="1.4" />
      <line x1="140" y1="20" x2="140" y2="35" strokeWidth="1.4" />

      {/* Kalender-blad */}
      <rect x="30" y="30" width="140" height="140" strokeWidth="1.2" />
      {/* Header-band */}
      <line x1="30" y1="55" x2="170" y2="55" strokeWidth="1" />
      <text x="100" y="49" textAnchor="middle" fontSize="10" fontWeight="700" fontFamily="serif" fill="var(--ink-2, #0f172b)" letterSpacing="2">
        JUL
      </text>

      {/* Grid */}
      <g strokeWidth="0.4" opacity="0.5">
        {Array.from({ length: 4 }).map((_, i) => (
          <line key={`h${i}`} x1="30" y1={80 + i * 22} x2="170" y2={80 + i * 22} />
        ))}
        {Array.from({ length: 6 }).map((_, i) => (
          <line key={`v${i}`} x1={30 + i * 23} y1="55" x2={30 + i * 23} y2="170" />
        ))}
      </g>

      {/* Datumsiffror (fade) */}
      <g fill="var(--ink-2, #0f172b)" opacity="0.5" fontSize="8" fontFamily="sans-serif" stroke="none">
        {Array.from({ length: 24 }).map((_, i) => {
          const row = Math.floor(i / 6);
          const col = i % 6;
          const x = 37 + col * 23;
          const y = 74 + row * 22;
          return <text key={i} x={x} y={y}>{i + 1}</text>;
        })}
      </g>

      {/* Ring kring event-datum */}
      <circle cx="105" cy="93" r="10" strokeWidth="1.4" />
      <text x="105" y="96" textAnchor="middle" fontSize="9" fontWeight="700" fill="var(--ink-2, #0f172b)" fontFamily="sans-serif" stroke="none">
        18
      </text>
    </g>
  </svg>
);

export default CalendarScene;
