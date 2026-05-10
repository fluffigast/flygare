import React from "react";
import { Link } from "react-router";
import HeroBanner from "../../blocks/hero-banner/hero-banner";
import ArticlesGrid from "../../blocks/articles-grid/articles-grid";
import WeatherForecast from "../../blocks/weather-forecast/weather-forecast";
import NewsSlider from "../../blocks/news-slider/news-slider";
import { articles } from "../../data/articles";
import { getPlaceholderImage } from "../../utils/placeholder";

const stats = [
  { value: "1975", label: "Grundat" },
  { value: "~100", label: "Aktiva medlemmar" },
  { value: "230 km", label: "Distansrekord (skärm)" },
  { value: "9", label: "Startplatser" },
];

const HomeView: React.FC = () => {
  return (
    <>
      <HeroBanner
        imageUrl={getPlaceholderImage("home-hero")}
        title="Skandinaviens mest spektakulära flygplats"
        subtitle="Jakten på termiken startar i mars. Har du tur får du sällskap av en kungsörn."
        showDisc
      />

      {/* Welcome / Featured */}
      <div className="site-container">
        <section className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] mt-24">
          <div
            className="w-full h-[clamp(260px,30vw,462px)] bg-cover bg-center"
            style={{ backgroundImage: `url(${getPlaceholderImage("home-featured")})` }}
          />
          <div className="flex flex-col justify-center p-8 lg:p-12 gap-6">
            <h2 className="font-serif font-bold text-[clamp(22px,2vw,32px)] leading-snug text-ink tracking-tight">
              50 år av flygning från Skutan
            </h2>
            <p className="text-base leading-6 text-ink-2">
              Åre Drakflygklubb bildades 1975 och sedan 1988 har även
              skärmflygklubben funnits. Idag görs 95% av all flygning med skärm.
              Distansrekordet ligger på 230 km — Åre till Sollefteå.
            </p>
            <p className="text-base leading-6 text-ink-2">
              Klubben har ca 100 aktiva medlemmar varav 30 bor i Åre kommun. Vi
              arbetar aktivt med utbildning, säkerhet och samarbete med markägare
              och andra aktörer i området.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-ink text-white mt-16 p-8 md:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="font-serif text-4xl md:text-5xl font-bold">{s.value}</p>
                <p className="text-sm uppercase tracking-wider text-white/50 mt-1">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <NewsSlider />

      {/* Flyga i Åre */}
      <section className="mt-24">
        <div className="site-container">
          <div className="flex justify-between items-end mb-6">
            <h2 className="h-section">Flyga i Åre</h2>
            <Link
              to="/information"
              className="text-sm text-ink-2 border-b border-ink-2 pb-0.5"
            >
              Se all information
            </Link>
          </div>
          <ArticlesGrid articles={articles} maxNumArticles={6} />
        </div>
      </section>

      <WeatherForecast />

      {/* CTA */}
      <section className="mt-24">
        <div className="site-container text-center flex flex-col gap-4 items-center py-12">
          <p className="font-serif italic text-slate text-sm">
            Bli en del av klubben
          </p>
          <h2 className="h-section">Redo att flyga?</h2>
          <div className="flex gap-3 flex-wrap justify-center mt-4">
            <Link to="/bli-medlem" className="pill-btn">
              Bli medlem — 600 kr/år
            </Link>
            <Link
              to="/startplatser"
              className="inline-flex items-center px-5 py-2 rounded-full border border-hairline text-sm hover:bg-paper transition-colors"
            >
              Se startplatser
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeView;
