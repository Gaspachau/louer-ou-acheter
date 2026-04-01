import { Link } from "react-router-dom";
import { useSEO } from "../../utils/useSEO";
import TopBar from "../TopBar";
import Footer from "../Footer";

export default function PagePretImmoSEO() {
  useSEO({
    title: "Simulateur prêt immobilier gratuit 2026",
    description:
      "Calculez votre mensualité, le coût total de votre crédit et le tableau d'amortissement. Gratuit, sans inscription, résultat en 30 secondes.",
    path: "/simulateur-pret-immobilier-gratuit",
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
              <span>Simulateur prêt immobilier gratuit 2026</span>
            </nav>
            <h1>
              Simulateur prêt immobilier gratuit 2026 : calculez votre
              mensualité
            </h1>
          </div>

          <p>
            Un simulateur de prêt immobilier est un outil en ligne qui vous
            permet de calculer instantanément la mensualité de votre crédit
            immobilier, le coût total des intérêts et le tableau
            d'amortissement complet. En quelques secondes, vous obtenez une
            vision claire de ce que vous allez rembourser chaque mois, combien
            coûte réellement votre emprunt sur toute sa durée, et comment
            évolue votre capital restant dû. C'est un outil indispensable avant
            toute démarche bancaire, pour cadrer votre projet immobilier et
            comparer différents scénarios de financement.
          </p>
          <p>
            En 2026, avec des taux qui se stabilisent autour de 3,5 à 4 % sur
            20 ans, la simulation devient encore plus stratégique. Une
            différence de 0,3 point de taux sur un emprunt de 300 000 € sur 25
            ans représente plus de 15 000 € d'intérêts supplémentaires. Simuler
            avant de négocier, c'est gagner du temps et de l'argent.
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
              { label: "Mensualité exemple", value: "1 540 €/mois", sub: "300k€ — 3,8 % — 25 ans" },
              { label: "Coût total crédit", value: "162 000 €", sub: "intérêts + assurance" },
              { label: "TAEG moyen 2026", value: "3,7 %", sub: "sur 20 ans, bon dossier" },
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
                <div
                  style={{ fontSize: 22, fontWeight: 800, color: "#1a56db" }}
                >
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

          <h2>Comment calculer sa mensualité ?</h2>
          <p>
            La mensualité d'un prêt immobilier se calcule à l'aide d'une
            formule mathématique basée sur le capital emprunté, le taux
            d'intérêt mensuel et la durée en mois. La formule est la suivante :
          </p>
          <p>
            <strong>M = C × [t / (1 − (1 + t)^−n)]</strong>
          </p>
          <p>
            Où <em>M</em> est la mensualité, <em>C</em> le capital emprunté,{" "}
            <em>t</em> le taux mensuel (taux annuel divisé par 12) et{" "}
            <em>n</em> le nombre de mensualités.
          </p>
          <p>
            Exemple concret : pour un emprunt de 300 000 € à un taux nominal
            de 3,8 % sur 25 ans (300 mensualités), on obtient un taux mensuel
            de 0,317 %. La mensualité hors assurance ressort à{" "}
            <strong>1 540 €/mois</strong>. En ajoutant l'assurance emprunteur
            (environ 0,25 % du capital, soit ~63 €/mois), la mensualité totale
            se situe autour de <strong>1 603 €/mois</strong>. Le coût total des
            intérêts seuls s'élève à environ 162 000 €, auxquels s'ajoutent
            les frais d'assurance.
          </p>

          <h2>Les paramètres qui influencent votre mensualité</h2>
          <p>
            Trois facteurs principaux déterminent le montant de votre
            mensualité : le montant emprunté, le taux d'intérêt et la durée du
            prêt. Voici comment ils interagissent dans des scénarios concrets :
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
                    Capital
                  </th>
                  <th style={{ padding: "10px 14px", textAlign: "left", borderBottom: "2px solid #bfdbfe" }}>
                    Taux
                  </th>
                  <th style={{ padding: "10px 14px", textAlign: "left", borderBottom: "2px solid #bfdbfe" }}>
                    Durée
                  </th>
                  <th style={{ padding: "10px 14px", textAlign: "left", borderBottom: "2px solid #bfdbfe" }}>
                    Mensualité
                  </th>
                  <th style={{ padding: "10px 14px", textAlign: "left", borderBottom: "2px solid #bfdbfe" }}>
                    Coût total intérêts
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["200 000 €", "3,6 %", "20 ans", "1 165 €", "79 600 €"],
                  ["200 000 €", "3,6 %", "25 ans", "1 003 €", "100 900 €"],
                  ["300 000 €", "3,8 %", "20 ans", "1 768 €", "124 320 €"],
                  ["300 000 €", "3,8 %", "25 ans", "1 540 €", "162 000 €"],
                  ["400 000 €", "4,0 %", "25 ans", "2 107 €", "232 100 €"],
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
                          fontWeight: j === 3 ? 700 : 400,
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
          <p>
            On constate qu'allonger la durée de 20 à 25 ans réduit la
            mensualité d'environ 13 %, mais augmente le coût total des intérêts
            de 25 à 30 %. Le choix de la durée est donc un arbitrage entre
            capacité d'endettement mensuelle et coût global.
          </p>

          <h2>Taux immobiliers en 2026 : où en est-on ?</h2>
          <p>
            Après avoir atteint un pic historique à 4,5 % en fin 2023, les
            taux immobiliers en France ont amorcé une descente progressive
            depuis mi-2024, portée par les baisses successives de la BCE. En
            2026, les taux se stabilisent dans une fourchette de{" "}
            <strong>3,5 à 4,0 %</strong> selon la durée et le profil de
            l'emprunteur.
          </p>
          <p>
            Pour un emprunt sur 20 ans, un excellent profil (apport supérieur à
            20 %, CDI, revenus stables) peut obtenir un taux nominal autour de
            3,5 %. Un profil standard (apport de 10 %, situation stable) tourne
            plutôt autour de 3,7 à 3,8 %. Sur 25 ans, ces taux sont majorés
            d'environ 0,2 à 0,3 point. Le TAEG moyen, qui inclut l'assurance
            emprunteur et les frais de dossier, se situe autour de 4,0 à 4,3 %
            en 2026 pour un profil standard.
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
              <strong>Conseil :</strong> Négociez votre assurance emprunteur
              séparément de votre banque (délégation d'assurance). Cela peut
              économiser de 0,2 % à 0,5 % de TAEG, soit{" "}
              <strong>plusieurs milliers d'euros</strong> sur la durée totale du
              prêt — souvent plus que la négociation du taux lui-même.
            </p>
          </div>

          <h2>Comment obtenir le meilleur taux ?</h2>
          <p>
            Obtenir le meilleur taux immobilier en 2026 repose sur plusieurs
            leviers complémentaires :
          </p>
          <ul>
            <li>
              <strong>Maximiser l'apport personnel :</strong> Un apport d'au
              moins 10 à 20 % du prix est quasi-obligatoire. Au-delà de 20 %,
              vous accédez aux meilleures grilles de taux. L'apport couvre
              idéalement les frais de notaire et une partie du capital.
            </li>
            <li>
              <strong>Soigner son dossier :</strong> Stabilité professionnelle
              (CDI ou 3 ans d'ancienneté en tant que travailleur indépendant),
              absence d'incidents bancaires, taux d'endettement inférieur à
              30 % avant emprunt, épargne résiduelle après achat.
            </li>
            <li>
              <strong>Passer par un courtier :</strong> Un courtier immobilier
              peut faire gagner de 0,2 à 0,5 point de taux et accélérer
              l'instruction du dossier. Sa rémunération est souvent prise en
              charge par la banque. C'est particulièrement utile pour les
              dossiers atypiques.
            </li>
            <li>
              <strong>Comparer plusieurs établissements :</strong> Ne vous
              limitez pas à votre banque habituelle. Banques en ligne, banques
              régionales et mutuelles proposent parfois des conditions plus
              avantageuses selon votre profil.
            </li>
            <li>
              <strong>Déléguer l'assurance emprunteur :</strong> La loi Lemoine
              vous permet de changer d'assurance à tout moment. Un contrat
              délégué coûte souvent 2 à 4 fois moins cher que le contrat groupe
              de la banque.
            </li>
          </ul>

          <h2>Questions fréquentes (FAQ)</h2>

          <div style={{ marginTop: 8 }}>
            <h3 style={{ fontSize: 17, color: "#1e293b", marginBottom: 6 }}>
              Quelle mensualité pour 200 000 euros ?
            </h3>
            <p>
              Pour un emprunt de 200 000 € à un taux de 3,6 % sur 20 ans, la
              mensualité hors assurance est d'environ 1 165 €/mois. Sur 25 ans
              au même taux, elle descend à 1 003 €/mois. En ajoutant
              l'assurance emprunteur (environ 0,25 % du capital annuel, soit
              ~42 €/mois), comptez respectivement 1 207 € et 1 045 €/mois.
              Pour respecter la règle HCSF des 35 % d'endettement, il faut donc
              disposer d'un revenu net mensuel d'au moins 3 450 € sur 20 ans ou
              2 990 € sur 25 ans.
            </p>

            <h3 style={{ fontSize: 17, color: "#1e293b", marginBottom: 6, marginTop: 20 }}>
              Quel salaire pour emprunter 300 000 euros ?
            </h3>
            <p>
              Pour emprunter 300 000 € à 3,8 % sur 20 ans, la mensualité est
              d'environ 1 768 € hors assurance, soit ~1 830 € avec assurance.
              Avec la règle des 35 % maximum d'endettement imposée par le HCSF,
              il faut un revenu net mensuel d'au moins 5 230 €. Sur 25 ans, la
              mensualité descend à environ 1 603 € assurance comprise, ce qui
              nécessite un revenu d'au moins 4 580 €/mois. Ces seuils peuvent
              être atteints en comptant les revenus de deux emprunteurs.
            </p>

            <h3 style={{ fontSize: 17, color: "#1e293b", marginBottom: 6, marginTop: 20 }}>
              Comment calculer le coût total de son crédit ?
            </h3>
            <p>
              Le coût total d'un crédit immobilier comprend trois éléments : le
              total des intérêts payés sur la durée (mensualité × nombre de
              mois − capital emprunté), le coût de l'assurance emprunteur
              (environ 0,25 % du capital par an, sur toute la durée), et les
              frais de dossier bancaires (généralement 500 à 1 500 €). Pour un
              prêt de 300 000 € à 3,8 % sur 25 ans, le coût total
              intérêts + assurance dépasse 200 000 €. Notre simulateur calcule
              ce chiffre automatiquement et affiche le tableau d'amortissement
              complet mois par mois.
            </p>

            <h3 style={{ fontSize: 17, color: "#1e293b", marginBottom: 6, marginTop: 20 }}>
              Quelle durée choisir pour son prêt immobilier ?
            </h3>
            <p>
              Le choix de la durée dépend de votre capacité de remboursement
              mensuelle et de votre horizon de détention du bien. Une durée plus
              courte (15-20 ans) coûte moins cher en intérêts mais impose des
              mensualités plus élevées. Une durée longue (25 ans, maximum
              autorisé par le HCSF) allège la mensualité mais augmente
              significativement le coût total. En 2026, la plupart des
              emprunteurs primo-accédants optent pour 20 à 25 ans. Si vous
              prévoyez de revendre avant 10 ans, une durée plus longue est
              souvent plus judicieuse pour préserver votre trésorerie mensuelle.
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
              Calculez votre mensualité en 30 secondes
            </h2>
            <p style={{ color: "#1e293b", maxWidth: 480, margin: "0 auto" }}>
              Notre simulateur de prêt immobilier gratuit génère votre tableau
              d'amortissement complet, le coût total du crédit et compare
              plusieurs scénarios en un clic. Sans inscription.
            </p>
            <Link
              to="/simulateurs/pret-immobilier"
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
              Calculer ma mensualité →
            </Link>
          </div>

          {/* Related links */}
          <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: 20, marginTop: 8 }}>
            <p style={{ fontSize: 14, color: "#64748b", marginBottom: 8 }}>
              Simulateurs associés :
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {[
                { to: "/simulateurs/endettement", label: "Capacité d'emprunt" },
                { to: "/simulateurs/assurance-pret", label: "Assurance prêt" },
                { to: "/simulateurs/budget-maximum", label: "Budget maximum" },
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
