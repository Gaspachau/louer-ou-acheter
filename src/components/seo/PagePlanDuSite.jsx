import { Link } from "react-router-dom";
import { useSEO } from "../../utils/useSEO";
import TopBar from "../TopBar";
import Footer from "../Footer";

export default function PagePlanDuSite() {
  useSEO({
    title: "Plan du site",
    description: "Plan du site louer-acheter.fr — retrouvez tous nos simulateurs, guides et outils immobiliers.",
    path: "/plan-du-site",
    robots: "noindex, follow",
  });

  return (
    <div className="page">
      <TopBar />
      <main>
        <article className="blog-article-content">
          <div className="blog-article-header">
            <nav aria-label="Fil d'Ariane" style={{ fontSize: 13, color: "#64748b", marginBottom: 12 }}>
              <Link to="/" style={{ color: "#64748b" }}>Accueil</Link>
              {" › "}
              <span>Plan du site</span>
            </nav>
            <h1>Plan du site — louer-acheter.fr</h1>
            <p>Retrouvez l'ensemble des pages, simulateurs, guides et outils disponibles sur louer-acheter.fr.</p>
          </div>

          <h2>Pages principales</h2>
          <ul>
            <li><Link to="/">Accueil — Simulateur louer ou acheter</Link></li>
            <li><Link to="/blog">Blog immobilier 2026</Link></li>
            <li><Link to="/simulateurs">Tous les simulateurs</Link></li>
            <li><Link to="/a-propos">À propos</Link></li>
            <li><Link to="/mentions-legales">Mentions légales</Link></li>
          </ul>

          <h2>Simulateurs immobiliers</h2>
          <ul>
            <li><Link to="/simulateurs/pret-immobilier">Simulateur prêt immobilier</Link></li>
            <li><Link to="/simulateurs/frais-notaire">Calculateur frais de notaire</Link></li>
            <li><Link to="/simulateurs/capacite-emprunt">Capacité d'emprunt</Link></li>
            <li><Link to="/simulateurs/ptz">Prêt à taux zéro (PTZ)</Link></li>
            <li><Link to="/simulateurs/rentabilite-locative">Rentabilité locative</Link></li>
            <li><Link to="/simulateurs/plus-value">Plus-value immobilière</Link></li>
            <li><Link to="/simulateurs/budget-max">Budget maximum d'achat</Link></li>
            <li><Link to="/simulateurs/stress-test">Stress test financier</Link></li>
            <li><Link to="/simulateurs/impact-dpe">Impact DPE sur le prix</Link></li>
            <li><Link to="/simulateurs/remboursement-anticipe">Remboursement anticipé</Link></li>
            <li><Link to="/simulateurs/comparateur-villes">Comparateur de villes</Link></li>
            <li><Link to="/simulateurs/epargne-apport">Épargne apport</Link></li>
            <li><Link to="/simulateurs/heritage">Héritage et immobilier</Link></li>
            <li><Link to="/simulateurs/assurance-pret">Assurance prêt</Link></li>
            <li><Link to="/simulateurs/pret-conso">Prêt consommation</Link></li>
            <li><Link to="/simulateurs/negociation">Négociation prix</Link></li>
            <li><Link to="/simulateurs/couple">Simulation couple</Link></li>
            <li><Link to="/simulateurs/niveau-de-vie">Niveau de vie après achat</Link></li>
            <li><Link to="/simulateurs/machine-temps">Machine à remonter le temps</Link></li>
            <li><Link to="/simulateurs/histoire">Histoire des prix</Link></li>
            <li><Link to="/simulateurs/calendrier">Calendrier d'achat</Link></li>
          </ul>

          <h2>Pages SEO par ville</h2>
          <ul>
            <li><Link to="/louer-ou-acheter-paris">Louer ou acheter à Paris</Link></li>
            <li><Link to="/louer-ou-acheter-lyon">Louer ou acheter à Lyon</Link></li>
            <li><Link to="/louer-ou-acheter-marseille">Louer ou acheter à Marseille</Link></li>
            <li><Link to="/louer-ou-acheter-bordeaux">Louer ou acheter à Bordeaux</Link></li>
            <li><Link to="/louer-ou-acheter-toulouse">Louer ou acheter à Toulouse</Link></li>
            <li><Link to="/louer-ou-acheter-nantes">Louer ou acheter à Nantes</Link></li>
            <li><Link to="/louer-ou-acheter-lille">Louer ou acheter à Lille</Link></li>
            <li><Link to="/louer-ou-acheter-nice">Louer ou acheter à Nice</Link></li>
            <li><Link to="/louer-ou-acheter-rennes">Louer ou acheter à Rennes</Link></li>
            <li><Link to="/louer-ou-acheter-strasbourg">Louer ou acheter à Strasbourg</Link></li>
          </ul>

          <h2>Guides thématiques</h2>
          <ul>
            <li><Link to="/simulateur-pret-immobilier-gratuit">Simulateur prêt immobilier gratuit 2026</Link></li>
            <li><Link to="/calculateur-frais-de-notaire-2026">Calculateur frais de notaire 2026</Link></li>
            <li><Link to="/capacite-emprunt-calcul-gratuit">Calculer sa capacité d'emprunt gratuitement</Link></li>
            <li><Link to="/ptz-2026-conditions-montants">PTZ 2026 : conditions et montants</Link></li>
            <li><Link to="/taux-immobilier-2026">Taux immobilier 2026 : baromètre et prévisions</Link></li>
          </ul>

          <h2>Articles de blog</h2>
          <ul>
            <li><Link to="/blog/louer-ou-acheter-paris-2026">Faut-il louer ou acheter à Paris en 2026 ?</Link></li>
            <li><Link to="/blog/taux-immobilier-2026-previsions">Taux immobilier 2026 : prévisions et évolution</Link></li>
            <li><Link to="/blog/ptz-2026-comment-en-beneficier">PTZ 2026 : tout savoir pour en bénéficier</Link></li>
            <li><Link to="/blog/villes-ou-acheter-france-2026">Les meilleures villes où acheter en 2026</Link></li>
            <li><Link to="/blog/combien-gagner-pour-acheter">Combien gagner pour acheter un appartement ?</Link></li>
            <li><Link to="/blog/salaire-emprunt-200000">Quel salaire pour emprunter 200 000 € ?</Link></li>
            <li><Link to="/blog/charges-copropriete-avant-acheter">Charges de copropriété : ce qu'il faut savoir</Link></li>
            <li><Link to="/blog/dpe-renovation-energetique-achat">DPE et rénovation : impact sur la valeur du bien</Link></li>
            <li><Link to="/blog/louer-en-attendant-strategie">Louer en attendant : bonne ou mauvaise stratégie ?</Link></li>
            <li><Link to="/blog/erreurs-a-eviter-avant-acheter">Erreurs à éviter avant d'acheter</Link></li>
            <li><Link to="/blog/apport-personnel-combien-economiser">Apport personnel : combien économiser ?</Link></li>
            <li><Link to="/blog/ptz-2026-conditions">PTZ 2026 : conditions détaillées</Link></li>
            <li><Link to="/blog/villes-achat-rentable-2026">Villes où l'achat est rentable en 2026</Link></li>
            <li><Link to="/blog/optimiser-apport-2026">Optimiser son apport en 2026</Link></li>
            <li><Link to="/blog/negociation-prix-immobilier-2026">Négociation prix immobilier 2026</Link></li>
            <li><Link to="/blog/assurance-pret-changer-economiser">Assurance prêt : changer pour économiser</Link></li>
            <li><Link to="/blog/calcul-budget-renovation-avant-achat">Budget rénovation avant achat</Link></li>
            <li><Link to="/blog/investissement-locatif-premiers-pas">Investissement locatif : premiers pas</Link></li>
            <li><Link to="/blog/separation-divorce-bien-immobilier">Séparation ou divorce : que devient le bien ?</Link></li>
          </ul>
        </article>
      </main>
      <Footer />
    </div>
  );
}
