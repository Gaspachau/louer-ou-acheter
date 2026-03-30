import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { trackPresetSelected, trackSimulationStarted } from "../utils/analytics";
import { PRESETS } from "../App";
import { ARTICLES } from "../data/articles";
import { computeComparison } from "../utils/finance";
import { CITY_LIST, CITIES } from "../data/cityData";

// Map cityData to the shape expected by CityMockup
const CITY_DATA = CITY_LIST.map((c) => ({
  id: c.id, name: c.name, emoji: c.emoji,
  pricePerM2: c.pricePerM2, surface: c.surfaceRef,
  loyer: c.rentT2, taxe: c.taxeFonciere,
  apport: Math.round(c.pricePerM2 * c.surfaceRef * 0.15),
}));

const fmtK = (v) => {
  if (Math.abs(v) >= 1000) return `${Math.round(v / 1000)} k€`;
  return `${Math.round(v)} €`;
};

function CityMockup({ onSelect }) {
  const [cityId, setCityId] = useState("lyon");
  const city = CITY_DATA.find((c) => c.id === cityId);

  const res = useMemo(() => {
    const prix = city.pricePerM2 * city.surface;
    return computeComparison({
      purchasePrice: prix,
      downPayment: city.apport,
      mortgageRate: 3.5,
      mortgageYears: 20,
      notaryFeesPct: 8,
      annualPropertyTax: city.taxe,
      annualMaintenancePct: 1,
      annualInsurance: 600,
      appreciationRate: 2,
      saleCostsPct: 6,
      monthlyRent: city.loyer,
      annualRentIncrease: 1.5,
      investmentReturn: 3.5,
      comparisonYears: 10,
    });
  }, [city]);

  const isBuying = res.isBuyingBetter;
  const total = Math.abs(res.ownerNetWorth) + Math.abs(res.renterPortfolio);
  const buyPct = total > 0 ? Math.round((res.ownerNetWorth / total) * 100) : 50;
  const rentPct = 100 - buyPct;

  return (
    <div className="lp-mockup" aria-label="Aperçu simulateur par ville">
      <div className="lp-mockup-header">
        <span className="lp-mockup-dot lp-dot-red" />
        <span className="lp-mockup-dot lp-dot-yellow" />
        <span className="lp-mockup-dot lp-dot-green" />
        <span className="lp-mockup-title">Simulation 10 ans · {city.name}</span>
      </div>
      <div className="lp-mockup-body">
        {/* City selector */}
        <div className="lp-city-btns" role="group" aria-label="Choisir une ville">
          {CITY_DATA.map((c) => (
            <button
              key={c.id}
              type="button"
              className={`lp-city-btn${cityId === c.id ? " active" : ""}`}
              onClick={() => setCityId(c.id)}
              aria-pressed={cityId === c.id}
            >
              {c.emoji} {c.name}
            </button>
          ))}
        </div>

        {/* Verdict */}
        <div className="lp-mockup-verdict">
          <span className="lp-mockup-verdict-icon">{isBuying ? "🏠" : "🏢"}</span>
          <div>
            <div className="lp-mockup-verdict-label">Recommandation</div>
            <div className="lp-mockup-verdict-text">
              {isBuying ? "Achat avantageux" : "Location avantageuse"} sur 10 ans
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="lp-mockup-stats">
          <div className="lp-mockup-stat">
            <span className="lp-mockup-stat-label">Mensualité crédit</span>
            <span className="lp-mockup-stat-val">{fmtK(res.monthlyPayment)}/mois</span>
          </div>
          <div className="lp-mockup-stat">
            <span className="lp-mockup-stat-label">Patrimoine achat</span>
            <span className={`lp-mockup-stat-val${isBuying ? " lp-mockup-stat-green" : ""}`}>{fmtK(res.ownerNetWorth)}</span>
          </div>
          <div className="lp-mockup-stat">
            <span className="lp-mockup-stat-label">Patrimoine location</span>
            <span className={`lp-mockup-stat-val${!isBuying ? " lp-mockup-stat-green" : ""}`}>{fmtK(res.renterPortfolio)}</span>
          </div>
          <div className="lp-mockup-stat">
            <span className="lp-mockup-stat-label">Avantage net</span>
            <span className="lp-mockup-stat-val lp-mockup-stat-blue">
              {fmtK(Math.abs(res.advantage))} en faveur {isBuying ? "achat" : "loc."}
            </span>
          </div>
        </div>

        {/* Bars */}
        <div className="lp-mockup-bar-section">
          <div className="lp-mockup-bar-label">
            <span>Achat</span><span className="lp-mockup-bar-pct">{buyPct > 0 ? buyPct : 0} %</span>
          </div>
          <div className="lp-mockup-bar-track">
            <div className={`lp-mockup-bar-fill${isBuying ? " lp-mockup-bar-green" : " lp-mockup-bar-blue"}`} style={{ width: `${Math.max(5, buyPct)}%`, transition: "width 0.4s ease" }} />
          </div>
          <div className="lp-mockup-bar-label" style={{ marginTop: "6px" }}>
            <span>Location</span><span className="lp-mockup-bar-pct">{rentPct > 0 ? rentPct : 0} %</span>
          </div>
          <div className="lp-mockup-bar-track">
            <div className={`lp-mockup-bar-fill${!isBuying ? " lp-mockup-bar-green" : " lp-mockup-bar-blue"}`} style={{ width: `${Math.max(5, rentPct)}%`, transition: "width 0.4s ease" }} />
          </div>
        </div>

        <div className="lp-mockup-cta">Simuler votre situation →</div>
      </div>
    </div>
  );
}

