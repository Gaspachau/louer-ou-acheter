import { Link } from "react-router-dom";
import { ARTICLES } from "../data/articles";

export default function BlogList() {
  const [featured, ...rest] = ARTICLES;

  return (
    <div className="page">
      <header className="top-bar" role="banner">
        <Link to="/" className="brand-btn" aria-label="Retour au simulateur">
          <span className="brand-text">
            Louer <span className="brand-accent">ou</span> Acheter
          </span>
        </Link>
        <Link to="/" className="topbar-sim-link">← Simulateur</Link>
      </header>

      <main className="blog-page">
        {/* Hero */}
        <div className="blog-hero">
          <div className="blog-hero-text">
            <span className="blog-kicker">Conseils &amp; analyses</span>
            <h1 className="blog-title">Le blog immobilier</h1>
            <p className="blog-subtitle">
              Décryptages du marché, calculs concrets et conseils pratiques pour
              prendre la meilleure décision entre louer et acheter.
            </p>
          </div>
          <div className="blog-stats">
            <div className="blog-stat">
              <span className="blog-stat-num">{ARTICLES.length}</span>
              <span className="blog-stat-label">articles</span>
            </div>
            <div className="blog-stat-divider" />
            <div className="blog-stat">
              <span className="blog-stat-num">100%</span>
              <span className="blog-stat-label">gratuit</span>
            </div>
            <div className="blog-stat-divider" />
            <div className="blog-stat">
              <span className="blog-stat-num">2026</span>
              <span className="blog-stat-label">à jour</span>
            </div>
          </div>
        </div>

        {/* Featured article */}
        <Link to={`/blog/${featured.slug}`} className="featured-card" aria-label={featured.title}>
          <div className="featured-card-body">
            <div className="featured-card-top">
              <span className={`article-tag ${featured.tagClass}`}>{featured.tag}</span>
              <span className="article-read-time">{featured.readTime} de lecture</span>
            </div>
            <h2 className="featured-card-title">{featured.title}</h2>
            <p className="featured-card-intro">{featured.intro}</p>
            <div className="featured-card-footer">
              <span className="article-date">{featured.date}</span>
              <span className="article-cta-link">Lire l'article →</span>
            </div>
          </div>
          <div className="featured-card-accent" aria-hidden="true">
            <span className="featured-card-icon">🏠</span>
          </div>
        </Link>

        {/* Grid */}
        <div className="articles-section">
          <h2 className="articles-section-title">Tous les articles</h2>
          <div className="articles-grid">
            {rest.map((article) => (
              <Link
                key={article.slug}
                to={`/blog/${article.slug}`}
                className="article-card"
                aria-label={article.title}
              >
                <div className="article-card-top">
                  <span className={`article-tag ${article.tagClass}`}>{article.tag}</span>
                  <span className="article-read-time">{article.readTime}</span>
                </div>
                <h3 className="article-card-title">{article.title}</h3>
                <p className="article-card-intro">{article.intro}</p>
                <div className="article-card-footer">
                  <span className="article-date">{article.date}</span>
                  <span className="article-read-more">Lire →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="blog-cta-banner">
          <div className="blog-cta-inner">
            <p className="blog-cta-title">Passez à la pratique</p>
            <p className="blog-cta-sub">
              Comparez louer et acheter dans votre situation personnelle en 2 minutes.
            </p>
          </div>
          <Link to="/" className="btn-primary blog-cta-btn">
            Lancer le simulateur gratuit →
          </Link>
        </div>
      </main>
    </div>
  );
}
