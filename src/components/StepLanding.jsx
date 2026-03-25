function StepLanding({ onStart }) {
  return (
    <div className="landing">
      <div className="landing-hero">
        <span className="landing-kicker">Simulateur immobilier gratuit</span>
        <h1 className="landing-title">
          Louer ou acheter&nbsp;?<br />
          <span className="landing-title-accent">La vraie réponse en 2 minutes.</span>
        </h1>
        <p className="landing-desc">
          Pas de réponse universelle. Tout dépend de votre loyer, du bien visé
          et de l'horizon de temps. Ce simulateur compare les deux scénarios
          chiffres à l'appui — pour que vous décidiez en connaissance de cause.
        </p>
        <button className="btn-primary landing-cta" onClick={onStart} type="button">
          Démarrer la simulation →
        </button>
      </div>

      <div className="landing-steps">
        <div className="landing-step">
          <span className="landing-step-num">1</span>
          <div>
            <strong>Votre situation locative</strong>
            <p>Loyer, épargne, rendement de placement</p>
          </div>
        </div>
        <span className="landing-step-arrow">→</span>
        <div className="landing-step">
          <span className="landing-step-num">2</span>
          <div>
            <strong>Le bien que vous envisagez</strong>
            <p>Prix, apport, conditions du prêt</p>
          </div>
        </div>
        <span className="landing-step-arrow">→</span>
        <div className="landing-step">
          <span className="landing-step-num">3</span>
          <div>
            <strong>Votre verdict personnalisé</strong>
            <p>Comparaison chiffrée des deux scénarios</p>
          </div>
        </div>
      </div>

      <p className="landing-disclaimer">
        Simulation pédagogique — ne remplace pas un conseil patrimonial.
      </p>
    </div>
  );
}

export default StepLanding;
