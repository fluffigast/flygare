import React from "react";
import SitesGrid from "../../blocks/sites-grid/sites-grid";
import SitesMap from "../../blocks/sites-map/sites-map";
import Separator from "../../components/separator";
import { sites as localSites, sitesIntro } from "../../data/sites";
import { useLaunches } from "../../hooks/useCMS";
import { mapLaunchToSite } from "../../lib/map-launch";

const SitesView: React.FC = () => {
  const { data: cmsLaunches } = useLaunches([]);
  const sites = cmsLaunches.length > 0
    ? cmsLaunches.map(mapLaunchToSite)
    : localSites;
  return (
    <>
      <SitesMap sites={sites} />
      <div className="max-w-2xl px-4 flex gap-16 flex-col w-full">
        <section className="flex flex-col gap-6">
          <div>
            <p className="font-serif italic text-muted-foreground text-sm">Startplatser</p>
            <h2 className="font-serif text-3xl">{sitesIntro.title}</h2>
          </div>
          <div className="flex flex-col gap-4 text-muted-foreground text-sm leading-relaxed">
            {sitesIntro.rules.map((rule, i) => (
              <p key={i}>{rule}</p>
            ))}
          </div>
          {sitesIntro.areas.map((area) => (
            <React.Fragment key={area.title}>
              <Separator />
              <div>
                <h3 className="font-serif text-xl mb-3">{area.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {area.description}
                </p>
              </div>
            </React.Fragment>
          ))}
          <Separator />
        </section>
        <SitesGrid sites={sites} />
      </div>
    </>
  );
};

export default SitesView;
