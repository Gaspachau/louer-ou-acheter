import { useState, useMemo } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid, ReferenceLine,
} from "recharts";
import SimLayout from "./SimLayout";
import SimCrossSell from "./SimCrossSell";

const fmt = (v) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(v);
const fmtK = (v) => (v >= 1000 ? `${(v / 1000).toFixed(0)}k €` : `${v} €`);

const REVENUS_PILLS = [2500, 3000, 4000, 5000, 7000];
const PRIX_PILLS    = [150000, 200000, 250000, 300000, 400000];
const APPORT_PILLS  = [10000, 20000, 30000, 50000];
const DUREE_OPTIONS = [15, 20, 25, 30];
const TAUX_TESTS    = [3.5, 4.0, 4.5, 5.0, 5.5, 6.0];

function mortgage(principal, rate, years) {
  if (principal <= 0 || years <= 0) return 0;
  const r = rate / 100 / 12;
  if (r === 0) return principal / (years * 12);
  return (principal * r) / (1 - Math.pow(1 + r, -(years * 12)));
}

function Pills({ values, current, onSelect, format }) {
  return (
    <div className="fv2-revenus-pills">
      {values.map((v) => (
        <button key={v} type="button"
          className={`fv2-revenus-pill${current === v ? " active" : ""}`}
          onClick={() => onSelect(v)}>
          {format ? format(v) : v}
        </button>
      ))}
    </div>
  );
}

function ChartTip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="chart-tooltip">
      <div className="chart-tooltip-label" style={{ fontWeight: 700, marginBottom: 4 }}>
        Taux {label} %
      </div>
      {payload.map((p) => (
        <div key={p.dataKey} className="chart-tooltip-row">
          <span style={{ color: p.stroke }}>{p.name} :</span>
          <span>&nbsp;{p.dataKey === "taux_endet" ? `${p.value.toFixed(1)} %` : fmt(p.value)}</span>
        </div>
      ))}
    </div>
  );
}

