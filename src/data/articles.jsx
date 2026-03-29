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
];
