import { useMemo, useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import TopBar from "./TopBar";
import Footer from "./Footer";
import { CITIES, CITY_LIST } from "../data/cityData";
import { computeComparison } from "../utils/finance";

const fmtCur = (v) => new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(v);

/* ── City extra content ───────────────────────────────────── */
const CITY_EXTRAS = {
  paris: {
    catchphrase: "La capitale reste la plus chère d'Europe — mais aussi la plus liquide",
    trend: "baisse", trendPct: "-8 % depuis 2021",
    trendColor: "#059669",
    marketInsight: "Après une correction de 10–15 % entre 2022 et 2025, le marché parisien se stabilise en 2026. Le ratio prix/loyer très élevé (670×) signifie qu'il faut généralement 12+ ans pour que l'achat devienne gagnant.",
    buyerTip: "Priorisez les arrondissements 10e–20e où le ratio prix/loyer est plus favorable. Un T2 dans le 19e à ~430 000 € se loue ~1 400 €/mois, soit 3,9 % de rendement brut.",
    faq: [
      { q: "Vaut-il mieux louer ou acheter à Paris en 2026 ?", a: "À Paris, louer est généralement plus avantageux sur un horizon inférieur à 10–12 ans. Le ratio prix/loyer très élevé (670×) signifie que les coûts d'entrée prennent du temps à s'amortir. Notre simulateur calcule le point d'équilibre exact selon votre apport." },
      { q: "Quel est le prix moyen au m² à Paris en 2026 ?", a: "Le prix médian est de 9 200 à 10 500 €/m² selon les arrondissements. Le 8e et le 16e dépassent 12 000 €/m², le 19e et 20e restent sous 8 500 €/m²." },
      { q: "Peut-on obtenir un PTZ à Paris en 2026 ?", a: "Non, Paris est en Zone A bis. Le PTZ 2026 couvre le neuf en zone tendue et l'ancien en zone peu dense. À Paris, des alternatives existent : Action Logement, prêts employeurs, prêts complémentaires." },
    ],
  },
  lyon: {
    catchphrase: "La capitale gastronomique : un marché équilibré entre Paris et la province",
    trend: "stable", trendPct: "stable depuis 2023",
    trendColor: "#d97706",
    marketInsight: "Lyon affiche un ratio prix/loyer plus équilibré qu'à Paris. Un T2 de 50 m² vaut ~245 000 € et se loue ~970 €/mois. L'achat devient rentable autour de 7–8 ans d'occupation.",
    buyerTip: "Les quartiers Confluence et Part-Dieu offrent le meilleur potentiel de valorisation. Villeurbanne propose des prix 20 % inférieurs à Lyon intra-muros pour une qualité de vie équivalente.",
    faq: [
      { q: "Louer ou acheter à Lyon en 2026 ?", a: "Lyon offre un équilibre intéressant. Pour un horizon de 8 ans ou plus, l'achat est généralement gagnant grâce à une appréciation historique de 2,5 %/an. À court terme (< 5 ans), la location reste plus flexible et souvent moins coûteuse." },
      { q: "Quel apport faut-il pour acheter à Lyon ?", a: "Pour un T2 de 50 m² à 245 000 €, prévoyez ~37 000 € d'apport (15 %) + 19 600 € de frais de notaire. Soit environ 57 000 € au total pour un dossier acceptable." },
      { q: "Les prix vont-ils remonter à Lyon en 2026 ?", a: "Les prix lyonnais se sont stabilisés depuis 2023 après une hausse de 40 % sur 10 ans. Un rebond progressif est attendu avec la baisse des taux, sans retrouver la forte croissance d'avant 2022." },
    ],
  },
  marseille: {
    catchphrase: "Le marché phocéen : la grande ville la plus accessible de France",
    trend: "hausse", trendPct: "+5 % en 2025",
    trendColor: "#dc2626",
    marketInsight: "Marseille reste la grande ville la plus accessible avec 3 400 €/m² en moyenne. La ville bénéficie d'un plan de rénovation massif (Euroméditerranée). Le rendement locatif figure parmi les meilleurs des grandes villes françaises.",
    buyerTip: "Le 6e arrondissement et le Vieux-Port offrent la meilleure liquidité à la revente. Le 8e–9e reste le choix sécurisé pour une résidence principale. Évitez les quartiers nord sans connaissance locale approfondie.",
    faq: [
      { q: "Est-ce le bon moment pour acheter à Marseille en 2026 ?", a: "Oui, les prix sont encore très accessibles (3 400 €/m²), le rendement locatif est élevé (5–6 % brut), et les projets d'infrastructure valorisent progressivement la ville. Le point d'équilibre louer/acheter est d'environ 5–6 ans." },
      { q: "Quelle est la rentabilité locative à Marseille en 2026 ?", a: "C'est l'une des meilleures des grandes villes : 4,8 à 6,5 % brut selon le quartier. Un T2 à 170 000 € se loue 820 €/mois, soit 5,8 % de rendement brut avant charges et fiscalité." },
      { q: "Marseille est-elle éligible au PTZ 2026 ?", a: "Oui, Marseille est en Zone A (marché tendu), éligible au PTZ pour les logements neufs. Notre simulateur PTZ vérifie votre éligibilité complète selon vos revenus et la zone." },
    ],
  },
  bordeaux: {
    catchphrase: "Après l'euphorie, Bordeaux retrouve un marché plus équilibré",
    trend: "baisse", trendPct: "-12 % depuis 2021",
    trendColor: "#059669",
    marketInsight: "Bordeaux a connu une correction significative après une hausse de +80 % entre 2015 et 2021. Les prix se stabilisent autour de 4 500 €/m² en 2026, créant une fenêtre d'opportunité pour les acheteurs.",
    buyerTip: "La rive droite (Bastide, Floirac) reste 30 % moins chère que la rive gauche avec une accessibilité en tramway. Les primo-accédants trouveront les meilleures opportunités dans ces quartiers en transformation.",
    faq: [
      { q: "Les prix de l'immobilier vont-ils remonter à Bordeaux ?", a: "Après la correction de 2022–2024, les prix semblent trouver un plancher. La baisse des taux en 2025–2026 devrait progressivement soutenir les prix. Un retour à la forte croissance pre-2022 n'est pas attendu." },
      { q: "Quel rendement locatif à Bordeaux en 2026 ?", a: "Le rendement brut moyen est de 4,2–5,0 %. Un T2 à 225 000 € se loue ~900 €/mois, soit 4,8 % brut. La tension locative reste forte grâce aux étudiants et aux entreprises tech." },
      { q: "Vaut-il mieux acheter rive gauche ou rive droite à Bordeaux ?", a: "La rive gauche (Chartrons, Nansouty) est plus valorisée et liquide mais plus chère. La rive droite (Bastide) offre un meilleur potentiel de valorisation à 5–10 ans avec des prix autour de 3 200–3 800 €/m²." },
    ],
  },
  nantes: {
    catchphrase: "La ville préférée des familles : un marché sain et dynamique",
    trend: "stable", trendPct: "légère baisse de -3 % en 2024",
    trendColor: "#d97706",
    marketInsight: "Nantes offre un des meilleurs équilibres de France entre dynamisme économique et prix immobiliers. À 4 100 €/m², la ville reste accessible pour les primo-accédants. Le marché locatif est tendu, avec une vacance quasi-nulle en centre-ville.",
    buyerTip: "L'île de Nantes est le nouveau quartier à privilégier : rénovation urbaine massive, nouvelles entreprises, prix encore 10 % sous le centre historique. Le tramway dessert tout le centre.",
    faq: [
      { q: "Louer ou acheter à Nantes en 2026 ?", a: "L'achat est avantageux pour un horizon de 7 ans ou plus. La tension locative fait monter les loyers régulièrement, ce qui favorise l'accession. L'apport minimum recommandé est de 60 000 € pour un T2 en centre-ville." },
      { q: "Nantes est-elle en zone tendue pour l'immobilier ?", a: "Oui, Nantes est en Zone B1, éligible au PTZ pour les logements neufs. La ville est couverte par l'encadrement des loyers depuis 2022." },
      { q: "Quel est le meilleur quartier pour acheter à Nantes ?", a: "Le centre historique (Feydeau, Bouffay) offre la meilleure liquidité. Pour une meilleure valorisation, l'île de Nantes et Doulon présentent les meilleures perspectives à 5–10 ans." },
    ],
  },
  toulouse: {
    catchphrase: "La Ville Rose : une économie aéronautique qui tire la demande vers le haut",
    trend: "hausse", trendPct: "+4 % en 2025",
    trendColor: "#dc2626",
    marketInsight: "Toulouse bénéficie d'une économie locale dynamique (Airbus, Thales) qui maintient une forte demande locative. À 3 800 €/m², la ville reste accessible avec une rentabilité locative de 5–5,5 % brut.",
    buyerTip: "Les Minimes, Saint-Cyprien et Compans-Cafarelli offrent le meilleur rapport qualité-prix. Les biens proches du métro ou du futur Toulouse Aerospace Express sont à favoriser.",
    faq: [
      { q: "Est-ce rentable d'investir à Toulouse en 2026 ?", a: "Oui, Toulouse figure parmi les meilleures villes pour l'investissement locatif : tension locative forte (étudiants + cadres Airbus), rendement brut de 5–5,5 %, prix encore abordables. C'est un marché favorable aux acheteurs." },
      { q: "Louer ou acheter à Toulouse : quel est le point d'équilibre ?", a: "Pour un T2 à 190 000 €, le point d'équilibre est d'environ 6 ans. Au-delà, l'achat génère davantage de patrimoine que la location combinée à un placement financier." },
      { q: "Les prix vont-ils continuer à monter à Toulouse ?", a: "Les fondamentaux soutiennent une légère hausse : population croissante (+1 %/an), emploi dynamique, offre insuffisante. Une hausse de 2–3 %/an est probable sur 5 ans." },
    ],
  },
  lille: {
    catchphrase: "Entre Paris et Bruxelles : le marché le plus abordable du Nord",
    trend: "stable", trendPct: "stable depuis 2023",
    trendColor: "#d97706",
    marketInsight: "Lille est la grande ville la plus accessible après Marseille à 3 300 €/m². Sa position stratégique (30 min Paris en TGV) et sa forte population étudiante (100 000+) garantissent une demande locative pérenne.",
    buyerTip: "Vieux-Lille est premium (5 000+ €/m²) mais très liquide. Pour l'investissement locatif, Wazemmes et Moulins offrent les meilleurs rendements (6–7 % brut) avec une gentrification progressive.",
    faq: [
      { q: "Quel est le rendement locatif à Lille en 2026 ?", a: "Excellent : 5,5 à 7 % brut selon les quartiers. Un T2 à 165 000 € dans Wazemmes se loue ~770 €/mois, soit 5,6 % brut. C'est une des meilleures rentabilités des grandes villes françaises." },
      { q: "Y a-t-il un encadrement des loyers à Lille ?", a: "Oui, Lille applique l'encadrement des loyers depuis 2020. Les loyers sont plafonnés selon la zone et le type de bien. Vérifiez le loyer de référence avant tout investissement." },
      { q: "Louer ou acheter à Lille : que choisir en 2026 ?", a: "Pour une résidence principale avec un horizon de 6 ans ou plus, l'achat est avantageux. Le point d'équilibre est rapide grâce aux prix accessibles. Pour un investissement, le rendement locatif est parmi les meilleurs de France." },
    ],
  },
  strasbourg: {
    catchphrase: "Capitale européenne : un marché premium au carrefour de l'Europe",
    trend: "stable", trendPct: "stable depuis 2024",
    trendColor: "#d97706",
    marketInsight: "Strasbourg allie attractivité internationale (institutions européennes) et qualité de vie. La demande est soutenue par les fonctionnaires européens et les étudiants (60 000+) des universités et grandes écoles.",
    buyerTip: "La Neustadt (centre historique UNESCO) valorise bien. L'Orangerie et la Robertsau séduisent les familles aisées. Koenigshoffen reste le meilleur rapport prix-qualité pour les primo-accédants.",
    faq: [
      { q: "Louer ou acheter à Strasbourg en 2026 ?", a: "L'achat est recommandé pour un horizon de 7 ans ou plus. La demande locative est forte (taux de vacance < 2 %) mais les prix restent modérés, créant un bon équilibre. Notre simulateur précise le point d'équilibre exact." },
      { q: "Quel est le prix au m² dans le centre de Strasbourg ?", a: "La Grande Île varie entre 4 000 et 5 500 €/m². La Neustadt tourne autour de 3 500–4 200 €/m². Les quartiers périphériques (Hautepierre, Cronenbourg) descendent à 2 200–2 800 €/m²." },
      { q: "Strasbourg est-elle une bonne ville pour l'investissement locatif ?", a: "Oui, avec un rendement brut de 4,5–5,5 %. La tension locative est structurelle grâce aux institutions européennes et aux universités. Les biens proches du tramway sont particulièrement recherchés." },
    ],
  },
  nice: {
    catchphrase: "La Riviera française : un marché premium soutenu par la demande internationale",
    trend: "hausse", trendPct: "+6 % en 2025",
    trendColor: "#dc2626",
    marketInsight: "Nice est la deuxième ville la plus chère après Paris à 5 400 €/m². La demande internationale (retraités aisés, investisseurs européens) maintient une pression à la hausse. Le marché locatif de courte durée réduit l'offre traditionnelle.",
    buyerTip: "Le Carré d'Or est premium et liquide. Cimiez, calme et verdoyant, séduit les familles. Pour un meilleur rapport qualité-prix, l'Arenas et la gare Saint-Roch sont bien desservis par le tramway.",
    faq: [
      { q: "Nice est-elle une bonne ville pour l'investissement locatif en 2026 ?", a: "Oui avec des nuances. Le rendement brut classique est de 4,5–5 %. La vraie opportunité est la location courte durée touristique (7–10 % de rendement) mais soumise à des réglementations de plus en plus strictes." },
      { q: "Les prix vont-ils continuer à monter à Nice ?", a: "Probablement oui, modérément. La demande internationale est structurelle, l'offre foncière est limitée (mer + collines). Une hausse de 3–4 %/an est plausible sur 5 ans." },
      { q: "Quel apport faut-il pour acheter un appartement à Nice ?", a: "Pour un T2 de 50 m² à 270 000 €, prévoyez 40 500 € d'apport (15 %) + 21 600 € de frais de notaire. Avec les charges de copropriété élevées, le coût total de propriété est significatif." },
    ],
  },
  rennes: {
    catchphrase: "La métropole bretonne : dynamique et de nouveau accessible après la correction",
    trend: "stable", trendPct: "légère correction de -4 % en 2024",
    trendColor: "#d97706",
    marketInsight: "Rennes a connu une forte hausse (+50 % entre 2018 et 2022) liée à l'ouverture de la LGV Paris-Rennes (1h30). Les prix se stabilisent autour de 3 900 €/m² en 2026, offrant à nouveau des opportunités raisonnables.",
    buyerTip: "Le quartier Sainte-Thérèse et Thabor restent les plus recherchés. Pour les investisseurs, Cleunay et le Blosne (en cours de rénovation) offrent un potentiel de valorisation à 7–10 ans.",
    faq: [
      { q: "Est-ce le bon moment pour acheter à Rennes en 2026 ?", a: "Oui, après la correction de 2023–2024, les prix sont revenus à des niveaux raisonnables. La demande reste forte (LGV, grandes écoles, métropole attractive) et l'offre est limitée. Une bonne fenêtre d'achat." },
      { q: "Rennes est-elle éligible aux aides à l'accession ?", a: "Oui, Rennes est en Zone B1, éligible au PTZ pour les logements neufs. Des aides locales existent via Rennes Métropole pour les primo-accédants sous conditions de ressources." },
      { q: "Quel est le rendement locatif à Rennes en 2026 ?", a: "Le rendement brut est de 4,2–5,2 % selon les quartiers. La tension locative est forte (universités, grandes écoles). Un bon marché pour l'investissement locatif à long terme." },
    ],
  },
};

const MARKET_LABELS = {
  vendeur: { text: "Marché vendeur", color: "#dc2626", bg: "#fee2e2" },
  equilibre: { text: "Marché équilibré", color: "#d97706", bg: "#fef3c7" },
  acheteur: { text: "Marché acheteur", color: "#059669", bg: "#d1fae5" },
};

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`lp-faq-item${open ? " lp-faq-open" : ""}`}>
      <button className="lp-faq-q" onClick={() => setOpen((v) => !v)} type="button" aria-expanded={open}>
        <span>{q}</span>
        <svg className="lp-faq-chevron" width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <path d="M4.5 7l4.5 4.5L13.5 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      {open && <p className="lp-faq-a">{a}</p>}
    </div>
  );
}

