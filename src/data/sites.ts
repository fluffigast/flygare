export type SiteCoordinate = {
  wgs84: { lat: number; lon: number };
  sweref99: { lat: number; lon: number };
};

export type TakeoffOverview = {
  position: SiteCoordinate;
  altitude: {
    takeoffMetersAboveSea: number;
    heightAboveLandingApproxMeters: number;
  };
  wind: {
    directionRange: { min: number; max: number };
    notes: string;
  };
  experienceLevel: {
    level: "nybörjare" | "medel" | "avancerad";
    notes: string;
  };
  lastUpdated: Date;
};

export type TakeoffEmergency = {
  phoneNumber: string;
  locationInstruction: string;
  contactNote: string;
  position: SiteCoordinate;
};

export type TakeoffSite = {
  id: string;
  slug: string;
  kind: "startplats";
  title: string;
  excerpt: string;
  category: "Startplats";
  updatedAt: string;
  overview: TakeoffOverview;
  description: string[];
  risks: string[];
  emergency: TakeoffEmergency;
  content: string;
};

function joinDescription(site: Omit<TakeoffSite, "content">): string {
  return site.description.join("\n\n");
}

const baseEmergency: Pick<TakeoffEmergency, "phoneNumber" | "contactNote"> = {
  phoneNumber: "112",
  contactNote:
    "Klubbens kontaktperson för nödlägen finns under sektionen Nödlägen på webbplatsen.",
};

