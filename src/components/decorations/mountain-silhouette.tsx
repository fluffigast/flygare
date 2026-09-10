import React from "react";

/**
 * MountainSilhouette — stor subtil bergssilhuett med parallax-drift.
 *
 * Fem lager (bakgrund → förgrund) med olika drift-hastigheter så det
 * blir ett långsamt parallax-flyt. Respekterar prefers-reduced-motion.
 *
 * Djupsortering:
 *   1. Moln (opacity 0.05, drift 180s)
 *   2. Fjärran fjäll (opacity 0.06, drift 240s)
 *   3. Mellanfjäll — Åreskutan-topp (opacity 0.10, drift 300s)
 *   4. Främre kullar (opacity 0.14, drift 360s)
 *   5. Sol / måne (svag pulserande cirkel, 8s)
 */
export const MountainSilhouette: React.FC<{ className?: string; animate?: boolean }> = ({
  className,
  animate = true,
}) => (
  <svg
    className={className}
    viewBox="0 0 1200 400"
    preserveAspectRatio="xMidYMax slice"
    aria-hidden
  >
    <defs>
      {animate && (
        <style>{`
          @keyframes mtn-drift-far {
            0%   { transform: translateX(0); }
            50%  { transform: translateX(-24px); }
            100% { transform: translateX(0); }
          }
          @keyframes mtn-drift-mid {
            0%   { transform: translateX(0); }
            50%  { transform: translateX(-14px); }
            100% { transform: translateX(0); }
          }
          @keyframes mtn-drift-near {
            0%   { transform: translateX(0); }
            50%  { transform: translateX(-8px); }
            100% { transform: translateX(0); }
          }
          @keyframes mtn-cloud-drift {
            0%   { transform: translateX(-60px); opacity: 0.03; }
            50%  { opacity: 0.06; }
            100% { transform: translateX(60px); opacity: 0.03; }
          }
          @keyframes mtn-sun-pulse {
            0%, 100% { r: 22; opacity: 0.08; }
            50%      { r: 24; opacity: 0.11; }
          }
          .mtn-far   { animation: mtn-drift-far 240s ease-in-out infinite; transform-origin: center; }
          .mtn-mid   { animation: mtn-drift-mid 300s ease-in-out infinite; transform-origin: center; }
          .mtn-near  { animation: mtn-drift-near 360s ease-in-out infinite; transform-origin: center; }
          .mtn-cloud-1 { animation: mtn-cloud-drift 180s linear infinite; }
          .mtn-cloud-2 { animation: mtn-cloud-drift 220s linear infinite; animation-delay: -70s; }
          .mtn-cloud-3 { animation: mtn-cloud-drift 260s linear infinite; animation-delay: -140s; }
          .mtn-sun    { animation: mtn-sun-pulse 8s ease-in-out infinite; transform-origin: center; }

          /* Skärmflygare 1 — driftar från vänster till höger, långsamt ner */
          @keyframes glider-1 {
            0%   { transform: translate(-40px, 10px); opacity: 0; }
            8%   { opacity: 0.5; }
            50%  { opacity: 0.5; }
            92%  { opacity: 0.5; }
            100% { transform: translate(1240px, 60px); opacity: 0; }
          }
          @keyframes glider-2 {
            0%   { transform: translate(-40px, 0); opacity: 0; }
            10%  { opacity: 0.35; }
            50%  { opacity: 0.35; }
            90%  { opacity: 0.35; }
            100% { transform: translate(1240px, -20px); opacity: 0; }
          }
          .mtn-glider-1 { animation: glider-1 90s linear infinite; }
          .mtn-glider-2 { animation: glider-2 140s linear infinite; animation-delay: -45s; }

          /* Fågelflock — snabbare, mindre */
          @keyframes bird-flock {
            0%   { transform: translate(-30px, 0); opacity: 0; }
            15%  { opacity: 0.45; }
            85%  { opacity: 0.45; }
            100% { transform: translate(1230px, -15px); opacity: 0; }
          }
          .mtn-birds { animation: bird-flock 60s linear infinite; animation-delay: -20s; }

          /* Fågel-vingar flap */
          @keyframes flap {
            0%, 100% { transform: scaleY(1); }
            50%      { transform: scaleY(0.6); }
          }
          .mtn-bird path { animation: flap 0.9s ease-in-out infinite; transform-origin: center; transform-box: fill-box; }

          @media (prefers-reduced-motion: reduce) {
            .mtn-far, .mtn-mid, .mtn-near, .mtn-cloud-1, .mtn-cloud-2, .mtn-cloud-3, .mtn-sun,
            .mtn-glider-1, .mtn-glider-2, .mtn-birds, .mtn-bird path { animation: none; }
          }
        `}</style>
      )}

      <linearGradient id="mtn-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="var(--hero-accent, #3774a3)" stopOpacity="0.03" />
        <stop offset="100%" stopColor="var(--hero-accent, #3774a3)" stopOpacity="0" />
      </linearGradient>
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
      <radialGradient id="mtn-sun-grad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.35" />
        <stop offset="70%" stopColor="#fbbf24" stopOpacity="0.08" />
        <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
      </radialGradient>
    </defs>

    {/* Sky-tint över hela */}
    <rect x="0" y="0" width="1200" height="200" fill="url(#mtn-sky)" />

    {/* Sol/måne — mjuk cirkel med pulse */}
    <circle
      cx="880"
      cy="90"
      r="22"
      fill="url(#mtn-sun-grad)"
      className="mtn-sun"
    />

    {/* Moln — tre lager på olika höjder driftar horisontellt */}
    <g fill="var(--slate-2, #90a1b9)" fillOpacity="0.05" className="mtn-cloud-1">
      <ellipse cx="200" cy="70" rx="45" ry="8" />
      <ellipse cx="230" cy="72" rx="30" ry="6" />
    </g>
    <g fill="var(--slate-2, #90a1b9)" fillOpacity="0.04" className="mtn-cloud-2">
      <ellipse cx="600" cy="55" rx="60" ry="10" />
      <ellipse cx="640" cy="60" rx="35" ry="7" />
    </g>
    <g fill="var(--slate-2, #90a1b9)" fillOpacity="0.05" className="mtn-cloud-3">
      <ellipse cx="1000" cy="80" rx="50" ry="9" />
      <ellipse cx="960" cy="83" rx="28" ry="6" />
    </g>

    {/* Fjärran fjäll */}
    <g className="mtn-far">
      <path
        d="M0,280 L60,260 L130,240 L200,265 L280,220 L360,250 L440,210 L520,240 L600,215 L680,235 L760,205 L840,230 L920,220 L1000,245 L1080,225 L1160,250 L1200,235 L1200,400 L0,400 Z"
        fill="url(#mtn-far)"
      />
    </g>

    {/* Mellanfjäll (Åreskutan-topp runt center) */}
    <g className="mtn-mid">
      <path
        d="M0,340 L80,320 L160,290 L240,270 L320,240 L400,200 L460,170 L510,140 L560,110 L610,90 L660,110 L720,145 L780,180 L850,210 L920,235 L1000,250 L1080,275 L1160,290 L1200,295 L1200,400 L0,400 Z"
        fill="url(#mtn-mid)"
      />
      {/* Snötäckt topp-highlight */}
      <path
        d="M540,130 L560,110 L580,120 L610,90 L640,105 L660,110 L680,125 L610,140 Z"
        fill="#ffffff"
        fillOpacity="0.15"
      />
    </g>

    {/* Främre kullar */}
    <g className="mtn-near">
      <path
        d="M0,370 L100,360 L200,345 L300,335 L400,325 L500,315 L600,310 L700,315 L800,325 L900,335 L1000,350 L1100,365 L1200,375 L1200,400 L0,400 Z"
        fill="url(#mtn-near)"
      />
    </g>

    {/* ─── Lekfulla element som driftar över scenen ─── */}

    {/* Skärmflygare 1 — startar på hög höjd, driftar långsamt ner */}
    <g className="mtn-glider-1">
      <g transform="translate(0, 100) scale(0.7)">
        {/* Canopy */}
        <path
          d="M -14 0 Q -14 -7, 0 -8 Q 14 -7, 14 0"
          fill="none"
          stroke="var(--ink-2, #0f172b)"
          strokeWidth="1.4"
          strokeLinecap="round"
          opacity="0.7"
        />
        {/* Lines */}
        <line x1="-11" y1="-1" x2="-3" y2="9" stroke="var(--slate-3, #45556c)" strokeWidth="0.4" opacity="0.7" />
        <line x1="-5" y1="-5" x2="-1" y2="9" stroke="var(--slate-3, #45556c)" strokeWidth="0.4" opacity="0.7" />
        <line x1="5" y1="-5" x2="1" y2="9" stroke="var(--slate-3, #45556c)" strokeWidth="0.4" opacity="0.7" />
        <line x1="11" y1="-1" x2="3" y2="9" stroke="var(--slate-3, #45556c)" strokeWidth="0.4" opacity="0.7" />
        {/* Pilot */}
        <circle cx="0" cy="11" r="1.6" fill="var(--ink-2, #0f172b)" opacity="0.8" />
      </g>
    </g>

    {/* Skärmflygare 2 — lite lägre, mindre, motsatt fas */}
    <g className="mtn-glider-2">
      <g transform="translate(0, 160) scale(0.55)">
        <path
          d="M -14 0 Q -14 -7, 0 -8 Q 14 -7, 14 0"
          fill="none"
          stroke="var(--hero-accent, #3774a3)"
          strokeWidth="1.4"
          strokeLinecap="round"
          opacity="0.6"
        />
        <line x1="-11" y1="-1" x2="-3" y2="9" stroke="var(--slate-3, #45556c)" strokeWidth="0.4" opacity="0.5" />
        <line x1="-5" y1="-5" x2="-1" y2="9" stroke="var(--slate-3, #45556c)" strokeWidth="0.4" opacity="0.5" />
        <line x1="5" y1="-5" x2="1" y2="9" stroke="var(--slate-3, #45556c)" strokeWidth="0.4" opacity="0.5" />
        <line x1="11" y1="-1" x2="3" y2="9" stroke="var(--slate-3, #45556c)" strokeWidth="0.4" opacity="0.5" />
        <circle cx="0" cy="11" r="1.4" fill="var(--hero-accent, #3774a3)" opacity="0.7" />
      </g>
    </g>

    {/* Fågelflock — 5 fåglar i V-formation, vingar flappar */}
    <g className="mtn-birds">
      <g className="mtn-bird" fill="none" stroke="var(--ink-2, #0f172b)" strokeWidth="0.8" strokeLinecap="round" opacity="0.55">
        {/* V-formation, leader först */}
        <path d="M 150 130 q 3 -3 6 0 q 3 -3 6 0" />
        <path d="M 138 138 q 2.5 -2.5 5 0 q 2.5 -2.5 5 0" />
        <path d="M 160 138 q 2.5 -2.5 5 0 q 2.5 -2.5 5 0" />
        <path d="M 128 145 q 2.2 -2.2 4.5 0 q 2.2 -2.2 4.5 0" />
        <path d="M 170 145 q 2.2 -2.2 4.5 0 q 2.2 -2.2 4.5 0" />
      </g>
    </g>
  </svg>
);

export default MountainSilhouette;
