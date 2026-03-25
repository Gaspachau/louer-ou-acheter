import { PRESETS } from "../App";

function StepLanding({ onStart, onPreset }) {
  return (
    <div className="landing">

      {/* ── Hero ─────────────────────────────────────────── */}
      <div className="landing-hero">
        <span className="landing-kicker">Simulateur gratuit · Sans inscription</span>
        <h1 className="landing-title">
          Louer <span className="landing-title-accent">ou</span> acheter&nbsp;?<br />
          La vraie réponse en 2&nbsp;minutes.
        </h1>
        <p className="landing-desc">
          Pas de réponse universelle — tout dépend de votre loyer, du bien que vous
          visez, et de combien de temps vous comptez rester. Ce simulateur compare les
          deux scénarios chiffres à l'appui.
        </p>

        {/* Stats strip */}
        <div className="landing-stats-strip" aria-label="Points clés">
          <div className="landing-stat">
            <span className="landing-stat-num">2 min</span>
            <span className="landing-stat-label">pour simuler</span>
          </div>
          <div className="landing-stat-divider" />
          <div className="landing-stat">
            <span className="landing-stat-num">100%</span>
            <span className="landing-stat-label">gratuit</span>
          </div>
          <div className="landing-stat-divider" />
          <div className="landing-stat">
            <span className="landing-stat-num">6</span>
            <span className="landing-stat-label">simulateurs</span>
          </div>
        </div>

        {/* Trust badges */}
        <div className="landing-trust-strip" aria-label="Garanties">
          <span className="trust-badge">
            <span aria-hidden="true">🔒</span> Sans pub ni inscription
          </span>
          <span className="trust-badge">
            <span aria-hidden="true">🏛️</span> Sources&nbsp;: INSEE · Banque de France
          </span>
          <span className="trust-badge">
            <span aria-hidden="true">🗓️</span> Mis à jour mars 2026
          </span>
        </div>
      </div>

      {/* ── Preset scenarios ──────────────────────────────── */}
      <div className="presets-section">
        <p className="presets-label">Choisissez une situation type pour commencer</p>
        <div className="presets-grid" role="list">
          {PRESETS.map((preset) => (
            <button
              key={preset.id}
              className="preset-card"
              onClick={() => onPreset(preset)}
              type="button"
              role="listitem"
              aria-label={`Scénario ${preset.name} : ${preset.desc}`}
            >
              <span className="preset-emoji" aria-hidden="true">{preset.emoji}</span>
              <strong className="preset-name">{preset.name}</strong>
              <span className="preset-desc">{preset.desc}</span>
              <span className="preset-tag">{preset.tag}</span>
              <span className="preset-card-cta" aria-hidden="true">Simuler →</span>
            </button>
          ))}
        </div>

        {/* Real CTA button */}
        <button className="btn-cta-custom" onClick={onStart} type="button">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <circle cx="9" cy="9" r="8" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M7 9h4M9 7l2 2-2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Saisir mes propres chiffres
          <span className="btn-cta-arrow" aria-hidden="true">→</span>
        </button>
      </div>

      {/* ── How it works ──────────────────────────────────── */}
      <div className="landing-steps" role="list" aria-label="Comment ça marche">
        <div className="landing-step" role="listitem">
          <span className="landing-step-num" aria-hidden="true">1</span>
          <div>
            <strong>Votre loyer actuel</strong>
            <p>Loyer, hausse annuelle, rendement de votre épargne</p>
          </div>
        </div>
        <span className="landing-step-arrow" aria-hidden="true">→</span>
        <div className="landing-step" role="listitem">
          <span className="landing-step-num" aria-hidden="true">2</span>
          <div>
            <strong>Le bien que vous visez</strong>
            <p>Prix, apport personnel, taux et durée du prêt</p>
          </div>
        </div>
        <span className="landing-step-arrow" aria-hidden="true">→</span>
        <div className="landing-step" role="listitem">
          <span className="landing-step-num" aria-hidden="true">3</span>
          <div>
            <strong>Votre verdict</strong>
            <p>Comparaison chiffrée des deux patrimoines</p>
          </div>
        </div>
      </div>

      <p className="landing-disclaimer">
        Simulation pédagogique — ne remplace pas un conseil patrimonial ou une offre de prêt.
      </p>
    </div>
  );
}

export default StepLanding;
