export const ARTICLES = [
  {
    slug: "louer-ou-acheter-paris-2026",
    title: "Louer ou acheter à Paris en 2026 : que choisir ?",
    description:
      "Paris, 9 500 €/m² en moyenne : faut-il vraiment acheter ? Analyse chiffrée du marché parisien en 2026 pour vous aider à décider.",
    date: "10 mars 2026",
    readTime: "4 min",
    tag: "Marché immobilier",
    tagClass: "tag-blue",
    intro:
      "Paris reste l'une des villes les plus chères d'Europe. Avec un prix moyen de 9 500 €/m², la question louer ou acheter mérite une analyse rigoureuse avant de s'engager sur 20 ans.",
    Content: () => (
      <>
        <p>
          Après une correction de 10 à 15 % entre 2022 et 2025, le marché parisien se stabilise en 2026
          autour de <strong>9 000 à 10 500 €/m²</strong> selon les arrondissements. Les taux de crédit,
          qui avaient culminé à 4,5 % fin 2023, reviennent progressivement vers 3,5–4,0 % sur 20 ans.
          Un contexte plus favorable — mais qui ne suffit pas à rendre l'achat systématiquement rentable.
        </p>

        <h2>Le calcul pour un T2 parisien type</h2>
        <p>Prenons un appartement de 45 m² dans le 11e arrondissement, affiché à <strong>420 000 €</strong>.</p>

        <div className="key-figures">
          <div className="key-figure">
            <span className="kf-value">2 010 €</span>
            <span className="kf-label">Coût mensuel propriétaire</span>
          </div>
          <div className="key-figure">
            <span className="kf-value">1 600 €</span>
            <span className="kf-label">Loyer équivalent</span>
          </div>
          <div className="key-figure">
            <span className="kf-value">~410 €</span>
            <span className="kf-label">Différence mensuelle</span>
          </div>
        </div>

        <div className="compare-table-wrap">
          <table className="compare-table">
            <thead>
              <tr><th>Scénario</th><th>Détail</th><th>Montant</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>Achat</strong> — Apport (20 %)</td><td>Immobilisé dès le départ</td><td>84 000 €</td></tr>
              <tr><td><strong>Achat</strong> — Frais de notaire</td><td>Non finançables</td><td>33 600 €</td></tr>
              <tr><td><strong>Achat</strong> — Mensualité crédit</td><td>25 ans à 3,8 %</td><td>~1 740 €/mois</td></tr>
              <tr><td><strong>Achat</strong> — Charges annexes</td><td>Taxe + entretien + assurance</td><td>~270 €/mois</td></tr>
              <tr><td><strong>Location</strong> — Loyer T2 11e</td><td>Bien équivalent</td><td>1 500–1 700 €/mois</td></tr>
            </tbody>
          </table>
        </div>

        <h2>Quand l'achat devient-il rentable à Paris ?</h2>
        <p>
          Les frais d'entrée (notaire + frais d'agence) représentent 10 à 12 % du prix. Pour les amortir,
          il faut du temps.
        </p>

        <div className="callout callout-warn">
          <span className="callout-icon">⏱</span>
          <div className="callout-body">
            À Paris, <strong>l'achat devient généralement plus rentable à partir de 12 à 18 ans</strong> de détention.
            Si vous comptez rester moins de 10 ans, la location est presque toujours préférable financièrement.
          </div>
        </div>

        <p>
          Si vous investissez votre épargne par ailleurs (ETF, assurance-vie…), la location peut même être
          gagnante sur un horizon bien plus long selon le rendement obtenu.
        </p>

        <h2>Ce qui peut faire pencher la balance</h2>

        <div className="compare-table-wrap">
          <table className="compare-table">
            <thead>
              <tr><th>Pour l'achat</th><th>Pour la location</th></tr>
            </thead>
            <tbody>
              <tr>
                <td>Stabilité — plus de hausses de loyer</td>
                <td>Flexibilité totale de mobilité</td>
              </tr>
              <tr>
                <td>Constitution de patrimoine progressif</td>
                <td>Capital disponible pour d'autres placements</td>
              </tr>
              <tr>
                <td>Liberté d'aménager et rénover</td>
                <td>Pas de charges imprévues ni de travaux</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="article-divider" />

        <h2>Notre verdict pour Paris en 2026</h2>

        <blockquote className="pull-quote">
          L'achat à Paris reste pertinent si vous disposez d'un apport solide (au moins 20 %),
          que votre horizon est d'au moins 12 à 15 ans et que votre situation est stable.
          Sinon, louer et investir la différence est souvent la stratégie la plus efficace.
        </blockquote>
      </>
    ),
  },

  {
    slug: "combien-gagner-pour-acheter",
    title: "Combien faut-il gagner pour acheter un appartement en France ?",
    description:
      "Studio, T2, T3 : quel salaire faut-il pour obtenir un crédit immobilier ? Guide chiffré avec exemples concrets pour 2026.",
    date: "5 mars 2026",
    readTime: "4 min",
    tag: "Financement",
    tagClass: "tag-green",
    intro:
      "Le salaire nécessaire pour acheter dépend du prix du bien, de votre apport et des taux. Voici un guide chiffré pour savoir si votre budget est suffisant — et comment l'optimiser.",
    Content: () => (
      <>
        <p>
          C'est la question que se posent la plupart des primo-accédants. La réponse dépend de plusieurs
          facteurs, mais les banques appliquent des règles claires et vérifiables à l'avance.
        </p>

        <h2>La règle des 35 % d'endettement</h2>

        <div className="callout callout-info">
          <span className="callout-icon">📐</span>
          <div className="callout-body">
            Le HCSF impose un <strong>taux d'endettement maximum de 35 %</strong> charges comprises.
            <br />
            Formule : <strong>Revenu net minimum = Mensualité ÷ 0,35</strong>
            <br />
            Exemple : pour 1 200 €/mois de mensualité → revenu minimum <strong>3 430 €/mois nets</strong>.
          </div>
        </div>

        <h2>Les revenus nécessaires selon le type de bien</h2>
        <p>Estimations basées sur un apport de 20 %, un taux de 3,8 % et une durée de 25 ans :</p>

        <div className="compare-table-wrap">
          <table className="compare-table">
            <thead>
              <tr><th>Type de bien</th><th>Prix</th><th>Mensualité</th><th>Revenu min.</th></tr>
            </thead>
            <tbody>
              <tr><td>Studio en province</td><td>90 000 €</td><td>~390 €</td><td>1 115 €/mois</td></tr>
              <tr><td>T2 en ville moyenne</td><td>180 000 €</td><td>~780 €</td><td>2 230 €/mois</td></tr>
              <tr><td>T3 en grande ville</td><td>280 000 €</td><td>~1 215 €</td><td>3 470 €/mois</td></tr>
              <tr><td>T3 à Lyon / Bordeaux</td><td>380 000 €</td><td>~1 650 €</td><td>4 715 €/mois</td></tr>
              <tr><td>T2 à Paris</td><td>450 000 €</td><td>~1 950 €</td><td>5 575 €/mois</td></tr>
            </tbody>
          </table>
        </div>

        <div className="callout callout-ok">
          <span className="callout-icon">👥</span>
          <div className="callout-body">
            <strong>Emprunter à deux additionne les revenus</strong> et change radicalement l'accès à la propriété.
            Un couple gagnant 2 × 2 500 € nets peut emprunter pour un T3 en grande ville.
          </div>
        </div>

        <h2>L'apport : souvent l'obstacle n°1</h2>
        <p>
          Les banques exigent au minimum <strong>10 % du prix</strong> pour couvrir les frais de notaire,
          et préfèrent <strong>20 % pour les meilleures conditions</strong>. Pour un bien à 250 000 €,
          l'apport idéal est de 50 000 € — sans compter les ~20 000 € de frais de notaire à régler
          le jour de la signature, non finançables par le crédit.
        </p>

        <h2>L'impact de la durée du prêt</h2>

        <div className="key-figures">
          <div className="key-figure">
            <span className="kf-value">1 180 €</span>
            <span className="kf-label">Sur 20 ans à 3,7 % (200 k€)</span>
          </div>
          <div className="key-figure">
            <span className="kf-value">1 030 €</span>
            <span className="kf-label">Sur 25 ans à 3,8 % (200 k€)</span>
          </div>
          <div className="key-figure">
            <span className="kf-value">+30 %</span>
            <span className="kf-label">Coût total sur 25 vs 20 ans</span>
          </div>
        </div>

        <p>La mensualité est 13 % plus basse sur 25 ans, mais le coût total augmente de 30 %.</p>

        <div className="article-divider" />

        <h2>Si votre salaire semble insuffisant</h2>
        <ul>
          <li><strong>Augmenter l'apport</strong> : réduire le capital emprunté améliore votre dossier</li>
          <li><strong>Emprunter à deux</strong> : les revenus du co-emprunteur s'additionnent</li>
          <li><strong>Allonger la durée</strong> : passer à 25 ans réduit mécaniquement la mensualité</li>
          <li><strong>PTZ primo-accédant</strong> : vérifiez votre éligibilité au Prêt à Taux Zéro</li>
        </ul>
      </>
    ),
  },

  {
    slug: "erreurs-a-eviter-avant-acheter",
    title: "Les 5 erreurs à éviter absolument avant d'acheter",
    description:
      "Frais de notaire oubliés, horizon trop court, épargne vidée… Ces erreurs coûtent cher. Tour d'horizon des pièges classiques avant l'achat immobilier.",
    date: "28 février 2026",
    readTime: "5 min",
    tag: "Conseils pratiques",
    tagClass: "tag-amber",
    intro:
      "Acheter est probablement la plus grande décision financière de votre vie. Pourtant, de nombreux acheteurs commettent les mêmes erreurs qui coûtent parfois des dizaines de milliers d'euros.",
    Content: () => (
      <>
        <p>
          L'achat immobilier s'accompagne d'une charge émotionnelle forte : le coup de cœur, la pression
          du marché, la peur de rater une bonne affaire. C'est précisément dans ce contexte que les
          erreurs se glissent.
        </p>

        <h2>Erreur n°1 : oublier les frais de notaire</h2>

        <div className="callout callout-warn">
          <span className="callout-icon">⚠️</span>
          <div className="callout-body">
            Les frais de notaire représentent <strong>7 à 8 % dans l'ancien</strong> et 2 à 3 % dans le neuf.
            Pour un bien à 300 000 €, c'est <strong>21 000 à 24 000 €</strong> à débourser le jour de la
            signature — en plus de votre apport, et <strong>non finançables par le crédit</strong>.
            <br />
            <strong>Règle pratique :</strong> votre "vrai" apport = apport annoncé − frais de notaire.
          </div>
        </div>

        <h2>Erreur n°2 : sous-estimer les charges mensuelles</h2>
        <p>La mensualité du crédit est rarement votre seule dépense. Il faut y ajouter :</p>

        <div className="key-figures">
          <div className="key-figure">
            <span className="kf-value">1 500 €</span>
            <span className="kf-label">Taxe foncière/an (médiane)</span>
          </div>
          <div className="key-figure">
            <span className="kf-value">200 €</span>
            <span className="kf-label">Charges copro/mois (moy.)</span>
          </div>
          <div className="key-figure">
            <span className="kf-value">~1 %</span>
            <span className="kf-label">Du prix du bien en entretien/an</span>
          </div>
        </div>

        <p>
          Un appartement à 300 000 € peut coûter <strong>300 à 500 €/mois de plus</strong> que la seule
          mensualité crédit — un poste souvent ignoré dans les simulations.
        </p>

        <h2>Erreur n°3 : acheter avec un horizon trop court</h2>
        <p>
          Les frais d'entrée représentent 10 à 12 % du prix. La règle empirique : l'achat devient
          financièrement compétitif à partir de <strong>7 à 10 ans minimum</strong> de détention.
          Sur 5 ans ou moins, la location est presque toujours plus rentable.
        </p>

        <h2>Erreur n°4 : vider toute son épargne dans l'apport</h2>

        <div className="callout callout-warn">
          <span className="callout-icon">🛡️</span>
          <div className="callout-body">
            Se retrouver sans épargne de précaution juste après l'achat est risqué. Chaudière en panne,
            toiture à refaire, perte d'emploi… <strong>Conservez 3 à 6 mois de charges</strong> en
            épargne liquide, quitte à emprunter un peu plus.
          </div>
        </div>

        <h2>Erreur n°5 : ne pas comparer avec la location</h2>

        <blockquote className="pull-quote">
          « Louer c'est jeter l'argent par les fenêtres » est l'idée reçue la plus dangereuse en immobilier.
          Dans certains scénarios, un locataire qui investit son apport peut accumuler plus de patrimoine
          qu'un propriétaire sur 10 ans.
        </blockquote>

        <p>
          Calculez avant de décider — c'est ce à quoi sert notre simulateur.
        </p>
      </>
    ),
  },

  {
    slug: "apport-personnel-combien-economiser",
    title: "Apport personnel : combien faut-il économiser avant d'acheter ?",
    description:
      "10 %, 20 % ou plus ? Voici exactement combien d'apport vous faut-il selon le prix du bien, et les meilleures stratégies pour y arriver.",
    date: "20 mars 2026",
    readTime: "4 min",
    tag: "Financement",
    tagClass: "tag-green",
    intro:
      "L'apport est souvent ce qui sépare un dossier bancaire accepté d'un dossier refusé. Mais combien faut-il vraiment économiser — et comment y arriver plus vite ?",
    Content: () => (
      <>
        <p>
          En 2026, les banques sont plus exigeantes qu'il y a dix ans sur la qualité des dossiers.
          L'apport personnel est l'un des premiers signaux que regarde un conseiller bancaire.
          Voici comment le calculer et le constituer efficacement.
        </p>

        <h2>Le minimum absolu : couvrir les frais de notaire</h2>
        <p>
          Les frais de notaire (~7-8 % dans l'ancien) ne sont généralement pas finançables par le crédit.
          C'est le plancher incompressible. Pour un bien à 200 000 €, il vous faut au moins{" "}
          <strong>16 000 € rien que pour les frais</strong> — sans disposer du moindre euro d'apport réel.
        </p>

        <div className="callout callout-warn">
          <span className="callout-icon">⚠️</span>
          <div className="callout-body">
            Avec seulement les frais de notaire comme apport, vous empruntez 100 % du prix du bien.
            Peu de banques acceptent ce profil en 2026, sauf dossier exceptionnel (CDI, revenus élevés,
            forte épargne résiduelle).
          </div>
        </div>

        <h2>L'apport idéal : 20 % du prix</h2>
        <p>
          La cible recommandée est <strong>20 %</strong> : 10 % couvrent les frais de notaire,
          10 % constituent un apport réel. Cela améliore le taux obtenu et réduit la mensualité.
        </p>

        <div className="compare-table-wrap">
          <table className="compare-table">
            <thead>
              <tr><th>Prix du bien</th><th>Apport idéal (20 %)</th><th>dont frais notaire</th><th>Apport réel</th></tr>
            </thead>
            <tbody>
              <tr><td>150 000 €</td><td>30 000 €</td><td>~12 000 €</td><td>~18 000 €</td></tr>
              <tr><td>250 000 €</td><td>50 000 €</td><td>~20 000 €</td><td>~30 000 €</td></tr>
              <tr><td>400 000 €</td><td>80 000 €</td><td>~32 000 €</td><td>~48 000 €</td></tr>
            </tbody>
          </table>
        </div>

        <h2>Combien de temps pour constituer cet apport ?</h2>
        <p>En mettant de côté 500 €/mois :</p>

        <div className="key-figures">
          <div className="key-figure">
            <span className="kf-value">~5 ans</span>
            <span className="kf-label">Pour atteindre 30 000 €</span>
          </div>
          <div className="key-figure">
            <span className="kf-value">~8 ans</span>
            <span className="kf-label">Pour atteindre 50 000 €</span>
          </div>
          <div className="key-figure">
            <span className="kf-value">~13 ans</span>
            <span className="kf-label">Pour atteindre 80 000 €</span>
          </div>
        </div>

        <p>
          Ces délais se raccourcissent si vous placez votre épargne sur des supports rémunérés plutôt
          que de laisser l'argent dormir sur un compte courant.
        </p>

        <h2>Les meilleures enveloppes pour constituer son apport</h2>
        <ul>
          <li>
            <strong>Plan Épargne Logement (PEL)</strong> : taux garanti 2,25 % en 2026, ouvre des droits
            à prêt. Idéal si l'horizon d'achat est dans 4 ans ou plus.
          </li>
          <li>
            <strong>Livret A</strong> : 1,5 % en 2026, totalement liquide et sans risque. Parfait pour la
            partie "précaution" de votre épargne.
          </li>
          <li>
            <strong>Assurance-vie fonds euros</strong> : pour les horizons de 5 ans et plus, avec un
            rendement légèrement supérieur (~2,5-3,5 % selon les contrats).
          </li>
        </ul>

        <div className="article-divider" />

        <div className="callout callout-tip">
          <span className="callout-icon">💡</span>
          <div className="callout-body">
            <strong>L'erreur à éviter :</strong> vider tous vos livrets pour maximiser l'apport.
            Conservez au minimum <strong>3 à 6 mois de dépenses</strong> en épargne liquide,
            indépendamment de l'apport immobilier. Les imprévus ne préviennent pas.
          </div>
        </div>
      </>
    ),
  },

  {
    slug: "villes-ou-acheter-france-2026",
    title: "Les villes françaises où il vaut mieux acheter en 2026",
    description:
      "Bordeaux, Nantes, Toulouse, Lille… Quelles villes offrent le meilleur rapport qualité-prix pour un achat immobilier en 2026 ? Analyse par marché.",
    date: "18 mars 2026",
    readTime: "5 min",
    tag: "Marché immobilier",
    tagClass: "tag-blue",
    intro:
      "Toutes les villes ne se valent pas pour investir ou acheter sa résidence principale. Prix au m², dynamisme local, ratio loyer/prix : voici les marchés les plus attractifs en 2026.",
    Content: () => (
      <>
        <p>
          Après le boom des grandes métropoles entre 2015 et 2022 et la correction de 2023-2025, le marché
          s'est rééquilibré. Certaines villes offrent aujourd'hui des opportunités réelles — d'autres
          restent surévaluées. Voici comment les départager.
        </p>

        <h2>Les critères pour évaluer un marché local</h2>
        <ul>
          <li><strong>Prix au m²</strong> : le coût d'entrée et la marge de progression potentielle</li>
          <li><strong>Ratio prix/loyer</strong> : plus il est bas, plus l'achat est compétitif face à la location</li>
          <li><strong>Dynamisme économique</strong> : emploi, démographie, attractivité des entreprises</li>
          <li><strong>Liquidité du marché</strong> : facilité à revendre en cas de besoin</li>
        </ul>

        <h2>Panorama des grandes métropoles en 2026</h2>

        <div className="compare-table-wrap">
          <table className="compare-table">
            <thead>
              <tr><th>Ville</th><th>Prix moyen /m²</th><th>Tendance</th><th>Attrait</th></tr>
            </thead>
            <tbody>
              <tr><td>Toulouse</td><td>3 200–4 500 €</td><td>Stable ↗</td><td>⭐⭐⭐⭐⭐</td></tr>
              <tr><td>Nantes</td><td>3 000–4 200 €</td><td>Stabilisé</td><td>⭐⭐⭐⭐</td></tr>
              <tr><td>Strasbourg</td><td>3 000–4 000 €</td><td>Stable</td><td>⭐⭐⭐⭐</td></tr>
              <tr><td>Lille</td><td>2 500–3 500 €</td><td>Stable ↗</td><td>⭐⭐⭐⭐⭐</td></tr>
              <tr><td>Bordeaux</td><td>3 500–4 500 €</td><td>Corrigé ↘</td><td>⭐⭐⭐⭐</td></tr>
              <tr><td>Rennes</td><td>~3 200 €</td><td>Tendu</td><td>⭐⭐⭐⭐</td></tr>
              <tr><td>Orléans</td><td>&lt; 2 500 €</td><td>Émergent</td><td>⭐⭐⭐⭐</td></tr>
            </tbody>
          </table>
        </div>

        <h2>Toulouse : le bon équilibre prix/dynamisme</h2>
        <p>
          Troisième ville de France par la croissance démographique, Toulouse profite du dynamisme
          de l'aéronautique et du spatial (Airbus, Thales). Les prix restent accessibles hors hypercentre
          à <strong>3 200–4 500 €/m²</strong>. La pression locative est forte, ce qui sécurise un
          investissement locatif.
        </p>

        <h2>Lille : les prix les plus bas des grandes métropoles</h2>

        <div className="callout callout-ok">
          <span className="callout-icon">🏆</span>
          <div className="callout-body">
            À <strong>2 500–3 500 €/m²</strong>, Lille est la grande ville la moins chère de France
            au prorata des revenus locaux. La connexion TGV vers Paris (60 min), Bruxelles (35 min) et
            Londres (90 min via Eurostar) lui confère un attrait unique pour l'investissement.
          </div>
        </div>

        <h2>Bordeaux : après la surchauffe, les bonnes affaires reviennent</h2>
        <p>
          Bordeaux a corrigé de 15 à 20 % depuis son pic de 2022. Des quartiers comme Bacalan ou
          Bordeaux-Bastide affichent désormais des prix autour de <strong>3 500–4 500 €/m²</strong>,
          contre plus de 5 000 €/m² au plus haut. Pour un horizon long terme, c'est un point
          d'entrée plus raisonnable.
        </p>

        <h2>Strasbourg : stabilité et demande institutionnelle</h2>
        <p>
          La présence des institutions européennes (Parlement, Conseil de l'Europe) crée une demande
          locative structurelle. Prix : <strong>3 000–4 000 €/m²</strong>. Marché moins spéculatif,
          fondamentaux solides.
        </p>

        <div className="article-divider" />

        <h2>Villes émergentes à surveiller</h2>

        <div className="key-figures">
          <div className="key-figure">
            <span className="kf-value">&lt; 2 500 €</span>
            <span className="kf-label">Orléans — 45 min de Paris</span>
          </div>
          <div className="key-figure">
            <span className="kf-value">~3 200 €</span>
            <span className="kf-label">Rennes — marché locatif tendu</span>
          </div>
          <div className="key-figure">
            <span className="kf-value">2 200–3 000 €</span>
            <span className="kf-label">Rouen — encore sous-évalué</span>
          </div>
        </div>
      </>
    ),
  },

  {
    slug: "taux-immobilier-2026-previsions",
    title: "Taux immobilier en 2026 : où en est-on et quelles perspectives ?",
    description:
      "Après le pic de 2023-2024, les taux immobiliers baissent progressivement. Où en sont-ils en 2026 ? Faut-il attendre encore pour emprunter ?",
    date: "15 mars 2026",
    readTime: "4 min",
    tag: "Financement",
    tagClass: "tag-green",
    intro:
      "Les taux ont fait le yoyo entre 2022 et 2025. En 2026, ils se stabilisent entre 3,5 et 4 %. Que faut-il en attendre pour la suite — et comment obtenir les meilleures conditions ?",
    Content: () => (
      <>
        <p>
          Après des années de taux historiquement bas (sous 2 % en 2021) puis un choc brutal en
          2023 (jusqu'à 4,5 % sur 25 ans), le marché se normalise. En 2026, emprunter est plus cher
          qu'il y a cinq ans — mais la situation s'est nettement améliorée depuis le pic.
        </p>

        <h2>Les taux actuels par durée (mars 2026)</h2>

        <div className="key-figures">
          <div className="key-figure">
            <span className="kf-value">3,1–3,4 %</span>
            <span className="kf-label">Sur 15 ans</span>
          </div>
          <div className="key-figure">
            <span className="kf-value">3,4–3,7 %</span>
            <span className="kf-label">Sur 20 ans</span>
          </div>
          <div className="key-figure">
            <span className="kf-value">3,6–4,0 %</span>
            <span className="kf-label">Sur 25 ans</span>
          </div>
        </div>

        <div className="callout callout-info">
          <span className="callout-icon">ℹ️</span>
          <div className="callout-body">
            Ces fourchettes s'entendent pour des profils standard en CDI avec 20 % d'apport.
            Un excellent dossier (apport 30 %+, hauts revenus) peut décrocher <strong>0,3 à 0,5 point de moins</strong>.
          </div>
        </div>

        <h2>Contexte : pourquoi les taux ont-ils autant bougé ?</h2>
        <p>
          La Banque Centrale Européenne (BCE) a relevé ses taux directeurs 10 fois entre juillet 2022
          et septembre 2023 pour lutter contre l'inflation. Depuis mi-2024, la BCE baisse ses taux
          progressivement, ce qui permet aux taux immobiliers de refluer.
        </p>

        <div className="compare-table-wrap">
          <table className="compare-table">
            <thead>
              <tr><th>Période</th><th>Taux moyen 20 ans</th><th>Contexte</th></tr>
            </thead>
            <tbody>
              <tr><td>2021</td><td>~1,1 %</td><td>Taux historiquement bas</td></tr>
              <tr><td>2023 (pic)</td><td>~4,5 %</td><td>Hausse BCE anti-inflation</td></tr>
              <tr><td>2026 (actuel)</td><td>3,4–3,7 %</td><td>Normalisation progressive</td></tr>
              <tr><td>2027 (prévision)</td><td>~2,8–3,3 %</td><td>Si inflation maîtrisée</td></tr>
            </tbody>
          </table>
        </div>

        <h2>Faut-il attendre une nouvelle baisse pour acheter ?</h2>

        <blockquote className="pull-quote">
          Attendre 6 mois pour gagner 0,3 point de taux représente ~15 €/mois d'économie sur 200 000 € empruntés.
          Si le marché progresse de 2 % pendant ce temps, votre bien cible coûte 4 000 à 8 000 € de plus.
          Le gain est rarement au rendez-vous.
        </blockquote>

        <div className="article-divider" />

        <h2>Comment obtenir le meilleur taux</h2>
        <ul>
          <li><strong>Soigner son dossier</strong> : CDI, épargne régulière, absence d'incident bancaire</li>
          <li><strong>Maximiser l'apport</strong> : chaque point d'apport supplémentaire améliore le taux proposé</li>
          <li><strong>Passer par un courtier</strong> : ils négocient pour vous auprès de plusieurs banques en parallèle</li>
          <li><strong>Comparer les assurances</strong> : la délégation d'assurance peut économiser 0,2–0,5 % du taux global</li>
        </ul>
      </>
    ),
  },

  {
    slug: "ptz-2026-comment-en-beneficier",
    title: "PTZ 2026 : conditions, montants et comment en bénéficier",
    description:
      "Le Prêt à Taux Zéro est l'une des aides les plus puissantes pour les primo-accédants. Voici les conditions d'éligibilité, les montants et comment le combiner avec votre crédit.",
    date: "12 mars 2026",
    readTime: "4 min",
    tag: "Aides et dispositifs",
    tagClass: "tag-purple",
    intro:
      "Le PTZ permet d'emprunter une partie du prix sans payer d'intérêts. En 2026, il a été élargi à de nouvelles zones et types de biens. Voici tout ce qu'il faut savoir pour en profiter.",
    Content: () => (
      <>
        <p>
          Le Prêt à Taux Zéro (PTZ) est un dispositif d'État qui permet aux primo-accédants d'emprunter
          une partie du financement de leur résidence principale <strong>sans aucun intérêt</strong>.
          C'est l'une des aides les plus concrètes disponibles — à condition de remplir les critères.
        </p>

        <div className="callout callout-ok">
          <span className="callout-icon">🎯</span>
          <div className="callout-body">
            Exemple concret : pour un appartement neuf à 280 000 € en zone B1 (Nantes, Bordeaux…),
            le PTZ peut couvrir jusqu'à <strong>84 000 € sans intérêt</strong>, soit une économie de{" "}
            <strong>20 000 à 35 000 €</strong> d'intérêts selon la durée.
          </div>
        </div>

        <h2>Qui peut en bénéficier ?</h2>
        <ul>
          <li>
            <strong>Être primo-accédant</strong> : ne pas avoir été propriétaire de sa résidence principale
            au cours des 2 dernières années (exceptions pour invalidité ou catastrophe naturelle)
          </li>
          <li>
            <strong>Revenus sous plafond</strong> : de 37 000 € à 92 000 € de revenus annuels selon
            la zone et la composition du foyer
          </li>
          <li>
            <strong>Résidence principale</strong> : le bien doit être occupé dans les 12 mois suivant
            l'achat ou la fin des travaux
          </li>
        </ul>

        <h2>Types de biens éligibles et montants accordés</h2>

        <div className="compare-table-wrap">
          <table className="compare-table">
            <thead>
              <tr><th>Type de bien</th><th>Zone</th><th>% PTZ max</th></tr>
            </thead>
            <tbody>
              <tr><td>Neuf</td><td>Toutes zones</td><td>Jusqu'à 40 % (zone A/Abis)</td></tr>
              <tr><td>Ancien avec travaux (≥25 % du coût)</td><td>B2 et C</td><td>Jusqu'à 20 %</td></tr>
              <tr><td>Logement social vendu à l'occupant</td><td>Toutes zones</td><td>Variable</td></tr>
            </tbody>
          </table>
        </div>

        <h2>Comment le combiner avec votre crédit classique</h2>
        <p>
          Le PTZ est un <strong>prêt complémentaire</strong>, pas principal. Il se rembourse sur 20 à
          25 ans avec une période de différé (vous ne remboursez rien pendant 5 à 15 ans selon vos revenus).
        </p>

        <div className="callout callout-tip">
          <span className="callout-icon">💡</span>
          <div className="callout-body">
            Pendant la période de différé, vous ne remboursez que votre crédit classique.
            La <strong>mensualité totale est plus légère au démarrage</strong>, ce qui aide les
            primo-accédants à démarrer sans pression excessive.
          </div>
        </div>

        <div className="article-divider" />

        <h2>Démarches pour l'obtenir</h2>
        <ul>
          <li>Le PTZ est accordé par les banques partenaires (la plupart des grandes banques)</li>
          <li>Votre conseiller bancaire peut simuler votre éligibilité et intégrer le PTZ dans le plan de financement</li>
          <li>Un courtier peut vous aider à optimiser la combinaison PTZ + crédit classique</li>
        </ul>
      </>
    ),
  },

  {
    slug: "charges-copropriete-avant-acheter",
    title: "Charges de copropriété : ce qu'il faut vérifier avant d'acheter",
    description:
      "Les charges de copropriété peuvent atteindre plusieurs centaines d'euros par mois. Voici comment les évaluer avant de signer et les pièges à éviter.",
    date: "8 mars 2026",
    readTime: "4 min",
    tag: "Conseils pratiques",
    tagClass: "tag-amber",
    intro:
      "Les charges de copropriété sont souvent sous-estimées dans le budget d'achat. Elles peuvent varier du simple au triple selon le type d'immeuble. Voici comment les analyser avant de vous engager.",
    Content: () => (
      <>
        <p>
          Quand vous achetez un appartement, vous achetez aussi une quote-part des parties communes.
          Et cette quote-part a un coût mensuel : les charges de copropriété. Un poste budgétaire
          qui peut transformer une bonne affaire en mauvaise surprise.
        </p>

        <h2>Que couvrent les charges de copropriété ?</h2>
        <p>On distingue deux types de charges :</p>
        <ul>
          <li>
            <strong>Charges courantes</strong> : entretien des parties communes, gardien, assurances
            immeuble, ascenseur, espaces verts, eau froide des parties communes…
          </li>
          <li>
            <strong>Charges exceptionnelles</strong> : travaux votés en assemblée générale (ravalement,
            toiture, réfection des canalisations, mise aux normes…)
          </li>
        </ul>

        <h2>Quel montant selon le type d'immeuble ?</h2>

        <div className="compare-table-wrap">
          <table className="compare-table">
            <thead>
              <tr><th>Type d'immeuble</th><th>€/m²/mois</th><th>Pour 50 m²</th></tr>
            </thead>
            <tbody>
              <tr><td>Petit immeuble, sans gardien ni ascenseur</td><td>1,5–2,5 €</td><td>75–125 €/mois</td></tr>
              <tr><td>Immeuble standard avec ascenseur</td><td>3–5 €</td><td>150–250 €/mois</td></tr>
              <tr><td>Immeuble avec gardien</td><td>4–7 €</td><td>200–350 €/mois</td></tr>
              <tr><td>Résidence avec piscine / conciergerie</td><td>8–15 €</td><td>400–750 €/mois</td></tr>
            </tbody>
          </table>
        </div>

        <h2>Les documents à demander avant de signer</h2>

        <div className="callout callout-info">
          <span className="callout-icon">📋</span>
          <div className="callout-body">
            Ces documents sont obligatoirement remis par le vendeur avant la signature :
            <ul style={{marginTop: "8px", marginBottom: 0}}>
              <li><strong>Les 3 derniers appels de fonds</strong> : montant réel des charges courantes</li>
              <li><strong>Les PV des 3 dernières AG</strong> : travaux votés, litiges, impayés</li>
              <li><strong>Le carnet d'entretien</strong> : historique des travaux réalisés</li>
              <li><strong>L'état du fonds de travaux</strong> : obligation ALUR de 5 % minimum</li>
            </ul>
          </div>
        </div>

        <div className="article-divider" />

        <h2>Les signaux d'alarme</h2>

        <div className="callout callout-warn">
          <span className="callout-icon">🚨</span>
          <div className="callout-body">
            <ul style={{margin: 0, paddingLeft: "1.2em"}}>
              <li>Fonds de travaux inexistant ou très faible → de gros travaux arrivent</li>
              <li>Nombreux copropriétaires en impayés → copropriété fragilisée</li>
              <li>Travaux votés mais non facturés → vous en serez redevable</li>
              <li>Procédure judiciaire en cours contre un prestataire</li>
            </ul>
          </div>
        </div>

        <p>
          Un syndic professionnel et des comptes équilibrés sont de bons indicateurs d'une copropriété
          bien gérée. N'hésitez pas à demander le diagnostic technique global (DTG) s'il existe.
        </p>
      </>
    ),
  },

  {
    slug: "dpe-renovation-energetique-achat",
    title: "DPE et rénovation énergétique : l'impact sur votre achat immobilier",
    description:
      "Un logement classé F ou G peut être une opportunité… ou un gouffre. Tout ce qu'il faut savoir sur le DPE, les aides à la rénovation et la stratégie achat-rénov.",
    date: "3 mars 2026",
    readTime: "5 min",
    tag: "Technique",
    tagClass: "tag-teal",
    intro:
      "Le DPE est devenu un critère de valorisation immobilier majeur. Les logements énergivores subissent des décotes importantes — mais aussi des opportunités pour les acheteurs bien informés.",
    Content: () => (
      <>
        <p>
          Le Diagnostic de Performance Énergétique (DPE) classe les logements de A (très performant)
          à G (passoire thermique). Depuis 2023, il est opposable juridiquement et conditionne
          directement la valeur et la louabilité d'un bien.
        </p>

        <h2>Impact du DPE sur les prix</h2>

        <div className="compare-table-wrap">
          <table className="compare-table">
            <thead>
              <tr><th>Classe DPE</th><th>Impact sur la valeur</th><th>Situation en 2026</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>A ou B</strong></td><td>Prime +5 à +10 %</td><td>Très recherché</td></tr>
              <tr><td><strong>C ou D</strong></td><td>Valeur de référence</td><td>Neutre</td></tr>
              <tr><td><strong>E</strong></td><td>Décote ~5 %</td><td>Travaux à anticiper</td></tr>
              <tr><td><strong>F ou G</strong></td><td>Décote 10 à 25 %</td><td>Interdit à la location</td></tr>
            </tbody>
          </table>
        </div>

        <h2>La réglementation qui change tout</h2>

        <div className="callout callout-warn">
          <span className="callout-icon">📅</span>
          <div className="callout-body">
            <strong>Calendrier des interdictions de location :</strong>
            <ul style={{margin: "8px 0 0", paddingLeft: "1.2em"}}>
              <li><strong>Depuis janvier 2025</strong> : tous les logements G sont interdits à la location</li>
              <li><strong>Janvier 2028</strong> : les logements F seront interdits à leur tour</li>
            </ul>
            Ces interdictions impactent directement la valeur des biens concernés.
          </div>
        </div>

        <h2>Coût des travaux de rénovation énergétique</h2>

        <div className="key-figures">
          <div className="key-figure">
            <span className="kf-value">2–5 k€</span>
            <span className="kf-label">Isolation combles perdus</span>
          </div>
          <div className="key-figure">
            <span className="kf-value">8–15 k€</span>
            <span className="kf-label">Pompe à chaleur air/eau</span>
          </div>
          <div className="key-figure">
            <span className="kf-value">20–60 k€</span>
            <span className="kf-label">Rénovation globale F→C</span>
          </div>
        </div>

        <h2>Les aides disponibles en 2026</h2>
        <ul>
          <li>
            <strong>MaPrimeRénov'</strong> : aide de l'État jusqu'à 90 % pour les foyers très modestes,
            20 à 50 % pour les revenus intermédiaires
          </li>
          <li>
            <strong>Éco-PTZ</strong> : prêt sans intérêt jusqu'à 50 000 € pour financer des travaux de rénovation
          </li>
          <li>
            <strong>CEE (Certificats d'Économies d'Énergie)</strong> : primes versées par les fournisseurs
            d'énergie pour certains types de travaux
          </li>
        </ul>

        <div className="article-divider" />

        <h2>La stratégie achat-rénovation</h2>

        <blockquote className="pull-quote">
          Acheter un logement classé F ou G à prix décoté, puis rénover avec les aides disponibles,
          peut s'avérer très rentable — à condition de bien négocier la décote et de vérifier
          que la structure du bâtiment est saine.
        </blockquote>

        <div className="callout callout-tip">
          <span className="callout-icon">💡</span>
          <div className="callout-body">
            Avant tout achat d'un bien énergivore, faites réaliser un <strong>audit énergétique complet
            (~800 à 1 500 €)</strong> par un professionnel certifié. Il chiffrera précisément les travaux
            nécessaires et les gains attendus.
          </div>
        </div>
      </>
    ),
  },

  {
    slug: "louer-en-attendant-strategie",
    title: "Louer en attendant mieux : vraiment la bonne stratégie ?",
    description:
      "Attendre d'avoir un meilleur apport, un meilleur marché, un meilleur taux… Quand la location d'attente est-elle vraiment payante ? Analyse honnête.",
    date: "25 février 2026",
    readTime: "4 min",
    tag: "Conseils pratiques",
    tagClass: "tag-amber",
    intro:
      "Beaucoup de futurs propriétaires « attendent le bon moment ». Parfois c'est la bonne décision — parfois une illusion coûteuse. Voici comment savoir de quel côté vous êtes.",
    Content: () => (
      <>
        <p>
          « Je loue en attendant que les prix baissent. » « J'attends d'avoir un meilleur apport. »
          « Je veux voir où les taux vont aller. » Ces phrases reviennent souvent. Dans certains cas,
          elles sont pertinentes. Dans d'autres, elles dissimulent une procrastination coûteuse.
        </p>

        <h2>Quand louer en attendant est la bonne décision</h2>
        <ul>
          <li>
            <strong>Situation professionnelle instable</strong> : CDD, période d'essai, reconversion
            en cours — acheter dans ce contexte fragilise votre dossier et votre équilibre financier
          </li>
          <li>
            <strong>Horizon incertain</strong> : si vous pourriez déménager dans les 3-5 ans,
            les frais d'achat (~10-12 %) ne s'amortiront pas
          </li>
          <li>
            <strong>Apport trop faible</strong> : attendre pour constituer 20 % vous donne accès à de
            meilleures conditions de prêt
          </li>
          <li>
            <strong>Marché local surévalué</strong> : si les prix sont déconnectés des fondamentaux,
            une correction peut rendre l'attente payante
          </li>
        </ul>

        <h2>L'argument de l'apport : épargner pendant qu'on loue</h2>

        <div className="callout callout-ok">
          <span className="callout-icon">📈</span>
          <div className="callout-body">
            En épargnant 600 €/mois pendant 4 ans, vous constituez <strong>28 800 €</strong> — de quoi
            passer de 10 % à 20 % d'apport sur un bien à 250 000 €. Cette différence peut améliorer
            votre taux de <strong>0,3 à 0,5 %</strong> et vous économiser plusieurs milliers d'euros d'intérêts.
          </div>
        </div>

        <h2>Le risque qu'on oublie : la hausse des prix et des loyers</h2>

        <div className="key-figures">
          <div className="key-figure">
            <span className="kf-value">+2 %/an</span>
            <span className="kf-label">Hausse immobilière moyenne</span>
          </div>
          <div className="key-figure">
            <span className="kf-value">+10 200 €</span>
            <span className="kf-label">Surcoût sur 250 k€ en 2 ans</span>
          </div>
          <div className="key-figure">
            <span className="kf-value">+1,5 %/an</span>
            <span className="kf-label">Hausse des loyers en moyenne</span>
          </div>
        </div>

        <p>
          Pour que l'attente soit vraiment gagnante, vos placements doivent surperformer la hausse
          immobilière nette. C'est possible (ETF, assurance-vie) — mais pas automatique.
        </p>

        <h2>La vraie question : que faites-vous de la différence ?</h2>

        <blockquote className="pull-quote">
          Si vous louez pour 900 €/mois alors que la mensualité propriétaire serait de 1 400 €/mois,
          vous avez 500 €/mois à investir. En 10 ans à 5 %/an, c'est environ 75 000 € de capital constitué.
          Valable — si vous avez la discipline de le faire réellement.
        </blockquote>

        <div className="article-divider" />

        <h2>Notre conclusion</h2>

        <div className="compare-table-wrap">
          <table className="compare-table">
            <thead>
              <tr><th>Horizon</th><th>Stratégie recommandée</th></tr>
            </thead>
            <tbody>
              <tr><td>Plus de 5 ans avant d'acheter</td><td>Louer et investir activement (ETF, AV)</td></tr>
              <tr><td>2–3 ans avant d'acheter</td><td>Épargner en sécurité (Livret A, PEL)</td></tr>
              <tr><td>Vous êtes prêt maintenant</td><td>Ne pas attendre le "bon moment" qui n'arrive jamais</td></tr>
            </tbody>
          </table>
        </div>
      </>
    ),
  },

  {
    slug: "salaire-emprunt-200000",
    title: "Quel salaire pour emprunter 200 000 euros ?",
    description: "Taux d'endettement, durée, apport : combien faut-il gagner pour décrocher un crédit de 200 000 € en 2026 ? Analyse chiffrée et conseils pour optimiser votre dossier.",
    date: "Mars 2026",
    readTime: "4 min",
    tag: "Crédit",
    tagClass: "tag-purple",
    intro: "Emprunter 200 000 euros est l'un des montants les plus courants pour l'achat d'un premier bien en France. Mais quel revenu net faut-il vraiment pour convaincre une banque en 2026 ? Les réponses dépendent du taux, de la durée et de votre apport.",
    Content: () => (
      <>
        <p>Avec un prix médian autour de <strong>2 500 à 3 500 €/m²</strong> dans les villes moyennes, un budget de 200 000 € permet d'acheter un T2 à T3 confortable hors grandes métropoles. Mais avant de visiter le premier appartement, il faut s'assurer que le financement est accessible.</p>
        <h2>La règle des 35 % : le point de départ</h2>
        <div className="callout callout-info"><span className="callout-icon">📐</span><div className="callout-body">Le HCSF impose un <strong>taux d'endettement maximum de 35 %</strong> de vos revenus nets, assurance comprise. Formule : <strong>Revenu minimum = Mensualité ÷ 0,35</strong></div></div>
        <h2>Combien faut-il gagner selon la durée ?</h2>
        <p>Simulation pour 200 000 € empruntés (hors apport) à différentes durées en 2026 :</p>
        <div className="compare-table-wrap"><table className="compare-table"><thead><tr><th>Durée</th><th>Taux indicatif</th><th>Mensualité</th><th>Revenu net minimum</th></tr></thead><tbody><tr><td>15 ans</td><td>3,5 %</td><td>~1 430 €</td><td>~4 090 €/mois</td></tr><tr><td>20 ans</td><td>3,7 %</td><td>~1 185 €</td><td>~3 385 €/mois</td></tr><tr><td>25 ans</td><td>3,8 %</td><td>~1 030 €</td><td>~2 945 €/mois</td></tr></tbody></table></div>
        <div className="key-figures"><div className="key-figure"><span className="kf-value">~2 945 €</span><span className="kf-label">Revenu min. sur 25 ans</span></div><div className="key-figure"><span className="kf-value">~3 385 €</span><span className="kf-label">Revenu min. sur 20 ans</span></div><div className="key-figure"><span className="kf-value">+45 %</span><span className="kf-label">Coût total sur 25 vs 15 ans</span></div></div>
        <h2>L'impact de l'apport sur le revenu requis</h2>
        <p>Si votre apport couvre les frais de notaire (~15 000 € pour un bien à 200 000 €) et une partie du prix, le capital à emprunter diminue — et avec lui la mensualité et le revenu minimum requis.</p>
        <div className="callout callout-ok"><span className="callout-icon">👥</span><div className="callout-body"><strong>Emprunter à deux change tout.</strong> Un couple avec 1 600 € + 1 800 € nets (3 400 €/mois) peut tout à fait emprunter 200 000 € sur 20 ans, là où un célibataire devrait gagner 3 385 € seul.</div></div>
        <h2>Les charges existantes réduisent votre capacité</h2>
        <div className="compare-table-wrap"><table className="compare-table"><thead><tr><th>Situation</th><th>Revenu net</th><th>Charges existantes</th><th>Mensualité max. disponible</th></tr></thead><tbody><tr><td>Célibataire, sans crédit</td><td>3 400 €</td><td>0 €</td><td>1 190 €</td></tr><tr><td>Célibataire, crédit auto 250 €</td><td>3 400 €</td><td>250 €</td><td>940 €</td></tr><tr><td>Couple, sans crédit</td><td>5 000 €</td><td>0 €</td><td>1 750 €</td></tr><tr><td>Couple, crédit conso 400 €</td><td>5 000 €</td><td>400 €</td><td>1 350 €</td></tr></tbody></table></div>
        <h2>Comment améliorer sa capacité d'emprunt</h2>
        <ul><li><strong>Rembourser les crédits en cours</strong> avant de déposer votre dossier</li><li><strong>Augmenter l'apport</strong> : réduire le capital emprunté est le levier le plus direct</li><li><strong>Allonger la durée</strong> : passer de 20 à 25 ans réduit la mensualité de ~13 %</li><li><strong>Passer par un courtier</strong> pour obtenir des conditions inaccessibles en direct</li><li><strong>Vérifier le PTZ</strong> : pour les primo-accédants, ce prêt sans intérêt allège la mensualité principale</li></ul>
        <div className="article-divider" />
        <blockquote className="pull-quote">Pour emprunter 200 000 € sur 20 ans en 2026, visez un revenu net d'au moins 3 400 €/mois seul, ou 2 800 € à deux. Un apport solide et l'absence de crédits en cours sont vos meilleurs atouts.</blockquote>
      </>
    ),
  },

  {
    slug: "ptz-2026-conditions",
    title: "PTZ 2026 : les nouvelles conditions pour les primo-accédants",
    description: "Le PTZ a été réformé en profondeur pour 2026. Nouveaux plafonds, zones élargies, biens éligibles : tout ce qui change pour les primo-accédants cette année.",
    date: "Mars 2026",
    readTime: "5 min",
    tag: "Primo-accédant",
    tagClass: "tag-blue",
    intro: "Le Prêt à Taux Zéro 2026 sort renforcé d'une réforme majeure : extension aux logements anciens avec travaux sur tout le territoire, relèvement des plafonds de revenus et hausse des quotités. Pour les primo-accédants, c'est une opportunité à ne pas manquer.",
    Content: () => (
      <>
        <p>Depuis le 1er janvier 2026, le PTZ s'applique à un périmètre beaucoup plus large. L'objectif : relancer l'accession à la propriété après deux années de marché atone. Pour les primo-accédants, le PTZ peut représenter une économie de <strong>15 000 à 40 000 €</strong> sur la durée totale du crédit.</p>
        <h2>Les principales nouveautés du PTZ 2026</h2>
        <div className="callout callout-ok"><span className="callout-icon">🎯</span><div className="callout-body">Grande nouveauté : le PTZ est désormais accessible à l'<strong>achat dans l'ancien avec travaux dans toutes les zones</strong>, y compris les zones C et B2 rurales.</div></div>
        <h2>Conditions d'éligibilité en 2026</h2>
        <ul><li><strong>Primo-accédant</strong> : ne pas avoir été propriétaire de sa résidence principale au cours des 2 dernières années</li><li><strong>Résidence principale</strong> : le bien doit être occupé dans les 12 mois suivant l'acquisition ou la fin des travaux</li><li><strong>Travaux obligatoires dans l'ancien</strong> : au moins 25 % du coût total de l'opération</li></ul>
        <h2>Plafonds de revenus 2026 par zone</h2>
        <div className="compare-table-wrap"><table className="compare-table"><thead><tr><th>Zone</th><th>1 personne</th><th>2 personnes</th><th>4 personnes</th></tr></thead><tbody><tr><td><strong>Zone A bis</strong> (Paris, cœur IDF)</td><td>37 000 €</td><td>51 800 €</td><td>74 000 €</td></tr><tr><td><strong>Zone A</strong> (grandes agglomérations)</td><td>37 000 €</td><td>51 800 €</td><td>74 000 €</td></tr><tr><td><strong>Zone B1</strong> (villes &gt; 250k hab.)</td><td>32 000 €</td><td>44 800 €</td><td>64 000 €</td></tr><tr><td><strong>Zones B2 &amp; C</strong></td><td>28 000 €</td><td>39 200 €</td><td>56 000 €</td></tr></tbody></table></div>
        <h2>Quotités maximales</h2>
        <div className="key-figures"><div className="key-figure"><span className="kf-value">50 %</span><span className="kf-label">Quotité max. zones A/A bis (neuf)</span></div><div className="key-figure"><span className="kf-value">40 %</span><span className="kf-label">Quotité max. zones B1 (neuf)</span></div><div className="key-figure"><span className="kf-value">40 %</span><span className="kf-label">Quotité max. ancien avec travaux</span></div></div>
        <div className="callout callout-warn"><span className="callout-icon">⚠️</span><div className="callout-body">Le PTZ ne finance pas la totalité de l'achat : il doit être complété par un <strong>prêt principal</strong>. Son montant maximum est plafonné selon la zone et la composition du foyer.</div></div>
        <h2>Exemple concret : achat dans l'ancien avec travaux</h2>
        <div className="compare-table-wrap"><table className="compare-table"><thead><tr><th>Élément</th><th>Montant</th></tr></thead><tbody><tr><td>Prix du bien (T3, 70 m²)</td><td>180 000 €</td></tr><tr><td>Travaux éligibles</td><td>45 000 €</td></tr><tr><td>Coût total</td><td>225 000 €</td></tr><tr><td>PTZ (40 %)</td><td>90 000 €</td></tr><tr><td>Économie d'intérêts PTZ</td><td>~22 000 €</td></tr></tbody></table></div>
        <div className="article-divider" />
        <blockquote className="pull-quote">En 2026, le PTZ est accessible à plus de Français que jamais. Vérifiez votre éligibilité avant même de choisir votre bien : cela peut changer radicalement votre plan de financement.</blockquote>
      </>
    ),
  },

  {
    slug: "villes-achat-rentable-2026",
    title: "Les 5 villes où acheter est plus rentable que louer en 2026",
    description: "Dans ces 5 villes, les prix ont suffisamment corrigé et les loyers suffisamment monté pour que l'achat batte la location sur 10 ans. Analyse chiffrée ville par ville.",
    date: "Mars 2026",
    readTime: "5 min",
    tag: "Marché",
    tagClass: "tag-green",
    intro: "Partout en France, la question louer ou acheter n'a pas la même réponse. Dans certaines villes, la correction des prix conjuguée à la hausse des loyers a rendu l'achat clairement gagnant sur 10 ans. Voici les 5 marchés à privilégier en 2026.",
    Content: () => (
      <>
        <p>Pour comparer honnêtement location et achat, il faut intégrer tous les paramètres : prix d'achat, loyers de marché, frais annexes, et surtout l'horizon de détention. En 2026, la correction des prix dans plusieurs marchés fait basculer la balance en faveur de l'achat bien avant les 15 ans généralement évoqués.</p>
        <h2>Notre méthode de comparaison</h2>
        <div className="callout callout-info"><span className="callout-icon">📐</span><div className="callout-body">Nous comparons le <strong>coût total propriétaire sur 10 ans</strong> (mensualité + charges + taxe foncière + frais d'entrée) au <strong>coût total locataire</strong> (loyers cumulés + épargne investie en ETF à 5 %/an). L'apport est supposé à 20 %, taux à 3,7 % sur 20 ans.</div></div>
        <h2>1. Lille — Le retour en grâce du Nord</h2>
        <p>Lille affiche des prix stables autour de <strong>3 200 €/m²</strong>. Avec des loyers moyens de <strong>13 €/m²</strong>, le rendement locatif brut dépasse 4,5 %. Un T3 de 65 m² s'achète pour 208 000 € et se loue 845 €/mois. L'achat devient rentable dès la 7e année.</p>
        <h2>2. Toulouse — La métropole qui résiste</h2>
        <p>Toulouse maintient une pression locative forte grâce à son tissu étudiant et aéronautique. Les prix oscillent autour de <strong>3 600 €/m²</strong>. Le point de bascule achat/location se situe à environ 8 ans.</p>
        <h2>3. Nantes — Correction marquée, loyers solides</h2>
        <p>Après un pic à 4 500 €/m² en 2022, Nantes est redescendu à <strong>3 400–3 700 €/m²</strong>. Les loyers ont continué de progresser (+6 % entre 2023 et 2026). Le ratio prix/loyer s'est nettement amélioré.</p>
        <h2>4. Rennes — La ville étudiante sous-estimée</h2>
        <p>Rennes combine une demande locative forte (2e ville étudiante de l'Ouest) et des prix stabilisés autour de <strong>3 300 €/m²</strong>. L'achat devient rentable dès 8 ans.</p>
        <h2>5. Strasbourg — L'eurodistrict attractif</h2>
        <p>Strasbourg bénéficie d'une attractivité institutionnelle rare. Les prix, autour de <strong>3 100 €/m²</strong>, restent modérés face à des loyers de <strong>12 €/m²</strong>.</p>
        <h2>Comparatif des 5 villes</h2>
        <div className="compare-table-wrap"><table className="compare-table"><thead><tr><th>Ville</th><th>Prix/m²</th><th>Loyer/m²</th><th>Rendement brut</th><th>Seuil rentabilité</th></tr></thead><tbody><tr><td><strong>Lille</strong></td><td>3 200 €</td><td>13,0 €</td><td>4,9 %</td><td>~7 ans</td></tr><tr><td><strong>Rennes</strong></td><td>3 300 €</td><td>13,0 €</td><td>4,7 %</td><td>~8 ans</td></tr><tr><td><strong>Toulouse</strong></td><td>3 600 €</td><td>12,5 €</td><td>4,2 %</td><td>~8 ans</td></tr><tr><td><strong>Nantes</strong></td><td>3 550 €</td><td>12,0 €</td><td>4,1 %</td><td>~10 ans</td></tr><tr><td><strong>Strasbourg</strong></td><td>3 100 €</td><td>12,0 €</td><td>4,6 %</td><td>~8 ans</td></tr></tbody></table></div>
        <div className="callout callout-warn"><span className="callout-icon">⚠️</span><div className="callout-body">Ces calculs supposent un apport de 20 %, un taux de 3,7 % sur 20 ans et une revalorisation du bien de 1,5 %/an. Votre situation personnelle peut modifier ces résultats. Utilisez notre simulateur pour une estimation personnalisée.</div></div>
        <h2>Les villes à éviter pour l'achat en 2026</h2>
        <p>À l'inverse, Paris (seuil de rentabilité à 15+ ans) et Nice (prix élevés, rendements faibles) restent défavorables à l'achat sur 10 ans. Dans ces villes, louer et investir la différence reste souvent la stratégie optimale.</p>
        <div className="article-divider" />
        <blockquote className="pull-quote">En 2026, Lille, Rennes et Toulouse offrent les meilleures fenêtres d'achat de France. La correction des prix combinée à des loyers dynamiques crée des conditions qu'on n'avait pas vues depuis 2017.</blockquote>
      </>
    ),
  },

  {
    slug: "optimiser-apport-2026",
    title: "Comment optimiser son apport immobilier : stratégies 2026",
    description: "Constituer, maximiser, bien placer : tout ce qu'il faut savoir pour présenter le meilleur apport possible à votre banque en 2026 et décrocher les meilleures conditions de crédit.",
    date: "Mars 2026",
    readTime: "5 min",
    tag: "Stratégie",
    tagClass: "tag-amber",
    intro: "L'apport immobilier est bien plus qu'une mise de départ : c'est le signal le plus fort que vous envoyez à votre banque. En 2026, avec des taux encore élevés, un apport optimisé peut faire économiser plusieurs milliers d'euros sur la durée du crédit.",
    Content: () => (
      <>
        <p>La règle non écrite des banques : plus votre apport est élevé, plus elles vous font confiance — et plus le taux proposé est bas. Passer de 10 % à 20 % d'apport peut faire gagner <strong>0,2 à 0,4 point de taux</strong>, soit plusieurs milliers d'euros d'économie sur 20 ans.</p>
        <h2>Apport minimum vs apport optimal</h2>
        <div className="compare-table-wrap"><table className="compare-table"><thead><tr><th>Apport</th><th>Profil perçu</th><th>Taux indicatif 2026</th><th>Mensualité (200 k€, 20 ans)</th></tr></thead><tbody><tr><td>0 % (sans apport)</td><td>Dossier fragile</td><td>4,2 %+</td><td>~1 235 €</td></tr><tr><td>10 % (minimum)</td><td>Acceptable</td><td>3,9 %</td><td>~1 205 €</td></tr><tr><td>20 % (recommandé)</td><td>Bon dossier</td><td>3,6 %</td><td>~1 170 €</td></tr><tr><td>30 %+</td><td>Dossier premium</td><td>3,3 %</td><td>~1 135 €</td></tr></tbody></table></div>
        <div className="callout callout-warn"><span className="callout-icon">⚠️</span><div className="callout-body"><strong>Piège classique :</strong> confondre apport et frais de notaire. Les frais de notaire (7–8 % dans l'ancien) sont <strong>non finançables par le crédit</strong>. Votre vrai apport = épargne disponible − frais de notaire − réserve de précaution.</div></div>
        <h2>Les meilleures enveloppes pour constituer son apport</h2>
        <ul><li><strong>Plan Épargne Logement (PEL)</strong> : taux garanti à 2,25 % brut en 2026, ouvre des droits à un prêt complémentaire. Idéal pour un achat dans 3 à 5 ans.</li><li><strong>Livret A / LDDS</strong> : 1,5 % net, totalement liquide. Parfait pour les derniers mois avant l'achat.</li><li><strong>Assurance-vie fonds euros</strong> : 2,5 à 3,5 % selon les contrats en 2025. Pour les horizons 5 ans et plus.</li></ul>
        <h2>Faut-il tout mettre en apport ?</h2>
        <div className="callout callout-tip"><span className="callout-icon">💡</span><div className="callout-body"><strong>Non.</strong> Conservez impérativement <strong>3 à 6 mois de dépenses courantes</strong> en épargne liquide après l'achat. Un chauffe-eau qui lâche ou un licenciement ne préviennent pas.</div></div>
        <h2>Les aides qui complètent l'apport</h2>
        <div className="compare-table-wrap"><table className="compare-table"><thead><tr><th>Dispositif</th><th>Montant possible</th><th>Conditions clés</th></tr></thead><tbody><tr><td>PTZ 2026</td><td>Jusqu'à 50 % du prix</td><td>Primo-accédant, plafonds revenus</td></tr><tr><td>Action Logement</td><td>Jusqu'à 40 000 €</td><td>Salarié d'entreprise &gt; 10 salariés</td></tr><tr><td>Prêt PEL</td><td>Jusqu'à 92 000 €</td><td>PEL ouvert depuis 4 ans min.</td></tr><tr><td>Donation familiale</td><td>100 k€/parent exonéré</td><td>Achat résidence principale</td></tr></tbody></table></div>
        <div className="article-divider" />
        <blockquote className="pull-quote">En 2026, l'apport idéal se situe entre 20 et 25 % du prix — suffisant pour décrocher un bon taux sans s'exposer à un manque de liquidité post-achat. Commencez à l'optimiser 2 à 3 ans avant votre projet.</blockquote>
      </>
    ),
  },
  {
    slug: "negociation-prix-immobilier-2026",
    title: "Négocier le prix d'un bien immobilier : guide 2026",
    description: "Comment négocier efficacement le prix d'un appartement ou d'une maison en 2026 ? Tactiques concrètes, arguments chiffrés et erreurs à éviter.",
    date: "29 mars 2026",
    readTime: "5 min",
    tag: "Stratégie achat",
    tagClass: "tag-green",
    intro: "En France, le prix affiché est rarement le prix final. En 2026, avec un marché qui se rééquilibre, la marge de négociation a atteint 4 à 7 % en moyenne — voici comment en profiter.",
    Content: () => (
      <>
        <p>Négocier un bien immobilier est un art qui s'apprend. Trop d'acheteurs acceptent le prix affiché par peur de perdre le bien. Pourtant, en 2026, <strong>le marché est plus favorable aux acheteurs qu'en 2020–2022</strong> : les délais de vente s'allongent, les vendeurs sont plus ouverts.</p>
        <h2>Quelle marge de négociation espérer ?</h2>
        <div className="compare-table-wrap"><table className="compare-table"><thead><tr><th>Type de marché</th><th>Marge médiane</th><th>Exemples</th></tr></thead><tbody><tr><td>Marché vendeur tendu</td><td>0–2 %</td><td>Paris intra-muros, Lyon 6e</td></tr><tr><td>Marché équilibré</td><td>3–5 %</td><td>Nantes, Bordeaux, Strasbourg</td></tr><tr><td>Marché acheteur</td><td>5–10 %</td><td>Villes moyennes, zones rurales</td></tr><tr><td>Bien avec travaux importants</td><td>10–15 %</td><td>DPE F/G, façade à refaire</td></tr></tbody></table></div>
        <h2>Les arguments qui font baisser le prix</h2>
        <ul><li><strong>Durée de mise en vente &gt; 90 jours</strong> : le vendeur commence à douter. Vérifiez sur les annonces l'historique de prix.</li><li><strong>DPE mauvais (F ou G)</strong> : vous pouvez argumenter le coût des travaux de rénovation énergétique obligatoires d'ici 2025–2028.</li><li><strong>Travaux visibles</strong> : obtenez des devis avant d'offrir. "J'ai un devis de 35 000 € pour la toiture" est un argument béton.</li><li><strong>Comparaison avec les ventes récentes</strong> : consultez les prix DVF (données de valeur foncière) du quartier pour ancrer votre offre sur le marché réel.</li></ul>
        <div className="callout callout-tip"><span className="callout-icon">💡</span><div className="callout-body"><strong>Tactique éprouvée :</strong> faites une offre raisonnée par écrit, avec un argumentaire chiffré. Une offre sérieuse avec justification est 3× plus susceptible d'être acceptée qu'une simple annonce verbale.</div></div>
        <h2>Les erreurs qui plombent la négociation</h2>
        <ul><li>Révéler votre prix maximum avant de faire une offre</li><li>Négocier verbalement sans formaliser par écrit</li><li>Trop critiquer le bien lors de la visite (le vendeur s'y attache)</li><li>Faire une offre sans avoir vérifié le financement</li></ul>
        <h2>Le bon timing pour négocier</h2>
        <p>Faites votre offre après une deuxième visite — cela montre votre sérieux. Évitez de négocier en période de fortes transactions (printemps) ; l'été ou l'automne sont plus favorables à l'acheteur.</p>
        <div className="article-divider" />
        <blockquote className="pull-quote">En 2026, une négociation bien préparée peut économiser 10 000 à 30 000 € sur un bien standard. Armez-vous de données, pas d'émotions.</blockquote>
      </>
    ),
  },
  {
    slug: "assurance-pret-changer-economiser",
    title: "Changer d'assurance emprunteur : combien économiser en 2026 ?",
    description: "Loi Lemoine : vous pouvez changer d'assurance prêt à tout moment. Calcul concret des économies possibles et démarche pas à pas.",
    date: "29 mars 2026",
    readTime: "4 min",
    tag: "Financement",
    tagClass: "tag-purple",
    intro: "Depuis la loi Lemoine (2022), vous pouvez résilier votre assurance emprunteur à tout moment. Pour un crédit de 250 000 €, l'économie peut dépasser 20 000 € sur 20 ans — et la démarche prend 2 semaines.",
    Content: () => (
      <>
        <p>L'assurance emprunteur représente <strong>25 à 35 % du coût total d'un crédit immobilier</strong>. Pourtant, la grande majorité des emprunteurs conservent l'assurance de leur banque par défaut, sans jamais comparer. La loi Lemoine a tout changé.</p>
        <h2>Ce que dit la loi Lemoine (2022)</h2>
        <p>Depuis juin 2022, vous pouvez résilier votre assurance de prêt à tout moment, sans frais, sans préavis minimum, à condition de trouver un contrat aux garanties équivalentes. C'est valable même si vous avez emprunté il y a 15 ans.</p>
        <h2>Exemple chiffré : 250 000 € sur 20 ans</h2>
        <div className="key-figures"><div className="key-figure"><span className="kf-value">0,36 %</span><span className="kf-label">Taux assurance bancaire moyen</span></div><div className="key-figure"><span className="kf-value">0,12 %</span><span className="kf-label">Taux délégation d'assurance</span></div><div className="key-figure"><span className="kf-value">~18 000 €</span><span className="kf-label">Économie sur 20 ans</span></div></div>
        <div className="compare-table-wrap"><table className="compare-table"><thead><tr><th>Profil</th><th>Assurance banque</th><th>Délégation</th><th>Économie</th></tr></thead><tbody><tr><td>35 ans, non-fumeur, cadre</td><td>~750 €/an</td><td>~250 €/an</td><td>~10 000 € sur 20 ans</td></tr><tr><td>45 ans, sportif, profession libérale</td><td>~1 200 €/an</td><td>~400 €/an</td><td>~16 000 € sur 20 ans</td></tr></tbody></table></div>
        <h2>Comment procéder en 4 étapes</h2>
        <ol style={{paddingLeft:'20px', lineHeight:'2'}}><li>Récupérez votre contrat actuel et notez les garanties clés (DC, PTIA, ITT, IPT)</li><li>Demandez des devis à des comparateurs ou assureurs alternatifs</li><li>Vérifiez l'équivalence des garanties (critères CCSF)</li><li>Envoyez la demande de substitution à votre banque (qui a 10 jours pour répondre)</li></ol>
        <div className="callout callout-tip"><span className="callout-icon">💡</span><div className="callout-body"><strong>Bon à savoir :</strong> les assureurs alternatifs comme April, Magnolia, Afi Esca ou MAIF sont souvent 40 à 60 % moins chers que les banques pour les profils standard.</div></div>
        <div className="article-divider" />
        <blockquote className="pull-quote">Pour un emprunteur de 35 ans en bonne santé, changer d'assurance de prêt est probablement la démarche financière la plus rentable par rapport au temps investi.</blockquote>
      </>
    ),
  },
  {
    slug: "calcul-budget-renovation-avant-achat",
    title: "Calculer le budget rénovation avant d'acheter : guide complet",
    description: "Comment estimer le coût des travaux avant une offre d'achat ? Grilles de prix par poste, pièges à éviter et méthode pour ne pas se retrouver à court.",
    date: "29 mars 2026",
    readTime: "5 min",
    tag: "Guide pratique",
    tagClass: "tag-teal",
    intro: "60 % des acquéreurs de biens anciens sous-estiment les travaux à prévoir. Résultat : des rénovations qui explosent le budget et remettent en question la rentabilité de l'achat. Voici comment éviter ce piège.",
    Content: () => (
      <>
        <p>Un bien à rénover peut être une excellente opportunité ou un piège financier — tout dépend de la qualité de votre estimation initiale. Avant de faire une offre, il est indispensable d'avoir une idée précise du budget travaux.</p>
        <h2>Grille de prix des travaux par poste (2026)</h2>
        <div className="compare-table-wrap"><table className="compare-table"><thead><tr><th>Poste</th><th>Coût indicatif</th><th>Priorité</th></tr></thead><tbody><tr><td>Toiture complète (100 m²)</td><td>15 000 – 30 000 €</td><td>Urgente si infiltrations</td></tr><tr><td>Isolation combles (100 m²)</td><td>2 000 – 6 000 €</td><td>Haute (CEE + MaPrimeRénov)</td></tr><tr><td>Chauffage — pompe à chaleur</td><td>8 000 – 15 000 €</td><td>Haute (obligatoire DPE F/G)</td></tr><tr><td>Électricité complète (80 m²)</td><td>6 000 – 12 000 €</td><td>Si NF C 15-100 non conforme</td></tr><tr><td>Salle de bain complète</td><td>5 000 – 15 000 €</td><td>Selon état</td></tr><tr><td>Cuisine équipée</td><td>5 000 – 20 000 €</td><td>Variable</td></tr><tr><td>Peintures + sols (80 m²)</td><td>8 000 – 20 000 €</td><td>Cosmétique</td></tr></tbody></table></div>
        <h2>La règle des 3 devis</h2>
        <p>Pour tout poste de plus de 3 000 €, obtenez systématiquement <strong>3 devis d'artisans locaux</strong> avant de formuler votre offre. L'écart entre le moins cher et le plus cher peut être de 1 à 3.</p>
        <div className="callout callout-warn"><span className="callout-icon">⚠️</span><div className="callout-body"><strong>Provision pour imprévus :</strong> ajoutez systématiquement 15 % au budget estimé pour les découvertes en cours de chantier (humidité cachée, amiante, structure). Cette provision s'avère nécessaire dans 70 % des rénovations.</div></div>
        <h2>Les aides qui allègent la facture</h2>
        <ul><li><strong>MaPrimeRénov'</strong> : jusqu'à 70 % des travaux de rénovation énergétique selon les revenus</li><li><strong>CEE (Certificats d'Économie d'Énergie)</strong> : primes versées par les fournisseurs d'énergie</li><li><strong>Éco-PTZ</strong> : prêt à taux zéro pour financer jusqu'à 50 000 € de travaux de rénovation</li></ul>
        <h2>Comment intégrer les travaux dans la négociation</h2>
        <p>Un devis obtenu avant l'offre est votre meilleur outil de négociation. "J'ai un devis de 22 000 € pour la toiture" est un argument objectif qui justifie une réduction du prix affiché.</p>
        <div className="article-divider" />
        <blockquote className="pull-quote">La règle d'or : les travaux que vous n'avez pas chiffrés avant l'achat seront toujours plus chers que prévu. Une semaine de préparation peut vous faire économiser des années de stress financier.</blockquote>
      </>
    ),
  },
  {
    slug: "investissement-locatif-premiers-pas",
    title: "Investissement locatif : par où commencer en 2026 ?",
    description: "Guide pour les débutants en investissement locatif : comment choisir son bien, calculer la rentabilité et structurer son financement en 2026.",
    date: "29 mars 2026",
    readTime: "6 min",
    tag: "Investissement",
    tagClass: "tag-blue",
    intro: "L'immobilier locatif reste l'un des investissements préférés des Français — mais se lancer sans méthode peut coûter cher. Voici la feuille de route pour un premier investissement rentable en 2026.",
    Content: () => (
      <>
        <p>L'investissement locatif combine plusieurs avantages : revenus réguliers, effet de levier du crédit, constitution de patrimoine et protection contre l'inflation. Mais il comporte aussi des risques que les débutants minimisent souvent.</p>
        <h2>Les 3 types d'investissement locatif</h2>
        <div className="compare-table-wrap"><table className="compare-table"><thead><tr><th>Type</th><th>Rentabilité brute</th><th>Gestion</th><th>Adapté à</th></tr></thead><tbody><tr><td>Location nue longue durée</td><td>3–6 %</td><td>Légère</td><td>Patrimoine stable, fiscalité régime réel</td></tr><tr><td>Location meublée (LMNP)</td><td>4–8 %</td><td>Modérée</td><td>Amortissement comptable, zones étudiantes</td></tr><tr><td>Colocation</td><td>6–10 %</td><td>Élevée</td><td>Grandes villes, rendement optimisé</td></tr></tbody></table></div>
        <h2>La règle des 7 % brut</h2>
        <p>Un investissement locatif n'est vraiment intéressant que si sa <strong>rentabilité brute dépasse 6–7 %</strong>. En dessous, après déduction des charges, impôts et vacance locative, la rentabilité nette risque d'être négative.</p>
        <div className="key-figures"><div className="key-figure"><span className="kf-value">6–7 %</span><span className="kf-label">Rentabilité brute minimale</span></div><div className="key-figure"><span className="kf-value">3–4 %</span><span className="kf-label">Rentabilité nette réaliste</span></div><div className="key-figure"><span className="kf-value">8–10 %</span><span className="kf-label">Objectif colocation</span></div></div>
        <h2>Les villes les plus rentables en 2026</h2>
        <p>Les grandes métropoles (Paris, Lyon, Bordeaux) offrent peu de rendement brut (3–4 %) mais une sécurité locative élevée. Les villes moyennes (Saint-Étienne, Mulhouse, Limoges, Roubaix) peuvent atteindre 8–12 % brut — avec un risque de vacance plus élevé.</p>
        <div className="callout callout-tip"><span className="callout-icon">💡</span><div className="callout-body"><strong>Stratégie 2026 :</strong> visez les villes universitaires de taille moyenne (Angers, Clermont-Ferrand, Caen) : demande locative forte, prix raisonnables, rentabilité autour de 6–8 % brut.</div></div>
        <h2>La fiscalité : choisir le bon régime</h2>
        <ul><li><strong>Micro-foncier</strong> : abattement forfaitaire de 30 %. Simple mais peu optimisé.</li><li><strong>Régime réel</strong> : déduisez toutes les charges réelles. Incontournable au-delà de 15 000 €/an de loyers.</li><li><strong>LMNP (meublé)</strong> : amortissez le bien sur 30 ans — souvent le plus avantageux sur 10–15 ans.</li></ul>
        <h2>Les erreurs du débutant</h2>
        <ul><li>Acheter dans sa ville par confort (et non pour la rentabilité)</li><li>Négliger la gestion locative (prévoir 7–10 % des loyers pour un gestionnaire)</li><li>Sous-estimer la vacance locative (prévoir 1 mois de vide par an en moyenne)</li><li>Oublier les charges de copropriété dans le calcul</li></ul>
        <div className="article-divider" />
        <blockquote className="pull-quote">Le meilleur investissement locatif n'est pas forcément le plus cher ni le plus proche — c'est celui dont la rentabilité nette couvre les charges ET génère un cash-flow positif dès la première année.</blockquote>
      </>
    ),
  },
  {
    slug: "separation-divorce-bien-immobilier",
    title: "Séparation ou divorce : que devient le bien immobilier ?",
    description: "Rachat de soulte, vente du bien, désolidarisation de prêt : toutes les options quand un couple propriétaire se sépare en 2026.",
    date: "29 mars 2026",
    readTime: "5 min",
    tag: "Guide pratique",
    tagClass: "tag-amber",
    intro: "1 divorce sur 3 concerne des couples propriétaires. La question du bien immobilier est souvent la plus complexe à régler. Voici les 3 scénarios possibles et leurs implications financières.",
    Content: () => (
      <>
        <p>Quand deux co-emprunteurs se séparent, le bien immobilier et le prêt associé doivent être traités ensemble. Ignorer l'un ou l'autre peut avoir des conséquences graves sur le crédit et le patrimoine de chacun.</p>
        <h2>Les 3 options principales</h2>
        <div className="compare-table-wrap"><table className="compare-table"><thead><tr><th>Option</th><th>Pour qui</th><th>Coût estimatif</th></tr></thead><tbody><tr><td>Vente du bien et partage du produit</td><td>Si accord entre les deux parties</td><td>5–8 % de frais de vente</td></tr><tr><td>Rachat de la part par l'un des deux</td><td>Si l'un peut seul soutenir le prêt</td><td>Soulte + frais notaire (1–2 %)</td></tr><tr><td>Conservation en indivision</td><td>Si enfants scolarisés, marché bas</td><td>Faible à court terme, risqué long terme</td></tr></tbody></table></div>
        <h2>Comprendre la soulte</h2>
        <p>La <strong>soulte</strong> est la somme versée par celui qui garde le bien à celui qui part. Elle correspond à la part de l'autre dans la valeur nette du bien :</p>
        <div className="key-figures"><div className="key-figure"><span className="kf-value">Valeur du bien</span><span className="kf-label">Estimation actuelle</span></div><div className="key-figure"><span className="kf-value">− Capital restant dû</span><span className="kf-label">Sur le prêt</span></div><div className="key-figure"><span className="kf-value">÷ 2 = Soulte</span><span className="kf-label">À verser à l'autre</span></div></div>
        <p><em>Exemple : bien estimé 350 000 €, capital restant dû 200 000 €. Valeur nette = 150 000 €. Soulte = 75 000 €.</em></p>
        <h2>La désolidarisation du prêt : étape cruciale</h2>
        <p>Si l'un des deux rachète le bien, il doit obtenir de la banque une <strong>désolidarisation</strong> : l'autre co-emprunteur est retiré du prêt. Sans cela, les deux restent solidairement responsables — même après divorce.</p>
        <div className="callout callout-warn"><span className="callout-icon">⚠️</span><div className="callout-body"><strong>Attention :</strong> la banque n'est pas obligée d'accepter la désolidarisation. Si les revenus de celui qui reste ne couvrent pas seul le crédit, elle peut refuser. Prévoyez un rachat de crédit chez une autre banque en solution de repli.</div></div>
        <h2>Régime matrimonial : ça change tout</h2>
        <ul><li><strong>Communauté réduite aux acquêts</strong> (par défaut) : le bien acheté pendant le mariage appartient à 50/50.</li><li><strong>Séparation de biens</strong> : chacun possède ce qu'il a apporté ou acheté à son nom.</li><li><strong>Concubins (non mariés)</strong> : l'indivision s'applique selon les parts détenues au moment de l'achat.</li></ul>
        <div className="article-divider" />
        <blockquote className="pull-quote">En cas de séparation, le premier réflexe doit être de consulter un notaire — pas un agent immobilier. C'est le notaire qui sécurisera le partage du patrimoine et la désolidarisation du prêt.</blockquote>
      </>
    ),
  },
  {
    slug: "acheter-ou-louer-en-2026",
    title: "Faut-il acheter ou louer en 2026 ? L'analyse complète",
    description: "Taux en baisse, prix qui corrigent : 2026 est-elle une bonne année pour acheter ? Analyse par ville, budget et situation personnelle.",
    date: "1 avril 2026",
    readTime: "8 min",
    tag: "Marché immobilier",
    tagClass: "tag-blue",
    intro: "En 2026, les taux immobiliers repassent sous la barre des 4 % et les prix ont corrigé de 5 à 15 % selon les villes. C'est peut-être la meilleure fenêtre d'achat depuis 2019 — mais pas pour tout le monde.",
    Content: () => (
      <>
        <p>Après deux ans de blocage du marché (2023-2024), la fenêtre se rouvre progressivement. Les taux ont reflué depuis leur pic de 4,5 % fin 2023, les vendeurs ont accepté des décotes significatives, et les banques financent à nouveau plus facilement. Faut-il en profiter maintenant, ou attendre encore ?</p>

        <h2>Le contexte immobilier en 2026</h2>
        <p>Le marché immobilier français a traversé une correction notable entre 2022 et 2025. Les prix ont reculé en moyenne de <strong>8 %</strong> au niveau national, avec des disparités importantes : Paris a perdu jusqu'à 15 %, tandis que certaines villes moyennes ont mieux résisté. En parallèle, les taux de crédit immobilier, qui avaient culminé à 4,5 % sur 20 ans fin 2023, reviennent progressivement vers la fourchette 3,5–4,0 %.</p>
        <p>Ce double mouvement — baisse des prix ET baisse des taux — crée une opportunité réelle pour les acheteurs disposant d'un apport solide. Mais la rentabilité de l'achat reste très dépendante de la durée d'occupation, de la ville et du profil de l'acheteur.</p>

        <div className="key-figures">
          <div className="key-figure">
            <span className="kf-value">3,7 %</span>
            <span className="kf-label">Taux moyen 20 ans (avril 2026)</span>
          </div>
          <div className="key-figure">
            <span className="kf-value">−8 %</span>
            <span className="kf-label">Correction prix France (2022–2025)</span>
          </div>
          <div className="key-figure">
            <span className="kf-value">3 500 €/m²</span>
            <span className="kf-label">Prix médian France entière</span>
          </div>
        </div>

        <h2>3 profils qui ont intérêt à acheter maintenant</h2>
        <p><strong>1. Les jeunes couples en CDI avec apport.</strong> Un couple avec 60 000 € d'apport, deux CDI stables et un projet de vie à 10+ ans dans la même ville est dans la configuration idéale. Le contexte 2026 leur permet d'acheter à des prix 10–15 % inférieurs au pic, avec un taux encore raisonnable.</p>
        <p><strong>2. Les investisseurs visant les villes moyennes.</strong> Dans des villes comme Rennes, Lille ou Toulouse, les rentabilités brutes oscillent entre 5 et 7 %. Avec un financement à 3,7 %, l'effet de levier redevient positif — ce qui n'était plus le cas à 4,5 %.</p>
        <p><strong>3. Les personnes stables depuis plus de 10 ans.</strong> Si vous savez que vous resterez dans la même commune pour les 10–15 prochaines années, les frais d'entrée (notaire, agence) sont largement amortis. L'achat devient presque toujours gagnant sur cet horizon.</p>

        <h2>3 profils pour qui la location reste préférable</h2>
        <p><strong>1. Les profils à forte mobilité professionnelle.</strong> Un changement de ville tous les 3–5 ans rend l'achat très coûteux : frais de notaire (7–8 %), potentielle moins-value, frais de revente. La location offre une flexibilité que l'achat ne peut pas égaler.</p>
        <p><strong>2. Les acheteurs avec moins de 10 % d'apport.</strong> Sans apport suffisant, le coût total du crédit explose et le taux d'endettement dépasse souvent les 35 % autorisés. Mieux vaut épargner 2–3 ans de plus avant de sauter le pas.</p>
        <p><strong>3. Les candidats dans les grandes métropoles très chères.</strong> À Paris (9 000–10 500 €/m²), Lyon (5 000–6 000 €/m²) ou Bordeaux (4 500–5 500 €/m²), le point d'équilibre louer/acheter dépasse souvent 15 ans. La location y reste rationnellement préférable pour la plupart des profils.</p>

        <h2>Comparatif louer vs acheter selon l'horizon de détention</h2>
        <div className="compare-table-wrap">
          <table className="compare-table">
            <thead>
              <tr><th>Horizon</th><th>Avantage louer</th><th>Avantage acheter</th><th>Verdict</th></tr>
            </thead>
            <tbody>
              <tr><td>5 ans</td><td>Pas de frais notaire, flexibilité</td><td>Début de constitution de patrimoine</td><td>Location gagne souvent</td></tr>
              <tr><td>10 ans</td><td>Épargne placée en parallèle</td><td>Frais amortis, capital remboursé</td><td>Équilibre selon ville</td></tr>
              <tr><td>15 ans</td><td>Peu d'avantages restants</td><td>Patrimoine net significatif</td><td>Achat gagne généralement</td></tr>
              <tr><td>20 ans</td><td>Aucun avantage financier net</td><td>Bien quasiment remboursé</td><td>Achat largement gagnant</td></tr>
            </tbody>
          </table>
        </div>

        <h2>Villes où acheter est rentable dès 7 ans</h2>
        <p>Certaines villes offrent un ratio prix/loyer suffisamment favorable pour que le point d'équilibre soit atteint en 7 à 9 ans seulement. C'est le cas de <strong>Rennes</strong> (point d'équilibre ~7 ans), <strong>Lille</strong> (~8 ans), <strong>Marseille</strong> (~7 ans) et <strong>Toulouse</strong> (~8 ans). Ces villes combinent des prix encore accessibles, une tension locative forte et un dynamisme économique qui soutient les valeurs immobilières.</p>

        <div className="callout callout-tip">
          <span className="callout-icon">💡</span>
          <div className="callout-body"><strong>Calculez votre situation personnelle :</strong> utilisez notre <a href="/simulateur">simulateur louer ou acheter</a> pour obtenir une analyse chiffrée adaptée à votre ville, votre apport et votre budget en moins de 2 minutes.</div>
        </div>

        <div className="article-divider" />

        <h2>Questions fréquentes</h2>

        <h3>Est-ce le bon moment d'acheter en 2026 ?</h3>
        <p>Pour les profils stables avec un apport d'au moins 10 % et un horizon de 10 ans minimum, 2026 représente une bonne fenêtre d'entrée. La combinaison baisse des prix (−8 % en moyenne) et reflux des taux (3,5–4 %) n'a pas été aussi favorable depuis 2019. Cela dit, le "bon moment" dépend avant tout de votre situation personnelle : stabilité professionnelle, géographique et financière. Aucune conjoncture favorable ne compense un achat précipité.</p>

        <h3>Dans quelles villes vaut-il mieux acheter ?</h3>
        <p>En 2026, les villes offrant le meilleur équilibre entre accessibilité, dynamisme et rentabilité sont Rennes, Lille, Toulouse, Nantes et Strasbourg. Leur point d'équilibre louer/acheter se situe entre 7 et 10 ans, contre 15 à 20 ans à Paris ou Bordeaux. Pour un investissement locatif, les villes moyennes comme Angers, Clermont-Ferrand ou Caen offrent des rendements bruts de 6 à 8 %.</p>

        <h3>Faut-il attendre une nouvelle baisse des taux ?</h3>
        <p>Les prévisions pour fin 2026 anticipent des taux autour de 3,3–3,5 % dans le scénario optimiste. Le gain sur une mensualité de 200 000 € empruntés serait d'environ 20–30 €/mois — soit moins de 4 000 € sur 20 ans. En comparaison, attendre 6 mois peut signifier rater une négociation favorable ou voir les prix remonter. Sauf si votre situation personnelle évolue d'ici là, attendre uniquement pour les taux est rarement une stratégie optimale.</p>

        <h3>Quel est le point d'équilibre louer/acheter typique ?</h3>
        <p>En France, le point d'équilibre moyen se situe entre 8 et 12 ans selon les villes. Il correspond au moment où le coût total d'un achat (mensualités + frais d'entrée + charges) devient inférieur au coût cumulé d'une location équivalente. Ce seuil est fortement impacté par la ville (prix/loyer ratio), le taux d'emprunt, le montant de l'apport et la hausse potentielle des prix. Notre simulateur calcule ce point précisément pour votre situation.</p>
      </>
    ),
  },
  {
    slug: "taux-immobilier-2026-previsions-evolution",
    title: "Taux immobilier 2026 : prévisions et conseils pour emprunter",
    description: "Taux à 3.5-4% en 2026 : analyse de l'évolution depuis le pic de 2023, prévisions jusqu'à fin 2026 et conseils pour obtenir le meilleur taux.",
    date: "1 avril 2026",
    readTime: "6 min",
    tag: "Financement",
    tagClass: "tag-green",
    intro: "Après le pic historique de 4,5 % fin 2023, les taux immobiliers ont amorcé une descente progressive. En avril 2026, le taux moyen sur 20 ans s'établit autour de 3,7 %. Où va-t-on d'ici fin 2026 ?",
    Content: () => (
      <>
        <p>La remontée des taux de 2022 à 2023 a profondément transformé le marché immobilier français : nombre de transactions en chute de 30 %, pouvoir d'achat immobilier réduit de 20 %, primo-accédants bloqués. Depuis mi-2024, la BCE a entamé un cycle d'assouplissement monétaire qui se répercute progressivement sur les taux de crédit immobilier.</p>

        <div className="key-figures">
          <div className="key-figure">
            <span className="kf-value">3,7 %</span>
            <span className="kf-label">Taux actuel 20 ans (avril 2026)</span>
          </div>
          <div className="key-figure">
            <span className="kf-value">4,5 %</span>
            <span className="kf-label">Pic historique (fin 2023)</span>
          </div>
          <div className="key-figure">
            <span className="kf-value">−0,8 pt</span>
            <span className="kf-label">Baisse depuis le pic</span>
          </div>
        </div>

        <h2>Évolution des taux depuis 2020</h2>
        <div className="compare-table-wrap">
          <table className="compare-table">
            <thead>
              <tr><th>Année</th><th>Taux moyen 20 ans</th><th>Contexte</th></tr>
            </thead>
            <tbody>
              <tr><td>2020</td><td>1,25 %</td><td>Covid, taux historiquement bas</td></tr>
              <tr><td>2021</td><td>1,10 %</td><td>Plancher historique</td></tr>
              <tr><td>2022</td><td>2,30 %</td><td>Début du resserrement BCE</td></tr>
              <tr><td>2023</td><td>4,20 %</td><td>Pic — marché quasi bloqué</td></tr>
              <tr><td>2024</td><td>3,95 %</td><td>Début de la détente</td></tr>
              <tr><td>2025</td><td>3,80 %</td><td>Poursuite de la baisse</td></tr>
              <tr><td>Avril 2026</td><td>3,70 %</td><td>Marché en reprise</td></tr>
            </tbody>
          </table>
        </div>

        <h2>Pourquoi les taux baissent en 2026</h2>
        <p>Trois facteurs principaux expliquent la détente observée depuis mi-2024 :</p>
        <ul>
          <li><strong>La BCE a baissé ses taux directeurs</strong> de 4,5 % à 2,5 % entre juin 2024 et mars 2026, réduisant le coût de refinancement des banques.</li>
          <li><strong>L'inflation européenne est revenue sous contrôle</strong>, autour de 2,2 % en zone euro début 2026, contre 10 % au pic de 2022.</li>
          <li><strong>La concurrence bancaire s'est ravivée</strong> : les banques cherchent à reconquérir des clients immobiliers après deux années de production de crédit très faible.</li>
        </ul>

        <h2>Prévisions taux pour fin 2026</h2>
        <div className="compare-table-wrap">
          <table className="compare-table">
            <thead>
              <tr><th>Scénario</th><th>Taux fin 2026</th><th>Conditions</th></tr>
            </thead>
            <tbody>
              <tr><td>Optimiste</td><td>3,2–3,4 %</td><td>BCE continue de baisser, inflation stable</td></tr>
              <tr><td>Neutre (probable)</td><td>3,4–3,6 %</td><td>Pause de la BCE au S2 2026</td></tr>
              <tr><td>Pessimiste</td><td>3,7–4,0 %</td><td>Rebond inflationniste, tensions géopolitiques</td></tr>
            </tbody>
          </table>
        </div>

        <h2>Comment en profiter : 5 conseils concrets</h2>
        <ul>
          <li><strong>Faites jouer la concurrence entre banques :</strong> un courtier peut vous faire gagner 0,2 à 0,4 point de taux, soit plusieurs milliers d'euros d'économie sur 20 ans.</li>
          <li><strong>Soignez votre dossier :</strong> relevés de compte sans incident, épargne régulière, taux d'endettement sous 30 % — ces éléments permettent d'accéder aux meilleures grilles tarifaires.</li>
          <li><strong>Optez pour une assurance emprunteur en délégation :</strong> l'assurance bancaire est souvent 2× plus chère. Une délégation peut réduire le coût total de 10 000 à 20 000 €.</li>
          <li><strong>Choisissez la bonne durée :</strong> sur 20 ans plutôt que 25 ans, le taux est généralement 0,2 à 0,3 % plus bas. Simulez les deux options selon votre capacité de remboursement.</li>
          <li><strong>N'attendez pas le taux parfait :</strong> chaque mois d'attente est un loyer payé sans constituer de patrimoine. Si votre projet est solide, agissez.</li>
        </ul>

        <div className="callout callout-tip">
          <span className="callout-icon">💡</span>
          <div className="callout-body">Simulez votre mensualité et le coût total de votre emprunt avec notre <a href="/simulateurs/pret-immobilier">calculateur de prêt immobilier</a> — gratuit et instantané.</div>
        </div>

        <div className="article-divider" />

        <h2>Questions fréquentes</h2>

        <h3>Les taux vont-ils encore baisser en 2026 ?</h3>
        <p>Le scénario central table sur une poursuite modérée de la baisse, avec des taux autour de 3,4–3,6 % en fin d'année 2026. Une baisse plus marquée est possible si la BCE accélère son cycle d'assouplissement, mais une remontée soudaine reste peu probable tant que l'inflation reste contenue. La fenêtre actuelle est favorable : attendre un hypothétique taux parfait expose à rater des biens bien négociés.</p>

        <h3>Quel est l'impact d'un point de taux sur ma mensualité ?</h3>
        <p>Pour un emprunt de 200 000 € sur 20 ans, chaque point de taux en moins représente environ 95 €/mois d'économie sur la mensualité, soit plus de 22 000 € d'intérêts économisés sur la durée totale du prêt. La différence entre 3,5 % et 4,5 % correspond donc à une économie d'environ 95 €/mois — suffisamment significatif pour motiver une bonne négociation, mais pas pour bloquer un projet solide.</p>

        <h3>Vaut-il mieux emprunter sur 20 ou 25 ans ?</h3>
        <p>Sur 25 ans, la mensualité est plus basse (environ 15 % de moins) mais le coût total du crédit est nettement plus élevé et le taux proposé est généralement 0,2 à 0,3 % supérieur. Le choix dépend de votre capacité d'endettement : si vous pouvez assumer une mensualité plus élevée sur 20 ans, c'est presque toujours plus avantageux. Simulez les deux scénarios avec votre banquier avant de décider.</p>

        <h3>Comment obtenir le meilleur taux possible ?</h3>
        <p>Plusieurs leviers permettent d'accéder aux meilleures conditions : un apport d'au moins 10 % (idéalement 20 %), un taux d'endettement sous 30 %, des revenus stables (CDI ou fonctionnaire), une épargne résiduelle après achat (reste à vivre). Passer par un courtier permet de comparer 10 à 20 banques simultanément et de négocier en position de force. La délégation d'assurance est souvent le levier le plus rapide pour réduire le coût global.</p>
      </>
    ),
  },
  {
    slug: "ptz-2026-tout-savoir",
    title: "PTZ 2026 : conditions, montants et villes éligibles",
    description: "Guide complet du Prêt à Taux Zéro 2026 : qui peut en bénéficier, dans quelles zones, pour quel montant. Tout ce qu'il faut savoir avant de demander un PTZ.",
    date: "1 avril 2026",
    readTime: "7 min",
    tag: "Aides et dispositifs",
    tagClass: "tag-purple",
    intro: "Le PTZ (Prêt à Taux Zéro) reste en 2026 l'une des aides les plus puissantes pour financer son premier achat. Avec des montants pouvant dépasser 200 000 € en Zone A bis, il peut changer radicalement votre plan de financement.",
    Content: () => (
      <>
        <p>Reconduit et élargi pour 2026, le Prêt à Taux Zéro permet aux primo-accédants de financer une partie de leur acquisition sans payer d'intérêts. Il ne finance pas l'intégralité du bien, mais il réduit significativement la mensualité globale et améliore la capacité d'emprunt des ménages aux revenus modestes et intermédiaires.</p>

        <div className="key-figures">
          <div className="key-figure">
            <span className="kf-value">0 %</span>
            <span className="kf-label">Taux d'intérêt du PTZ</span>
          </div>
          <div className="key-figure">
            <span className="kf-value">40 %</span>
            <span className="kf-label">Maximum du prix financé</span>
          </div>
          <div className="key-figure">
            <span className="kf-value">240 000 €</span>
            <span className="kf-label">Montant max Zone A bis</span>
          </div>
        </div>

        <h2>Qu'est-ce que le PTZ 2026 ?</h2>
        <p>Le PTZ est un prêt immobilier sans intérêts accordé par l'État aux primo-accédants (personnes n'ayant pas été propriétaires de leur résidence principale dans les 2 dernières années). Il vient en complément d'un prêt principal et ne peut pas financer seul un achat. Ses principales caractéristiques en 2026 :</p>
        <ul>
          <li>Réservé à la <strong>résidence principale</strong> uniquement</li>
          <li>Accessible aux <strong>primo-accédants</strong> (non-propriétaires sur 2 ans)</li>
          <li>Soumis à des <strong>plafonds de revenus</strong> selon la composition du foyer et la zone géographique</li>
          <li>Différé de remboursement possible selon les revenus (5 à 15 ans)</li>
        </ul>

        <h2>Les zones géographiques et plafonds de revenus</h2>
        <div className="compare-table-wrap">
          <table className="compare-table">
            <thead>
              <tr><th>Zone</th><th>Villes principales</th><th>Montant PTZ max (4 pers.)</th><th>Plafond revenus (4 pers.)</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>A bis</strong></td><td>Paris, petite couronne</td><td>240 000 €</td><td>74 000 €/an</td></tr>
              <tr><td><strong>A</strong></td><td>Lyon, Marseille, Côte d'Azur</td><td>216 000 €</td><td>74 000 €/an</td></tr>
              <tr><td><strong>B1</strong></td><td>Grandes agglos, DOM</td><td>189 000 €</td><td>64 000 €/an</td></tr>
              <tr><td><strong>B2</strong></td><td>Villes moyennes éligibles</td><td>153 600 €</td><td>58 000 €/an</td></tr>
              <tr><td><strong>C</strong></td><td>Zones rurales et petites villes</td><td>138 000 €</td><td>52 000 €/an</td></tr>
            </tbody>
          </table>
        </div>

        <h2>Le PTZ pour l'ancien en 2026 : la nouveauté</h2>
        <p>Depuis 2024, le PTZ a été étendu à l'achat dans l'<strong>ancien avec travaux</strong> dans les zones B2 et C. Cette mesure vise à revitaliser les centres-bourgs et à encourager la rénovation du parc existant. Pour en bénéficier, les travaux doivent représenter au moins 25 % du coût total de l'opération. En 2026, cette disposition est maintenue et appréciée notamment dans les petites villes attractives.</p>

        <div className="callout callout-warn">
          <span className="callout-icon">⚠️</span>
          <div className="callout-body"><strong>Attention :</strong> le PTZ dans l'ancien est conditionné à la nature des travaux. Ils doivent améliorer la performance énergétique du logement. Un logement classé G ou F peut bénéficier d'un PTZ majoré sous condition de rénovation.</div>
        </div>

        <h2>Simuler son PTZ : exemple concret</h2>
        <p>Prenons un couple sans enfant en Zone B1, avec des revenus nets de 55 000 €/an, souhaitant acheter un appartement neuf à 280 000 €.</p>
        <ul>
          <li>Plafond revenus Zone B1 (2 personnes) : 56 000 € → <strong>éligible</strong></li>
          <li>Montant PTZ maximum (40 % × 280 000 €) : <strong>112 000 €</strong></li>
          <li>Durée de remboursement : 20 ans avec 5 ans de différé</li>
          <li>Mensualité PTZ : 0 € pendant 5 ans, puis ~625 €/mois</li>
          <li>Prêt principal restant : 168 000 € à 3,7 % sur 20 ans → ~990 €/mois</li>
          <li><strong>Mensualité totale initiale : 990 €/mois</strong> (sans le PTZ en différé)</li>
        </ul>

        <div className="callout callout-tip">
          <span className="callout-icon">💡</span>
          <div className="callout-body">Calculez votre PTZ estimatif avec notre <a href="/simulateurs/ptz">simulateur PTZ gratuit</a> — montant, durée, mensualité avec et sans différé.</div>
        </div>

        <div className="article-divider" />

        <h2>Questions fréquentes</h2>

        <h3>Peut-on cumuler le PTZ avec d'autres aides ?</h3>
        <p>Oui, le PTZ est cumulable avec de nombreux dispositifs : prêt Action Logement (1 % patronal), prêt d'accession sociale (PAS), aides locales des collectivités, et même avec certains dispositifs de défiscalisation. Il est également cumulable avec un prêt classique. En revanche, il ne peut pas financer à lui seul l'intégralité de l'acquisition — un prêt principal est obligatoire pour compléter le financement.</p>

        <h3>Le PTZ est-il accessible aux profils modestes ?</h3>
        <p>Le PTZ est précisément conçu pour les ménages à revenus modestes et intermédiaires. Les plafonds de revenus sont fixés en fonction du nombre de personnes dans le foyer et de la zone géographique. Un célibataire avec 30 000 € de revenus nets annuels est éligible dans la plupart des zones. Le différé de remboursement (jusqu'à 15 ans sans payer le capital) permet d'alléger la mensualité en début de prêt, au moment où les revenus sont souvent plus faibles.</p>

        <h3>Le PTZ est-il valable pour un logement neuf uniquement ?</h3>
        <p>Non. Depuis la réforme de 2024, le PTZ s'applique également à l'ancien avec travaux dans les zones B2 et C. Pour le neuf, il est accessible dans toutes les zones (A bis, A, B1, B2, C). Depuis 2026, une attention particulière est portée aux logements en zones tendues pour le neuf, avec des plafonds de financement renforcés en Zone A bis et A pour favoriser la construction dans les zones où la demande est la plus forte.</p>

        <h3>Que se passe-t-il si mes revenus augmentent après avoir obtenu le PTZ ?</h3>
        <p>Une fois accordé, le PTZ n'est pas remis en question si vos revenus augmentent par la suite. Les conditions d'éligibilité sont vérifiées uniquement au moment de la demande. Le montant et les modalités de remboursement sont fixés contractuellement et ne peuvent pas être modifiés à la hausse en cas d'augmentation de salaire. En revanche, une vente anticipée du bien peut entraîner le remboursement du capital restant dû du PTZ.</p>
      </>
    ),
  },
  {
    slug: "villes-mieux-acheter-2026",
    title: "Les 10 meilleures villes où acheter en France en 2026",
    description: "Quelles villes françaises offrent le meilleur rapport loyer/prix en 2026 ? Notre classement basé sur la rentabilité réelle et le potentiel de valorisation.",
    date: "1 avril 2026",
    readTime: "7 min",
    tag: "Marché immobilier",
    tagClass: "tag-blue",
    intro: "Toutes les villes ne se valent pas en matière d'immobilier. En 2026, certaines offrent un point d'équilibre louer/acheter en moins de 8 ans, d'autres dépassent les 20 ans. Voici le classement que vous ne trouverez pas chez un agent immobilier.",
    Content: () => (
      <>
        <p>Le ratio prix d'achat / loyer annuel (PER — Price-to-Earnings Ratio immobilier) est l'indicateur le plus utile pour comparer les marchés. Un PER de 20 signifie qu'il faut 20 ans de loyers pour rembourser le prix d'achat. Plus il est bas, plus l'achat est intéressant relativement à la location.</p>

        <h2>Le classement 2026 : les 10 villes analysées</h2>
        <div className="compare-table-wrap">
          <table className="compare-table">
            <thead>
              <tr><th>Ville</th><th>Prix médian /m²</th><th>Loyer T2</th><th>Rendement brut</th><th>Point équilibre</th><th>Tension locative</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>Rennes</strong></td><td>3 900 €</td><td>750 €</td><td>6,2 %</td><td>~7 ans</td><td>Très forte</td></tr>
              <tr><td><strong>Lille</strong></td><td>3 400 €</td><td>680 €</td><td>6,5 %</td><td>~8 ans</td><td>Forte</td></tr>
              <tr><td><strong>Marseille</strong></td><td>3 200 €</td><td>720 €</td><td>7,2 %</td><td>~7 ans</td><td>Forte</td></tr>
              <tr><td><strong>Toulouse</strong></td><td>3 700 €</td><td>750 €</td><td>6,5 %</td><td>~8 ans</td><td>Très forte</td></tr>
              <tr><td><strong>Strasbourg</strong></td><td>3 500 €</td><td>700 €</td><td>6,4 %</td><td>~8 ans</td><td>Forte</td></tr>
              <tr><td><strong>Nantes</strong></td><td>3 600 €</td><td>700 €</td><td>6,2 %</td><td>~9 ans</td><td>Forte</td></tr>
              <tr><td><strong>Bordeaux</strong></td><td>4 500 €</td><td>780 €</td><td>5,5 %</td><td>~13 ans</td><td>Modérée</td></tr>
              <tr><td><strong>Lyon</strong></td><td>5 200 €</td><td>850 €</td><td>5,2 %</td><td>~14 ans</td><td>Modérée</td></tr>
              <tr><td><strong>Nice</strong></td><td>5 000 €</td><td>880 €</td><td>5,6 %</td><td>~12 ans</td><td>Modérée</td></tr>
              <tr><td><strong>Paris</strong></td><td>9 500 €</td><td>1 350 €</td><td>4,5 %</td><td>~18 ans</td><td>Très forte</td></tr>
            </tbody>
          </table>
        </div>

        <h2>Les villes dynamiques : meilleurs rapports qualité/prix</h2>
        <p><strong>Rennes</strong> s'impose comme la ville la plus équilibrée de France en 2026. Elle combine une économie dynamique (pôle tech, universités), une tension locative élevée et des prix encore accessibles. Le point d'équilibre louer/acheter y est atteint en seulement 7 ans.</p>
        <p><strong>Lille</strong> et <strong>Toulouse</strong> suivent de près. Ces deux métropoles régionales bénéficient d'une forte demande étudiante et d'un tissu économique solide. Les prix ont peu corrigé depuis 2022 (−5 % seulement), signe d'un marché sain soutenu par la demande.</p>
        <p><strong>Strasbourg</strong>, souvent oubliée dans les classements nationaux, offre une situation transfrontalière unique (forte demande allemande) et des rendements locatifs attractifs pour un chef-lieu de région.</p>

        <h2>Les villes accessibles : opportunités à saisir</h2>
        <p><strong>Marseille</strong> est la grande surprise de 2026. Longtemps boudée pour des raisons d'image, elle affiche désormais le meilleur rendement brut du classement (7,2 %) combiné à une valorisation immobilière en accélération. Les quartiers nord et est, en pleine transformation, offrent des opportunités remarquables pour les investisseurs patients.</p>
        <p><strong>Nantes</strong> a connu une correction plus marquée (−10 %) après l'euphorie de 2020-2022. Le marché y est plus équilibré en 2026, avec de bonnes perspectives grâce au dynamisme économique de la région.</p>

        <h2>Les villes patrimoniales : sécurité avant tout</h2>
        <p><strong>Paris, Lyon et Bordeaux</strong> offrent les rendements les plus faibles du classement (4,5 à 5,5 % brut) mais la sécurité locative la plus élevée. La vacance locative y est quasi nulle et la valorisation à long terme est parmi les plus solides de France. Ces marchés sont adaptés aux investisseurs cherchant la conservation du capital plutôt que le cash-flow immédiat.</p>

        <div className="callout callout-warn">
          <span className="callout-icon">⚠️</span>
          <div className="callout-body"><strong>Villes à surveiller :</strong> Bordeaux et Lyon affichent encore des PER élevés (13–14 ans) malgré la correction. Les acheteurs à court horizon (moins de 10 ans) y prennent un risque plus élevé que dans les villes du premier groupe.</div>
        </div>

        <div className="callout callout-tip">
          <span className="callout-icon">💡</span>
          <div className="callout-body">Comparez les marchés en détail avec notre <a href="/simulateurs/comparateur-villes">comparateur de villes</a> — point d'équilibre, rendement et coût mensuel calculés selon votre budget.</div>
        </div>

        <div className="article-divider" />

        <h2>Questions fréquentes</h2>

        <h3>Quelle est la ville où il fait le mieux investir en 2026 ?</h3>
        <p>Pour un investissement locatif pur, Marseille, Lille et Rennes offrent les meilleurs rendements bruts (6,2 à 7,2 %) avec une tension locative forte. Pour une résidence principale avec horizon long terme, Rennes et Toulouse combinent accessibilité des prix, dynamisme économique et point d'équilibre favorable. Paris reste une valeur patrimoniale sûre mais avec un retour sur investissement très long (18+ ans par rapport à la location).</p>

        <h3>Les prix vont-ils encore baisser dans ces villes ?</h3>
        <p>Selon les projections du marché 2026, les villes dynamiques (Rennes, Toulouse, Lille) ont globalement touché leur plancher et montrent des signes de stabilisation voire de légère reprise. À Paris et Lyon, une poursuite de la correction de 3 à 5 % supplémentaires reste possible sur certains segments premium. Dans les villes moyennes attractives, les prix sont globalement stables depuis mi-2025.</p>

        <h3>Comment choisir entre plusieurs villes pour un investissement locatif ?</h3>
        <p>Trois critères principaux doivent guider votre choix : le rendement brut (loyer annuel / prix d'achat), la tension locative (ratio demande/offre) et le potentiel de valorisation. Évitez les villes avec un rendement brut inférieur à 5 % si votre objectif est le cash-flow. Privilégiez les villes universitaires et économiquement dynamiques pour limiter le risque de vacance locative.</p>

        <h3>Faut-il acheter dans une ville qu'on ne connaît pas ?</h3>
        <p>Investir à distance est possible mais exige des précautions : choisir un gestionnaire locatif professionnel (7–10 % des loyers), vérifier physiquement le bien et le quartier, s'appuyer sur des données de marché fiables. Les villes universitaires (Rennes, Lille, Strasbourg) sont particulièrement adaptées à l'investissement à distance car la demande locative étudiante est prévisible et la saisonnalité bien connue.</p>
      </>
    ),
  },
  {
    slug: "combien-gagner-pour-acheter-appartement",
    title: "Combien faut-il gagner pour acheter un appartement en 2026 ?",
    description: "Quel salaire minimum pour acheter un studio, T2 ou T3 en 2026 ? Calculs concrets par ville et type de bien avec la règle des 35% d'endettement.",
    date: "1 avril 2026",
    readTime: "6 min",
    tag: "Financement",
    tagClass: "tag-green",
    intro: "Avec un taux d'endettement plafonné à 35 % des revenus nets, combien faut-il gagner pour acheter en 2026 ? Les réponses varient du simple au quadruple selon les villes. Voici les chiffres bruts.",
    Content: () => (
      <>
        <p>La règle des 35 % d'endettement maximum (charges de crédit / revenus nets) est appliquée de façon stricte par les banques françaises depuis 2022. C'est le premier filtre qui détermine votre capacité d'emprunt — et donc le type de bien que vous pouvez acheter selon votre salaire.</p>

        <div className="key-figures">
          <div className="key-figure">
            <span className="kf-value">35 %</span>
            <span className="kf-label">Taux d'endettement maximum</span>
          </div>
          <div className="key-figure">
            <span className="kf-value">3,8 %</span>
            <span className="kf-label">Taux moyen retenu (20 ans)</span>
          </div>
          <div className="key-figure">
            <span className="kf-value">10 %</span>
            <span className="kf-label">Apport minimum conseillé</span>
          </div>
        </div>

        <h2>Le calcul par type de logement</h2>
        <p>Le tableau ci-dessous indique, pour chaque type de bien et chaque ville, le salaire net mensuel minimum nécessaire (seul) pour emprunter sur 20 ans avec 10 % d'apport et un taux de 3,8 %.</p>
        <div className="compare-table-wrap">
          <table className="compare-table">
            <thead>
              <tr><th>Type de bien</th><th>Ville</th><th>Prix estimé</th><th>Mensualité crédit</th><th>Salaire min. (seul)</th></tr>
            </thead>
            <tbody>
              <tr><td>Studio 25 m²</td><td>Paris</td><td>230 000 €</td><td>~1 380 €</td><td>~3 950 €/mois</td></tr>
              <tr><td>Studio 25 m²</td><td>Lyon</td><td>130 000 €</td><td>~780 €</td><td>~2 230 €/mois</td></tr>
              <tr><td>Studio 25 m²</td><td>Rennes</td><td>97 500 €</td><td>~585 €</td><td>~1 670 €/mois</td></tr>
              <tr><td>T2 45 m²</td><td>Paris</td><td>427 500 €</td><td>~2 565 €</td><td>~7 330 €/mois</td></tr>
              <tr><td>T2 45 m²</td><td>Lyon</td><td>234 000 €</td><td>~1 405 €</td><td>~4 015 €/mois</td></tr>
              <tr><td>T2 45 m²</td><td>Toulouse</td><td>166 500 €</td><td>~1 000 €</td><td>~2 855 €/mois</td></tr>
              <tr><td>T3 65 m²</td><td>Paris</td><td>617 500 €</td><td>~3 705 €</td><td>~10 585 €/mois</td></tr>
              <tr><td>T3 65 m²</td><td>Bordeaux</td><td>292 500 €</td><td>~1 756 €</td><td>~5 016 €/mois</td></tr>
              <tr><td>T3 65 m²</td><td>Lille</td><td>221 000 €</td><td>~1 327 €</td><td>~3 790 €/mois</td></tr>
            </tbody>
          </table>
        </div>

        <h2>Acheter à deux : ça change tout</h2>
        <p>La plupart des achats immobiliers se font en couple. Additionner deux revenus modestes permet souvent d'accéder à des biens inaccessibles seul. Par exemple :</p>
        <ul>
          <li>Deux salaires de <strong>2 500 €/mois</strong> = capacité d'emprunt de ~250 000 € (T2 à Rennes ou T1 à Lyon)</li>
          <li>Deux salaires de <strong>3 500 €/mois</strong> = capacité d'emprunt de ~350 000 € (T3 à Lille ou T2 à Bordeaux)</li>
          <li>Deux salaires de <strong>5 000 €/mois</strong> = capacité d'emprunt de ~500 000 € (T3 à Lyon ou grand T2 à Paris)</li>
        </ul>
        <p>La règle des 35 % s'applique sur les revenus nets cumulés des deux co-emprunteurs, après déduction des éventuelles charges existantes (autre crédit, pension alimentaire...).</p>

        <h2>Avec le PTZ : les revenus s'étirent</h2>
        <p>Le Prêt à Taux Zéro permet à des ménages modestes d'acheter des biens qui semblaient hors de portée. Comme le PTZ ne génère pas d'intérêts (et souvent pas de remboursement pendant 5 ans grâce au différé), il n'impacte pas (ou peu) le taux d'endettement à court terme.</p>
        <p>Exemple : un primo-accédant seul avec 2 200 €/mois à Toulouse peut emprunter ~130 000 € en prêt classique + jusqu'à 57 000 € de PTZ (Zone B1), soit un budget total d'achat de ~187 000 € — suffisant pour un T2 correct dans de nombreux quartiers.</p>

        <div className="callout callout-tip">
          <span className="callout-icon">💡</span>
          <div className="callout-body">Calculez précisément votre capacité d'emprunt avec notre <a href="/simulateurs/endettement">simulateur d'endettement</a> et votre budget maximum avec notre <a href="/simulateurs/budget-maximum">calculateur de budget</a>.</div>
        </div>

        <div className="article-divider" />

        <h2>Questions fréquentes</h2>

        <h3>Comment est calculé le taux d'endettement ?</h3>
        <p>Le taux d'endettement est la somme de toutes vos charges de crédit mensuelle (prêt immobilier, crédit auto, crédit conso...) divisée par vos revenus nets mensuels. La limite réglementaire est de 35 %. Si vous gagnez 3 000 €/mois, vos charges de crédit totales ne peuvent pas dépasser 1 050 €/mois. Les banques regardent également le "reste à vivre" : la somme restante après remboursement de toutes les charges doit être suffisante pour vivre.</p>

        <h3>L'apport influence-t-il le salaire nécessaire ?</h3>
        <p>Oui, directement. Plus votre apport est important, moins vous empruntez, moins la mensualité est élevée, et plus le salaire nécessaire est faible. Avec 20 % d'apport au lieu de 10 %, la mensualité baisse d'environ 10 %, ce qui réduit d'autant le salaire minimum requis. Un apport de 30 % ou plus permet parfois d'obtenir un taux préférentiel, réduisant encore davantage la mensualité.</p>

        <h3>La durée du prêt joue-t-elle sur le salaire minimum ?</h3>
        <p>Oui. Emprunter sur 25 ans au lieu de 20 ans réduit la mensualité d'environ 12–15 %, ce qui abaisse le salaire minimum requis. En contrepartie, le coût total du crédit augmente significativement (plusieurs dizaines de milliers d'euros d'intérêts supplémentaires). Cette option reste utile pour les profils qui ont du mal à passer la barre des 35 % d'endettement sur 20 ans, en attendant que leurs revenus progressent.</p>

        <h3>Les primes et revenus variables sont-ils pris en compte ?</h3>
        <p>Les banques prennent en compte les primes et revenus variables avec prudence. En règle générale, elles retiennent une moyenne sur 2–3 ans (justifiée par les fiches de paie ou avis d'imposition) et appliquent parfois un abattement de 20 à 30 %. Les revenus locatifs existants sont généralement retenus à 70 % pour tenir compte du risque de vacance. Les revenus d'indépendants et auto-entrepreneurs sont évalués sur 3 exercices comptables.</p>
      </>
    ),
  },
  {
    slug: "calculer-capacite-emprunt-guide",
    title: "Comment calculer sa capacité d'emprunt : guide pratique 2026",
    description: "Guide complet pour calculer sa capacité d'emprunt en 2026. La règle des 35%, les éléments pris en compte et comment l'optimiser avant de solliciter une banque.",
    date: "1 avril 2026",
    readTime: "6 min",
    tag: "Financement",
    tagClass: "tag-green",
    intro: "Votre capacité d'emprunt détermine le budget maximum que vous pouvez consacrer à un achat immobilier. Elle dépend de vos revenus, de vos charges et du taux d'intérêt. Voici comment la calculer — et l'optimiser.",
    Content: () => (
      <>
        <p>Avant de visiter le moindre bien, connaître précisément sa capacité d'emprunt est indispensable. C'est la première information que votre banquier calculera, et elle conditionne entièrement votre budget d'achat. Comprendre la mécanique vous permet de l'optimiser avant même de rencontrer un conseiller.</p>

        <div className="key-figures">
          <div className="key-figure">
            <span className="kf-value">35 %</span>
            <span className="kf-label">Règle d'or d'endettement max</span>
          </div>
          <div className="key-figure">
            <span className="kf-value">20 ans</span>
            <span className="kf-label">Durée typique d'emprunt</span>
          </div>
          <div className="key-figure">
            <span className="kf-value">~244 k€</span>
            <span className="kf-label">Capacité pour 4 000 €/mois nets</span>
          </div>
        </div>

        <h2>La formule de calcul étape par étape</h2>
        <p>La capacité d'emprunt se calcule en trois étapes :</p>
        <ul>
          <li><strong>Étape 1 — Mensualité maximale :</strong> Revenus nets mensuels × 35 % − charges de crédit existantes. Exemple : 4 000 € × 35 % = 1 400 €/mois disponibles pour un crédit immobilier.</li>
          <li><strong>Étape 2 — Capital empruntable :</strong> Avec une mensualité de 1 400 €, un taux de 3,7 % sur 20 ans, la formule financière donne environ <strong>244 000 €</strong> de capital empruntable.</li>
          <li><strong>Étape 3 — Budget total :</strong> Capital empruntable + apport disponible − frais de notaire (7–8 % de l'ancien). Un apport de 30 000 € avec 244 000 € d'emprunt donne un budget brut de ~274 000 €, soit ~255 000 € de bien après déduction des frais de notaire.</li>
        </ul>

        <div className="compare-table-wrap">
          <table className="compare-table">
            <thead>
              <tr><th>Revenus nets/mois</th><th>Mensualité max (35 %)</th><th>Capital empruntable (20 ans, 3,7 %)</th><th>Budget avec 10 % apport</th></tr>
            </thead>
            <tbody>
              <tr><td>2 000 €</td><td>700 €</td><td>~121 500 €</td><td>~135 000 €</td></tr>
              <tr><td>3 000 €</td><td>1 050 €</td><td>~182 000 €</td><td>~202 000 €</td></tr>
              <tr><td>4 000 €</td><td>1 400 €</td><td>~244 000 €</td><td>~271 000 €</td></tr>
              <tr><td>5 000 €</td><td>1 750 €</td><td>~304 000 €</td><td>~338 000 €</td></tr>
              <tr><td>6 000 €</td><td>2 100 €</td><td>~365 000 €</td><td>~405 000 €</td></tr>
            </tbody>
          </table>
        </div>

        <h2>Ce que la banque regarde en plus des revenus</h2>
        <p>La capacité d'emprunt brute est un premier filtre, mais la banque analyse aussi :</p>
        <ul>
          <li><strong>La stabilité professionnelle :</strong> CDI et fonctionnaires sont favorisés. Les indépendants et CDD peuvent emprunter mais avec des conditions plus strictes.</li>
          <li><strong>L'historique d'épargne :</strong> Avoir un livret A bien garni et aucun découvert bancaire sur les 3 derniers mois est un signal très positif.</li>
          <li><strong>Le reste à vivre :</strong> Même en dessous de 35 % d'endettement, la banque s'assure que la somme restante après mensualité est suffisante (généralement 800–1 000 €/mois minimum par personne).</li>
          <li><strong>La gestion des comptes :</strong> Des incidents de paiement récents (rejets, découverts) peuvent bloquer un dossier même si les revenus sont bons.</li>
        </ul>

        <h2>4 façons d'augmenter sa capacité d'emprunt</h2>
        <p><strong>1. Allonger la durée du prêt.</strong> Passer de 20 à 25 ans réduit la mensualité de ~12 %, augmentant d'autant le capital empruntable. À utiliser avec parcimonie car le coût total du crédit augmente fortement.</p>
        <p><strong>2. Emprunter à deux.</strong> Un co-emprunteur double (presque) les revenus pris en compte. C'est le levier le plus puissant pour accéder à un budget plus élevé.</p>
        <p><strong>3. Réduire ses charges existantes.</strong> Rembourser par anticipation un crédit consommation avant de demander un prêt immobilier libère de la capacité d'endettement. 200 €/mois de charges en moins = ~34 000 € de capital empruntable en plus.</p>
        <p><strong>4. Augmenter son apport.</strong> Chaque euro d'apport supplémentaire réduit le capital à emprunter et améliore les conditions obtenues. Un apport de 20 % vs 10 % peut faire gagner 0,1 à 0,2 point de taux.</p>

        <div className="callout callout-tip">
          <span className="callout-icon">💡</span>
          <div className="callout-body">Utilisez notre <a href="/simulateurs/endettement">simulateur d'endettement</a> pour calculer instantanément votre capacité d'emprunt en fonction de vos revenus, charges et apport.</div>
        </div>

        <div className="article-divider" />

        <h2>Questions fréquentes</h2>

        <h3>La règle des 35 % est-elle absolue ?</h3>
        <p>La règle des 35 % est une recommandation du Haut Conseil de Stabilité Financière (HCSF), rendue contraignante pour les banques depuis 2022. Les établissements peuvent y déroger dans une limite de 20 % de leur production de crédits, généralement réservée aux profils solides (hauts revenus, apport élevé, résidence principale). En pratique, dépasser 35–37 % reste exceptionnel en 2026 même pour les très bons dossiers.</p>

        <h3>Les revenus locatifs améliorent-ils la capacité d'emprunt ?</h3>
        <p>Oui, les revenus locatifs existants (issus d'un bien déjà possédé) entrent dans le calcul de la capacité d'emprunt, mais généralement à hauteur de 70 % seulement pour tenir compte du risque de vacance. Par exemple, 1 000 €/mois de loyers perçus sont comptabilisés à 700 €/mois dans les revenus. Cette règle vaut pour les locations nues comme meublées, et s'applique aux revenus stables et déclarés.</p>

        <h3>Peut-on emprunter sans apport en 2026 ?</h3>
        <p>L'emprunt sans apport (financement à 110 %, frais de notaire inclus) est rare mais pas impossible en 2026. Il est généralement réservé aux jeunes actifs en début de carrière avec des revenus élevés et une stabilité professionnelle avérée (CDI grands groupes, fonctionnaires). La plupart des banques demandent au minimum que les frais de notaire soient couverts par l'apport (environ 7–8 % du prix pour l'ancien).</p>

        <h3>Comment comparer les offres de prêt pour maximiser ma capacité ?</h3>
        <p>Le taux nominal n'est pas le seul critère : le TAEG (Taux Annuel Effectif Global) intègre tous les frais (assurance, garantie, frais de dossier) et permet une comparaison objective. Un taux nominal bas avec une assurance chère peut être plus coûteux qu'un taux légèrement supérieur avec délégation d'assurance. Comparer 3 à 5 offres via un courtier est le moyen le plus efficace d'optimiser à la fois le taux et la capacité d'emprunt.</p>
      </>
    ),
  },
  {
    slug: "frais-notaire-2026-guide-complet",
    title: "Frais de notaire 2026 : le guide complet avec exemples",
    description: "Tout sur les frais de notaire en 2026 : composition, taux exacts, exemples pour 150k, 200k, 300k et 500k euros. Comment les réduire légalement.",
    date: "1 avril 2026",
    readTime: "5 min",
    tag: "Guide pratique",
    tagClass: "tag-amber",
    intro: "Les frais de notaire représentent 7 à 8 % du prix dans l'ancien et 2 à 3 % dans le neuf. Ils sont souvent la mauvaise surprise du premier achat. Voici leur composition exacte — et comment les réduire légalement.",
    Content: () => (
      <>
        <p>Contrairement à leur nom, les « frais de notaire » ne vont pas en majorité dans la poche du notaire. Ils se décomposent en trois parties : les droits de mutation (impôts reversés à l'État et aux collectivités), les débours (frais administratifs avancés par le notaire) et les honoraires du notaire proprement dits. Comprendre cette structure permet d'identifier les leviers de réduction.</p>

        <div className="key-figures">
          <div className="key-figure">
            <span className="kf-value">7–8 %</span>
            <span className="kf-label">Frais dans l'ancien</span>
          </div>
          <div className="key-figure">
            <span className="kf-value">2–3 %</span>
            <span className="kf-label">Frais dans le neuf</span>
          </div>
          <div className="key-figure">
            <span className="kf-value">5,8 %</span>
            <span className="kf-label">Droits de mutation (taux plein)</span>
          </div>
        </div>

        <h2>La composition détaillée des frais de notaire</h2>
        <div className="compare-table-wrap">
          <table className="compare-table">
            <thead>
              <tr><th>Composante</th><th>% approximatif</th><th>À qui ?</th><th>Négociable ?</th></tr>
            </thead>
            <tbody>
              <tr><td>Droits de mutation (taxe)</td><td>5,8 %</td><td>État + département + commune</td><td>Non</td></tr>
              <tr><td>Contribution sécurité immobilière</td><td>0,10 %</td><td>État</td><td>Non</td></tr>
              <tr><td>Émoluments du notaire</td><td>0,8–1,0 %</td><td>Notaire (tarif réglementé)</td><td>Légèrement au-delà de 150 k€</td></tr>
              <tr><td>Débours (frais admin.)</td><td>~0,10 %</td><td>Tiers (cadastre, hypothèque...)</td><td>Non</td></tr>
              <tr><td>TVA sur émoluments</td><td>~0,17 %</td><td>État</td><td>Non</td></tr>
            </tbody>
          </table>
        </div>

        <h2>Exemples concrets par prix d'achat</h2>
        <div className="compare-table-wrap">
          <table className="compare-table">
            <thead>
              <tr><th>Prix du bien</th><th>Frais notaire (ancien)</th><th>Frais notaire (neuf)</th><th>Économie neuf vs ancien</th></tr>
            </thead>
            <tbody>
              <tr><td>150 000 €</td><td>~11 250 € (7,5 %)</td><td>~3 750 € (2,5 %)</td><td>7 500 €</td></tr>
              <tr><td>200 000 €</td><td>~15 000 € (7,5 %)</td><td>~5 000 € (2,5 %)</td><td>10 000 €</td></tr>
              <tr><td>300 000 €</td><td>~22 500 € (7,5 %)</td><td>~7 500 € (2,5 %)</td><td>15 000 €</td></tr>
              <tr><td>500 000 €</td><td>~37 500 € (7,5 %)</td><td>~12 500 € (2,5 %)</td><td>25 000 €</td></tr>
            </tbody>
          </table>
        </div>

        <h2>Comment réduire ses frais de notaire légalement</h2>
        <p><strong>1. Déduire la valeur du mobilier.</strong> Si le bien est vendu avec de l'électroménager, une cuisine équipée ou du mobilier, leur valeur peut être soustraite du prix de vente. Les droits de mutation ne s'appliquent pas au mobilier. Économie typique : 1 000 à 5 000 € selon le bien.</p>
        <p><strong>2. Acheter dans le neuf.</strong> Les droits de mutation sont remplacés par la TVA (déjà incluse dans le prix), réduisant les frais de 5 à 6 points. L'économie est significative mais le prix au m² du neuf est généralement 15–20 % supérieur à l'ancien.</p>
        <p><strong>3. Négocier les honoraires du notaire.</strong> Pour les biens supérieurs à 150 000 €, le notaire peut appliquer une remise sur ses émoluments (jusqu'à 20 % légalement depuis 2016). Cette remise est discrétionnaire et souvent accordée sur demande explicite pour les transactions importantes.</p>
        <p><strong>4. Choisir un logement en zone ANRU ou QPV.</strong> Dans les quartiers prioritaires de la politique de la ville, les droits de mutation sont réduits. Renseignez-vous auprès de votre notaire sur l'éligibilité du bien visé.</p>

        <div className="callout callout-tip">
          <span className="callout-icon">💡</span>
          <div className="callout-body">Calculez les frais de notaire exacts de votre achat avec notre <a href="/simulateurs/frais-notaire">simulateur de frais de notaire</a> — résultat détaillé en moins d'une minute.</div>
        </div>

        <div className="callout callout-warn">
          <span className="callout-icon">⚠️</span>
          <div className="callout-body"><strong>Erreur fréquente :</strong> inclure les frais de notaire dans son emprunt immobilier. La plupart des banques refusent de les financer. Ils doivent être couverts par votre apport personnel — à prévoir absolument dans votre budget.</div>
        </div>

        <div className="article-divider" />

        <h2>Questions fréquentes</h2>

        <h3>Peut-on financer les frais de notaire avec le prêt immobilier ?</h3>
        <p>En théorie, certaines banques acceptent de financer les frais de notaire dans le cadre d'un prêt à 110 % (prix + frais). En pratique en 2026, c'est très rare et réservé aux profils exceptionnels (hauts revenus, stabilité absolue, bien en dessous de leur capacité d'emprunt). Dans l'immense majorité des cas, les frais de notaire doivent être couverts par l'apport personnel. C'est pourquoi les banques recommandent un apport minimum de 10–15 % pour les achats dans l'ancien.</p>

        <h3>Les frais de notaire sont-ils les mêmes partout en France ?</h3>
        <p>Les droits de mutation varient légèrement selon les départements. La plupart ont opté pour le taux maximum de 4,5 % (part départementale), auxquels s'ajoutent les parts communales et la taxe nationale. Quelques départements (Indre, Isère, Morbihan, Mayotte) appliquent un taux réduit. L'écart reste toutefois modeste (moins de 0,5 %). Les émoluments du notaire sont eux fixés nationalement par décret et identiques dans toute la France.</p>

        <h3>Y a-t-il des frais de notaire réduits pour les primo-accédants ?</h3>
        <p>Il n'existe pas de réduction générale des frais de notaire spécifique aux primo-accédants sur les achats dans l'ancien. En revanche, l'achat dans le neuf (2–3 % de frais) est une option souvent plus accessible pour un premier achat. Certaines collectivités proposent des aides couvrant partiellement les frais de notaire. Par ailleurs, le PTZ peut indirectement aider en réduisant l'emprunt principal, libérant de l'apport pour couvrir les frais.</p>

        <h3>Quand faut-il payer les frais de notaire ?</h3>
        <p>Les frais de notaire sont réglés le jour de la signature de l'acte authentique de vente chez le notaire — et non lors du compromis ou de la promesse de vente. Ils sont payés simultanément au prix de vente, généralement par virement bancaire ou chèque de banque. Le notaire vous communique le montant exact environ 10 à 15 jours avant la signature. Prévoyez toujours une légère marge (5–10 %) par rapport aux estimations initiales.</p>
      </>
    ),
  },
  {
    slug: "premier-achat-immobilier-guide-primo",
    title: "Premier achat immobilier : le guide du primo-accédant 2026",
    description: "Tout ce que doit savoir un primo-accédant avant d'acheter en 2026 : PTZ, frais de notaire réduits, aides locales et étapes clés de l'achat.",
    date: "1 avril 2026",
    readTime: "8 min",
    tag: "Primo-accédant",
    tagClass: "tag-orange",
    intro: "Acheter pour la première fois est une étape majeure — et souvent stressante. Entre le budget, les aides, les démarches et les pièges à éviter, voici le guide complet pour réussir son premier achat immobilier en 2026.",
    Content: () => (
      <>
        <p>Le primo-accédant bénéficie en 2026 d'un contexte particulièrement favorable : taux en repli, prix corrigés de 5 à 15 % selon les villes, et un arsenal d'aides publiques maintenu et élargi. Mais la complexité administrative et les erreurs de débutant peuvent transformer ce projet de vie en cauchemar financier. Ce guide vous donne toutes les clés.</p>

        <div className="key-figures">
          <div className="key-figure">
            <span className="kf-value">7–8 %</span>
            <span className="kf-label">Frais de notaire dans l'ancien</span>
          </div>
          <div className="key-figure">
            <span className="kf-value">2–3 %</span>
            <span className="kf-label">Frais de notaire dans le neuf</span>
          </div>
          <div className="key-figure">
            <span className="kf-value">240 k€</span>
            <span className="kf-label">PTZ max en Zone A bis</span>
          </div>
        </div>

        <h2>Les aides réservées aux primo-accédants</h2>
        <p><strong>Le PTZ (Prêt à Taux Zéro)</strong> est la reine des aides. Réservé aux primo-accédants avec conditions de ressources, il permet de financer jusqu'à 40 % du prix d'achat sans payer d'intérêts. En 2026, il est étendu à l'ancien avec travaux dans les zones B2 et C.</p>
        <p><strong>Le prêt Action Logement (1 % patronal)</strong> est accessible aux salariés d'entreprises de plus de 10 employés. Il peut financer jusqu'à 40 000 € à taux préférentiel (environ 1,5 %) pour l'achat de la résidence principale.</p>
        <p><strong>Les aides locales</strong> sont souvent méconnues mais significatives. De nombreuses régions, départements et communes proposent des prêts à taux zéro complémentaires, des subventions à l'achat ou des aides à la rénovation énergétique. Renseignez-vous systématiquement auprès de votre mairie et du conseil régional.</p>

        <h2>Les 10 étapes de mon premier achat</h2>
        <div className="compare-table-wrap">
          <table className="compare-table">
            <thead>
              <tr><th>Étape</th><th>Action</th><th>Durée typique</th></tr>
            </thead>
            <tbody>
              <tr><td>1</td><td>Calculer sa capacité d'emprunt et son budget maximum</td><td>1 jour</td></tr>
              <tr><td>2</td><td>Consulter un courtier et obtenir une simulation bancaire</td><td>1–2 semaines</td></tr>
              <tr><td>3</td><td>Définir ses critères et démarrer les visites</td><td>2–8 semaines</td></tr>
              <tr><td>4</td><td>Faire une offre d'achat écrite</td><td>Immédiat</td></tr>
              <tr><td>5</td><td>Signer le compromis de vente chez le notaire</td><td>2–4 semaines après offre</td></tr>
              <tr><td>6</td><td>Constituer son dossier bancaire complet</td><td>1–2 semaines</td></tr>
              <tr><td>7</td><td>Recevoir et accepter l'offre de prêt</td><td>3–6 semaines</td></tr>
              <tr><td>8</td><td>Respecter le délai de réflexion légal (11 jours)</td><td>11 jours</td></tr>
              <tr><td>9</td><td>Signer l'acte authentique de vente chez le notaire</td><td>3–4 mois après compromis</td></tr>
              <tr><td>10</td><td>Récupérer les clés et emménager</td><td>Jour J</td></tr>
            </tbody>
          </table>
        </div>

        <h2>Les erreurs classiques du primo-accédant</h2>
        <ul>
          <li><strong>Négliger les frais annexes :</strong> frais de notaire (7–8 %), frais d'agence, travaux, déménagement... Prévoyez 10–15 % de frais supplémentaires au-delà du prix affiché.</li>
          <li><strong>Tomber amoureux d'un bien avant d'avoir son accord de principe :</strong> sans validation bancaire préalable, une offre d'achat peut être suivie d'un refus de prêt dévastateur.</li>
          <li><strong>Sous-estimer les charges de copropriété :</strong> avant de signer, demandez les procès-verbaux des 3 dernières AG et les appels de charges. Des travaux votés peuvent alourdir la facture de plusieurs milliers d'euros.</li>
          <li><strong>Ignorer le DPE :</strong> un logement F ou G subira une décote croissante et sera interdit à la location dès 2028 (classe G) puis 2034 (classe F). Anticipez le coût des travaux de rénovation.</li>
          <li><strong>Ne pas renégocier le prix après diagnostic :</strong> les diagnostics obligatoires (amiante, plomb, termites...) peuvent révéler des défauts qui justifient une renégociation de 5 à 15 % du prix.</li>
        </ul>

        <div className="callout callout-tip">
          <span className="callout-icon">💡</span>
          <div className="callout-body">Estimez votre PTZ et votre plan de financement complet avec notre <a href="/simulateurs/ptz">simulateur PTZ</a> — gratuit et sans inscription.</div>
        </div>

        <div className="article-divider" />

        <h2>Questions fréquentes</h2>

        <h3>Suis-je encore primo-accédant si j'ai été propriétaire il y a 5 ans ?</h3>
        <p>Oui. La définition officielle du primo-accédant pour le PTZ est de ne pas avoir été propriétaire de sa résidence principale au cours des 2 années précédant la demande de prêt. Si vous avez vendu votre bien il y a plus de 2 ans, vous êtes à nouveau éligible au PTZ et aux aides primo-accédant. Cette règle s'applique également aux personnes divorcées qui ont cédé leur part dans le cadre du divorce.</p>

        <h3>Combien faut-il d'apport pour un premier achat ?</h3>
        <p>L'apport minimum recommandé est de 10 % du prix d'achat, qui correspond approximativement aux frais de notaire dans l'ancien. Les banques préfèrent 10–20 % pour accorder des conditions favorables. En dessous de 10 %, le financement à 110 % (prix + frais) est rare et réservé aux très bons dossiers. Le PTZ peut partiellement remplacer une partie de l'apport en finançant une part du bien sans intérêts.</p>

        <h3>Faut-il passer par un courtier pour un premier achat ?</h3>
        <p>Faire appel à un courtier est vivement recommandé pour un primo-accédant. Le courtier négocie simultanément auprès de 10 à 20 banques, connaît les politiques de crédit de chaque établissement et sait présenter un dossier sous son meilleur jour. Ses honoraires (environ 1 % du prêt, plafonnés à 3 000 €) sont largement compensés par les économies réalisées sur le taux et les conditions. Beaucoup de courtiers ne facturent que si le prêt est accepté.</p>

        <h3>Peut-on acheter seul pour un premier achat ?</h3>
        <p>Absolument. Acheter seul est tout à fait possible, à condition que vos revenus permettent de passer la barre des 35 % d'endettement. Seul, votre capacité d'emprunt est plus limitée, mais vous gardez l'entière liberté de décision et évitez les complications juridiques d'un co-emprunt (solidarité en cas de séparation, accord nécessaire pour vendre...). Dans les villes où les prix sont accessibles (moins de 200 000 € pour un T2), un célibataire avec 2 500–3 000 €/mois peut tout à fait financer son premier achat.</p>
      </>
    ),
  },
  {
    slug: "investissement-locatif-villes-2026",
    title: "Investissement locatif 2026 : quelle ville choisir ?",
    description: "Classement des meilleures villes pour un investissement locatif en 2026. Rendement brut, tension locative et fiscalité : tout pour choisir le bon marché.",
    date: "1 avril 2026",
    readTime: "7 min",
    tag: "Investissement",
    tagClass: "tag-red",
    intro: "Tous les marchés immobiliers ne se valent pas pour un investisseur. Rendement brut, vacance locative, fiscalité, potentiel de valorisation : voici le classement complet des villes françaises pour investir en 2026.",
    Content: () => (
      <>
        <p>L'investissement locatif retrouve des couleurs en 2026. Avec des taux de crédit revenant vers 3,5–4 % et des prix corrigés dans de nombreuses villes, l'effet de levier du crédit redevient positif dans de nombreux marchés. Mais choisir la bonne ville reste déterminant : un écart de 2 points de rendement peut représenter des milliers d'euros de différence annuelle.</p>

        <h2>Le classement complet : rendement et risque</h2>
        <div className="compare-table-wrap">
          <table className="compare-table">
            <thead>
              <tr><th>Ville</th><th>Prix /m²</th><th>Loyer /m²/mois</th><th>Rendement brut</th><th>Tension locative</th><th>Risque vacance</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>Saint-Étienne</strong></td><td>1 100 €</td><td>7,5 €</td><td>8,2 %</td><td>Modérée</td><td>Élevé</td></tr>
              <tr><td><strong>Mulhouse</strong></td><td>1 400 €</td><td>8,0 €</td><td>6,9 %</td><td>Modérée</td><td>Modéré</td></tr>
              <tr><td><strong>Limoges</strong></td><td>1 500 €</td><td>7,8 €</td><td>6,2 %</td><td>Faible</td><td>Modéré</td></tr>
              <tr><td><strong>Toulouse</strong></td><td>3 700 €</td><td>14,5 €</td><td>4,7 %</td><td>Très forte</td><td>Très faible</td></tr>
              <tr><td><strong>Nantes</strong></td><td>3 600 €</td><td>13,8 €</td><td>4,6 %</td><td>Forte</td><td>Faible</td></tr>
              <tr><td><strong>Rennes</strong></td><td>3 900 €</td><td>15,0 €</td><td>4,6 %</td><td>Très forte</td><td>Très faible</td></tr>
              <tr><td><strong>Strasbourg</strong></td><td>3 500 €</td><td>13,5 €</td><td>4,6 %</td><td>Forte</td><td>Faible</td></tr>
              <tr><td><strong>Bordeaux</strong></td><td>4 500 €</td><td>15,0 €</td><td>4,0 %</td><td>Forte</td><td>Faible</td></tr>
              <tr><td><strong>Lyon</strong></td><td>5 200 €</td><td>16,0 €</td><td>3,7 %</td><td>Très forte</td><td>Très faible</td></tr>
              <tr><td><strong>Paris</strong></td><td>9 500 €</td><td>28,0 €</td><td>3,5 %</td><td>Extrême</td><td>Quasi nulle</td></tr>
            </tbody>
          </table>
        </div>

        <h2>Les villes à fort rendement</h2>
        <p><strong>Saint-Étienne</strong> affiche le rendement brut le plus élevé de France (8,2 %), mais avec un risque de vacance locative significatif. Le déclin démographique de la ville impose une sélection rigoureuse des quartiers (proximité des universités et du centre). Profil adapté : investisseur expérimenté avec forte tolérance au risque.</p>
        <p><strong>Mulhouse</strong> offre un meilleur équilibre rendement/risque que Saint-Étienne. Sa situation transfrontalière attire des actifs travaillant en Suisse ou en Allemagne, ce qui soutient la demande locative. Les quartiers proche gare et le secteur Dornach sont les plus porteurs.</p>
        <p><strong>Limoges</strong> est une ville universitaire en transformation, avec un rendement brut de 6,2 % et des prix parmi les plus bas de France. La tension locative reste faible mais la présence de deux universités et d'une école d'ingénieurs offre une base locative étudiante stable.</p>

        <h2>Les villes équilibrées</h2>
        <p><strong>Toulouse, Nantes, Rennes et Strasbourg</strong> constituent le cœur de gamme de l'investissement locatif en 2026. Leur rendement brut (4,5–4,7 %) est inférieur aux villes précédentes, mais leur tension locative très forte réduit quasi-nul le risque de vacance. Ces villes combinent une économie dynamique, une forte population étudiante et un bassin d'emploi attractif qui soutient la valorisation des biens à long terme.</p>

        <div className="callout callout-tip">
          <span className="callout-icon">💡</span>
          <div className="callout-body"><strong>Stratégie gagnante :</strong> dans ces villes équilibrées, la location meublée (LMNP) offre une fiscalité plus avantageuse que la location nue et des loyers 15–20 % supérieurs pour un bien équipé. Le statut LMNP permet d'amortir le bien et de réduire significativement la fiscalité sur les revenus locatifs.</div>
        </div>

        <h2>Les villes patrimoniales</h2>
        <p><strong>Paris, Lyon et Bordeaux</strong> offrent les rendements bruts les plus faibles du classement (3,5–4,0 %). En revanche, la sécurité locative y est maximale et la valorisation à long terme régulière. Ces marchés sont adaptés aux investisseurs qui cherchent à constituer un patrimoine de qualité avec une prise de risque minimale, quitte à renoncer à un cash-flow immédiat.</p>
        <p>À Paris notamment, la rareté du foncier et les barrières à la construction garantissent une valorisation structurelle sur le long terme, malgré des rendements bruts insuffisants pour dégager un cash-flow positif avec un financement à crédit.</p>

        <h2>LMNP vs location nue en 2026</h2>
        <div className="compare-table-wrap">
          <table className="compare-table">
            <thead>
              <tr><th>Critère</th><th>Location nue</th><th>LMNP (meublé)</th></tr>
            </thead>
            <tbody>
              <tr><td>Loyer possible</td><td>Base 100</td><td>+15 à +20 %</td></tr>
              <tr><td>Fiscalité (régime réel)</td><td>Revenus fonciers imposables</td><td>Amortissement du bien possible</td></tr>
              <tr><td>Durée de bail</td><td>3 ans minimum</td><td>1 an (9 mois étudiant)</td></tr>
              <tr><td>Charges propriétaire</td><td>Faibles</td><td>Équipement et renouvellement</td></tr>
              <tr><td>Profil locataire</td><td>Famille, long terme</td><td>Étudiant, professionnel mobile</td></tr>
            </tbody>
          </table>
        </div>

        <div className="callout callout-tip">
          <span className="callout-icon">💡</span>
          <div className="callout-body">Calculez la rentabilité nette de votre investissement locatif avec notre <a href="/simulateurs/rentabilite-locative">simulateur de rentabilité locative</a> — charges, fiscalité et cash-flow inclus.</div>
        </div>

        <div className="article-divider" />

        <h2>Questions fréquentes</h2>

        <h3>Quel rendement brut minimum viser pour un investissement rentable ?</h3>
        <p>En 2026, avec des taux d'emprunt autour de 3,7 %, un rendement brut minimum de 5 % est généralement nécessaire pour espérer un cash-flow neutre ou positif après déduction des charges (taxe foncière, assurance, gestion, copropriété) et de la fiscalité. En dessous de 5 %, l'investissement génère un effort d'épargne mensuel ("effort de trésorerie") que l'investisseur doit financer sur ses revenus courants — acceptable uniquement si la valorisation à long terme compense.</p>

        <h3>Faut-il investir dans le neuf ou l'ancien ?</h3>
        <p>L'ancien offre généralement un meilleur rendement brut (prix plus bas) mais exige souvent des travaux et génère des contraintes liées au DPE. Le neuf est plus cher (15–20 % au-dessus de l'ancien) mais bénéficie de frais de notaire réduits (2–3 %), de garanties constructeur, et d'une meilleure performance énergétique. En 2026, l'ancien rénové (classe C ou D) après travaux présente souvent le meilleur compromis rendement/risque dans les villes dynamiques.</p>

        <h3>Comment gérer un bien locatif à distance ?</h3>
        <p>La gestion à distance nécessite de déléguer à un administrateur de biens professionnel (7–10 % des loyers). Ce coût doit être intégré dans le calcul de rentabilité dès le départ. Choisissez un gestionnaire local connu sur le marché visé, vérifiez ses références et ses taux de vacance moyens. Les plateformes numériques de gestion locative permettent un suivi en temps réel (loyers, états des lieux, interventions) et réduisent les frictions à distance.</p>

        <h3>La loi encadrement des loyers impacte-t-elle toutes les villes ?</h3>
        <p>L'encadrement des loyers s'applique en 2026 dans une vingtaine de villes françaises ayant obtenu le statut de "zone tendue" : Paris, Lyon, Bordeaux, Montpellier, Lille, Rennes, Grenoble, Strasbourg, entre autres. Dans ces villes, le loyer fixé ne peut pas dépasser un loyer de référence majoré de 20 %. Cela contraint les rendements potentiels mais n'empêche pas d'investir — il faut simplement intégrer cette contrainte dans le calcul dès l'achat.</p>
      </>
    ),
  },
  {
    slug: "dpe-renovation-impact-valeur-bien",
    title: "DPE et rénovation énergétique : impact sur la valeur de votre bien",
    description: "Comment le DPE impacte le prix d'un bien immobilier en 2026 ? Décotes passoires thermiques, aides à la rénovation et retour sur investissement des travaux.",
    date: "1 avril 2026",
    readTime: "6 min",
    tag: "Rénovation",
    tagClass: "tag-amber",
    intro: "En 2026, le DPE n'est plus qu'une formalité administrative : il impacte directement le prix de vente, la possibilité de louer et le coût de financement. Un logement classé G peut perdre 17 % de sa valeur. Voici ce qu'il faut savoir.",
    Content: () => (
      <>
        <p>Le Diagnostic de Performance Énergétique (DPE) est devenu un critère central du marché immobilier français. Depuis 2021, il est opposable (le vendeur peut être poursuivi en cas d'erreur), et depuis 2023 les premières interdictions de location ont commencé à s'appliquer. En 2026, l'impact sur les prix est bien documenté et les acheteurs l'intègrent systématiquement dans leurs négociations.</p>

        <div className="key-figures">
          <div className="key-figure">
            <span className="kf-value">−17 %</span>
            <span className="kf-label">Décote moyenne classe G</span>
          </div>
          <div className="key-figure">
            <span className="kf-value">−12 %</span>
            <span className="kf-label">Décote moyenne classe F</span>
          </div>
          <div className="key-figure">
            <span className="kf-value">+8 %</span>
            <span className="kf-label">Prime classe A ou B</span>
          </div>
        </div>

        <h2>Les décotes selon la classe DPE</h2>
        <div className="compare-table-wrap">
          <table className="compare-table">
            <thead>
              <tr><th>Classe DPE</th><th>Consommation (kWh/m²/an)</th><th>Impact prix estimé</th><th>Statut location 2026</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>A</strong></td><td>&lt; 70</td><td>+8 %</td><td>Libre</td></tr>
              <tr><td><strong>B</strong></td><td>70–110</td><td>+4 %</td><td>Libre</td></tr>
              <tr><td><strong>C</strong></td><td>111–180</td><td>Référence</td><td>Libre</td></tr>
              <tr><td><strong>D</strong></td><td>181–250</td><td>−3 %</td><td>Libre</td></tr>
              <tr><td><strong>E</strong></td><td>251–330</td><td>−7 %</td><td>Libre (gel loyer)</td></tr>
              <tr><td><strong>F</strong></td><td>331–420</td><td>−12 %</td><td>Interdit dès 2034 (gel loyer)</td></tr>
              <tr><td><strong>G</strong></td><td>&gt; 420</td><td>−17 %</td><td>Interdit depuis jan. 2025</td></tr>
            </tbody>
          </table>
        </div>

        <h2>Logements interdits à la location : le calendrier</h2>
        <p>La loi Climat et Résilience a instauré un calendrier progressif d'interdiction de mise en location des passoires thermiques :</p>
        <ul>
          <li><strong>Depuis janvier 2025 :</strong> les logements classés <strong>G</strong> ne peuvent plus être mis en location (nouveaux contrats). Les contrats existants ne peuvent pas être renouvelés ou reconduites.</li>
          <li><strong>Dès 2028 :</strong> les logements classés <strong>F</strong> rejoindront les G dans l'interdiction de location.</li>
          <li><strong>Dès 2034 :</strong> les logements classés <strong>E</strong> seront également interdits à la location.</li>
        </ul>

        <div className="callout callout-warn">
          <span className="callout-icon">⚠️</span>
          <div className="callout-body"><strong>Pour les investisseurs :</strong> acheter un logement F ou G en 2026 sans plan de rénovation est risqué. En plus de la décote à l'achat, vous ne pouvez pas le louer (G) ou ne pourrez plus le louer sous 2 ans (F). Le coût de rénovation doit être intégré dans le prix d'achat cible.</div>
        </div>

        <h2>Les aides à la rénovation en 2026</h2>
        <p><strong>MaPrimeRénov'</strong> reste le dispositif phare en 2026. Cette aide de l'État (gérée par l'ANAH) finance une partie des travaux de rénovation énergétique selon les revenus du ménage et le gain énergétique visé. Les montants peuvent atteindre 70 % des travaux pour les ménages aux revenus très modestes.</p>
        <p><strong>Les Certificats d'Économies d'Énergie (CEE)</strong> sont versés par les fournisseurs d'énergie obligés. Cumulables avec MaPrimeRénov', ils peuvent financer 10 à 30 % supplémentaires selon les travaux.</p>
        <p><strong>L'éco-PTZ</strong> (éco-Prêt à Taux Zéro) permet de financer jusqu'à 50 000 € de travaux de rénovation sans intérêts. Il est cumulable avec MaPrimeRénov' et ne nécessite pas de conditions de ressources.</p>

        <h2>ROI des travaux de rénovation</h2>
        <div className="compare-table-wrap">
          <table className="compare-table">
            <thead>
              <tr><th>Type de travaux</th><th>Coût moyen (avant aides)</th><th>Gain DPE possible</th><th>Économie annuelle chauffage</th><th>Retour sur invest.</th></tr>
            </thead>
            <tbody>
              <tr><td>Isolation combles</td><td>3 000–6 000 €</td><td>1 classe</td><td>300–600 €</td><td>7–10 ans</td></tr>
              <tr><td>Isolation murs extérieurs</td><td>15 000–30 000 €</td><td>2 classes</td><td>800–1 500 €</td><td>12–20 ans</td></tr>
              <tr><td>Remplacement chaudière fioul → pompe à chaleur</td><td>10 000–20 000 €</td><td>2–3 classes</td><td>1 000–2 000 €</td><td>8–12 ans</td></tr>
              <tr><td>Rénovation globale (G → C)</td><td>40 000–80 000 €</td><td>4–5 classes</td><td>2 000–4 000 €</td><td>15–25 ans</td></tr>
            </tbody>
          </table>
        </div>
        <p>Le retour sur investissement des travaux de rénovation s'améliore considérablement quand on intègre la <strong>revalorisation du bien</strong> et les <strong>aides financières disponibles</strong>. Une rénovation G→C sur un bien de 200 000 € peut générer une plus-value de 30 000 à 40 000 € (décote supprimée + prime de valeur verte), en plus des économies de chauffage.</p>

        <div className="callout callout-tip">
          <span className="callout-icon">💡</span>
          <div className="callout-body">Estimez l'impact du DPE sur la valeur de votre bien et le ROI d'une rénovation avec notre <a href="/simulateurs/impact-dpe">simulateur d'impact DPE</a>.</div>
        </div>

        <div className="article-divider" />

        <h2>Questions fréquentes</h2>

        <h3>Le DPE peut-il être amélioré facilement ?</h3>
        <p>Certains travaux améliorent significativement le DPE pour un coût modéré. L'isolation des combles perdus est souvent le meilleur rapport coût/bénéfice : pour 3 000 à 6 000 € (avant aides), elle permet de gagner 1 à 2 classes DPE. Le remplacement d'une chaudière vétuste par une pompe à chaleur est également très efficace pour les logements chauffés au fioul ou à l'électricité classique. En revanche, passer de F à C ou mieux nécessite généralement une rénovation globale coûteuse.</p>

        <h3>Un DPE défavorable empêche-t-il la vente d'un bien ?</h3>
        <p>Non, un DPE F ou G n'empêche pas la vente d'un bien en 2026. En revanche, il oblige le vendeur à informer l'acheteur des contraintes associées (interdiction de louer pour les G, obligation de travaux à venir) et justifie légitimement une négociation sur le prix. Les notaires doivent mentionner le DPE dans l'acte de vente et informer l'acheteur des obligations réglementaires. La décote liée au DPE G est aujourd'hui bien intégrée dans les transactions.</p>

        <h3>MaPrimeRénov' est-elle accessible aux propriétaires bailleurs ?</h3>
        <p>Oui, les propriétaires bailleurs peuvent bénéficier de MaPrimeRénov' sous conditions. Les travaux doivent concerner la résidence principale du locataire (ou la future résidence principale si le logement est vacant). Le montant des aides est calculé selon les revenus du propriétaire bailleur, pas du locataire. Une condition de loyer modéré peut être exigée (engagement de louer sous plafonds de ressources pendant 6 ans). Les dossiers bailleurs sont instruits par l'ANAH.</p>

        <h3>Faut-il rénover avant de vendre ou vendre en l'état ?</h3>
        <p>La réponse dépend de l'ampleur des travaux et de votre situation. Pour une rénovation légère (isolation combles, changement de chaudière) dont le coût est inférieur à la décote subie, rénover avant de vendre est généralement rentable. Pour une rénovation lourde (isolation des murs, fenêtres, toiture), vendre en l'état avec une décote intégrée est souvent préférable : vous évitez l'avance de trésorerie, les délais de chantier et le risque d'une rénovation ne valorisant pas autant qu'espéré. Un agent ou un notaire peut vous aider à arbitrer.</p>
      </>
    ),
  },
];