const SIM_LINKS = [
  { href: "/", icon: "⚖️", label: "Simulateur principal" },
  { href: "/simulateurs/endettement", icon: "📊", label: "Capacité d'emprunt" },
  { href: "/simulateurs/frais-notaire", icon: "📋", label: "Frais de notaire" },
  { href: "/simulateurs/ptz", icon: "🏗️", label: "Éligibilité PTZ" },
  { href: "/simulateurs/rentabilite-locative", icon: "💹", label: "Rentabilité locative" },
  { href: "/simulateurs/pret-immobilier", icon: "🏦", label: "Tableau d'amortissement" },
];

export default function PageVille() {
  const { cityId } = useParams();
  const city = CITIES[cityId];

  if (!city) return <Navigate to="/simulateurs" replace />;

  const extra = CITY_EXTRAS[cityId] || {};
  const faq = extra.faq || [];
  const mkt = MARKET_LABELS[city.market] || MARKET_LABELS.equilibre;
  const prix = city.pricePerM2 * city.surfaceRef;
  const ratioMois = Math.round(city.pricePerM2 / (city.rentT2 / city.surfaceRef));

  const sim = useMemo(() => computeComparison({
    purchasePrice: prix,
    downPayment: Math.round(prix * 0.15),
    mortgageRate: 3.5,
    mortgageYears: 20,
    notaryFeesPct: 8,
    annualPropertyTax: city.taxeFonciere,
    annualMaintenancePct: 1,
    annualInsurance: 600,
    appreciationRate: city.appreciationRate,
    saleCostsPct: 5,
    monthlyRent: city.rentT2,
    annualRentIncrease: city.rentIndexGrowth,
    investmentReturn: 3.5,
    comparisonYears: 10,
  }), [cityId]);

  useEffect(() => {
    document.title = `Louer ou acheter à ${city.name} en 2026 — Simulateur & analyse du marché | louer-acheter.fr`;
    const canonical = document.querySelector("link[rel='canonical']");
    if (canonical) canonical.href = `https://www.louer-acheter.fr/villes/${cityId}`;

    // Schema.org for this city page
    const existing = document.getElementById("ville-schema");
    if (existing) existing.remove();
    const script = document.createElement("script");
    script.id = "ville-schema";
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faq.map((f) => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": { "@type": "Answer", "text": f.a },
      })),
    });
    document.head.appendChild(script);
    return () => { const s = document.getElementById("ville-schema"); if (s) s.remove(); };
  }, [cityId]);

  const otherCities = CITY_LIST.filter((c) => c.id !== cityId).slice(0, 6);

  return (
    <div className="page">
      <TopBar />
      <main id="main-content" className="ville-page">

        {/* Hero */}
        <section className="ville-hero">
          <nav className="sim-breadcrumb" aria-label="Fil d'Ariane">
            <Link to="/">Accueil</Link>
            <span aria-hidden="true"> › </span>
            <Link to="/simulateurs">Simulateurs</Link>
            <span aria-hidden="true"> › </span>
            <span>{city.name}</span>
          </nav>

          <div className="ville-hero-inner">
            <div className="ville-hero-content">
              <span className="ville-hero-emoji" aria-hidden="true">{city.emoji}</span>
              <div>
                <span className="ville-hero-region">{city.region}</span>
                <h1 className="ville-hero-title">Louer ou acheter à {city.name} en 2026</h1>
                <p className="ville-hero-sub">{extra.catchphrase || `Analyse complète du marché immobilier de ${city.name} : prix, loyers, rentabilité.`}</p>
              </div>
            </div>

            {/* Quick metrics */}
            <div className="ville-metrics">
              <div className="ville-metric">
                <span className="ville-metric-val">{city.pricePerM2.toLocaleString("fr-FR")} €</span>
                <span className="ville-metric-label">Prix médian / m²</span>
              </div>
              <div className="ville-metric">
                <span className="ville-metric-val">{city.rentT2.toLocaleString("fr-FR")} €</span>
                <span className="ville-metric-label">Loyer T2 / mois</span>
              </div>
              <div className="ville-metric">
                <span className="ville-metric-val">{ratioMois}×</span>
                <span className="ville-metric-label">Ratio prix/loyer</span>
              </div>
              <div className="ville-metric">
                <span className="ville-metric-val">{city.appreciationRate} %</span>
                <span className="ville-metric-label">Appréciation / an</span>
              </div>
            </div>
          </div>
        </section>

        <div className="ville-body">
          {/* Market insight */}
          <section className="ville-section">
            <h2 className="ville-section-title">Le marché immobilier à {city.name} en 2026</h2>
            <div className="ville-market-card">
              <div className="ville-market-header">
                <span className="ville-market-badge" style={{ background: mkt.bg, color: mkt.color }}>{mkt.text}</span>
                <span className="ville-trend" style={{ color: extra.trendColor || "#d97706" }}>{extra.trendPct}</span>
              </div>
              <p className="ville-market-text">{extra.marketInsight}</p>
              {extra.buyerTip && (
                <div className="ville-tip">
                  <span className="ville-tip-icon" aria-hidden="true">🎯</span>
                  <p className="ville-tip-text"><strong>Conseil acheteur :</strong> {extra.buyerTip}</p>
                </div>
              )}
            </div>
          </section>

          {/* Simulation result */}
          <section className="ville-section">
            <h2 className="ville-section-title">Notre simulation pour {city.name} — T2 50 m², 10 ans</h2>
            <div className={`ville-sim-card${sim.isBuyingBetter ? " ville-sim-buy" : " ville-sim-rent"}`}>
              <div className="ville-sim-verdict">
                <span className="ville-sim-verdict-icon" aria-hidden="true">
                  {sim.isBuyingBetter ? "🏠" : "🏢"}
                </span>
                <div>
                  <p className="ville-sim-verdict-label">
                    {sim.isBuyingBetter ? "L'achat est plus avantageux" : "La location est plus avantageuse"} sur 10 ans
                  </p>
                  <p className="ville-sim-verdict-amount">
                    {fmtCur(Math.abs(sim.advantage))} d'avantage en faveur de {sim.isBuyingBetter ? "l'achat" : "la location"}
                  </p>
                </div>
              </div>
              <div className="ville-sim-stats">
                <div className="ville-sim-stat">
                  <span className="ville-sim-stat-label">Prix d'achat T2 50 m²</span>
                  <span className="ville-sim-stat-val">{fmtCur(prix)}</span>
                </div>
                <div className="ville-sim-stat">
                  <span className="ville-sim-stat-label">Mensualité crédit</span>
                  <span className="ville-sim-stat-val">{fmtCur(sim.monthlyPayment)}/mois</span>
                </div>
                <div className="ville-sim-stat">
                  <span className="ville-sim-stat-label">Loyer équivalent</span>
                  <span className="ville-sim-stat-val">{fmtCur(city.rentT2)}/mois</span>
                </div>
                <div className="ville-sim-stat">
                  <span className="ville-sim-stat-label">Patrimoine achat (10 ans)</span>
                  <span className="ville-sim-stat-val">{fmtCur(sim.ownerNetWorth)}</span>
                </div>
              </div>
              <Link to={`/?city=${cityId}`} className="ville-sim-cta btn-primary">
                Simuler ma situation à {city.name} →
              </Link>
            </div>
          </section>

          {/* FAQ */}
          {faq.length > 0 && (
            <section className="ville-section">
              <h2 className="ville-section-title">Questions fréquentes sur l'immobilier à {city.name}</h2>
              <div className="lp-faq">
                {faq.map((f, i) => <FaqItem key={i} q={f.q} a={f.a} />)}
              </div>
            </section>
          )}

          {/* Simulators */}
          <section className="ville-section">
            <h2 className="ville-section-title">Simulateurs utiles pour {city.name}</h2>
            <div className="ville-sims-grid">
              {SIM_LINKS.map((s) => (
                <Link key={s.href} to={s.href} className="ville-sim-link">
                  <span className="ville-sim-link-icon" aria-hidden="true">{s.icon}</span>
                  <span>{s.label}</span>
                  <span className="ville-sim-link-arrow" aria-hidden="true">→</span>
                </Link>
              ))}
            </div>
          </section>

          {/* Other cities */}
          <section className="ville-section">
            <h2 className="ville-section-title">Comparer avec d'autres villes</h2>
            <div className="ville-cities-grid">
              {otherCities.map((c) => (
                <Link key={c.id} to={`/villes/${c.id}`} className="ville-city-link">
                  <span aria-hidden="true">{c.emoji}</span>
                  <span className="ville-city-link-name">{c.name}</span>
                  <span className="ville-city-link-price">{c.pricePerM2.toLocaleString("fr-FR")} €/m²</span>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
