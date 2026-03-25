import { useState, useEffect } from "react";

function fmtDisplay(v) {
  if (!Number.isFinite(Number(v))) return String(v);
  return new Intl.NumberFormat("fr-FR").format(Number(v));
}

function Field({ label, value, onChange, suffix, hint }) {
  const [display, setDisplay] = useState(() => fmtDisplay(value));
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (!editing) setDisplay(fmtDisplay(value));
  }, [value, editing]);

  const handleFocus = (e) => {
    setEditing(true);
    setDisplay(String(value));
    // Select all on focus for easy replacement
    setTimeout(() => e.target.select(), 0);
  };

  const handleBlur = () => {
    setEditing(false);
    // Strip FR thousand-separator spaces and normalize comma→dot
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
    <label className="field">
      <span className="field-label">{label}</span>
      <div className="input-wrap">
        <input
          type="text"
          inputMode="decimal"
          value={display}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={(e) => setDisplay(e.target.value)}
        />
        <em>{suffix}</em>
      </div>
      {hint && <span className="field-hint">{hint}</span>}
    </label>
  );
}

export default Field;
