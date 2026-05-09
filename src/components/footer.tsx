import React from "react";
import { Link } from "react-router";

const LINKS_1 = [
  { label: "Regler", to: "/information" },
  { label: "Riktlinjer", to: "/information" },
  { label: "Startplatser", to: "/startplatser" },
  { label: "Landningar", to: "/information" },
  { label: "Luftrum", to: "/information" },
  { label: "Nödinformation", to: "/information" },
];

const LINKS_2 = [
  { label: "Bli medlem", to: "/bli-medlem" },
  { label: "Dokument", to: "/information" },
  { label: "Kontakt", to: "/kontakt" },
];

const Footer: React.FC = () => {
  return (
    <footer className="mt-24 border-t border-b border-hairline py-16 md:py-24">
      <div className="site-container">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div className="flex flex-col gap-3">
            {LINKS_1.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                className="text-sm text-ink transition-colors hover:text-accent"
              >
                {l.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            {LINKS_2.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                className="text-sm text-ink transition-colors hover:text-accent"
              >
                {l.label}
              </Link>
            ))}
          </div>
          <div>
            <p className="font-serif font-bold text-sm text-ink mb-3">
              Om Åre Skärm- och Drakflygklubb
            </p>
            <p className="text-sm text-ink leading-relaxed max-w-md">
              Åre Skärm- och Drakflygklubb är en ideell förening för skärm- och
              drakflyg i Åreområdet.
            </p>
          </div>
        </div>
        <div className="mt-8 pt-5 flex flex-col sm:flex-row justify-between text-xs text-slate-2">
          <span>&copy; 2026 Åre Skärm- och Drakflygklubb</span>
          <span>Org.nr 802xxx-xxxx &middot; info@areflygklubb.se</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
