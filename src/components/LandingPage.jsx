import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import TopBar from "./TopBar";
import Footer from "./Footer";

/* ─── Données villes ─────────────────────────────────────── */
const CITY_DATA = [
  { id:"paris",    name:"Paris",    priceM2:9800, rentRef:1500, breakEven:17, yield:"3.6%" },
  { id:"lyon",     name:"Lyon",     priceM2:4600, rentRef:950,  breakEven:11, yield:"4.8%" },
  { id:"marseille",name:"Marseille",priceM2:3400, rentRef:820,  breakEven:9,  yield:"5.6%" },
  { id:"bordeaux", name:"Bordeaux", priceM2:4200, rentRef:880,  breakEven:12, yield:"4.9%" },
  { id:"nantes",   name:"Nantes",   priceM2:3900, rentRef:820,  breakEven:11, yield:"4.9%" },
];

/* ─── Presets scénarios ──────────────────────────────────── */
const PRESETS = {
  paris: {
    price:380000, apport:76000, rent:1500, charges:150, duration:15,
    rate:3.5, loanYears:20, notaryPct:8, appRate:2.0, situation:"locataire",
  },
  region: {
    price:200000, apport:40000, rent:800, charges:80, duration:15,
    rate:3.5, loanYears:20, notaryPct:8, appRate:2.2, situation:"locataire",
  },
  budget: {
    price:130000, apport:15000, rent:600, charges:60, duration:10,
    rate:3.8, loanYears:25, notaryPct:8, appRate:1.8, situation:"locataire",
  },
};

/* ─── Hook scroll reveal ─────────────────────────────────── */
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("lp-visible"); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* ═══════════════════════════════════════════════════════════
   SECTION HERO
   ═══════════════════════════════════════════════════════════ */
