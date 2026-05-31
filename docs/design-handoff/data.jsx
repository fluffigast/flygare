// data.jsx — content for the site

const NEWS = [
  {
    slug: "sasongsstart",
    img: "assets/news-fjall.jpg",
    tag: "Aktuellt",
    title: "Säsongsstart i Årefjällen",
    date: "25 Januari, 2026",
    excerpt: "Vår och sommar närmar sig och flygsäsongen i Åre står för dörren. Förutsättningarna börjar falla på plats och många ser fram emot årets första turer.",
    lede: "Vår och sommar närmar sig och flygsäsongen i Åre står för dörren. Förutsättningarna börjar falla på plats och många ser fram emot årets första flyg.",
    body: [
      "Med längre dagar och mer stabila väderlägen går vi in i en ny flygsäsong i Årefjällen. Som alltid vill klubben påminna om vikten av god förberedelse inför säsongsstarten.",
      "Se över utrustningen, uppdatera dig på aktuella regler och ta del av den lokala informationen om starter, landningar och luftrum. Fjällmiljön ställer höga krav och förhållanden kan ändras snabbt, även under till synes fina dagar.",
      "Genom att flyga med marginaler, visa hänsyn och dela information med varandra skapar vi en trygg och trivsam säsong för alla. Vi ser fram emot många fina flygdagar och möten både på berget och i luften.",
    ],
    category: "Aktuellt",
  },
  {
    slug: "gemensam-flygdag",
    img: "assets/hero-paragliding.jpg",
    tag: "Aktiviteter",
    title: "Gemensam flygdag planeras",
    date: "20 Januari, 2026",
    excerpt: "Klubben planerar en gemensam flygdag på 1000-meter Syd så snart vädret tillåter. Anmälan sker via medlemsforumet.",
    category: "Aktiviteter",
  },
  {
    slug: "respektera-startytor",
    img: "assets/luftrum.png",
    tag: "Säkerhet",
    title: "Viktigt att respektera start och landningsytor",
    date: "12 Januari, 2026",
    excerpt: "För att kunna fortsätta flyga i Åre är det viktigt att vi visar hänsyn till markägare, besökare och andra friluftsutövare.",
    category: "Säkerhet",
  },
  {
    slug: "luftrum-paminnelse",
    img: "assets/klubbussen.png",
    tag: "Aktuellt",
    title: "Påminnelse om luftrum i Åreområdet",
    date: "08 Januari, 2026",
    excerpt: "Luftrumsförhållanden kan variera och det är varje pilots ansvar att vara uppdaterad.",
    category: "Aktuellt",
  },
  {
    slug: "starter-areskutan",
    img: "assets/takeoff-hero.jpg",
    tag: "Säkerhet",
    title: "Uppdaterad information om starter på Åreskutan",
    date: "02 Januari, 2026",
    excerpt: "Arbetet med att samla och strukturera information om startplatserna på Åreskutan fortsätter.",
    category: "Säkerhet",
  },
];

const INFO_CARDS = [
  { slug: "1000-meter-syd", img: "assets/takeoff-hero.jpg", title: "Starter och landningar", desc: "Information om etablerade start- och landningsplatser, lokala förhållanden och tips för trygg takeoff och säkra landningar." },
  { slug: "vader", img: "assets/hero-paragliding.jpg", title: "Väder och vind", desc: "Råd om hur man tolkar väder, vindriktningar och termik i Årefjällen. Viktigt för att planera flygning och hålla säkerheten hög." },
  { slug: "regler", img: "assets/news-fjall.jpg", title: "Säkerhet och regler", desc: "Lokala regler, nationella bestämmelser och säkerhetsrutiner för skärm- och drakflyg. Fokus på ansvar och förebyggande åtgärder." },
  { slug: "nod", img: "assets/klubbussen.png", title: "Nödinformation", desc: "Vad man gör vid incidenter, nödsignalering och viktiga kontaktvägar till räddningstjänst och klubb." },
  { slug: "luftrum", img: "assets/luftrum.png", title: "Luftrum", desc: "Information om kontrollerade och obevakade luftrum, restriktioner och hur man flyger säkert bland andra luftfarkoster." },
  { slug: "klubbussen", img: "assets/klubbussen.png", title: "Klubbussen", desc: "Allt om klubbens buss: transport av piloter och utrustning, planering av turer och hur man använder den på ett säkert sätt." },
];

const WEATHER_DAYS = [
  { day: "Tisdag", date: "3 februari", windDir: "Sydlig", windDirShort: "S", windSpeed: "2-6 m/s", temp: "12°C", rain: "0 mm" },
  { day: "Onsdag", date: "4 februari", windDir: "Ostlig", windDirShort: "O", windSpeed: "2-6 m/s", temp: "12°C", rain: "0 mm" },
  { day: "Torsdag", date: "5 februari", windDir: "Ostlig", windDirShort: "O", windSpeed: "7-10 m/s", temp: "12°C", rain: "12 mm" },
];

const TAKEOFF = {
  slug: "1000-meter-syd",
  title: "1000-meter Syd",
  eyebrow: "Startplats",
  hero: "assets/takeoff-hero.jpg",
  pos: { wgs84: "63.4087° N, 13.0796° E", sweref: "7036521, 411208" },
  altitudeStart: "1 200 m ö h",
  altitudeOver: "ca 700 m över landning",
  windDir: "Syd- till sydost",
  windNote: "Känslig för rotor vid nordliga vindar. Termik kan vara kraftig soliga dagar. Snabba väderomslag förekommer. Molnbas kan sjunka snabbt. Uppmärksamma katabatiska vindar sena eftermiddagar.",
  level: "Medel till avancerad pilot med god fjällerfarenhet.",
  updated: "2026-01-15",
  description: [
    "Startplats på Västerskutan med god höjd över dalen och fina möjligheter vid rätt vind. Används av både skärm- och drakflyg och kräver god startteknik.",
    "Brant fjällstart med begränsat utrymme. Kräver kontrollerad uppdragning och tydligt beslut innan start. Ej lämplig för nybörjare vid marginalförhållanden.",
    "Visa hänsyn till vandrare och skidåkare. Blockera aldrig leder eller stigar. Lämna platsen i samma skick som du fann den.",
    "Startplatsen nås till fots från markerad led. Klubbussen används ibland vid gemensamma flygdagar. Parkering enligt lokala anvisningar.",
  ],
  risks: [
    "Rotor vid fel vindriktning",
    "Stenigt underlag",
    "Begränsade nödlandningsytor nära start",
    "Turbulens vid termiska förhållanden",
  ],
  emergency: "Vid olycka ring 112. Ange Åreskutan, 1000-meter syd startplats. Klubbens kontaktperson finns under Nödsituationer.",
};

const NAV = [
  { id: "info", label: "Information", to: "#/information" },
  { id: "vader", label: "Väder", to: "#/information#vader" },
  { id: "regler", label: "Regler", to: "#/information#regler" },
  { id: "om", label: "Om klubben", to: "#/om" },
];

const FOOTER_LINKS_1 = ["Regler", "Riktlinjer", "Startplatser", "Landningar", "Luftrum", "Nödinformation"];
const FOOTER_LINKS_2 = ["Bli medlem", "Dokument", "Kontakt"];

Object.assign(window, { NEWS, INFO_CARDS, WEATHER_DAYS, TAKEOFF, NAV, FOOTER_LINKS_1, FOOTER_LINKS_2 });
