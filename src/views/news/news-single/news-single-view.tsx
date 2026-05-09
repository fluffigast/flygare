import React from "react";
import { Link, useParams } from "react-router";
import { news } from "../../../data/news";
import { articles } from "../../../data/articles";
import { format } from "date-fns";
import { sv } from "date-fns/locale";
import HeroBanner from "../../../blocks/hero-banner/hero-banner";
import { getPlaceholderImage } from "../../../utils/placeholder";
import NewsSlider from "../../../blocks/news-slider/news-slider";

const NewsSingleView: React.FC = () => {
  const { slug } = useParams();
  const newsItem = news.find((n) => n.slug === slug);

  if (!newsItem) {
    return (
      <div className="site-container py-24 text-center flex flex-col gap-4">
        <h1 className="display">Sidan hittades inte</h1>
        <p className="text-slate">Innehållet du söker finns inte.</p>
      </div>
    );
  }

  return (
    <main>
      <HeroBanner
        imageUrl={getPlaceholderImage(slug ?? "fallback")}
        compact
      />

      <article className="max-w-[1200px] mx-auto pt-24 px-4">
        <header className="mb-12">
          <span className="eyebrow-sm block mb-3">{newsItem.category}</span>
          <h1 className="font-serif font-bold text-[clamp(36px,5vw,64px)] leading-none text-ink-2 tracking-tight text-balance">
            {newsItem.title}
          </h1>
          <p className="mt-6 text-base text-slate-2">
            Publicerad {format(newsItem.publishedAt, "d MMMM, yyyy", { locale: sv })}
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-16 lg:gap-24">
          <div className="flex flex-col gap-4">
            <p className="font-serif italic text-2xl leading-snug text-ink-2 text-pretty">
              {newsItem.excerpt}
            </p>
            <p className="text-base leading-6 text-slate-3">{newsItem.content}</p>
          </div>

          <aside className="flex flex-col gap-8">
            <h3 className="font-serif font-bold text-[clamp(22px,2vw,32px)] leading-none text-ink-2">
              Relaterad information
            </h3>
            {articles.slice(0, 2).map((a) => (
              <div key={a.id} className="flex flex-col gap-2">
                <h4 className="font-serif font-bold text-base text-ink-2">{a.title}</h4>
                <p className="text-base leading-6 text-slate">{a.excerpt}</p>
                <Link
                  to={`/information/${a.slug}`}
                  className="text-sm text-accent inline-flex gap-1.5 items-center mt-1 hover:underline"
                >
                  Läs mer &rarr;
                </Link>
              </div>
            ))}
          </aside>
        </div>
      </article>

      <NewsSlider label="Fler nyheter" excludeSlug={slug} />
    </main>
  );
};

export default NewsSingleView;
