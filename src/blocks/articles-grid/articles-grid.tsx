import React from "react";
import type { Article } from "../../data/articles";
import ArticlesGridItem from "./articles-grid-item";

export interface ArticlesGridProps {
  articles: Article[];
  maxNumArticles?: number;
}

const ArticlesGrid: React.FC<ArticlesGridProps> = ({
  articles,
  maxNumArticles = 6,
}) => {
  const items = articles.slice(0, maxNumArticles);
  const rows = [items.slice(0, 3), items.slice(3, 6)].filter((r) => r.length > 0);

  return (
    <section className="flex flex-col gap-5 w-full">
      {rows.map((row, i) => (
        <div key={i} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {row.map((article) => (
            <ArticlesGridItem key={article.id} article={article} />
          ))}
        </div>
      ))}
    </section>
  );
};

export default ArticlesGrid;
