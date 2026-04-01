import { useState, useMemo } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid, Legend,
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

function mortgage(p, r, y) {
  if (p <= 0 || y <= 0) return 0;
  const mr = r / 100 / 12;
  if (mr === 0) return p / (y * 12);
  return (p * mr) / (1 - Math.pow(1 + mr, -(y * 12)));
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

function calcRA({ capitalRestant, tauxCredit, epargne, rendementPlacement, dureeRestante }) {
  const ira = epargne > capitalRestant ? capitalRestant : epargne;

  const mensActuelle = mortgage(capitalRestant, tauxCredit, dureeRestante);
  const capitalApresRA = Math.max(0, capitalRestant - ira);
  const mensApresRA = mortgage(capitalApresRA, tauxCredit, dureeRestante);
  const economiesMensuelles = mensActuelle - mensApresRA;
  const interetsEvites = economiesMensuelles * dureeRestante * 12;
  const penalites = Math.min(ira * 0.005, capitalRestant * (tauxCredit / 100 / 12) * 3);
  const gainRA = interetsEvites - penalites;

  const r = rendementPlacement / 100 / 12;
  const n = dureeRestante * 12;
  const gainPlacement = r === 0 ? 0 : ira * (Math.pow(1 + r, n) - 1);

  const chartData = [];
  let cumRA = -penalites;
  let capitalPlacement = ira;
  for (let yr = 1; yr <= dureeRestante; yr++) {
    cumRA += economiesMensuelles * 12;
    capitalPlacement *= Math.pow(1 + rendementPlacement / 100, 1);
    chartData.push({
      annee: `An ${yr}`,
      "Remboursement anticipé": Math.round(cumRA),
      "Placement financier": Math.round(capitalPlacement - ira),
    });
  }

  const isBetterRA = gainRA > gainPlacement;

  return {
    gainRA, gainPlacement, economiesMensuelles, interetsEvites,
    penalites, isBetterRA, mensActuelle, mensApresRA, chartData,
  };
}

export default function SimRemboursementAnticipe() {
  const [v, setV] = useState({
    capitalRestant: 150000,
    tauxCredit: 3.5,
    epargne: 30000,
    rendementPlacement: 3.0,
    dureeRestante: 15,
  });
  const set = (k) => (val) => setV((s) => ({ ...s, [k]: val }));

  const res = useMemo(() => calcRA(v), [v]);

  const epargneEffective = Math.min(v.epargne, v.capitalRestant);

  return (
    <SimLayout
      icon="⚡"
      title="Rembourser par anticipation ou placer votre argent ?"
      description="Quelle est la meilleure option pour votre épargne disponible"
      simTime="2 min"
      suggestions={[
        "/simulateurs/pret-immobilier",
        "/simulateurs/epargne",
        "/simulateurs/assurance-pret",
      ]}
    >
      <div className="sv2-container">
        {/* ── Inputs ── */}
        <div className="fv2-card">
          <p className="fv2-card-kicker">Paramètres</p>
          <h2 className="fv2-card-title">Votre situation de crédit</h2>

          {/* 1 – Capital restant */}
          <div className="fv2-revenus-wrap" style={{ marginTop: 20 }}>
            <p className="fv2-field-label">Capital restant dû</p>
            <div className="fv2-revenus-input-row">
              <input
                type="number"
                className="fv2-revenus-input"
                value={v.capitalRestant || ""}
                min={0} max={1000000} step={1000}
                onChange={(e) => set("capitalRestant")(Math.max(0, Math.min(1000000, Number(e.target.value) || 0)))}
              />
              <span className="fv2-revenus-unit">€</span>
            </div>
            <Pills
              value={v.capitalRestant}
              options={[50000, 100000, 150000, 200000, 300000]}
              onChange={set("capitalRestant")}
              format={(o) => `${o / 1000}k€`}
            />
          </div>

          {/* 2 – Taux */}
          <div style={{ marginTop: 20 }}>
            <div className="fv2-slider-header">
              <span className="fv2-slider-label">Taux de votre crédit</span>
              <span className="fv2-slider-val">
                {v.tauxCredit.toFixed(1)} %
                <span style={{ marginLeft: 6, fontSize: 11, fontWeight: 600, background: "#eff6ff", color: "#1a56db", borderRadius: 6, padding: "2px 7px" }}>
                  Votre taux actuel
                </span>
              </span>
            </div>
            <div
              className="fv2-slider-track-wrap"
              style={{ "--pct": `${((v.tauxCredit - 0.5) / (7 - 0.5)) * 100}%` }}
            >
              <input
                type="range"
                className="fv2-slider"
                min={0.5} max={7} step={0.1}
                value={v.tauxCredit}
                onChange={(e) => set("tauxCredit")(Number(e.target.value))}
              />
              <div className="fv2-slider-fill" />
            </div>
            <div className="fv2-slider-minmax"><span>0,5 %</span><span>7 %</span></div>
          </div>

          {/* 3 – Épargne disponible */}
          <div className="fv2-revenus-wrap" style={{ marginTop: 20 }}>
            <p className="fv2-field-label">Épargne disponible</p>
            <div className="fv2-revenus-input-row">
              <input
                type="number"
                className="fv2-revenus-input"
                value={v.epargne || ""}
                min={0} max={500000} step={1000}
                onChange={(e) => set("epargne")(Math.max(0, Math.min(500000, Number(e.target.value) || 0)))}
              />
              <span className="fv2-revenus-unit">€</span>
            </div>
            <Pills
              value={v.epargne}
              options={[10000, 20000, 30000, 50000, 100000]}
              onChange={set("epargne")}
              format={(o) => `${o / 1000}k€`}
            />
            {v.epargne > v.capitalRestant && (
              <p className="fv2-hint">
                Limité au capital restant dû : {fmt(v.capitalRestant)} effectivement remboursé
              </p>
            )}
          </div>

          {/* 4 – Durée restante */}
          <div style={{ marginTop: 20 }}>
            <p className="fv2-field-label">Durée restante</p>
            <Pills
              value={v.dureeRestante}
              options={[5, 10, 15, 20, 25]}
              onChange={set("dureeRestante")}
              format={(o) => `${o} ans`}
            />
          </div>

          {/* 5 – Rendement placement */}
          <div style={{ marginTop: 20 }}>
            <p className="fv2-field-label">Rendement du placement alternatif</p>
            <div className="sv2-rendement-pills" style={{ marginTop: 8 }}>
              {RENDEMENTS.map((r) => (
                <button
                  key={r.rate}
                  type="button"
                  className={`sv2-rendement-pill${v.rendementPlacement === r.rate ? " active" : ""}`}
                  onClick={() => set("rendementPlacement")(r.rate)}
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
        {v.capitalRestant > 0 && v.epargne > 0 && (
          <div className="fv2-card" style={{ marginTop: 16 }}>
            {/* Winner / Loser */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
              <div className={res.isBetterRA ? "sv2-ra-winner" : "sv2-ra-loser"}>
                <p className="sv2-ra-winner-label" style={!res.isBetterRA ? { color: "#64748b" } : undefined}>
                  {res.isBetterRA ? "✓ Meilleure option" : "Option alternative"}
                </p>
                <p className="sv2-ra-winner-amount" style={!res.isBetterRA ? { color: "#475569", fontSize: 22 } : undefined}>
                  {fmt(Math.max(0, res.gainRA))}
                </p>
                <p style={{ fontSize: 12, color: res.isBetterRA ? "#059669" : "#64748b", marginTop: 4 }}>
                  Remboursement anticipé
                </p>
                <p style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>
                  Intérêts évités − pénalités
                </p>
              </div>

              <div className={!res.isBetterRA ? "sv2-ra-winner" : "sv2-ra-loser"}>
                <p className="sv2-ra-winner-label" style={res.isBetterRA ? { color: "#64748b" } : undefined}>
                  {!res.isBetterRA ? "✓ Meilleure option" : "Option alternative"}
                </p>
                <p className="sv2-ra-winner-amount" style={res.isBetterRA ? { color: "#475569", fontSize: 22 } : undefined}>
                  {fmt(Math.max(0, res.gainPlacement))}
                </p>
                <p style={{ fontSize: 12, color: !res.isBetterRA ? "#059669" : "#64748b", marginTop: 4 }}>
                  Placement {v.rendementPlacement} %
                </p>
                <p style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>
                  Gains nets sur {v.dureeRestante} ans
                </p>
              </div>
            </div>

            {/* Verdict */}
            <div className={`sv2-verdict ${res.isBetterRA ? "sv2-verdict-green" : "sv2-verdict-amber"}`}>
              <p className="sv2-verdict-label">
                {res.isBetterRA
                  ? "✓ Rembourser par anticipation est plus avantageux"
                  : "⚡ Placer votre argent est plus rentable"}
              </p>
              <p className="sv2-verdict-amount">
                {fmt(Math.abs(res.gainRA - res.gainPlacement))} de différence
              </p>
              <p className="sv2-verdict-sub">
                Économies mensuelles après remboursement : {fmt(res.economiesMensuelles)}/mois
              </p>
            </div>

            {/* Line items */}
            <div className="sv2-line-items" style={{ marginTop: 20 }}>
              <div className="sv2-line-item">
                <div className="sv2-line-item-row">
                  <span className="sv2-line-item-label">Mensualité actuelle</span>
                  <span className="sv2-line-item-amount">{fmt(res.mensActuelle)}/mois</span>
                </div>
              </div>
              <div className="sv2-line-item">
                <div className="sv2-line-item-row">
                  <span className="sv2-line-item-label">Mensualité après RA</span>
                  <span className="sv2-line-item-amount" style={{ color: "#059669" }}>
                    {fmt(res.mensApresRA)}/mois
                  </span>
                </div>
              </div>
              <div className="sv2-line-item">
                <div className="sv2-line-item-row">
                  <span className="sv2-line-item-label">Intérêts évités</span>
                  <span className="sv2-line-item-amount" style={{ color: "#059669" }}>
                    + {fmt(res.interetsEvites)}
                  </span>
                </div>
              </div>
              <div className="sv2-line-item">
                <div className="sv2-line-item-row">
                  <span className="sv2-line-item-label">Pénalités IRA estimées</span>
                  <span className="sv2-line-item-amount" style={{ color: "#d97706" }}>
                    − {fmt(res.penalites)}
                  </span>
                </div>
              </div>
            </div>

            {/* Chart */}
            {res.chartData.length > 1 && (
              <div style={{ marginTop: 24 }}>
                <div className="fv2-slider-header">
                  <span className="fv2-slider-label">Gains cumulés au fil des années</span>
                </div>
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={res.chartData} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
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
                    <Legend
                      wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
                      iconType="circle"
                      iconSize={8}
                    />
                    <Line
                      type="monotone"
                      dataKey="Remboursement anticipé"
                      stroke="#059669"
                      strokeWidth={2.5}
                      dot={false}
                      activeDot={{ r: 4 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="Placement financier"
                      stroke="#1a56db"
                      strokeWidth={2.5}
                      dot={false}
                      activeDot={{ r: 4 }}
                      strokeDasharray="5 3"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* Insight */}
            <div className="sv2-insight" style={{ marginTop: 20 }}>
              {res.isBetterRA
                ? <>En remboursant <strong>{fmt(epargneEffective)}</strong> par anticipation, vous économisez{" "}
                    <strong>{fmt(res.economiesMensuelles)}/mois</strong> et{" "}
                    <strong>{fmt(res.interetsEvites)}</strong> d'intérêts au total.
                    Les pénalités de <strong>{fmt(res.penalites)}</strong> sont rapidement amorties.</>
                : <>Avec un rendement de <strong>{v.rendementPlacement} %</strong>, placer vos{" "}
                    <strong>{fmt(epargneEffective)}</strong> génère plus que les intérêts économisés.
                    Continuez à rembourser normalement et investissez la différence.</>
              }
            </div>
          </div>
        )}

        <SimCrossSell
          show={v.capitalRestant > 0}
          loan={v.capitalRestant}
          taux={v.tauxCredit}
          dureeCredit={v.dureeRestante}
        />
      </div>
    </SimLayout>
  );
}
