import React from "react";
import { Link } from "react-router";
import Header from "../../components/header";
import HeroBanner from "../../blocks/hero-banner/hero-banner";
import ArticlesGrid from "../../blocks/articles-grid/articles-grid";
import WeatherForecast from "../../blocks/weather-forecast/weather-forecast";
import NewsSlider from "../../blocks/news-slider/news-slider";
import Footer from "../../components/footer";
import Separator from "../../components/separator";
import { articles } from "../../data/articles";
import { getPlaceholderImage } from "../../utils/placeholder";
import FeaturedSection from "../../blocks/featured-section/featured-section";
import Button from "../../components/button";

export interface HomeViewProps {}

const stats = [
  { value: "1975", label: "Grundat" },
  { value: "~100", label: "Aktiva medlemmar" },
  { value: "230 km", label: "Distansrekord (skärm)" },
  { value: "9", label: "Startplatser" },
];

const HomeView: React.FC<HomeViewProps> = ({}) => {
  return (
    <>
      <Header />
      <HeroBanner
        imageUrl={getPlaceholderImage("home-hero")}
        title="Skandinaviens mest spektakulära flygplats"
        subtitle="Jakten på termiken startar i mars. Har du tur får du sällskap av en kungsörn."
      />
      <main className="@container max-w-2xl mx-auto px-4 flex gap-16 flex-col py-16">
        <FeaturedSection
          title="50 år av flygning från Skutan"
          content="Åre Drakflygklubb bildades 1975 och sedan 1988 har även skärmflygklubben funnits. Idag görs 95% av all flygning med skärm. Distansrekordet ligger på 230 km — Åre till Sollefteå.

Klubben har ca 100 aktiva medlemmar varav 30 bor i Åre kommun. Vi arbetar aktivt med utbildning, säkerhet och samarbete med markägare och andra aktörer i området."
          imageUrl={getPlaceholderImage("home-featured")}
          alignment="right"
        />

        {/* Stats */}
        <section className="bg-primary text-primary-foreground rounded-lg p-8 md:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="font-serif text-3xl md:text-4xl">{s.value}</p>
                <p className="text-xs uppercase tracking-widest text-primary-foreground/50 mt-1">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        <Separator />
        <NewsSlider />
        <ArticlesGrid
          articles={articles.map((article) => ({
            ...article,
            imageUrl: getPlaceholderImage(article.id),
          }))}
        />
        <Separator />
        <WeatherForecast />

        {/* CTA */}
        <section className="text-center flex flex-col gap-4 items-center py-8">
          <p className="font-serif italic text-muted-foreground text-sm">
            Bli en del av klubben
          </p>
          <h2 className="font-serif text-3xl">Redo att flyga?</h2>
          <div className="flex gap-3 flex-wrap justify-center mt-2">
            <Button href="/information">Bli medlem — 600 kr/år</Button>
            <Link
              to="/startplatser"
              className="inline-flex items-center px-4 py-2 rounded-full border border-border text-sm hover:bg-muted transition-colors"
            >
              Se startplatser
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default HomeView;
