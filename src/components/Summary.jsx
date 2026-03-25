import { formatCurrency } from "../utils/finance";

function SummaryRow({ label, value }) {
  return (
    <div className="summary-row">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function Summary({ result }) {
  return (
    <div className="panel sticky">
      <p className="section-kicker">Résultat</p>
      <h3>Résumé comparatif</h3>

      <div className="summary-list">
        <SummaryRow
          label="Montant emprunté"
          value={formatCurrency(result.loanAmount)}
        />
        <SummaryRow
          label="Frais de notaire"
          value={formatCurrency(result.notaryFees)}
        />
        <SummaryRow
          label="Capital restant dû"
          value={formatCurrency(result.remaining)}
        />
        <SummaryRow
          label="Valeur du bien à la fin"
          value={formatCurrency(result.propertyValueAtEnd)}
        />
        <SummaryRow
          label="Frais de revente"
          value={formatCurrency(result.saleCosts)}
        />
        <SummaryRow
          label="Patrimoine net acheteur"
          value={formatCurrency(result.ownerNetWorth)}
        />
        <SummaryRow
          label="Capital locataire"
          value={formatCurrency(result.renterPortfolio)}
        />
      </div>

      <div
        className={`winner-box ${
          result.isBuyingBetter ? "winner-buy" : "winner-rent"
        }`}
      >
        <span>Option gagnante</span>
        <strong>{result.recommendation}</strong>
      </div>
    </div>
  );
}

export default Summary;
