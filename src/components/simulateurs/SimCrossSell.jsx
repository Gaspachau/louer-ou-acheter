import { useState, useMemo, useEffect } from "react";
import { createPortal } from "react-dom";

const fmt = (v) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(v);

function mortgage(p, r, y) {
  if (p <= 0 || y <= 0) return 0;
  const mr = r / 100 / 12;
  if (mr === 0) return p / (y * 12);
  return (p * mr) / (1 - Math.pow(1 + mr, -(y * 12)));
}

export default function SimCrossSell({ show, loan = 0, taux = 3.5, dureeCredit = 20 }) {
  const [open, setOpen]       = useState(false);
  const [email, setEmail]     = useState("");
  const [phone, setPhone]     = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent]       = useState(false);

  const savings = useMemo(() => {
    if (!loan || loan <= 0) return 0;
    const hi = Math.min(8, taux + 0.8);
    const lo = Math.max(0.5, taux - 0.8);
    const mHi = mortgage(loan, hi, dureeCredit);
    const mLo = mortgage(loan, lo, dureeCredit);
    return Math.round((mHi - mLo) * dureeCredit * 12);
  }, [loan, taux, dureeCredit]);

  // Lock body scroll when modal is open (iOS-safe)
  useEffect(() => {
    if (open) {
      const scrollY = window.scrollY;
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      return () => {
        document.body.style.overflow = "";
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        window.scrollTo(0, scrollY);
      };
    }
  }, [open]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.includes("@") || !phone) return;
    setSending(true);
    const { saveLead } = await import("../../lib/supabase");
    await saveLead(email.trim().toLowerCase(), "cross-sell-sim", null, phone.trim());
    setSending(false);
    setSent(true);
    setTimeout(() => setOpen(false), 3000);
  };

  const closeModal = () => { if (!sending) setOpen(false); };

  if (!show) return null;

  return (
    <>
      {/* ── Trigger ── */}
      <div className="cs-trigger-wrap">
        <button type="button" className="cs-trigger-btn" onClick={() => setOpen(true)}>
          <span className="cs-btn-shine" aria-hidden="true" />
          <span className="cs-trigger-house" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M11 2L2 9v11h6v-6h6v6h6V9L11 2z" fill="rgba(255,255,255,.22)" stroke="rgba(255,255,255,.9)" strokeWidth="1.5" strokeLinejoin="round"/>
              <path d="M9 16h4" stroke="rgba(255,255,255,.7)" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
          </span>
          <span className="cs-trigger-text">
            <strong className="cs-trigger-main">Obtenir le meilleur taux pour mon projet</strong>
            <span className="cs-trigger-hint">Votre dossier est éligible — réponse en 24h</span>
          </span>
          <span className="cs-trigger-arrow" aria-hidden="true">→</span>
        </button>
        <p className="cs-trigger-sub">Gratuit · Réponse en 24h · Sans impact sur votre crédit</p>
      </div>

      {/* ── Modal (portal → bypasses ancestor transforms) ── */}
      {open && createPortal(
        <div className="cs-backdrop" onPointerDown={(e) => { if (e.target === e.currentTarget) closeModal(); }}>
          <div className="cs-modal" role="dialog" aria-modal="true" aria-labelledby="cs-sim-title">

            {/* Close */}
            <button type="button" className="cs-close" onClick={closeModal} aria-label="Fermer">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </button>

            {!sent ? (
              <>
                {/* ── Hero ── */}
                <div className="cs-hero">
                  <div className="cs-hero-illo" aria-hidden="true">
                    <svg width="88" height="88" viewBox="0 0 88 88" fill="none">
                      <circle cx="44" cy="44" r="44" fill="url(#csSimBg)"/>
                      <path d="M44 18L18 36v34h18V52h16v18h18V36L44 18z" fill="url(#csSimHouse)"/>
                      <rect x="38" y="56" width="12" height="14" rx="3" fill="rgba(255,255,255,.35)"/>
                      <rect x="30" y="42" width="9" height="8" rx="2" fill="rgba(255,255,255,.4)"/>
                      <rect x="49" y="42" width="9" height="8" rx="2" fill="rgba(255,255,255,.4)"/>
                      <circle cx="64" cy="26" r="13" fill="#10b981" stroke="white" strokeWidth="2.5"/>
                      <path d="M58 26l4 4 8-8" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <defs>
                        <linearGradient id="csSimBg" x1="0" y1="0" x2="88" y2="88" gradientUnits="userSpaceOnUse">
                          <stop offset="0%" stopColor="#eff6ff"/>
                          <stop offset="100%" stopColor="#dbeafe"/>
                        </linearGradient>
                        <linearGradient id="csSimHouse" x1="18" y1="18" x2="70" y2="70" gradientUnits="userSpaceOnUse">
                          <stop offset="0%" stopColor="#1a56db"/>
                          <stop offset="100%" stopColor="#06b6d4"/>
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <h2 id="cs-sim-title" className="cs-hero-title">
                    Obtenez le meilleur taux pour votre projet
                  </h2>
                  {savings > 500 ? (
                    <p className="cs-hero-sub">
                      Pour un emprunt de <strong>{fmt(loan)}</strong>, la différence entre le meilleur et le moins bon taux représente <strong className="cs-savings-hl">{fmt(savings)} d'économies</strong> sur la durée du crédit.
                    </p>
                  ) : (
                    <p className="cs-hero-sub">
                      Nos partenaires courtiers négocient pour vous le meilleur taux personnalisé auprès de plus de 20 banques.
                    </p>
                  )}
                </div>

                {/* ── Reassurance ── */}
                <div className="cs-reassurance">
                  {[
                    { title: "Réponse en 24h", sub: "Un courtier dédié vous rappelle" },
                    { title: "+20 banques comparées", sub: "Pour le meilleur taux du marché" },
                    { title: "Gratuit, sans impact crédit", sub: "Aucune consultation de score" },
                  ].map((r) => (
                    <div key={r.title} className="cs-reassure-item">
                      <span className="cs-reassure-check" aria-hidden="true">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M2 7l3.5 3.5L12 3" stroke="#059669" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                      <div className="cs-reassure-text">
                        <strong>{r.title}</strong>
                        <span>{r.sub}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* ── Form ── */}
                <form onSubmit={handleSubmit} className="cs-form">
                  <label className="cs-label">
                    <span>Votre email</span>
                    <input type="email" required placeholder="prenom@email.fr" value={email}
                      onChange={(e) => setEmail(e.target.value)} className="cs-input" autoComplete="email"/>
                  </label>
                  <label className="cs-label">
                    <span>Votre numéro pour être rappelé rapidement</span>
                    <input type="tel" required placeholder="06 XX XX XX XX" value={phone}
                      onChange={(e) => setPhone(e.target.value)} className="cs-input" autoComplete="tel" inputMode="tel"/>
                  </label>
                  <button type="submit" className="cs-submit-btn" disabled={sending}>
                    {sending ? "Envoi en cours…" : "Je veux le meilleur taux pour mon projet →"}
                  </button>
                </form>
                <p className="cs-legal">En soumettant ce formulaire vous acceptez d'être contacté par nos partenaires courtiers agréés. Vos données ne sont jamais revendues.</p>
              </>
            ) : (
              <div className="cs-sent">
                <div className="cs-sent-check" aria-hidden="true">
                  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                    <circle cx="18" cy="18" r="18" fill="#dcfce7"/>
                    <path d="M10 18l5.5 5.5L26 12" stroke="#059669" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="cs-sent-title">C'est parti !</h3>
                <p className="cs-sent-msg">Votre dossier a été transmis à nos partenaires.<br/>Un courtier vous contactera dans les 24h.</p>
              </div>
            )}
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
