import React from "react";

/**
 * InitialsAvatar — SVG-avatar med initialer. Deterministisk färg per namn.
 *
 * Använd som placeholder tills riktigt foto laddats upp i CMS. Genererar
 * en cirkel med förnamns+efternamns-initialer och en färg-hash så samma
 * person alltid får samma färg.
 */
function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function hashHue(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h % 360;
}

export const InitialsAvatar: React.FC<{
  name: string;
  size?: number;
  imageUrl?: string;
  className?: string;
}> = ({ name, size = 64, imageUrl, className }) => {
  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt={name}
        className={`rounded-full object-cover ${className ?? ""}`}
        style={{ width: size, height: size }}
        loading="lazy"
      />
    );
  }
  const hue = hashHue(name);
  const initialsStr = initials(name);
  const bg = `hsl(${hue} 45% 78%)`;
  const fg = `hsl(${hue} 55% 22%)`;
  const uid = `av-${hue}`;
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-label={`${name} (initialer)`}
    >
      <defs>
        <linearGradient id={uid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={bg} />
          <stop offset="100%" stopColor={`hsl(${hue} 42% 68%)`} />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="32" fill={`url(#${uid})`} />
      <text
        x="32"
        y="42"
        textAnchor="middle"
        fontSize="26"
        fontWeight="600"
        fontFamily="var(--font-serif), Georgia, serif"
        fill={fg}
      >
        {initialsStr}
      </text>
    </svg>
  );
};

export default InitialsAvatar;
