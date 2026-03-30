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
  const msg = pct >= 20 ? "Excellent apport" : pct >= 10 ? "Apport minimum" : "Apport insuffisant";
  return (
    <span className={`apport-badge ${cls}`} role="status" aria-live="polite">
      {pct.toFixed(0)} % — {msg}
    </span>
  );
}

const T = {
  prix: "Prix d'achat affiché par le vendeur, hors frais de notaire. Prix médian France 2026 : ~250 000 € pour un appartement (source : Notaires de France). Paris : ~450 000 €, province : ~180 000 €.",
  apport: "Somme que vous apportez directement sans l'emprunter. Il faut au minimum couvrir les frais de notaire (~8 % dans l'ancien). Les banques préfèrent 20 % pour les meilleures conditions.",
  taux: "Taux d'intérêt annuel fixe de votre prêt. Taux moyens en France en 2026 : 3,3–3,6 % sur 20 ans, 3,5–3,9 % sur 25 ans.",
  duree: "Nombre d'années de remboursement. La simulation utilisera cette durée comme horizon de comparaison. Plus la durée est longue → mensualité plus basse, mais intérêts totaux bien plus élevés.",
  notaire: "Frais versés au notaire lors de la signature. Dans l'ancien : ~7–8 % du prix. Dans le neuf : ~2–3 %. Non finançables, à payer avec votre apport.",
  taxe: "Impôt local annuel dû par le propriétaire. Varie de 600 € à 3 000 €/an pour un appartement standard selon la commune.",
  entretien: "Provision pour travaux et maintenance courante. Les experts recommandent ~1 % du prix du bien par an.",
  assurance: "Assurance multirisque habitation propriétaire. Comptez 200–500 €/an selon la taille et la localisation.",
  apprec: "Taux de revalorisation annuelle du bien. Moyenne nationale sur 20 ans : +2–3 %/an. Très variable selon la ville.",
  revente: "Frais engagés lors de la revente. Comprend la commission d'agence (3–5 %) et les frais de diagnostics obligatoires.",
};

function warnPrix(v) {
  if (v > 1200000) return "Simulation pour un bien de très haut standing. La plupart des achats en France se font entre 100 000 € et 500 000 €.";
  if (v > 0 && v < 30000) return "Prix très bas — vérifiez qu'il s'agit bien du prix total du bien.";
  return null;
}
function warnTaux(v) {
  if (v > 7) return "Taux inhabituel. Le taux moyen en France en 2026 est de 3,5 % sur 20 ans.";
  if (v > 0 && v < 1) return "Taux très bas. Les prêts immobiliers en-dessous de 1 % n'existent plus depuis 2022.";
  return null;
}
function warnDuree(v) {
  if (v > 30) return "La loi HCSF plafonne la durée des prêts immobiliers à 25 ans (27 ans dans le neuf).";
  return null;
}

