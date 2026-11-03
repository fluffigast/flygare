import React from "react";
import { Link } from "react-router";
import {
  ShieldAlertIcon,
  MapIcon,
  BookOpenIcon,
  CircleArrowOutUpRightIcon,
  CloudIcon,
  ZapIcon,
  MountainIcon,
  WavesIcon,
  BusIcon,
  WindIcon,
} from "lucide-react";
import SEO from "../../components/seo";

type Topic = {
  title: string;
  lead: string;
  to: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  accent?: "safety" | "default";
};

const TOPICS: Topic[] = [
  {
    title: "Säkerhet & nödsituation",
    lead: "Rutiner vid nödsituation, etik och hänsyn — läs före varje start.",
    to: "/flyga-i-are/sakerhet",
    icon: ShieldAlertIcon,
    accent: "safety",
  },
  {
    title: "Flygregler",
    lead: "Sammanfattning av de viktigaste reglerna för flygning i Åre.",
    to: "/flyga-i-are/flygregler",
    icon: BookOpenIcon,
  },
  {
    title: "Starter & landningar",
    lead: "Beskrivning av startplatser med karta, koordinater och väderstreck.",
    to: "/flyga-i-are/startplatser",
    icon: MapIcon,
  },
  {
    title: "Cross country flygning",
    lead: "XC-rutiner, kontrollerat luftrum, ATS-avtal och telefonnummer.",
    to: "/flyga-i-are/xc",
    icon: CircleArrowOutUpRightIcon,
  },
  {
    title: "Väder",
    lead: "Lokala väderförhållanden, SMHI-prognos och länkar till vindmätare.",
    to: "/flyga-i-are/vader",
    icon: CloudIcon,
  },
  {
    title: "Acro flygning",
    lead: "Vad man bör tänka på vid acro, räddningsbåt och Acrobox.",
    to: "/flyga-i-are/acro",
    icon: ZapIcon,
  },
  {
    title: "Hängflyg",
    lead: "Information om vad man bör tänka på vid flygning med hängflyg.",
    to: "/flyga-i-are/hangflyg",
    icon: MountainIcon,
  },
  {
    title: "Speedrider",
    lead: "Information om vad man bör tänka på vid flygning med speedrider.",
    to: "/flyga-i-are/speedrider",
    icon: WavesIcon,
  },
  {
    title: "Klubbuss & räddningsbåt",
    lead: "Regler, avgifter och behörighet för klubbuss och räddningsbåt.",
    to: "/flyga-i-are/klubbuss",
    icon: BusIcon,
  },
  {
    title: "Paramotor",
    lead: "Information om vad man bör tänka på vid flygning med paramotor.",
    to: "/flyga-i-are/paramotor",
    icon: WindIcon,
  },
];

const FlyingGuideIndex: React.FC = () => {
  return (
    <div className="w-full relative">
      <SEO
        title="Flyga i Åre"
        path="/flyga-i-are"
        description="Allt du behöver veta innan du flyger i Åreområdet: säkerhet, cross country, flygregler, Skistar-avtalet, väder, startplatser och räddningsbåt."
      />
      <section className="relative max-w-[1200px] mx-auto px-4 md:px-10 pt-12 md:pt-16 pb-6 md:pb-8">
        <p
          className="font-sans uppercase tracking-[0.14em] text-xs font-semibold"
          style={{ color: "var(--hero-accent, #3774a3)" }}
        >
          Flyga i Åre
        </p>
        <h1
          className="font-serif font-bold mt-2 leading-tight tracking-tight"
          style={{ fontSize: "clamp(36px, 5vw, 60px)", color: "var(--ink-2, #0f172b)", letterSpacing: "-0.02em" }}
        >
          Allt du behöver veta innan du startar
        </h1>
        <p
          className="max-w-2xl mt-6 text-base md:text-lg leading-relaxed"
          style={{ color: "var(--slate-3, #45556c)" }}
        >
          Säkerhet, regler, luftrum, startplatser, väder och lokala rutiner — samlat på ett ställe.
        </p>
      </section>

      <section className="max-w-[1200px] mx-auto px-4 md:px-10 pb-16 md:pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {TOPICS.map((topic) => {
            const Icon = topic.icon;
            const isSafety = topic.accent === "safety";
            return (
              <Link
                key={topic.title}
                to={topic.to}
                className="group flex flex-col gap-4 p-6 md:p-7 transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                style={{
                  background: isSafety ? "var(--hero-accent, #3774a3)" : "var(--paper, #fafbfc)",
                  border: `1px solid ${isSafety ? "var(--hero-accent, #3774a3)" : "var(--border, #e2e8f0)"}`,
                  borderRadius: 10,
                  color: isSafety ? "#fff" : undefined,
                  // @ts-expect-error — CSS custom property
                  "--tw-ring-color": "var(--hero-accent, #3774a3)",
                }}
              >
                <div className="flex items-center justify-between">
                  <span
                    className="inline-flex items-center justify-center w-10 h-10 rounded-full"
                    style={{
                      background: isSafety ? "rgba(255,255,255,0.18)" : "rgba(55,116,163,0.08)",
                      color: isSafety ? "#fff" : "var(--hero-accent, #3774a3)",
                    }}
                    aria-hidden="true"
                  >
                    <Icon size={20} strokeWidth={1.6} />
                  </span>
                  <span
                    className="text-sm transition-transform duration-200 group-hover:translate-x-1"
                    style={{ color: isSafety ? "#fff" : "var(--slate, #62748e)" }}
                    aria-hidden="true"
                  >
                    →
                  </span>
                </div>
                <h2
                  className="font-serif font-bold text-xl md:text-[22px] leading-snug tracking-tight"
                  style={{ color: isSafety ? "#fff" : "var(--ink-2, #0f172b)" }}
                >
                  {topic.title}
                </h2>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: isSafety ? "rgba(255,255,255,0.86)" : "var(--slate-3, #45556c)" }}
                >
                  {topic.lead}
                </p>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default FlyingGuideIndex;
