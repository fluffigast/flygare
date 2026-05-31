import React from "react";
import { Link } from "react-router";

const LINKS_1 = [
  { label: "Regler", to: "/flyga-i-are/flygregler" },
  { label: "Riktlinjer", to: "/flyga-i-are/sakerhet" },
  { label: "Startplatser", to: "/flyga-i-are/startplatser" },
  { label: "Landningar", to: "/flyga-i-are/startplatser" },
  { label: "Luftrum", to: "/flyga-i-are/xc" },
  { label: "Nödinformation", to: "/flyga-i-are/sakerhet" },
];

const LINKS_2 = [
  { label: "Bli medlem", to: "/bli-medlem" },
  { label: "Dokument", to: "/ovrigt/dokument" },
  { label: "Kontakt", to: "/kontakt" },
];

const Footer: React.FC = () => {
  return (
    <footer
      className="w-full mt-24"
      style={{ borderTop: "1px solid var(--border, #e2e8f0)" }}
    >
      <div className="max-w-[1480px] mx-auto px-4 md:px-14 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1.5fr] gap-10 md:gap-4">
          {/* Column 1 */}
          <div className="flex flex-col gap-3">
            {LINKS_1.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                className="text-sm transition-colors hover:opacity-70"
                style={{ color: "var(--ink, #020618)" }}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-3">
            {LINKS_2.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                className="text-sm transition-colors hover:opacity-70"
                style={{ color: "var(--ink, #020618)" }}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Column 3 — about */}
          <div className="flex flex-col gap-3">
            <p
              className="font-serif font-bold text-sm"
              style={{ color: "var(--ink, #020618)" }}
            >
              Om Åre Skärm- och Drakflygklubb
            </p>
            <p
              className="text-sm leading-relaxed max-w-md"
              style={{ color: "var(--ink, #020618)" }}
            >
              Åre Skärm- och Drakflygklubb är en ideell förening för skärm- och
              drakflyg i Åreområdet. Klubben arbetar aktivt med säkerhet,
              utbildning och samarbete med markägare och andra aktörer.
            </p>
          </div>
        </div>

        {/* Fine print */}
        <div
          className="mt-8 pt-5 flex flex-col sm:flex-row justify-between gap-2 text-xs"
          style={{
            color: "var(--slate-2, #90a1b9)",
            borderTop: "1px solid var(--border, #e2e8f0)",
          }}
        >
          <span>&copy; 2026 Åre Skärm- och Drakflygklubb</span>
          <span>Org.nr 802535-5765 &middot; info@areflygklubb.se</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
