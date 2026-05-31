import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { navigation as localNav } from "../data/navigation";
import { useSiteNavigation, useGlobalLivePreview } from "../hooks/useCMS";

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

  const closeMenu = () => setMenuOpen(false);

  // Check if a nav section is active
  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <header
      className="sticky top-0 z-50 bg-white transition-[border-color] duration-150"
      style={{
        height: 60,
        borderBottom: `1px solid ${scrolled ? "#e2e8f0" : "transparent"}`,
      }}
    >
      <div className="h-full max-w-[1480px] mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Brand */}
        <Link
          to="/"
          className="font-serif font-bold text-sm tracking-tight"
          style={{ color: "var(--ink, #020618)", letterSpacing: "-0.005em" }}
          onClick={closeMenu}
        >
          Åre Skärm- och Drakflygklubb
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {nav.sections
            .filter((s: any) => s.label !== "Hem")
            .slice(0, 5)
            .map((section: any) => (
              <Link
                key={section.label}
                to={section.path}
                className="nav-link relative text-sm py-1"
                style={{
                  fontFamily: "var(--font-sans)",
                  color: "var(--ink, #020618)",
                  fontWeight: isActive(section.path) ? 500 : 400,
                }}
                onClick={closeMenu}
              >
                {section.label}
              </Link>
            ))}
        </nav>

        {/* Pill button */}
        <Link
          to="/bli-medlem"
          className="hidden md:inline-flex items-center font-serif text-sm text-white rounded-full transition-all hover:-translate-y-px"
          style={{
            background: "#000",
            padding: "7px 22px",
          }}
          onClick={closeMenu}
        >
          Bli medlem
        </Link>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Stäng meny" : "Öppna meny"}
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

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t" style={{ borderColor: "#e2e8f0" }}>
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
              className="mt-3 inline-flex items-center justify-center font-serif text-sm text-white rounded-full"
              style={{ background: "#000", padding: "9px 22px" }}
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
