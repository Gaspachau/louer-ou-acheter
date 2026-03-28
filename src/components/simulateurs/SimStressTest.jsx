import { useMemo, useState } from "react";
import SimLayout from "./SimLayout";
import Field from "../Field";

const fmtCur = (v) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(v);

function calcMensualite(capital, taux, dureeAns) {
  if (capital <= 0 || dureeAns <= 0) return 0;
  const r = taux / 100 / 12;
  const n = dureeAns * 12;
  return r === 0 ? capital / n : (capital * r) / (1 - Math.pow(1 + r, -n));
}

function ScenarioCard({ emoji, title, subtitle, baseMens, newMens, impact, severity, detail, children }) {
  const colors = {
    safe: { bg: "#d1fae5", border: "#6ee7b7", accent: "#059669", label: "Résistant" },
    warning: { bg: "#fef3c7", border: "#fcd34d", accent: "#d97706", label: "Fragile" },
    danger: { bg: "#fee2e2", border: "#fca5a5", accent: "#dc2626", label: "Critique" },
  };
  const c = colors[severity] || colors.safe;

  return (
    <div className="stress-card" style={{ borderColor: c.border, background: c.bg }}>
      <div className="stress-card-header">
        <span className="stress-card-emoji">{emoji}</span>
        <div>
          <p className="stress-card-title">{title}</p>
          <p className="stress-card-subtitle">{subtitle}</p>
        </div>
        <span className="stress-badge" style={{ color: c.accent, borderColor: c.accent }}>
          {c.label}
        </span>
      </div>
      {children}
      <div className="stress-impact">
        <div className="stress-impact-row">
          <span>Mensualité actuelle</span>
          <strong>{fmtCur(baseMens)}/mois</strong>
        </div>
        <div className="stress-impact-row">
          <span>Mensualité sous stress</span>
          <strong style={{ color: c.accent }}>{fmtCur(newMens)}/mois</strong>
        </div>
        <div className="stress-impact-row stress-impact-delta">
          <span>Surcoût mensuel</span>
          <strong style={{ color: c.accent }}>+{fmtCur(impact)}/mois</strong>
        </div>
      </div>
      <p className="stress-detail">{detail}</p>
    </div>
  );
}

function ScoreMeter({ score }) {
  const level = score >= 70 ? { label: "Résilient", color: "#059669" }
    : score >= 40 ? { label: "Fragile", color: "#d97706" }
    : { label: "Vulnérable", color: "#dc2626" };

  return (
    <div className="stress-score-wrap">
      <p className="stress-score-label">Score de résilience financière</p>
      <div className="stress-score-number" style={{ color: level.color }}>
        {score}<span>/100</span>
      </div>
      <div className="stress-score-bar-track">
        <div className="stress-score-bar-fill" style={{ width: `${score}%`, background: level.color }} />
        <div className="stress-score-bar-fill-glow" style={{ left: `${score}%`, background: level.color }} />
      </div>
      <p className="stress-score-verdict" style={{ color: level.color }}>{level.label}</p>
    </div>
  );
}

