export const SEO_VILLES = {
  paris: {
    slug: "paris",
    nom: "Paris",
    region: "Île-de-France",
    prix_m2: 9500,
    loyer_t2: 1450,
    rentabilite_annees: 28,
    tension: "Très forte",
    seoTitle: "Louer ou acheter à Paris en 2026 : analyse et simulateur",
    seoDesc:
      "Louer ou acheter à Paris en 2026 ? Prix moyen 9 500 €/m², loyer T2 à 1 450 €/mois, point d'équilibre à 28 ans. Simulation gratuite en 2 min.",
    Content: () => (
      <>
        <h2>Le marché immobilier parisien en 2026</h2>
        <p>
          Après une correction de 12 % entre 2022 et 2025, les prix parisiens se stabilisent autour de{" "}
          <strong>9 000 à 11 000 €/m²</strong> selon les arrondissements. Le 1er et le 6e dépassent encore
          les 13 000 €/m², tandis que les 18e, 19e et 20e s'approchent des 8 000 €/m². Les taux de crédit,
          revenus progressivement autour de 3,5–4,0 % sur 20 ans, redonnent un souffle limité à la
          solvabilité des ménages — mais Paris reste l'une des villes les plus difficiles d'accès d'Europe.
        </p>
        <p>
          La demande locative reste structurellement très forte : Paris concentre étudiants, cadres
          expatriés, jeunes actifs et touristes de longue durée. Le taux de vacance locative y est l'un des
          plus bas de France, inférieur à 2 %. Pour un locataire, trouver un appartement relève parfois du
          parcours du combattant. Pour un propriétaire bailleur, la rentabilité brute reste médiocre
          — autour de 3 % — mais la valorisation patrimoniale de long terme compense.
        </p>

        <h2>Louer ou acheter à Paris : l'analyse chiffrée</h2>
        <p>
          Prenons un T2 de 45 m² dans le 11e arrondissement, affiché à <strong>427 500 €</strong> (soit
          9 500 €/m²). Avec un apport de 20 % et un crédit sur 25 ans à 3,8 %, les chiffres parlent
          d'eux-mêmes.
        </p>

        <div className="key-figures">
          <div className="key-figure">
            <span className="kf-value">2 050 €</span>
            <span className="kf-label">Coût mensuel achat</span>
          </div>
          <div className="key-figure">
            <span className="kf-value">1 450 €</span>
            <span className="kf-label">Loyer T2 moyen</span>
          </div>
          <div className="key-figure">
            <span className="kf-value">28 ans</span>
            <span className="kf-label">Point d'équilibre</span>
          </div>
          <div className="key-figure">
            <span className="kf-value">85 500 €</span>
            <span className="kf-label">Apport nécessaire</span>
          </div>
        </div>

        <div className="compare-table-wrap">
          <table className="compare-table">
            <thead>
              <tr>
                <th>Poste de dépense</th>
                <th>Achat</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Mensualité / loyer</td>
                <td>1 755 €/mois</td>
                <td>1 450 €/mois</td>
              </tr>
              <tr>
                <td>Charges annexes</td>
                <td>~295 €/mois</td>
                <td>~80 €/mois</td>
              </tr>
              <tr>
                <td>Frais d'entrée</td>
                <td>34 200 € (notaire)</td>
                <td>1 500 € (dépôt)</td>
              </tr>
              <tr>
                <td>Capital immobilisé</td>
                <td>85 500 € (apport)</td>
                <td>0 €</td>
              </tr>
              <tr>
                <td>Total mensuel all-in</td>
                <td>~2 050 €</td>
                <td>~1 530 €</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          La différence mensuelle de 520 € en faveur de la location doit être investie pour que la
          comparaison soit équitable. En plaçant cet excédent à 4 % net par an sur 28 ans, le locataire
          constitue un capital comparable à la valeur nette du bien pour le propriétaire. Le point
          d'équilibre se situe donc à <strong>28 ans dans les conditions actuelles</strong>, ce qui
          correspond à la quasi-totalité d'un crédit standard.
        </p>

        <div className="callout callout-tip">
          <span className="callout-icon">💡</span>
          <div className="callout-body">
            <strong>Règle des 28 ans à Paris</strong> — Si vous prévoyez de rester moins de 15 ans, la
            location est presque toujours plus rentable. Au-delà de 20 ans, l'achat rattrape son retard
            grâce au remboursement du capital et à la valorisation.
          </div>
        </div>

        <h2>Les quartiers parisiens à surveiller en 2026</h2>
        <p>
          Tous les arrondissements ne se valent pas. Voici les dynamiques à connaître pour orienter votre
          décision :
        </p>
        <ul>
          <li>
            <strong>Paris Est (10e, 11e, 20e) :</strong> La correction y a été plus marquée (–15 %) et les
            prix sont plus accessibles. C'est là que le rapport qualité/prix est le meilleur pour un
            primo-accédant.
          </li>
          <li>
            <strong>Paris Nord (18e, 19e) :</strong> Forte demande locative estudiantine et jeune active.
            Rentabilité brute légèrement supérieure à la moyenne parisienne (~3,5 %).
          </li>
          <li>
            <strong>Paris Ouest (7e, 8e, 16e) :</strong> Marché résilient, peu de correction, acheteurs
            patrimoniaux. Louer y est clairement plus rationnel à court terme.
          </li>
          <li>
            <strong>Grand Paris (Saint-Denis, Montreuil, Vincennes) :</strong> Les lignes 15 et 16 du Grand
            Paris Express valorisent ces secteurs. Prix encore abordables, dynamique positive.
          </li>
        </ul>

        <h2>Perspective investissement locatif à Paris</h2>
        <p>
          Avec une rentabilité brute de 3 à 3,5 %, Paris n'est pas une ville de rendement pur. L'attrait
          pour les investisseurs tient à la sécurité patrimoniale et à la liquidité du marché : revendre un
          bien parisien reste bien plus facile que dans une ville moyenne. L'encadrement des loyers,
          effectif depuis 2021 et renforcé en 2025, plafonne les nouveaux baux. Cela limite la hausse des
          revenus locatifs mais sécurise aussi le rendement contre une surchauffe.
        </p>
        <p>
          La location meublée (LMNP) reste une option fiscalement attractive à Paris, notamment pour les
          petites surfaces (studios, T1) très demandées par les étudiants des grandes écoles. Le régime
          réel permet d'amortir le bien et de réduire significativement la fiscalité sur les loyers.
        </p>

        <h2>FAQ — Louer ou acheter à Paris</h2>
        <p>
          <strong>Quel apport faut-il pour acheter à Paris ?</strong> Pour un T2 à 9 500 €/m², comptez
          minimum 20 % d'apport (soit ~85 000 € pour 45 m²) plus les frais de notaire (~8 %). En pratique,
          un apport de 100 000 € est confortable.
        </p>
        <p>
          <strong>Les prix vont-ils encore baisser à Paris ?</strong> La plupart des experts anticipent
          une stabilisation en 2026–2027, avec une légère reprise si les taux continuent de refluer.
          Une correction supplémentaire est possible dans les arrondissements les plus chers, mais peu
          probable dans l'Est parisien.
        </p>
        <p>
          <strong>Vaut-il mieux acheter hors de Paris et louer en ville ?</strong> C'est une stratégie
          valide : acheter en banlieue proche (Montreuil, Ivry, Saint-Ouen) tout en louant dans Paris
          intra-muros peut combiner les avantages des deux options. Notre simulateur vous permet de
          comparer ces scénarios facilement.
        </p>
      </>
    ),
  },

  lyon: {
    slug: "lyon",
    nom: "Lyon",
    region: "Auvergne-Rhône-Alpes",
    prix_m2: 4800,
    loyer_t2: 820,
    rentabilite_annees: 18,
    tension: "Forte",
    seoTitle: "Louer ou acheter à Lyon en 2026 : analyse et simulateur",
    seoDesc:
      "Louer ou acheter à Lyon en 2026 ? Prix moyen 5 100 €/m², loyer T2 à 1 000 €/mois, point d'équilibre à 13 ans. Simulation gratuite en 2 min.",
    Content: () => (
      <>
        <h2>Le marché immobilier lyonnais en 2026</h2>
        <p>
          Lyon s'est imposée comme la deuxième métropole française la plus dynamique après Paris. Après une
          hausse continue jusqu'en 2022, les prix ont subi une correction de 8 à 10 % et se stabilisent
          autour de <strong>4 500 à 5 500 €/m²</strong> selon les arrondissements. La Presqu'île et le 6e
          restent au-dessus de 6 000 €/m², tandis que les 8e et 9e arrondissements offrent des opportunités
          sous les 4 500 €/m².
        </p>
        <p>
          L'économie lyonnaise, portée par la pharmacie, la tech et les sièges sociaux, attire
          régulièrement des cadres et des familles en mobilité professionnelle. La demande locative est
          soutenue toute l'année, avec un taux de vacance inférieur à 3 %. Lyon Confluence et la Part-Dieu
          concentrent les nouvelles livraisons de logements neufs.
        </p>

        <h2>Analyse financière : louer ou acheter à Lyon</h2>
        <p>
          Pour un T2 de 45 m² à 4 800 €/m², soit <strong>216 000 €</strong>, avec un apport de 20 % et
          un crédit sur 20 ans à 3,8 %, voici le tableau de bord.
        </p>

        <div className="key-figures">
          <div className="key-figure">
            <span className="kf-value">1 095 €</span>
            <span className="kf-label">Coût mensuel achat</span>
          </div>
          <div className="key-figure">
            <span className="kf-value">820 €</span>
            <span className="kf-label">Loyer T2 moyen</span>
          </div>
          <div className="key-figure">
            <span className="kf-value">18 ans</span>
            <span className="kf-label">Point d'équilibre</span>
          </div>
          <div className="key-figure">
            <span className="kf-value">43 200 €</span>
            <span className="kf-label">Apport nécessaire</span>
          </div>
        </div>

        <div className="compare-table-wrap">
          <table className="compare-table">
            <thead>
              <tr>
                <th>Poste</th>
                <th>Achat</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Mensualité / loyer</td>
                <td>905 €/mois</td>
                <td>820 €/mois</td>
              </tr>
              <tr>
                <td>Charges annexes</td>
                <td>~190 €/mois</td>
                <td>~60 €/mois</td>
              </tr>
              <tr>
                <td>Frais de notaire</td>
                <td>~17 300 € (8 %)</td>
                <td>—</td>
              </tr>
              <tr>
                <td>Total mensuel all-in</td>
                <td>~1 095 €</td>
                <td>~880 €</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          L'écart mensuel de 215 € est relativement modéré par rapport à Paris. À Lyon, l'achat devient
          rationnel dès que l'on envisage une durée de détention de <strong>18 ans ou plus</strong>. Pour
          les profils qui comptent rester dans la métropole à long terme, c'est une décision défendable
          financièrement.
        </p>

        <div className="callout callout-tip">
          <span className="callout-icon">💡</span>
          <div className="callout-body">
            <strong>Lyon est l'une des rares grandes villes françaises où l'achat à 18 ans est
            atteignable</strong> — contre 28 ans à Paris ou 19 ans à Nice. Si vous êtes stable
            professionnellement dans la région, l'achat mérite sérieusement d'être envisagé.
          </div>
        </div>

        <h2>Les quartiers lyonnais à connaître</h2>
        <ul>
          <li>
            <strong>Presqu'île (1er, 2e) :</strong> Le cœur historique, très recherché, prix élevés.
            Idéal pour un investissement patrimonial, pas pour un rendement locatif.
          </li>
          <li>
            <strong>La Guillotière / Garibaldi (3e, 7e) :</strong> En pleine mutation, prix encore
            accessibles (~4 200 €/m²), forte demande étudiante. Bon rapport rendement/valorisation.
          </li>
          <li>
            <strong>Lyon Confluence (2e sud) :</strong> Quartier neuf, bien desservi, attractif pour les
            jeunes cadres. Les programmes neufs bénéficient de garanties et de meilleures performances
            énergétiques (DPE A/B).
          </li>
          <li>
            <strong>Villeurbanne :</strong> Juste hors Lyon mais desservi par le métro. Prix 10 à 15 %
            moins chers, rentabilité brute de 4 à 4,5 %. Très prisé des investisseurs.
          </li>
        </ul>

        <h2>Investissement locatif à Lyon</h2>
        <p>
          La rentabilité brute tourne autour de <strong>4 à 4,5 %</strong> sur les secteurs étudiants
          (Guillotière, Jean-Macé, Villeurbanne). Lyon n'est pas soumise à l'encadrement des loyers,
          contrairement à Paris, ce qui laisse plus de liberté sur la fixation des loyers lors des
          relocations. Les studios et T1 proches des universités (Lyon 2, Lyon 3, INSA) sont les produits
          les plus recherchés et les plus faciles à relouer.
        </p>

        <h2>FAQ — Louer ou acheter à Lyon</h2>
        <p>
          <strong>Lyon est-elle encore abordable pour un primo-accédant ?</strong> Avec un T2 à environ
          216 000 € et un apport de 43 000 €, c'est accessible pour un couple avec deux revenus moyens.
          Les taux d'effort restent dans les clous si les revenus combinés dépassent 4 500 €/mois.
        </p>
        <p>
          <strong>Les prix vont-ils remonter à Lyon ?</strong> Avec la dynamique économique de la
          métropole et les projets d'infrastructures (extension du métro, ZAC Gerland), une reprise
          progressive est anticipée d'ici 2027–2028. Acheter en 2026 peut donc être une fenêtre de tir.
        </p>
        <p>
          <strong>Quels arrondissements éviter ?</strong> Certaines zones du 9e (Vaise nord) et du 5e
          (Champvert) restent moins liquides. Préférez les secteurs bien desservis par le métro ou le
          tramway.
        </p>
      </>
    ),
  },

  marseille: {
    slug: "marseille",
    nom: "Marseille",
    region: "Provence-Alpes-Côte d'Azur",
    prix_m2: 3200,
    loyer_t2: 680,
    rentabilite_annees: 14,
    tension: "Modérée",
    seoTitle: "Louer ou acheter à Marseille en 2026 : analyse et simulateur",
    seoDesc:
      "Louer ou acheter à Marseille en 2026 ? Prix moyen 3 200 €/m², loyer T2 à 680 €/mois, point d'équilibre à 11 ans. Simulation gratuite en 2 min.",
    Content: () => (
      <>
        <h2>Le marché immobilier marseillais en 2026</h2>
        <p>
          Marseille affiche l'un des prix au mètre carré les plus bas parmi les grandes métropoles
          françaises : <strong>3 200 €/m² en moyenne</strong>, avec de fortes disparités entre les
          quartiers nord (parfois sous 2 000 €/m²) et les secteurs prisés comme le Vieux-Port, les
          Goudes ou le 8e arrondissement (5 000 à 7 000 €/m²). Cette hétérogénéité est une
          caractéristique structurelle du marché marseillais.
        </p>
        <p>
          Après plusieurs années de stagnation, Marseille connaît depuis 2021 une accélération portée
          par l'afflux de télétravailleurs parisiens et lillois, séduits par le cadre de vie
          méditerranéen et des prix bien inférieurs. En 2026, ce mouvement se consolide, notamment
          dans les quartiers sud et sur la Corniche.
        </p>

        <h2>Louer ou acheter à Marseille : le calcul</h2>
        <p>
          Pour un T2 de 45 m² à 3 200 €/m², soit <strong>144 000 €</strong>, l'équation est nettement
          plus favorable à l'achat qu'à Paris ou Lyon.
        </p>

        <div className="key-figures">
          <div className="key-figure">
            <span className="kf-value">750 €</span>
            <span className="kf-label">Coût mensuel achat</span>
          </div>
          <div className="key-figure">
            <span className="kf-value">680 €</span>
            <span className="kf-label">Loyer T2 moyen</span>
          </div>
          <div className="key-figure">
            <span className="kf-value">14 ans</span>
            <span className="kf-label">Point d'équilibre</span>
          </div>
          <div className="key-figure">
            <span className="kf-value">28 800 €</span>
            <span className="kf-label">Apport nécessaire</span>
          </div>
        </div>

        <div className="compare-table-wrap">
          <table className="compare-table">
            <thead>
              <tr>
                <th>Poste</th>
                <th>Achat</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Mensualité / loyer</td>
                <td>600 €/mois</td>
                <td>680 €/mois</td>
              </tr>
              <tr>
                <td>Charges annexes</td>
                <td>~150 €/mois</td>
                <td>~60 €/mois</td>
              </tr>
              <tr>
                <td>Frais de notaire</td>
                <td>~11 500 €</td>
                <td>—</td>
              </tr>
              <tr>
                <td>Total mensuel all-in</td>
                <td>~750 €</td>
                <td>~740 €</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          À Marseille, l'achat et la location sont presque à parité mensuelle. Le point d'équilibre est
          atteint dès <strong>14 ans</strong>, ce qui en fait l'une des villes françaises les plus
          favorables à l'accession à la propriété parmi les grandes métropoles.
        </p>

        <div className="callout callout-tip">
          <span className="callout-icon">💡</span>
          <div className="callout-body">
            <strong>Marseille est atypique :</strong> c'est l'une des rares métropoles où la mensualité
            d'un crédit peut être inférieure au loyer équivalent. Cela s'explique par des prix bas et
            des loyers relativement soutenus par la forte demande locative dans les secteurs recherchés.
          </div>
        </div>

        <h2>Les quartiers marseillais à privilégier</h2>
        <ul>
          <li>
            <strong>Vieux-Port / Endoume / Corniche (7e) :</strong> Les secteurs les plus valorisés,
            avec une clientèle nationale et internationale. Forte valorisation attendue.
          </li>
          <li>
            <strong>Castellane / Périer (8e) :</strong> Quartier résidentiel prisé des familles.
            Prix élevés pour Marseille (~4 500 €/m²) mais très liquide.
          </li>
          <li>
            <strong>Cours Julien / Noailles (1er, 6e) :</strong> Secteur branché en pleine
            gentrification. Bons rendements locatifs (5 à 6 %) et valorisation dynamique.
          </li>
          <li>
            <strong>L'Estaque / Nord (15e, 16e) :</strong> Prix très bas mais liquidité faible.
            Réservé aux investisseurs avec un horizon long et une bonne connaissance du secteur.
          </li>
        </ul>

        <h2>Investissement locatif à Marseille</h2>
        <p>
          Avec des rendements bruts de <strong>5 à 7 %</strong> dans les quartiers centre et nord,
          Marseille est une des villes françaises les plus attractives pour l'investissement locatif
          pur. La vigilance s'impose cependant sur la qualité des copropriétés : nombreuses
          résidences des années 1960–1970 présentent des charges élevées et des travaux en suspens.
          Faire réaliser un audit de copropriété avant achat est indispensable.
        </p>

        <h2>FAQ — Louer ou acheter à Marseille</h2>
        <p>
          <strong>Marseille est-elle une ville sûre pour investir ?</strong> La reputation hétérogène
          de certains quartiers nécessite d'être sélectif. Les arrondissements 6, 7, 8, 9 et 13 offrent
          la meilleure sécurité d'investissement. Les quartiers nord sont risqués pour un investisseur
          non local.
        </p>
        <p>
          <strong>Les prix vont-ils continuer à monter ?</strong> Le rattrapage de Marseille par rapport
          aux autres grandes villes françaises semble avoir encore du potentiel, en particulier sur les
          secteurs bien desservis par le métro et à proximité de la mer.
        </p>
        <p>
          <strong>Quels sont les frais de notaire à Marseille ?</strong> Identiques au reste de la
          France : environ 7,5 à 8 % dans l'ancien. Sur un bien à 144 000 €, comptez environ 11 000 €.
        </p>
      </>
    ),
  },

  bordeaux: {
    slug: "bordeaux",
    nom: "Bordeaux",
    region: "Nouvelle-Aquitaine",
    prix_m2: 4200,
    loyer_t2: 780,
    rentabilite_annees: 17,
    tension: "Forte",
    seoTitle: "Louer ou acheter à Bordeaux en 2026 : analyse et simulateur",
    seoDesc:
      "Louer ou acheter à Bordeaux en 2026 ? Prix moyen 4 200 €/m², loyer T2 à 900 €/mois, point d'équilibre à 11 ans. Simulation gratuite en 2 min.",
    Content: () => (
      <>
        <h2>Le marché immobilier bordelais en 2026</h2>
        <p>
          Bordeaux a connu l'une des plus fortes hausses de prix de France entre 2015 et 2022, dopée
          par l'arrivée de la LGV Paris-Bordeaux (2h04 depuis Paris), l'attrait du cadre de vie
          atlantique et l'afflux de télétravailleurs. Après une correction sensible en 2023–2025
          (–12 % environ), les prix se stabilisent autour de <strong>4 000 à 4 800 €/m²</strong> selon
          les secteurs. L'hypercentre (Chartrons, Saint-Michel, Triangle d'Or) résiste mieux que
          la périphérie.
        </p>
        <p>
          La demande locative reste très soutenue, portée par une population étudiante importante
          (Université de Bordeaux, Sciences Po, INP) et des cadres en mobilité. Le marché est
          néanmoins plus équilibré qu'à Lyon ou Paris, avec un délai de location moyen de 15 jours
          pour un T2 bien situé.
        </p>

        <h2>Analyse financière : louer ou acheter à Bordeaux</h2>
        <p>
          Pour un T2 de 45 m² à 4 200 €/m², soit <strong>189 000 €</strong>, avec 20 % d'apport
          et un crédit sur 20 ans à 3,8 %.
        </p>

        <div className="key-figures">
          <div className="key-figure">
            <span className="kf-value">985 €</span>
            <span className="kf-label">Coût mensuel achat</span>
          </div>
          <div className="key-figure">
            <span className="kf-value">780 €</span>
            <span className="kf-label">Loyer T2 moyen</span>
          </div>
          <div className="key-figure">
            <span className="kf-value">17 ans</span>
            <span className="kf-label">Point d'équilibre</span>
          </div>
          <div className="key-figure">
            <span className="kf-value">37 800 €</span>
            <span className="kf-label">Apport nécessaire</span>
          </div>
        </div>

        <div className="compare-table-wrap">
          <table className="compare-table">
            <thead>
              <tr>
                <th>Poste</th>
                <th>Achat</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Mensualité / loyer</td>
                <td>793 €/mois</td>
                <td>780 €/mois</td>
              </tr>
              <tr>
                <td>Charges annexes</td>
                <td>~192 €/mois</td>
                <td>~60 €/mois</td>
              </tr>
              <tr>
                <td>Frais de notaire</td>
                <td>~15 100 €</td>
                <td>—</td>
              </tr>
              <tr>
                <td>Total mensuel all-in</td>
                <td>~985 €</td>
                <td>~840 €</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="callout callout-tip">
          <span className="callout-icon">💡</span>
          <div className="callout-body">
            <strong>La mensualité de crédit à Bordeaux est quasi-identique au loyer.</strong> L'écart
            vient essentiellement des charges de propriété (taxe foncière, copropriété, assurance PNO).
            Si vous comptez rester plus de 17 ans, l'achat est clairement préférable.
          </div>
        </div>

        <h2>Les quartiers bordelais à surveiller</h2>
        <ul>
          <li>
            <strong>Chartrons / Bacalan :</strong> Quartier bobo très tendance, prix ~4 500–5 000 €/m².
            Forte demande locative, valorisation continue mais acquisition plus chère.
          </li>
          <li>
            <strong>Saint-Michel / Victoire :</strong> Secteur étudiant et vivant, bon rapport
            qualité/prix (~3 800–4 200 €/m²). Rendements locatifs corrects (4,5 %).
          </li>
          <li>
            <strong>Bastide (rive droite) :</strong> La rive droite de la Garonne est en pleine
            transformation. Prix encore inférieurs de 15 % à la rive gauche pour des prestations
            équivalentes. Potentiel de valorisation intéressant.
          </li>
          <li>
            <strong>Mérignac / Pessac :</strong> Communes de la métropole bien reliées par le tram.
            Idéales pour un premier achat avec budget limité (~3 000–3 500 €/m²).
          </li>
        </ul>

        <h2>Investissement locatif à Bordeaux</h2>
        <p>
          Bordeaux offre des rendements bruts de <strong>4 à 5 %</strong> sur les secteurs étudiants
          et de transit. La ville n'est pas soumise à l'encadrement des loyers. Les colocations dans
          les T3/T4 près des universités affichent parfois des rendements de 6 à 7 % brut. Attention
          aux biens avec façade classée en secteur sauvegardé : les travaux extérieurs requièrent
          des autorisations spéciales et peuvent alourdir les coûts.
        </p>

        <h2>FAQ — Louer ou acheter à Bordeaux</h2>
        <p>
          <strong>Bordeaux est-elle encore une bonne ville pour investir ?</strong> Après la
          surchauffe, le marché est revenu à des niveaux plus raisonnables. En 2026, c'est une
          métropole solide pour un investissement à long terme, sans espoir de plus-value rapide
          mais avec une rentabilité locative correcte.
        </p>
        <p>
          <strong>Quid de la LGV et de son impact sur les prix ?</strong> La LGV a déjà été intégrée
          dans les prix. Le prochain catalyseur pourrait être l'extension vers Toulouse (horizon 2033),
          qui bénéficierait surtout aux villes intermédiaires entre les deux métropoles.
        </p>
        <p>
          <strong>Y a-t-il des aides locales pour acheter à Bordeaux ?</strong> La Métropole de
          Bordeaux propose un Pass Primo pour les primo-accédants sous conditions de ressources.
          Renseignez-vous auprès de Bordeaux Métropole Habitat.
        </p>
      </>
    ),
  },

  toulouse: {
    slug: "toulouse",
    nom: "Toulouse",
    region: "Occitanie",
    prix_m2: 3600,
    loyer_t2: 720,
    rentabilite_annees: 15,
    tension: "Forte",
    seoTitle: "Louer ou acheter à Toulouse en 2026 : analyse et simulateur",
    seoDesc:
      "Louer ou acheter à Toulouse en 2026 ? Prix moyen 3 600 €/m², loyer T2 à 790 €/mois, point d'équilibre à 9 ans. Simulation gratuite en 2 min.",
    Content: () => (
      <>
        <h2>Le marché immobilier toulousain en 2026</h2>
        <p>
          Toulouse, surnommée la « ville rose », est l'une des métropoles françaises à la croissance
          démographique la plus soutenue : +15 000 habitants par an en moyenne. Ce dynamisme tire les
          prix vers le haut depuis une décennie, même si la correction de 2023–2025 a ramené les
          valorisations à des niveaux plus raisonnables. En 2026, le prix moyen tourne autour de{" "}
          <strong>3 600 €/m²</strong>, avec des pointes à 5 000 €/m² dans les Carmes et le Capitole.
        </p>
        <p>
          L'économie toulousaine repose sur l'aéronautique et le spatial (Airbus, Thales, CNES), la
          santé (CHU Purpan, Oncopole) et un tissu universitaire exceptionnel (140 000 étudiants).
          Ces moteurs garantissent une demande locative structurellement forte, notamment pour les
          T1 et T2.
        </p>

        <h2>Louer ou acheter à Toulouse : analyse chiffrée</h2>

        <div className="key-figures">
          <div className="key-figure">
            <span className="kf-value">870 €</span>
            <span className="kf-label">Coût mensuel achat</span>
          </div>
          <div className="key-figure">
            <span className="kf-value">720 €</span>
            <span className="kf-label">Loyer T2 moyen</span>
          </div>
          <div className="key-figure">
            <span className="kf-value">15 ans</span>
            <span className="kf-label">Point d'équilibre</span>
          </div>
          <div className="key-figure">
            <span className="kf-value">32 400 €</span>
            <span className="kf-label">Apport nécessaire</span>
          </div>
        </div>

        <p>
          Sur un T2 de 45 m² à 162 000 €, la mensualité de crédit (20 ans, 3,8 %) est d'environ
          795 €, soit plus que le loyer médian (720 €). Mais en intégrant les charges de propriété,
          l'écart s'efface relativement vite. Le point d'équilibre est atteint à{" "}
          <strong>15 ans</strong>, ce qui est raisonnable pour une ville de cette taille.
        </p>

        <div className="callout callout-tip">
          <span className="callout-icon">💡</span>
          <div className="callout-body">
            <strong>Toulouse est une ville de projet :</strong> si vous êtes salarié chez Airbus ou
            dans un grand groupe aéronautique, l'achat fait sens dès le premier poste stable. Les
            mutations sectorielles sont fréquentes mais souvent locales (sous-traitants dans la même
            métropole).
          </div>
        </div>

        <h2>Les quartiers toulousains à connaître</h2>
        <ul>
          <li>
            <strong>Carmes / Capitole :</strong> Le centre historique, le plus cher
            (~4 500–5 000 €/m²). Très recherché pour la location courte durée et les colocations.
          </li>
          <li>
            <strong>Saint-Cyprien (rive gauche) :</strong> Quartier en pleine mutation, attractif et
            abordable (~3 200–3 800 €/m²). Bonne dynamique locative étudiante.
          </li>
          <li>
            <strong>Rangueil / Lespinet :</strong> Proximité des facs de sciences et de médecine.
            Fort taux de rotation locative, rendements intéressants (~4,5 %).
          </li>
          <li>
            <strong>Colomiers / Blagnac :</strong> Communes proches d'Airbus, fortement demandées
            par les cadres de l'aéronautique. Prix raisonnables, marché stable.
          </li>
        </ul>

        <h2>Investissement locatif à Toulouse</h2>
        <p>
          Toulouse est une excellente ville pour l'investissement locatif grâce à son marché étudiant
          colossal. Les petites surfaces (T1 entre 80 000 et 110 000 €) affichent des rendements bruts
          de <strong>5 à 6,5 %</strong>. La location meublée est très répandue, avec une forte demande
          de la part des étudiants en école d'ingénieurs et de commerce (INP, EM Toulouse). La gestion
          locative est relativement simple grâce à une forte concurrence entre agences qui maintient
          les frais de gestion bas.
        </p>
        <p>
          Le Grand Toulouse prévoit d'importantes extensions de la ligne B du métro et de nouveaux
          trams. Les quartiers desservis par ces futures lignes (Labège, Balma) pourraient voir leur
          valeur augmenter de 10 à 15 % sur 5 ans.
        </p>

        <h2>FAQ — Louer ou acheter à Toulouse</h2>
        <p>
          <strong>Les prix vont-ils baisser davantage à Toulouse ?</strong> Peu probable : la
          démographie et l'emploi soutiennent les prix. Une légère consolidation est possible à court
          terme, mais pas de correction majeure.
        </p>
        <p>
          <strong>Toulouse est-elle bien desservie pour les transports ?</strong> Le réseau de métro
          (lignes A et B) est efficace. L'extension vers l'aéroport de Blagnac (ligne A) est attendue
          pour 2028, ce qui devrait valoriser les secteurs traversés.
        </p>
        <p>
          <strong>Vaut-il mieux acheter neuf ou ancien à Toulouse ?</strong> L'ancien offre un meilleur
          rendement locatif brut, mais le neuf (zones ZAN restreintes) bénéficie de charges de
          copropriété plus basses et d'une meilleure performance énergétique, argument de plus en plus
          décisif pour les locataires.
        </p>
      </>
    ),
  },

  nantes: {
    slug: "nantes",
    nom: "Nantes",
    region: "Pays de la Loire",
    prix_m2: 3800,
    loyer_t2: 740,
    rentabilite_annees: 16,
    tension: "Forte",
    seoTitle: "Louer ou acheter à Nantes en 2026 : analyse et simulateur",
    seoDesc:
      "Louer ou acheter à Nantes en 2026 ? Prix moyen 3 800 €/m², loyer T2 à 820 €/mois, point d'équilibre à 9 ans. Simulation gratuite en 2 min.",
    Content: () => (
      <>
        <h2>Le marché immobilier nantais en 2026</h2>
        <p>
          Nantes a longtemps été citée comme la ville française offrant le meilleur cadre de vie.
          Cette réputation a alimenté une hausse des prix spectaculaire entre 2016 et 2022 (+45 %),
          avant une correction de 10 % environ entre 2023 et 2025. En 2026, les prix se stabilisent
          autour de <strong>3 800 €/m²</strong> en moyenne, avec des écarts marqués entre l'île de
          Nantes (4 500 €/m²) et les quartiers nord comme Bellevue ou Nantes Nord (2 800 €/m²).
        </p>
        <p>
          Nantes bénéficie d'une économie diversifiée (agroalimentaire, numérique, naval, santé) et
          d'une population jeune en forte croissance. L'université et les grandes écoles (Centrale
          Nantes, Audencia, École des Mines) alimentent une demande locative structurellement forte
          sur les T1 et T2.
        </p>

        <h2>Louer ou acheter à Nantes : les chiffres</h2>

        <div className="key-figures">
          <div className="key-figure">
            <span className="kf-value">920 €</span>
            <span className="kf-label">Coût mensuel achat</span>
          </div>
          <div className="key-figure">
            <span className="kf-value">740 €</span>
            <span className="kf-label">Loyer T2 moyen</span>
          </div>
          <div className="key-figure">
            <span className="kf-value">16 ans</span>
            <span className="kf-label">Point d'équilibre</span>
          </div>
          <div className="key-figure">
            <span className="kf-value">34 200 €</span>
            <span className="kf-label">Apport nécessaire</span>
          </div>
        </div>

        <div className="compare-table-wrap">
          <table className="compare-table">
            <thead>
              <tr>
                <th>Poste</th>
                <th>Achat</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Mensualité / loyer</td>
                <td>759 €/mois</td>
                <td>740 €/mois</td>
              </tr>
              <tr>
                <td>Charges annexes</td>
                <td>~161 €/mois</td>
                <td>~60 €/mois</td>
              </tr>
              <tr>
                <td>Frais de notaire</td>
                <td>~13 680 €</td>
                <td>—</td>
              </tr>
              <tr>
                <td>Total mensuel all-in</td>
                <td>~920 €</td>
                <td>~800 €</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          Comme à Bordeaux et Toulouse, la mensualité de crédit est très proche du loyer à Nantes.
          L'écart total all-in est de 120 €/mois, ce qui implique un point d'équilibre à
          <strong>16 ans</strong>. C'est un horizon réaliste pour une famille stable dans la région.
        </p>

        <div className="callout callout-tip">
          <span className="callout-icon">💡</span>
          <div className="callout-body">
            <strong>Nantes est une ville à forte mobilité :</strong> beaucoup de cadres y restent 5 à
            10 ans avant une mutation. Dans ce cas, la location reste préférable, sauf si vous achetez
            un bien avec une forte valeur locative pour le garder en investissement au départ.
          </div>
        </div>

        <h2>Les quartiers nantais à privilégier</h2>
        <ul>
          <li>
            <strong>Île de Nantes :</strong> Le quartier de transformation urbaine de Nantes. Neuf,
            bien desservi par le tram, attractif pour les jeunes actifs. Prix élevés mais forte
            liquidité.
          </li>
          <li>
            <strong>Bouffay / Decré :</strong> Hypercentre historique, forte demande locative,
            prix proches de 4 500 €/m². Idéal pour la location meublée ou la colocation.
          </li>
          <li>
            <strong>Doulon / Bottière :</strong> Quartier est en développement, prix encore sous la
            moyenne (~3 200 €/m²). Bonne desserte tram, profil idéal pour primo-accédants.
          </li>
          <li>
            <strong>Saint-Herblain / Rezé :</strong> Communes de la première couronne, accessibles
            en tramway. Prix 15 à 20 % inférieurs à Nantes intra-muros, idéales pour investissement
            locatif.
          </li>
        </ul>

        <h2>Investissement locatif à Nantes</h2>
        <p>
          La rentabilité brute se situe entre <strong>4 et 5 %</strong> sur les secteurs bien
          desservis. Les T1 meublés près des universités (Faculté des lettres, Polytech) tournent
          autour de 5,5 % brut. Le dispositif Denormandie (rénovation dans l'ancien) peut être
          intéressant sur certains quartiers éligibles, offrant une réduction d'impôt de 12 à 21 %
          selon la durée d'engagement.
        </p>

        <h2>FAQ — Louer ou acheter à Nantes</h2>
        <p>
          <strong>Nantes est-elle encore en croissance démographique ?</strong> Oui, Nantes reste
          l'une des métropoles françaises les plus attractives. Les projections tablent sur 700 000
          habitants dans la métropole d'ici 2030.
        </p>
        <p>
          <strong>Le marché nantais est-il liquide ?</strong> Oui, surtout dans l'hypercentre et
          l'Île de Nantes. Les délais de vente restent inférieurs à 60 jours pour les biens
          correctement estimés.
        </p>
        <p>
          <strong>Faut-il craindre les inondations à Nantes ?</strong> Certaines zones proches de la
          Loire et de l'Erdre sont en zone inondable. Vérifiez le PPRi (Plan de Prévention du
          Risque inondation) avant tout achat, notamment sur l'Île de Nantes et à Rezé.
        </p>
      </>
    ),
  },

  lille: {
    slug: "lille",
    nom: "Lille",
    region: "Hauts-de-France",
    prix_m2: 3000,
    loyer_t2: 680,
    rentabilite_annees: 13,
    tension: "Modérée",
    seoTitle: "Louer ou acheter à Lille en 2026 : analyse et simulateur",
    seoDesc:
      "Louer ou acheter à Lille en 2026 ? Prix moyen 3 200 €/m², loyer T2 à 700 €/mois, point d'équilibre à 8 ans. Simulation gratuite en 2 min.",
    Content: () => (
      <>
        <h2>Le marché immobilier lillois en 2026</h2>
        <p>
          Lille occupe une position géographique unique en Europe : à 1h de Paris (TGV), 35 minutes
          de Bruxelles et 1h20 de Londres. Cette centralité fait de la métropole lilloise un hub
          stratégique pour les cadres internationaux et les entreprises européennes. En 2026, le prix
          moyen s'établit à <strong>3 000 €/m²</strong>, avec des pointes à 4 500 €/m² dans le Vieux-
          Lille et des prix sous 2 500 €/m² dans Roubaix et Tourcoing.
        </p>
        <p>
          Lille compte près de 115 000 étudiants, ce qui en fait l'une des plus grandes villes
          universitaires de France. Cette population garantit une demande locative permanente pour
          les petites surfaces. La tension locative est qualifiée de modérée : les délais de location
          sont corrects mais le marché n'est pas aussi tendu que Paris ou Lyon.
        </p>

        <h2>Louer ou acheter à Lille : ce que disent les chiffres</h2>

        <div className="key-figures">
          <div className="key-figure">
            <span className="kf-value">760 €</span>
            <span className="kf-label">Coût mensuel achat</span>
          </div>
          <div className="key-figure">
            <span className="kf-value">680 €</span>
            <span className="kf-label">Loyer T2 moyen</span>
          </div>
          <div className="key-figure">
            <span className="kf-value">13 ans</span>
            <span className="kf-label">Point d'équilibre</span>
          </div>
          <div className="key-figure">
            <span className="kf-value">27 000 €</span>
            <span className="kf-label">Apport nécessaire</span>
          </div>
        </div>

        <p>
          Avec un point d'équilibre à <strong>13 ans</strong>, Lille est l'une des métropoles
          françaises les plus accessibles à l'accession. La mensualité de crédit pour un T2 de 45 m²
          à 135 000 € est d'environ 558 €/mois (20 ans, 3,8 %), soit bien en dessous du loyer médian.
          L'écart s'inverse en faveur de l'achat dès lors que l'on intègre les charges.
        </p>

        <div className="callout callout-tip">
          <span className="callout-icon">💡</span>
          <div className="callout-body">
            <strong>À Lille, acheter est moins cher que louer à mensualité équivalente</strong> — c'est
            l'une des rares grandes villes où la mensualité nette de crédit est inférieure au loyer
            de marché. Le principal frein reste l'apport initial et les frais de notaire.
          </div>
        </div>

        <h2>Les quartiers lillois à connaître</h2>
        <ul>
          <li>
            <strong>Vieux-Lille :</strong> Quartier patrimonial exceptionnel, immeubles flamands,
            prix premium (4 000–4 500 €/m²). Forte attractivité touristique et locative haut de
            gamme.
          </li>
          <li>
            <strong>Wazemmes / Moulins :</strong> Secteur populaire en pleine gentrification. Bons
            rendements (5 à 6 %), demande étudiante forte. Prix encore sous les 3 000 €/m².
          </li>
          <li>
            <strong>Euralille / Saint-Maurice :</strong> Quartier d'affaires en développement, bien
            desservi (TGV, métro). Attractif pour la location aux cadres en mobilité.
          </li>
          <li>
            <strong>Roubaix / Tourcoing :</strong> Prix très bas (1 500–2 500 €/m²), rendements bruts
            pouvant dépasser 8 %. Mais rotation locative plus élevée et gestion plus exigeante.
          </li>
        </ul>

        <h2>Investissement locatif à Lille</h2>
        <p>
          Lille est reconnue comme l'une des meilleures villes françaises pour l'investissement
          locatif étudiant. Les colocations dans les T3/T4 proches des universités (Lille 1 à
          Villeneuve-d'Ascq, Lille 2 et 3 en centre) affichent des rendements bruts de{" "}
          <strong>6 à 8 %</strong>. La ville de Roubaix, avec ses prix très bas et des programmes
          de rénovation urbaine actifs (NPNRU), attire de nombreux investisseurs en Denormandie.
        </p>

        <h2>FAQ — Louer ou acheter à Lille</h2>
        <p>
          <strong>Quel est le potentiel de valorisation à Lille ?</strong> Modéré mais régulier.
          Lille ne connaît pas les flambées de Lyon ou Bordeaux, mais la stabilité de la demande
          protège des corrections violentes. Une hausse de 2 à 3 % par an sur 10 ans est réaliste.
        </p>
        <p>
          <strong>Faut-il acheter à Lille ou dans la métropole ?</strong> Villeneuve-d'Ascq (campus
          universitaire) et Marcq-en-Barœul (résidentiel haut de gamme) sont des alternatives
          pertinentes. Roubaix est réservée aux investisseurs expérimentés.
        </p>
        <p>
          <strong>Le marché lillois est-il affecté par la désindustrialisation ?</strong> Moins
          qu'avant. L'économie lilloise s'est bien diversifiée (Euratechnologies, santé, commerce,
          logistique). Euralille est le premier centre commercial d'Europe du Nord, signe d'un
          bassin de consommation robuste.
        </p>
      </>
    ),
  },

  nice: {
    slug: "nice",
    nom: "Nice",
    region: "Provence-Alpes-Côte d'Azur",
    prix_m2: 5200,
    loyer_t2: 900,
    rentabilite_annees: 19,
    tension: "Forte",
    seoTitle: "Louer ou acheter à Nice en 2026 : analyse et simulateur",
    seoDesc:
      "Louer ou acheter à Nice en 2026 ? Prix moyen 5 200 €/m², loyer T2 à 1 050 €/mois, point d'équilibre à 19 ans. Simulation gratuite en 2 min.",
    Content: () => (
      <>
        <h2>Le marché immobilier niçois en 2026</h2>
        <p>
          Nice jouit d'un statut particulier dans l'immobilier français : c'est la cinquième ville
          de France, chef-lieu des Alpes-Maritimes, et l'un des marchés les plus internationalisés
          du pays. Les acheteurs étrangers (Italiens, Britanniques, Allemands, Américains) représentent
          une part significative des transactions dans les secteurs premium. En 2026, le prix moyen
          s'établit à <strong>5 200 €/m²</strong>, mais les écarts sont extrêmes : de 3 500 €/m²
          dans l'Ariane à plus de 12 000 €/m² sur la Promenade des Anglais et dans la Vieille-Ville.
        </p>
        <p>
          La demande locative est très soutenue, portée par le tourisme de longue durée, la population
          étudiante (Université Côte d'Azur, EDHEC) et les retraités aisés. La saisonnalité crée une
          tension particulière sur les loyers à l'année : de nombreux propriétaires préfèrent la
          location saisonnière, ce qui réduit l'offre de baux classiques et maintient les loyers
          annuels élevés.
        </p>

        <h2>Louer ou acheter à Nice : analyse financière</h2>

        <div className="key-figures">
          <div className="key-figure">
            <span className="kf-value">1 100 €</span>
            <span className="kf-label">Coût mensuel achat</span>
          </div>
          <div className="key-figure">
            <span className="kf-value">900 €</span>
            <span className="kf-label">Loyer T2 moyen</span>
          </div>
          <div className="key-figure">
            <span className="kf-value">19 ans</span>
            <span className="kf-label">Point d'équilibre</span>
          </div>
          <div className="key-figure">
            <span className="kf-value">46 800 €</span>
            <span className="kf-label">Apport nécessaire</span>
          </div>
        </div>

        <div className="compare-table-wrap">
          <table className="compare-table">
            <thead>
              <tr>
                <th>Poste</th>
                <th>Achat</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Mensualité / loyer</td>
                <td>919 €/mois</td>
                <td>900 €/mois</td>
              </tr>
              <tr>
                <td>Charges annexes</td>
                <td>~181 €/mois</td>
                <td>~70 €/mois</td>
              </tr>
              <tr>
                <td>Frais de notaire</td>
                <td>~18 700 €</td>
                <td>—</td>
              </tr>
              <tr>
                <td>Total mensuel all-in</td>
                <td>~1 100 €</td>
                <td>~970 €</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          À Nice, la mensualité de crédit est presque identique au loyer de marché. L'écart
          all-in de 130 €/mois est modéré. Le point d'équilibre à <strong>19 ans</strong> est
          atteignable pour un propriétaire qui s'installe durablement sur la Côte d'Azur.
        </p>

        <div className="callout callout-tip">
          <span className="callout-icon">💡</span>
          <div className="callout-body">
            <strong>Atout Nice :</strong> la demande internationale protège le marché niçois des
            corrections locales. En période de hausse de l'euro ou d'attrait touristique accru,
            les prix peuvent bondir rapidement, offrant de belles plus-values aux propriétaires
            de biens bien situés.
          </div>
        </div>

        <h2>Les quartiers niçois à surveiller</h2>
        <ul>
          <li>
            <strong>Promenade des Anglais / Vieille-Ville :</strong> Le must de Nice. Prix très élevés
            mais valeur refuge assurée. Forte part d'acheteurs internationaux.
          </li>
          <li>
            <strong>Libération / Riquier :</strong> Quartiers populaires en gentrification, prix encore
            abordables (~4 000–4 500 €/m²). Bonne dynamique locative étudiante.
          </li>
          <li>
            <strong>Nice Nord / l'Ariane :</strong> Secteurs populaires, prix bas (~3 000–3 500 €/m²).
            Rendements élevés mais gestion plus exigeante.
          </li>
          <li>
            <strong>Carras / Saint-Augustin :</strong> Secteur résidentiel calme, proche de l'aéroport.
            Apprécié des familles et des expatriés travaillant à l'international.
          </li>
        </ul>

        <h2>Investissement locatif à Nice</h2>
        <p>
          Nice offre deux types de stratégies locatives : la location à l'année (rendement 4 à 5 %
          brut) et la location saisonnière de type Airbnb (rendement potentiel de 8 à 12 % brut).
          La ville a cependant durci la réglementation sur les meublés touristiques en 2025 : une
          autorisation de changement d'usage est désormais requise dans de nombreux secteurs. Vérifiez
          la conformité avant d'acheter pour de la location saisonnière.
        </p>

        <h2>FAQ — Louer ou acheter à Nice</h2>
        <p>
          <strong>Nice est-elle une ville de retraite ou d'investissement ?</strong> Les deux. Le
          marché est mature et liquide. Les retraités constituent une part importante des acheteurs,
          mais les investisseurs locatifs sont aussi très présents, attirés par les rendements.
        </p>
        <p>
          <strong>Faut-il acheter en bord de mer à tout prix ?</strong> Non. Les biens en bord de
          mer sont surévalués en termes de rendement locatif. Le meilleur rapport
          qualité/prix/rendement se trouve dans un rayon de 500 m à 1 km du front de mer.
        </p>
        <p>
          <strong>L'encadrement des loyers s'applique-t-il à Nice ?</strong> Non, Nice n'est pas
          soumise à l'encadrement des loyers à date. Les bailleurs peuvent fixer librement les loyers
          lors des nouvelles locations.
        </p>
      </>
    ),
  },

  rennes: {
    slug: "rennes",
    nom: "Rennes",
    region: "Bretagne",
    prix_m2: 3400,
    loyer_t2: 720,
    rentabilite_annees: 14,
    tension: "Modérée",
    seoTitle: "Louer ou acheter à Rennes en 2026 : analyse et simulateur",
    seoDesc:
      "Louer ou acheter à Rennes en 2026 ? Prix moyen 3 800 €/m², loyer T2 à 820 €/mois, point d'équilibre à 9 ans. Simulation gratuite en 2 min.",
    Content: () => (
      <>
        <h2>Le marché immobilier rennais en 2026</h2>
        <p>
          Rennes est l'une des métropoles françaises dont le dynamisme est le plus sous-estimé. Capitale
          régionale de Bretagne, elle attire régulièrement des classements de qualité de vie et
          concentre un tissu économique solide : cybersécurité (Campus Cyber, Thales, Amossys),
          télécoms (Orange), agroalimentaire et santé. Sa population étudiante de 70 000 personnes
          représente près du quart de la population totale.
        </p>
        <p>
          Après une hausse de 30 % entre 2018 et 2022, les prix ont subi une correction de 8 % et
          se stabilisent en 2026 autour de <strong>3 400 €/m²</strong>. Le centre historique dépasse
          4 500 €/m², tandis que des quartiers comme Bréquigny ou la Poterie restent accessibles
          sous 3 000 €/m².
        </p>

        <h2>Louer ou acheter à Rennes : le bilan chiffré</h2>

        <div className="key-figures">
          <div className="key-figure">
            <span className="kf-value">840 €</span>
            <span className="kf-label">Coût mensuel achat</span>
          </div>
          <div className="key-figure">
            <span className="kf-value">720 €</span>
            <span className="kf-label">Loyer T2 moyen</span>
          </div>
          <div className="key-figure">
            <span className="kf-value">14 ans</span>
            <span className="kf-label">Point d'équilibre</span>
          </div>
          <div className="key-figure">
            <span className="kf-value">30 600 €</span>
            <span className="kf-label">Apport nécessaire</span>
          </div>
        </div>

        <p>
          Pour un T2 de 45 m² à 153 000 €, la mensualité de crédit est de 634 €/mois. Avec les
          charges, le coût mensuel de l'achat atteint 840 €, soit 120 € de plus que la location.
          Le point d'équilibre est atteint à <strong>14 ans</strong>, ce qui en fait l'une des
          villes les plus intéressantes pour un primo-accédant parmi les grandes métropoles régionales.
        </p>

        <div className="callout callout-tip">
          <span className="callout-icon">💡</span>
          <div className="callout-body">
            <strong>Rennes, ville LGV :</strong> depuis 2017, Paris est à 1h26 en TGV. Cela a
            dopé les prix mais aussi l'attractivité pour les cadres parisiens cherchant un meilleur
            cadre de vie. L'effet LGV n'est pas encore totalement intégré dans les prix des secteurs
            périphériques.
          </div>
        </div>

        <h2>Les quartiers rennais à suivre</h2>
        <ul>
          <li>
            <strong>Hyper-centre / Thabor :</strong> Le cœur historique et le quartier résidentiel
            le plus prisé. Prix 4 000–5 000 €/m², forte liquidité, idéal pour un achat patrimonial.
          </li>
          <li>
            <strong>Villejean :</strong> Quartier universitaire par excellence. Prix accessibles
            (~2 800–3 200 €/m²), fort taux de rotation locative. Bon rendement pour investisseur.
          </li>
          <li>
            <strong>EuroRennes / Gare :</strong> Le nouveau quartier d'affaires autour de la gare
            TGV. Programmes neufs, loyers premium, attractif pour les cadres en déplacement.
          </li>
          <li>
            <strong>Cesson-Sévigné :</strong> Commune de la métropole abritant le Technopark et
            les sièges de grandes entreprises tech. Prix raisonnables (~3 000–3 500 €/m²), demande
            locative cadre stable.
          </li>
        </ul>

        <h2>Investissement locatif à Rennes</h2>
        <p>
          Rennes est une ville de taille idéale pour l'investissement locatif : assez grande pour
          avoir une demande solide, assez petite pour que les prix d'achat restent raisonnables.
          Les rendements bruts se situent entre <strong>4,5 et 6 %</strong> selon les secteurs.
          Les colocations dans les T4 proches des campus (Villejean, Beaulieu) peuvent atteindre
          7 à 8 % brut. La ville étudie l'introduction de l'encadrement des loyers : à surveiller.
        </p>

        <h2>FAQ — Louer ou acheter à Rennes</h2>
        <p>
          <strong>Rennes est-elle une bonne ville pour s'installer sur le long terme ?</strong>
          Oui. La qualité de vie, l'emploi et les infrastructures en font une métropole régionale
          de premier plan. Le coût de la vie y est nettement inférieur à Paris pour un niveau
          de service équivalent.
        </p>
        <p>
          <strong>Le marché rennais est-il liquide ?</strong> Relativement. Les biens bien situés
          et correctement estimés se vendent en moins de 45 jours. Les prix ont baissé de façon
          modérée, ce qui a amélioré la liquidité par rapport à 2022–2023.
        </p>
        <p>
          <strong>Y a-t-il des risques liés à la dépendance universitaire ?</strong> La population
          étudiante est un atout majeur mais crée aussi une saisonnalité locative (départs en juin,
          afflux en septembre). Cela peut générer quelques semaines de vacance chaque année,
          à prévoir dans le calcul de rendement.
        </p>
      </>
    ),
  },

  strasbourg: {
    slug: "strasbourg",
    nom: "Strasbourg",
    region: "Grand Est",
    prix_m2: 3100,
    loyer_t2: 700,
    rentabilite_annees: 13,
    tension: "Modérée",
    seoTitle: "Louer ou acheter à Strasbourg en 2026 : analyse et simulateur",
    seoDesc:
      "Louer ou acheter à Strasbourg en 2026 ? Prix moyen 3 100 €/m², loyer T2 à 730 €/mois, point d'équilibre à 13 ans. Simulation gratuite en 2 min.",
    Content: () => (
      <>
        <h2>Le marché immobilier strasbourgeois en 2026</h2>
        <p>
          Strasbourg occupe une position singulière en France : capitale de l'Alsace, siège du
          Parlement européen et du Conseil de l'Europe, et ville frontalière avec l'Allemagne
          (Kehl est à quelques minutes en tramway). Ces caractéristiques attirent une population
          internationale diversifiée — fonctionnaires européens, étudiants Erasmus, cadres
          transfrontaliers — qui soutient structurellement la demande locative.
        </p>
        <p>
          En 2026, les prix moyens sont de <strong>3 100 €/m²</strong>, avec des variations
          importantes : la Grande-Île classée au patrimoine mondial UNESCO dépasse 4 500 €/m²,
          tandis que Cronenbourg ou Hautepierre restent sous 2 500 €/m². Le marché est globalement
          stable après une légère correction de 5 à 7 % en 2023–2024.
        </p>

        <h2>Louer ou acheter à Strasbourg : le calcul</h2>

        <div className="key-figures">
          <div className="key-figure">
            <span className="kf-value">775 €</span>
            <span className="kf-label">Coût mensuel achat</span>
          </div>
          <div className="key-figure">
            <span className="kf-value">700 €</span>
            <span className="kf-label">Loyer T2 moyen</span>
          </div>
          <div className="key-figure">
            <span className="kf-value">13 ans</span>
            <span className="kf-label">Point d'équilibre</span>
          </div>
          <div className="key-figure">
            <span className="kf-value">27 900 €</span>
            <span className="kf-label">Apport nécessaire</span>
          </div>
        </div>

        <div className="compare-table-wrap">
          <table className="compare-table">
            <thead>
              <tr>
                <th>Poste</th>
                <th>Achat</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Mensualité / loyer</td>
                <td>578 €/mois</td>
                <td>700 €/mois</td>
              </tr>
              <tr>
                <td>Charges annexes</td>
                <td>~197 €/mois</td>
                <td>~65 €/mois</td>
              </tr>
              <tr>
                <td>Frais de notaire</td>
                <td>~11 100 €</td>
                <td>—</td>
              </tr>
              <tr>
                <td>Total mensuel all-in</td>
                <td>~775 €</td>
                <td>~765 €</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          À Strasbourg, la mensualité nette de crédit (<strong>578 €</strong>) est significativement
          inférieure au loyer médian (700 €). C'est l'un des rares cas en France où l'achat est
          immédiatement moins cher que la location sur la mensualité brute. Le point d'équilibre
          est atteint à seulement <strong>13 ans</strong>, ce qui rend l'achat très attrayant
          même pour un horizon moyen terme.
        </p>

        <div className="callout callout-tip">
          <span className="callout-icon">💡</span>
          <div className="callout-body">
            <strong>Strasbourg, cas rare :</strong> la mensualité de crédit est inférieure au loyer
            de marché. L'achat est rentable plus rapidement qu'à Lyon ou Bordeaux, notamment parce
            que les prix sont raisonnables et les loyers bien orientés grâce à la demande européenne.
          </div>
        </div>

        <h2>Les quartiers strasbourgeois à connaître</h2>
        <ul>
          <li>
            <strong>Grande-Île / Petite-France :</strong> Centre historique exceptionnel, classé
            UNESCO. Prix très élevés pour Strasbourg (~4 500–5 500 €/m²). Demande touristique
            et institutionnelle forte.
          </li>
          <li>
            <strong>Neustadt :</strong> Quartier wilhelmien inscrit à l'UNESCO depuis 2017. En pleine
            valorisation, appartements spacieux aux hauts plafonds, prix encore en dessous du
            potentiel (~3 500–4 000 €/m²).
          </li>
          <li>
            <strong>Robertsau / Orangerie :</strong> Quartier résidentiel vert proche des institutions
            européennes. Très recherché par les fonctionnaires et diplomates. Loyers stables et élevés.
          </li>
          <li>
            <strong>Cronenbourg / Hautepierre :</strong> Quartiers populaires en rénovation. Prix bas,
            rendements élevés (5 à 7 %), mais gestion locative plus délicate.
          </li>
        </ul>

        <h2>Investissement locatif à Strasbourg</h2>
        <p>
          Strasbourg est une excellente ville pour l'investissement locatif grâce à la stabilité de
          sa demande : fonctionnaires européens aux salaires élevés, étudiants Erasmus, cadres
          transfrontaliers travaillant en Allemagne. La rotation est moins forte que dans une ville
          purement universitaire, ce qui réduit les périodes de vacance locative. Les rendements
          bruts se situent entre <strong>4,5 et 6 %</strong> sur les secteurs bien desservis par
          le tramway.
        </p>
        <p>
          La loi locale alsacienne-mosellane (droit local) présente quelques spécificités en matière
          de bail et de copropriété. Il est conseillé de se faire accompagner par un notaire alsacien
          familier de ces particularités.
        </p>

        <h2>FAQ — Louer ou acheter à Strasbourg</h2>
        <p>
          <strong>Strasbourg est-elle affectée par le Brexit ?</strong> Le Brexit a réduit le nombre
          de fonctionnaires britanniques au Parlement européen, mais cela a été compensé par d'autres
          nationalités. L'impact sur le marché locatif a été marginal.
        </p>
        <p>
          <strong>Quels sont les avantages du droit local alsacien pour les propriétaires ?</strong>
          Le droit local offre notamment des procédures simplifiées pour certaines successions et des
          spécificités en matière de copropriété. En pratique, pour un investissement locatif simple,
          les différences sont mineures.
        </p>
        <p>
          <strong>Strasbourg est-elle bien connectée au reste de la France ?</strong> Oui : Paris
          est à 1h47 en TGV, Lyon à 3h30. La connexion autoroutière et le réseau tram intra-urbain
          sont très développés. L'aéroport de Strasbourg relie les principales capitales européennes.
        </p>
      </>
    ),
  },
};
