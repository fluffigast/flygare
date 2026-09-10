import React from "react";

/**
 * ParaglidingArc — subtil flightpath-båge med skärm-symbol.
 *
 * Uses:
 *   - Bakgrundsdekoration bakom page-headers på flygrelaterade sidor
 *   - Ligger absolut, låg opacitet, respekterar reduced-motion
 *
 * Konceptuellt: en flykt över Åreskutan — start uppe till vänster (hög
 * höjd), svepande båge ner mot Draklanda (bottnen till höger).
 */
export const ParaglidingArc: React.FC<{
  className?: string;
  /** 0-1, default 0.08 för subtil watermark-känsla */
  opacity?: number;
}> = ({ className, opacity = 0.08 }) => (
  <svg
    className={className}
    viewBox="0 0 1200 300"
    preserveAspectRatio="xMidYMid slice"
    aria-hidden
    style={{ opacity }}
  >
    <defs>
      {/* Flightpath-stroke går från transparent till accent till transparent */}
      <linearGradient id="path-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="var(--hero-accent, #3774a3)" stopOpacity="0" />
        <stop offset="20%" stopColor="var(--hero-accent, #3774a3)" stopOpacity="0.8" />
        <stop offset="70%" stopColor="var(--ink-2, #0f172b)" stopOpacity="0.9" />
        <stop offset="100%" stopColor="var(--ink-2, #0f172b)" stopOpacity="0" />
      </linearGradient>
    </defs>

    {/* Flightpath — Bézier ner-och-höger */}
    <path
      d="M 60 90 C 250 60, 500 150, 750 180 S 1080 230, 1160 260"
      fill="none"
      stroke="url(#path-grad)"
      strokeWidth="1.5"
      strokeDasharray="6 4"
      strokeLinecap="round"
    />

    {/* Sekundär tunn båge (paralell shadow-linje) */}
    <path
      d="M 60 100 C 250 70, 500 160, 750 190 S 1080 240, 1160 270"
      fill="none"
      stroke="var(--slate-2, #90a1b9)"
      strokeWidth="0.6"
      strokeOpacity="0.5"
      strokeDasharray="2 4"
      strokeLinecap="round"
    />

    {/* Skärm-symbol vid ~75% längs bågen */}
    <g transform="translate(850, 195) rotate(8)">
      {/* Skärm-canopy (bågformad ellips) */}
      <path
        d="M -18 0 Q -18 -8, 0 -10 Q 18 -8, 18 0"
        fill="none"
        stroke="var(--ink-2, #0f172b)"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      {/* Suspension lines */}
      <line x1="-14" y1="-2" x2="-4" y2="10" stroke="var(--slate-3, #45556c)" strokeWidth="0.5" />
      <line x1="-7" y1="-6" x2="-2" y2="10" stroke="var(--slate-3, #45556c)" strokeWidth="0.5" />
      <line x1="7" y1="-6" x2="2" y2="10" stroke="var(--slate-3, #45556c)" strokeWidth="0.5" />
      <line x1="14" y1="-2" x2="4" y2="10" stroke="var(--slate-3, #45556c)" strokeWidth="0.5" />
      {/* Pilot */}
      <circle cx="0" cy="12" r="1.8" fill="var(--ink-2, #0f172b)" />
    </g>

    {/* Start-punkt markör (uppe vänster) */}
    <circle cx="60" cy="90" r="2.5" fill="var(--hero-accent, #3774a3)" opacity="0.7" />
    <circle cx="60" cy="90" r="5" fill="none" stroke="var(--hero-accent, #3774a3)" strokeWidth="0.4" opacity="0.4" />

    {/* Landnings-punkt markör (nere höger) */}
    <circle cx="1160" cy="260" r="2.5" fill="var(--ink-2, #0f172b)" opacity="0.6" />
    <rect
      x="1148"
      y="248"
      width="24"
      height="24"
      fill="none"
      stroke="var(--ink-2, #0f172b)"
      strokeWidth="0.4"
      opacity="0.3"
    />
  </svg>
);

export default ParaglidingArc;
