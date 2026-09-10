import React from "react";
import { competitions as localCompetitions } from "../../data/competitions";
import { useCompetitions } from "../../hooks/useCMS";
import CompassRoseWatermark from "../../components/decorations/compass-rose-watermark";

/** Extract plain text from a Lexical richText object or return string as-is */
function richTextToString(value: any): string {
  if (typeof value === "string") return value;
  if (value?.root?.children) {
    return value.root.children
      .map((block: any) =>
        block.children?.map((child: any) => child.text ?? "").join("") ?? ""
      )
      .join("\n");
  }
  return "";
}

const TavlingarView: React.FC = () => {
  const { data: competitions } = useCompetitions([...localCompetitions]);

  return (
    <div className="w-full relative">
      {/* Stor sakta-roterande kompassros som subtil bakgrundsdekoration. */}
      <CompassRoseWatermark
        className="pointer-events-none absolute right-[-120px] top-8 w-[520px] h-[520px] -z-10 hidden md:block"
        opacity={0.06}
      />
      <section className="relative max-w-[900px] mx-auto px-4 md:px-14 pt-16 md:pt-24 pb-8">
        <p className="font-serif italic text-lg" style={{ color: "var(--slate, #62748e)" }}>Tävlingar</p>
        <h1
          className="font-serif font-bold leading-[0.96] tracking-tight mt-1"
          style={{ fontSize: "clamp(36px, 4vw, 64px)", color: "var(--ink-2, #0f172b)", letterSpacing: "-0.02em" }}
        >
          Tävla och utmana dig själv
        </h1>
        <p className="max-w-2xl mt-6 text-base leading-relaxed" style={{ color: "var(--slate, #62748e)" }}>
          Från distansrekord till första topplandningen — det finns alltid något att jaga.
        </p>
      </section>

      <div className="max-w-[900px] mx-auto px-4 md:px-14 pb-16">
        {competitions.map((comp: any, i: number) => (
          <section
            key={comp.name}
            className="py-10"
            style={i > 0 ? { borderTop: "1px solid var(--border, #e2e8f0)" } : undefined}
          >
            <div className="flex gap-3 items-center mb-2">
              <h3 data-payload-field="name" className="font-serif font-bold text-xl" style={{ color: "var(--ink-2, #0f172b)" }}>{comp.name}</h3>
              <span className="text-xs px-2 py-0.5" style={{ background: "var(--paper, #fafbfc)", color: "var(--hero-accent, #3774a3)" }}>
                {comp.status}
              </span>
            </div>
            <p className="font-serif italic text-sm mb-4" style={{ color: "var(--slate, #62748e)" }}>
              {comp.subtitle}
            </p>
            <p data-payload-field="description" className="text-base leading-relaxed mb-6" style={{ color: "var(--slate-3, #45556c)" }}>
              {richTextToString(comp.description)}
            </p>

            {"winners" in comp && comp.winners && (
              <div className="flex flex-col">
                <div className="grid grid-cols-3 gap-4 py-3" style={{ borderBottom: "1px solid var(--border, #e2e8f0)" }}>
                  <p className="text-sm font-semibold" style={{ color: "var(--ink, #020618)" }}>År</p>
                  <p className="text-sm font-semibold" style={{ color: "var(--ink, #020618)" }}>Vinnare</p>
                  <p className="text-sm font-semibold" style={{ color: "var(--ink, #020618)" }}>Resultat</p>
                </div>
                {comp.winners.map((winner: any) => (
                  <div key={winner.year} className="grid grid-cols-3 gap-4 py-3" style={{ borderBottom: "1px solid var(--border, #e2e8f0)" }}>
                    <p className="text-sm" style={{ color: "var(--ink, #020618)" }}>{winner.year}</p>
                    <p className="text-sm" style={{ color: "var(--ink, #020618)" }}>{winner.name}</p>
                    <p className="text-sm" style={{ color: "var(--slate, #62748e)" }}>{"result" in winner ? winner.result : ""}</p>
                  </div>
                ))}
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  );
};

export default TavlingarView;
