import { useMemo, useState } from "react";
import SimLayout from "./SimLayout";
import SimCrossSell from "./SimCrossSell";

const fmt = (v) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(v);
const fmtK = (v) => (v >= 1000 ? `${(v / 1000).toFixed(0)}k €` : `${v} €`);

function mortgage(p, r, y) {
  if (p <= 0 || y <= 0) return 0;
  const mr = r / 100 / 12;
  if (mr === 0) return p / (y * 12);
  return (p * mr) / (1 - Math.pow(1 + mr, -(y * 12)));
}

function calcScore(answers) {
  const { revenus, apport, prix, statutScore, horizon, certitude, adminDocs } = answers;

  const apportPct = prix > 0 ? (apport / prix) * 100 : 0;
  const scoreApport = Math.min(100, Math.round((apportPct / 20) * 100));
  const r = 3.5 / 100 / 12, n = 240;
  const mensualite = prix > 0 ? Math.max(0, prix - apport) * r / (1 - Math.pow(1 + r, -n)) : 0;
  const tauxEndet = revenus > 0 ? (mensualite / revenus) * 100 : 100;
  const scoreEndet = Math.max(0, Math.round(((35 - tauxEndet) / 35) * 140));
  const scoreFinances = Math.round((scoreApport + Math.min(100, scoreEndet)) / 2);

  const scoreStabilite = statutScore;

  const scoreHorizon =
    horizon <= 2 ? 10
    : horizon <= 5 ? 30 + (horizon - 2) * 10
    : horizon <= 10 ? 60 + (horizon - 5) * 6
    : 90;
  const scoreCertitude =
    certitude === "certain" ? 100
    : certitude === "plutot" ? 65
    : 25;
  const scoreProjet = Math.round((scoreHorizon + scoreCertitude) / 2);

  const capacite = Math.min(100, Math.round((apport / prix) * 100 * 3));
  const scoreMarche = Math.min(100, capacite);

  const scoreAdmin = Math.round((adminDocs / 3) * 100);

  const overall = Math.round(
    scoreFinances * 0.3 +
    scoreStabilite * 0.2 +
    scoreProjet * 0.2 +
    scoreMarche * 0.15 +
    scoreAdmin * 0.15
  );

  return { overall, scoreFinances, scoreStabilite, scoreProjet, scoreMarche, scoreAdmin, mensualite, tauxEndet, apportPct };
}

const REVENUS_PILLS = [1500, 2000, 2500, 3000, 3500, 4000, 5000];
const APPORT_PILLS = [10000, 20000, 30000, 50000, 80000, 100000];
const PRIX_PILLS = [150000, 200000, 250000, 300000, 400000];

const STATUTS = [
  { label: "CDI confirmé ou Fonctionnaire", sub: "ancienneté > 1 an", score: 100 },
  { label: "CDI en période d'essai", sub: "< 3 mois", score: 55 },
  { label: "Indépendant / Freelance", sub: "3 ans bilans requis", score: 65 },
  { label: "CDD ou autre", sub: "", score: 30 },
];

const ADMIN_DOCS = [
  "J'ai mes 3 derniers relevés de compte",
  "J'ai mes 3 derniers bulletins de salaire / bilans",
  "J'ai mon avis d'imposition des 2 dernières années",
];

function ScoreGauge({ score }) {
  const maxPct = 100;
  const fillPct = Math.min(1, Math.max(0, score / maxPct));
  const r = 70, cx = 100, cy = 90;
  const halfCirc = Math.PI * r;
  const fillLen = fillPct * halfCirc;

  const color =
    score >= 80 ? "#059669"
    : score >= 60 ? "#06b6d4"
    : score >= 40 ? "#f59e0b"
    : "#dc2626";

  return (
    <div style={{ textAlign: "center", margin: "8px 0 16px" }}>
      <svg viewBox="0 0 200 100" style={{ width: "100%", maxWidth: 280, display: "block", margin: "0 auto" }} aria-hidden="true">
        <path d={`M ${cx - r},${cy} A ${r},${r} 0 0,1 ${cx + r},${cy}`} fill="none" stroke="#e2e8f0" strokeWidth="14" strokeLinecap="round"/>
        <path d={`M ${cx - r},${cy} A ${r},${r} 0 0,1 ${cx + r},${cy}`} fill="none" stroke={color} strokeWidth="14" strokeLinecap="round" strokeDasharray={`${fillLen} ${halfCirc}`}/>
        <text x={cx} y={cy - 16} textAnchor="middle" fontSize="36" fontWeight="900" fill={color}>{score}</text>
        <text x={cx} y={cy - 1} textAnchor="middle" fontSize="11" fill="#94a3b8">/ 100</text>
        <text x={cx - r - 4} y={cy + 12} textAnchor="end" fontSize="9" fill="#94a3b8">0</text>
        <text x={cx + r + 4} y={cy + 12} textAnchor="start" fontSize="9" fill="#94a3b8">100</text>
      </svg>
    </div>
  );
}

