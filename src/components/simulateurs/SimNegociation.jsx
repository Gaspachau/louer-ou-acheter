import { useMemo, useState } from "react";
import SimLayout from "./SimLayout";
import Field from "../Field";
import { LineChart, Line, XAxis, YAxis, Tooltip, ReferenceLine, ResponsiveContainer, CartesianGrid } from "recharts";

const fmtCur = (v) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(v);

function calcMensualite(capital, taux, dureeAns) {
  if (capital <= 0 || dureeAns <= 0) return 0;
  const r = taux / 100 / 12;
  const n = dureeAns * 12;
  return r === 0 ? capital / n : (capital * r) / (1 - Math.pow(1 + r, -n));
}

const CONSEILS = [
  "Les biens en vente depuis plus de 90 jours ont en moyenne 5–8 % de marge de négociation.",
  "Demandez le prix d'achat initial du vendeur : une plus-value latente ouvre la discussion.",
  "Un DPE F/G justifie une décote de 10–25 % pour les travaux de rénovation énergétique.",
  "En zone tendue, la marge de négociation est souvent réduite à 2–3 % maximum.",
  "Négocier 5 % sur 250 000 € = 12 500 € d'économie, soit ~50 €/mois sur 20 ans.",
];

export default function SimNegociation() {
  const [prixAffiche, setPrixAffiche] = useState(280000);
  const [loyer, setLoyer] = useState(950);
  const [taux, setTaux] = useState(3.5);
  const [duree, setDuree] = useState(20);
  const [apport, setApport] = useState(40000);
  const [horizon, setHorizon] = useState(7);
  const [rendementEpargne, setRendementEpargne] = useState(3.5);

  const res = useMemo(() => {
    // On cherche le prix maximum pour que l'achat soit équivalent à la location sur l'horizon
    // Méthode : binary search sur le prix pour trouver l'équilibre patrimonial

    const fraisNotaire = 0.08; // 8%
    const chargesAnnuelles = 0.015; // taxe + entretien = 1.5%/an du prix
    const appreciation = 0.02; // 2%/an

    function patrimoineAchat(prix) {
      const capital = Math.max(0, prix * (1 + fraisNotaire) - apport);
      const mens = calcMensualite(capital, taux, duree);
      let capitalRestant = capital;
      for (let y = 0; y < horizon; y++) {
        const r = taux / 100 / 12;
        for (let m = 0; m < 12; m++) {
          const interet = capitalRestant * r;
          const remboursement = Math.min(mens - interet, capitalRestant);
          capitalRestant -= remboursement;
        }
      }
      const valeurFuture = prix * Math.pow(1 + appreciation, horizon);
      return valeurFuture - capitalRestant;
    }

    function patrimoineLocation() {
      // Épargne la différence entre mensualité de référence et loyer
      const mensRef = calcMensualite(
        Math.max(0, prixAffiche * (1 + fraisNotaire) - apport),
        taux, duree
      );
      const chargesMois = (prixAffiche * chargesAnnuelles) / 12;
      const loyerActuel = loyer;
      const loyerFin = loyerActuel * Math.pow(1.02, horizon);
      const loyerMoyen = (loyerActuel + loyerFin) / 2;

      const coutMensuelAchat = mensRef + chargesMois;
      const epargneSupp = Math.max(0, coutMensuelAchat - loyerMoyen);
      const capitalPlace = apport + epargneSupp * horizon * 12;
      return capitalPlace * Math.pow(1 + rendementEpargne / 100, horizon);
    }

    // Binary search pour trouver le prix d'équilibre
    let lo = prixAffiche * 0.5, hi = prixAffiche;
    for (let i = 0; i < 40; i++) {
      const mid = (lo + hi) / 2;
      if (patrimoineAchat(mid) < patrimoineLocation()) hi = mid;
      else lo = mid;
    }
    const prixEquilibre = (lo + hi) / 2;
    const margeNego = prixAffiche - prixEquilibre;
    const pctNego = (margeNego / prixAffiche) * 100;

    // Courbe : patrimoine achat selon le prix négocié
    const chartData = [];
    for (let pct = 0; pct <= 20; pct += 2) {
      const prix = prixAffiche * (1 - pct / 100);
      chartData.push({
        pct: `-${pct}%`,
        prix,
        patAchat: Math.round(patrimoineAchat(prix) / 1000),
        patLoc: Math.round(patrimoineLocation() / 1000),
      });
    }

    const mensualiteAffiche = calcMensualite(
      Math.max(0, prixAffiche * 1.08 - apport), taux, duree
    );
    const mensualiteNego = calcMensualite(
      Math.max(0, prixEquilibre * 1.08 - apport), taux, duree
    );

    return {
      prixEquilibre,
      margeNego: Math.max(0, margeNego),
      pctNego: Math.max(0, pctNego),
      chartData,
      mensualiteAffiche,
      mensualiteNego,
      eligible: pctNego >= 0,
    };
  }, [prixAffiche, loyer, taux, duree, apport, horizon, rendementEpargne]);

  const negoZone = res.pctNego < 3 ? "safe"
    : res.pctNego < 8 ? "warning"
    : "danger";

  const negoColors = {
    safe: { bg: "#d1fae5", border: "#6ee7b7", accent: "#059669", label: "Marge faible — marché tendu" },
    warning: { bg: "#fef3c7", border: "#fcd34d", accent: "#d97706", label: "Marge raisonnable" },
    danger: { bg: "#fee2e2", border: "#fca5a5", accent: "#dc2626", label: "Forte décote nécessaire — bien surévalué ?" },
  };
  const c = negoColors[negoZone];

  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload?.length) return null;
    return (
      <div className="chart-tooltip">
        <p style={{ margin: 0, fontWeight: 600 }}>Réduction : {payload[0]?.payload.pct}</p>
        <p style={{ margin: "2px 0 0", color: "#1a56db" }}>Achat : {payload[0]?.value}k€</p>
        <p style={{ margin: "2px 0 0", color: "#059669" }}>Location : {payload[1]?.value}k€</p>
      </div>
    );
  };

  return (
    <SimLayout
      icon="🤝"
      title="Simulateur de négociation"
      description="À quel prix négocier pour que l'achat soit au moins aussi rentable que la location sur votre horizon ?"
      conseils={CONSEILS}
    >
      <div className="sim-layout">
        <div className="sim-card">
          <p className="sim-card-legend">Votre projet</p>
          <div className="step-fields">
            <Field label="Prix affiché" value={prixAffiche} onChange={setPrixAffiche} suffix="€" tooltip="Prix d'achat hors frais de notaire. Médiane France 2026 : ~250 000 € (source : Notaires de France)." />
            <Field label="Loyer mensuel équivalent" value={loyer} onChange={setLoyer} suffix="€" hint="Loyer d'un bien similaire dans le même secteur" tooltip="Loyer mensuel charges comprises. Moyenne nationale : ~700 €/mois. À Paris : ~1 400 €, en province : ~600–700 €." />
            <Field label="Apport personnel" value={apport} onChange={setApport} suffix="€" tooltip="Épargne mobilisée directement, sans emprunt. Minimum recommandé : 10 % du prix pour couvrir les frais de notaire." />
            <Field label="Taux du crédit" value={taux} onChange={setTaux} suffix="%" step={0.1} tooltip="Taux d'intérêt annuel de votre prêt. Moyenne France 2026 : 3,3–3,7 % sur 20 ans. Comparez les offres avec un courtier." />
            <Field label="Durée du crédit" value={duree} onChange={setDuree} suffix="ans" step={1} tooltip="Nombre d'années de remboursement. Plus c'est long → mensualité basse mais intérêts totaux élevés. Limite légale HCSF : 25 ans (27 ans dans le neuf)." />
            <Field label="Horizon de détention" value={horizon} onChange={setHorizon} suffix="ans" step={1} min={3} max={20} />
            <Field label="Rendement épargne si on loue" value={rendementEpargne} onChange={setRendementEpargne} suffix="%" step={0.5} hint="Livret A = 3%, PEA = 5-7%" tooltip="Rendement net annuel de votre épargne. Livret A en 2026 : 2,4 %. Assurance-vie fonds euro : ~2,5–3 %. PEA/ETF monde : ~7–8 % sur 20 ans en moyenne." />
          </div>
        </div>

        <div className="sim-results-panel">
          <div className="nego-verdict" style={{ background: c.bg, borderColor: c.border }}>
            <div className="nego-verdict-header">
              <span className="nego-verdict-tag" style={{ color: c.accent, borderColor: c.accent }}>{c.label}</span>
            </div>
            <p className="nego-prix-max-label">Prix maximum recommandé</p>
            <p className="nego-prix-max" style={{ color: c.accent }}>{fmtCur(res.prixEquilibre)}</p>
            <p className="nego-prix-delta">
              Soit <strong style={{ color: c.accent }}>−{res.pctNego.toFixed(1)} %</strong> par rapport au prix affiché ({fmtCur(res.margeNego)} à négocier)
            </p>
          </div>

          <div className="nego-compare">
            <div className="nego-compare-item">
              <span className="nego-compare-label">Mensualité au prix affiché</span>
              <strong style={{ color: "var(--muted)" }}>{fmtCur(res.mensualiteAffiche)}/mois</strong>
            </div>
            <div className="nego-compare-item">
              <span className="nego-compare-label">Mensualité au prix négocié</span>
              <strong style={{ color: "#059669" }}>{fmtCur(res.mensualiteNego)}/mois</strong>
            </div>
            <div className="nego-compare-item" style={{ borderTop: "1px solid var(--line)", paddingTop: 10, marginTop: 4 }}>
              <span className="nego-compare-label">Économie mensuelle</span>
              <strong style={{ color: c.accent }}>−{fmtCur(res.mensualiteAffiche - res.mensualiteNego)}/mois</strong>
            </div>
          </div>

          <div style={{ marginTop: 16 }}>
            <p className="sim-card-legend">Patrimoine selon la remise négociée ({horizon} ans)</p>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={res.chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--line)" />
                <XAxis dataKey="pct" tick={{ fontSize: 11 }} />
                <YAxis unit="k€" tick={{ fontSize: 11 }} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="patAchat" stroke="#1a56db" strokeWidth={2} dot={false} name="Achat" />
                <Line type="monotone" dataKey="patLoc" stroke="#059669" strokeWidth={2} dot={false} strokeDasharray="5 3" name="Location" />
                <ReferenceLine x={`-${Math.round(res.pctNego)}%`} stroke={c.accent} strokeDasharray="4 2" label={{ value: "Équilibre", fontSize: 10, fill: c.accent }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <p className="sim-detail-note" style={{ marginTop: 8 }}>
            Simulation sur {horizon} ans avec appréciation +2 %/an, hausse loyers +2 %/an, frais de notaire 8 %. Les conditions de marché peuvent varier.
          </p>
        </div>
      </div>
    </SimLayout>
  );
}
