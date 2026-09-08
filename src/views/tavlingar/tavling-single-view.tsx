import React from "react";
import { useParams } from "react-router";
import { useCompetitions } from "../../hooks/useCMS";
import PageView from "../page/page-view";

function richTextToString(value: any): string {
  if (typeof value === "string") return value;
  if (value?.root?.children) {
    return value.root.children
      .map((block: any) =>
        block.children?.map((child: any) => child.text ?? "").join("") ?? ""
      )
      .join("\n\n");
  }
  return "";
}

// Om en Competitions-rad har matchande slug: rendra tävlingsdetalj (namn,
// beskrivning, ev. anmälan-länk, vinnare-tabell). Annars: falla tillbaka på
// PageView så platshållar-sidan (pages.ts / seeded Pages-entry) visas.
const TavlingSingleView: React.FC = () => {
  const { slug } = useParams();
  const { data: competitions, loading } = useCompetitions([]);
  const comp = (competitions as any[]).find((c) => c.slug === slug);

  if (loading) {
    return (
      <div className="max-w-2xl px-4 py-16 w-full">
        <p style={{ color: "var(--slate, #62748e)" }}>Laddar…</p>
      </div>
    );
  }

  if (!comp) return <PageView />;

  const description = richTextToString(comp.description);
  const paragraphs = description.split("\n\n").filter((p) => p.trim());

  return (
    <div className="w-full">
      <section className="max-w-[900px] mx-auto px-4 md:px-14 pt-16 md:pt-24 pb-8">
        <p
          className="font-serif italic text-lg"
          style={{ color: "var(--slate, #62748e)" }}
        >
          Tävling
        </p>
        <div className="flex items-baseline gap-3 mt-1">
          <h1
            className="font-serif font-bold leading-[0.96] tracking-tight"
            style={{
              fontSize: "clamp(36px, 4vw, 64px)",
              color: "var(--ink-2, #0f172b)",
              letterSpacing: "-0.02em",
            }}
            data-payload-field="name"
          >
            {comp.name}
          </h1>
          <span
            className="text-xs px-2 py-0.5"
            style={{ background: "var(--paper, #fafbfc)", color: "var(--hero-accent, #3774a3)" }}
          >
            {comp.status}
          </span>
        </div>
        {comp.subtitle && (
          <p
            className="font-serif italic text-base md:text-lg mt-4"
            style={{ color: "var(--slate, #62748e)" }}
            data-payload-field="subtitle"
          >
            {comp.subtitle}
          </p>
        )}
      </section>

      <div className="max-w-[900px] mx-auto px-4 md:px-14 pb-16">
        {paragraphs.length > 0 && (
          <div className="mb-10" data-payload-field="description">
            {paragraphs.map((p, i) => (
              <p key={i} className="text-base leading-relaxed mb-4" style={{ color: "var(--slate-3, #45556c)" }}>
                {p}
              </p>
            ))}
          </div>
        )}

        {comp.signupUrl && (
          <a
            href={comp.signupUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center font-semibold text-sm text-white rounded-full mb-10"
            style={{ background: "var(--ink, #020618)", padding: "9px 22px" }}
          >
            Till anmälan ↗
          </a>
        )}

        {(comp.rules?.length ?? 0) > 0 && (
          <section className="mb-10" style={{ borderTop: "1px solid var(--border, #e2e8f0)", paddingTop: 24 }}>
            <h2
              className="font-serif font-bold text-xl md:text-[28px] leading-none mb-5"
              style={{ color: "var(--ink-2, #0f172b)" }}
            >
              Regler
            </h2>
            <ul className="flex flex-col gap-2 list-disc pl-5">
              {comp.rules.map((r: any, i: number) => (
                <li key={i} className="text-sm leading-relaxed" style={{ color: "var(--slate-3, #45556c)" }}>
                  {r.text}
                </li>
              ))}
            </ul>
          </section>
        )}

        {(comp.winners?.length ?? 0) > 0 && (
          <section style={{ borderTop: "1px solid var(--border, #e2e8f0)", paddingTop: 24 }}>
            <h2
              className="font-serif font-bold text-xl md:text-[28px] leading-none mb-5"
              style={{ color: "var(--ink-2, #0f172b)" }}
            >
              Tävlingsresultat
            </h2>
            <div className="flex flex-col">
              <div className="grid grid-cols-3 gap-4 py-3" style={{ borderBottom: "1px solid var(--border, #e2e8f0)" }}>
                <p className="text-sm font-semibold" style={{ color: "var(--ink, #020618)" }}>År</p>
                <p className="text-sm font-semibold" style={{ color: "var(--ink, #020618)" }}>Vinnare</p>
                <p className="text-sm font-semibold" style={{ color: "var(--ink, #020618)" }}>Resultat</p>
              </div>
              {[...comp.winners]
                .sort((a: any, b: any) => (b.year ?? 0) - (a.year ?? 0))
                .map((w: any) => (
                  <div key={`${w.year}-${w.name}`} className="grid grid-cols-3 gap-4 py-3" style={{ borderBottom: "1px solid var(--border, #e2e8f0)" }}>
                    <p className="text-sm" style={{ color: "var(--ink, #020618)" }}>{w.year}</p>
                    <p className="text-sm" style={{ color: "var(--ink, #020618)" }}>{w.name}</p>
                    <p className="text-sm" style={{ color: "var(--slate, #62748e)" }}>{w.result}</p>
                  </div>
                ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default TavlingSingleView;
