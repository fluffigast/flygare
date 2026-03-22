import React from "react";
import SitesGrid from "../../blocks/sites-grid/sites-grid";
import SitesMap from "../../blocks/sites-map/sites-map";
import { sites } from "../../data/sites";

export interface SitesViewProps {}

const SitesView: React.FC<SitesViewProps> = ({}) => {
  return (
    <>
      <SitesMap sites={sites} />
      <div className="max-w-2xl px-4 flex gap-16 flex-col w-full">
        <SitesGrid sites={sites} />
      </div>
    </>
  );
};

export default SitesView;
