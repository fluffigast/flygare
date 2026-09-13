import React from "react";

/**
 * HomeScene — subtil line-art: horisontslinje över Åreskutan + en
 * skärmflygare. Inga gradients, inga animationer, en färg (ink).
 */
export const HomeScene: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 1200 200"
    preserveAspectRatio="xMidYMid meet"
    aria-hidden
  >
    <g fill="none" stroke="var(--ink-2, #0f172b)" strokeLinecap="round" strokeLinejoin="round">
      {/* Bergssilhuett — enkel monoline */}
      <path
        d="M 0 150 L 120 130 L 220 110 L 320 90 L 400 75 L 480 60 L 540 50 L 590 42 L 640 50 L 700 65 L 780 85 L 880 105 L 980 125 L 1080 140 L 1200 150"
        strokeWidth="1.2"
      />
      {/* Vattenlinje */}
      <line x1="0" y1="175" x2="1200" y2="175" strokeWidth="0.6" strokeDasharray="3 6" opacity="0.5" />

      {/* Skärmflygare */}
      <g transform="translate(750, 60)" strokeWidth="1.4">
        <path d="M -20 0 Q -20 -11, 0 -13 Q 20 -11, 20 0" />
        <line x1="-16" y1="-2" x2="-3" y2="15" strokeWidth="0.7" />
        <line x1="-8" y1="-9" x2="-1" y2="15" strokeWidth="0.7" />
        <line x1="8" y1="-9" x2="1" y2="15" strokeWidth="0.7" />
        <line x1="16" y1="-2" x2="3" y2="15" strokeWidth="0.7" />
        <circle cx="0" cy="17" r="2.2" fill="var(--ink-2, #0f172b)" />
      </g>
    </g>
  </svg>
);

export default HomeScene;
