import { Link } from "react-router-dom";
import { useSEO } from "../../utils/useSEO";
import TopBar from "../TopBar";
import Footer from "../Footer";

export default function PageTauxImmoSEO() {
  useSEO({
    title: "Taux immobilier 2026 : baromètre et prévisions",
    description:
      "Taux immobilier 2026 : où en sont les taux, quelles prévisions pour la suite ? Analyse et simulateur pour calculer votre mensualité.",
    path: "/taux-immobilier-2026",
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
              <span>Taux immobilier 2026 — Baromètre et prévisions</span>
            </nav>
            <h1>Taux immobilier 2026 : baromètre, analyse et prévisions</h1>
          </div>

          <p>
            Après une hausse spectaculaire entre 2022 et 2023, les taux
            immobiliers en France se stabilisent en 2026 dans une zone de
            confort relative. La Banque Centrale Européenne (BCE) a initié son
            cycle de baisse des taux directeurs à partir de mi-2024, permettant
            aux banques françaises de progressivement desserrer les conditions
            de crédit. Pour les emprunteurs, c'est une fenêtre d'opportunité
            après deux années difficiles.
          </p>
          <p>
            En 2026, le taux moyen sur 20 ans pour un bon dossier tourne autour
            de <strong>3,5 à 3,7 %</strong>. Un profil excellent peut obtenir
            des taux sous les 3,5 %, tandis qu'un dossier standard se situe
            davantage entre 3,7 et 4,0 %. Ces niveaux, bien que supérieurs aux
            taux historiquement bas de 2020-2021, restent comparables à la
            moyenne des 20 dernières années et permettent des financements
            viables pour la grande majorité des ménages.
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
              { label: "Taux moyen 20 ans", value: "3,7 %", sub: "profil standard, avril 2026" },
              { label: "Pic 2023", value: "4,5 %", sub: "taux le plus haut depuis 2012" },
              { label: "Fourchette 2026", value: "3,5 – 4,0 %", sub: "selon profil et durée" },
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

          <h2>Évolution des taux depuis 2020</h2>
          <p>
            La décennie 2010-2020 avait été marquée par une baisse quasi
            continue des taux immobiliers en France, atteignant des niveaux
            historiquement bas sous l'effet des politiques monétaires
            accommodantes de la BCE et d'un contexte d'inflation basse. Le
            choc inflationniste post-Covid de 2022 a mis fin brutalement à
            cette ère.
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
                    Année
                  </th>
                  <th style={{ padding: "10px 14px", textAlign: "right", borderBottom: "2px solid #bfdbfe" }}>
                    Taux moyen 20 ans
                  </th>
                  <th style={{ padding: "10px 14px", textAlign: "left", borderBottom: "2px solid #bfdbfe" }}>
                    Contexte
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["2020", "1,2 %", "Covid, taux BCE à 0 %, inflation basse"],
                  ["2021", "1,1 %", "Plus bas historique, marché en surchauffe"],
                  ["2022", "2,4 %", "Début du resserrement monétaire BCE"],
                  ["2023", "4,2 %", "Pic des taux, chute du volume de transactions"],
                  ["2024", "3,8 %", "Premières baisses BCE, légère détente"],
                  ["2026", "3,5 – 3,9 %", "Stabilisation, fenêtre favorable"],
                ].map((row, i) => (
                  <tr
                    key={i}
                    style={{
                      background: i === 5 ? "#eff6ff" : i % 2 === 0 ? "#fff" : "#f8fafc",
                      fontWeight: i === 5 ? 700 : i === 2 ? 700 : 400,
                    }}
                  >
                    {row.map((cell, j) => (
                      <td
                        key={j}
                        style={{
                          padding: "9px 14px",
                          borderBottom: "1px solid #e2e8f0",
                          textAlign: j === 1 ? "right" : "left",
                          color:
                            i === 2 && j === 1
                              ? "#dc2626"
                              : i === 5 && j === 1
                              ? "#16a34a"
                              : "#1e293b",
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

          <h2>Les taux en 2026 selon la durée</h2>
          <p>
            Les taux varient selon la durée choisie et le profil de
            l'emprunteur. Voici le baromètre des taux en avril 2026 :
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
                    Durée
                  </th>
                  <th style={{ padding: "10px 14px", textAlign: "right", borderBottom: "2px solid #bfdbfe" }}>
                    Excellent profil
                  </th>
                  <th style={{ padding: "10px 14px", textAlign: "right", borderBottom: "2px solid #bfdbfe" }}>
                    Bon profil
                  </th>
                  <th style={{ padding: "10px 14px", textAlign: "right", borderBottom: "2px solid #bfdbfe" }}>
                    Profil standard
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["15 ans", "3,20 %", "3,40 %", "3,65 %"],
                  ["20 ans", "3,40 %", "3,65 %", "3,90 %"],
                  ["25 ans", "3,60 %", "3,85 %", "4,10 %"],
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
                          color: j === 1 ? "#16a34a" : "#1e293b",
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
            Taux nominaux hors assurance. TAEG effectif à ajouter 0,2 à 0,4 %
            selon l'assurance emprunteur et les frais de dossier.
          </p>

          <h2>Prévisions pour la suite de 2026</h2>
          <p>
            Les économistes et courtiers s'accordent sur un scénario de
            stabilisation progressive des taux immobiliers pour le second
            semestre 2026, avec une légère tendance baissière si la BCE poursuit
            son cycle d'assouplissement. Les prévisions tablent sur une
            fourchette de <strong>3,3 à 3,7 %</strong> sur 20 ans d'ici fin
            2026, en supposant une inflation européenne maîtrisée sous 2,5 %
            et une croissance économique modérée.
          </p>
          <p>
            Plusieurs facteurs pourraient infléchir ces prévisions : une
            remontée de l'inflation (risque géopolitique, tensions
            énergétiques), un ralentissement économique marqué, ou au contraire
            une accélération des baisses BCE en cas de récession. Le contexte
            reste incertain, mais la direction de fond est favorable aux
            emprunteurs.
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
              <strong>Fenêtre 2026 :</strong> La BCE a amorcé la baisse des taux
              directeurs depuis mi-2024. Une fenêtre favorable s'ouvre en 2026
              avec des taux en baisse et des prix immobiliers qui se sont
              corrigés dans beaucoup de villes. C'est une combinaison favorable
              pour les primo-accédants qui ont attendu.
            </p>
          </div>

          <h2>Comment obtenir le meilleur taux en 2026 ?</h2>
          <p>
            Voici les leviers les plus efficaces pour décrocher un taux
            compétitif en 2026 :
          </p>
          <ul>
            <li>
              <strong>Maximiser l'apport personnel :</strong> Un apport d'au
              moins 20 % ouvre les meilleures grilles de taux. En dessous de
              10 %, certaines banques appliquent une majoration de taux ou
              refusent le dossier.
            </li>
            <li>
              <strong>Opter pour une durée courte :</strong> Plus la durée est
              courte, plus le taux est bas. Emprunter sur 15 ans plutôt que 25
              ans peut faire gagner jusqu'à 0,8 point de taux.
            </li>
            <li>
              <strong>Constituer un dossier solide :</strong> CDI ou 3 ans
              d'ancienneté, épargne résiduelle visible après achat, absence
              d'incidents bancaires, revenus stables ou en progression.
            </li>
            <li>
              <strong>Passer par un courtier :</strong> Un bon courtier négocie
              des taux que vous ne pourriez pas obtenir seul, notamment auprès
              de banques régionales peu visibles. Sa rémunération est souvent
              supportée par la banque.
            </li>
            <li>
              <strong>Déléguer l'assurance emprunteur :</strong> Le TAEG inclut
              l'assurance. En passant par un assureur externe (délégation loi
              Lemoine), vous pouvez réduire le TAEG effectif de 0,2 à 0,5 point.
            </li>
          </ul>

          <h2>Taux fixe ou taux variable ?</h2>
          <p>
            En France, le taux fixe est largement dominant (plus de 95 % des
            prêts immobiliers). Il offre la sécurité d'une mensualité
            identique pendant toute la durée du prêt, quelles que soient les
            évolutions des marchés. Le taux variable (ou révisable) est indexé
            sur un taux de référence (généralement l'Euribor) et peut évoluer
            à la hausse comme à la baisse, avec un plafonnement (cap) de
            ±1 à ±2 % selon les contrats.
          </p>
          <p>
            Dans le contexte de 2026, le taux fixe reste la recommandation
            dominante des professionnels. Les taux variables présentent un
            intérêt marginal seulement si vous prévoyez de revendre ou de
            rembourser rapidement (dans les 5-7 ans) et si les taux variables
            affichent un avantage significatif (0,5 point ou plus) sur les
            taux fixes au moment de l'emprunt.
          </p>

          <h2>Questions fréquentes (FAQ)</h2>

          <div style={{ marginTop: 8 }}>
            <h3 style={{ fontSize: 17, color: "#1e293b", marginBottom: 6 }}>
              Quel est le taux immobilier actuel en 2026 ?
            </h3>
            <p>
              En avril 2026, les taux immobiliers en France se situent entre
              3,4 % et 4,1 % selon la durée et le profil de l'emprunteur. Pour
              un emprunt sur 20 ans avec un bon profil (apport 15-20 %, CDI
              stable, endettement bas), le taux nominal oscille autour de 3,5
              à 3,7 %. Le TAEG moyen, assurance comprise, se situe entre 3,9
              et 4,3 %. Ces taux sont en baisse de 0,5 à 0,8 point par rapport
              au pic de fin 2023, grâce aux baisses des taux directeurs BCE
              engagées depuis mi-2024.
            </p>

            <h3 style={{ fontSize: 17, color: "#1e293b", marginBottom: 6, marginTop: 20 }}>
              Les taux vont-ils encore baisser en 2026 ?
            </h3>
            <p>
              La tendance de fond est baissière, mais l'ampleur et le rythme de
              la baisse restent incertains. La majorité des économistes
              anticipent une baisse modérée de 0,2 à 0,4 point d'ici fin 2026,
              portant le taux moyen sur 20 ans vers 3,3 à 3,5 %. Cette
              prévision repose sur la poursuite du cycle de baisse des taux
              directeurs par la BCE et une inflation en ligne avec l'objectif
              des 2 %. Un choc externe (géopolitique, énergétique) pourrait
              inverser cette tendance. Attendre une baisse supplémentaire pour
              emprunter est risqué : une bonne opportunité immobilière peut
              valoir plus que 0,2 point de taux.
            </p>

            <h3 style={{ fontSize: 17, color: "#1e293b", marginBottom: 6, marginTop: 20 }}>
              Quelle différence entre TAEG et taux nominal ?
            </h3>
            <p>
              Le taux nominal est le taux d'intérêt pur appliqué au capital
              emprunté, qui détermine la partie "intérêts" de chaque mensualité.
              Le TAEG (Taux Annuel Effectif Global) inclut en plus le coût de
              l'assurance emprunteur, les frais de dossier et les frais de
              garantie (caution ou hypothèque). C'est le TAEG qui représente le
              coût réel du crédit et qui est utilisé pour comparer deux offres de
              prêt. En 2026, la différence entre taux nominal et TAEG est
              généralement de 0,2 à 0,5 point, principalement due à l'assurance.
            </p>

            <h3 style={{ fontSize: 17, color: "#1e293b", marginBottom: 6, marginTop: 20 }}>
              Vaut-il mieux emprunter sur 20 ou 25 ans en 2026 ?
            </h3>
            <p>
              Le choix entre 20 et 25 ans dépend de votre situation financière
              et de votre horizon de détention. Sur 20 ans, le taux est plus bas
              (environ 0,2 point de moins), les intérêts totaux sont inférieurs,
              et vous constituez du patrimoine plus vite. Sur 25 ans, la
              mensualité est allégée d'environ 15 %, ce qui peut être décisif
              pour respecter les 35 % d'endettement. Si votre capacité de
              remboursement mensuelle le permet, 20 ans est généralement plus
              avantageux. Si vous êtes en limite de capacité d'emprunt, 25 ans
              vous permet d'accéder à un bien plus grand ou mieux situé.
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
              Simulez votre prêt avec les taux 2026
            </h2>
            <p style={{ color: "#1e293b", maxWidth: 480, margin: "0 auto" }}>
              Entrez votre montant, durée et taux pour calculer votre
              mensualité, le coût total du crédit et visualiser votre tableau
              d'amortissement.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginTop: 12 }}>
              <Link
                to="/simulateur"
                style={{
                  display: "inline-block",
                  background: "linear-gradient(135deg, #1a56db, #0c2a85)",
                  color: "#fff",
                  padding: "14px 28px",
                  borderRadius: 10,
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                Simuler avec mon taux →
              </Link>
              <Link
                to="/simulateurs/pret-immobilier"
                style={{
                  display: "inline-block",
                  background: "#fff",
                  color: "#1a56db",
                  border: "2px solid #1a56db",
                  padding: "14px 28px",
                  borderRadius: 10,
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                Calculateur de mensualité
              </Link>
            </div>
          </div>

          {/* Related links */}
          <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: 20, marginTop: 8 }}>
            <p style={{ fontSize: 14, color: "#64748b", marginBottom: 8 }}>
              Simulateurs associés :
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {[
                { to: "/simulateurs/stress-test", label: "Stress test financier" },
                { to: "/simulateurs/assurance-pret", label: "Assurance prêt" },
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
