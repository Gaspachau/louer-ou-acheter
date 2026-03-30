import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import TopBar from "./TopBar";
import Footer from "./Footer";
import { computeComparison } from "../utils/finance";
import { useSEO } from "../utils/useSEO";

const SCENARIOS = [
  {
    id: 1,
    name: "Marie", age: 32, job: "Infirmière en CDI", city: "Lyon",
    income: 2800, emoji: "👩‍⚕️", rentNow: 850, horizon: 10,
    property: {
      purchasePrice: 245000, downPayment: 35000, mortgageRate: 3.5, mortgageYears: 20,
      notaryFeesPct: 8, annualPropertyTax: 1480, annualMaintenancePct: 1, annualInsurance: 450,
      appreciationRate: 2.5, saleCostsPct: 5, monthlyRent: 850, annualRentIncrease: 2,
      investmentReturn: 3.5, comparisonYears: 10, monthlySavings: 200,
    },
    context: "CDI depuis 5 ans, apport de 35 000 €. Loue un T2 à Lyon. Envisage d'y rester longtemps.",
    lesson: "Lyon a corrigé ses prix en 2024-2025 — à 4 600 €/m², l'achat redevient intéressant sur 10+ ans avec un bon apport.",
  },
  {
    id: 2,
    name: "Thomas", age: 28, job: "Dev senior", city: "Paris",
    income: 4800, emoji: "👨‍💻", rentNow: 1450, horizon: 7,
    property: {
      purchasePrice: 395000, downPayment: 42000, mortgageRate: 3.6, mortgageYears: 25,
      notaryFeesPct: 8, annualPropertyTax: 2300, annualMaintenancePct: 1, annualInsurance: 500,
      appreciationRate: 1.2, saleCostsPct: 5, monthlyRent: 1450, annualRentIncrease: 2,
      investmentReturn: 5, comparisonYears: 7, monthlySavings: 500,
    },
    context: "Studio Paris 11e. Risque de mobilité pro (startup). Apport de 42 000 € (11%). Horizon flou.",
    lesson: "À Paris, le ratio prix/loyer reste défavorable à l'achat sur moins de 12 ans. La mobilité professionnelle aggrave la situation.",
  },
  {
    id: 3,
    name: "Sophie & Marc", age: 38, job: "Couple fonctionnaires", city: "Bordeaux",
    income: 6200, emoji: "👫", rentNow: 1100, horizon: 15,
    property: {
      purchasePrice: 315000, downPayment: 70000, mortgageRate: 3.4, mortgageYears: 20,
      notaryFeesPct: 8, annualPropertyTax: 1320, annualMaintenancePct: 1, annualInsurance: 500,
      appreciationRate: 1.8, saleCostsPct: 5, monthlyRent: 1100, annualRentIncrease: 1.5,
      investmentReturn: 3, comparisonYears: 15, monthlySavings: 400,
    },
    context: "2 enfants, stabilité garantie, 70 000 € d'apport (22%). Veulent rester 15+ ans à Bordeaux.",
    lesson: "Couple stable sur longue durée avec bon apport : l'achat l'emporte presque toujours. Les fonctionnaires ont aussi accès au PEL et prêts aidés.",
  },
  {
    id: 4,
    name: "Julie", age: 24, job: "Étudiante en master", city: "Toulouse",
    income: 1200, emoji: "👩‍🎓", rentNow: 580, horizon: 4,
    property: {
      purchasePrice: 162000, downPayment: 17000, mortgageRate: 3.8, mortgageYears: 25,
      notaryFeesPct: 8, annualPropertyTax: 1170, annualMaintenancePct: 1.5, annualInsurance: 300,
      appreciationRate: 2, saleCostsPct: 5, monthlyRent: 580, annualRentIncrease: 2,
      investmentReturn: 4, comparisonYears: 4, monthlySavings: 0,
    },
    context: "Finit son master dans 18 mois. Incertitude totale sur la ville post-études. 17 000 € d'épargne.",
    lesson: "Sur 4 ans, les frais de notaire (~13 000 €) ne sont jamais amortis. En cas d'incertitude sur la ville, louer reste la règle.",
  },
  {
    id: 5,
    name: "Michel", age: 55, job: "Commercial indépendant", city: "Nantes",
    income: 3800, emoji: "👨‍💼", rentNow: 950, horizon: 15,
    property: {
      purchasePrice: 273000, downPayment: 87000, mortgageRate: 3.7, mortgageYears: 15,
      notaryFeesPct: 8, annualPropertyTax: 1270, annualMaintenancePct: 1, annualInsurance: 600,
      appreciationRate: 2, saleCostsPct: 5, monthlyRent: 950, annualRentIncrease: 2,
      investmentReturn: 3.5, comparisonYears: 15, monthlySavings: 300,
    },
    context: "Revenu variable, apport de 87 000 € (32%). Veut un patrimoine solide pour la retraite.",
    lesson: "Un fort apport compense un revenu variable. Sur 15 ans et avec 30%+ d'apport, l'achat crée systématiquement plus de patrimoine.",
  },
  {
    id: 6,
    name: "Emma", age: 45, job: "Cadre seule avec enfant", city: "Lille",
    income: 3200, emoji: "👩‍💻", rentNow: 850, horizon: 12,
    property: {
      purchasePrice: 240000, downPayment: 50000, mortgageRate: 3.5, mortgageYears: 20,
      notaryFeesPct: 8, annualPropertyTax: 1080, annualMaintenancePct: 1.2, annualInsurance: 450,
      appreciationRate: 1.9, saleCostsPct: 5, monthlyRent: 850, annualRentIncrease: 2,
      investmentReturn: 3, comparisonYears: 12, monthlySavings: 250,
    },
    context: "Divorcée, 1 enfant. Maison à Lille. Apport de 50 000 € issu du partage. Stabilité dans la ville.",
    lesson: "Lille affiche parmi les meilleurs ratios prix/loyer des grandes villes françaises. Pour une famille stable, l'achat est souvent optimal dès 8-10 ans.",
  },
  {
    id: 7,
    name: "Arnaud", age: 35, job: "Médecin libéral", city: "Nice",
    income: 7500, emoji: "👨‍⚕️", rentNow: 1600, horizon: 10,
    property: {
      purchasePrice: 468000, downPayment: 70000, mortgageRate: 3.5, mortgageYears: 20,
      notaryFeesPct: 8, annualPropertyTax: 1640, annualMaintenancePct: 1, annualInsurance: 700,
      appreciationRate: 2.2, saleCostsPct: 5, monthlyRent: 1600, annualRentIncrease: 2,
      investmentReturn: 5, comparisonYears: 10, monthlySavings: 1000,
    },
    context: "Cabinet établi à Nice. Apport de 70 000 € (15%). Investit en bourse (rendement 5%/an). Horizon 10 ans.",
    lesson: "À Nice, le prix élevé au m² (5 200 €) et un bon rendement alternatif peuvent rendre la location compétitive, surtout avec un horizon de 10 ans.",
  },
  {
    id: 8,
    name: "Pauline & Rémi", age: 30, job: "Jeunes actifs", city: "Rennes",
    income: 4600, emoji: "💑", rentNow: 900, horizon: 15,
    property: {
      purchasePrice: 259000, downPayment: 40000, mortgageRate: 3.5, mortgageYears: 20,
      notaryFeesPct: 8, annualPropertyTax: 1220, annualMaintenancePct: 1, annualInsurance: 500,
      appreciationRate: 2.1, saleCostsPct: 5, monthlyRent: 900, annualRentIncrease: 2,
      investmentReturn: 3.5, comparisonYears: 15, monthlySavings: 350,
    },
    context: "Tous deux en CDI à Rennes. 40 000 € d'apport (15%). Projet enfants. Horizon 15 ans.",
    lesson: "Rennes a corrigé ses prix (-5% en 2025). Avec deux CDI et 15 ans d'horizon, la dynamique de la ville favorise l'achat.",
  },
  {
    id: 9,
    name: "Jean-Pierre", age: 60, job: "Pré-retraite", city: "Marseille",
    income: 2600, emoji: "👴", rentNow: 750, horizon: 8,
    property: {
      purchasePrice: 170000, downPayment: 85000, mortgageRate: 3.9, mortgageYears: 10,
      notaryFeesPct: 8, annualPropertyTax: 1100, annualMaintenancePct: 1.5, annualInsurance: 500,
      appreciationRate: 2.8, saleCostsPct: 5, monthlyRent: 750, annualRentIncrease: 1.8,
      investmentReturn: 2.5, comparisonYears: 8, monthlySavings: 100,
    },
    context: "Retraite dans 5 ans. Apport de 85 000 € (50%). Veut un bien à lui pour ses vieux jours.",
    lesson: "Un apport massif (50%) réduit fortement la mensualité. Sur 8 ans, même un horizon court devient rentable si les coûts de crédit sont minimisés.",
  },
  {
    id: 10,
    name: "Sarah", age: 27, job: "Freelance", city: "Strasbourg",
    income: 2900, emoji: "💻", rentNow: 700, horizon: 6,
    property: {
      purchasePrice: 175000, downPayment: 25000, mortgageRate: 4.0, mortgageYears: 25,
      notaryFeesPct: 8, annualPropertyTax: 1120, annualMaintenancePct: 1.2, annualInsurance: 350,
      appreciationRate: 1.8, saleCostsPct: 5, monthlyRent: 700, annualRentIncrease: 1.5,
      investmentReturn: 4.5, comparisonYears: 6, monthlySavings: 150,
    },
    context: "Freelance, revenus irréguliers. Studio à Strasbourg. Apport de 25 000 € (14%). Horizon 6 ans.",
    lesson: "Les banques sont réticentes avec les freelances et appliquent des conditions moins favorables. Sur 6 ans, l'incertitude des revenus + les frais initiaux pénalisent l'achat.",
  },
];

