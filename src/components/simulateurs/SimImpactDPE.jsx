import { useMemo, useState } from "react";
import SimLayout from "./SimLayout";
import Field from "../Field";

const fmtCur = (v) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(v);

// Consommation énergie kWh/m²/an par DPE + coût moyen 0.25 €/kWh
const DPE_DATA = {
  A: { conso: 40,  decote: 0,    label: "A — Très économe",   color: "#059669", emoji: "🟩" },
  B: { conso: 80,  decote: 0,    label: "B — Économe",        color: "#22c55e", emoji: "🟩" },
  C: { conso: 150, decote: 0,    label: "C — Modéré",         color: "#84cc16", emoji: "🟨" },
  D: { conso: 230, decote: 0,    label: "D — Moyen",          color: "#facc15", emoji: "🟨" },
  E: { conso: 330, decote: 0.03, label: "E — Peu économe",    color: "#f97316", emoji: "🟧" },
  F: { conso: 450, decote: 0.10, label: "F — Mauvais",        color: "#ef4444", emoji: "🟥" },
  G: { conso: 600, decote: 0.20, label: "G — Passoire",       color: "#dc2626", emoji: "🟥" },
};

// Coûts de rénovation typiques pour passer d'un DPE à un autre (€/m²)
const COUTS_RENO = {
  "G→F": 50, "G→E": 100, "G→D": 180, "G→C": 280, "G→B": 420, "G→A": 600,
  "F→E": 60, "F→D": 140, "F→C": 240, "F→B": 380, "F→A": 550,
  "E→D": 90, "E→C": 190, "E→B": 320, "E→A": 490,
  "D→C": 110, "D→B": 240, "D→A": 410,
  "C→B": 130, "C→A": 300,
  "B→A": 170,
};

const DPE_LABELS = Object.keys(DPE_DATA);
const COUTENERGIE = 0.25; // €/kWh

const CONSEILS = [
  "Un logement classé G perd en moyenne 17 % de valeur par rapport à un D équivalent (source : Notaires de France).",
  "Depuis 2023, les logements G sont interdits à la location. Les F le seront en 2025.",
  "MaPrimeRénov' peut couvrir jusqu'à 70 % du coût de rénovation selon vos revenus.",
  "Passer d'un DPE G à D permet d'économiser jusqu'à 200 €/mois de charges énergétiques.",
  "Un audit énergétique est obligatoire avant la vente des logements F et G depuis 2023.",
];

