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

const VALUES = [
  {
    icon: "🛡️",
    title: "Indépendance",
    desc: "Aucune publicité, aucune commission, aucun partenariat bancaire ou immobilier. Les résultats ne sont jamais orientés par un intérêt commercial.",
  },
  {
    icon: "🔬",
    title: "Transparence",
    desc: "Toutes les formules sont visibles et documentées. Les sources de données sont citées et vérifiables. Aucun paramètre caché n'influence les calculs.",
  },
  {
    icon: "📐",
    title: "Précision",
    desc: "Formules actuarielles standard, identiques à celles des établissements financiers. Les barèmes fiscaux sont mis à jour dès publication officielle.",
  },
  {
    icon: "🎯",
    title: "Accessibilité",
    desc: "Gratuit, sans inscription, sans collecte de données personnelles. Les calculs s'effectuent dans votre navigateur — rien n'est transmis à un serveur.",
  },
];

export default function PageAPropos() {
  return (
    <div className="page">
      <TopBar />
      <main id="main-content" className="blog-page">

        {/* ── HERO ─────────────────────────────────────────────── */}
        <div className="blog-hero">
          <div className="blog-hero-text">
            <span className="blog-kicker">À propos</span>
            <h1 className="blog-title">La question à 300&nbsp;000&nbsp;€</h1>
            <p className="blog-subtitle">
              Acheter un logement est souvent la plus grande décision financière d'une vie.
              Ce site existe pour que vous puissiez y répondre avec des chiffres — pas des opinions.
            </p>
          </div>
        </div>

        <div className="abt-content">

          {/* ── HISTOIRE ─────────────────────────────────────────── */}
          <section className="abt-section">
            <h2 className="blog-h2">Pourquoi ce site existe</h2>
            <p className="blog-p">
              La réponse standard — <em>« acheter c'est toujours mieux que jeter l'argent par les fenêtres »</em> —
              est fausse dans beaucoup de situations. Sur un horizon court, dans des marchés à fort
              prix au m², ou avec un apport insuffisant, louer et investir la différence peut
              produire un patrimoine supérieur à l'achat.
            </p>
            <p className="blog-p">
              Ce site est né de la frustration de ne pas trouver un comparateur honnête :
              sans publicité, sans formulaire de contact, posant vraiment les deux options
              sur un pied d'égalité avec des chiffres vérifiables. Lancé en 2023, il propose
              aujourd'hui plus de 22 simulateurs couvrant l'ensemble du cycle de décision
              immobilière — du premier achat à l'investissement locatif.
            </p>
            <p className="blog-p">
              Il n'existe aucun financement externe, aucun partenariat avec un réseau de courtiers
              ou d'agences. L'objectif est unique : mettre à disposition des outils de calcul
              de qualité professionnelle, accessibles à tous, sans inscription ni contrepartie.
            </p>
          </section>

          {/* ── MÉTHODOLOGIE ─────────────────────────────────────── */}
          <section className="abt-section">
            <h2 className="blog-h2">Comment les calculs fonctionnent</h2>
            <p className="blog-p">
              Tous les simulateurs s'appuient sur des formules financières standard —
              les mêmes que celles utilisées par les établissements bancaires et les
              professionnels du patrimoine. Voici les cinq formules centrales :
            </p>
            <div className="abt-methodo-grid">
              {FORMULAS.map((f) => (
                <div key={f.title} className="abt-formula-card sim-card">
                  <p className="abt-formula-title">{f.title}</p>
                  <code className="abt-formula-code">{f.formula}</code>
                  <p className="abt-formula-desc">{f.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── SOURCES ──────────────────────────────────────────── */}
          <section className="abt-section">
            <h2 className="blog-h2">Sources et données de référence</h2>
            <p className="blog-p">
              Les valeurs par défaut — taux de crédit, évolution des loyers, prix au m²,
              barèmes fiscaux — sont issues des publications officielles suivantes :
            </p>
            <div className="abt-sources-list">
              {SOURCES.map((s) => (
                <div key={s.label} className="abt-source-row">
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="abt-source-label"
                  >
                    {s.label}
                  </a>
                  <p className="abt-source-desc blog-p">{s.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── VALEURS ──────────────────────────────────────────── */}
          <section className="abt-section">
            <h2 className="blog-h2">Nos engagements</h2>
            <p className="blog-p">
              Quatre principes guident chaque décision éditoriale et technique du site.
            </p>
            <div className="abt-values-grid">
              {VALUES.map((v) => (
                <div key={v.title} className="abt-value-card">
                  <span className="abt-value-icon" role="img" aria-label={v.title}>{v.icon}</span>
                  <p className="abt-value-title">{v.title}</p>
                  <p className="abt-value-desc">{v.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── DISCLAIMER ───────────────────────────────────────── */}
          <section className="abt-section">
            <h2 className="blog-h2">Ce que ce site n'est pas</h2>
            <div className="sim-info-box">
              <p className="sim-info-title">⚖️ Outil pédagogique, pas conseil financier</p>
              <p className="sim-info-body">
                Louer ou Acheter est un <strong>outil pédagogique</strong>. Il ne constitue
                pas un conseil financier, patrimonial ou une offre de crédit au sens de la
                réglementation française. Les résultats sont des estimations construites à
                partir de vos hypothèses — ils ne remplacent pas l'avis d'un conseiller en
                gestion de patrimoine, d'un notaire ou d'un courtier agréé. Toute décision
                d'acquisition doit faire l'objet d'une étude personnalisée.
              </p>
            </div>
          </section>

          {/* ── CTA ──────────────────────────────────────────────── */}
          <div className="blog-cta-banner">
            <div className="blog-cta-inner">
              <p className="blog-cta-title">Prêt à faire vos propres calculs ?</p>
              <p className="blog-cta-sub">
                Plus de 22 simulateurs gratuits, sans inscription, directement dans votre navigateur.
              </p>
            </div>
            <div className="abt-cta-actions">
              <Link to="/simulateurs" className="btn-primary blog-cta-btn">
                Voir les simulateurs →
              </Link>
              <Link to="/blog" className="abt-cta-link">
                Lire le blog →
              </Link>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
