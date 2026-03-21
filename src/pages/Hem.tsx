import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowRight } from "lucide-react";
import { T, IMG, Fade, Wrap, SH } from "../shared";
import { useNews, useSiteSettings } from "@/hooks/useCMS";
import { richTextToPlain, PAYLOAD_URL } from "../lib/payload";

const INFO_CARDS = [
  {
    title: "Starter och landningar",
    desc: "Information om etablerade start- och landningsplatser, lokala förhållanden och tips för trygg takeoff och säkra landningar.",
    img: IMG.areWinter,
    to: "/startplatser",
  },
  {
    title: "Väder och vind",
    desc: "Råd om hur man tolkar väder, vindriktningar och termik i Årefjällen. Viktigt för att planera flygning och hålla säkerheten hög.",
    img: IMG.soaring,
    to: "/vader",
  },
  {
    title: "Säkerhet och regler",
    desc: "Lokala regler, nationella bestämmelser och säkerhetsrutiner för skärm- och drakflyg. Fokus på ansvar och förebyggande åtgärder.",
    img: IMG.hangGlider,
    to: "/flygguiden",
  },
];

export default function Hem() {
  const [heroLoaded, setHeroLoaded] = useState(false);
  const { data: news } = useNews();
  const { data: settings } = useSiteSettings();

  const newsPreview = (news || []).slice(0, 3).map(n => ({
    title: n.title,
    cat: n.category,
    date: n.date ? new Date(n.date).toLocaleDateString("sv-SE", { day: "numeric", month: "long", year: "numeric" }) : "",
    img: n.image?.url ? `${PAYLOAD_URL}${n.image.url}` : IMG.skyGlide,
    desc: richTextToPlain(n.description),
  }));

  const STATS = [
    { value: settings?.foundedYear?.toString() ?? "1975", label: "Grundat" },
    { value: settings?.statsMembers ?? "~100", label: "Aktiva medlemmar" },
    { value: settings?.statsDistanceRecord ?? "230 km", label: "Distansrekord (skärm)" },
    { value: settings?.statsLaunchSites ?? "9", label: "Startplatser" },
  ];

  return (
    <>
      {/* ── HERO ── */}
      <section style={{
        position: "relative", height: "100vh", minHeight: 580, maxHeight: 960,
        overflow: "hidden", background: T.ink,
      }}>
        <img
          src={IMG.hero}
          alt="Åreskutan vinter med lift"
          onLoad={() => setHeroLoaded(true)}
          style={{
            position: "absolute", inset: 0, width: "100%", height: "100%",
            objectFit: "cover", opacity: heroLoaded ? 1 : 0,
            transition: "opacity 1.8s ease",
          }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(180deg, rgba(26,31,46,.18) 0%, rgba(26,31,46,.02) 35%, rgba(26,31,46,.6) 100%)",
        }} />
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          padding: "0 clamp(20px, 5vw, 40px) 80px", maxWidth: 1100, margin: "0 auto",
        }}>
          <Fade delay={0.4}>
            <p style={{
              fontFamily: T.serif, fontStyle: "italic", fontSize: 15,
              color: "rgba(255,255,255,.5)", marginBottom: 14, letterSpacing: ".02em",
            }}>Åre Skärm- och Drakflygklubb</p>
          </Fade>
          <Fade delay={0.6}>
            <h1 style={{
              fontFamily: T.serif, fontSize: "clamp(36px, 5.5vw, 62px)", fontWeight: 400,
              color: "#fff", lineHeight: 1.06, maxWidth: 680, letterSpacing: "-.03em",
            }}>
              Skandinaviens mest spektakulära flygplats
            </h1>
          </Fade>
          <Fade delay={0.85}>
            <p style={{
              fontFamily: T.sans, fontSize: 17, fontWeight: 300,
              color: "rgba(255,255,255,.6)", marginTop: 20, maxWidth: 460, lineHeight: 1.6,
            }}>
              Jakten på termiken startar i mars. Har du tur får du sällskap av en kungsörn.
            </p>
          </Fade>
          <Fade delay={1.05}>
            <div style={{ marginTop: 32, display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link to="/flygguiden">
                <Button style={{
                  fontFamily: T.sans, fontWeight: 500, fontSize: 14, height: 46, padding: "0 30px",
                  borderRadius: 8, background: "#fff", color: T.ink, border: "none",
                  transition: "transform .2s",
                }}>
                  Flygguiden <ArrowRight size={15} style={{ marginLeft: 8 }} />
                </Button>
              </Link>
              <Link to="/bli-medlem">
                <Button variant="outline" style={{
                  fontFamily: T.sans, fontWeight: 400, fontSize: 14, height: 46, padding: "0 26px",
                  borderRadius: 8, background: "rgba(255,255,255,.06)",
                  border: "1px solid rgba(255,255,255,.2)", color: "rgba(255,255,255,.85)",
                  backdropFilter: "blur(6px)", transition: "background .2s",
                }}>
                  Bli medlem
                </Button>
              </Link>
            </div>
          </Fade>
        </div>
      </section>

      {/* ── INFO CARDS ── */}
      <Wrap bg={T.bg}>
        <SH italic="Flygguiden" title="Att flyga i Åre" />
        <Separator style={{ background: T.border, margin: "28px 0 40px" }} />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 28 }}>
          {INFO_CARDS.map((c, i) => (
            <Fade key={c.title} delay={i * 0.1}>
              <Link to={c.to} style={{ textDecoration: "none", display: "block" }}>
                <div style={{ cursor: "pointer", transition: "transform .35s ease" }}
                  onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
                >
                  <div style={{
                    borderRadius: 12, overflow: "hidden", aspectRatio: "4/3",
                    boxShadow: "0 4px 24px rgba(0,0,0,.08)",
                  }}>
                    <img src={c.img} alt={c.title} loading="lazy" style={{
                      width: "100%", height: "100%", objectFit: "cover",
                      transition: "transform .6s cubic-bezier(.22,1,.36,1)",
                    }}
                      onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                      onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                    />
                  </div>
                  <h3 style={{
                    fontFamily: T.serif, fontSize: 23, fontWeight: 400, color: T.ink,
                    marginTop: 18, letterSpacing: "-.015em", lineHeight: 1.25,
                  }}>{c.title}</h3>
                  <p style={{
                    fontFamily: T.sans, fontSize: 14.5, color: T.muted, lineHeight: 1.65, marginTop: 8,
                  }}>{c.desc}</p>
                </div>
              </Link>
            </Fade>
          ))}
        </div>
      </Wrap>

      {/* ── ABOUT SPLIT — image + text ── */}
      <Wrap bg={T.white}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 48, alignItems: "center" }}>
          <Fade>
            <div style={{ borderRadius: 12, overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,.08)" }}>
              <img src={IMG.jamtlandSummer} alt="Jämtlandsfjällen sommar" loading="lazy"
                style={{ width: "100%", height: "100%", aspectRatio: "3/2", objectFit: "cover" }} />
            </div>
          </Fade>
          <Fade delay={0.15}>
            <div>
              <p style={{ fontFamily: T.serif, fontStyle: "italic", fontSize: 15, color: T.accent, marginBottom: 8 }}>Om klubben</p>
              <h2 style={{ fontFamily: T.serif, fontSize: "clamp(26px, 3vw, 36px)", fontWeight: 400, color: T.ink, letterSpacing: "-.02em", lineHeight: 1.15, marginBottom: 20 }}>
                {settings?.aboutTitle || "50 år av flygning från Skutan"}
              </h2>
              {settings?.aboutText ? (
                <p style={{ fontFamily: T.sans, fontSize: 15, color: T.ink3, lineHeight: 1.7, marginBottom: 24, whiteSpace: "pre-line" }}>
                  {richTextToPlain(settings.aboutText)}
                </p>
              ) : (
                <>
                  <p style={{ fontFamily: T.sans, fontSize: 15, color: T.ink3, lineHeight: 1.7, marginBottom: 14 }}>
                    Åre Drakflygklubb bildades 1975 och sedan 1988 har även skärmflygklubben funnits.
                    Idag görs 95% av all flygning med skärm. Distansrekordet ligger på 230 km — Åre till Sollefteå.
                  </p>
                  <p style={{ fontFamily: T.sans, fontSize: 15, color: T.ink3, lineHeight: 1.7, marginBottom: 24 }}>
                    Klubben har ca 100 aktiva medlemmar varav 30 bor i Åre kommun.
                  </p>
                </>
              )}
              <Link to="/om" style={{
                fontFamily: T.sans, fontSize: 14, fontWeight: 500, color: T.accent, textDecoration: "none",
                borderBottom: `1px solid ${T.accent}`, paddingBottom: 3,
              }}>Läs mer om klubben &rarr;</Link>
            </div>
          </Fade>
        </div>
      </Wrap>

      {/* ── IMAGE BREAK ── */}
      <div style={{ position: "relative", height: "clamp(260px, 35vw, 440px)", overflow: "hidden" }}>
        <img src={IMG.soaringSunset} alt="Skärmflygare vid solnedgång" loading="lazy"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(26,31,46,.05) 0%, rgba(26,31,46,.5) 100%)" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0 clamp(20px, 5vw, 40px) 32px", maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontFamily: T.serif, fontStyle: "italic", fontSize: 15, color: "rgba(255,255,255,.55)" }}>Åreskutan</p>
          <h2 style={{ fontFamily: T.serif, fontSize: "clamp(22px, 3vw, 34px)", fontWeight: 400, color: "#fff" }}>Termik, soaring & distansflygning</h2>
        </div>
      </div>

      {/* ── NEWS ── */}
      <Wrap bg={T.bg}>
        <SH italic="Aktuellt" title="Senaste nytt" />
        <Separator style={{ background: T.border, margin: "28px 0 40px" }} />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 28 }}>
          {newsPreview.map((n, i) => (
            <Fade key={n.title} delay={i * 0.1}>
              <Link to="/nyheter" style={{ textDecoration: "none", display: "block" }}>
                <div style={{ cursor: "pointer", transition: "transform .35s" }}
                  onMouseEnter={e => e.currentTarget.style.transform = "translateY(-3px)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
                >
                  <div style={{
                    borderRadius: 12, overflow: "hidden", aspectRatio: "16/9",
                    boxShadow: "0 4px 24px rgba(0,0,0,.06)",
                  }}>
                    <img src={n.img} alt={n.title} loading="lazy" style={{
                      width: "100%", height: "100%", objectFit: "cover",
                      transition: "transform .6s cubic-bezier(.22,1,.36,1)",
                    }}
                      onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                      onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                    />
                  </div>
                  <div style={{ marginTop: 16 }}>
                    <p style={{ fontFamily: T.serif, fontStyle: "italic", fontSize: 13, color: T.accent, marginBottom: 6 }}>{n.cat}</p>
                    <h3 style={{
                      fontFamily: T.serif, fontSize: 22, fontWeight: 400, color: T.ink,
                      letterSpacing: "-.01em", lineHeight: 1.25, marginBottom: 6,
                    }}>{n.title}</h3>
                    <p style={{ fontFamily: T.sans, fontSize: 13, color: T.muted, marginBottom: 8 }}>{n.date}</p>
                    <p style={{ fontFamily: T.sans, fontSize: 14.5, color: T.ink3, lineHeight: 1.6 }}>{n.desc}</p>
                  </div>
                </div>
              </Link>
            </Fade>
          ))}
        </div>

        <Fade delay={0.2}>
          <div style={{ marginTop: 48 }}>
            <Link to="/nyheter" style={{
              fontFamily: T.sans, fontSize: 14, fontWeight: 500, color: T.accent, textDecoration: "none",
              borderBottom: `1px solid ${T.accent}`, paddingBottom: 3,
            }}>Alla nyheter &rarr;</Link>
          </div>
        </Fade>
      </Wrap>

      {/* ── STATS + CTA ── */}
      <section style={{ background: T.ink, padding: "80px clamp(20px, 5vw, 40px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Fade>
            <div style={{
              display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
              gap: 32, marginBottom: 56, textAlign: "center",
            }}>
              {STATS.map(s => (
                <div key={s.label}>
                  <p style={{
                    fontFamily: T.serif, fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 400,
                    color: "#fff", letterSpacing: "-.02em", marginBottom: 6,
                  }}>{s.value}</p>
                  <p style={{ fontFamily: T.sans, fontSize: 13, color: "rgba(255,255,255,.4)", textTransform: "uppercase", letterSpacing: ".06em" }}>{s.label}</p>
                </div>
              ))}
            </div>
          </Fade>
          <div style={{ borderTop: "1px solid rgba(255,255,255,.08)", maxWidth: 200, margin: "0 auto 48px" }} />
          <Fade delay={0.15}>
            <div style={{ textAlign: "center" }}>
              <p style={{ fontFamily: T.serif, fontStyle: "italic", fontSize: 15, color: "rgba(255,255,255,.4)", marginBottom: 10 }}>Bli en del av klubben</p>
              <h2 style={{
                fontFamily: T.serif, fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 400,
                color: "#fff", letterSpacing: "-.025em", lineHeight: 1.15, marginBottom: 24,
              }}>Redo att flyga?</h2>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <Link to="/bli-medlem">
                  <Button style={{
                    fontFamily: T.sans, fontWeight: 500, fontSize: 14, height: 46, padding: "0 30px",
                    borderRadius: 8, background: "#fff", color: T.ink, border: "none",
                  }}>
                    Bli medlem — 600 kr/år <ArrowRight size={15} style={{ marginLeft: 8 }} />
                  </Button>
                </Link>
                <Link to="/kontakt">
                  <Button variant="outline" style={{
                    fontFamily: T.sans, fontWeight: 400, fontSize: 14, height: 46, padding: "0 26px",
                    borderRadius: 8, background: "rgba(255,255,255,.06)",
                    border: "1px solid rgba(255,255,255,.15)", color: "rgba(255,255,255,.75)",
                  }}>
                    Kontakta oss
                  </Button>
                </Link>
              </div>
            </div>
          </Fade>
        </div>
      </section>
    </>
  );
}
