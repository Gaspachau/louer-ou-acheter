import { useState, useMemo } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid, Legend, ReferenceLine,
} from "recharts";
import SimLayout from "./SimLayout";
import SimCrossSell from "./SimCrossSell";

const fmt = (v) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(v);
const fmtK = (v) => (v >= 1000 ? `${Math.round(v / 1000)}k €` : `${Math.round(v)} €`);

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

const DPE_DATA = {
  A: { label: "A", color: "#008000", textColor: "#fff", decote: 0,    chauffageAnnuel: 400,  description: "Très performant" },
  B: { label: "B", color: "#33a000", textColor: "#fff", decote: 0,    chauffageAnnuel: 600,  description: "Performant" },
  C: { label: "C", color: "#7ab000", textColor: "#fff", decote: 0,    chauffageAnnuel: 900,  description: "Bon" },
  D: { label: "D", color: "#f0d000", textColor: "#000", decote: 0.03, chauffageAnnuel: 1400, description: "Correct" },
  E: { label: "E", color: "#f0a000", textColor: "#fff", decote: 0.07, chauffageAnnuel: 2200, description: "Médiocre" },
  F: { label: "F", color: "#e06000", textColor: "#fff", decote: 0.12, chauffageAnnuel: 3500, description: "Passoire — interdit à la location depuis 2025" },
  G: { label: "G", color: "#c00000", textColor: "#fff", decote: 0.17, chauffageAnnuel: 5000, description: "Passoire — bientôt inconstructible" },
};

function dpeApresTraux(dpeCurrent, travaux) {
  const order = ["G", "F", "E", "D", "C", "B", "A"];
  const idx = order.indexOf(dpeCurrent);
  const amelio = travaux >= 50000 ? 3 : travaux >= 30000 ? 2 : travaux >= 15000 ? 1 : 0;
  return order[Math.min(order.length - 1, idx + amelio)];
}

function calcDPE({ prix, dpe, travaux }) {
  const data = DPE_DATA[dpe];
  const decote = prix * data.decote;
  const prixReel = prix - decote;
  const chargesAnnuellesActuelles = data.chauffageAnnuel;

  const dpeApres = dpeApresTraux(dpe, travaux);
  const dataApres = DPE_DATA[dpeApres];
  const economieCharges = chargesAnnuellesActuelles - dataApres.chauffageAnnuel;
  const decoteApres = prix * dataApres.decote;
  const gainValeur = decote - decoteApres;

  const gainAnnuel = economieCharges + gainValeur / 20;
  const roiAns = gainAnnuel > 0 ? travaux / gainAnnuel : Infinity;

  const chartData = Array.from({ length: 21 }, (_, yr) => ({
    annee: `An ${yr}`,
    "Économies cumulées": Math.round(economieCharges * yr + (yr > 0 ? gainValeur : 0)),
    "Coût travaux": travaux,
  }));

  return {
    decote, prixReel, chargesAnnuellesActuelles, dpeApres, dataApres,
    economieCharges, gainValeur, roiAns, chartData,
  };
}

