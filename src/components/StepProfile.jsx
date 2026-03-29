import { useState } from "react";
import CityPicker from "./CityPicker";
import { CITY_LIST } from "../data/cityData";

const PROFILES = [
  {
    id: "primo",
    emoji: "🏠",
    title: "Primo-accédant",
    subtitle: "Premier achat",
    desc: "Je veux acheter ma résidence principale pour la première fois",
    color: "#1a56db",
    bg: "#eff6ff",
    border: "#bfdbfe",
    ctaLabel: "Simuler mon premier achat →",
    tip: "PTZ, aides régionales, frais de notaire — nous ciblons les outils qui comptent pour un premier achat.",
  },
  {
    id: "investisseur",
    emoji: "📈",
    title: "Investisseur",
    subtitle: "Patrimoine & rendement",
    desc: "J'envisage un achat locatif ou souhaite optimiser mon patrimoine immobilier",
    color: "#059669",
    bg: "#f0fdf4",
    border: "#a7f3d0",
    ctaLabel: "Calculer ma rentabilité →",
    tip: "Rendement locatif, plus-value, impact fiscal — nous ciblons les indicateurs clés pour votre investissement.",
  },
  {
    id: "reflexion",
    emoji: "🤔",
    title: "En réflexion",
    subtitle: "Je compare les options",
    desc: "Je ne suis pas encore décidé(e) et je veux comparer objectivement louer et acheter",
    color: "#7c3aed",
    bg: "#f5f3ff",
    border: "#ddd6fe",
    ctaLabel: "Comparer les deux options →",
    tip: "Nous calculons le point d'équilibre exact où acheter devient plus rentable que louer, selon votre situation.",
  },
];

export default function StepProfile({ values, set, onNext, applyCity }) {
  const [profile, setProfile] = useState(values.profile || null);
  const [cityId, setCityId] = useState(values.city || null);

  const handleCity = (id) => {
    setCityId(id);
    applyCity(id);
  };

  const handleNext = () => {
    if (profile) set("profile")(profile);
    onNext();
  };

  const activeProfile = PROFILES.find((p) => p.id === profile);

  return (
    <div className="funnel-step">
      <div className="step-card step-profile">
        <div className="step-card-header">
          <span className="step-pill profile-pill">Démarrage</span>
        </div>

        <div>
          <h1 className="step-title">Quel est votre projet ?</h1>
          <p className="step-desc">
            Choisissez votre profil — nous adaptons la simulation et les recommandations à votre situation.
          </p>
        </div>

        {/* Profile selection */}
        <div className="profile-grid" role="group" aria-label="Choisissez votre profil">
          {PROFILES.map((p) => (
            <button
              key={p.id}
              type="button"
              className={`profile-card${profile === p.id ? " profile-card-active" : ""}`}
              style={{ "--p-color": p.color, "--p-bg": p.bg, "--p-border": p.border }}
              onClick={() => setProfile(p.id)}
              aria-pressed={profile === p.id}
            >
              <span className="profile-card-emoji" aria-hidden="true">{p.emoji}</span>
              <div className="profile-card-body">
                <strong className="profile-card-title">{p.title}</strong>
                <span className="profile-card-sub">{p.subtitle}</span>
                <p className="profile-card-desc">{p.desc}</p>
              </div>
              {profile === p.id && (
                <span className="profile-card-check" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="9" fill="currentColor" opacity="0.12"/>
                    <path d="M6 10l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              )}
            </button>
          ))}
        </div>

        {activeProfile && (
          <div className="profile-tip" style={{ "--p-color": activeProfile.color, "--p-bg": activeProfile.bg, "--p-border": activeProfile.border }}>
            <span className="profile-tip-icon" aria-hidden="true">💡</span>
            <p className="profile-tip-text">{activeProfile.tip}</p>
          </div>
        )}

        {/* City selection */}
        <div className="profile-city-section">
          <CityPicker
            cityId={cityId}
            onChange={handleCity}
            label="Votre ville cible (optionnel — pré-remplit les valeurs réelles)"
          />
          {cityId && (
            <p className="field-hint" style={{ marginTop: 6 }}>
              ✓ Données {CITY_LIST.find((c) => c.id === cityId)?.name} chargées — vous pouvez tout ajuster ensuite.
            </p>
          )}
        </div>

        <button
          className="btn-primary"
          onClick={handleNext}
          type="button"
          disabled={!profile}
        >
          {activeProfile ? activeProfile.ctaLabel : "Choisissez votre profil pour continuer"}
        </button>

        <button
          type="button"
          className="profile-skip-btn"
          onClick={() => { set("profile")(null); onNext(); }}
        >
          Passer — utiliser les valeurs par défaut →
        </button>
      </div>
    </div>
  );
}
