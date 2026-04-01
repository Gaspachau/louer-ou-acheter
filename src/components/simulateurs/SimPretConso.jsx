import { useState, useMemo } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, Cell,
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

const PROJETS = [
  { id: "voiture",       label: "🚗 Voiture",        taux: 4.5, conseil: "Privilégiez un LOA/LLD pour les véhicules électriques — souvent plus avantageux qu'un crédit classique." },
  { id: "travaux",       label: "🔨 Travaux",         taux: 3.5, conseil: "Pour des travaux >10k€, un prêt travaux garanti peut obtenir un taux encore plus bas. Renseignez-vous auprès de votre banque." },
  { id: "vacances",      label: "✈️ Vacances",         taux: 6.0, conseil: "Évitez si possible le crédit pour les vacances. Épargnez plutôt 3-4 mois à l'avance — vous économiserez les intérêts." },
  { id: "mariage",       label: "💍 Mariage",          taux: 5.5, conseil: "Comparez les offres de plusieurs organismes. Un courtier peut souvent obtenir 1-2% de moins sur un crédit personnel." },
  { id: "electromenager", label: "📺 Électroménager",  taux: 5.0, conseil: "Vérifiez d'abord si le magasin propose un financement à 0% — certaines enseignes proposent des offres sans frais sur 10-12 mois." },
  { id: "personnel",     label: "💶 Personnel",        taux: 5.5, conseil: "Le crédit personnel est le plus flexible mais souvent le plus coûteux. Comparez au moins 3 offres avant de signer." },
];

