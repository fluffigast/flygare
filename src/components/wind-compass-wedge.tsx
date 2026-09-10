/**
 * WindCompassWedge — detaljerad kompassros som visar optimalt vind-intervall.
 *
 * Visuell hierarki (utifrån och in):
 *   1. Ytterring med kardinal-labels (N / Ö / S / V)
 *   2. Grader-tick-ring: 72 minor-ticks var 5°, med accent-ticks var 45°
 *   3. Radialt inner-hull med subtil sunburst-gradient
 *   4. Wind-wedge: gradient från kant → mitten, glow-halo utanför
 *   5. Kompassros-stjärna i centrum (4-punkter, kardinala peaks)
 *   6. Bäringspil i wedge:ens mitt-vinkel (roterad, subtil)
 *   7. Center-hub med metallic look (radial-gradient)
 *
 * Alla färger använder --hero-accent / --slate-tokens så komponenten
 * ärver från temat.
 */

function pt(cx: number, cy: number, r: number, deg: number) {
  const rad = ((deg - 90) * Math.PI) / 180; // -90 så 0° = norr = uppåt
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

  // Storlek på ytterringen. Håll svg 100×100 viewBox konstant.
  const outerR = useLabels ? 34 : 44;

  // Kompass-ring radier
  const ringR = outerR + 2;       // ytterringens circle
  const majorTickInner = outerR - 6;
  const majorTickOuter = outerR + 1;
  const minorTickInner = outerR - 3;
  const minorTickOuter = outerR + 0.5;

  // Wedge från kant till center
  let sweep = maxDeg - minDeg;
  if (sweep < 0) sweep += 360;
  const largeArc = sweep > 180 ? 1 : 0;
  const midDeg = (minDeg + sweep / 2) % 360;

  const wedgeStart = pt(cx, cy, outerR - 2, minDeg);
  const wedgeEnd = pt(cx, cy, outerR - 2, maxDeg);
  const wedgePath = [
    `M ${cx} ${cy}`,
    `L ${wedgeStart.x} ${wedgeStart.y}`,
    `A ${outerR - 2} ${outerR - 2} 0 ${largeArc} 1 ${wedgeEnd.x} ${wedgeEnd.y}`,
    "Z",
  ].join(" ");

  // Bäringspilen i wedge:ens mitt-riktning
  const arrowTip = pt(cx, cy, outerR - 8, midDeg);
  const arrowBase1 = pt(cx, cy, 6, midDeg - 12);
  const arrowBase2 = pt(cx, cy, 6, midDeg + 12);
  const arrowPath = `M ${arrowTip.x} ${arrowTip.y} L ${arrowBase1.x} ${arrowBase1.y} L ${arrowBase2.x} ${arrowBase2.y} Z`;

  // Kompassros-stjärna: 4 stora peaks (N/E/S/W) + 4 små intercardinala
  const starPoints: string[] = [];
  for (let i = 0; i < 8; i++) {
    const deg = i * 45;
    const isCardinal = i % 2 === 0;
    const r = isCardinal ? 10 : 4;
    const p = pt(cx, cy, r, deg);
    starPoints.push(`${p.x},${p.y}`);
  }

  // Ticks
  const minorTicks: Array<{ x1: number; y1: number; x2: number; y2: number; key: string }> = [];
  const majorTicks: Array<{ x1: number; y1: number; x2: number; y2: number; key: string }> = [];
  for (let deg = 0; deg < 360; deg += 5) {
    const isMajor = deg % 45 === 0;
    const inner = isMajor ? majorTickInner : minorTickInner;
    const outer = isMajor ? majorTickOuter : minorTickOuter;
    const p1 = pt(cx, cy, inner, deg);
    const p2 = pt(cx, cy, outer, deg);
    (isMajor ? majorTicks : minorTicks).push({
      x1: p1.x,
      y1: p1.y,
      x2: p2.x,
      y2: p2.y,
      key: `t${deg}`,
    });
  }

  // Kardinal-labels utanför ringen
  const labels = [
    { t: "N", deg: 0 },
    { t: "Ö", deg: 90 },
    { t: "S", deg: 180 },
    { t: "V", deg: 270 },
  ];
  const labelR = ringR + 6;

  // Unik ID-suffix per instans så flera compasser på samma sida inte
  // krockar med defs-id:n.
  const uid = `${minDeg}-${maxDeg}-${size}`;

  return (
    <svg
      className="shrink-0"
      width={useLabels ? 96 : 64}
      height={useLabels ? 96 : 64}
      viewBox="0 0 100 100"
      aria-label={`Optimalt vind-intervall ${minDeg}° till ${maxDeg}°`}
      role="img"
    >
      <defs>
        {/* Sunburst-gradient bakom rosen */}
        <radialGradient id={`face-${uid}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f7f9fc" />
          <stop offset="65%" stopColor="#eef2f7" />
          <stop offset="100%" stopColor="#e2e8f0" />
        </radialGradient>

        {/* Wedge-gradient: mörkare vid center, transparent-blek vid kant */}
        <radialGradient id={`wedge-${uid}`} cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="var(--hero-accent, #3774a3)" stopOpacity="0.35" />
          <stop offset="60%" stopColor="var(--hero-accent, #3774a3)" stopOpacity="0.72" />
          <stop offset="100%" stopColor="var(--hero-accent, #3774a3)" stopOpacity="0.9" />
        </radialGradient>

        {/* Center-hub metallic */}
        <radialGradient id={`hub-${uid}`} cx="35%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="60%" stopColor="#cbd5e1" />
          <stop offset="100%" stopColor="#64748b" />
        </radialGradient>

        {/* Glow-filter för wedge */}
        <filter id={`glow-${uid}`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Drop-shadow för hela rosen */}
        <filter id={`shadow-${uid}`} x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="0.8" />
          <feOffset dx="0" dy="0.6" result="offsetblur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.35" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* ─── Ytterring med skugga ─── */}
      <g filter={`url(#shadow-${uid})`}>
        <circle cx={cx} cy={cy} r={ringR} fill={`url(#face-${uid})`} />
        <circle
          cx={cx}
          cy={cy}
          r={ringR}
          fill="none"
          stroke="var(--border, #cbd5e1)"
          strokeWidth={0.8}
        />
      </g>

      {/* ─── Minor ticks (var 5°) ─── */}
      <g stroke="var(--slate-2, #90a1b9)" strokeWidth={0.4} strokeLinecap="round" opacity={0.55}>
        {minorTicks.map((t) => (
          <line key={t.key} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} />
        ))}
      </g>

      {/* ─── Major ticks (var 45°) ─── */}
      <g stroke="var(--ink-2, #0f172b)" strokeWidth={0.9} strokeLinecap="round">
        {majorTicks.map((t) => (
          <line key={t.key} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} />
        ))}
      </g>

      {/* ─── Inner ring (dekorativ) ─── */}
      <circle
        cx={cx}
        cy={cy}
        r={outerR - 8}
        fill="none"
        stroke="var(--slate-2, #90a1b9)"
        strokeWidth={0.3}
        opacity={0.5}
      />

      {/* ─── Wind-wedge med glow ─── */}
      <g filter={`url(#glow-${uid})`} style={{ transition: "opacity 0.4s ease" }}>
        <path d={wedgePath} fill={`url(#wedge-${uid})`} />
        <path
          d={wedgePath}
          fill="none"
          stroke="var(--hero-accent, #3774a3)"
          strokeWidth={0.5}
          strokeLinejoin="round"
          opacity={0.6}
        />
      </g>

      {/* ─── Kompassros-stjärna (bakom bäringspilen) ─── */}
      <polygon
        points={starPoints.join(" ")}
        fill="none"
        stroke="var(--slate-3, #45556c)"
        strokeWidth={0.4}
        opacity={0.4}
      />

      {/* ─── Bäringspil (mitten av wedge) ─── */}
      <path
        d={arrowPath}
        fill="var(--ink-2, #0f172b)"
        stroke="#ffffff"
        strokeWidth={0.4}
        strokeLinejoin="round"
        style={{ transition: "d 0.5s cubic-bezier(0.4, 0, 0.2, 1)" }}
      />

      {/* ─── Center-hub (2-lager: bas + highlight) ─── */}
      <circle cx={cx} cy={cy} r={3.2} fill={`url(#hub-${uid})`} stroke="#334155" strokeWidth={0.3} />
      <circle cx={cx - 0.6} cy={cy - 0.6} r={1} fill="#ffffff" opacity={0.7} />

      {/* ─── Kardinal-labels utanför ringen ─── */}
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
