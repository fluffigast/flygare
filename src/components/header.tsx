import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (paths: string[]) =>
    paths.some((p) => location.pathname === p || location.pathname.startsWith(p + "/"));

  const navLink = (label: string, to: string, paths: string[]) => (
    <Link
      key={to}
      to={to}
      className={`relative py-1 font-sans text-sm text-ink transition-colors hover:text-ink-2 after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-px after:bg-ink after:origin-left after:transition-transform after:duration-200 ${
        isActive(paths) ? "font-medium after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"
      }`}
      onClick={() => setMenuOpen(false)}
    >
      {label}
    </Link>
  );

  return (
    <header
      className={`sticky top-0 z-50 h-15 bg-white flex items-center px-4 md:px-8 justify-between border-b transition-colors ${
        scrolled ? "border-hairline" : "border-transparent"
      }`}
    >
      <Link
        to="/"
        className="font-serif font-bold text-sm tracking-tight"
        onClick={() => setMenuOpen(false)}
      >
        Åre Skärm- och Drakflygklubb
      </Link>

      {/* Desktop nav */}
      <nav className="hidden md:flex gap-7">
        {navLink("Flygguiden", "/information", ["/information"])}
        {navLink("Väder", "/vader", ["/vader"])}
        {navLink("Startplatser", "/startplatser", ["/startplatser"])}
        {navLink("Nyheter", "/nyheter", ["/nyheter"])}
        {navLink("Om klubben", "/om", ["/om", "/kontakt", "/tavlingar"])}
      </nav>

      <Link
        to="/bli-medlem"
        className="hidden md:inline-block pill-btn"
        onClick={() => setMenuOpen(false)}
      >
        Bli medlem
      </Link>

      {/* Mobile toggle */}
      <button
        className="md:hidden p-2"
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

      {/* Mobile nav */}
      {menuOpen && (
        <nav className="absolute top-15 left-0 right-0 bg-white border-b border-hairline flex flex-col gap-4 p-6 md:hidden z-50">
          {navLink("Flygguiden", "/information", ["/information"])}
          {navLink("Väder", "/vader", ["/vader"])}
          {navLink("Startplatser", "/startplatser", ["/startplatser"])}
          {navLink("Nyheter", "/nyheter", ["/nyheter"])}
          {navLink("Om klubben", "/om", ["/om", "/kontakt", "/tavlingar"])}
          <Link to="/bli-medlem" className="pill-btn text-center" onClick={() => setMenuOpen(false)}>
            Bli medlem
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
