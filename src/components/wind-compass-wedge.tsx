/**
 * WindCompassWedge — enkel monoline-kompass med wind-wedge för optimalt
 * vindfönster på startplats. Inga gradients, filter eller animationer.
 */

function pt(cx: number, cy: number, r: number, deg: number) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

export interface WindCompassWedgeProps {
  minDeg: number;
  maxDeg: number;
  useLabels?: boolean;
  size?: "sm" | "md";
}

export const WindCompassWedge = ({
  minDeg,
  maxDeg,
  size = "md",
  useLabels = false,
}: WindCompassWedgeProps) => {
  const cx = 50;
  const cy = 50;
  const sizeMap = { sm: useLabels ? 30 : 40, md: useLabels ? 38 : 46 };
  const outerR = sizeMap[size];

  let sweep = maxDeg - minDeg;
  if (sweep < 0) sweep += 360;
  const largeArc = sweep > 180 ? 1 : 0;

  const wedgeStart = pt(cx, cy, outerR, minDeg);
  const wedgeEnd = pt(cx, cy, outerR, maxDeg);
  const wedgePath = [
    `M ${cx} ${cy}`,
    `L ${wedgeStart.x} ${wedgeStart.y}`,
    `A ${outerR} ${outerR} 0 ${largeArc} 1 ${wedgeEnd.x} ${wedgeEnd.y}`,
    "Z",
  ].join(" ");

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
      width={useLabels ? 80 : 56}
      height={useLabels ? 80 : 56}
      viewBox="0 0 100 100"
      aria-label={`Optimalt vind-intervall ${minDeg}° till ${maxDeg}°`}
      role="img"
    >
      {/* Ytterring */}
      <circle cx={cx} cy={cy} r={outerR} fill="none" stroke="var(--ink-2, #0f172b)" strokeWidth={0.8} opacity={0.6} />

      {/* Wedge */}
      <path d={wedgePath} fill="var(--hero-accent, #3774a3)" fillOpacity={0.25} />
      <path d={wedgePath} fill="none" stroke="var(--hero-accent, #3774a3)" strokeWidth={0.8} opacity={0.7} />

      {/* 4 cardinal tick-marks */}
      {[0, 90, 180, 270].map((deg) => {
        const p1 = pt(cx, cy, outerR - 3, deg);
        const p2 = pt(cx, cy, outerR, deg);
        return (
          <line
            key={deg}
            x1={p1.x}
            y1={p1.y}
            x2={p2.x}
            y2={p2.y}
            stroke="var(--ink-2, #0f172b)"
            strokeWidth={0.8}
            opacity={0.7}
          />
        );
      })}

      {/* Center-dot */}
      <circle cx={cx} cy={cy} r={1.6} fill="var(--ink-2, #0f172b)" />

      {/* Labels */}
      {useLabels &&
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
