import { useState } from "react";
import { Link } from "react-router-dom";
import TopBar from "./TopBar";
import Footer from "./Footer";
import { useSEO } from "../utils/useSEO";

/* ─── Données de contenu ─────────────────────────────── */
const STEPS = [
  {
    num: 1,
    color: "teal",
    icon: "🔍",
    question: "Est-ce que je peux acheter ?",
    desc: "Avant tout projet immobilier, évaluez votre capacité réelle d'emprunt. Les banques appliquent la règle HCSF : vos mensualités de crédit ne peuvent pas dépasser 35 % de vos revenus nets. C'est la première question à se poser — inutile de chercher un bien si vous ne savez pas ce que vous pouvez emprunter.",
    kpis: [
      { label: "Taux d'endettement max", value: "35 %", note: "Règle HCSF obligatoire depuis 2022" },
      { label: "Apport minimum recommandé", value: "10 %", note: "Pour couvrir les frais de notaire" },
      { label: "Taux moyen 2026", value: "3,3–3,7 %", note: "Sur 20 ans, selon profil" },
    ],
    piege: {
      title: "Erreur fréquente",
      text: "Oublier les crédits à la consommation ou auto en cours. Chaque mensualité existante réduit mécaniquement votre capacité immobilière. Un crédit auto à 300 €/mois = environ 60 000 € de capacité d'emprunt en moins sur 20 ans.",
    },
    tools: [
      { href: "/simulateurs/endettement", icon: "📉", title: "Calculateur d'endettement", desc: "Taux d'endettement en temps réel + montant empruntable maximum.", tag: "Essentiel" },
      { href: "/simulateurs/budget-maximum", icon: "🏆", title: "Budget maximum", desc: "Budget total par durée + carte des 12 villes accessibles avec vos revenus.", tag: "Recommandé" },
      { href: "/simulateurs/score-acheteur", icon: "🎯", title: "Score de préparation", desc: "Radar sur 5 dimensions : apport, emploi, charge, projet, marché.", tag: "Recommandé" },
    ],
  },
  {
    num: 2,
    color: "blue",
    icon: "⏱️",
    question: "Est-ce le bon moment ?",
    desc: "L'immobilier n'est pas toujours meilleur qu'une location investie intelligemment. La rentabilité de l'achat dépend de votre horizon, de votre ville et du niveau des prix. Avant de signer, comparez les deux scénarios sur 10, 15 et 20 ans avec vos vrais chiffres.",
    kpis: [
      { label: "Durée minimale conseillée", value: "5 ans", note: "En dessous, louer est souvent plus rentable" },
      { label: "Revalorisation immo historique", value: "+2 %/an", note: "Moyenne France sur 20 ans (Notaires)" },
      { label: "Point de rentabilité moyen", value: "7–12 ans", note: "Variable selon ville et apport" },
    ],
    piege: {
      title: "Erreur fréquente",
      text: "Acheter avec un horizon de revente < 5 ans. Les frais de notaire (7–8 %) ne sont « amortis » qu'après plusieurs années de valorisation. Si vous revendez en 3 ans, vous perdez souvent de l'argent même si le marché est flat.",
    },
    tools: [
      { href: "/", icon: "🏠", title: "Louer ou Acheter ?", desc: "La simulation principale : patrimoine net et point d'équilibre sur 30 ans.", tag: "Essentiel" },
      { href: "/simulateurs/comparateur-villes", icon: "🗺️", title: "Comparateur de villes", desc: "Loyer vs mensualité + point de rentabilité dans 12 villes françaises.", tag: "Recommandé" },
      { href: "/simulateurs/machine-temps", icon: "⏰", title: "Machine à remonter le temps", desc: "Et si vous aviez acheté en 2010, 2015 ou 2018 ? Gain ou perte chiffré.", tag: "Fascinant" },
    ],
  },
  {
    num: 3,
    color: "purple",
    icon: "🏡",
    question: "Quel bien puis-je acheter ?",
    desc: "Une fois votre budget défini, calculez tous les coûts cachés. Le prix affiché n'est que le point de départ : frais de notaire, frais d'agence, travaux éventuels et mensualité réelle forment votre budget total. Aucune mauvaise surprise le jour de la signature.",
    kpis: [
      { label: "Frais de notaire dans l'ancien", value: "7–8 %", note: "Du prix d'achat — incontournables" },
      { label: "Frais de notaire dans le neuf", value: "2–3 %", note: "Avantage fiscal neuf" },
      { label: "Prix médian France 2026", value: "~250 000 €", note: "Source : Notaires de France" },
    ],
    piege: {
      title: "Erreur fréquente",
      text: "Confondre budget d'achat et prix du bien. Si vous avez 250 000 € de budget total, le bien lui-même ne peut coûter que ~231 000 € (les 8 % restants sont pour le notaire). Calculez toujours à rebours.",
    },
    tools: [
      { href: "/simulateurs/frais-notaire", icon: "📋", title: "Frais de notaire", desc: "Calcul au centime selon le barème légal 2026 — ancien et neuf — avec détail ligne par ligne.", tag: "Essentiel" },
      { href: "/simulateurs/pret-immobilier", icon: "🏦", title: "Prêt immobilier", desc: "Mensualité, coût total et tableau d'amortissement annuel complet.", tag: "Essentiel" },
      { href: "/simulateurs/ptz", icon: "🏗️", title: "PTZ 2026", desc: "Êtes-vous éligible au Prêt à Taux Zéro ? Montant et économie calculés.", tag: "Aides" },
    ],
  },
  {
    num: 4,
    color: "amber",
    icon: "📊",
    question: "Est-ce rentable ?",
    desc: "Pour un investissement locatif ou une revente future, la rentabilité nette est très différente de la rentabilité brute. La fiscalité (IR + prélèvements sociaux à 17,2 %), les travaux, le DPE, la vacance locative et la plus-value taxable doivent tous être anticipés.",
    kpis: [
      { label: "Rendement brut « sain »", value: "4–6 %", note: "En dessous de 4 % brut, attention" },
      { label: "Prélèvements sociaux", value: "17,2 %", note: "S'ajoutent à l'IR sur les loyers et plus-values" },
      { label: "Exonération plus-value RP", value: "100 %", note: "Résidence principale totalement exonérée" },
    ],
    piege: {
      title: "Erreur fréquente",
      text: "Calculer uniquement le rendement brut (loyer / prix d'achat). Après déduction des charges, de la taxe foncière, de la vacance locative et de l'impôt, le rendement net-net peut être 2× inférieur au brut. Utilisez toujours le simulateur avec votre TMI.",
    },
    tools: [
      { href: "/simulateurs/rentabilite-locative", icon: "🏘️", title: "Rentabilité locative", desc: "Rendement brut, net, net-net et cashflow mensuel avec fiscalité réelle.", tag: "Essentiel" },
      { href: "/simulateurs/plus-value", icon: "📈", title: "Plus-value immobilière", desc: "Impôt à la revente selon la durée de détention et les abattements légaux.", tag: "Recommandé" },
      { href: "/simulateurs/impact-dpe", icon: "♻️", title: "Impact DPE & rénovation", desc: "Décote d'une passoire énergétique et ROI des travaux de rénovation.", tag: "Important" },
    ],
  },
  {
    num: 5,
    color: "pink",
    icon: "💡",
    question: "Comment optimiser le financement ?",
    desc: "Un prêt sur 20 ans n'est pas figé dans le marbre. Le choix de la durée, de l'assurance emprunteur et de l'apport optimal peut faire varier le coût total de plusieurs dizaines de milliers d'euros. Comparez avant de signer.",
    kpis: [
      { label: "Durée max autorisée (HCSF)", value: "25 ans", note: "27 ans pour le neuf ou avec travaux" },
      { label: "Économie potentielle assurance", value: "10–20 k€", note: "Loi Lemoine : changement à tout moment" },
      { label: "Impact d'1 point de taux", value: "~110 €/mois", note: "Sur 200 000 € / 20 ans" },
    ],
    piege: {
      title: "Erreur fréquente",
      text: "Garder l'assurance emprunteur de la banque par défaut. Depuis la loi Lemoine (2022), vous pouvez changer à tout moment. Pour un profil jeune non-fumeur, la délégation d'assurance coûte souvent 2× moins cher. Sur 20 ans, c'est potentiellement 10 000–20 000 € d'économie.",
    },
    tools: [
      { href: "/simulateurs/optimiser-apport", icon: "🎯", title: "Optimiseur d'apport", desc: "Acheter maintenant ou épargner encore ? Le point d'équilibre chiffré.", tag: "Essentiel" },
      { href: "/simulateurs/assurance-pret", icon: "🛡️", title: "Assurance emprunteur", desc: "Comparaison banque vs délégation — économie loi Lemoine calculée précisément.", tag: "Important" },
      { href: "/simulateurs/remboursement-anticipe", icon: "⚡", title: "Remboursement anticipé", desc: "Rembourser par anticipation ou placer ? Calcul exact de l'économie.", tag: "Recommandé" },
    ],
  },
];

