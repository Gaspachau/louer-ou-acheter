import { useState, useMemo } from "react";
import { saveLead } from "../../lib/supabase";

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
    const months = dureeCredit * 12;
    const mHi = mortgage(loan, hi, dureeCredit);
    const mLo = mortgage(loan, lo, dureeCredit);
    return Math.round((mHi - mLo) * months);
  }, [loan, taux, dureeCredit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.includes("@") || !phone) return;
    setSending(true);
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
            <strong className="cs-trigger-main">Obtenir mon taux personnalisé gratuitement</strong>
            <span className="cs-trigger-hint">Votre dossier est éligible — réponse en 24h</span>
          </span>
          <span className="cs-trigger-arrow" aria-hidden="true">→</span>
        </button>
        <p className="cs-trigger-sub">Réponse en 24h · sans impact sur votre crédit</p>
        <div className="cs-trust-badges">
          <span className="cs-trust-badge">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
              <path d="M6.5 1L1 3v4c0 3 2.5 4.8 5.5 5 3-.2 5.5-2 5.5-5V3L6.5 1z" stroke="#1a56db" strokeWidth="1.2" fill="none"/>
            </svg>
            +20 banques comparées
          </span>
          <span className="cs-trust-badge">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
              <path d="M2 6.5L5 9.5l6-6" stroke="#059669" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Gratuit · sans engagement
          </span>
        </div>
      </div>

      {/* ── Modal ── */}
      {open && (
        <div className="cs-backdrop" onPointerDown={(e) => { if (e.target === e.currentTarget) closeModal(); }}>
          <div className="cs-modal" role="dialog" aria-modal="true">
            <button type="button" className="cs-close" onClick={closeModal} aria-label="Fermer">
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                <path d="M1 1l9 9M10 1L1 10" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
              </svg>
            </button>

            {!sent ? (
              <>
                <div className="cs-modal-illo">
                  <div className="cs-modal-illo-circle">
                    <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
                      <path d="M26 6L6 21v27h14V34h12v14h14V21L26 6z" fill="url(#csHouseGradSim)" stroke="none"/>
                      <circle cx="38" cy="14" r="9" fill="#10b981"/>
                      <path d="M34 14l2.5 2.5L42 11" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                      <defs>
                        <linearGradient id="csHouseGradSim" x1="6" y1="6" x2="46" y2="48" gradientUnits="userSpaceOnUse">
                          <stop offset="0%" stopColor="#1a56db"/>
                          <stop offset="100%" stopColor="#06b6d4"/>
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <h2 className="cs-modal-title">Économisez des milliers d'euros sur votre crédit</h2>
                  <p className="cs-modal-sub">Nos partenaires courtiers négocient pour vous le meilleur taux personnalisé.</p>
                </div>

                {savings > 500 && (
                  <div className="cs-savings-box">
                    <span className="cs-savings-icon" aria-hidden="true">💰</span>
                    <p className="cs-savings-text">
                      Sur votre emprunt de <strong>{fmt(loan)}</strong>, la différence entre le meilleur et le moins bon taux peut représenter jusqu'à{" "}
                      <strong className="cs-savings-amount">{fmt(savings)} d'économies</strong> sur la durée de votre crédit.
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="cs-form">
                  <label className="cs-label">
                    Votre email pour recevoir votre analyse
                    <input
                      type="email" required
                      placeholder="prenom@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="cs-input"
                      autoComplete="email"
                    />
                  </label>
                  <label className="cs-label">
                    Votre numéro pour être rappelé rapidement
                    <input
                      type="tel" required
                      placeholder="06 XX XX XX XX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="cs-input"
                      autoComplete="tel"
                      inputMode="tel"
                    />
                  </label>
                  <button type="submit" className="cs-submit-btn" disabled={sending}>
                    {sending ? "Envoi en cours…" : "Je veux le meilleur taux pour mon projet →"}
                  </button>
                </form>
                <p className="cs-legal">
                  En soumettant vous acceptez d'être contacté par nos partenaires courtiers de confiance. Vos données ne seront jamais revendues.
                </p>
              </>
            ) : (
              <div className="cs-sent">
                <div className="cs-sent-check" aria-hidden="true">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path d="M6 16l7 7 13-14" stroke="#059669" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="cs-sent-title">Parfait !</h3>
                <p className="cs-sent-msg">
                  Votre dossier a bien été transmis à nos partenaires.<br/>
                  Un courtier vous contactera dans les 24h.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
