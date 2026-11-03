import React from "react";
import { Link } from "react-router";
import { navigation } from "../data/navigation";

type Props = {
  sectionPath: string;
};

/**
 * Visar sub-navigation som kort på en landningssida. Hämtar barnlänkar
 * från navigation.ts för angiven section-path. Döljer barn med `hidden`.
 */
const SubnavGrid: React.FC<Props> = ({ sectionPath }) => {
  const section = navigation.sections.find((s) => s.path === sectionPath);
  const children = (section?.children ?? []).filter((c: any) => !c.hidden);
  if (children.length === 0) return null;

  return (
    <section className="max-w-[1200px] mx-auto px-4 md:px-10 pb-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
        {children.map((child: any) => {
          const content = (
            <h3 className="font-serif font-bold text-base" style={{ color: "var(--ink-2, #0f172b)" }}>
              {child.label} {child.external ? "↗" : "→"}
            </h3>
          );
          const className = "block p-5 transition-colors hover:bg-white";
          const style = {
            background: "var(--paper, #fafbfc)",
            border: "1px solid var(--border, #e2e8f0)",
            borderRadius: 10,
          };
          return child.external ? (
            <a key={child.label} href={child.path} target="_blank" rel="noopener noreferrer" className={className} style={style}>
              {content}
            </a>
          ) : (
            <Link key={child.label} to={child.path} className={className} style={style}>
              {content}
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default SubnavGrid;
