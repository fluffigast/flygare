import React from "react";
import HeroBanner from "../../blocks/hero-banner/hero-banner";
import NewsGrid from "../../blocks/news-grid/news-grid";
import { news } from "../../data/news";
import { getRandomPlaceholderImage } from "../../utils/placeholder";

export interface NewsViewProps {}

const NewsView: React.FC<NewsViewProps> = ({}) => {
  return (
    <>
      <HeroBanner />
      <div className="max-w-2xl px-4 flex gap-16 flex-col w-full">
        <section>
          <NewsGrid
            news={news.map((newsItem) => ({
              ...newsItem,
              imageUrl: getRandomPlaceholderImage(),
            }))}
          />
        </section>
      </div>
    </>
  );
};

export default NewsView;