const TRUST_ITEMS = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path d="M9 1.5L2.5 4.5v5c0 3.5 2.8 6.8 6.5 7.5 3.7-.7 6.5-4 6.5-7.5v-5L9 1.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M6 9l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    label: "Gratuit & sans inscription",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <rect x="2" y="3" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M6 3V1.5M12 3V1.5M2 7h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    label: "Données actualisées 2026",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M9 5v4l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    label: "Calcul instantané",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path d="M9 2l1.8 3.6L15 6.3l-3 2.9.7 4.1L9 11.2 5.3 13.3l.7-4.1-3-2.9 4.2-.7L9 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
    label: "100% indépendant",
  },
];

const HOW_STEPS = [
  {
    num: "1",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <rect x="3" y="6" width="22" height="16" rx="3" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M8 12h12M8 16h7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
    title: "Votre loyer actuel",
    desc: "Loyer mensuel, hausse annuelle et rendement de votre épargne personnelle.",
  },
  {
    num: "2",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M14 3L3 11h3v12h5v-7h6v7h5V11h3L14 3z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Le bien que vous visez",
    desc: "Prix d'achat, apport personnel, taux et durée du crédit immobilier.",
  },
  {
    num: "3",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M5 20l6-8 5 5 4-6 3 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="21" cy="8" r="3" stroke="currentColor" strokeWidth="1.8"/>
      </svg>
    ),
    title: "Votre verdict chiffré",
    desc: "Comparaison des deux patrimoines nets et point d'équilibre exact.",
  },
];

const TESTIMONIALS = [
  {
    initials: "ML",
    name: "Marie L.",
    situation: "32 ans · CDI à Lyon",
    color: "#1a56db",
    text: "J'hésitais depuis 2 ans. Le simulateur m'a montré qu'avec mon loyer de 850 € et un apport de 30 000 €, l'achat devenait rentable au bout de 6 ans. J'ai signé en janvier !",
  },
  {
    initials: "TP",
    name: "Thomas P.",
    situation: "41 ans · Indépendant à Bordeaux",
    color: "#059669",
    text: "En tant qu'indépendant, les banques étaient frileuses. Le test de résistance m'a aidé à comprendre quel niveau de réserve je devais constituer avant de me lancer.",
  },
  {
    initials: "SC",
    name: "Sophie & Cédric",
    situation: "38 et 40 ans · Paris 11e",
    color: "#7c3aed",
    text: "À Paris avec 2 enfants, on pensait devoir acheter. La simulation nous a montré que louer encore 3 ans et épargner la différence était la meilleure stratégie patrimoniale.",
  },
  {
    initials: "JR",
    name: "Julie R.",
    situation: "29 ans · Primo-accédante à Nantes",
    color: "#d97706",
    text: "Le calculateur PTZ m'a révélé que j'avais droit à 54 000 € de prêt à taux zéro. Sans ça, j'aurais raté cette aide et surpayé mes intérêts pendant 20 ans.",
  },
];

