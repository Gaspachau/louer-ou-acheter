import { useState, useMemo } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid, Cell, ReferenceLine,
} from "recharts";
import SimLayout from "./SimLayout";
import SimCrossSell from "./SimCrossSell";

const fmt = (v) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(v);
const fmtK = (v) => (v >= 1000 ? `${Math.round(v / 1000)}k €` : `${Math.round(v)} €`);
const fmtPct = (v) => `${v.toFixed(2)} %`;

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

function mortgage(p, r, y) {
  if (p <= 0 || y <= 0) return 0;
  const mr = r / 100 / 12;
  if (mr === 0) return p / (y * 12);
  return (p * mr) / (1 - Math.pow(1 + mr, -(y * 12)));
}

function calcRenta(v) {
  const fraisNotaire = v.prix * 0.08;
  const coutTotal = v.prix + fraisNotaire;
  const loyerAnnuel = v.loyer * 12;
  const chargesAnnuelles = v.taxeFonciere + v.chargesCopro + v.assurancePNO + v.entretien;

  const rentaBrute = coutTotal > 0 ? (loyerAnnuel / coutTotal) * 100 : 0;
  const loyerNet = loyerAnnuel - chargesAnnuelles;
  const rentaNette = coutTotal > 0 ? (loyerNet / coutTotal) * 100 : 0;

  // Net-net: after 30% flat tax on rental income
  const impot = loyerNet > 0 ? loyerNet * 0.3 : 0;
  const loyerNetNet = loyerNet - impot;
  const rentaNetNette = coutTotal > 0 ? (loyerNetNet / coutTotal) * 100 : 0;

  // Cashflow
  let mensualiteCredit = 0;
  if (v.financement === "credit") {
    const capital = Math.max(0, v.prix - v.apport);
    mensualiteCredit = mortgage(capital, v.taux, v.duree);
  }
  const cashflowMensuel = v.loyer - chargesAnnuelles / 12 - mensualiteCredit;

  // 20-year evolution
  const chartData = [];
  for (let yr = 1; yr <= 20; yr++) {
    const loyerYr = v.loyer * Math.pow(1.015, yr);
    const chYr = chargesAnnuelles * Math.pow(1.02, yr);
    const mensCredit = yr <= v.duree ? mensualiteCredit : 0;
    const cashflow = loyerYr - chYr / 12 - mensCredit;
    chartData.push({ annee: `An ${yr}`, cashflow: Math.round(cashflow) });
  }

  return {
    rentaBrute, rentaNette, rentaNetNette,
    cashflowMensuel, loyerNet, loyerNetNet,
    chargesAnnuelles, mensualiteCredit,
    fraisNotaire, coutTotal, chartData, impot,
  };
}

