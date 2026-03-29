/**
 * SaveSimulation — Sauvegarde et restauration de simulation via localStorage
 * Usage: <SaveSimulation values={v} onRestore={(saved) => setValues(saved)} />
 */
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const STORAGE_KEY = "louer_acheter_saves";
const MAX_SAVES = 5;

function loadSaves() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function storeSaves(saves) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saves));
  } catch {}
}

function relativeTime(ts) {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (mins < 2) return "À l'instant";
  if (mins < 60) return `Il y a ${mins} min`;
  if (hours < 24) return `Il y a ${hours} h`;
  return `Il y a ${days} j`;
}

export default function SaveSimulation({ values, onRestore, simTitle }) {
  const { pathname } = useLocation();
  const [saves, setSaves] = useState(loadSaves);
  const [showPanel, setShowPanel] = useState(false);
  const [justSaved, setJustSaved] = useState(false);

  // Reload saves when panel opens
  useEffect(() => {
    if (showPanel) setSaves(loadSaves());
  }, [showPanel]);

  const myPageSaves = saves.filter((s) => s.path === pathname);
  const hasSaves = myPageSaves.length > 0;

  const handleSave = () => {
    const newSave = {
      id: Date.now(),
      path: pathname,
      title: simTitle || document.title,
      values: { ...values },
      ts: Date.now(),
    };
    const updated = [newSave, ...saves.filter((s) => s.path !== pathname || s.id !== newSave.id)]
      .slice(0, MAX_SAVES);
    storeSaves(updated);
    setSaves(updated);
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 2500);
  };

  const handleDelete = (id) => {
    const updated = saves.filter((s) => s.id !== id);
    storeSaves(updated);
    setSaves(updated);
  };

  return (
    <div className="save-sim-wrap">
      <div className="save-sim-actions">
        <button
          type="button"
          className={`save-sim-btn${justSaved ? " save-sim-btn-saved" : ""}`}
          onClick={handleSave}
          title="Sauvegarder cette simulation"
        >
          {justSaved ? (
            <>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2.5 7l3 3L11.5 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Sauvegardé !
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 2h8l2 2v8a1 1 0 01-1 1H3a1 1 0 01-1-1V2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                <rect x="4.5" y="2" width="5" height="3.5" rx=".5" stroke="currentColor" strokeWidth="1.5"/>
                <rect x="3.5" y="7.5" width="7" height="4" rx=".5" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
              Sauvegarder
            </>
          )}
        </button>

        {hasSaves && (
          <button
            type="button"
            className="save-sim-restore-btn"
            onClick={() => setShowPanel((v) => !v)}
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
              <path d="M2 6.5A4.5 4.5 0 1111 6.5M2 6.5L2 3M2 6.5H5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {myPageSaves.length} sauvegarde{myPageSaves.length > 1 ? "s" : ""}
          </button>
        )}
      </div>

      {showPanel && hasSaves && (
        <div className="save-sim-panel">
          <div className="save-sim-panel-header">
            <p className="save-sim-panel-title">Mes simulations sauvegardées</p>
            <button type="button" className="save-sim-panel-close" onClick={() => setShowPanel(false)}>✕</button>
          </div>
          <div className="save-sim-panel-list">
            {myPageSaves.map((s) => (
              <div key={s.id} className="save-sim-item">
                <div className="save-sim-item-info">
                  <span className="save-sim-item-time">{relativeTime(s.ts)}</span>
                  <span className="save-sim-item-values">
                    {Object.entries(s.values).slice(0, 3).map(([k, v]) =>
                      typeof v === "number" ? `${k}: ${new Intl.NumberFormat("fr-FR").format(v)}` : null
                    ).filter(Boolean).join(" · ")}
                  </span>
                </div>
                <div className="save-sim-item-actions">
                  <button
                    type="button"
                    className="save-sim-item-restore"
                    onClick={() => { onRestore?.(s.values); setShowPanel(false); }}
                  >
                    Restaurer
                  </button>
                  <button
                    type="button"
                    className="save-sim-item-delete"
                    onClick={() => handleDelete(s.id)}
                    aria-label="Supprimer"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
