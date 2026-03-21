import { useState, useEffect, useRef } from "react";
import type { ReactNode, CSSProperties } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

/* ═══════════════════════════════════════════════════════════
   DESIGN SYSTEM
   ═══════════════════════════════════════════════════════════ */

export const T = {
  serif: "'Playfair Display', Georgia, 'Times New Roman', serif",
  sans: "'Source Sans 3', -apple-system, BlinkMacSystemFont, sans-serif",
  ink: "#1a1f2e",
  ink2: "#2d3348",
  ink3: "#4a5068",
  muted: "#7b7f94",
  white: "#ffffff",
  bg: "#f4f3f1",
  accent: "#4a6a8a",
  accentLight: "#6b8db0",
  accentBg: "#e8eff5",
  border: "#e2e0dc",
  borderL: "#ededeb",
  nav: "#1a1f2e",
};

/* ═══════════════════════════════════════════════════════════
   IMAGES
   ═══════════════════════════════════════════════════════════ */

export const IMG = {
  // Åre: Lift över Åreskutan vinter (Hendrik Morkel)
  hero: "https://images.unsplash.com/photo-1641799540196-fe49811e048e?w=2400&q=85",
  // Åre: Snöklätt Åreskutan panorama (Dmitriy Karfagenskiy)
  areWinter: "https://images.unsplash.com/photo-1465427017340-dcc817cc0c30?w=1600&q=85",
  // Åre: Skidåkare uppför Åreskutan (Johannes Andersson)
  areSkier: "https://images.unsplash.com/photo-1640189668430-f9791d4db74a?w=1600&q=85",
  // Åre: Vintervy blå himmel (Atte Grönlund)
  areSky: "https://images.unsplash.com/photo-1551356458-15f51dcb2ff7?w=1600&q=85",
  // Åre: Person på brygga vinter, skog & snö (Tamara Schipchinskaya)
  arePier: "https://images.unsplash.com/photo-1515746806252-acd7b9cee0b8?w=1600&q=85",
  // Åre: Mullfjället naturvy berg (Jan Brennenstuhl)
  areMullfjallet: "https://images.unsplash.com/photo-1644408198715-7760c638663a?w=1600&q=85",
  // Åre: Vandring Mullfjället sommar (Johannes Andersson)
  areHike: "https://images.unsplash.com/photo-1627898128256-9d8be8add219?w=1600&q=85",
  // Åre: Renar i snölandskap (Marcus Löfvenberg)
  areReindeer: "https://images.unsplash.com/photo-1521759548536-58d6acf59fcc?w=1600&q=85",
  // Åre: Skoter på snö vinter (Oscar Nord)
  areSnowmobile: "https://images.unsplash.com/photo-1583426330106-ce7a80513237?w=1600&q=85",
  // Åre: Ren porträtt (Marcus Löfvenberg)
  areDeer: "https://images.unsplash.com/photo-1521930651981-dceaf670cc58?w=1600&q=85",
  // By vid sjö med berg bakom — skandinavisk stämning
  villageByLake: "https://images.unsplash.com/photo-1755331039789-7e5680e26e8f?w=1600&q=85",
  // Jämtland: Gräsfält med fjäll (Noah Holm)
  jamtlandSummer: "https://images.unsplash.com/photo-1601922295315-77d1ad28ae7f?w=1600&q=85",
  // Jämtland: Tält vid fjällen (Noah Holm)
  jamtlandCamp: "https://images.unsplash.com/photo-1601922295720-f9474eb6c944?w=1600&q=85",
  // Paragliders soaring vid bergstopp
  soaring: "https://images.unsplash.com/photo-1760892694762-32c2e8951ab8?w=1600&q=85",
  // Paragliders solnedgång
  soaringSunset: "https://images.unsplash.com/photo-1744702970202-59c894c95ce6?w=1600&q=85",
  // Skärmflygare i luften
  skyGlide: "https://images.unsplash.com/photo-1753793261379-e602cd485b99?w=1600&q=85",
  // Drakflygare
  hangGlider: "https://images.unsplash.com/photo-1752599850605-9557888cc83c?w=1600&q=85",
  // Pilot förbereder start på bergssluttning
  launchPrep: "https://images.unsplash.com/photo-1758210607131-3c5203f019d3?w=1600&q=85",
  // Paraglider mot klippig bergsbakgrund
  rockyGlide: "https://images.unsplash.com/photo-1759776016179-bd1922ace593?w=1600&q=85",
  // Paraglider över snöig bergskedja
  snowRange: "https://images.unsplash.com/photo-1703712187716-1fdd42b5f2ae?w=1600&q=85",
};

