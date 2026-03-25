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
            <strong>Livret A</strong> : 3 % en 2026, totalement liquide et sans risque. Parfait pour la
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
];
