import React from "react";
import WeatherForecast from "../../blocks/weather-forecast/weather-forecast";
import { weatherLinks as localWeatherLinks } from "../../data/weather-links";
import { useWeatherLinks } from "../../hooks/useCMS";
import SEO from "../../components/seo";
import PageHero from "../../components/page-hero";

const VaderView: React.FC = () => {
  const { data: weatherLinks } = useWeatherLinks(localWeatherLinks);
  return (
    <div className="w-full">
      <SEO
        title="Väder"
        path="/flyga-i-are/vader"
        description="Väder- och vindförhållanden i Åre för skärm- och drakflyg. SMHI-prognos, vindmätare och lokala observationer."
      />
      <PageHero
        eyebrow="Väder"
        title="Väder i Åre"
        lead="Aktuell SMHI-prognos för Åreskutan och länkar till vädertjänster relevanta för flygning i området."
      />

      <section className="max-w-[1200px] mx-auto px-4 md:px-10 mt-8 md:mt-12">
        <div
          className="pt-6"
          style={{ borderTop: "1px solid var(--border, #e2e8f0)" }}
        >
          <WeatherForecast />
        </div>
      </section>

      {/* Weather links */}
      <section className="max-w-[1200px] mx-auto px-4 md:px-10 mt-16 md:mt-24">
        <div
          className="pt-6"
          style={{ borderTop: "1px solid var(--border, #e2e8f0)" }}
        >
          <h2
            className="font-serif font-bold text-xl md:text-[32px] leading-none mb-8"
            style={{ color: "var(--ink-2, #0f172b)" }}
          >
            Vädertjänster
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {weatherLinks.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-1 p-5 transition-colors hover:-translate-y-px"
                style={{ border: "1px solid var(--border, #e2e8f0)" }}
              >
                <p
                  className="text-sm font-semibold"
                  style={{ color: "var(--ink, #020618)" }}
                >
                  {link.label}
                </p>
                <p
                  className="text-xs font-mono truncate"
                  style={{ color: "var(--slate-2, #90a1b9)" }}
                >
                  {(() => { try { return new URL(link.url).hostname; } catch { return link.url; } })()}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default VaderView;
