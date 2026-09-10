/**
 * WindDirectionCompass — kompakt kompass som visar en LIVE-vindriktning.
 *
 * Skiljer sig från WindCompassWedge:
 *   - WindCompassWedge visar ett INTERVALL (min→max, wedge-form) för
 *     "optimalt vindfönster" på en startplats.
 *   - WindDirectionCompass visar EN riktning just nu (spjut/nål) för
 *     live-data i WindWidget.
 *
 * Detaljer (utifrån och in):
 *   1. Ytterring med subtil skugga + kardinal-labels N/Ö/S/V
 *   2. Grader-ticks: minor var 15°, major var 45°
 *   3. Vindpil: bred bas → smal spets, gradient (accent), roterad till windDir
 *   4. Byge/gust-pil: smalare, transparent, visar gust-riktning om annan
 *   5. Center-hub med metallic radial-gradient
 *   6. Meteorologisk konvention: pilen visar DIT vinden BLÅSER (from-dir + 180°)
 *      styrs via convention-prop.
 */

function pt(cx: number, cy: number, r: number, deg: number) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

export interface WindDirectionCompassProps {
  /** Vindriktning i grader (0=N, 90=Ö, 180=S, 270=V) */
  windDir: number;
  /** "from" = pilen pekar mot varifrån vinden blåser (default, meteorologi).
   *  "to"   = pilen pekar dit vinden blåser. */
  convention?: "from" | "to";
  /** Pixel-storlek på svg:n (viewBox är fast 100×100). */
  size?: number;
  /** Visa kardinal-labels utanför ringen. */
  showLabels?: boolean;
  /** Extra pil för gust-riktning (transparent, tunnare). */
  gustDir?: number;
}

