import { Link } from "react-router-dom";
import { useSEO } from "../../utils/useSEO";
import TopBar from "../TopBar";
import Footer from "../Footer";

export default function PageFraisNotaireSEO() {
  useSEO({
    title: "Calculateur frais de notaire 2026 - Gratuit",
    description:
      "Calculez vos frais de notaire au centime près pour 2026. Ancien ou neuf, primo-accédant ou non : résultat immédiat sans inscription.",
    path: "/calculateur-frais-de-notaire-2026",
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
              <span>Calculateur frais de notaire 2026</span>
            </nav>
            <h1>
              Calculateur frais de notaire 2026 : combien allez-vous payer ?
            </h1>
          </div>

          <p>
            Les frais de notaire — officiellement appelés <em>droits de
            mutation à titre onéreux</em> (DMTO) — sont une dépense
            incontournable lors de tout achat immobilier en France. Ils sont
            réglés à la signature de l'acte authentique chez le notaire et
            représentent une part significative du coût total de l'opération.
            Contrairement à ce que leur nom laisse supposer, ces frais ne vont
            pas principalement au notaire : la majeure partie est reversée à
            l'État et aux collectivités locales sous forme de taxes. Calculer
            précisément ce montant avant de signer un compromis est essentiel
            pour ne pas être pris au dépourvu lors du bouclage du financement.
          </p>
          <p>
            En 2026, les frais de notaire varient selon le type de bien et le
            statut de l'acheteur. Pour un bien ancien, ils oscillent entre{" "}
            <strong>7 et 8 %</strong> du prix de vente. Pour un bien neuf ou en
            VEFA, ils descendent à <strong>2 à 3 %</strong>. Les primo-accédants
            bénéficiant d'un Prêt à Taux Zéro (PTZ) peuvent également profiter
            d'exonérations partielles sur certaines taxes.
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
              { label: "Bien ancien", value: "7 – 8 %", sub: "du prix de vente" },
              { label: "Bien neuf / VEFA", value: "2 – 3 %", sub: "du prix de vente" },
              { label: "Économie possible", value: "jusqu'à 25 k€", sub: "neuf vs ancien pour 300 k€" },
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

          <h2>Composition des frais de notaire</h2>
          <p>
            Les frais de notaire se décomposent en trois grandes catégories,
            chacune correspondant à une nature de dépense différente :
          </p>
          <ul>
            <li>
              <strong>Droits de mutation (taxes) :</strong> Représentent la
              part la plus importante, environ <strong>5,8 %</strong> du prix
              pour un bien ancien. Il s'agit de la taxe départementale (4,5 %
              dans la quasi-totalité des départements depuis 2014) plus la taxe
              communale additionnelle (1,2 %) et une contribution à la sécurité
              immobilière (0,1 %). Ces taxes sont collectées par le notaire et
              reversées à l'État et aux collectivités.
            </li>
            <li>
              <strong>Émoluments du notaire :</strong> La rémunération
              proprement dite du notaire, calculée selon un barème national
              dégressif (environ 1 à 2 % du prix selon la tranche). Pour un
              bien à 250 000 €, les émoluments s'élèvent à environ 2 800 €.
            </li>
            <li>
              <strong>Frais et débours divers :</strong> Frais de publication au
              service de publicité foncière, demandes d'état civil, honoraires
              d'intervenants tiers... Ces frais représentent généralement 0,5 à
              1 % supplémentaires.
            </li>
          </ul>

          {/* Table ancien vs neuf */}
          <p>
            Voici un comparatif pour un achat à <strong>250 000 €</strong> :
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
                    Poste
                  </th>
                  <th style={{ padding: "10px 14px", textAlign: "right", borderBottom: "2px solid #bfdbfe" }}>
                    Bien ancien
                  </th>
                  <th style={{ padding: "10px 14px", textAlign: "right", borderBottom: "2px solid #bfdbfe" }}>
                    Bien neuf / VEFA
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Droits de mutation", "14 500 €", "~500 €"],
                  ["Émoluments notaire", "2 800 €", "2 800 €"],
                  ["Frais et débours", "1 200 €", "1 200 €"],
                  ["Total estimé", "18 500 € (7,4 %)", "4 500 € (1,8 %)"],
                ].map((row, i) => (
                  <tr
                    key={i}
                    style={{
                      background: i === 3 ? "#eff6ff" : i % 2 === 0 ? "#fff" : "#f8fafc",
                      fontWeight: i === 3 ? 700 : 400,
                    }}
                  >
                    {row.map((cell, j) => (
                      <td
                        key={j}
                        style={{
                          padding: "9px 14px",
                          borderBottom: "1px solid #e2e8f0",
                          textAlign: j > 0 ? "right" : "left",
                          color: i === 3 && j > 0 ? "#1a56db" : "#1e293b",
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

          <h2>Frais de notaire 2026 : les taux et barèmes exacts</h2>
          <p>
            Le barème des émoluments notariaux est fixé par décret et s'applique
            de manière dégressive. Pour 2026, il reste identique à celui en
            vigueur depuis 2021 :
          </p>
          <ul>
            <li>De 0 à 6 500 € : 3,87 %</li>
            <li>De 6 500 à 17 000 € : 1,596 %</li>
            <li>De 17 000 à 60 000 € : 1,064 %</li>
            <li>Au-delà de 60 000 € : 0,799 %</li>
          </ul>
          <p>
            À cela s'ajoute la TVA à 20 % sur les émoluments. Le taux de la
            taxe départementale est de 4,5 % dans 97 des 101 départements
            métropolitains. Quatre départements (Isère, Morbihan, Mayenne et
            Indre) ont conservé un taux réduit à 3,8 %, ce qui se traduit par
            des frais totaux légèrement inférieurs.
          </p>

          <h2>Peut-on réduire ses frais de notaire ?</h2>
          <p>
            Plusieurs stratégies permettent de diminuer légalement le montant
            des frais de notaire :
          </p>
          <ul>
            <li>
              <strong>Acheter dans le neuf ou en VEFA :</strong> Les droits de
              mutation sont quasi-inexistants (seulement TVA déjà incluse dans
              le prix), ce qui ramène les frais totaux à 2-3 % au lieu de 7-8 %.
            </li>
            <li>
              <strong>Déduire la valeur des meubles et équipements :</strong>{" "}
              Si vous achetez un bien avec une cuisine équipée, des
              climatiseurs, un sauna ou tout équipement amovible, leur valeur
              peut être négociée séparément dans un contrat de vente mobilière.
              Les droits de mutation ne s'appliquent pas sur cette part. Sur un
              bien avec 20 000 € de meubles bien valorisés, l'économie peut
              atteindre 1 000 à 1 500 €.
            </li>
            <li>
              <strong>Bénéficier du PTZ :</strong> Dans certaines conditions,
              l'achat en zone éligible au Prêt à Taux Zéro peut ouvrir droit à
              des exonérations de taxe foncière temporaires et à des avantages
              fiscaux connexes.
            </li>
          </ul>

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
              <strong>À retenir :</strong> En achetant du neuf ou sous PTZ,
              les frais de notaire tombent à 2-3 % au lieu de 7-8 %. Sur un
              achat à 300 000 €, c'est une économie potentielle de{" "}
              <strong>15 000 à 18 000 €</strong> à prendre en compte dans votre
              plan de financement.
            </p>
          </div>

          <h2>Frais de notaire et primo-accédant</h2>
          <p>
            Les primo-accédants bénéficient de plusieurs dispositifs qui peuvent
            alléger indirectement la facture des frais de notaire. Le PTZ 2026,
            étendu aux logements anciens dans les zones B2 et C, permet de
            financer jusqu'à 40 % du prix d'acquisition sans intérêts. Cette
            aide réduit le capital emprunté à taux normal et donc la charge
            mensuelle globale, libérant de la capacité pour financer les frais
            de notaire.
          </p>
          <p>
            Par ailleurs, certaines régions et communes proposent des aides
            complémentaires spécifiquement pour les primo-accédants : prêts à
            taux réduit des collectivités, subventions à l'achat ou prise en
            charge partielle des frais d'acte. Il est conseillé de se
            renseigner auprès de votre mairie ou conseil régional avant de
            signer un compromis.
          </p>
          <p>
            Un point souvent négligé : les frais de notaire ne sont pas
            finançables par le prêt immobilier classique (sauf exception avec
            un prêt à 110 %, de plus en plus rare). Ils doivent être couverts
            par l'apport personnel. Pour un bien à 250 000 €, prévoir au minimum
            18 000 à 20 000 € d'apport rien que pour les frais de notaire, en
            plus de l'apport sur le bien lui-même.
          </p>

          <h2>Questions fréquentes (FAQ)</h2>

          <div style={{ marginTop: 8 }}>
            <h3 style={{ fontSize: 17, color: "#1e293b", marginBottom: 6 }}>
              Combien sont les frais de notaire pour 200 000 euros ?
            </h3>
            <p>
              Pour un bien ancien à 200 000 €, les frais de notaire s'élèvent à
              environ 14 400 à 16 000 €, soit 7,2 à 8 % du prix. Ce montant se
              décompose en droits de mutation (~11 600 €), émoluments du notaire
              (~2 400 €) et frais divers (~800 €). Pour un bien neuf au même
              prix, comptez environ 4 000 à 5 000 € (2 à 2,5 %), car les droits
              de mutation sont quasi-nuls. Ces frais doivent impérativement être
              couverts par l'apport personnel.
            </p>

            <h3 style={{ fontSize: 17, color: "#1e293b", marginBottom: 6, marginTop: 20 }}>
              Les frais de notaire sont-ils négociables ?
            </h3>
            <p>
              Les droits de mutation (la majeure partie des frais) sont fixés
              par la loi et ne sont pas négociables. En revanche, la
              rémunération du notaire (ses émoluments) peut faire l'objet d'une
              remise de 10 % maximum sur la partie excédant 150 000 €, depuis
              le décret du 26 février 2016. Dans la pratique, cette remise est
              rarement accordée spontanément — il faut la demander explicitement,
              et elle reste à la discrétion du notaire. Le vrai levier de
              réduction reste le choix du type de bien (neuf vs ancien) et la
              déduction des meubles.
            </p>

            <h3 style={{ fontSize: 17, color: "#1e293b", marginBottom: 6, marginTop: 20 }}>
              Quand paye-t-on les frais de notaire ?
            </h3>
            <p>
              Les frais de notaire sont réglés le jour de la signature de l'acte
              authentique de vente, chez le notaire. En pratique, le notaire
              demande un appel de fonds quelques jours avant la signature pour
              préparer les fonds (règlement des taxes auprès des services fiscaux
              dans un délai légal d'un mois). Il n'est pas possible de les payer
              à crédit ou en plusieurs fois dans le cadre d'un prêt immobilier
              standard — ils font partie intégrante de l'apport personnel
              nécessaire à l'opération.
            </p>

            <h3 style={{ fontSize: 17, color: "#1e293b", marginBottom: 6, marginTop: 20 }}>
              Y a-t-il des frais de notaire réduits pour les primo-accédants ?
            </h3>
            <p>
              Il n'existe pas de taux de frais de notaire spécifique aux
              primo-accédants dans l'ancien. En revanche, acheter un logement
              neuf (ou en VEFA) réduit drastiquement ces frais à 2-3 %, ce qui
              est souvent accessible aux primo-accédants via le PTZ. De plus,
              certaines communes et départements offrent des exonérations ou
              allègements de taxe foncière pendant 2 à 5 ans pour les nouveaux
              acquéreurs dans le neuf, ce qui compense partiellement les coûts
              d'acquisition.
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
              Calculez vos frais de notaire au centime près
            </h2>
            <p style={{ color: "#1e293b", maxWidth: 480, margin: "0 auto" }}>
              Notre calculateur gratuit distingue ancien / neuf, intègre le
              barème 2026 exact et vous donne un résultat immédiat.
            </p>
            <Link
              to="/simulateurs/frais-notaire"
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
              Calculer mes frais de notaire →
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
                { to: "/simulateurs/ptz", label: "Simulateur PTZ 2026" },
                { to: "/simulateur", label: "Louer ou acheter ?" },
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
