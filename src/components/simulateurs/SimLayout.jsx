import { useState } from "react";
import { Link } from "react-router-dom";
import TopBar from "../TopBar";
import Footer from "../Footer";

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
    if (navigator.share) {
      try {
        await navigator.share({ title: document.title, url });
        return;
      } catch {}
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <button className="sim-share-btn" onClick={handleShare} type="button" aria-label="Partager ce simulateur">
      {copied ? (
        <>
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
            <path d="M3 7.5l3 3 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Lien copié !
        </>
      ) : (
        <>
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
            <circle cx="11.5" cy="3.5" r="2" stroke="currentColor" strokeWidth="1.5"/>
            <circle cx="3.5" cy="7.5" r="2" stroke="currentColor" strokeWidth="1.5"/>
            <circle cx="11.5" cy="11.5" r="2" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M5.4 6.5l4.2-2M5.4 8.5l4.2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          Partager
        </>
      )}
    </button>
  );
}

export default function SimLayout({ children, title, description, icon, backLabel = "← Tous les simulateurs", conseils }) {
  const conseil = getConseil(conseils);

  return (
    <div className="page">
      <TopBar />
      <main className="sim-page">
        <div className="sim-topbar-row">
          <nav className="sim-breadcrumb" aria-label="Navigation">
            <Link to="/simulateurs">{backLabel}</Link>
          </nav>
          <ShareButton />
        </div>
        <div className="sim-hero">
          <div className="sim-hero-icon-wrap" aria-hidden="true">
            <span className="sim-hero-icon">{icon}</span>
          </div>
          <div>
            <h1 className="sim-hero-title">{title}</h1>
            {description && <p className="sim-hero-desc">{description}</p>}
          </div>
        </div>

        <div className="sim-conseil-box" role="note" aria-label="Conseil du jour">
          <span className="sim-conseil-icon" aria-hidden="true">💡</span>
          <p className="sim-conseil-text"><strong>Le saviez-vous ?</strong> {conseil}</p>
        </div>

        {children}
      </main>
      <Footer />
    </div>
  );
}
