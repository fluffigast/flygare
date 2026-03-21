import { Separator } from "@/components/ui/separator";
import { T, IMG, Fade, Wrap,  PageHero } from "../shared";

export default function Flygguiden() {
  return (
    <>
      <PageHero img={IMG.soaring} title="Flygguiden" subtitle="Information för säkert och härligt flygande vid Åreskutan." height="clamp(280px, 40vh, 420px)" />

      <Wrap bg={T.bg}>
        <Fade>
          <p style={{ fontFamily: T.sans, fontSize: 15, color: T.ink3, lineHeight: 1.7, maxWidth: 720, marginBottom: 40 }}>
            Guiden är tänkt att främja vår flygsäkerhet samt informera om starter och landningar.
            Hängflygare startar normalt från 1000m starten eller Tväråvalvet. Skärmflygare når alla startområdena
            med olika liftar och korta promenader. Vi önskar dig många härliga flyg från Åreskutan!
          </p>
        </Fade>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 48 }}>
          <Fade>
            <div>
              <p style={{ fontFamily: T.serif, fontStyle: "italic", fontSize: 17, color: T.accent, marginBottom: 6 }}>Vintertid</p>
              <h2 style={{ fontFamily: T.serif, fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 400, color: T.ink, letterSpacing: "-.02em", lineHeight: 1.15, marginBottom: 20 }}>
                Flyga på vintern
              </h2>
              <div style={{ borderRadius: 12, overflow: "hidden", marginBottom: 20 }}>
                <img src={IMG.areWinter} alt="Skärmflyg vinter" loading="lazy" style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover" }} />
              </div>
              <p style={{ fontFamily: T.sans, fontSize: 15, color: T.ink3, lineHeight: 1.7, marginBottom: 16 }}>
                Det bästa med vinterflygning är att nästan alla startplatser är släta och fina. Om snöförhållandena tillåter
                hjälper Skistar oss att med pistmaskiner göra i ordning fina startplatser. Jakten på de första termikblåsorna
                brukar starta i början på mars när solen gassar på ordentligt i sydsluttningarna.
              </p>
              <p style={{ fontFamily: T.sans, fontSize: 15, color: T.ink3, lineHeight: 1.7 }}>
                Vintersäsongen är mycket passande om du ska flyga in dig på ny utrustning och träna att landa på Draklanda.
                Att vinterflyga i Åre är en fantastisk upplevelse!
              </p>
            </div>
          </Fade>
          <Fade delay={0.15}>
            <div>
              <p style={{ fontFamily: T.serif, fontStyle: "italic", fontSize: 17, color: T.accent, marginBottom: 6 }}>Sommartid</p>
              <h2 style={{ fontFamily: T.serif, fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 400, color: T.ink, letterSpacing: "-.02em", lineHeight: 1.15, marginBottom: 20 }}>
                Flyga på sommaren
              </h2>
              <div style={{ borderRadius: 12, overflow: "hidden", marginBottom: 20 }}>
                <img src={IMG.soaringSunset} alt="Skärmflyg sommar termik" loading="lazy" style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover" }} />
              </div>
              <p style={{ fontFamily: T.sans, fontSize: 15, color: T.ink3, lineHeight: 1.7, marginBottom: 16 }}>
                På sommaren är flygningen lite mer krävande. Framförallt landningen på Draklanda kan vara utmanande.
                Sök av sydsluttningen mellan Hummeln och Rödkullen — Svartberget, Störtloppet eller Bräckebäcken
                kan vara svaren på frågan var termiken finns.
              </p>
              <p style={{ fontFamily: T.sans, fontSize: 15, color: T.ink3, lineHeight: 1.7 }}>
                Distansrekordet för hängflygare från Åreskutan är 116 km och för skärmflygare drygt 230 km (Åre–Sollefteå).
                Har du tur vid dina sommarflyg kan det hända att du får sällskap av en kungsörn i termikblåsorna.
              </p>
            </div>
          </Fade>
        </div>
      </Wrap>

      <Wrap bg={T.white}>
        <Fade>
          <p style={{ fontFamily: T.serif, fontStyle: "italic", fontSize: 17, color: T.accent, marginBottom: 6 }}>Drakflyg</p>
          <h2 style={{ fontFamily: T.serif, fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 400, color: T.ink, letterSpacing: "-.02em", lineHeight: 1.15, marginBottom: 20 }}>
            Hängflygning från Skutan
          </h2>
        </Fade>
        <Separator style={{ background: T.border, margin: "0 0 32px" }} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 40, alignItems: "center" }}>
          <Fade>
            <div style={{ borderRadius: 12, overflow: "hidden" }}>
              <img src={IMG.hangGlider} alt="Drakflygare" loading="lazy" style={{ width: "100%", height: 300, objectFit: "cover" }} />
            </div>
          </Fade>
          <Fade delay={0.1}>
            <div>
              <p style={{ fontFamily: T.sans, fontSize: 15, color: T.ink3, lineHeight: 1.7, marginBottom: 16 }}>
                Under 1980-talet dominerades flygningen av drakar, men under 1990-talet har skärmarna tagit över.
                Idag görs 95% av all flygning från Skutan med skärm. Hängflygare startar normalt från 1000m starten
                eller Tväråvalvet.
              </p>
              <p style={{ fontFamily: T.sans, fontSize: 15, color: T.ink3, lineHeight: 1.7 }}>
                Trots att skärmflyg dominerar är drakflyg fortfarande en viktig del av klubbens historia och identitet.
              </p>
            </div>
          </Fade>
        </div>
      </Wrap>
    </>
  );
}
