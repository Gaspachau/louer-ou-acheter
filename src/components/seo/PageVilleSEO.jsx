import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSEO } from "../../utils/useSEO";
import TopBar from "../TopBar";
import Footer from "../Footer";
import { SEO_VILLES } from "../../data/seoVilles";

const NATIONALE = { nom: "Moyenne nationale", prix_m2: 3200, loyer_t2: 750, rentabilite_annees: 14 };

function FAQAccordion({ items }) {
  const [open, setOpen] = useState(null);
  return (
    <div className="seo-faq-list">
      {items.map((item, i) => (
        <div key={i} className="seo-faq-item">
          <button
            className="seo-faq-btn"
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
          >
            <span className="seo-faq-question">{item.q}</span>
            <span className={`seo-faq-chevron${open === i ? " open" : ""}`}>▾</span>
          </button>
          {open === i && (
            <div className="seo-faq-answer">
              <p>{item.a}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function PageVilleSEO({ citySlug: citySlugProp }) {
  const { citySlug: citySlugParam } = useParams();
  const citySlug = citySlugProp || citySlugParam;
  const ville = SEO_VILLES[citySlug];

  const faqItems = ville ? [
    {
      q: `Faut-il louer ou acheter à ${ville.nom} en 2026 ?`,
      a: `À ${ville.nom}, le point d'équilibre financier entre louer et acheter est estimé à environ ${ville.rentabilite_annees} ans. Si vous envisagez de rester moins longtemps, la location est généralement plus avantageuse. Au-delà, l'achat devient rentable, surtout avec un apport solide et un bon taux. Notre simulateur personnalise cette analyse selon vos revenus et votre situation.`,
    },
    {
      q: `Quel est le prix moyen au m² à ${ville.nom} en 2026 ?`,
      a: `En 2026, le prix moyen au m² à ${ville.nom} est d'environ ${ville.prix_m2.toLocaleString("fr-FR")} €. Ce chiffre varie sensiblement selon les quartiers — les secteurs les plus prisés peuvent afficher des prix 30 à 50 % supérieurs à la moyenne, tandis que les quartiers périphériques sont souvent en dessous. Consultez les données des notaires de France pour les estimations hyperlocales.`,
    },
    {
      q: `Quel apport faut-il pour acheter à ${ville.nom} ?`,
      a: `Pour un T2 à ${ville.nom} (environ ${Math.round(ville.prix_m2 * 45).toLocaleString("fr-FR")} € pour 45 m²), un apport de 10 % représente ${Math.round(ville.prix_m2 * 45 * 0.10).toLocaleString("fr-FR")} €. Il faut y ajouter les frais de notaire (environ 7-8 % dans l'ancien), soit un apport total recommandé d'au moins ${Math.round(ville.prix_m2 * 45 * 0.18).toLocaleString("fr-FR")} €. Un apport de 20 % permet d'obtenir de meilleures conditions de taux.`,
    },
    {
      q: `Quel est le loyer moyen d'un T2 à ${ville.nom} ?`,
      a: `Le loyer moyen d'un T2 à ${ville.nom} est d'environ ${ville.loyer_t2.toLocaleString("fr-FR")} €/mois charges comprises. Ce montant peut varier de ±20 % selon la localisation précise, l'état du bien et les prestations. ${ville.tension === "Très forte" || ville.tension === "Forte" ? `La tension locative ${ville.tension.toLowerCase()} à ${ville.nom} signifie que trouver un logement peut nécessiter plusieurs semaines de recherche active.` : `La tension locative ${ville.tension.toLowerCase()} à ${ville.nom} offre un marché plus accessible que dans les grandes métropoles.`}`,
    },
  ] : [];

  const faqSchema = ville ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map((item) => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": { "@type": "Answer", "text": item.a },
    })),
  } : null;

  useSEO({
    title: ville ? ville.seoTitle : "Louer ou acheter en France 2026",
    description: ville ? ville.seoDesc : "Simulateur immobilier gratuit",
    path: ville ? `/louer-ou-acheter-${ville.slug}` : "/",
    schema: faqSchema,
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
  const verdict = ville.rentabilite_annees > 20 ? "louer" : "acheter";

  return (
    <div className="page">
      <TopBar />
      <main>
        {/* ── Hero ── */}
        <section className="seo-hero">
          <div className="seo-hero-inner">
            <nav aria-label="Fil d'Ariane" style={{ fontSize: 13, color: "rgba(255,255,255,.5)", marginBottom: 4 }}>
              <Link to="/" style={{ color: "rgba(255,255,255,.5)" }}>Accueil</Link>
              {" › "}
              <span>Louer ou acheter à {ville.nom}</span>
            </nav>
            <div className="seo-hero-badge">
              <span className="seo-hero-dot" />
              Analyse 2026 · {ville.region}
            </div>
            <h1 className="seo-hero-title">
              Louer ou acheter<br />à {ville.nom} en 2026
            </h1>
            <p className="seo-hero-sub">
              Prix au m², loyers, point d'équilibre et tension locative : toutes les données pour décider avec les chiffres.
            </p>
            <Link to="/simulateur" className="seo-hero-cta">
              Calculer ma situation à {ville.nom} →
            </Link>
            <div className="seo-hero-trust">
              <span className="seo-hero-trust-item">Gratuit, sans inscription</span>
              <span className="seo-hero-trust-item">Résultat en 2 minutes</span>
              <span className="seo-hero-trust-item">Données actualisées 2026</span>
            </div>
          </div>
        </section>

        {/* ── Metrics ── */}
        <section className="seo-metrics">
          <div className="seo-metrics-grid">
            <div className="seo-metric-card accent">
              <span className="seo-metric-icon">🏠</span>
              <span className="seo-metric-value">{ville.prix_m2.toLocaleString("fr-FR")} €</span>
              <span className="seo-metric-label">Prix moyen au m²</span>
            </div>
            <div className="seo-metric-card">
              <span className="seo-metric-icon">🔑</span>
              <span className="seo-metric-value">{ville.loyer_t2.toLocaleString("fr-FR")} €</span>
              <span className="seo-metric-label">Loyer T2 moyen / mois</span>
            </div>
            <div className="seo-metric-card">
              <span className="seo-metric-icon">📅</span>
              <span className="seo-metric-value">{ville.rentabilite_annees} ans</span>
              <span className="seo-metric-label">Point d'équilibre louer/acheter</span>
            </div>
            <div className="seo-metric-card">
              <span className="seo-metric-icon">📊</span>
              <span className="seo-metric-value" style={{ fontSize: "clamp(18px,2.5vw,24px)" }}>{ville.tension}</span>
              <span className="seo-metric-label">Tension locative</span>
            </div>
          </div>
        </section>

        {/* ── Content ── */}
        <section className="seo-content">
          <div className="seo-content-inner">
            <Content />
          </div>
        </section>

        {/* ── Simulator CTA ── */}
        <section className="seo-sim-cta">
          <div className="seo-sim-cta-inner">
            <span style={{ fontSize: 40 }}>🧮</span>
            <h2 className="seo-sim-cta-title">Calculez votre situation personnelle à {ville.nom}</h2>
            <p className="seo-sim-cta-sub">
              Notre simulateur prend en compte vos revenus, votre apport et les prix locaux pour vous donner une réponse personnalisée en 2 minutes — gratuitement.
            </p>
            <Link to="/simulateur" className="seo-hero-cta" style={{ alignSelf: "center" }}>
              Lancer le simulateur →
            </Link>
          </div>
        </section>

        {/* ── Comparison table ── */}
        <section className="seo-compare">
          <div className="seo-compare-inner">
            <p className="seo-section-kicker">Mise en perspective</p>
            <h2 className="seo-section-title">{ville.nom} vs la moyenne nationale</h2>
            <div style={{ overflowX: "auto" }}>
              <table className="seo-compare-table">
                <thead>
                  <tr>
                    <th style={{ textAlign: "left" }}>Indicateur</th>
                    <th>{ville.nom}</th>
                    <th>Moyenne nationale</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Prix au m²</td>
                    <td className={ville.prix_m2 < NATIONALE.prix_m2 ? "seo-cmp-better" : "seo-cmp-city"}>
                      {ville.prix_m2.toLocaleString("fr-FR")} €
                    </td>
                    <td>{NATIONALE.prix_m2.toLocaleString("fr-FR")} €</td>
                  </tr>
                  <tr>
                    <td>Loyer T2 / mois</td>
                    <td className={ville.loyer_t2 < NATIONALE.loyer_t2 ? "seo-cmp-better" : "seo-cmp-city"}>
                      {ville.loyer_t2.toLocaleString("fr-FR")} €
                    </td>
                    <td>{NATIONALE.loyer_t2.toLocaleString("fr-FR")} €</td>
                  </tr>
                  <tr>
                    <td>Point d'équilibre</td>
                    <td className={ville.rentabilite_annees <= NATIONALE.rentabilite_annees ? "seo-cmp-better" : "seo-cmp-city"}>
                      {ville.rentabilite_annees} ans
                    </td>
                    <td>{NATIONALE.rentabilite_annees} ans</td>
                  </tr>
                  <tr>
                    <td>Tension locative</td>
                    <td className="seo-cmp-city">{ville.tension}</td>
                    <td>Modérée</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="seo-faq">
          <div className="seo-faq-inner">
            <p className="seo-section-kicker">Questions fréquentes</p>
            <h2 className="seo-section-title">Vos questions sur {ville.nom}</h2>
            <FAQAccordion items={faqItems} />
          </div>
        </section>

        {/* ── Related simulators ── */}
        <section style={{ padding: "40px 24px", background: "#f8fafc", borderTop: "1px solid #e2e8f0" }}>
          <div style={{ maxWidth: 840, margin: "0 auto" }}>
            <p style={{ fontSize: 14, color: "#64748b", marginBottom: 12, fontWeight: 600 }}>Simulateurs utiles :</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {[
                { to: "/simulateurs/pret-immobilier", label: "Calculateur de prêt immobilier" },
                { to: "/simulateurs/frais-notaire", label: "Frais de notaire" },
                { to: "/simulateurs/endettement", label: "Capacité d'emprunt" },
                { to: "/simulateurs/budget-maximum", label: "Budget maximum" },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  style={{
                    fontSize: 14,
                    color: "#2563eb",
                    background: "#eff6ff",
                    padding: "7px 16px",
                    borderRadius: 20,
                    textDecoration: "none",
                    fontWeight: 500,
                    border: "1px solid #bfdbfe",
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
