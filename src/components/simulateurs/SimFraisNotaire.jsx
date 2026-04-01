import { useMemo, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import SimLayout from "./SimLayout";
import SimCrossSell from "./SimCrossSell";

const fmt = (v) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(v);
const fmtK = (v) => (v >= 1000 ? `${(v / 1000).toFixed(0)}k €` : `${v} €`);

const PRIX_PILLS = [100000, 150000, 200000, 250000, 300000, 400000, 500000];
const DONUT_COLORS = ["#1a56db", "#06b6d4", "#10b981", "#f59e0b"];

function calcEmolumentsHT(prix) {
  const tranches = [
    { max: 6500,     rate: 0.03945 },
    { max: 17000,    rate: 0.01627 },
    { max: 60000,    rate: 0.01085 },
    { max: Infinity, rate: 0.00814 },
  ];
  let emol = 0, prev = 0;
  for (const t of tranches) {
    const slice = Math.min(
      Math.max(0, prix - prev),
      t.max === Infinity ? prix - prev : t.max - prev
    );
    emol += slice * t.rate;
    prev = t.max;
    if (prev >= prix) break;
  }
  return Math.max(90, emol);
}

function calcFrais(prix, type) {
  const isNeuf = type === "neuf";
  const taux_dmto = isNeuf ? 0.00715 : 0.0581;
  const droitsMutation = prix * taux_dmto;
  const emolumentsHT = calcEmolumentsHT(prix);
  const emolumentsTTC = emolumentsHT * 1.2;
  const csi = Math.max(15, prix * 0.001);
  const debours = 1200;
  const total = droitsMutation + emolumentsTTC + csi + debours;
  const pct = (total / prix) * 100;
  const fraisNeuf = prix * 0.00715 + emolumentsTTC + csi + debours;
  return { droitsMutation, emolumentsTTC, csi, debours, total, pct, fraisNeuf };
}

export default function SimFraisNotaire() {
  const [prix, setPrix] = useState(250000);
  const [type, setType] = useState("ancien");
  const [primoAccedant, setPrimoAccedant] = useState(false);

  const frais = useMemo(() => calcFrais(prix, type), [prix, type]);

  const lineItems = [
    { label: "Droits d'enregistrement", amount: frais.droitsMutation, color: DONUT_COLORS[0] },
    { label: "Émoluments du notaire TTC", amount: frais.emolumentsTTC, color: DONUT_COLORS[1] },
    { label: "Contribution sécurité immobilière", amount: frais.csi, color: DONUT_COLORS[2] },
    { label: "Débours & frais divers", amount: frais.debours, color: DONUT_COLORS[3] },
  ];

  const donutData = lineItems.map((item) => ({ name: item.label, value: Math.round(item.amount) }));

  const fraisAncien = calcFrais(prix, "ancien");
  const fraisNeufVal = calcFrais(prix, "neuf");
  const economie = fraisAncien.total - fraisNeufVal.total;

  return (
    <SimLayout
      icon="📋"
      title="Calculez exactement vos frais de notaire"
      description="Le vrai coût de votre achat, frais inclus"
      suggestions={[
        "/simulateurs/pret-immobilier",
        "/simulateurs/endettement",
        "/simulateurs/ptz",
        "/simulateurs/plus-value",
        "/simulateurs/budget-maximum",
        "/simulateurs/score-acheteur",
      ]}
    >
      <div className="sv2-container">

        {/* ── Inputs card ── */}
        <div className="fv2-card" style={{ marginBottom: 20 }}>

          {/* Prix du bien */}
          <div className="fv2-revenus-wrap" style={{ marginBottom: 24 }}>
            <p className="fv2-field-label">Prix du bien</p>
            <div className="fv2-revenus-input-row">
              <input
                type="number" className="fv2-revenus-input"
                value={prix || ""} min={10000} max={5000000} step={5000}
                placeholder="250 000"
                onChange={(e) => setPrix(Math.max(0, Math.min(5000000, Number(e.target.value) || 0)))}
              />
              <span className="fv2-revenus-unit">€</span>
            </div>
            <div className="fv2-revenus-pills">
              {PRIX_PILLS.map((p) => (
                <button key={p} type="button" className={`fv2-revenus-pill${prix === p ? " active" : ""}`} onClick={() => setPrix(p)}>
                  {fmtK(p)}
                </button>
              ))}
            </div>
          </div>

          {/* Type du bien */}
          <p className="fv2-field-label" style={{ marginBottom: 10 }}>Type du bien</p>
          <div className="fv2-choices-row" style={{ marginBottom: 8 }}>
            <button
              type="button"
              className={`fv2-choice${type === "ancien" ? " fv2-choice-active" : ""}`}
              onClick={() => setType("ancien")}
            >
              <span className="fv2-choice-body">
                <span className="fv2-choice-label">🏚️ Dans l'ancien</span>
                <span className="fv2-choice-sub">Frais 7-8 % du prix</span>
              </span>
            </button>
            <button
              type="button"
              className={`fv2-choice${type === "neuf" ? " fv2-choice-active" : ""}`}
              onClick={() => setType("neuf")}
            >
              <span className="fv2-choice-body">
                <span className="fv2-choice-label">🏗️ Dans le neuf</span>
                <span className="fv2-choice-sub">Frais réduits ~3 %</span>
              </span>
            </button>
          </div>
          <p className="fv2-hint" style={{ marginBottom: 20 }}>
            {type === "ancien"
              ? "Dans l'ancien, les droits de mutation sont élevés (~5,8 %). Ils financent les collectivités locales."
              : "Dans le neuf (VEFA), les droits de mutation sont réduits à 0,715 % — soit environ 5 % d'économies."}
          </p>

          {/* Primo-accédant */}
          <div
            style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", background: "#f8fafc", borderRadius: 12, cursor: "pointer" }}
            onClick={() => setPrimoAccedant(!primoAccedant)}
          >
            <div style={{
              width: 22, height: 22, borderRadius: 6, border: `2px solid ${primoAccedant ? "#059669" : "#d1dae8"}`,
              background: primoAccedant ? "#059669" : "#fff",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
            }}>
              {primoAccedant && (
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path d="M2 6.5L5 9.5l6-6" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#334155" }}>Primo-accédant</div>
              <div style={{ fontSize: 12, color: "#64748b" }}>Les primo-accédants bénéficient de certains avantages selon les communes</div>
            </div>
          </div>
        </div>

        {/* ── Results card ── */}
        <div className="fv2-card" style={{ marginBottom: 20 }}>

          {/* Big verdict */}
          <div className="sv2-verdict sv2-verdict-amber" style={{ marginBottom: 20 }}>
            <div className="sv2-verdict-label">En plus du prix affiché, prévoyez</div>
            <div className="sv2-verdict-amount">{fmt(Math.round(frais.total))}</div>
            <div className="sv2-verdict-sub">soit {frais.pct.toFixed(1)} % du prix — Prix total : {fmt(Math.round(prix + frais.total))}</div>
          </div>

          {/* Line-by-line breakdown */}
          <div className="sv2-line-items">
            {lineItems.map((item) => {
              const pct = frais.total > 0 ? (item.amount / frais.total) * 100 : 0;
              return (
                <div key={item.label} className="sv2-line-item">
                  <div className="sv2-line-item-row">
                    <span className="sv2-line-item-label">{item.label}</span>
                    <span className="sv2-line-item-amount">{fmt(Math.round(item.amount))}</span>
                  </div>
                  <div className="sv2-line-bar-track">
                    <div className="sv2-line-bar-fill" style={{ width: `${pct}%`, background: item.color }}/>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Donut chart */}
          <div style={{ height: 220, marginBottom: 20 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={donutData}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={90}
                  dataKey="value"
                  paddingAngle={2}
                >
                  {donutData.map((entry, i) => (
                    <Cell key={i} fill={DONUT_COLORS[i % DONUT_COLORS.length]}/>
                  ))}
                </Pie>
                <Tooltip
                  formatter={(v) => [fmt(v)]}
                  contentStyle={{ borderRadius: 10, border: "none", boxShadow: "0 4px 20px rgba(0,0,0,.1)", fontSize: 12 }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Comparison table ancien vs neuf */}
          <table className="sv2-compare-table">
            <thead>
              <tr>
                <th></th>
                <th>Ancien</th>
                <th>Neuf</th>
                <th>Économie</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Taux de frais</td>
                <td className="emphasis">~{fraisAncien.pct.toFixed(1)} %</td>
                <td className="emphasis">~{fraisNeufVal.pct.toFixed(1)} %</td>
                <td className="good">~{(fraisAncien.pct - fraisNeufVal.pct).toFixed(1)} %</td>
              </tr>
              <tr>
                <td>Sur votre prix</td>
                <td>{fmt(Math.round(fraisAncien.total))}</td>
                <td>{fmt(Math.round(fraisNeufVal.total))}</td>
                <td className="good">{fmt(Math.round(economie))}</td>
              </tr>
            </tbody>
          </table>

          {/* Insights */}
          <div className="sv2-insight">
            Pour un bien à <strong>{fmt(prix)}</strong> dans l'ancien, le prix réel tout compris est de{" "}
            <strong>{fmt(Math.round(prix + fraisAncien.total))}</strong>.
          </div>

          {type === "ancien" && economie > 0 && (
            <div className="sv2-insight" style={{ background: "linear-gradient(135deg,#f0fdf4,#dcfce7)", color: "#15803d" }}>
              💡 Acheter dans le neuf vous ferait économiser <strong>{fmt(Math.round(economie))}</strong> de frais de notaire.
            </div>
          )}
        </div>

        <SimCrossSell
          show={prix > 0}
          loan={Math.max(0, prix - 40000)}
          taux={3.5}
          dureeCredit={20}
        />
      </div>
    </SimLayout>
  );
}
