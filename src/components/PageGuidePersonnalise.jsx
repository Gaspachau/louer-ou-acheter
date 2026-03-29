import { useState } from "react";
import { Link } from "react-router-dom";
import TopBar from "./TopBar";
import Footer from "./Footer";

const QUESTIONS = [
  {
    id: "situation",
    question: "Quelle est votre situation actuelle ?",
    icon: "🏠",
    options: [
      { id: "locataire", label: "Je suis locataire", emoji: "🔑", desc: "Vous louez actuellement votre logement" },
      { id: "proprietaire", label: "Je suis propriétaire", emoji: "🏛️", desc: "Vous possédez déjà un bien immobilier" },
      { id: "hebergé", label: "Je suis hébergé", emoji: "👨‍👩‍👧", desc: "Chez vos parents ou un proche, sans loyer" },
    ],
  },
  {
    id: "projet",
    question: "Quel est votre projet principal ?",
    icon: "🎯",
    options: [
      { id: "acheter_rp", label: "Acheter ma résidence principale", emoji: "🛒", desc: "Premier achat ou changement de résidence" },
      { id: "investir", label: "Investir dans l'immobilier locatif", emoji: "📈", desc: "Générer des revenus ou se constituer un patrimoine" },
      { id: "comparer", label: "Comparer louer vs acheter", emoji: "⚖️", desc: "Pas encore décidé, je veux analyser les deux options" },
      { id: "optimiser", label: "Optimiser mon financement", emoji: "💡", desc: "J'ai un projet en cours et je cherche les meilleures conditions" },
    ],
  },
  {
    id: "horizon",
    question: "Quel est votre horizon de temps ?",
    icon: "⏳",
    options: [
      { id: "court", label: "Moins de 2 ans", emoji: "🚀", desc: "Je veux agir rapidement" },
      { id: "moyen", label: "2 à 5 ans", emoji: "📅", desc: "Je me prépare sérieusement" },
      { id: "long", label: "Plus de 5 ans", emoji: "🌱", desc: "Je construis sur le long terme" },
      { id: "incertain", label: "Je ne sais pas encore", emoji: "🤔", desc: "J'explore les possibilités" },
    ],
  },
];

