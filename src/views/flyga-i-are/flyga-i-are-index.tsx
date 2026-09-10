import React from "react";
import { Link } from "react-router";
import TopoLines from "../../components/decorations/topo-lines";
import ParaglidingArc from "../../components/decorations/paragliding-arc";

type TopicItem = { text: string; to?: string };
type Topic = { title: string; items: TopicItem[] };

// Layout & content per pptx-audit HTML-referens (Downloads/flyga-i-are.html):
// 10 grå cards i 2-kolumners grid. Blå accent-länkar för kända underlänkar.
const TOPICS: Topic[] = [
  {
    title: "Säkerhet / Nödsituation",
    items: [
      { text: "Rutiner vid nödsituation", to: "/flyga-i-are/sakerhet" },
      { text: "Säkerhet & ansvar / etik & hänsyn" },
    ],
  },
  {
    title: "Cross country flygning",
    items: [
      { text: "Info om vad man bör tänka på vid XC", to: "/flyga-i-are/xc" },
      { text: "Info om luftrum med luftrumskarta" },
      { text: "Rutiner för flygning i luftrummet" },
      { text: "Länkar & telefonnummer för flygning i luftrum" },
      { text: "Radiofrekvens mm" },
    ],
  },
  {
    title: "Flygregler",
    items: [
      { text: "Sammanfattning av de viktigaste från reglerna", to: "/flyga-i-are/flygregler" },
      { text: "Samarbetsavtalet Skistar", to: "/flyga-i-are/skistar" },
      { text: "Avtalet Kommersiell aktör" },
    ],
  },
  {
    title: "Acro flygning",
    items: [
      { text: "Info om vad man bör tänka på vid acro", to: "/flyga-i-are/acro" },
      { text: "Räddningsbåt (länk till reglerna)", to: "/flyga-i-are/klubbuss" },
      { text: "Acrobox" },
    ],
  },
  {
    title: "Väder",
    items: [
      { text: "Allmänt om lokala väderförhållanden", to: "/flyga-i-are/vader" },
      { text: "Länkar till vädersidor & vindmätare" },
    ],
  },
  {
    title: "Speedrider",
    items: [
      { text: "Info om vad man bör tänka på vid flygning med speedrider", to: "/flyga-i-are/speedrider" },
    ],
  },
  {
    title: "Starter & landningar",
    items: [
      { text: "Beskrivning av & info om startplatser i Åre med omnejd", to: "/flyga-i-are/startplatser" },
      { text: "Karta över dessa" },
    ],
  },
  {
    title: "Hängflyg",
    items: [
      { text: "Info om vad man bör tänka på vid flygning med hängflyg", to: "/flyga-i-are/hangflyg" },
    ],
  },
  {
    title: "Klubbuss & räddningsbåt",
    items: [
      { text: "Allmänt vad som gäller", to: "/flyga-i-are/klubbuss" },
      { text: "Regler & avgifter klubbuss (enligt skapat dokument)" },
      { text: "Regler räddningsbåt (enligt skapat dokument)" },
    ],
  },
  {
    title: "Paramotor",
    items: [
      { text: "Info om vad man bör tänka på vid flygning med paramotor", to: "/flyga-i-are/paramotor" },
    ],
  },
];

const FlyingGuideIndex: React.FC = () => {
  return (
    <div className="w-full relative">
      {/* Topografiska höjdkurvor bakom hela sidan — kart-blad-känsla. */}
      <TopoLines
        className="pointer-events-none absolute inset-0 w-full h-full -z-10"
        opacity={0.05}
      />
      {/* Paragliding-båge diagonal över page-header. */}
      <ParaglidingArc
        className="pointer-events-none absolute inset-x-0 top-0 h-48 md:h-64 w-full -z-10"
        opacity={0.08}
      />
      <section className="relative max-w-[1200px] mx-auto px-4 md:px-10 pt-12 md:pt-16 pb-6 md:pb-8">
        <p
          className="font-serif italic text-base md:text-lg"
          style={{ color: "var(--slate, #62748e)" }}
        >
          Allt du behöver veta innan du startar
        </p>
        <h1
          className="font-serif font-bold mt-1 leading-tight tracking-tight"
          style={{ fontSize: "clamp(28px, 3.4vw, 44px)", color: "var(--ink-2, #0f172b)" }}
        >
          Flyga i Åre
        </h1>
      </section>

      <section className="max-w-[1200px] mx-auto px-4 md:px-10 pb-16 md:pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {TOPICS.map((topic) => (
            <article
              key={topic.title}
              className="p-6 md:p-7"
              style={{
                background: "var(--paper, #fafbfc)",
                border: "1px solid var(--border, #e2e8f0)",
                borderRadius: 10,
              }}
            >
              <h2
                className="font-serif font-bold text-lg mb-3"
                style={{ color: "var(--ink-2, #0f172b)" }}
              >
                {topic.title}
              </h2>
              <ul className="list-disc pl-5 flex flex-col gap-2">
                {topic.items.map((item, i) => (
                  <li
                    key={i}
                    className="text-sm leading-snug"
                    style={{ color: "var(--slate-3, #45556c)" }}
                  >
                    {item.to ? (
                      <Link
                        to={item.to}
                        className="font-semibold hover:underline"
                        style={{ color: "var(--hero-accent, #3774a3)" }}
                      >
                        {item.text}
                      </Link>
                    ) : (
                      item.text
                    )}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default FlyingGuideIndex;
