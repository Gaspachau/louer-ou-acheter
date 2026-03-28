import Field from "./Field";

const TOOLTIP_LOYER = "Ce que vous payez chaque mois, charges locatives comprises. Moyenne nationale : ~700 €/mois (source : CLAMEUR 2024). À Paris : ~1 400 €, en province : ~600–700 €.";
const TOOLTIP_HAUSSE = "Taux auquel votre loyer augmente chaque année. Encadré par l'IRL (Indice de Référence des Loyers), il tourne autour de 1,5–2 %/an depuis 2022.";
const TOOLTIP_RENDEMENT = "Ce que rapporte votre argent placé chaque année, net de frais. Livret A en 2026 : 1,5 %. Assurance-vie fonds euro : ~2,5–3 %. PEA/ETF monde : ~7–8 % en moyenne sur 20 ans.";
const TOOLTIP_EPARGNE = "Montant supplémentaire que vous mettez de côté chaque mois (livret, PEA…), indépendamment de l'achat ou de la location. S'ajoute au capital de l'acheteur ou du locataire.";

function warnLoyer(v) {
  if (v > 3000) return `La moyenne nationale est ~700 €/mois (Paris ~1 400 €). Votre loyer semble très élevé — vérifiez qu'il s'agit bien du montant mensuel.`;
  if (v > 0 && v < 200) return "Loyer très bas. Assurez-vous qu'il est bien mensuel et charges comprises.";
  return null;
}
function warnRendement(v) {
  if (v > 12) return `Un rendement de ${v} %/an est très optimiste. Les ETF monde font ~7–8 % en moyenne sur 20 ans.`;
  if (v < 0) return "Rendement négatif : votre capital perd de la valeur chaque année.";
  return null;
}

function StepRent({ values, set, onNext }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && e.target.tagName === "INPUT") onNext();
  };

  return (
    <div className="funnel-step">
      <div className="step-card step-rent" onKeyDown={handleKeyDown}>
        <div className="step-card-header">
          <span className="step-pill rent-pill">Étape 1 sur 2</span>
          <span className="step-enter-hint" aria-hidden="true">Entrée ↵ pour continuer</span>
        </div>

        <div>
          <h1 className="step-title">Votre situation actuelle</h1>
          <p className="step-desc">
            On compare deux chemins : <strong>rester locataire</strong> en plaçant
            votre épargne, ou <strong>acheter</strong>. Commençons par votre situation.
          </p>
        </div>

        <fieldset className="step-fieldset">
          <legend className="step-legend">Loyer et épargne</legend>
          <div className="step-fields">
            <div className="field-full">
              <Field
                label="Votre loyer mensuel"
                value={values.monthlyRent}
                onChange={set("monthlyRent")}
                suffix="€"
                hint="Loyer + charges locatives"
                tooltip={TOOLTIP_LOYER}
                warning={warnLoyer(values.monthlyRent)}
              />
            </div>
            <Field
              label="Hausse annuelle du loyer"
              value={values.annualRentIncrease}
              onChange={set("annualRentIncrease")}
              suffix="%"
              hint="Indice IRL ~1,5–2 %/an"
              tooltip={TOOLTIP_HAUSSE}
            />
            <Field
              label="Rendement épargne"
              value={values.investmentReturn}
              onChange={set("investmentReturn")}
              suffix="%"
              hint="Livret A = 1,5 % · ETF ≈ 7–8 %"
              tooltip={TOOLTIP_RENDEMENT}
              warning={warnRendement(values.investmentReturn)}
            />
            <div className="field-full">
              <Field
                label="Épargne mensuelle"
                value={values.monthlySavings}
                onChange={set("monthlySavings")}
                suffix="€/mois"
                hint="Montant placé chaque mois en plus (Livret A, PEA, assurance-vie…)"
                tooltip={TOOLTIP_EPARGNE}
              />
            </div>
          </div>
        </fieldset>

        <div className="info-box" role="note">
          <p className="info-box-title">Comment ça marche ?</p>
          <p className="info-box-text">
            Si vous n'achetez pas, on suppose que vous placez votre futur apport dès
            aujourd'hui, que vous investissez chaque mois votre épargne mensuelle, et que
            vous ajoutez la différence quand le coût d'achat dépasse votre loyer.
            Le résultat compare les deux patrimoines finaux.
          </p>
        </div>

        <button className="btn-primary" onClick={onNext} type="button">
          Continuer — Simuler l'achat →
        </button>
      </div>
    </div>
  );
}

export default StepRent;