export default function StepBuy({ values, set, onNext, onBack, city }) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const cityData = city ? CITIES[city] : null;

  const { payment, charges, total } = useMemo(() => calcMonthly(values), [values]);
  const loanAmount = Math.max(0, values.purchasePrice - values.downPayment);
  const totalInterest = Math.max(0, payment * values.mortgageYears * 12 - loanAmount);
  const apportPct = values.purchasePrice > 0 ? (values.downPayment / values.purchasePrice) * 100 : 0;
  const monthlySaving = values.monthlyRent - total;
  const projectedValue = Math.round(values.purchasePrice * Math.pow(1 + values.appreciationRate / 100, values.mortgageYears));

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && e.target.tagName === "INPUT") onNext();
  };

  return (
    <div className="funnel-step funnel-step-wide">
      <div className="funnel-2col" onKeyDown={handleKeyDown}>

        {/* ── Left: fields ── */}
        <div className="funnel-fields-col">
          <div className="step-card-header">
            <span className="step-pill buy-pill">Le projet d'achat</span>
            {cityData ? (
              <span className="step-city-badge">{cityData.emoji} {cityData.name} · {cityData.pricePerM2.toLocaleString("fr-FR")} €/m²</span>
            ) : (
              <span className="step-enter-hint" aria-hidden="true">Entrée ↵ pour continuer</span>
            )}
          </div>

          <div className="funnel-col-title">
            <h1 className="step-title">Le bien que vous visez</h1>
            <p className="step-desc">Entrez le prix et les conditions du prêt. Le résumé se met à jour en temps réel.</p>
          </div>

          <fieldset className="step-fieldset">
            <legend className="step-legend">Prix & Financement</legend>
            <div className="step-fields">
              <Field
                label="Prix du bien"
                value={values.purchasePrice}
                onChange={set("purchasePrice")}
                suffix="€"
                hint={cityData ? `Médiane 50 m² à ${cityData.name} : ${(cityData.pricePerM2 * 50).toLocaleString("fr-FR")} €` : undefined}
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
                  hint={`${Math.round(apportPct)}% · emprunt : ${formatCurrency(loanAmount)}`}
                  tooltip={T.apport}
                />
                {values.purchasePrice > 0 && <ApportBadge pct={apportPct} />}
              </div>
              <Field
                label="Taux du crédit"
                value={values.mortgageRate}
                onChange={set("mortgageRate")}
                suffix="%"
                hint={`Coût total du crédit : ${formatCurrency(totalInterest)}`}
                tooltip={T.taux}
                warning={warnTaux(values.mortgageRate)}
              />
              <Field
                label="Durée du prêt"
                value={values.mortgageYears}
                onChange={set("mortgageYears")}
                suffix="ans"
                hint="Aussi la durée de la simulation"
                tooltip={T.duree}
                warning={warnDuree(values.mortgageYears)}
              />
            </div>
          </fieldset>

          {/* Auto-horizon note */}
          <div className="sim-horizon-note" role="note">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M7 4.5v3l2 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            Simulation sur <strong>{values.mortgageYears} ans</strong> · basée sur la durée de votre prêt
          </div>

          <button
            className="advanced-toggle"
            onClick={() => setShowAdvanced(!showAdvanced)}
            type="button"
            aria-expanded={showAdvanced}
            aria-controls="advanced-fields"
          >
            {showAdvanced ? "▲ Masquer" : "▼ Afficher"} les paramètres avancés
            <span className="advanced-toggle-hint"> (charges, plus-value…)</span>
          </button>

          {showAdvanced && (
            <fieldset id="advanced-fields" className="step-fieldset">
              <legend className="step-legend">Paramètres avancés</legend>
              <div className="step-fields advanced-fields">
                <Field label="Frais de notaire" value={values.notaryFeesPct} onChange={set("notaryFeesPct")} suffix="%" hint="~8 % ancien · ~3 % neuf" tooltip={T.notaire} />
                <Field label="Taxe foncière" value={values.annualPropertyTax} onChange={set("annualPropertyTax")} suffix="€/an" hint="Variable selon commune" tooltip={T.taxe} />
                <Field label="Entretien annuel" value={values.annualMaintenancePct} onChange={set("annualMaintenancePct")} suffix="%" hint={`→ ${formatCurrency(values.purchasePrice * values.annualMaintenancePct / 100)}/an`} tooltip={T.entretien} />
                <Field label="Assurance habitation" value={values.annualInsurance} onChange={set("annualInsurance")} suffix="€/an" tooltip={T.assurance} />
                <Field label="Hausse bien/an" value={values.appreciationRate} onChange={set("appreciationRate")} suffix="%" hint={`Bien → ${formatCurrency(projectedValue)} dans ${values.mortgageYears} ans`} tooltip={T.apprec} />
                <Field label="Frais de revente" value={values.saleCostsPct} onChange={set("saleCostsPct")} suffix="%" hint={`→ ${formatCurrency(values.purchasePrice * values.saleCostsPct / 100)}`} tooltip={T.revente} />
              </div>
            </fieldset>
          )}

          <div className="step-actions">
            <button className="btn-secondary" onClick={onBack} type="button" aria-label="Retour à l'étape précédente">← Retour</button>
            <button className="btn-primary" onClick={onNext} type="button">Voir le résultat →</button>
          </div>
        </div>

        {/* ── Right: live summary ── */}
        <aside className="funnel-live-col" aria-label="Résumé en direct" aria-live="polite">
          <p className="live-col-title">Résumé en direct</p>

          <div className="live-hero-stat">
            <span className="live-hero-label">Mensualité estimée</span>
            <span className="live-hero-value">{formatCurrency(total)}<span className="live-hero-unit">/mois</span></span>
            <span className="live-hero-detail">{formatCurrency(payment)} crédit + {formatCurrency(charges)} charges</span>
          </div>

          <div className={`live-rent-compare ${monthlySaving > 0 ? "live-compare-green" : "live-compare-amber"}`}>
            <span className="live-compare-label">vs votre loyer {formatCurrency(values.monthlyRent)}/mois</span>
            <span className="live-compare-delta">
              {monthlySaving > 0
                ? `−${formatCurrency(monthlySaving)}/mois de moins`
                : `+${formatCurrency(-monthlySaving)}/mois de plus`}
            </span>
          </div>

          <div className="live-stats-grid">
            <div className="live-stat">
              <span className="live-stat-label">Montant emprunté</span>
              <span className="live-stat-value">{formatCurrency(loanAmount)}</span>
            </div>
            <div className="live-stat">
              <span className="live-stat-label">Coût intérêts</span>
              <span className="live-stat-value live-stat-amber">{formatCurrency(totalInterest)}</span>
            </div>
            <div className="live-stat">
              <span className="live-stat-label">Apport</span>
              <span className="live-stat-value">{apportPct.toFixed(0)} %</span>
            </div>
            <div className="live-stat">
              <span className="live-stat-label">Valeur dans {values.mortgageYears} ans</span>
              <span className="live-stat-value live-stat-blue">{formatCurrency(projectedValue)}</span>
            </div>
          </div>

          <div className="live-breakdown">
            <p className="live-breakdown-title">Coût mensuel détaillé</p>
            <div className="live-breakdown-row">
              <span>Remboursement crédit</span>
              <strong>{formatCurrency(payment)}/mois</strong>
            </div>
            <div className="live-breakdown-row">
              <span>Taxe foncière</span>
              <strong>{formatCurrency(values.annualPropertyTax / 12)}/mois</strong>
            </div>
            <div className="live-breakdown-row">
              <span>Entretien + assurance</span>
              <strong>{formatCurrency((values.purchasePrice * values.annualMaintenancePct / 100 + values.annualInsurance) / 12)}/mois</strong>
            </div>
            <div className="live-breakdown-row live-breakdown-total">
              <span>Total propriétaire</span>
              <strong>{formatCurrency(total)}/mois</strong>
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
}
