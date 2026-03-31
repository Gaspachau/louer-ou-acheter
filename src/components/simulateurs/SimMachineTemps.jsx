import { useMemo, useState } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import SimLayout from "./SimLayout";
import CityPicker from "../CityPicker";
import { CITY_LIST, PRICE_INDEX, CITY_INDEX_MULTIPLIER } from "../../data/cityData";

const fmtCur = (v) => new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(v);

const YEARS = Object.keys(PRICE_INDEX).map(Number).filter((y) => y <= 2023);

function calc({ cityId, yearBought, surface, investReturn }) {
  const city = CITY_LIST.find((c) => c.id === cityId);
  if (!city) return null;

  const multiplier = CITY_INDEX_MULTIPLIER[cityId] ?? 1;
  const currentIndex = PRICE_INDEX[2026];
  const pastIndex = PRICE_INDEX[yearBought];

  // Price at time of purchase
  const currentPricePerM2 = city.pricePerM2;
  const pastPricePerM2 = Math.round(currentPricePerM2 * (pastIndex / currentIndex) / multiplier * multiplier);
  const prixAchat = pastPricePerM2 * surface;
  const fraisNotaire = prixAchat * 0.08;
  const apport = Math.round(prixAchat * 0.15);
  const emprunt = prixAchat + fraisNotaire - apport;
  const rate = yearBought < 2015 ? 3.2 : yearBought < 2020 ? 1.8 : yearBought < 2022 ? 1.2 : 3.0;
  const monthlyRate = rate / 100 / 12;
  const n = 20 * 12;
  const mensualite = (emprunt * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -n));

  // Current value
  const currentValue = city.pricePerM2 * surface;
  const yearsOwned = 2026 - yearBought;
  const monthsOwned = Math.min(yearsOwned * 12, n);

  // Remaining balance
  let balance = emprunt;
  for (let m = 0; m < monthsOwned; m++) {
    const interest = balance * monthlyRate;
    balance = Math.max(0, balance - (mensualite - interest));
  }

  // Owner net worth
  const saleValue = currentValue * 0.95; // 5% frais revente
  const ownerWorth = saleValue - balance;

  // Renter alternative: invested apport + frais + monthly diff
  const rentAtBuy = city.rentT2 * (surface / city.surfaceRef);
  const charges = (city.taxeFonciere + prixAchat * 0.01 + 300) / 12;
  const totalOwnerMonthly = mensualite + charges;
  const monthlyDiff = Math.max(0, totalOwnerMonthly - rentAtBuy);
  const investMonthly = investReturn / 100 / 12;

  let renterPortfolio = apport + fraisNotaire;
  for (let m = 0; m < monthsOwned; m++) {
    const yr = Math.floor(m / 12);
    const currentRent = rentAtBuy * Math.pow(1.015, yr);
    const surplus = Math.max(0, totalOwnerMonthly - currentRent);
    renterPortfolio = renterPortfolio * (1 + investMonthly) + surplus;
  }

  // Timeline data
  const timelineData = [];
  let bal = emprunt;
  let rent = renterPortfolio * 0;
  let rentPf = apport + fraisNotaire;
  for (let y = 0; y <= yearsOwned; y++) {
    const propVal = pastPricePerM2 * surface * (PRICE_INDEX[yearBought + y] ?? currentIndex) / pastIndex * multiplier / multiplier;
    const monthsP = Math.min(y * 12, n);
    let b = emprunt;
    for (let m = 0; m < monthsP; m++) {
      const i = b * monthlyRate;
      b = Math.max(0, b - (mensualite - i));
    }
    let rp = apport + fraisNotaire;
    for (let m = 0; m < monthsP; m++) {
      const yr2 = Math.floor(m / 12);
      const cr = rentAtBuy * Math.pow(1.015, yr2);
      const s = Math.max(0, totalOwnerMonthly - cr);
      rp = rp * (1 + investMonthly) + s;
    }
    timelineData.push({
      year: yearBought + y,
      achat: Math.round(propVal * 0.95 - b),
      location: Math.round(rp),
    });
  }

  return {
    prixAchat, apport, emprunt, mensualite, ownerWorth, renterPortfolio,
    advantage: ownerWorth - renterPortfolio,
    pastPricePerM2, currentPricePerM2, rate, timelineData, yearsOwned,
    plusValue: currentValue - prixAchat,
  };
}

