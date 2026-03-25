import "./App.css";
import { useEffect, useMemo, useState } from "react";
import { Routes, Route, useNavigate, useSearchParams } from "react-router-dom";
import TopBar from "./components/TopBar";
import StepLanding from "./components/StepLanding";
import StepRent from "./components/StepRent";
import StepBuy from "./components/StepBuy";
import StepResult from "./components/StepResult";
import BlogList from "./components/BlogList";
import BlogArticle from "./components/BlogArticle";
import SimulateurHub from "./components/SimulateurHub";
import SimEpargne from "./components/simulateurs/SimEpargne";
import SimPretImmo from "./components/simulateurs/SimPretImmo";
import SimPretConso from "./components/simulateurs/SimPretConso";
import SimNiveauDeVie from "./components/simulateurs/SimNiveauDeVie";
import SimEndettement from "./components/simulateurs/SimEndettement";
import { computeComparison } from "./utils/finance";

const DEFAULTS = {
  purchasePrice: 350000,
  downPayment: 50000,
  mortgageRate: 3.8,
  mortgageYears: 25,
  notaryFeesPct: 8,
  annualPropertyTax: 1800,
  annualMaintenancePct: 1,
  annualInsurance: 300,
  appreciationRate: 2,
  saleCostsPct: 5,
  monthlyRent: 1300,
  annualRentIncrease: 2,
  investmentReturn: 4,
  comparisonYears: 10,
  monthlySavings: 0,
};

export const PRESETS = [
  {
    id: "paris",
    emoji: "🏙️",
    name: "Paris / Grande ville",
    desc: "Appartement 2 pièces",
    tag: "380 000 € · Loyer ~1 500 €",
    values: { purchasePrice: 380000, downPayment: 76000, mortgageRate: 3.8, mortgageYears: 25, monthlyRent: 1500, annualPropertyTax: 2200, comparisonYears: 10, monthlySavings: 200 },
  },
  {
    id: "region",
    emoji: "🏡",
    name: "Ville moyenne",
    desc: "Maison avec jardin",
    tag: "220 000 € · Loyer ~850 €",
    values: { purchasePrice: 220000, downPayment: 44000, mortgageRate: 3.7, mortgageYears: 20, monthlyRent: 850, annualPropertyTax: 1200, comparisonYears: 10, monthlySavings: 150 },
  },
  {
    id: "budget",
    emoji: "🏢",
    name: "Budget serré",
    desc: "Studio ou T2",
    tag: "150 000 € · Loyer ~650 €",
    values: { purchasePrice: 150000, downPayment: 15000, mortgageRate: 4.0, mortgageYears: 25, monthlyRent: 650, annualPropertyTax: 900, comparisonYears: 8, monthlySavings: 100 },
  },
];

const STEP_LABELS = ["Location", "Achat", "Résultat"];

function Simulator() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [values, setValues] = useState(() => {
    try {
      const saved = sessionStorage.getItem("sim_values");
      return saved ? JSON.parse(saved) : DEFAULTS;
    } catch { return DEFAULTS; }
  });

  useEffect(() => {
    try { sessionStorage.setItem("sim_values", JSON.stringify(values)); } catch {}
  }, [values]);

  const step = Math.max(0, Math.min(3, parseInt(searchParams.get("step") ?? "0", 10) || 0));
  const setStep = (n) => navigate(n === 0 ? "/" : `/?step=${n}`);
  const set = (key) => (val) => setValues((v) => ({ ...v, [key]: val }));
  const applyPreset = (preset) => { setValues({ ...DEFAULTS, ...preset.values }); setStep(1); };
  const result = useMemo(() => computeComparison(values), [values]);

  const stepperContent = step > 0 ? (
    <nav className="stepper" aria-label="Progression">
      {STEP_LABELS.map((label, i) => {
        const s = i + 1;
        const done = step > s;
        const active = step === s;
        return (
          <span key={s} className="stepper-item">
            <button
              className={`stepper-dot ${active ? "stepper-dot-active" : ""} ${done ? "stepper-dot-done" : ""}`}
              onClick={() => done && setStep(s)}
              disabled={!done}
              aria-label={`${done ? "Retour à l'é" : "É"}tape ${s} : ${label}${active ? " (actuelle)" : done ? " (terminée)" : ""}`}
              aria-current={active ? "step" : undefined}
            >
              {done ? "✓" : s}
            </button>
            <span className={`stepper-label ${active ? "stepper-label-active" : ""}`} aria-hidden="true">{label}</span>
            {i < 2 && <span className={`stepper-line ${done ? "stepper-line-done" : ""}`} aria-hidden="true" />}
          </span>
        );
      })}
    </nav>
  ) : null;

  return (
    <div className="page">
      <TopBar onBrandClick={() => setStep(0)} rightContent={stepperContent} />
      <main id="main-content">
        {step === 0 && <StepLanding onStart={() => setStep(1)} onPreset={applyPreset} />}
        {step === 1 && <StepRent values={values} set={set} onNext={() => setStep(2)} />}
        {step === 2 && <StepBuy values={values} set={set} onNext={() => setStep(3)} onBack={() => navigate(-1)} />}
        {step === 3 && <StepResult result={result} values={values} onEdit={() => setStep(1)} />}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Simulator />} />
      <Route path="/simulateurs" element={<SimulateurHub />} />
      <Route path="/simulateurs/epargne" element={<SimEpargne />} />
      <Route path="/simulateurs/pret-immobilier" element={<SimPretImmo />} />
      <Route path="/simulateurs/pret-conso" element={<SimPretConso />} />
      <Route path="/simulateurs/niveau-de-vie" element={<SimNiveauDeVie />} />
      <Route path="/simulateurs/endettement" element={<SimEndettement />} />
      <Route path="/blog" element={<BlogList />} />
      <Route path="/blog/:slug" element={<BlogArticle />} />
    </Routes>
  );
}
