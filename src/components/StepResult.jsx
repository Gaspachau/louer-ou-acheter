import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine,
} from "recharts";
import { formatCurrency } from "../utils/finance";
import { trackResultComputed } from "../utils/analytics";
import Summary from "./Summary";

/* ─── Custom chart tooltip ───────────────────────────────── */
function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  const owner  = payload.find((p) => p.dataKey === "ownerNetWorth");
  const renter = payload.find((p) => p.dataKey === "renterPortfolio");
  return (
    <div className="res-chart-tip">
      <p className="res-chart-tip-year">{label} an{label > 1 ? "s" : ""}</p>
      {owner  && <div className="res-chart-tip-row"><span className="res-chart-tip-dot" style={{ background: "#2563eb" }}/><span>Achat</span><strong>{formatCurrency(owner.value)}</strong></div>}
      {renter && <div className="res-chart-tip-row"><span className="res-chart-tip-dot" style={{ background: "#ec4899" }}/><span>Location</span><strong>{formatCurrency(renter.value)}</strong></div>}
    </div>
  );
}

/* ─── Natural language summary ───────────────────────────── */
function buildNaturalSummary({ result, values, monthlyDiff, breakevenYear }) {
  const { isBuyingBetter, advantage, ownerNetWorth, renterPortfolio } = result;
  const y = values.comparisonYears;
  const adv = formatCurrency(Math.abs(advantage));

  if (isBuyingBetter) {
    return breakevenYear
      ? `En achetant, votre patrimoine net dépasse celui du locataire dès ${breakevenYear} an${breakevenYear > 1 ? "s" : ""}. Sur ${y} ans, vous accumulez ${adv} de plus qu'en restant locataire.`
      : `Sur ${y} ans, acheter vous permet d'accumuler ${adv} de plus qu'en restant locataire (${formatCurrency(ownerNetWorth)} vs ${formatCurrency(renterPortfolio)}).`;
  } else {
    return breakevenYear
      ? `En restant locataire et en plaçant la différence, vous accumulez ${adv} de plus sur ${y} ans. L'achat ne deviendrait avantageux qu'après ${breakevenYear} an${breakevenYear > 1 ? "s" : ""}.`
      : `En restant locataire ${y} ans, vous accumulez ${adv} de plus qu'en achetant (${formatCurrency(renterPortfolio)} vs ${formatCurrency(ownerNetWorth)}). L'achat n'atteint pas l'équilibre sur cet horizon.`;
  }
}

/* ─── Contextual tips ────────────────────────────────────── */
function getContextualTips({ result, values }) {
  const tips = [];
  const apportPct = values.downPayment / values.purchasePrice;
  if (apportPct < 0.1) {
    tips.push({ type: "warn", text: "Apport < 10 % — les banques exigent souvent 10 % minimum, et préfèrent 20 % pour les meilleures conditions." });
  }
  if (values.comparisonYears <= 5) {
    tips.push({ type: "warn", text: `Sur ${values.comparisonYears} ans, les frais d'achat (~8–10 %) ont à peine le temps de s'amortir.` });
  }
  if (!result.isBuyingBetter && values.comparisonYears < 12) {
    tips.push({ type: "info", text: `Testez 15–20 ans : l'achat gagne souvent sur le long terme une fois les frais initiaux absorbés.` });
  }
  if (result.isBuyingBetter && result.advantage > 60000) {
    tips.push({ type: "ok", text: `L'achat est nettement gagnant. Le bien s'apprécie suffisamment pour compenser les frais d'entrée.` });
  }
  if (values.monthlySavings > 0) {
    tips.push({ type: "info", text: `Votre épargne de ${formatCurrency(values.monthlySavings)}/mois fait une vraie différence sur ${values.comparisonYears} ans.` });
  }
  return tips.slice(0, 2);
}

