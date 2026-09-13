import React from "react";

/**
 * NewspaperScene — subtil line-art: vikt tidnings-sida med några
 * text-linjer och bild-block. Inga gradient/skuggor.
 */
export const NewspaperScene: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 240 180"
    preserveAspectRatio="xMidYMid meet"
    aria-hidden
  >
    <g stroke="var(--ink-2, #0f172b)" strokeLinecap="square">
      {/* Papper */}
      <rect x="20" y="15" width="200" height="150" fill="none" strokeWidth="1" />
      {/* Masthead */}
      <line x1="35" y1="35" x2="205" y2="35" strokeWidth="1.5" />
      <text x="120" y="30" textAnchor="middle" fontSize="9" fontWeight="900" fontFamily="serif" fill="var(--ink-2, #0f172b)" letterSpacing="1.5">
        ÅRE FLYGBLAD
      </text>
      {/* Text-linjer */}
      <g strokeWidth="0.5" opacity="0.5">
        <line x1="35" y1="50" x2="115" y2="50" />
        <line x1="35" y1="56" x2="110" y2="56" />
        <line x1="35" y1="62" x2="118" y2="62" />
        <line x1="35" y1="68" x2="100" y2="68" />
      </g>
      {/* Bild-block */}
      <rect x="130" y="45" width="75" height="45" fill="none" strokeWidth="0.7" opacity="0.65" />
      <line x1="130" y1="45" x2="205" y2="90" strokeWidth="0.4" opacity="0.4" />
      <line x1="205" y1="45" x2="130" y2="90" strokeWidth="0.4" opacity="0.4" />
      {/* Text-linjer nedanför */}
      <g strokeWidth="0.5" opacity="0.5">
        <line x1="35" y1="100" x2="205" y2="100" />
        <line x1="35" y1="106" x2="200" y2="106" />
        <line x1="35" y1="112" x2="205" y2="112" />
        <line x1="35" y1="118" x2="180" y2="118" />
        <line x1="35" y1="130" x2="205" y2="130" />
        <line x1="35" y1="136" x2="195" y2="136" />
        <line x1="35" y1="142" x2="205" y2="142" />
        <line x1="35" y1="148" x2="170" y2="148" />
      </g>
    </g>
  </svg>
);

export default NewspaperScene;
