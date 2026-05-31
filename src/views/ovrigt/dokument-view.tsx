import React from "react";
import Separator from "../../components/separator";
import { useDocuments } from "../../hooks/useCMS";

const DokumentView: React.FC = () => {
  const { data: documents, loading } = useDocuments([]);

  return (
    <div className="max-w-2xl px-4 flex gap-8 md:gap-16 flex-col w-full py-8 md:py-16">
      <section className="flex flex-col gap-6">
        <div>
          <p className="font-serif italic text-muted-foreground text-sm">Övrigt</p>
          <h2 className="font-serif text-3xl">Dokumentarkiv</h2>
        </div>
      </section>
      <Separator />
      {loading && <p className="text-sm text-muted-foreground">Laddar...</p>}
      {!loading && documents.length === 0 && (
        <p className="text-sm text-muted-foreground">Inga dokument uppladdade ännu.</p>
      )}
      <div className="flex flex-col gap-4">
        {documents.map((doc: any) => (
          <a
            key={doc.id ?? doc.title}
            href={doc.file?.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-between items-center p-4 rounded-lg border border-border hover:border-primary transition-colors"
          >
            <div className="flex flex-col gap-1">
              <p className="text-sm font-semibold">{doc.title}</p>
              <p className="text-muted-foreground text-xs">{doc.category} {doc.year ? `· ${doc.year}` : ''}</p>
            </div>
            <span className="text-sm text-primary">Ladda ner ↓</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default DokumentView;
