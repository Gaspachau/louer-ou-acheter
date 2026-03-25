import { Link } from "react-router-dom";

const SIMS = [
  { href: "/", label: "Louer ou Acheter" },
  { href: "/simulateurs/epargne", label: "Simulateur d'épargne" },
  { href: "/simulateurs/pret-immobilier", label: "Prêt immobilier" },
  { href: "/simulateurs/pret-conso", label: "Prêt à la consommation" },
  { href: "/simulateurs/niveau-de-vie", label: "Niveau de vie" },
  { href: "/simulateurs/endettement", label: "Capacité d'emprunt" },
];

const ARTICLES = [
  { href: "/blog/louer-ou-acheter-paris-2026", label: "Paris en 2026" },
  { href: "/blog/taux-immobilier-2026-previsions", label: "Taux immobiliers 2026" },
  { href: "/blog/ptz-2026-comment-en-beneficier", label: "PTZ 2026" },
  { href: "/blog/apport-personnel-combien-economiser", label: "Apport personnel" },
];

export default function Footer() {
  return (
    <footer className="site-footer" aria-label="Pied de page">
      <div className="footer-inner">

        {/* Brand column */}
        <div className="footer-brand">
          <Link to="/" className="footer-logo" aria-label="Accueil">
            Louer <span className="footer-logo-accent">ou</span> Acheter
          </Link>
          <p className="footer-tagline">
            Comparez louer et acheter en 2 minutes. Simulation chiffrée, gratuite et sans inscription.
          </p>
          <ul className="footer-trust-list" aria-label="Garanties">
            <li><span aria-hidden="true">🔒</span> Sans inscription · Sans publicité</li>
            <li><span aria-hidden="true">🏛️</span> Sources : INSEE · Banque de France · HCSF</li>
            <li><span aria-hidden="true">🗓️</span> Données mises à jour : mars 2026</li>
            <li><span aria-hidden="true">⚖️</span> Outil indépendant · Simulation pédagogique</li>
          </ul>
        </div>

        {/* Simulateurs column */}
        <div className="footer-col">
          <p className="footer-col-title">Simulateurs</p>
          <ul className="footer-links">
            {SIMS.map((s) => (
              <li key={s.href}><Link to={s.href}>{s.label}</Link></li>
            ))}
          </ul>
        </div>

        {/* Blog column */}
        <div className="footer-col">
          <p className="footer-col-title">Blog</p>
          <ul className="footer-links">
            <li><Link to="/blog">Tous les articles</Link></li>
            {ARTICLES.map((a) => (
              <li key={a.href}><Link to={a.href}>{a.label}</Link></li>
            ))}
          </ul>
        </div>

        {/* À propos column */}
        <div className="footer-col footer-about-col">
          <p className="footer-col-title">À propos</p>
          <p className="footer-about-text">
            Louer ou Acheter est un outil pédagogique indépendant. Il ne constitue pas un conseil
            financier, patrimonial ou une offre de crédit. Les simulations sont basées sur des
            formules financières standard et les données publiées par l'INSEE, la Banque de France
            et le HCSF.
          </p>
          <Link to="/simulateurs" className="footer-cta-link">
            Voir tous les simulateurs →
          </Link>
        </div>

      </div>

      <div className="footer-bottom">
        <span>© 2026 louer-acheter.fr</span>
        <span className="footer-bottom-sep" aria-hidden="true">·</span>
        <span>Simulation pédagogique — pas de conseil financier</span>
      </div>
    </footer>
  );
}
