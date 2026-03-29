/**
 * Données 2026 pour 10 grandes villes françaises
 * Sources : Notaires de France, CLAMEUR, INSEE, Meilleurs Agents
 * Référence : appartement T2 ~50 m²
 */
export const CITIES = {
  paris: {
    id: "paris", name: "Paris", emoji: "🗼", region: "Île-de-France",
    pricePerM2: 9800,     // €/m² médian (Notaires, T1 2026 — correction des prix)
    rentT2: 1500,         // loyer mensuel charges comprises T2 50m²
    taxeFonciere: 2300,   // taxe foncière annuelle (hausses 2025-2026)
    chargesCopro: 185,    // charges copro mensuelles (quote-part)
    salaryMedian: 2800,   // salaire médian net mensuel (INSEE 2024)
    appreciationRate: 2.0,// +%/an historique 10 ans
    notaryPct: 8,         // frais de notaire % (ancien)
    surfaceRef: 50,
    market: "vendeur",    // tendance du marché
    rentIndexGrowth: 1.8, // hausse IRL locale
  },
  lyon: {
    id: "lyon", name: "Lyon", emoji: "🦁", region: "Auvergne-Rhône-Alpes",
    pricePerM2: 4600,
    rentT2: 950,
    taxeFonciere: 1480,
    chargesCopro: 140,
    salaryMedian: 2350,
    appreciationRate: 2.5,
    notaryPct: 8,
    surfaceRef: 50,
    market: "equilibre",
    rentIndexGrowth: 1.7,
  },
  marseille: {
    id: "marseille", name: "Marseille", emoji: "☀️", region: "Provence-Alpes-Côte d'Azur",
    pricePerM2: 3400,
    rentT2: 820,
    taxeFonciere: 1100,
    chargesCopro: 120,
    salaryMedian: 2050,
    appreciationRate: 2.8,
    notaryPct: 8,
    surfaceRef: 50,
    market: "acheteur",
    rentIndexGrowth: 1.5,
  },
  bordeaux: {
    id: "bordeaux", name: "Bordeaux", emoji: "🍷", region: "Nouvelle-Aquitaine",
    pricePerM2: 4200,
    rentT2: 880,
    taxeFonciere: 1320,
    chargesCopro: 130,
    salaryMedian: 2250,
    appreciationRate: 1.8,
    notaryPct: 8,
    surfaceRef: 50,
    market: "equilibre",
    rentIndexGrowth: 1.6,
  },
  nantes: {
    id: "nantes", name: "Nantes", emoji: "🏰", region: "Pays de la Loire",
    pricePerM2: 3900,
    rentT2: 820,
    taxeFonciere: 1270,
    chargesCopro: 125,
    salaryMedian: 2200,
    appreciationRate: 2.2,
    notaryPct: 8,
    surfaceRef: 50,
    market: "equilibre",
    rentIndexGrowth: 1.6,
  },
  toulouse: {
    id: "toulouse", name: "Toulouse", emoji: "🌸", region: "Occitanie",
    pricePerM2: 3600,
    rentT2: 800,
    taxeFonciere: 1170,
    chargesCopro: 120,
    salaryMedian: 2150,
    appreciationRate: 2.3,
    notaryPct: 8,
    surfaceRef: 50,
    market: "acheteur",
    rentIndexGrowth: 1.5,
  },
  lille: {
    id: "lille", name: "Lille", emoji: "🏟️", region: "Hauts-de-France",
    pricePerM2: 3200,
    rentT2: 760,
    taxeFonciere: 1080,
    chargesCopro: 110,
    salaryMedian: 2150,
    appreciationRate: 1.9,
    notaryPct: 8,
    surfaceRef: 50,
    market: "acheteur",
    rentIndexGrowth: 1.5,
  },
  strasbourg: {
    id: "strasbourg", name: "Strasbourg", emoji: "🥨", region: "Grand Est",
    pricePerM2: 3500,
    rentT2: 780,
    taxeFonciere: 1120,
    chargesCopro: 115,
    salaryMedian: 2200,
    appreciationRate: 1.8,
    notaryPct: 8,
    surfaceRef: 50,
    market: "equilibre",
    rentIndexGrowth: 1.5,
  },
  nice: {
    id: "nice", name: "Nice", emoji: "🌊", region: "Provence-Alpes-Côte d'Azur",
    pricePerM2: 5200,
    rentT2: 1030,
    taxeFonciere: 1640,
    chargesCopro: 150,
    salaryMedian: 2300,
    appreciationRate: 2.4,
    notaryPct: 8,
    surfaceRef: 50,
    market: "vendeur",
    rentIndexGrowth: 1.7,
  },
  rennes: {
    id: "rennes", name: "Rennes", emoji: "⚓", region: "Bretagne",
    pricePerM2: 3700,
    rentT2: 790,
    taxeFonciere: 1220,
    chargesCopro: 120,
    salaryMedian: 2200,
    appreciationRate: 2.1,
    notaryPct: 8,
    surfaceRef: 50,
    market: "equilibre",
    rentIndexGrowth: 1.6,
  },
};

export const CITY_LIST = Object.values(CITIES);

/** Données historiques d'indice de prix (base 100 = 2010) */
export const PRICE_INDEX = {
  2010: 100, 2011: 104, 2012: 106, 2013: 105, 2014: 103,
  2015: 104, 2016: 106, 2017: 110, 2018: 115, 2019: 120,
  2020: 124, 2021: 132, 2022: 143, 2023: 140, 2024: 138,
  2025: 140, 2026: 142,
};

/** Multiplieur historique par ville (vs indice national) */
export const CITY_INDEX_MULTIPLIER = {
  paris: 1.35, lyon: 1.20, marseille: 0.90, bordeaux: 1.15,
  nantes: 1.10, toulouse: 1.05, lille: 0.95, strasbourg: 0.95,
  nice: 1.25, rennes: 1.10,
};

/** Valeurs par défaut pour la simulation principale selon la ville choisie */
export function getDefaultsForCity(cityId) {
  const c = CITIES[cityId];
  if (!c) return null;
  return {
    city: cityId,
    monthlyRent: c.rentT2,
    annualPropertyTax: c.taxeFonciere,
    annualInsurance: Math.round(c.rentT2 * 0.2),      // ~20% du loyer/an
    purchasePrice: c.pricePerM2 * c.surfaceRef,
    downPayment: Math.round(c.pricePerM2 * c.surfaceRef * 0.15),
    appreciationRate: c.appreciationRate,
    annualRentIncrease: c.rentIndexGrowth,
  };
}
