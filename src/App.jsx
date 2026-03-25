import "./App.css";
import { useMemo, useState } from "react";
import StepLanding from "./components/StepLanding";
import StepRent from "./components/StepRent";
import StepBuy from "./components/StepBuy";
import StepResult from "./components/StepResult";
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
    values: {
      purchasePrice: 380000,
      downPayment: 76000,
      mortgageRate: 3.8,
      mortgageYears: 25,
      monthlyRent: 1500,
      annualPropertyTax: 2200,
      comparisonYears: 10,
      monthlySavings: 200,
    },
  },
  {
    id: "region",
    emoji: "🏡",
    name: "Ville moyenne",
    desc: "Maison avec jardin",
    tag: "220 000 € · Loyer ~850 €",
    values: {
      purchasePrice: 220000,
      downPayment: 44000,
      mortgageRate: 3.7,
      mortgageYears: 20,
      monthlyRent: 850,
      annualPropertyTax: 1200,
      comparisonYears: 10,
      monthlySavings: 150,
    },
  },
  {
    id: "budget",
    emoji: "🏢",
    name: "Budget serré",
    desc: "Studio ou T2",
    tag: "150 000 € · Loyer ~650 €",
    values: {
      purchasePrice: 150000,
      downPayment: 15000,
      mortgageRate: 4.0,
      mortgageYears: 25,
      monthlyRent: 650,
      annualPropertyTax: 900,
      comparisonYears: 8,
      monthlySavings: 100,
    },
  },
];

const STEP_LABELS = ["Location", "Achat", "Résultat"];

function App() {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState(DEFAULTS);

  const set = (key) => (val) => setValues((v) => ({ ...v, [key]: val }));

  const applyPreset = (preset) => {
    setValues({ ...DEFAULTS, ...preset.values });
    setStep(1);
  };

  const result = useMemo(() => computeComparison(values), [values]);

  return (
    <div className="page">
      <header className="top-bar" role="banner">
        <button
          className="brand-btn"
          onClick={() => setStep(0)}
          type="button"
          aria-label="Retour à l'accueil"
        >
          <span className="brand-text">
            Louer <span className="brand-accent">ou</span> Acheter
          </span>
        </button>

        {step > 0 && (
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
                  <span className={`stepper-label ${active ? "stepper-label-active" : ""}`} aria-hidden="true">
                    {label}
                  </span>
                  {i < 2 && (
                    <span className={`stepper-line ${done ? "stepper-line-done" : ""}`} aria-hidden="true" />
                  )}
                </span>
              );
            })}
          </nav>
        )}
      </header>

      <main id="main-content">
        {step === 0 && <StepLanding onStart={() => setStep(1)} onPreset={applyPreset} />}
        {step === 1 && (
          <StepRent values={values} set={set} onNext={() => setStep(2)} />
        )}
        {step === 2 && (
          <StepBuy
            values={values}
            set={set}
            onNext={() => setStep(3)}
            onBack={() => setStep(1)}
          />
        )}
        {step === 3 && (
          <StepResult result={result} values={values} onEdit={() => setStep(1)} />
        )}
      </main>
    </div>
  );
}

export default App;
