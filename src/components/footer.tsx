import React from "react";
import { Link } from "react-router";

const LINKS_1 = [
  { label: "Säkerhet och ansvar", to: "/information/sakerhet-och-ansvar" },
  { label: "Startplatser", to: "/startplatser" },
  { label: "Luftrum", to: "/information/luftrum-are" },
  { label: "Nödinformation", to: "/information/nodinformation" },
  { label: "Etik och hänsyn", to: "/information/etik-och-hansyn" },
];

const LINKS_2 = [
  { label: "Nyheter", to: "/nyheter" },
  { label: "Flygguiden", to: "/information" },
  { label: "Tävlingar", to: "/tavlingar" },
  { label: "Bli medlem", to: "/bli-medlem" },
];

const LINKS_3 = [
  { label: "Om klubben", to: "/om" },
  { label: "Kontakt", to: "/kontakt" },
  { label: "Väder", to: "/vader" },
];

const Footer: React.FC = () => {
  return (
    <footer className="mt-32 pt-16 pb-24">
      <div className="site-container">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div className="flex flex-col gap-3">
            <p className="font-serif font-bold text-sm text-ink mb-1">Flyga i Åre</p>
            {LINKS_1.map((l) => (
              <Link key={l.label} to={l.to} className="text-sm text-slate transition-colors hover:text-ink">
                {l.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <p className="font-serif font-bold text-sm text-ink mb-1">Klubben</p>
            {LINKS_2.map((l) => (
              <Link key={l.label} to={l.to} className="text-sm text-slate transition-colors hover:text-ink">
                {l.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <p className="font-serif font-bold text-sm text-ink mb-1">Övrigt</p>
            {LINKS_3.map((l) => (
              <Link key={l.label} to={l.to} className="text-sm text-slate transition-colors hover:text-ink">
                {l.label}
              </Link>
            ))}
            <p className="text-sm text-slate leading-relaxed mt-4 max-w-sm">
              Åre Skärm- och Drakflygklubb är en ideell förening för skärm- och
              drakflyg i Åreområdet.
            </p>
          </div>
        </div>
        <div className="mt-12 flex flex-col sm:flex-row justify-between text-xs text-slate-2">
          <span>&copy; 2026 Åre Skärm- och Drakflygklubb</span>
          <span>Org.nr 802xxx-xxxx &middot; info@areflygklubb.se</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
