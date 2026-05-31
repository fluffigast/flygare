import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { RadioGroup } from "radix-ui";
import React, { useState, useRef, useEffect } from "react";
import Separator from "../../components/separator";
import { news as localNews } from "../../data/news";
import { getPlaceholderImage } from "../../utils/placeholder";
import NewsSliderItem from "./news-slider-item";
import { useNews } from "../../hooks/useCMS";

export interface NewsSliderProps {}

const NewsSlider: React.FC<NewsSliderProps> = ({}) => {
  const { data: cmsNews } = useNews(localNews);
  const newsItems = cmsNews.slice(0, 12).map((item: any) => ({
    ...item,
    id: item.id?.toString() ?? item.slug ?? "unknown",
    slug: item.slug ?? item.id?.toString(),
    publishedAt: item.publishedAt ?? item.date ?? item.createdAt,
    excerpt: item.description ?? item.excerpt ?? "",
  }));
  const itemsPerPage = 3;
  const totalPages = Math.max(1, Math.ceil(newsItems.length / itemsPerPage));
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const prevPageRef = useRef(currentPage);

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = newsItems.slice(startIndex, endIndex);

  useEffect(() => {
    if (currentPage > prevPageRef.current) {
      setDirection("right");
    } else if (currentPage < prevPageRef.current) {
      setDirection("left");
    }
    prevPageRef.current = currentPage;
  }, [currentPage]);

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
  };

  return (
    <section className="w-full @container max-w-2xl mx-auto px-4 py-8 flex flex-col gap-4">
      <div className="flex items-end justify-between w-full">
        <div className="flex-1">
          <h2 className="text-2xl font-semibold font-serif">Nyheter</h2>
        </div>
        <div className="flex gap-1">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 0}
            className="p-1.5 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted-foreground rounded transition-colors"
            aria-label="Föregående"
          >
            <ChevronLeftIcon />
          </button>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages - 1}
            className="p-1.5 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted-foreground rounded transition-colors"
            aria-label="Nästa"
          >
            <ChevronRightIcon />
          </button>
        </div>
      </div>
      <Separator />

      <div className="relative overflow-hidden min-h-[140px]">
        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
          {currentItems.map((item) => (
            <div
              key={`${item.id}-${currentPage}`}
              className={`flex-1 min-w-0 animate-fade-slide-${direction}`}
            >
              <NewsSliderItem
                {...item}
                imageUrl={item.image?.url ?? item.image?.sizes?.thumbnail?.url ?? getPlaceholderImage(item.id)}
              />
            </div>
          ))}
        </div>
      </div>
      <Separator />
      <RadioGroup.Root
        orientation="horizontal"
        value={String(currentPage)}
        onValueChange={(v) => setCurrentPage(Number(v))}
        className="flex justify-center gap-2"
        aria-label="Nyhetskarusell, välj sida"
      >
        {Array.from({ length: totalPages }).map((_, index) => (
          <RadioGroup.Item
            key={index}
            value={String(index)}
            className={`size-2 rounded-full transition-all outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
              index === currentPage
                ? "bg-black"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Gå till sida ${index + 1}`}
          />
        ))}
      </RadioGroup.Root>
    </section>
  );
};

export default NewsSlider;
