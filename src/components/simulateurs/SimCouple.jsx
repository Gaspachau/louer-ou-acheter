import { useState, useMemo } from "react";
import SimLayout from "./SimLayout";
import SimCrossSell from "./SimCrossSell";

const fmt = (v) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(v);

function mortgage(p, r, y) {
  if (p <= 0 || y <= 0) return 0;
  const mr = r / 100 / 12;
  if (mr === 0) return p / (y * 12);
  return (p * mr) / (1 - Math.pow(1 + mr, -(y * 12)));
}

function Pills({ value, options, onChange, format }) {
  return (
    <div className="fv2-revenus-pills">
      {options.map((o) => (
        <button
          key={o}
          type="button"
          className={`fv2-revenus-pill${value === o ? " active" : ""}`}
          onClick={() => onChange(o)}
        >
          {format ? format(o) : o}
        </button>
      ))}
    </div>
  );
}

function capaciteEmpruntCalc(rev, charges, taux, duree) {
  const r = taux / 100 / 12;
  const n = duree * 12;
  const mensMax = Math.max(0, rev * 0.35 - charges);
  return r === 0 ? mensMax * n : mensMax * (1 - Math.pow(1 + r, -n)) / r;
}

function calcCouple({ revenus1, revenus2, charges, apport1, apport2, taux, duree }) {
  const apportTotal = apport1 + apport2;

  const capaciteSeul1 = capaciteEmpruntCalc(revenus1, charges / 2, taux, duree);
  const capaciteSeul2 = capaciteEmpruntCalc(revenus2, charges / 2, taux, duree);

  const revCombines = revenus1 + revenus2;
  const r = taux / 100 / 12;
  const n = duree * 12;
  const mensMaxCouple = Math.max(0, revCombines * 0.35 - charges);
  const capaciteCouple = r === 0 ? mensMaxCouple * n : mensMaxCouple * (1 - Math.pow(1 + r, -n)) / r;

  const budgetSeul1 = capaciteSeul1 + apport1;
  const budgetSeul2 = capaciteSeul2 + apport2;
  const budgetCouple = capaciteCouple + apportTotal;
  const gainVsSeul = budgetCouple - Math.max(budgetSeul1, budgetSeul2);

  const mensualiteCouple = mortgage(capaciteCouple, taux, duree);
  const tauxEndetCouple = revCombines > 0 ? (mensualiteCouple / revCombines) * 100 : 0;

  const pct1 = revCombines > 0 ? revenus1 / revCombines : 0.5;
  const apportOptimal1 = Math.round((apportTotal * pct1) / 1000) * 1000;
  const apportOptimal2 = apportTotal - apportOptimal1;

  const mensuelSeul1 = mortgage(capaciteSeul1, taux, duree);
  const mensuelSeul2 = mortgage(capaciteSeul2, taux, duree);

  return {
    capaciteSeul1, capaciteSeul2, capaciteCouple,
    budgetSeul1, budgetSeul2, budgetCouple,
    gainVsSeul, mensualiteCouple, tauxEndetCouple,
    apportOptimal1, apportOptimal2, apportTotal,
    pct1, revCombines, mensuelSeul1, mensuelSeul2,
  };
}

