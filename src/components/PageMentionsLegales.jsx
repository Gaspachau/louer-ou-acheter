import { Link } from "react-router-dom";
import TopBar from "./TopBar";
import Footer from "./Footer";

export default function PageMentionsLegales() {
  return (
    <div className="page">
      <TopBar />
      <main className="blog-page">

        {/* Hero */}
        <div className="blog-hero">
          <div className="blog-hero-text">
            <span className="blog-kicker">Légal</span>
            <h1 className="blog-title">Mentions légales</h1>
            <p className="blog-subtitle">
              Informations légales, politique de confidentialité et conditions d'utilisation
              du site louer-acheter.fr.
            </p>
          </div>
        </div>

        <div className="blog-content-wrapper" style={{ maxWidth: 760, margin: "0 auto", padding: "0 16px 64px" }}>

          {/* Éditeur */}
          <section style={{ marginBottom: 40 }}>
            <h2 className="blog-h2">Éditeur du site</h2>
            <div className="sim-card" style={{ padding: "16px 20px" }}>
              <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 14 }}>
                <tbody>
                  {[
                    ["Site", "louer-acheter.fr"],
                    ["Statut", "Site édité à titre personnel, sans forme juridique commerciale"],
                    ["Directeur de publication", "Gaspard (propriétaire du site)"],
                    ["Contact", "contact@louer-acheter.fr"],
                    ["Siège", "France"],
                  ].map(([k, v]) => (
                    <tr key={k} style={{ borderBottom: "1px solid var(--line, #e2e8f0)" }}>
                      <td style={{ padding: "8px 12px 8px 0", fontWeight: 600, color: "#0c1a35", whiteSpace: "nowrap", width: "40%" }}>{k}</td>
                      <td style={{ padding: "8px 0", color: "var(--muted, #64748b)" }}>{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Hébergeur */}
          <section style={{ marginBottom: 40 }}>
            <h2 className="blog-h2">Hébergement</h2>
            <div className="sim-card" style={{ padding: "16px 20px" }}>
              <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 14 }}>
                <tbody>
                  {[
                    ["Hébergeur", "Vercel Inc."],
                    ["Adresse", "340 Pine Street, Suite 701, San Francisco, CA 94104, États-Unis"],
                    ["Site", "vercel.com"],
                    ["Infrastructure", "CDN mondial, serveurs en Europe (Frankfurt)"],
                  ].map(([k, v]) => (
                    <tr key={k} style={{ borderBottom: "1px solid var(--line, #e2e8f0)" }}>
                      <td style={{ padding: "8px 12px 8px 0", fontWeight: 600, color: "#0c1a35", whiteSpace: "nowrap", width: "40%" }}>{k}</td>
                      <td style={{ padding: "8px 0", color: "var(--muted, #64748b)" }}>{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Propriété intellectuelle */}
          <section style={{ marginBottom: 40 }}>
            <h2 className="blog-h2">Propriété intellectuelle</h2>
            <p className="blog-p">
              L'ensemble du contenu du site louer-acheter.fr (textes, formules, données,
              code source, design) est protégé par le droit d'auteur. Toute reproduction,
              même partielle, est soumise à autorisation préalable de l'éditeur,
              sauf usage strictement personnel.
            </p>
            <p className="blog-p">
              Les marques et logos des sources citées (INSEE, Banque de France, etc.)
              appartiennent à leurs propriétaires respectifs.
            </p>
          </section>

          {/* Responsabilité */}
          <section style={{ marginBottom: 40 }}>
            <h2 className="blog-h2">Limitation de responsabilité</h2>
            <p className="blog-p">
              Les simulateurs et calculateurs disponibles sur ce site sont fournis
              à titre <strong>pédagogique et informatif uniquement</strong>. Ils ne
              constituent pas un conseil financier, patrimonial, fiscal ou juridique,
              ni une offre ou sollicitation de crédit.
            </p>
            <p className="blog-p">
              Les résultats produits sont des estimations basées sur les paramètres
              saisis et des hypothèses simplificatrices. Ils peuvent différer
              significativement de la réalité selon votre situation personnelle,
              les conditions de marché et les évolutions réglementaires.
            </p>
            <p className="blog-p">
              L'éditeur ne saurait être tenu responsable de toute décision prise
              sur la base des simulations effectuées sur ce site. Consultez un
              professionnel agréé avant toute décision d'investissement.
            </p>
          </section>

          {/* Politique de confidentialité */}
          <section style={{ marginBottom: 40 }}>
            <h2 className="blog-h2">Politique de confidentialité (RGPD)</h2>

            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0c1a35", marginBottom: 8, marginTop: 24 }}>
              Données collectées
            </h3>
            <p className="blog-p">
              <strong>Ce site ne collecte aucune donnée personnelle identifiante.</strong>{" "}
              Il n'y a pas de compte utilisateur, pas de formulaire d'inscription, pas de cookie
              de traçage publicitaire.
            </p>
            <p className="blog-p">
              Les paramètres de simulation sont stockés uniquement dans le <code style={{ fontSize: 12, background: "#f1f5f9", padding: "1px 5px", borderRadius: 4 }}>sessionStorage</code> de
              votre navigateur — ils disparaissent à la fermeture de l'onglet et ne sont
              jamais transmis à un serveur.
            </p>

            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0c1a35", marginBottom: 8, marginTop: 24 }}>
              Cookies
            </h3>
            <p className="blog-p">
              Le site n'utilise <strong>aucun cookie</strong> de traçage, publicitaire
              ou analytique. Aucun outil d'analyse de trafic (Google Analytics, Hotjar, etc.)
              n'est installé.
            </p>
            <p className="blog-p">
              Des cookies techniques strictement nécessaires au fonctionnement du site
              (navigateur, CDN) peuvent être créés par l'hébergeur Vercel. Ils ne
              contiennent aucune donnée personnelle.
            </p>

            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0c1a35", marginBottom: 8, marginTop: 24 }}>
              Droits des utilisateurs
            </h3>
            <p className="blog-p">
              Conformément au Règlement Général sur la Protection des Données (RGPD —
              Règlement UE 2016/679), vous disposez d'un droit d'accès, de rectification
              et de suppression des données vous concernant. Dans la mesure où aucune
              donnée personnelle n'est collectée, ces droits ne trouvent pas à s'appliquer.
            </p>
            <p className="blog-p">
              Pour toute question relative à la protection des données, vous pouvez
              contacter l'éditeur à : <strong>contact@louer-acheter.fr</strong>
            </p>
            <p className="blog-p">
              Vous pouvez également exercer un recours auprès de la{" "}
              <strong>CNIL (Commission Nationale de l'Informatique et des Libertés)</strong>,
              3 Place de Fontenoy, 75007 Paris — <a href="https://www.cnil.fr" style={{ color: "var(--brand)" }} target="_blank" rel="noopener noreferrer">www.cnil.fr</a>.
            </p>

            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0c1a35", marginBottom: 8, marginTop: 24 }}>
              Sous-traitants et services tiers
            </h3>
            <div className="sim-card" style={{ padding: "12px 16px" }}>
              <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 13.5 }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid var(--line, #e2e8f0)" }}>
                    <th style={{ textAlign: "left", padding: "4px 12px 8px 0", color: "#0c1a35" }}>Service</th>
                    <th style={{ textAlign: "left", padding: "4px 12px 8px 0", color: "#0c1a35" }}>Finalité</th>
                    <th style={{ textAlign: "left", padding: "4px 0 8px 0", color: "#0c1a35" }}>Données</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Vercel (hébergement)", "Délivrer les pages web", "IP anonymisée (logs serveur)"],
                    ["Google Fonts", "Police de caractères Inter", "IP lors du chargement de la police"],
                  ].map(([s, f, d]) => (
                    <tr key={s} style={{ borderBottom: "1px solid var(--line, #e2e8f0)" }}>
                      <td style={{ padding: "8px 12px 8px 0", color: "var(--muted)" }}>{s}</td>
                      <td style={{ padding: "8px 12px 8px 0", color: "var(--muted)" }}>{f}</td>
                      <td style={{ padding: "8px 0", color: "var(--muted)" }}>{d}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Droit applicable */}
          <section style={{ marginBottom: 40 }}>
            <h2 className="blog-h2">Droit applicable et juridiction</h2>
            <p className="blog-p">
              Les présentes mentions légales sont soumises au droit français.
              En cas de litige, les tribunaux français sont seuls compétents.
            </p>
            <p className="blog-p" style={{ fontSize: 13, color: "var(--muted)" }}>
              Dernière mise à jour : mars 2026
            </p>
          </section>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link to="/" className="btn-secondary" style={{ fontSize: 14 }}>← Accueil</Link>
            <Link to="/a-propos" className="btn-secondary" style={{ fontSize: 14 }}>À propos du site</Link>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
