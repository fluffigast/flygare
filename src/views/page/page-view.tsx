import React from "react";
import { useParams } from "react-router";
import { usePage, useGlobalLivePreview } from "../../hooks/useCMS";
import { pages } from "../../data/pages";
import { articles } from "../../data/articles";
import TopoLines from "../../components/decorations/topo-lines";

const PageView: React.FC<{ slug?: string }> = ({ slug: slugProp }) => {
  const params = useParams();
  const slug = slugProp ?? params.slug;
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
        <p style={{ color: "var(--slate, #62748e)" }}>Laddar...</p>
      </div>
    );
  }

  const title = livePage.title || fallback.title;
  const body = livePage.body || (fallback as any).body;
  const lede = (livePage as any).lede || (fallback as any).lede;
  const groups = (livePage as any).groups || (livePage as any).sections || (fallback as any).groups || (fallback as any).sections;

  // Grouped sections mode (flygregler etc.)
  if (groups?.length) {
    return (
      <div className="w-full relative">
        <TopoLines
          className="pointer-events-none absolute inset-x-0 top-0 h-[500px] w-full -z-10"
          opacity={0.04}
        />
        <section className="relative max-w-[900px] mx-auto px-4 md:px-14 pt-16 md:pt-24 pb-8">
          <h1
            className="font-serif font-bold leading-[0.96] tracking-tight"
            style={{ fontSize: "clamp(36px, 4vw, 64px)", color: "var(--ink-2, #0f172b)", letterSpacing: "-0.02em" }}
            data-payload-field="title"
          >
            {title}
          </h1>
          {lede && (
            <p
              className="max-w-2xl mt-8 font-serif italic text-base md:text-lg leading-relaxed"
              style={{ color: "var(--slate, #62748e)" }}
              data-payload-field="lede"
            >
              {lede}
            </p>
          )}
        </section>

        <div className="max-w-[900px] mx-auto px-4 md:px-14 pb-16">
          {groups.map((group: any, gi: number) => (
            <div key={gi} className={gi > 0 ? "mt-16" : ""}>
              <h2
                className="font-serif font-bold text-xl md:text-[32px] leading-none tracking-tight mb-8"
                style={{ color: "var(--ink-2, #0f172b)", borderTop: gi > 0 ? "1px solid var(--border, #e2e8f0)" : undefined, paddingTop: gi > 0 ? 24 : undefined }}
              >
                {group.heading}
              </h2>
              {group.sections.map((section: any, si: number) => (
                <div
                  key={si}
                  className="py-5"
                  style={si > 0 ? { borderTop: "1px solid var(--border, #e2e8f0)" } : undefined}
                >
                  <h3
                    className="font-serif font-bold text-base mb-3"
                    style={{ color: "var(--ink, #020618)" }}
                  >
                    {section.title}
                  </h3>
                  <ul className="flex flex-col gap-2">
                    {section.items.map((item: string, j: number) => (
                      <li key={j} className="flex gap-3 items-baseline text-sm leading-relaxed" style={{ color: "var(--slate-3, #45556c)" }}>
                        <span className="shrink-0 w-3 h-px mt-2.5" style={{ background: "var(--slate-2, #90a1b9)" }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>

        {livePage.links?.length > 0 && (
          <div className="max-w-[900px] mx-auto px-4 md:px-14 pb-16">
            <section style={{ borderTop: "1px solid var(--border, #e2e8f0)" }} className="pt-8">
              <h2 className="font-serif font-bold text-lg md:text-xl mb-5" style={{ color: "var(--ink-2, #0f172b)" }}>Länkar</h2>
              <div className="flex flex-col gap-3">
                {livePage.links.map((link: any) => (
                  <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" className="text-sm underline hover:opacity-70 transition-opacity" style={{ color: "var(--ink, #020618)" }}>
                    {link.label}
                  </a>
                ))}
              </div>
            </section>
          </div>
        )}
      </div>
    );
  }

  // Plain body text mode (other pages)
  const paragraphs = typeof body === "string"
    ? body.split("\n").filter((p: string) => p.trim())
    : (body?.root?.children?.map((block: any) =>
        block.children?.map((child: any) => child.text ?? "").join("") ?? ""
      ).filter((t: string) => t.trim()) ?? []);

  return (
    <div className="w-full relative">
      <TopoLines
        className="pointer-events-none absolute inset-x-0 top-0 h-[500px] w-full -z-10"
        opacity={0.04}
      />
      <section className="relative max-w-[900px] mx-auto px-4 md:px-14 pt-16 md:pt-24 pb-8">
        <h1
          className="font-serif font-bold leading-[0.96] tracking-tight"
          style={{ fontSize: "clamp(36px, 4vw, 64px)", color: "var(--ink-2, #0f172b)", letterSpacing: "-0.02em" }}
          data-payload-field="title"
        >
          {title}
        </h1>
      </section>

      <div className="max-w-[900px] mx-auto px-4 md:px-14 pb-16" data-payload-field="body">
        {(() => {
          const out: React.ReactNode[] = [];
          let listBuf: string[] = [];
          const flushList = () => {
            if (listBuf.length === 0) return;
            out.push(
              <ul key={`ul-${out.length}`} className="flex flex-col gap-2 mb-4 list-disc list-inside" style={{ color: "var(--slate-3, #45556c)" }}>
                {listBuf.map((item, j) => (
                  <li key={j} className="text-base leading-relaxed">{item}</li>
                ))}
              </ul>
            );
            listBuf = [];
          };

          paragraphs.forEach((text: string, i: number) => {
            const trimmed = text.trim();
            if (/^[-•]\s+/.test(trimmed)) {
              listBuf.push(trimmed.replace(/^[-•]\s+/, ""));
              return;
            }
            flushList();
            const isHeading = trimmed.length < 60 && !trimmed.includes(". ") && !trimmed.includes(",");
            if (isHeading) {
              out.push(
                <h3 key={i} className="font-serif font-bold text-lg mt-10 mb-3" style={{ color: "var(--ink-2, #0f172b)" }}>
                  {trimmed}
                </h3>
              );
            } else {
              out.push(
                <p key={i} className="text-base leading-relaxed mb-4" style={{ color: "var(--slate-3, #45556c)" }}>
                  {trimmed}
                </p>
              );
            }
          });
          flushList();
          return out;
        })()}
      </div>

      {livePage.links?.length > 0 && (
        <div className="max-w-[900px] mx-auto px-4 md:px-14 pb-16">
          <section style={{ borderTop: "1px solid var(--border, #e2e8f0)" }} className="pt-8">
            <h2 className="font-serif font-bold text-lg md:text-xl mb-5" style={{ color: "var(--ink-2, #0f172b)" }}>Länkar</h2>
            <div className="flex flex-col gap-3">
              {livePage.links.map((link: any) => (
                <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" className="text-sm underline hover:opacity-70 transition-opacity" style={{ color: "var(--ink, #020618)" }}>
                  {link.label}
                </a>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default PageView;
