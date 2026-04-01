import { useMemo, useState } from "react";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid, Legend,
} from "recharts";
import SimLayout from "./SimLayout";
import SimCrossSell from "./SimCrossSell";

/* ─── Formatters ─────────────────────────────────────────── */
const fmt = (v) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(v);
const fmtK = (v) =>
  v >= 1000 ? `${Math.round(v / 1000)}k €` : `${Math.round(v)} €`;

/* ─── Core calculation ───────────────────────────────────── */
function calcAssurance({ montant, duree, age, fumeur }) {
  const tauxBanque =
    0.0036 + (age > 45 ? 0.0004 * (age - 45) : 0) + (fumeur ? 0.0008 : 0);
  const tauxDelegation =
    0.0012 + (age > 45 ? 0.0002 * (age - 45) : 0) + (fumeur ? 0.0003 : 0);

  const coutBanqueAnnuel = montant * tauxBanque;
  const coutDelegationAnnuel = montant * tauxDelegation;
  const coutBanqueTotal = coutBanqueAnnuel * duree;
  const coutDelegationTotal = coutDelegationAnnuel * duree;
  const economie = coutBanqueTotal - coutDelegationTotal;
  const economieAnnuelle = coutBanqueAnnuel - coutDelegationAnnuel;
  const coutBanqueMensuel = coutBanqueAnnuel / 12;
  const coutDelegationMensuel = coutDelegationAnnuel / 12;

  const chartData = Array.from({ length: duree }, (_, i) => ({
    annee: `An ${i + 1}`,
    "Assurance banque (cumulée)": Math.round(coutBanqueAnnuel * (i + 1)),
    "Délégation (cumulée)": Math.round(coutDelegationAnnuel * (i + 1)),
    "Économies cumulées": Math.round(economieAnnuelle * (i + 1)),
  }));

  return {
    tauxBanque: tauxBanque * 100,
    tauxDelegation: tauxDelegation * 100,
    coutBanqueMensuel,
    coutDelegationMensuel,
    coutBanqueTotal,
    coutDelegationTotal,
    economie,
    economieAnnuelle,
    chartData,
  };
}

/* ─── Slider ─────────────────────────────────────────────── */
function Slider({ label, value, onChange, min, max, step = 1, format = String }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="fv2-slider-track-wrap" style={{ "--pct": `${pct}%` }}>
      <div className="fv2-slider-header">
        <span className="fv2-slider-label">{label}</span>
        <span className="fv2-slider-val">{format(value)}</span>
      </div>
      <input
        type="range" className="fv2-slider" min={min} max={max} step={step}
        value={value} onChange={(e) => onChange(Number(e.target.value))}
      />
      <div className="fv2-slider-fill" />
      <div className="fv2-slider-minmax">
        <span>{format(min)}</span>
        <span>{format(max)}</span>
      </div>
    </div>
  );
}

/* ─── Chart Tooltip ──────────────────────────────────────── */
function ChartTip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="chart-tooltip">
      <p className="chart-tooltip-label">{label}</p>
      {payload.map((p) => (
        <div key={p.dataKey} className="chart-tooltip-row">
          <span style={{ color: p.stroke || p.fill }}>{p.name}</span>
          <span>{fmt(p.value)}</span>
        </div>
      ))}
    </div>
  );
}

