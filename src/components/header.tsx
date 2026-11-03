import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { navigation as localNav } from "../data/navigation";
import { useSiteNavigation, useGlobalLivePreview } from "../hooks/useCMS";

// Header per pptx-audit HTML-referens (Downloads/flyga-i-are.html):
// 7 flata topplänkar (inklusive Hem), inga hover-dropdowns.
// Undersidor nås via sektionens landningssida.
// Mobil-menyn behåller barnlänkar för snabb åtkomst.
const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const { data: cmsNav } = useSiteNavigation(localNav);
  const liveNav = useGlobalLivePreview(cmsNav);
  const nav = liveNav.sections?.length ? liveNav : localNav;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const closeMenu = () => setMenuOpen(false);

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <header
      className="sticky top-0 z-50 bg-white transition-[border-color] duration-150"
      style={{
        borderBottom: `1px solid ${scrolled ? "var(--border, #e2e8f0)" : "transparent"}`,
      }}
    >
      <div className="max-w-[1480px] mx-auto px-4 md:px-10 py-4 md:py-5 flex items-center justify-between gap-6">
        <Link
          to="/"
          className="font-serif font-bold text-sm md:text-base tracking-tight whitespace-nowrap"
          style={{ color: "var(--ink, #020618)", letterSpacing: "-0.005em" }}
          onClick={closeMenu}
        >
          Åre Skärm- och Drakflygklubb
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-sm">
          {nav.sections.map((section: any) => (
            <Link
              key={section.label}
              to={section.path}
              className="pb-1 transition-colors"
              style={{
                color: "var(--ink, #020618)",
                fontFamily: "var(--font-sans)",
                fontWeight: isActive(section.path) ? 600 : 400,
                borderBottom: `2px solid ${isActive(section.path) ? "var(--ink, #020618)" : "transparent"}`,
              }}
              onMouseEnter={(e) => {
                if (!isActive(section.path)) {
                  (e.currentTarget as HTMLElement).style.borderBottomColor = "var(--slate-2, #90a1b9)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive(section.path)) {
                  (e.currentTarget as HTMLElement).style.borderBottomColor = "transparent";
                }
              }}
              onClick={closeMenu}
            >
              {section.label}
            </Link>
          ))}
        </nav>

        <Link
          to="/bli-medlem"
          className="hidden md:inline-flex items-center font-semibold text-sm text-white rounded-full whitespace-nowrap transition-all hover:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent,#3774a3)] focus-visible:ring-offset-2"
          style={{
            background: "var(--accent, #3774a3)",
            padding: "9px 22px",
            boxShadow: "var(--shadow-card, 0 1px 3px rgba(2,6,23,0.06), 0 8px 24px rgba(2,6,23,0.07))",
          }}
          onClick={closeMenu}
        >
          Bli medlem
        </Link>

        <button
          className="md:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Stäng meny" : "Öppna meny"}
          aria-expanded={menuOpen}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.6}>
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div
          className="md:hidden fixed inset-x-0 bottom-0 bg-white flex flex-col"
          style={{
            top: "var(--header-height, 64px)",
            borderTop: "1px solid var(--border, #e2e8f0)",
            overflowY: "auto",
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Huvudmeny"
        >
          <nav className="flex-1 overflow-y-auto px-4 py-4 flex flex-col">
            {nav.sections.map((section: any) => (
              <div key={section.label} className="border-b" style={{ borderColor: "var(--border, #e2e8f0)" }}>
                <Link
                  to={section.path}
                  className="flex items-center min-h-[48px] py-3 text-base font-serif font-bold"
                  style={{ color: "var(--ink, #020618)" }}
                  onClick={closeMenu}
                >
                  {section.label}
                </Link>
                {section.children?.length > 0 && (
                  <div className="pb-2 flex flex-col">
                    {section.children.filter((c: any) => !c.hidden).map((child: any) =>
                      child.external ? (
                        <a
                          key={child.label}
                          href={child.path}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center min-h-[44px] pl-4 py-2 text-sm"
                          style={{ color: "var(--slate-3, #45556c)" }}
                          onClick={closeMenu}
                        >
                          {child.label} ↗
                        </a>
                      ) : (
                        <Link
                          key={child.label}
                          to={child.path}
                          className="flex items-center min-h-[44px] pl-4 py-2 text-sm"
                          style={{ color: "var(--slate-3, #45556c)" }}
                          onClick={closeMenu}
                        >
                          {child.label}
                        </Link>
                      )
                    )}
                  </div>
                )}
              </div>
            ))}
          </nav>
          <div
            className="shrink-0 px-4 py-4"
            style={{
              borderTop: "1px solid var(--border, #e2e8f0)",
              background: "#fff",
              paddingBottom: "max(1rem, env(safe-area-inset-bottom))",
            }}
          >
            <Link
              to="/bli-medlem"
              className="flex items-center justify-center min-h-[52px] font-semibold text-base text-white rounded-full w-full"
              style={{
                background: "var(--accent, #3774a3)",
                boxShadow: "var(--shadow-card, 0 1px 3px rgba(2,6,23,0.06), 0 8px 24px rgba(2,6,23,0.07))",
              }}
              onClick={closeMenu}
            >
              Bli medlem →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
