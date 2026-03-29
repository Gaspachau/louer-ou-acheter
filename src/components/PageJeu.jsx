import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TopBar from "./TopBar";
import Footer from "./Footer";
import { computeComparison } from "../utils/finance";

const SCENARIOS = [
  {
    id: 1,
    name: "Marie",
    age: 32,
    job: "Infirmière",
    city: "Lyon",
    income: 2800,
    emoji: "👩‍⚕️",
    rentNow: 850,
    property: {
      purchasePrice: 280000,
      downPayment: 35000,
      mortgageRate: 3.5,
      mortgageYears: 20,
      notaryFeesPct: 8,
      annualPropertyTax: 1600,
      annualMaintenancePct: 1,
      annualInsurance: 450,
      appreciationRate: 2.5,
      saleCostsPct: 5,
      monthlyRent: 850,
      annualRentIncrease: 2,
      investmentReturn: 3.5,
      comparisonYears: 10,
      monthlySavings: 200,
    },
    context: "Loue un T2 à Lyon depuis 3 ans. A économisé 35 000 € d'apport. CDI depuis 5 ans.",
    question: "Marie devrait-elle acheter un appartement à Lyon à 280 000 € ?",
  },
  {
    id: 2,
    name: "Thomas",
    age: 28,
    job: "Développeur",
    city: "Paris",
    income: 4500,
    emoji: "👨‍💻",
    rentNow: 1400,
    property: {
      purchasePrice: 420000,
      downPayment: 42000,
      mortgageRate: 3.6,
      mortgageYears: 25,
      notaryFeesPct: 8,
      annualPropertyTax: 2200,
      annualMaintenancePct: 1,
      annualInsurance: 500,
      appreciationRate: 1.5,
      saleCostsPct: 5,
      monthlyRent: 1400,
      annualRentIncrease: 2,
      investmentReturn: 5,
      comparisonYears: 7,
      monthlySavings: 500,
    },
    context: "Loue un studio à Paris depuis 2 ans. Risque de mobilité professionnelle. Apport de 42 000 €.",
    question: "Thomas devrait-il acheter un studio à Paris à 420 000 € sur 7 ans ?",
  },
  {
    id: 3,
    name: "Sophie & Marc",
    age: 38,
    job: "Couple de fonctionnaires",
    city: "Bordeaux",
    income: 6200,
    emoji: "👫",
    rentNow: 1100,
    property: {
      purchasePrice: 350000,
      downPayment: 70000,
      mortgageRate: 3.4,
      mortgageYears: 20,
      notaryFeesPct: 8,
      annualPropertyTax: 1800,
      annualMaintenancePct: 1,
      annualInsurance: 500,
      appreciationRate: 2,
      saleCostsPct: 5,
      monthlyRent: 1100,
      annualRentIncrease: 1.5,
      investmentReturn: 3,
      comparisonYears: 15,
      monthlySavings: 400,
    },
    context: "Couple stable avec 2 enfants. 70 000 € d'apport. Envisagent de rester 15+ ans.",
    question: "Sophie & Marc devraient-ils acheter une maison à Bordeaux à 350 000 € ?",
  },
  {
    id: 4,
    name: "Julie",
    age: 24,
    job: "Étudiante en master",
    city: "Toulouse",
    income: 1200,
    emoji: "👩‍🎓",
    rentNow: 600,
    property: {
      purchasePrice: 170000,
      downPayment: 17000,
      mortgageRate: 3.8,
      mortgageYears: 25,
      notaryFeesPct: 8,
      annualPropertyTax: 900,
      annualMaintenancePct: 1.5,
      annualInsurance: 300,
      appreciationRate: 2,
      saleCostsPct: 5,
      monthlyRent: 600,
      annualRentIncrease: 2,
      investmentReturn: 4,
      comparisonYears: 4,
      monthlySavings: 0,
    },
    context: "Finit son master dans 18 mois. Incertitude sur la ville post-études. 17 000 € d'épargne.",
    question: "Julie devrait-elle acheter un studio à Toulouse à 170 000 € ?",
  },
  {
    id: 5,
    name: "Michel",
    age: 55,
    job: "Commercial indépendant",
    city: "Nantes",
    income: 3800,
    emoji: "👨‍💼",
    rentNow: 950,
    property: {
      purchasePrice: 290000,
      downPayment: 87000,
      mortgageRate: 3.7,
      mortgageYears: 15,
      notaryFeesPct: 8,
      annualPropertyTax: 1500,
      annualMaintenancePct: 1,
      annualInsurance: 600,
      appreciationRate: 2,
      saleCostsPct: 5,
      monthlyRent: 950,
      annualRentIncrease: 2,
      investmentReturn: 3.5,
      comparisonYears: 15,
      monthlySavings: 300,
    },
    context: "Revenu variable en tant qu'indépendant. Apport de 87 000 € (30%). Souhaite un patrimoine pour la retraite.",
    question: "Michel devrait-il acheter un appartement à Nantes à 290 000 € ?",
  },
];