const FAQ_ITEMS = [
  {
    q: "Vaut-il mieux louer ou acheter en 2026 ?",
    a: "Il n'y a pas de réponse universelle. Tout dépend de votre horizon de détention, de l'écart entre votre loyer actuel et la mensualité d'un crédit équivalent, et du rendement que vous pouvez obtenir sur votre épargne. Notre simulateur calcule le point d'équilibre précis selon votre situation.",
  },
  {
    q: "Quel salaire faut-il pour emprunter 200 000 euros en 2026 ?",
    a: "Avec un taux de 3,7 % sur 20 ans, la mensualité est d'environ 1 185 €. La règle HCSF fixe l'endettement à 35 % maximum : il faut donc environ 3 385 €/mois net seul, ou ~2 400 €/mois à deux. Notre simulateur de capacité d'emprunt calcule votre montant exact.",
  },
  {
    q: "Quel apport minimum faut-il pour acheter ?",
    a: "Les banques exigent généralement 10 % du prix d'achat minimum — idéalement 20 % pour obtenir les meilleures conditions. Ce montant doit couvrir les frais de notaire (7–8 % dans l'ancien, 2–3 % dans le neuf) et laisser une réserve d'urgence après l'achat.",
  },
  {
    q: "Comment calculer sa capacité d'emprunt ?",
    a: "La règle HCSF fixe le taux d'endettement maximum à 35 % de vos revenus nets mensuels. Avec 3 500 €/mois, vous pouvez rembourser jusqu'à 1 225 €/mois, soit environ 207 000 € sur 20 ans à 3,8 %. Notre simulateur de capacité d'emprunt fait ce calcul instantanément.",
  },
  {
    q: "Est-ce le bon moment d'acheter en 2026 ?",
    a: "Les taux de crédit se stabilisent autour de 3,5–4 % après avoir culminé à 4,5 % en 2023. Dans certaines villes (Lille, Toulouse, Nantes), la correction des prix + la baisse des taux créent une fenêtre favorable. À Paris et Nice, le ratio prix/loyer reste très défavorable à l'achat sur moins de 12 ans.",
  },
  {
    q: "Peut-on acheter avec un CDD ou en tant qu'indépendant ?",
    a: "C'est plus difficile mais pas impossible. Les banques acceptent parfois les CDD en fin de mission ou les indépendants justifiant 3 ans de bilans comptables. Un courtier peut vous aider à monter un dossier solide. Comptez des conditions moins favorables (taux légèrement plus élevé, apport exigé plus important).",
  },
  {
    q: "Quels sont les frais cachés d'un achat immobilier ?",
    a: "Au-delà du prix affiché : frais de notaire (7–8 % dans l'ancien), frais d'agence (3–5 % si inclus), frais de garantie (0,5–1 %), frais de courtage (0–1 %), déménagement, travaux imprévus. Prévoyez 10–12 % du prix en coûts annexes. Notre simulateur de frais de notaire calcule le détail légal.",
  },
  {
    q: "Le taux d'endettement de 35 % est-il une règle absolue ?",
    a: "Il s'agit d'une règle de la HCSF (Haut Conseil de Stabilité Financière) que les banques doivent respecter dans 80 % des dossiers. Les 20 % restants sont pour des profils particuliers (hauts revenus, primo-accédants). En pratique, la plupart des banques appliquent cette limite strictement depuis 2022.",
  },
  {
    q: "Comment évolueront les taux immobiliers en 2026 ?",
    a: "Après avoir atteint 4,5 % fin 2023, les taux sont revenus à 3,3–3,8 % début 2026 suite aux baisses de taux de la BCE. La tendance est à la stabilisation. Les experts anticipent des taux entre 3 % et 3,5 % d'ici fin 2026 si l'inflation reste maîtrisée. Notre simulateur utilise un taux par défaut réactualisé chaque trimestre.",
  },
];