export default function SimRentabiliteLocative() {
  const [v, setV] = useState({
    prix: 150000,
    loyer: 700,
    taxeFonciere: 900,
    chargesCopro: 1500,
    assurancePNO: 250,
    entretien: 500,
    financement: "credit",
    apport: 30000,
    taux: 3.5,
    duree: 20,
  });
  const set = (k) => (val) => setV((s) => ({ ...s, [k]: val }));

  const res = useMemo(() => calcRenta(v), [v]);

  const rentaBruteColor = res.rentaBrute > 5 ? "#059669" : res.rentaBrute >= 3 ? "#d97706" : "#dc2626";
  const rentaNetteColor = res.rentaNette > 5 ? "#059669" : res.rentaNette >= 3 ? "#d97706" : "#dc2626";
  const rentaNetNetteColor = res.rentaNetNette > 4 ? "#059669" : res.rentaNetNette >= 2 ? "#d97706" : "#dc2626";

  const loyerAnnuel = v.loyer * 12;
  const rentaBruteInstant = v.prix > 0 ? (loyerAnnuel / v.prix) * 100 : 0;

  const apportPct = v.prix > 0 ? Math.min(100, (v.apport / v.prix) * 100) : 0;
  const tauxPct = Math.min(100, ((v.taux - 0.5) / (7 - 0.5)) * 100);

  const loanAmount = Math.max(0, v.prix - v.apport);

  return (
    <SimLayout
      icon="🏘️"
      title="Calculez la rentabilité de votre investissement locatif"
      description="Rendement brut, net et net-net avec cashflow mensuel"
      suggestions={[
        "/simulateurs/pret-immobilier",
        "/simulateurs/frais-notaire",
        "/simulateurs/comparateur-villes",
      ]}
    >
      <div className="sv2-container">
        {/* ── Inputs ── */}
        <div className="fv2-card">
          <p className="fv2-card-kicker">Paramètres</p>
          <h2 className="fv2-card-title">Votre investissement locatif</h2>

          {/* 1 – Prix d'achat */}
          <div className="fv2-revenus-wrap" style={{ marginTop: 20 }}>
            <p className="fv2-field-label">Prix d'achat</p>
            <div className="fv2-revenus-input-row">
              <input
                type="number"
                className="fv2-revenus-input"
                value={v.prix || ""}
                min={0} max={2000000} step={5000}
                onChange={(e) =>
                  set("prix")(Math.max(0, Math.min(2000000, Number(e.target.value) || 0)))
                }
              />
              <span className="fv2-revenus-unit">€</span>
            </div>
            <Pills
              value={v.prix}
              options={[100000, 150000, 200000, 250000, 300000]}
              onChange={set("prix")}
              format={(o) => `${o / 1000}k €`}
            />
            <p className="fv2-hint">
              Frais de notaire inclus (~8 %) : <strong>{fmt(v.prix * 0.08)}</strong> — Coût total : <strong>{fmt(v.prix * 1.08)}</strong>
            </p>
          </div>

          {/* 2 – Loyer mensuel */}
          <div className="fv2-revenus-wrap" style={{ marginTop: 20 }}>
            <p className="fv2-field-label">Loyer mensuel attendu</p>
            <div className="fv2-revenus-input-row">
              <input
                type="number"
                className="fv2-revenus-input"
                value={v.loyer || ""}
                min={0} max={10000} step={50}
                onChange={(e) =>
                  set("loyer")(Math.max(0, Math.min(10000, Number(e.target.value) || 0)))
                }
              />
              <span className="fv2-revenus-unit">€/mois</span>
            </div>
            <Pills
              value={v.loyer}
              options={[500, 700, 900, 1100, 1500]}
              onChange={set("loyer")}
              format={(o) => `${o} €`}
            />
            {v.prix > 0 && v.loyer > 0 && (
              <p className="fv2-hint">
                Rendement brut immédiat :{" "}
                <strong style={{ color: rentaBruteInstant > 5 ? "#059669" : rentaBruteInstant >= 3 ? "#d97706" : "#dc2626" }}>
                  {rentaBruteInstant.toFixed(2)} %
                </strong>
              </p>
            )}
          </div>

          {/* 3 – Charges annuelles */}
          <div style={{ marginTop: 20 }}>
            <p className="fv2-field-label">Charges annuelles</p>
            <div className="sv2-charges-grid" style={{ marginTop: 8 }}>
              {[
                { key: "taxeFonciere",  label: "Taxe foncière" },
                { key: "chargesCopro", label: "Charges copro" },
                { key: "assurancePNO", label: "Assurance PNO" },
                { key: "entretien",    label: "Entretien" },
              ].map(({ key, label }) => (
                <div key={key} className="sv2-charge-item">
                  <label className="sv2-charge-item-label">{label}</label>
                  <div className="fv2-revenus-input-row" style={{ marginTop: 4 }}>
                    <input
                      type="number"
                      className="fv2-revenus-input"
                      value={v[key] || ""}
                      min={0} max={20000} step={50}
                      onChange={(e) =>
                        set(key)(Math.max(0, Math.min(20000, Number(e.target.value) || 0)))
                      }
                    />
                    <span className="fv2-revenus-unit">€/an</span>
                  </div>
                </div>
              ))}
            </div>
            <p className="fv2-hint">
              Total charges : <strong>{fmt(v.taxeFonciere + v.chargesCopro + v.assurancePNO + v.entretien)}/an</strong>
              {" "}— soit <strong>{fmt((v.taxeFonciere + v.chargesCopro + v.assurancePNO + v.entretien) / 12)}/mois</strong>
            </p>
          </div>

          {/* 4 – Financement */}
          <div style={{ marginTop: 20 }}>
            <p className="fv2-field-label">Mode de financement</p>
            <div className="fv2-choices-row" style={{ marginTop: 8 }}>
              {[
                { id: "credit",  label: "À crédit" },
                { id: "comptant", label: "Comptant" },
              ].map((f) => (
                <button
                  key={f.id}
                  type="button"
                  className={`fv2-choice${v.financement === f.id ? " fv2-choice-active" : ""}`}
                  onClick={() => set("financement")(f.id)}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {v.financement === "credit" && (
            <>
              {/* Apport slider */}
              <div className="fv2-apport-wrap" style={{ marginTop: 16 }}>
                <div className="fv2-apport-header">
                  <span className="fv2-apport-label">Apport personnel</span>
                  <span className="fv2-apport-bigval">{fmt(v.apport)}</span>
                </div>
                <span className={`fv2-apport-badge ${apportPct >= 20 ? "fv2-apport-badge-good" : "fv2-apport-badge-warn"}`}>
                  {apportPct.toFixed(0)} % du prix
                </span>
                <div
                  className="fv2-slider-track-wrap"
                  style={{ "--pct": `${Math.min(100, (v.apport / v.prix) * 100)}%` }}
                >
                  <input
                    type="range"
                    className="fv2-slider"
                    min={0}
                    max={Math.min(v.prix, 500000)}
                    step={5000}
                    value={v.apport}
                    onChange={(e) => set("apport")(Number(e.target.value))}
                  />
                  <div className="fv2-slider-fill" />
                </div>
                <div className="fv2-slider-minmax">
                  <span>0 €</span>
                  <span>{fmt(Math.min(v.prix, 500000))}</span>
                </div>
                <p className="fv2-hint">Capital à emprunter : <strong>{fmt(loanAmount)}</strong></p>
              </div>

              {/* Taux slider */}
              <div style={{ marginTop: 16 }}>
                <div className="fv2-slider-header">
                  <span className="fv2-slider-label">Taux d'intérêt</span>
                  <span className="fv2-slider-val">{v.taux.toFixed(1)} %</span>
                </div>
                <div className="fv2-slider-track-wrap" style={{ "--pct": `${tauxPct}%` }}>
                  <input
                    type="range"
                    className="fv2-slider"
                    min={0.5} max={7} step={0.1}
                    value={v.taux}
                    onChange={(e) => set("taux")(Number(e.target.value))}
                  />
                  <div className="fv2-slider-fill" />
                </div>
                <div className="fv2-slider-minmax">
                  <span>0,5 %</span>
                  <span>7 %</span>
                </div>
              </div>

              {/* Durée pills */}
              <div style={{ marginTop: 16 }}>
                <p className="fv2-field-label">Durée du crédit</p>
                <div className="fv2-revenus-pills" style={{ marginTop: 8 }}>
                  {[15, 20, 25].map((d) => (
                    <button
                      key={d}
                      type="button"
                      className={`fv2-revenus-pill${v.duree === d ? " active" : ""}`}
                      onClick={() => set("duree")(d)}
                    >
                      {d} ans
                    </button>
                  ))}
                </div>
                {loanAmount > 0 && (
                  <p className="fv2-hint">
                    Mensualité crédit : <strong>{fmt(mortgage(loanAmount, v.taux, v.duree))}/mois</strong>
                  </p>
                )}
              </div>
            </>
          )}
        </div>

        {/* ── Results ── */}
        {v.prix > 0 && v.loyer > 0 && (
          <div className="fv2-card" style={{ marginTop: 16 }}>
            {/* Rendement cards */}
            <div className="sv2-rendement-cards" style={{ marginTop: 4 }}>
              <div className="sv2-rendement-card">
                <span className="sv2-rendement-card-label">Brut</span>
                <span className="sv2-rendement-card-value" style={{ color: rentaBruteColor }}>
                  {fmtPct(res.rentaBrute)}
                </span>
                <span className="sv2-rendement-card-sub">Avant charges</span>
              </div>
              <div className="sv2-rendement-card">
                <span className="sv2-rendement-card-label">Net</span>
                <span className="sv2-rendement-card-value" style={{ color: rentaNetteColor }}>
                  {fmtPct(res.rentaNette)}
                </span>
                <span className="sv2-rendement-card-sub">Après charges</span>
              </div>
              <div className="sv2-rendement-card">
                <span className="sv2-rendement-card-label">Net-net</span>
                <span className="sv2-rendement-card-value" style={{ color: rentaNetNetteColor }}>
                  {fmtPct(res.rentaNetNette)}
                </span>
                <span className="sv2-rendement-card-sub">Après impôts (30 %)</span>
              </div>
            </div>

            {/* Cashflow card */}
            <div
              style={{
                marginTop: 16,
                padding: "14px 16px",
                borderRadius: 12,
                background: res.cashflowMensuel >= 0 ? "rgba(5,150,105,.08)" : "rgba(220,38,38,.08)",
                border: `1px solid ${res.cashflowMensuel >= 0 ? "rgba(5,150,105,.2)" : "rgba(220,38,38,.2)"}`,
              }}
            >
              <p className="fv2-field-label">Cashflow mensuel</p>
              <p style={{ fontSize: 28, fontWeight: 800, color: res.cashflowMensuel >= 0 ? "#059669" : "#dc2626", marginTop: 4 }}>
                {res.cashflowMensuel >= 0 ? "+" : ""}{fmt(res.cashflowMensuel)}/mois
              </p>
              <p className="fv2-hint" style={{ marginTop: 4 }}>
                Loyer {fmt(v.loyer)} − charges {fmt(res.chargesAnnuelles / 12)}/mois
                {v.financement === "credit" ? ` − mensualité crédit ${fmt(res.mensualiteCredit)}/mois` : ""}
              </p>
            </div>

            {/* Cashflow evolution chart */}
            <div style={{ marginTop: 24 }}>
              <div className="fv2-slider-header">
                <span className="fv2-slider-label">Évolution du cashflow sur 20 ans</span>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={res.chartData} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f2" vertical={false} />
                  <XAxis
                    dataKey="annee"
                    tick={{ fontSize: 10, fill: "#5e6e88" }}
                    axisLine={false}
                    tickLine={false}
                    interval={3}
                  />
                  <YAxis
                    tickFormatter={fmtK}
                    tick={{ fontSize: 10, fill: "#5e6e88" }}
                    axisLine={false}
                    tickLine={false}
                    width={52}
                  />
                  <Tooltip content={<ChartTip />} cursor={{ fill: "rgba(0,0,0,.04)" }} />
                  <ReferenceLine y={0} stroke="#94a3b8" strokeDasharray="4 2" />
                  <Bar dataKey="cashflow" name="Cashflow" radius={[4, 4, 0, 0]} barSize={14}>
                    {res.chartData.map((entry, i) => (
                      <Cell key={i} fill={entry.cashflow >= 0 ? "#10b981" : "#ef4444"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Comparison table */}
            <div style={{ marginTop: 24 }}>
              <div className="fv2-slider-header">
                <span className="fv2-slider-label">Comparaison avec d'autres placements</span>
              </div>
              <table className="sv2-compare-table" style={{ marginTop: 8 }}>
                <thead>
                  <tr>
                    <th>Investissement</th>
                    <th>Rendement</th>
                    <th>Gain annuel</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="emphasis">
                    <td>Locatif (net-net)</td>
                    <td>{fmtPct(res.rentaNetNette)}</td>
                    <td className={res.loyerNetNet > 0 ? "good" : ""}>{fmt(res.loyerNetNet)}</td>
                  </tr>
                  <tr>
                    <td>Livret A</td>
                    <td>1,50 %</td>
                    <td>{fmt(res.coutTotal * 0.015)}</td>
                  </tr>
                  <tr>
                    <td>ETF monde</td>
                    <td>7,00 %</td>
                    <td className="good">{fmt(res.coutTotal * 0.07)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Insight */}
            <div className="sv2-insight" style={{ marginTop: 20 }}>
              Cet investissement vous rapporte{" "}
              <strong>{fmt(res.loyerNetNet)}</strong> nets par an après charges et impôts, soit un
              rendement net-net de <strong>{fmtPct(res.rentaNetNette)}</strong>.
              {res.cashflowMensuel < 0 && (
                <span>
                  {" "}Attention : le cashflow est négatif ({fmt(res.cashflowMensuel)}/mois) — vous devrez compléter de votre poche.
                </span>
              )}
            </div>
          </div>
        )}

        <SimCrossSell
          show={v.prix > 0}
          loan={loanAmount}
          taux={v.taux}
          dureeCredit={v.duree}
        />
      </div>
    </SimLayout>
  );
}
