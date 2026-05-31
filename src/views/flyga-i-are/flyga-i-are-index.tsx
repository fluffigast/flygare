import React from "react";
import { Link } from "react-router";
import { ArrowRightIcon } from "lucide-react";
import NewsSlider from "../../blocks/news-slider/news-slider";
import { useFlyingGuide, useGlobalLivePreview } from "../../hooks/useCMS";

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

const INFO_CARDS = [
  {
    to: "/flyga-i-are/startplatser",
    title: "Starter och landningar",
    desc: "Information om etablerade start- och landningsplatser, lokala förhållanden och tips för trygg takeoff och säkra landningar.",
    img: "/assets/takeoff-hero.jpg",
  },
  {
    to: "/flyga-i-are/vader",
    title: "Väder och vind",
    desc: "Råd om hur man tolkar väder, vindriktningar och termik i Årefjällen. Viktigt för att planera flygning och hålla säkerheten hög.",
    img: "/assets/hero-paragliding.jpg",
  },
  {
    to: "/flyga-i-are/flygregler",
    title: "Säkerhet och regler",
    desc: "Lokala regler, nationella bestämmelser och säkerhetsrutiner för skärm- och drakflyg. Fokus på ansvar och förebyggande åtgärder.",
    img: "/assets/news-fjall.jpg",
  },
  {
    to: "/flyga-i-are/sakerhet",
    title: "Nödinformation",
    desc: "Vad man gör vid incidenter, nödsignalering och viktiga kontaktvägar till räddningstjänst och klubb.",
    img: "/assets/klubbussen.jpg",
  },
  {
    to: "/flyga-i-are/xc",
    title: "Luftrum",
    desc: "Information om kontrollerade och obevakade luftrum, restriktioner och hur man flyger säkert bland andra luftfarkoster.",
    img: "/assets/luftrum.jpg",
  },
  {
    to: "/flyga-i-are/klubbuss",
    title: "Klubbussen",
    desc: "Allt om klubbens buss: transport av piloter och utrustning, planering av turer och hur man använder den på ett säkert sätt.",
    img: "/assets/klubbussen.jpg",
  },
];

const localGuide = {
  winterTitle: "Flyga på vintern",
  winterContent: "Vintern erbjuder fantastiska förhållanden med laminärt flöde och ofta starka inversioner.",
  summerTitle: "Flyga på sommaren",
  summerContent: "Termik från sen vår till tidig höst. Landningen på Draklanda kan vara krävande sommartid. Minst 25 höjdflygningar krävs.",
};

const FlyingGuideIndex: React.FC = () => {
  const { data: cmsGuide } = useFlyingGuide(localGuide);
  const guide = useGlobalLivePreview(cmsGuide);

  const winterTitle = guide.winterTitle ?? localGuide.winterTitle;
  const winterContent = richTextToString(guide.winterContent) || localGuide.winterContent;
  const summerTitle = guide.summerTitle ?? localGuide.summerTitle;
  const summerContent = richTextToString(guide.summerContent) || localGuide.summerContent;

  return (
    <div className="w-full">
      {/* Editorial header */}
      <section className="px-4 md:px-[110px] pt-16 md:pt-24 pb-8">
        <p
          className="font-serif italic text-2xl md:text-[40px] leading-none"
          style={{ color: "var(--ink-2, #0f172b)" }}
        >
          Information
        </p>
        <h1
          className="font-serif font-bold leading-[0.96] tracking-tight mt-1"
          style={{
            fontSize: "clamp(48px, 6vw, 96px)",
            color: "var(--ink-2, #0f172b)",
            letterSpacing: "-0.02em",
          }}
        >
          Att flyga i Åre
        </h1>
        <p
          className="max-w-2xl mt-8 text-base md:text-lg leading-relaxed"
          style={{ color: "var(--slate, #62748e)" }}
        >
          En samlad guide till starter, väder, regler och säkerhet i
          Åreområdet. Innehållet underhålls av klubbens medlemmar.
        </p>
      </section>

      {/* Info cards grid */}
      <section className="max-w-[1480px] mx-auto px-4 md:px-14 mt-8 md:mt-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {INFO_CARDS.map((card) => (
            <Link
              key={card.to}
              to={card.to}
              className="group flex flex-col info-card-lift"
            >
              <div
                className="w-full overflow-hidden"
                style={{ aspectRatio: "480 / 560", backgroundColor: "#e9eef3" }}
              >
                <div
                  className="w-full h-full bg-cover bg-center info-card-img"
                  style={{ backgroundImage: `url(${card.img})` }}
                />
              </div>
              <div className="py-5 flex flex-col gap-3">
                <h3
                  className="font-serif font-bold text-2xl md:text-[32px] leading-none tracking-tight"
                  style={{ color: "var(--ink, #020618)" }}
                >
                  {card.title}
                </h3>
                <p
                  className="text-base leading-relaxed"
                  style={{ color: "var(--slate, #62748e)" }}
                >
                  {card.desc}
                </p>
                <div
                  className="w-7 h-7 grid place-items-center info-card-arrow"
                  style={{ color: "var(--ink, #020618)" }}
                >
                  <ArrowRightIcon size={22} strokeWidth={1.4} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Seasonal info from CMS FlyingGuide */}
      <section className="max-w-[1480px] mx-auto px-4 md:px-14 mt-16 md:mt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          <div className="flex flex-col gap-3" style={{ borderTop: "1px solid var(--border, #e2e8f0)", paddingTop: 24 }}>
            <h2 className="font-serif font-bold text-xl md:text-[28px] leading-none" style={{ color: "var(--ink-2, #0f172b)" }} data-payload-field="winterTitle">
              {winterTitle}
            </h2>
            <p className="text-base leading-relaxed" style={{ color: "var(--slate, #62748e)" }} data-payload-field="winterContent">
              {winterContent}
            </p>
          </div>
          <div className="flex flex-col gap-3" style={{ borderTop: "1px solid var(--border, #e2e8f0)", paddingTop: 24 }}>
            <h2 className="font-serif font-bold text-xl md:text-[28px] leading-none" style={{ color: "var(--ink-2, #0f172b)" }} data-payload-field="summerTitle">
              {summerTitle}
            </h2>
            <p className="text-base leading-relaxed" style={{ color: "var(--slate, #62748e)" }} data-payload-field="summerContent">
              {summerContent}
            </p>
          </div>
        </div>
      </section>

      {/* News carousel */}
      <div className="max-w-[1480px] mx-auto px-4 md:px-14 mt-16 md:mt-24">
        <NewsSlider />
      </div>
    </div>
  );
};

export default FlyingGuideIndex;
