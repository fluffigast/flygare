import React, { useEffect, useRef, useState } from "react";

type Props = {
  value: string;
  durationMs?: number;
  className?: string;
  style?: React.CSSProperties;
};

/**
 * Count-up-animation som triggar när elementet kommer in i viewport.
 * Respekterar prefers-reduced-motion. Om värdet inte innehåller en
 * numerisk prefix (t.ex. "~100", "9 st"), visas det statiskt.
 */
const CountUp: React.FC<Props> = ({ value, durationMs = 1200, className, style }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState<string>(value);
  const triggeredRef = useRef(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setDisplay(value);
      return;
    }

    const match = value.match(/^(~)?(\d+(?:[.,]\d+)?)(.*)$/);
    if (!match) {
      setDisplay(value);
      return;
    }
    const prefix = match[1] ?? "";
    const target = parseFloat(match[2].replace(",", "."));
    const suffix = match[3] ?? "";
    const isInt = Number.isInteger(target);

    setDisplay(`${prefix}${isInt ? 0 : "0,0"}${suffix}`);

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || triggeredRef.current) continue;
          triggeredRef.current = true;

          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min(1, (now - start) / durationMs);
            const eased = 1 - Math.pow(1 - t, 3);
            const current = target * eased;
            const formatted = isInt
              ? Math.round(current).toString()
              : current.toFixed(1).replace(".", ",");
            setDisplay(`${prefix}${formatted}${suffix}`);
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, durationMs]);

  return (
    <span ref={ref} className={className} style={style}>
      {display}
    </span>
  );
};

export default CountUp;
