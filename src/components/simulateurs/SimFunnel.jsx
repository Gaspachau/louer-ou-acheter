import { useState } from "react";

/**
 * SimFunnel — step-by-step wizard for simulators.
 *
 * Props:
 *  steps   Array<{ title?: string, desc?: string, icon?: string, content: ReactNode }>
 *  result  ReactNode  — full results panel shown after all steps
 */
export default function SimFunnel({ steps, result }) {
  const [current, setCurrent] = useState(0);
  const total = steps.length;
  const isDone = current >= total;
  const pct = isDone ? 100 : Math.round((current / total) * 100);

  return (
    <div className={`simf${isDone ? " simf-done" : ""}`}>
      {/* ── Progress bar ── */}
      <div className="simf-bar-track" role="progressbar" aria-valuenow={pct} aria-valuemax={100}>
        <div className="simf-bar-fill" style={{ width: `${pct}%` }} />
      </div>

      {!isDone ? (
        <div className="simf-inner">
          {/* Step dots + label */}
          <div className="simf-dots">
            {steps.map((s, i) => (
              <button
                key={i}
                type="button"
                className={`simf-dot${i < current ? " simf-dot-done" : i === current ? " simf-dot-active" : ""}`}
                onClick={() => i < current && setCurrent(i)}
                aria-label={`${i < current ? "Retour à l'" : ""}Étape ${i + 1}${s.title ? ` : ${s.title}` : ""}`}
                disabled={i > current}
              />
            ))}
            <span className="simf-dots-label">Étape {current + 1} / {total}</span>
          </div>

          {/* Step card */}
          <div className="simf-card">
            {(steps[current].icon || steps[current].title) && (
              <div className="simf-card-head">
                {steps[current].icon && (
                  <span className="simf-card-icon" aria-hidden="true">{steps[current].icon}</span>
                )}
                {steps[current].title && (
                  <h2 className="simf-card-title">{steps[current].title}</h2>
                )}
              </div>
            )}
            {steps[current].desc && (
              <p className="simf-card-desc">{steps[current].desc}</p>
            )}
            <div className="simf-card-fields">
              {steps[current].content}
            </div>
          </div>

          {/* Navigation */}
          <div className="simf-nav">
            {current > 0 ? (
              <button type="button" className="simf-btn-back" onClick={() => setCurrent((s) => s - 1)}>
                ← Retour
              </button>
            ) : (
              <span />
            )}
            <button type="button" className="simf-btn-next" onClick={() => setCurrent((s) => s + 1)}>
              {current === total - 1 ? "Voir les résultats →" : "Continuer →"}
            </button>
          </div>
        </div>
      ) : (
        /* ── Results ── */
        <div className="simf-result-wrap">
          <div className="simf-result-top">
            <button type="button" className="simf-edit-btn" onClick={() => setCurrent(0)}>
              ← Modifier mes réponses
            </button>
            <span className="simf-done-badge">✓ Résultats calculés</span>
          </div>
          {result}
        </div>
      )}
    </div>
  );
}
