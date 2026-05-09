import { format } from "date-fns";
import { sv } from "date-fns/locale";
import { Link } from "react-router";
import React from "react";

export interface NewsGridItemProps {
  category: string;
  title: string;
  description: string;
  publishedAt: string;
  image: string;
  slug: string;
}

const NewsGridItem: React.FC<NewsGridItemProps> = ({
  category,
  title,
  description,
  publishedAt,
  image,
  slug,
}) => {
  return (
    <Link
      to={`/nyheter/${slug}`}
      className="group flex flex-col transition-transform duration-200 hover:-translate-y-0.5"
    >
      <div
        className="w-full aspect-[730/380] bg-cover bg-center bg-[#d6dde6]"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="pt-6 flex flex-col gap-3">
        <p className="font-serif italic text-sm text-accent tracking-wide">{category}</p>
        <h3 className="font-serif font-bold text-[clamp(22px,2vw,32px)] leading-tight text-ink tracking-tight text-pretty">
          {title}
        </h3>
        <p className="text-base leading-6 text-slate">{description}</p>
        <div className="flex justify-between items-center mt-2">
          <span className="text-sm text-slate-2">
            {format(publishedAt, "d MMMM, yyyy", { locale: sv })}
          </span>
          <span className="text-ink transition-transform duration-200 group-hover:translate-x-1.5">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="13 6 19 12 13 18" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
};

export default NewsGridItem;
