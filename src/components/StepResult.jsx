import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { formatCurrency } from "../utils/finance";
import { trackResultComputed } from "../utils/analytics";
import ProgressionChart from "./ProgressionChart";
import Summary from "./Summary";

function getContextualTips({ result, values }) {
  const tips = [];
  const apportPct = values.downPayment / values.purchasePrice;

  if (apportPct < 0.1) {
    tips.push({ type: "warn", text: "Votre apport est inférieur à 10 %. Les banques exigent souvent au moins 10 % pour accorder un prêt — et préfèrent 20 % pour les meilleures conditions." });
  }
  if (values.comparisonYears <= 5) {
    tips.push({ type: "warn", text: `Sur ${values.comparisonYears} ans, les frais d'achat (~8–10 %) ont à peine le temps de s'amortir. C'est souvent pourquoi la location gagne sur les horizons courts.` });
  }
  if (!result.isBuyingBetter && values.comparisonYears < 12) {
    tips.push({ type: "info", text: `Testez un horizon de 15–20 ans : l'achat gagne souvent sur le long terme une fois les frais initiaux absorbés.` });
  }
  if (result.isBuyingBetter && result.advantage > 60000) {
    tips.push({ type: "ok", text: `L'achat est nettement gagnant. Le bien s'apprécie suffisamment pour compenser les frais d'entrée et l'effort mensuel plus élevé.` });
  }
  if (values.monthlySavings > 0) {
    tips.push({ type: "info", text: `Votre épargne mensuelle de ${formatCurrency(values.monthlySavings)} fait une vraie différence. Sur ${values.comparisonYears} ans, c'est ${formatCurrency(values.monthlySavings * values.comparisonYears * 12)} placés — hors rendement.` });
  }
  return tips.slice(0, 2); // max 2 tips
}

function buildInsights({ result, values, monthlyDiff, breakevenYear }) {
  return [
    {
      icon: "💸",
      text: monthlyDiff > 0
        ? `Mensualité propriétaire : ${formatCurrency(result.ownerMonthlyTotal)}/mois vs ${formatCurrency(values.monthlyRent)}/mois de loyer. ${formatCurrency(monthlyDiff)}/mois de plus — épargne forcée via le remboursement du capital.`
        : `La mensualité (${formatCurrency(result.ownerMonthlyTotal)}/mois) est inférieure au loyer (${formatCurrency(values.monthlyRent)}/mois). Avantage immédiat pour l'achat : ${formatCurrency(-monthlyDiff)}/mois d'économie.`,
    },
    {
      icon: "📅",
      text: breakevenYear
        ? `L'achat devient plus rentable à partir de ${breakevenYear} an${breakevenYear > 1 ? "s" : ""}. En dessous, la location garde l'avantage malgré la constitution de patrimoine.`
        : `Sur ${values.comparisonYears} ans, la location garde l'avantage. L'achat pourrait prendre l'avantage sur un horizon plus long.`,
    },
    {
      icon: "🏠",
      text: `Dans ${values.comparisonYears} ans, le bien vaudrait environ ${formatCurrency(result.propertyValueAtEnd)} avec une hausse de ${values.appreciationRate} %/an. Frais de revente estimés : ${formatCurrency(result.saleCosts)}.`,
    },
    {
      icon: result.isBuyingBetter ? "📈" : "🔑",
      text: result.isBuyingBetter
        ? "L'achat constitue un patrimoine immobilier tangible et protège contre la hausse des loyers — au prix d'un engagement long terme."
        : "La location offre plus de flexibilité et un capital liquide. Idéal si votre situation professionnelle ou personnelle peut évoluer.",
    },
  ];
}

