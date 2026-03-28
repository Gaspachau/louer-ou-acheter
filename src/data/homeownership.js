/**
 * Homeownership rates by country — ISO 3166-1 numeric codes
 * Sources: Eurostat (2023), OECD Housing data (2022-2024),
 * UN-Habitat, national statistics offices.
 * ownershipRate = % of households who own their home
 */
export const HOMEOWNERSHIP = {
  4:   { name: "Afghanistan",        rate: 82 },
  8:   { name: "Albanie",            rate: 85 },
  12:  { name: "Algérie",            rate: 70 },
  24:  { name: "Angola",             rate: 57 },
  32:  { name: "Argentine",          rate: 68 },
  36:  { name: "Australie",          rate: 67 },
  40:  { name: "Autriche",           rate: 55 },
  50:  { name: "Bangladesh",         rate: 80 },
  56:  { name: "Belgique",           rate: 71 },
  76:  { name: "Brésil",             rate: 73 },
  100: { name: "Bulgarie",           rate: 83 },
  104: { name: "Myanmar",            rate: 83 },
  116: { name: "Cambodge",           rate: 81 },
  120: { name: "Cameroun",           rate: 53 },
  124: { name: "Canada",             rate: 67 },
  152: { name: "Chili",              rate: 66 },
  156: { name: "Chine",              rate: 90 },
  170: { name: "Colombie",           rate: 55 },
  188: { name: "Costa Rica",         rate: 63 },
  191: { name: "Croatie",            rate: 89 },
  196: { name: "Chypre",             rate: 71 },
  203: { name: "Tchéquie",           rate: 79 },
  208: { name: "Danemark",           rate: 60 },
  218: { name: "Équateur",           rate: 72 },
  818: { name: "Égypte",             rate: 65 },
  233: { name: "Estonie",            rate: 82 },
  246: { name: "Finlande",           rate: 72 },
  250: { name: "France",             rate: 65 },
  266: { name: "Gabon",              rate: 53 },
  276: { name: "Allemagne",          rate: 45 },
  288: { name: "Ghana",              rate: 53 },
  300: { name: "Grèce",              rate: 74 },
  320: { name: "Guatemala",          rate: 78 },
  340: { name: "Honduras",           rate: 67 },
  348: { name: "Hongrie",            rate: 91 },
  356: { name: "Inde",               rate: 87 },
  360: { name: "Indonésie",          rate: 80 },
  364: { name: "Iran",               rate: 80 },
  372: { name: "Irlande",            rate: 70 },
  376: { name: "Israël",             rate: 66 },
  380: { name: "Italie",             rate: 73 },
  384: { name: "Côte d'Ivoire",      rate: 52 },
  392: { name: "Japon",              rate: 62 },
  400: { name: "Jordanie",           rate: 69 },
  404: { name: "Kenya",              rate: 75 },
  410: { name: "Corée du Sud",       rate: 57 },
  414: { name: "Koweït",             rate: 60 },
  422: { name: "Liban",              rate: 67 },
  428: { name: "Lettonie",           rate: 81 },
  440: { name: "Lituanie",           rate: 93 },
  442: { name: "Luxembourg",         rate: 67 },
  458: { name: "Malaisie",           rate: 75 },
  484: { name: "Mexique",            rate: 80 },
  504: { name: "Maroc",              rate: 63 },
  528: { name: "Pays-Bas",           rate: 70 },
  554: { name: "Nouvelle-Zélande",   rate: 65 },
  566: { name: "Nigéria",            rate: 73 },
  578: { name: "Norvège",            rate: 77 },
  586: { name: "Pakistan",           rate: 78 },
  591: { name: "Panama",             rate: 73 },
  604: { name: "Pérou",              rate: 70 },
  608: { name: "Philippines",        rate: 55 },
  616: { name: "Pologne",            rate: 85 },
  620: { name: "Portugal",           rate: 74 },
  630: { name: "Porto Rico",         rate: 68 },
  642: { name: "Roumanie",           rate: 95 },
  643: { name: "Russie",             rate: 89 },
  682: { name: "Arabie Saoudite",    rate: 62 },
  694: { name: "Sierra Leone",       rate: 58 },
  703: { name: "Slovaquie",          rate: 92 },
  705: { name: "Slovénie",           rate: 76 },
  710: { name: "Afrique du Sud",     rate: 54 },
  716: { name: "Zimbabwe",           rate: 78 },
  724: { name: "Espagne",            rate: 75 },
  752: { name: "Suède",              rate: 64 },
  756: { name: "Suisse",             rate: 36 },
  762: { name: "Tadjikistan",        rate: 88 },
  764: { name: "Thaïlande",          rate: 73 },
  780: { name: "Trinité-et-Tobago",  rate: 77 },
  788: { name: "Tunisie",            rate: 71 },
  792: { name: "Turquie",            rate: 57 },
  800: { name: "Ouganda",            rate: 81 },
  804: { name: "Ukraine",            rate: 90 },
  826: { name: "Royaume-Uni",        rate: 65 },
  840: { name: "États-Unis",         rate: 65 },
  858: { name: "Uruguay",            rate: 60 },
  860: { name: "Ouzbékistan",        rate: 87 },
  862: { name: "Venezuela",          rate: 80 },
  704: { name: "Viêt Nam",           rate: 80 },
  887: { name: "Yémen",              rate: 83 },
  894: { name: "Zambie",             rate: 60 },
};

/** Color scale: dark blue (high ownership) → teal (low ownership) */
export function ownershipColor(rate) {
  if (rate == null) return "#e2e8f2"; // no data — light gray
  if (rate >= 88) return "#1e3a8a";  // dark navy
  if (rate >= 80) return "#1a56db";  // blue
  if (rate >= 72) return "#2563eb";  // medium blue
  if (rate >= 64) return "#3b82f6";  // light blue
  if (rate >= 56) return "#60a5fa";  // sky blue
  if (rate >= 48) return "#38bdf8";  // cyan-blue
  return "#0d9488";                  // teal (< 48%)
}

export const FRANCE_RATE = HOMEOWNERSHIP[250].rate;

export const COLOR_LEGEND = [
  { min: 88, max: 100, color: "#1e3a8a", label: "≥ 88 %" },
  { min: 80, max: 87,  color: "#1a56db", label: "80–87 %" },
  { min: 72, max: 79,  color: "#2563eb", label: "72–79 %" },
  { min: 64, max: 71,  color: "#3b82f6", label: "64–71 %" },
  { min: 56, max: 63,  color: "#60a5fa", label: "56–63 %" },
  { min: 48, max: 55,  color: "#38bdf8", label: "48–55 %" },
  { min: 0,  max: 47,  color: "#0d9488", label: "< 48 %" },
];
