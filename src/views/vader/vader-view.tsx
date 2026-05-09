import React from "react";
import WeatherForecast from "../../blocks/weather-forecast/weather-forecast";
import { weatherLinks } from "../../data/weather-links";

const VaderView: React.FC = () => {
  return (
    <main>
      <section className="pt-24 pb-0 px-6 md:px-28">
        <p className="eyebrow">Väder</p>
        <h1 className="display mt-[-4px]">Väder i Åre</h1>
      </section>

      <WeatherForecast />

      <section className="mt-24">
        <div className="site-container">
          <div className="border-t border-hairline pt-6">
            <h3 className="h-section mb-8">Vädertjänster</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {weatherLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col gap-1 p-5 border border-hairline transition-colors hover:border-ink-2"
                >
                  <p className="text-sm font-semibold text-ink">{link.label}</p>
                  <p className="text-slate-2 text-xs truncate">
                    {new URL(link.url).hostname}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default VaderView;
