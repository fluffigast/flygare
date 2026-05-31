import React from "react";
import { Link, useParams } from "react-router";
import { format } from "date-fns";
import { sv } from "date-fns/locale";
import { news as localNews } from "../../../data/news";
import { articles } from "../../../data/articles";
import { getPlaceholderImage } from "../../../utils/placeholder";
import NewsSlider from "../../../blocks/news-slider/news-slider";
import { useNews } from "../../../hooks/useCMS";

const NewsSingleView: React.FC = () => {
  const { slug } = useParams();
  const { data: cmsNews } = useNews(localNews);

  const newsItem =
    cmsNews.find((n: any) => n.slug === slug || n.id?.toString() === slug) ??
    localNews.find((n) => n.slug === slug);

  if (!newsItem) {
    return (
      <div className="max-w-2xl px-4 py-24 text-center flex flex-col gap-4">
        <h1 className="text-4xl font-bold">Nyheten hittades inte</h1>
        <p style={{ color: "var(--slate, #62748e)" }}>
          Innehållet du söker finns inte.
        </p>
        <Link
          to="/nyheter"
          className="hover:underline"
          style={{ color: "var(--hero-accent, #3774a3)" }}
        >
          Tillbaka till nyheter
        </Link>
      </div>
    );
  }

  const imageUrl = (newsItem as any).image?.url ?? (newsItem as any).image?.sizes?.hero?.url ?? getPlaceholderImage(slug ?? "fallback");

  return (
    <div className="w-full">
      {/* Image header */}
      <div
        className="w-full relative"
        style={{
          height: "clamp(280px, 34vw, 540px)",
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, transparent 50%, rgba(0,0,0,.35) 100%)",
          }}
        />
      </div>

      {/* Article shell */}
      <article className="max-w-[1200px] mx-auto px-4 md:px-8 pt-16 md:pt-24">
        {/* Header */}
        <header className="mb-10 md:mb-12">
          <span
            className="font-serif italic text-xl md:text-[32px] block mb-3"
            style={{ color: "var(--slate, #62748e)" }}
          >
            {(newsItem as any).category ?? "Nyheter"}
          </span>
          <h1
            className="font-serif font-bold leading-none tracking-tight"
            style={{
              fontSize: "clamp(36px, 5vw, 64px)",
              color: "var(--ink-2, #0f172b)",
              letterSpacing: "-0.02em",
            }}
          >
            {newsItem.title}
          </h1>
          <p className="mt-5 text-base" style={{ color: "var(--slate-2, #90a1b9)" }}>
            Publicerad{" "}
            {format(
              new Date((newsItem as any).publishedAt ?? (newsItem as any).date ?? new Date()),
              "d MMMM, yyyy",
              { locale: sv }
            )}
          </p>
        </header>

        {/* Two-column body */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 lg:gap-24">
          {/* Article body */}
          <div>
            <p
              className="font-serif italic text-lg md:text-2xl leading-snug mb-8"
              style={{ color: "var(--ink-2, #0f172b)" }}
            >
              {(newsItem as any).description ?? newsItem.excerpt}
            </p>
            <div className="flex flex-col gap-4">
              {((newsItem as any).content ?? (newsItem as any).description ?? "")
                .split("\n")
                .filter((p: string) => p.trim())
                .map((p: string, i: number) => (
                  <p
                    key={i}
                    className="text-base leading-relaxed"
                    style={{ color: "var(--slate-3, #45556c)" }}
                  >
                    {p}
                  </p>
                ))}
            </div>
          </div>

          {/* Aside */}
          <aside className="flex flex-col gap-8">
            <h3
              className="font-serif font-bold text-xl md:text-[32px] leading-none"
              style={{ color: "var(--ink-2, #0f172b)" }}
            >
              Relaterad information
            </h3>
            {articles.slice(0, 2).map((a) => (
              <div key={a.id} className="flex flex-col gap-2">
                <h4
                  className="font-serif font-bold text-base"
                  style={{ color: "var(--ink-2, #0f172b)" }}
                >
                  {a.title}
                </h4>
                <p
                  className="text-base leading-relaxed"
                  style={{ color: "var(--slate, #62748e)" }}
                >
                  {a.excerpt}
                </p>
                <Link
                  to={`/flyga-i-are/${a.slug}`}
                  className="text-sm mt-1 hover:underline"
                  style={{ color: "var(--hero-accent, #3774a3)" }}
                >
                  Läs mer &rarr;
                </Link>
              </div>
            ))}
          </aside>
        </div>
      </article>

      {/* Related news */}
      <div className="max-w-[1480px] mx-auto px-4 md:px-14 mt-16 md:mt-24">
        <NewsSlider />
      </div>
    </div>
  );
};

export default NewsSingleView;
