/**
 * WindDirectionCompass — enkel monoline-kompass med vindnål.
 * En färg (ink), inga gradients/glows/filter. Nålen roterar smooth
 * med CSS transition när windDir ändras.
 */

function pt(cx: number, cy: number, r: number, deg: number) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

export interface WindDirectionCompassProps {
  windDir: number;
  convention?: "from" | "to";
  size?: number;
  showLabels?: boolean;
  gustDir?: number;
}

export const WindDirectionCompass = ({
  windDir,
  convention = "from",
  size = 64,
  showLabels = true,
}: WindDirectionCompassProps) => {
  const cx = 50;
  const cy = 50;
  const outerR = showLabels ? 38 : 46;

  const rot = convention === "from" ? (windDir + 180) % 360 : windDir;

  // Ticks
  const ticks: Array<{ x1: number; y1: number; x2: number; y2: number; major: boolean; key: string }> = [];
  for (let deg = 0; deg < 360; deg += 30) {
    const isMajor = deg % 90 === 0;
    const inner = isMajor ? outerR - 6 : outerR - 3;
    const outer = outerR;
    const p1 = pt(cx, cy, inner, deg);
    const p2 = pt(cx, cy, outer, deg);
    ticks.push({ x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y, major: isMajor, key: `t${deg}` });
  }

  const labels = [
    { t: "N", deg: 0 },
    { t: "Ö", deg: 90 },
    { t: "S", deg: 180 },
    { t: "V", deg: 270 },
  ];
  const labelR = outerR + 7;

  return (
    <svg
      className="shrink-0"
      width={size}
      height={size}
      viewBox="0 0 100 100"
      aria-label={`Vindriktning ${Math.round(windDir)}°`}
      role="img"
    >
      {/* Ytterring */}
      <circle cx={cx} cy={cy} r={outerR} fill="none" stroke="var(--ink-2, #0f172b)" strokeWidth={0.8} opacity={0.7} />

      {/* Ticks */}
      <g stroke="var(--ink-2, #0f172b)" strokeLinecap="round">
        {ticks.map((t) => (
          <line
            key={t.key}
            x1={t.x1}
            y1={t.y1}
            x2={t.x2}
            y2={t.y2}
            strokeWidth={t.major ? 1 : 0.5}
            opacity={t.major ? 0.85 : 0.5}
          />
        ))}
      </g>

      {/* Vindnål — enkel pil */}
      <g
        transform={`rotate(${rot} ${cx} ${cy})`}
        style={{ transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)" }}
      >
        <line
          x1={cx}
          y1={cy}
          x2={cx}
          y2={cy - (outerR - 6)}
          stroke="var(--ink-2, #0f172b)"
          strokeWidth={1.6}
          strokeLinecap="round"
        />
        <polygon
          points={`${cx},${cy - (outerR - 3)} ${cx - 3},${cy - (outerR - 10)} ${cx + 3},${cy - (outerR - 10)}`}
          fill="var(--ink-2, #0f172b)"
        />
      </g>

      {/* Center-hub */}
      <circle cx={cx} cy={cy} r={2} fill="var(--ink-2, #0f172b)" />

      {/* Kardinal-labels */}
      {showLabels &&
        labels.map(({ t, deg }) => {
          const p = pt(cx, cy, labelR, deg);
          return (
            <text
              key={t}
              x={p.x}
              y={p.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={7}
              fontWeight={700}
              fontFamily="var(--font-sans)"
              fill="var(--ink-2, #0f172b)"
            >
              {t}
            </text>
          );
        })}
    </svg>
  );
};

export default WindDirectionCompass;
