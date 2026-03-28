import { useMemo, useState } from "react";
import SimLayout from "./SimLayout";
import Field from "../Field";

const fmtCur = (v) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(v);

// PTZ 2026 — règles simplifiées
const ZONES = {
  A: {
    label: "Zone A / Abis (Paris, Côte d'Azur, Genève…)",
    plafonds: [37000, 51800, 62900, 74000, 85100],
    ptzPct: 0.40,
    ptzMax: [150000, 210000, 255000, 300000, 345000],
  },
  B1: {
    label: "Zone B1 (grandes agglomérations, Île-de-France hors A…)",
    plafonds: [30000, 42000, 51000, 60000, 69000],
    ptzPct: 0.40,
    ptzMax: [135000, 189000, 230000, 270000, 310500],
  },
  B2: {
    label: "Zone B2 / C (villes moyennes, zones rurales)",
    plafonds: [27000, 37800, 45900, 54000, 62100],
    ptzPct: 0.20,
    ptzMax: [110000, 154000, 187000, 220000, 253000],
  },
};

function calcMensualite(capital, taux, dureeAns) {
  if (capital <= 0 || dureeAns <= 0) return 0;
  const r = taux / 100 / 12;
  const n = dureeAns * 12;
  return r === 0 ? capital / n : (capital * r) / (1 - Math.pow(1 + r, -n));
}

const CONSEILS_PTZ = [
  "Le PTZ ne peut financer que la résidence principale — pas un investissement locatif.",
  "Dans le neuf, le PTZ peut couvrir jusqu'à 40 % du prix en zone A/B1.",
  "Le PTZ est sans intérêt ET avec un différé de remboursement selon vos revenus.",
  "Depuis 2024, le PTZ ancien est réservé aux zones B2/C pour des biens rénovés.",
  "Combinez PTZ + prêt classique + apport pour optimiser votre plan de financement.",
];

