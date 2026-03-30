import Field from "./Field";
import { CITIES } from "../data/cityData";
import { formatCurrency } from "../utils/finance";

const TOOLTIP_LOYER = "Ce que vous payez chaque mois, charges locatives comprises. Moyenne nationale : ~700 €/mois (source : CLAMEUR 2024). À Paris : ~1 500 €, en province : ~600–800 €.";
const TOOLTIP_HAUSSE = "Taux auquel votre loyer augmente chaque année. Encadré par l'IRL (Indice de Référence des Loyers), il tourne autour de 1,5–2 %/an depuis 2022.";
const TOOLTIP_RENDEMENT = "Ce que rapporte votre argent placé chaque année, net de frais. Livret A en 2026 : 1,5 %. Assurance-vie fonds euro : ~2,5–3 %. PEA/ETF monde : ~7–8 % en moyenne sur 20 ans.";
const TOOLTIP_EPARGNE = "Montant supplémentaire que vous mettez de côté chaque mois (livret, PEA…), indépendamment de l'achat ou de la location. S'ajoute au capital de l'acheteur ou du locataire.";

function warnLoyer(v) {
  if (v > 3000) return "La moyenne nationale est ~700 €/mois (Paris ~1 500 €). Votre loyer semble très élevé — vérifiez qu'il s'agit bien du montant mensuel.";
  if (v > 0 && v < 200) return "Loyer très bas. Assurez-vous qu'il est bien mensuel et charges comprises.";
  return null;
}
function warnRendement(v) {
  if (v > 12) return `Un rendement de ${v} %/an est très optimiste. Les ETF monde font ~7–8 % en moyenne sur 20 ans.`;
  if (v < 0) return "Rendement négatif : votre capital perd de la valeur chaque année.";
  return null;
}

