import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import TopBar from "./TopBar";
import Footer from "./Footer";
import { useSEO } from "../utils/useSEO";

/* ── Thèmes ───────────────────────────────────────────────── */
const THEMES = [
  {
    id: "acheter",
    emoji: "🏠",
    label: "Je veux acheter",
    color: "#1a56db",
    bg: "#eff6ff",
    border: "#bfdbfe",
  },
  {
    id: "investir",
    emoji: "📈",
    label: "Je veux investir",
    color: "#059669",
    bg: "#f0fdf4",
    border: "#a7f3d0",
  },
  {
    id: "epargner",
    emoji: "💰",
    label: "Je veux épargner",
    color: "#d97706",
    bg: "#fffbeb",
    border: "#fde68a",
  },
  {
    id: "comprendre",
    emoji: "🧭",
    label: "Je veux comprendre",
    color: "#7c3aed",
    bg: "#f5f3ff",
    border: "#ddd6fe",
  },
];

/* ── Simulateurs avec thèmes et durées ───────────────────── */
const SIMS = [
  {
    href: "/",
    icon: "⚖️",
    title: "Louer ou Acheter ?",
    desc: "Comparez les deux scénarios sur 5 à 25 ans : mensualité, patrimoine net et point d'équilibre exact.",
    duration: "2 min",
    themes: ["acheter", "comprendre"],
    featured: true,
    color: "#1a56db",
  },
  {
    href: "/simulateurs/endettement",
    icon: "📊",
    title: "Capacité d'emprunt",
    desc: "Calculez votre taux d'endettement et le montant maximum que vous pouvez emprunter.",
    duration: "1 min",
    themes: ["acheter"],
    color: "#0d9488",
  },
  {
    href: "/simulateurs/simulateur-couple",
    icon: "👫",
    title: "Achat en couple",
    desc: "Combinez vos revenus pour calculer votre capacité d'emprunt commune et votre budget total.",
    duration: "2 min",
    themes: ["acheter"],
    color: "#1a56db",
  },
  {
    href: "/simulateurs/budget-maximum",
    icon: "🏆",
    title: "Budget maximum",
    desc: "Découvrez jusqu'où vous pouvez aller : budget par durée et villes accessibles avec votre profil.",
    duration: "2 min",
    themes: ["acheter"],
    color: "#7c3aed",
  },
  {
    href: "/simulateurs/score-acheteur",
    icon: "🎯",
    title: "Score de préparation",
    desc: "Êtes-vous vraiment prêt à acheter ? Évaluation sur 5 dimensions clés avec un plan d'action.",
    duration: "3 min",
    themes: ["acheter"],
    color: "#1a56db",
  },
  {
    href: "/simulateurs/pouvoir-achat-m2",
    icon: "🗺️",
    title: "Pouvoir d'achat par ville",
    desc: "Combien de m² pouvez-vous acheter avec votre budget dans 10 grandes villes françaises ?",
    duration: "1 min",
    themes: ["acheter", "comprendre"],
    color: "#1a56db",
  },
  {
    href: "/simulateurs/frais-notaire",
    icon: "📋",
    title: "Frais de notaire",
    desc: "Calcul précis selon le barème officiel 2026 pour un bien ancien ou neuf.",
    duration: "1 min",
    themes: ["acheter"],
    color: "#1a56db",
  },
  {
    href: "/simulateurs/pret-immobilier",
    icon: "🏦",
    title: "Simulateur de prêt",
    desc: "Calculez votre mensualité, le coût total du crédit et consultez le tableau d'amortissement.",
    duration: "2 min",
    themes: ["acheter", "epargner"],
    color: "#7c3aed",
  },
  {
    href: "/simulateurs/ptz",
    icon: "🏗️",
    title: "Prêt à Taux Zéro (PTZ)",
    desc: "Vérifiez votre éligibilité au PTZ 2026 et calculez le montant auquel vous avez droit.",
    duration: "2 min",
    themes: ["acheter"],
    color: "#7c3aed",
  },
  {
    href: "/simulateurs/calendrier-acheteur",
    icon: "📅",
    title: "Calendrier d'achat",
    desc: "Votre feuille de route personnalisée jusqu'aux clés : étapes, délais et conseils.",
    duration: "2 min",
    themes: ["acheter"],
    color: "#1a56db",
  },
  {
    href: "/simulateurs/negociation",
    icon: "🤝",
    title: "Simulateur de négociation",
    desc: "À quel prix négocier pour que l'achat soit rentable ? Calculez le point d'équilibre.",
    duration: "2 min",
    themes: ["acheter", "investir"],
    color: "#0d9488",
  },
  {
    href: "/simulateurs/charges-copro",
    icon: "🏢",
    title: "Charges de copropriété",
    desc: "Estimez votre quote-part mensuelle selon vos tantièmes, comparée aux moyennes nationales.",
    duration: "1 min",
    themes: ["acheter"],
    color: "#1a56db",
  },
  {
    href: "/simulateurs/taxe-fonciere",
    icon: "🏛️",
    title: "Taxe foncière",
    desc: "Estimation de la taxe foncière annuelle dans 12 grandes villes françaises.",
    duration: "1 min",
    themes: ["acheter"],
    color: "#7c3aed",
  },
  {
    href: "/simulateurs/rentabilite-locative",
    icon: "🏘️",
    title: "Rentabilité locative",
    desc: "Calculez le rendement brut, net et le cashflow mensuel de votre investissement locatif.",
    duration: "3 min",
    themes: ["investir"],
    color: "#059669",
  },
  {
    href: "/simulateurs/plus-value",
    icon: "📈",
    title: "Plus-value immobilière",
    desc: "Calculez l'impôt sur la plus-value à la revente selon la durée de détention.",
    duration: "2 min",
    themes: ["investir"],
    color: "#7c3aed",
  },
  {
    href: "/simulateurs/impact-dpe",
    icon: "♻️",
    title: "Impact DPE & rénovation",
    desc: "Mesurez la décote d'une passoire thermique et calculez le retour sur investissement des travaux.",
    duration: "3 min",
    themes: ["investir", "acheter"],
    color: "#059669",
  },
  {
    href: "/simulateurs/heritage-immobilier",
    icon: "🏛️",
    title: "Héritage : garder ou vendre ?",
    desc: "Analysez s'il vaut mieux conserver un bien hérité, le louer ou le vendre.",
    duration: "3 min",
    themes: ["investir"],
    color: "#059669",
  },
  {
    href: "/simulateurs/machine-temps",
    icon: "⏳",
    title: "Machine à remonter le temps",
    desc: "Et si vous aviez acheté en 2010, 2015 ou 2018 ? Calculez le gain ou la perte réelle.",
    duration: "2 min",
    themes: ["investir", "comprendre"],
    color: "#0d9488",
  },
  {
    href: "/simulateurs/epargne",
    icon: "💰",
    title: "Simulateur d'épargne",
    desc: "Calculez l'épargne mensuelle nécessaire pour atteindre votre objectif financier.",
    duration: "1 min",
    themes: ["epargner"],
    color: "#d97706",
  },
  {
    href: "/simulateurs/optimiser-apport",
    icon: "💡",
    title: "Optimiser son apport",
    desc: "Acheter maintenant ou épargner encore 12 mois ? Comparez le retour sur investissement.",
    duration: "2 min",
    themes: ["epargner", "acheter"],
    color: "#0d9488",
  },
  {
    href: "/simulateurs/assurance-pret",
    icon: "🛡️",
    title: "Assurance emprunteur",
    desc: "Comparez l'assurance de votre banque avec la délégation d'assurance et calculez l'économie.",
    duration: "2 min",
    themes: ["epargner", "acheter"],
    color: "#7c3aed",
  },
  {
    href: "/simulateurs/remboursement-anticipe",
    icon: "⚡",
    title: "Remboursement anticipé",
    desc: "Rembourser par anticipation ou placer l'argent sur un livret ? Trouvez la meilleure option.",
    duration: "2 min",
    themes: ["epargner"],
    color: "#0d9488",
  },
  {
    href: "/simulateurs/pret-conso",
    icon: "💳",
    title: "Prêt à la consommation",
    desc: "Simulez votre crédit auto, travaux ou personnel : mensualité et coût total réel.",
    duration: "1 min",
    themes: ["epargner"],
    color: "#7c3aed",
  },
  {
    href: "/simulateurs/niveau-de-vie",
    icon: "📊",
    title: "Niveau de vie",
    desc: "Visualisez votre revenu disponible chaque mois après toutes vos charges fixes.",
    duration: "2 min",
    themes: ["epargner", "comprendre"],
    color: "#d97706",
  },
  {
    href: "/simulateurs/comparateur-villes",
    icon: "🌆",
    title: "Comparateur de villes",
    desc: "Loyer contre mensualité dans 12 grandes villes françaises, pour T1, T2 ou T3.",
    duration: "2 min",
    themes: ["comprendre", "acheter"],
    color: "#1a56db",
  },
  {
    href: "/simulateurs/histoire",
    icon: "📖",
    title: "Votre histoire financière",
    desc: "Votre vie de propriétaire ou de locataire racontée et chiffrée année par année.",
    duration: "3 min",
    themes: ["comprendre"],
    color: "#7c3aed",
  },
  {
    href: "/simulateurs/stress-test",
    icon: "🛡️",
    title: "Test de résistance",
    desc: "Votre projet face à 3 scénarios de crise : hausse des taux, chute du marché, perte d'emploi.",
    duration: "3 min",
    themes: ["comprendre", "acheter"],
    color: "#0d9488",
  },
];

