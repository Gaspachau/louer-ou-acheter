import { useMemo, useState } from "react";
import SimLayout from "./SimLayout";
import Field from "../Field";

const fmtCur = (v) => new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(v);
const fmtPct = (v) => `${v.toFixed(1)} %`;

function calcHeritage({
  propertyValue, remainingDebt, monthlyRent, annualCharges, annualTaxe,
  capitalGainsTax, duration, investReturn, occupiedBySelf
}) {
  // --- Option A: Keep & rent (or keep & live) ---
  const netValue = propertyValue - remainingDebt;
  const annualRent = monthlyRent * 12;
  const annualNetRent = annualRent - annualCharges - annualTaxe;
  const grossYield = propertyValue > 0 ? (annualRent / propertyValue) * 100 : 0;
  const netYield = propertyValue > 0 ? (annualNetRent / propertyValue) * 100 : 0;

  // Property value growth over duration
  const appreciation = 1.5; // average French appreciation %/year
  const futurePropertyValue = propertyValue * Math.pow(1 + appreciation / 100, duration);
  const futureDebt = remainingDebt > 0 ? remainingDebt * Math.pow(1.035, duration) : 0; // simplified
  const keepWorth = futurePropertyValue - futureDebt + annualNetRent * duration; // simplified (no compounding on rents)

  // --- Option B: Sell & invest ---
  const saleProceeds = propertyValue * 0.94 - remainingDebt; // 6% agency fees
  const taxableGain = Math.max(0, propertyValue * 0.94 - capitalGainsTax);
  // Plus-value: 19% IR + 17.2% PS with abattements after 5y (22y for IR, 30y for PS)
  const pvIR = taxableGain * 0.19;
  const pvPS = taxableGain * 0.172;
  const pvTotal = pvIR + pvPS;
  const netSaleProceeds = Math.max(0, saleProceeds - pvTotal);
  const investMonthly = investReturn / 100 / 12;
  const sellWorth = netSaleProceeds * Math.pow(1 + investReturn / 100, duration);

  // --- Option C: Sell your primary residence & buy smaller ---
  const downsizeProceeds = propertyValue * 0.94 - remainingDebt;
  const smallerPurchase = propertyValue * 0.6; // buy something 40% cheaper
  const cashout = downsizeProceeds - smallerPurchase * 1.08; // with notary fees
  const downsizeWorth = cashout > 0 ? cashout * Math.pow(1 + investReturn / 100, duration) + smallerPurchase * Math.pow(1 + appreciation / 100, duration) : 0;

  const advantage = keepWorth - sellWorth;

  // Cashflow monthly (if renting out)
  const monthlyCashflow = annualNetRent / 12;

  // Break-even: months until rent income covers sale opportunity cost
  const opportunityCost = netSaleProceeds * (investReturn / 100 / 12);
  const breakEvenMonths = monthlyCashflow > opportunityCost
    ? Math.ceil((netSaleProceeds * 0.06) / (monthlyCashflow - opportunityCost))
    : null;

  return {
    netValue, grossYield, netYield, annualNetRent, monthlyCashflow,
    keepWorth, sellWorth, downsizeWorth,
    advantage,
    netSaleProceeds, pvTotal, taxableGain,
    breakEvenMonths,
    futurePropertyValue,
  };
}

