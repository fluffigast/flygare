import React from "react";
import Pagination from "../../components/pagination";
import type { Article } from "../../data/articles";
import ArticlesGridItem from "./articles-grid-item";

export interface ArticlesGridProps {
  articles: Article[];
  maxNumArticles?: number;
  showPagination?: boolean;
}

const ArticlesGrid: React.FC<ArticlesGridProps> = ({
  articles,
  maxNumArticles = 6,
  showPagination = true,
}) => {
  return (
    <section className="flex flex-col gap-4 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.slice(0, maxNumArticles).map((article) => (
          <ArticlesGridItem key={article.id} article={article} />
        ))}
      </div>
      {showPagination && (
        <Pagination currentPage={1} totalPages={1} basePath="/flyga-i-are" />
      )}
    </section>
  );
};

export default ArticlesGrid;
