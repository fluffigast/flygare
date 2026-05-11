import React from "react";
import Separator from "../../components/separator";
import WeatherForecast from "../../blocks/weather-forecast/weather-forecast";
import { weatherLinks } from "../../data/weather-links";

const VaderView: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 flex gap-16 flex-col w-full py-16">
      {/* Header */}
      <section className="flex flex-col gap-6">
        <div>
          <p className="font-serif italic text-muted-foreground text-sm">
            Väder
          </p>
          <h2 className="font-serif text-3xl">Väder i Åre</h2>
        </div>
      </section>

      {/* Weather forecast component */}
      <WeatherForecast />

      <Separator />

      {/* Weather links */}
      <section className="flex flex-col gap-6">
        <h3 className="font-serif text-xl">Vädertjänster</h3>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {weatherLinks.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col gap-1 p-4 rounded-lg border border-border hover:border-primary transition-colors"
            >
              <p className="text-sm font-semibold">{link.label}</p>
              <p className="text-muted-foreground text-xs truncate">
                {new URL(link.url).hostname}
              </p>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};

export default VaderView;
