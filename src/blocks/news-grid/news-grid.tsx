import React, { useMemo, useRef, useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router";
import NewsGridItem from "./news-grid-item";
import { getPlaceholderImage } from "../../utils/placeholder";
import type { NewsItems } from "../../data/news";
import Pagination from "../../components/pagination";
import Separator from "../../components/separator";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

export interface NewsGridProps {
  news: NewsItems;
}

const NewsGrid: React.FC<NewsGridProps> = ({ news }) => {
  const [searchParams] = useSearchParams();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(news.length / itemsPerPage);

  const currentPage = useMemo(() => {
    const pageParam = searchParams.get("page");
    if (pageParam) {
      const page = parseInt(pageParam, 10);

      if (!isNaN(page) && page >= 1 && page <= totalPages) {
        return page;
      }
    }
    return 1;
  }, [searchParams, totalPages]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentNews = news.slice(startIndex, endIndex);

  const checkScrollability = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth
      );
    }
  };

  useEffect(() => {
    checkScrollability();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScrollability);
      window.addEventListener("resize", checkScrollability);
      return () => {
        container.removeEventListener("scroll", checkScrollability);
        window.removeEventListener("resize", checkScrollability);
      };
    }
  }, [news]);

  const scrollLeft = () => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  return (
    <>
      <section className="flex flex-col gap-16">
        <div className="flex flex-col gap-8 w-full">
          <Separator />
          <div className="flex items-center gap-4 w-full relative">
            {canScrollLeft && (
              <div className="h-full w-16 absolute left-0 flex items-center justify-start bg-linear-to-r from-30% from-background to-background/0">
                <button
                  onClick={scrollLeft}
                  className="cursor-pointer hover:opacity-70"
                  aria-label="Scroll left"
                >
                  <ChevronLeftIcon />
                </button>
              </div>
            )}
            <div
              ref={scrollContainerRef}
              className="flex items-center gap-3 md:gap-8 overflow-x-auto overflow-y-hidden scrollbar-hide flex-1"
            >
              <Link className="text-nowrap" to="/nyheter">
                Alla kategorier
              </Link>
              {[...new Set(news.map((n) => n.category.toLowerCase()))]
                .sort()
                .map((category) => (
                  <Link
                    key={category}
                    className="text-nowrap"
                    to={`/nyheter?category=${category}`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </Link>
                ))}
            </div>
            {canScrollRight && (
              <div className="h-full w-16 absolute right-0 flex items-center justify-end bg-linear-to-l from-30% from-background to-background/0">
                <button
                  onClick={scrollRight}
                  className="cursor-pointer hover:opacity-70"
                  aria-label="Scroll right"
                >
                  <ChevronRightIcon />
                </button>
              </div>
            )}
          </div>
          <Separator />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            basePath="/nyheter"
          />
        )}
      </section>
    </>
  );
};

export default NewsGrid;
