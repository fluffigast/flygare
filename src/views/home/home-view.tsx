import React from "react";
import { Link } from "react-router";
import Header from "../../components/header";
import HeroBanner from "../../blocks/hero-banner/hero-banner";
import NewsSlider from "../../blocks/news-slider/news-slider";
import WindWidget from "../../blocks/wind-widget/wind-widget";
import Footer from "../../components/footer";
import Separator from "../../components/separator";
import Button from "../../components/button";
import { getPlaceholderImage } from "../../utils/placeholder";
import { useSiteSettings, useGlobalLivePreview } from "../../hooks/useCMS";

const localSiteSettings = {
  heroTagline: "Åre Skärm- och Drakflygklubb",
  heroDescription: "Skandinaviens mest spektakulära flygplats sedan 1975",
  statsMembers: "~100",
  statsDistanceRecord: "230 km",
  statsLaunchSites: "9",
};

const HomeView: React.FC = () => {
  const { data: cmsSite } = useSiteSettings(localSiteSettings);
  const site = useGlobalLivePreview(cmsSite);

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

      <main className="@container max-w-2xl mx-auto px-4 flex gap-6 md:gap-10 flex-col py-6 md:py-10">

        {/* 1. Viktig info / FLYGREGLER — PPTX slide 1 top-left */}
        <Link
          to="/flyga-i-are/flygregler"
          className="block bg-primary text-primary-foreground rounded-lg p-6 md:p-8 hover:opacity-90 transition-opacity"
        >
          <h2 className="font-serif text-xl md:text-2xl font-bold" data-payload-field="heroTagline">
            Viktig info till alla som flyger i Åre — FLYGREGLER
          </h2>
          <p className="text-primary-foreground/70 text-sm mt-2">
            Läs reglerna under Flyga i Åre innan du startar →
          </p>
        </Link>

        {/* 2. Aktuellt väder — PPTX slide 1 top-right */}
        <WindWidget />

        <Separator />

        {/* 3. Nyheter — PPTX slide 1 center */}
        <section className="flex flex-col gap-4">
          <div className="flex justify-between items-end">
            <h2 className="font-serif text-2xl md:text-3xl">Nyheter</h2>
            <Link
              to="/nyheter"
              className="text-sm text-primary hover:underline"
            >
              Alla nyheter →
            </Link>
          </div>
          <NewsSlider />
        </section>

        <Separator />

        {/* Stats — compact bar */}
        <section className="bg-muted rounded-lg p-4 md:p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { value: "1975", label: "Grundat" },
              { value: site.statsMembers ?? localSiteSettings.statsMembers, label: "Aktiva medlemmar" },
              { value: site.statsDistanceRecord ?? localSiteSettings.statsDistanceRecord, label: "Distansrekord" },
              { value: site.statsLaunchSites ?? localSiteSettings.statsLaunchSites, label: "Startplatser" },
            ].map((s) => (
              <div key={s.label}>
                <p className="font-serif text-2xl md:text-3xl font-bold">{s.value}</p>
                <p className="text-xs uppercase tracking-widest text-muted-foreground mt-1">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        <Separator />

        {/* 4. Bli medlem — PPTX slide 1 bottom-right */}
        <section className="flex flex-col md:flex-row gap-6 items-center justify-between bg-primary text-primary-foreground rounded-lg p-6 md:p-8">
          <div className="flex flex-col gap-2">
            <h2 className="font-serif text-2xl font-bold">Bli medlem</h2>
            <p className="text-primary-foreground/70 text-sm">
              Medlemskap 600 kr/år. Tillgång till alla startplatser, klubbussen och Draklanda.
            </p>
          </div>
          <Button href="https://cloud.paragliding.se/product-category/klubbmedlemskap-stod-support-eller-for-nybliven-pilot/">
            Köp medlemskap →
          </Button>
        </section>

        {/* Quick links */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Flyga i Åre", path: "/flyga-i-are", desc: "Starter, väder, regler" },
            { label: "Startplatser", path: "/flyga-i-are/startplatser", desc: "Karta och info" },
            { label: "Tävlingar", path: "/tavlingar", desc: "PPC, Topplandning" },
            { label: "Om klubben", path: "/om", desc: "Historia och styrelse" },
          ].map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="flex flex-col gap-1 p-4 rounded-lg border border-border hover:border-primary transition-colors"
            >
              <p className="text-sm font-semibold">{link.label}</p>
              <p className="text-muted-foreground text-xs">{link.desc}</p>
            </Link>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HomeView;
