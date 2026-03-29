/**
 * CityPicker — Sélecteur de ville avec recherche, accès rapide et préview
 * Usage: <CityPicker cityId={cityId} onChange={(id) => setCityId(id)} />
 */
import { useEffect, useRef, useState } from "react";
import { CITY_LIST } from "../data/cityData";

const fmtEur = (v) => new Intl.NumberFormat("fr-FR").format(v) + " €";

// Villes "favoris" affichées en accès rapide
const QUICK_CITIES = ["paris", "lyon", "marseille", "bordeaux", "nantes"];

export default function CityPicker({ cityId, onChange, label = "Ville" }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [dropUp, setDropUp] = useState(false);
  const inputRef = useRef(null);
  const wrapRef = useRef(null);

  const city = CITY_LIST.find((c) => c.id === cityId);

  // Fermer au clic extérieur
  useEffect(() => {
    if (!open) return;
    const close = (e) => {
      if (!wrapRef.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", close, true);
    return () => document.removeEventListener("pointerdown", close, true);
  }, [open]);

  // Focus l'input à l'ouverture + calcul position
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      // Detect if dropdown should open upward
      if (wrapRef.current) {
        const rect = wrapRef.current.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        setDropUp(spaceBelow < 340);
      }
    } else {
      setQuery("");
    }
  }, [open]);

  const results = query.trim()
    ? CITY_LIST.filter((c) =>
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.region?.toLowerCase().includes(query.toLowerCase())
      )
    : CITY_LIST;

  const quickCities = CITY_LIST.filter((c) => QUICK_CITIES.includes(c.id));

  const select = (id) => {
    onChange(id);
    setOpen(false);
    setQuery("");
  };

  const marketLabel = {
    vendeur: { text: "Marché vendeur", color: "#dc2626", bg: "#fee2e2" },
    equilibre: { text: "Marché équilibré", color: "#d97706", bg: "#fef3c7" },
    acheteur: { text: "Marché acheteur", color: "#059669", bg: "#d1fae5" },
  };

  return (
    <div className="cpicker-wrap" ref={wrapRef}>
      {label && <p className="cpicker-label field-label">{label}</p>}

      {/* Trigger button */}
      <button
        type="button"
        className={`cpicker-trigger${open ? " cpicker-trigger-open" : ""}`}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={city ? `Ville sélectionnée : ${city.name}` : "Choisir une ville"}
      >
        {city ? (
          <>
            <span className="cpicker-trigger-emoji">{city.emoji}</span>
            <span className="cpicker-trigger-name">{city.name}</span>
            <span className="cpicker-trigger-price">{fmtEur(city.pricePerM2)} /m²</span>
          </>
        ) : (
          <>
            <span className="cpicker-trigger-emoji">🇫🇷</span>
            <span className="cpicker-trigger-name">Moyenne nationale</span>
          </>
        )}
        <svg className={`cpicker-chevron${open ? " open" : ""}`} width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M3.5 5.5l3.5 3.5 3.5-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div className={`cpicker-dropdown${dropUp ? " cpicker-drop-up" : ""}`} role="dialog" aria-label="Sélectionner une ville">
          {/* "Sans ville" option */}
          {!query && (
            <div className="cpicker-section">
              <button
                type="button"
                className={`cpicker-option cpicker-no-city${!cityId ? " selected" : ""}`}
                onClick={() => { onChange(null); setOpen(false); }}
                aria-label="Utiliser la moyenne nationale"
              >
                <span className="cpicker-opt-emoji">🇫🇷</span>
                <span className="cpicker-opt-info">
                  <span className="cpicker-opt-name">Moyenne nationale</span>
                  <span className="cpicker-opt-region">Valeurs moyennes France entière</span>
                </span>
                {!cityId && (
                  <svg className="cpicker-opt-check" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M2.5 7l3.5 3.5L11.5 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </button>
            </div>
          )}
          {/* Search */}
          <div className="cpicker-search-wrap">
            <svg className="cpicker-search-icon" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.6"/>
              <path d="M10 10l2.5 2.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
            <input
              ref={inputRef}
              type="text"
              className="cpicker-search"
              placeholder="Rechercher une ville…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Rechercher une ville"
            />
            {query && (
              <button type="button" className="cpicker-search-clear" onClick={() => setQuery("")} aria-label="Effacer">✕</button>
            )}
          </div>

          {/* Quick access */}
          {!query && (
            <div className="cpicker-section">
              <p className="cpicker-section-title">Accès rapide</p>
              <div className="cpicker-quick">
                {quickCities.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    className={`cpicker-quick-btn${c.id === cityId ? " active" : ""}`}
                    onClick={() => select(c.id)}
                  >
                    {c.emoji} {c.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* All cities list */}
          <div className="cpicker-section">
            {!query && <p className="cpicker-section-title">Toutes les villes</p>}
            <div className="cpicker-list" role="listbox">
              {results.map((c) => {
                const mkt = c.market ? marketLabel[c.market] : null;
                return (
                  <button
                    key={c.id}
                    type="button"
                    role="option"
                    className={`cpicker-option${c.id === cityId ? " selected" : ""}`}
                    onClick={() => select(c.id)}
                    aria-selected={c.id === cityId}
                  >
                    <span className="cpicker-opt-emoji">{c.emoji}</span>
                    <span className="cpicker-opt-info">
                      <span className="cpicker-opt-name">{c.name}</span>
                      {c.region && <span className="cpicker-opt-region">{c.region}</span>}
                    </span>
                    <span className="cpicker-opt-stats">
                      <span className="cpicker-opt-price">{fmtEur(c.pricePerM2)}/m²</span>
                      <span className="cpicker-opt-rent">Loyer moy. {fmtEur(c.rentT2)}/mois</span>
                    </span>
                    {mkt && (
                      <span className="cpicker-opt-market" style={{ background: mkt.bg, color: mkt.color }}>
                        {mkt.text}
                      </span>
                    )}
                    {c.id === cityId && (
                      <svg className="cpicker-opt-check" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                        <path d="M2.5 7l3.5 3.5L11.5 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </button>
                );
              })}
              {results.length === 0 && (
                <p className="cpicker-empty">Aucune ville trouvée pour « {query} »</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
