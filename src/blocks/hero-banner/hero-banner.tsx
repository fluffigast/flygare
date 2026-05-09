import React, { useState, useEffect } from "react";

export interface HeroBannerProps {
  imageUrl?: string;
  title?: string;
  subtitle?: string;
  /** Show the centered weather disc on the homepage hero */
  showDisc?: boolean;
  /** Shorter hero for interior pages */
  compact?: boolean;
}

const HeroBanner: React.FC<HeroBannerProps> = ({
  imageUrl = "/assets/hero-paragliding.jpg",
  title,
  subtitle,
  showDisc = false,
  compact = false,
}) => {
  const [entered, setEntered] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 50);
    return () => clearTimeout(t);
  }, []);

  const height = compact ? "h-[540px]" : "h-[clamp(400px,50vw,700px)]";

  return (
    <section className={`relative w-full ${height} overflow-hidden bg-[#1a1e2a]`}>
      <div
        className={`absolute inset-0 bg-cover bg-center transition-transform duration-[6s] ease-out ${
          entered ? "scale-100" : "scale-[1.02]"
        }`}
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      {/* Gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,.05) 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,0) 65%, rgba(0,0,0,.18) 100%)",
        }}
      />

      {/* Centered weather disc */}
      {showDisc && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] rounded-full bg-accent border-[21px] border-ring grid place-items-center shadow-[0_30px_60px_-20px_rgba(0,0,0,.35)]">
          <div className="text-white font-serif italic text-lg text-center leading-snug tracking-wide opacity-90 [text-shadow:0_1px_2px_rgba(0,0,0,.25)]">
            <b className="block not-italic font-bold text-xs tracking-[0.18em] uppercase mb-1.5 opacity-80">
              Åre &middot; 1 200 m
            </b>
            sydlig vind
            <br />
            2&ndash;6 m/s
          </div>
        </div>
      )}

      {/* Title overlay (for interior pages) */}
      {(title || subtitle) && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex flex-col justify-end p-8 md:p-12 lg:p-16">
          {title && (
            <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white max-w-2xl leading-tight">
              {title}
            </h1>
          )}
          {subtitle && (
            <p className="text-white/70 text-sm md:text-base mt-3 max-w-lg">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Footer bar */}
      {showDisc && (
        <div className="absolute left-0 right-0 bottom-6 flex justify-between px-8 md:px-16 text-white/85 text-xs tracking-wide">
          <span className="inline-flex gap-2 items-center">
            <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
            Åreskutan, Jämtland
          </span>
          <span>Säsong 2026 &middot; Inflygning från syd</span>
        </div>
      )}
    </section>
  );
};

export default HeroBanner;
