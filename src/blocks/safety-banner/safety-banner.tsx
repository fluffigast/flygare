import React from "react";
import { Link } from "react-router";
import { ShieldAlertIcon } from "lucide-react";

const SafetyBanner: React.FC = () => (
  <section
    className="w-full"
    style={{
      background: "var(--hero-accent, #3774a3)",
      color: "#fff",
    }}
    role="region"
    aria-label="Flygregler för Åre"
  >
    <div className="max-w-[1480px] mx-auto px-4 md:px-14 py-3 md:py-4 flex items-center gap-3 md:gap-5">
      <ShieldAlertIcon size={22} strokeWidth={1.6} className="shrink-0" aria-hidden="true" />
      <p className="text-sm md:text-base leading-snug flex-1">
        <span className="font-serif font-bold mr-2">Innan du flyger i Åre:</span>
        läs klubbens flygregler. De gäller alla startplatser och är tvingande vid vindsamsyn.
      </p>
      <Link
        to="/flyga-i-are/flygregler"
        className="shrink-0 text-xs md:text-sm underline underline-offset-4 whitespace-nowrap"
      >
        Till reglerna
      </Link>
    </div>
  </section>
);

export default SafetyBanner;
