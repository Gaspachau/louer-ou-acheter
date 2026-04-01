import { useState, useMemo } from "react";
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import SimLayout from "./SimLayout";
import SimCrossSell from "./SimCrossSell";

const fmt = (v) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(v);
const fmtK = (v) => (v >= 1000 ? `${Math.round(v / 1000)}k €` : `${Math.round(v)} €`);

function ChartTip({ active, payload }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="chart-tooltip">
      {payload.map((p) => (
        <div key={p.name} className="chart-tooltip-row">
          <span style={{ color: p.payload.color }}>{p.name}</span>
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

function calcNiveauDeVie(v) {
  const chargesFixesTot = v.electricite + v.telephone + v.internet + v.assurances;
  const totalCharges =
    v.loyer + chargesFixesTot + v.alimentation + v.transport + v.loisirs;
  const resteVivre = v.revenus - totalCharges;
  const resteVivrePct = v.revenus > 0 ? (resteVivre / v.revenus) * 100 : 0;

  const segments = [
    { name: "Logement",       value: v.loyer,         color: "#1a56db" },
    { name: "Charges fixes",  value: chargesFixesTot, color: "#06b6d4" },
    { name: "Alimentation",   value: v.alimentation,  color: "#8b5cf6" },
    { name: "Transport",      value: v.transport,     color: "#f59e0b" },
    { name: "Loisirs",        value: v.loisirs,       color: "#10b981" },
    { name: "Reste à vivre",  value: Math.max(0, resteVivre), color: "#059669" },
  ].filter((s) => s.value > 0);

  return { resteVivre, resteVivrePct, totalCharges, chargesFixesTot, segments };
}

const MEDIANE_FR_RESTE = 1200;

const RENDERIZED_LABEL = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
  if (percent < 0.05) return null;
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={10} fontWeight={600}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function SimNiveauDeVie() {
  const [v, setV] = useState({
    revenus: 2500,
    loyer: 750,
    electricite: 80,
    telephone: 25,
    internet: 30,
    assurances: 80,
    alimentation: 350,
    transport: 150,
    loisirs: 100,
  });
  const set = (k) => (val) => setV((s) => ({ ...s, [k]: val }));

  const res = useMemo(() => calcNiveauDeVie(v), [v]);

  const verdictClass =
    res.resteVivre >= 500
      ? "sv2-verdict-green"
      : res.resteVivre >= 200
      ? "sv2-verdict-amber"
      : "sv2-verdict-red";

  const diffMediane = res.resteVivre - MEDIANE_FR_RESTE;

  // Personalized advice
  const charges = [
    { label: "logement", val: v.loyer },
    { label: "alimentation", val: v.alimentation },
    { label: "transport", val: v.transport },
    { label: "loisirs", val: v.loisirs },
  ];
  const biggestCharge = charges.sort((a, b) => b.val - a.val)[0];

  let advice = "";
  if (res.resteVivre < 200) {
    advice = `Votre budget est très contraint. Le poste ${biggestCharge.label} (${fmt(biggestCharge.val)}/mois) est votre plus grande dépense — examinez si vous pouvez le réduire en priorité.`;
  } else if (res.resteVivre < 500) {
    advice = `Votre reste à vivre est limité. Pour améliorer votre situation, concentrez-vous sur votre poste ${biggestCharge.label} (${fmt(biggestCharge.val)}/mois). Même 10 % d'économie libèrerait ${fmt(biggestCharge.val * 0.1)}/mois.`;
  } else {
    advice = `Votre reste à vivre est confortable. Pensez à affecter au moins 10–20 % de vos revenus (${fmt(v.revenus * 0.15)}/mois) à l'épargne pour préparer vos projets futurs.`;
  }

  const runningTotal = v.loyer + v.electricite + v.telephone + v.internet + v.assurances;

  return (
    <SimLayout
      icon="📊"
      title="Calculez votre reste à vivre réel"
      description="Visualisez votre budget mensuel après toutes vos charges"
      suggestions={[
        "/simulateurs/endettement",
        "/simulateurs/pret-conso",
        "/simulateurs/epargne",
      ]}
    >
      <div className="sv2-container">
        {/* ── Inputs ── */}
        <div className="fv2-card">
          <p className="fv2-card-kicker">Paramètres</p>
          <h2 className="fv2-card-title">Votre budget mensuel</h2>

          {/* 1 – Revenus */}
          <div className="fv2-revenus-wrap" style={{ marginTop: 20 }}>
            <p className="fv2-field-label">Revenus nets mensuels</p>
            <div className="fv2-revenus-input-row">
              <input
                type="number"
                className="fv2-revenus-input"
                value={v.revenus || ""}
                min={0} max={20000} step={100}
                onChange={(e) =>
                  set("revenus")(Math.max(0, Math.min(20000, Number(e.target.value) || 0)))
                }
              />
              <span className="fv2-revenus-unit">€/mois</span>
            </div>
            <Pills
              value={v.revenus}
              options={[1500, 2000, 2500, 3000, 3500, 4000]}
              onChange={set("revenus")}
              format={(o) => `${o} €`}
            />
          </div>

          {/* 2 – Logement */}
          <div className="fv2-revenus-wrap" style={{ marginTop: 20 }}>
            <p className="fv2-field-label">Logement (loyer ou mensualité)</p>
            <div className="fv2-revenus-input-row">
              <input
                type="number"
                className="fv2-revenus-input"
                value={v.loyer || ""}
                min={0} max={5000} step={50}
                onChange={(e) =>
                  set("loyer")(Math.max(0, Math.min(5000, Number(e.target.value) || 0)))
                }
              />
              <span className="fv2-revenus-unit">€/mois</span>
            </div>
          </div>

          {/* 3 – Charges fixes */}
          <div style={{ marginTop: 20 }}>
            <p className="fv2-field-label">Charges fixes</p>
            <div className="sv2-charges-grid" style={{ marginTop: 8 }}>
              {[
                { key: "electricite", label: "Électricité" },
                { key: "telephone",   label: "Téléphone" },
                { key: "internet",    label: "Internet" },
                { key: "assurances",  label: "Assurances" },
              ].map(({ key, label }) => (
                <div key={key} className="sv2-charge-item">
                  <label className="sv2-charge-item-label">{label}</label>
                  <div className="fv2-revenus-input-row" style={{ marginTop: 4 }}>
                    <input
                      type="number"
                      className="fv2-revenus-input"
                      value={v[key] || ""}
                      min={0} max={2000} step={5}
                      onChange={(e) =>
                        set(key)(Math.max(0, Math.min(2000, Number(e.target.value) || 0)))
                      }
                    />
                    <span className="fv2-revenus-unit">€</span>
                  </div>
                </div>
              ))}
            </div>
            <p className="fv2-hint">
              Total charges fixes : <strong>{fmt(v.electricite + v.telephone + v.internet + v.assurances)}/mois</strong>
              {" · "}Déduites jusqu'ici : <strong>{fmt(runningTotal)}/mois</strong>
            </p>
          </div>

          {/* 4 – Alimentation */}
          <div className="fv2-revenus-wrap" style={{ marginTop: 20 }}>
            <p className="fv2-field-label">Alimentation</p>
            <div className="fv2-revenus-input-row">
              <input
                type="number"
                className="fv2-revenus-input"
                value={v.alimentation || ""}
                min={0} max={2000} step={25}
                onChange={(e) =>
                  set("alimentation")(Math.max(0, Math.min(2000, Number(e.target.value) || 0)))
                }
              />
              <span className="fv2-revenus-unit">€/mois</span>
            </div>
            <Pills
              value={v.alimentation}
              options={[200, 300, 400, 500]}
              onChange={set("alimentation")}
              format={(o) => `${o} €`}
            />
          </div>

          {/* 5 – Transport */}
          <div className="fv2-revenus-wrap" style={{ marginTop: 20 }}>
            <p className="fv2-field-label">Transport</p>
            <div className="fv2-revenus-input-row">
              <input
                type="number"
                className="fv2-revenus-input"
                value={v.transport || ""}
                min={0} max={2000} step={25}
                onChange={(e) =>
                  set("transport")(Math.max(0, Math.min(2000, Number(e.target.value) || 0)))
                }
              />
              <span className="fv2-revenus-unit">€/mois</span>
            </div>
            <Pills
              value={v.transport}
              options={[50, 100, 200, 300]}
              onChange={set("transport")}
              format={(o) => `${o} €`}
            />
          </div>

          {/* 6 – Loisirs */}
          <div className="fv2-revenus-wrap" style={{ marginTop: 20 }}>
            <p className="fv2-field-label">Loisirs & divers</p>
            <div className="fv2-revenus-input-row">
              <input
                type="number"
                className="fv2-revenus-input"
                value={v.loisirs || ""}
                min={0} max={2000} step={25}
                onChange={(e) =>
                  set("loisirs")(Math.max(0, Math.min(2000, Number(e.target.value) || 0)))
                }
              />
              <span className="fv2-revenus-unit">€/mois</span>
            </div>
            <Pills
              value={v.loisirs}
              options={[50, 100, 150, 200]}
              onChange={set("loisirs")}
              format={(o) => `${o} €`}
            />
          </div>
        </div>

        {/* ── Results ── */}
        {v.revenus > 0 && (
          <div className="fv2-card" style={{ marginTop: 16 }}>
            {/* Verdict */}
            <div className={`sv2-verdict ${verdictClass}`}>
              <p className="sv2-verdict-label">Votre reste à vivre est de</p>
              <p className="sv2-verdict-amount">
                {res.resteVivre < 0 ? "−" : ""}
                {fmt(Math.abs(res.resteVivre))}/mois
              </p>
              <p className="sv2-verdict-sub">
                Soit {res.resteVivrePct.toFixed(0)} % de vos revenus · Total charges : {fmt(res.totalCharges)}/mois
              </p>
            </div>

            {/* Stat cards */}
            <div className="sim-stats-grid" style={{ marginTop: 20 }}>
              <div className="sim-stat-card">
                <span className="sim-stat-card-label">Revenus nets</span>
                <span className="sim-stat-card-value">{fmt(v.revenus)}</span>
              </div>
              <div className="sim-stat-card sim-stat-card-blue">
                <span className="sim-stat-card-label">Total charges</span>
                <span className="sim-stat-card-value">{fmt(res.totalCharges)}</span>
              </div>
              <div className={`sim-stat-card ${res.resteVivre >= 500 ? "sim-stat-card-green" : res.resteVivre >= 200 ? "" : "sim-stat-card-red"}`}>
                <span className="sim-stat-card-label">Reste à vivre</span>
                <span className="sim-stat-card-value">{fmt(res.resteVivre)}/mois</span>
              </div>
            </div>

            {/* Donut chart */}
            {res.segments.length > 0 && (
              <div style={{ marginTop: 24 }}>
                <div className="fv2-slider-header">
                  <span className="fv2-slider-label">Répartition de votre budget</span>
                </div>
                <ResponsiveContainer width="100%" height={260}>
                  <PieChart>
                    <Pie
                      data={res.segments}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={90}
                      paddingAngle={2}
                      dataKey="value"
                      labelLine={false}
                      label={RENDERIZED_LABEL}
                    >
                      {res.segments.map((seg, i) => (
                        <Cell key={i} fill={seg.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<ChartTip />} />
                    <Legend
                      formatter={(value) => (
                        <span style={{ fontSize: 12, color: "#374151" }}>{value}</span>
                      )}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* Comparison to national median */}
            <div className="sv2-insight" style={{ marginTop: 20 }}>
              La médiane française est de <strong>{fmt(MEDIANE_FR_RESTE)}/mois</strong> de reste à vivre. Vous êtes{" "}
              {diffMediane >= 0 ? (
                <strong style={{ color: "#059669" }}>{fmt(diffMediane)} au-dessus</strong>
              ) : (
                <strong style={{ color: "#dc2626" }}>{fmt(Math.abs(diffMediane))} en-dessous</strong>
              )}{" "}
              de cette médiane.
            </div>

            {/* Personalized advice */}
            <div className="sv2-insight" style={{ marginTop: 12 }}>
              {advice}
            </div>
          </div>
        )}

        <SimCrossSell
          show={res.resteVivre >= 200 && v.loyer > 0}
          loan={v.loyer * 12 * 20}
          taux={3.5}
          dureeCredit={20}
        />
      </div>
    </SimLayout>
  );
}
