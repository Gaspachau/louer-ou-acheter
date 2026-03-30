import { Link, useParams } from "react-router-dom";
import { ARTICLES } from "../data/articles";
import TopBar from "./TopBar";
import ReadingProgress from "./ReadingProgress";
import Footer from "./Footer";
import { useSEO } from "../utils/useSEO";

// Map article tags to relevant simulators
const TAG_SIMS = {
  "Financement": [
    { label: "Capacité d'emprunt", path: "/simulateurs/endettement", icon: "📊" },
    { label: "Simulateur de prêt", path: "/simulateurs/pret-immobilier", icon: "🏦" },
    { label: "Budget maximum", path: "/simulateurs/budget-max", icon: "💰" },
  ],
  "Marché immobilier": [
    { label: "Comparateur de villes", path: "/simulateurs/comparateur-villes", icon: "🗺️" },
    { label: "Pouvoir d'achat au m²", path: "/simulateurs/pouvoir-achat-m2", icon: "📈" },
    { label: "Machine à remonter le temps", path: "/simulateurs/machine-temps", icon: "⏰" },
  ],
  "Marché": [
    { label: "Comparateur de villes", path: "/simulateurs/comparateur-villes", icon: "🗺️" },
    { label: "Pouvoir d'achat au m²", path: "/simulateurs/pouvoir-achat-m2", icon: "📈" },
  ],
  "Conseils pratiques": [
    { label: "Score acheteur", path: "/simulateurs/score-acheteur", icon: "⭐" },
    { label: "Calendrier acheteur", path: "/simulateurs/calendrier-acheteur", icon: "📅" },
    { label: "Stress test financier", path: "/simulateurs/stress-test", icon: "🔥" },
  ],
  "Aides et dispositifs": [
    { label: "Simulateur PTZ 2026", path: "/simulateurs/ptz", icon: "🏠" },
    { label: "Score acheteur", path: "/simulateurs/score-acheteur", icon: "⭐" },
  ],
  "Primo-accédant": [
    { label: "Simulateur PTZ 2026", path: "/simulateurs/ptz", icon: "🏠" },
    { label: "Score acheteur", path: "/simulateurs/score-acheteur", icon: "⭐" },
    { label: "Budget maximum", path: "/simulateurs/budget-max", icon: "💰" },
  ],
  "Technique": [
    { label: "Impact DPE & rénovation", path: "/simulateurs/impact-dpe", icon: "♻️" },
    { label: "Frais de notaire", path: "/simulateurs/frais-notaire", icon: "📋" },
  ],
  "Crédit": [
    { label: "Simulateur de prêt", path: "/simulateurs/pret-immobilier", icon: "🏦" },
    { label: "Assurance prêt", path: "/simulateurs/assurance-pret", icon: "🛡️" },
    { label: "Remboursement anticipé", path: "/simulateurs/remboursement-anticipe", icon: "⚡" },
  ],
};

export default function BlogArticle() {
  const { slug } = useParams();
  const article = ARTICLES.find((a) => a.slug === slug);

  useSEO({
    title: article ? article.title : "Article introuvable",
    description: article?.description,
    path: article ? `/blog/${article.slug}` : "/blog",
  });

  if (!article) {
    return (
      <div className="page">
        <TopBar />
        <main style={{ padding: "80px 24px", textAlign: "center" }}>
          <p>Article introuvable.</p>
          <Link to="/blog">← Retour au blog</Link>
        </main>
      </div>
    );
  }

  const { Content } = article;
  const currentIndex = ARTICLES.findIndex((a) => a.slug === slug);
  // Same-tag articles first, then others
  const sameTag = ARTICLES.filter((a, i) => i !== currentIndex && a.tag === article.tag);
  const others = ARTICLES.filter((a, i) => i !== currentIndex && a.tag !== article.tag);
  const related = [...sameTag, ...others].slice(0, 3);
  const linkedSims = TAG_SIMS[article.tag] || [];

  return (
    <div className="page">
      <ReadingProgress />
      <TopBar />
      <main id="main-content" className="article-page">
        <nav className="article-breadcrumb" aria-label="Fil d'Ariane">
          <Link to="/">Accueil</Link>
          <span aria-hidden="true">/</span>
          <Link to="/blog">Blog</Link>
          <span aria-hidden="true">/</span>
          <span>{article.tag}</span>
        </nav>

        <header className="article-hero">
          <span className={`article-tag ${article.tagClass}`}>{article.tag}</span>
          <h1 className="article-h1">{article.title}</h1>
          <div className="article-meta">
            <span>{article.date}</span>
            <span className="article-meta-sep">·</span>
            <span>{article.readTime} de lecture</span>
          </div>
        </header>

        <div className="article-body">
          <Content />
        </div>

        <div className="article-cta">
          <div className="article-cta-inner">
            <p className="article-cta-title">Calculez votre situation en 2 minutes</p>
            <p className="article-cta-desc">
              Entrez votre loyer, le bien visé et l'horizon de détention — le simulateur
              compare les deux patrimoines chiffres à l'appui.
            </p>
            <Link to="/" className="btn-primary">Lancer le simulateur gratuit →</Link>
          </div>
        </div>

        {linkedSims.length > 0 && (
          <section className="article-sims">
            <h2 className="article-sims-title">🧮 Simulateurs liés à cet article</h2>
            <div className="article-sims-grid">
              {linkedSims.map((sim) => (
                <Link key={sim.path} to={sim.path} className="article-sim-card">
                  <span className="article-sim-icon">{sim.icon}</span>
                  <span className="article-sim-label">{sim.label}</span>
                  <span className="article-sim-arrow">→</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {related.length > 0 && (
          <section className="article-related">
            <h2 className="article-related-title">À lire aussi</h2>
            <div className="related-grid">
              {related.map((rel) => (
                <Link key={rel.slug} to={`/blog/${rel.slug}`} className="related-card">
                  <span className={`article-tag ${rel.tagClass}`}>{rel.tag}</span>
                  <p className="related-card-title">{rel.title}</p>
                  <span className="article-meta-sep">·</span>
                  <span className="article-read-time">{rel.readTime}</span>
                  <span className="article-read-more">Lire →</span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
