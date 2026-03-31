import { useMemo, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from "recharts";
import Field from "../Field";
import SimLayout from "./SimLayout";
import DonutChart from "../DonutChart";
import { formatCurrency } from "../../utils/finance";

function calcRenta({ prixAchat, fraisNotairePct, travaux, loyerMensuel, chargesMensuelles, tauxOccupation, assurancePNO, taxeFonciere, regimeFiscal, tmi }) {
  const fraisNotaire = prixAchat * (fraisNotairePct / 100);
  const investissementTotal = prixAchat + fraisNotaire + travaux;
  const loyerAnnuelBrut = loyerMensuel * 12 * (tauxOccupation / 100);
  const chargesAnnuelles = chargesMensuelles * 12 + assurancePNO + taxeFonciere;
  const loyerAnnuelNet = loyerAnnuelBrut - chargesAnnuelles;
  const rendementBrut = investissementTotal > 0 ? (loyerAnnuelBrut / investissementTotal) * 100 : 0;
  const rendementNet = investissementTotal > 0 ? (loyerAnnuelNet / investissementTotal) * 100 : 0;
  const cashflowMensuel = loyerAnnuelNet / 12;
  const dureeRecup = loyerAnnuelNet > 0 ? investissementTotal / loyerAnnuelNet : null;

  // Calcul fiscal
  const revenuImposable = regimeFiscal === "micro-foncier"
    ? loyerAnnuelBrut * 0.70
    : Math.max(0, loyerAnnuelNet);
  const impotIR = revenuImposable * (tmi / 100);
  const prelevementsSociaux = revenuImposable * 0.172;
  const impotTotal = impotIR + prelevementsSociaux;
  const loyerAnnuelNetNet = loyerAnnuelNet - impotTotal;
  const rendementNetNet = investissementTotal > 0 ? (loyerAnnuelNetNet / investissementTotal) * 100 : 0;

  return { investissementTotal, fraisNotaire, loyerAnnuelBrut, loyerAnnuelNet, chargesAnnuelles, rendementBrut, rendementNet, cashflowMensuel, dureeRecup, revenuImposable, impotIR, prelevementsSociaux, impotTotal, loyerAnnuelNetNet, rendementNetNet };
}

const fmtCur = (v) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(v);

function ChartTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="chart-tooltip">
      {payload.map((p) => (
        <div key={p.dataKey} className="chart-tooltip-row">
          <span style={{ color: p.fill }}>{p.name}</span>
          <span>{typeof p.value === "number" ? `${p.value.toFixed(2)} %` : p.value}</span>
        </div>
      ))}
    </div>
  );
}

const RENDEMENT_REFS = [
  { name: "Livret A (1,5%)", v: 1.5, color: "#94a3b8" },
  { name: "SCPI (5%)",     v: 5, color: "#06b6d4" },
  { name: "Excellent (7%)", v: 7, color: "#059669" },
];

