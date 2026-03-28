import { useState } from "react";
import { Link } from "react-router-dom";
import TopBar from "./TopBar";
import Footer from "./Footer";

/* ── Simulateurs triés dans l'ordre du parcours acheteur ── */
const SIMS = [
  /* Featured */
  {
    href: "/",
    icon: "🏠",
    title: "Louer ou Acheter",
    desc: "Comparez les deux scénarios chiffres à l'appui : mensualité, patrimoine net, point d'équilibre.",
    tag: "Immobilier",
    tagClass: "tag-blue",
    featured: true,
  },

  /* Étape 1 — Puis-je acheter ? */
  { href: "/simulateurs/endettement",    icon: "📉", title: "Capacité d'emprunt",      desc: "Taux d'endettement et montant maximum que vous pouvez emprunter selon vos revenus.", tag: "Crédit",       tagClass: "tag-teal",   step: 1 },
  { href: "/simulateurs/budget-maximum", icon: "🏆", title: "Budget maximum",           desc: "Jusqu'où pouvez-vous aller ? Budget par durée + carte des 12 villes accessibles.",  tag: "Crédit",       tagClass: "tag-purple", step: 1 },
  { href: "/simulateurs/score-acheteur", icon: "🎯", title: "Score de préparation",     desc: "Êtes-vous vraiment prêt à acheter ? Radar sur 5 dimensions clés + plan d'action.", tag: "Immobilier",  tagClass: "tag-blue",   step: 1 },

  /* Étape 2 — Est-ce le bon moment ? */
  { href: "/simulateurs/comparateur-villes", icon: "🗺️", title: "Comparateur de villes",     desc: "Loyer vs mensualité dans 12 grandes villes françaises — pour T1, T2 ou T3.",        tag: "Immobilier", tagClass: "tag-blue", step: 2 },
  { href: "/simulateurs/negociation",        icon: "🤝", title: "Simulateur de négociation", desc: "À quel prix négocier pour que l'achat batte la location ? Point d'équilibre chiffré.", tag: "Stratégie",  tagClass: "tag-teal", step: 2 },
  { href: "/simulateurs/histoire",           icon: "📖", title: "Votre histoire financière", desc: "Votre vie de propriétaire ou locataire racontée année par année.",                    tag: "Immobilier", tagClass: "tag-blue", step: 2 },

  /* Étape 3 — Quel bien puis-je acheter ? */
  { href: "/simulateurs/frais-notaire",  icon: "📋", title: "Frais de notaire",      desc: "Calcul au centime près selon le barème légal 2024 — ancien et neuf.",                tag: "Immobilier", tagClass: "tag-blue",   step: 3 },
  { href: "/simulateurs/pret-immobilier",icon: "🏦", title: "Prêt immobilier",        desc: "Mensualité, coût total du crédit et tableau d'amortissement annuel.",                tag: "Crédit",     tagClass: "tag-purple", step: 3 },
  { href: "/simulateurs/ptz",            icon: "🏗️", title: "PTZ 2026",              desc: "Êtes-vous éligible au Prêt à Taux Zéro ? Montant, conditions et économie calculés.", tag: "Crédit",     tagClass: "tag-purple", step: 3 },
  { href: "/simulateurs/charges-copro",  icon: "🏢", title: "Charges de copropriété",desc: "Quote-part mensuelle et annuelle selon vos tantièmes, avec comparaison nationale.",  tag: "Immobilier", tagClass: "tag-blue",   step: 3 },
  { href: "/simulateurs/taxe-fonciere",  icon: "🏛️", title: "Taxe foncière",          desc: "Estimation de la taxe foncière annuelle dans 12 villes françaises.",                tag: "Fiscalité",  tagClass: "tag-purple", step: 3 },

  /* Étape 4 — Est-ce rentable ? */
  { href: "/simulateurs/rentabilite-locative", icon: "🏘️", title: "Rentabilité locative",     desc: "Rendement brut, net et cashflow mensuel pour un investissement locatif.",            tag: "Investissement", tagClass: "tag-green",  step: 4 },
  { href: "/simulateurs/plus-value",           icon: "📈", title: "Plus-value immobilière",    desc: "Impôt à la revente selon la durée de détention et les abattements légaux.",          tag: "Fiscalité",      tagClass: "tag-purple", step: 4 },
  { href: "/simulateurs/impact-dpe",           icon: "♻️", title: "Impact DPE & rénovation",   desc: "Décote d'une passoire thermique, économies de charges et ROI des travaux.",          tag: "Immobilier",     tagClass: "tag-blue",   step: 4 },

  /* Étape 5 — Comment financer ? */
  { href: "/simulateurs/optimiser-apport",       icon: "💡", title: "Optimiseur d'apport",    desc: "Acheter maintenant ou épargner encore ? ROI chiffré de chaque option.",               tag: "Stratégie", tagClass: "tag-teal",   step: 5 },
  { href: "/simulateurs/epargne",                icon: "💰", title: "Simulateur d'épargne",   desc: "Calculez l'épargne mensuelle nécessaire pour atteindre votre objectif financier.",   tag: "Épargne",   tagClass: "tag-green",  step: 5 },
  { href: "/simulateurs/assurance-pret",         icon: "🛡️", title: "Assurance emprunteur",  desc: "Comparez banque vs délégation. Économie loi Lemoine calculée.",                      tag: "Crédit",    tagClass: "tag-purple", step: 5 },
  { href: "/simulateurs/remboursement-anticipe", icon: "⚡", title: "Remboursement anticipé", desc: "Rembourser par anticipation ou placer l'argent ? Décision optimale chiffrée.",       tag: "Stratégie", tagClass: "tag-teal",   step: 5 },
  { href: "/simulateurs/pret-conso",             icon: "💳", title: "Prêt à la consommation",desc: "Simulez votre crédit auto, travaux ou personnel : mensualité et coût réel.",         tag: "Crédit",    tagClass: "tag-purple", step: 5 },

  /* Outils transverses */
  { href: "/simulateurs/stress-test",  icon: "🛡️", title: "Test de résistance", desc: "Votre projet face à 3 crises : hausse des taux, chute du marché, perte de revenus.",  tag: "Stratégie", tagClass: "tag-teal"  },
  { href: "/simulateurs/niveau-de-vie",icon: "📊", title: "Niveau de vie",      desc: "Visualisez votre revenu disponible après toutes vos charges fixes du mois.",         tag: "Budget",    tagClass: "tag-amber" },

  /* Fonctionnalités créatives */
  { href: "/simulateurs/pouvoir-achat-m2",    icon: "🗺️", title: "Pouvoir d'achat par ville",       desc: "Combien de m² pouvez-vous acheter dans 10 grandes villes françaises avec votre budget ?",            tag: "Immobilier",  tagClass: "tag-blue",   step: 2 },
  { href: "/simulateurs/simulateur-couple",   icon: "👫", title: "Simulateur d'achat à deux",       desc: "Combinez vos revenus pour calculer votre capacité d'emprunt en couple et votre budget immobilier.",   tag: "Crédit",      tagClass: "tag-purple", step: 1 },
  { href: "/simulateurs/machine-temps",       icon: "⏳", title: "Machine à remonter le temps",     desc: "Et si vous aviez acheté en 2010, 2015 ou 2018 ? Calculez le gain ou la perte réelle selon la ville.", tag: "Stratégie",   tagClass: "tag-teal",   step: 2 },
  { href: "/simulateurs/calendrier-acheteur", icon: "📅", title: "Calendrier acheteur personnalisé",desc: "Votre feuille de route complète vers les clés — étapes, délais et conseils selon votre situation.",   tag: "Immobilier",  tagClass: "tag-blue",   step: 5 },
  { href: "/simulateurs/heritage-immobilier", icon: "🏛️", title: "Héritage : garder ou vendre ?",  desc: "Héritez d'un bien ou en possédez un en trop ? Calculez la stratégie optimale sur le long terme.",     tag: "Investissement", tagClass: "tag-green" },
];

