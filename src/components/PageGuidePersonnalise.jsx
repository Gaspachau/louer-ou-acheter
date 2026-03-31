import { useState } from "react";
import { Link } from "react-router-dom";
import TopBar from "./TopBar";
import Footer from "./Footer";
import { useSEO } from "../utils/useSEO";

/* ─── Questions du quiz ──────────────────────────────── */
const QUESTIONS = [
  {
    id: "situation",
    question: "Quelle est votre situation actuelle ?",
    icon: "🏠",
    options: [
      { id: "locataire",    label: "Locataire",          emoji: "🔑", desc: "Je loue mon logement actuel" },
      { id: "proprietaire", label: "Déjà propriétaire",  emoji: "🏛️", desc: "Je possède un bien, je veux en acheter un autre" },
      { id: "hebergé",      label: "Hébergé gratuitement", emoji: "👨‍👩‍👧", desc: "Chez mes parents ou un proche, sans loyer" },
    ],
  },
  {
    id: "projet",
    question: "Quel est votre projet principal ?",
    icon: "🎯",
    options: [
      { id: "acheter_rp", label: "Résidence principale",   emoji: "🛒", desc: "Premier achat ou changement de logement" },
      { id: "investir",   label: "Investissement locatif", emoji: "📈", desc: "Générer des revenus ou un patrimoine" },
      { id: "comparer",   label: "Louer ou acheter ?",     emoji: "⚖️", desc: "Pas encore décidé, je compare les deux options" },
      { id: "optimiser",  label: "Optimiser le financement", emoji: "💡", desc: "J'ai un projet en cours, je veux de meilleures conditions" },
    ],
  },
  {
    id: "horizon",
    question: "Quel est votre horizon de temps ?",
    icon: "⏳",
    options: [
      { id: "court",    label: "Moins de 2 ans",  emoji: "🚀", desc: "Je veux agir rapidement" },
      { id: "moyen",    label: "2 à 5 ans",       emoji: "📅", desc: "Je me prépare sérieusement" },
      { id: "long",     label: "Plus de 5 ans",   emoji: "🌱", desc: "Je construis sur le long terme" },
      { id: "incertain", label: "Je ne sais pas encore", emoji: "🤔", desc: "J'explore les possibilités" },
    ],
  },
  {
    id: "apport",
    question: "Quel est votre apport disponible ?",
    icon: "💰",
    options: [
      { id: "faible",  label: "Moins de 10 000 €",  emoji: "🌱", desc: "Je débute ma constitution d'épargne" },
      { id: "moyen",   label: "10 000 à 50 000 €",  emoji: "💳", desc: "J'ai un apport solide en cours de construction" },
      { id: "bon",     label: "50 000 à 100 000 €", emoji: "💰", desc: "Mon apport couvre les frais + une partie du bien" },
      { id: "fort",    label: "Plus de 100 000 €",  emoji: "🏆", desc: "Apport confortable pour négocier de bons taux" },
    ],
  },
  {
    id: "emploi",
    question: "Quelle est votre situation professionnelle ?",
    icon: "💼",
    options: [
      { id: "cdi",      label: "CDI / Fonctionnaire",   emoji: "✅", desc: "Contrat stable, période d'essai terminée" },
      { id: "indep",    label: "Indépendant / Gérant",  emoji: "🏢", desc: "Entrepreneur, freelance ou professions libérales" },
      { id: "cdd",      label: "CDD / Intérim",         emoji: "📋", desc: "Contrat à durée déterminée ou missions" },
      { id: "autre",    label: "Autre",                 emoji: "📌", desc: "Retraité, sans emploi, étudiant, etc." },
    ],
  },
];