function buildPath(answers) {
  const { situation, projet, horizon } = answers;

  if (projet === "comparer") {
    return {
      title: "Votre parcours : Décision louer ou acheter",
      intro: "Commencez par simuler les deux options pour prendre une décision éclairée basée sur votre situation réelle.",
      steps: [
        {
          step: 1,
          icon: "⚖️",
          title: "Simulateur principal",
          desc: "Comparez le coût total sur 10–20 ans de louer vs acheter dans votre situation.",
          href: "/",
          tag: "Essentiel",
          tagColor: "#059669",
        },
        {
          step: 2,
          icon: "⏳",
          title: "Machine à remonter le temps",
          desc: "Découvrez ce qu'aurait rapporté un achat en 2010, 2015 ou 2018 dans votre ville.",
          href: "/simulateurs/machine-temps",
          tag: "Fascinant",
          tagColor: "#7c3aed",
        },
        {
          step: 3,
          icon: "🗺️",
          title: "Pouvoir d'achat par ville",
          desc: "Comparez votre budget dans 10 grandes villes françaises.",
          href: "/simulateurs/pouvoir-achat-m2",
          tag: "Découverte",
          tagColor: "#1a56db",
        },
        {
          step: 4,
          icon: "📅",
          title: "Calendrier acheteur",
          desc: "Si vous décidez d'acheter, voici votre feuille de route personnalisée.",
          href: "/simulateurs/calendrier-acheteur",
          tag: "Planification",
          tagColor: "#d97706",
        },
      ],
    };
  }

  if (projet === "investir") {
    return {
      title: "Votre parcours : Investissement locatif",
      intro: "Pour investir intelligemment, analysez la rentabilité, le financement et la fiscalité avant de vous lancer.",
      steps: [
        {
          step: 1,
          icon: "🏛️",
          title: "Héritage & patrimoine",
          desc: "Analysez si conserver ou vendre un bien est la meilleure stratégie patrimoniale.",
          href: "/simulateurs/heritage-immobilier",
          tag: "Stratégie",
          tagColor: "#7c3aed",
        },
        {
          step: 2,
          icon: "🏦",
          title: "Simulateur de prêt",
          desc: "Calculez vos mensualités, le coût total et votre capacité d'emprunt.",
          href: "/simulateurs/pret-immobilier",
          tag: "Financement",
          tagColor: "#1a56db",
        },
        {
          step: 3,
          icon: "🗺️",
          title: "Pouvoir d'achat par ville",
          desc: "Identifiez les marchés les plus accessibles pour votre budget d'investissement.",
          href: "/simulateurs/pouvoir-achat-m2",
          tag: "Marché",
          tagColor: "#059669",
        },
        {
          step: 4,
          icon: "📋",
          title: "Frais de notaire",
          desc: "Anticipez précisément les frais d'acquisition pour calculer votre rentabilité réelle.",
          href: "/simulateurs/frais-notaire",
          tag: "Coûts",
          tagColor: "#d97706",
        },
      ],
    };
  }

  if (projet === "optimiser") {
    return {
      title: "Votre parcours : Optimiser votre financement",
      intro: "Vous avez un projet en cours. Optimisez chaque aspect du financement pour économiser des milliers d'euros.",
      steps: [
        {
          step: 1,
          icon: "🏦",
          title: "Simulateur de prêt",
          desc: "Calculez et comparez différentes durées et taux pour trouver l'optimum.",
          href: "/simulateurs/pret-immobilier",
          tag: "Essentiel",
          tagColor: "#059669",
        },
        {
          step: 2,
          icon: "📋",
          title: "Frais de notaire",
          desc: "Calculez précisément les frais selon le type de bien (neuf ou ancien).",
          href: "/simulateurs/frais-notaire",
          tag: "Coûts",
          tagColor: "#1a56db",
        },
        {
          step: 3,
          icon: "🛡️",
          title: "Assurance emprunteur",
          desc: "La délégation d'assurance peut économiser jusqu'à 20 000 € sur la durée du prêt.",
          href: "/simulateurs/assurance-pret",
          tag: "Économies",
          tagColor: "#7c3aed",
        },
        {
          step: 4,
          icon: "🏗️",
          title: "Prêt à Taux Zéro",
          desc: "Vérifiez votre éligibilité au PTZ et calculez le montant auquel vous avez droit.",
          href: "/simulateurs/ptz",
          tag: "Aides",
          tagColor: "#d97706",
        },
      ],
    };
  }

  // Default: acheter_rp
  if (horizon === "court") {
    return {
      title: "Votre parcours : Achat rapide (< 2 ans)",
      intro: "Vous êtes prêt à agir. Vérifiez votre dossier, simulez le financement et préparez votre recherche.",
      steps: [
        {
          step: 1,
          icon: "💰",
          title: "Capacité d'emprunt",
          desc: "Calculez combien vous pouvez emprunter selon vos revenus et votre taux d'endettement.",
          href: "/simulateurs/capacite-emprunt",
          tag: "En premier",
          tagColor: "#059669",
        },
        {
          step: 2,
          icon: "📋",
          title: "Frais de notaire",
          desc: "Estimez précisément les frais d'acquisition (7–8 % dans l'ancien).",
          href: "/simulateurs/frais-notaire",
          tag: "Budget",
          tagColor: "#1a56db",
        },
        {
          step: 3,
          icon: "🏦",
          title: "Simulateur de prêt",
          desc: "Comparez les offres et trouvez la mensualité idéale pour votre budget.",
          href: "/simulateurs/pret-immobilier",
          tag: "Financement",
          tagColor: "#7c3aed",
        },
        {
          step: 4,
          icon: "📅",
          title: "Calendrier acheteur",
          desc: "Votre feuille de route personnalisée jusqu'aux clés.",
          href: "/simulateurs/calendrier-acheteur",
          tag: "Planning",
          tagColor: "#d97706",
        },
      ],
    };
  }

  if (horizon === "moyen") {
    return {
      title: "Votre parcours : Préparation sur 2–5 ans",
      intro: "Vous avez le temps de bien préparer votre projet. Constituez votre apport et optimisez votre dossier.",
      steps: [
        {
          step: 1,
          icon: "⚖️",
          title: "Louer ou acheter ?",
          desc: "Simulez les deux options pour décider du bon moment pour sauter le pas.",
          href: "/",
          tag: "Décision",
          tagColor: "#059669",
        },
        {
          step: 2,
          icon: "🐷",
          title: "Simulateur d'épargne",
          desc: "Calculez combien épargner chaque mois pour atteindre votre apport cible.",
          href: "/simulateurs/epargne",
          tag: "Apport",
          tagColor: "#1a56db",
        },
        {
          step: 3,
          icon: "🗺️",
          title: "Pouvoir d'achat par ville",
          desc: "Comparez votre futur budget dans 10 villes pour choisir où acheter.",
          href: "/simulateurs/pouvoir-achat-m2",
          tag: "Marché",
          tagColor: "#7c3aed",
        },
        {
          step: 4,
          icon: "📅",
          title: "Calendrier acheteur",
          desc: "Planifiez chaque étape de votre projet avec des dates concrètes.",
          href: "/simulateurs/calendrier-acheteur",
          tag: "Planning",
          tagColor: "#d97706",
        },
      ],
    };
  }

  // long or incertain
  return {
    title: "Votre parcours : Construction patrimoniale long terme",
    intro: "Vous pensez à long terme. Explorez toutes les options et construisez une stratégie patrimoniale solide.",
    steps: [
      {
        step: 1,
        icon: "⏳",
        title: "Machine à remonter le temps",
        desc: "Comprenez comment les cycles immobiliers affectent la rentabilité selon l'année d'achat.",
        href: "/simulateurs/machine-temps",
        tag: "Analyse",
        tagColor: "#7c3aed",
      },
      {
        step: 2,
        icon: "⚖️",
        title: "Louer ou acheter ?",
        desc: "Simulez sur 20 ans dans votre situation personnelle réelle.",
        href: "/",
        tag: "Essentiel",
        tagColor: "#059669",
      },
      {
        step: 3,
        icon: "🗺️",
        title: "Pouvoir d'achat par ville",
        desc: "Identifiez les marchés où votre budget est le plus efficace.",
        href: "/simulateurs/pouvoir-achat-m2",
        tag: "Stratégie",
        tagColor: "#1a56db",
      },
      {
        step: 4,
        icon: "🏛️",
        title: "Héritage & patrimoine",
        desc: "Anticipez et optimisez vos actifs immobiliers sur le long terme.",
        href: "/simulateurs/heritage-immobilier",
        tag: "Patrimoine",
        tagColor: "#d97706",
      },
    ],
  };
}

