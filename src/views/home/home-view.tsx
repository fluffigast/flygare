import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { ArrowRightIcon } from "lucide-react";
import Header from "../../components/header";
import NewsSlider from "../../blocks/news-slider/news-slider";
import WindWidget from "../../blocks/wind-widget/wind-widget";
import Footer from "../../components/footer";
import { getPlaceholderImage } from "../../utils/placeholder";
import { useSiteSettings, useGlobalLivePreview } from "../../hooks/useCMS";

const localSiteSettings = {
  heroTagline: "Åre Skärm- och Drakflygklubb",
  heroDescription: "Skandinaviens mest spektakulära flygplats sedan 1975",
};

/* ─── Info cards data ─── */
const INFO_CARDS = [
  {
    to: "/flyga-i-are/startplatser",
    title: "Starter och landningar",
    desc: "Etablerade start- och landningsplatser, lokala förhållanden och tips för trygg takeoff och säkra landningar.",
    img: "/assets/takeoff-hero.jpg",
  },
  {
    to: "/flyga-i-are/klubbuss",
    title: "Klubbussen",
    desc: "Regler och avgifter för klubbussen som kör dig upp på berget. Fullvärdigt medlemskap krävs.",
    img: "/assets/klubbussen.jpg",
  },
  {
    to: "/flyga-i-are/xc",
    title: "Luftrum och XC",
    desc: "Information om kontrollerat luftrum, XC-rutiner och samarbetsavtalet med ATS Östersund.",
    img: "/assets/luftrum.jpg",
  },
];

