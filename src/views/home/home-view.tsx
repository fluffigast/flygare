import React from "react";
import { Link } from "react-router";
import Header from "../../components/header";
import HeroBanner from "../../blocks/hero-banner/hero-banner";
import NewsSlider from "../../blocks/news-slider/news-slider";
import WindWidget from "../../blocks/wind-widget/wind-widget";
import Footer from "../../components/footer";
import Separator from "../../components/separator";
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

      <HeroBanner
        imageUrl={getPlaceholderImage("home-hero")}
        title={site.heroTagline ?? localSiteSettings.heroTagline}
        subtitle={site.heroDescription ?? localSiteSettings.heroDescription}
        titleField="heroTagline"
        subtitleField="heroDescription"
      />

      <main className="@container max-w-2xl mx-auto px-4 flex flex-col py-8 md:py-12">

        {/* About — short club intro */}
        <section className="mb-8 md:mb-12 max-w-prose">
          <p className="text-muted-foreground leading-relaxed">
            Åre Drakflygklubb bildades 1975 och sedan 1988 har även skärmflygklubben funnits.
            Idag görs 95% av all flygning med skärm. Klubben har ca 100 aktiva medlemmar varav
            30 bor i Åre kommun. Distansrekordet ligger på 230 km — Åre till Sollefteå.
          </p>
        </section>

        {/* Flygregler notice */}
        <div className="border-l-4 border-primary pl-4 py-3 mb-8 md:mb-12">
          <Link to="/flyga-i-are/flygregler" className="group">
            <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
              Viktig info till alla som flyger i Åre — Flygregler
            </p>
            <p className="text-muted-foreground text-sm mt-1">
              Läs reglerna under Flyga i Åre innan du startar
            </p>
          </Link>
        </div>

        {/* Two-column: Wind + Bli medlem */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-12">
          <WindWidget />

          <section className="flex flex-col justify-between">
            <div>
              <p className="font-serif italic text-muted-foreground text-sm">Flyg med oss</p>
              <h2 className="font-serif text-2xl mb-3">Bli medlem</h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Medlemskap 600 kr/år ger dig tillgång till alla startplatser på
                Åreskutan, landningsplatsen Draklanda, klubbussen och räddningsbåten.
              </p>
            </div>
            <div className="flex flex-col gap-3 mt-4">
              <a
                href="https://cloud.paragliding.se/product-category/klubbmedlemskap-stod-support-eller-for-nybliven-pilot/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                Köp medlemskap — 600 kr/år
              </a>
              <Link to="/bli-medlem" className="text-sm text-center text-muted-foreground hover:text-primary transition-colors">
                Mer information om medlemskap →
              </Link>
            </div>
          </section>
        </div>

        <Separator />

        {/* Nyheter — just the slider, it has its own heading */}
        <div className="flex justify-end py-2">
          <Link to="/nyheter" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            Alla nyheter →
          </Link>
        </div>
        <NewsSlider />

        <Separator />

        {/* Quick navigation */}
        <section className="py-8 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to="/flyga-i-are" className="group p-5 rounded-lg border border-border hover:border-primary transition-colors">
              <h3 className="font-serif text-lg group-hover:text-primary transition-colors">Flyga i Åre</h3>
              <p className="text-muted-foreground text-sm mt-1">Startplatser, väder, flygregler, säkerhet och mer</p>
            </Link>
            <Link to="/tavlingar" className="group p-5 rounded-lg border border-border hover:border-primary transition-colors">
              <h3 className="font-serif text-lg group-hover:text-primary transition-colors">Tävlingar</h3>
              <p className="text-muted-foreground text-sm mt-1">Åre PPC, Topplandning, Larsa Open</p>
            </Link>
            <Link to="/om" className="group p-5 rounded-lg border border-border hover:border-primary transition-colors">
              <h3 className="font-serif text-lg group-hover:text-primary transition-colors">Om klubben</h3>
              <p className="text-muted-foreground text-sm mt-1">Historia, styrelse, kontakt, stadgar</p>
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default HomeView;
