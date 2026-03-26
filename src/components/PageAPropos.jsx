import { Link } from "react-router-dom";
import TopBar from "./TopBar";
import Footer from "./Footer";

const SOURCES = [
  {
    label: "INSEE — Indices des prix à la consommation et loyers",
    url: "https://www.insee.fr/fr/statistiques/serie/010543666",
    desc: "Taux d'inflation, évolution des loyers, revenus des ménages.",
  },
  {
    label: "Banque de France — Taux d'intérêt des crédits immobiliers",
    url: "https://www.banque-france.fr/statistiques/taux-et-cours/taux-des-credits",
    desc: "Taux moyens des nouveaux crédits immobiliers aux particuliers.",
  },
  {
    label: "HCSF — Recommandation sur le taux d'effort et la durée des crédits",
    url: "https://www.hcsf.fr/wp-content/uploads/2021/09/HCSF_Recommandation-R-HCSF-2021-R-01.pdf",
    desc: "Plafond d'endettement à 35 % et durée maximale de 25 ans.",
  },
  {
    label: "Notaires de France — Barème des droits de mutation",
    url: "https://www.notaires.fr/fr/immobilier-fiscalite/prix-et-tendances-de-limmobilier",
    desc: "Calcul des frais de notaire selon le barème légal 2024.",
  },
  {
    label: "Service-Public.fr — Plus-value immobilière",
    url: "https://www.service-public.fr/particuliers/vosdroits/F10864",
    desc: "Abattements sur la durée de détention pour l'impôt et les prélèvements sociaux.",
  },
  {
    label: "Direction Générale des Finances Publiques — Taxe foncière",
    url: "https://www.impots.gouv.fr/particulier/la-taxe-fonciere",
    desc: "Calcul de la taxe foncière selon la valeur locative cadastrale et les taux communaux.",
  },
];

const FORMULAS = [
  {
    title: "Mensualité de crédit",
    formula: "M = P × r / (1 − (1 + r)⁻ⁿ)",
    desc: "P = capital emprunté, r = taux mensuel (taux annuel / 12), n = nombre de mensualités. C'est la formule standard d'annuité constante utilisée par toutes les banques françaises.",
  },
  {
    title: "Patrimoine net du propriétaire",
    formula: "PN = V(t) − (K₀ − remboursements cumulés) − frais de revente",
    desc: "V(t) = valeur du bien après t années d'appréciation, K₀ = capital initial emprunté. Les frais de revente (5 %) couvrent les honoraires d'agence et les frais divers.",
  },
  {
    title: "Capital du locataire",
    formula: "C = L₀ × (1 + r)ᵗ + M_épargne × [(1 + r)ᵗ − 1] / r",
    desc: "L₀ = apport + frais non dépensés, r = rendement mensuel de placement, M_épargne = épargne mensuelle nette (différence de charges + épargne facultative). Formule des intérêts composés avec versements réguliers.",
  },
  {
    title: "Rendement locatif brut",
    formula: "R_brut = (Loyer annuel / Prix d'achat) × 100",
    desc: "Indicateur standard de marché. Le rendement net déduit charges, taxe foncière, assurance PNO et vacance locative.",
  },
  {
    title: "Plus-value imposable",
    formula: "PV_imposable = Prix de cession − Prix d'acquisition corrigé − abattements",
    desc: "Les abattements augmentent avec la durée de détention : exonération totale d'IR après 22 ans, de prélèvements sociaux après 30 ans (barème légal en vigueur).",
  },
];

