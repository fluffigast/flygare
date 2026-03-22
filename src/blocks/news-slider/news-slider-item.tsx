import React from "react";
import { format } from "date-fns";
import { sv } from "date-fns/locale";

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
  imageUrl,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "d MMMM, yyyy", { locale: sv });
  };

  return (
    <article className="flex gap-4 flex-1 min-w-0">
      <div className="w-32 h-28 overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col justify-start flex-1 min-w-0 text-ellipsis pt-4">
        <h4 className="line-clamp-2">{title}</h4>
        <p className="text-muted-foreground">{formatDate(publishedAt)}</p>
      </div>
    </article>
  );
};

export default NewsSliderItem;
