import React, { useEffect, useState } from "react";

type Props = {
  eyebrow: string;
  title: string;
  lead?: string;
};

/**
 * Delad sidhuvud för alla sektionssidor. Konsekvent typskala, eyebrow
 * och lead. Mjuk entrance-animation och editorial hairline-avslut.
 */
const PageHero: React.FC<Props> = ({ eyebrow, title, lead }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(t);
  }, []);

  const easeStyle = (delayMs: number): React.CSSProperties => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : "translateY(8px)",
    transition: `opacity 480ms cubic-bezier(.2,.65,.3,1) ${delayMs}ms, transform 480ms cubic-bezier(.2,.65,.3,1) ${delayMs}ms`,
  });

  return (
    <section className="relative max-w-[1200px] mx-auto px-4 md:px-10 pt-12 md:pt-20 pb-8 md:pb-10">
      <div className="flex items-center gap-3" style={easeStyle(0)}>
        <span
          className="inline-block w-6 h-px"
          style={{ background: "var(--hero-accent, #3774a3)" }}
          aria-hidden="true"
        />
        <p
          className="font-sans uppercase tracking-[0.18em] text-[11px] md:text-xs font-semibold"
          style={{ color: "var(--hero-accent, #3774a3)" }}
        >
          {eyebrow}
        </p>
      </div>
      <h1
        className="font-serif font-bold mt-4 leading-[1.04] tracking-tight"
        style={{
          fontSize: "clamp(36px, 5vw, 60px)",
          color: "var(--ink-2, #0f172b)",
          letterSpacing: "-0.02em",
          paddingBottom: "0.08em",
          textWrap: "balance" as React.CSSProperties["textWrap"],
          ...easeStyle(70),
        }}
      >
        {title}
      </h1>
      {lead && (
        <p
          className="max-w-2xl mt-5 text-base md:text-lg leading-relaxed"
          style={{ color: "var(--slate-3, #45556c)", ...easeStyle(140) }}
        >
          {lead}
        </p>
      )}
      <div
        className="mt-10 md:mt-12 h-px w-full"
        style={{ background: "var(--border, #e2e8f0)", ...easeStyle(200) }}
        aria-hidden="true"
      />
    </section>
  );
};

export default PageHero;
