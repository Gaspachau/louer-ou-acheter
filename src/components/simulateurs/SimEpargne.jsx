import { useState, useMemo } from "react";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid,
} from "recharts";
import SimLayout from "./SimLayout";
import SimCrossSell from "./SimCrossSell";

const fmt = (v) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(v);
const fmtK = (v) => (v >= 1000 ? `${Math.round(v / 1000)}k €` : `${Math.round(v)} €`);

function ChartTip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="chart-tooltip">
      <p className="chart-tooltip-label">{label}</p>
      {payload.map((p) => (
        <div key={p.dataKey} className="chart-tooltip-row">
          <span style={{ color: p.stroke || p.fill }}>{p.name}</span>
          <span>{fmt(p.value)}</span>
        </div>
      ))}
    </div>
  );
}

function Pills({ value, options, onChange, format }) {
  return (
    <div className="fv2-revenus-pills">
      {options.map((o) => (
        <button
          key={o}
          type="button"
          className={`fv2-revenus-pill${value === o ? " active" : ""}`}
          onClick={() => onChange(o)}
        >
          {format ? format(o) : o}
        </button>
      ))}
    </div>
  );
}

const RENDEMENTS = [
  { label: "Livret A", rate: 1.5, desc: "Garanti, disponible" },
  { label: "PEL", rate: 2.0, desc: "Bloqué 4 ans" },
  { label: "Assurance vie", rate: 3.0, desc: "Fonds euro/unités" },
  { label: "ETF / Bourse", rate: 7.0, desc: "Risqué, long terme" },
];

function calcEpargne({ objectif, mensuel, dejaEpargne, rendement }) {
  if (mensuel <= 0 && dejaEpargne >= objectif) {
    return {
      mois: 0, ans: 0, resteMois: 0,
      capitalVerse: dejaEpargne, interetsGeneres: 0,
      capitalFinal: dejaEpargne, chartData: [], scenarios: [],
    };
  }
  const r = rendement / 100 / 12;
  let capital = dejaEpargne;
  let mois = 0;
  const MAX_MOIS = 600;
  while (capital < objectif && mois < MAX_MOIS) {
    capital = capital * (1 + r) + mensuel;
    mois++;
  }
  const capitalVerse = dejaEpargne + mensuel * mois;
  const interetsGeneres = capital - capitalVerse;

  // Year-by-year chart
  const chartData = [];
  let cap = dejaEpargne;
  let verse = dejaEpargne;
  for (let m = 1; m <= Math.min(mois, MAX_MOIS); m++) {
    cap = cap * (1 + r) + mensuel;
    verse += mensuel;
    if (m % 12 === 0 || m === mois) {
      chartData.push({
        annee: `An ${Math.ceil(m / 12)}`,
        "Capital versé": Math.round(verse),
        "Avec intérêts": Math.round(cap),
      });
    }
  }

  // 4-rate comparison scenarios
  const scenarios = [1.5, 2.0, 3.0, 7.0].map((rate) => {
    const r2 = rate / 100 / 12;
    let cap2 = dejaEpargne;
    let m2 = 0;
    while (cap2 < objectif && m2 < MAX_MOIS) {
      cap2 = cap2 * (1 + r2) + mensuel;
      m2++;
    }
    return { rate, mois: m2, ans: Math.floor(m2 / 12), reste: m2 % 12 };
  });

  return {
    mois, ans: Math.floor(mois / 12), resteMois: mois % 12,
    capitalVerse, interetsGeneres, capitalFinal: capital,
    chartData, scenarios,
  };
}

const LABEL_MAP = { 1.5: "Livret A", 2.0: "PEL", 3.0: "Assurance vie", 7.0: "ETF / Bourse" };
const noInterestTotal = (objectif, mensuel, dejaEpargne) => {
  if (mensuel <= 0) return dejaEpargne;
  let cap = dejaEpargne;
  let m = 0;
  while (cap < objectif && m < 600) { cap += mensuel; m++; }
  return cap;
};