export default function SimCouple() {
  const [v, setV] = useState({
    revenus1: 2500,
    revenus2: 2000,
    charges: 300,
    apport1: 20000,
    apport2: 15000,
    taux: 3.5,
    duree: 20,
  });
  const set = (k) => (val) => setV((s) => ({ ...s, [k]: val }));

  const res = useMemo(() => calcCouple(v), [v]);

  const tauxColor =
    res.tauxEndetCouple > 35 ? "#dc2626" : res.tauxEndetCouple > 28 ? "#d97706" : "#059669";

  return (
    <SimLayout
      icon="💑"
      title="Achat en couple : optimisez votre capacité commune"
      description="Combinez vos revenus et calculez votre budget total"
      simTime="3 min"
      suggestions={[
        "/simulateurs/endettement",
        "/simulateurs/pret-immobilier",
        "/simulateurs/score-acheteur",
      ]}
    >
      <div className="sv2-container">
        {/* ── Inputs ── */}
        <div className="fv2-card">
          <p className="fv2-card-kicker">Paramètres</p>
          <h2 className="fv2-card-title">Vos profils financiers</h2>

          {/* 1 – Revenus partenaire 1 */}
          <div className="fv2-revenus-wrap" style={{ marginTop: 20 }}>
            <p className="fv2-field-label">Revenus nets — Partenaire 1</p>
            <div className="fv2-revenus-input-row">
              <input
                type="number"
                className="fv2-revenus-input"
                value={v.revenus1 || ""}
                min={0} max={20000} step={100}
                onChange={(e) => set("revenus1")(Math.max(0, Math.min(20000, Number(e.target.value) || 0)))}
              />
              <span className="fv2-revenus-unit">€/mois</span>
            </div>
            <Pills
              value={v.revenus1}
              options={[1500, 2000, 2500, 3000, 3500, 4000]}
              onChange={set("revenus1")}
              format={(o) => `${o.toLocaleString("fr-FR")} €`}
            />
            {v.revenus1 > 0 && (
              <p className="fv2-hint">
                Capacité seul : <strong>{fmt(res.capaciteSeul1)}</strong>
              </p>
            )}
          </div>

          {/* 2 – Revenus partenaire 2 */}
          <div className="fv2-revenus-wrap" style={{ marginTop: 20 }}>
            <p className="fv2-field-label">Revenus nets — Partenaire 2</p>
            <div className="fv2-revenus-input-row">
              <input
                type="number"
                className="fv2-revenus-input"
                value={v.revenus2 || ""}
                min={0} max={20000} step={100}
                onChange={(e) => set("revenus2")(Math.max(0, Math.min(20000, Number(e.target.value) || 0)))}
              />
              <span className="fv2-revenus-unit">€/mois</span>
            </div>
            <Pills
              value={v.revenus2}
              options={[1000, 1500, 2000, 2500, 3000, 3500]}
              onChange={set("revenus2")}
              format={(o) => `${o.toLocaleString("fr-FR")} €`}
            />
            {v.revenus2 > 0 && (
              <p className="fv2-hint">
                Capacité seul : <strong>{fmt(res.capaciteSeul2)}</strong>
              </p>
            )}
          </div>

          {/* 3 – Charges communes */}
          <div className="fv2-revenus-wrap" style={{ marginTop: 20 }}>
            <p className="fv2-field-label">Charges communes actuelles</p>
            <div className="fv2-revenus-input-row">
              <input
                type="number"
                className="fv2-revenus-input"
                value={v.charges || ""}
                min={0} max={5000} step={50}
                onChange={(e) => set("charges")(Math.max(0, Math.min(5000, Number(e.target.value) || 0)))}
              />
              <span className="fv2-revenus-unit">€/mois</span>
            </div>
            <Pills
              value={v.charges}
              options={[0, 200, 400, 600, 800]}
              onChange={set("charges")}
              format={(o) => (o === 0 ? "Aucune" : `${o} €`)}
            />
            <p className="fv2-hint">Crédits en cours, autres mensualités</p>
          </div>

          {/* 4 – Apport partenaire 1 */}
          <div style={{ marginTop: 20 }}>
            <div className="fv2-slider-header">
              <span className="fv2-slider-label">Apport Partenaire 1</span>
              <span className="fv2-slider-val">{fmt(v.apport1)}</span>
            </div>
            <div
              className="fv2-slider-track-wrap"
              style={{ "--pct": `${(v.apport1 / 100000) * 100}%` }}
            >
              <input
                type="range"
                className="fv2-slider"
                min={0} max={100000} step={5000}
                value={v.apport1}
                onChange={(e) => set("apport1")(Number(e.target.value))}
              />
              <div className="fv2-slider-fill" />
            </div>
            <div className="fv2-slider-minmax"><span>0 €</span><span>100 000 €</span></div>
          </div>

          {/* 5 – Apport partenaire 2 */}
          <div style={{ marginTop: 20 }}>
            <div className="fv2-slider-header">
              <span className="fv2-slider-label">Apport Partenaire 2</span>
              <span className="fv2-slider-val">{fmt(v.apport2)}</span>
            </div>
            <div
              className="fv2-slider-track-wrap"
              style={{ "--pct": `${(v.apport2 / 100000) * 100}%` }}
            >
              <input
                type="range"
                className="fv2-slider"
                min={0} max={100000} step={5000}
                value={v.apport2}
                onChange={(e) => set("apport2")(Number(e.target.value))}
              />
              <div className="fv2-slider-fill" />
            </div>
            <div className="fv2-slider-minmax"><span>0 €</span><span>100 000 €</span></div>
            <p className="fv2-hint">
              Apport total combiné : <strong>{fmt(res.apportTotal)}</strong>
            </p>
          </div>

          {/* 6 – Taux */}
          <div style={{ marginTop: 20 }}>
            <div className="fv2-slider-header">
              <span className="fv2-slider-label">Taux du crédit</span>
              <span className="fv2-slider-val">{v.taux.toFixed(1)} %</span>
            </div>
            <div
              className="fv2-slider-track-wrap"
              style={{ "--pct": `${((v.taux - 0.5) / (7 - 0.5)) * 100}%` }}
            >
              <input
                type="range"
                className="fv2-slider"
                min={0.5} max={7} step={0.1}
                value={v.taux}
                onChange={(e) => set("taux")(Number(e.target.value))}
              />
              <div className="fv2-slider-fill" />
            </div>
            <div className="fv2-slider-minmax"><span>0,5 %</span><span>7 %</span></div>
          </div>

          {/* 7 – Durée */}
          <div style={{ marginTop: 20 }}>
            <div className="fv2-slider-header">
              <span className="fv2-slider-label">Durée du crédit</span>
              <span className="fv2-slider-val">{v.duree} ans</span>
            </div>
            <div
              className="fv2-slider-track-wrap"
              style={{ "--pct": `${((v.duree - 5) / (25 - 5)) * 100}%` }}
            >
              <input
                type="range"
                className="fv2-slider"
                min={5} max={25} step={1}
                value={v.duree}
                onChange={(e) => set("duree")(Number(e.target.value))}
              />
              <div className="fv2-slider-fill" />
            </div>
            <div className="fv2-slider-minmax"><span>5 ans</span><span>25 ans</span></div>
          </div>
        </div>

        {/* ── Results ── */}
        {v.revenus1 > 0 && v.revenus2 > 0 && (
          <div className="fv2-card" style={{ marginTop: 16 }}>
            {/* Verdict */}
            <div className="sv2-verdict sv2-verdict-blue">
              <p className="sv2-verdict-label">Capacité d'emprunt à deux</p>
              <p className="sv2-verdict-amount">{fmt(res.capaciteCouple)}</p>
              <p className="sv2-verdict-sub">
                Budget total (avec apport) : <strong>{fmt(res.budgetCouple)}</strong>
              </p>
            </div>

            {/* Comparison table */}
            <div style={{ marginTop: 20 }}>
              <p className="fv2-field-label" style={{ marginBottom: 10 }}>Comparaison des scénarios</p>
              <div className="sv2-couple-comparison">
                <div className="sv2-couple-col">
                  <p className="sv2-couple-col-title">Partenaire 1 seul</p>
                  <div className="sv2-couple-row">
                    <span className="sv2-couple-row-label">Revenus</span>
                    <span className="sv2-couple-row-val">{fmt(v.revenus1)}/m</span>
                  </div>
                  <div className="sv2-couple-row">
                    <span className="sv2-couple-row-label">Capacité</span>
                    <span className="sv2-couple-row-val">{fmt(res.capaciteSeul1)}</span>
                  </div>
                  <div className="sv2-couple-row">
                    <span className="sv2-couple-row-label">Budget total</span>
                    <span className="sv2-couple-row-val">{fmt(res.budgetSeul1)}</span>
                  </div>
                  <div className="sv2-couple-row">
                    <span className="sv2-couple-row-label">Mensualité max</span>
                    <span className="sv2-couple-row-val">{fmt(res.mensuelSeul1)}/m</span>
                  </div>
                </div>

                <div className="sv2-couple-col">
                  <p className="sv2-couple-col-title">Partenaire 2 seul</p>
                  <div className="sv2-couple-row">
                    <span className="sv2-couple-row-label">Revenus</span>
                    <span className="sv2-couple-row-val">{fmt(v.revenus2)}/m</span>
                  </div>
                  <div className="sv2-couple-row">
                    <span className="sv2-couple-row-label">Capacité</span>
                    <span className="sv2-couple-row-val">{fmt(res.capaciteSeul2)}</span>
                  </div>
                  <div className="sv2-couple-row">
                    <span className="sv2-couple-row-label">Budget total</span>
                    <span className="sv2-couple-row-val">{fmt(res.budgetSeul2)}</span>
                  </div>
                  <div className="sv2-couple-row">
                    <span className="sv2-couple-row-label">Mensualité max</span>
                    <span className="sv2-couple-row-val">{fmt(res.mensuelSeul2)}/m</span>
                  </div>
                </div>

                <div className="sv2-couple-col highlight">
                  <p className="sv2-couple-col-title" style={{ color: "#1a56db" }}>À deux</p>
                  <div className="sv2-couple-row">
                    <span className="sv2-couple-row-label">Revenus</span>
                    <span className="sv2-couple-row-val">{fmt(res.revCombines)}/m</span>
                  </div>
                  <div className="sv2-couple-row">
                    <span className="sv2-couple-row-label">Capacité</span>
                    <span className="sv2-couple-row-val" style={{ color: "#1a56db" }}>{fmt(res.capaciteCouple)}</span>
                  </div>
                  <div className="sv2-couple-row">
                    <span className="sv2-couple-row-label">Budget total</span>
                    <span className="sv2-couple-row-val" style={{ color: "#1a56db" }}>{fmt(res.budgetCouple)}</span>
                  </div>
                  <div className="sv2-couple-row">
                    <span className="sv2-couple-row-label">Mensualité max</span>
                    <span className="sv2-couple-row-val">{fmt(res.mensualiteCouple)}/m</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Taux endettement */}
            <div style={{ marginTop: 16 }}>
              <div className="fv2-slider-header">
                <span className="fv2-slider-label">Taux d'endettement à deux</span>
                <span className="fv2-slider-val" style={{ color: tauxColor }}>
                  {res.tauxEndetCouple.toFixed(1)} %
                </span>
              </div>
              <div style={{ height: 8, background: "#e2e8f0", borderRadius: 999, overflow: "hidden", marginTop: 6 }}>
                <div
                  style={{
                    height: "100%",
                    width: `${Math.min(100, (res.tauxEndetCouple / 50) * 100)}%`,
                    background: tauxColor,
                    borderRadius: 999,
                    transition: "width .4s",
                  }}
                />
              </div>
              <div className="fv2-slider-minmax">
                <span>0 %</span>
                <span style={{ color: "#d97706" }}>Limite 35 %</span>
                <span>50 %</span>
              </div>
            </div>

            {/* Gain card */}
            {res.gainVsSeul > 0 && (
              <div className="sv2-verdict sv2-verdict-green" style={{ marginTop: 16 }}>
                <p className="sv2-verdict-label">Gain lié à l'achat à deux</p>
                <p className="sv2-verdict-amount">+ {fmt(res.gainVsSeul)}</p>
                <p className="sv2-verdict-sub">
                  de budget supplémentaire vs acheter seul
                </p>
              </div>
            )}

            {/* Apport optimal */}
            {res.apportTotal > 0 && (
              <div className="sv2-insight" style={{ marginTop: 20 }}>
                Pour optimiser votre dossier bancaire, nous recommandons :{" "}
                <strong>Partenaire 1 : {fmt(res.apportOptimal1)}</strong>{" "}
                ({Math.round(res.pct1 * 100)} %) ·{" "}
                <strong>Partenaire 2 : {fmt(res.apportOptimal2)}</strong>{" "}
                ({Math.round((1 - res.pct1) * 100)} %) — proportionnel à vos revenus.
              </div>
            )}
          </div>
        )}

        <SimCrossSell
          show={v.revenus1 > 0 && v.revenus2 > 0}
          loan={res.capaciteCouple}
          taux={v.taux}
          dureeCredit={v.duree}
        />
      </div>
    </SimLayout>
  );
}
