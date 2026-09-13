import React from "react";

/**
 * TshirtScene — placeholder-illustration för Klubbprodukter.
 *
 * En stiliserad tröja med klubbens logga (skärm-symbol) framtill.
 * Används tills riktigt foto av medlem-med-tröja finns.
 */
export const TshirtScene: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 300 340"
    preserveAspectRatio="xMidYMid meet"
    aria-hidden
  >
    <defs>
      <linearGradient id="ts-cloth" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#3774a3" />
        <stop offset="100%" stopColor="#1e40af" />
      </linearGradient>
      <linearGradient id="ts-shadow" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#000000" stopOpacity="0.15" />
        <stop offset="50%" stopColor="#000000" stopOpacity="0" />
        <stop offset="100%" stopColor="#000000" stopOpacity="0.15" />
      </linearGradient>
    </defs>

    {/* Tshirt body */}
    <path
      d="M 90 60
         L 55 70 L 30 100 L 55 145 L 80 130
         L 80 300 L 220 300 L 220 130 L 245 145 L 270 100 L 245 70 L 210 60
         L 190 65 Q 185 80, 150 82 Q 115 80, 110 65 Z"
      fill="url(#ts-cloth)"
      stroke="#0f172b"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />

    {/* Halskrage */}
    <path
      d="M 110 65 Q 115 80, 150 82 Q 185 80, 190 65 Q 175 55, 150 55 Q 125 55, 110 65 Z"
      fill="none"
      stroke="#0f172b"
      strokeWidth="1.5"
    />

    {/* Skugga på sidor */}
    <rect x="30" y="60" width="240" height="240" fill="url(#ts-shadow)" opacity="0.4" />

    {/* Klubb-logo: stiliserad skärmflygare centralt */}
    <g transform="translate(150, 190)">
      {/* Canopy */}
      <path
        d="M -40 0 Q -40 -22, 0 -26 Q 40 -22, 40 0"
        fill="none"
        stroke="#ffffff"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Cell-divider */}
      <path
        d="M -35 -4 Q -18 -22, 0 -24 Q 18 -22, 35 -4"
        fill="none"
        stroke="#ffffff"
        strokeWidth="1"
        opacity="0.7"
      />
      {/* Suspension lines */}
      <line x1="-30" y1="-2" x2="-6" y2="28" stroke="#ffffff" strokeWidth="1.2" />
      <line x1="-15" y1="-15" x2="-2" y2="28" stroke="#ffffff" strokeWidth="1.2" />
      <line x1="15" y1="-15" x2="2" y2="28" stroke="#ffffff" strokeWidth="1.2" />
      <line x1="30" y1="-2" x2="6" y2="28" stroke="#ffffff" strokeWidth="1.2" />
      {/* Pilot */}
      <circle cx="0" cy="32" r="4.5" fill="#ffffff" />
    </g>

    {/* Klubb-text under logo */}
    <text
      x="150"
      y="245"
      textAnchor="middle"
      fontSize="12"
      fontWeight="700"
      fontFamily="serif"
      fill="#ffffff"
      letterSpacing="2"
    >
      ÅSDFK
    </text>
    <text
      x="150"
      y="260"
      textAnchor="middle"
      fontSize="7"
      fontFamily="sans-serif"
      fill="#ffffff"
      opacity="0.75"
      letterSpacing="1.5"
    >
      SEDAN 1976
    </text>
  </svg>
);

export default TshirtScene;
