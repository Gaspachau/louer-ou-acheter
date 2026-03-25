import { useMemo, useState } from "react";
import Field from "./Field";
import { formatCurrency } from "../utils/finance";

function calcMonthly(purchasePrice, downPayment, mortgageRate, mortgageYears, annualPropertyTax, annualMaintenancePct, annualInsurance) {
  const principal = Math.max(0, purchasePrice - downPayment);
  const r = mortgageRate / 100 / 12;
  const n = mortgageYears * 12;
  const payment = !r || !n ? (n ? principal / n : 0)
    : (principal * r) / (1 - Math.pow(1 + r, -n));
  const charges = (annualPropertyTax + purchasePrice * (annualMaintenancePct / 100) + annualInsurance) / 12;
  return { payment, total: payment + charges, charges };
}

function StepBuy({ values, set, onNext, onBack }) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const { payment, total, charges } = useMemo(() =>
    calcMonthly(
      values.purchasePrice, values.downPayment, values.mortgageRate,
      values.mortgageYears, values.annualPropertyTax,
      values.annualMaintenancePct, values.annualInsurance
    ), [values]);

  const monthlySaving = values.monthlyRent - total; // positive = rent cheaper
  const loanAmount = Math.max(0, values.purchasePrice - values.downPayment);

  return (
    <div className="funnel-step">
      <div className="step-card step-buy">
        <span className="step-pill buy-pill">Étape 2 sur 2</span>

        <div>
          <h2 className="step-title">Le bien que vous visez</h2>
          <p className="step-desc">
            Entrez le prix du bien et les conditions de votre prêt. On calcule
            votre mensualité en temps réel et on la compare à votre loyer.
          </p>
        </div>

        {/* Live mensualité preview */}
        <div className="monthly-preview">
          <div className="monthly-preview-col">
            <span className="mp-label">Mensualité estimée</span>
            <strong className="mp-value">{formatCurrency(total)}<span className="mp-unit">/mois</span></strong>
            <span className="mp-detail">dont {formatCurrency(payment)} de crédit + {formatCurrency(charges)} de charges</span>
          </div>
          <div className="mp-divider" />
          <div className="monthly-preview-col">
            <span className="mp-label">Votre loyer actuel</span>
            <strong className="mp-value mp-rent">{formatCurrency(values.monthlyRent)}<span className="mp-unit">/mois</span></strong>
            <span className={`mp-delta ${monthlySaving > 0 ? "mp-delta-pos" : "mp-delta-neg"}`}>
              {monthlySaving > 0
                ? `${formatCurrency(monthlySaving)}/mois épargnés si vous restez locataire`
                : `${formatCurrency(-monthlySaving)}/mois de plus vs votre loyer`}
            </span>
          </div>
        </div>

        <div className="step-fields">
          <Field label="Prix du bien" value={values.purchasePrice} onChange={set("purchasePrice")} suffix="€" />
          <Field label="Apport personnel" value={values.downPayment} onChange={set("downPayment")} suffix="€"
            hint={`Montant emprunté : ${formatCurrency(loanAmount)}`} />
          <Field label="Taux du crédit" value={values.mortgageRate} onChange={set("mortgageRate")} suffix="%"
            hint="Mars 2025 : ~3,7–4,0 % sur 25 ans · ~3,5–3,7 % sur 20 ans" />
          <Field label="Durée du prêt" value={values.mortgageYears} onChange={set("mortgageYears")} suffix="ans"
            hint="20 ou 25 ans sont les durées les plus courantes" />
        </div>

        {/* Horizon */}
        <div className="horizon-box">
          <div className="horizon-row">
            <div>
              <span className="horizon-label">Horizon de comparaison</span>
              <p className="horizon-explain">
                Dans combien d'années pourriez-vous revendre ? Court horizon (5–7 ans)
                favorise la location car les frais d'achat n'ont pas le temps d'être
                amortis. Long horizon (15+ ans) favorise généralement l'achat.
              </p>
            </div>
            <strong className="horizon-value">{values.comparisonYears} ans</strong>
          </div>
          <input
            type="range" min="1" max="25" step="1"
            value={values.comparisonYears}
            onChange={(e) => set("comparisonYears")(Number(e.target.value))}
          />
          <div className="horizon-ticks">
            <span>1 an</span>
            <span className="horizon-tick-mid">10 ans</span>
            <span>25 ans</span>
          </div>
        </div>

        <button className="advanced-toggle" onClick={() => setShowAdvanced(!showAdvanced)} type="button">
          {showAdvanced ? "▲ Masquer" : "▼ Afficher"} les paramètres avancés
          <span className="advanced-toggle-hint"> (frais de notaire, charges, plus-value…)</span>
        </button>

        {showAdvanced && (
          <div className="step-fields advanced-fields">
            <Field label="Frais de notaire" value={values.notaryFeesPct} onChange={set("notaryFeesPct")} suffix="%"
              hint="~8 % dans l'ancien · ~3 % dans le neuf" />
            <Field label="Taxe foncière" value={values.annualPropertyTax} onChange={set("annualPropertyTax")} suffix="€/an"
              hint="Varie beaucoup selon la commune" />
            <Field label="Entretien annuel" value={values.annualMaintenancePct} onChange={set("annualMaintenancePct")} suffix="%"
              hint="En % du prix du bien — prévoir ~1 %" />
            <Field label="Assurance habitation" value={values.annualInsurance} onChange={set("annualInsurance")} suffix="€/an" />
            <Field label="Hausse du bien / an" value={values.appreciationRate} onChange={set("appreciationRate")} suffix="%"
              hint="Moyenne France sur 20 ans : ~2–3 %/an" />
            <Field label="Frais de revente" value={values.saleCostsPct} onChange={set("saleCostsPct")} suffix="%"
              hint="Agence (~3–5 %) + diagnostics" />
          </div>
        )}

        <div className="step-actions">
          <button className="btn-secondary" onClick={onBack} type="button">← Retour</button>
          <button className="btn-primary" onClick={onNext} type="button">Voir le résultat →</button>
        </div>
      </div>
    </div>
  );
}

export default StepBuy;
