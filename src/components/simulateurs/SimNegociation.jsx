import { useMemo, useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ReferenceLine,
  ResponsiveContainer, CartesianGrid, Legend,
} from "recharts";
import SimLayout from "./SimLayout";
import SimCrossSell from "./SimCrossSell";

/* ─── Formatters ─────────────────────────────────────────── */
const fmt = (v) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(v);
const fmtK = (v) =>
  v >= 1000 ? `${Math.round(v / 1000)}k €` : `${Math.round(v)} €`;
const fmtPct = (v) => `${v.toFixed(1)} %`;

/* ─── Core helpers ───────────────────────────────────────── */
function mortgage(p, r, y) {
  if (p <= 0 || y <= 0) return 0;
  const mr = r / 100 / 12;
  if (mr === 0) return p / (y * 12);
  return (p * mr) / (1 - Math.pow(1 + mr, -(y * 12)));
}

function calcNegociation({ prixAffiche, loyer, duree, taux, apport }) {
  const totalLocation = loyer * 12 * duree;
  const capital = Math.max(0, prixAffiche - apport);
  const mensualite = mortgage(capital, taux, 20);
  const totalAchat = mensualite * 12 * duree + prixAffiche * 0.08 + apport;
  const diff = totalAchat - totalLocation;

  // Binary search for break-even price
  let lo = 0, hi = prixAffiche * 2, prixEquilibre = prixAffiche;
  for (let i = 0; i < 50; i++) {
    const mid = (lo + hi) / 2;
    const cap = Math.max(0, mid - apport);
    const mens = mortgage(cap, taux, 20);
    const totMid = mens * 12 * duree + mid * 0.08 + apport;
    if (totMid > totalLocation) { hi = mid; }
    else { lo = mid; prixEquilibre = mid; }
  }

  const remise = Math.max(0, ((prixAffiche - prixEquilibre) / prixAffiche) * 100);

  // Chart: cost by price multiplier (70% to 110% of listed price)
  const chartData = [];
  for (let mult = 0.70; mult <= 1.105; mult += 0.025) {
    const p = Math.round(prixAffiche * mult);
    const cap = Math.max(0, p - apport);
    const mens = mortgage(cap, taux, 20);
    const totAch = mens * 12 * duree + p * 0.08 + apport;
    chartData.push({
      prix: `${Math.round(mult * 100)} %`,
      "Coût achat": Math.round(totAch),
      "Coût location": Math.round(totalLocation),
    });
  }

  return {
    prixEquilibre: Math.round(prixEquilibre),
    remise,
    mensualite,
    diff,
    totalAchat,
    totalLocation,
    capital,
    chartData,
  };
}

/* ─── Slider ─────────────────────────────────────────────── */
function Slider({ label, value, onChange, min, max, step = 1, format = String }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="fv2-slider-track-wrap" style={{ "--pct": `${pct}%` }}>
      <div className="fv2-slider-header">
        <span className="fv2-slider-label">{label}</span>
        <span className="fv2-slider-val">{format(value)}</span>
      </div>
      <input
        type="range" className="fv2-slider" min={min} max={max} step={step}
        value={value} onChange={(e) => onChange(Number(e.target.value))}
      />
      <div className="fv2-slider-fill" />
      <div className="fv2-slider-minmax">
        <span>{format(min)}</span>
        <span>{format(max)}</span>
      </div>
    </div>
  );
}

/* ─── Chart Tooltip ──────────────────────────────────────── */
function ChartTip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="chart-tooltip">
      <p className="chart-tooltip-label">Prix affiché : {label}</p>
      {payload.map((p) => (
        <div key={p.dataKey} className="chart-tooltip-row">
          <span style={{ color: p.stroke }}>{p.name}</span>
          <span>{fmt(p.value)}</span>
        </div>
      ))}
    </div>
  );
}

