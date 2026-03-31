import { useMemo, useState } from "react";
import SimLayout from "./SimLayout";
import Field from "../Field";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const fmtCur = (v) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(v);

const CONSEILS = [
  "La loi Lemoine (2022) permet de changer d'assurance emprunteur à tout moment sans frais.",
  "L'assurance banque coûte en moyenne 2× plus cher que l'assurance déléguée pour un profil sain.",
  "Pour un emprunt de 200 000 € / 20 ans, changer d'assurance peut économiser 10 000 à 20 000 €.",
  "Le TAEA (Taux Annuel Effectif d'Assurance) est l'indicateur clé pour comparer les offres.",
  "Les jeunes non-fumeurs en bonne santé obtiennent les meilleurs taux en délégation.",
];

export default function SimAssurancePret() {
  const [montant, setMontant] = useState(200000);
  const [duree, setDuree] = useState(20);
  const [tauxBanque, setTauxBanque] = useState(0.36);
  const [tauxDelegue, setTauxDelegue] = useState(0.14);
  const [tauxCredit, setTauxCredit] = useState(3.5);

  const res = useMemo(() => {
    // Cotisations mensuelles sur capital initial (méthode simplifiée)
    const cotisationBanqueMois = (montant * tauxBanque / 100) / 12;
    const cotisationDelegueMois = (montant * tauxDelegue / 100) / 12;

    const totalBanque = cotisationBanqueMois * duree * 12;
    const totalDelegue = cotisationDelegueMois * duree * 12;
    const economie = totalBanque - totalDelegue;
    const economieMois = cotisationBanqueMois - cotisationDelegueMois;

    // Mensualité crédit hors assurance
    const r = tauxCredit / 100 / 12;
    const n = duree * 12;
    const mensCredit = r === 0 ? montant / n : (montant * r) / (1 - Math.pow(1 + r, -n));

    const mensAvecBanque = mensCredit + cotisationBanqueMois;
    const mensAvecDelegue = mensCredit + cotisationDelegueMois;

    // TAEG approximatif
    const taegBanque = tauxCredit + tauxBanque;
    const taegDelegue = tauxCredit + tauxDelegue;

    const pieData = [
      { name: "Capital", value: montant, color: "#2563eb" },
      { name: "Intérêts", value: Math.round(mensCredit * n - montant), color: "#93c5fd" },
      { name: "Assurance banque", value: Math.round(totalBanque), color: "#ef4444" },
    ];

    const pieDataDelegue = [
      { name: "Capital", value: montant, color: "#2563eb" },
      { name: "Intérêts", value: Math.round(mensCredit * n - montant), color: "#93c5fd" },
      { name: "Assurance déléguée", value: Math.round(totalDelegue), color: "#22c55e" },
    ];

    return {
      cotisationBanqueMois, cotisationDelegueMois,
      totalBanque, totalDelegue, economie, economieMois,
      mensCredit, mensAvecBanque, mensAvecDelegue,
      taegBanque, taegDelegue,
      pieData, pieDataDelegue,
    };
  }, [montant, duree, tauxBanque, tauxDelegue, tauxCredit]);

  const economieNiveau = res.economie < 5000 ? "safe" : res.economie < 15000 ? "warning" : "danger";
  const econColors = {
    safe: "#6ee7b7",
    warning: "#fcd34d",
    danger: "#059669",
  };

  return (
    <SimLayout
      icon="🛡️"
      title="Assurance emprunteur"
      description="Comparez le coût de l'assurance banque vs la délégation d'assurance. Découvrez combien vous pouvez économiser."
      conseils={CONSEILS}
    >
      <div className="sim-layout">
        <div className="sim-card">
          <p className="sim-card-legend">Votre crédit</p>
          <div className="step-fields">
            <Field label="Montant emprunté" value={montant} onChange={setMontant} suffix="€" tooltip="Prix d'achat hors frais de notaire. Médiane France 2026 : ~250 000 € (source : Notaires de France)." />
            <Field label="Durée du crédit" value={duree} onChange={setDuree} suffix="ans" step={1} min={5} max={30} tooltip="Nombre d'années de remboursement. Plus c'est long → mensualité basse mais intérêts totaux élevés. Limite légale HCSF : 25 ans (27 ans dans le neuf)." />
            <Field label="Taux du crédit" value={tauxCredit} onChange={setTauxCredit} suffix="%" step={0.1} tooltip="Taux d'intérêt annuel de votre prêt. Moyenne France 2026 : 3,3–3,7 % sur 20 ans. Comparez les offres avec un courtier." />
          </div>

          <p className="sim-card-legend" style={{ marginTop: 20 }}>Assurances (TAEA en % du capital initial/an)</p>
          <div className="step-fields">
            <Field
              label="Taux assurance banque (TAEA)"
              value={tauxBanque}
              onChange={setTauxBanque}
              suffix="%"
              step={0.01}
              hint="Moyen : 0,25–0,45 % selon profil et banque"
              tooltip="Taux Annuel Effectif d'Assurance proposé par votre banque. Souvent entre 0,25 % et 0,45 % du capital initial."
            />
            <Field
              label="Taux assurance déléguée (TAEA)"
              value={tauxDelegue}
              onChange={setTauxDelegue}
              suffix="%"
              step={0.01}
              hint="Moyen : 0,08–0,25 % selon profil et assureur"
              tooltip="Taux d'une assurance externe (Comparateur en ligne, courtier). Souvent 2× moins cher que l'assurance banque pour les profils sains."
            />
          </div>

          <div className="assur-taux-tip">
            <p>💡 Obtenez votre taux banque dans votre offre de prêt (ligne TAEA). Comparez sur des courtiers en ligne pour la délégation.</p>
          </div>
        </div>

        <div className="sim-results-panel">
          <div className="assur-economie-banner" style={{ borderColor: econColors[economieNiveau] }}>
            <p className="assur-economie-label">Économie potentielle en changeant d'assurance</p>
            <p className="assur-economie-val" style={{ color: "#059669" }}>{fmtCur(res.economie)}</p>
            <p className="assur-economie-sub">soit {fmtCur(res.economieMois)}/mois pendant {duree} ans</p>
          </div>

          <div className="assur-compare-grid">
            <div className="assur-compare-col">
              <p className="assur-compare-title">Assurance banque</p>
              <p className="assur-compare-mens">{fmtCur(res.mensAvecBanque)}/mois</p>
              <div className="assur-compare-detail">
                <span>TAEA</span><strong>{tauxBanque} %</strong>
              </div>
              <div className="assur-compare-detail">
                <span>Cotisation mois</span><strong>{fmtCur(res.cotisationBanqueMois)}</strong>
              </div>
              <div className="assur-compare-detail">
                <span>Total sur {duree} ans</span><strong style={{ color: "#ef4444" }}>{fmtCur(res.totalBanque)}</strong>
              </div>
              <div className="assur-compare-detail">
                <span>TAEG global</span><strong>{res.taegBanque.toFixed(2)} %</strong>
              </div>
            </div>

            <div className="assur-compare-col assur-compare-col-green">
              <p className="assur-compare-title">Assurance déléguée</p>
              <p className="assur-compare-mens" style={{ color: "#059669" }}>{fmtCur(res.mensAvecDelegue)}/mois</p>
              <div className="assur-compare-detail">
                <span>TAEA</span><strong>{tauxDelegue} %</strong>
              </div>
              <div className="assur-compare-detail">
                <span>Cotisation mois</span><strong>{fmtCur(res.cotisationDelegueMois)}</strong>
              </div>
              <div className="assur-compare-detail">
                <span>Total sur {duree} ans</span><strong style={{ color: "#059669" }}>{fmtCur(res.totalDelegue)}</strong>
              </div>
              <div className="assur-compare-detail">
                <span>TAEG global</span><strong>{res.taegDelegue.toFixed(2)} %</strong>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 20 }}>
            <p className="sim-card-legend">Répartition du coût total (assurance banque)</p>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={res.pieData} cx="50%" cy="50%" outerRadius={75} dataKey="value">
                  {res.pieData.map((d, i) => <Cell key={i} fill={d.color} />)}
                </Pie>
                <Tooltip formatter={(v) => fmtCur(v)} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="assur-loi-box">
            <strong>📋 Loi Lemoine 2022</strong>
            <p>Vous pouvez changer d'assurance à tout moment, sans frais ni délai de résiliation. La banque doit accepter si les garanties sont équivalentes (fiche standardisée d'information).</p>
          </div>
        </div>
      </div>
    </SimLayout>
  );
}
