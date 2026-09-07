export const navigation = {
  sections: [
    { label: 'Hem', path: '/', children: [] },
    {
      label: 'Flyga i Åre',
      path: '/flyga-i-are',
      children: [
        { label: 'Säkerhet / Nödsituation', path: '/flyga-i-are/sakerhet' },
        { label: 'Cross country flygning', path: '/flyga-i-are/xc' },
        { label: 'Flygregler', path: '/flyga-i-are/flygregler' },
        { label: 'Samarbetsavtalet Skistar', path: '/flyga-i-are/skistar' },
        { label: 'Acro flygning', path: '/flyga-i-are/acro' },
        { label: 'Väder', path: '/flyga-i-are/vader' },
        { label: 'Speedrider', path: '/flyga-i-are/speedrider' },
        { label: 'Starter & landningar', path: '/flyga-i-are/startplatser' },
        { label: 'Hängflyg', path: '/flyga-i-are/hangflyg' },
        { label: 'Klubbuss & räddningsbåt', path: '/flyga-i-are/klubbuss' },
        { label: 'Paramotor', path: '/flyga-i-are/paramotor' },
      ],
    },
    { label: 'Nyheter', path: '/nyheter', children: [] },
    {
      label: 'Aktiviteter',
      path: '/aktiviteter',
      children: [
        { label: 'Kalender', path: '/aktiviteter/kalender' },
        { label: 'Klubbresor', path: '/aktiviteter/klubbresor' },
        { label: 'Årsmöten', path: '/aktiviteter/arsmoten' },
        { label: 'Övriga klubbaktiviteter', path: '/aktiviteter/ovriga-aktiviteter' },
      ],
    },
    {
      label: 'Tävling',
      path: '/tavlingar',
      children: [
        { label: 'Åre PPC', path: '/tavlingar/are-ppc' },
        { label: 'Topplandning', path: '/tavlingar/topplandning' },
        { label: 'Sverige Cup', path: '/tavlingar/sverige-cup' },
        { label: 'Övriga tävlingar', path: '/tavlingar/ovriga-tavlingar' },
        { label: 'Tävlingsstipendium', path: '/tavlingar/stipendium' },
      ],
    },
    {
      label: 'Om klubben',
      path: '/om',
      children: [
        { label: 'Historia & nutid', path: '/om' },
        { label: 'Kontakt', path: '/kontakt' },
        { label: 'Styrelsen', path: '/om/styrelsen' },
        { label: 'Klubbprodukter', path: '/om/klubbprodukter' },
        { label: 'Klubbens stadgar', path: '/om/stadgar' },
        { label: 'Bli medlem', path: '/bli-medlem' },
      ],
    },
    {
      label: 'Övrigt',
      path: '/ovrigt',
      children: [
        { label: 'Foton', path: '/ovrigt/foton' },
        { label: 'Skärmflygförbundet', path: 'https://www.paragliding.se', external: true },
        { label: 'Dokumentarkiv', path: '/ovrigt/dokument' },
      ],
    },
  ],
};

export type NavSection = (typeof navigation.sections)[number];
export type NavChild = NavSection['children'][number];