export default function SimStressTest() {
  const [v, setV] = useState({
    prixBien: 280000,
    apport: 50000,
    taux: 3.8,
    duree: 20,
    revenus: 4200,
    epargneReserve: 12000,
  });

  // Stress sliders
  const [hausseT, setHausseT] = useState(1.5); // +taux en points
  const [baisseMarche, setBaisseMarche] = useState(15); // % de baisse
  const [baisseRevenu, setBaisseRevenu] = useState(25); // % de perte revenus

  const set = (k) => (val) => setV((s) => ({ ...s, [k]: val }));

  const res = useMemo(() => {
    const { prixBien, apport, taux, duree, revenus, epargneReserve } = v;
    const capital = Math.max(0, prixBien * 1.08 - apport);
    const mensBase = calcMensualite(capital, taux, duree);

    // Scenario A: Taux monte
    const mensHausse = calcMensualite(capital, taux + hausseT, duree);
    const impactTaux = mensHausse - mensBase;
    const endetmentApresHausse = revenus > 0 ? (mensHausse / revenus) * 100 : 0;
    const sevA = endetmentApresHausse > 40 ? "danger" : endetmentApresHausse > 35 ? "warning" : "safe";
    const scoreA = Math.max(0, Math.min(100, 100 - (endetmentApresHausse - 20) * 3));

    // Scenario B: Marché baisse
    const valeurApres = prixBien * (1 - baisseMarche / 100);
    const capitalRestantDu = capital; // conservatif: début de crédit
    const equite = valeurApres - capitalRestantDu;
    const equiteNegative = equite < 0;
    const sevB = equiteNegative ? "danger" : equite < prixBien * 0.05 ? "warning" : "safe";
    const scoreB = Math.max(0, Math.min(100, equite / prixBien * 100 + 50));

    // Scenario C: Perte de revenus
    const nouveauxRevenus = revenus * (1 - baisseRevenu / 100);
    const mensurCrise = mensBase;
    const endetCrise = nouveauxRevenus > 0 ? (mensurCrise / nouveauxRevenus) * 100 : 100;
    const moisCouvert = epargneReserve / mensBase;
    const sevC = endetCrise > 50 ? "danger" : endetCrise > 40 ? "warning" : "safe";
    const scoreC = Math.min(100, Math.max(0, moisCouvert / 6 * 100));

    const score = Math.round((scoreA * 0.4 + scoreB * 0.3 + scoreC * 0.3));

    return {
      mensBase, mensHausse, impactTaux, endetmentApresHausse, sevA,
      valeurApres, equite, equiteNegative, sevB,
      nouveauxRevenus, endetCrise, moisCouvert, sevC,
      score,
    };
  }, [v, hausseT, baisseMarche, baisseRevenu]);

  return (
    <SimLayout
      icon="🛡️"
      title="Test de résistance financière"
      description="Votre projet immobilier résiste-t-il à l'adversité ? Simulez 3 scénarios de crise et mesurez votre résilience."
    >
      <div className="sim-layout">
        {/* Form */}
        <div className="sim-card">
          <p className="sim-card-legend">Votre projet de base</p>
          <div className="step-fields">
            <Field label="Prix du bien" value={v.prixBien} onChange={set("prixBien")} suffix="€" />
            <Field label="Apport personnel" value={v.apport} onChange={set("apport")} suffix="€" />
            <Field label="Taux actuel" value={v.taux} onChange={set("taux")} suffix="%" step="0.1" />
            <Field label="Durée du prêt" value={v.duree} onChange={set("duree")} suffix="ans" />
            <Field label="Revenus mensuels nets" value={v.revenus} onChange={set("revenus")} suffix="€" />
            <Field label="Réserve d'épargne" value={v.epargneReserve} onChange={set("epargneReserve")} suffix="€"
              hint="Capital disponible après achat" />
          </div>

          <p className="sim-card-legend" style={{ marginTop: 20 }}>Scénarios de stress — ajustez l'intensité</p>

          <div className="stress-slider-section">
            <div className="horizon-box" style={{ background: "#fff7ed", borderColor: "#fed7aa" }}>
              <div className="horizon-row">
                <div>
                  <p className="horizon-label">📈 Hausse des taux</p>
                  <p className="horizon-explain">Le taux de votre crédit monte de {hausseT.toFixed(1)} point{hausseT >= 2 ? "s" : ""}</p>
                </div>
                <strong className="horizon-value" style={{ color: "#d97706" }}>+{hausseT.toFixed(1)} %</strong>
              </div>
              <input type="range" min="0.5" max="4" step="0.5" value={hausseT}
                onChange={(e) => setHausseT(Number(e.target.value))}
                style={{ "--range-pct": `${((hausseT - 0.5) / 3.5) * 100}%` }}
                aria-label={`Hausse taux : +${hausseT}%`} />
              <div className="horizon-ticks"><span>+0,5 %</span><span>+2 %</span><span>+4 %</span></div>
            </div>

            <div className="horizon-box" style={{ background: "#fef2f2", borderColor: "#fecaca", marginTop: 10 }}>
              <div className="horizon-row">
                <div>
                  <p className="horizon-label">📉 Chute du marché immo</p>
                  <p className="horizon-explain">La valeur du bien baisse de {baisseMarche} %</p>
                </div>
                <strong className="horizon-value" style={{ color: "#dc2626" }}>-{baisseMarche} %</strong>
              </div>
              <input type="range" min="5" max="40" step="5" value={baisseMarche}
                onChange={(e) => setBaisseMarche(Number(e.target.value))}
                style={{ "--range-pct": `${((baisseMarche - 5) / 35) * 100}%` }}
                aria-label={`Chute marché : -${baisseMarche}%`} />
              <div className="horizon-ticks"><span>-5 %</span><span>-20 %</span><span>-40 %</span></div>
            </div>

            <div className="horizon-box" style={{ background: "#f5f3ff", borderColor: "#ddd6fe", marginTop: 10 }}>
              <div className="horizon-row">
                <div>
                  <p className="horizon-label">💼 Perte de revenus</p>
                  <p className="horizon-explain">Vos revenus baissent de {baisseRevenu} % (chômage partiel, accident...)</p>
                </div>
                <strong className="horizon-value" style={{ color: "#7c3aed" }}>-{baisseRevenu} %</strong>
              </div>
              <input type="range" min="10" max="60" step="5" value={baisseRevenu}
                onChange={(e) => setBaisseRevenu(Number(e.target.value))}
                style={{ "--range-pct": `${((baisseRevenu - 10) / 50) * 100}%` }}
                aria-label={`Perte revenus : -${baisseRevenu}%`} />
              <div className="horizon-ticks"><span>-10 %</span><span>-35 %</span><span>-60 %</span></div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="sim-results-panel">
          {!res ? null : (
            <>
              <ScoreMeter score={res.score} />

              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 20 }}>
                {/* Hausse taux */}
                <ScenarioCard
                  emoji="📈"
                  title={`Hausse de taux +${hausseT.toFixed(1)}%`}
                  subtitle={`Taux de ${v.taux}% → ${(v.taux + hausseT).toFixed(1)}%`}
                  baseMens={res.mensBase}
                  newMens={res.mensHausse}
                  impact={res.impactTaux}
                  severity={res.sevA}
                  detail={`Taux d'endettement après hausse : ${res.endetmentApresHausse.toFixed(1)}%. ${res.endetmentApresHausse > 35 ? "Dépasse le seuil HCSF de 35% — refinancement difficile." : "Reste sous le seuil HCSF."}`}
                >
                  <p style={{ fontSize: 12, color: "var(--muted)", margin: "4px 0 8px" }}>
                    Hausse de {hausseT.toFixed(1)} point{hausseT >= 2 ? "s" : ""} de taux
                  </p>
                </ScenarioCard>

                {/* Baisse marché */}
                <ScenarioCard
                  emoji="📉"
                  title={`Chute du marché -${baisseMarche}%`}
                  subtitle={`Bien à ${fmtCur(v.prixBien)} → ${fmtCur(res.valeurApres)}`}
                  baseMens={res.mensBase}
                  newMens={res.mensBase}
                  impact={0}
                  severity={res.sevB}
                  detail={res.equiteNegative
                    ? `Équité négative : le bien vaut moins que ce que vous devez (${fmtCur(res.equite)}). Revendre signifierait une perte nette.`
                    : `Équité résiduelle : ${fmtCur(res.equite)} — vous restez en territoire positif malgré la baisse.`}
                >
                  <p style={{ fontSize: 12, color: "var(--muted)", margin: "4px 0 8px" }}>
                    Impact sur la valeur patrimoniale — la mensualité ne change pas
                  </p>
                </ScenarioCard>

                {/* Perte revenus */}
                <ScenarioCard
                  emoji="💼"
                  title={`Perte de revenus -${baisseRevenu}%`}
                  subtitle={`${fmtCur(v.revenus)} → ${fmtCur(res.nouveauxRevenus)}/mois`}
                  baseMens={res.mensBase}
                  newMens={res.mensBase}
                  impact={0}
                  severity={res.sevC}
                  detail={`Taux d'endettement sur nouveaux revenus : ${res.endetCrise.toFixed(1)}%. Votre réserve couvre ${res.moisCouvert.toFixed(1)} mois de crédit. ${res.moisCouvert < 3 ? "Constituez au moins 3 mois de réserve avant d'acheter." : res.moisCouvert < 6 ? "Réserve acceptable — visez 6 mois idéalement." : "Excellente réserve d'urgence."}`}
                >
                  <p style={{ fontSize: 12, color: "var(--muted)", margin: "4px 0 8px" }}>
                    Impact sur le taux d'endettement et la durée de réserve
                  </p>
                </ScenarioCard>
              </div>
            </>
          )}
        </div>
      </div>
    </SimLayout>
  );
}
