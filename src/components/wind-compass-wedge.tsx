function metPoint(cx: number, cy: number, r: number, deg: number) {
  const rad = (deg * Math.PI) / 180;
  return {
    x: cx + r * Math.sin(rad),
    y: cy - r * Math.cos(rad),
  };
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
  const centerX = 50;
  const centerY = 50;
  const sizeMap = {
    sm: useLabels ? 24 : 36,
    md: useLabels ? 32 : 50,
  };
  const radius = sizeMap[size];

  const startPoint = metPoint(centerX, centerY, radius, minDeg);
  const endPoint = metPoint(centerX, centerY, radius, maxDeg);

  let sweepAngle = maxDeg - minDeg;
  if (sweepAngle < 0) sweepAngle += 360;

  const isLargeArc = sweepAngle > 180 ? 1 : 0;

  const wedgePath = [
    `M ${centerX} ${centerY}`,
    `L ${startPoint.x} ${startPoint.y}`,
    `A ${radius} ${radius} 0 ${isLargeArc} 1 ${endPoint.x} ${endPoint.y}`,
    "Z",
  ].join(" ");

  const labels = [
    { t: "N", x: 50, y: 8 },
    { t: "Ö", x: 92, y: 50 },
    { t: "S", x: 50, y: 92 },
    { t: "V", x: 8, y: 50 },
  ];

  return (
    <svg
      className="shrink-0 text-foreground"
      width={64}
      height={64}
      viewBox="0 0 100 100"
      aria-hidden
    >
      <circle cx={centerX} cy={centerY} r={radius} fill="#E2E8F0" />
      <path d={wedgePath} fill="#62748E" />
      {useLabels &&
        labels.map(({ t, x, y }) => (
          <text
            key={t}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-[16px]"
          >
            {t}
          </text>
        ))}
    </svg>
  );
};
