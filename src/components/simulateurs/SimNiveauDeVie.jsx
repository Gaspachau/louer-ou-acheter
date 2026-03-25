import { useMemo, useState } from "react";
import Field from "../Field";
import SimLayout from "./SimLayout";
import { formatCurrency } from "../../utils/finance";

const CHARGE_FIELDS = [
  { key: "loyer", label: "Loyer / mensualité", icon: "🏠", hint: "Logement principal" },
  { key: "alimentation", label: "Alimentation", icon: "🛒", hint: "Courses + restauration" },
  { key: "transport", label: "Transport", icon: "🚗", hint: "Voiture, transports en commun" },
  { key: "telecom", label: "Télécom", icon: "📱", hint: "Internet + téléphone" },
  { key: "assurances", label: "Assurances", icon: "🛡️", hint: "Habitation, auto, santé…" },
  { key: "autres", label: "Autres charges", icon: "📦", hint: "Abonnements, loisirs fixes…" },
];

export default function SimNiveauDeVie() {
  const [v, setV] = useState({
    salaire: 2800,
    loyer: 900,
    alimentation: 400,
    transport: 200,
    telecom: 60,
    assurances: 100,
    autres: 150,
  });
  const set = (k) => (val) => setV((s) => ({ ...s, [k]: val }));

  const res = useMemo(() => {
    const totalCharges = CHARGE_FIELDS.reduce((sum, f) => sum + (v[f.key] || 0), 0);
    const disponible = v.salaire - totalCharges;
    const tauxCharges = v.salaire > 0 ? (totalCharges / v.salaire) * 100 : 0;
    return { totalCharges, disponible, tauxCharges };
  }, [v]);

  const color = res.disponible < 0 ? "red" : res.tauxCharges > 70 ? "amber" : "green";

  return (
    <SimLayout
      icon="📊"
      title="Calculateur de niveau de vie"
      description="Calculez votre revenu disponible après toutes vos charges fixes mensuelles."
    >
      <div className="sim-layout">
        <div className="sim-card">
          <p className="sim-card-legend">Vos revenus et charges</p>
          <div className="step-fields">
            <div className="field-full">
              <Field label="Salaire net mensuel" value={v.salaire} onChange={set("salaire")} suffix="€/mois" hint="Après impôts et cotisations" />
            </div>
            {CHARGE_FIELDS.map((f) => (
              <Field key={f.key} label={`${f.icon} ${f.label}`} value={v[f.key]} onChange={set(f.key)} suffix="€/mois" hint={f.hint} />
            ))}
          </div>
        </div>

        <div className="sim-results-panel">
          <div className={`sim-stat-hero sim-hero-${color}`}>
            <span className="sim-stat-label">Revenu disponible</span>
            <span className="sim-stat-value">
              {res.disponible < 0 ? "−" : ""}{formatCurrency(Math.abs(res.disponible))}
              <span className="sim-stat-unit">/mois</span>
            </span>
            {res.disponible < 0 && <span className="sim-hero-badge sim-badge-red">Budget déficitaire</span>}
          </div>

          <div className="sim-stats-grid">
            <div className="sim-stat-card">
              <span className="sim-stat-card-label">Revenus nets</span>
              <span className="sim-stat-card-value">{formatCurrency(v.salaire)}</span>
            </div>
            <div className={`sim-stat-card ${res.tauxCharges > 70 ? "sim-stat-card-red" : "sim-stat-card-blue"}`}>
              <span className="sim-stat-card-label">Total charges</span>
              <span className="sim-stat-card-value">{formatCurrency(res.totalCharges)}</span>
            </div>
            <div className={`sim-stat-card ${res.tauxCharges > 70 ? "sim-stat-card-red" : res.tauxCharges > 50 ? "sim-stat-card-amber" : "sim-stat-card-green"}`}>
              <span className="sim-stat-card-label">Taux de charges</span>
              <span className="sim-stat-card-value">{res.tauxCharges.toFixed(0)} %</span>
            </div>
            <div className="sim-stat-card">
              <span className="sim-stat-card-label">Disponible / an</span>
              <span className="sim-stat-card-value">{formatCurrency(res.disponible * 12)}</span>
            </div>
          </div>

          <div className="sim-budget-rule">
            <p className="sim-bar-label">Règle 50/30/20 recommandée</p>
            <div className="budget-rule-rows">
              <div className="budget-rule-row">
                <span className="budget-rule-cat">Besoins essentiels (50%)</span>
                <span className="budget-rule-target">{formatCurrency(v.salaire * 0.5)}</span>
              </div>
              <div className="budget-rule-row">
                <span className="budget-rule-cat">Loisirs &amp; extras (30%)</span>
                <span className="budget-rule-target">{formatCurrency(v.salaire * 0.3)}</span>
              </div>
              <div className="budget-rule-row budget-rule-highlight">
                <span className="budget-rule-cat">Épargne (20%)</span>
                <span className="budget-rule-target">{formatCurrency(v.salaire * 0.2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SimLayout>
  );
}
