import React from "react";
import HeroBanner from "../../blocks/hero-banner/hero-banner";
import NewsGrid from "../../blocks/news-grid/news-grid";
import { news as localNews } from "../../data/news";
import { useNews } from "../../hooks/useCMS";
import { getPlaceholderImage } from "../../utils/placeholder";

const NewsView: React.FC = () => {
  const { data: cmsNews } = useNews(localNews);

  const news = cmsNews.map((item: any) => ({
    id: item.id?.toString() ?? item.slug ?? "unknown",
    title: item.title,
    slug: item.slug ?? item.id?.toString(),
    category: item.category ?? "Information",
    excerpt: item.excerpt ?? "",
    content: item.content ?? "",
    publishedAt: item.publishedAt ?? item.date ?? item.createdAt,
    imageUrl: getPlaceholderImage(item.id?.toString() ?? item.slug),
  }));

  return (
    <>
      <HeroBanner />
      <div className="max-w-2xl mx-auto px-4 flex gap-16 flex-col w-full py-16">
        <section>
          <NewsGrid news={news} />
        </section>
      </div>
    </>
  );
};

export default NewsView;
