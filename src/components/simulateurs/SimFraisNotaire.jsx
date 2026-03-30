import { useMemo, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import Field from "../Field";
import SimLayout from "./SimLayout";
import { formatCurrency } from "../../utils/finance";

/** Calcul des émoluments proportionnels du notaire (barème 2026, hors TVA) */
function calcEmolumentsHT(prix) {
  const tranches = [
    { max: 6500,     rate: 0.03945 },
    { max: 17000,    rate: 0.01627 },
    { max: 60000,    rate: 0.01085 },
    { max: Infinity, rate: 0.00814 },
  ];
  let emol = 0;
  let prev = 0;
  for (const t of tranches) {
    const slice = Math.min(Math.max(0, prix - prev), t.max === Infinity ? prix - prev : t.max - prev);
    emol += slice * t.rate;
    prev = t.max;
    if (prev >= prix) break;
  }
  return Math.max(90, emol); // minimum légal 90 €
}

function calcFraisNotaire({ prix, type, region, deboursCustom }) {
  const isNeuf = type === "neuf";

  // Taux droits de mutation selon région
  const taux_dmto_ancien = region === "idf_plein" ? 0.0591
    : region === "reduit" ? 0.0380
    : 0.0581; // standard
  const droitsMutation = prix * (isNeuf ? 0.00715 : taux_dmto_ancien);

  // Émoluments du notaire (TTC avec TVA 20%)
  const emolumentsHT = calcEmolumentsHT(prix);
  const emolumentsTTC = emolumentsHT * 1.2;

  // Contribution de sécurité immobilière (CSI)
  const csi = Math.max(15, prix * 0.001);

  // Débours et frais divers (relevés cadastraux, documents d'état civil, etc.)
  const debours = deboursCustom ?? 1200;

  const total = droitsMutation + emolumentsTTC + csi + debours;
  const pct = (total / prix) * 100;

  return { droitsMutation, emolumentsHT, emolumentsTTC, csi, debours, total, pct, taux_dmto: isNeuf ? 0.00715 : taux_dmto_ancien };
}

const COULEURS = ["#1a56db", "#0d9488", "#d97706", "#94a3b8"];

function ChartTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const p = payload[0];
  return (
    <div className="chart-tooltip">
      <div className="chart-tooltip-row">
        <span style={{ color: p.payload.fill }}>{p.name}</span>
        <span>{new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(p.value)}</span>
      </div>
    </div>
  );
}

