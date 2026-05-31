import React from "react";
import { Link } from "react-router";
import Header from "../../components/header";
import HeroBanner from "../../blocks/hero-banner/hero-banner";
import NewsSlider from "../../blocks/news-slider/news-slider";
import WindWidget from "../../blocks/wind-widget/wind-widget";
import Footer from "../../components/footer";
import { getPlaceholderImage } from "../../utils/placeholder";
import { useSiteSettings, useGlobalLivePreview } from "../../hooks/useCMS";

const localSiteSettings = {
  heroTagline: "Åre Skärm- och Drakflygklubb",
  heroDescription: "Skandinaviens mest spektakulära flygplats sedan 1975",
};

const HomeView: React.FC = () => {
  const { data: cmsSite } = useSiteSettings(localSiteSettings);
  const site = useGlobalLivePreview(cmsSite);

  return (
    <div className="w-full overflow-x-hidden">
      <Header />

      {/* ─── HERO ─── */}
      <HeroBanner
        imageUrl={getPlaceholderImage("home-hero")}
        title={site.heroTagline ?? localSiteSettings.heroTagline}
        subtitle={site.heroDescription ?? localSiteSettings.heroDescription}
        titleField="heroTagline"
        subtitleField="heroDescription"
      />

      {/* ─── INTRO + FLYGREGLER ─── */}
      <section className="@container max-w-2xl mx-auto px-4 py-10 md:py-16">
        <div className="flex flex-col md:flex-row gap-8 md:gap-16">
          {/* Left: about */}
          <div className="md:w-1/2">
            <p className="text-foreground leading-relaxed text-lg md:text-xl font-serif">
              Klubben bildades 1975 som drakflygklubb och har sedan 1988 även
              omfattat skärmflyg.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Med ca 100 aktiva medlemmar och 9 startplatser
              på Åreskutan är vi en av Sveriges mest aktiva flygklubbar.
              Distansrekordet ligger på 230 km — Åre till Sollefteå.
            </p>
            <Link to="/om" className="inline-block mt-5 text-sm font-semibold text-primary hover:underline">
              Om klubben →
            </Link>
          </div>

          {/* Right: flygregler callout */}
          <div className="md:w-1/2">
            <Link to="/flyga-i-are/flygregler" className="group block border-l-4 border-primary pl-5 py-2 hover:bg-muted/50 -ml-1 rounded-r-lg transition-colors">
              <p className="font-serif text-lg font-semibold group-hover:text-primary transition-colors">
                Flygregler
              </p>
              <p className="text-muted-foreground text-sm mt-1 leading-relaxed">
                Viktig info till alla som flyger i Åre. Läs reglerna
                under Flyga i Åre innan du startar.
              </p>
            </Link>

            <div className="mt-6 flex flex-col gap-3">
              <Link to="/flyga-i-are" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-primary" /> Starter & landningar
              </Link>
              <Link to="/flyga-i-are/xc" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-primary" /> Cross country & luftrum
              </Link>
              <Link to="/flyga-i-are/sakerhet" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-primary" /> Säkerhet & nödsituation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── DIVIDER ─── */}
      <div className="max-w-2xl mx-auto px-4"><div className="border-t border-border" /></div>

      {/* ─── WIND + MEMBERSHIP ─── */}
      <section className="@container max-w-2xl mx-auto px-4 py-10 md:py-16">
        <div className="flex flex-col md:flex-row gap-10 md:gap-16">

          {/* Left: wind */}
          <div className="md:w-3/5">
            <WindWidget />
          </div>

          {/* Right: membership */}
          <div className="md:w-2/5 flex flex-col justify-between">
            <div>
              <p className="font-serif text-lg font-semibold">Bli medlem</p>
              <p className="text-muted-foreground text-sm leading-relaxed mt-2">
                Medlemskap ger dig tillgång till alla startplatser,
                Draklanda, klubbussen och räddningsbåten.
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <a
                href="https://cloud.paragliding.se/product-category/klubbmedlemskap-stod-support-eller-for-nybliven-pilot/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-foreground text-background text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                Köp medlemskap — 600 kr/år
              </a>
              <Link to="/bli-medlem" className="text-xs text-center text-muted-foreground hover:text-primary transition-colors">
                Mer information →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── DIVIDER ─── */}
      <div className="max-w-2xl mx-auto px-4"><div className="border-t border-border" /></div>

      {/* ─── NEWS ─── */}
      <section className="@container max-w-2xl mx-auto px-4 py-10 md:py-16">
        <div className="flex justify-end mb-2">
          <Link to="/nyheter" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            Alla nyheter →
          </Link>
        </div>
        <NewsSlider />
      </section>

      {/* ─── DIVIDER ─── */}
      <div className="max-w-2xl mx-auto px-4"><div className="border-t border-border" /></div>

      {/* ─── NAV GRID ─── */}
      <section className="@container max-w-2xl mx-auto px-4 py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border rounded-lg overflow-hidden">
          {[
            { to: "/flyga-i-are", title: "Flyga i Åre", desc: "Startplatser, väder, regler" },
            { to: "/tavlingar", title: "Tävlingar", desc: "PPC, Topplandning, Larsa Open" },
            { to: "/om", title: "Om klubben", desc: "Historia, styrelse, kontakt" },
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="group bg-background p-6 hover:bg-muted/50 transition-colors"
            >
              <p className="font-serif text-lg font-semibold group-hover:text-primary transition-colors">
                {item.title}
              </p>
              <p className="text-muted-foreground text-sm mt-1">{item.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomeView;
