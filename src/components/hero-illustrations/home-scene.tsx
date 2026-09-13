import React from "react";

/**
 * HomeScene — större synlig hero-illustration för startsidan.
 *
 * Scenen visar Åreskutan-silhuett med två skärmflygare som glider ner
 * mot Åresjön, sol/moln över himlen. Färger är avskalade och matchar
 * design-tokens (accent-blå + slate-mörka) så det känns cohesivt.
 *
 * Opacitet ~0.28-0.35 — synligt utan att tävla med huvudinnehållet.
 */
export const HomeScene: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 1200 400"
    preserveAspectRatio="xMidYMid slice"
    aria-hidden
  >
    <defs>
      <style>{`
        @keyframes hs-glide {
          0%,100% { transform: translate(0,0); }
          50%     { transform: translate(-12px,6px); }
        }
        @keyframes hs-sun {
          0%,100% { opacity: .5; }
          50%     { opacity: .75; }
        }
        @keyframes hs-cloud {
          0%   { transform: translateX(-40px); }
          100% { transform: translateX(60px); }
        }
        .hs-g1 { animation: hs-glide 14s ease-in-out infinite; }
        .hs-g2 { animation: hs-glide 18s ease-in-out infinite; animation-delay:-6s; }
        .hs-sun { animation: hs-sun 6s ease-in-out infinite; transform-origin: center; }
        .hs-c1 { animation: hs-cloud 90s linear infinite; }
        .hs-c2 { animation: hs-cloud 110s linear infinite; animation-delay:-40s; }
        @media (prefers-reduced-motion: reduce) {
          .hs-g1,.hs-g2,.hs-sun,.hs-c1,.hs-c2 { animation: none; }
        }
      `}</style>

      <linearGradient id="hs-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#e8f1fa" />
        <stop offset="100%" stopColor="#f7fafc" />
      </linearGradient>
      <linearGradient id="hs-mtn-back" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#93a4b8" />
        <stop offset="100%" stopColor="#b7c5d5" />
      </linearGradient>
      <linearGradient id="hs-mtn-mid" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#5a6a80" />
        <stop offset="100%" stopColor="#7a8ba0" />
      </linearGradient>
      <linearGradient id="hs-mtn-front" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#2c3e50" />
        <stop offset="100%" stopColor="#3d5064" />
      </linearGradient>
      <linearGradient id="hs-water" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#3774a3" />
        <stop offset="100%" stopColor="#5a92c1" />
      </linearGradient>
    </defs>

    {/* Sky */}
    <rect x="0" y="0" width="1200" height="400" fill="url(#hs-sky)" />

    {/* Sun */}
    <g className="hs-sun">
      <circle cx="920" cy="90" r="34" fill="#fbbf24" opacity="0.35" />
      <circle cx="920" cy="90" r="22" fill="#fcd34d" opacity="0.6" />
      <circle cx="920" cy="90" r="14" fill="#fef3c7" />
    </g>

    {/* Clouds */}
    <g className="hs-c1" fill="#ffffff" opacity="0.85">
      <ellipse cx="200" cy="70" rx="55" ry="14" />
      <ellipse cx="235" cy="65" rx="35" ry="10" />
      <ellipse cx="175" cy="72" rx="28" ry="9" />
    </g>
    <g className="hs-c2" fill="#ffffff" opacity="0.75">
      <ellipse cx="620" cy="55" rx="65" ry="13" />
      <ellipse cx="670" cy="52" rx="38" ry="9" />
    </g>

    {/* Fjärran fjäll */}
    <path
      d="M0,240 L80,220 L160,195 L260,215 L340,180 L420,205 L500,175 L580,200 L660,170 L740,195 L820,175 L900,200 L1000,180 L1100,205 L1200,190 L1200,400 L0,400 Z"
      fill="url(#hs-mtn-back)"
      opacity="0.55"
    />

    {/* Mellanfjäll — Åreskutan-topp centralt */}
    <path
      d="M0,300 L100,270 L200,240 L280,215 L360,180 L440,140 L510,105 L560,80 L610,60 L670,80 L740,120 L820,155 L900,180 L1000,205 L1100,230 L1200,240 L1200,400 L0,400 Z"
      fill="url(#hs-mtn-mid)"
      opacity="0.75"
    />

    {/* Snötopp-highlight */}
    <path
      d="M540,110 L580,80 L610,60 L640,70 L670,80 L640,120 L590,130 Z"
      fill="#ffffff"
      opacity="0.55"
    />

    {/* Främre kullar */}
    <path
      d="M0,340 L100,320 L200,300 L320,285 L440,275 L560,270 L680,275 L800,285 L920,305 L1050,325 L1200,340 L1200,400 L0,400 Z"
      fill="url(#hs-mtn-front)"
      opacity="0.85"
    />

    {/* Vattenlinje (Åresjön) */}
    <rect x="0" y="345" width="1200" height="55" fill="url(#hs-water)" opacity="0.5" />
    {/* Vattenreflex */}
    <line x1="150" y1="365" x2="350" y2="365" stroke="#ffffff" strokeWidth="1" opacity="0.6" />
    <line x1="500" y1="372" x2="720" y2="372" stroke="#ffffff" strokeWidth="1" opacity="0.5" />
    <line x1="850" y1="368" x2="1050" y2="368" stroke="#ffffff" strokeWidth="1" opacity="0.55" />

    {/* Skärmflygare 1 — större, i förgrund */}
    <g className="hs-g1" transform="translate(400, 150)">
      {/* Canopy (större, bågformad) */}
      <path
        d="M -34 0 Q -34 -18, 0 -22 Q 34 -18, 34 0"
        fill="#3774a3"
        stroke="#0f172b"
        strokeWidth="1.6"
      />
      {/* Färgcell-linje på skärmen */}
      <path
        d="M -30 -4 Q -15 -18, 0 -20 Q 15 -18, 30 -4"
        fill="none"
        stroke="#ffffff"
        strokeWidth="0.8"
        opacity="0.55"
      />
      {/* Suspension lines */}
      <line x1="-26" y1="-3" x2="-6" y2="24" stroke="#0f172b" strokeWidth="0.8" />
      <line x1="-14" y1="-13" x2="-2" y2="24" stroke="#0f172b" strokeWidth="0.8" />
      <line x1="14" y1="-13" x2="2" y2="24" stroke="#0f172b" strokeWidth="0.8" />
      <line x1="26" y1="-3" x2="6" y2="24" stroke="#0f172b" strokeWidth="0.8" />
      {/* Pilot */}
      <ellipse cx="0" cy="26" rx="3.5" ry="4.2" fill="#0f172b" />
    </g>

    {/* Skärmflygare 2 — mindre, längre bort */}
    <g className="hs-g2" transform="translate(780, 210)">
      <path
        d="M -22 0 Q -22 -12, 0 -14 Q 22 -12, 22 0"
        fill="#0f172b"
        stroke="#0f172b"
        strokeWidth="1.4"
      />
      <path
        d="M -19 -3 Q -10 -12, 0 -13 Q 10 -12, 19 -3"
        fill="none"
        stroke="#ffffff"
        strokeWidth="0.7"
        opacity="0.5"
      />
      <line x1="-17" y1="-2" x2="-4" y2="16" stroke="#0f172b" strokeWidth="0.7" />
      <line x1="-9" y1="-8" x2="-1" y2="16" stroke="#0f172b" strokeWidth="0.7" />
      <line x1="9" y1="-8" x2="1" y2="16" stroke="#0f172b" strokeWidth="0.7" />
      <line x1="17" y1="-2" x2="4" y2="16" stroke="#0f172b" strokeWidth="0.7" />
      <ellipse cx="0" cy="18" rx="2.5" ry="3" fill="#0f172b" />
    </g>

    {/* Fågelsilhuetter */}
    <g fill="none" stroke="#0f172b" strokeWidth="1.4" strokeLinecap="round" opacity="0.7">
      <path d="M 150 130 q 4 -4 8 0 q 4 -4 8 0" />
      <path d="M 135 140 q 3 -3 6 0 q 3 -3 6 0" />
      <path d="M 175 138 q 3 -3 6 0 q 3 -3 6 0" />
    </g>
  </svg>
);

export default HomeScene;
