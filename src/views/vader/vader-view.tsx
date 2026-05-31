import React from "react";
import WeatherForecast from "../../blocks/weather-forecast/weather-forecast";
import { weatherLinks as localWeatherLinks } from "../../data/weather-links";
import { useWeatherLinks } from "../../hooks/useCMS";

const VaderView: React.FC = () => {
  const { data: weatherLinks } = useWeatherLinks(localWeatherLinks);
  return (
    <div className="w-full">
      {/* Editorial header */}
      <section className="px-4 md:px-[110px] pt-16 md:pt-24 pb-8">
        <p
          className="font-serif italic text-2xl md:text-[40px] leading-none"
          style={{ color: "var(--ink-2, #0f172b)" }}
        >
          Väder
        </p>
        <h1
          className="font-serif font-bold leading-[0.96] tracking-tight mt-1"
          style={{
            fontSize: "clamp(48px, 6vw, 96px)",
            color: "var(--ink-2, #0f172b)",
            letterSpacing: "-0.02em",
          }}
        >
          Väder i Åre
        </h1>
        <p
          className="max-w-2xl mt-8 text-base md:text-lg leading-relaxed"
          style={{ color: "var(--slate, #62748e)" }}
        >
          Aktuell väderprognos och länkar till vädertjänster relevanta för
          flygning i Åreområdet.
        </p>
      </section>

      {/* Weather forecast */}
      <section className="max-w-[1480px] mx-auto px-4 md:px-14 mt-8 md:mt-12">
        <div
          className="pt-6"
          style={{ borderTop: "1px solid var(--border, #e2e8f0)" }}
        >
          <WeatherForecast />
        </div>
      </section>

      {/* Weather links */}
      <section className="max-w-[1480px] mx-auto px-4 md:px-14 mt-16 md:mt-24">
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
                  {new URL(link.url).hostname}
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
