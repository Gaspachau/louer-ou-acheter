import { useMemo, useState } from "react";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ReferenceLine,
  ResponsiveContainer, CartesianGrid,
} from "recharts";
import SimLayout from "./SimLayout";
import SimCrossSell from "./SimCrossSell";

/* ─── Formatters ─────────────────────────────────────────── */
const fmt = (v) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(v);
const fmtK = (v) =>
  v >= 1000 ? `${Math.round(v / 1000)}k €` : `${Math.round(v)} €`;

function ChartTip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="chart-tooltip">
      <p className="chart-tooltip-label">Détention : {label} ans</p>
      {payload.map((p) => (
        <div key={p.dataKey} className="chart-tooltip-row">
          <span style={{ color: p.stroke || p.fill }}>{p.name}</span>
          <span>{fmt(p.value)}</span>
        </div>
      ))}
    </div>
  );
}

/* ─── Abattements légaux ─────────────────────────────────── */
function abattIR(d) {
  if (d <= 5) return 0;
  if (d <= 21) return Math.min(100, (d - 5) * 6);
  if (d === 22) return Math.min(100, 16 * 6 + 4);
  return 100;
}
function abattPS(d) {
  if (d <= 5) return 0;
  if (d <= 21) return Math.min(100, (d - 5) * 1.65);
  if (d === 22) return Math.min(100, (d - 5) * 1.65 + 1.6);
  if (d <= 30) return Math.min(100, 17 * 1.65 + 1.6 + (d - 22) * 9);
  return 100;
}

/* ─── Core calculation ───────────────────────────────────── */
function calcPlusValue({ prixAchat, anneeAchat, prixVente, travaux, type }) {
  const anneeVente = 2026;
  const dureeDetention = Math.max(0, anneeVente - anneeAchat);
  const plusValueBrute = prixVente - prixAchat;

  if (type === "principale") {
    return {
      plusValueBrute, impot: 0, csgcrds: 0,
      plusValueNette: plusValueBrute, exoneree: true,
      dureeDetention, abattIRpct: 100, abattPSpct: 100,
      economiesTravaux: 0, baseImposable: 0,
    };
  }

  if (plusValueBrute <= 0) {
    return {
      plusValueBrute, impot: 0, csgcrds: 0, plusValueNette: 0,
      exoneree: false, dureeDetention, abattIRpct: abattIR(dureeDetention),
      abattPSpct: abattPS(dureeDetention), economiesTravaux: 0, baseImposable: 0,
    };
  }

  const baseImposable = Math.max(0, plusValueBrute - travaux);
  const aIR = abattIR(dureeDetention);
  const aPS = abattPS(dureeDetention);
  const baseIR = baseImposable * (1 - aIR / 100);
  const basePS = baseImposable * (1 - aPS / 100);
  const impot = baseIR * 0.19;
  const csgcrds = basePS * 0.172;
  const economiesTravaux =
    travaux * (1 - aIR / 100) * 0.19 + travaux * (1 - aPS / 100) * 0.172;
  const plusValueNette = plusValueBrute - impot - csgcrds;

  const chartData = Array.from({ length: 31 }, (_, d) => {
    const base = Math.max(0, plusValueBrute - travaux);
    const ir = base * (1 - abattIR(d) / 100) * 0.19;
    const ps = base * (1 - abattPS(d) / 100) * 0.172;
    return {
      annee: d,
      "Impôt total": Math.round(ir + ps),
      "Plus-value nette": Math.round(plusValueBrute - ir - ps),
    };
  });

  return {
    plusValueBrute, impot, csgcrds, plusValueNette,
    exoneree: false, dureeDetention,
    abattIRpct: aIR, abattPSpct: aPS,
    economiesTravaux, baseImposable, chartData,
  };
}