function getGrade(score) {
  if (score >= 45) return { label: "Maestro", emoji: "🏆", message: "Exceptionnel ! Vous maîtrisez parfaitement les subtilités de l'immobilier." };
  if (score >= 35) return { label: "Expert", emoji: "🎯", message: "Très bien ! Vous avez une solide compréhension des enjeux financiers." };
  if (score >= 20) return { label: "Initié", emoji: "📈", message: "Pas mal ! Vous commencez à saisir les nuances de la décision louer/acheter." };
  return { label: "Novice", emoji: "📚", message: "C'est un début ! Le simulateur vous aidera à mieux comprendre les facteurs clés." };
}

function formatEuros(amount) {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(amount);
}

export default function PageJeu() {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [phase, setPhase] = useState("guess"); // 'guess' | 'reveal' | 'done'
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());
  const [userGuess, setUserGuess] = useState(null);
  const [computedResult, setComputedResult] = useState(null);
  const [bonusEarned, setBonusEarned] = useState(false);

  const scenario = SCENARIOS[currentScenario];

  useEffect(() => {
    setStartTime(Date.now());
    setUserGuess(null);
    setComputedResult(null);
    setBonusEarned(false);
  }, [currentScenario]);

  function handleGuess(guess) {
    const elapsed = (Date.now() - startTime) / 1000;
    const result = computeComparison(scenario.property);
    const isBuyingBetter = result.buyingIsBetter ?? (result.buyNetWorth > result.rentNetWorth);
    const correctAnswer = isBuyingBetter ? "acheter" : "louer";
    const isCorrect = guess === correctAnswer;
    const fastBonus = elapsed <= 5 && isCorrect;

    let pointsEarned = 0;
    if (isCorrect) pointsEarned += 10;
    if (fastBonus) pointsEarned += 5;

    setUserGuess(guess);
    setComputedResult({ result, isBuyingBetter, correctAnswer, isCorrect, elapsed, fastBonus, pointsEarned });
    setScore((prev) => prev + pointsEarned);
    setAnswers((prev) => [...prev, { scenarioId: scenario.id, guess, correctAnswer, isCorrect, pointsEarned }]);
    setBonusEarned(fastBonus);
    setPhase("reveal");
  }

  function handleNext() {
    if (currentScenario < SCENARIOS.length - 1) {
      setCurrentScenario((prev) => prev + 1);
      setPhase("guess");
    } else {
      setPhase("done");
    }
  }

  function handleReplay() {
    setCurrentScenario(0);
    setPhase("guess");
    setAnswers([]);
    setScore(0);
    setStartTime(Date.now());
    setUserGuess(null);
    setComputedResult(null);
    setBonusEarned(false);
  }

  const grade = getGrade(score);

  return (
    <div className="page">
      <TopBar />

      <div className="jeu-page">
        {/* Hero header */}
        <div className="jeu-hero">
          <h1>Louer ou Acheter ?</h1>
          <p>Testez votre intuition immobilière sur 5 cas réels</p>
        </div>

        {phase !== "done" && (
          <>
            {/* Progress bar */}
            <div className="jeu-progress">
              <div className="jeu-progress-label">
                Scénario {currentScenario + 1} / {SCENARIOS.length}
              </div>
              <div className="jeu-progress-bar-track">
                <div
                  className="jeu-progress-bar-fill"
                  style={{ width: `${((currentScenario + (phase === "reveal" ? 1 : 0)) / SCENARIOS.length) * 100}%` }}
                />
              </div>
              <div className="jeu-score-inline">Score : {score} pts</div>
            </div>

            {/* Scenario card */}
            <div className="jeu-card">
              <div className="jeu-person-header">
                <span className="jeu-person-emoji">{scenario.emoji}</span>
                <div className="jeu-person-info">
                  <div className="jeu-person-name">{scenario.name}</div>
                  <div className="jeu-person-meta">{scenario.age} ans · {scenario.job}</div>
                </div>
                <div className="jeu-person-city">📍 {scenario.city}</div>
              </div>

              <div className="jeu-person-financials">
                <div className="jeu-financial-item">
                  <span className="jeu-financial-label">Revenu mensuel</span>
                  <span className="jeu-financial-value">{formatEuros(scenario.income)}</span>
                </div>
                <div className="jeu-financial-item">
                  <span className="jeu-financial-label">Loyer actuel</span>
                  <span className="jeu-financial-value">{formatEuros(scenario.rentNow)}/mois</span>
                </div>
                <div className="jeu-financial-item">
                  <span className="jeu-financial-label">Prix du bien</span>
                  <span className="jeu-financial-value">{formatEuros(scenario.property.purchasePrice)}</span>
                </div>
                <div className="jeu-financial-item">
                  <span className="jeu-financial-label">Apport</span>
                  <span className="jeu-financial-value">{formatEuros(scenario.property.downPayment)}</span>
                </div>
              </div>

              <div className="jeu-context">{scenario.context}</div>

              <div className="jeu-question">{scenario.question}</div>
            </div>

            {/* Answer buttons or reveal */}
            {phase === "guess" && (
              <div className="jeu-btns">
                <button className="jeu-btn-louer" onClick={() => handleGuess("louer")}>
                  🏢 Louer
                </button>
                <button className="jeu-btn-acheter" onClick={() => handleGuess("acheter")}>
                  🏠 Acheter
                </button>
              </div>
            )}

            {phase === "reveal" && computedResult && (
              <div className="jeu-reveal">
                {/* Result indicator */}
                <div className={`jeu-result-box ${computedResult.isCorrect ? "jeu-result-correct" : "jeu-result-wrong"}`}>
                  <div className="jeu-result-icon">{computedResult.isCorrect ? "✅" : "❌"}</div>
                  <div className="jeu-result-text">
                    {computedResult.isCorrect ? "Bonne réponse !" : "Pas tout à fait..."}
                  </div>
                  <div className="jeu-result-answer">
                    La bonne réponse était :{" "}
                    <strong>{computedResult.correctAnswer === "acheter" ? "🏠 Acheter" : "🏢 Louer"}</strong>
                  </div>
                  {bonusEarned && (
                    <div className="jeu-result-bonus">⚡ Bonus rapidité +5 pts ({computedResult.elapsed.toFixed(1)}s)</div>
                  )}
                  <div className="jeu-result-points">
                    +{computedResult.pointsEarned} point{computedResult.pointsEarned !== 1 ? "s" : ""}
                  </div>
                </div>

                {/* Mini calculation */}
                <div className="jeu-calc-card">
                  <div className="jeu-calc-title">📊 Les chiffres clés</div>
                  <div className="jeu-calc-grid">
                    <div className="jeu-calc-item">
                      <span className="jeu-calc-label">Horizon analysé</span>
                      <span className="jeu-calc-value">{scenario.property.comparisonYears} ans</span>
                    </div>
                    <div className="jeu-calc-item">
                      <span className="jeu-calc-label">Patrimoine si achat</span>
                      <span className="jeu-calc-value">
                        {computedResult.result.buyNetWorth != null
                          ? formatEuros(computedResult.result.buyNetWorth)
                          : "—"}
                      </span>
                    </div>
                    <div className="jeu-calc-item">
                      <span className="jeu-calc-label">Patrimoine si location</span>
                      <span className="jeu-calc-value">
                        {computedResult.result.rentNetWorth != null
                          ? formatEuros(computedResult.result.rentNetWorth)
                          : "—"}
                      </span>
                    </div>
                    {computedResult.result.breakevenYear != null && (
                      <div className="jeu-calc-item jeu-calc-item--full">
                        <span className="jeu-calc-label">Seuil de rentabilité</span>
                        <span className="jeu-calc-value">
                          {computedResult.result.breakevenYear > 0
                            ? `Année ${computedResult.result.breakevenYear}`
                            : "Non atteint sur la période"}
                        </span>
                      </div>
                    )}
                    <div className="jeu-calc-item jeu-calc-item--full jeu-calc-item--highlight">
                      <span className="jeu-calc-label">Avantage</span>
                      <span className="jeu-calc-value">
                        {computedResult.isBuyingBetter ? "🏠 Achat" : "🏢 Location"} gagne{" "}
                        {computedResult.result.buyNetWorth != null && computedResult.result.rentNetWorth != null
                          ? formatEuros(Math.abs(computedResult.result.buyNetWorth - computedResult.result.rentNetWorth))
                          : "—"}
                      </span>
                    </div>
                  </div>
                </div>

                <button className="jeu-btn-next" onClick={handleNext}>
                  {currentScenario < SCENARIOS.length - 1 ? "Scénario suivant →" : "Voir mon score →"}
                </button>
              </div>
            )}
          </>
        )}

        {/* End screen */}
        {phase === "done" && (
          <div className="jeu-end">
            <div className="jeu-end-trophy">{grade.emoji}</div>
            <h2 className="jeu-end-grade">{grade.label}</h2>
            <div className="jeu-end-score">
              {score} <span className="jeu-end-score-max">/ 50 points</span>
            </div>
            <p className="jeu-end-message">{grade.message}</p>

            {/* Answers recap */}
            <div className="jeu-end-recap">
              {answers.map((a, i) => {
                const sc = SCENARIOS.find((s) => s.id === a.scenarioId);
                return (
                  <div key={a.scenarioId} className={`jeu-recap-item ${a.isCorrect ? "jeu-recap-correct" : "jeu-recap-wrong"}`}>
                    <span className="jeu-recap-emoji">{sc.emoji}</span>
                    <span className="jeu-recap-name">{sc.name}</span>
                    <span className="jeu-recap-answer">
                      {a.isCorrect ? "✅" : "❌"} {a.correctAnswer === "acheter" ? "Acheter" : "Louer"}
                    </span>
                    <span className="jeu-recap-pts">+{a.pointsEarned} pts</span>
                  </div>
                );
              })}
            </div>

            <div className="jeu-end-actions">
              <button className="jeu-btn-replay" onClick={handleReplay}>
                🔄 Rejouer
              </button>
              <Link to="/" className="jeu-btn-simulator">
                Essayer le vrai simulateur →
              </Link>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