const GLOSSAIRE = [
  { term: "HCSF", def: "Haut Conseil de Stabilité Financière. Fixe les règles prudentielles bancaires. Sa règle principale : taux d'endettement maximal de 35 % et durée max de 25 ans." },
  { term: "TAEG", def: "Taux Annuel Effectif Global. Inclut le taux nominal + assurance + frais de dossier. C'est le seul chiffre qui permet de comparer deux offres de prêt." },
  { term: "Taux d'endettement", def: "Part de vos revenus nets consacrée aux mensualités de crédit. HCSF le plafonne à 35 %. Exemple : revenus 3 000 €/mois → mensualités max 1 050 €." },
  { term: "Frais de notaire", def: "Environ 7–8 % dans l'ancien, 2–3 % dans le neuf. Payés à l'acte d'achat. Composés des droits d'enregistrement (80 %), émoluments du notaire (15 %) et débours (5 %)." },
  { term: "PTZ", def: "Prêt à Taux Zéro. Aide de l'État réservée aux primo-accédants pour l'achat d'un logement neuf ou ancien avec travaux, sous conditions de revenus et de zone géographique." },
  { term: "DPE", def: "Diagnostic de Performance Énergétique. Note de A à G. Depuis 2025, les logements G sont inconstructibles. Un DPE F/G peut entraîner une décote de 10 à 25 % sur la valeur du bien." },
  { term: "Plus-value", def: "Différence entre prix de vente et prix d'achat (+ travaux). Taxée à 19 % (IR) + 17,2 % (PS) pour les résidences secondaires. La résidence principale est totalement exonérée." },
  { term: "Loi Lemoine", def: "Loi de 2022 permettant de changer d'assurance emprunteur à tout moment, sans frais ni délai. La banque est obligée d'accepter si les garanties sont équivalentes." },
];