export default function StepResult({ result, values, onEdit }) {
  const [showDetails, setShowDetails] = useState(false);
  const [copied, setCopied] = useState(false);

  const {
    isBuyingBetter, recommendation, advantage,
    ownerMonthlyTotal, ownerNetWorth, renterPortfolio,
    notaryFees, yearlyData, minPropertyValue,
  } = result;

  const monthlyDiff = ownerMonthlyTotal - values.monthlyRent;
  const renterLumpSum = values.downPayment + notaryFees;
  const breakevenYear = yearlyData?.find((d) => d.ownerNetWorth >= d.renterPortfolio)?.year ?? null;

  useEffect(() => {
    trackResultComputed("Louer ou Acheter", {
      isBuyingBetter,
      breakeven_year: breakevenYear,
      advantage,
      purchase_price: values.purchasePrice,
      down_payment: values.downPayment,
      monthly_rent: values.monthlyRent,
      mortgage_rate: values.mortgageRate,
      comparison_years: values.comparisonYears,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result]);

  const tips = getContextualTips({ result, values });
  const insights = buildInsights({ result, values, monthlyDiff, breakevenYear });

  const handleShare = async () => {
    const text =
      `Simulation Louer ou Acheter — ${values.comparisonYears} ans\n\n` +
      `🏠 Acheter  : ${formatCurrency(ownerNetWorth)} de patrimoine net\n` +
      `📈 Louer    : ${formatCurrency(renterPortfolio)} de capital accumulé\n\n` +
      `Verdict : ${recommendation} (avantage de ${formatCurrency(Math.abs(advantage))})\n` +
      `Mensualité : ${formatCurrency(ownerMonthlyTotal)}/mois vs loyer ${formatCurrency(values.monthlyRent)}/mois`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      /* fallback: ignore */
    }
  };

  return (
    <div className="result-page" role="main" aria-label="Résultats de la simulation">

      {/* ══ 1 — SCOREBOARD ══════════════════════════════════ */}
      <section className="scoreboard" aria-label="Comparaison des deux scénarios">
        <article className={`score-card ${isBuyingBetter ? "sc-winner" : "sc-loser"} sc-buy`} aria-label="Scénario achat">
          {isBuyingBetter && <span className="sc-badge">✓ Meilleure option</span>}
          <span className="sc-icon" aria-hidden="true">🏠</span>
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
        </article>

        <div className="score-vs" aria-hidden="true">
          <span>vs</span>
          <div className={`advantage-pill ${isBuyingBetter ? "ap-buy" : "ap-rent"}`}>
            {formatCurrency(Math.abs(advantage))}
            <br />de différence
          </div>
          {breakevenYear && (
            <span className="breakeven-note">
              Achat + rentable<br />dès {breakevenYear} an{breakevenYear > 1 ? "s" : ""}
            </span>
          )}
        </div>

        <article className={`score-card ${!isBuyingBetter ? "sc-winner" : "sc-loser"} sc-rent`} aria-label="Scénario location">
          {!isBuyingBetter && <span className="sc-badge">✓ Meilleure option</span>}
          <span className="sc-icon" aria-hidden="true">📈</span>
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
        </article>
      </section>

      {/* ══ 2 — VERDICT ════════════════════════════════════ */}
      <div className={`verdict-sentence ${isBuyingBetter ? "vs-buy" : "vs-rent"}`} role="status">
        <strong>{recommendation}</strong> est la meilleure option sur {values.comparisonYears} ans —{" "}
        {isBuyingBetter
          ? `votre patrimoine net serait ${formatCurrency(advantage)} plus élevé qu'en restant locataire.`
          : `votre capital serait ${formatCurrency(Math.abs(advantage))} plus élevé qu'en achetant.`}
      </div>

      {/* ══ 3 — CONTEXTUAL TIPS ════════════════════════════ */}
      {tips.length > 0 && (
        <div className="tips-list" role="note" aria-label="Conseils">
          {tips.map((tip, i) => (
            <div key={i} className={`tip-item tip-${tip.type}`}>
              <span className="tip-icon" aria-hidden="true">
                {tip.type === "warn" ? "⚠️" : tip.type === "ok" ? "✅" : "💡"}
              </span>
              <span>{tip.text}</span>
            </div>
          ))}
        </div>
      )}

      {/* ══ 4 — RENTER OPPORTUNITY ═════════════════════════ */}
      <div className="opportunity-card">
        <div className="opp-left">
          <span className="opp-icon" aria-hidden="true">💡</span>
          <div>
            <p className="opp-title">L'opportunité du locataire</p>
            <p className="opp-text">
              En plaçant <strong>{formatCurrency(renterLumpSum)}</strong> aujourd'hui
              (apport + frais non dépensés) à {values.investmentReturn}&nbsp;%/an
              {values.monthlySavings > 0 ? `, en investissant ${formatCurrency(values.monthlySavings)}/mois` : ""}
              {monthlyDiff > 0 ? ` et ${formatCurrency(monthlyDiff)}/mois de différence de charges` : ""}
              , le locataire accumule <strong>{formatCurrency(renterPortfolio)}</strong> en{" "}
              {values.comparisonYears} ans — sans s'engager sur {values.mortgageYears} ans.
            </p>
          </div>
        </div>
        {monthlyDiff > 0 && (
          <div className="opp-right" aria-label={`${formatCurrency(monthlyDiff)} par mois épargnés en restant locataire`}>
            <span className="opp-saving-label">Épargné / mois</span>
            <strong className="opp-saving-amount">{formatCurrency(monthlyDiff)}</strong>
          </div>
        )}
      </div>

      {/* ══ 5 — MIN PROPERTY VALUE ═════════════════════════ */}
      <div className="min-value-card">
        <span className="min-value-icon" aria-hidden="true">🎯</span>
        <div>
          <p className="min-value-title">Prix de revente nécessaire pour égaliser</p>
          <p className="min-value-text">
            Pour que l'achat soit aussi rentable que la location sur {values.comparisonYears} ans,
            le bien doit se revendre à au moins{" "}
            <strong className="min-value-number">{formatCurrency(minPropertyValue)}</strong>.
            {minPropertyValue > result.propertyValueAtEnd
              ? ` Avec ${values.appreciationRate} %/an, il vaudrait ${formatCurrency(result.propertyValueAtEnd)} — ${formatCurrency(minPropertyValue - result.propertyValueAtEnd)} de moins que nécessaire.`
              : ` Avec ${values.appreciationRate} %/an, il vaudrait ${formatCurrency(result.propertyValueAtEnd)} — le seuil est atteint.`}
          </p>
        </div>
      </div>

      {/* ══ 6 — SHARE + EDIT ═══════════════════════════════ */}
      <div className="result-actions">
        <button
          className="btn-share"
          onClick={handleShare}
          type="button"
          aria-label="Copier le résumé dans le presse-papiers"
        >
          {copied ? "✓ Copié !" : "⎘ Copier les résultats"}
        </button>
      </div>

      {/* ══ 7 — DETAILS (expandable) ═══════════════════════ */}
      <button
        className={`details-toggle ${showDetails ? "dt-open" : ""}`}
        onClick={() => setShowDetails(!showDetails)}
        type="button"
        aria-expanded={showDetails}
        aria-controls="details-content"
      >
        {showDetails ? "▲ Masquer le détail" : "▼ Voir l'évolution et le détail complet"}
      </button>

      {showDetails && (
        <div id="details-content" className="details-section">
          <div className="panel prog-section">
            <p className="section-kicker">Évolution année par année</p>
            <h2 className="panel-h2">Comment les deux patrimoines évoluent</h2>
            <p className="prog-desc">
              Courbe bleue = patrimoine net du propriétaire (valeur du bien − capital
              restant dû − frais de revente). Courbe rose = capital du locataire
              (apport placé + épargne mensuelle + surplus accumulés).
            </p>
            <ProgressionChart yearlyData={yearlyData} />
          </div>

          <div className="panel insights-panel">
            <p className="section-kicker">Points clés</p>
            <h2 className="panel-h2">Ce qu'il faut retenir</h2>
            <ul className="insights-list">
              {insights.map((it, i) => (
                <li key={i} className="insight-item">
                  <span className="insight-icon" aria-hidden="true">{it.icon}</span>
                  <span>{it.text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="details-grid">
            <Summary result={result} />
            <div className="panel note-card">
              <p className="section-kicker">Important</p>
              <p className="note-text">
                Ces chiffres sont des <strong>estimations pédagogiques</strong>.
                Ils ne tiennent pas compte des impôts, de votre situation personnelle
                ni des fluctuations du marché. Consultez un conseiller avant de décider.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ══ POST-SIMULATION ════════════════════════════════ */}
      <div className="post-sim-section">

        {/* Simulateur complémentaire */}
        <div className="post-sim-next">
          <p className="post-sim-next-kicker">Simulateur complémentaire</p>
          {isBuyingBetter ? (
            <Link to="/simulateurs/frais-notaire" className="post-sim-next-card">
              <span className="post-sim-next-icon">📋</span>
              <div>
                <p className="post-sim-next-title">Calculez vos frais de notaire</p>
                <p className="post-sim-next-desc">
                  Vous envisagez d'acheter — estimez précisément les frais de notaire
                  au centime près selon le barème légal 2024.
                </p>
              </div>
              <span className="post-sim-next-arrow">→</span>
            </Link>
          ) : (
            <Link to="/simulateurs/epargne" className="post-sim-next-card">
              <span className="post-sim-next-icon">💰</span>
              <div>
                <p className="post-sim-next-title">Optimisez votre épargne</p>
                <p className="post-sim-next-desc">
                  La location semble avantageuse — calculez l'épargne mensuelle nécessaire
                  pour atteindre votre objectif d'apport.
                </p>
              </div>
              <span className="post-sim-next-arrow">→</span>
            </Link>
          )}
        </div>

        {/* Newsletter */}
        <NewsletterBox />

      </div>

      <div className="result-footer">
        <button className="btn-secondary" onClick={onEdit} type="button">
          ← Modifier mes données
        </button>
      </div>
    </div>
  );
}

function NewsletterBox() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | success | error

  const handleSubmit = (e) => {
    e.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
    if (!valid) { setStatus("error"); return; }
    try {
      const existing = JSON.parse(localStorage.getItem("nl_emails") || "[]");
      if (!existing.includes(email.trim())) existing.push(email.trim());
      localStorage.setItem("nl_emails", JSON.stringify(existing));
    } catch {}
    setStatus("success");
  };

  return (
    <div className="newsletter-box">
      <div className="newsletter-box-inner">
        <span className="newsletter-icon" aria-hidden="true">📬</span>
        <div className="newsletter-text">
          <p className="newsletter-title">Recevez les mises à jour des taux</p>
          <p className="newsletter-desc">
            Taux immobiliers, modifications HCSF, nouvelles aides — on vous prévient dès que ça change.
            Pas de spam, désinscription en un clic.
          </p>
        </div>
      </div>
      {status === "success" ? (
        <p className="newsletter-success">✓ Inscription enregistrée — merci !</p>
      ) : (
        <form className="newsletter-form" onSubmit={handleSubmit} noValidate>
          <input
            type="email"
            className={`newsletter-input${status === "error" ? " newsletter-input-error" : ""}`}
            placeholder="votre@email.fr"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setStatus("idle"); }}
            aria-label="Adresse e-mail"
            autoComplete="email"
          />
          <button type="submit" className="btn-primary newsletter-btn">
            S'inscrire →
          </button>
        </form>
      )}
      {status === "error" && <p className="newsletter-error">Adresse e-mail invalide.</p>}
      <p className="newsletter-rgpd">Aucune donnée transmise à des tiers. <Link to="/mentions-legales">Politique de confidentialité</Link></p>
    </div>
  );
}
