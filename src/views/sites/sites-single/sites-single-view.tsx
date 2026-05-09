import { format } from "date-fns";
import { sv } from "date-fns/locale";
import React from "react";
import { useParams } from "react-router";

import HeroBanner from "../../../blocks/hero-banner/hero-banner";
import NewsSlider from "../../../blocks/news-slider/news-slider";
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

      <article className="max-w-[1200px] mx-auto pt-24 px-4">
        <header className="mb-12">
          <span className="eyebrow-sm block mb-3">{site.category}</span>
          <h1 className="font-serif font-bold text-[clamp(36px,5vw,64px)] leading-none text-ink-2 tracking-tight">
            {site.title}
          </h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-12">
          {/* Overview sidebar */}
          <aside className="flex flex-col gap-5">
            <h2 className="h-section">Översikt</h2>

            {/* Position */}
            <div className="flex flex-col gap-1.5">
              <p className="font-serif font-bold text-base text-ink-2">Position</p>
              <div className="grid grid-cols-2 gap-1">
                <div className="flex flex-col gap-1">
                  <p className="font-serif italic text-base text-ink-2">WGS84</p>
                  <p className="font-mono text-sm text-slate">{formatWgs84(overview.position.wgs84)}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-serif italic text-base text-ink-2">Sweref99</p>
                  <p className="font-mono text-sm text-slate">{formatSweref99(overview.position.sweref99)}</p>
                </div>
              </div>
            </div>

            {/* Altitude */}
            <div className="flex flex-col gap-1.5">
              <p className="font-serif font-bold text-base text-ink-2">Höjd</p>
              <p className="text-base text-slate">
                Start ca {overview.altitude.takeoffMetersAboveSea.toLocaleString("sv-SE")} m ö.h.
                <br />
                Höjd över landning ca {overview.altitude.heightAboveLandingApproxMeters.toLocaleString("sv-SE")} m
              </p>
            </div>

            {/* Wind */}
            <div className="flex flex-col gap-1.5">
              <p className="font-serif font-bold text-base text-ink-2">Optimala vindförhållanden</p>
              <div className="flex gap-6 items-center mt-1">
                <div>
                  <p className="font-serif italic text-base text-slate">Vindriktning</p>
                  <p className="text-base text-slate">
                    {windDirectionCaption(overview.wind.directionRange.min, overview.wind.directionRange.max)}
                  </p>
                </div>
                <WindCompassWedge
                  minDeg={overview.wind.directionRange.min}
                  maxDeg={overview.wind.directionRange.max}
                  size="sm"
                />
              </div>
              <p className="text-[15px] leading-snug text-slate mt-3">{overview.wind.notes}</p>
            </div>

            {/* Experience */}
            <div className="flex flex-col gap-1.5">
              <p className="font-serif font-bold text-base text-slate">Rekommenderad erfarenhetsnivå</p>
              <p className="text-base text-slate">{overview.experienceLevel.notes}</p>
            </div>

            {/* Updated */}
            <div className="flex flex-col gap-1.5">
              <p className="font-serif font-bold text-base text-ink-2">Senast uppdaterad</p>
              <p className="font-mono text-sm text-slate">
                {format(overview.lastUpdated, "yyyy-MM-dd", { locale: sv })}
              </p>
            </div>
          </aside>

          {/* Content */}
          <div className="flex flex-col gap-8">
            <section className="flex flex-col gap-3">
              <h3 className="h-section">Beskrivning</h3>
              {description.map((p: string, i: number) => (
                <p key={i} className="text-base leading-6 text-slate">{p}</p>
              ))}
            </section>

            <section className="flex flex-col gap-3">
              <h3 className="h-section">Potentiella risker och faror</h3>
              <ul className="flex flex-col gap-2">
                {risks.map((r: string, i: number) => (
                  <li key={i} className="text-base leading-6 text-slate pl-5 relative before:absolute before:left-0 before:top-3 before:w-3 before:h-px before:bg-slate-2">
                    {r}
                  </li>
                ))}
              </ul>
              <div className="bg-[#fff8ee] border border-[#f3e0bd] p-5 flex gap-4 items-start mt-2">
                <span className="shrink-0 w-6 h-6 grid place-items-center text-[#b07700] mt-px">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                    <line x1="12" y1="9" x2="12" y2="13" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                </span>
                <div>
                  <strong className="font-serif font-bold text-ink-2 block mb-1">Visa marginaler vid termik</strong>
                  <span className="text-[15px] leading-snug text-slate-3">
                    Soliga eftermiddagar kan termiken bli stark över sydsluttningen. Planera tidiga eller sena flygpass om förhållandena känns kraftiga.
                  </span>
                </div>
              </div>
            </section>

            <section className="flex flex-col gap-3">
              <h3 className="h-section">Nödinformation</h3>
              <p className="text-base leading-6 text-slate">
                Vid olycka ring {emergency.phoneNumber}. {emergency.locationInstruction} {emergency.contactNote}
              </p>
              <div className="mt-4 flex flex-col gap-1.5">
                <p className="font-serif font-bold text-base text-ink-2">Position</p>
                <div className="grid grid-cols-2 gap-1 max-w-[500px]">
                  <div className="flex flex-col gap-1">
                    <p className="font-serif italic text-base text-ink-2">WGS84</p>
                    <p className="font-mono text-sm text-slate">{formatWgs84(emergency.position.wgs84)}</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="font-serif italic text-base text-ink-2">Sweref99</p>
                    <p className="font-mono text-sm text-slate">{formatSweref99(emergency.position.sweref99)}</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </article>

      <NewsSlider label="Relaterade nyheter" />
    </main>
  );
};

export default SitesSingleView;
