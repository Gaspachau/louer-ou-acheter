import { useMemo, useState } from "react";
import SimLayout from "./SimLayout";
import Field from "../Field";

const fmtCur = (v) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(v);

function calcMaxBudget(revenus, chargesExist, apport, taux, duree) {
  const capacite = Math.max(0, revenus * 0.35 - chargesExist);
  const r = taux / 100 / 12;
  const n = duree * 12;
  if (capacite <= 0 || n <= 0) return 0;
  const capitalEmpruntable = r === 0 ? capacite * n : capacite * (1 - Math.pow(1 + r, -n)) / r;
  return capitalEmpruntable + apport - capitalEmpruntable * 0.08; // deduit les frais notaire du budget total
}

function calcMaxPrice(revenus, chargesExist, apport, taux, duree) {
  // Prix max = (capital empruntable + apport) / 1.08
  const capacite = Math.max(0, revenus * 0.35 - chargesExist);
  const r = taux / 100 / 12;
  const n = duree * 12;
  if (capacite <= 0 || n <= 0) return apport / 1.08;
  const capitalEmpruntable = r === 0 ? capacite * n : capacite * (1 - Math.pow(1 + r, -n)) / r;
  return (capitalEmpruntable + apport) / 1.08;
}

function calcMensualite(capital, taux, dureeAns) {
  const r = taux / 100 / 12;
  const n = dureeAns * 12;
  if (capital <= 0 || n <= 0) return 0;
  return r === 0 ? capital / n : (capital * r) / (1 - Math.pow(1 + r, -n));
}

// 12 villes avec prix m² moyen T2 et superficie typique
const VILLES = [
  { nom: "Paris",        flag: "🗼", m2: 9800,  surface: { T1: 24, T2: 38, T3: 60 } },
  { nom: "Lyon",         flag: "🦁", m2: 4700,  surface: { T1: 25, T2: 40, T3: 62 } },
  { nom: "Bordeaux",     flag: "🍷", m2: 4200,  surface: { T1: 25, T2: 40, T3: 62 } },
  { nom: "Nice",         flag: "☀️", m2: 5500,  surface: { T1: 24, T2: 38, T3: 58 } },
  { nom: "Nantes",       flag: "🏰", m2: 4100,  surface: { T1: 25, T2: 40, T3: 62 } },
  { nom: "Toulouse",     flag: "🌸", m2: 3800,  surface: { T1: 25, T2: 40, T3: 62 } },
  { nom: "Montpellier",  flag: "🎭", m2: 3600,  surface: { T1: 25, T2: 40, T3: 62 } },
  { nom: "Rennes",       flag: "⚓", m2: 4200,  surface: { T1: 25, T2: 40, T3: 62 } },
  { nom: "Lille",        flag: "🍺", m2: 3400,  surface: { T1: 24, T2: 38, T3: 58 } },
  { nom: "Strasbourg",   flag: "🎄", m2: 3500,  surface: { T1: 24, T2: 38, T3: 58 } },
  { nom: "Grenoble",     flag: "⛷️", m2: 2800,  surface: { T1: 25, T2: 40, T3: 62 } },
  { nom: "Marseille",    flag: "⚓", m2: 3300,  surface: { T1: 25, T2: 40, T3: 62 } },
];

const DUREES = [15, 20, 25];