export default function SimImpactDPE() {
  const [v, setV] = useState({ prix: 250000, dpe: "D", travaux: 0 });
  const set = (k) => (val) => setV((s) => ({ ...s, [k]: val }));

  const res = useMemo(() => calcDPE(v), [v]);
  const currentDpeData = DPE_DATA[v.dpe];
  const hasDecote = currentDpeData.decote > 0;
  const hasTravaux = v.travaux > 0;

  return (
    <SimLayout
      icon="♻️"
      title="Mesurez l'impact du DPE sur votre achat"
      description="Décote passoire thermique et retour sur investissement des travaux"
      simTime="2 min"
      suggestions={[
        "/simulateurs/frais-notaire",
        "/simulateurs/pret-immobilier",
        "/simulateurs/plus-value",
      ]}
    >
      <div className="sv2-container">
        {/* ── Inputs ── */}
        <div className="fv2-card">
          <p className="fv2-card-kicker">Paramètres</p>
          <h2 className="fv2-card-title">Votre bien immobilier</h2>

          {/* 1 – Prix */}
          <div className="fv2-revenus-wrap" style={{ marginTop: 20 }}>
            <p className="fv2-field-label">Prix du bien</p>
            <div className="fv2-revenus-input-row">
              <input
                type="number"
                className="fv2-revenus-input"
                value={v.prix || ""}
                min={0} max={2000000} step={5000}
                onChange={(e) => set("prix")(Math.max(0, Math.min(2000000, Number(e.target.value) || 0)))}
              />
              <span className="fv2-revenus-unit">€</span>
            </div>
            <Pills
              value={v.prix}
              options={[150000, 200000, 250000, 300000, 400000]}
              onChange={set("prix")}
              format={(o) => `${o / 1000}k€`}
            />
          </div>

          {/* 2 – DPE selector */}
          <div style={{ marginTop: 20 }}>
            <p className="fv2-field-label">DPE actuel du bien</p>
            <div className="sv2-dpe-selector" style={{ marginTop: 8 }}>
              {Object.values(DPE_DATA).map((d) => (
                <button
                  key={d.label}
                  type="button"
                  className={`sv2-dpe-btn${v.dpe === d.label ? " active" : ""}`}
                  style={{ background: d.color, color: d.textColor }}
                  onClick={() => set("dpe")(d.label)}
                  aria-pressed={v.dpe === d.label}
                >
                  {d.label}
                </button>
              ))}
            </div>
            <p className="sv2-dpe-info">
              <span
                className="sv2-dpe-badge"
                style={{ background: currentDpeData.color, color: currentDpeData.textColor, marginRight: 6 }}
              >
                {v.dpe}
              </span>
              {currentDpeData.description}
              {currentDpeData.decote > 0 && (
                <span style={{ marginLeft: 6, color: "#ef4444", fontWeight: 600 }}>
                  — décote estimée {(currentDpeData.decote * 100).toFixed(0)} %
                </span>
              )}
            </p>
          </div>

          {/* 3 – Travaux */}
          <div style={{ marginTop: 20 }}>
            <div className="fv2-slider-header">
              <span className="fv2-slider-label">Travaux de rénovation envisagés</span>
              <span className="fv2-slider-val">{fmt(v.travaux)}</span>
            </div>
            <div
              className="fv2-slider-track-wrap"
              style={{ "--pct": `${(v.travaux / 100000) * 100}%` }}
            >
              <input
                type="range"
                className="fv2-slider"
                min={0} max={100000} step={5000}
                value={v.travaux}
                onChange={(e) => set("travaux")(Number(e.target.value))}
              />
              <div className="fv2-slider-fill" />
            </div>
            <div className="fv2-slider-minmax"><span>0 €</span><span>100 000 €</span></div>
            <Pills
              value={v.travaux}
              options={[0, 10000, 20000, 30000, 50000]}
              onChange={set("travaux")}
              format={(o) => (o === 0 ? "Sans travaux" : `${o / 1000}k€`)}
            />
            {hasTravaux && (
              <div style={{ marginTop: 8 }}>
                <p className="fv2-hint">
                  DPE estimé après travaux :{" "}
                  <span
                    className="sv2-dpe-badge"
                    style={{
                      background: DPE_DATA[res.dpeApres].color,
                      color: DPE_DATA[res.dpeApres].textColor,
                      marginLeft: 4,
                    }}
                  >
                    {res.dpeApres}
                  </span>
                </p>
                {res.economieCharges > 0 && (
                  <p className="fv2-hint" style={{ marginTop: 4 }}>
                    Économie d'énergie estimée : <strong style={{ color: "#059669" }}>{fmt(res.economieCharges)}/an</strong>
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* ── Results ── */}
        {v.prix > 0 && (
          <div className="fv2-card" style={{ marginTop: 16 }}>
            {/* DPE Verdict */}
            <div
              className={`sv2-verdict ${
                !hasDecote ? "sv2-verdict-green" : v.dpe === "F" || v.dpe === "G" ? "sv2-verdict-red" : "sv2-verdict-amber"
              }`}
            >
              {hasDecote ? (
                <>
                  <p className="sv2-verdict-label">Décote estimée liée au DPE {v.dpe}</p>
                  <p className="sv2-verdict-amount">− {fmt(res.decote)}</p>
                  <p className="sv2-verdict-sub">
                    Ce bien vaut réellement {fmt(res.prixReel)} à cause de son DPE {v.dpe}
                  </p>
                </>
              ) : (
                <>
                  <p className="sv2-verdict-label">Aucune décote liée au DPE ✓</p>
                  <p className="sv2-verdict-amount">{fmt(v.prix)}</p>
                  <p className="sv2-verdict-sub">Ce bien a un bon diagnostic énergétique</p>
                </>
              )}
            </div>

            {/* 3 cards */}
            <div className="sim-stats-grid" style={{ marginTop: 20 }}>
              <div className="sim-stat-card">
                <span className="sim-stat-card-label">Décote DPE</span>
                <span className="sim-stat-card-value" style={{ color: hasDecote ? "#dc2626" : "#059669" }}>
                  {hasDecote ? `− ${fmt(res.decote)}` : "Aucune"}
                </span>
              </div>
              <div className="sim-stat-card sim-stat-card-blue">
                <span className="sim-stat-card-label">Charges annuelles</span>
                <span className="sim-stat-card-value">{fmt(res.chargesAnnuellesActuelles)}/an</span>
              </div>
              <div className="sim-stat-card">
                <span className="sim-stat-card-label">Prix réel (avec travaux)</span>
                <span className="sim-stat-card-value">{fmt(res.prixReel + v.travaux)}</span>
              </div>
            </div>

            {/* Après travaux section */}
            {hasTravaux && res.dpeApres !== v.dpe && (
              <div style={{ marginTop: 20 }}>
                <p className="fv2-field-label" style={{ marginBottom: 12 }}>Après travaux ({fmt(v.travaux)})</p>
                <div className="sv2-line-items">
                  <div className="sv2-line-item">
                    <div className="sv2-line-item-row">
                      <span className="sv2-line-item-label">DPE estimé après travaux</span>
                      <span className="sv2-line-item-amount">
                        <span
                          className="sv2-dpe-badge"
                          style={{ background: res.dataApres.color, color: res.dataApres.textColor }}
                        >
                          {res.dpeApres}
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="sv2-line-item">
                    <div className="sv2-line-item-row">
                      <span className="sv2-line-item-label">Gain sur la valeur du bien</span>
                      <span className="sv2-line-item-amount" style={{ color: "#059669" }}>
                        + {fmt(res.gainValeur)}
                      </span>
                    </div>
                  </div>
                  <div className="sv2-line-item">
                    <div className="sv2-line-item-row">
                      <span className="sv2-line-item-label">Économie charges/an</span>
                      <span className="sv2-line-item-amount" style={{ color: "#059669" }}>
                        {fmt(res.economieCharges)}/an
                      </span>
                    </div>
                  </div>
                  <div className="sv2-line-item">
                    <div className="sv2-line-item-row">
                      <span className="sv2-line-item-label">Retour sur investissement</span>
                      <span className="sv2-line-item-amount" style={{ color: "#1a56db", fontWeight: 700 }}>
                        {isFinite(res.roiAns)
                          ? `${res.roiAns < 1 ? "< 1 an" : `${res.roiAns.toFixed(1)} ans`}`
                          : "—"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Chart */}
            {hasTravaux && v.travaux > 0 && res.chartData.length > 1 && (
              <div style={{ marginTop: 24 }}>
                <div className="fv2-slider-header">
                  <span className="fv2-slider-label">Rentabilisation des travaux dans le temps</span>
                </div>
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={res.chartData} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f2" vertical={false} />
                    <XAxis
                      dataKey="annee"
                      tick={{ fontSize: 10, fill: "#5e6e88" }}
                      axisLine={false}
                      tickLine={false}
                      interval="preserveStartEnd"
                    />
                    <YAxis
                      tickFormatter={fmtK}
                      tick={{ fontSize: 10, fill: "#5e6e88" }}
                      axisLine={false}
                      tickLine={false}
                      width={52}
                    />
                    <Tooltip content={<ChartTip />} />
                    <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} iconType="circle" iconSize={8} />
                    <Line
                      type="monotone"
                      dataKey="Coût travaux"
                      stroke="#ef4444"
                      strokeWidth={2}
                      dot={false}
                      strokeDasharray="5 3"
                    />
                    <Line
                      type="monotone"
                      dataKey="Économies cumulées"
                      stroke="#059669"
                      strokeWidth={2.5}
                      dot={false}
                      activeDot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* Insight */}
            <div className="sv2-insight" style={{ marginTop: 20 }}>
              {v.dpe === "F" || v.dpe === "G"
                ? <>Ce bien est une passoire thermique. La décote de{" "}
                    <strong>{fmt(res.decote)}</strong> est partiellement compensable avec{" "}
                    {hasTravaux
                      ? <><strong>{fmt(v.travaux)}</strong> de travaux qui porteraient le DPE à <strong>{res.dpeApres}</strong>.</>
                      : "des travaux de rénovation ciblés."}
                  </>
                : v.dpe === "D" || v.dpe === "E"
                ? <>Un DPE <strong>{v.dpe}</strong> entraîne une décote de <strong>{fmt(res.decote)}</strong>.
                    Des travaux d'isolation ciblés pourraient améliorer la classe et réduire vos charges de{" "}
                    <strong>{fmt(res.economieCharges)}/an</strong>.</>
                : <>Excellent DPE — pas de décote et des charges énergétiques maîtrisées à{" "}
                    <strong>{fmt(res.chargesAnnuellesActuelles)}/an</strong>.</>
              }
            </div>
          </div>
        )}

        <SimCrossSell
          show={v.prix > 0}
          loan={Math.max(0, v.prix - 40000)}
          taux={3.5}
          dureeCredit={20}
        />
      </div>
    </SimLayout>
  );
}