const STEP_LABELS = {
  1: { label: "Étape 1 · Puis-je acheter ?",        color: "#0f766e" },
  2: { label: "Étape 2 · Est-ce le bon moment ?",    color: "#1e40af" },
  3: { label: "Étape 3 · Quel bien puis-je acheter ?",color: "#6d28d9" },
  4: { label: "Étape 4 · Est-ce rentable ?",          color: "#b45309" },
  5: { label: "Étape 5 · Comment financer ?",         color: "#9d174d" },
};

const CATEGORIES = [
  { label: "Tous",           filter: null },
  { label: "Immobilier",     filter: "Immobilier" },
  { label: "Stratégie",      filter: "Stratégie" },
  { label: "Crédit",         filter: "Crédit" },
  { label: "Investissement", filter: "Investissement" },
  { label: "Épargne",        filter: "Épargne" },
  { label: "Fiscalité",      filter: "Fiscalité" },
  { label: "Budget",         filter: "Budget" },
];

export default function SimulateurHub() {
  const [catFilter, setCatFilter] = useState(null);
  const [featured, ...rest] = SIMS;

  /* When filtering, show flat list. When showing all, show with step badges */
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
              <span className="blog-stat-num">5</span>
              <span className="blog-stat-label">étapes</span>
            </div>
          </div>
        </div>

        {/* Guide personnalisé banner */}
        <Link to="/guide-personnalise" className="hub-guide-banner hub-guide-banner-perso" style={{ marginBottom: 12 }}>
          <div className="hub-guide-steps">
            {["?", "?", "?"].map((n, i) => (
              <span key={i} className="hub-guide-step-dot" style={{ fontSize: 14 }}>{n}</span>
            ))}
          </div>
          <div className="hub-guide-text">
            <p className="hub-guide-title">🎯 Guide personnalisé — 3 questions pour votre parcours sur mesure</p>
            <p className="hub-guide-sub">Dites-nous votre situation et vos objectifs. On sélectionne les bons simulateurs pour vous.</p>
          </div>
          <span className="hub-guide-arrow">→</span>
        </Link>

        {/* Guide banner */}
        <Link to="/guide-achat" className="hub-guide-banner">
          <div className="hub-guide-steps">
            {[1,2,3,4,5].map((n) => (
              <span key={n} className="hub-guide-step-dot">{n}</span>
            ))}
          </div>
          <div className="hub-guide-text">
            <p className="hub-guide-title">Suivre le parcours acheteur en 5 étapes</p>
            <p className="hub-guide-sub">De "puis-je acheter ?" à "comment financer ?" — les bons outils au bon moment.</p>
          </div>
          <span className="hub-guide-arrow">→</span>
        </Link>

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

        {/* Grid — with step section headers when not filtered */}
        <div className="articles-section">
          {!catFilter ? (
            /* Grouped by step */
            <div className="sim-hub-journey">
              {Object.entries(STEP_LABELS).map(([stepNum, meta]) => {
                const stepSims = filtered.filter((s) => s.step === Number(stepNum));
                if (stepSims.length === 0) return null;
                return (
                  <div key={stepNum} className="sim-hub-journey-section">
                    <p className="sim-hub-step-label" style={{ color: meta.color }}>
                      <span className="sim-hub-step-dot" style={{ background: meta.color }} />
                      {meta.label}
                    </p>
                    <div className="sim-hub-grid">
                      {stepSims.map((sim) => (
                        <SimCard key={sim.href} sim={sim} />
                      ))}
                    </div>
                  </div>
                );
              })}
              {/* Transversal tools (no step) */}
              {(() => {
                const misc = filtered.filter((s) => !s.step);
                if (!misc.length) return null;
                return (
                  <div className="sim-hub-journey-section">
                    <p className="sim-hub-step-label" style={{ color: "var(--muted)" }}>
                      <span className="sim-hub-step-dot" style={{ background: "var(--muted)" }} />
                      Outils transverses
                    </p>
                    <div className="sim-hub-grid">
                      {misc.map((sim) => <SimCard key={sim.href} sim={sim} />)}
                    </div>
                  </div>
                );
              })()}
            </div>
          ) : (
            /* Flat grid when filtering by category */
            <div className="sim-hub-grid">
              {filtered.map((sim) => <SimCard key={sim.href} sim={sim} />)}
            </div>
          )}
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

function SimCard({ sim }) {
  return (
    <Link to={sim.href} className="sim-hub-card">
      <div className="sim-hub-icon" aria-hidden="true">{sim.icon}</div>
      <span className={`article-tag ${sim.tagClass}`}>{sim.tag}</span>
      <h3 className="sim-hub-title">{sim.title}</h3>
      <p className="sim-hub-desc">{sim.desc}</p>
      <span className="article-read-more">Ouvrir →</span>
    </Link>
  );
}
