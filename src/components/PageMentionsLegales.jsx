import { Link } from "react-router-dom";
import TopBar from "./TopBar";
import Footer from "./Footer";
import { useSEO } from "../utils/useSEO";

function MlTable({ rows, headers }) {
  return (
    <div className="sim-card ml-table-wrapper">
      <table className="ml-table">
        {headers && (
          <thead>
            <tr>
              {headers.map((h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function MlSection({ badge, title, children }) {
  return (
    <section className="ml-section">
      {badge && <span className="ml-section-badge">{badge}</span>}
      <h2 className="blog-h2">{title}</h2>
      {children}
    </section>
  );
}

function MlSubtitle({ children }) {
  return <h3 className="ml-subtitle">{children}</h3>;
}

export default function PageMentionsLegales() {
  useSEO({ title: "Mentions légales — louer-acheter.fr", description: "Mentions légales et informations sur l'éditeur du site louer-acheter.fr.", path: "/mentions-legales", robots: "noindex, follow" });
  return (
    <div className="page">
      <TopBar />
      <main id="main-content" className="page-main">

        {/* Hero */}
        <div className="blog-hero-v2">
          <div className="blog-hero-v2-inner">
            <span className="blog-hero-v2-badge">⚖️ Légal &amp; Confidentialité</span>
            <h1 className="blog-hero-v2-title">Mentions légales</h1>
            <p className="blog-hero-v2-sub">
              Informations légales, politique de confidentialité et gestion
              des cookies du site louer-acheter.fr — conformément au RGPD (Règlement UE 2016/679).
            </p>
          </div>
        </div>

        <div className="blog-page">
        <div className="ml-content-wrapper">

          {/* 1. Éditeur */}
          <MlSection badge="1" title="Éditeur du site">
            <MlTable
              rows={[
                ["Site", "louer-acheter.fr"],
                ["Statut", "Projet personnel, sans forme juridique commerciale"],
                ["Directeur de publication", "Gaspard"],
                ["Contact", <a href="mailto:contact@louer-acheter.fr">contact@louer-acheter.fr</a>],
                ["Siège", "France"],
              ]}
            />
          </MlSection>

          {/* 2. Hébergement */}
          <MlSection badge="2" title="Hébergement">
            <MlTable
              rows={[
                ["Hébergeur", "Prestataire d'hébergement tiers spécialisé"],
                ["Infrastructure", "CDN mondial avec points de présence en Europe"],
                ["Localisation données UE", "Serveurs européens (Union Européenne)"],
                ["Conformité", "Data Processing Agreement RGPD disponible sur demande"],
              ]}
            />
            <p className="blog-p">
              Le site est hébergé chez un prestataire spécialisé dont les serveurs
              de traitement pour les visiteurs européens sont situés au sein de
              l'Union Européenne. Ce prestataire est certifié conforme aux
              mécanismes de transfert encadrés par le RGPD.
            </p>
          </MlSection>

          {/* 3. Propriété intellectuelle */}
          <MlSection badge="3" title="Propriété intellectuelle">
            <p className="blog-p">
              L'ensemble du contenu du site louer-acheter.fr — textes, formules de
              calcul, données éditoriales, code source et design — est protégé par
              le droit d'auteur (Code de la propriété intellectuelle). Toute
              reproduction, même partielle, est soumise à l'autorisation préalable
              et écrite de l'éditeur, sauf usage strictement personnel et privé.
            </p>
            <p className="blog-p">
              Les marques, logos et contenus des sources citées (INSEE, Banque de
              France, etc.) appartiennent à leurs propriétaires respectifs et sont
              mentionnés à titre informatif uniquement.
            </p>
          </MlSection>

          {/* 4. Limitation de responsabilité */}
          <MlSection badge="4" title="Limitation de responsabilité">
            <p className="blog-p">
              Les simulateurs et calculateurs disponibles sur ce site sont fournis
              à titre <strong>pédagogique et informatif uniquement</strong>. Ils
              ne constituent en aucun cas un conseil financier, patrimonial, fiscal
              ou juridique, ni une offre ou une sollicitation de crédit immobilier.
            </p>
            <p className="blog-p">
              Les résultats produits sont des estimations fondées sur les paramètres
              saisis par l'utilisateur et sur des hypothèses simplificatrices. Ils
              peuvent différer significativement de la réalité selon la situation
              personnelle de chacun, les conditions de marché et les évolutions
              réglementaires ou fiscales.
            </p>
            <p className="blog-p">
              L'éditeur décline toute responsabilité quant aux décisions prises sur
              la base des simulations effectuées sur ce site. Il est recommandé de
              consulter un professionnel agréé (courtier, notaire, conseiller en
              gestion de patrimoine) avant toute décision d'investissement.
            </p>
          </MlSection>

          {/* 5. Politique de confidentialité */}
          <MlSection badge="5" title="Politique de confidentialité (RGPD)">

            {/* 5a. Données collectées */}
            <MlSubtitle>a. Données collectées</MlSubtitle>
            <p className="blog-p">
              Ce site ne collecte <strong>aucune donnée personnelle identifiante</strong> :
              il n'existe ni compte utilisateur, ni formulaire d'inscription, ni collecte
              d'adresse e-mail. Les paramètres de simulation sont stockés uniquement dans
              le <code className="ml-code">sessionStorage</code> de votre navigateur —
              ils sont supprimés à la fermeture de l'onglet et ne sont jamais transmis
              à un serveur.
            </p>
            <p className="blog-p">
              Sous réserve de votre consentement explicite (voir section Cookies
              ci-dessous), des <strong>événements d'usage anonymisés</strong> sont
              transmis à un outil d'analyse de produit tiers. Ces événements
              décrivent les interactions avec le simulateur (ouverture/fermeture,
              modification de champs) sans jamais inclure vos valeurs financières
              personnelles ni aucun identifiant permettant de vous reconnaître.
            </p>

            {/* 5b. Base légale */}
            <MlSubtitle>b. Base légale du traitement</MlSubtitle>
            <p className="blog-p">
              Le seul traitement de données susceptible d'être effectué — l'analyse
              d'usage anonymisée — repose exclusivement sur votre{" "}
              <strong>consentement libre et éclairé</strong> au sens de l'article
              6.1.a du RGPD. Ce consentement est recueilli via la bannière cookies
              affichée lors de votre première visite. Vous pouvez le retirer à tout
              moment ; aucune donnée analytique n'est collectée en l'absence de
              consentement.
            </p>

            {/* 5c. Cookies */}
            <MlSubtitle>c. Politique de cookies</MlSubtitle>
            <p className="blog-p">
              Ce site utilise uniquement le <code className="ml-code">localStorage</code>{" "}
              du navigateur pour mémoriser vos préférences de consentement. Aucun cookie
              tiers publicitaire ou de profilage n'est déposé.
            </p>

            <div className="ml-cookie-list">

              <div className="ml-cookie-type ml-cookie-necessary">
                <div className="ml-cookie-header">
                  <span className="ml-cookie-name">Préférences de consentement</span>
                  <span className="ml-cookie-badge ml-cookie-badge--necessary">Nécessaire</span>
                </div>
                <p className="ml-cookie-desc">
                  Deux entrées sont stockées dans le <code className="ml-code">localStorage</code>{" "}
                  de votre navigateur :{" "}
                  <code className="ml-code">cookie_consent_v1</code> (choix global : accepté
                  ou refusé) et <code className="ml-code">cookie_analytics_v1</code> (préférence
                  analytique). Ces données restent sur votre appareil, ne sont pas transmises
                  à un serveur, et sont nécessaires pour respecter votre choix de consentement
                  sans vous redemander à chaque visite.
                </p>
              </div>

              <div className="ml-cookie-type ml-cookie-analytics">
                <div className="ml-cookie-header">
                  <span className="ml-cookie-name">Analyse d'usage (optionnel)</span>
                  <span className="ml-cookie-badge ml-cookie-badge--optional">Optionnel (sur consentement)</span>
                </div>
                <p className="ml-cookie-desc">
                  Si vous cliquez sur "Accepter" lors de votre première visite, un outil
                  d'analyse de produit tiers hébergé sur des serveurs européens est activé.
                  Cet outil enregistre des événements anonymisés décrivant vos
                  interactions avec le simulateur : ouverture/fermeture, modification de
                  champs (type de champ uniquement, pas les valeurs saisies). Aucune
                  information personnellement identifiable (nom, adresse IP complète,
                  montants saisis) n'est collectée. Ces données servent uniquement à
                  améliorer l'ergonomie du site.
                </p>
              </div>

              <div className="ml-cookie-type ml-cookie-infra">
                <div className="ml-cookie-header">
                  <span className="ml-cookie-name">Infrastructure d'hébergement</span>
                  <span className="ml-cookie-badge ml-cookie-badge--infra">Infrastructure</span>
                </div>
                <p className="ml-cookie-desc">
                  Notre prestataire d'hébergement peut générer des données de log techniques
                  (adresse IP tronquée, horodatage, URL demandée) à des fins de
                  sécurité et de performance. Ces données sont traitées conformément
                  à leur politique de confidentialité et ne sont pas utilisées
                  à des fins de profilage.
                </p>
              </div>

            </div>

            {/* 5d. Durée de conservation */}
            <MlSubtitle>d. Durée de conservation</MlSubtitle>
            <MlTable
              headers={["Donnée", "Durée", "Lieu"]}
              rows={[
                [
                  "Préférences de consentement (localStorage)",
                  "Jusqu'à suppression manuelle ou révocation",
                  "Votre navigateur uniquement",
                ],
                [
                  "Événements analytiques anonymisés (si consentement)",
                  "12 mois glissants",
                  "Serveurs de notre prestataire d'analyse (UE)",
                ],
                [
                  "Logs techniques d'hébergement",
                  "Selon la politique du prestataire (30 jours max.)",
                  "Infrastructure d'hébergement",
                ],
              ]}
            />

            {/* 5e. Droits des utilisateurs */}
            <MlSubtitle>e. Droits des utilisateurs</MlSubtitle>
            <p className="blog-p">
              Conformément au RGPD (Règlement UE 2016/679), vous disposez des droits
              suivants concernant vos données personnelles :
            </p>
            <ul className="ml-rights-list">
              <li><strong>Droit d'accès</strong> — obtenir la confirmation que des données vous concernant sont traitées et en obtenir une copie.</li>
              <li><strong>Droit de rectification</strong> — faire corriger des données inexactes.</li>
              <li><strong>Droit à l'effacement</strong> — demander la suppression de vos données ("droit à l'oubli").</li>
              <li><strong>Droit d'opposition</strong> — vous opposer au traitement de vos données.</li>
              <li><strong>Droit à la portabilité</strong> — recevoir vos données dans un format structuré et lisible par machine.</li>
              <li><strong>Droit au retrait du consentement</strong> — révoquer à tout moment votre consentement à l'analyse d'usage, sans que cela affecte la licéité du traitement antérieur.</li>
            </ul>
            <p className="blog-p">
              Pour exercer ces droits ou pour toute question relative à la protection
              de vos données, contactez l'éditeur à :{" "}
              <a href="mailto:contact@louer-acheter.fr">contact@louer-acheter.fr</a>.
              Une réponse sera apportée dans un délai d'un mois conformément à l'article
              12 du RGPD.
            </p>
            <p className="blog-p">
              Vous disposez également du droit d'introduire une réclamation auprès de
              l'autorité de contrôle compétente :{" "}
              <strong>CNIL (Commission Nationale de l'Informatique et des Libertés)</strong>,
              3 Place de Fontenoy — TSA 80715 — 75334 Paris Cedex 07 —{" "}
              <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">
                www.cnil.fr
              </a>.
            </p>

            {/* 5f. Sous-traitants */}
            <MlSubtitle>f. Sous-traitants et services tiers</MlSubtitle>
            <MlTable
              headers={["Catégorie", "Finalité", "Données transmises", "Localisation"]}
              rows={[
                [
                  "Hébergeur",
                  "Hébergement et délivrance du site",
                  "Adresse IP tronquée, logs techniques",
                  "Union Européenne",
                ],
                [
                  "Outil d'analyse (si consentement)",
                  "Analyse d'usage anonymisée",
                  "Événements anonymisés, sans PII",
                  "Union Européenne",
                ],
                [
                  "Service de polices de caractères",
                  "Chargement de la typographie du site",
                  "Adresse IP lors du premier accès",
                  "Mondial (tiers international)",
                ],
              ]}
            />
            <p className="blog-p">
              Les polices de caractères utilisées sur ce site sont chargées via
              un service tiers. Lors du premier chargement, votre adresse IP peut
              être transmise à ce prestataire. Si vous souhaitez éviter ce transfert,
              vous pouvez bloquer les requêtes tierces via les paramètres de votre
              navigateur.
            </p>

          </MlSection>

          {/* 6. Droit applicable */}
          <MlSection badge="6" title="Droit applicable et juridiction">
            <p className="blog-p">
              Les présentes mentions légales et la politique de confidentialité sont
              soumises au <strong>droit français</strong>. En cas de litige relatif
              à leur interprétation ou à leur exécution, les tribunaux français sont
              seuls compétents, sous réserve des dispositions impératives applicables
              aux consommateurs résidant dans un autre État membre de l'Union européenne.
            </p>
            <p className="blog-p ml-update-date">
              Dernière mise à jour : mars 2026
            </p>
          </MlSection>

          {/* Liens de retour */}
          <div className="ml-back-links">
            <Link to="/" className="btn-secondary">← Accueil</Link>
            <Link to="/a-propos" className="btn-secondary">À propos du site</Link>
          </div>

        </div>
        </div>{/* end .blog-page */}
      </main>
      <Footer />
    </div>
  );
}
