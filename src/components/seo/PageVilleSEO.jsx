import { useParams, Link } from "react-router-dom";
import { useSEO } from "../../utils/useSEO";
import TopBar from "../TopBar";
import Footer from "../Footer";
import { SEO_VILLES } from "../../data/seoVilles";

export default function PageVilleSEO() {
  const { citySlug } = useParams();
  const ville = SEO_VILLES[citySlug];

  useSEO({
    title: ville ? ville.seoTitle : "Louer ou acheter en France 2026",
    description: ville ? ville.seoDesc : "Simulateur immobilier gratuit",
    path: ville ? `/louer-ou-acheter-${ville.slug}` : "/",
  });

  if (!ville) {
    return (
      <div className="page">
        <TopBar />
        <main style={{ padding: "60px 20px", textAlign: "center" }}>
          <h1>Ville non trouvée</h1>
          <Link to="/">Retour à l'accueil</Link>
        </main>
        <Footer />
      </div>
    );
  }

  const { Content } = ville;

  return (
    <div className="page">
      <TopBar />
      <main>
        <article className="blog-article-content">
          <div className="blog-article-header">
            <nav aria-label="Fil d'Ariane" style={{ fontSize: 13, color: "#64748b", marginBottom: 12 }}>
              <Link to="/" style={{ color: "#64748b" }}>Accueil</Link>
              {" › "}
              <span>Louer ou acheter à {ville.nom}</span>
            </nav>
            <h1>Louer ou acheter à {ville.nom} en 2026 : notre analyse complète</h1>
          </div>

          {/* Key stats */}
          <div className="key-figures">
            <div className="key-figure">
              <span className="kf-value">{ville.prix_m2.toLocaleString("fr-FR")} €/m²</span>
              <span className="kf-label">Prix moyen</span>
            </div>
            <div className="key-figure">
              <span className="kf-value">{ville.loyer_t2} €/mois</span>
              <span className="kf-label">Loyer T2 moyen</span>
            </div>
            <div className="key-figure">
              <span className="kf-value">{ville.rentabilite_annees} ans</span>
              <span className="kf-label">Point d'équilibre</span>
            </div>
            <div className="key-figure">
              <span className="kf-value">{ville.tension}</span>
              <span className="kf-label">Tension locative</span>
            </div>
          </div>

          <Content />

          {/* CTA */}
          <div className="callout callout-tip" style={{ marginTop: 40 }}>
            <span className="callout-icon">🏠</span>
            <div className="callout-body">
              <strong>Calculez votre situation personnelle à {ville.nom}</strong>
              <br />
              Notre simulateur prend en compte vos revenus, votre apport et les prix locaux pour vous donner une réponse personnalisée.
              <br />
              <Link to="/" className="cta-link" style={{ display: "inline-block", marginTop: 10 }}>
                Lancer le simulateur →
              </Link>
            </div>
          </div>

          {/* Related simulators */}
          <h2 style={{ marginTop: 48 }}>Simulateurs utiles pour {ville.nom}</h2>
          <ul>
            <li><Link to="/simulateurs/pret-immobilier">Calculateur de prêt immobilier</Link></li>
            <li><Link to="/simulateurs/frais-notaire">Calculateur frais de notaire</Link></li>
            <li><Link to="/simulateurs/capacite-emprunt">Calculateur capacité d'emprunt</Link></li>
            <li><Link to="/simulateur-pret-immobilier-gratuit">Guide simulateur prêt immobilier</Link></li>
          </ul>
        </article>
      </main>
      <Footer />
    </div>
  );
}
