import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import TopBar from "../TopBar";
import Footer from "../Footer";
import SaveSimulation from "../SaveSimulation";
import { trackSimulatorOpened, trackSimulatorClosed } from "../../utils/analytics";
import { useSEO } from "../../utils/useSEO";

/* ─── All simulators catalog ─────────────────────────────── */
const ALL_SIMS = [
  { path:"/simulateurs/epargne",              icon:"💰", label:"Épargne",               time:"2 min" },
  { path:"/simulateurs/pret-immobilier",       icon:"🏦", label:"Prêt immobilier",      time:"2 min" },
  { path:"/simulateurs/pret-conso",            icon:"💳", label:"Prêt conso",           time:"1 min" },
  { path:"/simulateurs/niveau-de-vie",         icon:"📊", label:"Niveau de vie",        time:"3 min" },
  { path:"/simulateurs/endettement",           icon:"⚖️",  label:"Endettement",          time:"2 min" },
  { path:"/simulateurs/rentabilite-locative",  icon:"🏘️", label:"Rentabilité locative", time:"3 min" },
  { path:"/simulateurs/frais-notaire",         icon:"📋", label:"Frais de notaire",     time:"1 min" },
  { path:"/simulateurs/plus-value",            icon:"📈", label:"Plus-value",           time:"3 min" },
  { path:"/simulateurs/charges-copro",         icon:"🏢", label:"Charges copro",        time:"1 min" },
  { path:"/simulateurs/taxe-fonciere",         icon:"🏛️", label:"Taxe foncière",        time:"2 min" },
  { path:"/simulateurs/comparateur-villes",    icon:"🗺️", label:"Comparateur villes",   time:"2 min" },
  { path:"/simulateurs/budget-maximum",        icon:"💸", label:"Budget maximum",       time:"2 min" },
  { path:"/simulateurs/score-acheteur",        icon:"⭐", label:"Score acheteur",       time:"3 min" },
  { path:"/simulateurs/stress-test",           icon:"🔥", label:"Stress test",          time:"2 min" },
  { path:"/simulateurs/ptz",                   icon:"🏠", label:"Simulateur PTZ",       time:"2 min" },
  { path:"/simulateurs/impact-dpe",            icon:"♻️", label:"Impact DPE",           time:"2 min" },
  { path:"/simulateurs/assurance-pret",        icon:"🛡️", label:"Assurance prêt",       time:"2 min" },
  { path:"/simulateurs/remboursement-anticipe",icon:"⚡", label:"Remboursement anticipé",time:"2 min" },
  { path:"/simulateurs/pouvoir-achat-m2",      icon:"🔍", label:"Pouvoir d'achat m²",   time:"1 min" },
  { path:"/simulateurs/simulateur-couple",     icon:"💑", label:"Simulateur couple",    time:"3 min" },
  { path:"/simulateurs/machine-temps",         icon:"⏰", label:"Machine à remonter le temps", time:"1 min" },
  { path:"/simulateurs/optimiser-apport",      icon:"🎯", label:"Optimiser l'apport",   time:"2 min" },
  { path:"/simulateurs/negociation",           icon:"🤝", label:"Marge de négociation", time:"2 min" },
];

const CONSEILS_GENERAUX = [
  "Le taux d'endettement ne doit pas dépasser 35 % de vos revenus nets (règle HCSF 2022).",
  "Les frais de notaire représentent 7 à 8 % du prix dans l'ancien — prévoyez-les dans votre apport.",
  "Un crédit sur 25 ans coûte environ 2× plus d'intérêts qu'un crédit sur 15 ans au même taux.",
  "L'apport idéal couvre au moins les frais de notaire + 10 % du prix pour rassurer la banque.",
  "Comparez toujours le TAEG (Taux Annuel Effectif Global), pas seulement le taux nominal.",
  "La règle des 5 ans : en dessous de 5 ans de détention, louer est souvent plus rentable.",
  "Une baisse d'1 point de taux sur 200 000 € / 20 ans = ~110 €/mois d'économie.",
  "Les charges de copropriété peuvent varier de 20 à 80 €/m²/an — renseignez-vous avant d'acheter.",
  "Un DPE F ou G peut faire décote de 10 à 25 % sur la valeur du bien depuis la loi Climat.",
  "L'assurance emprunteur représente jusqu'à 30 % du coût total d'un crédit — comparez-la !",
  "La taxe foncière a augmenté de 26 % en moyenne depuis 2020. Vérifiez le montant exact.",
  "Négocier 5 % sur un bien à 300 000 € = 15 000 € d'économie, soit ~60 €/mois sur 25 ans.",
];

