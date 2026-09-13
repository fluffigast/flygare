import React from "react";

/**
 * CalendarScene — hero för Aktiviteter/Kalender.
 * Stack av kalenderblad + pilotdatum-markeringar.
 */
export const CalendarScene: React.FC<{ className?: string; monthLabel?: string }> = ({
  className,
  monthLabel = "JUL",
}) => (
  <svg
    className={className}
    viewBox="0 0 400 320"
    preserveAspectRatio="xMidYMid meet"
    aria-hidden
  >
    <defs>
      <linearGradient id="cs-paper" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="100%" stopColor="#f5f7fa" />
      </linearGradient>
      <filter id="cs-shadow" x="-10%" y="-10%" width="120%" height="120%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
        <feOffset dx="2" dy="4" />
        <feComponentTransfer><feFuncA type="linear" slope="0.3"/></feComponentTransfer>
        <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
    </defs>

    {/* Bakre kalenderblad */}
    <g transform="rotate(-6 200 160)" filter="url(#cs-shadow)">
      <rect x="60" y="50" width="240" height="220" fill="url(#cs-paper)" stroke="#94a3b8" strokeWidth="0.5" rx="4" />
      <rect x="60" y="50" width="240" height="42" fill="#3774a3" rx="4" />
      <text x="180" y="78" textAnchor="middle" fontFamily="serif" fontWeight="900" fontSize="18" fill="#ffffff" letterSpacing="2">
        {monthLabel}
      </text>
      {/* Grid dashed */}
      <g stroke="#cbd5e1" strokeWidth="0.5" opacity="0.7">
        {Array.from({ length: 4 }).map((_, i) => (
          <line key={`h${i}`} x1="70" y1={110 + i * 40} x2="290" y2={110 + i * 40} />
        ))}
        {Array.from({ length: 6 }).map((_, i) => (
          <line key={`v${i}`} x1={70 + i * 40} y1="105" x2={70 + i * 40} y2="260" />
        ))}
      </g>
      {/* Datum-siffror (fade grid) */}
      <g fill="#64748b" fontSize="10" fontFamily="sans-serif" opacity="0.7">
        {Array.from({ length: 28 }).map((_, i) => {
          const row = Math.floor(i / 7);
          const col = i % 7;
          const x = 80 + col * 33;
          const y = 122 + row * 40;
          return <text key={i} x={x} y={y}>{i + 1}</text>;
        })}
      </g>
      {/* Markerade event-datum */}
      <circle cx="140" cy="158" r="12" fill="#3774a3" opacity="0.85" />
      <text x="140" y="162" textAnchor="middle" fontSize="10" fontWeight="700" fill="#ffffff">18</text>
      <circle cx="173" cy="158" r="12" fill="#dc2626" opacity="0.85" />
      <text x="173" y="162" textAnchor="middle" fontSize="10" fontWeight="700" fill="#ffffff">19</text>
      <circle cx="240" cy="198" r="9" fill="#0f172b" opacity="0.6" />
      <text x="240" y="201" textAnchor="middle" fontSize="9" fontWeight="700" fill="#ffffff">26</text>
    </g>

    {/* Pin */}
    <g transform="translate(320, 30)">
      <circle cx="0" cy="0" r="12" fill="#dc2626" />
      <circle cx="0" cy="0" r="4" fill="#ffffff" />
      <line x1="0" y1="12" x2="0" y2="40" stroke="#7f1d1d" strokeWidth="1.2" />
    </g>

    {/* Skärm-symbol i hörnet */}
    <g transform="translate(50, 40) rotate(-15)">
      <path d="M -16 0 Q -16 -9, 0 -11 Q 16 -9, 16 0" fill="none" stroke="#3774a3" strokeWidth="1.4" />
      <line x1="-13" y1="-1" x2="-2" y2="10" stroke="#3774a3" strokeWidth="0.6" />
      <line x1="13" y1="-1" x2="2" y2="10" stroke="#3774a3" strokeWidth="0.6" />
      <circle cx="0" cy="12" r="2" fill="#3774a3" />
    </g>
  </svg>
);

export default CalendarScene;