const FAQ = [
  {
    q: "Quel apport faut-il pour acheter en 2026 ?",
    a: "L'apport minimum recommandé est de 10 % du prix d'achat pour couvrir les frais de notaire. Les banques l'exigent souvent. Avoir 20 % d'apport vous permet d'obtenir de meilleures conditions de taux. Mais certains dossiers solides passent avec moins de 10 % — tout dépend de votre profil d'emprunteur.",
  },
  {
    q: "Combien d'années de CDI faut-il pour emprunter ?",
    a: "La plupart des banques exigent d'avoir passé la période d'essai en CDI. Un dossier en CDD ou indépendant est possible mais plus difficile — il faut 3 ans de bilans complets et un historique de revenus stable. Un courtier peut vous orienter vers les banques les plus ouvertes à votre profil.",
  },
  {
    q: "Vaut-il mieux un prêt sur 20 ou 25 ans ?",
    a: "Sur 25 ans, la mensualité est plus basse (~15 % de moins), mais le coût total des intérêts est ~35 % plus élevé qu'un 20 ans. Le choix dépend de votre capacité mensuelle et de votre projet. Utilisez le simulateur de prêt pour comparer les deux options avec vos chiffres exacts.",
  },
  {
    q: "Peut-on négocier le prix d'un bien immobilier en 2026 ?",
    a: "Oui, et c'est même conseillé. En 2026, dans un marché modérément tendu, les marges de négociation tournent entre 2 et 8 % selon les villes. Les biens avec un DPE F ou G, ou en vente depuis > 3 mois, se négocient plus facilement. Utilisez notre simulateur de négociation pour calculer le prix cible.",
  },
  {
    q: "Qu'est-ce que la règle des 5 ans en immobilier ?",
    a: "Règle empirique qui dit qu'il faut rester au moins 5 ans dans un bien acheté pour que l'achat soit plus rentable que la location. En dessous de 5 ans, les frais de notaire, d'agence et les intérêts du début du prêt ne sont généralement pas amortis. Notre simulateur louer/acheter vous donne le point de rentabilité exact.",
  },
  {
    q: "Comment calculer sa capacité d'emprunt réelle ?",
    a: "Capacité mensuelle = (revenus nets × 35 %) − charges existantes. Cette mensualité maximale sert à calculer le capital empruntable via la formule d'actualisation. Sur 20 ans à 3,5 %, chaque 1 000 €/mois de mensualité = ~170 000 € d'emprunt. Notre calculateur d'endettement fait ce calcul instantanément.",
  },
];

