import { useMemo, useState } from "react";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";
import SimLayout from "./SimLayout";
import Field from "../Field";

const STATUTS = [
  { label: "CDI ou fonctionnaire", score: 100 },
  { label: "CDI — période d'essai", score: 62 },
  { label: "CDD / intérimaire", score: 32 },
  { label: "Indépendant / freelance", score: 58 },
  { label: "Étudiant / sans emploi", score: 10 },
];

function calcScore(v) {
  if (!v.prixBien || v.prixBien <= 0) return null;

  // 1. Apport (20 % = score 100)
  const apportPct = (v.apport / v.prixBien) * 100;
  const scoreApport = Math.round(Math.min(100, Math.max(0, (apportPct / 20) * 100)));

  // 2. Endettement après achat (< 25 % = 100, 35 % = 0)
  const r = v.taux / 100 / 12;
  const n = v.duree * 12;
  const capital = Math.max(0, v.prixBien * 1.08 - v.apport);
  const mensualite =
    r === 0 && n > 0 ? capital / n
    : r > 0 && n > 0 ? (capital * r) / (1 - Math.pow(1 + r, -n))
    : 0;
  const tauxEndet = v.revenus > 0 ? ((mensualite + v.chargesActuelles) / v.revenus) * 100 : 100;
  const scoreEndet = Math.round(Math.max(0, Math.min(100, ((35 - tauxEndet) / 35) * 140)));

  // 3. Stabilité professionnelle (select)
  const scoreStabilite = v.statutScore;

  // 4. Horizon de détention
  const scoreHorizon = Math.round(
    v.horizon <= 2 ? v.horizon * 5
    : v.horizon <= 5 ? 10 + (v.horizon - 2) * 15
    : v.horizon <= 10 ? 55 + (v.horizon - 5) * 7
    : Math.min(100, 90 + (v.horizon - 10) * 2)
  );

  // 5. Réserve d'urgence (6 mois = score 100)
  const chargesTotal = mensualite + v.chargesActuelles + v.autresCharges;
  const moisReserve = chargesTotal > 0 ? v.epargneReserve / chargesTotal : 0;
  const scoreReserve = Math.round(Math.min(100, Math.max(0, (moisReserve / 6) * 100)));

  const scores = {
    Apport: scoreApport,
    Endettement: scoreEndet,
    Stabilité: scoreStabilite,
    Horizon: scoreHorizon,
    Réserve: scoreReserve,
  };

  const overall = Math.round(
    (scoreApport * 0.25 + scoreEndet * 0.25 + scoreStabilite * 0.2 + scoreHorizon * 0.2 + scoreReserve * 0.1)
  );

  return { scores, overall, mensualite, tauxEndet, apportPct };
}

const SCORE_LEVELS = [
  { min: 80, label: "Prêt à acheter", color: "#059669", bg: "#d1fae5", emoji: "🚀" },
  { min: 60, label: "Presque prêt", color: "#06b6d4", bg: "#ccfbf1", emoji: "🔜" },
  { min: 40, label: "En préparation", color: "#d97706", bg: "#fef3c7", emoji: "⚙️" },
  { min: 0,  label: "Pas encore", color: "#dc2626", bg: "#fee2e2", emoji: "⏳" },
];

const DIM_ACTIONS = {
  Apport: {
    low: "Votre apport est insuffisant. Visez au moins 10 % du prix (idéalement 20 %) pour obtenir de bonnes conditions de crédit.",
    ok: "Apport correct. Au-delà de 20 %, chaque euro supplémentaire réduit le coût total du crédit.",
  },
  Endettement: {
    low: "Votre taux d'endettement après achat dépasse 35 %. Réduisez le montant emprunté ou allongez la durée du prêt.",
    ok: "Taux d'endettement dans les clous HCSF. Votre dossier sera bien perçu par les banques.",
  },
  Stabilité: {
    low: "Un statut précaire complique l'obtention d'un prêt. Privilégiez un CDI ou justifiez 3 ans de bilans si indépendant.",
    ok: "Votre statut professionnel est favorable. Les banques apprécient la stabilité des revenus.",
  },
  Horizon: {
    low: "Sur un horizon court, les frais d'achat (~8–10 %) s'amortissent mal. Envisagez d'acheter si vous vous voyez rester 7 ans minimum.",
    ok: "Horizon long : les frais d'entrée ont le temps de s'amortir. L'achat s'avère généralement gagnant.",
  },
  Réserve: {
    low: "Votre réserve d'urgence est faible. Avant d'acheter, constituez 3 à 6 mois de charges (crédit + vie courante).",
    ok: "Bonne réserve d'urgence. Vous pouvez absorber un imprévu (panne, travaux, chômage temporaire).",
  },
};