export default function SimEpargne() {
  const [v, setV] = useState({ objectif: 50000, mensuel: 300, dejaEpargne: 5000, rendement: 3.0 });
  const set = (k) => (val) => setV((s) => ({ ...s, [k]: val }));

  const res = useMemo(() => calcEpargne(v), [v]);

  const pctInterets = res && res.capitalVerse > 0
    ? Math.round((res.interetsGeneres / (res.capitalVerse + res.interetsGeneres)) * 100)
    : 0;

  const noIntAmt = useMemo(() => noInterestTotal(v.objectif, v.mensuel, v.dejaEpargne), [v.objectif, v.mensuel, v.dejaEpargne]);

  // Slider display
  const apportPct = v.objectif > 0 ? Math.min(100, (v.dejaEpargne / v.objectif) * 100) : 0;

  return (
    <SimLayout
      icon="💰"
      title="Combien épargner pour atteindre mon objectif ?"
      description="Calculez le temps nécessaire et l'impact des intérêts composés"
      suggestions={[
        "/simulateurs/pret-immobilier",
        "/simulateurs/endettement",
        "/simulateurs/remboursement-anticipe",
      ]}
    >
      <div className="sv2-container">
        {/* ── Inputs ── */}
        <div className="fv2-card">
          <p className="fv2-card-kicker">Paramètres</p>
          <h2 className="fv2-card-title">Définissez votre objectif</h2>

          {/* 1 – Objectif */}
          <div className="fv2-revenus-wrap" style={{ marginTop: 20 }}>
            <p className="fv2-field-label">Objectif financier</p>
            <div className="fv2-revenus-input-row">
              <input
                type="number"
                className="fv2-revenus-input"
                value={v.objectif || ""}
                min={1000} max={2000000} step={1000}
                onChange={(e) =>
                  set("objectif")(Math.max(0, Math.min(2000000, Number(e.target.value) || 0)))
                }
              />
              <span className="fv2-revenus-unit">€</span>
            </div>
            <Pills
              value={v.objectif}
              options={[10000, 20000, 50000, 100000, 200000]}
              onChange={set("objectif")}
              format={(o) => (o >= 1000 ? `${o / 1000}k €` : `${o} €`)}
            />
          </div>

          {/* 2 – Épargne mensuelle */}
          <div className="fv2-revenus-wrap" style={{ marginTop: 20 }}>
            <p className="fv2-field-label">Épargne mensuelle</p>
            <div className="fv2-revenus-input-row">
              <input
                type="number"
                className="fv2-revenus-input"
                value={v.mensuel || ""}
                min={0} max={10000} step={50}
                onChange={(e) =>
                  set("mensuel")(Math.max(0, Math.min(10000, Number(e.target.value) || 0)))
                }
              />
              <span className="fv2-revenus-unit">€/mois</span>
            </div>
            <Pills
              value={v.mensuel}
              options={[100, 200, 300, 500, 1000]}
              onChange={set("mensuel")}
              format={(o) => `${o} €`}
            />
            {v.mensuel > 0 && (
              <p className="fv2-hint">
                À ce rythme, vous épargnez {fmt(v.mensuel * 12)} par an
              </p>
            )}
          </div>

          {/* 3 – Épargne déjà constituée */}
          <div className="fv2-apport-wrap" style={{ marginTop: 20 }}>
            <div className="fv2-apport-header">
              <span className="fv2-apport-label">Épargne déjà constituée</span>
              <span className="fv2-apport-bigval">{fmt(v.dejaEpargne)}</span>
            </div>
            {v.objectif > 0 && (
              <span className={`fv2-apport-badge ${apportPct >= 20 ? "fv2-apport-badge-good" : "fv2-apport-badge-warn"}`}>
                {apportPct.toFixed(0)} % de l'objectif
              </span>
            )}
            <div
              className="fv2-slider-track-wrap"
              style={{ "--pct": `${Math.min(100, (v.dejaEpargne / 200000) * 100)}%` }}
            >
              <input
                type="range"
                className="fv2-slider"
                min={0} max={200000} step={1000}
                value={v.dejaEpargne}
                onChange={(e) => set("dejaEpargne")(Number(e.target.value))}
              />
              <div className="fv2-slider-fill" />
            </div>
            <div className="fv2-slider-minmax">
              <span>0 €</span>
              <span>200 000 €</span>
            </div>
          </div>

          {/* 4 – Rendement */}
          <div style={{ marginTop: 20 }}>
            <p className="fv2-field-label">Rendement annuel</p>
            <div className="sv2-rendement-pills" style={{ marginTop: 8 }}>
              {RENDEMENTS.map((r) => (
                <button
                  key={r.rate}
                  type="button"
                  className={`sv2-rendement-pill${v.rendement === r.rate ? " active" : ""}`}
                  onClick={() => set("rendement")(r.rate)}
                >
                  <span className="sv2-rendement-pill-label">{r.label}</span>
                  <span className="sv2-rendement-pill-rate">{r.rate} %/an</span>
                  <span className="sv2-rendement-pill-desc">{r.desc}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Results ── */}
        {res && v.objectif > 0 && (
          <div className="fv2-card" style={{ marginTop: 16 }}>
            {/* Verdict */}
            <div className={`sv2-verdict ${res.mois === 0 ? "sv2-verdict-green" : "sv2-verdict-blue"}`}>
              <p className="sv2-verdict-label">Vous atteindrez votre objectif dans</p>
              <p className="sv2-verdict-amount">
                {res.mois === 0
                  ? "Objectif déjà atteint !"
                  : res.ans > 0
                  ? `${res.ans} an${res.ans > 1 ? "s" : ""}${res.resteMois > 0 ? ` ${res.resteMois} mois` : ""}`
                  : `${res.resteMois} mois`}
              </p>
              {res.mois > 0 && (
                <p className="sv2-verdict-sub">
                  En épargnant {fmt(v.mensuel)}/mois avec un rendement de {v.rendement} %/an
                </p>
              )}
            </div>

            {/* Stat cards */}
            <div className="sim-stats-grid" style={{ marginTop: 20 }}>
              <div className="sim-stat-card">
                <span className="sim-stat-card-label">Durée nécessaire</span>
                <span className="sim-stat-card-value">
                  {res.mois === 0
                    ? "—"
                    : res.ans > 0
                    ? `${res.ans} an${res.ans > 1 ? "s" : ""}${res.resteMois > 0 ? ` ${res.resteMois}m` : ""}`
                    : `${res.resteMois} mois`}
                </span>
              </div>
              <div className="sim-stat-card sim-stat-card-blue">
                <span className="sim-stat-card-label">Capital versé</span>
                <span className="sim-stat-card-value">{fmt(res.capitalVerse)}</span>
              </div>
              <div className="sim-stat-card sim-stat-card-green">
                <span className="sim-stat-card-label">Intérêts générés</span>
                <span className="sim-stat-card-value" style={{ color: "#059669" }}>
                  + {fmt(Math.max(0, res.interetsGeneres))}
                </span>
              </div>
            </div>

            {/* Area chart */}
            {res.chartData.length > 1 && (
              <div style={{ marginTop: 24 }}>
                <div className="fv2-slider-header">
                  <span className="fv2-slider-label">Croissance du capital dans le temps</span>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={res.chartData} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
                    <defs>
                      <linearGradient id="gradVerse" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#1a56db" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#1a56db" stopOpacity={0.02} />
                      </linearGradient>
                      <linearGradient id="gradInterets" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.03} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f2" vertical={false} />
                    <XAxis
                      dataKey="annee"
                      tick={{ fontSize: 10, fill: "#5e6e88" }}
                      axisLine={false}
                      tickLine={false}
                      interval="preserveStartEnd"
                    />
                    <YAxis
                      tickFormatter={fmtK}
                      tick={{ fontSize: 10, fill: "#5e6e88" }}
                      axisLine={false}
                      tickLine={false}
                      width={52}
                    />
                    <Tooltip content={<ChartTip />} />
                    <Area
                      type="monotone"
                      dataKey="Capital versé"
                      stroke="#1a56db"
                      strokeWidth={1.5}
                      fill="url(#gradVerse)"
                      dot={false}
                      activeDot={{ r: 4 }}
                    />
                    <Area
                      type="monotone"
                      dataKey="Avec intérêts"
                      stroke="#06b6d4"
                      strokeWidth={2}
                      fill="url(#gradInterets)"
                      dot={false}
                      activeDot={{ r: 4 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* Insight */}
            {res.mois > 0 && (
              <div className="sv2-insight" style={{ marginTop: 20 }}>
                Grâce aux intérêts composés, vos {fmt(v.mensuel)}/mois épargnés pendant{" "}
                {res.ans > 0 ? `${res.ans} an${res.ans > 1 ? "s" : ""}` : `${res.resteMois} mois`} génèrent{" "}
                <strong>{fmt(Math.max(0, res.interetsGeneres))}</strong> supplémentaires — soit{" "}
                <strong>{pctInterets} %</strong> de plus qu'une épargne sans rendement.
              </div>
            )}

            {/* Comparison table */}
            {res.scenarios.length > 0 && (
              <div style={{ marginTop: 24 }}>
                <div className="fv2-slider-header">
                  <span className="fv2-slider-label">Comparaison selon le placement</span>
                </div>
                <table className="sv2-compare-table" style={{ marginTop: 8 }}>
                  <thead>
                    <tr>
                      <th>Placement</th>
                      <th>Taux</th>
                      <th>Durée</th>
                      <th>Gain supplémentaire</th>
                    </tr>
                  </thead>
                  <tbody>
                    {res.scenarios.map((sc) => {
                      // Gain vs no interest
                      const capWithRate = (() => {
                        const r2 = sc.rate / 100 / 12;
                        let cap = v.dejaEpargne;
                        for (let m = 0; m < sc.mois; m++) cap = cap * (1 + r2) + v.mensuel;
                        return cap;
                      })();
                      const gainExtra = capWithRate - (v.dejaEpargne + v.mensuel * sc.mois);
                      return (
                        <tr key={sc.rate} className={v.rendement === sc.rate ? "emphasis" : ""}>
                          <td>{LABEL_MAP[sc.rate]}</td>
                          <td>{sc.rate} %</td>
                          <td className={sc.mois < res.mois ? "good" : ""}>
                            {sc.ans > 0
                              ? `${sc.ans} an${sc.ans > 1 ? "s" : ""}${sc.reste > 0 ? ` ${sc.reste}m` : ""}`
                              : `${sc.mois} mois`}
                          </td>
                          <td className={gainExtra > 0 ? "good" : ""}>
                            {gainExtra > 0 ? `+ ${fmt(gainExtra)}` : "—"}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        <SimCrossSell
          show={v.objectif >= 50000}
          loan={v.objectif * 0.8}
          taux={3.5}
          dureeCredit={20}
        />
      </div>
    </SimLayout>
  );
}
