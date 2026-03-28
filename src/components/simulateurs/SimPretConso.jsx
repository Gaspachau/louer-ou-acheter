import { useMemo, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import Field from "../Field";
import SimLayout from "./SimLayout";
import DonutChart from "../DonutChart";
import { formatCurrency } from "../../utils/finance";

const LOAN_TYPES = [
  { id: "auto",     label: "Véhicule", icon: "🚗" },
  { id: "travaux",  label: "Travaux",  icon: "🔨" },
  { id: "vacances", label: "Vacances", icon: "✈️" },
  { id: "autre",    label: "Autre",    icon: "💳" },
];

function calcPretConso({ principal, annualRate, months }) {
  if (!principal || principal <= 0 || months <= 0) return null;
  const r = annualRate / 100 / 12;
  const n = months;
  const monthly = r === 0 ? principal / n : principal * r / (1 - Math.pow(1 + r, -n));
  const totalCost = monthly * n;
  const totalInterest = totalCost - principal;
  return { monthly, totalCost, totalInterest };
}

const fmtCur = (v) => new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(v);

function ChartTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="chart-tooltip">
      {payload.map((p) => (
        <div key={p.dataKey} className="chart-tooltip-row">
          <span style={{ color: p.fill }}>{p.name}</span>
          <span>{fmtCur(p.value)}</span>
        </div>
      ))}
    </div>
  );
}

export default function SimPretConso() {
  const [v, setV] = useState({ principal: 10000, annualRate: 5.5, months: 48, type: "auto" });
  const set = (k) => (val) => setV((s) => ({ ...s, [k]: val }));

  const res = useMemo(() => calcPretConso(v), [v]);
  const costPct = res ? Math.round((res.totalInterest / res.totalCost) * 100) : 0;

  const barData = res
    ? [
        { name: "Capital",   value: v.principal,            fill: "#1a56db" },
        { name: "Intérêts",  value: Math.max(0, res.totalInterest), fill: "#ec4899" },
      ]
    : [];

  const donutSegments = res
    ? [
        { value: v.principal, color: "#1a56db", label: "Capital" },
        { value: Math.max(0, res.totalInterest), color: "#ec4899", label: "Intérêts" },
      ]
    : [];

  return (
    <SimLayout
      icon="💳"
      title="Simulateur de prêt conso"
      description="Calculez la mensualité et le coût total d'un crédit à la consommation."
    >
      <div className="sim-layout">
        <div className="sim-card">
          <p className="sim-card-legend">Votre projet</p>

          <div className="loan-type-grid">
            {LOAN_TYPES.map((t) => (
              <button
                key={t.id}
                type="button"
                className={`loan-type-btn ${v.type === t.id ? "loan-type-active" : ""}`}
                onClick={() => set("type")(t.id)}
              >
                <span>{t.icon}</span>
                <span>{t.label}</span>
              </button>
            ))}
          </div>

          <div className="step-fields" style={{ marginTop: 16 }}>
            <div className="field-full">
              <Field label="Montant du crédit" value={v.principal} onChange={set("principal")} suffix="€" tooltip="Somme empruntée. Pour un crédit conso, généralement entre 1 000 € et 75 000 €." />
            </div>
            <Field label="Taux annuel (TAEG)" value={v.annualRate} onChange={set("annualRate")} suffix="%" hint="En général 4–12 % selon profil" tooltip="Taux Annuel Effectif Global — inclut intérêts + frais. Crédit auto : 4–8 %. Crédit perso : 5–12 %. Vérifiez votre offre." />
            <Field label="Durée" value={v.months} onChange={set("months")} suffix="mois" hint="12 à 84 mois" tooltip="Durée de remboursement en mois. 12 mois = 1 an. Les durées courantes : 24, 36, 48, 60 mois." />
          </div>
        </div>

        <div className="sim-results-panel">
          {!res ? (
            <p className="sim-empty">Renseignez les paramètres pour voir les résultats.</p>
          ) : (
            <>
              <div className="sim-stat-hero">
                <span className="sim-stat-label">Mensualité</span>
                <span className="sim-stat-value">
                  {formatCurrency(res.monthly)}<span className="sim-stat-unit">/mois</span>
                </span>
              </div>

              <div className="sim-stats-grid">
                <div className="sim-stat-card">
                  <span className="sim-stat-card-label">Montant financé</span>
                  <span className="sim-stat-card-value">{formatCurrency(v.principal)}</span>
                </div>
                <div className="sim-stat-card sim-stat-card-red">
                  <span className="sim-stat-card-label">Coût du crédit</span>
                  <span className="sim-stat-card-value">{formatCurrency(res.totalInterest)}</span>
                </div>
                <div className="sim-stat-card sim-stat-card-blue">
                  <span className="sim-stat-card-label">Total à rembourser</span>
                  <span className="sim-stat-card-value">{formatCurrency(res.totalCost)}</span>
                </div>
                <div className="sim-stat-card">
                  <span className="sim-stat-card-label">Durée</span>
                  <span className="sim-stat-card-value">{v.months} mois</span>
                </div>
              </div>

              {costPct > 10 && (
                <div className="sim-alert">
                  <span>⚠️</span>
                  <span>Les intérêts représentent <strong>{costPct} %</strong> du total remboursé. Réduire la durée diminuerait significativement ce coût.</span>
                </div>
              )}

              <div className="sim-chart-wrap">
                <p className="sim-chart-title">Décomposition du remboursement total</p>
                <ResponsiveContainer width="100%" height={110}>
                  <BarChart data={barData} layout="vertical" margin={{ top: 4, right: 16, bottom: 4, left: 4 }}>
                    <XAxis type="number" hide />
                    <YAxis type="category" dataKey="name" tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} width={64}/>
                    <Tooltip content={<ChartTooltip />} cursor={{ fill: "rgba(0,0,0,.04)" }}/>
                    <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={28}>
                      {barData.map((entry, i) => (
                        <Cell key={i} fill={entry.fill}/>
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="sim-donut-section">
                <DonutChart
                  segments={donutSegments}
                  size={130}
                  thickness={22}
                  label={formatCurrency(res.totalCost)}
                  subLabel="total remboursé"
                />
                <div className="sim-donut-legend">
                  <p className="sim-bar-label" style={{ marginBottom: 8 }}>Répartition du remboursement</p>
                  {donutSegments.map((seg) => (
                    <div key={seg.label} className="sim-donut-legend-item">
                      <span className="sim-donut-dot" style={{ background: seg.color }} />
                      <span className="sim-donut-legend-label">{seg.label}</span>
                      <span className="sim-donut-legend-value">
                        {formatCurrency(seg.value)}{" "}
                        <span style={{ color: "var(--muted)", fontWeight: 400 }}>
                          ({seg.label === "Capital" ? 100 - costPct : costPct}%)
                        </span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </SimLayout>
  );
}
