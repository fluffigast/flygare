import React from "react";
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

export interface HomeViewProps {}

const HomeView: React.FC<HomeViewProps> = ({}) => {
  return (
    <>
      <Header />
      <HeroBanner imageUrl={getPlaceholderImage("home-hero")} />
      <main className="@container max-w-2xl mx-auto px-4 flex gap-16 flex-col py-16">
        <FeaturedSection
          title="Välkommen till Åre Skärm- och Drakflygklubb!"
          content="Åre Skärm- och Drakflygklubb har i många år varit en samlingspunkt för flygare i fjällmiljö. Vi arbetar aktivt med utbildning, säkerhet och samarbete med markägare och andra aktörer i området.

Klubben drivs av sina medlemmar och bygger på engagemang, erfarenhetsutbyte och flygglädje. Målet är enkelt. Att fler ska få uppleva friheten i luften på ett tryggt och hållbart sätt."
          imageUrl={getPlaceholderImage("home-featured")}
          alignment="right"
        />
        <NewsSlider />
        <ArticlesGrid
          articles={articles.map((article) => ({
            ...article,
            imageUrl: getPlaceholderImage(article.id),
          }))}
        />
        <Separator />
        <WeatherForecast />
      </main>
      <Footer />
    </>
  );
};

export default HomeView;
