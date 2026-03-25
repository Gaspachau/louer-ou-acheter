import { Link } from "react-router-dom";
import { ARTICLES } from "../data/articles";

export default function BlogList() {
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
        <div className="blog-hero">
          <span className="blog-kicker">Conseils &amp; analyses</span>
          <h1 className="blog-title">Le blog immobilier</h1>
          <p className="blog-subtitle">
            Décryptages du marché, calculs concrets et conseils pratiques pour
            prendre la meilleure décision entre louer et acheter.
          </p>
        </div>

        <div className="articles-grid">
          {ARTICLES.map((article) => (
            <Link
              key={article.slug}
              to={`/blog/${article.slug}`}
              className="article-card"
              aria-label={article.title}
            >
              <div className="article-card-top">
                <span className="article-tag">{article.tag}</span>
                <span className="article-read-time">{article.readTime}</span>
              </div>
              <h2 className="article-card-title">{article.title}</h2>
              <p className="article-card-intro">{article.intro}</p>
              <div className="article-card-footer">
                <span className="article-date">{article.date}</span>
                <span className="article-read-more">Lire l'article →</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="blog-cta-banner">
          <p className="blog-cta-text">
            Prêt à comparer votre situation personnelle ?
          </p>
          <Link to="/" className="btn-primary blog-cta-btn">
            Lancer le simulateur gratuit →
          </Link>
        </div>
      </main>
    </div>
  );
}
