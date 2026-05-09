export const articles = [
  {
    id: "101",
    title: "Starter och landningar",
    slug: "starter-och-landningar",
    excerpt: "Information om etablerade start- och landningsplatser, lokala förhållanden och tips för trygg takeoff och säkra landningar.",
    content:
      "Här samlas information om klubbens rekommenderade start- och landningsplatser. Varje plats har sina egna förutsättningar vad gäller vind, terräng och risker.\n\nInnan flygning ska du alltid kontrollera aktuell information för den startplats du planerar att använda och ta hänsyn till rådande väder och trafik.",
    category: "flygning",
    updatedAt: "2026-02-20",
  },
  {
    id: "102",
    title: "Väder och vind",
    slug: "vader-och-vind",
    excerpt: "Råd om hur man tolkar väder, vindriktningar och termik i Årefjällen. Viktigt för att planera flygning och hålla säkerheten hög.",
    content:
      "Fjällmiljön runt Åre kan ge snabba väderomslag och lokala vindeffekter. Termik, rotor och dalvindar kan uppstå även under till synes stabila dagar.\n\nNoggrann väderbedömning och goda marginaler är avgörande för säker flygning.",
    category: "flygning",
    updatedAt: "2026-02-20",
  },
  {
    id: "103",
    title: "Säkerhet och regler",
    slug: "sakerhet-och-regler",
    excerpt: "Lokala regler, nationella bestämmelser och säkerhetsrutiner för skärm- och drakflyg. Fokus på ansvar och förebyggande åtgärder.",
    content:
      "Säker flygning bygger på rätt utbildning, fungerande utrustning och gott omdöme. Flyg alltid inom din egen förmåga och avbryt vid osäkerhet.\n\nKlubben rekommenderar att du regelbundet tränar säkerhetsmoment och håller dig uppdaterad på gällande regler.",
    category: "sakerhet",
    updatedAt: "2026-02-20",
  },
  {
    id: "104",
    title: "Nödinformation",
    slug: "nodinformation",
    excerpt: "Vad man gör vid incidenter, nödsignalering och viktiga kontaktvägar till räddningstjänst och klubb.",
    content:
      "Vid olycka eller allvarlig incident ska räddningstjänst kontaktas via 112. Ange tydlig platsinformation och vilken typ av olycka det gäller.\n\nInformera även klubben så snart som möjligt efter händelsen.",
    category: "sakerhet",
    updatedAt: "2026-02-20",
  },
  {
    id: "105",
    title: "Luftrum",
    slug: "luftrum-are",
    excerpt: "Information om kontrollerade och obevakade luftrum, restriktioner och hur man flyger säkert bland andra luftfarkoster.",
    content:
      "Åreområdet ligger i närhet till både kontrollerat och okontrollerat luftrum. Det är varje pilots ansvar att känna till gällande luftrumsstruktur och eventuella tillfälliga restriktioner.\n\nKontrollera alltid aktuell luftrumsinformation före flygning och respektera angivna höjdgränser.",
    category: "regler",
    updatedAt: "2026-02-20",
  },
  {
    id: "106",
    title: "Klubbussen",
    slug: "klubbussen",
    excerpt: "Allt om klubbens buss: transport av piloter och utrustning, planering av turer och hur man använder den på ett säkert sätt.",
    content:
      "Klubbussen används för transport till startplatser vid gemensamma flygdagar.\n\nRegler:\n• Fullvärdigt medlemskap krävs\n• Max 4 passagerare + 1 förare\n• Passageraravgift: 20 kr per tur (Swish till föraren)\n• Ungdomar under 18: gratis (kräver 3+ betalande passagerare)\n• Max 40 km/h på Skistarvägar\n• Ingen uppkörning när liftar körs för cykling\n• Tanka vid OK/Q8 Åre (klubbkort i kassan)\n• Föraren kontrollerar olja/vatten vid varje tankning\n• Dagsutflykter max 20 mil (längre kräver styrelsebeslut)\n• Fyll i loggboken, lås Skistargrinden efter nedkörning",
    category: "klubb",
    updatedAt: "2026-02-20",
  },
];

export type Article = (typeof articles)[number] & { imageUrl?: string };
export type Articles = Article[];
