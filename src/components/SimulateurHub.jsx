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
];

export default function SimulateurHub() {
  const [featured, ...rest] = SIMS;

  return (
    <div className="page">
      <TopBar />
      <main className="blog-page">
        {/* Hero */}
        <div className="blog-hero">
          <div className="blog-hero-text">
            <span className="blog-kicker">Outils gratuits</span>
            <h1 className="blog-title">Tous nos simulateurs</h1>
            <p className="blog-subtitle">
              Des calculateurs précis pour prendre les meilleures décisions immobilières
              et financières — sans inscription, sans publicité.
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
              <span className="blog-stat-num">Temps réel</span>
              <span className="blog-stat-label">résultats</span>
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

        {/* Grid */}
        <div className="articles-section">
          <h2 className="articles-section-title">Calculateurs financiers</h2>
          <div className="sim-hub-grid">
            {rest.map((sim) => (
              <Link key={sim.href} to={sim.href} className="sim-hub-card">
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
