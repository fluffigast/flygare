import React from "react";
import { useDocuments } from "../../hooks/useCMS";

const DokumentView: React.FC = () => {
  const { data: documents, loading } = useDocuments([]);

  return (
    <div className="w-full">
      <section className="px-4 sm:px-8 md:px-16 lg:px-[110px] pt-16 md:pt-24 pb-8">
        <p className="font-serif italic text-lg" style={{ color: "var(--slate, #62748e)" }}>Övrigt</p>
        <h1
          className="font-serif font-bold leading-[0.96] tracking-tight mt-1"
          style={{ fontSize: "clamp(36px, 4vw, 64px)", color: "var(--ink-2, #0f172b)", letterSpacing: "-0.02em" }}
        >
          Dokumentarkiv
        </h1>
      </section>

      <div className="max-w-[900px] mx-auto px-4 md:px-14 pb-16">
        {loading && <p className="text-sm" style={{ color: "var(--slate, #62748e)" }}>Laddar...</p>}
        {!loading && documents.length === 0 && (
          <p className="text-sm" style={{ color: "var(--slate, #62748e)" }}>Inga dokument uppladdade ännu.</p>
        )}
        <div className="flex flex-col gap-3">
          {documents.map((doc: any) => (
            <a
              key={doc.id ?? doc.title}
              href={doc.file?.url ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-between items-center p-5 transition-colors hover:bg-[#fafbfc]"
              style={{ border: "1px solid var(--border, #e2e8f0)" }}
            >
              <div className="flex flex-col gap-1">
                <p data-payload-field="title" className="text-sm font-semibold" style={{ color: "var(--ink, #020618)" }}>{doc.title}</p>
                <p className="text-xs" style={{ color: "var(--slate, #62748e)" }}>{doc.category} {doc.year ? `· ${doc.year}` : ''}</p>
              </div>
              <span className="text-sm" style={{ color: "var(--hero-accent, #3774a3)" }}>Ladda ner &darr;</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DokumentView;
