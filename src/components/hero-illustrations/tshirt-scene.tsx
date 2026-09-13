import React from "react";

/**
 * TshirtScene — subtil line-art: tröja med klubb-logga (skärm-symbol).
 */
export const TshirtScene: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 240 260"
    preserveAspectRatio="xMidYMid meet"
    aria-hidden
  >
    <g stroke="var(--ink-2, #0f172b)" fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* Tshirt-silhuett */}
      <path
        d="M 80 50
           L 55 60 L 35 85 L 55 120 L 75 108
           L 75 240 L 165 240 L 165 108 L 185 120 L 205 85 L 185 60 L 160 50
           L 145 55 Q 140 68, 120 70 Q 100 68, 95 55 Z"
        strokeWidth="1.4"
      />
      {/* Halskrage */}
      <path d="M 95 55 Q 100 68, 120 70 Q 140 68, 145 55" strokeWidth="1.4" />

      {/* Skärm-logga central */}
      <g transform="translate(120, 155)" strokeWidth="1.4">
        <path d="M -28 0 Q -28 -16, 0 -18 Q 28 -16, 28 0" />
        <line x1="-22" y1="-2" x2="-4" y2="20" strokeWidth="0.8" />
        <line x1="-11" y1="-11" x2="-1" y2="20" strokeWidth="0.8" />
        <line x1="11" y1="-11" x2="1" y2="20" strokeWidth="0.8" />
        <line x1="22" y1="-2" x2="4" y2="20" strokeWidth="0.8" />
        <circle cx="0" cy="23" r="3" fill="var(--ink-2, #0f172b)" />
      </g>

      {/* Text under logga */}
      <text x="120" y="205" textAnchor="middle" fontSize="9" fontWeight="700" fontFamily="serif" fill="var(--ink-2, #0f172b)" stroke="none" letterSpacing="2">
        ÅSDFK
      </text>
      <text x="120" y="216" textAnchor="middle" fontSize="6" fontFamily="sans-serif" fill="var(--ink-2, #0f172b)" stroke="none" opacity="0.65" letterSpacing="1.2">
        SEDAN 1976
      </text>
    </g>
  </svg>
);

export default TshirtScene;