function getConseil(conseils) {
  const list = conseils && conseils.length > 0 ? conseils : CONSEILS_GENERAUX;
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
  return list[dayOfYear % list.length];
}

function ShareButton() {
  const [copied, setCopied] = useState(false);
  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) { try { await navigator.share({ title: document.title, url }); return; } catch {} }
    try { await navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch {}
  };
  return (
    <button className="sim-share-btn" onClick={handleShare} type="button" aria-label="Partager">
      {copied ? (
        <><svg width="14" height="14" viewBox="0 0 15 15" fill="none" aria-hidden="true"><path d="M3 7.5l3 3 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg> Copié !</>
      ) : (
        <><svg width="14" height="14" viewBox="0 0 15 15" fill="none" aria-hidden="true"><circle cx="11.5" cy="3.5" r="2" stroke="currentColor" strokeWidth="1.5"/><circle cx="3.5" cy="7.5" r="2" stroke="currentColor" strokeWidth="1.5"/><circle cx="11.5" cy="11.5" r="2" stroke="currentColor" strokeWidth="1.5"/><path d="M5.4 6.5l4.2-2M5.4 8.5l4.2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg> Partager</>
      )}
    </button>
  );
}

export default function SimLayout({ children, title, description, icon, simTime = "2 min", backLabel, conseils, saveValues, onRestore }) {
  const conseil = getConseil(conseils);
  const openedAt = useRef(Date.now());
  const location = useLocation();
  const currentPath = location.pathname;

  useSEO({ title, description, path: currentPath });

  useEffect(() => {
    trackSimulatorOpened(title, currentPath);
    openedAt.current = Date.now();
    return () => { const secs = Math.round((Date.now() - openedAt.current) / 1000); trackSimulatorClosed(title, secs); };
  }, [title]);

  const relatedSims = ALL_SIMS.filter((s) => s.path !== currentPath).slice(0, 6);

  return (
    <div className="page">
      <TopBar />
      <main id="main-content" className="sim-page">

        {/* ── Premium header ── */}
        <div className="sim-ph">
          <div className="sim-ph-inner">
            <nav className="sim-ph-breadcrumb" aria-label="Navigation">
              <Link to="/simulateurs">← Tous les simulateurs</Link>
            </nav>
            <div className="sim-ph-hero">
              <div className="sim-ph-icon" aria-hidden="true">{icon}</div>
              <div className="sim-ph-text">
                <h1 className="sim-ph-title">{title}</h1>
                {description && <p className="sim-ph-desc">{description}</p>}
              </div>
            </div>
            <div className="sim-ph-meta">
              <span className="sim-ph-badge">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.3"/>
                  <path d="M6 3.5v2.8l1.8 1.8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                </svg>
                {simTime}
              </span>
              <span className="sim-ph-badge sim-ph-badge-green">Gratuit</span>
              <span className="sim-ph-badge">Données 2026</span>
              <div className="sim-ph-actions">
                {saveValues !== undefined && <SaveSimulation values={saveValues} onRestore={onRestore} simTitle={title} />}
                <ShareButton />
              </div>
            </div>
          </div>
        </div>

        {/* ── Conseil du jour ── */}
        <div className="sim-conseil-box" role="note">
          <span className="sim-conseil-icon" aria-hidden="true">💡</span>
          <p className="sim-conseil-text"><strong>Le saviez-vous ?</strong> {conseil}</p>
        </div>

        {/* ── Simulator content ── */}
        {children}

        {/* ── Related simulators ── */}
        <section className="sim-related-section">
          <h2 className="sim-related-title">Simulateurs complémentaires</h2>
          <div className="sim-related-grid">
            {relatedSims.map((s) => (
              <Link key={s.path} to={s.path} className="sim-related-card">
                <span className="sim-related-icon">{s.icon}</span>
                <span className="sim-related-label">{s.label}</span>
                <span className="sim-related-time">{s.time}</span>
              </Link>
            ))}
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