const WHY_DIFF = [
  { icon: "📐", title: "Calculs complets & transparents", desc: "Notaire, taxe foncière, entretien, hausse des loyers, rendement épargne — 12 paramètres pris en compte, hypothèses affichées." },
  { icon: "🔢", title: "Formules actuarielles certifiées", desc: "Mensualités calculées selon la formule exacte (capitaux * taux / (1-(1+taux)^-n)), données Banque de France et INSEE 2026." },
  { icon: "🎯", title: "Verdict personnalisé à votre ville", desc: "Le point d'équilibre est calculé pour votre situation précise — pas une moyenne nationale. Données réelles par ville." },
  { icon: "🔒", title: "100 % privé, sans compte", desc: "Aucune donnée saisie n'est transmise à nos serveurs. Tout reste dans votre navigateur. Sans publicité ciblée." },
  { icon: "📊", title: "27 simulateurs gratuits", desc: "PTZ, assurance emprunteur, plus-value, taxe foncière, DPE, stress-test — un outil pour chaque étape de votre projet." },
  { icon: "🏆", title: "Outil de référence indépendant", desc: "Aucun partenariat bancaire, aucune commission. Notre seul objectif : vous donner les bons chiffres pour décider librement." },
];

const SIMS_LP = [
  { href: "/simulateurs/epargne",       icon: "💰", title: "Simulateur d'épargne",  desc: "Objectif financier en X mois",               tag: "Épargne", tagClass: "tag-green" },
  { href: "/simulateurs/pret-immobilier",icon: "🏦", title: "Prêt immobilier",       desc: "Mensualité & tableau d'amortissement",       tag: "Crédit",  tagClass: "tag-purple" },
  { href: "/simulateurs/pret-conso",     icon: "💳", title: "Prêt conso",            desc: "Crédit auto, travaux ou perso",              tag: "Crédit",  tagClass: "tag-purple" },
  { href: "/simulateurs/niveau-de-vie",  icon: "📊", title: "Niveau de vie",         desc: "Revenu disponible après charges",            tag: "Budget",  tagClass: "tag-amber" },
  { href: "/simulateurs/endettement",    icon: "📉", title: "Capacité d'emprunt",    desc: "Taux d'endettement & montant max",           tag: "Crédit",  tagClass: "tag-teal" },
];

const BLOG_GRADIENTS = {
  "tag-blue":   "linear-gradient(135deg,#1a56db,#0ea5e9)",
  "tag-green":  "linear-gradient(135deg,#059669,#10b981)",
  "tag-purple": "linear-gradient(135deg,#7c3aed,#a855f7)",
  "tag-amber":  "linear-gradient(135deg,#d97706,#f59e0b)",
  "tag-teal":   "linear-gradient(135deg,#0d9488,#14b8a6)",
};

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`lp-faq-item${open ? " lp-faq-open" : ""}`}>
      <button
        className="lp-faq-q"
        onClick={() => setOpen((v) => !v)}
        type="button"
        aria-expanded={open}
      >
        <span>{q}</span>
        <svg className="lp-faq-chevron" width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <path d="M4.5 7l4.5 4.5L13.5 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      {open && <p className="lp-faq-a">{a}</p>}
    </div>
  );
}

