import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { ArrowRightIcon } from "lucide-react";
import Header from "../../components/header";
import NewsSlider from "../../blocks/news-slider/news-slider";
import WindWidget from "../../blocks/wind-widget/wind-widget";
import Footer from "../../components/footer";
import { useSiteSettings, useGlobalLivePreview } from "../../hooks/useCMS";

const localSiteSettings = {
  heroTagline: "Åre Skärm- och Drakflygklubb",
  heroDescription: "Skandinaviens mest spektakulära flygplats sedan 1975",
};

const INFO_CARDS = [
  {
    to: "/flyga-i-are/startplatser",
    title: "Startplatser",
    desc: "Etablerade start- och landningsplatser i Åreområdet med karta, koordinater och lokala förhållanden.",
    img: "/assets/takeoff-hero.jpg",
  },
  {
    to: "/flyga-i-are/flygregler",
    title: "Flygregler",
    desc: "Lokala regler, Skistar-avtal och säkerhetsrutiner. Läs innan du flyger.",
    img: "/assets/hero-paragliding.jpg",
  },
  {
    to: "/flyga-i-are/klubbuss",
    title: "Klubbussen",
    desc: "Regler och avgifter. Fullvärdigt medlemskap krävs, max 4 passagerare.",
    img: "/assets/klubbussen.jpg",
  },
  {
    to: "/flyga-i-are/xc",
    title: "Luftrum",
    desc: "XC-rutiner, kontrollerat luftrum (ESNZ TMA), ATS-avtal och telefonnummer.",
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

      {/* ═══ HERO — editorial, full-bleed image + large type ═══ */}
      <section
        className="relative w-full overflow-hidden"
        style={{ height: "clamp(360px, 42vw, 640px)", background: "#1a1e2a" }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[6s] ease-out"
          style={{
            backgroundImage: "url(/assets/hero-paragliding.jpg)",
            transform: heroIn ? "scale(1)" : "scale(1.03)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, rgba(0,0,0,.06) 0%, transparent 30%, transparent 50%, rgba(0,0,0,.45) 100%)",
          }}
        />
        {/* Footer bar */}
        <div className="absolute left-0 right-0 bottom-4 md:bottom-6 flex justify-between px-6 md:px-14 text-white/70 text-xs tracking-wide">
          <span className="inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-white/50" />
            Åreskutan, Jämtland
          </span>
          <span className="hidden sm:block">Säsong 2026</span>
        </div>
      </section>

      {/* ═══ WELCOME ROW — image left + text right ═══ */}
      <section className="max-w-2xl mx-auto px-4 mt-12 md:mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-0">
          <div
            className="w-full bg-cover bg-center"
            style={{
              backgroundImage: "url(/assets/news-fjall.jpg)",
              aspectRatio: "840 / 360",
              minHeight: 200,
            }}
          />
          <div className="flex flex-col justify-center py-8 lg:py-10 lg:px-12">
            <h2 className="font-serif font-bold text-2xl md:text-[32px] leading-tight tracking-tight mb-5">
              Välkommen till Åre Skärm- och Drakflygklubb!
            </h2>
            <p className="text-base leading-relaxed mb-4" style={{ color: "var(--ink-2, #0f172b)" }}>
              Åre Skärm- och Drakflygklubb har i många år varit en samlingspunkt
              för flygare i fjällmiljö. Vi arbetar aktivt med utbildning,
              säkerhet och samarbete med markägare och andra aktörer i området.
            </p>
            <p className="text-base leading-relaxed" style={{ color: "var(--ink-2, #0f172b)" }}>
              Klubben drivs av sina medlemmar och bygger på engagemang,
              erfarenhetsutbyte och flygglädje. Målet är enkelt — att fler ska
              få uppleva friheten i luften på ett tryggt och hållbart sätt.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ WEATHER + MEMBERSHIP ═══ */}
      <section className="max-w-2xl mx-auto px-4 mt-12 md:mt-20">
        <div className="border-t pt-6" style={{ borderColor: "var(--border, #e2e8f0)" }}>
          <div className="grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] gap-8 md:gap-12">
            <WindWidget />
            <div className="flex flex-col justify-between">
              <div>
                <p className="font-serif italic text-sm mb-1" style={{ color: "var(--slate, #62748e)" }}>Medlemskap</p>
                <h2 className="font-serif font-bold text-2xl mb-3" style={{ color: "var(--ink-2, #0f172b)" }}>Bli medlem</h2>
                <p className="text-sm leading-relaxed" style={{ color: "var(--slate, #62748e)" }}>
                  600 kr/år. Tillgång till alla startplatser, Draklanda, klubbussen och räddningsbåten.
                </p>
              </div>
              <div className="flex flex-col gap-3 mt-5">
                <a
                  href="https://cloud.paragliding.se/product-category/klubbmedlemskap-stod-support-eller-for-nybliven-pilot/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-serif transition-all hover:-translate-y-px"
                  style={{ background: "#000", color: "#fff" }}
                >
                  Bli medlem
                </a>
                <Link
                  to="/flyga-i-are/flygregler"
                  className="flex items-center justify-between px-4 py-3 text-xs transition-colors hover:border-current"
                  style={{ border: "1px solid var(--border, #e2e8f0)", color: "var(--ink, #020618)" }}
                >
                  <span>Flygregler</span>
                  <span style={{ color: "var(--slate-2, #90a1b9)" }}>&rarr;</span>
                </Link>
                <Link to="/bli-medlem" className="text-xs text-center" style={{ color: "var(--slate-2, #90a1b9)" }}>
                  Mer information →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ NEWS CAROUSEL ═══ */}
      <section className="max-w-2xl mx-auto px-4 mt-12 md:mt-20">
        <div className="flex justify-end mb-2">
          <Link to="/nyheter" className="text-sm hover:underline" style={{ color: "var(--ink-2, #0f172b)", borderBottom: "1px solid", paddingBottom: 2 }}>
            Alla nyheter
          </Link>
        </div>
        <NewsSlider />
      </section>

      {/* ═══ FLYGA I ÅRE — info cards grid ═══ */}
      <section className="max-w-2xl mx-auto px-4 mt-12 md:mt-20">
        <div className="flex justify-between items-end mb-6">
          <h2 className="font-serif font-bold text-[32px] leading-none tracking-tight" style={{ color: "var(--ink-2, #0f172b)" }}>
            Flyga i Åre
          </h2>
          <Link to="/flyga-i-are" className="text-sm hover:underline" style={{ color: "var(--ink-2, #0f172b)", borderBottom: "1px solid", paddingBottom: 2 }}>
            Se all information
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {INFO_CARDS.map((card) => (
            <Link
              key={card.to}
              to={card.to}
              className="group flex flex-col transition-transform duration-200 hover:-translate-y-0.5"
            >
              <div
                className="w-full bg-cover bg-center transition-[filter] duration-200 group-hover:brightness-105"
                style={{
                  backgroundImage: `url(${card.img})`,
                  aspectRatio: "480 / 330",
                  backgroundColor: "#e9eef3",
                }}
              />
              <div className="py-5 flex flex-col gap-3">
                <h3 className="font-serif font-bold text-[26px] leading-none tracking-tight" style={{ color: "var(--ink, #020618)" }}>
                  {card.title}
                </h3>
                <p className="text-base leading-relaxed" style={{ color: "var(--slate, #62748e)" }}>
                  {card.desc}
                </p>
                <div className="w-7 h-7 grid place-items-center transition-transform duration-200 group-hover:translate-x-1.5" style={{ color: "var(--ink, #020618)" }}>
                  <ArrowRightIcon size={22} strokeWidth={1.4} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomeView;
