import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ARTICLES } from "../data/articles";

export default function BlogArticle() {
  const { slug } = useParams();
  const article = ARTICLES.find((a) => a.slug === slug);

  useEffect(() => {
    if (!article) return;
    document.title = `${article.title} — Louer ou Acheter`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", article.description);
    return () => {
      document.title = "Louer ou Acheter — Simulateur immobilier gratuit";
      if (meta)
        meta.setAttribute(
          "content",
          "Comparez louer et acheter en 2 minutes. Simulation chiffrée : mensualité, patrimoine, point d'équilibre. Gratuit, sans inscription."
        );
    };
  }, [article]);

  if (!article) {
    return (
      <div className="page">
        <header className="top-bar">
          <Link to="/" className="brand-btn">
            <span className="brand-text">
              Louer <span className="brand-accent">ou</span> Acheter
            </span>
          </Link>
        </header>
        <main style={{ padding: "80px 24px", textAlign: "center" }}>
          <p>Article introuvable.</p>
          <Link to="/blog">← Retour au blog</Link>
        </main>
      </div>
    );
  }

  const { Content } = article;
  const currentIndex = ARTICLES.findIndex((a) => a.slug === slug);
  const related = ARTICLES.filter((_, i) => i !== currentIndex).slice(0, 2);

  return (
    <div className="page">
      <header className="top-bar" role="banner">
        <Link to="/" className="brand-btn" aria-label="Retour au simulateur">
          <span className="brand-text">
            Louer <span className="brand-accent">ou</span> Acheter
          </span>
        </Link>
        <Link to="/blog" className="topbar-sim-link">← Blog</Link>
      </header>

      <main className="article-page">
        {/* Breadcrumb */}
        <nav className="article-breadcrumb" aria-label="Fil d'Ariane">
          <Link to="/">Accueil</Link>
          <span aria-hidden="true">/</span>
          <Link to="/blog">Blog</Link>
          <span aria-hidden="true">/</span>
          <span>{article.tag}</span>
        </nav>

        {/* Hero */}
        <header className="article-hero">
          <span className={`article-tag ${article.tagClass}`}>{article.tag}</span>
          <h1 className="article-h1">{article.title}</h1>
          <div className="article-meta">
            <span>{article.date}</span>
            <span className="article-meta-sep">·</span>
            <span>{article.readTime} de lecture</span>
          </div>
        </header>

        {/* Body */}
        <div className="article-body">
          <Content />
        </div>

        {/* CTA */}
        <div className="article-cta">
          <div className="article-cta-inner">
            <p className="article-cta-title">Calculez votre situation en 2 minutes</p>
            <p className="article-cta-desc">
              Entrez votre loyer, le bien visé et l'horizon de détention — le simulateur
              compare les deux patrimoines chiffres à l'appui.
            </p>
            <Link to="/" className="btn-primary">
              Lancer le simulateur gratuit →
            </Link>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="article-related">
            <h2 className="article-related-title">À lire aussi</h2>
            <div className="related-grid">
              {related.map((rel) => (
                <Link key={rel.slug} to={`/blog/${rel.slug}`} className="related-card">
                  <span className={`article-tag ${rel.tagClass}`}>{rel.tag}</span>
                  <p className="related-card-title">{rel.title}</p>
                  <span className="article-read-more">Lire →</span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
