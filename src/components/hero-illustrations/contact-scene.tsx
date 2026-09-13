import React from "react";

/**
 * ContactScene — hero för Kontakt. Karta med pin över Draklanda +
 * kuvert + kompassrose.
 */
export const ContactScene: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 500 300"
    preserveAspectRatio="xMidYMid meet"
    aria-hidden
  >
    <defs>
      <linearGradient id="ct-map" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#e6efd8" />
        <stop offset="100%" stopColor="#c9d9b3" />
      </linearGradient>
      <linearGradient id="ct-lake" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#7fb1d9" />
        <stop offset="100%" stopColor="#5a92c1" />
      </linearGradient>
      <filter id="ct-shadow" x="-10%" y="-10%" width="120%" height="120%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
        <feOffset dx="2" dy="4" />
        <feComponentTransfer><feFuncA type="linear" slope="0.3"/></feComponentTransfer>
        <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
    </defs>

    {/* Kartblad */}
    <g filter="url(#ct-shadow)">
      <rect x="40" y="30" width="380" height="240" fill="url(#ct-map)" stroke="#78716c" strokeWidth="0.8" rx="2" />

      {/* Åresjön */}
      <path
        d="M 90 170 Q 180 155, 260 165 Q 340 175, 380 190 L 380 240 L 90 240 Z"
        fill="url(#ct-lake)"
      />
      <text x="230" y="215" textAnchor="middle" fontSize="9" fontStyle="italic" fill="#0f4c81" fontFamily="serif" opacity="0.85">
        Åresjön
      </text>

      {/* Höjdkurvor */}
      <g fill="none" stroke="#a16207" strokeWidth="0.6" opacity="0.55">
        <ellipse cx="240" cy="110" rx="60" ry="25" />
        <ellipse cx="240" cy="110" rx="90" ry="40" />
        <ellipse cx="240" cy="110" rx="120" ry="55" />
      </g>
      <text x="240" y="113" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="#a16207" fontWeight="700">
        Åreskutan
      </text>

      {/* Väg */}
      <path
        d="M 60 205 Q 200 200, 320 195 T 400 190"
        fill="none"
        stroke="#78716c"
        strokeWidth="1.5"
        strokeDasharray="4 3"
      />

      {/* Rutnät (koordinater) */}
      <g stroke="#78716c" strokeWidth="0.3" opacity="0.4">
        {Array.from({ length: 6 }).map((_, i) => (
          <line key={`h${i}`} x1="40" y1={30 + i * 40} x2="420" y2={30 + i * 40} />
        ))}
        {Array.from({ length: 8 }).map((_, i) => (
          <line key={`v${i}`} x1={40 + i * 47} y1="30" x2={40 + i * 47} y2="270" />
        ))}
      </g>

      {/* Pin på Draklanda */}
      <g transform="translate(260, 195)">
        <path d="M 0 -25 C -8 -25, -14 -18, -14 -10 C -14 -2, 0 6, 0 6 C 0 6, 14 -2, 14 -10 C 14 -18, 8 -25, 0 -25 Z" fill="#dc2626" stroke="#7f1d1d" strokeWidth="0.8" />
        <circle cx="0" cy="-12" r="4" fill="#ffffff" />
        <text x="0" y="20" textAnchor="middle" fontSize="9" fontWeight="700" fill="#0f172b">
          Draklanda
        </text>
      </g>

      {/* Kompassros hörn */}
      <g transform="translate(370, 60)">
        <circle cx="0" cy="0" r="22" fill="#ffffff" opacity="0.85" stroke="#78716c" strokeWidth="0.5" />
        <polygon points="0,-18 -4,-2 0,-4 4,-2" fill="#0f172b" />
        <polygon points="0,18 -4,2 0,4 4,2" fill="#78716c" />
        <text x="0" y="-24" textAnchor="middle" fontSize="7" fontWeight="700" fill="#0f172b">N</text>
      </g>
    </g>

    {/* Kuvert på kartan */}
    <g transform="translate(80, 100) rotate(-8)" filter="url(#ct-shadow)">
      <rect x="0" y="0" width="70" height="45" fill="#ffffff" stroke="#0f172b" strokeWidth="0.8" />
      <polyline points="0,0 35,25 70,0" fill="none" stroke="#0f172b" strokeWidth="0.8" />
      <polyline points="0,45 25,25" fill="none" stroke="#0f172b" strokeWidth="0.4" opacity="0.5" />
      <polyline points="70,45 45,25" fill="none" stroke="#0f172b" strokeWidth="0.4" opacity="0.5" />
      {/* Frimärke */}
      <rect x="52" y="5" width="12" height="12" fill="#dc2626" opacity="0.85" />
      <text x="58" y="14" textAnchor="middle" fontSize="6" fontWeight="700" fill="#ffffff">SE</text>
    </g>
  </svg>
);

export default ContactScene;
