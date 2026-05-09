import React from "react";
import { Link } from "react-router";
import HeroBanner from "../../blocks/hero-banner/hero-banner";
import ArticlesGrid from "../../blocks/articles-grid/articles-grid";
import WeatherForecast from "../../blocks/weather-forecast/weather-forecast";
import NewsSlider from "../../blocks/news-slider/news-slider";
import { articles } from "../../data/articles";

const HomeView: React.FC = () => {
  return (
    <>
      <HeroBanner showDisc />

      {/* Welcome section */}
      <div className="site-container">
        <section className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] mt-24">
          <div
            className="w-full h-[clamp(260px,30vw,462px)] bg-cover bg-center"
            style={{ backgroundImage: "url(/assets/news-fjall.jpg)" }}
          />
          <div className="flex flex-col justify-center p-8 lg:p-12 gap-6">
            <h2 className="font-serif font-bold text-[clamp(22px,2vw,32px)] leading-snug text-ink tracking-tight">
              Välkommen till Åre Skärm- och Drakflygklubb!
            </h2>
            <p className="text-base leading-6 text-ink-2">
              Åre Skärm- och Drakflygklubb har i många år varit en samlingspunkt
              för flygare i fjällmiljö. Vi arbetar aktivt med utbildning,
              säkerhet och samarbete med markägare och andra aktörer i området.
            </p>
            <p className="text-base leading-6 text-ink-2">
              Klubben drivs av sina medlemmar och bygger på engagemang,
              erfarenhetsutbyte och flygglädje. Målet är enkelt. Att fler ska få
              uppleva friheten i luften på ett tryggt och hållbart sätt.
            </p>
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
    </>
  );
};

export default HomeView;
