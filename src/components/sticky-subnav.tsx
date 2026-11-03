import React from "react";
import { Link, useLocation } from "react-router";
import { navigation } from "../data/navigation";

type Props = {
  sectionPath: string;
};

/**
 * Sticky sub-nav som ligger direkt under huvudheadern. Används på djupa
 * sektioner (/flyga-i-are/*) där piloter behöver hoppa mellan undersidor
 * utan att gå tillbaka till hub:en.
 */
const StickySubnav: React.FC<Props> = ({ sectionPath }) => {
  const location = useLocation();
  const section = navigation.sections.find((s) => s.path === sectionPath);
  const children = (section?.children ?? []).filter((c: any) => !c.hidden && !c.external);
  if (children.length === 0) return null;

  return (
    <nav
      className="sticky z-30 w-full"
      style={{
        top: "var(--header-height, 64px)",
        background: "rgba(255,255,255,0.88)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        borderBottom: "1px solid var(--border, #e2e8f0)",
      }}
      aria-label={`Undermeny för ${section?.label ?? "sektion"}`}
    >
      <div className="max-w-[1480px] mx-auto px-4 md:px-10">
        <ul
          className="flex gap-1 md:gap-2 overflow-x-auto py-2 -mx-2 px-2 scrollbar-none"
          style={{
            scrollbarWidth: "none",
          }}
        >
          <li>
            <Link
              to={sectionPath}
              className="inline-flex items-center px-3 py-1.5 rounded-full text-xs md:text-sm font-semibold transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent,#3774a3)] focus-visible:ring-offset-1"
              style={{
                color: location.pathname === sectionPath ? "#fff" : "var(--ink-2, #0f172b)",
                background: location.pathname === sectionPath ? "var(--accent, #3774a3)" : "transparent",
              }}
            >
              Översikt
            </Link>
          </li>
          {children.map((child: any) => {
            const active = location.pathname === child.path;
            return (
              <li key={child.path}>
                <Link
                  to={child.path}
                  className="inline-flex items-center px-3 py-1.5 rounded-full text-xs md:text-sm font-semibold transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent,#3774a3)] focus-visible:ring-offset-1"
                  style={{
                    color: active ? "#fff" : "var(--slate-3, #45556c)",
                    background: active ? "var(--accent, #3774a3)" : "transparent",
                  }}
                >
                  {child.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default StickySubnav;
