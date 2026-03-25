import { formatCurrency } from "../utils/finance";

function ChartBar({ label, value, percent, variant }) {
  return (
    <div className="chart-row">
      <div className="chart-meta">
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
      <div className="chart-track">
        <div
          className={`chart-fill ${variant}`}
          style={{ width: `${Math.max(6, percent)}%` }}
        />
      </div>
    </div>
  );
}

function Charts({
  ownerNetWorth,
  renterPortfolio,
  ownerMonthlyTotal,
  monthlyRent,
}) {
  const wealthMax = Math.max(ownerNetWorth, renterPortfolio, 1);
  const monthlyMax = Math.max(ownerMonthlyTotal, monthlyRent, 1);

  return (
    <section className="charts-grid">
      <div className="panel chart-card">
        <p className="section-kicker">Graphique 1</p>
        <h3>Patrimoine projeté</h3>

        <ChartBar
          label="Devenir propriétaire"
          value={formatCurrency(ownerNetWorth)}
          percent={(ownerNetWorth / wealthMax) * 100}
          variant="owner-bar"
        />

        <ChartBar
          label="Rester locataire"
          value={formatCurrency(renterPortfolio)}
          percent={(renterPortfolio / wealthMax) * 100}
          variant="renter-bar"
        />
      </div>

      <div className="panel chart-card">
        <p className="section-kicker">Graphique 2</p>
        <h3>Effort mensuel</h3>

        <ChartBar
          label="Coût mensuel propriétaire"
          value={formatCurrency(ownerMonthlyTotal)}
          percent={(ownerMonthlyTotal / monthlyMax) * 100}
          variant="owner-bar"
        />

        <ChartBar
          label="Loyer mensuel"
          value={formatCurrency(monthlyRent)}
          percent={(monthlyRent / monthlyMax) * 100}
          variant="renter-bar"
        />
      </div>
    </section>
  );
}

export default Charts;
