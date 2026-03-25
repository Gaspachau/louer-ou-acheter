import { Link } from "react-router-dom";
import { ARTICLES } from "../data/articles";
import TopBar from "./TopBar";
import Footer from "./Footer";

const GRADIENTS = {
  "tag-blue":   "linear-gradient(135deg,#1a56db,#0ea5e9)",
  "tag-green":  "linear-gradient(135deg,#059669,#10b981)",
  "tag-purple": "linear-gradient(135deg,#7c3aed,#a855f7)",
  "tag-amber":  "linear-gradient(135deg,#d97706,#f59e0b)",
  "tag-teal":   "linear-gradient(135deg,#0d9488,#14b8a6)",
};

function ArticleCover({ tagClass }) {
  if (tagClass === "tag-blue") return (
    <svg viewBox="0 0 200 80" preserveAspectRatio="none" style={{display:"block",width:"100%",height:"100%"}} aria-hidden="true">
      <rect x="8"  y="40" width="22" height="40" fill="rgba(255,255,255,.12)" rx="3"/>
      <rect x="34" y="22" width="28" height="58" fill="rgba(255,255,255,.18)" rx="3"/>
      <rect x="66" y="32" width="20" height="48" fill="rgba(255,255,255,.13)" rx="3"/>
      <rect x="90" y="10" width="28" height="70" fill="rgba(255,255,255,.22)" rx="3"/>
      <rect x="122" y="26" width="24" height="54" fill="rgba(255,255,255,.15)" rx="3"/>
      <rect x="150" y="36" width="20" height="44" fill="rgba(255,255,255,.11)" rx="3"/>
      <rect x="178" y="44" width="16" height="36" fill="rgba(255,255,255,.09)" rx="3"/>
      <rect x="37" y="28" width="7" height="7" fill="rgba(255,255,255,.38)" rx="1"/>
      <rect x="48" y="28" width="7" height="7" fill="rgba(255,255,255,.38)" rx="1"/>
      <rect x="93" y="16" width="7" height="7" fill="rgba(255,255,255,.38)" rx="1"/>
      <rect x="105" y="16" width="7" height="7" fill="rgba(255,255,255,.38)" rx="1"/>
    </svg>
  );
  if (tagClass === "tag-green") return (
    <svg viewBox="0 0 200 80" preserveAspectRatio="none" style={{display:"block",width:"100%",height:"100%"}} aria-hidden="true">
      <rect x="8"  y="60" width="22" height="20" fill="rgba(255,255,255,.12)" rx="3"/>
      <rect x="38" y="46" width="22" height="34" fill="rgba(255,255,255,.17)" rx="3"/>
      <rect x="68" y="32" width="22" height="48" fill="rgba(255,255,255,.22)" rx="3"/>
      <rect x="98" y="18" width="22" height="62" fill="rgba(255,255,255,.27)" rx="3"/>
      <rect x="128" y="8"  width="22" height="72" fill="rgba(255,255,255,.32)" rx="3"/>
      <rect x="158" y="2"  width="22" height="78" fill="rgba(255,255,255,.37)" rx="3"/>
      <polyline points="19,60 49,46 79,32 109,18 139,8 169,2" stroke="rgba(255,255,255,.65)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="169" cy="2" r="4.5" fill="rgba(255,255,255,.8)"/>
    </svg>
  );
  if (tagClass === "tag-purple") return (
    <svg viewBox="0 0 200 80" preserveAspectRatio="none" style={{display:"block",width:"100%",height:"100%"}} aria-hidden="true">
      <circle cx="100" cy="40" r="30" fill="rgba(255,255,255,.08)" stroke="rgba(255,255,255,.2)" strokeWidth="1.5"/>
      <path d="M100 40 L130 40 A30 30 0 0 1 115 66 Z" fill="rgba(255,255,255,.22)"/>
      <path d="M100 40 L100 10 A30 30 0 0 1 130 40 Z" fill="rgba(255,255,255,.3)"/>
      <path d="M100 40 L115 66 A30 30 0 0 1 70 56 Z" fill="rgba(255,255,255,.16)"/>
      <circle cx="100" cy="40" r="12" fill="rgba(255,255,255,.08)" stroke="rgba(255,255,255,.22)" strokeWidth="1.5"/>
      <text x="22"  y="26" fontSize="22" fill="rgba(255,255,255,.24)" fontWeight="700" fontFamily="sans-serif">€</text>
      <text x="155" y="62" fontSize="22" fill="rgba(255,255,255,.24)" fontWeight="700" fontFamily="sans-serif">€</text>
    </svg>
  );
  if (tagClass === "tag-amber") return (
    <svg viewBox="0 0 200 80" preserveAspectRatio="none" style={{display:"block",width:"100%",height:"100%"}} aria-hidden="true">
      <path d="M8 62 C45 15,75 68,105 32 C135 2,165 52,192 28" stroke="rgba(255,255,255,.6)" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M8 62 C45 15,75 68,105 32 C135 2,165 52,192 28 L192 78 L8 78 Z" fill="rgba(255,255,255,.1)"/>
      <circle cx="105" cy="32" r="5" fill="rgba(255,255,255,.7)"/>
      <line x1="8" y1="78" x2="192" y2="78" stroke="rgba(255,255,255,.14)" strokeWidth="1"/>
      <line x1="8" y1="8"  x2="8"   y2="78" stroke="rgba(255,255,255,.14)" strokeWidth="1"/>
    </svg>
  );
  // tag-teal default
  return (
    <svg viewBox="0 0 200 80" preserveAspectRatio="none" style={{display:"block",width:"100%",height:"100%"}} aria-hidden="true">
      <path d="M8 68 L48 44 L88 52 L128 20 L168 24 L192 10" stroke="rgba(255,255,255,.62)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 68 L48 44 L88 52 L128 20 L168 24 L192 10 L192 78 L8 78 Z" fill="rgba(255,255,255,.09)"/>
      <circle cx="128" cy="20" r="5" fill="rgba(255,255,255,.7)"/>
      <polyline points="128,38 145,38 145,20" stroke="rgba(255,255,255,.4)" strokeWidth="1.5" fill="none"/>
    </svg>
  );
}

export default function BlogList() {
  const [featured, ...rest] = ARTICLES;

  return (
    <div className="page">
      <TopBar />
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

        {/* Featured */}
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

        {/* Articles grid with illustrated covers */}
        <div className="articles-section">
          <h2 className="articles-section-title">Tous les articles</h2>
          <div className="articles-grid">
            {rest.map((article) => (
              <Link key={article.slug} to={`/blog/${article.slug}`} className="article-card" aria-label={article.title}>
                <div
                  className="article-cover"
                  style={{ background: GRADIENTS[article.tagClass] || GRADIENTS["tag-blue"] }}
                  aria-hidden="true"
                >
                  <ArticleCover tagClass={article.tagClass} />
                </div>
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
            <p className="blog-cta-sub">Comparez louer et acheter dans votre situation personnelle en 2 minutes.</p>
          </div>
          <Link to="/" className="btn-primary blog-cta-btn">Lancer le simulateur →</Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
