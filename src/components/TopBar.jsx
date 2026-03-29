import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const NAV_LINKS = [
  {
    to: "/simulateurs",
    label: "Simulateurs",
    match: (p) => p.startsWith("/simulateurs"),
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
        <rect x="0" y="8" width="3" height="6" rx="1" opacity=".55"/>
        <rect x="5" y="4" width="3" height="10" rx="1" opacity=".8"/>
        <rect x="10" y="0" width="3" height="14" rx="1"/>
      </svg>
    ),
  },
  {
    to: "/carte-mondiale",
    label: "Carte",
    match: (p) => p === "/carte-mondiale",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <circle cx="7" cy="7" r="6"/>
        <path d="M7 1C7 1 5 4 5 7s2 6 2 6M7 1c0 0 2 3 2 6s-2 6-2 6M1 7h12" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    to: "/guide-achat",
    label: "Guide",
    match: (p) => p === "/guide-achat",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
        <path d="M2 2h10v1.5H2zM2 5h7v1.5H2zM2 8h8.5v1.5H2zM2 11h5v1.5H2z" opacity=".9"/>
        <circle cx="11.5" cy="11.5" r="2" fill="none" stroke="currentColor" strokeWidth="1.3"/>
        <path d="M13 13l1.2 1.2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    to: "/blog",
    label: "Blog",
    match: (p) => p === "/blog" || p.startsWith("/blog/"),
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
        <rect x="1" y="2" width="12" height="2" rx="1"/>
        <rect x="1" y="6" width="8" height="2" rx="1" opacity=".7"/>
        <rect x="1" y="10" width="5" height="2" rx="1" opacity=".45"/>
      </svg>
    ),
  },
  {
    to: "/jeu",
    label: "ImmoMaestro",
    match: (p) => p === "/jeu",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <rect x="1" y="3" width="12" height="8" rx="2"/>
        <path d="M4 7h2M5 6v2M9 7h.01M10.5 7h.01" strokeLinecap="round"/>
      </svg>
    ),
  },
];

export default function TopBar({ onBrandClick, rightContent }) {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  // Close menu on outside click
  useEffect(() => {
    if (!menuOpen) return;
    const close = (e) => {
      if (!menuRef.current?.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener("pointerdown", close, true);
    return () => document.removeEventListener("pointerdown", close, true);
  }, [menuOpen]);

  const brand = (
    <span className="brand-text">
      Louer <span className="brand-accent">ou</span> Acheter
    </span>
  );

  return (
    <header className={`top-bar${scrolled ? " top-bar-scrolled" : ""}`} role="banner" ref={menuRef}>
      <a href="#main-content" className="skip-to-content">Aller au contenu principal</a>

      {/* Brand */}
      {onBrandClick ? (
        <button className="brand-btn" onClick={onBrandClick} type="button" aria-label="Retour à l'accueil">
          {brand}
        </button>
      ) : (
        <Link to="/" className="brand-btn" aria-label="Accueil">
          {brand}
        </Link>
      )}

      {/* Desktop nav + optional stepper */}
      <div className="topbar-right">
        <nav className="topbar-nav" aria-label="Navigation principale">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`topbar-nav-pill${link.match(pathname) ? " topbar-nav-pill-active" : ""}`}
              aria-current={link.match(pathname) ? "page" : undefined}
            >
              <span className="topbar-nav-icon">{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </nav>
        {rightContent && (
          <div className="topbar-stepper-wrap">
            {rightContent}
          </div>
        )}
      </div>

      {/* Mobile: stepper (if active) + hamburger */}
      <div className="topbar-mobile-right">
        {rightContent && (
          <div className="topbar-stepper-wrap topbar-stepper-mobile">
            {rightContent}
          </div>
        )}
        <button
          type="button"
          className={`topbar-hamburger${menuOpen ? " is-open" : ""}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav-menu"
        >
          <span className="hamburger-bar" />
          <span className="hamburger-bar" />
          <span className="hamburger-bar" />
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <nav
          id="mobile-nav-menu"
          className="topbar-mobile-menu"
          aria-label="Navigation mobile"
          onClick={() => setMenuOpen(false)}
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`topbar-mobile-link${link.match(pathname) ? " active" : ""}`}
              aria-current={link.match(pathname) ? "page" : undefined}
            >
              <span className="topbar-mobile-link-icon">{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
