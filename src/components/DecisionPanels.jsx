import Field from "./Field";
import { formatCurrency } from "../utils/finance";

function DecisionPanels({
  comparisonYears,
  ownerNetWorth,
  renterPortfolio,
  ownerFields,
  renterFields,
}) {
  return (
    <section className="duo-layout">
      <article className="duo-card owner">
        <div className="duo-head">
          <span className="decision-pill owner-pill">Option achat</span>
          <h3>Devenir propriétaire</h3>
        </div>

        <p className="duo-text">
          Patrimoine net estimé après {comparisonYears} ans
        </p>

        <div className="duo-value">{formatCurrency(ownerNetWorth)}</div>

        <div className="duo-panel">
          <h4>Simulateur achat</h4>
          <div className="duo-fields">
            {ownerFields.map((field) => (
              <Field key={field.label} {...field} />
            ))}
          </div>
        </div>
      </article>

      <article className="duo-card renter">
        <div className="duo-head">
          <span className="decision-pill renter-pill">Option location</span>
          <h3>Rester locataire</h3>
        </div>

        <p className="duo-text">
          Capital potentiel estimé après {comparisonYears} ans
        </p>

        <div className="duo-value">{formatCurrency(renterPortfolio)}</div>

        <div className="duo-panel">
          <h4>Simulateur location</h4>
          <div className="duo-fields">
            {renterFields.map((field) => (
              <Field key={field.label} {...field} />
            ))}
          </div>
        </div>
      </article>
    </section>
  );
}

export default DecisionPanels;
