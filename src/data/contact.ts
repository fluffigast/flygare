export const contactInfo = {
  email: "info@flygare.nu",
  facebook: {
    label: "Facebook",
    url: "https://www.facebook.com/groups/48461420739/",
  },
  youtube: {
    label: "YouTube",
    url: "https://www.youtube.com/channel/UCQeXyEgUI2Z1y4fl1iiXIlQ",
  },
  radioFrequencies: [
    { label: "Lokalt & vid distans, Lyssning & Sändning", value: "146.7625 MHz" },
    { label: "Repeater Lyssning", value: "146.7625 MHz" },
    { label: "Repeater Sändning", value: "150.7625 MHz" },
    { label: "Öppningston", value: "67,0 Hz" },
    { label: "Kanaldelning", value: "25 kHz" },
  ],
  emergencyContacts: [
    { label: "112 SOS Alarm", description: "Akutvård: allvarlig sjukdom eller skada. Kan även stänga av ström i kontaktledningar.", phone: "112" },
    { label: "1177 Vårdguiden", description: "Lindrigt skadad eller behöver råd om vård. www.1177.se", phone: "1177" },
    {
      label: "Frösötornet, Trafikledningen",
      description: "Ring om du tänker passera in på TMA (öster om Järpen)",
      phone: "+46 63 19 30 70",
    },
    {
      label: "Trafikverket Driftcentral Ånge",
      description: "Leder tågtrafiken, kan stänga av strömmen i kontaktledningarna",
      phone: "+46 690 523 20",
    },
    {
      label: "Tornet (ATS Östersund)",
      description: "XC-klarering, samordning innan start",
      phone: "08-511 886 17",
    },
    {
      label: "WS ATCC",
      description: "Fallback om tornet inte svarar trots öppet NOTAM",
      phone: "08-858 547 00",
    },
  ],
};
