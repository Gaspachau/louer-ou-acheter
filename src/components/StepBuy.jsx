import { useMemo, useState } from "react";
import Field from "./Field";
import { formatCurrency } from "../utils/finance";

function calcMonthly(v) {
  const principal = Math.max(0, v.purchasePrice - v.downPayment);
  const r = v.mortgageRate / 100 / 12;
  const n = v.mortgageYears * 12;
  const payment = !r || !n ? (n ? principal / n : 0)
    : (principal * r) / (1 - Math.pow(1 + r, -n));
  const charges = (v.annualPropertyTax + v.purchasePrice * (v.annualMaintenancePct / 100) + v.annualInsurance) / 12;
  return { payment, charges, total: payment + charges };
}

function ApportBadge({ pct }) {
  const cls = pct >= 20 ? "badge-green" : pct >= 10 ? "badge-amber" : "badge-red";
  const msg = pct >= 20 ? "Excellent apport" : pct >= 10 ? "Apport minimum — 20 % recommandé" : "Apport insuffisant — les banques refusent souvent < 10 %";
  return (
    <span className={`apport-badge ${cls}`} role="status" aria-live="polite">
      {pct.toFixed(0)} % du prix — {msg}
    </span>
  );
}

function StepBuy({ values, set, onNext, onBack }) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const { payment, charges, total } = useMemo(() => calcMonthly(values), [values]);
  const loanAmount = Math.max(0, values.purchasePrice - values.downPayment);
  const apportPct = values.purchasePrice > 0
    ? (values.downPayment / values.purchasePrice) * 100
    : 0;
  const monthlySaving = values.monthlyRent - total; // positive = rent cheaper

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && e.target.tagName === "INPUT") onNext();
  };

  return (
    <div className="funnel-step">
      <div className="step-card step-buy" onKeyDown={handleKeyDown}>
        <div className="step-card-header">
          <span className="step-pill buy-pill">Étape 2 sur 2</span>
          <span className="step-enter-hint" aria-hidden="true">Entrée ↵ pour continuer</span>
        </div>

        <div>
          <h1 className="step-title">Le bien que vous visez</h1>
          <p className="step-desc">
            Entrez le prix et les conditions du prêt. La mensualité se calcule
            en temps réel.
          </p>
        </div>

        {/* Live monthly preview */}
        <div className="monthly-preview" role="status" aria-live="polite" aria-label="Estimation mensuelle en temps réel">
          <div className="monthly-preview-col">
            <span className="mp-label">Mensualité estimée</span>
            <strong className="mp-value">
              {formatCurrency(total)}<span className="mp-unit">/mois</span>
            </strong>
            <span className="mp-detail">
              {formatCurrency(payment)} crédit + {formatCurrency(charges)} charges
            </span>
          </div>
          <div className="mp-divider" aria-hidden="true" />
          <div className="monthly-preview-col">
            <span className="mp-label">Votre loyer</span>
            <strong className="mp-value mp-rent">
              {formatCurrency(values.monthlyRent)}<span className="mp-unit">/mois</span>
            </strong>
            <span className={`mp-delta ${monthlySaving > 0 ? "mp-delta-pos" : "mp-delta-neg"}`}>
              {monthlySaving > 0
                ? `${formatCurrency(monthlySaving)}/mois épargnés si vous restez locataire`
                : `${formatCurrency(-monthlySaving)}/mois de plus que votre loyer`}
            </span>
          </div>
        </div>

        <fieldset className="step-fieldset">
          <legend className="step-legend">Le bien et le financement</legend>
          <div className="step-fields">
            <Field
              label="Prix du bien"
              value={values.purchasePrice}
              onChange={set("purchasePrice")}
              suffix="€"
            />
            <div>
              <Field
                label="Apport personnel"
                value={values.downPayment}
                onChange={set("downPayment")}
                suffix="€"
                hint={`Montant emprunté : ${formatCurrency(loanAmount)}`}
              />
              {values.purchasePrice > 0 && (
                <ApportBadge pct={apportPct} />
              )}
            </div>
            <Field
              label="Taux du crédit"
              value={values.mortgageRate}
              onChange={set("mortgageRate")}
              suffix="%"
              hint="Mars 2025 : ~3,7–4,0 % sur 25 ans · ~3,5–3,7 % sur 20 ans"
            />
            <Field
              label="Durée du prêt"
              value={values.mortgageYears}
              onChange={set("mortgageYears")}
              suffix="ans"
              hint="20 ou 25 ans sont les plus courants"
            />
          </div>
        </fieldset>

        {/* Horizon */}
        <div className="horizon-box">
          <div className="horizon-row">
            <div>
              <label className="horizon-label" htmlFor="horizon-range">
                Horizon de comparaison
              </label>
              <p className="horizon-explain">
                Dans combien d'années pourriez-vous revendre ? Les frais d'achat
                (~10 %) s'amortissent sur la durée — court horizon favorise la
                location, long horizon favorise l'achat.
              </p>
            </div>
            <strong className="horizon-value" aria-live="polite">
              {values.comparisonYears} ans
            </strong>
          </div>
          <input
            id="horizon-range"
            type="range" min="1" max="25" step="1"
            value={values.comparisonYears}
            onChange={(e) => set("comparisonYears")(Number(e.target.value))}
            aria-label={`Horizon : ${values.comparisonYears} ans`}
          />
          <div className="horizon-ticks" aria-hidden="true">
            <span>1 an</span>
            <span>10 ans</span>
            <span>25 ans</span>
          </div>
        </div>

        <button
          className="advanced-toggle"
          onClick={() => setShowAdvanced(!showAdvanced)}
          type="button"
          aria-expanded={showAdvanced}
          aria-controls="advanced-fields"
        >
          {showAdvanced ? "▲ Masquer" : "▼ Afficher"} les paramètres avancés
          <span className="advanced-toggle-hint"> (frais de notaire, charges, plus-value…)</span>
        </button>

        {showAdvanced && (
          <fieldset id="advanced-fields" className="step-fieldset">
            <legend className="step-legend">Paramètres avancés</legend>
            <div className="step-fields advanced-fields">
              <Field label="Frais de notaire" value={values.notaryFeesPct} onChange={set("notaryFeesPct")} suffix="%" hint="~8 % dans l'ancien · ~3 % dans le neuf" />
              <Field label="Taxe foncière" value={values.annualPropertyTax} onChange={set("annualPropertyTax")} suffix="€/an" hint="Variable selon la commune" />
              <Field label="Entretien annuel" value={values.annualMaintenancePct} onChange={set("annualMaintenancePct")} suffix="%" hint="~1 % du prix du bien / an" />
              <Field label="Assurance habitation" value={values.annualInsurance} onChange={set("annualInsurance")} suffix="€/an" />
              <Field label="Hausse du bien / an" value={values.appreciationRate} onChange={set("appreciationRate")} suffix="%" hint="Moyenne France : ~2–3 %/an sur 20 ans" />
              <Field label="Frais de revente" value={values.saleCostsPct} onChange={set("saleCostsPct")} suffix="%" hint="Agence (~3–5 %) + diagnostics" />
            </div>
          </fieldset>
        )}

        <div className="step-actions">
          <button className="btn-secondary" onClick={onBack} type="button" aria-label="Retour à l'étape 1">
            ← Retour
          </button>
          <button className="btn-primary" onClick={onNext} type="button">
            Voir le résultat →
          </button>
        </div>
      </div>
    </div>
  );
}

export default StepBuy;
