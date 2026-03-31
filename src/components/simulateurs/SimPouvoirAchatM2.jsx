import { useState, useMemo } from "react";
import SimLayout from "./SimLayout";
import SimFunnel from "./SimFunnel";
import { CITY_LIST } from "../../data/cityData";

const fmtCur = (v) => new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(v);

export default function SimPouvoirAchatM2() {
  const [budget, setBudget] = useState(250000);
  const [notaryPct, setNotaryPct] = useState(8);

  const results = useMemo(() => {
    const budgetNet = budget / (1 + notaryPct / 100);
    return CITY_LIST.map((c) => ({
      ...c,
      m2: Math.floor(budgetNet / c.pricePerM2),
      priceFor50: c.pricePerM2 * 50 * (1 + notaryPct / 100),
      moisSalaire: Math.round((c.pricePerM2 * 50 * (1 + notaryPct / 100)) / c.salaryMedian),
    })).sort((a, b) => b.m2 - a.m2);
  }, [budget, notaryPct]);

  const max = Math.max(...results.map((r) => r.m2));

  return (
    <SimLayout
      icon="🗺️"
      title="Pouvoir d'achat immobilier par ville"
      description="Combien de m² pouvez-vous acheter avec votre budget dans 10 grandes villes françaises ?"
      simTime="1 min"
      suggestions={["/simulateurs/budget-maximum", "/simulateurs/pret-immobilier", "/simulateurs/comparateur-villes"]}
    >
      <SimFunnel
        steps={[
          {
            title: "Votre budget",
            icon: "🗺️",
            content: (
              <>
                <div className="field">
                  <div className="field-label-row">
                    <label className="field-label">Budget total disponible (apport + emprunt)</label>
                  </div>
                  <div className="horizon-box" style={{ marginTop: 8 }}>
                    <div className="horizon-row">
                      <p className="horizon-explain">Budget toutes charges incluses</p>
                      <strong className="horizon-value">{fmtCur(budget)}</strong>
                    </div>
                    <input type="range" min="50000" max="1000000" step="5000" value={budget}
                      onChange={(e) => setBudget(Number(e.target.value))}
                      style={{ "--range-pct": `${((budget - 50000) / (1000000 - 50000)) * 100}%` }} />
                    <div className="horizon-ticks"><span>50 k€</span><span>525 k€</span><span>1 M€</span></div>
                  </div>
                </div>

                <div style={{ marginTop: 16 }} className="field">
                  <div className="field-label-row">
                    <label className="field-label">Frais de notaire</label>
                  </div>
                  <div className="horizon-box" style={{ marginTop: 8 }}>
                    <div className="horizon-row">
                      <p className="horizon-explain">8 % dans l'ancien, 2–3 % dans le neuf</p>
                      <strong className="horizon-value">{notaryPct} %</strong>
                    </div>
                    <input type="range" min="2" max="10" step="0.5" value={notaryPct}
                      onChange={(e) => setNotaryPct(Number(e.target.value))}
                      style={{ "--range-pct": `${((notaryPct - 2) / (10 - 2)) * 100}%` }} />
                    <div className="horizon-ticks"><span>2 %</span><span>Neuf/Ancien</span><span>10 %</span></div>
                  </div>
                </div>

                <div className="sim-info-box" style={{ marginTop: 20 }}>
                  <p className="sim-info-title">💡 Comment lire ce tableau ?</p>
                  <p className="sim-info-body">
                    Le budget net hors frais de notaire est de {fmtCur(budget / (1 + notaryPct / 100))}.
                    Les surfaces sont calculées sur la base du prix médian au m² dans chaque ville (T2, Notaires de France 2026).
                    "Mois de salaire" = durée d'épargne si vous sauvegardez 100 % du salaire médian local.
                  </p>
                </div>
              </>
            ),
          },
        ]}
        result={
          <div className="sim-results-panel">
            <div className="pam2-table">
              {results.map((r, i) => {
                const barPct = max > 0 ? (r.m2 / max) * 100 : 0;
                const color = r.m2 >= 60 ? "#059669" : r.m2 >= 40 ? "#2563eb" : r.m2 >= 25 ? "#d97706" : "#dc2626";
                return (
                  <div key={r.id} className="pam2-row">
                    <span className="pam2-rank">{i + 1}</span>
                    <span className="pam2-city">
                      {r.emoji} <span className="pam2-city-name">{r.name}</span>
                      <span className="pam2-price-m2">{r.pricePerM2.toLocaleString("fr-FR")} €/m²</span>
                    </span>
                    <div className="pam2-bar-wrap">
                      <div className="pam2-bar-track">
                        <div className="pam2-bar-fill" style={{ width: `${barPct}%`, background: color }} />
                      </div>
                    </div>
                    <div className="pam2-numbers">
                      <span className="pam2-m2" style={{ color }}>{r.m2} m²</span>
                      <span className="pam2-months">{r.moisSalaire} mois de salaire pour 50 m²</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="sim-info-box">
              <p className="sim-info-title">📊 Indice d'effort d'achat</p>
              <p className="sim-info-body">
                Le "mois de salaire" mesure combien de mois de salaire médian local il faut pour acheter
                50 m² frais inclus. Plus ce chiffre est bas, plus le marché est accessible relativement
                aux revenus locaux. Paris nécessite {results.find(r => r.id === "paris")?.moisSalaire} mois
                vs {Math.min(...results.map(r => r.moisSalaire))} mois dans la ville la plus accessible.
              </p>
            </div>
          </div>
        }
      />
    </SimLayout>
  );
}
