import { formatCurrency } from "../utils/finance";

function Hero({ result, monthlyRent }) {
  return (
    <header className="hero">
      <div className="hero-copy">
        <div className="badge">Simulation immobilière moderne</div>
        <h2 className="hero-heading">Un comparateur simple, visuel et pédagogique</h2>
        <p className="hero-text">
          Ajuste tes hypothèses, compare achat et location, puis regarde
          immédiatement quel scénario semble le plus favorable.
        </p>

        <div className="hero-points">
          <span>Comparaison instantanée</span>
          <span>Graphiques visuels</span>
          <span>Hypothèses personnalisables</span>
        </div>
      </div>

      <div className={`hero-card ${result.isBuyingBetter ? "buy" : "rent"}`}>
        <p className="card-label">Verdict actuel</p>
        <h2>{result.recommendation}</h2>
        <p className="hero-card-text">
          Écart estimé en faveur de{" "}
          {result.isBuyingBetter ? "l’achat" : "la location"} :
        </p>
        <div className="hero-amount">
          {formatCurrency(Math.abs(result.advantage))}
        </div>

        <div className="mini-stats">
          <div className="mini-stat">
            <span>Coût mensuel propriétaire</span>
            <strong>{formatCurrency(result.ownerMonthlyTotal)}</strong>
          </div>
          <div className="mini-stat">
            <span>Loyer mensuel</span>
            <strong>{formatCurrency(monthlyRent)}</strong>
          </div>
          <div className="mini-stat">
            <span>Patrimoine propriétaire</span>
            <strong>{formatCurrency(result.ownerNetWorth)}</strong>
          </div>
          <div className="mini-stat">
            <span>Capital locataire</span>
            <strong>{formatCurrency(result.renterPortfolio)}</strong>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Hero;