export default function SimStressTest() {
  const [revenus, setRevenus]   = useState(4000);
  const [prix, setPrix]         = useState(250000);
  const [apport, setApport]     = useState(30000);
  const [duree, setDuree]       = useState(20);

  const apportSliderPct = Math.min(100, (apport / 100000) * 100);

  const res = useMemo(() => {
    const emprunt = Math.max(0, prix - apport);

    const scenarios = TAUX_TESTS.map((taux) => {
      const mensualite   = mortgage(emprunt, taux, duree);
      const tauxEndet    = revenus > 0 ? (mensualite / revenus) * 100 : 0;
      const financable   = tauxEndet <= 35;
      return { taux, mensualite: Math.round(mensualite), tauxEndet, financable };
    });

    const tauxMax = scenarios.filter((s) => s.financable).pop()?.taux ?? 0;
    const mensBase = scenarios[0]?.mensualite ?? 0;

    return { emprunt, scenarios, tauxMax, mensBase };
  }, [revenus, prix, apport, duree]);

  const verdictClass =
    res.tauxMax >= 5.0 ? "sv2-verdict-green"
    : res.tauxMax >= 4.0 ? "sv2-verdict-amber"
    : res.tauxMax >= 3.5 ? "sv2-verdict-amber"
    : "sv2-verdict-red";

  // Threshold line: mensualité corresponding to 35% endettement
  const seuilMensualite = revenus * 0.35;

  return (
    <SimLayout
      icon="🔥"
      title="Votre projet résiste-t-il à la hausse des taux ?"
      description="Simulez l'impact de différents taux sur votre mensualité et votre taux d'endettement"
      simTime="2 min"
      suggestions={[
        "/simulateurs/endettement",
        "/simulateurs/pret-immobilier",
        "/simulateurs/budget-maximum",
        "/simulateurs/frais-notaire",
        "/simulateurs/score-acheteur",
        "/simulateurs/assurance-pret",
      ]}
    >
      <div className="sv2-container">

        {/* ── Inputs card ── */}
        <div className="fv2-card" style={{ marginBottom: 20 }}>
          <p className="fv2-card-kicker">Stress test taux</p>
          <p className="fv2-card-title">Renseignez votre projet</p>

          {/* Revenu net mensuel */}
          <div style={{ marginBottom: 24 }}>
            <p className="fv2-field-label">Revenu net mensuel</p>
            <div className="fv2-revenus-input-row">
              <input
                type="number" className="fv2-revenus-input"
                value={revenus || ""} min={0} max={50000} step={100}
                placeholder="4 000"
                onChange={(e) => setRevenus(Math.max(0, Number(e.target.value) || 0))}
              />
              <span className="fv2-revenus-unit">€ / mois</span>
            </div>
            <Pills values={REVENUS_PILLS} current={revenus} onSelect={setRevenus}
              format={(v) => `${v.toLocaleString("fr-FR")} €`} />
          </div>

          {/* Prix du bien */}
          <div style={{ marginBottom: 24 }}>
            <p className="fv2-field-label">Prix du bien</p>
            <div className="fv2-revenus-input-row">
              <input
                type="number" className="fv2-revenus-input"
                value={prix || ""} min={50000} max={2000000} step={5000}
                placeholder="250 000"
                onChange={(e) => setPrix(Math.max(0, Number(e.target.value) || 0))}
              />
              <span className="fv2-revenus-unit">€</span>
            </div>
            <Pills values={PRIX_PILLS} current={prix} onSelect={setPrix}
              format={(v) => fmtK(v)} />
          </div>

          {/* Apport */}
          <div style={{ marginBottom: 24 }}>
            <div className="fv2-slider-header">
              <span className="fv2-slider-label">Apport personnel</span>
              <span className="fv2-slider-val">{fmt(apport)}</span>
            </div>
            <div className="fv2-slider-track-wrap" style={{ "--pct": `${apportSliderPct}%` }}>
              <input type="range" className="fv2-slider"
                min={0} max={100000} step={5000} value={apport}
                onChange={(e) => setApport(Number(e.target.value))} />
              <div className="fv2-slider-fill" style={{ width: `${apportSliderPct}%` }} />
            </div>
            <div className="fv2-slider-minmax"><span>0 €</span><span>100 000 €</span></div>
            <div className="fv2-revenus-pills" style={{ marginTop: 8 }}>
              {APPORT_PILLS.map((p) => (
                <button key={p} type="button"
                  className={`fv2-revenus-pill${apport === p ? " active" : ""}`}
                  onClick={() => setApport(p)}>
                  {fmtK(p)}
                </button>
              ))}
            </div>
          </div>

          {/* Durée */}
          <div style={{ marginBottom: 8 }}>
            <p className="fv2-field-label">Durée du crédit</p>
            <div className="fv2-revenus-pills">
              {DUREE_OPTIONS.map((d) => (
                <button key={d} type="button"
                  className={`fv2-revenus-pill${duree === d ? " active" : ""}`}
                  onClick={() => setDuree(d)}>
                  {d} ans
                </button>
              ))}
            </div>
            <p className="fv2-hint">
              Taux de référence 2026 : <strong>3,5 %</strong> · Emprunt : <strong>{fmt(res.emprunt)}</strong>
            </p>
          </div>
        </div>

        {/* ── Results card ── */}
        <div className="fv2-card" style={{ marginBottom: 20 }}>

          {/* Verdict */}
          <div className={`sv2-verdict ${verdictClass}`} style={{ marginBottom: 20 }}>
            <div className="sv2-verdict-label">Projet finançable jusqu'à</div>
            <div className="sv2-verdict-amount">
              {res.tauxMax > 0 ? `${res.tauxMax.toFixed(1)} %` : "Non finançable"}
            </div>
            <div className="sv2-verdict-sub">
              {res.tauxMax >= 5.0
                ? "Excellent — votre projet résiste très bien à la hausse des taux"
                : res.tauxMax >= 4.0
                ? "Correct — votre projet tient jusqu'à un taux de " + res.tauxMax.toFixed(1) + " %"
                : res.tauxMax >= 3.5
                ? "Limite — votre projet est juste finançable au taux actuel"
                : "Attention — le taux d'endettement dépasse 35 % dès maintenant"}
            </div>
          </div>

          {/* Table des scénarios */}
          <div style={{ marginBottom: 20, overflowX: "auto" }}>
            <table className="sv2-amort-table" style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th>Taux</th>
                  <th>Mensualité</th>
                  <th>Endettement</th>
                  <th>Statut</th>
                </tr>
              </thead>
              <tbody>
                {res.scenarios.map(({ taux, mensualite, tauxEndet, financable }) => (
                  <tr key={taux} style={{
                    background: taux === 3.5 ? "#f0f7ff" : undefined,
                    fontWeight: taux === 3.5 ? 700 : undefined,
                  }}>
                    <td>{taux.toFixed(1)} %{taux === 3.5 ? " ★" : ""}</td>
                    <td>{fmt(mensualite)}</td>
                    <td style={{ color: tauxEndet > 35 ? "#dc2626" : tauxEndet > 30 ? "#d97706" : "#059669" }}>
                      {tauxEndet.toFixed(1)} %
                    </td>
                    <td>
                      <span style={{
                        display: "inline-block",
                        padding: "2px 8px",
                        borderRadius: 6,
                        fontSize: 12,
                        fontWeight: 700,
                        background: financable ? "#dcfce7" : "#fee2e2",
                        color: financable ? "#166534" : "#991b1b",
                      }}>
                        {financable ? "✓ OK" : "✗ Refus"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Line chart : mensualité vs taux */}
          <p style={{ fontSize: 13, fontWeight: 700, color: "#0c1a35", marginBottom: 8 }}>
            Mensualité selon le taux
          </p>
          <div style={{ height: 220, marginBottom: 16 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={res.scenarios}
                margin={{ top: 5, right: 10, left: 5, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="taux" tickFormatter={(v) => `${v} %`}
                  tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis tickFormatter={(v) => fmtK(v)}
                  tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} width={56} />
                <Tooltip content={<ChartTip />} />
                <ReferenceLine
                  y={seuilMensualite}
                  stroke="#dc2626"
                  strokeDasharray="6 3"
                  label={{
                    value: `35 % — ${fmt(Math.round(seuilMensualite))}/mois`,
                    fontSize: 10, fill: "#dc2626", position: "insideTopRight",
                  }}
                />
                <Line type="monotone" dataKey="mensualite" name="Mensualité"
                  stroke="#1a56db" strokeWidth={2.5} dot={{ r: 5, fill: "#1a56db" }} activeDot={{ r: 7 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div style={{ display: "flex", gap: 16, justifyContent: "center", marginBottom: 16 }}>
            <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#64748b" }}>
              <span style={{ width: 12, height: 12, background: "#1a56db", borderRadius: 3, display: "inline-block" }} />
              Mensualité
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#dc2626" }}>
              <span style={{ width: 12, height: 3, background: "#dc2626", display: "inline-block" }} />
              Seuil 35 % HCSF
            </span>
          </div>

          {/* Insight */}
          <div className="sv2-insight">
            À <strong>3,5 %</strong>, votre mensualité est de{" "}
            <strong>{fmt(res.mensBase)}/mois</strong>{" "}
            ({revenus > 0 ? ((res.mensBase / revenus) * 100).toFixed(1) : 0} % d'endettement).
            {res.tauxMax > 3.5 ? (
              <> Votre projet reste finançable jusqu'à <strong>{res.tauxMax.toFixed(1)} %</strong> — soit{" "}
                <strong>{(res.tauxMax - 3.5).toFixed(1)} points</strong> de marge.</>
            ) : res.tauxMax === 3.5 ? (
              <> Votre projet est juste à la limite au taux actuel de 3,5 %.</>
            ) : (
              <> Votre taux d'endettement dépasse déjà 35 % — réduisez l'emprunt ou allongez la durée.</>
            )}
          </div>
        </div>

        <SimCrossSell
          show={res.tauxMax >= 3.5}
          loan={res.emprunt}
          taux={3.5}
          dureeCredit={duree}
        />
      </div>
    </SimLayout>
  );
}