/* ── Stat du jour (rotation par jour de l'année) ─────────── */
const STATS_DU_JOUR = [
  { stat: "10 %", label: "C'est l'apport minimum exigé par les banques françaises en 2026.", source: "Banque de France" },
  { stat: "35 %", label: "Le taux d'endettement maximum autorisé par le HCSF depuis 2022.", source: "HCSF 2022" },
  { stat: "19 ans", label: "La durée moyenne d'un crédit immobilier en France en 2025.", source: "Observatoire Crédit Logement" },
  { stat: "7–8 %", label: "Les frais de notaire représentent 7 à 8 % du prix d'achat dans l'ancien.", source: "Notaires de France" },
  { stat: "65 %", label: "Des ménages français sont propriétaires de leur résidence principale.", source: "INSEE 2024" },
  { stat: "+ 47 %", label: "La hausse des prix immobiliers en France entre 2015 et 2024.", source: "Notaires de France" },
  { stat: "3,5 %", label: "Le taux moyen d'un crédit immobilier sur 20 ans au 1er trimestre 2026.", source: "Banque de France" },
];

function getStatDuJour() {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
  return STATS_DU_JOUR[dayOfYear % STATS_DU_JOUR.length];
}

/* ── Composant carte simulateur ──────────────────────────── */
function SimCard({ sim, theme }) {
  const accentColor = theme?.color || sim.color || "#1a56db";
  return (
    <Link to={sim.href} className="shub-card" style={{ "--card-accent": accentColor }}>
      <div className="shub-card-top">
        <div className="shub-card-icon" style={{ background: accentColor + "18", color: accentColor }}>
          {sim.icon}
        </div>
        <span className="shub-card-duration">
          <svg width="11" height="11" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
            <circle cx="6" cy="6" r="5.25" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <path d="M6 3.5V6l1.5 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
          </svg>
          {sim.duration}
        </span>
      </div>
      <h3 className="shub-card-title">{sim.title}</h3>
      <p className="shub-card-desc">{sim.desc}</p>
      <span className="shub-card-cta">
        Ouvrir le simulateur
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </span>
    </Link>
  );
}

