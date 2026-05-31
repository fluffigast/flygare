import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { ArrowRightIcon } from "lucide-react";
import Header from "../../components/header";
import NewsSlider from "../../blocks/news-slider/news-slider";
import WindWidget from "../../blocks/wind-widget/wind-widget";
import Footer from "../../components/footer";
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
      <Header />

      {/* ═══ HERO ═══ */}
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
        <div className="absolute left-0 right-0 bottom-0 p-4 sm:p-6 md:p-10 lg:px-14">
          <p
            className="font-serif italic text-white/70 mb-0.5"
            style={{ fontSize: "clamp(10px, 1vw, 14px)" }}
            data-payload-field="heroTagline"
          >
            {liveSite.heroTagline}
          </p>
          <h1
            className="font-serif font-bold text-white/90 leading-tight"
            style={{ fontSize: "clamp(14px, 1.6vw, 24px)", letterSpacing: "-0.01em" }}
            data-payload-field="heroDescription"
          >
            {liveSite.heroDescription}
          </h1>
          <div className="flex justify-between mt-3 text-white/50 text-[10px] sm:text-xs tracking-wide">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-white/40" />
              Åreskutan, Jämtland
            </span>
            <span className="hidden sm:block">Säsong 2026</span>
          </div>
        </div>
      </section>

      {/* ═══ WELCOME ROW ═══ */}
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
          <div className="flex flex-col justify-center py-6 sm:py-8 lg:py-10 lg:px-12">
            <h2 className="font-serif font-bold text-xl sm:text-2xl md:text-[32px] leading-tight tracking-tight mb-4" data-payload-field="aboutTitle">
              {liveSite.aboutTitle}
            </h2>
            {aboutText && aboutText.split("\n\n").map((p: string, i: number) => (
              <p key={i} className="text-sm sm:text-base leading-relaxed mb-3" style={{ color: "var(--ink-2, #0f172b)" }} {...(i === 0 ? { "data-payload-field": "aboutText" } : {})}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ STATS BAR ═══ */}
      <section className="max-w-2xl mx-auto px-4 mt-12 md:mt-16">
        <div
          className="grid grid-cols-3 gap-4 py-6"
          style={{ borderTop: "1px solid var(--border, #e2e8f0)", borderBottom: "1px solid var(--border, #e2e8f0)" }}
        >
          {[
            { label: "Medlemmar", value: liveSite.statsMembers },
            { label: "Distansrekord", value: liveSite.statsDistanceRecord },
            { label: "Startplatser", value: liveSite.statsLaunchSites },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1">
              <p className="font-serif font-bold text-lg sm:text-2xl md:text-[40px] leading-none" style={{ color: "var(--ink-2, #0f172b)" }}>
                {stat.value}
              </p>
              <p className="text-[10px] sm:text-xs" style={{ color: "var(--slate, #62748e)" }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ WEATHER + LINKS ═══ */}
      <section className="max-w-2xl mx-auto px-4 mt-12 md:mt-20">
        <div className="border-t pt-6" style={{ borderColor: "var(--border, #e2e8f0)" }}>
          <div className="grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] gap-8 md:gap-12">
            <WindWidget />
            <div className="flex flex-col gap-4 h-full">
              <Link
                to="/flyga-i-are/flygregler"
                className="group flex flex-1 items-start justify-between p-5 transition-colors hover:bg-[#fafbfc]"
                style={{ border: "1px solid var(--border, #e2e8f0)" }}
              >
                <div className="flex-1">
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
        </div>
      </section>

      {/* ═══ NEWS ═══ */}
      <section className="max-w-2xl mx-auto px-4 mt-12 md:mt-20">
        <div className="flex justify-end mb-2">
          <Link to="/nyheter" className="text-sm hover:underline" style={{ color: "var(--ink-2, #0f172b)", borderBottom: "1px solid", paddingBottom: 2 }}>
            Alla nyheter
          </Link>
        </div>
        <NewsSlider />
      </section>

      {/* ═══ INFO CARDS ═══ */}
      <section className="max-w-2xl mx-auto px-4 mt-12 md:mt-20">
        <div className="flex justify-between items-end mb-6">
          <h2 className="font-serif font-bold text-[32px] leading-none tracking-tight" style={{ color: "var(--ink-2, #0f172b)" }}>
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
                style={{ backgroundImage: `url(${card.img})`, aspectRatio: "480 / 330", backgroundColor: "#e9eef3" }}
              />
              <div className="py-5 flex flex-col gap-3">
                <h3 className="font-serif font-bold text-[26px] leading-none tracking-tight" style={{ color: "var(--ink, #020618)" }}>{card.title}</h3>
                <p className="text-base leading-relaxed" style={{ color: "var(--slate, #62748e)" }}>{card.desc}</p>
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
