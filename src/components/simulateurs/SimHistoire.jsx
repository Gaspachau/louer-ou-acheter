import { useMemo, useState } from "react";
import SimLayout from "./SimLayout";
import Field from "../Field";

const fmtCur = (v) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(v);

function calcMensualite(capital, taux, dureeAns) {
  const r = taux / 100 / 12;
  const n = dureeAns * 12;
  if (capital <= 0 || n <= 0) return 0;
  return r === 0 ? capital / n : (capital * r) / (1 - Math.pow(1 + r, -n));
}

const SCENARIOS = [
  { id: "pessimiste", label: "Pessimiste", desc: "Marché stable, taux hauts", apprec: 1.0, rendement: 3.0, rentIncrease: 1.5, emoji: "📉" },
  { id: "neutre",     label: "Neutre",     desc: "Hypothèses moyennes",     apprec: 2.0, rendement: 4.0, rentIncrease: 2.0, emoji: "⚖️" },
  { id: "optimiste",  label: "Optimiste",  desc: "Marché dynamique",        apprec: 3.5, rendement: 5.5, rentIncrease: 3.0, emoji: "📈" },
];

function buildTimeline(v, scenario) {
  const { purchasePrice, downPayment, mortgageRate, mortgageYears, monthlyRent, comparisonYears } = v;
  const { apprec, rendement, rentIncrease } = scenario;

  const notaryFees = purchasePrice * 0.08;
  const capital = Math.max(0, purchasePrice + notaryFees - downPayment);
  const monthly = calcMensualite(capital, mortgageRate, mortgageYears);
  const r = rendement / 100 / 12;

  const lumpSum = downPayment + notaryFees;
  const monthlyDiff = Math.max(0, monthly - monthlyRent);

  const events = [];
  const yearlyData = [];

  let remainingCapital = capital;
  let renterPortfolio = lumpSum;

  for (let yr = 1; yr <= Math.max(comparisonYears, mortgageYears); yr++) {
    // Owner side
    for (let m = 0; m < 12; m++) {
      if (yr * 12 + m <= mortgageYears * 12) {
        const rM = mortgageRate / 100 / 12;
        const interest = remainingCapital * rM;
        const principalPaid = Math.max(0, monthly - interest);
        remainingCapital = Math.max(0, remainingCapital - principalPaid);
      }
    }
    const propertyValue = purchasePrice * Math.pow(1 + apprec / 100, yr);
    const equity = propertyValue - remainingCapital - purchasePrice * 0.05;
    const ownerNetWorth = Math.max(0, equity);
    const loanPaidPct = capital > 0 ? Math.min(100, ((capital - remainingCapital) / capital) * 100) : 100;

    // Renter side
    for (let m = 0; m < 12; m++) {
      renterPortfolio = renterPortfolio * (1 + r) + monthlyDiff / 12;
    }

    yearlyData.push({ yr, ownerNetWorth, renterPortfolio, propertyValue, remainingCapital, loanPaidPct });
  }

  // Build milestone events
  const buyerWinsAt = yearlyData.find((d) => d.ownerNetWorth >= d.renterPortfolio);
  const loanHalfPaid = yearlyData.find((d) => d.loanPaidPct >= 50);
  const loanDone = Math.min(mortgageYears, comparisonYears);
  const equityPositive = yearlyData.find((d) => d.ownerNetWorth > 0);

  events.push({
    year: 0,
    icon: "🏠",
    title: "Acquisition",
    desc: `Vous achetez ${fmtCur(purchasePrice)} avec ${fmtCur(downPayment)} d'apport. Mensualité : ${fmtCur(monthly)}/mois.`,
    type: "buy",
  });

  if (equityPositive) {
    events.push({
      year: equityPositive.yr,
      icon: "✅",
      title: "Patrimoine net positif",
      desc: `Votre bien vaut ${fmtCur(equityPositive.propertyValue)} — vous possédez un patrimoine net de ${fmtCur(equityPositive.ownerNetWorth)}.`,
      type: "milestone",
    });
  }

  if (loanHalfPaid) {
    events.push({
      year: loanHalfPaid.yr,
      icon: "🎯",
      title: "Crédit remboursé à 50 %",
      desc: `Vous avez remboursé la moitié de votre capital emprunté. Capital restant : ${fmtCur(loanHalfPaid.remainingCapital)}.`,
      type: "milestone",
    });
  }

  if (buyerWinsAt) {
    events.push({
      year: buyerWinsAt.yr,
      icon: "🏆",
      title: "Point de bascule",
      desc: `L'achat dépasse la location : patrimoine propriétaire (${fmtCur(buyerWinsAt.ownerNetWorth)}) > capital locataire (${fmtCur(buyerWinsAt.renterPortfolio)}).`,
      type: "win",
    });
  }

  if (loanDone <= comparisonYears) {
    const d = yearlyData.find((x) => x.yr === loanDone);
    if (d) {
      events.push({
        year: loanDone,
        icon: "🎉",
        title: `Crédit remboursé (an ${loanDone})`,
        desc: `Vous êtes propriétaire à 100 %. Votre bien vaut ${fmtCur(d.propertyValue)}. Plus aucune mensualité.`,
        type: "done",
      });
    }
  }

  const finalD = yearlyData.find((d) => d.yr === comparisonYears);
  if (finalD) {
    events.push({
      year: comparisonYears,
      icon: finalD.ownerNetWorth >= finalD.renterPortfolio ? "🏠" : "📈",
      title: `Bilan final — an ${comparisonYears}`,
      desc: `Propriétaire : ${fmtCur(finalD.ownerNetWorth)} de patrimoine net. Locataire : ${fmtCur(finalD.renterPortfolio)} de capital. L'${finalD.ownerNetWorth >= finalD.renterPortfolio ? "achat" : "a location"} gagne de ${fmtCur(Math.abs(finalD.ownerNetWorth - finalD.renterPortfolio))}.`,
      type: finalD.ownerNetWorth >= finalD.renterPortfolio ? "buy" : "rent",
    });
  }

  events.sort((a, b) => a.year - b.year);
  return { events, finalD, monthly };
}