export const WindDirectionCompass = ({
  windDir,
  convention = "from",
  size = 64,
  showLabels = true,
  gustDir,
}: WindDirectionCompassProps) => {
  const cx = 50;
  const cy = 50;
  const outerR = showLabels ? 38 : 46;
  const ringR = outerR + 2;

  // "from"-konventionen: pil pekar mot varifrån vinden kommer.
  // Rotera SVG-lagret så 0° = N och pilen pekar utåt från centrum.
  const rot = convention === "from" ? (windDir + 180) % 360 : windDir;
  const gustRot =
    gustDir == null ? null : (convention === "from" ? (gustDir + 180) % 360 : gustDir);

  const uid = `${Math.round(windDir)}-${size}`;

  // Ticks
  const ticks: Array<{
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    major: boolean;
    key: string;
  }> = [];
  for (let deg = 0; deg < 360; deg += 15) {
    const isMajor = deg % 45 === 0;
    const inner = isMajor ? outerR - 6 : outerR - 3;
    const outer = isMajor ? outerR + 1 : outerR + 0.4;
    const p1 = pt(cx, cy, inner, deg);
    const p2 = pt(cx, cy, outer, deg);
    ticks.push({ x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y, major: isMajor, key: `t${deg}` });
  }

  // Kardinal-labels
  const labels = [
    { t: "N", deg: 0 },
    { t: "Ö", deg: 90 },
    { t: "S", deg: 180 },
    { t: "V", deg: 270 },
  ];
  const labelR = ringR + 5;

  // Vind-pilen: sitter längs y-axeln i "0°"-orientering, roteras via transform.
  // Bred bas nere (nära hub) → smal spets uppåt (mot kant).
  const arrowTip = 8;    // avstånd från kant
  const arrowBase = cy;  // baspunkt (hub)
  const halfW = 5;

  return (
    <svg
      className="shrink-0"
      width={size}
      height={size}
      viewBox="0 0 100 100"
      aria-label={`Vindriktning ${Math.round(windDir)}°`}
      role="img"
    >
      <defs>
        <radialGradient id={`face-${uid}`} cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="70%" stopColor="#eef2f7" />
          <stop offset="100%" stopColor="#dfe6ee" />
        </radialGradient>

        <linearGradient id={`arrow-${uid}`} x1="50%" y1="100%" x2="50%" y2="0%">
          <stop offset="0%" stopColor="var(--hero-accent, #3774a3)" stopOpacity="0.6" />
          <stop offset="100%" stopColor="var(--ink-2, #0f172b)" />
        </linearGradient>

        <radialGradient id={`hub-${uid}`} cx="35%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="55%" stopColor="#cbd5e1" />
          <stop offset="100%" stopColor="#475569" />
        </radialGradient>

        <filter id={`arrow-shadow-${uid}`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="0.8" />
          <feOffset dx="0" dy="0.5" result="shadow" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.4" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Ytterring */}
      <circle
        cx={cx}
        cy={cy}
        r={ringR}
        fill={`url(#face-${uid})`}
        stroke="var(--border, #cbd5e1)"
        strokeWidth={0.8}
      />

      {/* Ticks */}
      <g strokeLinecap="round">
        {ticks.map((t) =>
          t.major ? (
            <line
              key={t.key}
              x1={t.x1}
              y1={t.y1}
              x2={t.x2}
              y2={t.y2}
              stroke="var(--ink-2, #0f172b)"
              strokeWidth={0.9}
            />
          ) : (
            <line
              key={t.key}
              x1={t.x1}
              y1={t.y1}
              x2={t.x2}
              y2={t.y2}
              stroke="var(--slate-2, #90a1b9)"
              strokeWidth={0.4}
              opacity={0.65}
            />
          )
        )}
      </g>

      {/* Inner dekorativ ring */}
      <circle
        cx={cx}
        cy={cy}
        r={outerR - 8}
        fill="none"
        stroke="var(--slate-2, #90a1b9)"
        strokeWidth={0.3}
        opacity={0.55}
      />

      {/* Kardinalstjärna bakom pilen */}
      <g fill="none" stroke="var(--slate-3, #45556c)" strokeWidth={0.35} opacity={0.4}>
        <line x1={cx} y1={cy - (outerR - 10)} x2={cx} y2={cy + (outerR - 10)} />
        <line x1={cx - (outerR - 10)} y1={cy} x2={cx + (outerR - 10)} y2={cy} />
      </g>

      {/* Gust-pil (om annat än windDir) — bakom huvudpilen */}
      {gustRot != null && Math.abs(gustRot - rot) > 5 && (
        <g
          transform={`rotate(${gustRot} ${cx} ${cy})`}
          style={{ transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)" }}
        >
          <path
            d={`M ${cx} ${arrowTip} L ${cx - halfW * 0.6} ${arrowBase} L ${cx + halfW * 0.6} ${arrowBase} Z`}
            fill="var(--slate-3, #45556c)"
            opacity={0.35}
          />
        </g>
      )}

      {/* Huvud-vindpil */}
      <g
        transform={`rotate(${rot} ${cx} ${cy})`}
        style={{ transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)" }}
        filter={`url(#arrow-shadow-${uid})`}
      >
        <path
          d={`M ${cx} ${arrowTip} L ${cx - halfW} ${arrowBase} L ${cx + halfW} ${arrowBase} Z`}
          fill={`url(#arrow-${uid})`}
          stroke="var(--ink-2, #0f172b)"
          strokeWidth={0.4}
          strokeLinejoin="round"
        />
        {/* Ljus mitt-streck på pilen för dimension */}
        <line
          x1={cx}
          y1={arrowTip + 1}
          x2={cx}
          y2={arrowBase - 2}
          stroke="#ffffff"
          strokeWidth={0.4}
          opacity={0.5}
          strokeLinecap="round"
        />
      </g>

      {/* Center-hub */}
      <circle cx={cx} cy={cy} r={3.6} fill={`url(#hub-${uid})`} stroke="#334155" strokeWidth={0.35} />
      <circle cx={cx - 0.8} cy={cy - 0.8} r={1.2} fill="#ffffff" opacity={0.65} />

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
              fill={deg === 0 ? "var(--hero-accent, #3774a3)" : "var(--ink-2, #0f172b)"}
            >
              {t}
            </text>
          );
        })}
    </svg>
  );
};

export default WindDirectionCompass;