export default function SimImpactDPE() {
  const [dpeActuel, setDpeActuel] = useState("F");
  const [dpeCible, setDpeCible] = useState("C");
  const [superficie, setSuperficie] = useState(65);
  const [prixAchat, setPrixAchat] = useState(200000);
  const [maprimeRenov, setMaprimeRenov] = useState(30);

  const res = useMemo(() => {
    const actuel = DPE_DATA[dpeActuel];
    const cible = DPE_DATA[dpeCible];

    // Charges énergétiques
    const chargesActuelles = actuel.conso * superficie * COUTENERGIE / 12;
    const chargesCibles = cible.conso * superficie * COUTENERGIE / 12;
    const economiesMensuelles = chargesActuelles - chargesCibles;
    const economiesAnnuelles = economiesMensuelles * 12;

    // Décote / valorisation
    const decoteActuelle = actuel.decote * prixAchat;
    const decoteCible = cible.decote * prixAchat;
    const valorisationGagnee = decoteActuelle - decoteCible;
    const prixSansReno = prixAchat - decoteActuelle;
    const prixApresReno = prixAchat - decoteCible + valorisationGagnee * 0.5; // 50% valorisation se reporte

    // Coût travaux
    const cle = DPE_LABELS.indexOf(dpeActuel) < DPE_LABELS.indexOf(dpeCible)
      ? `${dpeActuel}→${dpeCible}` : null;
    const coutM2 = cle && COUTS_RENO[cle] ? COUTS_RENO[cle] : 0;
    const coutBrut = coutM2 * superficie;
    const aideMaprime = (maprimeRenov / 100) * coutBrut;
    const coutNet = coutBrut - aideMaprime;

    // ROI
    const gainAnnuel = economiesAnnuelles + valorisationGagnee / 15; // étale la valorisation sur 15 ans
    const roi = coutNet > 0 ? coutNet / gainAnnuel : 0; // années pour rentabiliser

    const amelioration = DPE_LABELS.indexOf(dpeCible) <= DPE_LABELS.indexOf(dpeActuel);

    return {
      chargesActuelles, chargesCibles, economiesMensuelles, economiesAnnuelles,
      decoteActuelle, valorisationGagnee, prixSansReno, prixApresReno,
      coutBrut, aideMaprime, coutNet, roi, amelioration,
    };
  }, [dpeActuel, dpeCible, superficie, prixAchat, maprimeRenov]);

  const actuelData = DPE_DATA[dpeActuel];
  const cibleData = DPE_DATA[dpeCible];

  return (
    <SimLayout
      icon="♻️"
      title="Impact DPE & rénovation énergétique"
      description="Mesurez la décote d'un bien énergivore, les économies de charges après travaux et le retour sur investissement de la rénovation."
      conseils={CONSEILS}
    >
      <div className="sim-layout">
        <div className="sim-card">
          <p className="sim-card-legend">Le bien</p>
          <div className="step-fields">
            <Field label="Prix d'achat" value={prixAchat} onChange={setPrixAchat} suffix="€" />
            <Field label="Superficie" value={superficie} onChange={setSuperficie} suffix="m²" step={5} />

            <div className="field-wrap">
              <label className="field-label">DPE actuel du bien</label>
              <div className="dpe-btns">
                {DPE_LABELS.map((d) => (
                  <button
                    key={d}
                    type="button"
                    className={`dpe-btn${dpeActuel === d ? " active" : ""}`}
                    style={dpeActuel === d ? { background: DPE_DATA[d].color, color: "#fff", borderColor: DPE_DATA[d].color } : {}}
                    onClick={() => setDpeActuel(d)}
                  >{d}</button>
                ))}
              </div>
              <p className="field-hint">{actuelData.emoji} {actuelData.label}</p>
            </div>

            <div className="field-wrap">
              <label className="field-label">DPE cible après rénovation</label>
              <div className="dpe-btns">
                {DPE_LABELS.map((d) => (
                  <button
                    key={d}
                    type="button"
                    className={`dpe-btn${dpeCible === d ? " active" : ""}`}
                    style={dpeCible === d ? { background: DPE_DATA[d].color, color: "#fff", borderColor: DPE_DATA[d].color } : {}}
                    onClick={() => setDpeCible(d)}
                  >{d}</button>
                ))}
              </div>
              <p className="field-hint">{cibleData.emoji} {cibleData.label}</p>
            </div>

            <Field
              label="Taux MaPrimeRénov' estimé"
              value={maprimeRenov}
              onChange={setMaprimeRenov}
              suffix="%"
              step={5}
              min={0}
              max={70}
              hint="0% = revenus élevés, 70% = revenus très modestes"
            />
          </div>
        </div>

        <div className="sim-results-panel">
          {!res.amelioration ? (
            <div className="dpe-warning-box">
              <p>⚠️ Sélectionnez un DPE cible <strong>meilleur</strong> que le DPE actuel pour simuler une rénovation.</p>
            </div>
          ) : (
            <>
              <div className="dpe-impact-cards">
                <div className="dpe-impact-card" style={{ borderColor: actuelData.color }}>
                  <span className="dpe-badge" style={{ background: actuelData.color }}>DPE {dpeActuel}</span>
                  <p className="dpe-impact-label">Charges énergétiques</p>
                  <p className="dpe-impact-val">{fmtCur(res.chargesActuelles)}/mois</p>
                  {res.decoteActuelle > 0 && <p className="dpe-decote">Décote estimée : −{fmtCur(res.decoteActuelle)}</p>}
                </div>
                <div className="dpe-arrow">→</div>
                <div className="dpe-impact-card" style={{ borderColor: cibleData.color }}>
                  <span className="dpe-badge" style={{ background: cibleData.color }}>DPE {dpeCible}</span>
                  <p className="dpe-impact-label">Charges énergétiques</p>
                  <p className="dpe-impact-val" style={{ color: "#059669" }}>{fmtCur(res.chargesCibles)}/mois</p>
                  {res.decoteActuelle > 0 && <p className="dpe-decote" style={{ color: "#059669" }}>Valorisation récupérée</p>}
                </div>
              </div>

              <div className="sim-result-grid" style={{ marginTop: 16 }}>
                <div className="result-block">
                  <span className="result-block-label">Économies mensuelles</span>
                  <span className="result-block-val" style={{ color: "#059669" }}>{fmtCur(res.economiesMensuelles)}/mois</span>
                </div>
                <div className="result-block">
                  <span className="result-block-label">Économies annuelles</span>
                  <span className="result-block-val" style={{ color: "#059669" }}>{fmtCur(res.economiesAnnuelles)}/an</span>
                </div>
                <div className="result-block">
                  <span className="result-block-label">Valorisation du bien</span>
                  <span className="result-block-val" style={{ color: "#1a56db" }}>+{fmtCur(res.valorisationGagnee)}</span>
                </div>
                <div className="result-block">
                  <span className="result-block-label">Coût travaux brut</span>
                  <span className="result-block-val">{fmtCur(res.coutBrut)}</span>
                </div>
                <div className="result-block">
                  <span className="result-block-label">Aide MaPrimeRénov'</span>
                  <span className="result-block-val" style={{ color: "#059669" }}>−{fmtCur(res.aideMaprime)}</span>
                </div>
                <div className="result-block">
                  <span className="result-block-label">Coût net des travaux</span>
                  <span className="result-block-val" style={{ fontWeight: 700 }}>{fmtCur(res.coutNet)}</span>
                </div>
              </div>

              <div className="dpe-roi-box" style={{
                background: res.roi < 8 ? "#d1fae5" : res.roi < 15 ? "#fef3c7" : "#fee2e2",
                borderColor: res.roi < 8 ? "#6ee7b7" : res.roi < 15 ? "#fcd34d" : "#fca5a5",
                marginTop: 16
              }}>
                <p className="dpe-roi-label">Retour sur investissement</p>
                <p className="dpe-roi-val">{res.roi < 1 ? "< 1 an" : `${res.roi.toFixed(1)} ans`}</p>
                <p className="dpe-roi-detail">
                  {res.roi < 8 ? "Excellent ROI — les travaux se financent rapidement."
                  : res.roi < 15 ? "ROI acceptable, surtout si vous restez longtemps dans le bien."
                  : "ROI long — cherchez des aides supplémentaires (CEE, Anah, éco-PTZ)."}
                </p>
              </div>

              <p className="sim-detail-note" style={{ marginTop: 12 }}>
                Coûts basés sur des moyennes nationales (source : ADEME). Les prix réels varient selon la région et les entreprises. Demandez plusieurs devis.
              </p>
            </>
          )}
        </div>
      </div>
    </SimLayout>
  );
}
