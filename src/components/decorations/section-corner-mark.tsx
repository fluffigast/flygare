import React from "react";

/**
 * SectionCornerMark — subtila hörn-detaljer (typografiska brackets +
 * grader-tick) som markerar början på ett innehållsblock. Läggs
 * absolut i övre högra hörnet av ett section-block.
 *
 * Inspiration: kart-blad-cartouches och luftfartskartor.
 */
export const SectionCornerMark: React.FC<{
  className?: string;
  label?: string;
  opacity?: number;
}> = ({ className, label, opacity = 0.35 }) => (
  <svg
    className={className}
    viewBox="0 0 120 60"
    aria-hidden
    style={{ opacity }}
  >
    {/* Övre bracket */}
    <path
      d="M 10 8 L 40 8 M 40 8 L 40 20"
      fill="none"
      stroke="var(--slate-3, #45556c)"
      strokeWidth="0.8"
      strokeLinecap="round"
    />
    {/* Nedre bracket */}
    <path
      d="M 80 40 L 110 40 M 80 40 L 80 28"
      fill="none"
      stroke="var(--slate-3, #45556c)"
      strokeWidth="0.8"
      strokeLinecap="round"
    />
    {/* Tick-ring */}
    <circle cx="60" cy="30" r="9" fill="none" stroke="var(--slate-3, #45556c)" strokeWidth="0.5" />
    {Array.from({ length: 8 }).map((_, i) => {
      const deg = i * 45;
      const rad = (deg * Math.PI) / 180;
      const x1 = 60 + 9 * Math.cos(rad);
      const y1 = 30 + 9 * Math.sin(rad);
      const x2 = 60 + 11 * Math.cos(rad);
      const y2 = 30 + 11 * Math.sin(rad);
      return (
        <line
          key={i}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="var(--slate-3, #45556c)"
          strokeWidth={i % 2 === 0 ? 0.7 : 0.4}
        />
      );
    })}
    {/* Center-punkt */}
    <circle cx="60" cy="30" r="1.5" fill="var(--slate-3, #45556c)" />
    {label && (
      <text
        x="60"
        y="55"
        textAnchor="middle"
        fontSize="6"
        fontFamily="monospace"
        letterSpacing="1"
        fill="var(--slate-3, #45556c)"
      >
        {label}
      </text>
    )}
  </svg>
);

export default SectionCornerMark;
