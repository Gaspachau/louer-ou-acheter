import Field from "./Field";

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
                hint="Ce que vous payez chaque mois"
              />
            </div>
            <Field
              label="Hausse annuelle du loyer"
              value={values.annualRentIncrease}
              onChange={set("annualRentIncrease")}
              suffix="%"
              hint="~1,5–2 % en France"
            />
            <Field
              label="Rendement épargne"
              value={values.investmentReturn}
              onChange={set("investmentReturn")}
              suffix="%"
              hint="Livret A = 3 % · ETF ≈ 6–7 %"
            />
            <div className="field-full">
              <Field
                label="Épargne mensuelle"
                value={values.monthlySavings}
                onChange={set("monthlySavings")}
                suffix="€/mois"
                hint="Montant que vous mettez de côté chaque mois (livret, ETF…). S'ajoute à la simulation locataire."
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