const TYPE_COLORS = {
  buy: "#2563eb",
  rent: "#06b6d4",
  milestone: "#7c3aed",
  win: "#059669",
  done: "#d97706",
};

export default function SimHistoire() {
  const [scenario, setScenario] = useState("neutre");
  const [v, setV] = useState({
    purchasePrice: 250000,
    downPayment: 50000,
    mortgageRate: 3.5,
    mortgageYears: 20,
    monthlyRent: 1000,
    comparisonYears: 20,
  });
  const set = (k) => (val) => setV((s) => ({ ...s, [k]: val }));

  const sc = SCENARIOS.find((s) => s.id === scenario);
  const { events, finalD, monthly } = useMemo(() => buildTimeline(v, sc), [v, sc]);

  return (
    <SimLayout
      icon="📖"
      title="Votre histoire financière"
      description="Visualisez votre vie de propriétaire ou de locataire, année par année, comme un récit avec ses rebondissements."
    >
      <div className="sim-layout">
        {/* Inputs */}
        <div className="sim-card">
          <p className="sim-card-legend">Votre projet</p>
          <div className="step-fields">
            <Field label="Prix du bien" value={v.purchasePrice} onChange={set("purchasePrice")} suffix="€" tooltip="Prix d'achat hors frais de notaire. Médiane France 2026 : ~250 000 € (source : Notaires de France)." />
            <Field label="Apport" value={v.downPayment} onChange={set("downPayment")} suffix="€" tooltip="Épargne mobilisée directement, sans emprunt. Minimum recommandé : 10 % du prix pour couvrir les frais de notaire." />
            <Field label="Taux du crédit" value={v.mortgageRate} onChange={set("mortgageRate")} suffix="%" step="0.1" tooltip="Taux d'intérêt annuel de votre prêt. Moyenne France 2026 : 3,3–3,7 % sur 20 ans. Comparez les offres avec un courtier." />
            <Field label="Durée du prêt" value={v.mortgageYears} onChange={set("mortgageYears")} suffix="ans" tooltip="Nombre d'années de remboursement. Plus c'est long → mensualité basse mais intérêts totaux élevés. Limite légale HCSF : 25 ans (27 ans dans le neuf)." />
            <Field label="Loyer actuel" value={v.monthlyRent} onChange={set("monthlyRent")} suffix="€/mois" tooltip="Loyer mensuel charges comprises. Moyenne nationale : ~700 €/mois. À Paris : ~1 400 €, en province : ~600–700 €." />
          </div>

          <div style={{ marginTop: 16 }}>
            <div className="horizon-box">
              <div className="horizon-row">
                <div>
                  <label className="horizon-label">Horizon de l'histoire</label>
                  <p className="horizon-explain">Sur combien d'années raconter l'histoire ?</p>
                </div>
                <strong className="horizon-value">{v.comparisonYears} ans</strong>
              </div>
              <input type="range" min="5" max="30" step="1"
                value={v.comparisonYears}
                onChange={(e) => setV((x) => ({ ...x, comparisonYears: Number(e.target.value) }))}
                style={{ "--range-pct": `${((v.comparisonYears - 5) / 25) * 100}%` }}
                aria-label={`Horizon : ${v.comparisonYears} ans`} />
              <div className="horizon-ticks"><span>5 ans</span><span>15 ans</span><span>30 ans</span></div>
            </div>
          </div>

          <p className="sim-card-legend" style={{ marginTop: 16 }}>Scénario économique</p>
          <div className="histoire-scenario-btns">
            {SCENARIOS.map((s) => (
              <button
                key={s.id}
                type="button"
                className={`histoire-scenario-btn${scenario === s.id ? " histoire-scenario-active" : ""}`}
                onClick={() => setScenario(s.id)}
              >
                <span>{s.emoji}</span>
                <span className="histoire-scenario-name">{s.label}</span>
                <span className="histoire-scenario-desc">{s.desc}</span>
              </button>
            ))}
          </div>

          {/* Quick legend */}
          <div className="sim-info-box" style={{ marginTop: 16 }}>
            <p className="sim-info-title">📌 Hypothèses scénario {sc.label.toLowerCase()}</p>
            <p className="sim-info-body">
              Appréciation du bien : <strong>+{sc.apprec}%/an</strong> —
              Rendement placement locataire : <strong>{sc.rendement}%/an</strong> —
              Hausse loyers : <strong>+{sc.rentIncrease}%/an</strong>
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div className="sim-results-panel">
          {finalD && (
            <div className={`sim-verdict ${finalD.ownerNetWorth >= finalD.renterPortfolio ? "sim-verdict-green" : "sim-verdict-amber"}`}>
              <strong>
                {finalD.ownerNetWorth >= finalD.renterPortfolio
                  ? `L'achat gagne sur ${v.comparisonYears} ans (scénario ${sc.label.toLowerCase()})`
                  : `La location gagne sur ${v.comparisonYears} ans (scénario ${sc.label.toLowerCase()})`}
              </strong>
              <p>
                Différence de {fmtCur(Math.abs(finalD.ownerNetWorth - finalD.renterPortfolio))} en faveur de l'
                {finalD.ownerNetWorth >= finalD.renterPortfolio ? "achat" : "location"}.
                Mensualité crédit : {fmtCur(monthly)}/mois.
              </p>
            </div>
          )}

          {/* Timeline events */}
          <div className="histoire-timeline">
            {events.map((ev, i) => {
              const color = TYPE_COLORS[ev.type] || "#2563eb";
              return (
                <div key={i} className="histoire-event">
                  <div className="histoire-event-left">
                    <div className="histoire-event-dot" style={{ borderColor: color, background: color + "22" }}>
                      <span>{ev.icon}</span>
                    </div>
                    {i < events.length - 1 && (
                      <div className="histoire-event-line" style={{ background: color + "44" }} />
                    )}
                  </div>
                  <div className="histoire-event-body">
                    <div className="histoire-event-year" style={{ color }}>
                      {ev.year === 0 ? "Aujourd'hui" : `An ${ev.year} — ${new Date().getFullYear() + ev.year}`}
                    </div>
                    <p className="histoire-event-title">{ev.title}</p>
                    <p className="histoire-event-desc">{ev.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </SimLayout>
  );
}
