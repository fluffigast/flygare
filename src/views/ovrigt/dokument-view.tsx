import React, { useMemo } from "react";
import { useDocuments } from "../../hooks/useCMS";

// Dokumentarkiv per pptx. Grupperas per kategori (Årsmöte / Stadgar / Övrigt),
// sedan sorterat på år (nyast först) inom varje grupp.
const CATEGORY_ORDER = ["arsmote", "stadgar", "ovrigt"] as const;
const CATEGORY_LABEL: Record<string, string> = {
  arsmote: "Årsmötesprotokoll",
  stadgar: "Stadgar",
  ovrigt: "Övriga dokument",
};

const DokumentView: React.FC = () => {
  const { data: documents, loading } = useDocuments([]);

  const groups = useMemo(() => {
    const byCat = new Map<string, any[]>();
    for (const doc of documents as any[]) {
      const cat = doc?.category ?? "ovrigt";
      if (!byCat.has(cat)) byCat.set(cat, []);
      byCat.get(cat)!.push(doc);
    }
    const ordered = CATEGORY_ORDER.filter((k) => byCat.has(k)).map((k) => ({
      key: k,
      label: CATEGORY_LABEL[k],
      docs: (byCat.get(k) ?? []).sort((a, b) => (b.year ?? 0) - (a.year ?? 0)),
    }));
    // Om admin skapar en oväntad kategori: falla ihop under "Övrigt".
    const knownKeys = new Set(CATEGORY_ORDER as unknown as string[]);
    const extras = [...byCat.entries()].filter(([k]) => !knownKeys.has(k)).flatMap(([, v]) => v);
    if (extras.length) {
      const ovrigt = ordered.find((g) => g.key === "ovrigt");
      if (ovrigt) ovrigt.docs.push(...extras);
      else ordered.push({ key: "ovrigt", label: CATEGORY_LABEL.ovrigt, docs: extras });
    }
    return ordered;
  }, [documents]);

  return (
    <div className="w-full">
      <section className="max-w-[900px] mx-auto px-4 md:px-14 pt-16 md:pt-24 pb-8">
        <p className="font-serif italic text-lg" style={{ color: "var(--slate, #62748e)" }}>Övrigt</p>
        <h1
          className="font-serif font-bold leading-[0.96] tracking-tight mt-1"
          style={{ fontSize: "clamp(36px, 4vw, 64px)", color: "var(--ink-2, #0f172b)", letterSpacing: "-0.02em" }}
        >
          Dokumentarkiv
        </h1>
        <p
          className="max-w-2xl mt-6 text-base leading-relaxed"
          style={{ color: "var(--slate-3, #45556c)" }}
        >
          Här läggs klubbens dokument som ska vara tillgängliga för alla medlemmar.
        </p>
      </section>

      <div className="max-w-[900px] mx-auto px-4 md:px-14 pb-16">
        {loading && <p className="text-sm" style={{ color: "var(--slate, #62748e)" }}>Laddar…</p>}
        {!loading && (documents as any[]).length === 0 && (
          <p className="text-sm" style={{ color: "var(--slate, #62748e)" }}>Inga dokument uppladdade ännu.</p>
        )}

        {!loading && groups.map((group) => (
          <section
            key={group.key}
            className="pt-8 mt-8"
            style={{ borderTop: "1px solid var(--border, #e2e8f0)" }}
          >
            <h2
              className="font-serif font-bold text-xl md:text-[28px] leading-none mb-5"
              style={{ color: "var(--ink-2, #0f172b)" }}
            >
              {group.label}
            </h2>
            <div className="flex flex-col gap-3">
              {group.docs.map((doc: any) => (
                <a
                  key={doc.id ?? doc.title}
                  href={doc.file?.url ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex justify-between items-center p-4 md:p-5 transition-colors hover:bg-[#fafbfc]"
                  style={{ border: "1px solid var(--border, #e2e8f0)" }}
                >
                  <div className="flex flex-col gap-1 min-w-0">
                    <p
                      data-payload-field="title"
                      className="text-sm font-semibold truncate"
                      style={{ color: "var(--ink, #020618)" }}
                    >
                      {doc.title}
                    </p>
                    {doc.year && (
                      <p className="text-xs" style={{ color: "var(--slate, #62748e)" }}>
                        {doc.year}
                      </p>
                    )}
                  </div>
                  <span className="text-sm shrink-0 ml-4" style={{ color: "var(--hero-accent, #3774a3)" }}>
                    Ladda ner ↓
                  </span>
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default DokumentView;
