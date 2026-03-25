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
};

const STEP_LABELS = ["Location", "Achat", "Résultat"];

function App() {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState(DEFAULTS);

  const set = (key) => (val) => setValues((v) => ({ ...v, [key]: val }));

  const result = useMemo(() => computeComparison(values), [values]);

  return (
    <div className="page">
      <header className="top-bar">
        <button
          className="brand brand-btn"
          onClick={() => setStep(0)}
          type="button"
        >
          Louer ou Acheter
        </button>

        {step > 0 && (
          <nav className="stepper">
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
                    aria-label={`Étape ${s} : ${label}`}
                  >
                    {done ? "✓" : s}
                  </button>
                  <span className={`stepper-label ${active ? "stepper-label-active" : ""}`}>
                    {label}
                  </span>
                  {i < 2 && (
                    <span className={`stepper-line ${done ? "stepper-line-done" : ""}`} />
                  )}
                </span>
              );
            })}
          </nav>
        )}
      </header>

      {step === 0 && <StepLanding onStart={() => setStep(1)} />}
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
        <StepResult
          result={result}
          values={values}
          onEdit={() => setStep(1)}
        />
      )}
    </div>
  );
}

export default App;
