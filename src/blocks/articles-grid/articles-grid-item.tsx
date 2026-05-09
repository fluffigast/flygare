import React from "react";
import type { Article } from "../../data/articles";
import { getPlaceholderImage } from "../../utils/placeholder";
import { Link } from "react-router";

export interface ArticlesGridItemProps {
  article: Article;
}

const ArticlesGridItem: React.FC<ArticlesGridItemProps> = ({ article }) => {
  return (
    <Link
      to={`/information/${article.slug}`}
      className="group flex flex-col transition-transform duration-200 hover:-translate-y-0.5"
    >
      <div
        className="w-full aspect-[480/560] bg-cover bg-center bg-[#e9eef3] transition-[filter] duration-200 group-hover:brightness-[1.04]"
        style={{ backgroundImage: `url(${getPlaceholderImage(article.id)})` }}
      />
      <div className="p-5 flex flex-col gap-3">
        <h3 className="font-serif font-bold text-[clamp(22px,2vw,32px)] leading-none text-ink tracking-tight">
          {article.title}
        </h3>
        <p className="text-base leading-6 text-slate">{article.excerpt}</p>
        <div className="mt-1 w-7 h-7 grid place-items-center text-ink transition-transform duration-200 group-hover:translate-x-1.5">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="13 6 19 12 13 18" />
          </svg>
        </div>
      </div>
    </Link>
  );
};

export default ArticlesGridItem;
