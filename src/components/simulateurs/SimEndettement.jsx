import { useMemo, useState } from "react";
import Field from "../Field";
import SimLayout from "./SimLayout";
import { formatCurrency } from "../../utils/finance";

function calcEndettement({ revenus, chargesExistantes, taux, duree }) {
  if (!revenus || revenus <= 0) return null;
  const tauxActuel = (chargesExistantes / revenus) * 100;
  const capaciteRestante = Math.max(0, revenus * 0.35 - chargesExistantes);
  const r = taux / 100 / 12;
  const n = duree * 12;
  const montantEmpruntable =
    r === 0 && n > 0
      ? capaciteRestante * n
      : r > 0 && n > 0
      ? capaciteRestante * (1 - Math.pow(1 + r, -n)) / r
      : 0;
  const tauxAvec = ((chargesExistantes + capaciteRestante) / revenus) * 100;
  return { tauxActuel, capaciteRestante, montantEmpruntable, tauxAvec };
}

function TauxGauge({ value }) {
  const pct = Math.min(100, value);
  const color = value > 35 ? "#dc2626" : value > 28 ? "#d97706" : "#0d9488";
  return (
    <div className="taux-gauge">
      <div className="taux-gauge-track">
        <div className="taux-gauge-fill" style={{ width: `${pct}%`, background: color }} />
        <div className="taux-gauge-limit" style={{ left: "35%" }} title="Seuil bancaire 35%" />
      </div>
      <div className="taux-gauge-labels">
        <span>0%</span>
        <span className="taux-limit-label">35% max</span>
        <span>100%</span>
      </div>
    </div>
  );
}

export default function SimEndettement() {
  const [v, setV] = useState({ revenus: 3500, chargesExistantes: 300, taux: 3.8, duree: 20 });
  const set = (k) => (val) => setV((s) => ({ ...s, [k]: val }));

  const res = useMemo(() => calcEndettement(v), [v]);

  const verdict =
    !res ? null
    : res.tauxActuel > 35 ? { label: "Déjà sur-endetté", color: "red", msg: "Vos charges actuelles dépassent déjà le seuil de 35 %. L'accès à un nouveau crédit sera difficile." }
    : res.capaciteRestante < 200 ? { label: "Capacité limitée", color: "amber", msg: `Votre marge mensuelle est faible (${formatCurrency(res.capaciteRestante)}/mois). Privilégiez un montant d'emprunt modéré.` }
    : { label: "Capacité correcte", color: "green", msg: `Vous pouvez emprunter jusqu'à ${formatCurrency(res.montantEmpruntable)} selon les paramètres saisis.` };

  return (
    <SimLayout
      icon="📉"
      title="Calculateur d'endettement"
      description="Évaluez votre taux d'endettement et estimez votre capacité d'emprunt maximale."
    >
      <div className="sim-layout">
        <div className="sim-card">
          <p className="sim-card-legend">Votre situation financière</p>
          <div className="step-fields">
            <div className="field-full">
              <Field label="Revenus nets mensuels" value={v.revenus} onChange={set("revenus")} suffix="€/mois" hint="Tous revenus réguliers (salaires, revenus locatifs…)" />
            </div>
            <div className="field-full">
              <Field label="Charges de crédit existantes" value={v.chargesExistantes} onChange={set("chargesExistantes")} suffix="€/mois" hint="Somme de toutes vos mensualités de crédit en cours" />
            </div>
          </div>

          <p className="sim-card-legend" style={{ marginTop: 16 }}>Nouveau crédit envisagé</p>
          <div className="step-fields">
            <Field label="Taux annuel" value={v.taux} onChange={set("taux")} suffix="%" hint="~3,5–4,0 % pour un prêt immo" />
            <Field label="Durée" value={v.duree} onChange={set("duree")} suffix="ans" />
          </div>
        </div>

        <div className="sim-results-panel">
          {!res ? (
            <p className="sim-empty">Renseignez vos revenus pour voir les résultats.</p>
          ) : (
            <>
              {verdict && (
                <div className={`sim-verdict sim-verdict-${verdict.color}`}>
                  <strong>{verdict.label}</strong>
                  <p>{verdict.msg}</p>
                </div>
              )}

              <div className="sim-taux-section">
                <div className="sim-taux-row">
                  <span className="sim-taux-label">Taux d'endettement actuel</span>
                  <span className={`sim-taux-value ${res.tauxActuel > 35 ? "sim-taux-red" : ""}`}>
                    {res.tauxActuel.toFixed(1)} %
                  </span>
                </div>
                <TauxGauge value={res.tauxActuel} />
              </div>

              <div className="sim-stats-grid">
                <div className="sim-stat-card">
                  <span className="sim-stat-card-label">Revenus mensuels</span>
                  <span className="sim-stat-card-value">{formatCurrency(v.revenus)}</span>
                </div>
                <div className="sim-stat-card sim-stat-card-blue">
                  <span className="sim-stat-card-label">Capacité mensuelle dispo</span>
                  <span className="sim-stat-card-value">{formatCurrency(res.capaciteRestante)}</span>
                </div>
                <div className={`sim-stat-card ${res.montantEmpruntable > 0 ? "sim-stat-card-green" : ""}`}>
                  <span className="sim-stat-card-label">Montant empruntable max</span>
                  <span className="sim-stat-card-value">{formatCurrency(res.montantEmpruntable)}</span>
                </div>
                <div className="sim-stat-card">
                  <span className="sim-stat-card-label">Seuil 35% (règle HCSF)</span>
                  <span className="sim-stat-card-value">{formatCurrency(v.revenus * 0.35)}/mois</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </SimLayout>
  );
}