export default function SimulateurHub() {
  useSEO({ title: "25+ Simulateurs Immobiliers Gratuits — PTZ, Prêt, Notaire, Épargne", description: "Tous nos outils gratuits : calculer un prêt immobilier, estimer les frais de notaire, simuler le PTZ 2026, optimiser son apport, tester sa capacité d'emprunt et bien plus.", path: "/simulateurs" });
  const [activeTheme, setActiveTheme] = useState("acheter");
  const [search, setSearch] = useState("");
  const stat = getStatDuJour();

  const theme = THEMES.find((t) => t.id === activeTheme);

  const filteredSims = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (q) {
      return SIMS.filter(
        (s) => s.title.toLowerCase().includes(q) || s.desc.toLowerCase().includes(q)
      );
    }
    if (!activeTheme) return SIMS.filter((s) => !s.featured);
    return SIMS.filter((s) => !s.featured && s.themes.includes(activeTheme));
  }, [activeTheme, search]);

  const featuredSim = SIMS.find((s) => s.featured);

  return (
    <div className="page">
      <TopBar />
      <main id="main-content" className="shub-page">

        {/* ── Hero ── */}
        <div className="shub-hero">
          <div className="shub-hero-text">
            <span className="shub-hero-badge">
              <span className="shub-hero-badge-dot" />
              {SIMS.length} simulateurs gratuits
            </span>
            <h1 className="shub-hero-title">Tous nos simulateurs</h1>
            <p className="shub-hero-sub">
              Des calculateurs précis pour chaque décision immobilière et financière — sans publicité, sans inscription.
            </p>
          </div>

          {/* Stat du jour */}
          <div className="shub-stat-jour">
            <p className="shub-stat-jour-label">💡 Chiffre du jour</p>
            <p className="shub-stat-jour-val">{stat.stat}</p>
            <p className="shub-stat-jour-desc">{stat.label}</p>
            <p className="shub-stat-jour-source">Source : {stat.source}</p>
          </div>
        </div>

        {/* ── Featured: main simulator ── */}
        <Link to={featuredSim.href} className="shub-featured">
          <div className="shub-featured-left">
            <span className="shub-featured-badge">⭐ Simulateur principal</span>
            <h2 className="shub-featured-title">{featuredSim.icon} {featuredSim.title}</h2>
            <p className="shub-featured-desc">{featuredSim.desc}</p>
            <span className="shub-featured-cta">Lancer la simulation →</span>
          </div>
          <div className="shub-featured-right" aria-hidden="true">
            <div className="shub-featured-preview">
              <div className="shub-fp-bar shub-fp-buy">
                <span>Achat</span><div className="shub-fp-fill" style={{ width: "58%" }} />
              </div>
              <div className="shub-fp-bar shub-fp-rent">
                <span>Location</span><div className="shub-fp-fill" style={{ width: "42%" }} />
              </div>
            </div>
          </div>
        </Link>

        {/* ── Guide personnalisé banner ── */}
        <Link to="/guide-personnalise" className="shub-guide-banner">
          <span className="shub-guide-emoji">🎯</span>
          <div className="shub-guide-text">
            <strong>Pas sûr par où commencer ?</strong>
            <span>Répondez à 3 questions — on sélectionne les simulateurs les plus adaptés à votre situation.</span>
          </div>
          <span className="shub-guide-cta">Mon parcours →</span>
        </Link>

        {/* ── Search bar ── */}
        <div className="shub-search-wrap">
          <svg className="shub-search-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.8"/>
            <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
          <input
            type="search"
            className="shub-search"
            placeholder="Rechercher un simulateur… (ex : épargne, notaire, couple)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Rechercher un simulateur"
          />
          {search && (
            <button type="button" className="shub-search-clear" onClick={() => setSearch("")} aria-label="Effacer la recherche">
              ✕
            </button>
          )}
        </div>

        {/* ── Theme tabs ── */}
        {!search && (
          <div className="shub-tabs" role="tablist" aria-label="Thèmes de simulateurs">
            {THEMES.map((t) => {
              const count = SIMS.filter((s) => !s.featured && s.themes.includes(t.id)).length;
              return (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  className={`shub-tab${activeTheme === t.id ? " shub-tab-active" : ""}`}
                  style={activeTheme === t.id ? { "--tab-color": t.color, "--tab-bg": t.bg, "--tab-border": t.border } : {}}
                  onClick={() => setActiveTheme((prev) => prev === t.id ? null : t.id)}
                  aria-selected={activeTheme === t.id}
                >
                  <span className="shub-tab-emoji">{t.emoji}</span>
                  <span className="shub-tab-label">{t.label}</span>
                  <span className="shub-tab-count">{count}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* ── Theme description ── */}
        {!search && theme && (
          <div className="shub-theme-intro" style={{ borderColor: theme.border, background: theme.bg }}>
            <span className="shub-theme-intro-emoji">{theme.emoji}</span>
            <p className="shub-theme-intro-text" style={{ color: theme.color }}>
              {activeTheme === "acheter" && "Évaluez votre capacité d'achat, calculez vos frais et planifiez votre projet immobilier."}
              {activeTheme === "investir" && "Analysez la rentabilité d'un investissement locatif, anticipez la fiscalité et optimisez votre patrimoine."}
              {activeTheme === "epargner" && "Calculez votre effort d'épargne, comparez les options de financement et optimisez vos remboursements."}
              {activeTheme === "comprendre" && "Explorez les mécanismes du marché, testez des scénarios et construisez votre culture immobilière."}
            </p>
          </div>
        )}

        {/* ── Simulator grid ── */}
        {filteredSims.length > 0 ? (
          <div className="shub-grid">
            {filteredSims.map((sim) => (
              <SimCard key={sim.href} sim={sim} theme={!search ? theme : null} />
            ))}
          </div>
        ) : (
          <div className="shub-no-results">
            <p>Aucun simulateur trouvé pour « {search} »</p>
            <button type="button" onClick={() => setSearch("")} className="shub-no-results-btn">
              Voir tous les simulateurs
            </button>
          </div>
        )}

      </main>
      <Footer />
    </div>
  );
}
