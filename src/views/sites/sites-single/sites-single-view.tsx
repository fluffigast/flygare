import { format } from "date-fns";
import { sv } from "date-fns/locale";
import React from "react";
import { useParams } from "react-router";

import HeroBanner from "../../../blocks/hero-banner/hero-banner";
import { WindCompassWedge } from "../../../components/wind-compass-wedge";
import { sites, type Site } from "../../../data/sites";
import { formatSweref99, formatWgs84 } from "../../../utils/coordinates";
import { getPlaceholderImage } from "../../../utils/placeholder";
import { windDirectionCaption } from "../../../utils/wind-direction";
import WeatherForecast from "../../../blocks/weather-forecast/weather-forecast";
import Separator from "../../../components/separator";

const SitesSingleView: React.FC = () => {
  let { slug } = useParams();
  const sitesItem = sites.find((n: Site) => n.slug === slug);

  if (!sitesItem) {
    return <div>Sites item not found</div>;
  }
  const { overview, description, risks, emergency } = sitesItem;
  return (
    <>
      <HeroBanner
        imageUrl={
          getPlaceholderImage(slug ?? "fallback") ??
          `https://placehold.co/1920x1080?text=${sitesItem?.slug}`
        }
      />
      <article className="mx-auto flex w-full max-w-6xl flex-col px-4 gap-8">
        <header className="flex flex-col gap-2">
          <p className="font-serif text-2xl italic text-muted-foreground">
            {sitesItem.category}
          </p>
          <h1 className="font-serif text-4xl tracking-tight text-foreground sm:text-5xl">
            {sitesItem.title}
          </h1>
        </header>
        <div className="pt-4 md:pt-10 pl-0 md:pl-10">
          <div className="flex w-full flex-col gap-12 lg:flex-row lg:gap-16 lg:items-start">
            <section className="flex flex-1 flex-col gap-8 lg:max-w-md">
              <h2 className="font-serif text-2xl ">Översikt</h2>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <h3 className="text-sm">Position</h3>
                  <div className="flex flex-wrap gap-4 font-sans text-sm">
                    <div className="flex flex-col flex-1">
                      <div className="italic font-serif">WGS84</div>
                      <div className="text-muted-foreground">
                        {formatWgs84(overview.position.wgs84)}
                      </div>
                    </div>
                    <div className="flex flex-col flex-1">
                      <div className="italic font-serif">Sweref99</div>
                      <div className="text-muted-foreground">
                        {formatSweref99(overview.position.sweref99)}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <h3 className="text-sm">Höjd</h3>
                  <div className="flex flex-col gap-1 font-sans text-sm">
                    <div className="flex flex-wrap gap-x-2 gap-y-0.5">
                      <div className="text-muted-foreground">
                        Start ca{" "}
                        <span className="text-foreground">
                          {overview.altitude.takeoffMetersAboveSea.toLocaleString(
                            "sv-SE"
                          )}{" "}
                          m ö.h.
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-x-2 gap-y-0.5">
                      <div className="text-muted-foreground">
                        Höjd över landning ca{" "}
                        <span className="text-foreground">
                          {overview.altitude.heightAboveLandingApproxMeters.toLocaleString(
                            "sv-SE"
                          )}{" "}
                          m
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <h3 className="text-sm">Optimala vindförhållanden</h3>
                  <div className="flex flex-wrap items-start gap-4">
                    <div className="flex min-w-0 flex-1 flex-row items-center gap-2">
                      <div className="font-sans text-sm gap-1 flex flex-col">
                        <p className="italic font-serif">Vindriktning</p>
                        <p className="text-muted-foreground">
                          {windDirectionCaption(
                            overview.wind.directionRange.min,
                            overview.wind.directionRange.max
                          )}
                        </p>
                      </div>

                      <WindCompassWedge
                        minDeg={overview.wind.directionRange.min}
                        maxDeg={overview.wind.directionRange.max}
                        size="sm"
                      />
                    </div>
                    <p className="font-sans text-sm text-foreground">
                      {overview.wind.notes}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <h3 className="text-sm">Rekommenderad erfarenhetsnivå</h3>
                  <p className="text-sm text-muted-foreground">
                    {overview.experienceLevel.notes}
                  </p>
                </div>

                <div className="flex flex-col gap-1">
                  <h3 className="text-sm">Senast uppdaterad</h3>
                  <p className="text-sm text-muted-foreground">
                    {format(overview.lastUpdated, "yyyy-MM-dd", { locale: sv })}
                  </p>
                </div>
              </div>
            </section>

            <div className="flex flex-1 flex-col gap-10 lg:max-w-xl">
              <section className="flex flex-col gap-4">
                <h2 className="font-serif text-2xl ">Beskrivning</h2>
                <div className="flex flex-col gap-4 font-sans text-sm text-foreground">
                  {description.map((paragraph: string, i: number) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </section>

              <section className="flex flex-col gap-4">
                <h2 className="font-serif text-2xl ">
                  Potentiella risker och faror
                </h2>
                <ul className="flex flex-col gap-2 font-sans text-sm">
                  {risks.map((risk: string, i: number) => (
                    <li
                      key={i}
                      className="list-disc list-inside marker:text-muted-foreground"
                    >
                      {risk}
                    </li>
                  ))}
                </ul>
              </section>

              <section className="flex flex-col gap-4">
                <h2 className="font-serif text-2xl ">Nödinformation</h2>
                <div className="flex flex-col gap-4 font-sans text-sm">
                  <p>
                    Vid olycka ring{" "}
                    <span className=" tabular-nums">
                      {emergency.phoneNumber}
                    </span>
                    . <br />
                    {emergency.locationInstruction}
                    <br />
                    {emergency.contactNote}
                  </p>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-sm">Position</h3>
                    <div className="flex flex-wrap gap-4 font-sans text-sm">
                      <div className="flex flex-col flex-1">
                        <div className="italic font-serif">WGS84</div>
                        <div className="text-muted-foreground">
                          {formatWgs84(emergency.position.wgs84)}
                        </div>
                      </div>
                      <div className="flex flex-col flex-1">
                        <div className="italic font-serif">Sweref99</div>
                        <div className="text-muted-foreground">
                          {formatSweref99(emergency.position.sweref99)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
        <Separator />
        <WeatherForecast location={sitesItem.title} />
      </article>
    </>
  );
};

export default SitesSingleView;
