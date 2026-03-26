import { useMemo, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import Field from "../Field";
import SimLayout from "./SimLayout";
import { formatCurrency } from "../../utils/finance";

/**
 * Calcul abattement IR (CGI art. 150 VC)
 * - 0–5 ans : 0%
 * - 6e à 21e année : 6%/an
 * - À partir de 22 ans : exonération totale
 */
function abattementIR(annees) {
  if (annees < 6) return 0;
  if (annees >= 22) return 100;
  return Math.min(100, (annees - 5) * 6);
}

/**
 * Calcul abattement Prélèvements Sociaux (17,2%)
 * - 0–5 ans : 0%
 * - 6e à 21e année : 1,65%/an
 * - 22e année : 1,60%
 * - 23e à 30e année : 9%/an
 * - À partir de 30 ans : exonération totale
 */
function abattementPS(annees) {
  if (annees < 6) return 0;
  if (annees >= 30) return 100;
  if (annees <= 21) return Math.min(100, (annees - 5) * 1.65);
  if (annees === 22) return (16 * 1.65) + 1.6;
  return Math.min(100, (16 * 1.65) + 1.6 + (annees - 22) * 9);
}

function calcPlusValue({ prixAchat, travaux, prixVente, annees, residencePrincipale, fraisAchat }) {
  if (!prixVente || !prixAchat) return null;

  // Exonération résidence principale
  if (residencePrincipale) {
    const pvBrute = prixVente - prixAchat;
    return {
      pvBrute,
      pvImposable: 0,
      exonere: true,
      impotIR: 0,
      impotPS: 0,
      impotTotal: 0,
      pvNette: pvBrute,
      abIR: 100,
      abPS: 100,
    };
  }

  // Base de calcul : prix d'acquisition majoré
  const fraisMajorationLegale = fraisAchat > 0 ? fraisAchat : prixAchat * 0.075; // réel ou forfait 7,5%
  const travauxDeductibles = annees >= 5
    ? (travaux > 0 ? travaux : prixAchat * 0.15) // réel ou forfait 15% si > 5 ans
    : travaux;
  const prixAcquisition = prixAchat + fraisMajorationLegale + travauxDeductibles;

  const pvBrute = prixVente - prixAcquisition;

  if (pvBrute <= 0) {
    return { pvBrute, pvImposable: 0, exonere: false, impotIR: 0, impotPS: 0, impotTotal: 0, pvNette: pvBrute, abIR: 0, abPS: 0, prixAcquisition };
  }

  const abIR = abattementIR(annees);
  const abPS = abattementPS(annees);
  const pvApresAbIR = pvBrute * (1 - abIR / 100);
  const pvApresAbPS = pvBrute * (1 - abPS / 100);

  const impotIR = pvApresAbIR * 0.19;
  const impotPS = pvApresAbPS * 0.172;
  const impotTotal = impotIR + impotPS;
  const pvNette = pvBrute - impotTotal;
  const tauxEffectif = pvBrute > 0 ? (impotTotal / pvBrute) * 100 : 0;

  return { pvBrute, pvImposable: pvApresAbIR, exonere: false, impotIR, impotPS, impotTotal, pvNette, abIR, abPS, prixAcquisition, tauxEffectif };
}

const fmtCur = (v) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(v);

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="chart-tooltip">
      <p className="chart-tooltip-label">{label}</p>
      {payload.map((p) => (
        <div key={p.dataKey} className="chart-tooltip-row">
          <span style={{ color: p.fill || "#94a3b8" }}>{p.name}</span>
          <span>{fmtCur(p.value)}</span>
        </div>
      ))}
    </div>
  );
}

function AbatProgress({ label, pct, color }) {
  return (
    <div className="abat-row">
      <div className="abat-row-header">
        <span className="abat-label">{label}</span>
        <span className="abat-value" style={{ color }}>{pct.toFixed(1)} % d'abattement</span>
      </div>
      <div className="lp-mockup-bar-track" style={{ height: 8, marginTop: 4 }}>
        <div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: 999, transition: "width .4s ease" }} />
      </div>
    </div>
  );
}