export default function SimBudgetMax() {
  const [v, setV] = useState({
    revenus: 3800,
    chargesExist: 0,
    apport: 40000,
    taux: 3.8,
  });
  const set = (k) => (val) => setV((s) => ({ ...s, [k]: val }));

  const res = useMemo(() => {
    if (!v.revenus || v.revenus <= 0) return null;

    const budgets = DUREES.map((duree) => ({
      duree,
      maxPrice: Math.round(calcMaxPrice(v.revenus, v.chargesExist, v.apport, v.taux, duree)),
      mensualite: Math.round(calcMensualite(
        Math.max(0, calcMaxPrice(v.revenus, v.chargesExist, v.apport, v.taux, duree) * 1.08 - v.apport),
        v.taux, duree
      )),
    }));

    const maxPrice20 = budgets.find((b) => b.duree === 20)?.maxPrice ?? 0;
    const maxPrice25 = budgets.find((b) => b.duree === 25)?.maxPrice ?? 0;

    // City grid: can buy T1/T2/T3 at max budget 25y?
    const villes = VILLES.map((ville) => {
      const prixT1 = ville.m2 * ville.surface.T1;
      const prixT2 = ville.m2 * ville.surface.T2;
      const prixT3 = ville.m2 * ville.surface.T3;
      const canT3 = maxPrice25 >= prixT3;
      const canT2 = maxPrice25 >= prixT2;
      const canT1 = maxPrice25 >= prixT1;
      return {
        ...ville, prixT1, prixT2, prixT3,
        canT1, canT2, canT3,
        bestType: canT3 ? "T3" : canT2 ? "T2" : canT1 ? "T1" : null,
      };
    }).sort((a, b) => {
      const order = { T3: 3, T2: 2, T1: 1, null: 0 };
      return (order[b.bestType] || 0) - (order[a.bestType] || 0);
    });

    const nbVilles = villes.filter((v) => v.bestType).length;
    const capaciteRestante = Math.max(0, v.revenus * 0.35 - v.chargesExist);

    return { budgets, villes, nbVilles, capaciteRestante, maxPrice25, maxPrice20 };
  }, [v]);

  return (
    <SimLayout
      icon="🏆"
      title="Budget maximum d'achat"
      description="Calculez précisément jusqu'où vous pouvez aller — et découvrez dans quelles villes vous pouvez acheter."
    >
      <div className="sim-layout">
        {/* Inputs */}
        <div className="sim-card">
          <p className="sim-card-legend">Votre situation financière</p>
          <div className="step-fields">
            <div className="field-full">
              <Field label="Revenus nets mensuels" value={v.revenus} onChange={set("revenus")} suffix="€/mois"
                hint="Tous les revenus réguliers du foyer" />
            </div>
            <div className="field-full">
              <Field label="Charges mensuelles de crédit" value={v.chargesExist} onChange={set("chargesExist")} suffix="€/mois"
                hint="Mensualités de crédits en cours (auto, conso…)" />
            </div>
            <div className="field-full">
              <Field label="Apport personnel disponible" value={v.apport} onChange={set("apport")} suffix="€"
                hint="Épargne mobilisable pour l'achat" />
            </div>
            <div className="field-full">
              <Field label="Taux du crédit envisagé" value={v.taux} onChange={set("taux")} suffix="%" step="0.1"
                hint="Mars 2026 : entre 3,3 % et 4,0 %" />
            </div>
          </div>

          {res && (
            <div className="sim-info-box" style={{ marginTop: 16 }}>
              <p className="sim-info-title">📊 Votre capacité mensuelle</p>
              <p className="sim-info-body">
                Au taux d'endettement HCSF de 35 %, votre mensualité maximale est de <strong>{fmtCur(res.capaciteRestante)}/mois</strong>.
                {v.chargesExist > 0 && ` (Après déduction de ${fmtCur(v.chargesExist)}/mois de crédits existants.)`}
              </p>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="sim-results-panel">
          {!res ? (
            <p className="sim-empty">Renseignez vos revenus pour voir votre budget maximum.</p>
          ) : (
            <>
              {/* Budget par durée */}
              <p className="sim-card-legend" style={{ marginBottom: 10 }}>Budget maximum selon la durée</p>
              <div className="budget-duree-grid">
                {res.budgets.map(({ duree, maxPrice, mensualite }) => (
                  <div key={duree} className={`budget-duree-card${duree === 20 ? " budget-duree-featured" : ""}`}>
                    <p className="budget-duree-label">{duree} ans</p>
                    <p className="budget-duree-price">{fmtCur(maxPrice)}</p>
                    <p className="budget-duree-mens">{fmtCur(mensualite)}/mois</p>
                    {duree === 20 && <span className="budget-duree-badge">Recommandé</span>}
                  </div>
                ))}
              </div>

              {/* Cities grid */}
              <div style={{ marginTop: 24 }}>
                <p className="sim-card-legend" style={{ marginBottom: 10 }}>
                  Ce que vous pouvez acheter dans 12 villes
                  <span style={{ fontWeight: 400, fontSize: 11, marginLeft: 6, color: "var(--muted)" }}>
                    — sur 25 ans, {res.nbVilles}/12 villes accessibles
                  </span>
                </p>
                <div className="budget-cities-grid">
                  {res.villes.map((ville) => (
                    <div
                      key={ville.nom}
                      className={`budget-city-card ${!ville.bestType ? "budget-city-out" : ville.canT3 ? "budget-city-t3" : ville.canT2 ? "budget-city-t2" : "budget-city-t1"}`}
                    >
                      <div className="budget-city-header">
                        <span className="budget-city-flag">{ville.flag}</span>
                        <span className="budget-city-nom">{ville.nom}</span>
                        <span className={`budget-city-badge ${!ville.bestType ? "badge-out" : ville.canT3 ? "badge-t3" : ville.canT2 ? "badge-t2" : "badge-t1"}`}>
                          {!ville.bestType ? "Hors budget" : ville.canT3 ? "T3 accessible" : ville.canT2 ? "T2 accessible" : "T1 accessible"}
                        </span>
                      </div>
                      <div className="budget-city-rows">
                        {[
                          { type: "T1", prix: ville.prixT1, can: ville.canT1 },
                          { type: "T2", prix: ville.prixT2, can: ville.canT2 },
                          { type: "T3", prix: ville.prixT3, can: ville.canT3 },
                        ].map(({ type, prix, can }) => (
                          <div key={type} className="budget-city-row">
                            <span className={`budget-type-label ${can ? "budget-type-yes" : "budget-type-no"}`}>
                              {can ? "✓" : "✗"} {type}
                            </span>
                            <span style={{ color: "var(--muted)", fontSize: 12 }}>{fmtCur(prix)}</span>
                          </div>
                        ))}
                        <div className="budget-city-m2">
                          {fmtCur(ville.m2)}/m² · {ville.m2 > 4000 ? "Marché tendu" : "Marché accessible"}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </SimLayout>
  );
}
