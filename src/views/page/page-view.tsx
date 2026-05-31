import React from "react";
import { useParams } from "react-router";
import { usePage, useGlobalLivePreview } from "../../hooks/useCMS";
import { pages } from "../../data/pages";
import { articles } from "../../data/articles";

const PageView: React.FC = () => {
  const { slug } = useParams();
  const pageFallback = pages.find((p) => p.slug === slug);
  const articleFallback = articles.find((a) => a.slug === slug);
  const fallback = pageFallback
    ?? (articleFallback ? { title: articleFallback.title, slug: articleFallback.slug, body: articleFallback.content } : null)
    ?? { title: "", slug: "", body: "" };
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

  const paragraphs = typeof body === "string"
    ? body.split("\n").filter((p: string) => p.trim())
    : (body?.root?.children?.map((block: any) =>
        block.children?.map((child: any) => child.text ?? "").join("") ?? ""
      ).filter((t: string) => t.trim()) ?? []);

  return (
    <div className="w-full">
      <section className="px-4 md:px-[110px] pt-16 md:pt-24 pb-8">
        <h1
          className="font-serif font-bold leading-[0.96] tracking-tight"
          style={{ fontSize: "clamp(36px, 4vw, 64px)", color: "var(--ink-2, #0f172b)", letterSpacing: "-0.02em" }}
          data-payload-field="title"
        >
          {title}
        </h1>
      </section>

      <div className="max-w-[900px] mx-auto px-4 md:px-14 pb-16" data-payload-field="body">
        {paragraphs.map((text: string, i: number) => {
          const isHeading = text.length < 60 && !text.includes(". ") && !text.includes(",");
          if (isHeading) {
            return (
              <h3
                key={i}
                className="font-serif font-bold text-lg mt-10 mb-3"
                style={{ color: "var(--ink-2, #0f172b)" }}
              >
                {text}
              </h3>
            );
          }
          return (
            <p
              key={i}
              className="text-base leading-relaxed mb-4"
              style={{ color: "var(--slate-3, #45556c)" }}
            >
              {text}
            </p>
          );
        })}
      </div>
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
