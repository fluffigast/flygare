import React from "react";
import type { Site } from "../../data/sites";
import { getPlaceholderImage } from "../../utils/placeholder";
import { Link } from "react-router";

export interface SitesGridItemProps {
  site: Site;
}

const SitesGridItem: React.FC<SitesGridItemProps> = ({ site }) => {
  const { title, excerpt } = site;
  return (
    <article className="flex flex-col gap-2 group hover:-translate-y-1 transition-transform duration-200">
      <Link to={`/startplatser/${site.slug}`} key={site.id}>
        <img
          src={getPlaceholderImage(site.id)}
          alt={title}
          className="w-full aspect-3/4 object-cover"
        />
      </Link>
      <div className="p-4 flex flex-col gap-2">
        <Link to={`/startplatser/${site.slug}`} key={site.id}>
          <h3>{title}</h3>
        </Link>
        <p className="text-muted-foreground">{excerpt}</p>
      </div>
    </article>
  );
};

export default SitesGridItem;
