import "./App.css";
import { Fragment, lazy, Suspense, useEffect, useMemo, useState } from "react";
import { Routes, Route, useNavigate, useSearchParams } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import CookieBanner from "./components/CookieBanner";
import TopBar from "./components/TopBar";
import Footer from "./components/Footer";
import StepLanding from "./components/StepLanding";
import { computeComparison } from "./utils/finance";
import { getDefaultsForCity } from "./data/cityData";

// Funnel steps beyond step 0 are lazy-loaded — only StepLanding is needed for initial render
const StepProfile = lazy(() => import("./components/StepProfile"));
const StepRent    = lazy(() => import("./components/StepRent"));
const StepBuy     = lazy(() => import("./components/StepBuy"));
const StepResult  = lazy(() => import("./components/StepResult"));
const PageVille = lazy(() => import("./components/PageVille"));

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
const PageCarteMondiale = lazy(() => import("./components/PageCarteMondiale"));
const PageGuideAchat         = lazy(() => import("./components/PageGuideAchat"));
const PageGuidePersonnalise  = lazy(() => import("./components/PageGuidePersonnalise"));
const SimPouvoirAchatM2      = lazy(() => import("./components/simulateurs/SimPouvoirAchatM2"));
const SimCouple              = lazy(() => import("./components/simulateurs/SimCouple"));
const SimMachineTemps        = lazy(() => import("./components/simulateurs/SimMachineTemps"));
const SimCalendrier          = lazy(() => import("./components/simulateurs/SimCalendrier"));
const SimHeritage            = lazy(() => import("./components/simulateurs/SimHeritage"));
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
const PageJeu = lazy(() => import("./components/PageJeu"));

function PageLoader() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh", color: "var(--muted)" }}>
      <span style={{ fontSize: 14 }}>Chargement…</span>
    </div>
  );
}

const DEFAULTS = {
  city: null,
  profile: null,
  purchasePrice: 250000,
  downPayment: 35000,
  mortgageRate: 3.5,
  mortgageYears: 20,
  notaryFeesPct: 8,
  annualPropertyTax: 1400,
  annualMaintenancePct: 1,
  annualInsurance: 300,
  appreciationRate: 2,
  saleCostsPct: 5,
  monthlyRent: 900,
  annualRentIncrease: 2,
  investmentReturn: 3.5,
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
    values: { purchasePrice: 380000, downPayment: 76000, mortgageRate: 3.5, mortgageYears: 20, monthlyRent: 1500, annualPropertyTax: 2200, comparisonYears: 10, monthlySavings: 200 },
  },
  {
    id: "region",
    emoji: "🏡",
    name: "Ville moyenne",
    desc: "Maison avec jardin",
    tag: "220 000 € · Loyer ~850 €",
    values: { purchasePrice: 200000, downPayment: 40000, mortgageRate: 3.5, mortgageYears: 20, monthlyRent: 750, annualPropertyTax: 1100, comparisonYears: 10, monthlySavings: 150 },
  },
  {
    id: "budget",
    emoji: "🏢",
    name: "Budget serré",
    desc: "Studio ou T2",
    tag: "150 000 € · Loyer ~650 €",
    values: { purchasePrice: 130000, downPayment: 15000, mortgageRate: 3.8, mortgageYears: 25, monthlyRent: 580, annualPropertyTax: 800, comparisonYears: 8, monthlySavings: 100 },
  },
];

const STEP_LABELS = ["Profil", "Location", "Achat", "Résultat"];

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

  const step = Math.max(0, Math.min(4, parseInt(searchParams.get("step") ?? "0", 10) || 0));
  const setStep = (n) => navigate(n === 0 ? "/" : `/?step=${n}`);
  const set = (key) => (val) => setValues((v) => ({ ...v, [key]: val }));
  const applyPreset = (preset) => { setValues({ ...DEFAULTS, ...preset.values }); setStep(2); };
  const applyCity = (cityId) => {
    const cityDefaults = cityId ? getDefaultsForCity(cityId) : null;
    setValues((v) => ({ ...v, city: cityId, ...(cityDefaults || {}) }));
  };
  const result = useMemo(() => computeComparison(values), [values]);

  /* Scroll to top on step change */
  useEffect(() => { window.scrollTo(0, 0); }, [step]);

  return (
    <div className="page">
      <TopBar onBrandClick={() => setStep(0)} />
      {step > 0 && (
        <nav className="sim-funnel-bar" aria-label="Progression de la simulation">
          {STEP_LABELS.map((label, i) => {
            const s = i + 1;
            const done = step > s;
            const active = step === s;
            return (
              <Fragment key={s}>
                <button
                  type="button"
                  className={`sim-funnel-step${active ? " active" : ""}${done ? " done" : ""}`}
                  onClick={() => done ? setStep(s) : undefined}
                  disabled={!done}
                  aria-current={active ? "step" : undefined}
                  aria-label={`Étape ${s} : ${label}${active ? " (en cours)" : done ? " (terminé)" : ""}`}
                >
                  <span className="sim-funnel-num" aria-hidden="true">
                    {done ? (
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ) : s}
                  </span>
                  <span className="sim-funnel-label">{label}</span>
                </button>
                {i < STEP_LABELS.length - 1 && (
                  <span className={`sim-funnel-line${done ? " done" : ""}`} aria-hidden="true" />
                )}
              </Fragment>
            );
          })}
        </nav>
      )}
      <main id="main-content">
        {step === 0 && <StepLanding onStart={() => setStep(1)} onPreset={applyPreset} city={values.city} />}
        <Suspense fallback={<PageLoader />}>
          {step === 1 && <StepProfile values={values} set={set} onNext={() => setStep(2)} applyCity={applyCity} />}
          {step === 2 && <StepRent values={values} set={set} onNext={() => setStep(3)} city={values.city} />}
          {step === 3 && <StepBuy values={values} set={set} onNext={() => setStep(4)} onBack={() => navigate(-1)} city={values.city} />}
          {step === 4 && <StepResult result={result} values={values} onEdit={() => setStep(2)} />}
        </Suspense>
      </main>
      {step === 0 && <Footer />}
    </div>
  );
}

export default function App() {
  useEffect(() => {
    // Defer analytics init — load posthog chunk only after first render
    let cleanup;
    import("./utils/analytics").then(({ initAnalytics }) => {
      initAnalytics();
      const handler = () => initAnalytics();
      window.addEventListener("consent_updated", handler);
      cleanup = () => window.removeEventListener("consent_updated", handler);
    });
    return () => cleanup?.();
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
        <Route path="/carte-mondiale" element={<PageCarteMondiale />} />
        <Route path="/guide-achat" element={<PageGuideAchat />} />
        <Route path="/guide-personnalise" element={<PageGuidePersonnalise />} />
        <Route path="/jeu" element={<PageJeu />} />
        <Route path="/simulateurs/pouvoir-achat-m2" element={<SimPouvoirAchatM2 />} />
        <Route path="/simulateurs/simulateur-couple" element={<SimCouple />} />
        <Route path="/simulateurs/machine-temps" element={<SimMachineTemps />} />
        <Route path="/simulateurs/calendrier-acheteur" element={<SimCalendrier />} />
        <Route path="/simulateurs/heritage-immobilier" element={<SimHeritage />} />
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
        <Route path="/villes/:cityId" element={<PageVille />} />
      </Routes>
    </Suspense>
    </>
  );
}
