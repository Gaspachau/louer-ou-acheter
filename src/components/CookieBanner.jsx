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
          <h2 id="cookie-customize-title" className="cookie-modal-title">Confidentialité</h2>
          <button type="button" className="cookie-modal-close" onClick={onClose} aria-label="Fermer">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <p className="cookie-modal-desc">
          Choisissez les données que vous acceptez de partager. Sauvegardées dans votre navigateur.
        </p>

        <div className="cookie-category">
          <div className="cookie-category-header">
            <div>
              <p className="cookie-category-name">Cookies essentiels</p>
              <p className="cookie-category-desc">Nécessaires au fonctionnement. Aucune donnée personnelle collectée.</p>
            </div>
            <span className="cookie-always-on" aria-label="Toujours actifs">Toujours actifs</span>
          </div>
        </div>

        <div className="cookie-category">
          <div className="cookie-category-header">
            <div>
              <p className="cookie-category-name">Analyse d'usage</p>
              <p className="cookie-category-desc">
                Données <strong>anonymisées</strong>, jamais revendues. Outil : PostHog open source, hébergé en Europe.
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
            Enregistrer
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
        <div className="cookie-bar" role="region" aria-label="Cookies">
          <span className="cookie-bar-text">
            🍪 Analyse anonyme pour améliorer le site.{" "}
            <button type="button" className="cookie-bar-link" onClick={() => setShowCustomize(true)}>
              Paramètres
            </button>
          </span>
          <div className="cookie-bar-btns">
            <button type="button" className="cookie-bar-btn-ghost" onClick={handleRejectAll}>
              Non merci
            </button>
            <button type="button" className="cookie-bar-btn-primary" onClick={handleAcceptAll}>
              Accepter
            </button>
          </div>
        </div>
      )}
    </>
  );
}
