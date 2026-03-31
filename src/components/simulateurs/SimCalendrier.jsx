import { useMemo, useState } from "react";
import SimLayout from "./SimLayout";
import SimFunnel from "./SimFunnel";
import Field from "../Field";

const fmtCur = (v) => new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(v);

const MONTH_NAMES = ["jan", "fév", "mar", "avr", "mai", "jun", "jul", "aoû", "sep", "oct", "nov", "déc"];

function addMonths(now, n) {
  const d = new Date(now);
  d.setMonth(d.getMonth() + n);
  return `${MONTH_NAMES[d.getMonth()]} ${d.getFullYear()}`;
}

function buildCalendar({ salary, currentSavings, monthlySavings, targetApport, hasJob, hasCDI, creditScore, purchasePrice, rate, duration }) {
  const apportTarget = Math.max(targetApport, purchasePrice * 0.1);
  const deficit = Math.max(0, apportTarget - currentSavings);
  const monthsToSave = monthlySavings > 0 ? Math.ceil(deficit / monthlySavings) : null;
  const now = new Date();

  const steps = [];
  let cursor = 0;

  // Step 1: Build savings
  if (deficit > 0 && monthsToSave !== null) {
    steps.push({
      id: "epargne",
      icon: "💰",
      color: "#06b6d4",
      title: "Constituer votre apport",
      desc: `Épargner ${fmtCur(monthlySavings)}/mois pour atteindre ${fmtCur(apportTarget)} (${fmtCur(currentSavings)} déjà épargnés).`,
      duration: monthsToSave,
      start: cursor,
      tag: `${monthsToSave} mois`,
      date: addMonths(now, cursor),
    });
    cursor += monthsToSave;
  } else if (deficit <= 0) {
    steps.push({
      id: "epargne",
      icon: "✅",
      color: "#059669",
      title: "Apport disponible",
      desc: `Vous avez déjà ${fmtCur(currentSavings)} d'épargne — l'apport cible est atteint !`,
      duration: 0,
      start: 0,
      tag: "Déjà prêt",
      date: addMonths(now, 0),
    });
  }

  // Step 2: Stabilité professionnelle
  if (!hasCDI) {
    steps.push({
      id: "cdi",
      icon: "📄",
      color: "#2563eb",
      title: "Obtenir un CDI ou 2 ans d'ancienneté",
      desc: "Les banques exigent généralement un CDI de plus de 6 mois ou 2 bilans comptables pour les indépendants.",
      duration: null,
      start: cursor,
      tag: "Prérequis",
      date: addMonths(now, cursor),
    });
  }

  // Step 3: Préparer le dossier
  const dossiersStart = cursor;
  steps.push({
    id: "dossier",
    icon: "📁",
    color: "#7c3aed",
    title: "Préparer votre dossier bancaire",
    desc: "3 derniers bulletins de salaire, 2 derniers avis d'imposition, relevés de compte 3 mois, justificatif d'épargne.",
    duration: 1,
    start: dossiersStart,
    tag: "1 mois",
    date: addMonths(now, dossiersStart),
  });
  cursor += 1;

  // Step 4: Courtier + simulation
  steps.push({
    id: "courtier",
    icon: "🤝",
    color: "#d97706",
    title: "Consulter un courtier ou votre banque",
    desc: "Obtenez une simulation personnalisée. Comparez au moins 3 offres. La délégation d'assurance peut économiser jusqu'à 20 000 €.",
    duration: 1,
    start: cursor,
    tag: "1–2 mois",
    date: addMonths(now, cursor),
  });
  cursor += 1;

  // Step 5: Recherche du bien
  const searchMonths = purchasePrice > 500000 ? 4 : purchasePrice > 300000 ? 3 : 2;
  steps.push({
    id: "recherche",
    icon: "🔍",
    color: "#2563eb",
    title: "Recherche active du bien",
    desc: `Visites, contre-offres, diagnostics. Délai moyen : ${searchMonths} mois selon le marché local et vos critères.`,
    duration: searchMonths,
    start: cursor,
    tag: `${searchMonths} mois`,
    date: addMonths(now, cursor),
  });
  cursor += searchMonths;

  // Step 6: Compromis
  steps.push({
    id: "compromis",
    icon: "✍️",
    color: "#0891b2",
    title: "Signature du compromis de vente",
    desc: "Versement des arrhes (~5–10 % du prix). Délai de rétractation de 10 jours. Début des démarches bancaires officielles.",
    duration: 0,
    start: cursor,
    tag: "J-jour",
    date: addMonths(now, cursor),
  });

  // Step 7: Offre de prêt
  cursor += 0;
  steps.push({
    id: "pret",
    icon: "🏦",
    color: "#7c3aed",
    title: "Obtention de l'offre de prêt",
    desc: "Instruction du dossier, accord de principe, offre de prêt officielle. Délai légal de réflexion de 10 jours minimum.",
    duration: 2,
    start: cursor,
    tag: "6–8 semaines",
    date: addMonths(now, cursor),
  });
  cursor += 2;

  // Step 8: Acte de vente
  steps.push({
    id: "acte",
    icon: "🔑",
    color: "#059669",
    title: "Signature de l'acte authentique",
    desc: `Rendez-vous chez le notaire. Remise des clés ! Frais de notaire : ~${fmtCur(purchasePrice * 0.08)}.`,
    duration: 0,
    start: cursor,
    tag: "Emménagement !",
    date: addMonths(now, cursor),
  });

  const totalMonths = cursor;
  return { steps, totalMonths };
}

