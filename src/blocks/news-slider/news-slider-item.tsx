import React from "react";
import { format } from "date-fns";
import { sv } from "date-fns/locale";
import { Link } from "react-router";

export interface NewsSliderItemProps {
  id: string;
  title: string;
  publishedAt: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  imageUrl?: string;
}

const NewsSliderItem: React.FC<NewsSliderItemProps> = ({
  title,
  publishedAt,
  slug,
  imageUrl,
}) => {
  const formatDate = (dateString: string) => {
    // Append T12:00:00 to date-only strings to avoid UTC timezone shift
    const safe = dateString.includes("T") ? dateString : `${dateString}T12:00:00`;
    return format(new Date(safe), "d MMMM, yyyy", { locale: sv });
  };

  const content = (
    <article className="flex gap-4 flex-1 min-w-0">
      {imageUrl && (
        <div className="w-24 md:w-32 h-20 md:h-28 shrink-0 overflow-hidden rounded">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="flex flex-col justify-start flex-1 min-w-0 text-ellipsis pt-4">
        <h4 className="line-clamp-2">{title}</h4>
        <p className="text-muted-foreground">{formatDate(publishedAt)}</p>
      </div>
    </article>
  );

  if (slug) {
    return <Link to={`/nyheter/${slug}`}>{content}</Link>;
  }

  return content;
};

export default NewsSliderItem;
