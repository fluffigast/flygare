import React from "react";

/**
 * TopoLines — subtila topografiska höjdkurvor som bakgrundstextur.
 *
 * Sitter absolut, mycket låg opacitet, ger "kart-blad"-känsla utan
 * att tävla med innehållet. Perfekt för sidor som handlar om luftrum,
 * XC-flygning, startplatser.
 */
export const TopoLines: React.FC<{ className?: string; opacity?: number }> = ({
  className,
  opacity = 0.06,
}) => (
  <svg
    className={className}
    viewBox="0 0 1200 600"
    preserveAspectRatio="xMidYMid slice"
    aria-hidden
    style={{ opacity }}
  >
    <g fill="none" stroke="var(--ink-2, #0f172b)" strokeWidth="0.6">
      {/* Koncentriska topografiska ringar runt Åreskutan-inspirerad peak */}
      <ellipse cx="600" cy="300" rx="80" ry="45" />
      <ellipse cx="600" cy="300" rx="140" ry="80" />
      <ellipse cx="600" cy="300" rx="210" ry="120" />
      <ellipse cx="600" cy="300" rx="290" ry="165" />
      <ellipse cx="600" cy="300" rx="380" ry="215" />
      <ellipse cx="600" cy="300" rx="480" ry="270" />
      <ellipse cx="600" cy="300" rx="590" ry="330" />

      {/* Sekundär peak (mindre) till höger */}
      <ellipse cx="900" cy="380" rx="50" ry="30" />
      <ellipse cx="900" cy="380" rx="95" ry="55" />
      <ellipse cx="900" cy="380" rx="150" ry="85" />

      {/* Peak till vänster */}
      <ellipse cx="280" cy="420" rx="40" ry="24" />
      <ellipse cx="280" cy="420" rx="75" ry="45" />
    </g>
  </svg>
);

export default TopoLines;