/* ─── Construction du parcours personnalisé ─────────── */
function buildPath(answers) {
  const { situation, projet, horizon, apport, emploi } = answers;

  // Alertes selon profil
  const alerts = [];
  if (emploi === "cdd") alerts.push("Dossier CDD : les banques exigent généralement 3 ans d'ancienneté ou un co-emprunteur en CDI. Préparez-vous à contacter plusieurs banques.");
  if (emploi === "indep") alerts.push("Indépendant : prévoyez vos 3 derniers bilans comptables + liasse fiscale. Certaines banques spécialisées (BPI, Caisse d'Épargne) sont plus ouvertes à ce profil.");
  if (apport === "faible" && projet === "acheter_rp") alerts.push("Apport < 10 000 € : il sera difficile de couvrir les frais de notaire (7–8 % du prix). Priorité : constituer l'apport avant de chercher un bien.");
  if (horizon === "court" && apport === "faible") alerts.push("Horizon court + apport faible : prudence. Un achat mal préparé peut coûter plus cher qu'une location. Utilisez d'abord le simulateur d'épargne.");

  if (projet === "comparer") {
    return {
      title: "Décision louer ou acheter",
      intro: `Vous n'êtes pas encore décidé — c'est la bonne démarche. Commencez par simuler les deux options avec vos chiffres réels. La décision dépend de votre horizon, de votre ville et de votre apport (${apport === "faible" ? "faible pour l'instant" : apport === "fort" ? "confortable" : "en cours"}).`,
      color: "#7c3aed",
      steps: [
        { step: 1, icon: "⚖️", title: "Simulateur principal louer/acheter", desc: "Comparez le patrimoine net sur 10–30 ans : propriétaire vs locataire qui investit la différence.", href: "/", tag: "En premier", tagColor: "#059669" },
        { step: 2, icon: "⏰", title: "Machine à remonter le temps", desc: "Découvrez ce qu'aurait rapporté un achat en 2010, 2015 ou 2018 dans votre ville.", href: "/simulateurs/machine-temps", tag: "Fascinant", tagColor: "#7c3aed" },
        { step: 3, icon: "🗺️", title: "Comparateur de villes", desc: "Loyer vs mensualité avec point de rentabilité dans 12 grandes villes.", href: "/simulateurs/comparateur-villes", tag: "Analyse", tagColor: "#2563eb" },
        { step: 4, icon: "🔍", title: "Pouvoir d'achat par ville", desc: "Combien de m² pour votre budget dans chaque ville ?", href: "/simulateurs/pouvoir-achat-m2", tag: "Exploration", tagColor: "#d97706" },
      ],
      alerts,
    };
  }

  if (projet === "investir") {
    return {
      title: "Investissement locatif",
      intro: `Pour investir intelligemment${apport === "fort" ? " avec un apport solide" : ""}, analysez la rentabilité réelle (après fiscalité), le financement et la valeur à la revente avant tout engagement.`,
      color: "#d97706",
      steps: [
        { step: 1, icon: "🏘️", title: "Rentabilité locative", desc: "Rendement brut, net et net-net avec votre tranche d'imposition. Cashflow mensuel réel.", href: "/simulateurs/rentabilite-locative", tag: "Essentiel", tagColor: "#059669" },
        { step: 2, icon: "📋", title: "Frais de notaire", desc: "Anticipez précisément les frais d'acquisition pour calculer votre rentabilité réelle dès le départ.", href: "/simulateurs/frais-notaire", tag: "Budget", tagColor: "#2563eb" },
        { step: 3, icon: "📈", title: "Plus-value immobilière", desc: "Calculez l'impôt à la revente selon la durée de détention et les abattements légaux.", href: "/simulateurs/plus-value", tag: "Fiscalité", tagColor: "#7c3aed" },
        { step: 4, icon: "♻️", title: "Impact DPE", desc: "Un DPE F/G peut décote de 10–25 % et imposer des travaux. Calculez le ROI de la rénovation.", href: "/simulateurs/impact-dpe", tag: "Vigilance", tagColor: "#dc2626" },
      ],
      alerts,
    };
  }

  if (projet === "optimiser") {
    return {
      title: "Optimiser le financement",
      intro: `Vous avez un projet en cours${emploi === "cdi" ? " avec une situation professionnelle stable" : ""}. Chaque décision de financement compte : assurance, apport, durée. Voici les leviers à activer.`,
      color: "#2563eb",
      steps: [
        { step: 1, icon: "🏦", title: "Simulateur de prêt", desc: "Comparez 15/20/25 ans et mesurez l'impact de chaque point de taux sur le coût total.", href: "/simulateurs/pret-immobilier", tag: "Essentiel", tagColor: "#059669" },
        { step: 2, icon: "🛡️", title: "Assurance emprunteur", desc: "La délégation Lemoine peut économiser 10 000–20 000 € sur 20 ans. Calculez votre gain.", href: "/simulateurs/assurance-pret", tag: "Économies", tagColor: "#7c3aed" },
        { step: 3, icon: "🎯", title: "Optimiseur d'apport", desc: "Acheter maintenant ou épargner encore 6 mois ? Le point d'équilibre chiffré.", href: "/simulateurs/optimiser-apport", tag: "Stratégie", tagColor: "#d97706" },
        { step: 4, icon: "🏗️", title: "PTZ 2026", desc: "Vérifiez votre éligibilité et intégrez le PTZ dans votre plan de financement.", href: "/simulateurs/ptz", tag: "Aides", tagColor: "#0891b2" },
      ],
      alerts,
    };
  }

  // acheter_rp — selon horizon et apport
  if (horizon === "court") {
    return {
      title: "Achat rapide (< 2 ans)",
      intro: `Vous êtes prêt à agir vite${apport === "faible" ? ", mais avec un apport limité : vérifiez d'abord votre capacité réelle avant de chercher un bien" : apport === "fort" ? " avec un apport solide : vos conditions de financement seront favorables" : ""}. Voici les 4 étapes prioritaires.`,
      color: "#059669",
      steps: [
        { step: 1, icon: "📉", title: "Calculateur d'endettement", desc: "Calculez combien vous pouvez emprunter et vérifiez votre taux d'endettement HCSF.", href: "/simulateurs/endettement", tag: "En premier", tagColor: "#059669" },
        { step: 2, icon: "📋", title: "Frais de notaire", desc: "Calculez les frais d'acquisition au centime — 7–8 % dans l'ancien.", href: "/simulateurs/frais-notaire", tag: "Budget", tagColor: "#2563eb" },
        { step: 3, icon: "🏦", title: "Simulateur de prêt", desc: "Trouvez la mensualité et la durée optimales pour votre budget.", href: "/simulateurs/pret-immobilier", tag: "Financement", tagColor: "#7c3aed" },
        { step: 4, icon: "📅", title: "Calendrier acheteur", desc: "Votre feuille de route personnalisée jusqu'aux clés.", href: "/simulateurs/calendrier", tag: "Planning", tagColor: "#d97706" },
      ],
      alerts,
    };
  }

  if (horizon === "moyen") {
    return {
      title: "Préparation sur 2–5 ans",
      intro: `Vous avez le temps de bien préparer. ${apport === "faible" ? "Priorité : constituez votre apport — notre simulateur d'épargne vous dira exactement combien épargner par mois." : "Profitez de ce délai pour optimiser votre dossier et surveiller le marché."}`,
      color: "#0891b2",
      steps: [
        { step: 1, icon: "⚖️", title: "Louer ou acheter ?", desc: "Simulez les deux options sur votre horizon pour décider du bon moment.", href: "/", tag: "Décision", tagColor: "#059669" },
        { step: 2, icon: "💰", title: "Simulateur d'épargne", desc: "Calculez combien épargner par mois pour atteindre votre objectif d'apport.", href: "/simulateurs/epargne", tag: "Apport", tagColor: "#2563eb" },
        { step: 3, icon: "🗺️", title: "Pouvoir d'achat par ville", desc: "Comparez votre futur budget dans 10 villes — identifiez où acheter.", href: "/simulateurs/pouvoir-achat-m2", tag: "Marché", tagColor: "#7c3aed" },
        { step: 4, icon: "🎯", title: "Score de préparation", desc: "Évaluez votre maturité sur 5 dimensions et obtenez un plan d'action.", href: "/simulateurs/score-acheteur", tag: "Diagnostic", tagColor: "#d97706" },
      ],
      alerts,
    };
  }

  // long ou incertain
  return {
    title: "Vision long terme",
    intro: `Vous pensez sur le long terme${situation === "proprietaire" ? " — en tant que propriétaire, optimisez votre patrimoine existant avant d'en acquérir un nouveau" : ""}. Explorez les options et construisez une stratégie patrimoniale solide.`,
    color: "#7c3aed",
    steps: [
      { step: 1, icon: "⏰", title: "Machine à remonter le temps", desc: "Comprenez les cycles immobiliers et la rentabilité selon l'année d'achat.", href: "/simulateurs/machine-temps", tag: "Analyse", tagColor: "#7c3aed" },
      { step: 2, icon: "⚖️", title: "Louer ou acheter ?", desc: "Simulez sur 20–30 ans dans votre situation personnelle réelle.", href: "/", tag: "Essentiel", tagColor: "#059669" },
      { step: 3, icon: "🏘️", title: "Rentabilité locative", desc: "Investissement locatif : calculez le rendement net-net avec votre fiscalité.", href: "/simulateurs/rentabilite-locative", tag: "Stratégie", tagColor: "#d97706" },
      { step: 4, icon: "🏛️", title: "Héritage & patrimoine", desc: "Conservez ou vendez ? Analysez la meilleure stratégie patrimoniale à long terme.", href: "/simulateurs/heritage-immobilier", tag: "Patrimoine", tagColor: "#0891b2" },
    ],
    alerts,
  };
}

