import React from "react";

/**
 * MountainSilhouette — subtil horisontlinje över tre bergslager.
 * Inga gradients, inga animationer, ingen sol/moln/glider.
 */
export const MountainSilhouette: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 1200 200"
    preserveAspectRatio="xMidYMax slice"
    aria-hidden
  >
    {/* Fjärran */}
    <path
      d="M0,130 L120,110 L230,90 L340,105 L440,80 L540,100 L640,75 L740,95 L840,80 L940,100 L1040,85 L1140,105 L1200,95 L1200,200 L0,200 Z"
      fill="var(--slate-2, #90a1b9)"
      opacity="0.10"
    />
    {/* Mitten (Åreskutan-topp) */}
    <path
      d="M0,170 L100,150 L200,130 L300,110 L400,85 L470,60 L530,45 L590,35 L650,50 L720,80 L800,105 L900,130 L1000,150 L1100,165 L1200,170 L1200,200 L0,200 Z"
      fill="var(--slate-3, #45556c)"
      opacity="0.14"
    />
    {/* Främre */}
    <path
      d="M0,185 L120,180 L240,175 L360,170 L480,168 L600,165 L720,168 L840,175 L960,180 L1080,185 L1200,188 L1200,200 L0,200 Z"
      fill="var(--ink-2, #0f172b)"
      opacity="0.16"
    />
  </svg>
);

export default MountainSilhouette;
