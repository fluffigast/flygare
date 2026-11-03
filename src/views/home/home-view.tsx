import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { ArrowRightIcon } from "lucide-react";
import Header from "../../components/header";
import NewsSlider from "../../blocks/news-slider/news-slider";
import SafetyBanner from "../../blocks/safety-banner/safety-banner";
import WindWidget from "../../blocks/wind-widget/wind-widget";
import HolfuyWidget from "../../blocks/wind-widget/holfuy-widget";
import Footer from "../../components/footer";
import SEO from "../../components/seo";
import { useSiteSettings, useGlobalLivePreview } from "../../hooks/useCMS";

const INFO_CARDS = [
  {
    to: "/flyga-i-are/startplatser",
    title: "Startplatser",
    desc: "Etablerade start- och landningsplatser i Åreområdet med karta, koordinater och lokala förhållanden.",
    img: "/assets/takeoff-hero.jpg",
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

function richTextToString(value: any): string {
  if (typeof value === "string") return value;
  if (value?.root?.children) {
    return value.root.children
      .map((block: any) =>
        block.children?.map((child: any) => child.text ?? "").join("") ?? ""
      )
      .join("\n\n");
  }
  return "";
}

const localSiteSettings = {
  heroTagline: "Skandinaviens mest spektakulära flygplats",
  heroDescription: "Skärm- och drakflyg från Åreskutan",
  foundedYear: 1976,
  aboutTitle: "Välkommen till Åre Skärm- och Drakflygklubb!",
  aboutText: "Åre Skärm- och Drakflygklubb bildades 1976 som drakflygklubb och har sedan 1988 även omfattat skärmflyg. Med ca 100 aktiva medlemmar och 9 startplatser på Åreskutan är vi en av Sveriges mest aktiva flygklubbar.",
  statsMembers: "~100",
  statsDistanceRecord: "230 km",
  statsLaunchSites: "9",
};

const HomeView: React.FC = () => {
  const { data: site } = useSiteSettings(localSiteSettings);
  const liveSite = useGlobalLivePreview(site);

  const [heroIn, setHeroIn] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setHeroIn(true), 60);
    return () => clearTimeout(t);
  }, []);

  const aboutText = richTextToString(liveSite.aboutText);

  return (
    <div className="w-full overflow-x-hidden">
      <SEO
        path="/"
        description="Skärm- och drakflyg från Åreskutan sedan 1976. 9 startplatser, aktivt klubbliv, tävlingar, distansflygning. Skandinaviens mest spektakulära flygplats."
      />
      <Header />

      {/* ═══ HERO ═══ */}
      <section
        className="relative w-full overflow-hidden"
        style={{ height: "clamp(420px, 72vh, 720px)", background: "#1a1e2a" }}
      >
        <img
          src="/assets/hero-paragliding.jpg"
          alt=""
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover object-center transition-transform ease-out"
          style={{
            transform: heroIn ? "scale(1)" : "scale(1.04)",
            transitionDuration: "8000ms",
          }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(2,6,24,.86) 0%, rgba(2,6,24,.42) 42%, rgba(2,6,24,.10) 100%)",
          }}
        />
        <div className="absolute left-0 right-0 bottom-0 p-5 sm:p-8 md:p-14 lg:px-20 max-w-[1480px] mx-auto">
          <p
            className="font-sans uppercase tracking-[0.18em] text-white/75 mb-3 md:mb-4"
            style={{ fontSize: "clamp(11px, 0.9vw, 13px)", fontWeight: 600 }}
            data-payload-field="heroTagline"
          >
            {liveSite.heroTagline}
          </p>
          <h1
            className="font-serif font-bold text-white max-w-4xl"
            style={{
              fontSize: "clamp(44px, 5.5vw, 76px)",
              lineHeight: 1.04,
              letterSpacing: "-0.02em",
              paddingBottom: "0.08em",
              textWrap: "balance" as React.CSSProperties["textWrap"],
            }}
            data-payload-field="heroDescription"
          >
            {liveSite.heroDescription}
          </h1>
          <div className="flex justify-between items-center mt-5 md:mt-7 text-white/70 text-xs sm:text-sm tracking-wide">
            <span className="inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
              Åreskutan, Jämtland
            </span>
            <span className="hidden sm:block">Säsong 2026</span>
          </div>
        </div>
      </section>

      <SafetyBanner />

      {/* ═══ PRIO ROW ═══
          Pptx-listade startsida-block: Bli medlem, Flygregler,
          Nyheter, Aktuellt väder — placeras direkt efter hero.
          (Berg-silhuetten kommer från global PageBackdrop.) */}
      <section className="relative max-w-[1480px] mx-auto px-4 md:px-14 mt-8 md:mt-12">
        <div className="mb-8 md:mb-10">
          <div className="flex items-baseline justify-between mb-4">
            <h2 className="font-serif font-bold text-xl md:text-2xl tracking-tight" style={{ color: "var(--ink-2, #0f172b)" }}>
              Vind nu
            </h2>
            <Link to="/flyga-i-are/vader" className="text-xs uppercase tracking-wider font-semibold hover:opacity-70" style={{ color: "var(--accent-strong, #2a5c82)" }}>
              Full prognos →
            </Link>
          </div>
          <HolfuyWidget />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] gap-8 md:gap-12">
          <WindWidget />
          <div className="flex flex-col gap-4 h-full">
            <Link
              to="/flyga-i-are/flygregler"
              className="group flex flex-1 items-start justify-between p-5 transition-colors hover:bg-[#fafbfc]"
              style={{ border: "1px solid var(--border, #e2e8f0)" }}
            >
              <div className="flex-1">
                <p className="font-serif italic text-xs mb-1" style={{ color: "var(--hero-accent, #3774a3)" }}>Viktigt</p>
                <p className="font-serif font-bold text-sm" style={{ color: "var(--ink, #020618)" }}>Flygregler</p>
                <p className="text-xs mt-1 leading-relaxed" style={{ color: "var(--slate, #62748e)" }}>Läs innan du flyger i Åre.</p>
              </div>
              <span className="text-sm ml-3 shrink-0 transition-transform group-hover:translate-x-1" style={{ color: "var(--slate-2, #90a1b9)" }}>&rarr;</span>
            </Link>
            <Link
              to="/bli-medlem"
              className="group flex flex-1 items-start justify-between p-5 transition-colors hover:bg-[#fafbfc]"
              style={{ border: "1px solid var(--border, #e2e8f0)" }}
            >
              <div className="flex-1">
                <p className="font-serif font-bold text-sm" style={{ color: "var(--ink, #020618)" }}>Bli medlem</p>
                <p className="text-xs mt-1 leading-relaxed" style={{ color: "var(--slate, #62748e)" }}>Startplatser, Draklanda, klubbussen.</p>
              </div>
              <span className="text-sm ml-3 shrink-0 transition-transform group-hover:translate-x-1" style={{ color: "var(--slate-2, #90a1b9)" }}>&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ NEWS ═══ */}
      <section className="max-w-[1480px] mx-auto px-4 md:px-14 mt-10 md:mt-14">
        <div className="flex justify-between items-end mb-3">
          <h2 className="font-serif font-bold text-xl md:text-[28px] leading-none tracking-tight" style={{ color: "var(--ink-2, #0f172b)" }}>
            Senaste nytt
          </h2>
          <Link to="/nyheter" className="text-sm hover:underline" style={{ color: "var(--ink-2, #0f172b)", borderBottom: "1px solid", paddingBottom: 2 }}>
            Alla nyheter
          </Link>
        </div>
        <NewsSlider />
      </section>

      {/* ═══ WELCOME ROW ═══ */}
      <section className="relative max-w-[1480px] mx-auto px-4 md:px-14 mt-6 md:mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-0">
          <div
            className="w-full bg-cover bg-center"
            style={{
              backgroundImage: "url(/assets/news-fjall.jpg)",
              aspectRatio: "1200 / 340",
              minHeight: 160,
            }}
          />
          <div className="flex flex-col justify-center py-5 sm:py-6 lg:py-8 lg:px-12">
            <h2 className="font-serif font-bold text-xl sm:text-2xl md:text-[28px] leading-tight tracking-tight mb-3" data-payload-field="aboutTitle">
              {liveSite.aboutTitle}
            </h2>
            {aboutText && aboutText.split("\n\n").map((p: string, i: number) => (
              <p key={i} className="text-sm sm:text-base leading-relaxed mb-2" style={{ color: "var(--ink-2, #0f172b)" }} {...(i === 0 ? { "data-payload-field": "aboutText" } : {})}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ STATS BAR ═══ */}
      <section className="max-w-[1480px] mx-auto px-4 md:px-14 mt-10 md:mt-14">
        <div
          className="grid grid-cols-3 gap-4 py-5"
          style={{ borderTop: "1px solid var(--border, #e2e8f0)", borderBottom: "1px solid var(--border, #e2e8f0)" }}
        >
          {[
            { label: "Medlemmar", value: liveSite.statsMembers },
            { label: "Distansrekord", value: liveSite.statsDistanceRecord },
            { label: "Startplatser", value: liveSite.statsLaunchSites },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1">
              <p className="font-serif font-bold text-lg sm:text-2xl md:text-[32px] leading-none" style={{ color: "var(--ink-2, #0f172b)" }}>
                {stat.value}
              </p>
              <p className="text-[10px] sm:text-xs" style={{ color: "var(--slate, #62748e)" }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ INFO CARDS ═══ */}
      <section className="max-w-[1480px] mx-auto px-4 md:px-14 mt-10 md:mt-14">
        <div className="flex justify-between items-end mb-5">
          <h2 className="font-serif font-bold text-[26px] leading-none tracking-tight" style={{ color: "var(--ink-2, #0f172b)" }}>
            Flyga i Åre
          </h2>
          <Link to="/flyga-i-are" className="text-sm hover:underline" style={{ color: "var(--ink-2, #0f172b)", borderBottom: "1px solid", paddingBottom: 2 }}>
            Se all information
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {INFO_CARDS.map((card) => (
            <Link key={card.to} to={card.to} className="group flex flex-col transition-transform duration-200 hover:-translate-y-0.5">
              <div
                className="w-full bg-cover bg-center transition-[filter] duration-200 group-hover:brightness-105"
                style={{ backgroundImage: `url(${card.img})`, aspectRatio: "480 / 260", backgroundColor: "#e9eef3" }}
              />
              <div className="py-4 flex flex-col gap-2">
                <h3 className="font-serif font-bold text-[22px] leading-tight tracking-tight" style={{ color: "var(--ink, #020618)" }}>{card.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--slate, #62748e)" }}>{card.desc}</p>
                <div className="w-6 h-6 grid place-items-center transition-transform duration-200 group-hover:translate-x-1.5" style={{ color: "var(--ink, #020618)" }}>
                  <ArrowRightIcon size={18} strokeWidth={1.4} />
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