export default function SimPTZ() {
  const [zone, setZone] = useState("B1");
  const [typeBien, setTypeBien] = useState("neuf");
  const [nbPersonnes, setNbPersonnes] = useState(2);
  const [revenus, setRevenus] = useState(42000);
  const [prixAchat, setPrixAchat] = useState(220000);
  const [tauxCredit, setTauxCredit] = useState(3.8);
  const [dureeCredit, setDureeCredit] = useState(20);

  const res = useMemo(() => {
    const z = ZONES[zone];
    const nIdx = Math.min(nbPersonnes - 1, 4);
    const plafond = z.plafonds[nIdx];
    const eligible = revenus <= plafond && (typeBien === "neuf" || zone === "B2");

    if (!eligible) return { eligible: false, plafond };

    const montantPTZ = Math.min(prixAchat * z.ptzPct, z.ptzMax[nIdx]);
    const capitalSansPTZ = Math.max(0, prixAchat * 1.08 - montantPTZ);

    // Durée PTZ dépend du ratio revenus/plafond
    const ratio = revenus / plafond;
    const dureePTZ = ratio <= 0.4 ? 20 : ratio <= 0.7 ? 22 : 25;
    const differePTZ = ratio <= 0.4 ? 5 : ratio <= 0.7 ? 4 : 3;

    const mensSansPTZ = calcMensualite(prixAchat * 1.08, tauxCredit, dureeCredit);
    const mensAvecPTZ = calcMensualite(capitalSansPTZ, tauxCredit, dureeCredit);
    const economiesMensuelles = mensSansPTZ - mensAvecPTZ;
    const economiesInterets = economiesMensuelles * dureeCredit * 12;

    return {
      eligible: true,
      plafond,
      montantPTZ,
      dureePTZ,
      differePTZ,
      mensSansPTZ,
      mensAvecPTZ,
      economiesMensuelles,
      economiesInterets,
      ratioPTZ: (montantPTZ / prixAchat) * 100,
    };
  }, [zone, typeBien, nbPersonnes, revenus, prixAchat, tauxCredit, dureeCredit]);

  return (
    <SimLayout
      icon="🏗️"
      title="PTZ 2026 — Êtes-vous éligible ?"
      description="Calculez votre droit au Prêt à Taux Zéro 2026, le montant obtenu et l'économie réalisée sur votre crédit."
      conseils={CONSEILS_PTZ}
    >
      <div className="sim-layout">
        <div className="sim-card">
          <p className="sim-card-legend">Votre situation</p>
          <div className="step-fields">
            <div className="field-wrap">
              <label className="field-label">Zone géographique</label>
              <select className="field-select" value={zone} onChange={(e) => setZone(e.target.value)}>
                {Object.entries(ZONES).map(([k, z]) => (
                  <option key={k} value={k}>{z.label}</option>
                ))}
              </select>
            </div>
            <div className="field-wrap">
              <label className="field-label">Type de bien</label>
              <div className="ptz-type-btns">
                <button type="button" className={`ptz-type-btn${typeBien === "neuf" ? " active" : ""}`} onClick={() => setTypeBien("neuf")}>
                  🏗️ Neuf
                </button>
                <button type="button" className={`ptz-type-btn${typeBien === "ancien" ? " active" : ""}`} onClick={() => setTypeBien("ancien")}>
                  🏠 Ancien rénové (zone B2/C)
                </button>
              </div>
            </div>
            <Field label="Personnes dans le foyer" value={nbPersonnes} onChange={setNbPersonnes} suffix="pers." step={1} min={1} max={6} hint="Emprunteur(s) + personnes à charge" />
            <Field label="Revenus annuels nets du foyer" value={revenus} onChange={setRevenus} suffix="€" hint="Revenus fiscaux N-2 de tous les co-emprunteurs" />
            <Field label="Prix d'achat" value={prixAchat} onChange={setPrixAchat} suffix="€" />
            <Field label="Taux du crédit classique" value={tauxCredit} onChange={setTauxCredit} suffix="%" step={0.1} />
            <Field label="Durée du crédit classique" value={dureeCredit} onChange={setDureeCredit} suffix="ans" step={1} min={10} max={25} />
          </div>
        </div>

        <div className="sim-results-panel">
          {res.eligible === false ? (
            <div className="ptz-ineligible">
              <div className="ptz-ineligible-icon">❌</div>
              <h2 className="ptz-ineligible-title">Non éligible au PTZ</h2>
              <p className="ptz-ineligible-reason">
                {revenus > res.plafond
                  ? `Vos revenus (${fmtCur(revenus)}/an) dépassent le plafond de la zone ${zone} pour ${nbPersonnes} personne(s) : ${fmtCur(res.plafond)}/an.`
                  : "Le PTZ ancien n'est disponible qu'en zone B2/C pour des logements anciens rénovés. En zone A ou B1, le PTZ est réservé au neuf."}
              </p>
              <div className="ptz-tip-box">
                <strong>💡 Alternative :</strong> Renseignez-vous sur le prêt Action Logement (1 % patronal) ou le prêt d'accession sociale (PAS) selon votre situation.
              </div>
            </div>
          ) : (
            <>
              <div className="ptz-eligible-header">
                <span className="ptz-check">✓</span>
                <div>
                  <p className="ptz-eligible-title">Éligible au PTZ 2026</p>
                  <p className="ptz-eligible-sub">Vos revenus ({fmtCur(revenus)}/an) sont sous le plafond de {fmtCur(res.plafond)}/an</p>
                </div>
              </div>

              <div className="ptz-key-metrics">
                <div className="ptz-metric">
                  <span className="ptz-metric-val" style={{ color: "#1a56db" }}>{fmtCur(res.montantPTZ)}</span>
                  <span className="ptz-metric-label">Montant PTZ estimé</span>
                  <span className="ptz-metric-sub">{res.ratioPTZ.toFixed(0)} % du prix d'achat</span>
                </div>
                <div className="ptz-metric">
                  <span className="ptz-metric-val" style={{ color: "#059669" }}>{fmtCur(res.economiesMensuelles)}/mois</span>
                  <span className="ptz-metric-label">Économie sur mensualité</span>
                  <span className="ptz-metric-sub">vs crédit sans PTZ</span>
                </div>
                <div className="ptz-metric">
                  <span className="ptz-metric-val" style={{ color: "#7c3aed" }}>{fmtCur(res.economiesInterets)}</span>
                  <span className="ptz-metric-label">Économie totale</span>
                  <span className="ptz-metric-sub">sur {dureeCredit} ans</span>
                </div>
              </div>

              <div className="ptz-compare-row">
                <div className="ptz-compare-item">
                  <span className="ptz-compare-label">Sans PTZ</span>
                  <span className="ptz-compare-mens" style={{ color: "var(--muted)" }}>{fmtCur(res.mensSansPTZ)}/mois</span>
                </div>
                <div className="ptz-compare-arrow">→</div>
                <div className="ptz-compare-item">
                  <span className="ptz-compare-label">Avec PTZ</span>
                  <span className="ptz-compare-mens" style={{ color: "#059669" }}>{fmtCur(res.mensAvecPTZ)}/mois</span>
                </div>
              </div>

              <div className="ptz-conditions">
                <p className="ptz-conditions-title">Conditions du PTZ</p>
                <div className="ptz-cond-row"><span>Durée</span><strong>{res.dureePTZ} ans</strong></div>
                <div className="ptz-cond-row"><span>Différé de remboursement</span><strong>{res.differePTZ} ans</strong></div>
                <div className="ptz-cond-row"><span>Taux</span><strong>0 % (sans intérêts)</strong></div>
                <div className="ptz-cond-row"><span>Résidence</span><strong>Principale uniquement</strong></div>
              </div>

              <p className="sim-detail-note">
                Simulation indicative — les montants définitifs dépendent de l'établissement prêteur et de votre avis d'imposition. Consultez un courtier pour une offre ferme.
              </p>
            </>
          )}
        </div>
      </div>
    </SimLayout>
  );
}