/* ═══════════════════════════════════════════════════════════
   NAV LINKS
   ═══════════════════════════════════════════════════════════ */

const NAV_LINKS = [
  { label: "Hem", to: "/" },
  { label: "Flygguiden", to: "/flygguiden" },
  { label: "Väder", to: "/vader" },
  { label: "Startplatser", to: "/startplatser" },
  { label: "Nyheter", to: "/nyheter" },
  { label: "Om klubben", to: "/om" },
];

/* ═══════════════════════════════════════════════════════════
   HOOKS & HELPERS
   ═══════════════════════════════════════════════════════════ */

export function useFadeIn(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.unobserve(el); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, vis };
}

export function Fade({ children, delay = 0, className = "", style = {} }: {
  children: ReactNode; delay?: number; className?: string; style?: CSSProperties;
}) {
  const { ref, vis } = useFadeIn();
  return (
    <div ref={ref} className={className} style={{
      ...style, opacity: vis ? 1 : 0,
      transform: vis ? "translateY(0)" : "translateY(20px)",
      transition: `opacity .7s cubic-bezier(.22,1,.36,1) ${delay}s, transform .7s cubic-bezier(.22,1,.36,1) ${delay}s`,
    }}>{children}</div>
  );
}

export function Wrap({ children, bg = T.white }: { children: ReactNode; bg?: string }) {
  return <section style={{ background: bg, padding: "88px clamp(20px, 5vw, 40px)" }}><div style={{ maxWidth: 1100, margin: "0 auto" }}>{children}</div></section>;
}

export function SH({ italic, title }: { italic: string; title: string }) {
  return (
    <Fade>
      <p style={{ fontFamily: T.serif, fontStyle: "italic", fontSize: 15, color: T.accent, marginBottom: 8, letterSpacing: ".01em" }}>{italic}</p>
      <h2 style={{ fontFamily: T.serif, fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 400, color: T.ink, letterSpacing: "-.025em", lineHeight: 1.12 }}>{title}</h2>
    </Fade>
  );
}

/* ═══════════════════════════════════════════════════════════
   PAGE HERO
   ═══════════════════════════════════════════════════════════ */

export function PageHero({ img, title, subtitle, height = "50vh" }: {
  img: string; title: string; subtitle?: string; height?: string;
}) {
  const [loaded, setLoaded] = useState(false);
  return (
    <section style={{ position: "relative", height, minHeight: 320, maxHeight: 560, overflow: "hidden", background: T.ink }}>
      <img src={img} alt={title} onLoad={() => setLoaded(true)} style={{
        position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover",
        opacity: loaded ? 1 : 0, transition: "opacity 1.2s ease",
      }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(26,31,46,.08) 0%, rgba(26,31,46,.6) 100%)" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0 40px 52px", maxWidth: 1100, margin: "0 auto" }}>
        <Fade delay={0.2}>
          <h1 style={{
            fontFamily: T.serif, fontSize: "clamp(30px, 5vw, 52px)", fontWeight: 400,
            color: "#fff", lineHeight: 1.1, letterSpacing: "-.025em",
          }}>{title}</h1>
        </Fade>
        {subtitle && (
          <Fade delay={0.4}>
            <p style={{
              fontFamily: T.sans, fontSize: 17, fontWeight: 300,
              color: "rgba(255,255,255,.7)", marginTop: 12, maxWidth: 520, lineHeight: 1.6,
            }}>{subtitle}</p>
          </Fade>
        )}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   NAV
   ═══════════════════════════════════════════════════════════ */

