import { useState, useMemo } from "react";
import SimLayout from "./SimLayout";
import SimCrossSell from "./SimCrossSell";
import { VILLES } from "../../data/villes";

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

function capaciteEmprunt(revTotal, taux, duree) {
  const r = taux / 100 / 12;
  const n = duree * 12;
  const mensMax = revTotal * 0.35;
  return r === 0 ? mensMax * n : mensMax * (1 - Math.pow(1 + r, -n)) / r;
}

const CITY_NAMES = ["Paris", "Lyon", "Marseille", "Bordeaux", "Toulouse", "Nantes", "Rennes", "Lille", "Strasbourg", "Nice"];

const SELECTED_CITIES = VILLES.filter((v) => CITY_NAMES.includes(v.nom));

export default function SimBudgetMax() {
  const [v, setV] = useState({
    revenus: 3000,
    apport: 40000,
    achat: "seul",
    revenus_co: 0,
    taux: 3.5,
  });
  const set = (k) => (val) => setV((s) => ({ ...s, [k]: val }));

  const revTotal = v.achat === "couple" ? v.revenus + v.revenus_co : v.revenus;

  const res = useMemo(() => {
    if (!revTotal || revTotal <= 0) return null;

    const durees = [15, 20, 25];
    const scenarios = durees.map((d) => {
      const cap = capaciteEmprunt(revTotal, v.taux, d);
      const budget = cap + v.apport;
      const budgetNet = budget / 1.08;
      const mens = mortgage(cap, v.taux, d);
      return { duree: d, cap: Math.round(cap), budget: Math.round(budget), budgetNet: Math.round(budgetNet), mens: Math.round(mens) };
    });

    const s20 = scenarios.find((s) => s.duree === 20);
    const budgetNet20 = s20 ? s20.budgetNet : 0;

    const cities = SELECTED_CITIES.map((city) => {
      const m2 = Math.round(budgetNet20 / city.prix_m2);
      const access = m2 >= 40 ? "confortable" : m2 >= 25 ? "possible" : "difficile";
      return { ...city, m2, access };
    });

    const nbConfortables = cities.filter((c) => c.access === "confortable").length;
    const paris = cities.find((c) => c.nom === "Paris");

    return { scenarios, budgetNet20, cities, nbConfortables, paris, cap20: s20?.cap ?? 0 };
  }, [revTotal, v.apport, v.taux]);

  const cap20ForCross = res?.cap20 ?? capaciteEmprunt(revTotal, v.taux, 20);

  return (
    <SimLayout
      icon="💸"
      title="Jusqu'où pouvez-vous aller ?"
      description="Budget maximum par ville et par durée selon votre profil"
      simTime="2 min"
      suggestions={[
        "/simulateurs/endettement",
        "/simulateurs/frais-notaire",
        "/simulateurs/ptz",
      ]}
    >
      <div className="sv2-container">
        {/* ── Inputs ── */}
        <div className="fv2-card">
          <p className="fv2-card-kicker">Paramètres</p>
          <h2 className="fv2-card-title">Votre situation financière</h2>

          {/* 1 – Revenus */}
          <div className="fv2-revenus-wrap" style={{ marginTop: 20 }}>
            <p className="fv2-field-label">Revenus nets mensuels</p>
            <div className="fv2-revenus-input-row">
              <input
                type="number"
                className="fv2-revenus-input"
                value={v.revenus || ""}
                min={0} max={50000} step={100}
                onChange={(e) => set("revenus")(Math.max(0, Math.min(50000, Number(e.target.value) || 0)))}
              />
              <span className="fv2-revenus-unit">€/mois</span>
            </div>
            <Pills
              value={v.revenus}
              options={[1500, 2000, 2500, 3000, 3500, 4000, 5000]}
              onChange={set("revenus")}
              format={(o) => `${o.toLocaleString("fr-FR")} €`}
            />
          </div>

          {/* 2 – Apport */}
          <div style={{ marginTop: 20 }}>
            <div className="fv2-slider-header">
              <span className="fv2-slider-label">Apport disponible</span>
              <span className="fv2-slider-val">{fmt(v.apport)}</span>
            </div>
            <div
              className="fv2-slider-track-wrap"
              style={{ "--pct": `${(v.apport / 200000) * 100}%` }}
            >
              <input
                type="range"
                className="fv2-slider"
                min={0} max={200000} step={5000}
                value={v.apport}
                onChange={(e) => set("apport")(Number(e.target.value))}
              />
              <div className="fv2-slider-fill" />
            </div>
            <div className="fv2-slider-minmax"><span>0 €</span><span>200 000 €</span></div>
          </div>

          {/* 3 – Seul ou en couple */}
          <div style={{ marginTop: 20 }}>
            <p className="fv2-field-label">Situation</p>
            <div className="fv2-choices-row" style={{ marginTop: 8 }}>
              <button
                type="button"
                className={`fv2-choice${v.achat === "seul" ? " fv2-choice-active" : ""}`}
                onClick={() => set("achat")("seul")}
              >
                Seul(e)
              </button>
              <button
                type="button"
                className={`fv2-choice${v.achat === "couple" ? " fv2-choice-active" : ""}`}
                onClick={() => set("achat")("couple")}
              >
                En couple
              </button>
            </div>
          </div>

          {v.achat === "couple" && (
            <div className="fv2-revenus-wrap" style={{ marginTop: 16 }}>
              <p className="fv2-field-label">Revenus nets du co-emprunteur</p>
              <div className="fv2-revenus-input-row">
                <input
                  type="number"
                  className="fv2-revenus-input"
                  value={v.revenus_co || ""}
                  min={0} max={50000} step={100}
                  onChange={(e) => set("revenus_co")(Math.max(0, Math.min(50000, Number(e.target.value) || 0)))}
                />
                <span className="fv2-revenus-unit">€/mois</span>
              </div>
              <Pills
                value={v.revenus_co}
                options={[1000, 1500, 2000, 2500, 3000, 3500]}
                onChange={set("revenus_co")}
                format={(o) => `${o.toLocaleString("fr-FR")} €`}
              />
            </div>
          )}

          {/* 4 – Taux */}
          <div style={{ marginTop: 20 }}>
            <div className="fv2-slider-header">
              <span className="fv2-slider-label">Taux du crédit</span>
              <span className="fv2-slider-val">
                {v.taux.toFixed(1)} %
                <span style={{ marginLeft: 6, fontSize: 11, fontWeight: 600, background: "#eff6ff", color: "#1a56db", borderRadius: 6, padding: "2px 7px" }}>
                  Moyenne 2026 : 3,5 %
                </span>
              </span>
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
        </div>

        {/* ── Results ── */}
        {res && revTotal > 0 && (
          <div className="fv2-card" style={{ marginTop: 16 }}>
            {/* Verdict */}
            <div className="sv2-verdict sv2-verdict-blue">
              <p className="sv2-verdict-label">Votre budget maximum est de</p>
              <p className="sv2-verdict-amount">
                {fmt(res.scenarios.find((s) => s.duree === 20)?.budget ?? 0)}
              </p>
              <p className="sv2-verdict-sub">
                Dont {fmt(v.apport)} d'apport et{" "}
                {fmt(res.scenarios.find((s) => s.duree === 20)?.cap ?? 0)} d'emprunt
              </p>
            </div>

            {/* 3 scenario cards */}
            <div className="sv2-scenarios" style={{ marginTop: 20 }}>
              {res.scenarios.map((s) => (
                <div key={s.duree} className={`sv2-scenario-card${s.duree === 20 ? " highlight" : ""}`}>
                  <p className="sv2-scenario-dur">{s.duree} ans</p>
                  <p className="sv2-scenario-amt">{fmt(s.budget)}</p>
                  <p className="sv2-scenario-badge">{fmt(s.mens)}/mois</p>
                  {s.duree === 20 && (
                    <span style={{ fontSize: 10, fontWeight: 700, color: "#1a56db", marginTop: 4, display: "block" }}>
                      Recommandé
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* City table */}
            <div style={{ marginTop: 24 }}>
              <p className="fv2-field-label" style={{ marginBottom: 10 }}>
                Budget en m² dans les 10 grandes villes
                <span style={{ fontWeight: 400, fontSize: 11, marginLeft: 6, color: "#64748b" }}>
                  — sur 20 ans
                </span>
              </p>
              <table className="sv2-budget-city-table">
                <thead>
                  <tr>
                    <th>Ville</th>
                    <th>Prix m²</th>
                    <th>Surface achetable</th>
                    <th>Accessibilité</th>
                  </tr>
                </thead>
                <tbody>
                  {res.cities.map((city) => (
                    <tr key={city.nom}>
                      <td className="sv2-budget-city-name">{city.nom}</td>
                      <td className="sv2-budget-city-m2">
                        {city.prix_m2.toLocaleString("fr-FR")} €/m²
                      </td>
                      <td style={{ fontWeight: 700, color: "#0c1a35" }}>
                        {city.m2} m²
                      </td>
                      <td>
                        {city.access === "confortable" ? (
                          <span className="sv2-accessibility-badge sv2-accessibility-green">
                            ● Confortable
                          </span>
                        ) : city.access === "possible" ? (
                          <span className="sv2-accessibility-badge sv2-accessibility-amber">
                            ● Possible
                          </span>
                        ) : (
                          <span className="sv2-accessibility-badge sv2-accessibility-red">
                            ● Difficile
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Insight */}
            <div className="sv2-insight">
              Avec votre budget de{" "}
              <strong>{fmt(res.scenarios.find((s) => s.duree === 20)?.budget ?? 0)}</strong>,
              vous pouvez acheter confortablement dans{" "}
              <strong>{res.nbConfortables} ville{res.nbConfortables > 1 ? "s" : ""}</strong> sur les 10
              principales de France.
              {res.paris && (
                <> À Paris, cela représente <strong>{res.paris.m2} m²</strong>.</>
              )}
            </div>
          </div>
        )}

        <SimCrossSell
          show={revTotal > 0}
          loan={cap20ForCross}
          taux={v.taux}
          dureeCredit={20}
        />
      </div>
    </SimLayout>
  );
}
