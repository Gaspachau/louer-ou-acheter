import { useMemo, useState } from "react";
import Field from "../Field";
import SimLayout from "./SimLayout";
import { formatCurrency } from "../../utils/finance";

function calcEpargne({ goal, initial, annualReturn, years }) {
  if (!goal || goal <= 0 || years <= 0) return null;
  const r = annualReturn / 100 / 12;
  const n = years * 12;
  const fvInitial = initial * Math.pow(1 + r, n);
  if (fvInitial >= goal) {
    return { monthlySavings: 0, totalContributions: 0, totalInterest: goal - initial, goalReachedByInitial: true };
  }
  const monthly = r === 0
    ? (goal - initial) / n
    : (goal - fvInitial) * r / (Math.pow(1 + r, n) - 1);
  const totalContributions = monthly * n;
  const totalInterest = goal - initial - totalContributions;
  return { monthlySavings: monthly, totalContributions, totalInterest, goalReachedByInitial: false };
}

export default function SimEpargne() {
  const [v, setV] = useState({ goal: 50000, initial: 5000, annualReturn: 4, years: 10 });
  const set = (k) => (val) => setV((s) => ({ ...s, [k]: val }));

  const res = useMemo(() => calcEpargne(v), [v]);
  const pct = res && v.goal > 0 ? Math.min(100, ((v.initial + (res.totalContributions ?? 0)) / v.goal) * 100) : 0;
  const interestPct = res && v.goal > 0 ? Math.min(100, ((res.totalInterest ?? 0) / v.goal) * 100) : 0;

  return (
    <SimLayout
      icon="💰"
      title="Simulateur d'épargne"
      description="Calculez combien épargner chaque mois pour atteindre votre objectif financier."
    >
      <div className="sim-layout">
        <div className="sim-card">
          <p className="sim-card-legend">Votre objectif</p>
          <div className="step-fields">
            <div className="field-full">
              <Field label="Objectif à atteindre" value={v.goal} onChange={set("goal")} suffix="€" hint="Capital cible (achat, retraite, projet…)" />
            </div>
            <Field label="Capital de départ" value={v.initial} onChange={set("initial")} suffix="€" hint="Épargne déjà constituée" />
            <Field label="Rendement annuel" value={v.annualReturn} onChange={set("annualReturn")} suffix="%" hint="Livret A=3 % · ETF≈5–7 %" />
            <div className="field-full">
              <label className="field-label">Horizon</label>
              <div className="horizon-box" style={{ marginTop: 6 }}>
                <div className="horizon-row">
                  <p className="horizon-explain">Dans combien d'années souhaitez-vous atteindre l'objectif ?</p>
                  <strong className="horizon-value" aria-live="polite">{v.years} ans</strong>
                </div>
                <input
                  type="range" min="1" max="40" step="1"
                  value={v.years}
                  onChange={(e) => set("years")(Number(e.target.value))}
                  aria-label={`Horizon : ${v.years} ans`}
                />
                <div className="horizon-ticks"><span>1 an</span><span>20 ans</span><span>40 ans</span></div>
              </div>
            </div>
          </div>
        </div>

        <div className="sim-results-panel">
          {!res ? (
            <p className="sim-empty">Renseignez un objectif pour voir les résultats.</p>
          ) : res.goalReachedByInitial ? (
            <div className="sim-result-ok">
              <span className="sim-ok-icon">✅</span>
              <p>Votre capital de départ atteint déjà l'objectif avec les intérêts.</p>
              <p className="sim-ok-sub">
                {formatCurrency(v.initial)} placé à {v.annualReturn} %/an pendant {v.years} ans →{" "}
                <strong>{formatCurrency(v.initial * Math.pow(1 + v.annualReturn / 100, v.years))}</strong>
              </p>
            </div>
          ) : (
            <>
              <div className="sim-stat-hero">
                <span className="sim-stat-label">Épargne mensuelle nécessaire</span>
                <span className="sim-stat-value">{formatCurrency(res.monthlySavings)}<span className="sim-stat-unit">/mois</span></span>
              </div>

              <div className="sim-stats-grid">
                <div className="sim-stat-card">
                  <span className="sim-stat-card-label">Objectif</span>
                  <span className="sim-stat-card-value">{formatCurrency(v.goal)}</span>
                </div>
                <div className="sim-stat-card">
                  <span className="sim-stat-card-label">Apport initial</span>
                  <span className="sim-stat-card-value">{formatCurrency(v.initial)}</span>
                </div>
                <div className="sim-stat-card sim-stat-card-blue">
                  <span className="sim-stat-card-label">Versements totaux</span>
                  <span className="sim-stat-card-value">{formatCurrency(res.totalContributions)}</span>
                </div>
                <div className="sim-stat-card sim-stat-card-green">
                  <span className="sim-stat-card-label">Intérêts générés</span>
                  <span className="sim-stat-card-value">{formatCurrency(Math.max(0, res.totalInterest))}</span>
                </div>
              </div>

              <div className="sim-bar-section">
                <p className="sim-bar-label">Composition de l'objectif</p>
                <div className="sim-bar">
                  <div className="sim-bar-initial" style={{ width: `${(v.initial / v.goal) * 100}%` }} title="Apport initial" />
                  <div className="sim-bar-contrib" style={{ width: `${pct - (v.initial / v.goal) * 100}%` }} title="Versements" />
                  <div className="sim-bar-interest" style={{ width: `${interestPct}%` }} title="Intérêts" />
                </div>
                <div className="sim-bar-legend">
                  <span><span className="sim-bar-dot sim-dot-initial" />Apport initial</span>
                  <span><span className="sim-bar-dot sim-dot-contrib" />Versements</span>
                  <span><span className="sim-bar-dot sim-dot-interest" />Intérêts</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </SimLayout>
  );
}