export function Nav({ scrolled }: { scrolled: boolean }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const solid = scrolled || !isHome;

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: solid ? "rgba(26,31,46,.97)" : "rgba(26,31,46,.3)",
      backdropFilter: "blur(12px)",
      borderBottom: solid ? "1px solid rgba(255,255,255,.06)" : "none",
      transition: "background .5s ease",
      height: 56,
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px", display: "flex", alignItems: "center", justifyContent: "space-between", height: "100%" }}>
        <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{
            fontFamily: T.serif, fontWeight: 500, fontSize: 18, letterSpacing: "-.02em",
            color: "#fff",
          }}>Åre Skärm- &amp; Drakflygklubb</span>
        </Link>
        <nav className="desk-nav" style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {NAV_LINKS.map(l => {
            const active = location.pathname === l.to;
            return (
              <Link key={l.label} to={l.to} style={{
                fontFamily: T.sans, fontSize: 13, fontWeight: active ? 600 : 400, letterSpacing: ".03em",
                textTransform: "uppercase" as const,
                color: active ? "#fff" : "rgba(255,255,255,.5)",
                textDecoration: "none", transition: "color .25s",
              }}
                onMouseEnter={e => (e.target as HTMLElement).style.color = "#fff"}
                onMouseLeave={e => (e.target as HTMLElement).style.color = active ? "#fff" : "rgba(255,255,255,.5)"}
              >{l.label}</Link>
            );
          })}
        </nav>
        <button className="mob-btn" onClick={() => setOpen(!open)} style={{
          background: "none", border: "none", cursor: "pointer", color: "#fff", padding: 4, display: "none",
        }}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open && (
        <div style={{ background: "rgba(26,31,46,.98)", backdropFilter: "blur(16px)", padding: "8px 40px 24px" }}>
          {NAV_LINKS.map(l => (
            <Link key={l.label} to={l.to} onClick={() => setOpen(false)} style={{
              display: "block", fontFamily: T.sans, fontSize: 15, textDecoration: "none",
              padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,.06)",
              color: location.pathname === l.to ? "#fff" : "rgba(255,255,255,.5)",
              fontWeight: location.pathname === l.to ? 600 : 400,
            }}>{l.label}</Link>
          ))}
        </div>
      )}
    </header>
  );
}

/* ═══════════════════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════════════════ */

export function Footer() {
  return (
    <footer style={{ background: T.nav, padding: "64px 40px 36px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 48 }}>
        <div>
          <h4 style={{ fontFamily: T.sans, fontWeight: 600, fontSize: 13, color: "rgba(255,255,255,.35)", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 18 }}>Flyga i Åre</h4>
          {[
            { label: "Flygguiden", to: "/flygguiden" },
            { label: "Startplatser", to: "/startplatser" },
            { label: "Väder", to: "/vader" },
            { label: "Tävlingar", to: "/tavlingar" },
            { label: "Klubbuss", to: "/klubbuss" },
            { label: "Kontakt", to: "/kontakt" },
          ].map(l => (
            <Link key={l.label} to={l.to} style={{
              display: "block", fontFamily: T.sans, fontSize: 14, color: "rgba(255,255,255,.5)",
              textDecoration: "none", marginBottom: 8, transition: "color .2s",
            }}
              onMouseEnter={e => (e.target as HTMLElement).style.color = "#fff"}
              onMouseLeave={e => (e.target as HTMLElement).style.color = "rgba(255,255,255,.5)"}
            >{l.label}</Link>
          ))}
        </div>
        <div>
          <h4 style={{ fontFamily: T.sans, fontWeight: 600, fontSize: 13, color: "rgba(255,255,255,.35)", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 18 }}>Klubben</h4>
          {[
            { label: "Bli medlem", to: "/bli-medlem" },
            { label: "Nyheter", to: "/nyheter" },
            { label: "Om klubben", to: "/om" },
          ].map(l => (
            <Link key={l.label} to={l.to} style={{
              display: "block", fontFamily: T.sans, fontSize: 14, color: "rgba(255,255,255,.5)",
              textDecoration: "none", marginBottom: 8, transition: "color .2s",
            }}
              onMouseEnter={e => (e.target as HTMLElement).style.color = "#fff"}
              onMouseLeave={e => (e.target as HTMLElement).style.color = "rgba(255,255,255,.5)"}
            >{l.label}</Link>
          ))}
        </div>
        <div>
          <h4 style={{ fontFamily: T.sans, fontWeight: 600, fontSize: 13, color: "rgba(255,255,255,.35)", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 18 }}>Om oss</h4>
          <p style={{ fontFamily: T.sans, fontSize: 14, color: "rgba(255,255,255,.4)", lineHeight: 1.65 }}>
            Åre Skärm- och Drakflygklubb är en ideell förening för skärm- och drakflyg i Åreområdet. Sedan 1975.
          </p>
        </div>
      </div>
      <div style={{ maxWidth: 1100, margin: "40px auto 0", borderTop: "1px solid rgba(255,255,255,.07)", paddingTop: 20 }}>
        <p style={{ fontFamily: T.sans, fontSize: 12, color: "rgba(255,255,255,.2)" }}>
          &copy; 2026 Åre Skärm- och Drakflygklubb
        </p>
      </div>
    </footer>
  );
}