export default function SimHeritage() {
  const [v, setV] = useState({
    propertyValue: 280000,
    remainingDebt: 0,
    monthlyRent: 900,
    annualCharges: 2400,
    annualTaxe: 1200,
    capitalGainsTax: 50000,
    duration: 15,
    investReturn: 4.0,
    occupiedBySelf: false,
  });
  const set = (k) => (val) => setV((s) => ({ ...s, [k]: val }));

  const res = useMemo(() => calcHeritage(v), [v]);

  const bestOption = res.keepWorth >= res.sellWorth ? "garder" : "vendre";
  const heroColor = bestOption === "garder" ? "green" : "amber";

  return (
    <SimLayout
      icon="🏛️"
      title="Héritage immobilier : garder ou vendre ?"
      description="Vous héritez d'un bien ou en possédez un en plus de votre résidence. Calculez s'il vaut mieux le garder, le louer ou le vendre."
      suggestions={["/simulateurs/plus-value", "/simulateurs/taxe-fonciere", "/simulateurs/frais-notaire"]}
    >
      <div className="sim-layout">
        <div className="sim-card">
          <p className="sim-card-legend">Le bien hérité ou possédé</p>
          <div className="step-fields">
            <Field label="Valeur du bien" value={v.propertyValue} onChange={set("propertyValue")} suffix="€"
              hint="Prix de marché estimé aujourd'hui" />
            <Field label="Capital restant dû" value={v.remainingDebt} onChange={set("remainingDebt")} suffix="€"
              hint="0 si le bien est entièrement payé (héritage classique)" />
            <Field label="Loyer mensuel potentiel" value={v.monthlyRent} onChange={set("monthlyRent")} suffix="€/mois"
              hint="Loyer que vous pourriez percevoir si vous louez le bien" />
            <Field label="Charges annuelles" value={v.annualCharges} onChange={set("annualCharges")} suffix="€/an"
              hint="Charges de copropriété + entretien + assurance PNO" />
            <Field label="Taxe foncière" value={v.annualTaxe} onChange={set("annualTaxe")} suffix="€/an"
              hint="Taxe foncière annuelle du bien" />
          </div>

          <p className="sim-card-legend" style={{ marginTop: 16 }}>Paramètres de comparaison</p>
          <div className="step-fields">
            <Field label="Plus-value estimée (base imposable)" value={v.capitalGainsTax} onChange={set("capitalGainsTax")} suffix="€"
              hint="Différence entre valeur actuelle et prix d'acquisition. Exonéré après 22 ans de détention." />
            <Field label="Rendement placement alternatif" value={v.investReturn} onChange={set("investReturn")} suffix="%"
              hint="Rendement annuel si vous placez le produit de la vente (ETF, assurance-vie…)" />
            <Field label="Horizon de comparaison" value={v.duration} onChange={set("duration")} suffix="ans"
              hint="Sur combien d'années comparer les deux options ?" />
          </div>

          {res.grossYield > 0 && (
            <div className="sim-info-box" style={{ marginTop: 16 }}>
              <p className="sim-info-title">📊 Rentabilité locative</p>
              <p className="sim-info-body">
                Rendement brut : <strong>{fmtPct(res.grossYield)}</strong> — Rendement net : <strong>{fmtPct(res.netYield)}</strong>.
                Cashflow mensuel net : <strong>{fmtCur(res.monthlyCashflow)}</strong> après charges et taxe foncière.
              </p>
            </div>
          )}
        </div>

        <div className="sim-results-panel">
          <div className={`sim-stat-hero sim-hero-${heroColor}`}>
            <span className="sim-stat-label">
              {bestOption === "garder" ? "Garder le bien est plus rentable" : "Vendre est plus rentable"}
            </span>
            <span className="sim-stat-value">
              {fmtCur(Math.abs(res.advantage))}
            </span>
            <p className="sim-stat-hero-summary">
              {bestOption === "garder"
                ? `Garder et louer génère ${fmtCur(res.advantage)} de plus sur ${v.duration} ans que vendre et placer.`
                : `Vendre et investir génère ${fmtCur(-res.advantage)} de plus sur ${v.duration} ans que garder le bien.`
              }
            </p>
          </div>

          <div className="heritage-options">
            <div className={`heritage-option${bestOption === "garder" ? " heritage-option-best" : ""}`}>
              <div className="heritage-option-header">
                <span className="heritage-option-icon">🏠</span>
                <span className="heritage-option-title">Garder & louer</span>
                {bestOption === "garder" && <span className="heritage-option-badge">Recommandé</span>}
              </div>
              <div className="heritage-option-value">{fmtCur(res.keepWorth)}</div>
              <p className="heritage-option-desc">
                Patrimoine estimé dans {v.duration} ans, incluant la valorisation du bien et les loyers nets perçus.
              </p>
              <div className="heritage-option-detail">
                <span>Valeur future du bien</span><span>{fmtCur(res.futurePropertyValue)}</span>
              </div>
              <div className="heritage-option-detail">
                <span>Loyers nets cumulés</span><span>{fmtCur(res.annualNetRent * v.duration)}</span>
              </div>
            </div>

            <div className={`heritage-option${bestOption === "vendre" ? " heritage-option-best" : ""}`}>
              <div className="heritage-option-header">
                <span className="heritage-option-icon">💰</span>
                <span className="heritage-option-title">Vendre & investir</span>
                {bestOption === "vendre" && <span className="heritage-option-badge">Recommandé</span>}
              </div>
              <div className="heritage-option-value">{fmtCur(res.sellWorth)}</div>
              <p className="heritage-option-desc">
                Produit net de vente placé à {v.investReturn} %/an pendant {v.duration} ans, capitalisé.
              </p>
              <div className="heritage-option-detail">
                <span>Produit net de vente</span><span>{fmtCur(res.netSaleProceeds)}</span>
              </div>
              <div className="heritage-option-detail">
                <span>Gain à {v.investReturn} %/an</span><span>{fmtCur(res.sellWorth - res.netSaleProceeds)}</span>
              </div>
            </div>
          </div>

          {res.pvTotal > 0 && (
            <div className="sim-info-box" style={{ marginTop: 16 }}>
              <p className="sim-info-title">📋 Fiscalité de la plus-value (cession)</p>
              <p className="sim-info-body">
                Plus-value taxable estimée : <strong>{fmtCur(res.taxableGain)}</strong>.
                Impôt IR (19 %) : <strong>{fmtCur(res.pvTotal * 19 / (19 + 17.2))}</strong> — Prélèvements sociaux (17,2 %) : <strong>{fmtCur(res.pvTotal * 17.2 / (19 + 17.2))}</strong>.
                Total imposition : <strong style={{ color: "#dc2626" }}>{fmtCur(res.pvTotal)}</strong>.
                Note : des abattements progressifs s'appliquent après 5 ans de détention (exonération totale IR après 22 ans, PS après 30 ans). Consultez un notaire.
              </p>
            </div>
          )}

          {res.breakEvenMonths !== null && (
            <div className="sim-info-box" style={{ marginTop: 16 }}>
              <p className="sim-info-title">⏱️ Point de rentabilité locative</p>
              <p className="sim-info-body">
                La location devient plus rentable que le placement financier au bout de{" "}
                <strong>~{res.breakEvenMonths} mois</strong> ({Math.ceil(res.breakEvenMonths / 12)} an{Math.ceil(res.breakEvenMonths / 12) > 1 ? "s" : ""}).
                Au-delà, chaque mois supplémentaire joue en faveur de la conservation du bien.
              </p>
            </div>
          )}

          <div className="sim-stats-grid" style={{ marginTop: 16 }}>
            <div className="sim-stat-card sim-stat-card-blue">
              <span className="sim-stat-card-label">Valeur nette du bien</span>
              <span className="sim-stat-card-value">{fmtCur(res.netValue)}</span>
            </div>
            <div className="sim-stat-card">
              <span className="sim-stat-card-label">Rendement brut</span>
              <span className="sim-stat-card-value">{fmtPct(res.grossYield)}</span>
            </div>
            <div className="sim-stat-card">
              <span className="sim-stat-card-label">Rendement net</span>
              <span className="sim-stat-card-value">{fmtPct(res.netYield)}</span>
            </div>
            <div className="sim-stat-card">
              <span className="sim-stat-card-label">Cashflow mensuel</span>
              <span className="sim-stat-card-value">{fmtCur(res.monthlyCashflow)}</span>
            </div>
          </div>

          <div className="sim-info-box">
            <p className="sim-info-title">⚖️ Facteurs non financiers</p>
            <p className="sim-info-body">
              Cette analyse compare uniquement les flux financiers. D'autres facteurs comptent : facilité de gestion, charge mentale du bailleur,
              diversification patrimoniale, risque de vacance locative (6–10 % en moyenne), fiscalité des revenus fonciers (jusqu'à 45 % + 17,2 % PS).
              Consultez un conseiller en gestion de patrimoine (CGP) pour une analyse personnalisée.
            </p>
          </div>
        </div>
      </div>
    </SimLayout>
  );
}