const STEP_COLORS = {
  teal:   { bg: "#ccfbf1", accent: "#0d9488", light: "#f0fdfa", border: "#99f6e4", num: "#0f766e" },
  blue:   { bg: "#dbeafe", accent: "#2563eb", light: "#eff6ff", border: "#bfdbfe", num: "#1e40af" },
  purple: { bg: "#f3e8ff", accent: "#7c3aed", light: "#faf5ff", border: "#e9d5ff", num: "#6d28d9" },
  amber:  { bg: "#fef3c7", accent: "#d97706", light: "#fffbeb", border: "#fde68a", num: "#b45309" },
  pink:   { bg: "#fce7f3", accent: "#db2777", light: "#fdf2f8", border: "#fbcfe8", num: "#9d174d" },
};

const TAG_COLORS = {
  "Essentiel":  { bg: "#dbeafe", color: "#1e40af" },
  "Recommandé": { bg: "#d1fae5", color: "#065f46" },
  "Important":  { bg: "#fef3c7", color: "#92400e" },
  "Fascinant":  { bg: "#ede9fe", color: "#5b21b6" },
  "Aides":      { bg: "#e0f2fe", color: "#075985" },
};

/* ─── Composants ──────────────────────────────────────── */
function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`guide-faq-item${open ? " guide-faq-open" : ""}`}>
      <button
        className="guide-faq-question"
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span>{q}</span>
        <span className="guide-faq-chevron" aria-hidden="true">{open ? "▲" : "▼"}</span>
      </button>
      {open && <p className="guide-faq-answer">{a}</p>}
    </div>
  );
}

