import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TopBar from "./TopBar";
import Footer from "./Footer";

/* ─── City data for hero widget ──────────────────────────── */
const CITY_DATA = [
  { id: "paris",    name: "Paris",    priceM2: 9800, rentRef: 1500, breakEven: 18 },
  { id: "lyon",     name: "Lyon",     priceM2: 4600, rentRef: 950,  breakEven: 11 },
  { id: "marseille",name: "Marseille",priceM2: 3400, rentRef: 820,  breakEven: 9  },
  { id: "bordeaux", name: "Bordeaux", priceM2: 4200, rentRef: 880,  breakEven: 12 },
  { id: "nantes",   name: "Nantes",   priceM2: 3900, rentRef: 820,  breakEven: 11 },
];

/* ─── Presets for scenario cards ─────────────────────────── */
const PRESETS = {
  paris: {
    price: 380000, apport: 76000, rent: 1500, charges: 150, duration: 15,
    rate: 3.5, loanYears: 20, notaryPct: 8, appRate: 2.0, situation: "locataire",
  },
  region: {
    price: 200000, apport: 40000, rent: 800, charges: 80, duration: 15,
    rate: 3.5, loanYears: 20, notaryPct: 8, appRate: 2.2, situation: "locataire",
  },
  budget: {
    price: 130000, apport: 15000, rent: 600, charges: 60, duration: 10,
    rate: 3.8, loanYears: 25, notaryPct: 8, appRate: 1.8, situation: "locataire",
  },
};

