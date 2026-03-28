import { Link } from "react-router-dom";
import TopBar from "./TopBar";
import Footer from "./Footer";

const STEPS = [
  {
    num: 1,
    color: "teal",
    icon: "🔍",
    question: "Est-ce que je peux acheter ?",
    desc: "Avant tout projet immobilier, évaluez votre capacité réelle d'emprunt et vérifiez que votre taux d'endettement est dans les clous bancaires (maximum 35 % exigé par le HCSF).",
    tools: [
      {
        href: "/simulateurs/endettement",
        icon: "📉",
        title: "Capacité d'emprunt",
        desc: "Combien pouvez-vous emprunter ? Taux d'endettement calculé en temps réel.",
        tag: "Essentiel",
      },
      {
        href: "/simulateurs/budget-maximum",
        icon: "🏆",
        title: "Budget maximum",
        desc: "Budget total par durée de prêt + carte des villes accessibles avec vos revenus.",
        tag: "Recommandé",
      },
      {
        href: "/simulateurs/score-acheteur",
        icon: "🎯",
        title: "Score de préparation",
        desc: "Êtes-vous vraiment prêt ? Radar sur 5 dimensions + plan d'action personnalisé.",
        tag: "Recommandé",
      },
    ],
  },
  {
    num: 2,
    color: "blue",
    icon: "⏱️",
    question: "Est-ce le bon moment ?",
    desc: "Louer et placer la différence peut parfois être plus rentable qu'acheter. Comparez les deux scénarios sur votre horizon et vérifiez les chiffres dans votre ville.",
    tools: [
      {
        href: "/",
        icon: "🏠",
        title: "Louer ou Acheter",
        desc: "La simulation principale : patrimoine net, mensualité, point d'équilibre sur 30 ans.",
        tag: "Essentiel",
      },
      {
        href: "/simulateurs/comparateur-villes",
        icon: "🗺️",
        title: "Comparateur de villes",
        desc: "Loyer vs mensualité dans 12 grandes villes françaises — T1, T2 ou T3.",
        tag: "Recommandé",
      },
      {
        href: "/simulateurs/negociation",
        icon: "🤝",
        title: "Simulateur de négociation",
        desc: "À quel prix négocier pour que l'achat batte la location ? Point d'équilibre chiffré.",
        tag: "Bonus",
      },
    ],
  },
  {
    num: 3,
    color: "purple",
    icon: "🏡",
    question: "Quel bien puis-je acheter ?",
    desc: "Une fois votre budget défini, calculez tous les coûts cachés : frais de notaire, mensualité réelle, coût total du crédit. Plus de mauvaises surprises le jour de la signature.",
    tools: [
      {
        href: "/simulateurs/frais-notaire",
        icon: "📋",
        title: "Frais de notaire",
        desc: "Calcul au centime selon le barème légal 2024 — ancien et neuf.",
        tag: "Essentiel",
      },
      {
        href: "/simulateurs/pret-immobilier",
        icon: "🏦",
        title: "Prêt immobilier",
        desc: "Mensualité, coût total et tableau d'amortissement annuel.",
        tag: "Essentiel",
      },
      {
        href: "/simulateurs/ptz",
        icon: "🏗️",
        title: "PTZ 2026",
        desc: "Êtes-vous éligible au Prêt à Taux Zéro ? Montant et économie calculés.",
        tag: "Bonus",
      },
    ],
  },
  {
    num: 4,
    color: "amber",
    icon: "📊",
    question: "Est-ce rentable ?",
    desc: "Pour un investissement locatif ou une revente future, calculez la rentabilité réelle, la plus-value taxable et l'impact du DPE sur la valeur du bien.",
    tools: [
      {
        href: "/simulateurs/rentabilite-locative",
        icon: "🏘️",
        title: "Rentabilité locative",
        desc: "Rendement brut, net et cashflow mensuel pour un investissement.",
        tag: "Essentiel",
      },
      {
        href: "/simulateurs/plus-value",
        icon: "📈",
        title: "Plus-value immobilière",
        desc: "Impôt à la revente selon la durée de détention et les abattements légaux.",
        tag: "Recommandé",
      },
      {
        href: "/simulateurs/impact-dpe",
        icon: "♻️",
        title: "Impact DPE & rénovation",
        desc: "Décote d'une passoire, économies de charges et ROI des travaux.",
        tag: "Bonus",
      },
    ],
  },
  {
    num: 5,
    color: "pink",
    icon: "💡",
    question: "Comment financer ?",
    desc: "Optimisez votre apport, anticipez les remboursements et comparez les offres d'assurance. Chaque décision financière compte sur 20 ans de crédit.",
    tools: [
      {
        href: "/simulateurs/optimiser-apport",
        icon: "💡",
        title: "Optimiseur d'apport",
        desc: "Acheter maintenant ou épargner encore quelques mois ? ROI chiffré.",
        tag: "Essentiel",
      },
      {
        href: "/simulateurs/epargne",
        icon: "💰",
        title: "Simulateur d'épargne",
        desc: "Calculez l'épargne mensuelle pour atteindre votre objectif d'apport.",
        tag: "Recommandé",
      },
      {
        href: "/simulateurs/assurance-pret",
        icon: "🛡️",
        title: "Assurance emprunteur",
        desc: "Comparez banque vs délégation. Économie loi Lemoine calculée.",
        tag: "Recommandé",
      },
    ],
  },
];

