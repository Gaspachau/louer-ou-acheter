import { Link } from "react-router-dom";
import { useSEO } from "../../utils/useSEO";
import TopBar from "../TopBar";
import Footer from "../Footer";

export default function PageCapaciteEmpruntSEO() {
  useSEO({
    title: "Capacité d'emprunt - Calcul gratuit 2026",
    description:
      "Calculez votre capacité d'emprunt immobilier selon vos revenus et charges. Règle HCSF 35% expliquée. Résultat en 30 secondes, gratuit.",
    path: "/capacite-emprunt-calcul-gratuit",
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
              <span>Capacité d'emprunt — Calcul gratuit 2026</span>
            </nav>
            <h1>Calculez votre capacité d'emprunt immobilier gratuitement</h1>
          </div>

          <p>
            La capacité d'emprunt est le montant maximum que vous pouvez
            emprunter auprès d'une banque pour financer un achat immobilier,
            compte tenu de vos revenus, de vos charges existantes et des règles
            prudentielles en vigueur. En France, depuis 2021, le Haut Conseil
            de Stabilité Financière (HCSF) impose aux banques de limiter le
            taux d'endettement des ménages à <strong>35 % des revenus nets</strong>{" "}
            (assurance emprunteur incluse). Cette règle, initialement une
            recommandation, est devenue contraignante et s'applique à plus de
            80 % des dossiers traités.
          </p>
          <p>
            Connaître votre capacité d'emprunt avant de visiter des biens est
            indispensable pour cibler des biens dans votre budget réel, négocier
            avec les vendeurs en position de force, et préparer un dossier
            bancaire solide. Un calcul approximatif peut vous faire rater une
            opportunité ou vous engager dans un projet sous-financé.
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
              { label: "Taux d'endettement max", value: "35 %", sub: "règle HCSF 2026" },
              { label: "Durée max HCSF", value: "27 ans", sub: "avec différé inclus" },
              { label: "Exemple 3 500 €/mois", value: "~198 k€", sub: "capacité sur 20 ans" },
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

          <h2>La règle HCSF des 35 % : comment ça marche ?</h2>
          <p>
            La règle HCSF des 35 % signifie que l'ensemble de vos charges de
            remboursement de crédits (crédit immobilier + assurance emprunteur +
            tout autre crédit en cours) ne doit pas dépasser 35 % de vos
            revenus nets mensuels. La formule est simple :
          </p>
          <p>
            <strong>Mensualité max = Revenus nets × 35 %</strong>
          </p>
          <p>
            Pour un ménage avec 3 500 € de revenus nets mensuels, la mensualité
            maximale (assurance comprise) est de <strong>1 225 €/mois</strong>.
            Avec un taux de 3,8 % sur 20 ans, cela correspond à une capacité
            d'emprunt d'environ <strong>198 000 €</strong>. Sur 25 ans, la même
            mensualité permet d'emprunter environ <strong>238 000 €</strong>.
          </p>
          <p>
            Les banques appliquent également la règle du reste à vivre : après
            remboursement du crédit, le ménage doit conserver un montant minimal
            pour vivre (environ 800 à 1 000 € par personne selon les
            établissements). Cette règle peut être plus contraignante que les
            35 % pour les petits revenus.
          </p>

          <h2>Exemples concrets selon les revenus</h2>
          <p>
            Voici un tableau récapitulatif de la capacité d'emprunt selon
            différents niveaux de revenus, en supposant aucune charge de crédit
            existante, un taux de 3,8 % et une assurance de 0,25 % :
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
                    Revenus nets
                  </th>
                  <th style={{ padding: "10px 14px", textAlign: "right", borderBottom: "2px solid #bfdbfe" }}>
                    Mensualité max (35 %)
                  </th>
                  <th style={{ padding: "10px 14px", textAlign: "right", borderBottom: "2px solid #bfdbfe" }}>
                    Capacité sur 20 ans
                  </th>
                  <th style={{ padding: "10px 14px", textAlign: "right", borderBottom: "2px solid #bfdbfe" }}>
                    Capacité sur 25 ans
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["2 500 €/mois", "875 €", "~142 k€", "~170 k€"],
                  ["3 000 €/mois", "1 050 €", "~170 k€", "~204 k€"],
                  ["3 500 €/mois", "1 225 €", "~198 k€", "~238 k€"],
                  ["4 000 €/mois", "1 400 €", "~227 k€", "~272 k€"],
                  ["5 000 €/mois", "1 750 €", "~284 k€", "~340 k€"],
                  ["7 000 €/mois", "2 450 €", "~397 k€", "~476 k€"],
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
                          textAlign: j > 0 ? "right" : "left",
                          fontWeight: j === 0 ? 600 : 400,
                          color: j >= 2 ? "#1a56db" : "#1e293b",
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
              <strong>Emprunt en couple :</strong> À deux, votre capacité
              d'emprunt peut être 1,8 à 2 fois celle de chacun
              individuellement. En mutualisant les revenus, vous atteignez des
              seuils de mensualité plus élevés tout en respectant les 35 %
              d'endettement global du foyer.
            </p>
          </div>

          <h2>Les charges qui réduisent votre capacité d'emprunt</h2>
          <p>
            La banque intègre dans son calcul toutes les charges de crédit
            existantes, pas seulement le futur prêt immobilier. Voici ce qui
            est pris en compte :
          </p>
          <ul>
            <li>Mensualités de crédits à la consommation en cours (auto, travaux, personnel)</li>
            <li>Mensualités de prêts étudiants non remboursés</li>
            <li>Loyers de crédit-bail ou LOA (auto, matériel professionnel)</li>
            <li>Pensions alimentaires versées (déduites des revenus)</li>
            <li>Mensualités d'un précédent prêt immobilier (investissement locatif)</li>
          </ul>
          <p>
            En revanche, les loyers payés, les charges courantes (électricité,
            alimentation, abonnements) et les dépenses de loisirs ne sont pas
            intégrés dans le calcul du taux d'endettement. Seules les charges
            de remboursement de dettes sont comptabilisées.
          </p>

          <h2>Comment augmenter sa capacité d'emprunt ?</h2>
          <p>
            Plusieurs leviers permettent d'améliorer votre capacité d'emprunt
            avant de déposer un dossier :
          </p>
          <ul>
            <li>
              <strong>Augmenter l'apport personnel :</strong> Un apport plus
              important réduit le capital à emprunter et démontre votre
              capacité d'épargne. Les banques accordent de meilleures conditions
              à partir de 10 %, et encore mieux au-delà de 20 %.
            </li>
            <li>
              <strong>Allonger la durée du prêt :</strong> Passer de 20 à 25 ans
              réduit la mensualité de 15 à 20 % à taux équivalent, augmentant
              d'autant la capacité d'emprunt. Attention au coût total des
              intérêts.
            </li>
            <li>
              <strong>Solder les crédits en cours :</strong> Rembourser par
              anticipation un crédit conso ou LOA libère de la capacité de
              remboursement. Si votre crédit conso affiche 300 €/mois et qu'il
              reste 10 000 €, le solder peut augmenter votre capacité de prêt
              de 40 000 à 60 000 € selon le taux.
            </li>
            <li>
              <strong>Ajouter un co-emprunteur :</strong> Emprunter à deux
              permet de cumuler les revenus. C'est souvent la solution la plus
              efficace pour accéder à un bien dans les zones chères.
            </li>
            <li>
              <strong>Optimiser l'assurance emprunteur :</strong> Une assurance
              moins chère réduit la mensualité globale, libérant de la marge
              dans le calcul des 35 %.
            </li>
          </ul>

          <h2>Questions fréquentes (FAQ)</h2>

          <div style={{ marginTop: 8 }}>
            <h3 style={{ fontSize: 17, color: "#1e293b", marginBottom: 6 }}>
              Quel revenu pour emprunter 200 000 euros ?
            </h3>
            <p>
              Pour emprunter 200 000 € à 3,8 % sur 20 ans, la mensualité avec
              assurance est d'environ 1 220 €. Avec la règle des 35 %
              d'endettement, il faut un revenu net mensuel d'au moins 3 490 €.
              Sur 25 ans, la mensualité descend à environ 1 040 €, nécessitant
              un revenu minimal de 2 970 €. Ces chiffres supposent aucune autre
              charge de crédit en cours. Si vous avez un crédit auto à 300 €/mois,
              ajoutez environ 860 € de revenu supplémentaire requis.
            </p>

            <h3 style={{ fontSize: 17, color: "#1e293b", marginBottom: 6, marginTop: 20 }}>
              Comment la banque calcule-t-elle ma capacité d'emprunt ?
            </h3>
            <p>
              La banque additionne tous vos revenus réguliers nets (salaires,
              revenus fonciers à 70 %, pensions) et en déduit toutes vos
              charges de crédit actuelles. Le solde disponible pour le futur
              prêt correspond à 35 % de vos revenus nets moins les charges
              existantes. La banque calcule ensuite le capital empruntable qui
              génère cette mensualité sur la durée choisie. Elle applique
              également une simulation de stress test (taux +2 %) pour les prêts
              à taux variable et vérifie le reste à vivre minimum après
              remboursement.
            </p>

            <h3 style={{ fontSize: 17, color: "#1e293b", marginBottom: 6, marginTop: 20 }}>
              Peut-on dépasser 35 % d'endettement ?
            </h3>
            <p>
              Oui, mais de manière limitée. Le HCSF autorise les banques à
              déroger à la règle des 35 % pour 20 % de leur production
              trimestrielle de nouveaux crédits. Ces dérogations sont
              prioritairement accordées aux primo-accédants et aux achats de
              résidence principale. En pratique, si votre reste à vivre est
              confortable et votre dossier solide (épargne résiduelle, CDI,
              apport supérieur à 20 %), une banque peut accepter jusqu'à 37-38 %
              d'endettement. Au-delà, les refus sont quasi-systématiques.
            </p>

            <h3 style={{ fontSize: 17, color: "#1e293b", marginBottom: 6, marginTop: 20 }}>
              Quel apport minimum pour emprunter ?
            </h3>
            <p>
              Il n'existe pas d'apport minimum légalement fixé, mais dans la
              pratique les banques exigent en 2026 un apport d'au moins 10 % du
              prix d'achat pour couvrir les frais de notaire et de garantie. Sans
              apport (prêt à 110 %), les dossiers sont très rarement acceptés et
              uniquement pour des profils excellents (CDI, revenus élevés,
              épargne résiduelle conséquente). Un apport de 10 à 15 % est le
              standard ; au-delà de 20 %, vous accédez aux meilleures conditions
              de taux.
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
              Calculez votre capacité d'emprunt en 30 secondes
            </h2>
            <p style={{ color: "#1e293b", maxWidth: 480, margin: "0 auto" }}>
              Notre simulateur intègre la règle HCSF des 35 %, vos charges
              actuelles et les taux 2026 pour vous donner votre budget réel.
            </p>
            <Link
              to="/simulateurs/endettement"
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
              Calculer ma capacité d'emprunt →
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
                { to: "/simulateurs/simulateur-couple", label: "Simulation couple" },
                { to: "/simulateurs/stress-test", label: "Stress test financier" },
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
