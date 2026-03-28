import { useMemo, useState } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import Field from "../Field";
import SimLayout from "./SimLayout";
import DonutChart from "../DonutChart";
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

const fmtK = (v) => v >= 1000 ? `${Math.round(v / 1000)}k` : Math.round(v);
const fmtCur = (v) => new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(v);

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="chart-tooltip">
      <p className="chart-tooltip-label">Année {label}</p>
      {payload.map((p) => (
        <div key={p.dataKey} className="chart-tooltip-row">
          <span style={{ color: p.stroke }}>{p.name}</span>
          <span>{fmtCur(p.value)}</span>
        </div>
      ))}
    </div>
  );
}

export default function SimEpargne() {
  const [v, setV] = useState({ goal: 50000, initial: 5000, annualReturn: 5, years: 10 });
  const set = (k) => (val) => setV((s) => ({ ...s, [k]: val }));

  const res = useMemo(() => calcEpargne(v), [v]);

  const chartData = useMemo(() => {
    if (!res || res.goalReachedByInitial) return [];
    const r = v.annualReturn / 100 / 12;
    const monthly = res.monthlySavings;
    const data = [];
    let balance = v.initial;
    let contribs = v.initial;
    for (let yr = 0; yr <= v.years; yr++) {
      if (yr > 0) {
        for (let m = 0; m < 12; m++) {
          balance = balance * (1 + r) + monthly;
          contribs += monthly;
        }
      }
      data.push({ year: yr, avecIntérêts: Math.round(balance), sansIntérêts: Math.round(contribs) });
    }
    return data;
  }, [v, res]);

  const donutSegments = res && !res.goalReachedByInitial
    ? [
        { value: v.initial, color: "#1a56db", label: "Apport initial" },
        { value: Math.max(0, res.totalContributions), color: "#0d9488", label: "Versements" },
        { value: Math.max(0, res.totalInterest), color: "#d97706", label: "Intérêts" },
      ]
    : [];

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
              <Field label="Objectif à atteindre" value={v.goal} onChange={set("goal")} suffix="€" hint="Capital cible (achat, retraite, projet…)" tooltip="Montant total que vous souhaitez accumuler. Ex. : apport immobilier, achat voiture, retraite anticipée." />
            </div>
            <Field label="Capital de départ" value={v.initial} onChange={set("initial")} suffix="€" hint="Épargne déjà constituée" tooltip="Épargne déjà constituée que vous allez placer immédiatement." />
            <Field label="Rendement annuel" value={v.annualReturn} onChange={set("annualReturn")} suffix="%" hint="Livret A=2,4 % · ETF≈7–8 %" tooltip="Rendement net annuel de votre épargne. Livret A en 2026 : 2,4 %. Assurance-vie fonds euro : ~2,5–3 %. PEA/ETF monde : ~7–8 % sur 20 ans en moyenne." />
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
                  style={{ "--range-pct": `${((v.years - 1) / (40 - 1)) * 100}%` }}
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
                <span className="sim-stat-value">
                  {formatCurrency(res.monthlySavings)}<span className="sim-stat-unit">/mois</span>
                </span>
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

              {chartData.length > 1 && (
                <div className="sim-chart-wrap">
                  <p className="sim-chart-title">Croissance du capital sur {v.years} ans</p>
                  <ResponsiveContainer width="100%" height={160}>
                    <AreaChart data={chartData} margin={{ top: 6, right: 4, bottom: 0, left: 0 }}>
                      <defs>
                        <linearGradient id="gradEpGrowth" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#1a56db" stopOpacity={0.22}/>
                          <stop offset="95%" stopColor="#1a56db" stopOpacity={0.02}/>
                        </linearGradient>
                        <linearGradient id="gradEpContrib" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#0d9488" stopOpacity={0.18}/>
                          <stop offset="95%" stopColor="#0d9488" stopOpacity={0.02}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f2" vertical={false}/>
                      <XAxis dataKey="year" tickFormatter={(y) => y === 0 ? "Dép." : `${y}a`} tick={{ fontSize: 10, fill: "#5e6e88" }} axisLine={false} tickLine={false} interval="preserveStartEnd"/>
                      <YAxis tickFormatter={fmtK} tick={{ fontSize: 10, fill: "#5e6e88" }} axisLine={false} tickLine={false} width={38}/>
                      <Tooltip content={<ChartTooltip />}/>
                      <Area type="monotone" dataKey="sansIntérêts" name="Sans intérêts" stroke="#0d9488" strokeWidth={1.5} fill="url(#gradEpContrib)" dot={false} activeDot={{ r: 4 }}/>
                      <Area type="monotone" dataKey="avecIntérêts" name="Avec intérêts" stroke="#1a56db" strokeWidth={2} fill="url(#gradEpGrowth)" dot={false} activeDot={{ r: 4 }}/>
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              )}

              {donutSegments.length > 0 && (
                <div className="sim-donut-section">
                  <DonutChart
                    segments={donutSegments}
                    size={130}
                    thickness={22}
                    label={formatCurrency(v.goal)}
                    subLabel="objectif"
                  />
                  <div className="sim-donut-legend">
                    <p className="sim-bar-label" style={{ marginBottom: 8 }}>Composition de l'objectif</p>
                    {donutSegments.map((seg) => (
                      <div key={seg.label} className="sim-donut-legend-item">
                        <span className="sim-donut-dot" style={{ background: seg.color }} />
                        <span className="sim-donut-legend-label">{seg.label}</span>
                        <span className="sim-donut-legend-value">{formatCurrency(seg.value)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </SimLayout>
  );
}