function HeroSection() {
  const [city, setCity] = useState("paris");
  const c = CITY_DATA.find((x) => x.id === city);

  return (
    <section className="lp-hero">
      {/* Orbes animés — ambiance premium */}
      <div className="lp-hero-orb lp-hero-orb-1" aria-hidden="true" />
      <div className="lp-hero-orb lp-hero-orb-2" aria-hidden="true" />
      <div className="lp-hero-orb lp-hero-orb-3" aria-hidden="true" />

      <div className="lp-hero-inner">
        {/* Colonne gauche */}
        <div className="lp-hero-text">
          <div className="lp-hero-badge">
            <span className="lp-badge-green">
              ✦ Gratuit · Sans inscription · Résultat immédiat
            </span>
          </div>

          <h1 className="lp-hero-title">
            Louer <span className="lp-title-ou">ou</span><br />acheter ?
          </h1>

          <p className="lp-hero-subtitle">
            La vraie réponse dépend de <em>votre</em> situation — pas d'une règle générale.
            Notre simulateur calcule votre point d'équilibre exact en 2 minutes.
          </p>

          <div className="lp-hero-buttons">
            <Link to="/simulateur" className="lp-btn-primary">
              Lancer la simulation →
            </Link>
            <Link to="/simulateurs" className="lp-btn-outline">
              Tous les simulateurs
            </Link>
          </div>

          <div className="lp-hero-trust">
            <span className="lp-trust-pill">Données INSEE</span>
            <span className="lp-trust-sep">·</span>
            <span className="lp-trust-pill">Banque de France</span>
            <span className="lp-trust-sep">·</span>
            <span className="lp-trust-pill">Taux 2026</span>
          </div>

          {/* Mobile uniquement */}
          <div className="lp-hero-mobile-stats">
            <span className="lp-stat-pill">⏱ 2 min</span>
            <span className="lp-stat-pill">📊 Chiffré</span>
            <span className="lp-stat-pill">🔒 100% privé</span>
          </div>
        </div>

        {/* Colonne droite — widget ville interactif (desktop) */}
        <div className="lp-city-widget">
          <div className="lp-city-widget-header">
            <span className="lp-city-widget-title">Marché immobilier 2026</span>
          </div>

          <div className="lp-city-tabs">
            {CITY_DATA.map((x) => (
              <button
                key={x.id}
                type="button"
                className={`lp-city-tab${city === x.id ? " lp-city-tab-active" : ""}`}
                onClick={() => setCity(x.id)}
              >
                {x.name}
              </button>
            ))}
          </div>

          {c && (
            <div className="lp-city-stats">
              <div className="lp-city-stat">
                <span className="lp-city-stat-label">Prix médian</span>
                <span className="lp-city-stat-val">
                  {c.priceM2.toLocaleString("fr-FR")} €/m²
                </span>
              </div>
              <div className="lp-city-stat">
                <span className="lp-city-stat-label">Loyer de référence T2</span>
                <span className="lp-city-stat-val">
                  {c.rentRef.toLocaleString("fr-FR")} €/mois
                </span>
              </div>
              <div className="lp-city-stat">
                <span className="lp-city-stat-label">Rendement brut locatif</span>
                <span className="lp-city-stat-val">{c.yield}</span>
              </div>
              <div className="lp-city-stat lp-city-stat-highlight">
                <span className="lp-city-stat-label">Point d'équilibre achat</span>
                <span className="lp-city-stat-val lp-city-stat-cyan">
                  ~{c.breakEven} ans
                </span>
              </div>
              <Link to="/simulateur" className="lp-city-cta">
                Simuler pour {c.name} →
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   TRUST BAR
   ═══════════════════════════════════════════════════════════ */
function TrustBar() {
  return (
    <div className="lp-trust-bar">
      <div className="lp-trust-bar-inner">

        <div className="lp-trust-item">
          <svg className="lp-trust-icon" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
          </svg>
          <span>Sans compte ni email</span>
        </div>

        <div className="lp-trust-item">
          <svg className="lp-trust-icon" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
          </svg>
          <span>Données mises à jour en 2026</span>
        </div>

        <div className="lp-trust-item">
          <svg className="lp-trust-icon" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"/>
          </svg>
          <span>Résultat en moins de 2 minutes</span>
        </div>

        <div className="lp-trust-item">
          <svg className="lp-trust-icon" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
          </svg>
          <span>Outil indépendant · Sources officielles</span>
        </div>

      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   ACCROCHE ÉMOTIONNELLE
   ═══════════════════════════════════════════════════════════ */
function EmotionalHook() {
  const ref = useReveal();
  return (
    <section className="lp-section-white lp-emotional lp-s" ref={ref}>
      <div className="lp-container">
        <h2 className="lp-section-title lp-emotional-title">
          Êtes-vous en train de perdre de l'argent en louant ?
        </h2>
        <p className="lp-emotional-text">
          Ni la location ni l'achat n'est universellement gagnant. Tout dépend de trois
          paramètres précis : <strong>votre loyer actuel</strong>, le <strong>prix du bien
          visé</strong> et le <strong>nombre d'années</strong> que vous comptez y rester.
          En dessous d'un certain seuil de durée, acheter vous coûte plus cher qu'il ne vous rapporte.
          Notre simulateur calcule ce seuil pour vous — chiffres à l'appui.
        </p>
        <Link to="/simulateur" className="lp-btn-primary lp-emotional-cta">
          Calculer mon point d'équilibre →
        </Link>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   SCÉNARIOS TYPES
   ═══════════════════════════════════════════════════════════ */
function ScenariosSection() {
  const navigate = useNavigate();
  const ref = useReveal();

  const scenarios = [
    {
      key: "paris",
      emoji: "🏙️",
      label: "Paris / Grande métropole",
      price: "380 000 €",
      rent: "1 500 €/mois",
      breakEven: "~17 ans",
      desc: "Marché très tendu. L'achat est rentable uniquement si vous vous projetez sur le long terme.",
      color: "#1a56db",
    },
    {
      key: "region",
      emoji: "🏡",
      label: "Ville moyenne",
      price: "200 000 €",
      rent: "800 €/mois",
      breakEven: "~11 ans",
      desc: "Équilibre plus rapide. L'achat devient intéressant dès la 11e année de détention.",
      color: "#059669",
    },
    {
      key: "budget",
      emoji: "🏢",
      label: "Premier achat / Budget serré",
      price: "130 000 €",
      rent: "600 €/mois",
      breakEven: "~9 ans",
      desc: "Faible apport accepté. Le crédit reste accessible et le retour est plus rapide.",
      color: "#7c3aed",
    },
  ];

  const go = (key) => {
    try { sessionStorage.setItem("fv2_preset", JSON.stringify(PRESETS[key])); } catch {}
    navigate("/simulateur");
  };

  return (
    <section className="lp-section-gray lp-scenarios lp-s" ref={ref}>
      <div className="lp-container">
        <h2 className="lp-section-title">Commencer avec votre profil</h2>
        <p style={{ textAlign:"center", color:"var(--muted)", fontSize:15, margin:"-20px auto 32px", maxWidth:560 }}>
          Choisissez le scénario le plus proche de votre situation — toutes les valeurs sont pré-remplies et modifiables.
        </p>
        <div className="lp-scenarios-grid">
          {scenarios.map((s) => (
            <button
              key={s.key}
              type="button"
              className="lp-scenario-card"
              onClick={() => go(s.key)}
              aria-label={`Simuler le scénario ${s.label}`}
            >
              <span className="lp-scenario-emoji">{s.emoji}</span>
              <span className="lp-scenario-label">{s.label}</span>
              <span className="lp-scenario-price">{s.price}</span>
              <span className="lp-scenario-rent">Loyer équivalent : {s.rent}</span>
              <span className="lp-scenario-rent" style={{ color:"#059669", fontWeight:700 }}>
                Point d'équilibre : {s.breakEven}
              </span>
              <span className="lp-scenario-desc">{s.desc}</span>
              <span className="lp-scenario-cta">Simuler ce profil →</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   POURQUOI CE SIMULATEUR
   ═══════════════════════════════════════════════════════════ */
function WhySection() {
  const ref = useReveal();
  const features = [
    {
      icon: "🎯",
      title: "Calcul patrimonial complet",
      desc: "Mensualités, frais de notaire, taxe foncière, valorisation du bien, placement alternatif — rien n'est oublié.",
    },
    {
      icon: "🔒",
      title: "Données 100% privées",
      desc: "Aucun compte, aucun email. Tout le calcul s'effectue dans votre navigateur. Vos données ne quittent jamais votre appareil.",
    },
    {
      icon: "📊",
      title: "Sources officielles 2026",
      desc: "Taux BCE, indices IRL, prix Notaires de France, HCSF — nos paramètres sont calés sur les données de référence actuelles.",
    },
    {
      icon: "⚡",
      title: "Point d'équilibre en 2 min",
      desc: "6 questions, un graphique animé et le nombre d'années exact à partir duquel acheter devient plus rentable que louer.",
    },
  ];

  return (
    <section className="lp-section-white lp-why lp-s" ref={ref}>
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

/* ═══════════════════════════════════════════════════════════
   COMMENT ÇA MARCHE
   ═══════════════════════════════════════════════════════════ */
function HowItWorksSection() {
  const ref = useReveal();
  const steps = [
    {
      num: 1,
      title: "Décrivez votre situation",
      desc: "Locataire, hébergé ou propriétaire ? Revenus, apport, situation pro. Trois questions, moins d'une minute.",
      svg: (
        <svg viewBox="0 0 80 80" fill="none" className="lp-how-svg" aria-hidden="true">
          <circle cx="40" cy="40" r="36" fill="#dbeafe"/>
          <rect x="24" y="26" width="32" height="28" rx="5" fill="white" stroke="#93c5fd" strokeWidth="1.5"/>
          <rect x="30" y="33" width="20" height="3" rx="1.5" fill="#1a56db"/>
          <rect x="30" y="39" width="14" height="3" rx="1.5" fill="#93c5fd"/>
          <rect x="30" y="45" width="10" height="3" rx="1.5" fill="#bfdbfe"/>
          <circle cx="53" cy="53" r="11" fill="#1a56db"/>
          <path d="M49 53l3 3 5.5-6" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      num: 2,
      title: "Paramétrez votre projet",
      desc: "Prix du bien, taux d'intérêt, durée de détention. Les données de votre ville pré-remplissent automatiquement.",
      svg: (
        <svg viewBox="0 0 80 80" fill="none" className="lp-how-svg" aria-hidden="true">
          <circle cx="40" cy="40" r="36" fill="#dcfce7"/>
          <rect x="22" y="22" width="36" height="36" rx="6" fill="white" stroke="#a7f3d0" strokeWidth="1.5"/>
          <path d="M29 46l8-14 8 10 5-7" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="29" cy="46" r="3" fill="#059669"/>
          <circle cx="37" cy="32" r="3" fill="#059669"/>
          <circle cx="45" cy="42" r="3" fill="#059669"/>
          <circle cx="50" cy="35" r="3" fill="#059669"/>
        </svg>
      ),
    },
    {
      num: 3,
      title: "Votre analyse personnalisée",
      desc: "Graphique animé, point d'équilibre précis, patrimoine comparé à 20 ans. Le tout en clair et actionnable.",
      svg: (
        <svg viewBox="0 0 80 80" fill="none" className="lp-how-svg" aria-hidden="true">
          <circle cx="40" cy="40" r="36" fill="#fef3c7"/>
          <rect x="22" y="22" width="36" height="36" rx="6" fill="white" stroke="#fcd34d" strokeWidth="1.5"/>
          <path d="M30 50l6-10 6 6 8-14" stroke="#d97706" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M30 50l6-10 6 6 8-14" stroke="#d97706" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="0" opacity="0.3" strokeWidth="6"/>
          <line x1="30" y1="52" x2="50" y2="52" stroke="#fcd34d" strokeWidth="1.2"/>
          <line x1="28" y1="28" x2="28" y2="52" stroke="#fcd34d" strokeWidth="1.2"/>
        </svg>
      ),
    },
  ];

  return (
    <section className="lp-section-lightblue lp-how lp-s" ref={ref}>
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
        <div style={{ textAlign:"center", marginTop:40 }}>
          <Link to="/simulateur" className="lp-btn-primary" style={{ display:"inline-flex" }}>
            Démarrer maintenant →
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   SIMULATEURS
   ═══════════════════════════════════════════════════════════ */
function SimulateursSection() {
  const ref = useReveal();
  const sims = [
    {
      icon: "🏠",
      title: "Louer vs Acheter",
      desc: "Le comparatif patrimonial complet. Point d'équilibre, graphique animé, analyse sur mesure.",
      href: "/simulateur",
      highlight: true,
      badge: "Principal",
    },
    {
      icon: "🏦",
      title: "Simulateur de prêt",
      desc: "Mensualité, coût total des intérêts et tableau d'amortissement selon votre taux et durée.",
      href: "/simulateurs/pret-immobilier",
    },
    {
      icon: "📊",
      title: "Capacité d'emprunt",
      desc: "Calculez précisément combien vous pouvez emprunter en respectant le ratio HCSF de 35 %.",
      href: "/simulateurs/endettement",
    },
    {
      icon: "♻️",
      title: "Impact DPE & rénovation",
      desc: "Décote d'un bien énergivore, économies après travaux et ROI de la rénovation énergétique.",
      href: "/simulateurs/impact-dpe",
    },
    {
      icon: "📈",
      title: "Rentabilité locative",
      desc: "Rendement brut, net et cashflow mensuel pour votre investissement locatif.",
      href: "/simulateurs/rentabilite-locative",
    },
    {
      icon: "🧾",
      title: "Frais de notaire",
      desc: "Estimez les frais d'acquisition au centime près — ancien, neuf ou VEFA.",
      href: "/simulateurs/frais-notaire",
    },
  ];

  return (
    <section className="lp-section-white lp-sims lp-s" ref={ref}>
      <div className="lp-container">
        <h2 className="lp-section-title">27 simulateurs gratuits</h2>
        <p style={{ textAlign:"center", color:"var(--muted)", fontSize:15, margin:"-20px auto 32px", maxWidth:520 }}>
          Du calcul de prêt au DPE en passant par la plus-value — tous les outils pour décider sans se tromper.
        </p>
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
              <span className="lp-sim-cta">Ouvrir →</span>
              {s.badge && <span className="lp-sim-badge">{s.badge}</span>}
            </Link>
          ))}
        </div>
        <p style={{ textAlign:"center", marginTop:24 }}>
          <Link to="/simulateurs" style={{ fontSize:14, fontWeight:700, color:"var(--blue)", textDecoration:"none" }}>
            Voir les 27 simulateurs →
          </Link>
        </p>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   FAQ
   ═══════════════════════════════════════════════════════════ */
const FAQ_ITEMS = [
  {
    q: "Est-il plus rentable de louer ou d'acheter en 2026 ?",
    a: "Il n'y a pas de réponse universelle. À Paris, il faut souvent rester plus de 15 ans pour que l'achat soit rentable face à un locataire qui investit son apport. En ville moyenne, ce seuil descend à 9-11 ans. Les taux entre 3,5 et 4 % en 2026 rendent l'achat plus accessible qu'en 2023, mais chaque situation est différente. Notre simulateur calcule votre seuil exact.",
  },
  {
    q: "Combien d'années faut-il rester pour rentabiliser un achat ?",
    a: "En moyenne nationale, entre 8 et 14 ans. Dans les grandes métropoles (Paris, Lyon, Bordeaux), le point d'équilibre est autour de 11-17 ans. Dans les villes moyennes, il peut être atteint dès 7-10 ans. Ces durées varient selon les taux d'intérêt, le prix du bien, votre apport et le loyer équivalent.",
  },
  {
    q: "Quel apport minimum faut-il pour acheter ?",
    a: "Il faut au minimum 10 % du prix pour couvrir les frais de notaire (7-8 % dans l'ancien). Les banques recommandent idéalement 20 % pour obtenir les meilleures conditions de taux et respecter les critères HCSF. Un apport plus élevé réduit le coût total du crédit et améliore votre dossier bancaire.",
  },
  {
    q: "Les taux immobiliers vont-ils continuer à baisser en 2026 ?",
    a: "Après le cycle de hausse 2022-2023 (pic à 4,5 %), la BCE a amorcé un assouplissement. Les taux se situent en 2026 entre 3,2 % et 3,9 % selon les profils et les durées. Les projections suggèrent une légère stabilisation à ces niveaux. Notre simulateur utilise un taux de 3,5 % par défaut, que vous pouvez ajuster librement.",
  },
  {
    q: "Ce simulateur est-il vraiment gratuit et sans données personnelles ?",
    a: "Oui, à 100 %. Aucune inscription, aucun email, aucun cookie de tracking imposé. Tous les calculs s'effectuent localement dans votre navigateur — aucune donnée n'est envoyée à nos serveurs. L'outil est financé par la publicité contextuelle et restera toujours gratuit et indépendant.",
  },
];

function FAQSection() {
  const [open, setOpen] = useState(null);
  const ref = useReveal();

  return (
    <section className="lp-section-gray lp-faq lp-s" ref={ref}>
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

/* ═══════════════════════════════════════════════════════════
   NEWSLETTER
   ═══════════════════════════════════════════════════════════ */
function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const ref = useReveal();

  const submit = (e) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    setStatus("done");
  };

  return (
    <section className="lp-newsletter lp-s" ref={ref}>
      <div className="lp-container">
        <h2 className="lp-newsletter-title">Le marché immobilier, chaque mois</h2>
        <p className="lp-newsletter-subtitle">
          Taux directeurs BCE, tendances de prix par ville, nouveaux simulateurs — une synthèse
          mensuelle lisible en 3 minutes.
        </p>
        {status === "done" ? (
          <div className="lp-newsletter-success">
            ✅ Parfait ! Vous recevrez la prochaine édition directement dans votre boîte.
          </div>
        ) : (
          <form className="lp-newsletter-form" onSubmit={submit}>
            <input
              type="email"
              required
              className="lp-newsletter-input"
              placeholder="votre@email.fr"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" className="lp-newsletter-btn">
              S'abonner gratuitement
            </button>
          </form>
        )}
        <p className="lp-newsletter-privacy">
          Aucun spam · Désabonnement en un clic · Données jamais revendues
        </p>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   LANDING PAGE — EXPORT
   ═══════════════════════════════════════════════════════════ */
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
