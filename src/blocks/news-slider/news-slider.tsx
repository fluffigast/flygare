import React, { useState } from "react";
import { Link } from "react-router";
import { news } from "../../data/news";
import { getPlaceholderImage } from "../../utils/placeholder";

interface NewsSliderProps {
  label?: string;
  excludeSlug?: string;
}

const NewsSlider: React.FC<NewsSliderProps> = ({ label = "Nyheter", excludeSlug }) => {
  const items = excludeSlug ? news.filter((n) => n.slug !== excludeSlug) : news;
  const [page, setPage] = useState(0);
  const perPage = 3;
  const pages = Math.max(1, Math.ceil(items.length / perPage));
  const visible = items.slice(page * perPage, page * perPage + perPage);

  return (
    <section className="mt-24">
      <div className="site-container">
        {/* Head */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="h-news">{label}</h2>
          <div className="flex gap-1.5">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="w-9 h-9 grid place-items-center rounded-full border border-hairline transition-colors hover:bg-paper hover:border-ink-2 disabled:opacity-35 disabled:cursor-not-allowed"
              aria-label="Föregående"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
            </button>
            <button
              onClick={() => setPage((p) => Math.min(pages - 1, p + 1))}
              disabled={page >= pages - 1}
              className="w-9 h-9 grid place-items-center rounded-full border border-hairline transition-colors hover:bg-paper hover:border-ink-2 disabled:opacity-35 disabled:cursor-not-allowed"
              aria-label="Nästa"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
            </button>
          </div>
        </div>

        {/* Strip */}
        <div className="border-t border-b border-hairline py-5">
          <div className="grid grid-cols-1 md:grid-cols-3">
            {visible.map((item, i) => (
              <Link
                key={item.slug}
                to={`/nyheter/${item.slug}`}
                className={`group grid grid-cols-[120px_1fr] cursor-pointer ${
                  i < visible.length - 1 ? "md:border-r border-hairline" : ""
                }`}
              >
                <div
                  className="w-[120px] h-[100px] bg-cover bg-center"
                  style={{ backgroundImage: `url(${getPlaceholderImage(item.id)})` }}
                />
                <div className="flex flex-col justify-center gap-2 px-5 py-3">
                  <p className="font-serif font-bold text-lg leading-snug text-ink transition-colors group-hover:text-accent">
                    {item.title}
                  </p>
                  <p className="text-sm text-slate">{item.publishedAt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: pages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={`w-1.5 h-1.5 rounded-full transition-all ${
                i === page ? "bg-ink scale-130" : "bg-border-2 hover:bg-slate-2"
              }`}
              aria-label={`Sida ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSlider;
