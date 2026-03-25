import { Link, useLocation } from "react-router-dom";

export default function TopBar({ onBrandClick, rightContent }) {
  const { pathname } = useLocation();
  const isSim  = pathname.startsWith("/simulateurs");
  const isBlog = pathname === "/blog" || pathname.startsWith("/blog/");

  return (
    <header className="top-bar" role="banner">
      {/* Brand */}
      {onBrandClick ? (
        <button className="brand-btn" onClick={onBrandClick} type="button" aria-label="Retour à l'accueil">
          <span className="brand-text">Louer <span className="brand-accent">ou</span> Acheter</span>
        </button>
      ) : (
        <Link to="/" className="brand-btn" aria-label="Accueil">
          <span className="brand-text">Louer <span className="brand-accent">ou</span> Acheter</span>
        </Link>
      )}

      {/* Nav + optional stepper */}
      <div className="topbar-right">
        <nav className="topbar-nav" aria-label="Navigation principale">
          <Link
            to="/simulateurs"
            className={`topbar-nav-pill${isSim ? " topbar-nav-pill-active" : ""}`}
          >
            <svg className="topbar-nav-icon" width="13" height="13" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
              <rect x="0" y="8" width="3" height="6" rx="1" opacity=".55"/>
              <rect x="5" y="4" width="3" height="10" rx="1" opacity=".8"/>
              <rect x="10" y="0" width="3" height="14" rx="1"/>
            </svg>
            Simulateurs
          </Link>
          <Link
            to="/blog"
            className={`topbar-nav-pill${isBlog ? " topbar-nav-pill-active" : ""}`}
          >
            <svg className="topbar-nav-icon" width="13" height="13" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
              <rect x="1" y="2" width="12" height="2" rx="1"/>
              <rect x="1" y="6" width="8" height="2" rx="1" opacity=".7"/>
              <rect x="1" y="10" width="5" height="2" rx="1" opacity=".45"/>
            </svg>
            Blog
          </Link>
        </nav>
        {rightContent && (
          <div className="topbar-stepper-wrap">
            {rightContent}
          </div>
        )}
      </div>
    </header>
  );
}
