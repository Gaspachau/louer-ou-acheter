import { useState, useEffect, useRef, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import TopBar from "./TopBar";
import Footer from "./Footer";

/* ─── Helpers ────────────────────────────────────────────── */
const fmtK = (v) =>
  Math.abs(v) >= 1000
    ? `${(v / 1000).toLocaleString("fr-FR", { maximumFractionDigits: 0 })} k€`
    : `${Math.round(v)} €`;

/* ─── 10 villes (valeurs pré-calculées 50 m², 20 ans, 3,5 %, 15 ans) ── */
const HERO_CITIES = [
  { id:"paris",      name:"Paris",       mensualite:2283, patAchat:504000, patLoc:546000, advantage:42000,  isBuy:false, price:490000, rentRef:1500 },
  { id:"lyon",       name:"Lyon",        mensualite:1072, patAchat:237000, patLoc:174000, advantage:63000,  isBuy:true,  price:230000, rentRef:950  },
  { id:"marseille",  name:"Marseille",   mensualite: 792, patAchat:175000, patLoc: 98000, advantage:77000,  isBuy:true,  price:170000, rentRef:820  },
  { id:"bordeaux",   name:"Bordeaux",    mensualite: 979, patAchat:216000, patLoc:155000, advantage:61000,  isBuy:true,  price:210000, rentRef:880  },
  { id:"nantes",     name:"Nantes",      mensualite: 908, patAchat:201000, patLoc:142000, advantage:59000,  isBuy:true,  price:195000, rentRef:820  },
  { id:"toulouse",   name:"Toulouse",    mensualite: 839, patAchat:185000, patLoc:120000, advantage:65000,  isBuy:true,  price:180000, rentRef:800  },
  { id:"lille",      name:"Lille",       mensualite: 745, patAchat:165000, patLoc: 95000, advantage:70000,  isBuy:true,  price:160000, rentRef:760  },
  { id:"strasbourg", name:"Strasbourg",  mensualite: 815, patAchat:180000, patLoc:116000, advantage:64000,  isBuy:true,  price:175000, rentRef:780  },
  { id:"nice",       name:"Nice",        mensualite:1211, patAchat:267000, patLoc:208000, advantage:59000,  isBuy:true,  price:260000, rentRef:1030 },
  { id:"rennes",     name:"Rennes",      mensualite: 862, patAchat:190000, patLoc:132000, advantage:58000,  isBuy:true,  price:185000, rentRef:790  },
];

/* ─── Presets scénarios ──────────────────────────────────── */
const PRESETS = {
  paris:  { price:380000, apport:76000,  rent:1500, charges:150, duration:15, rate:3.5, loanYears:20, notaryPct:8, appRate:2.0, situation:"locataire" },
  region: { price:200000, apport:40000,  rent:800,  charges:80,  duration:15, rate:3.5, loanYears:20, notaryPct:8, appRate:2.2, situation:"locataire" },
  budget: { price:130000, apport:15000,  rent:600,  charges:60,  duration:10, rate:3.8, loanYears:25, notaryPct:8, appRate:1.8, situation:"locataire" },
};

/* ─── Animated counter hook ──────────────────────────────── */
function useAnimatedValue(target, duration = 450) {
  const [displayed, setDisplayed] = useState(target);
  const prevRef = useRef(target);
  const rafRef  = useRef(null);
  useEffect(() => {
    const from = prevRef.current;
    const to   = target;
    if (from === to) return;
    cancelAnimationFrame(rafRef.current);
    const start = performance.now();
    const easeOut = (t) => 1 - Math.pow(1 - t, 3);
    const animate = (now) => {
      const t = Math.min((now - start) / duration, 1);
      setDisplayed(Math.round(from + (to - from) * easeOut(t)));
      if (t < 1) rafRef.current = requestAnimationFrame(animate);
      else prevRef.current = to;
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration]);
  return displayed;
}

/* ─── Scroll-reveal hook ─────────────────────────────────── */
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("lp-visible"); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* ════════════════════════════════════════════════════════════
   SECTION 1 — HERO
   ════════════════════════════════════════════════════════════ */
function HeroSection() {
  const navigate = useNavigate();
  const [activeCity, setActiveCity] = useState("paris");
  const c = HERO_CITIES.find((x) => x.id === activeCity);
  const maxPat = Math.max(c.patAchat, c.patLoc);
  const pctBuy  = Math.round((c.patAchat / maxPat) * 100);
  const pctRent = Math.round((c.patLoc   / maxPat) * 100);

  /* Animated counters */
  const animMensualite = useAnimatedValue(c.mensualite);
  const animPatAchat   = useAnimatedValue(c.patAchat);
  const animPatLoc     = useAnimatedValue(c.patLoc);
  const animAdvantage  = useAnimatedValue(c.advantage);
  const animPctBuy     = useAnimatedValue(pctBuy);
  const animPctRent    = useAnimatedValue(pctRent);

  const launchCity = () => {
    try {
      sessionStorage.setItem("fv2_preset", JSON.stringify({
        price: c.price, apport: Math.round(c.price * 0.2),
        rent: c.rentRef, charges: 80, duration: 15,
        rate: 3.5, loanYears: 20, notaryPct: 8, appRate: 2.0,
        situation: "locataire",
      }));
    } catch {}
    navigate("/simulateur");
  };

  return (
    <section className="lph-hero">
      <div className="lph-hero-glow" aria-hidden="true" />
      <div className="lph-container lph-hero-inner">

        {/* ── Texte gauche ── */}
        <div className="lph-hero-text">
          <div className="lph-badge-pill">
            <span className="lph-live-dot" aria-hidden="true" />
            Simulateur gratuit · Sans inscription
          </div>

          <h1 className="lph-title">
            Louer <span className="lph-ou">ou</span><br />
            <span className="lph-acheter">acheter ?</span>
          </h1>

          <p className="lph-subtitle">
            La réponse chiffrée en&nbsp;2&nbsp;minutes,<br />
            basée sur votre situation réelle.
          </p>

          <div className="lph-btns">
            <Link to="/simulateur" className="lph-btn-primary">
              Lancer ma simulation
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <Link to="/simulateurs" className="lph-btn-ghost">
              Explorer les outils
            </Link>
          </div>

          <div className="lph-check-badges">
            <span className="lph-check-badge">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <circle cx="7" cy="7" r="7" fill="#16a34a"/>
                <path d="M4 7l2.2 2.2L10 5" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Données INSEE &amp; Banque de France
            </span>
            <span className="lph-check-badge">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <circle cx="7" cy="7" r="7" fill="#16a34a"/>
                <path d="M4 7l2.2 2.2L10 5" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Mis à jour 2026
            </span>
          </div>

          {/* Stats mobile uniquement */}
          <div className="lph-mobile-stats">
            <div className="lph-ms-item">
              <span className="lph-ms-val">2 min</span>
              <span className="lph-ms-lbl">Résultat</span>
            </div>
            <div className="lph-ms-sep" />
            <div className="lph-ms-item">
              <span className="lph-ms-val">27</span>
              <span className="lph-ms-lbl">Outils</span>
            </div>
            <div className="lph-ms-sep" />
            <div className="lph-ms-item">
              <span className="lph-ms-val">100%</span>
              <span className="lph-ms-lbl">Gratuit</span>
            </div>
          </div>
        </div>

        {/* ── Carte premium droite (desktop) ── */}
        <div className="lph-card" aria-hidden="true">

          {/* Barre titre style macOS */}
          <div className="lph-card-titlebar">
            <div className="lph-mac-dots">
              <span className="lph-dot lph-dot-r" />
              <span className="lph-dot lph-dot-o" />
              <span className="lph-dot lph-dot-g" />
            </div>
            <span className="lph-titlebar-text">Résultat de simulation</span>
            <span className="lph-card-live"><span className="lph-live-blink" />LIVE</span>
          </div>

          {/* Pills villes */}
          <div className="lph-city-pills">
            {HERO_CITIES.map((x) => (
              <button key={x.id} type="button"
                className={`lph-city-pill${activeCity === x.id ? " lph-city-on" : ""}`}
                onClick={() => setActiveCity(x.id)}
              >{x.name}</button>
            ))}
          </div>

          {/* Métriques — label gauche, valeur droite en gras */}
          <div className="lph-card-metrics">
            <div className="lph-metric">
              <span className="lph-metric-lbl">💳 Mensualité crédit</span>
              <strong className="lph-metric-val">{animMensualite.toLocaleString("fr-FR")} €<span className="lph-unit">/mois</span></strong>
            </div>
            <div className="lph-metric">
              <span className="lph-metric-lbl">🏠 Patrimoine achat</span>
              <strong className="lph-metric-val lph-blue">{fmtK(animPatAchat)}</strong>
            </div>
            <div className="lph-metric">
              <span className="lph-metric-lbl">🔑 Patrimoine location</span>
              <strong className="lph-metric-val lph-cyan">{fmtK(animPatLoc)}</strong>
            </div>
          </div>

          {/* Barres de progression animées */}
          <div className="lph-bars">
            <div className="lph-bar-row">
              <span className="lph-bar-lbl">Achat</span>
              <div className="lph-bar-track">
                <div className="lph-bar-fill lph-bar-b" style={{ width: `${animPctBuy}%` }} />
              </div>
              <span className="lph-bar-pct">{animPctBuy}%</span>
            </div>
            <div className="lph-bar-row">
              <span className="lph-bar-lbl">Location</span>
              <div className="lph-bar-track">
                <div className="lph-bar-fill lph-bar-a" style={{ width: `${animPctRent}%` }} />
              </div>
              <span className="lph-bar-pct">{animPctRent}%</span>
            </div>
          </div>

          {/* Encadré recommandation coloré */}
          <div className={`lph-recommend ${c.isBuy ? "lph-rec-buy" : "lph-rec-rent"}`}>
            <span className="lph-rec-icon">{c.isBuy ? "✅" : "ℹ️"}</span>
            <div className="lph-rec-body">
              <span className="lph-rec-title">
                {c.isBuy ? "Acheter recommandé" : "Location avantageuse"}
              </span>
              <span className="lph-rec-detail">
                {c.isBuy ? "+" : "−"}{fmtK(animAdvantage)} en faveur de {c.isBuy ? "l'achat" : "la location"} · {c.name}
              </span>
            </div>
          </div>

          <button type="button" className="lph-card-cta" onClick={launchCity}>
            Simuler votre situation →
          </button>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   SECTION 2 — TRUST BAR
   ════════════════════════════════════════════════════════════ */
function TrustBar() {
  const items = [
    { label: "Gratuit et sans inscription",
      icon: <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/></svg> },
    { label: "Données actualisées 2026",
      icon: <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/></svg> },
    { label: "Calcul instantané",
      icon: <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"/></svg> },
    { label: "100 % indépendant",
      icon: <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg> },
  ];
  return (
    <div className="lph-trust">
      <div className="lph-trust-inner lph-container">
        {items.map((item, i) => (
          <Fragment key={i}>
            <div className="lph-trust-item">
              <span className="lph-trust-icon">{item.icon}</span>
              <span>{item.label}</span>
            </div>
            {i < items.length - 1 && <div className="lph-trust-sep" aria-hidden="true" />}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   SECTION 3 — ACCROCHE ÉMOTIONNELLE
   ════════════════════════════════════════════════════════════ */
function EmotionalHook() {
  const ref = useReveal();
  return (
    <section className="lph-section lph-section-white lph-emotional lph-s" ref={ref}>
      <div className="lph-container lph-emotional-inner">
        <h2 className="lph-emotional-title">
          Est-ce que vous perdez de l'argent<br />en louant chaque mois ?
        </h2>
        <p className="lph-emotional-text">
          Tout dépend de 3 facteurs : votre loyer, le prix du bien visé et combien
          de temps vous comptez rester. Nous calculons tout pour vous en 2 minutes.
        </p>
        <Link to="/simulateur" className="lph-btn-primary lph-emotional-cta">
          Découvrir ma situation →
        </Link>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   SECTION 4 — SCÉNARIOS TYPES
   ════════════════════════════════════════════════════════════ */
function ScenariosSection() {
  const navigate = useNavigate();
  const ref = useReveal();

  const scenarios = [
    {
      key: "paris",
      emoji: "🏙️",
      label: "Paris / Grande métropole",
      desc: "Marché tendu. L'achat s'amortit sur le long terme — idéal si vous vous projetez 15+ ans.",
      price: "380 000 €",
      rent: "1 500 €/mois",
      breakEven: "~17 ans",
      color: "#2563eb",
    },
    {
      key: "region",
      emoji: "🏡",
      label: "Ville moyenne",
      desc: "Équilibre plus rapide. L'achat devient rentable dès la 11e année dans la plupart des villes.",
      price: "200 000 €",
      rent: "800 €/mois",
      breakEven: "~11 ans",
      color: "#0891b2",
    },
    {
      key: "budget",
      emoji: "🏢",
      label: "Premier achat / Budget serré",
      desc: "Apport limité, crédit accessible. Le retour est plus rapide — rentable dès 9 ans.",
      price: "130 000 €",
      rent: "600 €/mois",
      breakEven: "~9 ans",
      color: "#7c3aed",
    },
  ];

  const go = (key) => {
    try { sessionStorage.setItem("fv2_preset", JSON.stringify(PRESETS[key])); } catch {}
    navigate("/simulateur");
  };

  return (
    <section className="lph-section lph-section-offwhite lph-scenarios lph-s" ref={ref}>
      <div className="lph-container">
        <h2 className="lph-section-title">Choisissez votre situation</h2>
        <p className="lph-section-sub">Cliquez sur le profil le plus proche du vôtre — toutes les valeurs sont pré-remplies.</p>
        <div className="lph-scen-list">
          {scenarios.map((s) => (
            <button key={s.key} type="button" className="lph-scen-card" onClick={() => go(s.key)}>
              <span className="lph-scen-emoji">{s.emoji}</span>
              <div className="lph-scen-body">
                <span className="lph-scen-label">{s.label}</span>
                <span className="lph-scen-desc">{s.desc}</span>
                <span className="lph-scen-meta">
                  <span className="lph-scen-be" style={{ color: s.color }}>Point d'équilibre {s.breakEven}</span>
                </span>
              </div>
              <div className="lph-scen-right">
                <span className="lph-scen-price" style={{ color: s.color }}>{s.price}</span>
                <span className="lph-scen-rent">Loyer {s.rent}</span>
                <span className="lph-scen-arrow">→</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   SECTION 5 — POURQUOI NOUS
   ════════════════════════════════════════════════════════════ */
function WhySection() {
  const ref = useReveal();
  const features = [
    { icon: "🎯", title: "Calcul patrimonial complet",     desc: "Mensualités, notaire, taxe foncière, valorisation et placement alternatif — rien n'est omis." },
    { icon: "🔒", title: "Données 100 % privées",          desc: "Aucun compte, aucun email. Tout le calcul s'effectue dans votre navigateur." },
    { icon: "📊", title: "Sources officielles 2026",       desc: "Taux BCE, indices IRL, prix Notaires de France — paramètres calés sur les données de référence." },
    { icon: "⚡", title: "Résultat en 2 min",              desc: "6 questions, un graphique animé et l'année exacte à partir de laquelle acheter devient rentable." },
  ];
  return (
    <section className="lph-section lph-section-white lph-why lph-s" ref={ref}>
      <div className="lph-container">
        <h2 className="lph-section-title">Ce qui nous différencie</h2>
        <div className="lph-why-grid">
          {features.map((f) => (
            <div key={f.title} className="lph-why-card">
              <span className="lph-why-icon">{f.icon}</span>
              <h3 className="lph-why-title">{f.title}</h3>
              <p className="lph-why-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   SECTION 6 — COMMENT ÇA MARCHE
   ════════════════════════════════════════════════════════════ */
function HowItWorksSection() {
  const ref = useReveal();
  const steps = [
    {
      num: 1,
      title: "Décrivez votre profil",
      desc: "Locataire, revenus, apport, ville. Trois minutes suffisent.",
      icon: (
        <svg viewBox="0 0 64 64" fill="none" className="lph-how-svg" aria-hidden="true">
          <rect x="12" y="10" width="40" height="44" rx="6" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1.5"/>
          <rect x="20" y="22" width="24" height="3" rx="1.5" fill="#2563eb"/>
          <rect x="20" y="30" width="16" height="3" rx="1.5" fill="#93c5fd"/>
          <rect x="20" y="38" width="12" height="3" rx="1.5" fill="#bfdbfe"/>
          <circle cx="47" cy="47" r="11" fill="#2563eb"/>
          <path d="M43 47l3 3 5-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      num: 2,
      title: "Paramétrez votre projet",
      desc: "Prix du bien, taux, durée. La ville pré-remplit automatiquement.",
      icon: (
        <svg viewBox="0 0 64 64" fill="none" className="lph-how-svg" aria-hidden="true">
          <rect x="10" y="10" width="44" height="44" rx="7" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1.5"/>
          <path d="M18 44l10-16 10 12 6-9" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="18" cy="44" r="3" fill="#2563eb"/>
          <circle cx="28" cy="28" r="3" fill="#06b6d4"/>
          <circle cx="38" cy="40" r="3" fill="#2563eb"/>
          <circle cx="44" cy="31" r="3" fill="#06b6d4"/>
        </svg>
      ),
    },
    {
      num: 3,
      title: "Votre analyse en clair",
      desc: "Graphique animé, point d'équilibre précis, patrimoine comparé.",
      icon: (
        <svg viewBox="0 0 64 64" fill="none" className="lph-how-svg" aria-hidden="true">
          <rect x="10" y="10" width="44" height="44" rx="7" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1.5"/>
          <path d="M18 46l8-14 8 8 10-16" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M18 46l8-14 8 8 10-16L54 34" stroke="#06b6d4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0" />
          <circle cx="44" cy="24" r="5" fill="#2563eb" opacity=".2"/>
          <circle cx="44" cy="24" r="3" fill="#2563eb"/>
          <line x1="18" y1="48" x2="46" y2="48" stroke="#93c5fd" strokeWidth="1.2"/>
          <line x1="16" y1="16" x2="16" y2="48" stroke="#93c5fd" strokeWidth="1.2"/>
        </svg>
      ),
    },
  ];
  return (
    <section className="lph-section lph-section-glacial lph-how lph-s" ref={ref}>
      <div className="lph-container">
        <h2 className="lph-section-title">Comment ça marche en 3 étapes</h2>
        <div className="lph-how-steps">
          <div className="lph-how-line" aria-hidden="true" />
          {steps.map((s) => (
            <div key={s.num} className="lph-how-step">
              <div className="lph-how-step-top">
                <span className="lph-how-num">{s.num}</span>
                {s.icon}
              </div>
              <h3 className="lph-how-title">{s.title}</h3>
              <p className="lph-how-desc">{s.desc}</p>
            </div>
          ))}
        </div>
        <div style={{ textAlign:"center", marginTop:48 }}>
          <Link to="/simulateur" className="lph-btn-primary" style={{ display:"inline-flex" }}>
            Démarrer maintenant →
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   SECTION 7 — SIMULATEURS
   ════════════════════════════════════════════════════════════ */
function SimulateursSection() {
  const ref = useReveal();
  const sims = [
    { icon:"🏠", title:"Louer vs Acheter",       desc:"Comparatif patrimonial complet avec point d'équilibre et graphique.",          href:"/simulateur",                         highlight:true,  badge:"Principal" },
    { icon:"🏦", title:"Simulateur de prêt",      desc:"Mensualité, coût total des intérêts et tableau d'amortissement.",             href:"/simulateurs/pret-immobilier" },
    { icon:"📊", title:"Capacité d'emprunt",      desc:"Combien pouvez-vous emprunter en respectant le ratio HCSF de 35 % ?",        href:"/simulateurs/endettement" },
    { icon:"♻️", title:"Impact DPE & rénovation", desc:"Décote d'un bien énergivore et retour sur investissement des travaux.",       href:"/simulateurs/impact-dpe" },
    { icon:"📈", title:"Rentabilité locative",    desc:"Rendement brut, net et cashflow mensuel de votre investissement locatif.",    href:"/simulateurs/rentabilite-locative" },
    { icon:"🧾", title:"Frais de notaire",         desc:"Estimez les frais d'acquisition au centime près — ancien, neuf ou VEFA.",   href:"/simulateurs/frais-notaire" },
  ];
  return (
    <section className="lph-section lph-section-white lph-sims lph-s" ref={ref}>
      <div className="lph-container">
        <h2 className="lph-section-title">Tous nos simulateurs gratuits</h2>
        <p className="lph-section-sub">Du prêt au DPE en passant par la plus-value — tous les outils pour décider sans se tromper.</p>
        <div className="lph-sims-grid">
          {sims.map((s) => (
            <Link key={s.href} to={s.href} className={`lph-sim-card${s.highlight ? " lph-sim-hl" : ""}`}>
              {s.badge && <span className="lph-sim-badge">{s.badge}</span>}
              <span className="lph-sim-icon">{s.icon}</span>
              <span className="lph-sim-title">{s.title}</span>
              <span className="lph-sim-desc">{s.desc}</span>
              <span className="lph-sim-cta">Ouvrir →</span>
            </Link>
          ))}
        </div>
        <p style={{ textAlign:"center", marginTop:28 }}>
          <Link to="/simulateurs" style={{ fontSize:14, fontWeight:700, color:"#2563eb", textDecoration:"none" }}>
            Voir les 27 simulateurs →
          </Link>
        </p>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   SECTION 8 — TÉMOIGNAGES
   ════════════════════════════════════════════════════════════ */
function TestimonialsSection() {
  const ref = useReveal();
  const testimonials = [
    {
      initials: "SM",
      name: "Sophie M.",
      location: "Paris · 31 ans",
      color: "#2563eb",
      text: "J'hésitais depuis 2 ans. Le simulateur m'a montré qu'avec mon loyer et un bien à 380 000 €, il faudrait 16 ans pour rentabiliser. J'ai décidé d'investir mon apport autrement.",
    },
    {
      initials: "TB",
      name: "Thomas B.",
      location: "Lyon · 36 ans",
      color: "#0891b2",
      text: "En 5 minutes j'avais une réponse claire : acheter à Lyon avec un horizon de 12 ans était nettement gagnant. J'ai signé 6 mois après. Exactement ce qu'il me fallait.",
    },
    {
      initials: "CD",
      name: "Camille D.",
      location: "Nantes · 29 ans",
      color: "#7c3aed",
      text: "Le simulateur a calculé que l'achat devenait rentable dès la 9e année dans ma situation. Ce chiffre précis m'a donné le déclic pour me lancer.",
    },
  ];
  return (
    <section className="lph-section lph-section-offwhite lph-testi lph-s" ref={ref}>
      <div className="lph-container">
        <h2 className="lph-section-title">Ils ont tranché grâce au simulateur</h2>
        <div className="lph-testi-grid">
          {testimonials.map((t) => (
            <div key={t.name} className="lph-testi-card">
              <div className="lph-testi-stars" aria-label="5 étoiles">★★★★★</div>
              <p className="lph-testi-text">"{t.text}"</p>
              <div className="lph-testi-author">
                <div className="lph-testi-avatar" style={{ background: t.color }}>{t.initials}</div>
                <div className="lph-testi-info">
                  <span className="lph-testi-name">{t.name}</span>
                  <span className="lph-testi-loc">{t.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   SECTION 9 — FAQ
   ════════════════════════════════════════════════════════════ */
const FAQ_ITEMS = [
  {
    q: "Est-il plus rentable de louer ou d'acheter en 2026 ?",
    a: "Tout dépend de votre situation personnelle. À Paris, il faut souvent rester 15+ ans pour que l'achat soit rentable. En ville moyenne, ce seuil descend à 9–11 ans. Les taux autour de 3,4–3,9 % en 2026 améliorent les conditions par rapport à 2023. Notre simulateur calcule votre seuil exact en 2 minutes.",
  },
  {
    q: "Combien d'années faut-il rester pour rentabiliser un achat ?",
    a: "En moyenne nationale, entre 8 et 14 ans. À Paris ou Lyon, autour de 11–17 ans. En ville petite ou moyenne, parfois dès 7–9 ans. Ces durées varient selon le taux obtenu, le prix du bien, votre apport et le loyer alternatif.",
  },
  {
    q: "Quel apport minimum est nécessaire pour acheter ?",
    a: "Il faut au minimum 10 % du prix pour couvrir les frais de notaire (7–8 % dans l'ancien). Les banques recommandent 20 % pour obtenir les meilleures conditions. Un apport plus élevé réduit le coût total du crédit et solidifie votre dossier.",
  },
  {
    q: "Les taux immobiliers vont-ils baisser encore en 2026 ?",
    a: "Après le pic de 2023 (4,5 %), la BCE a amorcé un assouplissement. En 2026, les taux fixes 20 ans se situent entre 3,2 % et 3,9 % selon les profils. Les projections pointent vers une stabilisation à ces niveaux. Notre simulateur utilise 3,5 % par défaut, entièrement modifiable.",
  },
  {
    q: "Ce simulateur est-il vraiment gratuit et confidentiel ?",
    a: "Oui, à 100 %. Aucune inscription, aucun email requis. Tous les calculs s'effectuent localement dans votre navigateur — aucune donnée ne quitte votre appareil. L'outil est financé par la publicité contextuelle et restera toujours gratuit et indépendant.",
  },
];

function FAQSection() {
  const [open, setOpen] = useState(null);
  const ref = useReveal();
  return (
    <section className="lph-section lph-section-white lph-faq lph-s" ref={ref}>
      <div className="lph-container lph-faq-inner">
        <h2 className="lph-section-title">Questions fréquentes</h2>
        <div className="lph-faq-list">
          {FAQ_ITEMS.map((item, i) => (
            <div key={i} className={`lph-faq-item${open === i ? " lph-faq-open" : ""}`}>
              <button
                type="button"
                className="lph-faq-q"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span>{item.q}</span>
                <svg
                  className="lph-faq-icon"
                  width="20" height="20" viewBox="0 0 20 20" fill="none"
                  style={{ transform: open === i ? "rotate(180deg)" : "rotate(0deg)", transition:"transform .25s" }}
                  aria-hidden="true"
                >
                  <path d="M5 8l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <div className="lph-faq-a">
                <p>{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   SECTION 10 — NEWSLETTER
   ════════════════════════════════════════════════════════════ */
function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const ref = useReveal();
  const submit = (e) => { e.preventDefault(); if (email.includes("@")) setDone(true); };
  return (
    <section className="lph-section lph-newsletter lph-s" ref={ref}>
      <div className="lph-container lph-nl-inner">
        <h2 className="lph-nl-title">Recevez les tendances immobilières de votre ville</h2>
        <p className="lph-nl-sub">
          Chaque mois, les données du marché qui comptent pour votre décision.
        </p>
        {done ? (
          <div className="lph-nl-done">✅ Parfait ! Vous recevrez la prochaine édition dans votre boîte.</div>
        ) : (
          <form className="lph-nl-form" onSubmit={submit}>
            <input
              type="email" required
              placeholder="votre@email.fr"
              className="lph-nl-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" className="lph-nl-btn">S'abonner</button>
          </form>
        )}
        <p className="lph-nl-privacy">Aucun spam · Désabonnement en un clic · Données jamais revendues</p>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   EXPORT PRINCIPAL
   ════════════════════════════════════════════════════════════ */
export default function LandingPage() {
  return (
    <div className="lph-root">
      <TopBar />
      <main id="main-content">
        <HeroSection />
        <TrustBar />
        <EmotionalHook />
        <ScenariosSection />
        <WhySection />
        <HowItWorksSection />
        <SimulateursSection />
        <TestimonialsSection />
        <FAQSection />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
}