export default function SimFraisNotaire() {
  const [v, setV] = useState({ prix: 250000, type: "ancien", region: "standard", deboursCustom: 1200 });
  const set = (k) => (val) => setV((s) => ({ ...s, [k]: val }));

  const res = useMemo(() => calcFraisNotaire(v), [v]);

  const pieData = [
    { name: "Droits de mutation", value: Math.round(res.droitsMutation), fill: "#1a56db" },
    { name: "Émoluments notaire (TTC)", value: Math.round(res.emolumentsTTC), fill: "#0d9488" },
    { name: "Déb. & frais divers", value: Math.round(res.debours), fill: "#d97706" },
    { name: "C.S.I.", value: Math.round(res.csi), fill: "#94a3b8" },
  ];

  const fmtCur = (v) => new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(v);
  const fmtPct = (v) => `${v.toFixed(2)} %`;

  const details = [
    {
      label: "Droits de mutation (DMTO)",
      value: res.droitsMutation,
      pct: (res.droitsMutation / res.total) * 100,
      color: "#1a56db",
      explain: v.type === "ancien"
        ? `${(res.taux_dmto * 100).toFixed(2)} % du prix — principal poste des frais. Perçu par le Département (4,50 %) et la Commune (1,20 % maximum).`
        : "0,715 % seulement pour un bien neuf en VEFA — c'est l'un des avantages du neuf.",
    },
    {
      label: "Émoluments du notaire (TTC)",
      value: res.emolumentsTTC,
      pct: (res.emolumentsTTC / res.total) * 100,
      color: "#0d9488",
      explain: `Barème proportionnel légal (${fmtPct((res.emolumentsHT / v.prix) * 100)} HT) + TVA 20 %. Ce montant est identique quel que soit le notaire.`,
    },
    {
      label: "Débours et frais divers",
      value: res.debours,
      pct: (res.debours / res.total) * 100,
      color: "#d97706",
      explain: "Frais avancés par le notaire : documents d'urbanisme, extrait cadastral, état civil, relevés hypothécaires… (environ 1 000–1 400 €).",
    },
    {
      label: "Contribution sécurité immobilière",
      value: res.csi,
      pct: (res.csi / res.total) * 100,
      color: "#94a3b8",
      explain: "0,10 % du prix de vente (minimum 15 €) — publication du titre de propriété au Service de Publicité Foncière.",
    },
  ];

  return (
    <SimLayout
      icon="📋"
      title="Calculateur de frais de notaire"
      description="Calculez les frais de notaire au centime près selon le barème légal 2026, pour un achat dans l'ancien ou le neuf."
    >
      <div className="sim-layout">
        <div className="sim-card">
          <p className="sim-card-legend">Votre achat immobilier</p>
          <div className="step-fields">
            <div className="field-full">
              <Field label="Prix d'achat net vendeur" value={v.prix} onChange={set("prix")} suffix="€"
                hint="Prix mentionné dans le compromis de vente, hors mobilier" tooltip="Prix mentionné dans le compromis de vente, hors frais de notaire et hors mobilier. Si vous achetez dans le neuf, choisissez le type 'Neuf' pour des frais réduits (~2–3 %)." />
            </div>
          </div>

          <div style={{ marginTop: 16 }}>
            <label className="field-label">Type de bien</label>
            <div className="loan-type-grid" style={{ marginTop: 8 }}>
              <button type="button" className={`loan-type-btn${v.type === "ancien" ? " loan-type-active" : ""}`} onClick={() => set("type")("ancien")}>
                <span>🏘️</span><span>Ancien</span>
              </button>
              <button type="button" className={`loan-type-btn${v.type === "neuf" ? " loan-type-active" : ""}`} onClick={() => set("type")("neuf")}>
                <span>🏗️</span><span>Neuf / VEFA</span>
              </button>
            </div>
            <p className="field-hint" style={{ marginTop: 8 }}>
              {v.type === "ancien"
                ? "Bien existant construit depuis + de 5 ans — droits de mutation élevés (5,81 %)"
                : "Construction neuve ou VEFA — droits de mutation réduits (0,715 %)"}
            </p>
          </div>

          {v.type === "ancien" && (
            <div style={{ marginTop: 16 }}>
              <label className="field-label">Taux de droits de mutation</label>
              <div className="loan-type-grid" style={{ marginTop: 8, gridTemplateColumns: "repeat(3, 1fr)" }}>
                <button type="button" className={`loan-type-btn${v.region === "standard" ? " loan-type-active" : ""}`}
                  onClick={() => set("region")("standard")} style={{ flexDirection: "column", gap: 2 }}>
                  <span style={{ fontWeight: 700 }}>5,81 %</span>
                  <span style={{ fontSize: 11 }}>Majorité</span>
                </button>
                <button type="button" className={`loan-type-btn${v.region === "idf_plein" ? " loan-type-active" : ""}`}
                  onClick={() => set("region")("idf_plein")} style={{ flexDirection: "column", gap: 2 }}>
                  <span style={{ fontWeight: 700 }}>5,91 %</span>
                  <span style={{ fontSize: 11 }}>Certaines villes</span>
                </button>
                <button type="button" className={`loan-type-btn${v.region === "reduit" ? " loan-type-active" : ""}`}
                  onClick={() => set("region")("reduit")} style={{ flexDirection: "column", gap: 2 }}>
                  <span style={{ fontWeight: 700 }}>3,80 %</span>
                  <span style={{ fontSize: 11 }}>Indre (36)</span>
                </button>
              </div>
              <p className="field-hint" style={{ marginTop: 6 }}>
                {v.region === "standard" ? "Taux standard appliqué dans la grande majorité des départements français."
                  : v.region === "idf_plein" ? "Certaines communes ont voté la majoration communale de 0,1 % (applicable surtout en Île-de-France)."
                  : "L'Indre (36) et Mayotte maintiennent un taux réduit de 3,80 %."}
              </p>
            </div>
          )}

          <div style={{ marginTop: 16 }}>
            <Field label="Débours estimés" value={v.deboursCustom} onChange={set("deboursCustom")} suffix="€"
              hint="Frais avancés par le notaire (cadastre, état civil, docs). Généralement 800–1 400 €." tooltip="Les débours couvrent les frais que le notaire avance pour votre compte : extraits cadastraux, état civil, relevés hypothécaires, documents d'urbanisme. Varie entre 800 et 1 400 €." />
          </div>

          <div className="sim-info-box" style={{ marginTop: 20 }}>
            <p className="sim-info-title">💡 Astuce négociation</p>
            <p className="sim-info-body">Les frais de notaire se calculent sur le prix net vendeur. Séparer la valeur des meubles (cuisine équipée, garde-robe…) du prix du bien peut légalement réduire l'assiette de calcul.</p>
          </div>
        </div>

        <div className="sim-results-panel">
          <div className="sim-stat-hero">
            <span className="sim-stat-label">Total frais de notaire estimés</span>
            <span className="sim-stat-value">
              {formatCurrency(res.total)}
            </span>
            <span className="sim-stat-sub">{fmtPct(res.pct)} du prix d'achat</span>
          </div>

          <div className="sim-stats-grid">
            <div className="sim-stat-card">
              <span className="sim-stat-card-label">Prix d'achat</span>
              <span className="sim-stat-card-value">{formatCurrency(v.prix)}</span>
            </div>
            <div className="sim-stat-card sim-stat-card-blue">
              <span className="sim-stat-card-label">Frais de notaire</span>
              <span className="sim-stat-card-value">{formatCurrency(res.total)}</span>
            </div>
            <div className="sim-stat-card">
              <span className="sim-stat-card-label">Budget total</span>
              <span className="sim-stat-card-value">{formatCurrency(v.prix + res.total)}</span>
            </div>
            <div className="sim-stat-card">
              <span className="sim-stat-card-label">Taux global</span>
              <span className="sim-stat-card-value">{fmtPct(res.pct)}</span>
            </div>
          </div>

          <div className="sim-chart-wrap">
            <p className="sim-chart-title">Répartition des frais de notaire</p>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={45} outerRadius={72} paddingAngle={2} dataKey="value">
                  {pieData.map((e, i) => <Cell key={i} fill={e.fill}/>)}
                </Pie>
                <Tooltip content={<ChartTooltip />}/>
                <Legend iconType="circle" iconSize={9} wrapperStyle={{ fontSize: 11, paddingTop: 8 }} formatter={(v) => <span style={{ color: "#64748b" }}>{v}</span>}/>
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="notaire-details">
            <p className="sim-bar-label" style={{ marginBottom: 12 }}>Détail par poste</p>
            {details.map((d) => (
              <div key={d.label} className="notaire-detail-row">
                <div className="notaire-detail-header">
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span className="sim-donut-dot" style={{ background: d.color, flexShrink: 0 }} />
                    <strong className="notaire-detail-label">{d.label}</strong>
                  </div>
                  <span className="notaire-detail-value">{fmtCur(d.value)}</span>
                </div>
                <p className="notaire-detail-explain">{d.explain}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SimLayout>
  );
}