export default function StepRent({ values, set, onNext, city }) {
  const cityData = city ? CITIES[city] : null;
  const mortgageYears = values.mortgageYears || 20;

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && e.target.tagName === "INPUT") onNext();
  };

  // Live projections
  const r = values.annualRentIncrease / 100;
  const yr1 = Math.round(values.monthlyRent * (1 + r));
  const yr5 = Math.round(values.monthlyRent * Math.pow(1 + r, 5));
  const yrEnd = Math.round(values.monthlyRent * Math.pow(1 + r, mortgageYears));
  const totalRentCost = (() => {
    if (values.annualRentIncrease === 0) return values.monthlyRent * 12 * mortgageYears;
    let total = 0;
    for (let y = 0; y < mortgageYears; y++) {
      total += values.monthlyRent * Math.pow(1 + r, y) * 12;
    }
    return Math.round(total);
  })();

  const gain10k = Math.round(10000 * Math.pow(1 + values.investmentReturn / 100, 10));

  // Equivalent loan capacity from rent
  const loanR = (values.mortgageRate || 3.5) / 100 / 12;
  const loanN = mortgageYears * 12;
  const equiv = values.monthlyRent >= 300
    ? Math.round(values.monthlyRent * ((Math.pow(1 + loanR, loanN) - 1) / (loanR * Math.pow(1 + loanR, loanN))))
    : 0;

  return (
    <div className="funnel-step funnel-step-wide">
      <div className="funnel-2col" onKeyDown={handleKeyDown}>

        {/* ── Left: fields ── */}
        <div className="funnel-fields-col">
          <div className="step-card-header">
            <span className="step-pill rent-pill">Situation locative</span>
            {cityData && (
              <span className="step-city-badge">{cityData.emoji} {cityData.name}</span>
            )}
          </div>

          <div className="funnel-col-title">
            <h1 className="step-title">Votre situation actuelle</h1>
            <p className="step-desc">Entrez votre loyer et votre capacité d'épargne.</p>
          </div>

          <fieldset className="step-fieldset">
            <legend className="step-legend">Loyer actuel</legend>
            <div className="step-fields">
              <div className="field-full">
                <Field
                  label="Votre loyer mensuel"
                  value={values.monthlyRent}
                  onChange={set("monthlyRent")}
                  suffix="€"
                  hint={cityData ? `Loyer + charges · Médiane à ${cityData.name} : ${cityData.rentT2.toLocaleString("fr-FR")} €/mois` : "Loyer + charges locatives"}
                  cityHint={cityData ? `Mis à jour pour ${cityData.name}` : null}
                  tooltip={TOOLTIP_LOYER}
                  warning={warnLoyer(values.monthlyRent)}
                />
              </div>
              <Field
                label="Hausse annuelle"
                value={values.annualRentIncrease}
                onChange={set("annualRentIncrease")}
                suffix="%"
                hint={cityData ? `IRL ${cityData.name} ≈ ${cityData.rentIndexGrowth} %/an` : "Indice IRL ~1,5–2 %/an"}
                cityHint={cityData ? `IRL ${cityData.name}` : null}
                tooltip={TOOLTIP_HAUSSE}
              />
              <Field
                label="Rendement épargne"
                value={values.investmentReturn}
                onChange={set("investmentReturn")}
                suffix="%"
                hint={`Livret A 1,5 % · ETF 7–8 % · 10 000 € → ${gain10k.toLocaleString("fr-FR")} € dans 10 ans`}
                tooltip={TOOLTIP_RENDEMENT}
                warning={warnRendement(values.investmentReturn)}
              />
            </div>
          </fieldset>

          <fieldset className="step-fieldset">
            <legend className="step-legend">Épargne mensuelle</legend>
            <div className="step-fields">
              <div className="field-full">
                <Field
                  label="Épargne mensuelle supplémentaire"
                  value={values.monthlySavings}
                  onChange={set("monthlySavings")}
                  suffix="€/mois"
                  hint="Montant placé chaque mois en plus (Livret A, PEA, assurance-vie…)"
                  tooltip={TOOLTIP_EPARGNE}
                />
              </div>
            </div>
          </fieldset>

          <button className="btn-primary" onClick={onNext} type="button">
            Continuer — Simuler l'achat →
          </button>
        </div>

        {/* ── Right: live summary ── */}
        <aside className="funnel-live-col" aria-label="Projections en direct" aria-live="polite">
          <p className="live-col-title">Projections loyer</p>

          <div className="live-hero-stat">
            <span className="live-hero-label">Loyer actuel</span>
            <span className="live-hero-value">{formatCurrency(values.monthlyRent)}<span className="live-hero-unit">/mois</span></span>
            {cityData && <span className="live-hero-detail">Médiane {cityData.name} : {cityData.rentT2.toLocaleString("fr-FR")} €/mois</span>}
          </div>

          {values.monthlyRent >= 200 && values.annualRentIncrease > 0 && (
            <div className="live-rent-timeline">
              <p className="live-rt-title">📈 Évolution de votre loyer</p>
              <div className="live-rt-row">
                <span className="live-rt-label">Dans 1 an</span>
                <span className="live-rt-val">+{(yr1 - values.monthlyRent).toLocaleString("fr-FR")} € → <strong>{yr1.toLocaleString("fr-FR")} €</strong>/mois</span>
              </div>
              <div className="live-rt-row">
                <span className="live-rt-label">Dans 5 ans</span>
                <span className="live-rt-val"><strong>{yr5.toLocaleString("fr-FR")} €</strong>/mois</span>
              </div>
              <div className="live-rt-row live-rt-row-end">
                <span className="live-rt-label">Dans {mortgageYears} ans</span>
                <span className="live-rt-val live-rt-final"><strong>{yrEnd.toLocaleString("fr-FR")} €</strong>/mois</span>
              </div>
            </div>
          )}

          <div className="live-stats-grid">
            <div className="live-stat live-stat-full">
              <span className="live-stat-label">Loyers cumulés sur {mortgageYears} ans</span>
              <span className="live-stat-value live-stat-amber">{formatCurrency(totalRentCost)}</span>
            </div>
            {equiv > 0 && (
              <div className="live-stat live-stat-full">
                <span className="live-stat-label">Prêt équivalent à votre loyer</span>
                <span className="live-stat-value live-stat-blue">{formatCurrency(equiv)}</span>
                <span className="live-stat-hint">sur {mortgageYears} ans à 3,5 %</span>
              </div>
            )}
          </div>
        </aside>

      </div>
    </div>
  );
}