function ChartTip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="chart-tooltip">
      <p style={{ fontWeight: 700, marginBottom: 4 }}>{label}</p>
      {payload.map((p) => (
        <div key={p.dataKey} className="chart-tooltip-row">
          <span style={{ color: p.stroke }}>{p.name}</span>
          <span>{fmtCur(p.value)}</span>
        </div>
      ))}
    </div>
  );
}

export default function SimMachineTemps() {
  const [cityId, setCityId] = useState("lyon");
  const [yearBought, setYearBought] = useState(2018);
  const [surface, setSurface] = useState(50);
  const [investReturn, setInvestReturn] = useState(3.5);

  const saveValues = { cityId, yearBought, surface, investReturn };
  const handleRestore = (v) => {
    if (v.cityId) setCityId(v.cityId);
    if (v.yearBought) setYearBought(v.yearBought);
    if (v.surface) setSurface(v.surface);
    if (v.investReturn) setInvestReturn(v.investReturn);
  };

  const res = useMemo(() => calc({ cityId, yearBought, surface, investReturn }), [cityId, yearBought, surface, investReturn]);

  const isBuyingBetter = res && res.advantage >= 0;
  const heroColor = isBuyingBetter ? "green" : "amber";

  return (
    <SimLayout
      icon="⏳"
      title="Machine à remonter le temps"
      description="Et si vous aviez acheté en 2010, 2015 ou 2018 ? Calculez le gain ou la perte réelle selon la date et la ville."
      simTime="1 min"
      saveValues={saveValues}
      onRestore={handleRestore}
    >
      <div className="sim-layout">
        <div className="sim-card">
          <p className="sim-card-legend">Paramètres de la simulation historique</p>

          <CityPicker cityId={cityId} onChange={setCityId} label="Ville d'achat hypothétique" />

          <div className="field">
            <label className="field-label">Année d'achat hypothétique</label>
            <div className="horizon-box" style={{ marginTop: 8 }}>
              <div className="horizon-row">
                <p className="horizon-explain">Quelle année auriez-vous acheté ?</p>
                <strong className="horizon-value">{yearBought}</strong>
              </div>
              <input type="range" min="2010" max="2023" step="1" value={yearBought}
                onChange={(e) => setYearBought(Number(e.target.value))}
                style={{ "--range-pct": `${((yearBought - 2010) / (2023 - 2010)) * 100}%` }} />
              <div className="horizon-ticks"><span>2010</span><span>2016</span><span>2023</span></div>
            </div>
          </div>

          <div className="field" style={{ marginTop: 16 }}>
            <label className="field-label">Surface du bien</label>
            <div className="horizon-box" style={{ marginTop: 8 }}>
              <div className="horizon-row">
                <p className="horizon-explain">En m²</p>
                <strong className="horizon-value">{surface} m²</strong>
              </div>
              <input type="range" min="20" max="120" step="5" value={surface}
                onChange={(e) => setSurface(Number(e.target.value))}
                style={{ "--range-pct": `${((surface - 20) / (120 - 20)) * 100}%` }} />
              <div className="horizon-ticks"><span>20 m²</span><span>70 m²</span><span>120 m²</span></div>
            </div>
          </div>

          {res && (
            <div className="sim-info-box" style={{ marginTop: 16 }}>
              <p className="sim-info-title">📊 Données historiques reconstituées</p>
              <p className="sim-info-body">
                Prix estimé en {yearBought} à {CITY_LIST.find(c=>c.id===cityId)?.name} : {fmtCur(res.pastPricePerM2)}/m² (vs {fmtCur(res.currentPricePerM2)}/m² aujourd'hui).
                Taux de crédit simulé : {res.rate} %. Durée d'occupation : {res.yearsOwned} ans.
              </p>
            </div>
          )}
        </div>

        {res && (
          <div className="sim-results-panel">
            <div className={`sim-stat-hero sim-hero-${heroColor}`}>
              <span className="sim-stat-label">
                {isBuyingBetter ? "L'achat était gagnant" : "La location était gagnante"}
              </span>
              <span className="sim-stat-value">
                {fmtCur(Math.abs(res.advantage))}
              </span>
              <p className="sim-stat-hero-summary">
                {isBuyingBetter
                  ? `Acheter en ${yearBought} vous aurait rapporté ${fmtCur(res.advantage)} de plus que rester locataire et placer la différence.`
                  : `Rester locataire et investir vous aurait rapporté ${fmtCur(-res.advantage)} de plus qu'acheter en ${yearBought}.`
                }
              </p>
            </div>

            <div className="sim-stats-grid">
              <div className="sim-stat-card sim-stat-card-blue">
                <span className="sim-stat-card-label">Prix d'achat {yearBought}</span>
                <span className="sim-stat-card-value">{fmtCur(res.prixAchat)}</span>
              </div>
              <div className="sim-stat-card">
                <span className="sim-stat-card-label">Valeur actuelle</span>
                <span className="sim-stat-card-value">{fmtCur(res.currentPricePerM2 * surface)}</span>
              </div>
              <div className={`sim-stat-card ${isBuyingBetter ? "sim-stat-card-green" : "sim-stat-card-red"}`}>
                <span className="sim-stat-card-label">Patrimoine achat net</span>
                <span className="sim-stat-card-value">{fmtCur(res.ownerWorth)}</span>
              </div>
              <div className="sim-stat-card">
                <span className="sim-stat-card-label">Portefeuille locataire</span>
                <span className="sim-stat-card-value">{fmtCur(res.renterPortfolio)}</span>
              </div>
            </div>

            <div className="sim-chart-wrap">
              <p className="sim-chart-title">Évolution des deux patrimoines depuis {yearBought}</p>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={res.timelineData} margin={{ top: 4, right: 16, bottom: 0, left: 0 }}>
                  <defs>
                    <linearGradient id="gA" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2} /><stop offset="95%" stopColor="#2563eb" stopOpacity={0.02} />
                    </linearGradient>
                    <linearGradient id="gL" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ec4899" stopOpacity={0.15} /><stop offset="95%" stopColor="#ec4899" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="year" tick={{ fontSize: 10, fill: "var(--muted)" }} axisLine={false} tickLine={false} />
                  <YAxis tickFormatter={(v) => v >= 1000 ? `${Math.round(v/1000)}k` : v} tick={{ fontSize: 10, fill: "var(--muted)" }} axisLine={false} tickLine={false} width={48} />
                  <Tooltip content={<ChartTip />} />
                  <Area type="monotone" dataKey="location" name="Location + invest." stroke="#ec4899" strokeWidth={2} fill="url(#gL)" dot={false} />
                  <Area type="monotone" dataKey="achat" name="Achat" stroke="#2563eb" strokeWidth={2} fill="url(#gA)" dot={false} />
                  <ReferenceLine x={2026} stroke="#94a3b8" strokeDasharray="4 3" label={{ value: "Aujourd'hui", fontSize: 9, fill: "#94a3b8" }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="sim-info-box">
              <p className="sim-info-title">⚠️ Hypothèses simplifiées</p>
              <p className="sim-info-body">Simulation reconstituée sur la base des indices de prix nationaux (Notaires de France / Banque de France). Ne tient pas compte des fiscalités locales, des travaux, ni des variations micro-locales.</p>
            </div>
          </div>
        )}
      </div>
    </SimLayout>
  );
}
