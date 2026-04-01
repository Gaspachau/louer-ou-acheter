import { useMemo, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import SimLayout from "./SimLayout";
import SimCrossSell from "./SimCrossSell";

const fmt = (v) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(v);
const fmtK = (v) => (v >= 1000 ? `${(v / 1000).toFixed(0)}k €` : `${v} €`);

function mortgage(principal, rate, years) {
  if (principal <= 0 || years <= 0) return 0;
  const r = rate / 100 / 12;
  if (r === 0) return principal / (years * 12);
  return (principal * r) / (1 - Math.pow(1 + r, -(years * 12)));
}

function capacite(revTotal, charges, taux, duree) {
  const r = taux / 100 / 12;
  const n = duree * 12;
  const mensMax = Math.max(0, revTotal * 0.35 - charges);
  if (r === 0) return mensMax * n;
  return mensMax * (1 - Math.pow(1 + r, -n)) / r;
}

function SemiGauge({ value }) {
  const maxPct = 50;
  const fillPct = Math.min(1, Math.max(0, value / maxPct));
  const limitPct = 35 / maxPct;
  const r = 54, cx = 80, cy = 68;
  const halfCirc = Math.PI * r;
  const fillLen = fillPct * halfCirc;
  const limitLen = limitPct * halfCirc;
  const color = value > 35 ? "#dc2626" : value > 28 ? "#d97706" : "#06b6d4";

  const arcPoint = (frac, rr) => {
    const angle = (1 - frac) * Math.PI;
    return { x: cx + rr * Math.cos(angle), y: cy - rr * Math.sin(angle) };
  };

  const limitInner = arcPoint(limitPct, r - 8);
  const limitOuter = arcPoint(limitPct, r + 10);
  const limitLabel = arcPoint(limitPct, r + 20);

  return (
    <div className="semi-gauge-wrap" style={{ textAlign: "center", margin: "16px 0" }}>
      <svg viewBox="0 0 160 80" style={{ width: "100%", maxWidth: 260, display: "block", margin: "0 auto" }} aria-hidden="true">
        <path d={`M ${cx - r},${cy} A ${r},${r} 0 0,1 ${cx + r},${cy}`} fill="none" stroke="#e2e8f0" strokeWidth="12" strokeLinecap="round"/>
        <path d={`M ${cx - r},${cy} A ${r},${r} 0 0,1 ${cx + r},${cy}`} fill="none" stroke={color} strokeWidth="12" strokeLinecap="round" strokeDasharray={`${fillLen} ${halfCirc}`}/>
        <line x1={limitInner.x} y1={limitInner.y} x2={limitOuter.x} y2={limitOuter.y} stroke="#94a3b8" strokeWidth="2"/>
        <text x={limitLabel.x} y={limitLabel.y + 1} textAnchor="middle" fontSize="7.5" fill="#94a3b8" fontWeight="700">35%</text>
        <text x={cx} y={cy - 14} textAnchor="middle" fontSize="22" fontWeight="900" fill={color}>{value.toFixed(1)}%</text>
        <text x={cx} y={cy + 2} textAnchor="middle" fontSize="8.5" fill="#5e6e88">taux d'endettement</text>
        <text x={cx - r - 4} y={cy + 10} textAnchor="end" fontSize="8" fill="#5e6e88">0%</text>
        <text x={cx + r + 4} y={cy + 10} textAnchor="start" fontSize="8" fill="#5e6e88">50%</text>
      </svg>
    </div>
  );
}

const REVENUS_PILLS = [1500, 2000, 2500, 3000, 3500, 4000, 5000];
const CHARGES_PILLS = [0, 200, 400, 600, 800];

export default function SimEndettement() {
  const [achat, setAchat] = useState("seul");
  const [revenus, setRevenus] = useState(3000);
  const [revenusCo, setRevenusCo] = useState(0);
  const [charges, setCharges] = useState(300);
  const [apport, setApport] = useState(40000);
  const [taux, setTaux] = useState(3.5);

  const revTotal = achat === "couple" ? revenus + revenusCo : revenus;
  const tauxEndet = revTotal > 0 ? (charges / revTotal) * 100 : 0;

  const results = useMemo(() => {
    const montant15 = Math.max(0, capacite(revTotal, charges, taux, 15));
    const montant20 = Math.max(0, capacite(revTotal, charges, taux, 20));
    const montant25 = Math.max(0, capacite(revTotal, charges, taux, 25));
    return { montant15, montant20, montant25 };
  }, [revTotal, charges, taux]);

  const { montant15, montant20, montant25 } = results;

  const verdictClass =
    tauxEndet > 35 ? "sv2-verdict-red"
    : tauxEndet > 28 ? "sv2-verdict-amber"
    : "sv2-verdict-green";

  const apportPct = montant20 > 0 ? Math.round((apport / (montant20 + apport)) * 100) : 0;
  const trackPct20 = Math.min(100, (apport / 200000) * 100);
  const tauxPct = Math.min(100, ((taux - 1) / 6) * 100);

  const chartData = [
    { name: "15 ans", montant: Math.round(montant15) },
    { name: "20 ans", montant: Math.round(montant20) },
    { name: "25 ans", montant: Math.round(montant25) },
  ];

  const chargesHintColor =
    tauxEndet > 35 ? "#dc2626" : tauxEndet > 28 ? "#d97706" : "#059669";

  return (
    <SimLayout
      icon="⚖️"
      title="Combien pouvez-vous emprunter ?"
      description="Calculez votre budget maximum selon les critères bancaires 2026"
      suggestions={[
        "/simulateurs/pret-immobilier",
        "/simulateurs/frais-notaire",
        "/simulateurs/ptz",
        "/simulateurs/score-acheteur",
        "/simulateurs/budget-maximum",
        "/simulateurs/stress-test",
      ]}
    >
      <div className="sv2-container">

        {/* ── Inputs card ── */}
        <div className="fv2-card" style={{ marginBottom: 20 }}>

          {/* Seul / Couple */}
          <p className="fv2-field-label" style={{ marginBottom: 10 }}>Situation</p>
          <div className="fv2-choices-row" style={{ marginBottom: 24 }}>
            <button
              type="button"
              className={`fv2-choice${achat === "seul" ? " fv2-choice-active" : ""}`}
              onClick={() => setAchat("seul")}
            >
              <span className="fv2-choice-body">
                <span className="fv2-choice-label">👤 Seul</span>
              </span>
            </button>
            <button
              type="button"
              className={`fv2-choice${achat === "couple" ? " fv2-choice-active" : ""}`}
              onClick={() => setAchat("couple")}
            >
              <span className="fv2-choice-body">
                <span className="fv2-choice-label">👫 En couple</span>
              </span>
            </button>
          </div>

          {/* Revenus */}
          <div className="fv2-revenus-wrap" style={{ marginBottom: 20 }}>
            <p className="fv2-field-label">Vos revenus nets mensuels</p>
            <div className="fv2-revenus-input-row">
              <input
                type="number" className="fv2-revenus-input"
                value={revenus || ""} min={0} max={50000} step={100}
                placeholder="3 000"
                onChange={(e) => setRevenus(Math.max(0, Math.min(50000, Number(e.target.value) || 0)))}
              />
              <span className="fv2-revenus-unit">€ / mois</span>
            </div>
            <div className="fv2-revenus-pills">
              {REVENUS_PILLS.map((p) => (
                <button key={p} type="button" className={`fv2-revenus-pill${revenus === p ? " active" : ""}`} onClick={() => setRevenus(p)}>
                  {p.toLocaleString("fr-FR")} €
                </button>
              ))}
            </div>
          </div>

          {/* Co-emprunteur */}
          {achat === "couple" && (
            <div className="fv2-revenus-wrap" style={{ marginBottom: 20 }}>
              <p className="fv2-field-label">Revenus de votre co-emprunteur</p>
              <div className="fv2-revenus-input-row">
                <input
                  type="number" className="fv2-revenus-input"
                  value={revenusCo || ""} min={0} max={50000} step={100}
                  placeholder="2 000"
                  onChange={(e) => setRevenusCo(Math.max(0, Math.min(50000, Number(e.target.value) || 0)))}
                />
                <span className="fv2-revenus-unit">€ / mois</span>
              </div>
              <div className="fv2-revenus-pills">
                {REVENUS_PILLS.map((p) => (
                  <button key={p} type="button" className={`fv2-revenus-pill${revenusCo === p ? " active" : ""}`} onClick={() => setRevenusCo(p)}>
                    {p.toLocaleString("fr-FR")} €
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Charges */}
          <div className="fv2-revenus-wrap" style={{ marginBottom: 20 }}>
            <p className="fv2-field-label">Charges mensuelles (crédits, etc.)</p>
            <div className="fv2-revenus-input-row">
              <input
                type="number" className="fv2-revenus-input"
                value={charges || ""} min={0} max={5000} step={50}
                placeholder="300"
                onChange={(e) => setCharges(Math.max(0, Math.min(5000, Number(e.target.value) || 0)))}
              />
              <span className="fv2-revenus-unit">€ / mois</span>
            </div>
            <div className="fv2-revenus-pills">
              {CHARGES_PILLS.map((p) => (
                <button key={p} type="button" className={`fv2-revenus-pill${charges === p ? " active" : ""}`} onClick={() => setCharges(p)}>
                  {p === 0 ? "Aucune" : `${p} €`}
                </button>
              ))}
            </div>
            {revTotal > 0 && (
              <p className="fv2-hint" style={{ color: chargesHintColor, fontWeight: 600 }}>
                Taux d'endettement actuel : {tauxEndet.toFixed(1)} %
              </p>
            )}
          </div>

          {/* Apport */}
          <div className="fv2-apport-wrap" style={{ marginBottom: 20 }}>
            <div className="fv2-apport-header">
              <span className="fv2-apport-label">Apport personnel</span>
              <span className="fv2-apport-bigval">{fmt(apport)}</span>
            </div>
            <div className="fv2-slider-track-wrap" style={{ "--pct": `${trackPct20}%` }}>
              <input
                type="range" className="fv2-slider"
                min={0} max={200000} step={5000} value={apport}
                onChange={(e) => setApport(Number(e.target.value))}
              />
              <div className="fv2-slider-fill" style={{ width: `${trackPct20}%` }} />
            </div>
            <div className="fv2-slider-minmax"><span>0 €</span><span>200 000 €</span></div>
            {montant20 > 0 && (
              <div className={`fv2-apport-badge ${apportPct >= 10 ? "fv2-apport-badge-good" : "fv2-apport-badge-warn"}`}>
                {apport === 0
                  ? "⚠️ Sans apport : financement difficile. Les banques demandent minimum 10 %"
                  : apportPct >= 10
                  ? `✓ Bon apport — vous visez un bien jusqu'à ${fmt(montant20 + apport)}`
                  : `⚠️ Apport limité — les banques demandent minimum 10 % du prix`}
              </div>
            )}
          </div>

          {/* Taux */}
          <div style={{ marginBottom: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <p className="fv2-field-label" style={{ margin: 0 }}>Taux d'intérêt</p>
              <span style={{ fontSize: 22, fontWeight: 900, color: "#0c1a35" }}>{taux.toFixed(1)} %</span>
            </div>
            <div className="fv2-slider-track-wrap" style={{ "--pct": `${tauxPct}%` }}>
              <input
                type="range" className="fv2-slider"
                min={1} max={7} step={0.1} value={taux}
                onChange={(e) => setTaux(Number(e.target.value))}
              />
              <div className="fv2-slider-fill" style={{ width: `${tauxPct}%` }} />
            </div>
            <div className="fv2-slider-minmax"><span>1 %</span><span>7 %</span></div>
            <p className="fv2-hint">Moyenne 2026 : 3,5 %</p>
          </div>
        </div>

        {/* ── Results card ── */}
        <div className="fv2-card" style={{ marginBottom: 20 }}>

          {/* Big verdict */}
          <div className={`sv2-verdict ${verdictClass}`} style={{ marginBottom: 20 }}>
            <div className="sv2-verdict-label">Vous pouvez emprunter jusqu'à</div>
            <div className="sv2-verdict-amount">{fmt(Math.round(montant20))}</div>
            <div className="sv2-verdict-sub">Sur 20 ans à {taux.toFixed(1)} %</div>
          </div>

          <SemiGauge value={tauxEndet} />

          {/* Three scenarios */}
          <div className="sv2-scenarios" style={{ marginBottom: 20 }}>
            {[
              { duree: 15, montant: montant15, highlight: false },
              { duree: 20, montant: montant20, highlight: true },
              { duree: 25, montant: montant25, highlight: false },
            ].map(({ duree, montant, highlight }) => (
              <div key={duree} className={`sv2-scenario-card${highlight ? " highlight" : ""}`}>
                <div className="sv2-scenario-dur">Sur {duree} ans</div>
                <div className="sv2-scenario-amt">{fmtK(Math.round(montant))}</div>
                {highlight && <div className="sv2-scenario-badge">Recommandé</div>}
              </div>
            ))}
          </div>

          {/* Bar chart */}
          <div style={{ height: 180, marginBottom: 20 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} barCategoryGap="30%">
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false}/>
                <YAxis hide />
                <Tooltip
                  formatter={(v) => [fmt(v), "Montant empruntable"]}
                  contentStyle={{ borderRadius: 10, border: "none", boxShadow: "0 4px 20px rgba(0,0,0,.1)", fontSize: 13 }}
                />
                <Bar dataKey="montant" radius={[6, 6, 0, 0]}>
                  {chartData.map((entry, i) => (
                    <Cell key={i} fill={i === 1 ? "#1a56db" : "#93c5fd"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Insight */}
          {revTotal > 0 && montant20 > 0 && (
            <div className="sv2-insight">
              Avec vos revenus de <strong>{fmt(revTotal)}/mois</strong>, vous pouvez viser un bien jusqu'à{" "}
              <strong>{fmt(Math.round(montant20 + apport))}</strong> (emprunt + apport de {fmt(apport)}).
            </div>
          )}

          {/* Warning if over-indebted */}
          {tauxEndet > 35 && (
            <div className="sv2-insight" style={{ background: "linear-gradient(135deg,#fef2f2,#fee2e2)", color: "#991b1b" }}>
              ⚠️ Vos charges actuelles de <strong>{fmt(charges)}/mois</strong> dépassent le seuil HCSF de 35 %.
              Rembourser vos crédits existants vous permettrait d'emprunter jusqu'à{" "}
              <strong>{fmt(Math.round(capacite(revTotal, 0, taux, 20)))}</strong> supplémentaires.
            </div>
          )}
        </div>

        <SimCrossSell
          show={revTotal > 0 && tauxEndet <= 50}
          loan={Math.round(montant20)}
          taux={taux}
          dureeCredit={20}
        />
      </div>
    </SimLayout>
  );
}
