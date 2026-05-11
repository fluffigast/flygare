import React, { useState } from "react";
import Button from "./button";
import { Link } from "react-router";

export interface HeaderProps {}

const navLinkClass = "text-foreground hover:text-primary transition-colors";

const Header: React.FC<HeaderProps> = ({}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="py-4">
      <div className="@container max-w-2xl mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex-1 text-2xl font-bold">
            Åre Skärm- och Drakflygklubb
          </Link>

          {/* Desktop nav */}
          <nav className="hidden @md:flex flex-1 items-center gap-6 justify-center">
            <Link to="/" className={navLinkClass}>
              Hem
            </Link>
            <Link to="/information" className={navLinkClass}>
              Flygguiden
            </Link>
            <Link to="/vader" className={navLinkClass}>
              Väder
            </Link>
            <Link to="/startplatser" className={navLinkClass}>
              Startplatser
            </Link>
            <Link to="/nyheter" className={navLinkClass}>
              Nyheter
            </Link>
            <Link to="/om" className={navLinkClass}>
              Om klubben
            </Link>
          </nav>

          <div className="hidden @md:flex flex-1 justify-end">
            <Button href="/bli-medlem">Bli medlem</Button>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="@md:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Stäng meny" : "Öppna meny"}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile nav */}
        {menuOpen && (
          <nav className="@md:hidden flex flex-col gap-4 pt-4">
            <Link to="/" className={navLinkClass} onClick={() => setMenuOpen(false)}>Hem</Link>
            <Link to="/information" className={navLinkClass} onClick={() => setMenuOpen(false)}>Flygguiden</Link>
            <Link to="/vader" className={navLinkClass} onClick={() => setMenuOpen(false)}>Väder</Link>
            <Link to="/startplatser" className={navLinkClass} onClick={() => setMenuOpen(false)}>Startplatser</Link>
            <Link to="/nyheter" className={navLinkClass} onClick={() => setMenuOpen(false)}>Nyheter</Link>
            <Link to="/om" className={navLinkClass} onClick={() => setMenuOpen(false)}>Om klubben</Link>
            <Button href="/bli-medlem">Bli medlem</Button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
