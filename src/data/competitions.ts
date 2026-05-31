export const competitions = [
  {
    name: "Åre PPC",
    status: "Aktiv",
    subtitle: "PoängPlockarCupen",
    description:
      "Klubbens egna tävlingsserie som pågår under hela flygsäsongen. Cylinder 400 m radie. GPS-loggning sker på flightlog.org. Poäng tilldelas per flygning inom cylindern. Tävlingen är öppen för alla klubbmedlemmar.",
    rules: [
      "Cylinder 400 m radie",
      "GPS-loggning på flightlog.org",
      "Poäng per flygning",
      "Öppen för alla klubbmedlemmar",
    ],
  },
  {
    name: "Topplandning",
    status: "Aktiv",
    subtitle: "Första termiken på säsongen",
    description:
      "Vem landar först på toppen med termik? Tradition sedan länge. Grön zon och rosa landningsområde markerat. Vinnaren belönas med en flaska Moët. Endast klubbmedlemmar får delta.",
    rules: [
      "Grön zon — giltigt topplandningsområde",
      "Rosa landningsområde markerat",
      "Moët-pris till vinnaren",
      "Endast klubbmedlemmar",
    ],
    winners: [
      { year: 2025, name: "Vinnare av Pilot 2 topplandningstävlingen" },
      { year: 2020, name: "Love Lundgren", result: "10 mars" },
      { year: 2019, name: "Andreas Florén", result: "26 mars" },
    ],
  },
  {
    name: "Larsa Open",
    status: "Aktiv",
    subtitle: "Fridistanstävling till Lars-Anders Jonssons minne",
    description:
      "Årlig fridistanstävling till Lars-Anders Jonssons minne. Längsta flygning under säsongen vinner. GPS-loggning krävs. Öppen för alla discipliner — skärm, hängflyg och paramotor.",
    rules: [
      "Fridistanstävling — längsta flygning under säsongen",
      "GPS-loggning krävs",
      "Öppen för alla discipliner (skärm, hängflyg, paramotor)",
      "Tävlingsstipendium kan sökas från klubben",
    ],
    winners: [
      { year: 2020, name: "Gillis Bengtsson", result: "99,0 km" },
      { year: 2019, name: "Andreas Florén", result: "46,1 km" },
      { year: 2018, name: "Patrik Nietlisbach", result: "91,1 km" },
    ],
  },
] as const;

export type Competition = (typeof competitions)[number];
