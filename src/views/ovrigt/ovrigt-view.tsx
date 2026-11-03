import React from "react";
import { Link } from "react-router";
import SEO from "../../components/seo";

type Topic = {
  title: string;
  description: string;
  to?: string;
  href?: string;
};

const TOPICS: Topic[] = [
  {
    title: "Foton",
    description: "Bilder från klubbens flygningar och evenemang, sorterade per år.",
    to: "/ovrigt/foton",
  },
  {
    title: "Dokumentarkiv",
    description: "Stadgar, protokoll och styrelsedokument — ladda ner som PDF.",
    to: "/ovrigt/dokument",
  },
  {
    title: "Skärmflygförbundet",
    description: "Nationella regler, licens, utbildning och tävlingar hos SSFF.",
    href: "https://www.paragliding.se",
  },
];

const OvrigtView: React.FC = () => (
  <div className="w-full relative">
    <SEO
      title="Övrigt"
      path="/ovrigt"
      description="Foton, dokumentarkiv och länkar till Skärmflygförbundet för Åre Skärm- och Drakflygklubb."
    />
    <section className="relative max-w-[1200px] mx-auto px-4 md:px-10 pt-12 md:pt-16 pb-6 md:pb-8">
      <p className="font-serif italic text-base md:text-lg" style={{ color: "var(--slate, #62748e)" }}>
        Övrigt
      </p>
      <h1
        className="font-serif font-bold mt-1 leading-tight tracking-tight"
        style={{ fontSize: "clamp(28px, 3.4vw, 44px)", color: "var(--ink-2, #0f172b)" }}
      >
        Material och länkar
      </h1>
    </section>

    <section className="max-w-[1200px] mx-auto px-4 md:px-10 pb-16 md:pb-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
        {TOPICS.map((topic) => {
          const content = (
            <>
              <h2 className="font-serif font-bold text-lg mb-3" style={{ color: "var(--ink-2, #0f172b)" }}>
                {topic.title}
                {topic.href ? " ↗" : ""}
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: "var(--slate-3, #45556c)" }}>
                {topic.description}
              </p>
            </>
          );
          const className = "block p-6 md:p-7 transition-colors hover:bg-white";
          const style = {
            background: "var(--paper, #fafbfc)",
            border: "1px solid var(--border, #e2e8f0)",
            borderRadius: 10,
          };
          return topic.href ? (
            <a key={topic.title} href={topic.href} target="_blank" rel="noopener noreferrer" className={className} style={style}>
              {content}
            </a>
          ) : (
            <Link key={topic.title} to={topic.to!} className={className} style={style}>
              {content}
            </Link>
          );
        })}
      </div>
    </section>
  </div>
);

export default OvrigtView;