export default function SimCalendrier() {
  const [v, setV] = useState({
    salary: 2500,
    currentSavings: 20000,
    monthlySavings: 600,
    targetApport: 40000,
    purchasePrice: 280000,
    hasCDI: true,
    rate: 3.5,
    duration: 20,
  });
  const set = (k) => (val) => setV((s) => ({ ...s, [k]: val }));

  const { steps, totalMonths } = useMemo(() => buildCalendar(v), [v]);

  const now = new Date();
  const targetDate = new Date(now);
  targetDate.setMonth(now.getMonth() + totalMonths);

  return (
    <SimLayout
      icon="📅"
      title="Calendrier personnalisé acheteur"
      description="Votre feuille de route complète vers les clés — étapes, délais et conseils selon votre situation personnelle."
      suggestions={["/simulateurs/pret-immobilier", "/simulateurs/frais-notaire", "/simulateurs/endettement"]}
    >
      <SimFunnel
        steps={[
          {
            title: "Votre situation actuelle",
            icon: "💰",
            content: (
              <>
                <Field label="Épargne actuelle" value={v.currentSavings} onChange={set("currentSavings")} suffix="€"
                  hint="Total de votre épargne disponible pour l'apport" />
                <Field label="Épargne mensuelle" value={v.monthlySavings} onChange={set("monthlySavings")} suffix="€/mois"
                  hint="Ce que vous mettez de côté chaque mois" />
                <Field label="Apport visé" value={v.targetApport} onChange={set("targetApport")} suffix="€"
                  hint="Minimum conseillé : 10 % du prix + frais de notaire" />

                <div style={{ marginTop: 16 }} className="field">
                  <label className="field-label">Situation professionnelle</label>
                  <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                    <button type="button" className={`hub-filter-btn${v.hasCDI ? " hub-filter-active" : ""}`} onClick={() => setV(s => ({ ...s, hasCDI: true }))}>
                      CDI / Fonctionnaire
                    </button>
                    <button type="button" className={`hub-filter-btn${!v.hasCDI ? " hub-filter-active" : ""}`} onClick={() => setV(s => ({ ...s, hasCDI: false }))}>
                      Autre (CDD, indépendant)
                    </button>
                  </div>
                </div>
              </>
            ),
          },
          {
            title: "Votre projet immobilier",
            icon: "🏠",
            content: (
              <>
                <Field label="Prix du bien visé" value={v.purchasePrice} onChange={set("purchasePrice")} suffix="€"
                  hint="Budget total d'achat" />

                <div className="sim-info-box" style={{ marginTop: 20 }}>
                  <p className="sim-info-title">📅 Horizon estimé</p>
                  <p className="sim-info-body">
                    Sur la base de vos données, vous pourriez obtenir les clés aux alentours de{" "}
                    <strong>{addMonths(new Date(), totalMonths)}</strong> (dans environ {totalMonths} mois).
                  </p>
                </div>
              </>
            ),
          },
        ]}
        result={
          <div className="sim-results-panel">
            <div className="sim-stat-hero sim-hero-blue">
              <span className="sim-stat-label">Durée estimée jusqu'aux clés</span>
              <span className="sim-stat-value">{totalMonths} <span className="sim-stat-unit">mois</span></span>
              <p className="sim-stat-hero-summary">
                Soit environ {Math.ceil(totalMonths / 12)} an{Math.ceil(totalMonths / 12) > 1 ? "s" : ""}.
                Objectif : {addMonths(new Date(), totalMonths)}.
              </p>
            </div>

            <div className="cal-timeline">
              {steps.map((step, i) => (
                <div key={step.id} className="cal-step">
                  <div className="cal-step-left">
                    <div className="cal-step-icon" style={{ background: step.color + "22", color: step.color }}>
                      {step.icon}
                    </div>
                    {i < steps.length - 1 && <div className="cal-step-connector" />}
                  </div>
                  <div className="cal-step-body">
                    <div className="cal-step-header">
                      <span className="cal-step-date">{step.date}</span>
                      <span className="cal-step-tag" style={{ background: step.color + "22", color: step.color }}>{step.tag}</span>
                    </div>
                    <p className="cal-step-title">{step.title}</p>
                    <p className="cal-step-desc">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="sim-info-box">
              <p className="sim-info-title">⚠️ Estimation indicative</p>
              <p className="sim-info-body">Ce calendrier est basé sur des moyennes nationales. Les délais réels varient selon le marché local, votre banque, le notaire et les conditions de chaque transaction.</p>
            </div>
          </div>
        }
      />
    </SimLayout>
  );
}
