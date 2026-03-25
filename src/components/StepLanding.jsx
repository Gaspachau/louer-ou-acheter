import { useEffect } from "react";
import { Link } from "react-router-dom";
import { PRESETS } from "../App";

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

const SIMS_LP = [
  { href: "/simulateurs/epargne", icon: "💰", title: "Simulateur d'épargne", desc: "Objectif financier en X mois", tag: "Épargne", tagClass: "tag-green" },
  { href: "/simulateurs/pret-immobilier", icon: "🏦", title: "Prêt immobilier", desc: "Mensualité & tableau d'amortissement", tag: "Crédit", tagClass: "tag-purple" },
  { href: "/simulateurs/pret-conso", icon: "💳", title: "Prêt conso", desc: "Crédit auto, travaux ou perso", tag: "Crédit", tagClass: "tag-purple" },
  { href: "/simulateurs/niveau-de-vie", icon: "📊", title: "Niveau de vie", desc: "Revenu disponible après charges", tag: "Budget", tagClass: "tag-amber" },
  { href: "/simulateurs/endettement", icon: "📉", title: "Capacité d'emprunt", desc: "Taux d'endettement & montant max", tag: "Crédit", tagClass: "tag-teal" },
];

export default function StepLanding({ onStart, onPreset }) {
  useEffect(() => {
    const sections = document.querySelectorAll(".lp-section");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("lp-visible"); }),
      { threshold: 0.1 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="lp">

      {/* ── HERO ─────────────────────────────────────────────── */}
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

          <div className="lp-mockup" aria-hidden="true">
            <div className="lp-mockup-header">
              <span className="lp-mockup-dot" />
              <span className="lp-mockup-dot" />
              <span className="lp-mockup-dot" />
              <span className="lp-mockup-title">Résultat de simulation</span>
            </div>
            <div className="lp-mockup-body">
              <div className="lp-mockup-verdict">
                <span className="lp-mockup-verdict-icon">📍</span>
                <div>
                  <div className="lp-mockup-verdict-label">Recommandation</div>
                  <div className="lp-mockup-verdict-text">Location avantageuse sur 10 ans</div>
                </div>
              </div>
              <div className="lp-mockup-stats">
                <div className="lp-mockup-stat">
                  <span className="lp-mockup-stat-label">Patrimoine location</span>
                  <span className="lp-mockup-stat-val lp-mockup-stat-green">+284 000 €</span>
                </div>
                <div className="lp-mockup-stat">
                  <span className="lp-mockup-stat-label">Patrimoine achat</span>
                  <span className="lp-mockup-stat-val">+261 000 €</span>
                </div>
                <div className="lp-mockup-stat">
                  <span className="lp-mockup-stat-label">Différence nette</span>
                  <span className="lp-mockup-stat-val lp-mockup-stat-blue">23 000 € en faveur loc.</span>
                </div>
              </div>
              <div className="lp-mockup-bar-section">
                <div className="lp-mockup-bar-label">
                  <span>Location</span><span className="lp-mockup-bar-pct">52 %</span>
                </div>
                <div className="lp-mockup-bar-track">
                  <div className="lp-mockup-bar-fill lp-mockup-bar-green" style={{width: "52%"}} />
                </div>
                <div className="lp-mockup-bar-label" style={{marginTop: "6px"}}>
                  <span>Achat</span><span className="lp-mockup-bar-pct">48 %</span>
                </div>
                <div className="lp-mockup-bar-track">
                  <div className="lp-mockup-bar-fill lp-mockup-bar-blue" style={{width: "48%"}} />
                </div>
              </div>
              <div className="lp-mockup-cta">Voir l'analyse complète →</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ──────────────────────────────────────────── */}
      <div className="lp-trust-bar" role="list" aria-label="Nos engagements">
        {TRUST_ITEMS.map((item, i) => (
          <div key={i} className="lp-trust-item" role="listitem">
            <span className="lp-trust-icon">{item.icon}</span>
            <span className="lp-trust-label">{item.label}</span>
          </div>
        ))}
      </div>

      {/* ── PRESET CARDS ─────────────────────────────────────── */}
      <section className="lp-section lp-presets-section" aria-label="Scénarios types">
        <div className="lp-section-header">
          <h2 className="lp-section-title">Commencer avec un scénario type</h2>
          <p className="lp-section-sub">Choisissez la situation la plus proche de la vôtre</p>
        </div>
        <div className="lp-presets-grid" role="list">
          {PRESETS.map((preset) => (
            <button
              key={preset.id}
              className="lp-preset-card"
              onClick={() => onPreset(preset)}
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
        <button className="lp-custom-btn" onClick={onStart} type="button">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M9 6v6M6 9h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          Saisir mes propres chiffres
        </button>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────── */}
      <section className="lp-section lp-how" aria-label="Comment ça marche">
        <div className="lp-section-header">
          <h2 className="lp-section-title">Comment ça marche ?</h2>
          <p className="lp-section-sub">3 étapes, 2 minutes, une réponse chiffrée</p>
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
      </section>

      {/* ── SIMULATORS SHOWCASE ──────────────────────────────── */}
      <section className="lp-section lp-sims-section" aria-label="Tous nos simulateurs">
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
      </section>

      <p className="lp-disclaimer">
        Simulation à titre pédagogique — ne remplace pas un conseil patrimonial ou une offre de prêt.
      </p>
    </div>
  );
}
