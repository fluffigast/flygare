import React, { useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import NewsGridItem from "./news-grid-item";
import { getPlaceholderImage } from "../../utils/placeholder";
import type { NewsItems } from "../../data/news";

export interface NewsGridProps {
  news: NewsItems;
}

const CATEGORIES = ["Alla", "Aktiviteter", "Aktuellt", "Säkerhet", "Tävlingar", "Åre"];
const ITEMS_PER_PAGE = 6;

const NewsGrid: React.FC<NewsGridProps> = ({ news }) => {
  const [searchParams] = useSearchParams();
  const [filter, setFilter] = useState("Alla");

  const filtered = useMemo(
    () => (filter === "Alla" ? news : news.filter((n) => n.category === filter)),
    [news, filter]
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const currentPage = useMemo(() => {
    const p = parseInt(searchParams.get("page") ?? "1", 10);
    return isNaN(p) || p < 1 ? 1 : Math.min(p, totalPages);
  }, [searchParams, totalPages]);

  const currentNews = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <section className="flex flex-col gap-12">
      {/* Filter bar */}
      <div className="py-5 flex gap-7 justify-center flex-wrap">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`text-sm text-ink py-1.5 px-1 border-b-2 transition-colors ${
              filter === c
                ? "border-ink font-semibold"
                : "border-transparent hover:text-accent"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {currentNews.map((article) => (
          <NewsGridItem
            key={article.id}
            slug={article.slug}
            category={article.category}
            publishedAt={article.publishedAt}
            title={article.title}
            description={article.excerpt}
            image={getPlaceholderImage(article.id)}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="py-8 flex gap-7 justify-center">
          <button className="text-sm text-ink">Föregående</button>
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              className={`text-sm px-2 py-1 rounded ${
                i + 1 === currentPage ? "bg-ink text-white" : "text-ink hover:bg-paper"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button className="text-sm text-ink">Nästa sida</button>
        </div>
      )}
    </section>
  );
};

export default NewsGrid;
