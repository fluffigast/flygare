import React from "react";
import type { Site } from "../../data/sites";
import SitesGridItem from "./sites-grid-item";

export interface SitesGridProps {
  sites: Site[];
}

const SitesGrid: React.FC<SitesGridProps> = ({ sites }) => {
  return (
    <section className="flex flex-col gap-4 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sites.map((site) => (
          <SitesGridItem key={site.id} site={site} />
        ))}
      </div>
    </section>
  );
};

export default SitesGrid;
