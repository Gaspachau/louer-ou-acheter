import { useMemo, useState } from "react";
import SimLayout from "./SimLayout";
import Field from "../Field";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from "recharts";

const fmtCur = (v) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(v);

function calcMensualite(capital, taux, dureeAns) {
  if (capital <= 0 || dureeAns <= 0) return 0;
  const r = taux / 100 / 12;
  const n = dureeAns * 12;
  return r === 0 ? capital / n : (capital * r) / (1 - Math.pow(1 + r, -n));
}

const CONSEILS = [
  "Les IRA (indemnités de remboursement anticipé) sont plafonnées à 3 % du capital ou 6 mois d'intérêts.",
  "Le remboursement anticipé partiel réduit soit la durée, soit la mensualité — la durée est plus avantageuse.",
  "Si votre épargne rapporte plus que le taux de votre crédit, mieux vaut garder l'argent placé.",
  "Les fonctionnaires et certains profils peuvent négocier la suppression des IRA avec la banque.",
  "Un remboursement anticipé total en fin de crédit n'économise presque rien — l'essentiel est remboursé tôt.",
];

export default function SimRemboursementAnticipe() {
  const [capitalRestant, setCapitalRestant] = useState(180000);
  const [tauxCredit, setTauxCredit] = useState(2.2);
  const [dureeRestante, setDureeRestante] = useState(18);
  const [montantRA, setMontantRA] = useState(30000);
  const [optionRA, setOptionRA] = useState("duree"); // duree | mensualite
  const [rendementEpargne, setRendementEpargne] = useState(3.5);

  const res = useMemo(() => {
    const mensActuelle = calcMensualite(capitalRestant, tauxCredit, dureeRestante);

    // Calcul intérêts restants sans RA
    let crd = capitalRestant;
    const r = tauxCredit / 100 / 12;
    let interetsTotaux = 0;
    for (let i = 0; i < dureeRestante * 12; i++) {
      const int = crd * r;
      interetsTotaux += int;
      crd -= (mensActuelle - int);
    }

    // IRA
    const plafondPct = capitalRestant * 0.03;
    const plafond6Mois = mensActuelle * 6 * r * capitalRestant; // approx
    const ira = Math.min(plafondPct, montantRA * r * 6);

    // Nouveau capital après RA
    const nouveauCapital = Math.max(0, capitalRestant - montantRA);

    let economiesInterets = 0;
    let nouvelleDuree = dureeRestante;
    let nouvelleMensualite = mensActuelle;

    if (optionRA === "duree") {
      // Même mensualité, durée réduite
      if (nouveauCapital <= 0) {
        nouvelleDuree = 0;
      } else {
        const m = mensActuelle;
        const rr = tauxCredit / 100 / 12;
        nouvelleDuree = rr === 0
          ? nouveauCapital / m / 12
          : Math.log(m / (m - rr * nouveauCapital)) / Math.log(1 + rr) / 12;
      }
      let crd2 = nouveauCapital;
      let int2 = 0;
      const n2 = Math.ceil(nouvelleDuree * 12);
      for (let i = 0; i < n2; i++) {
        const intI = crd2 * r;
        int2 += intI;
        crd2 -= (mensActuelle - intI);
        if (crd2 <= 0) break;
      }
      economiesInterets = interetsTotaux - int2;
    } else {
      // Même durée, mensualité réduite
      nouvelleMensualite = calcMensualite(nouveauCapital, tauxCredit, dureeRestante);
      let crd2 = nouveauCapital;
      let int2 = 0;
      for (let i = 0; i < dureeRestante * 12; i++) {
        const intI = crd2 * r;
        int2 += intI;
        crd2 -= (nouvelleMensualite - intI);
        if (crd2 <= 0) break;
      }
      economiesInterets = interetsTotaux - int2;
    }

    // Coût opportunité : si l'argent était placé
    const gainEpargne = montantRA * (Math.pow(1 + rendementEpargne / 100, dureeRestante) - 1);
    const netRA = economiesInterets - gainEpargne - ira;
    const recommandation = netRA > 0 ? "rembourser" : "placer";

    // Chart data
    const chartData = [
      { name: "Intérêts sans RA", val: Math.round(interetsTotaux), color: "#ef4444" },
      { name: "Intérêts avec RA", val: Math.round(interetsTotaux - economiesInterets), color: "#1a56db" },
      { name: "Gain épargne", val: Math.round(gainEpargne), color: "#059669" },
    ];

    return {
      mensActuelle, interetsTotaux, ira,
      economiesInterets, nouvelleDuree, nouvelleMensualite,
      gainEpargne, netRA, recommandation, chartData,
    };
  }, [capitalRestant, tauxCredit, dureeRestante, montantRA, optionRA, rendementEpargne]);

  return (
    <SimLayout
      icon="⚡"
      title="Remboursement anticipé"
      description="Vaut-il mieux rembourser votre crédit par anticipation ou placer cet argent ? Calculez l'économie réelle."
      conseils={CONSEILS}
    >
      <div className="sim-layout">
        <div className="sim-card">
          <p className="sim-card-legend">Votre crédit actuel</p>
          <div className="step-fields">
            <Field label="Capital restant dû" value={capitalRestant} onChange={setCapitalRestant} suffix="€" />
            <Field label="Taux d'intérêt actuel" value={tauxCredit} onChange={setTauxCredit} suffix="%" step={0.1} />
            <Field label="Durée restante" value={dureeRestante} onChange={setDureeRestante} suffix="ans" step={1} min={1} max={30} />
            <Field label="Montant du remboursement anticipé" value={montantRA} onChange={setMontantRA} suffix="€" />
            <Field label="Rendement épargne alternatif" value={rendementEpargne} onChange={setRendementEpargne} suffix="%" step={0.5} hint="Assurance-vie fonds euro, PEA…" />
          </div>

          <p className="sim-card-legend" style={{ marginTop: 20 }}>Option de remboursement</p>
          <div className="ra-option-btns">
            <button
              type="button"
              className={`ra-option-btn${optionRA === "duree" ? " active" : ""}`}
              onClick={() => setOptionRA("duree")}
            >
              <strong>Réduire la durée</strong>
              <span>Même mensualité, crédit fini plus tôt</span>
            </button>
            <button
              type="button"
              className={`ra-option-btn${optionRA === "mensualite" ? " active" : ""}`}
              onClick={() => setOptionRA("mensualite")}
            >
              <strong>Réduire la mensualité</strong>
              <span>Même durée, mensualité allégée</span>
            </button>
          </div>
        </div>

        <div className="sim-results-panel">
          <div className={`ra-verdict ${res.recommandation === "rembourser" ? "ra-verdict-green" : "ra-verdict-blue"}`}>
            <span className="ra-verdict-icon">{res.recommandation === "rembourser" ? "💰" : "📈"}</span>
            <div>
              <p className="ra-verdict-title">
                {res.recommandation === "rembourser"
                  ? "Rembourser par anticipation est avantageux"
                  : `Placer à ${rendementEpargne}% est plus rentable`}
              </p>
              <p className="ra-verdict-sub">
                Gain net : <strong>{fmtCur(Math.abs(res.netRA))}</strong> en faveur du {res.recommandation === "rembourser" ? "remboursement" : "placement"}
              </p>
            </div>
          </div>

          <div className="sim-result-grid" style={{ marginTop: 12 }}>
            <div className="result-block">
              <span className="result-block-label">Mensualité actuelle</span>
              <span className="result-block-val">{fmtCur(res.mensActuelle)}/mois</span>
            </div>
            {optionRA === "duree" ? (
              <div className="result-block">
                <span className="result-block-label">Nouvelle durée</span>
                <span className="result-block-val" style={{ color: "#1a56db" }}>{res.nouvelleDuree.toFixed(1)} ans</span>
              </div>
            ) : (
              <div className="result-block">
                <span className="result-block-label">Nouvelle mensualité</span>
                <span className="result-block-val" style={{ color: "#1a56db" }}>{fmtCur(res.nouvelleMensualite)}/mois</span>
              </div>
            )}
            <div className="result-block">
              <span className="result-block-label">Économies d'intérêts</span>
              <span className="result-block-val" style={{ color: "#059669" }}>+{fmtCur(res.economiesInterets)}</span>
            </div>
            <div className="result-block">
              <span className="result-block-label">IRA estimées</span>
              <span className="result-block-val" style={{ color: "#d97706" }}>−{fmtCur(res.ira)}</span>
            </div>
            <div className="result-block">
              <span className="result-block-label">Gain si placé à {rendementEpargne}%</span>
              <span className="result-block-val" style={{ color: "#7c3aed" }}>{fmtCur(res.gainEpargne)}</span>
            </div>
            <div className="result-block">
              <span className="result-block-label">Bilan net vs placement</span>
              <span className="result-block-val" style={{ color: res.netRA > 0 ? "#059669" : "#dc2626", fontWeight: 700 }}>
                {res.netRA > 0 ? "+" : ""}{fmtCur(res.netRA)}
              </span>
            </div>
          </div>

          <div style={{ marginTop: 16 }}>
            <p className="sim-card-legend">Comparaison intérêts vs gain épargne</p>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={res.chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--line)" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} tickFormatter={(v) => `${Math.round(v / 1000)}k€`} />
                <Tooltip formatter={(v) => fmtCur(v)} />
                <Bar dataKey="val" radius={[4, 4, 0, 0]}>
                  {res.chartData.map((d, i) => <Cell key={i} fill={d.color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <p className="sim-detail-note">
            IRA plafonnées à 3 % du capital ou 6 mois d'intérêts (art. L313-47 CConso). Consultez votre contrat de prêt pour les conditions exactes.
          </p>
        </div>
      </div>
    </SimLayout>
  );
}
