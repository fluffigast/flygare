import React from "react";
import { Link } from "react-router";
import { ArrowUpIcon, FacebookIcon, YoutubeIcon, MailIcon } from "lucide-react";
import { contactInfo } from "../data/contact";
import ThemeToggle from "./theme-toggle";

const LINKS_1 = [
  { label: "Flygregler", to: "/flyga-i-are/flygregler" },
  { label: "Starter & landningar", to: "/flyga-i-are/startplatser" },
  { label: "Väder", to: "/flyga-i-are/vader" },
  { label: "Säkerhet / Nödsituation", to: "/flyga-i-are/sakerhet" },
  { label: "Cross country flygning", to: "/flyga-i-are/xc" },
];

const LINKS_2 = [
  { label: "Bli medlem", to: "/bli-medlem" },
  { label: "Dokument", to: "/ovrigt/dokument" },
  { label: "Foton", to: "/ovrigt/foton" },
  { label: "Kontakt", to: "/kontakt" },
];

const Footer: React.FC = () => {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer
      className="w-full mt-20"
      style={{ borderTop: "1px solid var(--border, #e2e8f0)" }}
    >
      <div className="max-w-[1480px] mx-auto px-4 md:px-14 py-12 md:py-16">
        {/* Top row: logomark + back-to-top + theme */}
        <div className="flex items-center justify-between mb-10 md:mb-12">
          <Link
            to="/"
            className="inline-flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent,#3774a3)] focus-visible:ring-offset-2 rounded-sm"
            aria-label="Åre Skärm- och Drakflygklubb — tillbaka till start"
          >
            <img src="/favicon.svg" alt="" className="w-8 h-8" />
            <span
              className="font-serif font-bold text-sm md:text-base"
              style={{ color: "var(--ink-2, #0f172b)" }}
            >
              Åre Skärm- och Drakflygklubb
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              onClick={scrollTop}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold transition-colors hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent,#3774a3)] focus-visible:ring-offset-2 rounded-full px-3 py-2"
              style={{ color: "var(--slate-3, #45556c)" }}
              aria-label="Tillbaka till toppen"
            >
              <span className="hidden sm:inline">Till toppen</span>
              <ArrowUpIcon size={16} strokeWidth={1.8} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1.5fr] gap-10 md:gap-8">
          {/* Column 1 */}
          <div className="flex flex-col gap-3">
            <p
              className="text-[11px] uppercase tracking-[0.14em] font-semibold mb-1"
              style={{ color: "var(--slate, #62748e)" }}
            >
              Flyga i Åre
            </p>
            {LINKS_1.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                className="text-sm transition-colors hover:opacity-70"
                style={{ color: "var(--ink-2, #0f172b)" }}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-3">
            <p
              className="text-[11px] uppercase tracking-[0.14em] font-semibold mb-1"
              style={{ color: "var(--slate, #62748e)" }}
            >
              Klubben
            </p>
            {LINKS_2.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                className="text-sm transition-colors hover:opacity-70"
                style={{ color: "var(--ink-2, #0f172b)" }}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Column 3 — about + social */}
          <div className="flex flex-col gap-4">
            <p
              className="text-[11px] uppercase tracking-[0.14em] font-semibold"
              style={{ color: "var(--slate, #62748e)" }}
            >
              Om klubben
            </p>
            <p
              className="text-sm leading-relaxed max-w-md"
              style={{ color: "var(--slate-3, #45556c)" }}
            >
              Ideell förening för skärm- och drakflyg i Åreområdet sedan 1976.
              Arbetar aktivt med säkerhet, utbildning och samarbete med markägare.
            </p>
            <div className="flex items-center gap-2 mt-2">
              <a
                href={`mailto:${contactInfo.email}`}
                className="inline-flex items-center justify-center w-9 h-9 rounded-full transition-colors hover:bg-[#fafbfc] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent,#3774a3)] focus-visible:ring-offset-2"
                style={{ color: "var(--slate-3, #45556c)", border: "1px solid var(--border, #e2e8f0)" }}
                aria-label="E-post till klubben"
              >
                <MailIcon size={16} strokeWidth={1.6} />
              </a>
              <a
                href={contactInfo.facebook.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-9 h-9 rounded-full transition-colors hover:bg-[#fafbfc] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent,#3774a3)] focus-visible:ring-offset-2"
                style={{ color: "var(--slate-3, #45556c)", border: "1px solid var(--border, #e2e8f0)" }}
                aria-label="Klubbens Facebook-grupp"
              >
                <FacebookIcon size={16} strokeWidth={1.6} />
              </a>
              <a
                href={contactInfo.youtube.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-9 h-9 rounded-full transition-colors hover:bg-[#fafbfc] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent,#3774a3)] focus-visible:ring-offset-2"
                style={{ color: "var(--slate-3, #45556c)", border: "1px solid var(--border, #e2e8f0)" }}
                aria-label="Klubbens YouTube-kanal"
              >
                <YoutubeIcon size={16} strokeWidth={1.6} />
              </a>
            </div>
          </div>
        </div>

        {/* Fine print */}
        <div
          className="mt-10 pt-6 flex flex-col sm:flex-row justify-between gap-2 text-xs"
          style={{
            color: "var(--slate, #62748e)",
            borderTop: "1px solid var(--border, #e2e8f0)",
          }}
        >
          <span>&copy; 2026 Åre Skärm- och Drakflygklubb</span>
          <span className="tabular-nums font-mono">Org.nr 893203-0847 &middot; info@flygare.nu</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
