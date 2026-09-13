import React from "react";

/**
 * PodiumScene — visible hero för Tävling. Podium, medaljer, sträckstoppning.
 */
export const PodiumScene: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 800 260"
    preserveAspectRatio="xMidYMid meet"
    aria-hidden
  >
    <defs>
      <linearGradient id="ps-medal-gold" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#fde68a" />
        <stop offset="100%" stopColor="#d97706" />
      </linearGradient>
      <linearGradient id="ps-medal-silver" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#e5e7eb" />
        <stop offset="100%" stopColor="#9ca3af" />
      </linearGradient>
      <linearGradient id="ps-medal-bronze" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#fbbf24" />
        <stop offset="100%" stopColor="#92400e" />
      </linearGradient>
      <linearGradient id="ps-p1" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#3774a3" />
        <stop offset="100%" stopColor="#1e40af" />
      </linearGradient>
      <linearGradient id="ps-p2" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#5b7898" />
        <stop offset="100%" stopColor="#3b5a7c" />
      </linearGradient>
      <linearGradient id="ps-p3" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#7a8ba0" />
        <stop offset="100%" stopColor="#556a83" />
      </linearGradient>
    </defs>

    {/* Åreskutan bakom podiet */}
    <path
      d="M 0 200 L 100 160 L 220 130 L 340 90 L 400 70 L 460 90 L 580 130 L 720 170 L 800 200 L 800 260 L 0 260 Z"
      fill="#e5e7eb"
      opacity="0.5"
    />

    {/* Podium */}
    {/* 2nd place */}
    <rect x="260" y="140" width="90" height="90" fill="url(#ps-p2)" rx="2" />
    <text x="305" y="220" textAnchor="middle" fill="#ffffff" fontSize="32" fontWeight="900" fontFamily="serif">2</text>
    {/* 1st place */}
    <rect x="355" y="100" width="90" height="130" fill="url(#ps-p1)" rx="2" />
    <text x="400" y="205" textAnchor="middle" fill="#ffffff" fontSize="42" fontWeight="900" fontFamily="serif">1</text>
    {/* 3rd place */}
    <rect x="450" y="160" width="90" height="70" fill="url(#ps-p3)" rx="2" />
    <text x="495" y="220" textAnchor="middle" fill="#ffffff" fontSize="28" fontWeight="900" fontFamily="serif">3</text>

    {/* Medaljer på topp av varje pall */}
    {/* Guld */}
    <g transform="translate(400, 82)">
      <line x1="0" y1="-30" x2="-8" y2="-2" stroke="#dc2626" strokeWidth="2.5" />
      <line x1="0" y1="-30" x2="8" y2="-2" stroke="#dc2626" strokeWidth="2.5" />
      <circle cx="0" cy="4" r="10" fill="url(#ps-medal-gold)" stroke="#78350f" strokeWidth="0.6" />
      <text x="0" y="8" textAnchor="middle" fontSize="10" fontWeight="900" fill="#78350f">1</text>
    </g>
    {/* Silver */}
    <g transform="translate(305, 122)">
      <line x1="0" y1="-24" x2="-6" y2="0" stroke="#1e3a8a" strokeWidth="2" />
      <line x1="0" y1="-24" x2="6" y2="0" stroke="#1e3a8a" strokeWidth="2" />
      <circle cx="0" cy="5" r="8" fill="url(#ps-medal-silver)" stroke="#374151" strokeWidth="0.5" />
      <text x="0" y="8" textAnchor="middle" fontSize="8" fontWeight="900" fill="#374151">2</text>
    </g>
    {/* Brons */}
    <g transform="translate(495, 142)">
      <line x1="0" y1="-22" x2="-5" y2="0" stroke="#78350f" strokeWidth="1.8" />
      <line x1="0" y1="-22" x2="5" y2="0" stroke="#78350f" strokeWidth="1.8" />
      <circle cx="0" cy="5" r="7" fill="url(#ps-medal-bronze)" stroke="#78350f" strokeWidth="0.5" />
      <text x="0" y="8" textAnchor="middle" fontSize="7" fontWeight="900" fill="#78350f">3</text>
    </g>

    {/* Skärmflygare över podiet */}
    <g transform="translate(140, 60)">
      <path d="M -20 0 Q -20 -12, 0 -14 Q 20 -12, 20 0" fill="#3774a3" stroke="#0f172b" strokeWidth="1.4" />
      <line x1="-16" y1="-2" x2="-3" y2="14" stroke="#0f172b" strokeWidth="0.7" />
      <line x1="-8" y1="-8" x2="-1" y2="14" stroke="#0f172b" strokeWidth="0.7" />
      <line x1="8" y1="-8" x2="1" y2="14" stroke="#0f172b" strokeWidth="0.7" />
      <line x1="16" y1="-2" x2="3" y2="14" stroke="#0f172b" strokeWidth="0.7" />
      <ellipse cx="0" cy="16" rx="3" ry="3.5" fill="#0f172b" />
    </g>
    <g transform="translate(660, 90)">
      <path d="M -16 0 Q -16 -10, 0 -12 Q 16 -10, 16 0" fill="#0f172b" stroke="#0f172b" strokeWidth="1.2" />
      <line x1="-12" y1="-1" x2="-2" y2="11" stroke="#0f172b" strokeWidth="0.6" />
      <line x1="-6" y1="-6" x2="-1" y2="11" stroke="#0f172b" strokeWidth="0.6" />
      <line x1="6" y1="-6" x2="1" y2="11" stroke="#0f172b" strokeWidth="0.6" />
      <line x1="12" y1="-1" x2="2" y2="11" stroke="#0f172b" strokeWidth="0.6" />
      <ellipse cx="0" cy="13" rx="2.5" ry="3" fill="#0f172b" />
    </g>

    {/* Ribbon/banner ovanför */}
    <g transform="translate(400, 40)" opacity="0.85">
      <path d="M -70 0 L 70 0 L 60 12 L 70 24 L -70 24 L -60 12 Z" fill="#dc2626" />
      <text x="0" y="17" textAnchor="middle" fontSize="12" fontWeight="700" fill="#ffffff" fontFamily="serif" letterSpacing="1">
        ÅRE PPC
      </text>
    </g>
  </svg>
);

export default PodiumScene;
