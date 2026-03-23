import React from "react";
import HeroBanner from "../../blocks/hero-banner/hero-banner";
import NewsGrid from "../../blocks/news-grid/news-grid";
import { news as localNews } from "../../data/news";
import { useNews, useCMSLivePreview } from "../../hooks/useCMS";
import { getPlaceholderImage } from "../../utils/placeholder";

const NewsView: React.FC = () => {
  const { data: cmsNews, setData: setCmsNews } = useNews(localNews);
  useCMSLivePreview((data) => {
    if (data?.id) setCmsNews((prev: any[]) => prev.map((n: any) => n.id === data.id ? data : n));
  });

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
      <div className="max-w-2xl px-4 flex gap-16 flex-col w-full">
        <section>
          <NewsGrid news={news} />
        </section>
      </div>
    </>
  );
};

export default NewsView;
