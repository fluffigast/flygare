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
          className="hidden md:inline-flex items-center font-semibold text-sm text-white rounded-full whitespace-nowrap transition-all hover:-translate-y-px"
          style={{
            background: "var(--ink, #020618)",
            padding: "9px 22px",
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
        <div className="md:hidden bg-white border-t" style={{ borderColor: "var(--border, #e2e8f0)" }}>
          <nav className="max-w-[1480px] mx-auto px-4 py-4 flex flex-col gap-1">
            {nav.sections.map((section: any) => (
              <div key={section.label}>
                <Link
                  to={section.path}
                  className="block py-2 text-sm font-semibold"
                  style={{ color: "var(--ink, #020618)" }}
                  onClick={closeMenu}
                >
                  {section.label}
                </Link>
                {section.children?.length > 0 && (
                  <div className="pl-4 flex flex-col">
                    {section.children.map((child: any) =>
                      child.external ? (
                        <a
                          key={child.label}
                          href={child.path}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block py-1.5 text-sm"
                          style={{ color: "var(--slate, #62748e)" }}
                          onClick={closeMenu}
                        >
                          {child.label} ↗
                        </a>
                      ) : (
                        <Link
                          key={child.label}
                          to={child.path}
                          className="block py-1.5 text-sm"
                          style={{ color: "var(--slate, #62748e)" }}
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
            <Link
              to="/bli-medlem"
              className="mt-3 inline-flex items-center justify-center font-semibold text-sm text-white rounded-full"
              style={{ background: "var(--ink, #020618)", padding: "9px 22px" }}
              onClick={closeMenu}
            >
              Bli medlem
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
