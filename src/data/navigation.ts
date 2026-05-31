export const navigation = {
  sections: [
    { label: 'Hem', path: '/', children: [] },
    {
      label: 'Flyga i Åre',
      path: '/flyga-i-are',
      children: [
        { label: 'Starter & landningar', path: '/flyga-i-are/startplatser' },
        { label: 'Väder', path: '/flyga-i-are/vader' },
        { label: 'Flygregler', path: '/flyga-i-are/flygregler' },
        { label: 'Säkerhet & nödsituation', path: '/flyga-i-are/sakerhet' },
        { label: 'Cross country & luftrum', path: '/flyga-i-are/xc' },
        { label: 'Acro', path: '/flyga-i-are/acro' },
        { label: 'Speedrider', path: '/flyga-i-are/speedrider' },
        { label: 'Hängflyg', path: '/flyga-i-are/hangflyg' },
        { label: 'Paramotor', path: '/flyga-i-are/paramotor' },
        { label: 'Klubbuss & räddningsbåt', path: '/flyga-i-are/klubbuss' },
      ],
    },
    { label: 'Nyheter', path: '/nyheter', children: [] },
    { label: 'Aktiviteter', path: '/aktiviteter', children: [] },
    { label: 'Flygregler', path: '/flyga-i-are/flygregler', children: [] },
    {
      label: 'Om klubben',
      path: '/om',
      children: [
        { label: 'Historia & nutid', path: '/om' },
        { label: 'Styrelsen', path: '/om/styrelsen' },
        { label: 'Kontakt', path: '/kontakt' },
        { label: 'Klubbprodukter', path: '/om/klubbprodukter' },
        { label: 'Stadgar', path: '/om/stadgar' },
        { label: 'Bli medlem', path: '/bli-medlem' },
      ],
    },
    {
      label: 'Övrigt',
      path: '/ovrigt',
      children: [
        { label: 'Foton', path: '/ovrigt/foton' },
        { label: 'Dokumentarkiv', path: '/ovrigt/dokument' },
        { label: 'Skärmflygförbundet', path: 'https://www.paragliding.se', external: true },
      ],
    },
  ],
};

export type NavSection = (typeof navigation.sections)[number];
export type NavChild = NavSection['children'][number];
