import React from "react";

/**
 * AirNavScene — visible hero-illustration för Flyga i Åre.
 *
 * Kart-blad-look: topografiska höjdkurvor + luftrumssektor +
 * kompassros + flightpath över scenen. Ger genast "det här handlar
 * om att navigera i luften"-känsla.
 */
export const AirNavScene: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 1200 300"
    preserveAspectRatio="xMidYMid slice"
    aria-hidden
  >
    <defs>
      <linearGradient id="an-paper" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#f5f0e6" />
        <stop offset="100%" stopColor="#eae2d0" />
      </linearGradient>
      <style>{`
        @keyframes an-plane {
          0%   { offset-distance: 0%; }
          100% { offset-distance: 100%; }
        }
        .an-plane {
          animation: an-plane 30s linear infinite;
          offset-path: path('M 60 100 C 250 60, 500 150, 750 180 S 1080 230, 1160 260');
          offset-rotate: auto;
        }
        @media (prefers-reduced-motion: reduce) {
          .an-plane { animation: none; offset-distance: 65%; }
        }
      `}</style>
    </defs>

    {/* Aeronautical-chart paper */}
    <rect x="0" y="0" width="1200" height="300" fill="url(#an-paper)" />

    {/* Topografiska höjdkurvor (tre peaks) */}
    <g fill="none" stroke="#8b7355" strokeWidth="1.2" opacity="0.5">
      <ellipse cx="600" cy="160" rx="80" ry="35" />
      <ellipse cx="600" cy="160" rx="140" ry="60" />
      <ellipse cx="600" cy="160" rx="210" ry="90" />
      <ellipse cx="600" cy="160" rx="290" ry="125" />
      <ellipse cx="600" cy="160" rx="380" ry="165" />
      <ellipse cx="600" cy="160" rx="480" ry="210" />
    </g>
    <g fill="none" stroke="#8b7355" strokeWidth="1" opacity="0.4">
      <ellipse cx="230" cy="230" rx="45" ry="22" />
      <ellipse cx="230" cy="230" rx="85" ry="42" />
      <ellipse cx="970" cy="220" rx="50" ry="25" />
      <ellipse cx="970" cy="220" rx="95" ry="48" />
    </g>

    {/* Höjd-labels */}
    <g fill="#8b7355" fontSize="10" fontFamily="monospace" opacity="0.65">
      <text x="600" y="163" textAnchor="middle" fontWeight="700">1420m</text>
      <text x="230" y="233" textAnchor="middle">920m</text>
      <text x="970" y="223" textAnchor="middle">840m</text>
    </g>

    {/* Luftrums-boundary (TMA-sektor) */}
    <path
      d="M 100 40 L 1100 40 L 1100 260 L 100 260 Z"
      fill="none"
      stroke="#3774a3"
      strokeWidth="1.5"
      strokeDasharray="8 4"
      opacity="0.55"
    />
    <text x="120" y="55" fill="#3774a3" fontSize="10" fontFamily="monospace" fontWeight="700" opacity="0.75">
      ESNZ TMA · FL 95
    </text>

    {/* Kompassros nere till vänster */}
    <g transform="translate(90, 90)">
      <circle cx="0" cy="0" r="42" fill="#ffffff" opacity="0.6" stroke="#8b7355" strokeWidth="0.8" />
      <circle cx="0" cy="0" r="26" fill="none" stroke="#8b7355" strokeWidth="0.5" opacity="0.6" />
      {/* Cardinal points */}
      {Array.from({ length: 16 }).map((_, i) => {
        const deg = i * 22.5;
        const rad = ((deg - 90) * Math.PI) / 180;
        const isMajor = i % 4 === 0;
        const r1 = 26;
        const r2 = isMajor ? 40 : 32;
        return (
          <line
            key={i}
            x1={r1 * Math.cos(rad)}
            y1={r1 * Math.sin(rad)}
            x2={r2 * Math.cos(rad)}
            y2={r2 * Math.sin(rad)}
            stroke="#0f172b"
            strokeWidth={isMajor ? 1.2 : 0.5}
            opacity={isMajor ? 0.8 : 0.5}
          />
        );
      })}
      <text x="0" y="-30" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0f172b">N</text>
      <polygon points="0,-38 -4,-25 0,-28 4,-25" fill="#3774a3" />
    </g>

    {/* Flightpath dashed */}
    <path
      d="M 60 100 C 250 60, 500 150, 750 180 S 1080 230, 1160 260"
      fill="none"
      stroke="#0f172b"
      strokeWidth="1.6"
      strokeDasharray="6 4"
      opacity="0.65"
    />

    {/* Waypoint-markörer */}
    <g fill="#3774a3" opacity="0.8">
      <circle cx="60" cy="100" r="4" />
      <circle cx="400" cy="105" r="3" />
      <circle cx="750" cy="180" r="3" />
      <circle cx="1160" cy="260" r="4" />
    </g>

    {/* Skärmflygare-symbol som glider längs pathen */}
    <g className="an-plane">
      <g transform="translate(-14, -8)">
        <path
          d="M -14 0 Q -14 -8, 0 -10 Q 14 -8, 14 0"
          fill="none"
          stroke="#0f172b"
          strokeWidth="1.6"
        />
        <line x1="-10" y1="-2" x2="-2" y2="8" stroke="#0f172b" strokeWidth="0.6" />
        <line x1="-4" y1="-6" x2="0" y2="8" stroke="#0f172b" strokeWidth="0.6" />
        <line x1="4" y1="-6" x2="0" y2="8" stroke="#0f172b" strokeWidth="0.6" />
        <line x1="10" y1="-2" x2="2" y2="8" stroke="#0f172b" strokeWidth="0.6" />
        <circle cx="0" cy="10" r="2" fill="#3774a3" />
      </g>
    </g>

    {/* Radio-frekvens-etikett */}
    <g transform="translate(1050, 90)" opacity="0.7">
      <rect x="0" y="0" width="90" height="22" fill="#ffffff" stroke="#0f172b" strokeWidth="0.6" />
      <text x="45" y="15" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="#0f172b">
        146.7625 MHz
      </text>
    </g>
  </svg>
);

export default AirNavScene;
