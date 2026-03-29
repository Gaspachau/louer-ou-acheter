/**
 * CityPicker — Grille visuelle des villes avec modal centré
 * Usage: <CityPicker cityId={cityId} onChange={(id) => setCityId(id)} />
 */
import { useEffect, useRef, useState } from "react";
import { CITY_LIST } from "../data/cityData";

const fmtPrice = (v) => new Intl.NumberFormat("fr-FR").format(v) + " €/m²";

export default function CityPicker({ cityId, onChange, label = "Ville" }) {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef(null);

  const city = CITY_LIST.find((c) => c.id === cityId);

  // Close on backdrop click
  useEffect(() => {
    if (!open) return;
    const close = (e) => {
      if (e.target === dialogRef.current) setOpen(false);
    };
    const keyClose = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("pointerdown", close, true);
    document.addEventListener("keydown", keyClose);
    // Prevent body scroll when open
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("pointerdown", close, true);
      document.removeEventListener("keydown", keyClose);
      document.body.style.overflow = "";
    };
  }, [open]);

  const select = (id) => {
    onChange(id);
    setOpen(false);
  };

  return (
    <>
      {label && <p className="cpicker-label field-label">{label}</p>}

      {/* Trigger button */}
      <button
        type="button"
        className={`cpicker-trigger${open ? " cpicker-trigger-open" : ""}`}
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={city ? `Ville : ${city.name}` : "Choisir une ville"}
      >
        {city ? (
          <>
            <span className="cpicker-trigger-emoji">{city.emoji}</span>
            <span className="cpicker-trigger-name">{city.name}</span>
            <span className="cpicker-trigger-price">{fmtPrice(city.pricePerM2)}</span>
          </>
        ) : (
          <>
            <span className="cpicker-trigger-emoji">🇫🇷</span>
            <span className="cpicker-trigger-name">Moyenne nationale</span>
          </>
        )}
        <svg className="cpicker-chevron" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M3.5 5.5l3.5 3.5 3.5-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Modal */}
      {open && (
        <div className="cpicker-modal-backdrop" ref={dialogRef} role="dialog" aria-label="Choisir une ville" aria-modal="true">
          <div className="cpicker-modal">
            <div className="cpicker-modal-header">
              <h3 className="cpicker-modal-title">Choisir une ville</h3>
              <button
                type="button"
                className="cpicker-modal-close"
                onClick={() => setOpen(false)}
                aria-label="Fermer"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            <p className="cpicker-modal-hint">Les données du simulateur seront pré-remplies avec les valeurs de la ville choisie.</p>

            {/* "Sans préférence" option */}
            <button
              type="button"
              className={`cpicker-national${!cityId ? " cpicker-national-active" : ""}`}
              onClick={() => select(null)}
            >
              <span className="cpicker-national-flag">🇫🇷</span>
              <div className="cpicker-national-info">
                <span className="cpicker-national-name">Sans préférence de ville</span>
                <span className="cpicker-national-sub">Utiliser les valeurs moyennes nationales</span>
              </div>
              {!cityId && (
                <svg className="cpicker-check" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8l4 4 6-6" stroke="#059669" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>

            <p className="cpicker-section-label">Grandes villes</p>

            {/* City grid */}
            <div className="cpicker-grid" role="listbox" aria-label="Choisir une ville">
              {CITY_LIST.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  role="option"
                  className={`cpicker-city-btn${c.id === cityId ? " cpicker-city-active" : ""}`}
                  onClick={() => select(c.id)}
                  aria-selected={c.id === cityId}
                >
                  <span className="cpicker-city-emoji">{c.emoji}</span>
                  <span className="cpicker-city-name">{c.name}</span>
                  <span className="cpicker-city-price">{fmtPrice(c.pricePerM2)}</span>
                  {c.id === cityId && (
                    <svg className="cpicker-city-check" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                      <path d="M2 6l3 3 5-5" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
