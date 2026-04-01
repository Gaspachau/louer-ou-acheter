import "./App.css";
import { lazy, Suspense, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import CookieBanner from "./components/CookieBanner";
import TopBar from "./components/TopBar";
import Footer from "./components/Footer";
import LandingPage from "./components/LandingPage";
const FunnelV2 = lazy(() => import("./components/FunnelV2"));
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
const PageAdmin = lazy(() => import("./components/PageAdmin"));
const PageVilleSEO = lazy(() => import("./components/seo/PageVilleSEO"));
const PagePretImmoSEO = lazy(() => import("./components/seo/PagePretImmoSEO"));
const PageFraisNotaireSEO = lazy(() => import("./components/seo/PageFraisNotaireSEO"));
const PageCapaciteEmpruntSEO = lazy(() => import("./components/seo/PageCapaciteEmpruntSEO"));
const PagePTZSEO = lazy(() => import("./components/seo/PagePTZSEO"));
const PageTauxImmoSEO = lazy(() => import("./components/seo/PageTauxImmoSEO"));
const PagePlanDuSite = lazy(() => import("./components/seo/PagePlanDuSite"));

function PageLoader() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh", color: "var(--muted)" }}>
      <span style={{ fontSize: 14 }}>Chargement…</span>
    </div>
  );
}


function SimulatorPage() {
  return (
    <div className="page">
      <TopBar />
      <main id="main-content" style={{ paddingTop: "16px" }}>
        <FunnelV2 />
      </main>
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
        <Route path="/" element={<LandingPage />} />
        <Route path="/simulateur" element={<SimulatorPage />} />
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
        <Route path="/admin" element={<PageAdmin />} />
        {/* SEO long-tail city pages — explicit routes (React Router v7 ne supporte pas les params dans les segments mixtes) */}
        <Route path="/louer-ou-acheter-paris"      element={<PageVilleSEO citySlug="paris" />} />
        <Route path="/louer-ou-acheter-lyon"       element={<PageVilleSEO citySlug="lyon" />} />
        <Route path="/louer-ou-acheter-marseille"  element={<PageVilleSEO citySlug="marseille" />} />
        <Route path="/louer-ou-acheter-bordeaux"   element={<PageVilleSEO citySlug="bordeaux" />} />
        <Route path="/louer-ou-acheter-toulouse"   element={<PageVilleSEO citySlug="toulouse" />} />
        <Route path="/louer-ou-acheter-nantes"     element={<PageVilleSEO citySlug="nantes" />} />
        <Route path="/louer-ou-acheter-lille"      element={<PageVilleSEO citySlug="lille" />} />
        <Route path="/louer-ou-acheter-nice"       element={<PageVilleSEO citySlug="nice" />} />
        <Route path="/louer-ou-acheter-rennes"     element={<PageVilleSEO citySlug="rennes" />} />
        <Route path="/louer-ou-acheter-strasbourg" element={<PageVilleSEO citySlug="strasbourg" />} />
        {/* SEO topic pages */}
        <Route path="/simulateur-pret-immobilier-gratuit" element={<PagePretImmoSEO />} />
        <Route path="/calculateur-frais-de-notaire-2026" element={<PageFraisNotaireSEO />} />
        <Route path="/capacite-emprunt-calcul-gratuit" element={<PageCapaciteEmpruntSEO />} />
        <Route path="/ptz-2026-conditions-montants" element={<PagePTZSEO />} />
        <Route path="/taux-immobilier-2026" element={<PageTauxImmoSEO />} />
        <Route path="/plan-du-site" element={<PagePlanDuSite />} />
      </Routes>
    </Suspense>
    </>
  );
}