/* ─── Slider helper ──────────────────────────────────────── */
function Slider({ label, value, onChange, min, max, step = 1, format = (v) => v }) {
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

/* ─── Component ──────────────────────────────────────────── */
export default function SimPlusValue() {
  const [v, setV] = useState({
    prixAchat: 200000,
    anneeAchat: 2018,
    prixVente: 280000,
    travaux: 10000,
    type: "investissement",
  });
  const set = (k) => (val) => setV((s) => ({ ...s, [k]: val }));

  const res = useMemo(() => calcPlusValue(v), [v]);

  const pvBrute = v.prixVente - v.prixAchat;
  const verdictClass = res.exoneree
    ? "sv2-verdict-green"
    : pvBrute <= 0
    ? "sv2-verdict-red"
    : "sv2-verdict-green";

  /* next-year savings hint */
  const nextYearSaving = (() => {
    if (!res || res.exoneree || pvBrute <= 0) return 0;
    const d = res.dureeDetention;
    const base = Math.max(0, pvBrute - v.travaux);
    const irNow = base * (1 - abattIR(d) / 100) * 0.19 + base * (1 - abattPS(d) / 100) * 0.172;
    const irNext = base * (1 - abattIR(d + 1) / 100) * 0.19 + base * (1 - abattPS(d + 1) / 100) * 0.172;
    return Math.round(irNow - irNext);
  })();

  return (
    <SimLayout
      icon="📈"
      title="Calculez votre plus-value nette après impôts"
      description="L'impact de la durée de détention sur votre fiscalité"
      suggestions={[
        "/simulateurs/pret-immobilier",
        "/simulateurs/frais-notaire",
        "/simulateurs/rentabilite-locative",
      ]}
    >
      <div className="sv2-container">

        {/* ── Inputs ── */}
        <div className="fv2-card">
          <p className="fv2-card-kicker">Votre bien</p>
          <h2 className="fv2-card-title">Renseignez votre opération</h2>

          {/* Prix d'achat */}
          <div style={{ marginBottom: 20 }}>
            <label className="fv2-field-label">Prix d'achat</label>
            <div className="fv2-revenus-input-row">
              <div className="fv2-revenus-wrap">
                <input
                  type="number" className="fv2-revenus-input"
                  value={v.prixAchat}
                  onChange={(e) => set("prixAchat")(Number(e.target.value))}
                />
                <span className="fv2-revenus-unit">€</span>
              </div>
            </div>
            <div className="fv2-revenus-pills">
              {[100000, 150000, 200000, 250000, 300000].map((p) => (
                <button key={p} type="button"
                  className={`fv2-revenus-pill${v.prixAchat === p ? " active" : ""}`}
                  onClick={() => set("prixAchat")(p)}>
                  {fmtK(p)}
                </button>
              ))}
            </div>
          </div>

          {/* Année d'achat */}
          <div style={{ marginBottom: 20 }}>
            <label className="fv2-field-label">Année d'achat</label>
            <div className="fv2-choices-row">
              {[2015, 2018, 2020, 2022, 2024].map((y) => (
                <button key={y} type="button"
                  className={`fv2-choice${v.anneeAchat === y ? " fv2-choice-active" : ""}`}
                  onClick={() => set("anneeAchat")(y)}>
                  {y}
                </button>
              ))}
            </div>
            <p className="fv2-hint">
              Durée de détention actuelle&nbsp;: <strong>{Math.max(0, 2026 - v.anneeAchat)} ans</strong> (2026)
            </p>
          </div>

          {/* Prix de vente */}
          <div style={{ marginBottom: 20 }}>
            <label className="fv2-field-label">Prix de vente estimé</label>
            <div className="fv2-revenus-input-row">
              <div className="fv2-revenus-wrap">
                <input
                  type="number" className="fv2-revenus-input"
                  value={v.prixVente}
                  onChange={(e) => set("prixVente")(Number(e.target.value))}
                />
                <span className="fv2-revenus-unit">€</span>
              </div>
            </div>
            <div className="fv2-revenus-pills">
              {[150000, 200000, 250000, 300000, 400000, 500000].map((p) => (
                <button key={p} type="button"
                  className={`fv2-revenus-pill${v.prixVente === p ? " active" : ""}`}
                  onClick={() => set("prixVente")(p)}>
                  {fmtK(p)}
                </button>
              ))}
            </div>
            {pvBrute !== 0 && (
              <p className="fv2-hint" style={{ color: pvBrute > 0 ? "#059669" : "#dc2626", fontWeight: 600 }}>
                {pvBrute > 0 ? `Plus-value brute : +${fmt(pvBrute)}` : `Moins-value : ${fmt(pvBrute)}`}
              </p>
            )}
          </div>

          {/* Travaux */}
          <div style={{ marginBottom: 20 }}>
            <Slider
              label="Travaux réalisés"
              value={v.travaux}
              onChange={set("travaux")}
              min={0} max={100000} step={5000}
              format={(val) => fmt(val)}
            />
            <div className="fv2-revenus-pills" style={{ marginTop: 6 }}>
              {[0, 5000, 10000, 20000, 30000, 50000].map((p) => (
                <button key={p} type="button"
                  className={`fv2-revenus-pill${v.travaux === p ? " active" : ""}`}
                  onClick={() => set("travaux")(p)}>
                  {p === 0 ? "Aucun" : fmtK(p)}
                </button>
              ))}
            </div>
            <p className="fv2-hint">Réductible de la plus-value imposable</p>
          </div>

          {/* Type du bien */}
          <div>
            <label className="fv2-field-label">Type du bien</label>
            <div className="fv2-choices-row">
              <button type="button"
                className={`fv2-choice${v.type === "principale" ? " fv2-choice-active" : ""}`}
                onClick={() => set("type")("principale")}>
                🏠 Résidence principale
              </button>
              <button type="button"
                className={`fv2-choice${v.type === "investissement" ? " fv2-choice-active" : ""}`}
                onClick={() => set("type")("investissement")}>
                🏘️ Investissement locatif
              </button>
            </div>
            {v.type === "principale" && (
              <p className="fv2-hint" style={{ color: "#059669" }}>Exonérée de tout impôt sur la plus-value</p>
            )}
          </div>
        </div>

        {/* ── Results ── */}
        {res && (
          <>
            {/* Verdict */}
            <div className={`sv2-verdict ${verdictClass}`}>
              <p className="sv2-verdict-label">Plus-value nette après impôts</p>
              <p className="sv2-verdict-amount">{fmt(Math.max(0, res.plusValueNette))}</p>
              {res.exoneree && (
                <p className="sv2-verdict-sub">Résidence principale — exonération totale</p>
              )}
              {!res.exoneree && pvBrute > 0 && (
                <p className="sv2-verdict-sub">
                  Impôts totaux : {fmt(res.impot + res.csgcrds)} · Taux effectif :{" "}
                  {pvBrute > 0 ? ((res.impot + res.csgcrds) / pvBrute * 100).toFixed(1) : 0} %
                </p>
              )}
            </div>

            {/* Exonération badge */}
            {res.exoneree && (
              <div className="sv2-exoneree-badge">
                ✅ En tant que résidence principale, cette plus-value est totalement exonérée d'impôts.
              </div>
            )}

            {/* Line items */}
            {!res.exoneree && pvBrute > 0 && (
              <div className="sv2-line-items">
                {[
                  { label: "Plus-value brute", amount: pvBrute, color: "#059669", sign: "+" },
                  { label: "Travaux déduits", amount: -v.travaux, color: "#2563eb", sign: "-" },
                  { label: `Abattement IR (${res.abattIRpct.toFixed(0)} %)`, amount: -(res.baseImposable - res.baseImposable * (1 - res.abattIRpct / 100)) || 0, color: "#7c3aed", sign: "-" },
                  { label: "Impôt sur plus-value (19 %)", amount: -res.impot, color: "#dc2626", sign: "-" },
                  { label: "CSG-CRDS (17,2 %)", amount: -res.csgcrds, color: "#ef4444", sign: "-" },
                ].map(({ label, amount, color, sign }) => (
                  <div key={label} className="sv2-line-item">
                    <div className="sv2-line-item-row">
                      <span className="sv2-line-item-label">{label}</span>
                      <span className="sv2-line-item-amount" style={{ color }}>
                        {amount < 0 ? "-" : sign}{fmt(Math.abs(amount))}
                      </span>
                    </div>
                    <div className="sv2-line-bar-track">
                      <div
                        className="sv2-line-bar-fill"
                        style={{
                          width: `${Math.min(100, (Math.abs(amount) / Math.abs(pvBrute)) * 100)}%`,
                          background: color,
                        }}
                      />
                    </div>
                  </div>
                ))}
                {/* Total impôts */}
                <div className="sv2-line-item" style={{ borderTop: "2px solid #e2e8f0", paddingTop: 8, marginTop: 4 }}>
                  <div className="sv2-line-item-row">
                    <span className="sv2-line-item-label" style={{ fontWeight: 700 }}>Total impôts</span>
                    <span className="sv2-line-item-amount" style={{ color: "#dc2626", fontWeight: 700 }}>
                      -{fmt(res.impot + res.csgcrds)}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Area chart */}
            {!res.exoneree && pvBrute > 0 && res.chartData && (
              <div className="fv2-card" style={{ marginTop: 16 }}>
                <p className="fv2-card-kicker">Évolution fiscale</p>
                <p className="fv2-card-title" style={{ fontSize: 15, marginBottom: 12 }}>
                  Impôt et plus-value nette selon la durée de détention
                </p>
                <ResponsiveContainer width="100%" height={220}>
                  <AreaChart data={res.chartData} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="gradImpot" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#dc2626" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#dc2626" stopOpacity={0.02} />
                      </linearGradient>
                      <linearGradient id="gradNette" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#059669" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#059669" stopOpacity={0.02} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="annee" tick={{ fontSize: 11 }} tickFormatter={(v) => `${v}a`} />
                    <YAxis tick={{ fontSize: 10 }} tickFormatter={fmtK} />
                    <Tooltip content={<ChartTip />} />
                    <ReferenceLine
                      x={res.dureeDetention}
                      stroke="#f59e0b"
                      strokeDasharray="4 3"
                      label={{ value: "Aujourd'hui", fontSize: 10, fill: "#f59e0b", position: "insideTopRight" }}
                    />
                    <Area
                      type="monotone" dataKey="Impôt total" stroke="#dc2626" strokeWidth={2}
                      fill="url(#gradImpot)" name="Impôt total"
                    />
                    <Area
                      type="monotone" dataKey="Plus-value nette" stroke="#059669" strokeWidth={2}
                      fill="url(#gradNette)" name="Plus-value nette"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* Insight */}
            {!res.exoneree && pvBrute > 0 && (
              <div className="sv2-insight">
                {nextYearSaving > 0 && (
                  <p>
                    ⏳ Attendre encore <strong>1 an</strong> vous ferait économiser{" "}
                    <strong style={{ color: "#059669" }}>{fmt(nextYearSaving)} d'impôts</strong> supplémentaires grâce aux abattements.
                  </p>
                )}
                {v.travaux > 0 && res.economiesTravaux > 0 && (
                  <p>
                    🔨 Vos travaux de <strong>{fmt(v.travaux)}</strong> vous font économiser{" "}
                    <strong style={{ color: "#059669" }}>{fmt(res.economiesTravaux)}</strong> d'impôts.
                  </p>
                )}
              </div>
            )}

            {/* Cross-sell */}
            <SimCrossSell
              show={pvBrute > 0}
              loan={v.prixVente * 0.8}
              taux={3.5}
              dureeCredit={20}
            />
          </>
        )}
      </div>
    </SimLayout>
  );
}
