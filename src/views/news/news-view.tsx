import React, { useMemo } from "react";
import { Link, useSearchParams } from "react-router";
import { ArrowRightIcon } from "lucide-react";
import { format } from "date-fns";
import { sv } from "date-fns/locale";
import { news as localNews } from "../../data/news";
import { useNews } from "../../hooks/useCMS";
import { getPlaceholderImage } from "../../utils/placeholder";

const ITEMS_PER_PAGE = 6;

const NewsView: React.FC = () => {
  const { data: cmsNews } = useNews(localNews);
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("category") ?? "Alla kategorier";

  const news = cmsNews.map((item: any) => ({
    id: item.id?.toString() ?? item.slug ?? "unknown",
    title: item.title,
    slug: item.slug ?? item.id?.toString(),
    category: item.category ?? "Information",
    excerpt: item.description ?? item.excerpt ?? "",
    publishedAt: item.publishedAt ?? item.date ?? item.createdAt,
    imageUrl: item.image?.url ?? item.image?.sizes?.hero?.url ?? getPlaceholderImage(item.id?.toString() ?? item.slug),
  }));

  // Categories fixed per site spec (pptx): Alla kategorier + 4 canonical.
  const CATEGORIES = useMemo(
    () => ["Alla kategorier", "Aktiviteter", "Information", "Tävlingar", "Övrigt"],
    []
  );

  const filtered = useMemo(() => {
    if (activeCategory === "Alla kategorier") return news;
    return news.filter(
      (n: any) => n.category.toLowerCase() === activeCategory.toLowerCase()
    );
  }, [news, activeCategory]);

  const pageParam = parseInt(searchParams.get("page") ?? "1", 10);
  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const currentPage = Math.min(Math.max(1, pageParam), totalPages);
  const paged = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const setCategory = (cat: string) => {
    const params = new URLSearchParams();
    if (cat !== "Alla kategorier") params.set("category", cat);
    setSearchParams(params);
  };

  const setPage = (p: number) => {
    const params = new URLSearchParams(searchParams);
    if (p > 1) params.set("page", String(p));
    else params.delete("page");
    setSearchParams(params);
  };

  return (
    <div className="w-full">
      {/* Editorial header */}
      <section className="max-w-[1480px] mx-auto px-4 md:px-14 pt-16 md:pt-24 pb-10 md:pb-12">
        <p
          className="font-serif italic text-2xl md:text-[40px] leading-none"
          style={{ color: "var(--hero-accent, #3774a3)" }}
        >
          Aktuellt
        </p>
        <h1
          className="font-serif font-bold leading-[0.96] tracking-tight mt-1"
          style={{
            fontSize: "clamp(48px, 6vw, 96px)",
            color: "var(--ink-2, #0f172b)",
            letterSpacing: "-0.02em",
          }}
        >
          Senaste nytt
        </h1>
      </section>

      <div className="max-w-[1480px] mx-auto px-4 md:px-14">
        {/* Filter bar */}
        <div
          className="flex flex-wrap gap-4 md:gap-7 justify-center py-5 mb-10 md:mb-12"
          style={{
            borderTop: "1px solid var(--border, #e2e8f0)",
            borderBottom: "1px solid var(--border, #e2e8f0)",
          }}
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className="text-sm py-1.5 px-1 transition-colors"
              style={{
                color: activeCategory === cat ? "var(--ink, #020618)" : "var(--ink, #020618)",
                fontWeight: activeCategory === cat ? 600 : 400,
                borderBottom: activeCategory === cat ? "2px solid var(--ink, #020618)" : "2px solid transparent",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 2-column news grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-x-5 md:gap-y-8">
          {paged.map((item: any) => (
            <Link
              key={item.id}
              to={`/nyheter/${item.slug}`}
              className="group flex flex-col transition-transform duration-200 hover:-translate-y-0.5"
            >
              <div
                className="w-full bg-cover bg-center"
                style={{
                  backgroundImage: `url(${item.imageUrl})`,
                  aspectRatio: "730 / 380",
                  backgroundColor: "#d6dde6",
                }}
              />
              <div className="pt-5 flex flex-col gap-3">
                <span
                  className="font-serif italic text-sm tracking-wide"
                  style={{ color: "var(--hero-accent, #3774a3)" }}
                >
                  {item.category}
                </span>
                <h3
                  className="font-serif font-bold text-xl md:text-[32px] leading-tight tracking-tight"
                  style={{ color: "var(--ink, #020618)" }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-base leading-relaxed"
                  style={{ color: "var(--slate, #62748e)" }}
                >
                  {item.excerpt}
                </p>
                <div className="flex justify-between items-center mt-2">
                  <span
                    className="text-sm"
                    style={{ color: "var(--slate-2, #90a1b9)" }}
                  >
                    {format(new Date(item.publishedAt), "d MMMM, yyyy", { locale: sv })}
                  </span>
                  <span
                    className="transition-transform duration-200 group-hover:translate-x-1.5"
                    style={{ color: "var(--ink, #020618)" }}
                  >
                    <ArrowRightIcon size={20} strokeWidth={1.4} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </section>

        {/* Pagination */}
        {totalPages > 1 && (
          <div
            className="flex gap-5 md:gap-7 justify-center py-8 mt-12 md:mt-16"
            style={{
              borderTop: "1px solid var(--border, #e2e8f0)",
              borderBottom: "1px solid var(--border, #e2e8f0)",
            }}
          >
            <button
              onClick={() => setPage(currentPage - 1)}
              disabled={currentPage <= 1}
              className="text-sm disabled:opacity-30"
              style={{ color: "var(--ink, #020618)" }}
            >
              Föregående
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => setPage(n)}
                className="text-sm px-2 py-1 rounded"
                style={{
                  background: n === currentPage ? "var(--ink, #020618)" : "transparent",
                  color: n === currentPage ? "#fff" : "var(--ink, #020618)",
                }}
              >
                {n}
              </button>
            ))}
            <button
              onClick={() => setPage(currentPage + 1)}
              disabled={currentPage >= totalPages}
              className="text-sm disabled:opacity-30"
              style={{ color: "var(--ink, #020618)" }}
            >
              Nästa sida
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsView;
