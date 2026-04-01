import { useState, useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine, Cell } from "recharts";
import SimLayout from "./SimLayout";
import SimCrossSell from "./SimCrossSell";

const fmt = (v) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(v);
const fmtK = (v) => (v >= 1000 ? `${(v / 1000).toFixed(0)}k €` : `${v} €`);

const BUDGET_PILLS      = [150000, 200000, 250000, 300000, 400000];
const EPARGNE_PILLS     = [5000, 10000, 20000, 30000, 50000];
const CAPACITE_PILLS    = [300, 500, 750, 1000, 1500];
const HORIZON_PILLS     = [6, 12, 18, 24, 36];

const CHECKLIST = [
  { id: "apport",   label: "Constituer l'apport",         autoCheck: (res) => res.apportAtteint10 },
  { id: "dossier",  label: "Préparer le dossier bancaire", autoCheck: () => false },
  { id: "visites",  label: "Visiter ≥ 10 biens",          autoCheck: () => false },
  { id: "promesse", label: "Signer la promesse de vente",  autoCheck: () => false },
  { id: "notaire",  label: "Signature chez le notaire",    autoCheck: () => false },
];

function ChartTip({ active, payload }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="chart-tooltip">
      {payload.map((p) => (
        <div key={p.dataKey} className="chart-tooltip-row">
          <span style={{ color: p.fill, fontWeight: 700 }}>{p.name} :</span>
          <span className="chart-tooltip-label">&nbsp;{fmt(p.value)}</span>
        </div>
      ))}
    </div>
  );
}

