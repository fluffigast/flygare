import { format } from "date-fns";
import { sv } from "date-fns/locale";
import React from "react";
import { useParams } from "react-router";

import HeroBanner from "../../../blocks/hero-banner/hero-banner";
import WeatherForecast from "../../../blocks/weather-forecast/weather-forecast";
import { WindCompassWedge } from "../../../components/wind-compass-wedge";
import { sites, type Site } from "../../../data/sites";
import { formatSweref99, formatWgs84 } from "../../../utils/coordinates";
import { getPlaceholderImage } from "../../../utils/placeholder";
import { windDirectionCaption } from "../../../utils/wind-direction";

const SitesSingleView: React.FC = () => {
  const { slug } = useParams();
  const site = sites.find((n: Site) => n.slug === slug);

  if (!site) {
    return (
      <div className="site-container py-24 text-center flex flex-col gap-4">
        <h1 className="display">Sidan hittades inte</h1>
        <p className="text-slate">Innehållet du söker finns inte.</p>
      </div>
    );
  }

  const { overview, description, risks, emergency } = site;

  return (
    <main>
      <HeroBanner imageUrl={getPlaceholderImage(slug ?? "fallback")} compact />

      <article className="mx-auto flex w-full max-w-6xl flex-col px-4 gap-8 py-16">
        <header className="flex flex-col gap-2">
          <p className="eyebrow-sm">{site.category}</p>
          <h1 className="font-serif font-bold text-[clamp(36px,5vw,64px)] leading-none text-ink-2 tracking-tight">
            {site.title}
          </h1>
        </header>

        <div className="pt-10 pl-0 md:pl-10">
          <div className="flex w-full flex-col gap-12 lg:flex-row lg:gap-16 lg:items-start">
            {/* Overview sidebar */}
            <section className="flex flex-1 flex-col gap-8 lg:max-w-md">
              <h2 className="h-section">Översikt</h2>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <h3 className="font-serif font-bold text-base text-ink-2">Position</h3>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex flex-col flex-1">
                      <div className="font-serif italic text-ink-2">WGS84</div>
                      <div className="font-mono text-slate">{formatWgs84(overview.position.wgs84)}</div>
                    </div>
                    <div className="flex flex-col flex-1">
                      <div className="font-serif italic text-ink-2">Sweref99</div>
                      <div className="font-mono text-slate">{formatSweref99(overview.position.sweref99)}</div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <h3 className="font-serif font-bold text-base text-ink-2">Höjd</h3>
                  <div className="flex flex-col gap-1 text-sm">
                    <p className="text-slate">
                      Start ca{" "}
                      <span className="text-ink">
                        {overview.altitude.takeoffMetersAboveSea.toLocaleString("sv-SE")} m ö.h.
                      </span>
                    </p>
                    <p className="text-slate">
                      Höjd över landning ca{" "}
                      <span className="text-ink">
                        {overview.altitude.heightAboveLandingApproxMeters.toLocaleString("sv-SE")} m
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <h3 className="font-serif font-bold text-base text-ink-2">Optimala vindförhållanden</h3>
                  <div className="flex flex-wrap items-start gap-4">
                    <div className="flex min-w-0 flex-1 flex-row items-center gap-2">
                      <div className="text-sm gap-1 flex flex-col">
                        <p className="font-serif italic text-ink-2">Vindriktning</p>
                        <p className="text-slate">
                          {windDirectionCaption(overview.wind.directionRange.min, overview.wind.directionRange.max)}
                        </p>
                      </div>
                      <WindCompassWedge
                        minDeg={overview.wind.directionRange.min}
                        maxDeg={overview.wind.directionRange.max}
                        size="sm"
                      />
                    </div>
                    <p className="text-sm text-ink">{overview.wind.notes}</p>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <h3 className="font-serif font-bold text-base text-slate">Rekommenderad erfarenhetsnivå</h3>
                  <p className="text-sm text-slate">{overview.experienceLevel.notes}</p>
                </div>

                <div className="flex flex-col gap-1">
                  <h3 className="font-serif font-bold text-base text-ink-2">Senast uppdaterad</h3>
                  <p className="font-mono text-sm text-slate">
                    {format(overview.lastUpdated, "yyyy-MM-dd", { locale: sv })}
                  </p>
                </div>
              </div>
            </section>

            {/* Content */}
            <div className="flex flex-1 flex-col gap-10 lg:max-w-xl">
              <section className="flex flex-col gap-4">
                <h2 className="h-section">Beskrivning</h2>
                <div className="flex flex-col gap-4 text-base text-ink leading-relaxed">
                  {description.map((p: string, i: number) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </section>

              <section className="flex flex-col gap-4">
                <h2 className="h-section">Potentiella risker och faror</h2>
                <ul className="flex flex-col gap-2 text-base">
                  {risks.map((risk: string, i: number) => (
                    <li key={i} className="list-disc list-inside marker:text-slate-2 text-slate">
                      {risk}
                    </li>
                  ))}
                </ul>
              </section>

              <section className="flex flex-col gap-4">
                <h2 className="h-section">Nödinformation</h2>
                <div className="flex flex-col gap-4 text-base">
                  <p className="text-slate">
                    Vid olycka ring{" "}
                    <span className="font-mono tabular-nums text-ink">{emergency.phoneNumber}</span>.
                    <br />
                    {emergency.locationInstruction}
                    <br />
                    {emergency.contactNote}
                  </p>
                  <div className="flex flex-col gap-2">
                    <h3 className="font-serif font-bold text-base text-ink-2">Position</h3>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex flex-col flex-1">
                        <div className="font-serif italic text-ink-2">WGS84</div>
                        <div className="font-mono text-slate">{formatWgs84(emergency.position.wgs84)}</div>
                      </div>
                      <div className="flex flex-col flex-1">
                        <div className="font-serif italic text-ink-2">Sweref99</div>
                        <div className="font-mono text-slate">{formatSweref99(emergency.position.sweref99)}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>

        <div className="mt-12" />
        <WeatherForecast location={site.title} />
      </article>
    </main>
  );
};

export default SitesSingleView;
