import React from "react";

/**
 * AirNavScene — subtil line-art: höjdkurvor + enkel kompass-rose.
 * Kartblad-referens utan färg eller animation.
 */
export const AirNavScene: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 1200 180"
    preserveAspectRatio="xMidYMid meet"
    aria-hidden
  >
    <g fill="none" stroke="var(--ink-2, #0f172b)" strokeWidth="0.8" opacity="0.7">
      {/* Höjdkurvor (2 peaks) */}
      <ellipse cx="500" cy="100" rx="60" ry="24" />
      <ellipse cx="500" cy="100" rx="110" ry="45" />
      <ellipse cx="500" cy="100" rx="170" ry="70" />
      <ellipse cx="500" cy="100" rx="240" ry="95" />
      <ellipse cx="820" cy="115" rx="45" ry="20" />
      <ellipse cx="820" cy="115" rx="85" ry="38" />
      <ellipse cx="820" cy="115" rx="130" ry="55" />
    </g>

    {/* Kompassrose till höger */}
    <g transform="translate(1080, 90)" fill="none" stroke="var(--ink-2, #0f172b)">
      <circle cx="0" cy="0" r="40" strokeWidth="0.8" opacity="0.7" />
      <circle cx="0" cy="0" r="22" strokeWidth="0.5" opacity="0.5" />
      {Array.from({ length: 8 }).map((_, i) => {
        const deg = i * 45;
        const rad = ((deg - 90) * Math.PI) / 180;
        return (
          <line
            key={i}
            x1={22 * Math.cos(rad)}
            y1={22 * Math.sin(rad)}
            x2={38 * Math.cos(rad)}
            y2={38 * Math.sin(rad)}
            strokeWidth={i % 2 === 0 ? 1 : 0.5}
            opacity={i % 2 === 0 ? 0.85 : 0.5}
          />
        );
      })}
      <text x="0" y="-45" textAnchor="middle" fontSize="10" fontWeight="700" fill="var(--ink-2, #0f172b)">N</text>
    </g>
  </svg>
);

export default AirNavScene;
