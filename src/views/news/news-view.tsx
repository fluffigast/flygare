import React from "react";
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
    <main>
      <section className="pt-24 pb-12 px-6 md:px-28">
        <p className="eyebrow text-accent">Aktuellt</p>
        <h1 className="display mt-[-4px]">Senaste nytt</h1>
      </section>

      <div className="site-container">
        <NewsGrid news={news} />
      </div>
    </main>
  );
};

export default NewsView;