export default function SimScoreAcheteur() {
  const [step, setStep] = useState(0);
  const [revenus, setRevenus] = useState(3000);
  const [apport, setApport] = useState(30000);
  const [prix, setPrix] = useState(250000);
  const [statut, setStatut] = useState(null);
  const [horizon, setHorizon] = useState(7);
  const [certitude, setCertitude] = useState("plutot");
  const [ville, setVille] = useState("");
  const [adminDocs, setAdminDocs] = useState(0);

  const apportPct = prix > 0 ? ((apport / prix) * 100).toFixed(1) : 0;
  const mensualiteEstimee = mortgage(Math.max(0, prix - apport), 3.5, 20);
  const tauxEndetteEstime = revenus > 0 ? ((mensualiteEstimee / revenus) * 100).toFixed(1) : 0;
  const horizonPct = Math.min(100, ((horizon - 1) / 19) * 100);

  const answers = useMemo(() => ({
    revenus,
    apport,
    prix,
    statutScore: statut?.score ?? 0,
    horizon,
    certitude,
    adminDocs,
  }), [revenus, apport, prix, statut, horizon, certitude, adminDocs]);

  const scores = useMemo(() => {
    if (step < 5) return null;
    return calcScore(answers);
  }, [step, answers]);

  const toggleDoc = (i) => {
    const bit = 1 << i;
    // adminDocs is count 0–3; use a bitmask approach
    setAdminDocs((prev) => {
      const checked = Array.from({ length: 3 }, (_, j) => (prev >> j) & 1);
      checked[i] = checked[i] ? 0 : 1;
      return checked.reduce((s, v, j) => s + v * (1 << j), 0);
    });
  };
  const adminDocCount = Array.from({ length: 3 }, (_, i) => (adminDocs >> i) & 1).reduce((a, b) => a + b, 0);

  const verdictBanner =
    !scores ? null
    : scores.overall >= 80 ? { emoji: "🚀", text: "Vous êtes prêt à acheter — lancez-vous !", color: "#059669", bg: "#f0fdf4" }
    : scores.overall >= 60 ? { emoji: "🔜", text: "Vous êtes presque prêt — voici ce qui manque", color: "#0891b2", bg: "#ecfeff" }
    : scores.overall >= 40 ? { emoji: "⚙️", text: "Encore quelques mois de préparation", color: "#d97706", bg: "#fffbeb" }
    : { emoji: "⏳", text: "Il est trop tôt — voici votre plan d'action", color: "#dc2626", bg: "#fef2f2" };

  const dims = !scores ? [] : [
    { label: "Finances (30%)", score: scores.scoreFinances, advice: `Apport de ${apportPct}%, taux d'endettement de ${scores.tauxEndet.toFixed(1)}%`, color: scores.scoreFinances >= 60 ? "#1a56db" : "#f59e0b" },
    { label: "Stabilité pro (20%)", score: scores.scoreStabilite, advice: scores.scoreStabilite >= 80 ? "Excellent profil pour les banques." : scores.scoreStabilite >= 55 ? "Dossier bancable avec justificatifs." : "Les banques demandent plus de stabilité.", color: scores.scoreStabilite >= 60 ? "#059669" : "#f59e0b" },
    { label: "Projet de vie (20%)", score: scores.scoreProjet, advice: horizon < 5 ? "Horizon court — la location est souvent préférable à moins de 5 ans." : "Horizon suffisant pour amortir les frais d'achat.", color: scores.scoreProjet >= 60 ? "#059669" : "#f59e0b" },
    { label: "Marché (15%)", score: scores.scoreMarche, advice: `Budget apport/prix de ${apportPct}% — visez 20% idéalement.`, color: scores.scoreMarche >= 60 ? "#059669" : "#f59e0b" },
    { label: "Préparation admin (15%)", score: scores.scoreAdmin, advice: adminDocCount === 3 ? "Dossier complet — prêt à soumettre." : `${adminDocCount}/3 documents prêts — complétez votre dossier.`, color: scores.scoreAdmin >= 60 ? "#059669" : "#f59e0b" },
  ];

  const planActions = !scores ? [] : dims
    .filter((d) => d.score < 70)
    .sort((a, b) => a.score - b.score)
    .slice(0, 3)
    .map((d) => ({ label: d.label.split("(")[0].trim(), advice: d.advice }));

  const STEP_LABELS = ["Finances", "Stabilité pro", "Projet de vie", "Le marché", "Documents"];

  return (
    <SimLayout
      icon="⭐"
      title="Êtes-vous vraiment prêt à acheter ?"
      description="Évaluation personnalisée sur 5 dimensions clés avec votre plan d'action"
      suggestions={[
        "/simulateurs/endettement",
        "/simulateurs/pret-immobilier",
        "/simulateurs/frais-notaire",
        "/simulateurs/ptz",
        "/simulateurs/budget-maximum",
        "/simulateurs/stress-test",
      ]}
    >
      <div className="sv2-container">
        <div className="fv2-card" style={{ marginBottom: 20 }}>

          {step < 5 ? (
            <>
              {/* Progress dots */}
              <div className="sv2-quiz-progress">
                {STEP_LABELS.map((lbl, i) => (
                  <div key={i} className={`sv2-quiz-step-dot ${i < step ? "done" : i === step ? "active" : ""}`}/>
                ))}
                <span className="sv2-quiz-label">{STEP_LABELS[step]} — Étape {step + 1}/5</span>
              </div>

              {/* Q1 — Finances */}
              {step === 0 && (
                <div>
                  <h3 style={{ fontSize: 17, fontWeight: 800, color: "#0c1a35", marginBottom: 20 }}>Votre situation financière</h3>

                  <div className="fv2-revenus-wrap" style={{ marginBottom: 20 }}>
                    <p className="fv2-field-label">Revenus nets mensuels</p>
                    <div className="fv2-revenus-input-row">
                      <input type="number" className="fv2-revenus-input" value={revenus || ""} min={0} max={50000} step={100} placeholder="3 000"
                        onChange={(e) => setRevenus(Math.max(0, Number(e.target.value) || 0))}/>
                      <span className="fv2-revenus-unit">€ / mois</span>
                    </div>
                    <div className="fv2-revenus-pills">
                      {REVENUS_PILLS.map((p) => (
                        <button key={p} type="button" className={`fv2-revenus-pill${revenus === p ? " active" : ""}`} onClick={() => setRevenus(p)}>
                          {p.toLocaleString("fr-FR")} €
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="fv2-revenus-wrap" style={{ marginBottom: 20 }}>
                    <p className="fv2-field-label">Apport disponible</p>
                    <div className="fv2-revenus-input-row">
                      <input type="number" className="fv2-revenus-input" value={apport || ""} min={0} max={500000} step={1000} placeholder="30 000"
                        onChange={(e) => setApport(Math.max(0, Number(e.target.value) || 0))}/>
                      <span className="fv2-revenus-unit">€</span>
                    </div>
                    <div className="fv2-revenus-pills">
                      {APPORT_PILLS.map((p) => (
                        <button key={p} type="button" className={`fv2-revenus-pill${apport === p ? " active" : ""}`} onClick={() => setApport(p)}>
                          {fmtK(p)}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="fv2-revenus-wrap" style={{ marginBottom: 20 }}>
                    <p className="fv2-field-label">Prix du bien visé</p>
                    <div className="fv2-revenus-input-row">
                      <input type="number" className="fv2-revenus-input" value={prix || ""} min={0} max={5000000} step={5000} placeholder="250 000"
                        onChange={(e) => setPrix(Math.max(0, Number(e.target.value) || 0))}/>
                      <span className="fv2-revenus-unit">€</span>
                    </div>
                    <div className="fv2-revenus-pills">
                      {PRIX_PILLS.map((p) => (
                        <button key={p} type="button" className={`fv2-revenus-pill${prix === p ? " active" : ""}`} onClick={() => setPrix(p)}>
                          {fmtK(p)}
                        </button>
                      ))}
                    </div>
                  </div>

                  {revenus > 0 && prix > 0 && (
                    <div className="fv2-revenus-estimate">
                      <div className="fv2-revenus-est-item">
                        <span className="fv2-revenus-est-lbl">Apport en % du prix</span>
                        <strong className="fv2-revenus-est-val">{apportPct} %</strong>
                      </div>
                      <div className="fv2-revenus-est-item">
                        <span className="fv2-revenus-est-lbl">Mensualité estimée sur 20 ans</span>
                        <strong className="fv2-revenus-est-val">{fmt(Math.round(mensualiteEstimee))}/mois</strong>
                      </div>
                      <div className="fv2-revenus-est-item">
                        <span className="fv2-revenus-est-lbl">Taux d'endettement estimé</span>
                        <strong className="fv2-revenus-est-val" style={{ color: Number(tauxEndetteEstime) > 35 ? "#dc2626" : "#059669" }}>
                          {tauxEndetteEstime} %
                        </strong>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Q2 — Stabilité pro */}
              {step === 1 && (
                <div>
                  <h3 style={{ fontSize: 17, fontWeight: 800, color: "#0c1a35", marginBottom: 20 }}>Votre situation professionnelle</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {STATUTS.map((s) => (
                      <button
                        key={s.label} type="button"
                        className={`fv2-choice${statut?.label === s.label ? " fv2-choice-active" : ""}`}
                        onClick={() => setStatut(s)}
                        style={{ textAlign: "left" }}
                      >
                        <span className="fv2-choice-body">
                          <span className="fv2-choice-label">{s.label}</span>
                          {s.sub && <span className="fv2-choice-sub">{s.sub}</span>}
                        </span>
                        {statut?.label === s.label && (
                          <span className="fv2-choice-check" aria-hidden="true">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                              <circle cx="8" cy="8" r="7" fill="#1a56db"/>
                              <path d="M5 8l2.5 2.5L11 5.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Q3 — Projet de vie */}
              {step === 2 && (
                <div>
                  <h3 style={{ fontSize: 17, fontWeight: 800, color: "#0c1a35", marginBottom: 20 }}>Votre projet de vie</h3>

                  <div style={{ marginBottom: 24 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                      <p className="fv2-field-label" style={{ margin: 0 }}>Durée prévue dans ce bien</p>
                      <span style={{ fontSize: 22, fontWeight: 900, color: "#0c1a35" }}>{horizon} ans</span>
                    </div>
                    <div className="fv2-slider-track-wrap" style={{ "--pct": `${horizonPct}%` }}>
                      <input type="range" className="fv2-slider" min={1} max={20} step={1} value={horizon}
                        onChange={(e) => setHorizon(Number(e.target.value))}/>
                      <div className="fv2-slider-fill" style={{ width: `${horizonPct}%` }}/>
                    </div>
                    <div className="fv2-slider-minmax"><span>1 an</span><span>20 ans</span></div>
                    {horizon < 5 && (
                      <p className="fv2-hint" style={{ color: "#d97706", fontWeight: 600 }}>
                        Moins de 5 ans : la location est généralement préférable.
                      </p>
                    )}
                  </div>

                  <p className="fv2-field-label" style={{ marginBottom: 10 }}>Certitude de votre projet</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {[
                      { val: "certain", label: "Très certain", sub: "Décision prise, on avance !" },
                      { val: "plutot", label: "Plutôt certain", sub: "Projet bien avancé" },
                      { val: "hesitant", label: "Encore hésitant", sub: "Je compare encore les options" },
                    ].map((opt) => (
                      <button
                        key={opt.val} type="button"
                        className={`fv2-choice${certitude === opt.val ? " fv2-choice-active" : ""}`}
                        onClick={() => setCertitude(opt.val)}
                        style={{ textAlign: "left" }}
                      >
                        <span className="fv2-choice-body">
                          <span className="fv2-choice-label">{opt.label}</span>
                          <span className="fv2-choice-sub">{opt.sub}</span>
                        </span>
                        {certitude === opt.val && (
                          <span className="fv2-choice-check" aria-hidden="true">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                              <circle cx="8" cy="8" r="7" fill="#1a56db"/>
                              <path d="M5 8l2.5 2.5L11 5.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Q4 — Le marché */}
              {step === 3 && (
                <div>
                  <h3 style={{ fontSize: 17, fontWeight: 800, color: "#0c1a35", marginBottom: 20 }}>Le marché immobilier</h3>

                  <div className="fv2-revenus-estimate" style={{ marginBottom: 20 }}>
                    <div className="fv2-revenus-est-item">
                      <span className="fv2-revenus-est-lbl">Budget total disponible</span>
                      <strong className="fv2-revenus-est-val">{fmt(prix)}</strong>
                    </div>
                    <div className="fv2-revenus-est-item">
                      <span className="fv2-revenus-est-lbl">Surface équivalente (3 000 €/m²)</span>
                      <strong className="fv2-revenus-est-val">{Math.round(prix / 3000)} m²</strong>
                    </div>
                  </div>

                  <p className="fv2-hint" style={{ marginBottom: 20 }}>
                    À 3 000 €/m² (moyenne nationale France), votre budget correspond à environ{" "}
                    <strong>{Math.round(prix / 3000)} m²</strong>. En Île-de-France, ce serait ~{Math.round(prix / 9500)} m².
                  </p>

                  <div className="fv2-revenus-wrap">
                    <p className="fv2-field-label">Ville cible (optionnel)</p>
                    <input
                      type="text"
                      style={{ width: "100%", padding: "12px 14px", border: "1.5px solid #d1dae8", borderRadius: 12, fontSize: 15, fontFamily: "inherit", outline: "none", background: "#f8fafc" }}
                      placeholder="Ex : Lyon, Bordeaux…"
                      value={ville}
                      onChange={(e) => setVille(e.target.value)}
                    />
                  </div>
                </div>
              )}

              {/* Q5 — Préparation admin */}
              {step === 4 && (
                <div>
                  <h3 style={{ fontSize: 17, fontWeight: 800, color: "#0c1a35", marginBottom: 20 }}>Préparation administrative</h3>
                  <p className="fv2-hint" style={{ marginBottom: 16 }}>Cochez les documents que vous avez déjà prêts :</p>
                  <div className="sv2-checklist">
                    {ADMIN_DOCS.map((doc, i) => {
                      const checked = !!((adminDocs >> i) & 1);
                      return (
                        <div key={i} className={`sv2-check-item${checked ? " checked" : ""}`} onClick={() => toggleDoc(i)}>
                          <div className="sv2-check-box">
                            {checked && (
                              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                <path d="M2 7l3.5 3.5L12 4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            )}
                          </div>
                          <span className="sv2-check-text">{doc}</span>
                        </div>
                      );
                    })}
                  </div>
                  {adminDocCount > 0 && (
                    <p className="fv2-hint" style={{ marginTop: 12, color: "#059669", fontWeight: 600 }}>
                      {adminDocCount}/3 documents prêts — {adminDocCount === 3 ? "dossier complet !" : "continuez ainsi."}
                    </p>
                  )}
                </div>
              )}

              {/* Navigation */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 28 }}>
                {step > 0 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    style={{ padding: "10px 20px", background: "#f1f5f9", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer", color: "#475569", fontFamily: "inherit" }}
                  >
                    ← Retour
                  </button>
                ) : <span/>}
                <button
                  type="button"
                  className="btn-primary fv2-cta"
                  onClick={() => setStep(step + 1)}
                  disabled={step === 1 && !statut}
                >
                  {step === 4 ? "Voir mon score →" : "Continuer →"}
                </button>
              </div>
            </>
          ) : (
            /* ── Results ── */
            <>
              {scores && (
                <>
                  {/* Score gauge */}
                  <div className="sv2-score-gauge">
                    <ScoreGauge score={scores.overall}/>
                    <div className="sv2-score-label">Score d'acheteur</div>
                  </div>

                  {/* Verdict banner */}
                  {verdictBanner && (
                    <div style={{ background: verdictBanner.bg, color: verdictBanner.color, borderRadius: 14, padding: "16px 20px", marginBottom: 20, fontWeight: 700, fontSize: 15, textAlign: "center" }}>
                      {verdictBanner.emoji} {verdictBanner.text}
                    </div>
                  )}

                  {/* 5 dimension scores */}
                  <div className="sv2-dims">
                    {dims.map((d) => (
                      <div key={d.label} className="sv2-dim">
                        <div className="sv2-dim-header">
                          <span className="sv2-dim-label">{d.label}</span>
                          <span className="sv2-dim-score" style={{ color: d.color }}>{d.score}/100</span>
                        </div>
                        <div className="sv2-dim-bar-track">
                          <div className="sv2-dim-bar-fill" style={{ width: `${d.score}%`, background: d.color }}/>
                        </div>
                        <div className="sv2-dim-advice">{d.advice}</div>
                      </div>
                    ))}
                  </div>

                  {/* Plan d'action */}
                  {planActions.length > 0 && (
                    <div className="sv2-plan">
                      <div className="sv2-plan-title">🎯 Votre plan d'action prioritaire</div>
                      <div className="sv2-plan-actions">
                        {planActions.map((action, i) => (
                          <div key={i} className="sv2-plan-action">
                            <div className="sv2-plan-action-num">{i + 1}</div>
                            <div><strong>{action.label} :</strong> {action.advice}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Restart */}
                  <button type="button" className="sv2-restart-btn" onClick={() => { setStep(0); setStatut(null); setAdminDocs(0); }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M2 8a6 6 0 1 1 1.5 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                      <path d="M2 12V8h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Recommencer l'évaluation
                  </button>
                </>
              )}
            </>
          )}
        </div>

        {scores && (
          <SimCrossSell
            show={scores.overall >= 60}
            loan={Math.max(0, prix - apport)}
            taux={3.5}
            dureeCredit={20}
          />
        )}
      </div>
    </SimLayout>
  );
}
