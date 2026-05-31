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
import { useSiteSettings, useGlobalLivePreview } from "../../hooks/useCMS";

export interface HomeViewProps {}

const localSiteSettings = {
  heroTagline: "Skandinaviens mest spektakulära flygplats",
  heroDescription:
    "Jakten på termiken startar i mars. Har du tur får du sällskap av en kungsörn.",
  aboutTitle: "50 år av flygning från Skutan",
  aboutText:
    "Åre Drakflygklubb bildades 1975 och sedan 1988 har även skärmflygklubben funnits. Idag görs 95% av all flygning med skärm. Distansrekordet ligger på 230 km — Åre till Sollefteå.\n\nKlubben har ca 100 aktiva medlemmar varav 30 bor i Åre kommun. Vi arbetar aktivt med utbildning, säkerhet och samarbete med markägare och andra aktörer i området.",
  statsMembers: "~100",
  statsDistanceRecord: "230 km",
  statsLaunchSites: "9",
};

const HomeView: React.FC<HomeViewProps> = ({}) => {
  const { data: cmsSite } = useSiteSettings(localSiteSettings);
  const site = useGlobalLivePreview(cmsSite);

  const stats = [
    { value: "1975", label: "Grundat" },
    { value: site.statsMembers ?? localSiteSettings.statsMembers, label: "Aktiva medlemmar" },
    { value: site.statsDistanceRecord ?? localSiteSettings.statsDistanceRecord, label: "Distansrekord (skärm)" },
    { value: site.statsLaunchSites ?? localSiteSettings.statsLaunchSites, label: "Startplatser" },
  ];

  return (
    <div className="w-full overflow-x-hidden">
      <Header />
      <HeroBanner
        imageUrl={getPlaceholderImage("home-hero")}
        title={site.heroTagline ?? localSiteSettings.heroTagline}
        subtitle={site.heroDescription ?? localSiteSettings.heroDescription}
        titleField="heroTagline"
        subtitleField="heroDescription"
      />
      <main className="@container max-w-2xl mx-auto px-4 flex gap-8 md:gap-16 flex-col py-8 md:py-16">
        <FeaturedSection
          title={site.aboutTitle ?? localSiteSettings.aboutTitle}
          content={site.aboutText ?? localSiteSettings.aboutText}
          imageUrl={getPlaceholderImage("home-featured")}
          alignment="right"
          titleField="aboutTitle"
          contentField="aboutText"
        />

        {/* Stats */}
        <section className="bg-primary text-primary-foreground rounded-lg p-4 md:p-8 lg:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center">
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
          <p
            className="font-serif italic text-muted-foreground text-sm"
            data-payload-field="ctaSubtitle"
          >
            Bli en del av klubben
          </p>
          <h2
            className="font-serif text-3xl"
            data-payload-field="ctaTitle"
          >
            Redo att flyga?
          </h2>
          <div className="flex gap-3 flex-wrap justify-center mt-2">
            <Button href="/bli-medlem">Bli medlem — 600 kr/år</Button>
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
    </div>
  );
};

export default HomeView;
