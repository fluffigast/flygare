export const articles = [
  {
    id: "101",
    title: "Starter och landningar i Åre",
    slug: "starter-och-landningar",
    excerpt: "Översikt av etablerade start- och landningsplatser i Åreområdet.",
    content:
      "Här samlas information om klubbens rekommenderade start- och landningsplatser. Varje plats har sina egna förutsättningar vad gäller vind, terräng och risker.\n\nInnan flygning ska du alltid kontrollera aktuell information för den startplats du planerar att använda och ta hänsyn till rådande väder och trafik.",
    category: "flygning",
    updatedAt: "2026-02-20",
  },
  {
    id: "102",
    title: "Luftrum i Åreområdet",
    slug: "luftrum-are",
    excerpt:
      "Viktig information om luftrum, restriktioner och höjdbegränsningar.",
    content:
      "Åreområdet ligger i närhet till både kontrollerat och okontrollerat luftrum. Det är varje pilots ansvar att känna till gällande luftrumsstruktur och eventuella tillfälliga restriktioner.\n\nKontrollera alltid aktuell luftrumsinformation före flygning och respektera angivna höjdgränser.",
    category: "regler",
    updatedAt: "2026-02-20",
  },
  {
    id: "103",
    title: "Väder och lokala vindar",
    slug: "vader-och-vind",
    excerpt: "Så påverkar väder och vind flygning i fjällmiljö.",
    content:
      "Fjällmiljön runt Åre kan ge snabba väderomslag och lokala vindeffekter. Termik, rotor och dalvindar kan uppstå även under till synes stabila dagar.\n\nNoggrann väderbedömning och goda marginaler är avgörande för säker flygning.",
    category: "flygning",
    updatedAt: "2026-02-20",
  },
  {
    id: "104",
    title: "Säkerhet och ansvar",
    slug: "sakerhet-och-ansvar",
    excerpt: "Grundläggande säkerhetsprinciper för flygning i Åre.",
    content:
      "Säker flygning bygger på rätt utbildning, fungerande utrustning och gott omdöme. Flyg alltid inom din egen förmåga och avbryt vid osäkerhet.\n\nKlubben rekommenderar att du regelbundet tränar säkerhetsmoment och håller dig uppdaterad på gällande regler.",
    category: "sakerhet",
    updatedAt: "2026-02-20",
  },
  {
    id: "105",
    title: "Nödinformation",
    slug: "nodinformation",
    excerpt: "Vad du ska göra vid olycka eller incident.",
    content:
      "Vid olycka eller allvarlig incident ska räddningstjänst kontaktas via 112. Ange tydlig platsinformation och vilken typ av olycka det gäller.\n\nInformera även klubben så snart som möjligt efter händelsen.",
    category: "sakerhet",
    updatedAt: "2026-02-20",
  },
  {
    id: "106",
    title: "Klubbbussen",
    slug: "klubbbussen",
    excerpt: "Information om klubbens buss och hur den används.",
    content:
      "Klubbbussen används för transport till startplatser vid gemensamma flygdagar.\n\nRegler:\n• Fullvärdigt medlemskap krävs\n• Max 4 passagerare + 1 förare\n• Passageraravgift: 20 kr per tur (Swish till föraren)\n• Ungdomar under 18: gratis (kräver 3+ betalande passagerare)\n• Max 40 km/h på Skistarvägar\n• Ingen uppkörning när liftar körs för cykling\n• Tanka vid OK/Q8 Åre (klubbkort i kassan)\n• Föraren kontrollerar olja/vatten vid varje tankning\n• Dagsutflykter max 20 mil (längre kräver styrelsebeslut)\n• Fyll i loggboken, lås Skistargrinden efter nedkörning",
    category: "klubb",
    updatedAt: "2026-02-20",
  },
  {
    id: "107",
    title: "Etik och hänsyn",
    slug: "etik-och-hansyn",
    excerpt: "Så visar vi respekt på marken och i luften.",
    content:
      "Flygning i Åre sker i områden som delas med andra friluftsutövare. Visa alltid hänsyn till markägare, vandrare och andra som vistas i området.\n\nEtt respektfullt uppträdande är avgörande för att vi ska kunna fortsätta flyga här.",
    category: "regler",
    updatedAt: "2026-02-20",
  },
  {
    id: "108",
    title: "Flygning i fjällmiljö",
    slug: "fjallflygning",
    excerpt: "Särskilda förutsättningar för flygning i fjäll.",
    content:
      "Fjällflygning ställer högre krav på planering och beslutsfattande. Terräng, väder och begränsade landningsalternativ måste alltid vägas in.\n\nFlyg konservativt och prioritera säkerhet framför prestation.",
    category: "flygning",
    updatedAt: "2026-02-20",
  },
];

export type Article = (typeof articles)[number] & { imageUrl?: string };
export type Articles = Article[];
