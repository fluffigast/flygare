import React from "react";
import { useParams } from "react-router";
import { usePage, useGlobalLivePreview } from "../../hooks/useCMS";
import { pages } from "../../data/pages";

const PageView: React.FC = () => {
  const { slug } = useParams();
  const fallback = pages.find((p) => p.slug === slug) ?? { title: "", slug: "", body: "" };
  const { data: page, loading } = usePage(slug ?? "", fallback);
  const livePage = useGlobalLivePreview(page);

  if (loading) {
    return (
      <div className="max-w-2xl px-4 py-16 w-full">
        <p className="text-muted-foreground">Laddar...</p>
      </div>
    );
  }

  const title = livePage.title || fallback.title;
  const body = livePage.body || fallback.body;

  return (
    <div className="max-w-2xl px-4 flex gap-8 md:gap-16 flex-col w-full py-8 md:py-16">
      <section className="flex flex-col gap-6">
        <h2 className="font-serif text-3xl" data-payload-field="title">{title}</h2>
        {typeof body === "string" ? (
          <p className="text-muted-foreground text-sm leading-relaxed" data-payload-field="body">{body}</p>
        ) : (
          <div className="prose prose-sm max-w-none text-muted-foreground" data-payload-field="body">
            <p>{body?.root?.children?.[0]?.children?.[0]?.text ?? ""}</p>
          </div>
        )}
      </section>
      {livePage.links?.length > 0 && (
        <section className="flex flex-col gap-4">
          <h3 className="font-serif text-xl">Länkar</h3>
          <div className="flex flex-col gap-2">
            {livePage.links.map((link: any) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-primary transition-colors underline text-sm"
              >
                {link.label}
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default PageView;
