import { useMemo, useState } from "react";
import Field from "./Field";
import { formatCurrency } from "../utils/finance";
import { CITIES } from "../data/cityData";

function calcMonthly(v) {
  const principal = Math.max(0, v.purchasePrice - v.downPayment);
  const r = v.mortgageRate / 100 / 12;
  const n = v.mortgageYears * 12;
  const payment = r === 0 && n > 0
    ? principal / n
    : r > 0 && n > 0
    ? (principal * r) / (1 - Math.pow(1 + r, -n))
    : 0;
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

// ─── Tooltips ────────────────────────────────────────────────
const T = {
  prix: "Prix d'achat affiché par le vendeur, hors frais de notaire. Prix médian France 2026 : ~250 000 € pour un appartement (source : Notaires de France). Paris : ~450 000 €, province : ~180 000 €.",
  apport: "Somme que vous apportez directement sans l'emprunter. Il faut au minimum couvrir les frais de notaire (~8 % du prix dans l'ancien). Les banques préfèrent 20 % pour les meilleures conditions de crédit.",
  taux: "Taux d'intérêt annuel fixe de votre prêt. Taux moyens en France en 2026 : 3,3–3,6 % sur 20 ans, 3,5–3,9 % sur 25 ans. Obtenez des simulations auprès de votre banque ou d'un courtier.",
  duree: "Nombre d'années de remboursement. Plus la durée est longue → mensualité plus basse, mais intérêts totaux bien plus élevés. Exemple sur 200 000 € à 3,5 % : 20 ans coûte ~62 000 € d'intérêts, 25 ans coûte ~79 000 €.",
  notaire: "Frais versés au notaire lors de la signature de l'acte. Dans l'ancien : ~7–8 % du prix (dont 5,8 % de taxes reversées à l'État). Dans le neuf : ~2–3 %. Non finançables, donc à payer avec votre apport.",
  taxe: "Impôt local annuel dû par le propriétaire. Varie beaucoup selon les communes (de 600 € à 3 000 €/an pour un appartement standard). Renseignez-vous auprès de la mairie ou du vendeur.",
  entretien: "Provision pour travaux et maintenance courante. Les experts recommandent ~1 % du prix du bien par an (peintures, robinetterie, chauffe-eau…). En copropriété, s'ajoute aux charges de copro.",
  assurance: "Assurance multirisque habitation propriétaire. Comptez 200–500 €/an selon la taille du bien et la localisation. Obligatoire en copropriété.",
  apprec: "Taux de revalorisation annuelle du bien. Moyenne nationale sur 20 ans : +2–3 %/an. Très variable selon la ville (Paris +3 %, villes moyennes +1–2 %). Aucune garantie sur les évolutions futures.",
  revente: "Frais engagés lors de la revente. Comprend la commission d'agence (3–5 %) et les frais de diagnostics obligatoires. S'il y a une plus-value immobilière, un impôt peut également s'appliquer.",
};

// ─── Warnings ────────────────────────────────────────────────
function warnPrix(v) {
  if (v > 1200000) return "Simulation pour un bien de très haut standing. La plupart des achats en France se font entre 100 000 € et 500 000 €.";
  if (v > 0 && v < 30000) return "Prix très bas — vérifiez qu'il s'agit bien du prix total du bien et non d'une surface partielle.";
  return null;
}
function warnTaux(v) {
  if (v > 7) return `Taux inhabituel. Le taux moyen en France en 2026 est de 3,5 % sur 20 ans. Au-delà de 6 %, vérifiez votre offre.`;
  if (v > 0 && v < 1) return "Taux très bas. Les prêts immobiliers en-dessous de 1 % n'existent plus en France depuis 2022.";
  return null;
}
function warnDuree(v) {
  if (v > 30) return "La loi HCSF plafonne la durée des prêts immobiliers à 25 ans (27 ans dans le neuf). Vérifiez avec votre banque.";
  return null;
}

function StepBuy({ values, set, onNext, onBack, city }) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const cityData = city ? CITIES[city] : null;

  const { payment, charges, total } = useMemo(() => calcMonthly(values), [values]);
  const loanAmount = Math.max(0, values.purchasePrice - values.downPayment);
  const totalInterest = Math.max(0, payment * values.mortgageYears * 12 - loanAmount);
  const apportPct = values.purchasePrice > 0
    ? (values.downPayment / values.purchasePrice) * 100
    : 0;
  const monthlySaving = values.monthlyRent - total;

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && e.target.tagName === "INPUT") onNext();
  };

  return (
    <div className="funnel-step">
      <div className="step-card step-buy" onKeyDown={handleKeyDown}>
        <div className="step-card-header">
          <span className="step-pill buy-pill">Le projet d'achat</span>
          {cityData ? (
            <span className="step-city-badge">{cityData.emoji} {cityData.name} · {cityData.pricePerM2.toLocaleString("fr-FR")} €/m²</span>
          ) : (
            <span className="step-enter-hint" aria-hidden="true">Entrée ↵ pour continuer</span>
          )}
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
              hint={cityData ? `Prix médian 50 m² à ${cityData.name} : ${(cityData.pricePerM2 * 50).toLocaleString("fr-FR")} €` : undefined}
              cityHint={cityData ? `Mis à jour pour ${cityData.name}` : null}
              tooltip={T.prix}
              warning={warnPrix(values.purchasePrice)}
            />
            <div>
              <Field
                label="Apport personnel"
                value={values.downPayment}
                onChange={set("downPayment")}
                suffix="€"
                hint={`${Math.round(apportPct)}% du prix · emprunt : ${formatCurrency(loanAmount)}`}
                tooltip={T.apport}
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
              hint={`→ coût total du crédit : ${formatCurrency(totalInterest)}`}
              tooltip={T.taux}
              warning={warnTaux(values.mortgageRate)}
            />
            <Field
              label="Durée du prêt"
              value={values.mortgageYears}
              onChange={set("mortgageYears")}
              suffix="ans"
              hint={`20 ou 25 ans · ${formatCurrency(payment)}/mois pendant ${values.mortgageYears} ans`}
              tooltip={T.duree}
              warning={warnDuree(values.mortgageYears)}
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
            style={{ "--range-pct": `${((values.comparisonYears - 1) / (25 - 1)) * 100}%` }}
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
              <Field label="Frais de notaire" value={values.notaryFeesPct} onChange={set("notaryFeesPct")} suffix="%" hint="~8 % dans l'ancien · ~3 % dans le neuf" tooltip={T.notaire} />
              <Field label="Taxe foncière" value={values.annualPropertyTax} onChange={set("annualPropertyTax")} suffix="€/an" hint="Variable selon la commune" tooltip={T.taxe} />
              <Field label="Entretien annuel" value={values.annualMaintenancePct} onChange={set("annualMaintenancePct")} suffix="%" hint={`→ ${formatCurrency(values.purchasePrice * values.annualMaintenancePct / 100)}/an`} tooltip={T.entretien} />
              <Field label="Assurance habitation" value={values.annualInsurance} onChange={set("annualInsurance")} suffix="€/an" tooltip={T.assurance} />
              <Field label="Hausse du bien / an" value={values.appreciationRate} onChange={set("appreciationRate")} suffix="%" hint={(() => { const yr5 = Math.round(values.purchasePrice * Math.pow(1 + values.appreciationRate/100, 5)); const yr10 = Math.round(values.purchasePrice * Math.pow(1 + values.appreciationRate/100, 10)); return `bien à ${formatCurrency(yr5)} dans 5 ans, ${formatCurrency(yr10)} dans 10 ans`; })()} tooltip={T.apprec} />
              <Field label="Frais de revente" value={values.saleCostsPct} onChange={set("saleCostsPct")} suffix="%" hint={`→ ${formatCurrency(values.purchasePrice * values.saleCostsPct / 100)} à la revente`} tooltip={T.revente} />
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
