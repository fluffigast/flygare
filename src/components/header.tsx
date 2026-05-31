import React, { useState } from "react";
import { Link } from "react-router";
import Button from "./button";
import { navigation as localNav } from "../data/navigation";
import { useSiteNavigation, useGlobalLivePreview } from "../hooks/useCMS";

const navLinkClass = "text-foreground hover:text-primary transition-colors";

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const { data: cmsNav } = useSiteNavigation(localNav);
  const liveNav = useGlobalLivePreview(cmsNav);
  const nav = liveNav.sections?.length ? liveNav : localNav;

  const closeAll = () => {
    setMenuOpen(false);
    setOpenDropdown(null);
  };

  return (
    <header className="py-4 relative z-50">
      <div className="@container max-w-2xl mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex-1 text-2xl font-bold" onClick={closeAll}>
            Åre Skärm- och Drakflygklubb
          </Link>

          {/* Desktop nav */}
          <nav className="hidden @5xl:flex flex-1 items-center gap-3 justify-center text-sm">
            {nav.sections.map((section: any) => {
              if (section.children?.length > 0) {
                return (
                  <div
                    key={section.label}
                    className="relative"
                    onMouseEnter={() => setOpenDropdown(section.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <Link to={section.path} className={navLinkClass}>
                      {section.label} <span className="text-xs">▾</span>
                    </Link>
                    {openDropdown === section.label && (
                      <div className="absolute top-full left-0 pt-2 min-w-[220px]">
                        <div className="bg-background border border-border rounded-lg shadow-lg py-2">
                          {section.children.map((child: any) =>
                            child.external ? (
                              <a
                                key={child.label}
                                href={child.path}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                              >
                                {child.label} ↗
                              </a>
                            ) : (
                              <Link
                                key={child.label}
                                to={child.path}
                                className="block px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                                onClick={closeAll}
                              >
                                {child.label}
                              </Link>
                            )
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <Link key={section.label} to={section.path} className={navLinkClass} onClick={closeAll}>
                  {section.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden @5xl:flex flex-1 justify-end">
            <Button href="/bli-medlem">Bli medlem</Button>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="@md:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Stäng meny" : "Öppna meny"}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile nav */}
        {menuOpen && (
          <nav className="@md:hidden flex flex-col gap-2 pt-4">
            {nav.sections.map((section: any) => (
              <div key={section.label}>
                <Link to={section.path} className={`${navLinkClass} font-semibold`} onClick={closeAll}>
                  {section.label}
                </Link>
                {section.children?.length > 0 && (
                  <div className="pl-4 flex flex-col gap-1 mt-1">
                    {section.children.map((child: any) =>
                      child.external ? (
                        <a
                          key={child.label}
                          href={child.path}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-muted-foreground hover:text-primary transition-colors"
                          onClick={closeAll}
                        >
                          {child.label} ↗
                        </a>
                      ) : (
                        <Link
                          key={child.label}
                          to={child.path}
                          className="text-sm text-muted-foreground hover:text-primary transition-colors"
                          onClick={closeAll}
                        >
                          {child.label}
                        </Link>
                      )
                    )}
                  </div>
                )}
              </div>
            ))}
            <Button href="/bli-medlem">Bli medlem</Button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
