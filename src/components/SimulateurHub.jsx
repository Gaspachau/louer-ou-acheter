import { Link } from "react-router-dom";
import TopBar from "./TopBar";
import Footer from "./Footer";

const SIMS = [
  {
    href: "/",
    icon: "🏠",
    title: "Louer ou Acheter",
    desc: "Comparez les deux scénarios chiffres à l'appui : mensualité, patrimoine net, point d'équilibre.",
    tag: "Immobilier",
    tagClass: "tag-blue",
    featured: true,
  },
  {
    href: "/simulateurs/rentabilite-locative",
    icon: "🏘️",
    title: "Rentabilité locative",
    desc: "Rendement brut, net et cashflow mensuel pour un investissement locatif.",
    tag: "Investissement",
    tagClass: "tag-green",
    new: true,
  },
  {
    href: "/simulateurs/frais-notaire",
    icon: "📋",
    title: "Frais de notaire",
    desc: "Calcul au centime près selon le barème légal 2024 — ancien et neuf.",
    tag: "Immobilier",
    tagClass: "tag-blue",
    new: true,
  },
  {
    href: "/simulateurs/plus-value",
    icon: "📈",
    title: "Plus-value immobilière",
    desc: "Impôt à la revente selon la durée de détention et les abattements légaux.",
    tag: "Fiscalité",
    tagClass: "tag-purple",
    new: true,
  },
  {
    href: "/simulateurs/comparateur-villes",
    icon: "🗺️",
    title: "Comparateur de villes",
    desc: "Loyer vs mensualité dans 12 grandes villes françaises — pour T1, T2 ou T3.",
    tag: "Immobilier",
    tagClass: "tag-blue",
    new: true,
  },
  {
    href: "/simulateurs/epargne",
    icon: "💰",
    title: "Simulateur d'épargne",
    desc: "Calculez l'épargne mensuelle nécessaire pour atteindre votre objectif financier.",
    tag: "Épargne",
    tagClass: "tag-green",
  },
  {
    href: "/simulateurs/pret-immobilier",
    icon: "🏦",
    title: "Prêt immobilier",
    desc: "Mensualité, coût total du crédit et tableau d'amortissement annuel.",
    tag: "Crédit",
    tagClass: "tag-purple",
  },
  {
    href: "/simulateurs/pret-conso",
    icon: "💳",
    title: "Prêt à la consommation",
    desc: "Simulez votre crédit auto, travaux ou personnel : mensualité et coût réel.",
    tag: "Crédit",
    tagClass: "tag-purple",
  },
  {
    href: "/simulateurs/niveau-de-vie",
    icon: "📊",
    title: "Niveau de vie",
    desc: "Visualisez votre revenu disponible après toutes vos charges fixes du mois.",
    tag: "Budget",
    tagClass: "tag-amber",
  },
  {
    href: "/simulateurs/endettement",
    icon: "📉",
    title: "Capacité d'emprunt",
    desc: "Taux d'endettement et montant maximum que vous pouvez emprunter selon vos revenus.",
    tag: "Crédit",
    tagClass: "tag-teal",
  },
  {
    href: "/simulateurs/charges-copro",
    icon: "🏢",
    title: "Charges de copropriété",
    desc: "Quote-part mensuelle et annuelle selon vos tantièmes, avec comparaison nationale.",
    tag: "Immobilier",
    tagClass: "tag-blue",
    new: true,
  },
  {
    href: "/simulateurs/taxe-fonciere",
    icon: "🏛️",
    title: "Taxe foncière",
    desc: "Estimation de la taxe foncière annuelle dans 12 villes françaises.",
    tag: "Fiscalité",
    tagClass: "tag-purple",
    new: true,
  },
  {
    href: "/simulateurs/score-acheteur",
    icon: "🎯",
    title: "Score de préparation",
    desc: "Êtes-vous vraiment prêt à acheter ? Radar sur 5 dimensions clés + plan d'action personnalisé.",
    tag: "Immobilier",
    tagClass: "tag-blue",
    new: true,
  },
  {
    href: "/simulateurs/optimiser-apport",
    icon: "💡",
    title: "Optimiseur d'apport",
    desc: "Vaut-il mieux acheter maintenant ou épargner quelques mois de plus ? ROI chiffré.",
    tag: "Stratégie",
    tagClass: "tag-teal",
    new: true,
  },
  {
    href: "/simulateurs/stress-test",
    icon: "🛡️",
    title: "Test de résistance",
    desc: "Votre projet face à 3 crises : hausse des taux, chute du marché, perte de revenus.",
    tag: "Stratégie",
    tagClass: "tag-teal",
    new: true,
  },
  {
    href: "/simulateurs/histoire",
    icon: "📖",
    title: "Votre histoire financière",
    desc: "Votre vie de propriétaire ou locataire racontée année par année — avec jalons et rebondissements.",
    tag: "Immobilier",
    tagClass: "tag-blue",
    new: true,
  },
  {
    href: "/simulateurs/budget-maximum",
    icon: "🏆",
    title: "Budget maximum",
    desc: "Jusqu'où pouvez-vous aller ? Budget par durée + carte des 12 villes accessibles.",
    tag: "Crédit",
    tagClass: "tag-purple",
    new: true,
  },
  {
    href: "/simulateurs/ptz",
    icon: "🏗️",
    title: "PTZ 2026",
    desc: "Êtes-vous éligible au Prêt à Taux Zéro ? Montant, conditions et économie calculés en temps réel.",
    tag: "Crédit",
    tagClass: "tag-purple",
    new: true,
  },
  {
    href: "/simulateurs/negociation",
    icon: "🤝",
    title: "Simulateur de négociation",
    desc: "À quel prix négocier pour que l'achat batte la location ? Point d'équilibre chiffré.",
    tag: "Stratégie",
    tagClass: "tag-teal",
    new: true,
  },
  {
    href: "/simulateurs/impact-dpe",
    icon: "♻️",
    title: "Impact DPE & rénovation",
    desc: "Décote d'une passoire thermique, économies de charges et ROI des travaux de rénovation.",
    tag: "Immobilier",
    tagClass: "tag-blue",
    new: true,
  },
  {
    href: "/simulateurs/remboursement-anticipe",
    icon: "⚡",
    title: "Remboursement anticipé",
    desc: "Vaut-il mieux rembourser son crédit par anticipation ou placer l'argent ? Décision optimale.",
    tag: "Stratégie",
    tagClass: "tag-teal",
    new: true,
  },
  {
    href: "/simulateurs/assurance-pret",
    icon: "🛡️",
    title: "Assurance emprunteur",
    desc: "Comparez assurance banque vs délégation. Calculez combien vous économisez avec la loi Lemoine.",
    tag: "Crédit",
    tagClass: "tag-purple",
    new: true,
  },
];

