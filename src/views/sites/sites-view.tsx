import React from "react";
import SitesGrid from "../../blocks/sites-grid/sites-grid";
import SitesMap from "../../blocks/sites-map/sites-map";
import { sites, sitesIntro } from "../../data/sites";

const SitesView: React.FC = () => {
  return (
    <main>
      <SitesMap sites={sites} />

      <section className="pt-24 pb-0 px-6 md:px-28">
        <p className="eyebrow">Startplatser</p>
        <h1 className="display mt-[-4px]">{sitesIntro.title}</h1>
      </section>

      <div className="site-container mt-16 flex flex-col gap-16">
        <div className="flex flex-col gap-4 text-sm text-slate leading-relaxed max-w-3xl">
          {sitesIntro.rules.map((rule, i) => (
            <p key={i}>{rule}</p>
          ))}
        </div>

        {sitesIntro.areas.map((area) => (
          <div key={area.title} className="border-t border-hairline pt-6">
            <h3 className="h-section mb-3">{area.title}</h3>
            <p className="text-sm text-slate leading-relaxed">{area.description}</p>
          </div>
        ))}

        <div className="border-t border-hairline pt-6">
          <SitesGrid sites={sites} />
        </div>
      </div>
    </main>
  );
};

export default SitesView;
