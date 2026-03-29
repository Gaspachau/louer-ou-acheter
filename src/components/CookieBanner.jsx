import { useEffect, useState } from "react";
import { acceptAll, rejectAll, saveCustom, getConsent } from "../utils/consent";
import { initAnalytics, shutdownAnalytics } from "../utils/analytics";

function Toggle({ checked, onChange, id }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      id={id}
      type="button"
      className={`cookie-toggle ${checked ? "cookie-toggle-on" : ""}`}
      onClick={() => onChange(!checked)}
    >
      <span className="cookie-toggle-thumb" />
    </button>
  );
}

function CustomizePanel({ onClose, onSave }) {
  const [analytics, setAnalytics] = useState(getConsent().analytics);

  function handleSave() {
    saveCustom({ analytics });
    if (analytics) initAnalytics();
    else shutdownAnalytics();
    onSave();
  }

  return (
    <div className="cookie-overlay" role="dialog" aria-modal="true" aria-labelledby="cookie-customize-title">
      <div className="cookie-modal">
        <div className="cookie-modal-header">
          <h2 id="cookie-customize-title" className="cookie-modal-title">Paramètres de confidentialité</h2>
          <button type="button" className="cookie-modal-close" onClick={onClose} aria-label="Fermer">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <p className="cookie-modal-desc">
          Choisissez quelles données vous acceptez de partager. Vos préférences sont sauvegardées dans votre navigateur.
        </p>

        <div className="cookie-category">
          <div className="cookie-category-header">
            <div>
              <p className="cookie-category-name">Cookies essentiels</p>
              <p className="cookie-category-desc">Nécessaires au fonctionnement du site (préférences, navigation). Aucune donnée personnelle n'est collectée.</p>
            </div>
            <span className="cookie-always-on" aria-label="Toujours actifs">Toujours actifs</span>
          </div>
        </div>

        <div className="cookie-category">
          <div className="cookie-category-header">
            <div>
              <p className="cookie-category-name">Cookies analytiques</p>
              <p className="cookie-category-desc">
                Nous aident à comprendre comment vous utilisez les simulateurs pour les améliorer. Les données sont <strong>anonymisées</strong> et ne sont jamais revendues. Outil utilisé : PostHog (open source, hébergé en Europe).
              </p>
            </div>
            <Toggle checked={analytics} onChange={setAnalytics} id="toggle-analytics" />
          </div>
        </div>

        <div className="cookie-modal-actions">
          <button type="button" className="cookie-btn-secondary" onClick={() => { saveCustom({ analytics: false }); shutdownAnalytics(); onSave(); }}>
            Tout refuser
          </button>
          <button type="button" className="cookie-btn-primary" onClick={handleSave}>
            Enregistrer mes choix
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);

  useEffect(() => {
    const { decided } = getConsent();
    if (!decided) setVisible(true);
    else if (getConsent().analytics) initAnalytics();
  }, []);

  function handleAcceptAll() {
    acceptAll();
    initAnalytics();
    setVisible(false);
  }

  function handleRejectAll() {
    rejectAll();
    setVisible(false);
  }

  function handleSaveCustom() {
    setShowCustomize(false);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <>
      {showCustomize && (
        <CustomizePanel
          onClose={() => setShowCustomize(false)}
          onSave={handleSaveCustom}
        />
      )}

      {!showCustomize && (
        <div className="cookie-banner" role="region" aria-label="Amélioration de l'expérience">
          <div className="cookie-banner-inner">
            <div className="cookie-banner-text">
              <p className="cookie-banner-title">
                <span className="cookie-icon" aria-hidden="true">✨</span>
                Améliorons votre expérience
              </p>
              <p className="cookie-banner-desc">
                Nous analysons anonymement votre utilisation des simulateurs pour améliorer
                l'expérience et personnaliser les recommandations. Aucune donnée personnelle
                n'est collectée.{" "}
                <button type="button" className="cookie-banner-link" onClick={() => setShowCustomize(true)}>
                  En savoir plus
                </button>
              </p>
            </div>
            <div className="cookie-banner-actions">
              <button type="button" className="cookie-btn-ghost" onClick={handleRejectAll}>
                Non merci
              </button>
              <button type="button" className="cookie-btn-primary" onClick={handleAcceptAll}>
                Accepter
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
