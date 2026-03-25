import Field from "./Field";

function StepRent({ values, set, onNext }) {
  return (
    <div className="funnel-step">
      <div className="step-card step-rent">
        <span className="step-pill rent-pill">Étape 1 sur 2</span>

        <div>
          <h2 className="step-title">Votre situation de locataire</h2>
          <p className="step-desc">
            On va comparer deux chemins : <strong>continuer à louer</strong> en
            plaçant votre épargne, ou <strong>acheter</strong> un bien. Commençons
            par votre situation actuelle.
          </p>
        </div>

        <div className="step-fields">
          <div className="field-full">
            <Field
              label="Votre loyer mensuel"
              value={values.monthlyRent}
              onChange={set("monthlyRent")}
              suffix="€"
              hint="Ce que vous payez chaque mois (hors charges si possible)"
            />
          </div>
          <Field
            label="Hausse annuelle du loyer"
            value={values.annualRentIncrease}
            onChange={set("annualRentIncrease")}
            suffix="%"
            hint="~1,5–2 % en France ces dernières années"
          />
          <Field
            label="Rendement de votre épargne"
            value={values.investmentReturn}
            onChange={set("investmentReturn")}
            suffix="%"
            hint="Livret A = 3 % · ETF monde ≈ 6–7 %"
          />
        </div>

        <div className="info-box">
          <p className="info-box-title">Pourquoi ces questions ?</p>
          <p className="info-box-text">
            Si vous n'achetez pas, on suppose que vous placez votre futur
            apport et que vous investissez chaque mois l'éventuelle différence
            entre les charges de propriétaire et votre loyer. Le résultat
            compare les deux patrimoines à long terme.
          </p>
        </div>

        <button className="btn-primary" onClick={onNext} type="button">
          Continuer → Simuler l'achat
        </button>
      </div>
    </div>
  );
}

export default StepRent;