const sitesRaw: Omit<TakeoffSite, "content">[] = [
  {
    id: "ts-001",
    slug: "1000-meter-syd",
    kind: "startplats",
    title: "1000-meter Syd",
    excerpt:
      "Brant fjällstart på Västerskutan med bra höjd över dalen — kräver god teknik och rätt vind.",
    category: "Startplats",
    updatedAt: "2026-01-15",
    overview: {
      position: {
        wgs84: { lat: 63.4089, lon: 13.0782 },
        sweref99: { lat: 7038210, lon: 692480 },
      },
      altitude: {
        takeoffMetersAboveSea: 1200,
        heightAboveLandingApproxMeters: 700,
      },
      wind: {
        directionRange: { min: 180, max: 225 },
        notes:
          "Känslig för rotor vid nordlig vind. Termiken kan vara stark vid sol. Snabba väderomslag förekommer. Molnbasen kan sjunka snabbt. Akta katabatiska vindar sen eftermiddag.",
      },
      experienceLevel: {
        level: "medel",
        notes: "Medel till avancerad pilot med god fjällerfarenhet",
      },
      lastUpdated: new Date("2026-01-15"),
    },
    description: [
      "Startplats på Västerskutan med bra höjd över dalen och stora möjligheter i rätt vind. Används av både skärm- och hangflyg; kräver god startteknik.",
      "Brant fjällstart med begränsat utrymme. Kräver kontrollerad uppdragning och ett tydligt beslut före start. Olämplig för nybörjare i marginella förhållanden.",
      "Visa hänsyn till vandrare och skidåkare. Blockera aldrig leder eller spår. Lämna platsen som du vill hitta den.",
      "Startplatsen nås till fots från markerad led. Klubbens buss används ibland vid organiserade flygdagar. Parkering enligt lokala anvisningar.",
    ],
    risks: [
      "Rotor vid fel vindriktning.",
      "Bergig och stenig mark.",
      "Begränsade nödlandningsytor nära starten.",
      "Turbulens i termiska förhållanden.",
    ],
    emergency: {
      ...baseEmergency,
      locationInstruction: 'Ange "Åreskutan, 1000-meter syd startplats."',
      position: {
        wgs84: { lat: 63.4089, lon: 13.0782 },
        sweref99: { lat: 7038210, lon: 692480 },
      },
    },
  },
  {
    id: "ts-002",
    slug: "vasterskutan-nord",
    kind: "startplats",
    title: "Västerskutan nord",
    excerpt:
      "Nordlig start på Västerskutan — ofta bättre i nordlig till nordvästlig vind än sydliga startar.",
    category: "Startplats",
    updatedAt: "2026-02-10",
    overview: {
      position: {
        wgs84: { lat: 63.4142, lon: 13.071 },
        sweref99: { lat: 7038780, lon: 691920 },
      },
      altitude: {
        takeoffMetersAboveSea: 1180,
        heightAboveLandingApproxMeters: 650,
      },
      wind: {
        directionRange: { min: 315, max: 360 },
        notes:
          "Undvik start vid stark sydlig eller sydvästlig vind — risk för rotor från kammen. Termik kan vara ojämn nära kanten.",
      },
      experienceLevel: {
        level: "medel",
        notes: "Medelgod pilot med fjällvana",
      },
      lastUpdated: new Date("2026-02-10"),
    },
    description: [
      "Placerad på norra sidan av Västerskutan med utsikt mot Åredalen. Ger ofta mjukare lyft i nordlig sektor jämfört med sydexponerade startar.",
      "Startytan är lutande med blandad snö och bar mark beroende på årstid. Kontrollera nedslag och snörök vid vinterflygning.",
      "Respektera skidanläggningens gränser och åkande under liftar. Följ klubbens riktlinjer för vintersäsong.",
      "Tillgång via vandringsleder från toppstation eller längs kamlinjen — planera för längre bärväg med full utrustning.",
    ],
    risks: [
      "Kantturbulens vid fel vindvinkel.",
      "Halka och isfläckar tidigt och sent på säsongen.",
      "Begränsade alternativ vid omedelbar återlandning på kammen.",
    ],
    emergency: {
      ...baseEmergency,
      locationInstruction: 'Ange "Åreskutan, Västerskutan nord startplats."',
      position: {
        wgs84: { lat: 63.4142, lon: 13.071 },
        sweref99: { lat: 7038780, lon: 691920 },
      },
    },
  },
  {
    id: "ts-003",
    slug: "morvikshummeln",
    kind: "startplats",
    title: "Mörvikshummeln",
    excerpt:
      "Öppnare sluttning söder om Åre — populär vid stabil vind från sydväst.",
    category: "Startplats",
    updatedAt: "2026-01-08",
    overview: {
      position: {
        wgs84: { lat: 63.3955, lon: 13.102 },
        sweref99: { lat: 7036950, lon: 694050 },
      },
      altitude: {
        takeoffMetersAboveSea: 920,
        heightAboveLandingApproxMeters: 480,
      },
      wind: {
        directionRange: { min: 225, max: 270 },
        notes:
          "Lågning över skog kräver höjd och planering. Morgonflyg ofta mjukt; eftermiddag kan ge stark termik.",
      },
      experienceLevel: {
        level: "nybörjare",
        notes: "Nybörjare till medel under mentorering; medel solo",
      },
      lastUpdated: new Date("2026-01-08"),
    },
    description: [
      "Mörvikshummeln är en mer rymlig start än de brantaste toppstartarna och passar ofta för piloter som bygger fjällvana.",
      "Landningsmöjligheter finns mot dalen men med skog mellan start och fält — säkerställ höjdmarginal.",
      "Hänsyn till skoterled och vinterspår; undvik start när leden är tungt trafikerad.",
      "Parkering vid angiven plats i Mörviken; följ klubbens aktuella vägbeskrivning.",
    ],
    risks: [
      "Skog och telefonledningar i glidbanan.",
      "Svaga lee-effekter vid ostlig vind.",
      "Begränsad sikt i snöväder.",
    ],
    emergency: {
      ...baseEmergency,
      locationInstruction:
        'Ange "Mörvikshummeln, startplats för skärmflyg, Åre."',
      position: {
        wgs84: { lat: 63.3955, lon: 13.102 },
        sweref99: { lat: 7036950, lon: 694050 },
      },
    },
  },
  {
    id: "ts-004",
    slug: "kabinbanans-topp",
    kind: "startplats",
    title: "Kabinbanans topp",
    excerpt:
      "Start i anslutning till kabinbanans övre zon — kort bärväg men trångt vid högsäsong.",
    category: "Startplats",
    updatedAt: "2026-01-20",
    overview: {
      position: {
        wgs84: { lat: 63.411, lon: 13.0755 },
        sweref99: { lat: 7038450, lon: 692200 },
      },
      altitude: {
        takeoffMetersAboveSea: 1270,
        heightAboveLandingApproxMeters: 720,
      },
      wind: {
        directionRange: { min: 150, max: 180 },
        notes:
          "Känslig för turbulens när vind hoppar över kammen. Många åkare — extra vikt vid publika dagar.",
      },
      experienceLevel: { level: "medel", notes: "Medel till avancerad" },
      lastUpdated: new Date("2026-01-20"),
    },
    description: [
      "Praktisk start tack vare närhet till lift, men ytan delas med skidåkande och personal. Start endast när det är förenligt med anläggningens regler.",
      "Kräver snabb och ren uppdragning; undvik att blockera utfarter och kabinstation.",
      "Se klubbens separata anvisningar om samexistens med skidanläggning och eventuella tidsfönster.",
      "Vid dålig sikt eller hård vind — välj annan start eller avbryt.",
    ],
    risks: [
      "Hög puljeffekt vid mycket folk.",
      "Kort glidbana till första säkra höjd över pist.",
      "Kollisionsrisk med skärm/hang i samma sektor.",
    ],
    emergency: {
      ...baseEmergency,
      locationInstruction: 'Ange "Åre kabinbana toppstation, skärmflygstart."',
      position: {
        wgs84: { lat: 63.411, lon: 13.0755 },
        sweref99: { lat: 7038450, lon: 692200 },
      },
    },
  },
  {
    id: "ts-005",
    slug: "tegefjalls-starten",
    kind: "startplats",
    title: "Tegefjäll",
    excerpt:
      "Start i Tegefjällsområdet — annan vindexponering än Åreskutan, bra komplement vid lokal väderlek.",
    category: "Startplats",
    updatedAt: "2026-01-12",
    overview: {
      position: {
        wgs84: { lat: 63.387, lon: 13.054 },
        sweref99: { lat: 7035800, lon: 690600 },
      },
      altitude: {
        takeoffMetersAboveSea: 780,
        heightAboveLandingApproxMeters: 380,
      },
      wind: {
        directionRange: { min: 270, max: 315 },
        notes:
          "Dalvind och solsidetermik på vår och höst. Kontrollera landningsfält i Tegefjäll mot vind och liftlinjer.",
      },
      experienceLevel: {
        level: "nybörjare",
        notes: "Nybörjare till medel (solo medel efter bedömning)",
      },
      lastUpdated: new Date("2026-01-12"),
    },
    description: [
      "Tegefjäll erbjuder ofta mindre extrema höjder än Åreskutan vilket kan passa vid mjukare förhållanden.",
      "Samordna med landning i anvisade områden och undvik att korsa bebyggelse onödigt lågt.",
      "Tänk på att luftrum och eventuella restriktioner kan skilja sig från huvudmassivet — se aktuella NOTAM och klubbinfo.",
    ],
    risks: [
      "Hang och kablar i dalgången.",
      "Varierande vind nära ryggar.",
      "Begränsade alternativ vid nordostlig stormvind.",
    ],
    emergency: {
      ...baseEmergency,
      locationInstruction: 'Ange "Tegefjäll, startplats skärmflyg, Jämtland."',
      position: {
        wgs84: { lat: 63.387, lon: 13.054 },
        sweref99: { lat: 7035800, lon: 690600 },
      },
    },
  },
  {
    id: "ts-006",
    slug: "tvaravalvet",
    kind: "startplats",
    title: "Tväråvalvet",
    excerpt: "Nordvästlig start med god höjd — populär vid NV-vind.",
    category: "Startplats",
    updatedAt: "2026-01-10",
    overview: {
      position: {
        wgs84: { lat: 63.43, lon: 13.0825 },
        sweref99: { lat: 7040550, lon: 692700 },
      },
      altitude: {
        takeoffMetersAboveSea: 1050,
        heightAboveLandingApproxMeters: 925,
      },
      wind: {
        directionRange: { min: 270, max: 330 },
        notes:
          "NV (skärm), V–NV (hängflyg). Bra höjd och bred startyta.",
      },
      experienceLevel: {
        level: "medel",
        notes: "Medel till avancerad",
      },
      lastUpdated: new Date("2026-01-10"),
    },
    description: [
      "Startplats på Tväråvalvet med utsikt mot nordväst. Bred startyta som fungerar bra vid nordvästlig vind.",
      "Nås via markerad led. God höjdskillnad till dalen.",
    ],
    risks: [
      "Rotor vid sydlig vind.",
      "Brant terräng nedanför starten.",
    ],
    emergency: {
      ...baseEmergency,
      locationInstruction: 'Ange "Tväråvalvet, Åreskutan."',
      position: {
        wgs84: { lat: 63.43, lon: 13.0825 },
        sweref99: { lat: 7040550, lon: 692700 },
      },
    },
  },
  {
    id: "ts-007",
    slug: "roda-rappet-vast",
    kind: "startplats",
    title: "Röda Rappet Väst",
    excerpt:
      "Västlig till nordvästlig start — bra komplement vid V-NV vind.",
    category: "Startplats",
    updatedAt: "2026-01-10",
    overview: {
      position: {
        wgs84: { lat: 63.4261, lon: 13.0703 },
        sweref99: { lat: 7040100, lon: 691900 },
      },
      altitude: {
        takeoffMetersAboveSea: 950,
        heightAboveLandingApproxMeters: 570,
      },
      wind: {
        directionRange: { min: 250, max: 315 },
        notes: "V–NV. Skyddad från sydlig vind.",
      },
      experienceLevel: {
        level: "medel",
        notes: "Medel med god fjällerfarenhet",
      },
      lastUpdated: new Date("2026-01-10"),
    },
    description: [
      "Startplats vid Röda Rappet med västlig exponering. Skyddad position.",
      "Bärväg krävs — planera tid och utrustning.",
    ],
    risks: ["Klippig terräng.", "Begränsade nödlandningsytor."],
    emergency: {
      ...baseEmergency,
      locationInstruction: 'Ange "Röda Rappet Väst, Åreskutan."',
      position: {
        wgs84: { lat: 63.4261, lon: 13.0703 },
        sweref99: { lat: 7040100, lon: 691900 },
      },
    },
  },
  {
    id: "ts-008",
    slug: "langspannet",
    kind: "startplats",
    title: "Långspannet",
    excerpt:
      "Syd-sydvästlig start mellan stötta 3 och 4 — ej rekommenderad för nybörjare.",
    category: "Startplats",
    updatedAt: "2026-01-10",
    overview: {
      position: {
        wgs84: { lat: 63.405, lon: 13.08 },
        sweref99: { lat: 7037800, lon: 692500 },
      },
      altitude: {
        takeoffMetersAboveSea: 900,
        heightAboveLandingApproxMeters: 520,
      },
      wind: {
        directionRange: { min: 180, max: 225 },
        notes: "S–SV. Placerad mellan stötta 3 och 4.",
      },
      experienceLevel: {
        level: "avancerad",
        notes: "Avancerad pilot krävs",
      },
      lastUpdated: new Date("2026-01-10"),
    },
    description: [
      "Start mellan kabinbanans stöttor. Kräver precision och erfarenhet.",
      "Ej rekommenderad — används bara i specifika förhållanden.",
    ],
    risks: [
      "Kablar i närheten.",
      "Begränsat utrymme.",
      "Ej rekommenderad.",
    ],
    emergency: {
      ...baseEmergency,
      locationInstruction:
        'Ange "Långspannet, mellan stötta 3 och 4, Åreskutan."',
      position: {
        wgs84: { lat: 63.405, lon: 13.08 },
        sweref99: { lat: 7037800, lon: 692500 },
      },
    },
  },
  {
    id: "ts-009",
    slug: "draklanda",
    kind: "startplats",
    title: "Draklanda",
    excerpt:
      "Officiell landningsplats — 1 km väster om torget i Åre.",
    category: "Startplats",
    updatedAt: "2026-01-10",
    overview: {
      position: {
        wgs84: { lat: 63.398, lon: 13.065 },
        sweref99: { lat: 7037200, lon: 691500 },
      },
      altitude: {
        takeoffMetersAboveSea: 380,
        heightAboveLandingApproxMeters: 0,
      },
      wind: {
        directionRange: { min: 0, max: 360 },
        notes: "Alla vindriktningar. Officiell landningsplats.",
      },
      experienceLevel: {
        level: "nybörjare",
        notes: "Alla nivåer",
      },
      lastUpdated: new Date("2026-01-10"),
    },
    description: [
      "Draklanda är den officiella landningsplatsen, belägen ca 1 km väster om Åre torg.",
      "Alla andra landningar betraktas som utelandningar vid XC-flyg.",
      "Räddningsbåt finns tillgänglig under flygsäsongen.",
    ],
    risks: [
      "Vindbyar vid terrängens kant.",
      "Respektera avspärrningar och annan verksamhet på fältet.",
    ],
    emergency: {
      ...baseEmergency,
      locationInstruction: 'Ange "Draklanda, landningsplats, Åre."',
      position: {
        wgs84: { lat: 63.398, lon: 13.065 },
        sweref99: { lat: 7037200, lon: 691500 },
      },
    },
  },
];