export default function PageGuidePersonnalise() {
  const [answers, setAnswers] = useState({});
  const [currentQ, setCurrentQ] = useState(0);
  const [done, setDone] = useState(false);

  const handleAnswer = (questionId, optionId) => {
    const newAnswers = { ...answers, [questionId]: optionId };
    setAnswers(newAnswers);

    if (currentQ < QUESTIONS.length - 1) {
      setTimeout(() => setCurrentQ((q) => q + 1), 200);
    } else {
      setTimeout(() => setDone(true), 200);
    }
  };

  const reset = () => {
    setAnswers({});
    setCurrentQ(0);
    setDone(false);
  };

  const path = done ? buildPath(answers) : null;

  const answeredLabels = QUESTIONS.slice(0, currentQ).map((q) => {
    const opt = q.options.find((o) => o.id === answers[q.id]);
    return opt ? { icon: opt.emoji, label: opt.label } : null;
  }).filter(Boolean);

  return (
    <div className="guide-perso-page">
      <TopBar />
      <div className="guide-perso-hero">
        <div className="guide-perso-hero-inner">
          <div className="guide-perso-hero-top">
            <span className="guide-perso-badge">✨ Mon projet immobilier</span>
            <div className="guide-perso-hero-links">
              <Link to="/simulateurs" className="guide-hero-link">Simulateurs</Link>
              <Link to="/blog" className="guide-hero-link">Blog</Link>
              <Link to="/jeu" className="guide-hero-link">🎮 Jeu</Link>
              <Link to="/guide-achat" className="guide-hero-link guide-hero-link-primary">Guide achat →</Link>
            </div>
          </div>
          <h1 className="guide-perso-title">Mon projet immobilier</h1>
          <p className="guide-perso-subtitle">
            Répondez à 3 questions et recevez un parcours de simulateurs personnalisé selon votre situation et vos objectifs.
          </p>
        </div>
      </div>

      <div className="guide-perso-content">
        {!done ? (
          <div className="guide-perso-quiz">
            {/* Progress steps */}
            <div className="guide-quiz-steps">
              {QUESTIONS.map((q, i) => {
                const isDone = i < currentQ;
                const isActive = i === currentQ;
                const opt = isDone ? q.options.find((o) => o.id === answers[q.id]) : null;
                return (
                  <div key={q.id} className={`guide-quiz-step-item${isActive ? " active" : ""}${isDone ? " done" : ""}`}>
                    <span className="guide-quiz-step-num">
                      {isDone ? "✓" : i + 1}
                    </span>
                    <span className="guide-quiz-step-text">
                      {isDone && opt ? `${opt.emoji} ${opt.label}` : q.question.replace(" ?", "")}
                    </span>
                  </div>
                );
              })}
            </div>
            <p className="guide-quiz-step">Question {currentQ + 1} sur {QUESTIONS.length}</p>

            {/* Current question */}
            {QUESTIONS.map((q, qi) =>
              qi === currentQ ? (
                <div key={q.id} className="guide-quiz-card">
                  <div className="guide-quiz-icon">{q.icon}</div>
                  <h2 className="guide-quiz-question">{q.question}</h2>
                  <div className="guide-quiz-options">
                    {q.options.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        className={`guide-quiz-option${answers[q.id] === opt.id ? " selected" : ""}`}
                        onClick={() => handleAnswer(q.id, opt.id)}
                      >
                        <span className="guide-quiz-opt-emoji">{opt.emoji}</span>
                        <div className="guide-quiz-opt-text">
                          <strong>{opt.label}</strong>
                          <span>{opt.desc}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ) : null
            )}
          </div>
        ) : (
          <div className="guide-perso-result">
            <div className="guide-result-header">
              <div className="guide-result-check">✓</div>
              <div>
                <h2 className="guide-result-title">{path.title}</h2>
                <p className="guide-result-intro">{path.intro}</p>
              </div>
            </div>

            <div className="guide-result-steps">
              {path.steps.map((s) => (
                <Link key={s.step} to={s.href} className="guide-result-step">
                  <div className="guide-result-step-num">{s.step}</div>
                  <div className="guide-result-step-icon">{s.icon}</div>
                  <div className="guide-result-step-body">
                    <div className="guide-result-step-header">
                      <span className="guide-result-step-title">{s.title}</span>
                      <span className="guide-result-step-tag" style={{ background: s.tagColor + "22", color: s.tagColor }}>
                        {s.tag}
                      </span>
                    </div>
                    <p className="guide-result-step-desc">{s.desc}</p>
                  </div>
                  <span className="guide-result-step-arrow">→</span>
                </Link>
              ))}
            </div>

            <div className="guide-result-actions">
              <button type="button" className="guide-reset-btn" onClick={reset}>
                ↩ Recommencer le questionnaire
              </button>
              <Link to="/simulateurs" className="guide-hub-btn">
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
