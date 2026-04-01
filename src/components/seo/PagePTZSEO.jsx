import { Link } from "react-router-dom";
import { useSEO } from "../../utils/useSEO";
import TopBar from "../TopBar";
import Footer from "../Footer";

export default function PagePTZSEO() {
  useSEO({
    title: "PTZ 2026 : conditions, montants et simulateur",
    description:
      "Découvrez si vous êtes éligible au PTZ 2026. Zones A/B1/B2/C, plafonds de revenus et montants max. Simulation gratuite et immédiate.",
    path: "/ptz-2026-conditions-montants",
  });

  return (
    <div className="page">
      <TopBar />
      <main>
        <article className="blog-article-content">
          <div className="blog-article-header">
            <nav
              aria-label="Fil d'Ariane"
              style={{ fontSize: 13, color: "#64748b", marginBottom: 12 }}
            >
              <Link to="/" style={{ color: "#64748b" }}>
                Accueil
              </Link>
              {" › "}
              <span>PTZ 2026 — Conditions, montants et simulateur</span>
            </nav>
            <h1>PTZ 2026 : tout ce qu'il faut savoir sur le Prêt à Taux Zéro</h1>
          </div>

          <p>
            Le Prêt à Taux Zéro (PTZ) est un dispositif d'aide à l'accession
            à la propriété financé par l'État, destiné aux primo-accédants
            sous conditions de ressources. Comme son nom l'indique, il ne
            génère aucun intérêt : vous remboursez uniquement le capital
            emprunté. En 2026, le PTZ connaît une évolution majeure avec son
            extension aux logements anciens dans les zones B2 et C, ouvrant
            le dispositif à des territoires ruraux et périurbains jusqu'ici
            exclus. C'est une opportunité significative pour des millions de
            ménages souhaitant devenir propriétaires en dehors des grandes
            métropoles.
          </p>
          <p>
            Le PTZ ne peut pas financer la totalité d'un achat. Il vient en
            complément d'un prêt principal et peut représenter jusqu'à 40 %
            du coût total de l'opération selon la zone et la composition du
            ménage. En zone A bis (Paris et proche banlieue), le montant
            maximum du PTZ peut atteindre <strong>240 000 €</strong> pour un
            couple avec enfants, ce qui représente une aide considérable à
            taux zéro.
          </p>

          {/* Key figures */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: 16,
              margin: "24px 0",
            }}
          >
            {[
              { label: "Taux d'intérêt", value: "0 %", sub: "aucun intérêt à payer" },
              { label: "Montant max Zone A", value: "240 000 €", sub: "Paris, IDF, grandes agglos" },
              { label: "Zones éligibles", value: "A / B1 / B2 / C", sub: "étendu à l'ancien en 2026" },
            ].map((kf) => (
              <div
                key={kf.label}
                style={{
                  background: "#f0f7ff",
                  borderRadius: 12,
                  padding: "16px 18px",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: 22, fontWeight: 800, color: "#1a56db" }}>
                  {kf.value}
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#1e293b" }}>
                  {kf.label}
                </div>
                <div style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>
                  {kf.sub}
                </div>
              </div>
            ))}
          </div>

          <h2>Les zones PTZ 2026 : où suis-je éligible ?</h2>
          <p>
            Le territoire français est divisé en quatre zones selon la tension
            du marché immobilier local. Cette classification détermine les
            plafonds de revenus et les montants maximaux du PTZ auxquels vous
            pouvez prétendre :
          </p>
          <div style={{ overflowX: "auto", margin: "16px 0" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: 14,
              }}
            >
              <thead>
                <tr style={{ background: "#eff6ff" }}>
                  <th style={{ padding: "10px 14px", textAlign: "left", borderBottom: "2px solid #bfdbfe" }}>
                    Zone
                  </th>
                  <th style={{ padding: "10px 14px", textAlign: "left", borderBottom: "2px solid #bfdbfe" }}>
                    Villes / Exemples
                  </th>
                  <th style={{ padding: "10px 14px", textAlign: "right", borderBottom: "2px solid #bfdbfe" }}>
                    Plafond revenus (2 pers.)
                  </th>
                  <th style={{ padding: "10px 14px", textAlign: "right", borderBottom: "2px solid #bfdbfe" }}>
                    PTZ max (neuf, 2 pers.)
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Zone A bis", "Paris, Hauts-de-Seine, Yvelines (certaines communes)", "58 000 €/an", "172 800 €"],
                  ["Zone A", "Lyon, Marseille, Côte d'Azur, Montpellier, Île-de-France", "53 000 €/an", "144 000 €"],
                  ["Zone B1", "Bordeaux, Nantes, Toulouse, Lille, Strasbourg, Grenoble", "43 000 €/an", "115 200 €"],
                  ["Zone B2", "Villes moyennes (50k–250k hab.), littoral, zones frontalières", "35 000 €/an", "100 800 €"],
                  ["Zone C", "Reste du territoire (zones rurales, villes <50k hab.)", "31 000 €/an", "86 400 €"],
                ].map((row, i) => (
                  <tr
                    key={i}
                    style={{ background: i % 2 === 0 ? "#fff" : "#f8fafc" }}
                  >
                    {row.map((cell, j) => (
                      <td
                        key={j}
                        style={{
                          padding: "9px 14px",
                          borderBottom: "1px solid #e2e8f0",
                          textAlign: j >= 2 ? "right" : "left",
                          fontWeight: j === 0 ? 700 : 400,
                          color: j === 3 ? "#1a56db" : "#1e293b",
                        }}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: 13, color: "#64748b" }}>
            Les plafonds de revenus correspondent au revenu fiscal de référence
            de l'année N-2, et varient selon la composition du ménage. Les
            montants PTZ max indiqués sont pour 2 personnes dans le neuf ; ils
            augmentent avec la taille du foyer.
          </p>

          <h2>Combien puis-je emprunter avec le PTZ ?</h2>
          <p>
            Le montant du PTZ est calculé comme un pourcentage du coût total de
            l'opération (prix + frais de notaire), plafonné par zone et par
            composition de ménage. Ce pourcentage est de <strong>40 %</strong>{" "}
            dans les zones A bis, A et B1 pour un logement neuf. Il est de 20 %
            en zones B2 et C. Pour les logements anciens (nouveauté 2026), le
            taux est de 20 % en zones B2 et C, sous condition de travaux de
            rénovation représentant au moins 25 % du coût total.
          </p>

          <h2>PTZ 2026 et logements anciens : la nouveauté</h2>
          <p>
            L'une des évolutions majeures du PTZ 2026 est son extension aux
            logements anciens dans les zones B2 et C. Jusqu'en 2024, le PTZ
            était réservé au logement neuf (ou à l'ancien avec travaux dans
            certains cas très restreints). Désormais, un primo-accédant qui
            achète une maison ancienne dans une commune rurale ou une ville
            moyenne peut bénéficier d'un PTZ à condition d'engager des travaux
            de rénovation équivalant à au moins 25 % du coût total de
            l'opération.
          </p>
          <p>
            Cette mesure vise à relancer l'accession à la propriété dans les
            territoires ruraux et à encourager la rénovation du parc immobilier
            ancien. En pratique, pour une maison achetée 180 000 € en zone C
            avec 45 000 € de travaux de rénovation, le coût total est de
            225 000 €. Le PTZ peut financer 20 % de ce montant, soit 45 000 €
            sans intérêts — une aide substantielle.
          </p>

          {/* Callout */}
          <div
            style={{
              background: "#fefce8",
              border: "1px solid #fde047",
              borderRadius: 12,
              padding: "16px 20px",
              margin: "24px 0",
              display: "flex",
              gap: 12,
              alignItems: "flex-start",
            }}
          >
            <span style={{ fontSize: 20 }}>💡</span>
            <p style={{ margin: 0, fontSize: 15, color: "#713f12" }}>
              <strong>Économie concrète :</strong> Cumuler PTZ + prêt classique
              peut réduire votre mensualité globale de 200 à 400 €/mois par
              rapport à un financement 100 % classique, car une partie du
              capital est remboursée sans intérêts pendant la période de
              différé.
            </p>
          </div>

          <h2>Comment faire une demande de PTZ ?</h2>
          <p>
            La démarche pour obtenir un PTZ se fait auprès d'une banque
            partenaire agréée (la quasi-totalité des établissements bancaires
            en France). Voici les étapes :
          </p>
          <ol>
            <li>
              <strong>Vérifiez votre éligibilité :</strong> Vous devez être
              primo-accédant (ne pas avoir été propriétaire de votre résidence
              principale dans les 2 dernières années), respecter les plafonds de
              revenus de votre zone, et acheter pour en faire votre résidence
              principale.
            </li>
            <li>
              <strong>Identifiez votre zone :</strong> Utilisez le moteur de
              recherche officiel du gouvernement (service-public.fr) ou notre
              simulateur PTZ pour connaître votre zone en entrant votre code
              postal.
            </li>
            <li>
              <strong>Constituez votre dossier :</strong> Avis d'imposition
              N-2, justificatifs de revenus, compromis de vente, devis de
              travaux (si ancien avec travaux), attestation de primo-accession.
            </li>
            <li>
              <strong>Déposez une demande auprès de votre banque :</strong> La
              banque instruit simultanément le PTZ et le prêt principal. Elle
              vérifie l'éligibilité et calcule le montant du PTZ auquel vous
              avez droit.
            </li>
            <li>
              <strong>Signez l'offre de prêt :</strong> Le PTZ figure comme une
              ligne distincte dans l'offre de prêt globale. Il est débloqué en
              même temps que le prêt principal lors de la signature de l'acte
              authentique.
            </li>
          </ol>

          <h2>Questions fréquentes (FAQ)</h2>

          <div style={{ marginTop: 8 }}>
            <h3 style={{ fontSize: 17, color: "#1e293b", marginBottom: 6 }}>
              Qui peut bénéficier du PTZ 2026 ?
            </h3>
            <p>
              Le PTZ 2026 est réservé aux primo-accédants, c'est-à-dire aux
              personnes qui n'ont pas été propriétaires de leur résidence
              principale au cours des deux dernières années. Il faut également
              respecter les plafonds de revenus correspondant à sa zone
              géographique (basés sur le revenu fiscal de référence de l'année
              N-2) et acheter le bien pour en faire sa résidence principale. Les
              investissements locatifs sont exclus. Depuis 2026, le PTZ est
              accessible pour l'achat de logements anciens avec travaux en zones
              B2 et C, élargissant considérablement le nombre de bénéficiaires
              potentiels.
            </p>

            <h3 style={{ fontSize: 17, color: "#1e293b", marginBottom: 6, marginTop: 20 }}>
              Peut-on cumuler PTZ et prêt immobilier classique ?
            </h3>
            <p>
              Oui, le PTZ est conçu pour être cumulé avec un prêt immobilier
              classique. Il ne peut pas financer la totalité d'un achat et doit
              obligatoirement être complété par d'autres financements : prêt
              bancaire classique, apport personnel, prêt action logement (ex
              1 %), prêt épargne logement (PEL/CEL), ou autres aides. Le PTZ
              vient réduire la part du prêt principal à rembourser avec intérêts,
              ce qui allège la mensualité globale et améliore la capacité
              d'emprunt totale du ménage.
            </p>

            <h3 style={{ fontSize: 17, color: "#1e293b", marginBottom: 6, marginTop: 20 }}>
              Quelle est la durée de remboursement du PTZ ?
            </h3>
            <p>
              La durée totale du PTZ varie entre 20 et 25 ans selon les revenus
              et la zone. Elle comprend deux phases : une période de différé
              (entre 5 et 15 ans selon les revenus) pendant laquelle vous ne
              remboursez pas le PTZ — vous payez seulement le prêt principal —
              puis une période de remboursement du PTZ proprement dit. Plus vos
              revenus sont faibles, plus le différé est long, ce qui allège la
              mensualité totale pendant les premières années cruciales du
              remboursement.
            </p>

            <h3 style={{ fontSize: 17, color: "#1e293b", marginBottom: 6, marginTop: 20 }}>
              Le PTZ est-il remboursable si je revends ?
            </h3>
            <p>
              Oui, si vous revendez votre bien avant la fin du remboursement du
              PTZ, vous devrez rembourser le capital restant dû au moment de la
              vente. Aucune pénalité de remboursement anticipé n'est applicable
              sur le PTZ. En revanche, si vous revendez pendant la période de
              différé, vous remboursez l'intégralité du capital PTZ en une
              fois. Le PTZ est attaché au financement du bien et ne peut pas
              être transféré sur un autre achat immobilier.
            </p>
          </div>

          {/* CTA */}
          <div
            style={{
              background: "linear-gradient(135deg, #eff6ff, #dbeafe)",
              borderRadius: 16,
              padding: "32px 24px",
              textAlign: "center",
              margin: "32px 0",
            }}
          >
            <h2 style={{ color: "#1e40af", marginBottom: 12 }}>
              Simulez votre PTZ 2026 en quelques secondes
            </h2>
            <p style={{ color: "#1e293b", maxWidth: 480, margin: "0 auto" }}>
              Entrez votre code postal, vos revenus et la composition de votre
              ménage : notre simulateur calcule instantanément le montant PTZ
              auquel vous pouvez prétendre.
            </p>
            <Link
              to="/simulateurs/ptz"
              style={{
                display: "inline-block",
                background: "linear-gradient(135deg, #1a56db, #0c2a85)",
                color: "#fff",
                padding: "14px 28px",
                borderRadius: 10,
                fontWeight: 700,
                textDecoration: "none",
                marginTop: 12,
              }}
            >
              Simuler mon PTZ 2026 →
            </Link>
          </div>

          {/* Related links */}
          <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: 20, marginTop: 8 }}>
            <p style={{ fontSize: 14, color: "#64748b", marginBottom: 8 }}>
              Simulateurs associés :
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {[
                { to: "/simulateurs/budget-maximum", label: "Budget maximum" },
                { to: "/simulateurs/pret-immobilier", label: "Simulateur prêt immo" },
                { to: "/simulateurs/endettement", label: "Capacité d'emprunt" },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  style={{
                    fontSize: 14,
                    color: "#1a56db",
                    background: "#eff6ff",
                    padding: "6px 14px",
                    borderRadius: 20,
                    textDecoration: "none",
                    fontWeight: 500,
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