/* ─── Hero Section ───────────────────────────────────────── */
function HeroSection() {
  const [selectedCity, setSelectedCity] = useState("paris");
  const city = CITY_DATA.find((c) => c.id === selectedCity);

  return (
    <section className="lp-hero">
      <div className="lp-hero-inner">
        {/* Left: text content */}
        <div className="lp-hero-text">
          <h1 className="lp-hero-title">
            Louer <span className="lp-title-ou">ou</span> acheter
          </h1>
          <p className="lp-hero-subtitle">
            La réponse dépend de votre situation — en 2 minutes chrono
          </p>
          <div className="lp-hero-badge">
            <span className="lp-badge-green">Simulateur gratuit · Sans inscription</span>
          </div>
          <div className="lp-hero-buttons">
            <Link to="/simulateur" className="lp-btn-primary">
              Lancer la simulation
            </Link>
            <Link to="/simulateurs" className="lp-btn-outline">
              Voir les simulateurs
            </Link>
          </div>
          <div className="lp-hero-trust">
            <span className="lp-trust-pill">Données INSEE</span>
            <span className="lp-trust-sep">·</span>
            <span className="lp-trust-pill">Banque de France</span>
            <span className="lp-trust-sep">·</span>
            <span className="lp-trust-pill">Mis à jour 2026</span>
          </div>
          {/* Mobile: stat pills instead of city widget */}
          <div className="lp-hero-mobile-stats">
            <span className="lp-stat-pill">2 min</span>
            <span className="lp-stat-pill">6 étapes</span>
            <span className="lp-stat-pill">100% gratuit</span>
          </div>
        </div>

        {/* Right: city widget (desktop only) */}
        <div className="lp-city-widget">
          <div className="lp-city-widget-header">
            <span className="lp-city-widget-title">Marché immobilier 2026</span>
          </div>
          <div className="lp-city-tabs">
            {CITY_DATA.map((c) => (
              <button
                key={c.id}
                className={`lp-city-tab${selectedCity === c.id ? " lp-city-tab-active" : ""}`}
                onClick={() => setSelectedCity(c.id)}
                type="button"
              >
                {c.name}
              </button>
            ))}
          </div>
          {city && (
            <div className="lp-city-stats">
              <div className="lp-city-stat">
                <span className="lp-city-stat-label">Prix moyen</span>
                <span className="lp-city-stat-val">
                  {city.priceM2.toLocaleString("fr-FR")} €/m²
                </span>
              </div>
              <div className="lp-city-stat">
                <span className="lp-city-stat-label">Loyer de référence</span>
                <span className="lp-city-stat-val">
                  {city.rentRef.toLocaleString("fr-FR")} €/mois
                </span>
              </div>
              <div className="lp-city-stat lp-city-stat-highlight">
                <span className="lp-city-stat-label">Point d'équilibre</span>
                <span className="lp-city-stat-val lp-city-stat-cyan">
                  ~{city.breakEven} ans
                </span>
              </div>
              <Link to="/simulateur" className="lp-city-cta">
                Simuler pour {city.name} →
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ─── Trust Bar ──────────────────────────────────────────── */
function TrustBar() {
  return (
    <div className="lp-trust-bar">
      <div className="lp-trust-bar-inner">
        <div className="lp-trust-item">
          <svg className="lp-trust-icon" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          <span>Gratuit &amp; sans inscription</span>
        </div>
        <div className="lp-trust-item">
          <svg className="lp-trust-icon" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
          </svg>
          <span>Données actualisées 2026</span>
        </div>
        <div className="lp-trust-item">
          <svg className="lp-trust-icon" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
          </svg>
          <span>Calcul instantané</span>
        </div>
        <div className="lp-trust-item">
          <svg className="lp-trust-icon" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span>100% indépendant</span>
        </div>
      </div>
    </div>
  );
}

/* ─── Emotional Hook ─────────────────────────────────────── */
function EmotionalHook() {
  return (
    <section className="lp-section-white lp-emotional">
      <div className="lp-container">
        <h2 className="lp-section-title lp-emotional-title">
          Perdez-vous de l'argent en louant ?
        </h2>
        <p className="lp-emotional-text">
          La réponse dépend de 3 facteurs clés : votre <strong>loyer actuel</strong>,
          le <strong>prix du bien</strong> que vous envisagez d'acheter, et la{" "}
          <strong>durée prévue</strong> dans ce logement. Notre simulateur analyse
          votre situation exacte et vous donne un chiffre précis — pas une généralité.
        </p>
        <Link to="/simulateur" className="lp-btn-primary lp-emotional-cta">
          Découvrir ma situation
        </Link>
      </div>
    </section>
  );
}

/* ─── Scénarios Types ────────────────────────────────────── */
function ScenariosSection() {
  const navigate = useNavigate();

  const scenarios = [
    {
      key: "paris",
      emoji: "🏙️",
      label: "Paris / Grande ville",
      price: "~380 000 €",
      rent: "~1 500 €/mois",
      desc: "Marché tendu, rentabilité longue",
    },
    {
      key: "region",
      emoji: "🏡",
      label: "Ville moyenne",
      price: "~220 000 €",
      rent: "~800 €/mois",
      desc: "Équilibre achat/location raisonnable",
    },
    {
      key: "budget",
      emoji: "🏢",
      label: "Budget serré",
      price: "~150 000 €",
      rent: "~600 €/mois",
      desc: "Achat accessible, faible apport",
    },
  ];

  const handleScenario = (key) => {
    try {
      sessionStorage.setItem("fv2_preset", JSON.stringify(PRESETS[key]));
    } catch {}
    navigate("/simulateur");
  };

  return (
    <section className="lp-section-gray lp-scenarios">
      <div className="lp-container">
        <h2 className="lp-section-title">Commencer avec un scénario</h2>
        <div className="lp-scenarios-grid">
          {scenarios.map((s) => (
            <button
              key={s.key}
              type="button"
              className="lp-scenario-card"
              onClick={() => handleScenario(s.key)}
            >
              <span className="lp-scenario-emoji">{s.emoji}</span>
              <span className="lp-scenario-label">{s.label}</span>
              <span className="lp-scenario-price">{s.price}</span>
              <span className="lp-scenario-rent">{s.rent}</span>
              <span className="lp-scenario-desc">{s.desc}</span>
              <span className="lp-scenario-cta">Simuler ce scénario →</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Why This Simulator ─────────────────────────────────── */
function WhySection() {
  const features = [
    {
      icon: "🎯",
      title: "Calcul complet",
      desc: "Mensualités, frais de notaire, valorisation, placement alternatif — tout y est.",
    },
    {
      icon: "🔒",
      title: "100% privé",
      desc: "Aucune donnée transmise, aucune inscription. Tout reste sur votre appareil.",
    },
    {
      icon: "📊",
      title: "Données réelles 2026",
      desc: "Taux, prix, indices IRL et taxe foncière mis à jour en temps réel.",
    },
    {
      icon: "⚡",
      title: "Résultat en 2 minutes",
      desc: "6 questions, un graphique animé et votre point d'équilibre exact.",
    },
  ];

  return (
    <section className="lp-section-white lp-why">
      <div className="lp-container">
        <h2 className="lp-section-title">Pourquoi ce simulateur ?</h2>
        <div className="lp-why-grid">
          {features.map((f) => (
            <div key={f.title} className="lp-why-card">
              <span className="lp-why-icon">{f.icon}</span>
              <h3 className="lp-why-title">{f.title}</h3>
              <p className="lp-why-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── How It Works ───────────────────────────────────────── */
function HowItWorksSection() {
  const steps = [
    {
      num: 1,
      title: "Décrivez votre situation",
      desc: "Locataire, revenus, apport. 3 questions, 1 minute.",
      svg: (
        <svg viewBox="0 0 80 80" fill="none" className="lp-how-svg" aria-hidden="true">
          <circle cx="40" cy="40" r="36" fill="#dbeafe" />
          <rect x="24" y="28" width="32" height="24" rx="4" fill="#1a56db" opacity=".15" />
          <rect x="28" y="34" width="20" height="3" rx="1.5" fill="#1a56db" />
          <rect x="28" y="40" width="14" height="3" rx="1.5" fill="#1a56db" opacity=".6" />
          <circle cx="52" cy="52" r="10" fill="#1a56db" />
          <path d="M48 52l3 3 5-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      num: 2,
      title: "Paramétrez votre projet",
      desc: "Prix du bien, durée, taux. Nos données pré-remplissent.",
      svg: (
        <svg viewBox="0 0 80 80" fill="none" className="lp-how-svg" aria-hidden="true">
          <circle cx="40" cy="40" r="36" fill="#d1fae5" />
          <rect x="22" y="24" width="36" height="32" rx="5" fill="#059669" opacity=".12" />
          <path d="M30 44l8-12 7 8 5-5" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="30" cy="44" r="2.5" fill="#059669" />
          <circle cx="38" cy="32" r="2.5" fill="#059669" />
          <circle cx="45" cy="40" r="2.5" fill="#059669" />
          <circle cx="50" cy="35" r="2.5" fill="#059669" />
        </svg>
      ),
    },
    {
      num: 3,
      title: "Recevez votre résultat",
      desc: "Graphique animé, point d'équilibre, patrimoine à 20 ans.",
      svg: (
        <svg viewBox="0 0 80 80" fill="none" className="lp-how-svg" aria-hidden="true">
          <circle cx="40" cy="40" r="36" fill="#fef3c7" />
          <circle cx="40" cy="38" r="14" fill="#d97706" opacity=".15" />
          <path d="M33 38l5 5 9-10" stroke="#d97706" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M40 24v-4M40 58v-4M56 38h4M20 38h4" stroke="#d97706" strokeWidth="2" strokeLinecap="round" opacity=".4" />
        </svg>
      ),
    },
  ];

  return (
    <section className="lp-section-lightblue lp-how">
      <div className="lp-container">
        <h2 className="lp-section-title">Comment ça marche ?</h2>
        <div className="lp-how-steps">
          {steps.map((s) => (
            <div key={s.num} className="lp-how-step">
              <div className="lp-how-step-top">
                <span className="lp-how-num">{s.num}</span>
                {s.svg}
              </div>
              <h3 className="lp-how-title">{s.title}</h3>
              <p className="lp-how-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Simulateurs Section ────────────────────────────────── */
function SimulateursSection() {
  const sims = [
    {
      icon: "🏠",
      title: "Louer vs Acheter",
      desc: "Le comparatif principal, chiffré en 2 minutes.",
      href: "/simulateur",
      highlight: true,
    },
    {
      icon: "🏦",
      title: "Prêt immobilier",
      desc: "Mensualité, coût total, tableau d'amortissement.",
      href: "/simulateurs/pret-immobilier",
    },
    {
      icon: "📊",
      title: "Capacité d'emprunt",
      desc: "Combien pouvez-vous emprunter ?",
      href: "/simulateurs/endettement",
    },
    {
      icon: "♻️",
      title: "Impact DPE",
      desc: "Décote, économies et ROI de la rénovation.",
      href: "/simulateurs/impact-dpe",
    },
    {
      icon: "📈",
      title: "Rentabilité locative",
      desc: "Calculez le rendement d'un investissement.",
      href: "/simulateurs/rentabilite-locative",
    },
    {
      icon: "🧾",
      title: "Frais de notaire",
      desc: "Calculez les frais à l'acquisition.",
      href: "/simulateurs/frais-notaire",
    },
  ];

  return (
    <section className="lp-section-white lp-sims">
      <div className="lp-container">
        <h2 className="lp-section-title">Tous nos simulateurs gratuits</h2>
        <div className="lp-sims-grid">
          {sims.map((s) => (
            <Link
              key={s.href}
              to={s.href}
              className={`lp-sim-card${s.highlight ? " lp-sim-card-highlight" : ""}`}
            >
              <span className="lp-sim-icon">{s.icon}</span>
              <span className="lp-sim-title">{s.title}</span>
              <span className="lp-sim-desc">{s.desc}</span>
              {s.highlight && <span className="lp-sim-badge">Principal</span>}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── FAQ ────────────────────────────────────────────────── */
const FAQ_ITEMS = [
  {
    q: "Est-il plus rentable de louer ou d'acheter en 2026 ?",
    a: "Il n'y a pas de réponse universelle : tout dépend de la durée de détention, de la ville, et du rapport prix/loyer local. À Paris, il faut souvent rester plus de 15 ans pour que l'achat soit rentable. En province, ce seuil peut descendre à 7-9 ans. Notre simulateur calcule votre seuil exact en fonction de votre situation.",
  },
  {
    q: "Combien d'années faut-il rester pour rentabiliser un achat ?",
    a: "En moyenne, il faut entre 7 et 12 ans selon la ville. Dans les grandes métropoles (Paris, Lyon, Bordeaux), le point d'équilibre est autour de 10-15 ans. Dans les villes moyennes, il peut être atteint dès 6-8 ans. Ces durées varient selon les taux, le prix du bien et votre apport.",
  },
  {
    q: "Quel apport minimum faut-il pour acheter ?",
    a: "En règle générale, il faut au minimum 10% du prix pour couvrir les frais de notaire (7-8% dans l'ancien). Les banques recommandent idéalement 20% pour obtenir les meilleures conditions de prêt. Un apport plus élevé réduit le coût total du crédit et facilite l'obtention du financement.",
  },
  {
    q: "Les taux immobiliers vont-ils baisser en 2026 ?",
    a: "La BCE a amorcé un cycle de baisse des taux depuis 2024. En 2026, les taux immobiliers se situent entre 3,2% et 3,8% selon les profils et les durées. Les prévisions suggèrent une légère stabilisation. Notre simulateur utilise des taux réalistes que vous pouvez ajuster selon votre situation.",
  },
  {
    q: "Ce simulateur est-il vraiment gratuit et sans inscription ?",
    a: "Oui, à 100%. Aucune inscription, aucun email requis. Toutes les données restent sur votre appareil et ne sont jamais transmises à un serveur. Le simulateur est financé par la publicité et restera toujours gratuit et indépendant.",
  },
];

function FAQSection() {
  const [open, setOpen] = useState(null);

  return (
    <section className="lp-section-gray lp-faq">
      <div className="lp-container">
        <h2 className="lp-section-title">Questions fréquentes</h2>
        <div className="lp-faq-list">
          {FAQ_ITEMS.map((item, i) => (
            <div
              key={i}
              className={`lp-faq-item${open === i ? " lp-faq-item-open" : ""}`}
            >
              <button
                type="button"
                className="lp-faq-question"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span>{item.q}</span>
                <span className="lp-faq-chevron" aria-hidden="true">
                  {open === i ? "−" : "+"}
                </span>
              </button>
              <div className="lp-faq-answer">
                <p>{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Newsletter ─────────────────────────────────────────── */
function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | submitted

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    setStatus("submitted");
  };

  return (
    <section className="lp-newsletter">
      <div className="lp-container">
        <h2 className="lp-newsletter-title">Restez informé du marché</h2>
        <p className="lp-newsletter-subtitle">
          Recevez les tendances immobilières chaque mois — taux, villes, analyses.
        </p>
        {status === "submitted" ? (
          <div className="lp-newsletter-success">
            Merci ! Vous recevrez notre prochaine newsletter immobilière.
          </div>
        ) : (
          <form className="lp-newsletter-form" onSubmit={handleSubmit}>
            <input
              type="email"
              className="lp-newsletter-input"
              placeholder="votre@email.fr"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="lp-newsletter-btn">
              S'abonner
            </button>
          </form>
        )}
        <p className="lp-newsletter-privacy">
          Aucun spam · Désabonnement en un clic · Données non partagées
        </p>
      </div>
    </section>
  );
}

/* ─── Main LandingPage ───────────────────────────────────── */
export default function LandingPage() {
  return (
    <div className="lp-root">
      <TopBar />
      <main id="main-content">
        <HeroSection />
        <TrustBar />
        <EmotionalHook />
        <ScenariosSection />
        <WhySection />
        <HowItWorksSection />
        <SimulateursSection />
        <FAQSection />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
}