export default function SimRentabiliteLocative() {
  const [v, setV] = useState({
    prixAchat: 180000,
    fraisNotairePct: 8,
    travaux: 10000,
    loyerMensuel: 850,
    chargesMensuelles: 80,
    tauxOccupation: 92,
    assurancePNO: 300,
    taxeFonciere: 1200,
    regimeFiscal: "micro-foncier",
    tmi: 30,
  });
  const set = (k) => (val) => setV((s) => ({ ...s, [k]: val }));
  const res = useMemo(() => calcRenta(v), [v]);

  const rendColor = res.rendementNet >= 7 ? "green" : res.rendementNet >= 4 ? "amber" : "red";

  const verdicts = {
    green: { icon: "🏆", title: "Excellent investissement",  msg: `Rendement net de ${res.rendementNet.toFixed(2)} % — au-dessus de la moyenne nationale (5 %). Ce bien génère un cashflow positif de ${fmtCur(res.cashflowMensuel)}/mois.` },
    amber: { icon: "📊", title: "Rendement dans la moyenne", msg: `Rendement net de ${res.rendementNet.toFixed(2)} % — comparable à une SCPI (4–6 %). Vérifiez la tension locative locale et le potentiel de revalorisation.` },
    red:   { icon: "⚠️", title: "Rendement insuffisant",     msg: `Rendement net de ${res.rendementNet.toFixed(2)} % — insuffisant pour justifier les risques locatifs. Négociez le prix d'achat, augmentez le loyer ou réduisez les charges.` },
  };

  const barData = [
    { name: "Brut",     value: parseFloat(res.rendementBrut.toFixed(2)), fill: "#2563eb" },
    { name: "Net",      value: parseFloat(Math.max(0, res.rendementNet).toFixed(2)), fill: rendColor === "green" ? "#059669" : rendColor === "amber" ? "#d97706" : "#dc2626" },
    { name: "Livret A", value: 1.5, fill: "#5e6e88" },
    { name: "SCPI",     value: 5,   fill: "#06b6d4" },
  ];

  const donutSegments = [
    { value: Math.max(0, res.loyerAnnuelNet),  color: "#059669", label: "Revenu net/an" },
    { value: Math.max(0, res.chargesAnnuelles), color: "#ec4899", label: "Charges/an" },
  ].filter((s) => s.value > 0);

  return (
    <SimLayout
      icon="🏘️"
      title="Simulateur de rentabilité locative"
      description="Calculez le rendement brut, net et votre cashflow mensuel pour un investissement locatif."
      simTime="3 min"
    >
      <div className="sim-layout">
        <div className="sim-card">
          <p className="sim-card-legend">Le bien immobilier</p>
          <div className="step-fields">
            <Field label="Prix d'achat" value={v.prixAchat} onChange={set("prixAchat")} suffix="€"
              hint="Prix net vendeur — hors frais de notaire et travaux" tooltip="Prix d'achat hors frais de notaire. Médiane France 2026 : ~250 000 € (source : Notaires de France)." />
            <Field label="Frais de notaire" value={v.fraisNotairePct} onChange={set("fraisNotairePct")} suffix="%"
              hint="≈ 7–8 % dans l'ancien / 2–3 % dans le neuf" />
            <div className="field-full">
              <Field label="Budget travaux & ameublement" value={v.travaux} onChange={set("travaux")} suffix="€"
                hint="Intégré à l'investissement total — améliore le loyer obtenu" tooltip="Travaux de rénovation + ameublement si location meublée. Intégrés dans le calcul du prix de revient total." />
            </div>
          </div>

          <p className="sim-card-legend" style={{ marginTop: 16 }}>Revenus et charges locatifs</p>
          <div className="step-fields">
            <Field label="Loyer mensuel HC" value={v.loyerMensuel} onChange={set("loyerMensuel")} suffix="€"
              hint="Loyer hors charges récupérables. Vérifiez les annonces similaires dans le secteur." tooltip="Loyer hors charges, hors provisions pour charges récupérables. Vérifiez les annonces similaires dans votre secteur (Le Bon Coin, SeLoger)." />
            <Field label="Charges non récupérables" value={v.chargesMensuelles} onChange={set("chargesMensuelles")} suffix="€/mois"
              hint="Charges de copropriété à votre charge, entretien courant non refacturé" />
            <Field label="Assurance PNO" value={v.assurancePNO} onChange={set("assurancePNO")} suffix="€/an"
              hint="Propriétaire Non Occupant — obligatoire en copropriété (150–400 €/an)" />
            <Field label="Taxe foncière" value={v.taxeFonciere} onChange={set("taxeFonciere")} suffix="€/an"
              hint="Toujours à la charge du propriétaire — renseignez-vous avant l'achat" />
          </div>

          <div style={{ marginTop: 16 }}>
            <label className="field-label">Taux d'occupation prévisionnel</label>
            <div className="horizon-box" style={{ marginTop: 6 }}>
              <div className="horizon-row">
                <p className="horizon-explain">Part de l'année où le bien est occupé et loué</p>
                <strong className="horizon-value">{v.tauxOccupation} %</strong>
              </div>
              <input type="range" min="50" max="100" step="1" value={v.tauxOccupation}
                onChange={(e) => set("tauxOccupation")(Number(e.target.value))}
                style={{ "--range-pct": `${((v.tauxOccupation - 50) / (100 - 50)) * 100}%` }}
                aria-label={`Taux d'occupation : ${v.tauxOccupation}%`} />
              <div className="horizon-ticks"><span>50 %</span><span>Typique 92 %</span><span>100 %</span></div>
            </div>
          </div>

          <p className="sim-card-legend" style={{ marginTop: 20 }}>Fiscalité</p>
          <div style={{ marginBottom: 12 }}>
            <label className="field-label">Régime fiscal</label>
            <div className="loan-type-grid" style={{ marginTop: 8 }}>
              <button type="button" className={`loan-type-btn${v.regimeFiscal === "micro-foncier" ? " loan-type-active" : ""}`}
                onClick={() => set("regimeFiscal")("micro-foncier")}>
                <span>📄</span><span>Micro-foncier<br/><small style={{fontWeight:400,fontSize:11}}>Abattement 30%</small></span>
              </button>
              <button type="button" className={`loan-type-btn${v.regimeFiscal === "reel" ? " loan-type-active" : ""}`}
                onClick={() => set("regimeFiscal")("reel")}>
                <span>📊</span><span>Régime réel<br/><small style={{fontWeight:400,fontSize:11}}>Charges déductibles</small></span>
              </button>
            </div>
            <p className="field-hint" style={{ marginTop: 6 }}>
              {v.regimeFiscal === "micro-foncier"
                ? "Loyers bruts < 15 000 €/an. Abattement forfaitaire de 30 %. Plus simple mais moins avantageux si charges réelles > 30 %."
                : "Déduisez les charges réelles (intérêts, travaux, charges copro, assurance, taxe foncière). Optimal si charges > 30 % des loyers."}
            </p>
          </div>
          <div>
            <label className="field-label">Tranche marginale d'imposition (TMI)</label>
            <div className="tmi-grid" style={{ marginTop: 8, display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 6 }}>
              {[0, 11, 30, 41, 45].map((t) => (
                <button key={t} type="button"
                  className={`loan-type-btn${v.tmi === t ? " loan-type-active" : ""}`}
                  style={{ padding: "8px 4px", flexDirection: "column", gap: 2 }}
                  onClick={() => set("tmi")(t)}>
                  <span style={{ fontWeight: 700, fontSize: 14 }}>{t}%</span>
                  <span style={{ fontSize: 10, color: "var(--muted)" }}>
                    {t === 0 ? "Non imp." : t === 11 ? "<27k" : t === 30 ? "27–73k" : t === 41 ? "73–158k" : ">158k"}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="sim-results-panel">
          <div className={`sim-stat-hero sim-hero-${rendColor}`}>
            <span className="sim-stat-label">Rendement net</span>
            <span className="sim-stat-value">
              {res.rendementNet.toFixed(2)}<span className="sim-stat-unit"> %/an</span>
            </span>
            <p className="sim-stat-hero-summary">
              {verdicts[rendColor].msg}
            </p>
          </div>

          <div className="sim-stats-grid">
            <div className="sim-stat-card sim-stat-card-blue">
              <span className="sim-stat-card-label">Investissement total</span>
              <span className="sim-stat-card-value">{formatCurrency(res.investissementTotal)}</span>
            </div>
            <div className="sim-stat-card">
              <span className="sim-stat-card-label">Rendement brut</span>
              <span className="sim-stat-card-value">{res.rendementBrut.toFixed(2)} %</span>
            </div>
            <div className={`sim-stat-card ${res.cashflowMensuel >= 0 ? "sim-stat-card-green" : "sim-stat-card-red"}`}>
              <span className="sim-stat-card-label">Cashflow mensuel</span>
              <span className="sim-stat-card-value">{formatCurrency(res.cashflowMensuel)}</span>
            </div>
            <div className="sim-stat-card">
              <span className="sim-stat-card-label">Récupération capital</span>
              <span className="sim-stat-card-value">{res.dureeRecup ? `${Math.round(res.dureeRecup)} ans` : "—"}</span>
            </div>
            {v.tmi > 0 && (
              <>
                <div className="sim-stat-card">
                  <span className="sim-stat-card-label">Impôts sur loyers/an</span>
                  <span className="sim-stat-card-value sim-stat-card-red-text">{fmtCur(res.impotTotal)}</span>
                </div>
                <div className={`sim-stat-card ${res.rendementNetNet >= 4 ? "sim-stat-card-green" : res.rendementNetNet >= 2 ? "" : "sim-stat-card-red"}`}>
                  <span className="sim-stat-card-label">Rendement net-net (impôts)</span>
                  <span className="sim-stat-card-value">{res.rendementNetNet.toFixed(2)} %</span>
                </div>
              </>
            )}
          </div>

          <div className="sim-chart-wrap">
            <p className="sim-chart-title">Votre rendement vs. les placements alternatifs</p>
            <ResponsiveContainer width="100%" height={130}>
              <BarChart data={barData} layout="vertical" margin={{ top: 2, right: 32, bottom: 2, left: 0 }}>
                <XAxis type="number" tickFormatter={(v) => `${v}%`} tick={{ fontSize: 10, fill: "#5e6e88" }} axisLine={false} tickLine={false} domain={[0, "auto"]}/>
                <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} width={52}/>
                <Tooltip content={<ChartTooltip />} cursor={{ fill: "rgba(0,0,0,.04)" }}/>
                <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={22}>
                  {barData.map((e, i) => <Cell key={i} fill={e.fill}/>)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {donutSegments.length > 0 && (
            <div className="sim-donut-section">
              <DonutChart
                segments={donutSegments}
                size={130}
                thickness={22}
                label={fmtCur(res.loyerAnnuelBrut)}
                subLabel="loyers bruts/an"
              />
              <div className="sim-donut-legend">
                <p className="sim-bar-label" style={{ marginBottom: 8 }}>Revenus locatifs annuels</p>
                {donutSegments.map((seg) => (
                  <div key={seg.label} className="sim-donut-legend-item">
                    <span className="sim-donut-dot" style={{ background: seg.color }} />
                    <span className="sim-donut-legend-label">{seg.label}</span>
                    <span className="sim-donut-legend-value">{formatCurrency(seg.value)}/an</span>
                  </div>
                ))}
                <div className="sim-donut-legend-item" style={{ marginTop: 8, paddingTop: 8, borderTop: "1px solid var(--line)" }}>
                  <span className="sim-donut-dot" style={{ background: "var(--blue)" }} />
                  <span className="sim-donut-legend-label">Frais de notaire</span>
                  <span className="sim-donut-legend-value">{formatCurrency(res.fraisNotaire)}</span>
                </div>
              </div>
            </div>
          )}

          {v.tmi > 0 ? (
            <div className="sim-info-box">
              <p className="sim-info-title">📊 Détail fiscal ({v.regimeFiscal === "micro-foncier" ? "Micro-foncier" : "Régime réel"})</p>
              <p className="sim-info-body">
                Revenus imposables : {fmtCur(res.revenuImposable)}/an
                {" · "}IR ({v.tmi}%) : {fmtCur(res.impotIR)}
                {" · "}PS (17,2%) : {fmtCur(res.prelevementsSociaux)}
                <br/>Cashflow net après impôts : <strong>{fmtCur(res.loyerAnnuelNetNet / 12)}/mois</strong>
              </p>
            </div>
          ) : (
            <div className="sim-info-box">
              <p className="sim-info-title">⚠️ Attention : la fiscalité change tout</p>
              <p className="sim-info-body">Ce calcul n'intègre pas encore la fiscalité. Renseignez votre TMI ci-dessus pour voir le rendement net-net après IR (19 % → 45 %) et prélèvements sociaux (17,2 %).</p>
            </div>
          )}
        </div>
      </div>
    </SimLayout>
  );
}