export default function SimCalendrier() {
  const [horizon, setHorizon]         = useState(24);
  const [budget, setBudget]           = useState(250000);
  const [epargne, setEpargne]         = useState(20000);
  const [capacite, setCapacite]       = useState(750);

  const horizonPct = Math.min(100, ((horizon - 3) / (60 - 3)) * 100);

  const res = useMemo(() => {
    const objectif10  = budget * 0.10;
    const objectif20  = budget * 0.20;

    const apportFinal = epargne + capacite * horizon;
    const pctAtteint  = budget > 0 ? (apportFinal / budget) * 100 : 0;

    const moisPour10  = objectif10 <= epargne ? 0
      : capacite > 0 ? Math.ceil((objectif10 - epargne) / capacite) : null;
    const moisPour20  = objectif20 <= epargne ? 0
      : capacite > 0 ? Math.ceil((objectif20 - epargne) / capacite) : null;

    const apportAtteint10 = apportFinal >= objectif10;
    const apportAtteint20 = apportFinal >= objectif20;

    const chartData = [
      { name: "Épargne actuelle", valeur: Math.round(epargne),       fill: "#93c5fd" },
      { name: "Épargne future",   valeur: Math.round(capacite * horizon), fill: "#1a56db" },
      { name: "Objectif 10 %",   valeur: Math.round(objectif10),     fill: "#f59e0b" },
      { name: "Objectif 20 %",   valeur: Math.round(objectif20),     fill: "#10b981" },
    ];

    return {
      objectif10, objectif20, apportFinal, pctAtteint,
      moisPour10, moisPour20, apportAtteint10, apportAtteint20,
      chartData,
    };
  }, [horizon, budget, epargne, capacite]);

  const verdictClass =
    res.apportAtteint20 ? "sv2-verdict-green"
    : res.apportAtteint10 ? "sv2-verdict-amber"
    : "sv2-verdict-red";

  const verdictLabel =
    res.apportAtteint20 ? "Vous atteignez 20 % d'apport — excellent !"
    : res.apportAtteint10 ? "Vous atteignez 10 % d'apport — objectif minimal"
    : "Apport insuffisant sur cet horizon";

  return (
    <SimLayout
      icon="📅"
      title="Planifiez votre achat immobilier"
      description="Calculez votre apport à terme et les étapes pour atteindre votre objectif"
      simTime="2 min"
      suggestions={[
        "/simulateurs/pret-immobilier",
        "/simulateurs/endettement",
        "/simulateurs/frais-notaire",
        "/simulateurs/score-acheteur",
        "/simulateurs/budget-maximum",
        "/simulateurs/stress-test",
      ]}
    >
      <div className="sv2-container">

        {/* ── Inputs card ── */}
        <div className="fv2-card" style={{ marginBottom: 20 }}>
          <p className="fv2-card-kicker">Votre projet</p>
          <p className="fv2-card-title">Renseignez votre situation d'épargne</p>

          {/* Horizon */}
          <div style={{ marginBottom: 24 }}>
            <div className="fv2-slider-header">
              <span className="fv2-slider-label">Date d'achat souhaitée</span>
              <span className="fv2-slider-val">dans {horizon} mois</span>
            </div>
            <div className="fv2-slider-track-wrap" style={{ "--pct": `${horizonPct}%` }}>
              <input type="range" className="fv2-slider"
                min={3} max={60} step={1} value={horizon}
                onChange={(e) => setHorizon(Number(e.target.value))} />
              <div className="fv2-slider-fill" style={{ width: `${horizonPct}%` }} />
            </div>
            <div className="fv2-slider-minmax"><span>3 mois</span><span>60 mois</span></div>
            <div className="fv2-revenus-pills" style={{ marginTop: 8 }}>
              {HORIZON_PILLS.map((p) => (
                <button key={p} type="button"
                  className={`fv2-revenus-pill${horizon === p ? " active" : ""}`}
                  onClick={() => setHorizon(p)}>
                  {p} mois
                </button>
              ))}
            </div>
          </div>

          {/* Budget objectif */}
          <div style={{ marginBottom: 24 }}>
            <p className="fv2-field-label">Budget objectif</p>
            <div className="fv2-revenus-input-row">
              <input
                type="number" className="fv2-revenus-input"
                value={budget || ""} min={50000} max={2000000} step={5000}
                placeholder="250 000"
                onChange={(e) => setBudget(Math.max(0, Number(e.target.value) || 0))}
              />
              <span className="fv2-revenus-unit">€</span>
            </div>
            <div className="fv2-revenus-pills">
              {BUDGET_PILLS.map((p) => (
                <button key={p} type="button"
                  className={`fv2-revenus-pill${budget === p ? " active" : ""}`}
                  onClick={() => setBudget(p)}>
                  {fmtK(p)}
                </button>
              ))}
            </div>
          </div>

          {/* Épargne actuelle */}
          <div style={{ marginBottom: 24 }}>
            <p className="fv2-field-label">Épargne actuelle disponible</p>
            <div className="fv2-revenus-input-row">
              <input
                type="number" className="fv2-revenus-input"
                value={epargne || ""} min={0} max={500000} step={1000}
                placeholder="20 000"
                onChange={(e) => setEpargne(Math.max(0, Number(e.target.value) || 0))}
              />
              <span className="fv2-revenus-unit">€</span>
            </div>
            <div className="fv2-revenus-pills">
              {EPARGNE_PILLS.map((p) => (
                <button key={p} type="button"
                  className={`fv2-revenus-pill${epargne === p ? " active" : ""}`}
                  onClick={() => setEpargne(p)}>
                  {fmtK(p)}
                </button>
              ))}
            </div>
          </div>

          {/* Capacité d'épargne mensuelle */}
          <div style={{ marginBottom: 8 }}>
            <p className="fv2-field-label">Capacité d'épargne mensuelle</p>
            <div className="fv2-revenus-input-row">
              <input
                type="number" className="fv2-revenus-input"
                value={capacite || ""} min={0} max={10000} step={50}
                placeholder="750"
                onChange={(e) => setCapacite(Math.max(0, Number(e.target.value) || 0))}
              />
              <span className="fv2-revenus-unit">€ / mois</span>
            </div>
            <div className="fv2-revenus-pills">
              {CAPACITE_PILLS.map((p) => (
                <button key={p} type="button"
                  className={`fv2-revenus-pill${capacite === p ? " active" : ""}`}
                  onClick={() => setCapacite(p)}>
                  {p.toLocaleString("fr-FR")} €
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Results card ── */}
        <div className="fv2-card" style={{ marginBottom: 20 }}>

          {/* Verdict */}
          <div className={`sv2-verdict ${verdictClass}`} style={{ marginBottom: 20 }}>
            <div className="sv2-verdict-label">Apport dans {horizon} mois</div>
            <div className="sv2-verdict-amount">{fmt(Math.round(res.apportFinal))}</div>
            <div className="sv2-verdict-sub">
              {res.pctAtteint.toFixed(1)} % du prix — {verdictLabel}
            </div>
          </div>

          {/* Scenarios */}
          <div className="sv2-scenarios" style={{ marginBottom: 20 }}>
            <div className={`sv2-scenario-card${res.apportAtteint10 ? " highlight" : ""}`}>
              <div className="sv2-scenario-dur">Objectif 10 %</div>
              <div className="sv2-scenario-amt" style={{ fontSize: 14 }}>{fmt(Math.round(res.objectif10))}</div>
              {res.apportAtteint10
                ? <div className="sv2-scenario-badge">Atteint ✓</div>
                : <div style={{ fontSize: 11, color: "#64748b", marginTop: 4 }}>
                    {res.moisPour10 !== null ? `Dans ${res.moisPour10} mois` : "—"}
                  </div>
              }
            </div>
            <div className={`sv2-scenario-card${res.apportAtteint20 ? " highlight" : ""}`}>
              <div className="sv2-scenario-dur">Objectif 20 %</div>
              <div className="sv2-scenario-amt" style={{ fontSize: 14 }}>{fmt(Math.round(res.objectif20))}</div>
              {res.apportAtteint20
                ? <div className="sv2-scenario-badge">Atteint ✓</div>
                : <div style={{ fontSize: 11, color: "#64748b", marginTop: 4 }}>
                    {res.moisPour20 !== null ? `Dans ${res.moisPour20} mois` : "—"}
                  </div>
              }
            </div>
          </div>

          {/* Bar chart */}
          <div style={{ height: 200, marginBottom: 16 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={res.chartData} barCategoryGap="25%">
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip content={<ChartTip />} />
                <Bar dataKey="valeur" radius={[6, 6, 0, 0]}>
                  {res.chartData.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Checklist */}
          <div style={{ marginBottom: 16 }}>
            <p className="fv2-field-label" style={{ marginBottom: 10 }}>Étapes vers votre achat</p>
            <div className="sv2-checklist">
              {CHECKLIST.map((item) => {
                const checked = item.autoCheck(res);
                return (
                  <div key={item.id} className="sv2-check-item">
                    <div className="sv2-check-box" style={{
                      background: checked ? "#1a56db" : "#f1f5f9",
                      borderColor: checked ? "#1a56db" : "#cbd5e1",
                    }}>
                      {checked && (
                        <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                          <path d="M2 5.5l2.5 2.5 5-5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                    <span className="sv2-check-text" style={{ color: checked ? "#0c1a35" : "#64748b" }}>
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Insight */}
          <div className="sv2-insight">
            En épargnant <strong>{fmt(capacite)}/mois</strong> pendant <strong>{horizon} mois</strong>,
            vous accumulerez <strong>{fmt(Math.round(capacite * horizon))}</strong> supplémentaires.
            {res.moisPour10 !== null && !res.apportAtteint10 && (
              <> Vous atteindrez les 10 % dans <strong>{res.moisPour10} mois</strong>.</>
            )}
            {res.moisPour20 !== null && !res.apportAtteint20 && (
              <> Les 20 % seront atteints dans <strong>{res.moisPour20} mois</strong>.</>
            )}
          </div>
        </div>

        <SimCrossSell
          show={res.apportAtteint10}
          loan={Math.round(budget - res.apportFinal)}
          taux={3.5}
          dureeCredit={20}
        />
      </div>
    </SimLayout>
  );
}
