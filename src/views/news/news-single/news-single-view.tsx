import React from "react";
import { Link, useParams } from "react-router";
import { news as localNews } from "../../../data/news";
import { articles } from "../../../data/articles";
import { format } from "date-fns";
import { sv } from "date-fns/locale";
import HeroBanner from "../../../blocks/hero-banner/hero-banner";
import { getPlaceholderImage } from "../../../utils/placeholder";
import NewsSlider from "../../../blocks/news-slider/news-slider";
import { useNews } from "../../../hooks/useCMS";

const NewsSingleView: React.FC = () => {
  const { slug } = useParams();
  const { data: cmsNews } = useNews(localNews);

  // Look up by slug in CMS data first, then local data
  const newsItem = cmsNews.find((n: any) => n.slug === slug || n.id?.toString() === slug)
    ?? localNews.find((n) => n.slug === slug);

  if (!newsItem) {
    return (
      <div className="max-w-2xl px-4 py-24 text-center flex flex-col gap-4">
        <h1 className="text-4xl font-bold">Nyheten hittades inte</h1>
        <p className="text-muted-foreground">Innehållet du söker finns inte.</p>
        <Link to="/nyheter" className="text-primary hover:underline">Tillbaka till nyheter</Link>
      </div>
    );
  }
  return (
    <>
      <HeroBanner
        imageUrl={
          getPlaceholderImage(slug ?? "fallback") ??
          `https://placehold.co/1920x1080?text=${newsItem?.slug}`
        }
      />
      <article className="max-w-2xl mx-auto px-4 flex flex-col w-full">
        <div className="flex flex-col">
          <p className="text-muted-foreground font-serif italic text-2xl">
            {newsItem?.category}
          </p>
          <h1 className="text-2xl md:text-4xl lg:text-5xl mb-2">{newsItem?.title}</h1>
          <p className="text-muted-foreground">
            Publicerad den{" "}
            {format(newsItem?.publishedAt, "d MMMM, yyyy", { locale: sv })}
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 p-4 md:p-16">
          <div className="flex-2 flex flex-col gap-4">
            <p className="font-serif italic text-3xl text-foreground">
              {newsItem?.excerpt}
            </p>
            <p>{newsItem?.content}</p>
          </div>
          <div className="flex-1 flex flex-col gap-4">
            <h3>Relaterade artiklar</h3>
            <ul className="flex flex-col gap-4">
              {articles.slice(0, 2).map((a) => (
                <li key={a.id}>
                  <h4>
                    <Link to={`/flyga-i-are/${a.slug}`}>{a.title}</Link>
                  </h4>
                  <p>{a.excerpt}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </article>
      <NewsSlider />
    </>
  );
};

export default NewsSingleView;