/* ─── Component ──────────────────────────────────────────── */
export default function SimAssurancePret() {
  const [s, setS] = useState({
    montant: 200000,
    duree: 20,
    age: 35,
    fumeur: false,
  });
  const set = (k) => (val) => setS((prev) => ({ ...prev, [k]: val }));

  const res = useMemo(() => calcAssurance(s), [s]);

  return (
    <SimLayout
      icon="🛡️"
      title="Économisez sur votre assurance emprunteur"
      description="Comparez l'assurance de votre banque avec la délégation d'assurance"
      suggestions={[
        "/simulateurs/pret-immobilier",
        "/simulateurs/remboursement-anticipe",
        "/simulateurs/endettement",
      ]}
    >
      <div className="sv2-container">

        {/* ── Inputs ── */}
        <div className="fv2-card">
          <p className="fv2-card-kicker">Votre emprunt</p>
          <h2 className="fv2-card-title">Renseignez votre profil</h2>

          {/* Montant emprunté */}
          <div style={{ marginBottom: 20 }}>
            <label className="fv2-field-label">Montant emprunté</label>
            <div className="fv2-revenus-input-row">
              <div className="fv2-revenus-wrap">
                <input
                  type="number" className="fv2-revenus-input"
                  value={s.montant}
                  onChange={(e) => set("montant")(Number(e.target.value))}
                />
                <span className="fv2-revenus-unit">€</span>
              </div>
            </div>
            <div className="fv2-revenus-pills">
              {[100000, 150000, 200000, 250000, 300000].map((p) => (
                <button key={p} type="button"
                  className={`fv2-revenus-pill${s.montant === p ? " active" : ""}`}
                  onClick={() => set("montant")(p)}>
                  {fmtK(p)}
                </button>
              ))}
            </div>
          </div>

          {/* Durée */}
          <div style={{ marginBottom: 20 }}>
            <label className="fv2-field-label">Durée du crédit</label>
            <div className="fv2-choices-row">
              {[10, 15, 20, 25].map((d) => (
                <button key={d} type="button"
                  className={`fv2-choice${s.duree === d ? " fv2-choice-active" : ""}`}
                  onClick={() => set("duree")(d)}>
                  {d} ans
                </button>
              ))}
            </div>
          </div>

          {/* Âge */}
          <div style={{ marginBottom: 20 }}>
            <Slider
              label="Votre âge"
              value={s.age}
              onChange={set("age")}
              min={18} max={70} step={1}
              format={(v) => `${v} ans`}
            />
            <div className="fv2-revenus-pills" style={{ marginTop: 6 }}>
              {[25, 30, 35, 40, 45, 50].map((p) => (
                <button key={p} type="button"
                  className={`fv2-revenus-pill${s.age === p ? " active" : ""}`}
                  onClick={() => set("age")(p)}>
                  {p} ans
                </button>
              ))}
            </div>
          </div>

          {/* Fumeur */}
          <div>
            <label className="fv2-field-label">Tabagisme</label>
            <div className="fv2-choices-row">
              <button type="button"
                className={`fv2-choice${!s.fumeur ? " fv2-choice-active" : ""}`}
                onClick={() => set("fumeur")(false)}>
                🚭 Non-fumeur
              </button>
              <button type="button"
                className={`fv2-choice${s.fumeur ? " fv2-choice-active" : ""}`}
                onClick={() => set("fumeur")(true)}>
                🚬 Fumeur
              </button>
            </div>
            <p className="fv2-hint">Le tabagisme majore la prime d'assurance de 25–50 %</p>
          </div>
        </div>

        {/* ── Results ── */}
        {res && (
          <>
            {/* Verdict */}
            <div className="sv2-verdict sv2-verdict-green">
              <p className="sv2-verdict-label">Vous pouvez économiser jusqu'à</p>
              <p className="sv2-verdict-amount">{fmt(res.economie)}</p>
              <p className="sv2-verdict-sub">
                sur la durée de votre crédit ({s.duree} ans)
              </p>
            </div>

            {/* Comparison table */}
            <div className="sv2-compare-table" style={{ marginTop: 16 }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: "left", padding: "8px 10px", fontSize: 12, color: "#64748b", fontWeight: 600 }}></th>
                    <th style={{ textAlign: "right", padding: "8px 10px", fontSize: 13, fontWeight: 700, color: "#dc2626" }}>Assurance banque</th>
                    <th style={{ textAlign: "right", padding: "8px 10px", fontSize: 13, fontWeight: 700, color: "#059669" }}>Délégation</th>
                    <th style={{ textAlign: "right", padding: "8px 10px", fontSize: 13, fontWeight: 700, color: "#2563eb" }}>Économie</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      label: "Taux (TAEA)",
                      v1: `${res.tauxBanque.toFixed(3)} %`,
                      v2: `${res.tauxDelegation.toFixed(3)} %`,
                      eco: `-${(res.tauxBanque - res.tauxDelegation).toFixed(3)} %`,
                    },
                    {
                      label: "Mensualité assurance",
                      v1: fmt(res.coutBanqueMensuel),
                      v2: fmt(res.coutDelegationMensuel),
                      eco: `${fmt(res.coutBanqueMensuel - res.coutDelegationMensuel)}/mois`,
                      highlight: true,
                    },
                    {
                      label: `Coût total (${s.duree} ans)`,
                      v1: fmt(res.coutBanqueTotal),
                      v2: fmt(res.coutDelegationTotal),
                      eco: fmt(res.economie),
                      bold: true,
                    },
                  ].map(({ label, v1, v2, eco, highlight, bold }) => (
                    <tr key={label} style={{
                      background: highlight ? "#f8faff" : "transparent",
                      borderBottom: "1px solid #f1f5f9",
                    }}>
                      <td style={{ padding: "9px 10px", fontSize: 13, color: "#64748b" }}>{label}</td>
                      <td style={{ padding: "9px 10px", fontSize: 13, fontWeight: bold ? 700 : 500, textAlign: "right", color: "#dc2626" }}>{v1}</td>
                      <td style={{ padding: "9px 10px", fontSize: 13, fontWeight: bold ? 700 : 500, textAlign: "right", color: "#059669" }}>{v2}</td>
                      <td style={{ padding: "9px 10px", fontSize: 13, fontWeight: bold ? 700 : 500, textAlign: "right", color: "#2563eb" }}>{eco}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Area chart */}
            <div className="fv2-card" style={{ marginTop: 16 }}>
              <p className="fv2-card-kicker">Évolution dans le temps</p>
              <p className="fv2-card-title" style={{ fontSize: 15, marginBottom: 12 }}>
                Coûts cumulés : banque vs délégation
              </p>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={res.chartData} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="gradBanque" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#dc2626" stopOpacity={0.25} />
                      <stop offset="100%" stopColor="#dc2626" stopOpacity={0.02} />
                    </linearGradient>
                    <linearGradient id="gradDeleg" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#059669" stopOpacity={0.25} />
                      <stop offset="100%" stopColor="#059669" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="annee" tick={{ fontSize: 10 }} interval={Math.floor(s.duree / 5)} />
                  <YAxis tick={{ fontSize: 10 }} tickFormatter={fmtK} />
                  <Tooltip content={<ChartTip />} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Area
                    type="monotone" dataKey="Assurance banque (cumulée)" stroke="#dc2626" strokeWidth={2}
                    fill="url(#gradBanque)" name="Assurance banque (cumulée)"
                  />
                  <Area
                    type="monotone" dataKey="Délégation (cumulée)" stroke="#059669" strokeWidth={2}
                    fill="url(#gradDeleg)" name="Délégation (cumulée)"
                  />
                  <Area
                    type="monotone" dataKey="Économies cumulées" stroke="#2563eb" strokeWidth={2}
                    fill="none" strokeDasharray="4 3" name="Économies cumulées"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Insight */}
            <div className="sv2-insight">
              <p>
                💡 En changeant d'assurance, vous économisez{" "}
                <strong style={{ color: "#059669" }}>{fmt(res.economieAnnuelle)} par an</strong> soit{" "}
                <strong>{fmt(res.coutBanqueMensuel - res.coutDelegationMensuel)} par mois</strong>. La délégation d'assurance est un droit depuis la loi Lemoine 2022.
              </p>
            </div>

            {/* Info box */}
            <div className="sv2-assurance-info">
              🔑 Depuis la loi Lemoine (2022), vous pouvez changer d'assurance emprunteur à tout moment, sans frais ni justification. Votre banque ne peut pas refuser si les garanties sont équivalentes.
            </div>

            {/* Cross-sell */}
            <SimCrossSell
              show={s.montant > 0}
              loan={s.montant}
              taux={3.5}
              dureeCredit={s.duree}
            />
          </>
        )}
      </div>
    </SimLayout>
  );
}
