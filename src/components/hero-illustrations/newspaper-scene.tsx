import React from "react";

/**
 * NewspaperScene — visible hero för Nyheter. Vikt tidning + typografi.
 */
export const NewspaperScene: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 600 320"
    preserveAspectRatio="xMidYMid meet"
    aria-hidden
  >
    <defs>
      <linearGradient id="np-paper" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#fefbf3" />
        <stop offset="100%" stopColor="#f3ead4" />
      </linearGradient>
      <filter id="np-shadow" x="-10%" y="-10%" width="120%" height="120%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="4" />
        <feOffset dx="4" dy="6" result="shadow" />
        <feComponentTransfer><feFuncA type="linear" slope="0.35"/></feComponentTransfer>
        <feMerge>
          <feMergeNode />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    {/* Tidning bak — slight rotation */}
    <g transform="rotate(-8 300 160)" filter="url(#np-shadow)">
      <rect x="60" y="30" width="480" height="270" fill="url(#np-paper)" stroke="#8b7355" strokeWidth="0.5" />
      {/* Masthead */}
      <text x="80" y="65" fontFamily="serif" fontWeight="900" fontSize="24" fill="#0f172b" letterSpacing="1">
        ÅRE FLYGBLAD
      </text>
      <line x1="80" y1="72" x2="520" y2="72" stroke="#0f172b" strokeWidth="1.5" />
      <text x="80" y="86" fontFamily="serif" fontSize="9" fill="#8b7355">
        Klubbens nyheter · Senaste från Åreskutan
      </text>

      {/* Column 1 */}
      <g fill="#0f172b" opacity="0.7">
        <rect x="80" y="105" width="140" height="12" />
        <rect x="80" y="122" width="120" height="6" fill="#5a6a80" opacity="0.5" />
        <g fill="#5a6a80" opacity="0.35">
          {Array.from({ length: 12 }).map((_, i) => (
            <rect key={i} x="80" y={140 + i * 10} width={130 - (i % 3) * 6} height="2" />
          ))}
        </g>
      </g>

      {/* Column 2 */}
      <g fill="#0f172b" opacity="0.7">
        <rect x="230" y="105" width="140" height="12" />
        <rect x="230" y="122" width="110" height="6" fill="#5a6a80" opacity="0.5" />
        {/* Bild-block */}
        <rect x="230" y="140" width="140" height="70" fill="#3774a3" opacity="0.4" />
        <g fill="#5a6a80" opacity="0.35">
          {Array.from({ length: 6 }).map((_, i) => (
            <rect key={i} x="230" y={220 + i * 10} width={135 - (i % 3) * 8} height="2" />
          ))}
        </g>
      </g>

      {/* Column 3 */}
      <g fill="#0f172b" opacity="0.7">
        <rect x="380" y="105" width="140" height="12" />
        <rect x="380" y="122" width="130" height="6" fill="#5a6a80" opacity="0.5" />
        <g fill="#5a6a80" opacity="0.35">
          {Array.from({ length: 15 }).map((_, i) => (
            <rect key={i} x="380" y={140 + i * 10} width={135 - (i % 4) * 5} height="2" />
          ))}
        </g>
      </g>
    </g>

    {/* Bläck-pen ovan */}
    <g transform="translate(490, 60) rotate(30)">
      <rect x="0" y="0" width="60" height="6" fill="#0f172b" rx="1" />
      <polygon points="60,0 74,3 60,6" fill="#3774a3" />
      <rect x="0" y="0" width="8" height="6" fill="#dc2626" />
    </g>
  </svg>
);

export default NewspaperScene;