const HomeView: React.FC = () => {
  const { data: cmsSite } = useSiteSettings(localSiteSettings);
  const site = useGlobalLivePreview(cmsSite);

  const [heroIn, setHeroIn] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setHeroIn(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="w-full overflow-x-hidden">
      <Header />

      {/* ═══════════════════════════════════════════
          HERO — clean image with text overlay
          ═══════════════════════════════════════════ */}
      <section
        className="relative w-full overflow-hidden"
        style={{ height: "clamp(280px, 35vw, 480px)" }}
      >
        <div
          className={`absolute inset-0 bg-cover bg-center transition-transform duration-[6s] ease-out ${heroIn ? "scale-100" : "scale-[1.02]"}`}
          style={{ backgroundImage: `url(/assets/hero-paragliding.jpg)` }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(0,0,0,.08) 0%, transparent 40%, transparent 60%, rgba(0,0,0,.35) 100%)" }}
        />
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 lg:p-14">
          <h1
            className="font-serif font-bold text-white text-2xl md:text-4xl lg:text-5xl leading-tight max-w-2xl"
            data-payload-field="heroTagline"
          >
            {site.heroTagline ?? localSiteSettings.heroTagline}
          </h1>
          <p
            className="text-white/80 text-sm md:text-base mt-2 max-w-lg"
            data-payload-field="heroDescription"
          >
            {site.heroDescription ?? localSiteSettings.heroDescription}
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          WELCOME ROW — image left + text right
          ═══════════════════════════════════════════ */}
      <section className="max-w-2xl mx-auto px-4 mt-12 md:mt-16 lg:mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-0">
          {/* Image */}
          <div
            className="w-full bg-cover bg-center"
            style={{
              backgroundImage: `url(/assets/news-fjall.jpg)`,
              aspectRatio: "840 / 360",
              minHeight: 200,
            }}
          />
          {/* Text */}
          <div className="flex flex-col justify-center py-8 px-0 lg:py-10 lg:px-12">
            <h2
              className="font-serif font-bold text-2xl md:text-[32px] leading-tight tracking-tight mb-5"
              style={{ color: "var(--ink)" }}
            >
              Välkommen till Åre Skärm- och Drakflygklubb!
            </h2>
            <p className="text-base leading-relaxed mb-4" style={{ color: "var(--ink-2)" }}>
              Åre Skärm- och Drakflygklubb har i många år varit en samlingspunkt
              för flygare i fjällmiljö. Vi arbetar aktivt med utbildning,
              säkerhet och samarbete med markägare och andra aktörer i området.
            </p>
            <p className="text-base leading-relaxed" style={{ color: "var(--ink-2)" }}>
              Klubben drivs av sina medlemmar och bygger på engagemang,
              erfarenhetsutbyte och flygglädje. Målet är enkelt. Att fler ska
              få uppleva friheten i luften på ett tryggt och hållbart sätt.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CALLOUT ROW — Flygregler + Bli medlem
          ═══════════════════════════════════════════ */}
      <section className="max-w-2xl mx-auto px-4 mt-12 md:mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Flygregler */}
          <Link
            to="/flyga-i-are/flygregler"
            className="group flex flex-col gap-2.5 border border-border p-6 md:p-7 bg-white transition-all hover:border-[var(--ink-2)] hover:-translate-y-0.5"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.14em]" style={{ color: "var(--hero-accent)" }}>
              Viktigt {"\u00B7"} alla som flyger i Åre
            </span>
            <h3 className="font-serif font-bold text-2xl" style={{ color: "var(--ink-2)" }}>
              Flygregler
            </h3>
            <p className="text-[15px] leading-relaxed" style={{ color: "var(--slate)" }}>
              De viktigaste reglerna för att flyga säkert i Åre — sammanfattade
              på ett ställe.
            </p>
            <span className="inline-flex items-center gap-1.5 text-sm mt-0.5" style={{ color: "var(--hero-accent)" }}>
              Läs flygreglerna <ArrowRightIcon className="w-4 h-4" />
            </span>
          </Link>

          {/* Bli medlem */}
          <Link
            to="/bli-medlem"
            className="group flex flex-col gap-2.5 p-6 md:p-7 transition-all hover:-translate-y-0.5"
            style={{ background: "var(--ink-2)", border: "1px solid var(--ink-2)" }}
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#9db8d6]">
              Gå med i klubben
            </span>
            <h3 className="font-serif font-bold text-2xl text-white">
              Bli medlem
            </h3>
            <p className="text-[15px] leading-relaxed text-[#c2cfde]">
              Tillgång till startplatser, klubbussen och en gemenskap av erfarna
              piloter.
            </p>
            <span className="inline-flex items-center gap-1.5 text-sm text-white mt-0.5">
              Bli medlem <ArrowRightIcon className="w-4 h-4" />
            </span>
          </Link>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          NEWS SLIDER — existing component
          ═══════════════════════════════════════════ */}
      <section className="max-w-2xl mx-auto px-4 mt-12 md:mt-16">
        <NewsSlider />
      </section>

      {/* ═══════════════════════════════════════════
          INFO CARDS — 3-column, hover lift + arrow
          ═══════════════════════════════════════════ */}
      <section className="max-w-2xl mx-auto px-4 mt-12 md:mt-16">
        <div className="flex justify-between items-end mb-6">
          <h2
            className="font-serif font-bold text-[32px] leading-none tracking-tight"
            style={{ color: "var(--ink-2)" }}
          >
            Flyga i Åre
          </h2>
          <Link
            to="/flyga-i-are"
            className="text-sm pb-0.5"
            style={{ color: "var(--ink-2)", borderBottom: "1px solid var(--ink-2)" }}
          >
            Se all information
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {INFO_CARDS.map((card) => (
            <Link
              key={card.to}
              to={card.to}
              className="info-card-lift flex flex-col bg-white cursor-pointer overflow-hidden"
            >
              <div
                className="info-card-img w-full bg-cover bg-center"
                style={{
                  backgroundImage: `url(${card.img})`,
                  aspectRatio: "480 / 330",
                  backgroundColor: "#e9eef3",
                }}
              />
              <div className="relative z-10 bg-white p-5 flex flex-col gap-3">
                <h3
                  className="font-serif font-bold text-2xl md:text-[32px] leading-none tracking-tight"
                  style={{ color: "var(--ink)" }}
                >
                  {card.title}
                </h3>
                <p className="text-base leading-relaxed" style={{ color: "var(--slate)" }}>
                  {card.desc}
                </p>
                <div className="info-card-arrow mt-1" style={{ color: "var(--ink)" }}>
                  <ArrowRightIcon className="w-6 h-6" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          WIND WIDGET — existing component
          ═══════════════════════════════════════════ */}
      <section className="max-w-2xl mx-auto px-4 mt-12 md:mt-16">
        <WindWidget />
      </section>

      {/* ═══════════════════════════════════════════
          MEMBERSHIP CTA — compact
          ═══════════════════════════════════════════ */}
      <section className="max-w-2xl mx-auto px-4 mt-12 md:mt-16">
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start md:items-center">
            <div className="flex-1">
              <p className="font-serif text-lg font-semibold" style={{ color: "var(--ink)" }}>
                Bli medlem
              </p>
              <p className="text-sm leading-relaxed mt-2" style={{ color: "var(--slate)" }}>
                Medlemskap ger dig tillgång till alla startplatser, Draklanda,
                klubbussen och räddningsbåten.
              </p>
            </div>
            <div className="flex flex-col gap-3 shrink-0">
              <a
                href="https://cloud.paragliding.se/product-category/klubbmedlemskap-stod-support-eller-for-nybliven-pilot/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-foreground text-background text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                Köp medlemskap — 600 kr/år
              </a>
              <Link
                to="/bli-medlem"
                className="text-xs text-center transition-colors hover:text-primary"
                style={{ color: "var(--slate)" }}
              >
                Mer information →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          NAV GRID — 3-column quick links
          ═══════════════════════════════════════════ */}
      <section className="max-w-2xl mx-auto px-4 mt-12 md:mt-16 mb-4">
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
