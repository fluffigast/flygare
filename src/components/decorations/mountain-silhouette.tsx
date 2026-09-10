import React from "react";

/**
 * MountainSilhouette — stor subtil bergssilhuett med tre lager djup.
 * Sitter absolut-positionerad bakom sidhuvud/hero med låg opacitet.
 *
 * Tre lager (bakgrund → förgrund):
 *   1. Fjärran fjäll (opacity 0.06, ljus slate)
 *   2. Mellanfjäll (opacity 0.10, medium slate)
 *   3. Främre kullar (opacity 0.14, mörk ink-ton)
 *
 * Silhuetten är stylerad efter Åreskutans ridge-linje.
 */
export const MountainSilhouette: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 1200 400"
    preserveAspectRatio="xMidYMax slice"
    aria-hidden
  >
    <defs>
      <linearGradient id="mtn-far" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="var(--slate-2, #90a1b9)" stopOpacity="0.06" />
        <stop offset="100%" stopColor="var(--slate-2, #90a1b9)" stopOpacity="0.02" />
      </linearGradient>
      <linearGradient id="mtn-mid" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="var(--slate-3, #45556c)" stopOpacity="0.10" />
        <stop offset="100%" stopColor="var(--slate-3, #45556c)" stopOpacity="0.04" />
      </linearGradient>
      <linearGradient id="mtn-near" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="var(--ink-2, #0f172b)" stopOpacity="0.14" />
        <stop offset="100%" stopColor="var(--ink-2, #0f172b)" stopOpacity="0.06" />
      </linearGradient>
    </defs>

    {/* Fjärran fjäll */}
    <path
      d="M0,280 L60,260 L130,240 L200,265 L280,220 L360,250 L440,210 L520,240 L600,215 L680,235 L760,205 L840,230 L920,220 L1000,245 L1080,225 L1160,250 L1200,235 L1200,400 L0,400 Z"
      fill="url(#mtn-far)"
    />

    {/* Mellanfjäll (Åreskutan-inspirerad topp runt center) */}
    <path
      d="M0,340 L80,320 L160,290 L240,270 L320,240 L400,200 L460,170 L510,140 L560,110 L610,90 L660,110 L720,145 L780,180 L850,210 L920,235 L1000,250 L1080,275 L1160,290 L1200,295 L1200,400 L0,400 Z"
      fill="url(#mtn-mid)"
    />

    {/* Främre kullar */}
    <path
      d="M0,370 L100,360 L200,345 L300,335 L400,325 L500,315 L600,310 L700,315 L800,325 L900,335 L1000,350 L1100,365 L1200,375 L1200,400 L0,400 Z"
      fill="url(#mtn-near)"
    />
  </svg>
);

export default MountainSilhouette;