const CATEGORIES = [
  { label: "Tous", filter: null },
  { label: "Immobilier",    filter: "Immobilier" },
  { label: "Stratégie",    filter: "Stratégie" },
  { label: "Crédit",        filter: "Crédit" },
  { label: "Investissement", filter: "Investissement" },
  { label: "Épargne",       filter: "Épargne" },
  { label: "Fiscalité",     filter: "Fiscalité" },
  { label: "Budget",        filter: "Budget" },
];

import { useState } from "react";

export default function SimulateurHub() {
  const [catFilter, setCatFilter] = useState(null);
  const [featured, ...rest] = SIMS;

  const filtered = catFilter ? rest.filter((s) => s.tag === catFilter) : rest;

  return (
    <div className="page">
      <TopBar />
      <main id="main-content" className="blog-page">
        {/* Hero */}
        <div className="blog-hero">
          <div className="blog-hero-text">
            <span className="blog-kicker">Outils gratuits</span>
            <h1 className="blog-title">Tous nos simulateurs</h1>
            <p className="blog-subtitle">
              {SIMS.length} calculateurs précis pour prendre les meilleures décisions
              immobilières et financières — sans inscription, sans publicité.
            </p>
          </div>
          <div className="blog-stats">
            <div className="blog-stat">
              <span className="blog-stat-num">{SIMS.length}</span>
              <span className="blog-stat-label">outils</span>
            </div>
            <div className="blog-stat-divider" />
            <div className="blog-stat">
              <span className="blog-stat-num">100%</span>
              <span className="blog-stat-label">gratuit</span>
            </div>
            <div className="blog-stat-divider" />
            <div className="blog-stat">
              <span className="blog-stat-num">6</span>
              <span className="blog-stat-label">nouveaux</span>
            </div>
          </div>
        </div>

        {/* Featured */}
        <Link to={featured.href} className="featured-card" aria-label={featured.title}>
          <div className="featured-card-body">
            <div className="featured-card-top">
              <span className={`article-tag ${featured.tagClass}`}>{featured.tag}</span>
              <span className="article-read-time">Simulateur principal</span>
            </div>
            <h2 className="featured-card-title">{featured.title}</h2>
            <p className="featured-card-intro">{featured.desc}</p>
            <div className="featured-card-footer">
              <span className="article-cta-link">Lancer le simulateur →</span>
            </div>
          </div>
          <div className="featured-card-accent" aria-hidden="true">
            <span className="featured-card-icon">{featured.icon}</span>
          </div>
        </Link>

        {/* Category filters */}
        <div className="hub-filters" role="group" aria-label="Filtrer par catégorie">
          {CATEGORIES.map((c) => (
            <button
              key={c.label}
              type="button"
              className={`hub-filter-btn${catFilter === c.filter ? " hub-filter-active" : ""}`}
              onClick={() => setCatFilter(c.filter)}
            >
              {c.label}
              {c.filter && (
                <span className="hub-filter-count">
                  {SIMS.filter((s) => s.tag === c.filter && !s.featured).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="articles-section">
          <div className="sim-hub-grid">
            {filtered.map((sim) => (
              <Link key={sim.href} to={sim.href} className="sim-hub-card">
                {sim.new && <span className="sim-hub-new">Nouveau</span>}
                <div className="sim-hub-icon" aria-hidden="true">{sim.icon}</div>
                <span className={`article-tag ${sim.tagClass}`}>{sim.tag}</span>
                <h3 className="sim-hub-title">{sim.title}</h3>
                <p className="sim-hub-desc">{sim.desc}</p>
                <span className="article-read-more">Ouvrir →</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Blog CTA */}
        <div className="blog-cta-banner">
          <div className="blog-cta-inner">
            <p className="blog-cta-title">Besoin de comprendre avant de calculer ?</p>
            <p className="blog-cta-sub">Nos articles expliquent les concepts clés de l'immobilier et des finances personnelles.</p>
          </div>
          <Link to="/blog" className="btn-primary blog-cta-btn">Lire le blog →</Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
