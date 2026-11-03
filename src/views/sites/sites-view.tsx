import React from "react";
import SitesGrid from "../../blocks/sites-grid/sites-grid";
import SitesMap from "../../blocks/sites-map/sites-map";
import Separator from "../../components/separator";
import { sites as localSites, sitesIntro } from "../../data/sites";
import { useLaunches, useOtherSites } from "../../hooks/useCMS";
import { mapLaunchToSite } from "../../lib/map-launch";

type OtherSiteDoc = {
  name: string;
  direction?: string | null;
  elevationDrop?: string | null;
  description?: string | null;
};

const otherSiteSummary = (site: OtherSiteDoc): string => {
  if (site.description && typeof site.description === "string") return site.description;
  const parts = [site.direction, site.elevationDrop].filter(
    (p): p is string => !!p && p.length > 0,
  );
  if (parts.length > 0) return parts.join(", ");
  return "";
};

const SitesView: React.FC = () => {
  const { data: cmsLaunches } = useLaunches([]);
  // Merge CMS over local by slug so production CMS gaps don't hide sites.
  const bySlug = new Map(localSites.map((s) => [s.slug, s]));
  for (const launch of cmsLaunches) {
    const mapped = mapLaunchToSite(launch);
    bySlug.set(mapped.slug, mapped);
  }
  const sites = Array.from(bySlug.values());

  // sitesIntro.areas[0..1] = allmän intro (Åreskutan + Andra flygområden).
  // sitesIntro.areas[2..] = de 4 other-sites som fallback om CMS är tomt.
  const generalAreas = sitesIntro.areas.slice(0, 2);
  const otherSitesFallback: OtherSiteDoc[] = sitesIntro.areas.slice(2).map((a) => ({
    name: a.title,
    description: a.description,
  }));
  const { data: cmsOtherSites } = useOtherSites(otherSitesFallback);

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
          {generalAreas.map((area) => (
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
          {cmsOtherSites.map((site: OtherSiteDoc) => (
            <React.Fragment key={site.name}>
              <Separator />
              <div>
                <h3 className="font-serif text-xl mb-3">{site.name}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {otherSiteSummary(site)}
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
