import "./App.css";
import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { Routes, Route, useNavigate, useSearchParams } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import CookieBanner from "./components/CookieBanner";
import { initAnalytics } from "./utils/analytics";
import TopBar from "./components/TopBar";
import Footer from "./components/Footer";
import StepLanding from "./components/StepLanding";
import StepRent from "./components/StepRent";
import StepBuy from "./components/StepBuy";
import StepResult from "./components/StepResult";
import { computeComparison } from "./utils/finance";

const BlogList = lazy(() => import("./components/BlogList"));
const BlogArticle = lazy(() => import("./components/BlogArticle"));
const SimulateurHub = lazy(() => import("./components/SimulateurHub"));
const SimEpargne = lazy(() => import("./components/simulateurs/SimEpargne"));
const SimPretImmo = lazy(() => import("./components/simulateurs/SimPretImmo"));
const SimPretConso = lazy(() => import("./components/simulateurs/SimPretConso"));
const SimNiveauDeVie = lazy(() => import("./components/simulateurs/SimNiveauDeVie"));
const SimEndettement = lazy(() => import("./components/simulateurs/SimEndettement"));
const SimRentabiliteLocative = lazy(() => import("./components/simulateurs/SimRentabiliteLocative"));
const SimFraisNotaire = lazy(() => import("./components/simulateurs/SimFraisNotaire"));
const SimPlusValue = lazy(() => import("./components/simulateurs/SimPlusValue"));
const SimChargesCopro = lazy(() => import("./components/simulateurs/SimChargesCopro"));
const SimTaxeFonciere = lazy(() => import("./components/simulateurs/SimTaxeFonciere"));
const SimComparateurVilles = lazy(() => import("./components/simulateurs/SimComparateurVilles"));
const PageAPropos = lazy(() => import("./components/PageAPropos"));
const PageMentionsLegales = lazy(() => import("./components/PageMentionsLegales"));
const SimScoreAcheteur = lazy(() => import("./components/simulateurs/SimScoreAcheteur"));
const SimOptimiseurApport = lazy(() => import("./components/simulateurs/SimOptimiseurApport"));
const SimStressTest = lazy(() => import("./components/simulateurs/SimStressTest"));
const SimHistoire = lazy(() => import("./components/simulateurs/SimHistoire"));
const SimBudgetMax = lazy(() => import("./components/simulateurs/SimBudgetMax"));
const SimPTZ = lazy(() => import("./components/simulateurs/SimPTZ"));
const SimNegociation = lazy(() => import("./components/simulateurs/SimNegociation"));
const SimImpactDPE = lazy(() => import("./components/simulateurs/SimImpactDPE"));
const SimRemboursementAnticipe = lazy(() => import("./components/simulateurs/SimRemboursementAnticipe"));
const SimAssurancePret = lazy(() => import("./components/simulateurs/SimAssurancePret"));

function PageLoader() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh", color: "var(--muted)" }}>
      <span style={{ fontSize: 14 }}>Chargement…</span>
    </div>
  );
}

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
      {step === 0 && <Footer />}
    </div>
  );
}

export default function App() {
  useEffect(() => {
    // Re-init analytics if consent updates during the session
    const handler = () => initAnalytics();
    window.addEventListener("consent_updated", handler);
    return () => window.removeEventListener("consent_updated", handler);
  }, []);

  return (
    <>
    <CookieBanner />
    <ScrollToTop />
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Simulator />} />
        <Route path="/simulateurs" element={<SimulateurHub />} />
        <Route path="/simulateurs/epargne" element={<SimEpargne />} />
        <Route path="/simulateurs/pret-immobilier" element={<SimPretImmo />} />
        <Route path="/simulateurs/pret-conso" element={<SimPretConso />} />
        <Route path="/simulateurs/niveau-de-vie" element={<SimNiveauDeVie />} />
        <Route path="/simulateurs/endettement" element={<SimEndettement />} />
        <Route path="/simulateurs/rentabilite-locative" element={<SimRentabiliteLocative />} />
        <Route path="/simulateurs/frais-notaire" element={<SimFraisNotaire />} />
        <Route path="/simulateurs/plus-value" element={<SimPlusValue />} />
        <Route path="/simulateurs/charges-copro" element={<SimChargesCopro />} />
        <Route path="/simulateurs/taxe-fonciere" element={<SimTaxeFonciere />} />
        <Route path="/simulateurs/comparateur-villes" element={<SimComparateurVilles />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:slug" element={<BlogArticle />} />
        <Route path="/a-propos" element={<PageAPropos />} />
        <Route path="/mentions-legales" element={<PageMentionsLegales />} />
        <Route path="/simulateurs/score-acheteur" element={<SimScoreAcheteur />} />
        <Route path="/simulateurs/optimiser-apport" element={<SimOptimiseurApport />} />
        <Route path="/simulateurs/stress-test" element={<SimStressTest />} />
        <Route path="/simulateurs/histoire" element={<SimHistoire />} />
        <Route path="/simulateurs/budget-maximum" element={<SimBudgetMax />} />
        <Route path="/simulateurs/ptz" element={<SimPTZ />} />
        <Route path="/simulateurs/negociation" element={<SimNegociation />} />
        <Route path="/simulateurs/impact-dpe" element={<SimImpactDPE />} />
        <Route path="/simulateurs/remboursement-anticipe" element={<SimRemboursementAnticipe />} />
        <Route path="/simulateurs/assurance-pret" element={<SimAssurancePret />} />
      </Routes>
    </Suspense>
    </>
  );
}