export default function PageAPropos() {
  return (
    <div className="page">
      <TopBar />
      <main className="blog-page">

        {/* Hero */}
        <div className="blog-hero">
          <div className="blog-hero-text">
            <span className="blog-kicker">À propos</span>
            <h1 className="blog-title">Pourquoi ce site existe</h1>
            <p className="blog-subtitle">
              Un outil indépendant, transparent et gratuit pour répondre à la question
              que se posent des millions de Français : vaut-il mieux louer ou acheter ?
            </p>
          </div>
        </div>

        <div className="blog-content-wrapper" style={{ maxWidth: 760, margin: "0 auto", padding: "0 16px 64px" }}>

          {/* Pourquoi */}
          <section style={{ marginBottom: 48 }}>
            <h2 className="blog-h2">La question à 300 000 euros</h2>
            <p className="blog-p">
              Acheter un appartement est souvent la plus grande décision financière d'une vie.
              Elle engage sur 20 à 25 ans, mobilise des dizaines de milliers d'euros d'apport
              et détermine en grande partie le patrimoine à la retraite.
            </p>
            <p className="blog-p">
              Pourtant, la réponse standard — <em>« acheter c'est toujours mieux que jeter l'argent par les fenêtres »</em> —
              est fausse dans beaucoup de situations. Sur un horizon court, dans des villes à fort
              prix au m², ou avec un apport insuffisant, louer et investir la différence peut
              produire un patrimoine bien supérieur.
            </p>
            <p className="blog-p">
              Ce site est né de la frustration de ne pas trouver un comparateur honnête,
              sans publicité, sans formulaire de contact, qui pose vraiment les deux options
              sur un pied d'égalité avec des chiffres vérifiables.
            </p>
          </section>

          {/* Qui */}
          <section style={{ marginBottom: 48 }}>
            <h2 className="blog-h2">Qui l'a créé</h2>
            <p className="blog-p">
              Louer ou Acheter est un projet indépendant, développé sans financement externe
              ni partenariat bancaire ou immobilier. Il n'y a pas de publicité, pas de collecte
              de données personnelles, pas d'affiliation à un réseau de courtiers.
            </p>
            <p className="blog-p">
              L'objectif est simple : mettre à disposition des outils de calcul de qualité
              professionnelle, accessibles à tous, sans inscription ni contrepartie.
            </p>
            <div className="sim-info-box" style={{ marginTop: 16 }}>
              <p className="sim-info-title">⚖️ Ce que ce site n'est pas</p>
              <p className="sim-info-body">
                Louer ou Acheter est un <strong>outil pédagogique</strong>. Il ne constitue pas
                un conseil financier, patrimonial ou une offre de crédit. Les résultats sont des
                estimations basées sur vos hypothèses — ils ne remplacent pas l'avis d'un
                conseiller en gestion de patrimoine ou d'un courtier.
              </p>
            </div>
          </section>

          {/* Formules */}
          <section style={{ marginBottom: 48 }}>
            <h2 className="blog-h2">Comment les calculs fonctionnent</h2>
            <p className="blog-p" style={{ marginBottom: 24 }}>
              Tous les simulateurs utilisent des formules financières standard, les mêmes que
              celles utilisées par les banques et les professionnels de l'immobilier.
              Voici les principales :
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {FORMULAS.map((f) => (
                <div key={f.title} className="sim-card" style={{ padding: "16px 20px" }}>
                  <p style={{ fontWeight: 700, fontSize: 14, color: "var(--brand)", marginBottom: 6 }}>{f.title}</p>
                  <code style={{
                    display: "block",
                    background: "var(--surface-2, #f1f5f9)",
                    borderRadius: 6,
                    padding: "8px 12px",
                    fontSize: 13,
                    fontFamily: "monospace",
                    color: "#0c1a35",
                    marginBottom: 8,
                    overflowX: "auto",
                  }}>
                    {f.formula}
                  </code>
                  <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Sources */}
          <section style={{ marginBottom: 48 }}>
            <h2 className="blog-h2">Sources et données de référence</h2>
            <p className="blog-p" style={{ marginBottom: 24 }}>
              Les données par défaut (taux de crédit, évolution des loyers, prix au m²,
              barèmes fiscaux) proviennent des sources officielles suivantes :
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {SOURCES.map((s) => (
                <div key={s.label} style={{
                  borderLeft: "3px solid var(--brand)",
                  paddingLeft: 16,
                  paddingTop: 4,
                  paddingBottom: 4,
                }}>
                  <p style={{ fontWeight: 600, fontSize: 13.5, color: "#0c1a35", marginBottom: 2 }}>{s.label}</p>
                  <p style={{ fontSize: 13, color: "var(--muted)", margin: 0 }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <div className="blog-cta-banner">
            <div className="blog-cta-inner">
              <p className="blog-cta-title">Prêt à faire vos propres calculs ?</p>
              <p className="blog-cta-sub">Tous les simulateurs sont gratuits et accessibles sans inscription.</p>
            </div>
            <Link to="/simulateurs" className="btn-primary blog-cta-btn">Voir les simulateurs →</Link>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
