import { useState } from "react";
import { formatCurrency } from "../utils/finance";
import ProgressionChart from "./ProgressionChart";
import Summary from "./Summary";

export default function StepResult({ result, values, onEdit }) {
  const [showDetails, setShowDetails] = useState(false);

  const {
    isBuyingBetter, recommendation, advantage,
    ownerMonthlyTotal, ownerNetWorth, renterPortfolio,
    propertyValueAtEnd, notaryFees, yearlyData,
  } = result;

  const monthlyDiff = ownerMonthlyTotal - values.monthlyRent;
  const renterLumpSum = values.downPayment + notaryFees;

  const breakevenYear = yearlyData?.find(
    (d) => d.ownerNetWorth >= d.renterPortfolio
  )?.year ?? null;

  const insights = buildInsights({ result, values, monthlyDiff, breakevenYear });

  return (
    <div className="result-page">

      {/* ══ 1 — SCOREBOARD (at a glance) ═══════════════════════ */}
      <section className="scoreboard">
        <div className={`score-card ${isBuyingBetter ? "sc-winner" : "sc-loser"} sc-buy`}>
          {isBuyingBetter && <span className="sc-badge">✓ Meilleure option</span>}
          <span className="sc-icon">🏠</span>
          <span className="sc-label">Acheter</span>
          <div className="sc-amount">{formatCurrency(ownerNetWorth)}</div>
          <p className="sc-amount-label">
            Patrimoine net dans {values.comparisonYears} an{values.comparisonYears > 1 ? "s" : ""}
          </p>
          <div className="sc-monthly">
            <strong>{formatCurrency(ownerMonthlyTotal)}</strong>
            <span>/mois</span>
          </div>
          <p className="sc-monthly-label">mensualité + charges</p>
        </div>

        <div className="score-vs">
          <span>vs</span>
          <div className={`advantage-pill ${isBuyingBetter ? "ap-buy" : "ap-rent"}`}>
            {formatCurrency(Math.abs(advantage))} de différence
          </div>
          {breakevenYear && (
            <span className="breakeven-note">
              Achat + rentable dès {breakevenYear} an{breakevenYear > 1 ? "s" : ""}
            </span>
          )}
        </div>

        <div className={`score-card ${!isBuyingBetter ? "sc-winner" : "sc-loser"} sc-rent`}>
          {!isBuyingBetter && <span className="sc-badge">✓ Meilleure option</span>}
          <span className="sc-icon">📈</span>
          <span className="sc-label">Louer</span>
          <div className="sc-amount">{formatCurrency(renterPortfolio)}</div>
          <p className="sc-amount-label">
            Capital investi dans {values.comparisonYears} an{values.comparisonYears > 1 ? "s" : ""}
          </p>
          <div className="sc-monthly">
            <strong>{formatCurrency(values.monthlyRent)}</strong>
            <span>/mois</span>
          </div>
          <p className="sc-monthly-label">loyer mensuel</p>
        </div>
      </section>

      {/* ══ 2 — VERDICT SENTENCE ══════════════════════════════ */}
      <div className={`verdict-sentence ${isBuyingBetter ? "vs-buy" : "vs-rent"}`}>
        <strong>{recommendation}</strong> est la meilleure option sur {values.comparisonYears} ans —{" "}
        {isBuyingBetter
          ? `votre patrimoine serait ${formatCurrency(advantage)} plus élevé qu'en restant locataire.`
          : `votre capital serait ${formatCurrency(Math.abs(advantage))} plus élevé qu'en achetant.`}
      </div>

      {/* ══ 3 — RENTER OPPORTUNITY CALLOUT ════════════════════ */}
      <div className="opportunity-card">
        <div className="opp-left">
          <span className="opp-icon">💡</span>
          <div>
            <p className="opp-title">L'opportunité locataire</p>
            <p className="opp-text">
              En plaçant votre apport de{" "}
              <strong>{formatCurrency(renterLumpSum)}</strong> (apport + frais de notaire) à{" "}
              {values.investmentReturn} %/an
              {monthlyDiff > 0
                ? ` et en investissant ${formatCurrency(monthlyDiff)}/mois de différence`
                : ""}
              , vous vous constituez un capital de{" "}
              <strong>{formatCurrency(renterPortfolio)}</strong> en{" "}
              {values.comparisonYears} ans — sans vous engager sur {values.mortgageYears} ans.
            </p>
          </div>
        </div>
        {monthlyDiff > 0 && (
          <div className="opp-right">
            <span className="opp-saving-label">Vous épargneriez</span>
            <strong className="opp-saving-amount">{formatCurrency(monthlyDiff)}</strong>
            <span className="opp-saving-unit">/ mois en restant locataire</span>
          </div>
        )}
      </div>

      {/* ══ 4 — DETAILS (expandable) ══════════════════════════ */}
      <button
        className={`details-toggle ${showDetails ? "dt-open" : ""}`}
        onClick={() => setShowDetails(!showDetails)}
        type="button"
      >
        {showDetails ? "▲ Masquer le détail" : "▼ Voir l'évolution et le détail complet"}
      </button>

      {showDetails && (
        <div className="details-section">
          {/* Chart */}
          <div className="panel prog-section">
            <p className="section-kicker">Évolution année par année</p>
            <h3>Comment les deux patrimoines évoluent</h3>
            <p className="prog-desc">
              Courbe bleue = valeur nette du bien (après remboursement du prêt et
              frais de revente). Courbe rose = capital du locataire (apport placé +
              épargne mensuelle accumulée).
            </p>
            <ProgressionChart yearlyData={yearlyData} />
          </div>

          {/* Insights */}
          <div className="panel insights-panel">
            <p className="section-kicker">Points clés</p>
            <h3>Ce qu'il faut retenir</h3>
            <ul className="insights-list">
              {insights.map((it, i) => (
                <li key={i} className="insight-item">
                  <span className="insight-icon">{it.icon}</span>
                  <span>{it.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Summary + note */}
          <div className="details-grid">
            <Summary result={result} />
            <div className="panel note-card">
              <p className="section-kicker">Important</p>
              <p className="note-text">
                Ces chiffres sont des <strong>estimations pédagogiques</strong>.
                Ils ne tiennent pas compte des impôts, de votre situation
                personnelle ni des fluctuations du marché. Consultez un
                conseiller avant de décider.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="result-footer">
        <button className="btn-secondary" onClick={onEdit} type="button">
          ← Modifier mes données
        </button>
      </div>
    </div>
  );
}

function buildInsights({ result, values, monthlyDiff, breakevenYear }) {
  const { isBuyingBetter, propertyValueAtEnd, ownerMonthlyTotal } = result;
  return [
    {
      icon: "💸",
      text: monthlyDiff > 0
        ? `En achetant, vous paieriez ${formatCurrency(monthlyDiff)} de plus par mois qu'en louant. Cette somme constitue de l'épargne forcée via le remboursement du capital.`
        : `En achetant, vous paieriez ${formatCurrency(-monthlyDiff)} de moins par mois qu'en louant — avantage immédiat pour l'achat.`,
    },
    {
      icon: "📅",
      text: breakevenYear
        ? `L'achat devient plus rentable à partir de ${breakevenYear} an${breakevenYear > 1 ? "s" : ""}. En dessous, la location garde l'avantage.`
        : `Sur ${values.comparisonYears} ans, la location garde l'avantage. Un horizon plus long pourrait inverser la tendance.`,
    },
    {
      icon: "🏠",
      text: `Dans ${values.comparisonYears} ans, le bien vaudrait environ ${formatCurrency(propertyValueAtEnd)} avec une hausse de ${values.appreciationRate} %/an.`,
    },
    {
      icon: isBuyingBetter ? "📈" : "🔑",
      text: isBuyingBetter
        ? `L'achat constitue un patrimoine immobilier et protège contre la hausse des loyers — au prix d'un engagement à long terme.`
        : `En restant locataire, vous gardez la flexibilité de déménager et un capital liquide plus important.`,
    },
  ];
}