/* ─── Étiquettes de profil ──────────────────────────── */
function getProfileLabels(answers) {
  const labels = {};
  QUESTIONS.forEach((q) => {
    const opt = q.options.find((o) => o.id === answers[q.id]);
    if (opt) labels[q.id] = { emoji: opt.emoji, label: opt.label };
  });
  return labels;
}

/* ─── Page principale ────────────────────────────────── */
export default function PageGuidePersonnalise() {
  useSEO({
    title: "Guide Personnalisé Immobilier — Votre Parcours en 5 Questions",
    description: "Répondez à 5 questions et obtenez un guide de simulateurs personnalisé selon votre situation, vos objectifs et votre apport. Gratuit, immédiat, sans inscription.",
    path: "/guide-personnalise",
  });

  const [answers, setAnswers] = useState({});
  const [currentQ, setCurrentQ] = useState(0);
  const [done, setDone] = useState(false);

  const handleAnswer = (questionId, optionId) => {
    const newAnswers = { ...answers, [questionId]: optionId };
    setAnswers(newAnswers);
    if (currentQ < QUESTIONS.length - 1) {
      setTimeout(() => setCurrentQ((q) => q + 1), 180);
    } else {
      setTimeout(() => setDone(true), 180);
    }
  };

  const reset = () => {
    setAnswers({});
    setCurrentQ(0);
    setDone(false);
  };

  const path = done ? buildPath(answers) : null;
  const profileLabels = done ? getProfileLabels(answers) : {};
  const progress = done ? 100 : Math.round((currentQ / QUESTIONS.length) * 100);

  return (
    <div className="gp-page">
      <TopBar />

      {/* ── HERO ──────────────────────────────────────── */}
      <div className="gp-hero">
        <div className="gp-hero-inner">
          <Link to="/guide-achat" className="gp-back-link">← Guide général</Link>
          <span className="gp-hero-badge">✨ Mon projet immobilier</span>
          <h1 className="gp-hero-title">Guide personnalisé</h1>
          <p className="gp-hero-sub">
            {done
              ? "Votre parcours personnalisé est prêt."
              : `Répondez à ${QUESTIONS.length} questions — obtenez un parcours de simulateurs adapté à votre profil.`}
          </p>

          {/* Progress bar */}
          <div className="gp-progress-bar-wrap" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
            <div className="gp-progress-bar-track">
              <div className="gp-progress-bar-fill" style={{ width: `${progress}%` }} />
            </div>
            <span className="gp-progress-label">{done ? "Terminé ✓" : `${currentQ} / ${QUESTIONS.length}`}</span>
          </div>
        </div>
      </div>

      {/* ── CONTENU ──────────────────────────────────── */}
      <div className="gp-content">
        {!done ? (
          <div className="gp-quiz">

            {/* Réponses déjà données */}
            {currentQ > 0 && (
              <div className="gp-answers-recap">
                {QUESTIONS.slice(0, currentQ).map((q) => {
                  const opt = q.options.find((o) => o.id === answers[q.id]);
                  return opt ? (
                    <div key={q.id} className="gp-recap-chip">
                      <span>{opt.emoji}</span>
                      <span>{opt.label}</span>
                    </div>
                  ) : null;
                })}
              </div>
            )}

            {/* Question courante */}
            <div className="gp-question-card">
              <div className="gp-question-icon">{QUESTIONS[currentQ].icon}</div>
              <div className="gp-question-counter">Question {currentQ + 1} sur {QUESTIONS.length}</div>
              <h2 className="gp-question-text">{QUESTIONS[currentQ].question}</h2>
              <div className="gp-options">
                {QUESTIONS[currentQ].options.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    className={`gp-option${answers[QUESTIONS[currentQ].id] === opt.id ? " gp-option-selected" : ""}`}
                    onClick={() => handleAnswer(QUESTIONS[currentQ].id, opt.id)}
                  >
                    <span className="gp-option-emoji">{opt.emoji}</span>
                    <div className="gp-option-body">
                      <strong className="gp-option-label">{opt.label}</strong>
                      <span className="gp-option-desc">{opt.desc}</span>
                    </div>
                    <span className="gp-option-arrow" aria-hidden="true">→</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="gp-result">

            {/* Profil synthèse */}
            <div className="gp-profile-card">
              <h2 className="gp-profile-title">🧑 Votre profil</h2>
              <div className="gp-profile-grid">
                {QUESTIONS.map((q) => {
                  const info = profileLabels[q.id];
                  return info ? (
                    <div key={q.id} className="gp-profile-item">
                      <span className="gp-profile-emoji">{info.emoji}</span>
                      <div className="gp-profile-text">
                        <span className="gp-profile-cat">{q.question.replace(" ?", "")}</span>
                        <strong className="gp-profile-val">{info.label}</strong>
                      </div>
                    </div>
                  ) : null;
                })}
              </div>
            </div>

            {/* Alertes profil si besoin */}
            {path.alerts.length > 0 && (
              <div className="gp-alerts">
                {path.alerts.map((alert, i) => (
                  <div key={i} className="gp-alert-item">
                    <span className="gp-alert-icon">⚠️</span>
                    <p className="gp-alert-text">{alert}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Titre + intro parcours */}
            <div className="gp-result-header" style={{ borderLeftColor: path.color }}>
              <div className="gp-result-check" style={{ background: path.color + "22", color: path.color }}>✓</div>
              <div>
                <h2 className="gp-result-title">{path.title}</h2>
                <p className="gp-result-intro">{path.intro}</p>
              </div>
            </div>

            {/* Étapes recommandées */}
            <div className="gp-result-steps">
              {path.steps.map((s) => (
                <Link key={s.step} to={s.href} className="gp-result-step">
                  <div className="gp-result-step-num" style={{ background: s.tagColor + "18", color: s.tagColor }}>{s.step}</div>
                  <div className="gp-result-step-icon">{s.icon}</div>
                  <div className="gp-result-step-body">
                    <div className="gp-result-step-top">
                      <span className="gp-result-step-title">{s.title}</span>
                      <span className="gp-result-step-tag" style={{ background: s.tagColor + "18", color: s.tagColor }}>{s.tag}</span>
                    </div>
                    <p className="gp-result-step-desc">{s.desc}</p>
                  </div>
                  <span className="gp-result-step-arrow" style={{ color: s.tagColor }}>→</span>
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="gp-result-actions">
              <button type="button" className="gp-reset-btn" onClick={reset}>
                ↩ Recommencer
              </button>
              <Link to="/guide-achat" className="gp-guide-btn">
                Guide complet →
              </Link>
              <Link to="/simulateurs" className="gp-hub-btn">
                Tous les simulateurs →
              </Link>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
