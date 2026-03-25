import { PRESETS } from "../App";

function StepLanding({ onStart, onPreset }) {
  return (
    <div className="landing">

      <div className="landing-hero">
        <span className="landing-kicker">Simulateur gratuit · Sans inscription</span>
        <h1 className="landing-title">
          Louer <span className="landing-title-accent">ou</span> acheter&nbsp;?<br />
          La vraie réponse en 2 minutes.
        </h1>
        <p className="landing-desc">
          Pas de réponse universelle — tout dépend de votre loyer, du bien que vous
          visez, et de combien de temps vous comptez rester. Ce simulateur compare les
          deux scénarios chiffres à l'appui.
        </p>
      </div>

      {/* Preset scenarios */}
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
            </button>
          ))}
        </div>
        <button className="preset-custom" onClick={onStart} type="button">
          Saisir mes propres chiffres →
        </button>
      </div>

      {/* How it works */}
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
