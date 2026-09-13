import React from "react";

/**
 * PodiumScene — subtil line-art: podium med tre rutor + krans.
 */
export const PodiumScene: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 400 180"
    preserveAspectRatio="xMidYMid meet"
    aria-hidden
  >
    <g fill="none" stroke="var(--ink-2, #0f172b)" strokeWidth="1.2" strokeLinejoin="round">
      {/* 2nd */}
      <rect x="130" y="90" width="70" height="70" />
      {/* 1st (mitten, högst) */}
      <rect x="200" y="60" width="70" height="100" />
      {/* 3rd */}
      <rect x="270" y="110" width="70" height="50" />

      {/* Siffror */}
      <text x="235" y="130" textAnchor="middle" fontSize="34" fontWeight="900" fontFamily="serif" fill="var(--ink-2, #0f172b)" opacity="0.85">1</text>
      <text x="165" y="140" textAnchor="middle" fontSize="24" fontWeight="900" fontFamily="serif" fill="var(--ink-2, #0f172b)" opacity="0.75">2</text>
      <text x="305" y="147" textAnchor="middle" fontSize="20" fontWeight="900" fontFamily="serif" fill="var(--ink-2, #0f172b)" opacity="0.75">3</text>

      {/* Lagerkrans över 1:an */}
      <path d="M 210 55 Q 210 30, 235 25 Q 260 30, 260 55" strokeWidth="1" opacity="0.6" />
      <path d="M 218 45 Q 216 40, 220 37" strokeWidth="0.6" opacity="0.6" />
      <path d="M 252 45 Q 254 40, 250 37" strokeWidth="0.6" opacity="0.6" />
    </g>
  </svg>
);

export default PodiumScene;
