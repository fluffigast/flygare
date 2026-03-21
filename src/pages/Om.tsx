
import { Separator } from "@/components/ui/separator";
import { T, IMG, Fade, Wrap,  PageHero } from "../shared";

const MILESTONES = [
  { year: "1975", text: "Åre Drakflygklubb bildas" },
  { year: "1988", text: "Åre Skärmflygklubb bildas" },
  { year: "1995", text: "Klubbarna slås ihop" },
  { year: "2023", text: "1000m-projektet slutförs" },
  { year: "2026", text: "~100 aktiva medlemmar" },
];

const BOARD = [
  { name: "Therese Bärfenheim", role: "Ordförande" },
  { name: "Vladimir Gutic", role: "Vice ordförande" },
  { name: "Alexander Kinde", role: "Ledamot" },
  { name: "Linda Kits", role: "Kassör" },
  { name: "Pontus Karlsson", role: "Ledamot" },
  { name: "Johan Bernalt", role: "Suppleant" },
  { name: "Elias Evertsson", role: "Suppleant" },
];

export default function Om() {
  return (
    <>
      <PageHero img={IMG.jamtlandSummer} title="Om klubben" subtitle="Åre Skärm- och Drakflygklubb — sedan 1975." height="clamp(280px, 40vh, 420px)" />

      <Wrap bg={T.bg}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 48 }}>
          <Fade>
            <div>
              <p style={{ fontFamily: T.sans, fontSize: 15, color: T.ink3, lineHeight: 1.7, marginBottom: 16 }}>
                Åre Drakflygklubb bildades redan 1975 och sedan 1988 har även Åre Skärmflygklubb funnits.
                1995 slogs klubbarna ihop och fick nuvarande namn. Klubben har ca 100 medlemmar, varav de flesta
                är mycket aktiva. Ca 30 av medlemmarna bor i Åre Kommun.
              </p>
              <p style={{ fontFamily: T.sans, fontSize: 15, color: T.ink3, lineHeight: 1.7, marginBottom: 16 }}>
                Åreskutan har genom alla år varit ett av Sveriges centrum för skärm- och drakflygare.
                Under 1980-talet dominerades flygningen av drakar, men under 1990-talet har skärmarna tagit över.
                Idag görs 95% av all flygning från Skutan med skärm.
              </p>
              <p style={{ fontFamily: T.sans, fontSize: 15, color: T.ink3, lineHeight: 1.7 }}>
                De senaste åren har ett antal tävlingar arrangerats: SM i distansflyg, SM/NM i akrobatik,
                Sverige Cup, och PPC (PoängPlockarCupen). Distansrekordet för skärmflygare ligger på drygt 230 km
                (Åre–Sollefteå).
              </p>
            </div>
          </Fade>
          <Fade delay={0.12}>
            <div>
              <h3 style={{ fontFamily: T.serif, fontSize: 22, fontWeight: 400, color: T.ink, marginBottom: 16 }}>Styrelsen</h3>
              <div style={{ display: "grid", gap: 1, borderRadius: 12, overflow: "hidden", border: `1px solid ${T.border}` }}>
                {BOARD.map((m, i) => (
                  <div key={m.name} style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "12px 18px", background: i % 2 === 0 ? T.white : T.bg, fontFamily: T.sans, fontSize: 14,
                  }}>
                    <span style={{ fontWeight: 500, color: T.ink }}>{m.name}</span>
                    <span style={{ color: T.muted, fontSize: 13 }}>{m.role}</span>
                  </div>
                ))}
              </div>
            </div>
          </Fade>
        </div>

        <Separator style={{ background: T.border, margin: "48px 0 40px" }} />

        <Fade delay={0.18}>
          <div style={{ maxWidth: 560 }}>
            {MILESTONES.map(m => (
              <div key={m.year} style={{ display: "flex", gap: 24, alignItems: "baseline", padding: "10px 0" }}>
                <span style={{ fontFamily: T.serif, fontSize: 28, fontWeight: 400, color: T.ink, minWidth: 72, flexShrink: 0 }}>{m.year}</span>
                <span style={{ fontFamily: T.sans, fontSize: 15, color: T.ink3, lineHeight: 1.5 }}>{m.text}</span>
              </div>
            ))}
          </div>
        </Fade>
      </Wrap>

      {/* Club history image */}
      <div style={{ position: "relative", height: "clamp(250px, 35vw, 440px)", overflow: "hidden" }}>
        <img src={IMG.soaring} alt="Hjort i fjällmiljö" loading="lazy"
          style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 50%, rgba(26,31,46,.5) 100%)" }} />
        <div style={{ position: "absolute", bottom: 36, left: 0, right: 0, textAlign: "center" }}>
          <Fade>
            <p style={{ fontFamily: T.serif, fontStyle: "italic", fontSize: 16, color: "rgba(255,255,255,.7)", marginBottom: 4 }}>Sedan 1975</p>
            <h2 style={{ fontFamily: T.serif, fontSize: "clamp(24px, 3.5vw, 40px)", fontWeight: 400, color: "#fff", letterSpacing: "-.02em" }}>
              50 år av flygning
            </h2>
          </Fade>
        </div>
      </div>
    </>
  );
}
