export const competitions = [
  {
    name: "Åre PPC",
    status: "Aktiv",
    subtitle: "PoängPlockarCupen",
    description:
      "Klubbens egna tävlingsserie som pågår under hela flygsäsongen.",
  },
  {
    name: "Larsa Open",
    status: "Aktiv",
    subtitle: "Fridistanstävling till Lars-Anders Jonssons minne",
    description: "Årlig distanstävling. Längsta flygning under säsongen vinner.",
    winners: [
      { year: 2020, name: "Gillis Bengtsson", result: "99,0 km" },
      { year: 2019, name: "Andreas Florén", result: "46,1 km" },
      { year: 2018, name: "Patrik Nietlisbach", result: "91,1 km" },
    ],
  },
  {
    name: "Topplandning",
    status: "Aktiv",
    subtitle: "Första termiken på säsongen",
    description:
      "Vem landar först på toppen med termik? Tradition sedan länge.",
    winners: [
      { year: 2020, name: "Love Lundgren", result: "10 mars" },
      { year: 2019, name: "Andreas Florén", result: "26 mars" },
    ],
  },
] as const;

export type Competition = (typeof competitions)[number];