const STEP_COLORS = {
  teal:   { bg: "var(--teal-soft, #ccfbf1)", accent: "#0d9488", num: "#0f766e" },
  blue:   { bg: "var(--blue-soft)",          accent: "#1a56db", num: "#1e40af" },
  purple: { bg: "#f3e8ff",                   accent: "#7c3aed", num: "#6d28d9" },
  amber:  { bg: "#fef3c7",                   accent: "#d97706", num: "#b45309" },
  pink:   { bg: "#fce7f3",                   accent: "#db2777", num: "#9d174d" },
};

const TAG_COLORS = {
  "Essentiel":   { bg: "#dbeafe", color: "#1e40af" },
  "Recommandé":  { bg: "#d1fae5", color: "#065f46" },
  "Bonus":       { bg: "#f3f4f6", color: "#374151" },
};

export default function PageGuideAchat() {
  return (
    <div className="page">
      <TopBar />
      <main id="main-content" className="guide-page">

        {/* ── HERO ─────────────────────────────────────────── */}
        <div className="guide-hero">
          <div className="guide-hero-text">
            <span className="blog-kicker">Parcours acheteur</span>
            <h1 className="guide-hero-title">
              Votre guide d'achat<br/>
              <span className="guide-hero-sub">immobilier en 5 étapes</span>
            </h1>
            <p className="guide-hero-desc">
              De "puis-je acheter ?" à "comment financer ?", suivez le parcours logique
              d'un acheteur avec les bons simulateurs à chaque étape. Aucune inscription,
              tout est gratuit.
            </p>
          </div>
          <div className="guide-hero-badges">
            {STEPS.map((s) => {
              const c = STEP_COLORS[s.color];
              return (
                <a key={s.num} href={`#step-${s.num}`} className="guide-hero-badge" style={{ background: c.bg, color: c.num }}>
                  <span style={{ fontWeight: 800 }}>{s.num}</span>
                  <span style={{ fontSize: 11, fontWeight: 600, opacity: .8 }}>{s.icon}</span>
                </a>
              );
            })}
          </div>
        </div>

        {/* ── TIMELINE ─────────────────────────────────────── */}
        <div className="guide-timeline">
          {STEPS.map((step, idx) => {
            const c = STEP_COLORS[step.color];
            return (
              <div key={step.num} id={`step-${step.num}`} className="guide-step">
                {/* Step connector line */}
                {idx < STEPS.length - 1 && (
                  <div className="guide-step-line" aria-hidden="true" />
                )}

                {/* Step header */}
                <div className="guide-step-header">
                  <div className="guide-step-num-wrap" style={{ background: c.bg }}>
                    <span className="guide-step-icon">{step.icon}</span>
                    <span className="guide-step-num" style={{ color: c.num }}>Étape {step.num}</span>
                  </div>
                  <div className="guide-step-head-text">
                    <h2 className="guide-step-question" style={{ color: c.accent }}>
                      {step.question}
                    </h2>
                    <p className="guide-step-desc">{step.desc}</p>
                  </div>
                </div>

                {/* Tools grid */}
                <div className="guide-tools-grid">
                  {step.tools.map((tool) => {
                    const tagStyle = TAG_COLORS[tool.tag] ?? TAG_COLORS["Bonus"];
                    return (
                      <Link key={tool.href} to={tool.href} className="guide-tool-card">
                        <div className="guide-tool-top">
                          <span className="guide-tool-icon">{tool.icon}</span>
                          <span
                            className="guide-tool-tag"
                            style={{ background: tagStyle.bg, color: tagStyle.color }}
                          >
                            {tool.tag}
                          </span>
                        </div>
                        <h3 className="guide-tool-title">{tool.title}</h3>
                        <p className="guide-tool-desc">{tool.desc}</p>
                        <span className="guide-tool-cta" style={{ color: c.accent }}>
                          Ouvrir →
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── CTA ──────────────────────────────────────────── */}
        <div className="guide-bottom-cta">
          <div className="guide-cta-inner">
            <span className="guide-cta-icon">🚀</span>
            <div>
              <p className="guide-cta-title">Tous les simulateurs disponibles</p>
              <p className="guide-cta-sub">22 outils pour chaque situation — budget, crédit, investissement, fiscalité.</p>
            </div>
            <Link to="/simulateurs" className="btn-primary">Voir tous les simulateurs →</Link>
          </div>
        </div>

      </main>
      <Footer />
    </div>
  );
}