/* ─── Smart suggestions ──────────────────────────────────── */
function SmartSuggestions({ isBuyingBetter, values, result }) {
  const apportPct = values.downPayment / values.purchasePrice;

  const buySuggestions = [
    { href: "/simulateurs/frais-notaire", icon: "📋", title: "Calculez vos frais de notaire", desc: "Estimez précisément les frais selon le barème légal 2026 — ancien ou neuf." },
    { href: "/simulateurs/pret-immobilier", icon: "🏦", title: "Tableau d'amortissement", desc: "Votre mensualité, le coût total et le tableau d'amortissement année par année." },
    apportPct < 0.15
      ? { href: "/simulateurs/ptz", icon: "🏗️", title: "Vérifiez votre éligibilité PTZ", desc: "Prêt à Taux Zéro 2026 : économisez jusqu'à 50 000 € selon votre profil." }
      : { href: "/simulateurs/assurance-pret", icon: "🛡️", title: "Comparez l'assurance emprunteur", desc: "Loi Lemoine : changer d'assurance peut économiser 10 000–20 000 € sur 20 ans." },
    { href: "/simulateurs/machine-temps", icon: "⏳", title: "Et si vous aviez acheté plus tôt ?", desc: "Calculez le gain ou la perte selon la date à laquelle vous auriez acheté." },
  ];

  const rentSuggestions = [
    { href: "/simulateurs/optimiser-apport", icon: "💡", title: "Optimisez votre apport", desc: "Acheter maintenant ou épargner encore ? Le ROI chiffré de chaque option." },
    { href: "/simulateurs/epargne", icon: "💰", title: "Construisez votre apport", desc: "Calculez l'épargne mensuelle pour atteindre votre objectif dans X mois." },
    { href: "/simulateurs/pouvoir-achat-m2", icon: "🗺️", title: "Où pouvez-vous acheter ?", desc: "Combien de m² votre budget offre dans 10 villes françaises — visualisé en un clin d'œil." },
    { href: "/simulateurs/calendrier-acheteur", icon: "📅", title: "Votre feuille de route", desc: "Un calendrier personnalisé des étapes vers votre achat selon votre situation." },
  ];

  const suggestions = (isBuyingBetter ? buySuggestions : rentSuggestions).slice(0, 3);

  return (
    <div className="smart-suggestions">
      <div className="smart-sug-header">
        <p className="smart-sug-kicker">Étape suivante</p>
        <h2 className="smart-sug-title">
          {isBuyingBetter ? "Concrétisez votre achat" : "Préparez votre projet"}
        </h2>
        <p className="smart-sug-desc">
          {isBuyingBetter
            ? "L'achat est avantageux. Voici les simulateurs pour bien préparer votre dossier."
            : "La location est plus rentable maintenant. Préparez-vous à acheter quand le moment sera idéal."}
        </p>
      </div>
      <div className="smart-sug-grid">
        {suggestions.map((s) => (
          <Link key={s.href} to={s.href} className="smart-sug-card">
            <span className="smart-sug-icon">{s.icon}</span>
            <div>
              <p className="smart-sug-card-title">{s.title}</p>
              <p className="smart-sug-card-desc">{s.desc}</p>
            </div>
            <span className="smart-sug-arrow">→</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

/* ─── Main component ─────────────────────────────────────── */
export default function StepResult({ result, values, onEdit }) {
  const [copied, setCopied] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const {
    isBuyingBetter, recommendation, advantage,
    ownerMonthlyTotal, ownerNetWorth, renterPortfolio,
    notaryFees, yearlyData, minPropertyValue,
  } = result;

  const monthlyDiff  = ownerMonthlyTotal - values.monthlyRent;
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

  const naturalSummary = buildNaturalSummary({ result, values, monthlyDiff, breakevenYear });
  const tips = getContextualTips({ result, values });
  const winner  = isBuyingBetter ? "buy" : "rent";

  /* share */
  const handleShare = async () => {
    const text =
      `Simulation Louer ou Acheter — ${values.comparisonYears} ans\n\n` +
      `🏠 Acheter  : ${formatCurrency(ownerNetWorth)} de patrimoine net\n` +
      `📈 Louer    : ${formatCurrency(renterPortfolio)} de capital accumulé\n\n` +
      `Verdict : ${recommendation} (avantage de ${formatCurrency(Math.abs(advantage))})\n` +
      `Mensualité : ${formatCurrency(ownerMonthlyTotal)}/mois vs loyer ${formatCurrency(values.monthlyRent)}/mois`;
    try {
      if (navigator.share) {
        await navigator.share({ title: "Louer ou Acheter ?", text });
      } else {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2200);
      }
    } catch { /* ignore */ }
  };

  /* chart tick formatter */
  const fmtYAxis = (v) => {
    if (Math.abs(v) >= 1_000_000) return `${(v / 1_000_000).toFixed(1)}M`;
    if (Math.abs(v) >= 1_000) return `${Math.round(v / 1_000)}k`;
    return `${v}`;
  };

  return (
    <div className="result-page" id="main-content" aria-label="Résultats de la simulation">

      {/* ══ 1 — VERDICT HERO ════════════════════════════════ */}
      <section className={`res-verdict-hero res-verdict-${winner}`} aria-live="polite">
        <div className="res-verdict-badge">
          {isBuyingBetter
            ? <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 12l7 7L21 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            : <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 2v20M2 12h20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/></svg>
          }
        </div>
        <div className="res-verdict-content">
          <p className="res-verdict-label">Meilleure option sur {values.comparisonYears} ans</p>
          <h1 className="res-verdict-title">
            {isBuyingBetter ? "Acheter" : "Louer"}
            <span className="res-verdict-sub"> est plus avantageux</span>
          </h1>
          <p className="res-verdict-summary">{naturalSummary}</p>
        </div>
        <div className="res-verdict-delta">
          <span className="res-verdict-delta-label">Avantage</span>
          <span className="res-verdict-delta-amount">{formatCurrency(Math.abs(advantage))}</span>
          <span className="res-verdict-delta-sub">de patrimoine en plus</span>
        </div>
      </section>

      {/* ══ 2 — 3 KEY METRICS ═══════════════════════════════ */}
      <div className="res-metrics" role="group" aria-label="Chiffres clés">
        <div className="res-metric-card res-metric-blue">
          <span className="res-metric-label">Mensualité propriétaire</span>
          <span className="res-metric-value">{formatCurrency(ownerMonthlyTotal)}</span>
          <span className="res-metric-sub">vs {formatCurrency(values.monthlyRent)}/mois de loyer</span>
        </div>
        <div className={`res-metric-card ${isBuyingBetter ? "res-metric-green" : "res-metric-pink"}`}>
          <span className="res-metric-label">Différence de patrimoine</span>
          <span className="res-metric-value">{formatCurrency(Math.abs(advantage))}</span>
          <span className="res-metric-sub">en faveur de {isBuyingBetter ? "l'achat" : "la location"}</span>
        </div>
        <div className="res-metric-card res-metric-amber">
          <span className="res-metric-label">Point d'équilibre</span>
          <span className="res-metric-value">
            {breakevenYear ? `${breakevenYear} an${breakevenYear > 1 ? "s" : ""}` : `> ${values.comparisonYears} ans`}
          </span>
          <span className="res-metric-sub">achat = location en patrimoine</span>
        </div>
      </div>

      {/* ══ 3 — PATRIMOINE CHART ════════════════════════════ */}
      <section className="res-chart-section" aria-label="Évolution du patrimoine">
        <div className="res-chart-header">
          <div>
            <p className="res-chart-kicker">Évolution année par année</p>
            <h2 className="res-chart-title">Comment les deux patrimoines évoluent</h2>
          </div>
          <div className="res-chart-legend">
            <span className="res-chart-legend-item">
              <span className="res-chart-legend-dot" style={{ background: "#2563eb" }}/>
              Achat
            </span>
            <span className="res-chart-legend-item">
              <span className="res-chart-legend-dot" style={{ background: "#ec4899" }}/>
              Location
            </span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={yearlyData} margin={{ top: 10, right: 16, bottom: 0, left: 0 }}>
            <defs>
              <linearGradient id="gradOwner" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.18}/>
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0.02}/>
              </linearGradient>
              <linearGradient id="gradRenter" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ec4899" stopOpacity={0.14}/>
                <stop offset="95%" stopColor="#ec4899" stopOpacity={0.02}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--line)" vertical={false}/>
            <XAxis
              dataKey="year"
              tickFormatter={(v) => `${v}a`}
              tick={{ fontSize: 11, fill: "var(--muted)" }}
              axisLine={false} tickLine={false}
            />
            <YAxis
              tickFormatter={fmtYAxis}
              tick={{ fontSize: 11, fill: "var(--muted)" }}
              axisLine={false} tickLine={false}
              width={48}
            />
            <Tooltip content={<ChartTooltip />} cursor={{ stroke: "var(--line)", strokeWidth: 1 }}/>
            {breakevenYear && (
              <ReferenceLine
                x={breakevenYear}
                stroke="#94a3b8"
                strokeDasharray="4 3"
                label={{ value: `Équilibre ${breakevenYear}a`, position: "top", fontSize: 10, fill: "#94a3b8" }}
              />
            )}
            <Area
              type="monotone" dataKey="renterPortfolio" name="Location"
              stroke="#ec4899" strokeWidth={2.5}
              fill="url(#gradRenter)" dot={false} activeDot={{ r: 4, fill: "#ec4899" }}
            />
            <Area
              type="monotone" dataKey="ownerNetWorth" name="Achat"
              stroke="#2563eb" strokeWidth={2.5}
              fill="url(#gradOwner)" dot={false} activeDot={{ r: 4, fill: "#2563eb" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </section>

      {/* ══ 4 — SCOREBOARD ══════════════════════════════════ */}
      <section className="scoreboard" aria-label="Comparaison des deux scénarios">
        <article className={`score-card ${isBuyingBetter ? "sc-winner" : "sc-loser"} sc-buy`}>
          {isBuyingBetter && <span className="sc-badge">✓ Meilleure option</span>}
          <span className="sc-icon" aria-hidden="true">🏠</span>
          <span className="sc-label">Acheter</span>
          <div className="sc-amount">{formatCurrency(ownerNetWorth)}</div>
          <p className="sc-amount-label">Patrimoine net dans {values.comparisonYears} an{values.comparisonYears > 1 ? "s" : ""}</p>
          <div className="sc-monthly">
            <strong>{formatCurrency(ownerMonthlyTotal)}</strong>
            <span>/mois</span>
          </div>
          <p className="sc-monthly-label">mensualité + charges</p>
        </article>

        <div className="score-vs" aria-hidden="true">
          <span>vs</span>
          <div className={`advantage-pill ${isBuyingBetter ? "ap-buy" : "ap-rent"}`}>
            {formatCurrency(Math.abs(advantage))}<br/>de différence
          </div>
        </div>

        <article className={`score-card ${!isBuyingBetter ? "sc-winner" : "sc-loser"} sc-rent`}>
          {!isBuyingBetter && <span className="sc-badge">✓ Meilleure option</span>}
          <span className="sc-icon" aria-hidden="true">📈</span>
          <span className="sc-label">Louer</span>
          <div className="sc-amount">{formatCurrency(renterPortfolio)}</div>
          <p className="sc-amount-label">Capital investi dans {values.comparisonYears} an{values.comparisonYears > 1 ? "s" : ""}</p>
          <div className="sc-monthly">
            <strong>{formatCurrency(values.monthlyRent)}</strong>
            <span>/mois</span>
          </div>
          <p className="sc-monthly-label">loyer mensuel</p>
        </article>
      </section>

      {/* ══ 5 — TIPS ════════════════════════════════════════ */}
      {tips.length > 0 && (
        <div className="tips-list" role="note">
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

      {/* ══ 6 — MIN PROPERTY VALUE ══════════════════════════ */}
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

      {/* ══ 7 — ACTIONS ═════════════════════════════════════ */}
      <div className="res-actions">
        <button className="btn-share" onClick={handleShare} type="button" aria-label="Partager les résultats">
          {copied ? "✓ Copié !" : "⎘ Partager les résultats"}
        </button>
        <button className="btn-secondary res-restart-btn" onClick={onEdit} type="button">
          ↩ Modifier les données
        </button>
      </div>

      {/* ══ 8 — DETAILS expandable ══════════════════════════ */}
      <button
        className={`details-toggle ${showDetails ? "dt-open" : ""}`}
        onClick={() => setShowDetails(!showDetails)}
        type="button"
        aria-expanded={showDetails}
        aria-controls="details-content"
      >
        {showDetails ? "▲ Masquer le détail complet" : "▼ Voir le détail complet"}
      </button>

      {showDetails && (
        <div id="details-content" className="details-section">
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

      {/* ══ 9 — SMART SUGGESTIONS ════════════════════════════ */}
      <SmartSuggestions isBuyingBetter={isBuyingBetter} values={values} result={result} />

      <div className="post-sim-section" style={{ marginTop: 0 }}>
        <NewsletterBox />
      </div>

      <div className="result-footer">
        <button className="btn-secondary" onClick={onEdit} type="button">← Modifier mes données</button>
      </div>
    </div>
  );
}

function NewsletterBox() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

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
          <p className="newsletter-desc">Taux immobiliers, modifications HCSF, nouvelles aides — on vous prévient dès que ça change. Pas de spam, désinscription en un clic.</p>
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
          <button type="submit" className="btn-primary newsletter-btn">S'inscrire →</button>
        </form>
      )}
      {status === "error" && <p className="newsletter-error">Adresse e-mail invalide.</p>}
      <p className="newsletter-rgpd">Aucune donnée transmise à des tiers. <Link to="/mentions-legales">Politique de confidentialité</Link></p>
    </div>
  );
}