function calcPretConso({ montant, duree, taux }) {
  if (!montant || montant <= 0 || duree <= 0) return null;
  const r = taux / 100 / 12;
  const n = duree;
  const mensualite = r === 0 ? montant / n : (montant * r) / (1 - Math.pow(1 + r, -n));
  const totalRembourse = mensualite * n;
  const coutSupplementaire = totalRembourse - montant;
  const tauxCout = montant > 0 ? (coutSupplementaire / montant) * 100 : 0;
  return { mensualite, totalRembourse, coutSupplementaire, tauxCout };
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

export default function SimPretConso() {
  const [v, setV] = useState({ projet: "voiture", montant: 10000, duree: 36, taux: 4.5 });
  const set = (k) => (val) => setV((s) => ({ ...s, [k]: val }));

  const selectProjet = (id) => {
    const p = PROJETS.find((p) => p.id === id);
    if (p) setV((s) => ({ ...s, projet: id, taux: p.taux }));
  };

  const res = useMemo(() => calcPretConso(v), [v]);
  const projetObj = PROJETS.find((p) => p.id === v.projet);

  const verdictClass =
    v.taux > 5 ? "sv2-verdict-red" : v.taux >= 3 ? "sv2-verdict-amber" : "sv2-verdict-green";

  const barData = res
    ? [
        { name: "Montant demandé", value: v.montant, fill: "#1a56db" },
        { name: "Total remboursé", value: Math.round(res.totalRembourse), fill: "#dc2626" },
      ]
    : [];

  const tauxPct = Math.min(100, ((v.taux - 1) / (20 - 1)) * 100);

  return (
    <SimLayout
      icon="💳"
      title="Calculez le coût réel de votre crédit conso"
      description="La vraie vérité sur ce que vous allez payer en plus"
      suggestions={[
        "/simulateurs/remboursement-anticipe",
        "/simulateurs/niveau-de-vie",
        "/simulateurs/endettement",
      ]}
    >
      <div className="sv2-container">
        {/* ── Inputs ── */}
        <div className="fv2-card">
          <p className="fv2-card-kicker">Paramètres</p>
          <h2 className="fv2-card-title">Votre crédit à la consommation</h2>

          {/* 1 – Type de projet */}
          <div style={{ marginTop: 20 }}>
            <p className="fv2-field-label">Type de projet</p>
            <div className="sv2-projet-pills" style={{ marginTop: 8 }}>
              {PROJETS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  className={`sv2-projet-pill${v.projet === p.id ? " active" : ""}`}
                  onClick={() => selectProjet(p.id)}
                >
                  <span className="sv2-projet-pill-label">{p.label}</span>
                  <span className="sv2-projet-pill-rate">Taux typique : {p.taux} %</span>
                </button>
              ))}
            </div>
          </div>

          {/* 2 – Montant */}
          <div className="fv2-revenus-wrap" style={{ marginTop: 20 }}>
            <p className="fv2-field-label">Montant emprunté</p>
            <div className="fv2-revenus-input-row">
              <input
                type="number"
                className="fv2-revenus-input"
                value={v.montant || ""}
                min={100} max={75000} step={100}
                onChange={(e) =>
                  set("montant")(Math.max(0, Math.min(75000, Number(e.target.value) || 0)))
                }
              />
              <span className="fv2-revenus-unit">€</span>
            </div>
            <Pills
              value={v.montant}
              options={[1000, 3000, 5000, 10000, 15000, 20000]}
              onChange={set("montant")}
              format={(o) => (o >= 1000 ? `${o / 1000}k €` : `${o} €`)}
            />
          </div>

          {/* 3 – Durée */}
          <div style={{ marginTop: 20 }}>
            <p className="fv2-field-label">Durée de remboursement</p>
            <div className="fv2-revenus-pills" style={{ marginTop: 8 }}>
              {[12, 24, 36, 48, 60].map((d) => (
                <button
                  key={d}
                  type="button"
                  className={`fv2-revenus-pill${v.duree === d ? " active" : ""}`}
                  onClick={() => set("duree")(d)}
                >
                  {d} mois
                </button>
              ))}
            </div>
          </div>

          {/* 4 – Taux slider */}
          <div style={{ marginTop: 20 }}>
            <div className="fv2-slider-header">
              <span className="fv2-slider-label">Taux annuel (TAEG)</span>
              <span className="fv2-slider-val">{v.taux.toFixed(1)} %</span>
            </div>
            {projetObj && (
              <p className="fv2-hint" style={{ marginBottom: 8 }}>
                Taux pour ce projet : <strong>{projetObj.taux} %</strong> — Ce taux est modifiable, comparez les offres
              </p>
            )}
            <div
              className="fv2-slider-track-wrap"
              style={{ "--pct": `${tauxPct}%` }}
            >
              <input
                type="range"
                className="fv2-slider"
                min={1} max={20} step={0.1}
                value={v.taux}
                onChange={(e) => set("taux")(Number(e.target.value))}
              />
              <div className="fv2-slider-fill" />
            </div>
            <div className="fv2-slider-minmax">
              <span>1 %</span>
              <span>20 %</span>
            </div>
          </div>
        </div>

        {/* ── Results ── */}
        {res && (
          <div className="fv2-card" style={{ marginTop: 16 }}>
            {/* Verdict */}
            <div className={`sv2-verdict ${verdictClass}`}>
              <p className="sv2-verdict-label">Ce crédit vous coûte</p>
              <p className="sv2-verdict-amount">{fmt(res.coutSupplementaire)} de plus</p>
              <p className="sv2-verdict-sub">que si vous payiez comptant</p>
            </div>

            {/* Stat cards */}
            <div className="sim-stats-grid" style={{ marginTop: 20 }}>
              <div className="sim-stat-card sim-stat-card-blue">
                <span className="sim-stat-card-label">Mensualité</span>
                <span className="sim-stat-card-value">{fmt(res.mensualite)}/mois</span>
              </div>
              <div className="sim-stat-card">
                <span className="sim-stat-card-label">Total remboursé</span>
                <span className="sim-stat-card-value">{fmt(res.totalRembourse)}</span>
              </div>
              <div className="sim-stat-card sim-stat-card-green">
                <span className="sim-stat-card-label">Surcoût total</span>
                <span className="sim-stat-card-value" style={{ color: "#dc2626" }}>
                  {fmt(res.coutSupplementaire)}
                </span>
              </div>
            </div>

            {/* Bar chart */}
            <div style={{ marginTop: 24 }}>
              <div className="fv2-slider-header">
                <span className="fv2-slider-label">Montant demandé vs. total remboursé</span>
              </div>
              <ResponsiveContainer width="100%" height={120}>
                <BarChart data={barData} layout="vertical" margin={{ top: 4, right: 24, bottom: 4, left: 4 }}>
                  <XAxis
                    type="number"
                    tickFormatter={fmtK}
                    tick={{ fontSize: 10, fill: "#5e6e88" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    tick={{ fontSize: 11, fill: "#64748b" }}
                    axisLine={false}
                    tickLine={false}
                    width={110}
                  />
                  <Tooltip content={<ChartTip />} cursor={{ fill: "rgba(0,0,0,.04)" }} />
                  <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={28}>
                    {barData.map((entry, i) => (
                      <Cell key={i} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Insight général */}
            <div className="sv2-insight" style={{ marginTop: 20 }}>
              Sur {v.duree} mois, vous payez{" "}
              <strong>{fmt(res.coutSupplementaire)}</strong> d'intérêts, soit{" "}
              <strong>{res.tauxCout.toFixed(1)} %</strong> du montant emprunté.
            </div>

            {/* Conseil contextuel */}
            {projetObj && (
              <div className="sv2-insight" style={{ marginTop: 12 }}>
                <strong>Conseil :</strong> {projetObj.conseil}
              </div>
            )}
          </div>
        )}

        <SimCrossSell show={false} loan={0} taux={3.5} dureeCredit={20} />
      </div>
    </SimLayout>
  );
}