export default function SimScoreAcheteur() {
  const [v, setV] = useState({
    prixBien: 250000,
    apport: 35000,
    revenus: 4200,
    chargesActuelles: 0,
    autresCharges: 400,
    taux: 3.5,
    duree: 20,
    statutScore: 100,
    horizon: 10,
    epargneReserve: 15000,
  });
  const set = (k) => (val) => setV((s) => ({ ...s, [k]: val }));

  const res = useMemo(() => calcScore(v), [v]);

  const level = res ? SCORE_LEVELS.find((l) => res.overall >= l.min) : null;
  const radarData = res
    ? Object.entries(res.scores).map(([dim, score]) => ({ dim, score }))
    : [];

  return (
    <SimLayout
      icon="🎯"
      title="Score de préparation à l'achat"
      description="Évaluez votre maturité sur 5 dimensions clés et obtenez un plan d'action personnalisé."
      simTime="3 min"
    >
      <div className="sim-layout">
        {/* Form */}
        <div className="sim-card">
          <p className="sim-card-legend">Votre projet</p>
          <div className="step-fields">
            <Field label="Prix du bien visé" value={v.prixBien} onChange={set("prixBien")} suffix="€" hint="Incluant les frais de notaire (~8%)" tooltip="Prix d'achat hors frais de notaire. Médiane France 2026 : ~250 000 € (source : Notaires de France)." />
            <Field label="Apport disponible" value={v.apport} onChange={set("apport")} suffix="€" hint="Épargne que vous allez mobiliser" tooltip="Épargne mobilisée directement, sans emprunt. Minimum recommandé : 10 % du prix pour couvrir les frais de notaire." />
          </div>

          <p className="sim-card-legend" style={{ marginTop: 16 }}>Votre situation financière</p>
          <div className="step-fields">
            <Field label="Revenus nets mensuels" value={v.revenus} onChange={set("revenus")} suffix="€" hint="Tous foyers : salaires + revenus réguliers" tooltip="Revenus nets après impôts de tout le foyer. Les banques appliquent la règle des 35 % de taux d'endettement maximum." />
            <Field label="Crédits en cours" value={v.chargesActuelles} onChange={set("chargesActuelles")} suffix="€/mois" hint="Mensualités de crédits existants" tooltip="Mensualités de tous vos crédits en cours (auto, conso, autre immobilier). Règle HCSF : total des crédits ≤ 35 % de vos revenus." />
            <Field label="Autres charges fixes" value={v.autresCharges} onChange={set("autresCharges")} suffix="€/mois" hint="Transport, abonnements, assurances..." />
            <Field label="Épargne de réserve" value={v.epargneReserve} onChange={set("epargneReserve")} suffix="€" hint="Argent conservé après l'achat" tooltip="Argent disponible après l'achat pour faire face aux imprévus. Minimum recommandé : 3 à 6 mois de mensualités." />
          </div>

          <p className="sim-card-legend" style={{ marginTop: 16 }}>Crédit envisagé</p>
          <div className="step-fields">
            <Field label="Taux du prêt" value={v.taux} onChange={set("taux")} suffix="%" step="0.1" tooltip="Taux d'intérêt annuel de votre prêt. Moyenne France 2026 : 3,3–3,7 % sur 20 ans. Comparez les offres avec un courtier." />
            <Field label="Durée" value={v.duree} onChange={set("duree")} suffix="ans" tooltip="Nombre d'années de remboursement. Plus c'est long → mensualité basse mais intérêts totaux élevés. Limite légale HCSF : 25 ans (27 ans dans le neuf)." />
          </div>

          <div style={{ marginTop: 16 }}>
            <label className="field-label">Statut professionnel</label>
            <div className="score-statut-grid">
              {STATUTS.map((s) => (
                <button
                  key={s.label}
                  type="button"
                  className={`score-statut-btn${v.statutScore === s.score ? " score-statut-active" : ""}`}
                  onClick={() => setV((x) => ({ ...x, statutScore: s.score }))}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 16 }}>
            <div className="horizon-box">
              <div className="horizon-row">
                <div>
                  <label className="horizon-label">Horizon de détention prévu</label>
                  <p className="horizon-explain">Dans combien d'années envisagez-vous de revendre ?</p>
                </div>
                <strong className="horizon-value">{v.horizon} ans</strong>
              </div>
              <input
                type="range" min="1" max="25" step="1"
                value={v.horizon}
                onChange={(e) => setV((x) => ({ ...x, horizon: Number(e.target.value) }))}
                style={{ "--range-pct": `${((v.horizon - 1) / 24) * 100}%` }}
                aria-label={`Horizon : ${v.horizon} ans`}
              />
              <div className="horizon-ticks"><span>1 an</span><span>10 ans</span><span>25 ans</span></div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="sim-results-panel">
          {!res ? (
            <p className="sim-empty">Renseignez le prix du bien pour voir votre score.</p>
          ) : (
            <>
              {/* Overall score */}
              <div className="score-overall-card" style={{ background: level.bg, borderColor: level.color }}>
                <div className="score-overall-top">
                  <span className="score-overall-emoji">{level.emoji}</span>
                  <div>
                    <p className="score-overall-label">Score global de préparation</p>
                    <p className="score-overall-verdict" style={{ color: level.color }}>{level.label}</p>
                  </div>
                </div>
                <div className="score-overall-number" style={{ color: level.color }}>
                  {res.overall}<span>/100</span>
                </div>
                <div className="score-overall-bar">
                  <div
                    className="score-overall-fill"
                    style={{ width: `${res.overall}%`, background: level.color }}
                  />
                </div>
              </div>

              {/* Radar */}
              <div className="sim-chart-wrap" style={{ marginTop: 16 }}>
                <p className="sim-chart-title">Profil sur 5 dimensions</p>
                <ResponsiveContainer width="100%" height={220}>
                  <RadarChart data={radarData} margin={{ top: 10, right: 24, bottom: 10, left: 24 }}>
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis
                      dataKey="dim"
                      tick={{ fontSize: 11, fill: "#0c1a35", fontWeight: 600 }}
                    />
                    <Radar
                      dataKey="score"
                      stroke={level.color}
                      fill={level.color}
                      fillOpacity={0.2}
                      dot={{ r: 3, fill: level.color }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              {/* Dimension breakdown */}
              <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 8 }}>
                {Object.entries(res.scores).map(([dim, score]) => {
                  const isWeak = score < 60;
                  const tip = DIM_ACTIONS[dim];
                  return (
                    <div key={dim} className="score-dim-row">
                      <div className="score-dim-header">
                        <span className="score-dim-name">{dim}</span>
                        <span className="score-dim-value" style={{ color: isWeak ? "#dc2626" : "#059669" }}>
                          {score}/100
                        </span>
                      </div>
                      <div className="score-dim-bar-track">
                        <div
                          className="score-dim-bar-fill"
                          style={{
                            width: `${score}%`,
                            background: score >= 80 ? "#059669" : score >= 60 ? "#06b6d4" : score >= 40 ? "#d97706" : "#dc2626",
                          }}
                        />
                      </div>
                      {isWeak && tip && (
                        <p className="score-dim-tip">{tip.low}</p>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Action plan — top 2 weakest dimensions */}
              {(() => {
                const sorted = Object.entries(res.scores).sort((a, b) => a[1] - b[1]).slice(0, 2).filter(([, s]) => s < 80);
                if (sorted.length === 0) return null;
                return (
                  <div className="sim-info-box" style={{ marginTop: 16 }}>
                    <p className="sim-info-title">🎯 Plan d'action prioritaire</p>
                    {sorted.map(([dim, score]) => (
                      <div key={dim} className="score-action-row">
                        <span className="score-action-dim">{dim} — {score}/100</span>
                        <p className="score-action-tip">{DIM_ACTIONS[dim]?.low}</p>
                      </div>
                    ))}
                  </div>
                );
              })()}

              {/* Quick stats */}
              <div className="sim-stats-grid" style={{ marginTop: 16 }}>
                <div className="sim-stat-card">
                  <span className="sim-stat-card-label">Mensualité estimée</span>
                  <span className="sim-stat-card-value">
                    {new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(res.mensualite)}/mois
                  </span>
                </div>
                <div className={`sim-stat-card ${res.tauxEndet > 35 ? "sim-stat-card-red" : res.tauxEndet > 28 ? "sim-stat-card-amber" : "sim-stat-card-green"}`}>
                  <span className="sim-stat-card-label">Taux d'endettement</span>
                  <span className="sim-stat-card-value">{res.tauxEndet.toFixed(1)} %</span>
                </div>
                <div className="sim-stat-card">
                  <span className="sim-stat-card-label">Apport</span>
                  <span className="sim-stat-card-value">{res.apportPct.toFixed(1)} % du prix</span>
                </div>
                <div className={`sim-stat-card ${res.overall >= 60 ? "sim-stat-card-green" : "sim-stat-card-amber"}`}>
                  <span className="sim-stat-card-label">Verdict banque</span>
                  <span className="sim-stat-card-value">{res.overall >= 70 ? "Dossier solide" : res.overall >= 50 ? "Dossier correct" : "Dossier fragile"}</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </SimLayout>
  );
}