/* ─── Component ──────────────────────────────────────────── */
export default function SimNegociation() {
  const [s, setS] = useState({
    prixAffiche: 300000,
    loyer: 900,
    duree: 10,
    taux: 3.5,
    apport: 40000,
  });
  const set = (k) => (val) => setS((prev) => ({ ...prev, [k]: val }));

  const res = useMemo(() => calcNegociation(s), [s]);

  // Find intersection label for reference line
  const intersectLabel = (() => {
    const data = res.chartData;
    for (let i = 0; i < data.length - 1; i++) {
      const d1 = data[i], d2 = data[i + 1];
      const diff1 = d1["Coût achat"] - d1["Coût location"];
      const diff2 = d2["Coût achat"] - d2["Coût location"];
      if (diff1 > 0 && diff2 <= 0) return d2.prix;
      if (diff1 <= 0 && diff2 > 0) return d1.prix;
    }
    return null;
  })();

  const verdictClass = res.remise < 5 ? "sv2-verdict-blue" : "sv2-verdict-amber";
  const remiseMinPrix = Math.round(s.prixAffiche * (1 - res.remise / 2 / 100));
  const remiseMinPct = res.remise / 2;

  return (
    <SimLayout
      icon="🤝"
      title="À quel prix négocier pour que votre achat soit rentable ?"
      description="Calculez le prix maximum à payer selon votre horizon"
      suggestions={[
        "/simulateurs/pret-immobilier",
        "/simulateurs/frais-notaire",
        "/simulateurs/comparateur-villes",
      ]}
    >
      <div className="sv2-container">

        {/* ── Inputs ── */}
        <div className="fv2-card">
          <p className="fv2-card-kicker">Votre projet</p>
          <h2 className="fv2-card-title">Paramètres de négociation</h2>

          {/* Prix affiché */}
          <div style={{ marginBottom: 20 }}>
            <label className="fv2-field-label">Prix affiché par le vendeur</label>
            <div className="fv2-revenus-input-row">
              <div className="fv2-revenus-wrap">
                <input
                  type="number" className="fv2-revenus-input"
                  value={s.prixAffiche}
                  onChange={(e) => set("prixAffiche")(Number(e.target.value))}
                />
                <span className="fv2-revenus-unit">€</span>
              </div>
            </div>
            <div className="fv2-revenus-pills">
              {[150000, 200000, 250000, 300000, 400000, 500000].map((p) => (
                <button key={p} type="button"
                  className={`fv2-revenus-pill${s.prixAffiche === p ? " active" : ""}`}
                  onClick={() => set("prixAffiche")(p)}>
                  {fmtK(p)}
                </button>
              ))}
            </div>
          </div>

          {/* Loyer */}
          <div style={{ marginBottom: 20 }}>
            <label className="fv2-field-label">Votre loyer actuel (ou loyer équivalent)</label>
            <div className="fv2-revenus-input-row">
              <div className="fv2-revenus-wrap">
                <input
                  type="number" className="fv2-revenus-input"
                  value={s.loyer}
                  onChange={(e) => set("loyer")(Number(e.target.value))}
                />
                <span className="fv2-revenus-unit">€/mois</span>
              </div>
            </div>
            <div className="fv2-revenus-pills">
              {[600, 800, 900, 1000, 1200, 1500].map((p) => (
                <button key={p} type="button"
                  className={`fv2-revenus-pill${s.loyer === p ? " active" : ""}`}
                  onClick={() => set("loyer")(p)}>
                  {fmt(p)}
                </button>
              ))}
            </div>
            <p className="fv2-hint">Loyer que vous évitez si vous achetez</p>
          </div>

          {/* Durée */}
          <div style={{ marginBottom: 20 }}>
            <Slider
              label="Durée prévue dans le bien"
              value={s.duree}
              onChange={set("duree")}
              min={3} max={20} step={1}
              format={(v) => `${v} ans`}
            />
            <div className="fv2-revenus-pills" style={{ marginTop: 6 }}>
              {[5, 7, 10, 15, 20].map((p) => (
                <button key={p} type="button"
                  className={`fv2-revenus-pill${s.duree === p ? " active" : ""}`}
                  onClick={() => set("duree")(p)}>
                  {p} ans
                </button>
              ))}
            </div>
            {s.duree < 5 && (
              <p className="fv2-hint" style={{ color: "#dc2626" }}>
                ⚠️ Moins de 5 ans : les frais de notaire (8 %) s'amortissent difficilement — louer est souvent plus avantageux.
              </p>
            )}
          </div>

          {/* Taux */}
          <div>
            <Slider
              label="Taux du crédit"
              value={s.taux}
              onChange={set("taux")}
              min={1} max={7} step={0.1}
              format={(v) => `${v.toFixed(1)} %`}
            />
          </div>
        </div>

        {/* ── Results ── */}
        {res && (
          <>
            {/* Verdict */}
            <div className={`sv2-verdict ${verdictClass}`}>
              <p className="sv2-verdict-label">Prix maximum à payer</p>
              <p className="sv2-verdict-amount">{fmt(res.prixEquilibre)}</p>
              <p className="sv2-verdict-sub">
                soit <strong>{fmtPct(res.remise)}</strong> de remise sur le prix affiché
              </p>
            </div>

            {/* 3 scenario cards */}
            <div className="sv2-scenarios">
              <div className="sv2-scenario-card">
                <p className="sv2-scenario-dur">Prix affiché</p>
                <p className="sv2-scenario-amt">{fmt(s.prixAffiche)}</p>
              </div>
              <div className="sv2-scenario-card highlight">
                <p className="sv2-scenario-dur">Prix d'équilibre</p>
                <p className="sv2-scenario-amt">{fmt(res.prixEquilibre)}</p>
              </div>
              <div className="sv2-scenario-card" style={{ color: "#059669" }}>
                <p className="sv2-scenario-dur">Remise à négocier</p>
                <p className="sv2-scenario-amt" style={{ color: "#059669" }}>
                  -{fmt(s.prixAffiche - res.prixEquilibre)}
                </p>
              </div>
            </div>

            {/* Line chart */}
            <div className="fv2-card" style={{ marginTop: 16 }}>
              <p className="fv2-card-kicker">Simulation</p>
              <p className="fv2-card-title" style={{ fontSize: 15, marginBottom: 12 }}>
                Coût total achat vs location selon le prix payé
              </p>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={res.chartData} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="prix" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} tickFormatter={fmtK} />
                  <Tooltip content={<ChartTip />} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  {intersectLabel && (
                    <ReferenceLine
                      x={intersectLabel}
                      stroke="#f59e0b"
                      strokeDasharray="4 3"
                      label={{ value: "Équilibre", fontSize: 10, fill: "#f59e0b", position: "insideTopRight" }}
                    />
                  )}
                  <Line
                    type="monotone" dataKey="Coût achat" stroke="#2563eb"
                    strokeWidth={2} dot={false} name="Coût achat"
                  />
                  <Line
                    type="monotone" dataKey="Coût location" stroke="#059669"
                    strokeWidth={2} dot={false} strokeDasharray="5 3" name="Coût location"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Insight */}
            <div className="sv2-insight">
              <p>
                🎯 Pour rentabiliser votre achat en <strong>{s.duree} ans</strong>, vous ne devez pas payer plus de{" "}
                <strong style={{ color: "#2563eb" }}>{fmt(res.prixEquilibre)}</strong>. Cela représente une négociation de{" "}
                <strong style={{ color: "#059669" }}>{fmtPct(res.remise)}</strong> sur le prix affiché.
              </p>
            </div>

            {/* Fourchette recommandée */}
            <div className="sv2-nego-range">
              <p className="sv2-nego-range-title">Fourchette recommandée</p>
              <div className="sv2-nego-range-item">
                <span className="sv2-nego-range-label">Négociation minimale recommandée</span>
                <span className="sv2-nego-range-val">
                  -{fmtPct(remiseMinPct)} soit {fmt(remiseMinPrix)}
                </span>
              </div>
              <div className="sv2-nego-range-item">
                <span className="sv2-nego-range-label">Négociation optimale</span>
                <span className="sv2-nego-range-val">
                  -{fmtPct(res.remise)} soit {fmt(res.prixEquilibre)}
                </span>
              </div>
            </div>

            {/* Cross-sell */}
            <SimCrossSell
              show={s.prixAffiche > 0}
              loan={res.capital}
              taux={s.taux}
              dureeCredit={20}
            />
          </>
        )}
      </div>
    </SimLayout>
  );
}
