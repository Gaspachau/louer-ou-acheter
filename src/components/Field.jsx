import { useState, useEffect, useRef } from "react";

let _fieldId = 0;
function useFieldId() {
  const ref = useRef(null);
  if (ref.current === null) ref.current = `f${++_fieldId}`;
  return ref.current;
}

function fmtDisplay(v) {
  if (!Number.isFinite(Number(v))) return String(v);
  return new Intl.NumberFormat("fr-FR").format(Number(v));
}

// Auto-detect icon type from field label and suffix
function getIconType(label = "", suffix = "") {
  const l = label.toLowerCase();
  const s = (suffix || "").toLowerCase();
  if (s === "€" || l.includes("prix") || l.includes("montant") || l.includes("capital") ||
      l.includes("loyer") || l.includes("apport") || l.includes("revenu") || l.includes("salaire") ||
      l.includes("coût") || l.includes("cotisation") || l.includes("mensualit") ||
      l.includes("budget") || l.includes("épargne") || l.includes("patrimoine") ||
      l.includes("travaux") || l.includes("aide") || l.includes("frais")) return "euro";
  if (s === "%" || l.includes("taux") || l.includes("rendement") || l.includes("taea") ||
      l.includes("taeg") || l.includes("taux") || l.includes("augmentation") ||
      l.includes("valoris") || l.includes("hausse") || l.includes("inflation") ||
      l.includes("appréciation")) return "percent";
  if (s === "ans" || l.includes("durée") || l.includes("horizon") || l.includes("ancienneté") ||
      l.includes("période") || l.includes("restante")) return "calendar";
  if (s === "m²" || l.includes("surface") || l.includes("superficie")) return "ruler";
  if (l.includes("personne") || l.includes("part") || l.includes("enfant") ||
      l.includes("occupant") || l.includes("salar")) return "person";
  return null;
}

// SVG icons — 16×16 viewport, stroke-based, clean and minimal
function FieldIconSvg({ type }) {
  if (type === "euro") return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M10.5 5.8a3 3 0 100 4.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none"/>
      <path d="M4.5 8h5.5M4.5 9.6h4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  );
  if (type === "percent") return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="5" cy="5" r="2.2" stroke="currentColor" strokeWidth="1.4"/>
      <circle cx="11" cy="11" r="2.2" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M3.5 12.5l9-9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  );
  if (type === "calendar") return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="2" y="3" width="12" height="11" rx="2" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M2 7.5h12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M5.5 2v2M10.5 2v2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M5.5 10.5h1M9.5 10.5h1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  );
  if (type === "ruler") return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M2 6h2.5M2 10h2.5M6 14v-2.5M10 14v-2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  );
  if (type === "person") return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="5" r="2.8" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M2.5 14a5.5 5.5 0 0111 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  );
  return null;
}

function InfoTooltip({ text }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const close = (e) => {
      if (!wrapRef.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", close, true);
    return () => document.removeEventListener("pointerdown", close, true);
  }, [open]);

  return (
    <span ref={wrapRef} className="field-info-wrap">
      <button
        type="button"
        className="field-info-btn"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onClick={(e) => { e.preventDefault(); setOpen((v) => !v); }}
        aria-label="Aide sur ce champ"
        aria-expanded={open}
        aria-describedby={open ? "field-tooltip-content" : undefined}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <circle cx="7" cy="7" r="6.25" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M7 6.5v3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
          <circle cx="7" cy="4.25" r=".9" fill="currentColor"/>
        </svg>
      </button>
      {open && (
        <span id="field-tooltip-content" className="field-info-popup" role="tooltip">
          {text}
        </span>
      )}
    </span>
  );
}

function Field({ label, value, onChange, suffix, hint, tooltip, warning, step, min, max }) {
  const id = useFieldId();
  const [display, setDisplay] = useState(() => fmtDisplay(value));
  const [editing, setEditing] = useState(false);

  const iconType = getIconType(label, suffix);
  const hasValue = Number.isFinite(value) && value > 0;
  const isValid = hasValue && !warning;
  const isWarn = !!warning;

  useEffect(() => {
    if (!editing) setDisplay(fmtDisplay(value));
  }, [value, editing]);

  const handleFocus = (e) => {
    setEditing(true);
    setDisplay(String(value));
    setTimeout(() => e.target.select(), 0);
  };

  const handleBlur = () => {
    setEditing(false);
    const raw = display.replace(/[\s\u00a0\u202f]/g, "").replace(",", ".");
    const n = parseFloat(raw);
    if (!isNaN(n) && n >= 0) {
      onChange(n);
      setDisplay(fmtDisplay(n));
    } else {
      setDisplay(fmtDisplay(value));
    }
  };

  return (
    <div className={`field${isWarn ? " field-has-warn" : isValid ? " field-has-valid" : ""}`}>
      <div className="field-label-row">
        <label htmlFor={id} className="field-label">{label}</label>
        {tooltip && <InfoTooltip text={tooltip} />}
        {isValid && !editing && (
          <span className="field-valid-mark" aria-label="Valeur valide" aria-hidden="true">✓</span>
        )}
      </div>
      <div className={`input-wrap${iconType ? " input-has-icon" : ""}`}>
        {iconType && (
          <span className="field-icon" aria-hidden="true">
            <FieldIconSvg type={iconType} />
          </span>
        )}
        <input
          id={id}
          type="text"
          inputMode="decimal"
          value={display}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={(e) => setDisplay(e.target.value)}
          aria-invalid={isWarn ? "true" : undefined}
          aria-describedby={warning ? `${id}-warn` : hint ? `${id}-hint` : undefined}
        />
        <em>{suffix}</em>
      </div>
      {warning
        ? <span id={`${id}-warn`} className="field-warning" role="alert">{warning}</span>
        : hint && <span id={`${id}-hint`} className="field-hint">{hint}</span>
      }
    </div>
  );
}

export default Field;