export default function SimPlusValue() {
  const [v, setV] = useState({
    prixAchat: 200000,
    fraisAchat: 0,
    travaux: 0,
    prixVente: 280000,
    annees: 8,
    residencePrincipale: false,
  });
  const set = (k) => (val) => setV((s) => ({ ...s, [k]: val }));

  const res = useMemo(() => calcPlusValue(v), [v]);

  const chartData = res && res.pvBrute > 0 && !res.exonere
    ? [
        { name: "Plus-value nette", value: Math.round(Math.max(0, res.pvNette)), fill: "#059669" },
        { name: "Impôt IR (19%)",   value: Math.round(res.impotIR),     fill: "#1a56db" },
        { name: "Prél. sociaux",    value: Math.round(res.impotPS),     fill: "#ec4899" },
      ]
    : [];

  const pvColor = !res
    ? "blue"
    : res.exonere
    ? "green"
    : res.pvBrute <= 0
    ? "amber"
    : res.tauxEffectif < 10
    ? "green"
    : res.tauxEffectif < 25
    ? "amber"
    : "red";

  return (
    <SimLayout
      icon="📈"
      title="Simulateur de plus-value immobilière"
      description="Calculez l'impôt sur la plus-value à la revente d'un bien immobilier selon la durée de détention."
    >
      <div className="sim-layout">
        <div className="sim-card">
          <p className="sim-card-legend">Votre bien</p>
          <div className="step-fields">
            <Field label="Prix d'acquisition" value={v.prixAchat} onChange={set("prixAchat")} suffix="€"
              hint="Prix payé à l'achat, hors frais de notaire" />
            <Field label="Frais d'achat réels" value={v.fraisAchat} onChange={set("fraisAchat")} suffix="€"
              hint="Frais de notaire payés. Laissez 0 pour appliquer le forfait légal de 7,5 %" />
            <Field label="Travaux réels" value={v.travaux} onChange={set("travaux")} suffix="€"
              hint="Travaux de construction/amélioration justifiables. Laissez 0 pour le forfait 15 % (si détention > 5 ans)" />
            <Field label="Prix de vente" value={v.prixVente} onChange={set("prixVente")} suffix="€"
              hint="Prix net vendeur — après commission agence éventuellement déduite" />
          </div>

          <div style={{ marginTop: 16 }}>
            <label className="field-label">Durée de détention</label>
            <div className="horizon-box" style={{ marginTop: 6 }}>
              <div className="horizon-row">
                <p className="horizon-explain">Nombre d'années entre l'achat et la revente</p>
                <strong className="horizon-value" style={{ color: v.annees >= 22 ? "#059669" : "inherit" }}>
                  {v.annees} ans {v.annees >= 22 ? "✓ IR exonéré" : v.annees >= 30 ? "✓ Totalement exonéré" : ""}
                </strong>
              </div>
              <input type="range" min="1" max="35" step="1" value={v.annees}
                onChange={(e) => set("annees")(Number(e.target.value))} />
              <div className="horizon-ticks"><span>1 an</span><span>22 ans (IR)</span><span>30 ans (total)</span></div>
            </div>
          </div>

          <div style={{ marginTop: 16 }}>
            <label className="field-label">Type de bien</label>
            <div className="loan-type-grid" style={{ marginTop: 8 }}>
              <button type="button" className={`loan-type-btn${!v.residencePrincipale ? " loan-type-active" : ""}`}
                onClick={() => set("residencePrincipale")(false)}>
                <span>🏘️</span><span>Résidence secondaire / investissement</span>
              </button>
              <button type="button" className={`loan-type-btn${v.residencePrincipale ? " loan-type-active" : ""}`}
                onClick={() => set("residencePrincipale")(true)}>
                <span>🏠</span><span>Résidence principale</span>
              </button>
            </div>
          </div>
        </div>

        <div className="sim-results-panel">
          {!res ? (
            <p className="sim-empty">Renseignez les montants pour calculer.</p>
          ) : (
            <>
              <div className={`sim-stat-hero sim-hero-${pvColor}`}>
                <span className="sim-stat-label">
                  {res.exonere ? "Totalement exonéré" : res.pvBrute <= 0 ? "Pas de plus-value" : "Impôt total estimé"}
                </span>
                <span className="sim-stat-value">
                  {res.exonere ? "0 €" : res.pvBrute <= 0 ? "0 €" : formatCurrency(res.impotTotal)}
                </span>
                {res.exonere && <span className="sim-stat-sub">Résidence principale — exonération totale</span>}
                {!res.exonere && res.pvBrute > 0 && (
                  <span className="sim-stat-sub">Taux effectif : {res.tauxEffectif?.toFixed(1)} % de la plus-value brute</span>
                )}
              </div>

              <div className="sim-stats-grid">
                <div className="sim-stat-card">
                  <span className="sim-stat-card-label">Plus-value brute</span>
                  <span className="sim-stat-card-value" style={{ color: res.pvBrute > 0 ? "#059669" : "#dc2626" }}>
                    {res.pvBrute > 0 ? "+" : ""}{formatCurrency(res.pvBrute)}
                  </span>
                </div>
                <div className={`sim-stat-card ${res.pvNette >= 0 ? "sim-stat-card-green" : "sim-stat-card-red"}`}>
                  <span className="sim-stat-card-label">Plus-value nette d'impôt</span>
                  <span className="sim-stat-card-value">{formatCurrency(Math.max(0, res.pvNette))}</span>
                </div>
                <div className="sim-stat-card sim-stat-card-blue">
                  <span className="sim-stat-card-label">IR (19 %)</span>
                  <span className="sim-stat-card-value">{formatCurrency(res.impotIR)}</span>
                </div>
                <div className="sim-stat-card">
                  <span className="sim-stat-card-label">Prél. sociaux (17,2 %)</span>
                  <span className="sim-stat-card-value">{formatCurrency(res.impotPS)}</span>
                </div>
              </div>

              {!res.exonere && res.pvBrute > 0 && (
                <>
                  <div className="abat-section">
                    <p className="sim-bar-label" style={{ marginBottom: 10 }}>Abattements pour durée de détention ({v.annees} ans)</p>
                    <AbatProgress label="Impôt sur le revenu (IR)" pct={res.abIR} color="#1a56db" />
                    <AbatProgress label="Prélèvements sociaux (PS)" pct={res.abPS} color="#ec4899" />
                    <p className="field-hint" style={{ marginTop: 8 }}>
                      {v.annees < 22
                        ? `Il vous reste ${22 - v.annees} an(s) avant l'exonération totale d'IR, et ${30 - v.annees} an(s) avant l'exonération complète.`
                        : v.annees < 30
                        ? `IR totalement exonéré ✓ — encore ${30 - v.annees} an(s) pour l'exonération PS.`
                        : "Totalement exonéré (IR + PS) ✓"}
                    </p>
                  </div>

                  {chartData.length > 0 && (
                    <div className="sim-chart-wrap">
                      <p className="sim-chart-title">Décomposition de la plus-value brute</p>
                      <ResponsiveContainer width="100%" height={110}>
                        <BarChart data={chartData} layout="vertical" margin={{ top: 2, right: 16, bottom: 2, left: 0 }}>
                          <XAxis type="number" hide/>
                          <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} width={110}/>
                          <Tooltip content={<ChartTooltip />} cursor={{ fill: "rgba(0,0,0,.04)" }}/>
                          <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={22}>
                            {chartData.map((e, i) => <Cell key={i} fill={e.fill}/>)}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </>
              )}

              {res.exonere && (
                <div className="sim-verdict sim-verdict-green">
                  <strong>✅ Exonération totale — Résidence principale</strong>
                  <p>La plus-value sur votre résidence principale est totalement exonérée d'impôt (IR + prélèvements sociaux), quelle que soit la durée de détention ou le montant de la plus-value.</p>
                </div>
              )}

              <div className="sim-info-box">
                <p className="sim-info-title">📌 Rappel important</p>
                <p className="sim-info-body">Ce calcul est une estimation. La plus-value réelle peut différer selon les frais déductibles, les travaux justifiés et les abattements spéciaux. Un notaire ou conseiller fiscal calculera le montant exact lors de la vente.</p>
              </div>
            </>
          )}
        </div>
      </div>
    </SimLayout>
  );
}
