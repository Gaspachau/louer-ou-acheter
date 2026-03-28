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

/** Flash animation when value changes externally (e.g. city update) */
function useFlash(value) {
  const [flash, setFlash] = useState(false);
  const prev = useRef(value);
  useEffect(() => {
    if (prev.current !== value) {
      setFlash(true);
      const t = setTimeout(() => setFlash(false), 700);
      prev.current = value;
      return () => clearTimeout(t);
    }
  }, [value]);
  return flash;
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

function Field({ label, value, onChange, suffix, hint, tooltip, warning, cityHint, step, min, max }) {
  const id = useFieldId();
  const [display, setDisplay] = useState(() => fmtDisplay(value));
  const [editing, setEditing] = useState(false);
  const flash = useFlash(value);

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
    <div className={`field${isWarn ? " field-has-warn" : isValid ? " field-has-valid" : ""}${flash ? " field-updated" : ""}`}>
      <div className="field-label-row">
        <label htmlFor={id} className="field-label">{label}</label>
        {tooltip && <InfoTooltip text={tooltip} />}
      </div>
      <div className={`input-wrap${flash ? " input-flash" : ""}`}>
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
        {suffix && <em className="field-suffix">{suffix}</em>}
      </div>
      {flash && cityHint && (
        <span className="field-city-update" aria-live="polite">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
            <path d="M2 5l2.5 2.5L8 2.5" stroke="#0d9488" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {cityHint}
        </span>
      )}
      {!flash && (warning
        ? <span id={`${id}-warn`} className="field-warning" role="alert">{warning}</span>
        : hint && <span id={`${id}-hint`} className="field-hint">{hint}</span>
      )}
    </div>
  );
}

export default Field;
