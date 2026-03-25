import { Link } from "react-router-dom";

export default function TopBar({ onBrandClick, rightContent }) {
  return (
    <header className="top-bar" role="banner">
      {onBrandClick ? (
        <button className="brand-btn" onClick={onBrandClick} type="button" aria-label="Retour à l'accueil">
          <span className="brand-text">Louer <span className="brand-accent">ou</span> Acheter</span>
        </button>
      ) : (
        <Link to="/" className="brand-btn" aria-label="Accueil">
          <span className="brand-text">Louer <span className="brand-accent">ou</span> Acheter</span>
        </Link>
      )}
      <div className="topbar-right">
        <Link to="/simulateurs" className="topbar-nav-link">Simulateurs</Link>
        <Link to="/blog" className="topbar-blog-link">Blog</Link>
        {rightContent}
      </div>
    </header>
  );
}
