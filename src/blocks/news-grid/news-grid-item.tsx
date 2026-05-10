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
    <article className="flex flex-col gap-2">
      <Link to={`/nyheter/${slug}`}>
        <img
          src={image}
          alt={title}
          className="w-full aspect-4/3 object-cover"
        />
        <div className="p-4 flex flex-col gap-2">
          <div className="flex flex-col">
            <p className="font-serif italic text-lg text-muted-foreground">
              {category}
            </p>
            <h3>{title}</h3>
            <p className="text-muted-foreground">
              {format(publishedAt, "d MMMM, yyyy", { locale: sv })}
            </p>
          </div>
          <p className="text-foreground">{description}</p>
        </div>
      </Link>
    </article>
  );
};

export default NewsGridItem;