function getGrade(pct) {
  if (pct >= 80) return { label: "Gourou de l'Immobilier", emoji: "🏆", color: "#f59e0b", desc: "Exceptionnel ! Votre instinct immobilier est au niveau des experts patrimoniaux." };
  if (pct >= 50) return { label: "Expert Immobilier", emoji: "🎯", color: "#1a56db", desc: "Très bien ! Vous maîtrisez les principaux facteurs de la décision louer/acheter." };
  return { label: "Apprenti Immobilier", emoji: "📚", color: "#059669", desc: "Bon début ! Le simulateur va vous aider à affiner votre intuition financière." };
}

const fmt = (v) => new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(v);

export default function PageJeu() {
  useSEO({ title: "ImmoMaestro — Le Jeu Immobilier — Testez vos Connaissances", description: "Saurez-vous dire s'il vaut mieux louer ou acheter ? 10 scénarios réels, 3 niveaux, bonus de vitesse. Devenez Gourou de l'Immobilier !", path: "/jeu" });
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState("intro"); // 'intro' | 'guess' | 'reveal' | 'done'
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [result, setResult] = useState(null);
  const [shake, setShake] = useState(false);
  const [pop, setPop] = useState(null); // 'correct' | 'wrong'

  const scenario = SCENARIOS[idx];
  const maxScore = SCENARIOS.length * 15; // 10 correct + 5 speed

  useEffect(() => {
    if (phase === "guess") {
      setStartTime(Date.now());
      setResult(null);
    }
  }, [phase, idx]);

  const handleGuess = useCallback((guess) => {
    if (phase !== "guess") return;
    const elapsed = (Date.now() - startTime) / 1000;
    const calc = computeComparison(scenario.property);
    const isBuyingBetter = calc.isBuyingBetter ?? (calc.buyNetWorth > calc.rentNetWorth);
    const correct = isBuyingBetter ? "acheter" : "louer";
    const isCorrect = guess === correct;
    const speedBonus = isCorrect && elapsed <= 6;
    const pts = isCorrect ? (speedBonus ? 15 : 10) : 0;

    const ans = { id: scenario.id, guess, correct, isCorrect, pts, elapsed, speedBonus, calc, isBuyingBetter };
    setResult(ans);
    setScore((p) => p + pts);
    setAnswers((p) => [...p, ans]);
    setPop(isCorrect ? "correct" : "wrong");
    setTimeout(() => setPop(null), 700);
    if (!isCorrect) { setShake(true); setTimeout(() => setShake(false), 500); }
    setPhase("reveal");
  }, [phase, startTime, scenario]);

  function next() {
    if (idx < SCENARIOS.length - 1) {
      setIdx((p) => p + 1);
      setPhase("guess");
    } else {
      setPhase("done");
    }
  }

  function replay() {
    setIdx(0);
    setPhase("intro");
    setAnswers([]);
    setScore(0);
    setStartTime(null);
    setResult(null);
  }

  const grade = getGrade(answers.length > 0 ? (score / (answers.length * 15)) * 100 : 0);
  const finalGrade = getGrade((score / maxScore) * 100);

  return (
    <div className="page">
      <TopBar />

      <div className="im-page">

        {/* ── INTRO ─── */}
        {phase === "intro" && (
          <div className="im-intro">
            <div className="im-intro-badge">🏆 ImmoMaestro</div>
            <h1 className="im-intro-title">
              Avez-vous l'instinct<br />
              <span className="im-intro-accent">immobilier ?</span>
            </h1>
            <p className="im-intro-sub">
              10 profils réels, 1 décision : <strong>Louer</strong> ou <strong>Acheter</strong> ?<br />
              Le simulateur calcule la vraie réponse. Voyez si vous la devinez.
            </p>
            <div className="im-intro-levels">
              <div className="im-intro-level">
                <span className="im-intro-level-emoji">📚</span>
                <span>Apprenti</span>
              </div>
              <span className="im-intro-level-arrow">→</span>
              <div className="im-intro-level">
                <span className="im-intro-level-emoji">🎯</span>
                <span>Expert</span>
              </div>
              <span className="im-intro-level-arrow">→</span>
              <div className="im-intro-level">
                <span className="im-intro-level-emoji">🏆</span>
                <span>Gourou</span>
              </div>
            </div>
            <button className="im-start-btn" onClick={() => setPhase("guess")}>
              Commencer le défi →
            </button>
            <p className="im-intro-hint">~5 minutes · Sans inscription · Explications après chaque cas</p>
          </div>
        )}

        {/* ── GAME ─── */}
        {(phase === "guess" || phase === "reveal") && (
          <div className="im-game">
            {/* Header bar */}
            <div className="im-header">
              <div className="im-progress-wrap">
                <div className="im-progress-track">
                  <div
                    className="im-progress-fill"
                    style={{ width: `${((idx + (phase === "reveal" ? 1 : 0)) / SCENARIOS.length) * 100}%` }}
                  />
                </div>
                <span className="im-progress-label">{idx + 1} / {SCENARIOS.length}</span>
              </div>
              <div className="im-score-chip">
                <span className="im-score-icon">⚡</span>
                {score} pts
              </div>
            </div>

            {/* Scenario card */}
            <div className={`im-card${shake ? " im-shake" : ""}`}>
              <div className="im-card-person">
                <div className="im-avatar">{scenario.emoji}</div>
                <div className="im-card-info">
                  <div className="im-card-name">{scenario.name}</div>
                  <div className="im-card-meta">{scenario.age} ans · {scenario.job}</div>
                </div>
                <div className="im-city-tag">📍 {scenario.city}</div>
              </div>

              <div className="im-card-stats">
                <div className="im-stat">
                  <span className="im-stat-lbl">Revenu</span>
                  <span className="im-stat-val">{fmt(scenario.income)}/mois</span>
                </div>
                <div className="im-stat">
                  <span className="im-stat-lbl">Loyer actuel</span>
                  <span className="im-stat-val">{fmt(scenario.rentNow)}/mois</span>
                </div>
                <div className="im-stat">
                  <span className="im-stat-lbl">Prix du bien</span>
                  <span className="im-stat-val">{fmt(scenario.property.purchasePrice)}</span>
                </div>
                <div className="im-stat">
                  <span className="im-stat-lbl">Apport</span>
                  <span className="im-stat-val">{fmt(scenario.property.downPayment)} ({Math.round(scenario.property.downPayment / scenario.property.purchasePrice * 100)}%)</span>
                </div>
                <div className="im-stat im-stat-full">
                  <span className="im-stat-lbl">Horizon envisagé</span>
                  <span className="im-stat-val">{scenario.horizon} ans</span>
                </div>
              </div>

              <div className="im-context">{scenario.context}</div>
            </div>

            {/* Guess buttons */}
            {phase === "guess" && (
              <div className="im-guess-section">
                <p className="im-question">À votre avis, {scenario.name} devrait :</p>
                <div className="im-btns">
                  <button className="im-btn-rent" onClick={() => handleGuess("louer")}>
                    <span className="im-btn-icon">🏢</span>
                    <span className="im-btn-label">Louer</span>
                    <span className="im-btn-sub">Garder la flexibilité</span>
                  </button>
                  <button className="im-btn-buy" onClick={() => handleGuess("acheter")}>
                    <span className="im-btn-icon">🏠</span>
                    <span className="im-btn-label">Acheter</span>
                    <span className="im-btn-sub">Construire un patrimoine</span>
                  </button>
                </div>
              </div>
            )}

            {/* Reveal */}
            {phase === "reveal" && result && (
              <div className="im-reveal">
                <div className={`im-result-banner${result.isCorrect ? " im-result-ok" : " im-result-ko"}`}>
                  <div className="im-result-icon">{result.isCorrect ? "✅" : "❌"}</div>
                  <div className="im-result-body">
                    <div className="im-result-title">
                      {result.isCorrect ? "Bonne réponse !" : "Pas tout à fait…"}
                    </div>
                    <div className="im-result-answer">
                      La bonne réponse : <strong>{result.correct === "acheter" ? "🏠 Acheter" : "🏢 Louer"}</strong>
                    </div>
                    {result.speedBonus && (
                      <div className="im-speed-bonus">⚡ Bonus rapidité +5 pts · {result.elapsed.toFixed(1)}s</div>
                    )}
                  </div>
                  <div className="im-pts-badge">+{result.pts} pts</div>
                </div>

                <div className="im-numbers">
                  <div className="im-numbers-title">📊 Le calcul sur {scenario.horizon} ans</div>
                  <div className="im-numbers-grid">
                    <div className="im-num-item">
                      <span className="im-num-lbl">Patrimoine si achat</span>
                      <span className={`im-num-val${result.isBuyingBetter ? " im-num-green" : ""}`}>
                        {result.calc.buyNetWorth != null ? fmt(result.calc.buyNetWorth) : "—"}
                      </span>
                    </div>
                    <div className="im-num-item">
                      <span className="im-num-lbl">Patrimoine si location</span>
                      <span className={`im-num-val${!result.isBuyingBetter ? " im-num-green" : ""}`}>
                        {result.calc.rentNetWorth != null ? fmt(result.calc.rentNetWorth) : "—"}
                      </span>
                    </div>
                    {result.calc.breakevenYear > 0 && (
                      <div className="im-num-item im-num-full">
                        <span className="im-num-lbl">Seuil de rentabilité</span>
                        <span className="im-num-val">Année {result.calc.breakevenYear}</span>
                      </div>
                    )}
                    <div className="im-num-item im-num-full im-num-highlight">
                      <span className="im-num-lbl">Avantage net</span>
                      <span className="im-num-val">
                        {result.isBuyingBetter ? "🏠 Achat" : "🏢 Location"} gagne{" "}
                        {result.calc.buyNetWorth != null && result.calc.rentNetWorth != null
                          ? fmt(Math.abs(result.calc.buyNetWorth - result.calc.rentNetWorth))
                          : "—"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="im-lesson">
                  <span className="im-lesson-icon">💡</span>
                  <p className="im-lesson-text">{scenario.lesson}</p>
                </div>

                <button className="im-next-btn" onClick={next}>
                  {idx < SCENARIOS.length - 1 ? `Scénario suivant (${idx + 2}/${SCENARIOS.length}) →` : "Voir mon score final →"}
                </button>
              </div>
            )}
          </div>
        )}

        {/* ── DONE ─── */}
        {phase === "done" && (
          <div className="im-done">
            <div className="im-done-trophy" style={{ color: finalGrade.color }}>
              {finalGrade.emoji}
            </div>
            <h2 className="im-done-grade" style={{ color: finalGrade.color }}>{finalGrade.label}</h2>
            <div className="im-done-score">
              <span className="im-done-pts">{score}</span>
              <span className="im-done-max">/ {maxScore} pts</span>
            </div>
            <p className="im-done-msg">{finalGrade.desc}</p>

            {/* Score bar */}
            <div className="im-score-bar-wrap">
              <div className="im-score-bar-track">
                <div className="im-score-bar-fill" style={{ width: `${(score / maxScore) * 100}%` }} />
                <div className="im-score-bar-marker" style={{ left: "33%" }} title="Expert" />
                <div className="im-score-bar-marker" style={{ left: "80%" }} title="Gourou" />
              </div>
              <div className="im-score-bar-labels">
                <span>Apprenti</span>
                <span>Expert</span>
                <span>Gourou</span>
              </div>
            </div>

            {/* Recap table */}
            <div className="im-recap">
              <div className="im-recap-title">Récapitulatif</div>
              {answers.map((a) => {
                const sc = SCENARIOS.find((s) => s.id === a.id);
                return (
                  <div key={a.id} className={`im-recap-row${a.isCorrect ? " im-recap-ok" : " im-recap-ko"}`}>
                    <span className="im-recap-emoji">{sc.emoji}</span>
                    <span className="im-recap-name">{sc.name} · {sc.city}</span>
                    <span className="im-recap-verdict">
                      {a.correct === "acheter" ? "🏠 Acheter" : "🏢 Louer"}
                    </span>
                    <span className="im-recap-pts">{a.isCorrect ? "✅" : "❌"} +{a.pts} pts</span>
                  </div>
                );
              })}
            </div>

            <div className="im-done-actions">
              <button className="im-replay-btn" onClick={replay}>
                🔄 Rejouer
              </button>
              <Link to="/" className="im-sim-btn">
                Simuler ma situation →
              </Link>
            </div>

            <Link to="/simulateurs" className="im-done-sims-link">
              Découvrir nos 25+ simulateurs immobiliers →
            </Link>
          </div>
        )}

        {/* Floating pop animation */}
        {pop && (
          <div className={`im-pop im-pop-${pop}`} aria-hidden="true">
            {pop === "correct" ? "+10" : "×"}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
