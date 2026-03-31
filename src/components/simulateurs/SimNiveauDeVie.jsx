import { useMemo, useState } from "react";
import Field from "../Field";
import SimLayout from "./SimLayout";
import DonutChart from "../DonutChart";
import { formatCurrency } from "../../utils/finance";

const CHARGE_FIELDS = [
  { key: "loyer", label: "Loyer / mensualité", icon: "🏠", hint: "Logement principal", color: "#2563eb", tooltip: "Loyer mensuel charges comprises. Moyenne nationale : ~700 €/mois. À Paris : ~1 400 €, en province : ~600–700 €." },
  { key: "alimentation", label: "Alimentation", icon: "🛒", hint: "Courses + restauration", color: "#06b6d4", tooltip: "Dépenses alimentaires incluant courses et restaurants. Moyenne France : ~300–400 €/mois pour une personne." },
  { key: "transport", label: "Transport", icon: "🚗", hint: "Voiture, transports en commun", color: "#d97706", tooltip: "Tous les frais de déplacement : carburant, transports en commun, assurance auto, entretien véhicule." },
  { key: "telecom", label: "Télécom", icon: "📱", hint: "Internet + téléphone", color: "#7c3aed", tooltip: "Internet fixe + téléphone mobile. Comptez ~30–60 €/mois pour des offres de base." },
  { key: "assurances", label: "Assurances", icon: "🛡️", hint: "Habitation, auto, santé…", color: "#0891b2", tooltip: "Mutuelle santé, assurance auto, habitation... Vérifiez qu'il n'y a pas de doublons avec les charges saisies séparément." },
  { key: "autres", label: "Autres charges", icon: "📦", hint: "Abonnements, loisirs fixes…", color: "#64748b", tooltip: undefined },
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

  const donutSegments = [
    ...CHARGE_FIELDS.map((f) => ({ value: v[f.key] || 0, color: f.color, label: f.label })),
    ...(res.disponible > 0 ? [{ value: res.disponible, color: "#e2e8f0", label: "Disponible" }] : []),
  ].filter((s) => s.value > 0);

  return (
    <SimLayout
      icon="📊"
      title="Calculateur de niveau de vie"
      description="Calculez votre revenu disponible après toutes vos charges fixes mensuelles."
      simTime="3 min"
    >
      <div className="sim-layout">
        <div className="sim-card">
          <p className="sim-card-legend">Vos revenus et charges</p>
          <div className="step-fields">
            <div className="field-full">
              <Field label="Salaire net mensuel" value={v.salaire} onChange={set("salaire")} suffix="€/mois" hint="Après impôts et cotisations" tooltip="Votre salaire net après prélèvement à la source et cotisations. Regardez votre fiche de paie, ligne 'net à payer avant impôt'." />
            </div>
            {CHARGE_FIELDS.map((f) => (
              <Field key={f.key} label={`${f.icon} ${f.label}`} value={v[f.key]} onChange={set(f.key)} suffix="€/mois" hint={f.hint} tooltip={f.tooltip} />
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

          {/* Donut + category bars */}
          <div className="sim-donut-section">
            <DonutChart
              segments={donutSegments}
              size={130}
              thickness={22}
              label={formatCurrency(v.salaire)}
              subLabel="revenus"
            />
            <div className="sim-donut-legend" style={{ flex: 1 }}>
              <p className="sim-bar-label" style={{ marginBottom: 8 }}>Répartition par poste</p>
              <div className="charge-category-bars">
                {CHARGE_FIELDS.map((f) => {
                  const pct = v.salaire > 0 ? Math.min(100, ((v[f.key] || 0) / v.salaire) * 100) : 0;
                  return (
                    <div key={f.key} className="charge-bar-row">
                      <span className="charge-bar-row-icon">{f.icon}</span>
                      <span className="charge-bar-row-label">{f.label}</span>
                      <div className="charge-bar-track">
                        <div
                          className="charge-bar-fill"
                          style={{ width: `${pct}%`, background: f.color }}
                        />
                      </div>
                      <span className="charge-bar-row-value">{formatCurrency(v[f.key] || 0)}</span>
                    </div>
                  );
                })}
              </div>
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

          {(() => {
            const maxMens = v.salaire * 0.35;
            const capitalCapacity = maxMens * (1 - Math.pow(1 + 3.5/100/12, -240)) / (3.5/100/12);
            return (
              <div className="sim-info-box" style={{ marginTop: 16 }}>
                <p className="sim-info-title">🏠 Capacité d'achat indicative</p>
                <p className="sim-info-body">
                  À 35 % de vos revenus, votre mensualité max est de <strong>{formatCurrency(Math.round(maxMens))}/mois</strong>.
                  Cela correspond à une capacité d'emprunt d'environ <strong>{formatCurrency(Math.round(capitalCapacity))}</strong> sur 20 ans à 3,5 %.
                  {res.tauxCharges > 65 ? " ⚠️ Votre taux de charges actuel est élevé — réduire certains postes améliorera votre dossier bancaire." : ""}
                </p>
              </div>
            );
          })()}
        </div>
      </div>
    </SimLayout>
  );
}