export const sites: TakeoffSite[] = sitesRaw.map((s) => ({
  ...s,
  content: joinDescription(s),
}));

export type Site = TakeoffSite & { imageUrl?: string };
export type Sites = Site[];

export type SiteArea = {
  title: string;
  description: string;
};

export const sitesIntro = {
  title: "Åreskutans start- och landningsområden",
  rules: [
    "Alla väderstreck är orienterade som om Kabinbanan ligger i rak nord-sydlig riktning. Draklanda är den officiella landningsplatsen — alla andra landningar betraktas som utelandningar vid XC-flyg.",
    "Vajrarna passeras söder om Stötta 1 vid nedflyg utan höjdvinst. Nya och halverfarna piloter ska alltid följa denna regel. Vajrarna hänger minimum 60 m ovan mark.",
  ],
  areas: [
    {
      title: "Åreskutan",
      description:
        "Huvudmassivet med de flesta startplatserna. Nås via Kabinbanan eller till fots. Kontrollera alltid aktuell vindprognos och NOTAM innan start.",
    },
    {
      title: "Andra flygområden",
      description:
        "Tegefjäll och Mörvikshummeln erbjuder alternativ vid annan vindexponering. Kontakta klubben för aktuell status på dessa platser.",
    },
    {
      title: "Välliste, Trillevallen",
      description: "V–NV riktning, ~400 m höjdskillnad.",
    },
    {
      title: "Getryggen, Snasahögarna",
      description: "S–SV riktning, ~600 m höjdskillnad.",
    },
    {
      title: "Tossön, Järpen",
      description: "V riktning, ~350 m höjdskillnad.",
    },
    {
      title: "Rännberg, Gevsjön",
      description: "SO riktning, ~250 m höjdskillnad.",
    },
  ] as SiteArea[],
};
