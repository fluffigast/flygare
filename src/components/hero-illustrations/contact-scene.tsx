import React from "react";

/**
 * ContactScene — subtil line-art: kuvert med brim + adress-linjer.
 */
export const ContactScene: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 260 180"
    preserveAspectRatio="xMidYMid meet"
    aria-hidden
  >
    <g stroke="var(--ink-2, #0f172b)" fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* Kuvert */}
      <rect x="40" y="45" width="180" height="110" strokeWidth="1.2" />
      {/* Flip (öppen kuvertflik) */}
      <polyline points="40,45 130,110 220,45" strokeWidth="1.2" />

      {/* Bakre linjer (undre kuvertkanten) */}
      <line x1="40" y1="155" x2="115" y2="105" strokeWidth="0.6" opacity="0.5" />
      <line x1="220" y1="155" x2="145" y2="105" strokeWidth="0.6" opacity="0.5" />

      {/* Frimärke */}
      <rect x="180" y="55" width="26" height="26" strokeWidth="1" />
      <line x1="186" y1="61" x2="200" y2="75" strokeWidth="0.5" opacity="0.5" />
      <line x1="200" y1="61" x2="186" y2="75" strokeWidth="0.5" opacity="0.5" />

      {/* Adress-linjer */}
      <g strokeWidth="0.6" opacity="0.55">
        <line x1="60" y1="125" x2="150" y2="125" />
        <line x1="60" y1="135" x2="130" y2="135" />
        <line x1="60" y1="145" x2="140" y2="145" />
      </g>
    </g>
  </svg>
);

export default ContactScene;
