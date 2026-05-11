import React from "react";
import type { Article } from "../../data/articles";
import { getPlaceholderImage } from "../../utils/placeholder";
import { Link } from "react-router";

export interface ArticlesGridItemProps {
  article: Article;
}

const ArticlesGridItem: React.FC<ArticlesGridItemProps> = ({ article }) => {
  const { title, excerpt } = article;
  return (
    <article className="flex flex-col gap-2 group hover:-translate-y-1 transition-transform duration-200">
      <Link to={`/information/${article.slug}`}>
        <img
          src={article.imageUrl ?? getPlaceholderImage(article.id)}
          alt={title}
          className="w-full aspect-3/4 object-cover bg-muted"
        />
      </Link>
      <div className="p-4 flex flex-col gap-2">
        <Link to={`/information/${article.slug}`}>
          <h3>{title}</h3>
        </Link>
        <p className="text-muted-foreground">{excerpt}</p>
      </div>
    </article>
  );
};

export default ArticlesGridItem;