/* ─── Page principale ─────────────────────────────────── */
export default function PageGuideAchat() {
  useSEO({
    title: "Guide Complet pour Acheter en 2026 — 5 Étapes, Chiffres Clés et Pièges à Éviter",
    description: "Guide étape par étape pour réussir votre achat immobilier en 2026 : capacité d'emprunt, bon moment, frais de notaire, rentabilité, financement. 27 simulateurs gratuits.",
    path: "/guide-achat",
  });

  return (
    <div className="page">
      <TopBar />
      <main id="main-content" className="guide-page-v2">

        {/* ── HERO PREMIUM ──────────────────────────────── */}
        <div className="guide-hero-v2">
          <div className="guide-hero-v2-inner">
            <div className="guide-hero-v2-badge">Parcours acheteur 2026</div>
            <h1 className="guide-hero-v2-title">
              Guide complet pour acheter<br />
              <span className="guide-hero-v2-em">votre bien immobilier</span>
            </h1>
            <p className="guide-hero-v2-desc">
              De "puis-je acheter ?" à "comment optimiser le financement ?", toutes les étapes
              avec les chiffres qui comptent vraiment — et les pièges à éviter.
            </p>
            <div className="guide-hero-v2-stats">
              <div className="guide-hero-stat"><strong>5</strong><span>étapes claires</span></div>
              <div className="guide-hero-stat-sep" aria-hidden="true" />
              <div className="guide-hero-stat"><strong>27</strong><span>simulateurs gratuits</span></div>
              <div className="guide-hero-stat-sep" aria-hidden="true" />
              <div className="guide-hero-stat"><strong>100%</strong><span>données 2026</span></div>
            </div>
            <div className="guide-hero-v2-actions">
              <a href="#step-1" className="guide-hero-v2-btn-primary">Commencer le guide →</a>
              <Link to="/guide-personnalise" className="guide-hero-v2-btn-secondary">
                ✨ Guide personnalisé
              </Link>
            </div>
          </div>

          {/* Step anchors */}
          <nav className="guide-hero-nav" aria-label="Étapes du guide">
            {STEPS.map((s) => {
              const c = STEP_COLORS[s.color];
              return (
                <a key={s.num} href={`#step-${s.num}`} className="guide-hero-nav-item" style={{ "--step-accent": c.accent, "--step-bg": c.bg }}>
                  <span className="guide-hero-nav-num" style={{ color: c.accent }}>{s.num}</span>
                  <span className="guide-hero-nav-icon">{s.icon}</span>
                  <span className="guide-hero-nav-label">{s.question.replace(" ?", "")}</span>
                </a>
              );
            })}
          </nav>
        </div>

        {/* ── ÉTAPES ────────────────────────────────────── */}
        <div className="guide-steps-v2">
          {STEPS.map((step, idx) => {
            const c = STEP_COLORS[step.color];
            return (
              <section
                key={step.num}
                id={`step-${step.num}`}
                className="guide-step-v2"
                style={{ "--step-accent": c.accent, "--step-bg": c.bg, "--step-border": c.border, "--step-light": c.light }}
              >
                {/* Step heading */}
                <div className="guide-step-v2-heading">
                  <div className="guide-step-v2-num-wrap" style={{ background: c.bg, borderColor: c.border }}>
                    <span className="guide-step-v2-icon">{step.icon}</span>
                    <span className="guide-step-v2-num" style={{ color: c.num }}>Étape {step.num} / 5</span>
                  </div>
                  <h2 className="guide-step-v2-question" style={{ color: c.accent }}>
                    {step.question}
                  </h2>
                </div>

                <div className="guide-step-v2-body">
                  {/* Editorial text */}
                  <p className="guide-step-v2-desc">{step.desc}</p>

                  {/* Key figures */}
                  <div className="guide-kpis-row" style={{ borderColor: c.border }}>
                    <p className="guide-kpis-title" style={{ color: c.accent }}>📌 Chiffres à retenir</p>
                    <div className="guide-kpis-grid">
                      {step.kpis.map((kpi) => (
                        <div key={kpi.label} className="guide-kpi-card" style={{ background: c.light, borderColor: c.border }}>
                          <span className="guide-kpi-value" style={{ color: c.accent }}>{kpi.value}</span>
                          <span className="guide-kpi-label">{kpi.label}</span>
                          <span className="guide-kpi-note">{kpi.note}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Piège à éviter */}
                  <div className="guide-piege-box">
                    <div className="guide-piege-header">
                      <span className="guide-piege-icon">⚠️</span>
                      <strong className="guide-piege-title">{step.piege.title}</strong>
                    </div>
                    <p className="guide-piege-text">{step.piege.text}</p>
                  </div>

                  {/* Tools */}
                  <div className="guide-tools-v2-grid">
                    {step.tools.map((tool) => {
                      const tagStyle = TAG_COLORS[tool.tag] ?? TAG_COLORS["Recommandé"];
                      return (
                        <Link key={tool.href} to={tool.href} className="guide-tool-v2-card">
                          <div className="guide-tool-v2-top">
                            <span className="guide-tool-v2-icon">{tool.icon}</span>
                            <span className="guide-tool-v2-tag" style={{ background: tagStyle.bg, color: tagStyle.color }}>{tool.tag}</span>
                          </div>
                          <h3 className="guide-tool-v2-title">{tool.title}</h3>
                          <p className="guide-tool-v2-desc">{tool.desc}</p>
                          <span className="guide-tool-v2-cta" style={{ color: c.accent }}>Ouvrir le simulateur →</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* Step connector */}
                {idx < STEPS.length - 1 && (
                  <div className="guide-step-v2-connector" aria-hidden="true">
                    <div className="guide-step-v2-connector-line" />
                    <span className="guide-step-v2-connector-icon">↓</span>
                  </div>
                )}
              </section>
            );
          })}
        </div>

        {/* ── CHECKLIST DOSSIER ─────────────────────────── */}
        <div className="guide-checklist-v2">
          <div className="guide-checklist-v2-header">
            <h2 className="guide-checklist-v2-title">📁 Checklist dossier bancaire</h2>
            <p className="guide-checklist-v2-sub">Avoir ces documents prêts accélère l'instruction de votre dossier de 2 à 4 semaines.</p>
          </div>
          <div className="guide-checklist-v2-grid">
            {[
              { cat: "🪪 Identité & situation", items: ["Pièce d'identité en cours de validité", "Justificatif de domicile (- de 3 mois)", "Contrat de mariage / PACS le cas échéant", "Livret de famille si enfants à charge"] },
              { cat: "💼 Revenus & emploi", items: ["3 derniers bulletins de salaire", "2 derniers avis d'imposition (N-1 et N-2)", "Contrat de travail (CDI, CDD, intérim)", "3 derniers bilans + liasse fiscale si indépendant"] },
              { cat: "🏦 Épargne & patrimoine", items: ["3 derniers relevés de tous vos comptes", "Justificatif d'épargne (livrets, PEA, assurance-vie)", "Tableau d'amortissement des crédits en cours", "Titre de propriété si déjà propriétaire"] },
              { cat: "🏠 Le bien immobilier", items: ["Compromis de vente signé ou avant-contrat", "Diagnostics techniques (DPE, amiante, plomb…)", "Règlement de copropriété si appartement", "PV d'AG des 3 dernières années"] },
            ].map((group) => (
              <div key={group.cat} className="guide-checklist-v2-group">
                <p className="guide-checklist-v2-cat">{group.cat}</p>
                <ul className="guide-checklist-v2-list">
                  {group.items.map((item) => (
                    <li key={item} className="guide-checklist-v2-item">
                      <span className="guide-checklist-v2-dot" aria-hidden="true">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ── GLOSSAIRE ─────────────────────────────────── */}
        <div className="guide-glossaire">
          <h2 className="guide-glossaire-title">📖 Glossaire essentiel</h2>
          <p className="guide-glossaire-sub">Les 8 termes incontournables pour ne pas être perdu lors de votre achat.</p>
          <div className="guide-glossaire-grid">
            {GLOSSAIRE.map((item) => (
              <div key={item.term} className="guide-glossaire-card">
                <span className="guide-glossaire-term">{item.term}</span>
                <p className="guide-glossaire-def">{item.def}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── FAQ ───────────────────────────────────────── */}
        <div className="guide-faq-section">
          <h2 className="guide-faq-title">❓ Questions fréquentes</h2>
          <p className="guide-faq-sub">Les 6 questions les plus posées par les acheteurs en 2026.</p>
          <div className="guide-faq-list">
            {FAQ.map((item) => (
              <FaqItem key={item.q} q={item.q} a={item.a} />
            ))}
          </div>
        </div>

        {/* ── CTA DOUBLE ────────────────────────────────── */}
        <div className="guide-cta-v2">
          <div className="guide-cta-v2-left">
            <span className="guide-cta-v2-icon">✨</span>
            <div>
              <p className="guide-cta-v2-title">Guide personnalisé</p>
              <p className="guide-cta-v2-sub">Répondez à 5 questions pour obtenir un parcours adapté à votre profil et vos objectifs.</p>
            </div>
            <Link to="/guide-personnalise" className="guide-cta-v2-btn guide-cta-v2-btn-secondary">Mon guide →</Link>
          </div>
          <div className="guide-cta-v2-sep" aria-hidden="true" />
          <div className="guide-cta-v2-right">
            <span className="guide-cta-v2-icon">🚀</span>
            <div>
              <p className="guide-cta-v2-title">Tous les simulateurs</p>
              <p className="guide-cta-v2-sub">27 calculateurs gratuits pour chaque étape — budget, crédit, investissement, fiscalité.</p>
            </div>
            <Link to="/simulateurs" className="guide-cta-v2-btn guide-cta-v2-btn-primary">Voir tout →</Link>
          </div>
        </div>

      </main>
      <Footer />
    </div>
  );
}