function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(() => !!localStorage.getItem("nl_sub"));

  function handleSubmit(e) {
    e.preventDefault();
    if (!email) return;
    localStorage.setItem("nl_sub", "1");
    setSubmitted(true);
  }

  return (
    <section className="lp-s lp-s-dark lp-newsletter lp-s" aria-label="Newsletter">
      <div className="lp-container">
        <div className="lp-section-header">
          <h2 className="lp-section-title lp-dark-title">Restez informé du marché immobilier</h2>
          <p className="lp-section-sub lp-dark-sub">
            Taux, prix par ville, nouvelles aides — dans votre boîte mail chaque mois.
          </p>
        </div>
        {submitted ? (
          <p className="lp-nl-success">✅ Vous êtes inscrit·e ! Merci.</p>
        ) : (
          <form className="lp-nl-form" onSubmit={handleSubmit} noValidate>
            <input
              className="lp-nl-input"
              type="email"
              placeholder="votre@email.fr"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-label="Adresse e-mail"
            />
            <button className="lp-nl-btn" type="submit">
              S'inscrire
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

export default function StepLanding({ onStart, onPreset, onCityChange, city }) {
  useEffect(() => {
    const sections = document.querySelectorAll(".lp-s");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("lp-visible"); }),
      { threshold: 0.1 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="lp">

      {/* ── 1. HERO ─────────────────────────────────────────────── */}
      <section className="lp-hero" aria-label="Présentation">
        <div className="lp-hero-orb lp-hero-orb-1" aria-hidden="true" />
        <div className="lp-hero-orb lp-hero-orb-2" aria-hidden="true" />
        <div className="lp-hero-orb lp-hero-orb-3" aria-hidden="true" />

        <div className="lp-hero-inner">
          <div className="lp-hero-content">
            <span className="lp-hero-badge">
              <span className="lp-hero-badge-dot" aria-hidden="true" />
              Simulateur gratuit · Sans inscription
            </span>
            <h1 className="lp-hero-title">
              Louer <span className="lp-hero-ou">ou</span><br />
              acheter&nbsp;?
            </h1>
            <p className="lp-hero-sub">
              La réponse dépend de <em>votre</em> situation — loyer, budget, horizon.
              Notre simulateur compare les deux scénarios chiffres à l'appui en 2&nbsp;minutes.
            </p>
            <div className="lp-hero-actions">
              <button className="btn-hero-primary" onClick={onStart} type="button">
                Lancer la simulation
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <Link to="/simulateurs" className="btn-hero-secondary">
                Tous les simulateurs →
              </Link>
            </div>
            <div className="lp-hero-social-proof">
              <span>✓ Données INSEE & Banque de France</span>
              <span aria-hidden="true">·</span>
              <span>✓ Mis à jour mars 2026</span>
            </div>
          </div>

          <CityMockup />

          {/* Mobile-only simple verdict card (mockup hidden on mobile) */}
          <div className="lp-mobile-verdict-box" aria-label="Aperçu rapide">
            <div className="lp-mvb-row">
              <span className="lp-mvb-stat">
                <span className="lp-mvb-num">2 min</span>
                <span className="lp-mvb-label">pour simuler</span>
              </span>
              <span className="lp-mvb-sep" />
              <span className="lp-mvb-stat">
                <span className="lp-mvb-num">10+</span>
                <span className="lp-mvb-label">villes françaises</span>
              </span>
              <span className="lp-mvb-sep" />
              <span className="lp-mvb-stat">
                <span className="lp-mvb-num">100%</span>
                <span className="lp-mvb-label">gratuit</span>
              </span>
            </div>
            <p className="lp-mvb-hint">Loyer, crédit, patrimoine — tout est comparé sur la durée exacte que vous choisissez.</p>
          </div>
        </div>
      </section>

      {/* ── 2. TRUST BAR ──────────────────────────────────────────── */}
      <div className="lp-trust-bar" role="list" aria-label="Nos engagements">
        {TRUST_ITEMS.map((item, i) => (
          <div key={i} className="lp-trust-item" role="listitem">
            <span className="lp-trust-icon">{item.icon}</span>
            <span className="lp-trust-label">{item.label}</span>
          </div>
        ))}
      </div>

      {/* ── 3. PRESET CARDS ─────────────────────────────────────── */}
      <section className="lp-s lp-presets-wrap" aria-label="Scénarios types">
        <div className="lp-container">
          <div className="lp-section-header">
            <h2 className="lp-section-title">Commencer avec un scénario type</h2>
            <p className="lp-section-sub">Choisissez la situation la plus proche de la vôtre</p>
          </div>
          <div className="lp-presets-grid" role="list">
            {PRESETS.map((preset) => (
              <button
                key={preset.id}
                className="lp-preset-card"
                onClick={() => { trackPresetSelected(preset.id, preset.name); onPreset(preset); }}
                type="button"
                role="listitem"
                aria-label={`Scénario ${preset.name} : ${preset.desc}`}
              >
                <span className="lp-preset-icon-wrap" aria-hidden="true">{preset.emoji}</span>
                <div className="lp-preset-content">
                  <strong className="lp-preset-name">{preset.name}</strong>
                  <span className="lp-preset-desc">{preset.desc}</span>
                  <span className="lp-preset-tag">{preset.tag}</span>
                </div>
                <span className="lp-preset-arrow" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M4 9h10M10 5l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </button>
            ))}
          </div>
          <button className="lp-custom-btn" onClick={() => { trackSimulationStarted("custom"); onStart(); }} type="button">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M9 6v6M6 9h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            Saisir mes propres chiffres
          </button>
        </div>
      </section>

      {/* ── 4. HOW IT WORKS ─────────────────────────────────────── */}
      <section className="lp-s lp-s-dark lp-how-wrap" aria-label="Comment ça marche">
        <div className="lp-container">
          <div className="lp-section-header">
            <h2 className="lp-section-title lp-dark-title">Comment ça marche ?</h2>
            <p className="lp-section-sub lp-dark-sub">3 étapes, 2 minutes, une réponse chiffrée</p>
          </div>
          <div className="lp-how-steps" role="list">
            {HOW_STEPS.map((step, i) => (
              <div key={i} className="lp-how-step" role="listitem">
                <div className="lp-how-step-top">
                  <span className="lp-how-step-num">{step.num}</span>
                  <span className="lp-how-step-icon">{step.icon}</span>
                </div>
                <strong className="lp-how-step-title">{step.title}</strong>
                <p className="lp-how-step-desc">{step.desc}</p>
              </div>
            ))}
          </div>
          <button className="btn-hero-primary lp-how-cta" onClick={onStart} type="button">
            Démarrer maintenant
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </section>

      {/* ── 5. WHY DIFFERENT ────────────────────────────────────── */}
      <section className="lp-s lp-why-wrap" aria-label="Pourquoi nous ?">
        <div className="lp-container">
          <div className="lp-section-header">
            <h2 className="lp-section-title">Pourquoi ce simulateur ?</h2>
            <p className="lp-section-sub">Pas de pub, pas d'inscription, pas de raccourcis dans les calculs</p>
          </div>
          <div className="lp-why-grid">
            {WHY_DIFF.map((item, i) => (
              <div key={i} className="lp-why-card">
                <span className="lp-why-icon" aria-hidden="true">{item.icon}</span>
                <strong className="lp-why-title">{item.title}</strong>
                <p className="lp-why-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. TESTIMONIALS ─────────────────────────────────────── */}
      <section className="lp-s lp-s-tint lp-testimonials-wrap" aria-label="Témoignages">
        <div className="lp-container">
          <div className="lp-section-header">
            <h2 className="lp-section-title">Ils ont tranché grâce au simulateur</h2>
            <p className="lp-section-sub">Des situations réelles, des décisions éclairées</p>
          </div>
          <div className="lp-testimonials-grid">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="lp-testimonial-card">
                <div className="lp-testimonial-avatar" style={{ background: t.color }} aria-hidden="true">{t.initials}</div>
                <p className="lp-testimonial-text">"{t.text}"</p>
                <div className="lp-testimonial-person">
                  <strong>{t.name}</strong>
                  <span>{t.situation}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. SIMULATORS SHOWCASE ──────────────────────────────── */}
      <section className="lp-s lp-sims-wrap" aria-label="Tous nos simulateurs">
        <div className="lp-container">
          <div className="lp-section-header">
            <h2 className="lp-section-title">Nos autres simulateurs</h2>
            <p className="lp-section-sub">Des outils gratuits pour toutes vos décisions financières</p>
          </div>
          <div className="lp-sims-grid">
            {SIMS_LP.map((sim) => (
              <Link key={sim.href} to={sim.href} className="lp-sim-card">
                <span className="lp-sim-icon" aria-hidden="true">{sim.icon}</span>
                <span className={`article-tag ${sim.tagClass}`}>{sim.tag}</span>
                <strong className="lp-sim-title">{sim.title}</strong>
                <p className="lp-sim-desc">{sim.desc}</p>
                <span className="lp-sim-cta">Ouvrir →</span>
              </Link>
            ))}
          </div>
          <Link to="/simulateurs" className="lp-sims-all">
            Voir tous les simulateurs →
          </Link>
        </div>
      </section>

      {/* ── 8. BLOG PREVIEW ─────────────────────────────────────── */}
      <section className="lp-s lp-s-dark lp-blog-wrap" aria-label="Derniers articles">
        <div className="lp-container">
          <div className="lp-section-header">
            <h2 className="lp-section-title lp-dark-title">Le blog immobilier</h2>
            <p className="lp-section-sub lp-dark-sub">Analyses du marché et conseils pratiques</p>
          </div>
          <div className="lp-blog-grid">
            {ARTICLES.slice(0, 3).map((article) => (
              <Link key={article.slug} to={`/blog/${article.slug}`} className="lp-blog-card lp-blog-card-dark">
                <div
                  className="lp-blog-card-cover"
                  style={{ background: BLOG_GRADIENTS[article.tagClass] || BLOG_GRADIENTS["tag-blue"] }}
                  aria-hidden="true"
                />
                <div className="lp-blog-card-body">
                  <div className="lp-blog-card-top">
                    <span className={`article-tag ${article.tagClass}`}>{article.tag}</span>
                    <span className="article-read-time">{article.readTime}</span>
                  </div>
                  <h3 className="lp-blog-card-title">{article.title}</h3>
                  <p className="lp-blog-card-intro">{article.intro}</p>
                  <div className="lp-blog-card-footer">
                    <span className="article-date">{article.date}</span>
                    <span className="lp-blog-card-cta lp-dark-link">Lire →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <Link to="/blog" className="lp-sims-all lp-dark-link">
            Voir tous les articles →
          </Link>
        </div>
      </section>

      {/* ── 9. FAQ ──────────────────────────────────────────────── */}
      <section className="lp-s lp-faq-wrap" aria-label="Questions fréquentes">
        <div className="lp-container">
          <div className="lp-section-header">
            <h2 className="lp-section-title">Questions fréquentes</h2>
            <p className="lp-section-sub">Les vraies questions que les gens posent sur Google — avec des réponses chiffrées</p>
          </div>
          <div className="lp-faq">
            {FAQ_ITEMS.map((item, i) => <FaqItem key={i} q={item.q} a={item.a} />)}
          </div>
        </div>
      </section>

      {/* ── 10. GAME PROMO ──────────────────────────────────────── */}
      <section className="lp-s lp-s-light lp-game-wrap" aria-label="ImmoMaestro">
        <div className="lp-container">
          <div className="lp-game-inner">
            <div className="lp-game-text">
              <span className="lp-game-badge">🏆 ImmoMaestro</span>
              <h2 className="lp-game-title">Avez-vous l'instinct immobilier ?</h2>
              <p className="lp-game-sub">10 profils réels — devinez si chaque personne devrait louer ou acheter. Le simulateur calcule la vraie réponse. Devenez Gourou de l'Immobilier !</p>
              <Link to="/jeu" className="btn-hero-primary lp-game-cta">
                Relever le défi →
              </Link>
            </div>
            <div className="lp-game-preview" aria-hidden="true">
              <div className="lp-game-card">
                <div className="lp-game-card-header">
                  <span>👩‍⚕️ Marie, 32 ans</span>
                  <span className="lp-game-score">7 / 10</span>
                </div>
                <p className="lp-game-card-q">Devrait-elle acheter à Lyon pour 245 000 € ?</p>
                <div className="lp-game-card-btns">
                  <span className="lp-game-btn-preview lp-game-btn-rent">🏢 Louer</span>
                  <span className="lp-game-btn-preview lp-game-btn-buy">🏠 Acheter</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 11. CITY PAGES ────────────────────────────────────────── */}
      <section className="lp-s lp-cities-wrap" aria-label="Analyse par ville">
        <div className="lp-container">
          <div className="lp-section-header">
            <h2 className="lp-section-title">Louer ou acheter par ville</h2>
            <p className="lp-section-sub">Analyse du marché local, simulation pré-remplie et FAQ immobilière pour chaque ville</p>
          </div>
          <div className="lp-cities-grid">
            {CITY_LIST.map((c) => (
              <Link key={c.id} to={`/villes/${c.id}`} className="lp-city-card">
                <span className="lp-city-card-emoji" aria-hidden="true">{c.emoji}</span>
                <div className="lp-city-card-body">
                  <strong className="lp-city-card-name">{c.name}</strong>
                  <span className="lp-city-card-price">{c.pricePerM2.toLocaleString("fr-FR")} €/m²</span>
                </div>
                <span className="lp-city-card-arrow" aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 12. NEWSLETTER ────────────────────────────────────────── */}
      <Newsletter />

      {/* ── 13. DISCLAIMER ────────────────────────────────────────── */}
      <p className="lp-disclaimer">
        Simulation à titre pédagogique — ne remplace pas un conseil patrimonial ou une offre de prêt.
      </p>
    </div>
  );
}
