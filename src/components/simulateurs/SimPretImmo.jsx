import { useMemo, useState } from "react";
import Field from "../Field";
import SimLayout from "./SimLayout";
import DonutChart from "../DonutChart";
import { formatCurrency } from "../../utils/finance";

function calcPret({ principal, annualRate, years }) {
  if (!principal || principal <= 0 || years <= 0) return null;
  const r = annualRate / 100 / 12;
  const n = years * 12;
  const monthly = r === 0 ? principal / n : principal * r / (1 - Math.pow(1 + r, -n));
  const totalCost = monthly * n;
  const totalInterest = totalCost - principal;
  return { monthly, totalCost, totalInterest };
}

function AmortRow({ month, payment, principal, interest, balance }) {
  return (
    <tr>
      <td>{month}</td>
      <td>{formatCurrency(payment)}</td>
      <td>{formatCurrency(principal)}</td>
      <td>{formatCurrency(interest)}</td>
      <td>{formatCurrency(Math.max(0, balance))}</td>
    </tr>
  );
}

export default function SimPretImmo() {
  const [v, setV] = useState({ principal: 200000, annualRate: 3.8, years: 20 });
  const [showTable, setShowTable] = useState(false);
  const set = (k) => (val) => setV((s) => ({ ...s, [k]: val }));

  const res = useMemo(() => calcPret(v), [v]);

  const amortTable = useMemo(() => {
    if (!res || !showTable) return [];
    const r = v.annualRate / 100 / 12;
    const rows = [];
    let balance = v.principal;
    for (let m = 1; m <= v.years * 12; m++) {
      const interest = balance * r;
      const principal = res.monthly - interest;
      balance -= principal;
      if (m % 12 === 0) rows.push({ month: m / 12, payment: res.monthly, principal, interest, balance });
    }
    return rows;
  }, [res, showTable, v]);

  const donutSegments = res
    ? [
        { value: v.principal, color: "#2563eb", label: "Capital" },
        { value: Math.max(0, res.totalInterest), color: "#ec4899", label: "Intérêts" },
      ]
    : [];

  return (
    <SimLayout
      icon="🏦"
      title="Simulateur de prêt immobilier"
      description="Calculez votre mensualité, le coût total et consultez le tableau d'amortissement."
    >
      <div className="sim-layout">
        <div className="sim-card">
          <p className="sim-card-legend">Votre crédit</p>
          <div className="step-fields">
            <div className="field-full">
              <Field label="Montant emprunté" value={v.principal} onChange={set("principal")} suffix="€" hint="Capital à financer hors apport" />
            </div>
            <Field label="Taux annuel" value={v.annualRate} onChange={set("annualRate")} suffix="%" hint="Mars 2026 : ~3,5–4,0 %" />
            <Field label="Durée" value={v.years} onChange={set("years")} suffix="ans" hint="15, 20 ou 25 ans" />
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
                  <span className="sim-stat-card-label">Capital emprunté</span>
                  <span className="sim-stat-card-value">{formatCurrency(v.principal)}</span>
                </div>
                <div className="sim-stat-card sim-stat-card-red">
                  <span className="sim-stat-card-label">Coût total des intérêts</span>
                  <span className="sim-stat-card-value">{formatCurrency(res.totalInterest)}</span>
                </div>
                <div className="sim-stat-card sim-stat-card-blue">
                  <span className="sim-stat-card-label">Total remboursé</span>
                  <span className="sim-stat-card-value">{formatCurrency(res.totalCost)}</span>
                </div>
                <div className="sim-stat-card">
                  <span className="sim-stat-card-label">Durée</span>
                  <span className="sim-stat-card-value">{v.years} ans</span>
                </div>
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
                  <p className="sim-bar-label" style={{ marginBottom: 8 }}>Répartition du coût total</p>
                  {donutSegments.map((seg) => (
                    <div key={seg.label} className="sim-donut-legend-item">
                      <span className="sim-donut-dot" style={{ background: seg.color }} />
                      <span className="sim-donut-legend-label">{seg.label}</span>
                      <span className="sim-donut-legend-value">{formatCurrency(seg.value)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                className="details-toggle"
                onClick={() => setShowTable(!showTable)}
                aria-expanded={showTable}
                type="button"
              >
                {showTable ? "▲ Masquer" : "▼ Voir"} le tableau d'amortissement annuel
              </button>

              {showTable && amortTable.length > 0 && (
                <div className="amort-table-wrap">
                  <table className="amort-table">
                    <thead>
                      <tr><th>Année</th><th>Mensualité</th><th>Capital</th><th>Intérêts</th><th>Restant</th></tr>
                    </thead>
                    <tbody>
                      {amortTable.map((row) => (
                        <AmortRow key={row.month} {...row} />
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </SimLayout>
  );
}
