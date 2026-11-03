// Alla länkar är pekade mot Åre-området där tjänsten tillåter det.
// Generiska rotadresser (Windguru, XCMeteo) saknar verifierad Åre-spot
// och lämnas som verktygslänkar att söka från.
export const weatherLinks = [
  {
    label: "SMHI — Åre",
    url: "https://www.smhi.se/q/%C3%85re/2726586",
  },
  {
    label: "Yr.no Åreskutan",
    url: "https://www.yr.no/nb/detaljer/tabell/2-2720396/",
  },
  {
    label: "Windy — Åre",
    url: "https://www.windy.com/?63.395,13.080,11",
  },
  {
    label: "MEAC Hummeln (live-sensor)",
    url: "https://meac.se/sub_2/hummeln/wind.asp",
  },
  {
    label: "TAF/METAR Frösön (närmsta flygplats)",
    url: "https://www.aro.lfv.se/Links/Link/ViewLink?TorLinkId=314&type=MET",
  },
  {
    label: "MetOffice Isobarer (Nordsjön/Skandinavien)",
    url: "https://www.metoffice.gov.uk/weather/maps-and-charts/surface-pressure",
  },
  { label: "XCMeteo", url: "https://xcmeteo.com/" },
  { label: "Windguru", url: "https://www.windguru.cz/" },
];
