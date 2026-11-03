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
  const bySlug = new Map(localSites.map((s) => [s.slug, s]));
  for (const launch of cmsLaunches) {
    const mapped = mapLaunchToSite(launch);
    bySlug.set(mapped.slug, mapped);
  }
  const sites = Array.from(bySlug.values());

  const generalAreas = sitesIntro.areas.slice(0, 2);
  const otherSitesFallback: OtherSiteDoc[] = sitesIntro.areas.slice(2).map((a) => ({
    name: a.title,
    description: a.description,
  }));
  const { data: cmsOtherSites } = useOtherSites(otherSitesFallback);

  return (
    <div className="w-full">
      <section className="w-full h-[clamp(340px,52vh,560px)]">
        <SitesMap sites={sites} className="relative bg-muted w-full h-full overflow-hidden border border-border" />
      </section>

      <div className="max-w-[1200px] mx-auto px-4 md:px-10 pt-10 md:pt-12 pb-16 flex flex-col gap-10">
        <section className="max-w-[720px] flex flex-col gap-4">
          <p className="font-serif italic text-muted-foreground text-sm">Startplatser</p>
          <h2 className="font-serif text-3xl tracking-tight" style={{ color: "var(--ink-2, #0f172b)" }}>
            {sitesIntro.title}
          </h2>
          <div className="flex flex-col gap-3 text-sm leading-relaxed" style={{ color: "var(--slate-3, #45556c)" }}>
            {sitesIntro.rules.map((rule, i) => (
              <p key={i}>{rule}</p>
            ))}
          </div>
        </section>

        <SitesGrid sites={sites} />

        <section className="max-w-[720px] flex flex-col gap-6">
          {generalAreas.map((area) => (
            <React.Fragment key={area.title}>
              <Separator />
              <div>
                <h3 className="font-serif text-xl mb-3" style={{ color: "var(--ink-2, #0f172b)" }}>{area.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--slate-3, #45556c)" }}>
                  {area.description}
                </p>
              </div>
            </React.Fragment>
          ))}
          {cmsOtherSites.map((site: OtherSiteDoc) => (
            <React.Fragment key={site.name}>
              <Separator />
              <div>
                <h3 className="font-serif text-xl mb-3" style={{ color: "var(--ink-2, #0f172b)" }}>{site.name}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--slate-3, #45556c)" }}>
                  {otherSiteSummary(site)}
                </p>
              </div>
            </React.Fragment>
          ))}
        </section>
      </div>
    </div>
  );
};

export default SitesView;
