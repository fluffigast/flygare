import { Badge } from "@/components/ui/badge";

import { Wind, Mountain, MapPin } from "lucide-react";
import { T, IMG, Fade, Wrap,  PageHero } from "../shared";

function coordsToMapsUrl(coords: string): string | null {
  const match = coords.match(/(\d+)°(\d+)'(\d+)"?N,?\s*(\d+)°(\d+)'(\d+)"?E/);
  if (!match) return null;
  const lat = parseInt(match[1]) + parseInt(match[2])/60 + parseInt(match[3])/3600;
  const lon = parseInt(match[4]) + parseInt(match[5])/60 + parseInt(match[6])/3600;
  return `https://www.google.com/maps/search/?api=1&query=${lat.toFixed(6)},${lon.toFixed(6)}`;
}

const LAUNCHES = [
  {
    name: "1000m starten", type: "Starter", dir: "SO–S (skärm), SO–SV (hängflyg)", elev: "1000 m",
    coords: "Nås via Kabinbanan",
    desc: "Gemensamt startområde för hängflyg och skärmflyg. Höjdskillnad till Draklanda: 905 m. Trärampen (sommar) enbart för hängflyg — skärmflygare startar öster om rampen. Håll säkerhetsavstånd till kabinbanans linor och se till att startfältet är fritt från skidåkare.",
    extra: "Nödlandning: öster om Tusenmeter Dal, innan västra ravinen.",
  },
  {
    name: "Tväråvalvet", type: "Starter", dir: "NV (skärm), V–NV (hängflyg)", elev: "~1050 m",
    coords: "63°25'48\"N, 13°04'57\"E",
    desc: "Ca 200 m norr om Kabinbanans toppstation. Trärampen enbart för hängflyg. Höjdskillnad till Draklanda: 925 m, till Tväråvalvets liftstation: 370 m. Vintertid kan man landa vid liftens bottenstation och åka upp igen med miniskidor.",
    extra: "Bedöm: klarar du liftvajrarna och har reservhöjd till Draklanda?",
  },
  {
    name: "Mörvikshummeln Väst", type: "Starter", dir: "S–SV", elev: "~900 m",
    coords: "63°24'43\"N, 13°04'41\"E",
    desc: "Lokalt kallad 'Hummeln väst'. Ca 150 m väster om Hummelstugan, under kabinbanans linor. Höjdskillnad till Draklanda: 525 m. Alltid motvind mot Draklanda — inga alternativa landningsplatser.",
    extra: "Vindmätardata från Hummelstugan kan vara missvisande p.g.a. rotoreffekter bakom Svartberget.",
  },
  {
    name: "Mörvikshummeln Syd", type: "Starter", dir: "S", elev: "~900 m",
    coords: "63°24'38\"N, 13°04'59\"E",
    desc: "Lokalt kallad 'Hummeln syd'. Bra termikstartplats senvår/sommar. Höjdskillnad till Draklanda: 525 m. Flyg söderut mot Åre by, passera Stötta 1 till höger, sväng sedan västerut mot Draklanda (~1,5 km).",
    extra: "Sommar: ingen säker nödlandning om du inte klarar järnvägen.",
  },
  {
    name: "Mörvikshummeln Ost", type: "Starter", dir: "O–SO", elev: "~900 m",
    coords: "63°24'39\"N, 13°05'02\"E",
    desc: "Lokalt kallad 'Hummeln Ost/Sydost'. Ca 50 m sydost om Hummelliften toppstation. Höjdskillnad: 510 m, avstånd: 1,9 km till Draklanda. Sväng söderut så snart som möjligt efter start.",
    extra: "Undvik skidpister vintertid.",
  },
  {
    name: "Mörvikshummeln Nordost", type: "Starter", dir: "NO–N", elev: "~900 m",
    coords: "63°24'40\"N, 13°05'04\"E",
    desc: "Lokalt kallad 'Pelikan'. Ca 20 m nordost om Hummelliften toppstation. Höjdskillnad: 510 m till Draklanda. Dalen nedanför har ofta sjunkande luft — flyg söderut parallellt med liften för att vinna höjd.",
    extra: "Erfarna piloter med rätt certifikat kan nyttja kantlyft i närliggande raviner.",
  },
  {
    name: "Röda Rappet Väst", type: "Starter", dir: "SV–V", elev: "~950 m",
    coords: "63°25'34\"N, 13°04'13\"E",
    desc: "Ca 500 m från Kabinbanans toppstation. Höjdskillnad till Draklanda: 825 m, till Olympiagondolen: 370 m. Stora stenblock gör starten krävande vid svag vind. Sommartid krävs vandring ned till lägre startplats.",
    extra: "Brant kant under övre starten — turbulens från närliggande ås möjlig.",
  },
  {
    name: "Långspannet", type: "Starter", dir: "SO–O", elev: "~1000 m",
    coords: "Mellan stötta 3 och 4",
    desc: "Inofficiell start — INTE klubbrekommenderad. Endast piloter med minst P2 och god lokal erfarenhet. Piloter måste kunna flyga under kabinbanans vajrar säkert och kabinbanan ska stå stilla vid passage.",
    extra: "Begränsad kapacitet — trångt luftrum vid flera samtidiga starter.",
  },
  {
    name: "Draklanda", type: "Landning", dir: "Alla", elev: "~380 m",
    coords: "1 km väster om torget",
    desc: "Enda officiella landningsplatsen. Belägen nedanför VM8:an, mellan järnvägen och Åresjön. Arrenderas av Åre kommun och Skistar. Klubbstugan ligger här. Minst 25 höjdflyg krävs för sommarlandning utan instruktör.",
    extra: "Vinter: sjöisen intill kan användas vid nödlandning, men isen vid utloppet nedom Lake Lodge är MYCKET svag.",
  },
];

const OTHER_SITES = [
  { name: "Välliste, Trillevallen", dir: "O–SO", elev: "~50 m drop", desc: "Avfart E14 vid Undersåker. 20–25 min promenad. Fyrpersonslift gör Välliste lämpligt för vinterflygning.", coords: "63°16'20\"N, 13°08'32\"E" },
  { name: "Getryggen, Snasahögarna", dir: "O–SO", elev: "Hike & fly", desc: "Kör till Storulvåns fjällstation. Ca 45 min promenad. Enbart skärmflyg. Landa på parkeringen eller närliggande myr.", coords: "63°10'52\"N, 12°19'03\"E" },
  { name: "Tossön, Järpen", dir: "S", elev: "~50 m drop", desc: "En av Åres mest använda backglidekullar. Nyligen röjd av Åre kommun. Obs: en del träd kvar vid landningsområdet — scouta noga innan flygning." },
  { name: "Rännberg, Gevsjön", dir: "SSV–SSO", elev: "~50 m drop", desc: "Populär skolningsplats. Backglid fungerar väl på Rännberg." },
];

export default function Startplatser() {
  return (
    <>
      <PageHero img={IMG.areSky} title="Startplatser" subtitle="Åreskutans start- och landningsområden." height="clamp(280px, 40vh, 420px)" />

      <Wrap bg={T.bg}>
        <Fade>
          <p style={{ fontFamily: T.sans, fontSize: 15, color: T.ink3, lineHeight: 1.7, maxWidth: 720, marginBottom: 4 }}>
            Alla väderstreck är orienterade som om Kabinbanan ligger i rak nord-sydlig riktning.
            Draklanda är den officiella landningsplatsen — alla andra landningar betraktas som utelandningar vid XC-flyg.
          </p>
          <p style={{ fontFamily: T.sans, fontSize: 14, color: T.muted, lineHeight: 1.7, maxWidth: 720, marginBottom: 8 }}>
            Vajrarna passeras söder om Stötta 1 vid nedflyg utan höjdvinst. Nya och halverfarna piloter ska alltid följa denna regel. Vajrarna hänger minimum 60 m ovan mark.
          </p>
        </Fade>

        <Fade>
          <h3 style={{ fontFamily: T.serif, fontSize: 22, fontWeight: 400, color: T.ink, marginBottom: 16 }}>Åreskutan</h3>
        </Fade>
        <div style={{ display: "grid", gap: 1, borderRadius: 12, overflow: "hidden", border: `1px solid ${T.border}`, marginBottom: 48 }}>
          {LAUNCHES.map((l, i) => {
            const isLanding = l.type === "Landning";
            const rowBg = isLanding ? "#faf6f0" : (i % 2 === 0 ? T.white : T.bg);
            return (
            <div key={l.name} style={{
              padding: "18px 24px", background: rowBg, transition: "background .2s",
              ...(isLanding ? { borderLeft: "3px solid #b07d3a" } : {}),
            }}
              onMouseEnter={e => e.currentTarget.style.background = T.accentBg}
              onMouseLeave={e => e.currentTarget.style.background = rowBg}
            >
              <div style={{ display: "grid", gridTemplateColumns: "1fr auto auto", gap: 16, alignItems: "start" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
                    <span style={{ fontFamily: T.serif, fontSize: 17, fontWeight: 500, color: T.ink }}>{l.name}</span>
                    <Badge variant="outline" style={{ fontFamily: T.sans, fontSize: 10.5, fontWeight: 500, color: l.type === "Landning" ? "#b07d3a" : T.accent, borderColor: l.type === "Landning" ? "#b07d3a" : T.accent }}>{l.type}</Badge>
                  </div>
                  <p style={{ fontFamily: T.sans, fontSize: 13.5, color: T.ink3, lineHeight: 1.55, maxWidth: 540 }}>{l.desc}</p>
                  {l.extra && <p style={{ fontFamily: T.sans, fontSize: 12.5, color: T.muted, lineHeight: 1.5, marginTop: 4, fontStyle: "italic" }}>{l.extra}</p>}
                  {l.coords && (() => {
                    const url = coordsToMapsUrl(l.coords);
                    return url ? (
                      <p style={{ fontFamily: T.sans, fontSize: 12, color: T.muted, marginTop: 4, fontVariantNumeric: "tabular-nums" }}>
                        <a href={url} target="_blank" rel="noopener noreferrer" style={{ color: T.accent, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 4 }}>
                          <MapPin size={12} />{l.coords}
                        </a>
                      </p>
                    ) : (
                      <p style={{ fontFamily: T.sans, fontSize: 12, color: T.muted, marginTop: 4, fontVariantNumeric: "tabular-nums" }}>{l.coords}</p>
                    );
                  })()}
                </div>
                <div style={{ textAlign: "center", minWidth: 56 }}>
                  <Wind size={14} style={{ color: T.accent, marginBottom: 2 }} />
                  <div style={{ fontFamily: T.sans, fontSize: 12, fontWeight: 500, color: T.ink2, maxWidth: 80 }}>{l.dir}</div>
                </div>
                <div style={{ textAlign: "center", minWidth: 64 }}>
                  <Mountain size={14} style={{ color: T.accent, marginBottom: 2 }} />
                  <div style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 500, color: T.ink2 }}>{l.elev}</div>
                </div>
              </div>
            </div>
          );})}
        </div>

        <Fade>
          <h3 style={{ fontFamily: T.serif, fontSize: 22, fontWeight: 400, color: T.ink, marginBottom: 16 }}>Andra flygområden</h3>
        </Fade>
        <div style={{ display: "grid", gap: 1, borderRadius: 12, overflow: "hidden", border: `1px solid ${T.border}` }}>
          {OTHER_SITES.map((s, i) => (
            <div key={s.name} style={{
              display: "grid", gridTemplateColumns: "1fr auto auto", gap: 16, alignItems: "start",
              padding: "16px 24px", background: i % 2 === 0 ? T.white : T.bg,
            }}>
              <div>
                <span style={{ fontFamily: T.serif, fontSize: 16, fontWeight: 500, color: T.ink }}>{s.name}</span>
                <p style={{ fontFamily: T.sans, fontSize: 13.5, color: T.ink3, lineHeight: 1.55, marginTop: 4 }}>{s.desc}</p>
                {s.coords && (() => {
                  const url = coordsToMapsUrl(s.coords);
                  return url ? (
                    <p style={{ fontFamily: T.sans, fontSize: 12, color: T.muted, marginTop: 4, fontVariantNumeric: "tabular-nums" }}>
                      <a href={url} target="_blank" rel="noopener noreferrer" style={{ color: T.accent, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 4 }}>
                        <MapPin size={12} />{s.coords}
                      </a>
                    </p>
                  ) : (
                    <p style={{ fontFamily: T.sans, fontSize: 12, color: T.muted, marginTop: 4, fontVariantNumeric: "tabular-nums" }}>{s.coords}</p>
                  );
                })()}
              </div>
              <div style={{ textAlign: "center", minWidth: 56 }}>
                <Wind size={14} style={{ color: T.accent, marginBottom: 2 }} />
                <div style={{ fontFamily: T.sans, fontSize: 12, fontWeight: 500, color: T.ink2 }}>{s.dir}</div>
              </div>
              <div style={{ textAlign: "center", minWidth: 64 }}>
                <Mountain size={14} style={{ color: T.accent, marginBottom: 2 }} />
                <div style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 500, color: T.ink2 }}>{s.elev}</div>
              </div>
            </div>
          ))}
        </div>
      </Wrap>

      <div style={{ position: "relative", height: "clamp(250px, 35vw, 440px)", overflow: "hidden" }}>
        <img src={IMG.areMullfjallet} alt="Mullfjället naturvy" loading="lazy"
          style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 50%, rgba(26,31,46,.45) 100%)" }} />
        <div style={{ position: "absolute", bottom: 36, left: 0, right: 0, textAlign: "center" }}>
          <Fade>
            <p style={{ fontFamily: T.serif, fontStyle: "italic", fontSize: 16, color: "rgba(255,255,255,.7)", marginBottom: 4 }}>Landning</p>
            <h2 style={{ fontFamily: T.serif, fontSize: "clamp(24px, 3.5vw, 40px)", fontWeight: 400, color: "#fff", letterSpacing: "-.02em" }}>
              Draklanda — 380 m
            </h2>
          </Fade>
        </div>
      </div>
    </>
  );
}
