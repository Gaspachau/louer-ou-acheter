import { useState, useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import SimLayout from "./SimLayout";
import SimCrossSell from "./SimCrossSell";

const fmt = (v) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(v);
const fmtK = (v) =>
  v >= 1000000 ? `${(v / 1000000).toFixed(1)}M €` : v >= 1000 ? `${(v / 1000).toFixed(0)}k €` : `${v} €`;

const PATRIMOINE_PILLS = [100000, 200000, 500000, 1000000, 2000000];

const LIENS = [
  { id: "enfant",   label: "Enfant",         abattement: 100000   },
  { id: "conjoint", label: "Conjoint / PACS", abattement: Infinity },
  { id: "frere",    label: "Frère / Sœur",   abattement: 15932    },
  { id: "neveu",    label: "Neveu / Nièce",  abattement: 7967     },
  { id: "autre",    label: "Autre",          abattement: 1594     },
];

function calcDroits(base, lien) {
  if (lien === "conjoint" || base <= 0) return 0;
  if (lien === "enfant") {
    const TRANCHES = [
      [8072,             0.05],
      [12109 - 8072,     0.10],
      [15932 - 12109,    0.15],
      [552324 - 15932,   0.20],
      [902838 - 552324,  0.30],
      [1805677 - 902838, 0.40],
      [Infinity,         0.45],
    ];
    let droits = 0, reste = base;
    for (const [tranche, taux] of TRANCHES) {
      const imposable = Math.min(reste, tranche);
      droits += imposable * taux;
      reste -= imposable;
      if (reste <= 0) break;
    }
    return droits;
  }
  if (lien === "frere") {
    return Math.min(base, 24430) * 0.35 + Math.max(0, base - 24430) * 0.45;
  }
  if (lien === "neveu") return base * 0.55;
  return base * 0.60;
}

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

export default function SimHeritage() {
  const [patrimoine, setPatrimoine]         = useState(500000);
  const [lien, setLien]                     = useState("enfant");
  const [assuranceVie, setAssuranceVie]     = useState(false);
  const [nbBenef, setNbBenef]               = useState(1);

  const sliderPct = Math.min(100, (patrimoine / 5000000) * 100);

  const res = useMemo(() => {
    const lienData      = LIENS.find((l) => l.id === lien);
    const abattBase     = lienData.abattement === Infinity ? patrimoine : lienData.abattement;
    const abattAV       = assuranceVie ? 152500 * nbBenef : 0;
    const abattTotal    = Math.min(patrimoine, abattBase + abattAV);
    const baseImposable = Math.max(0, patrimoine - abattTotal);
    const droitsNets    = calcDroits(baseImposable, lien);
    const tauxEffectif  = patrimoine > 0 ? (droitsNets / patrimoine) * 100 : 0;
    const patrimoineNet = patrimoine - droitsNets;
    return { abattTotal, baseImposable, droitsNets, tauxEffectif, patrimoineNet };
  }, [patrimoine, lien, assuranceVie, nbBenef]);

  const verdictClass =
    lien === "conjoint"       ? "sv2-verdict-green"
    : res.tauxEffectif === 0  ? "sv2-verdict-green"
    : res.tauxEffectif < 20   ? "sv2-verdict-amber"
    : "sv2-verdict-red";

  const chartData = [
    { name: "Patrimoine net reçu",    value: Math.round(res.patrimoineNet), fill: "#1a56db" },
    { name: "Droits de succession",   value: Math.round(res.droitsNets),    fill: "#dc2626" },
    { name: "Abattement",             value: Math.round(res.abattTotal),    fill: "#10b981" },
  ].filter((d) => d.value > 0);

  const lienData = LIENS.find((l) => l.id === lien);

  return (
    <SimLayout
      icon="🏛️"
      title="Estimez vos droits de succession"
      description="Calculez les droits à payer selon le lien de parenté et les abattements fiscaux applicables"
      simTime="2 min"
      suggestions={[
        "/simulateurs/plus-value",
        "/simulateurs/pret-immobilier",
        "/simulateurs/frais-notaire",
        "/simulateurs/rentabilite-locative",
        "/simulateurs/taxe-fonciere",
        "/simulateurs/endettement",
      ]}
    >
      <div className="sv2-container">

        {/* ── Inputs card ── */}
        <div className="fv2-card" style={{ marginBottom: 20 }}>
          <p className="fv2-card-kicker">Succession</p>
          <p className="fv2-card-title">Renseignez les paramètres</p>

          {/* Patrimoine */}
          <div style={{ marginBottom: 24 }}>
            <div className="fv2-slider-header">
              <span className="fv2-slider-label">Valeur du patrimoine transmis</span>
              <span className="fv2-slider-val">{fmtK(patrimoine)}</span>
            </div>
            <div className="fv2-slider-track-wrap" style={{ "--pct": `${sliderPct}%` }}>
              <input
                type="range" className="fv2-slider"
                min={0} max={5000000} step={10000} value={patrimoine}
                onChange={(e) => setPatrimoine(Number(e.target.value))}
              />
              <div className="fv2-slider-fill" style={{ width: `${sliderPct}%` }} />
            </div>
            <div className="fv2-slider-minmax"><span>0 €</span><span>5 000 000 €</span></div>
            <div className="fv2-revenus-pills" style={{ marginTop: 10 }}>
              {PATRIMOINE_PILLS.map((p) => (
                <button key={p} type="button"
                  className={`fv2-revenus-pill${patrimoine === p ? " active" : ""}`}
                  onClick={() => setPatrimoine(p)}>
                  {fmtK(p)}
                </button>
              ))}
            </div>
          </div>

          {/* Lien de parenté */}
          <div style={{ marginBottom: 24 }}>
            <p className="fv2-field-label">Lien de parenté avec le défunt</p>
            <div className="fv2-choice-row" style={{ flexWrap: "wrap", gap: 8 }}>
              {LIENS.map((l) => (
                <button key={l.id} type="button"
                  className={`fv2-choice-btn${lien === l.id ? " active" : ""}`}
                  onClick={() => setLien(l.id)}>
                  {l.label}
                </button>
              ))}
            </div>
            <p className="fv2-hint">
              Abattement légal :{" "}
              {lien === "conjoint"
                ? "Exonération totale"
                : fmt(lienData?.abattement ?? 0)}
            </p>
          </div>

          {/* Assurance-vie toggle */}
          <div style={{ marginBottom: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <p className="fv2-field-label" style={{ margin: 0 }}>
                Assurance-vie (abattement 152 500 € / bénéficiaire)
              </p>
              <button
                type="button"
                onClick={() => setAssuranceVie(!assuranceVie)}
                style={{
                  width: 44, height: 24, borderRadius: 12, border: "none", cursor: "pointer",
                  background: assuranceVie ? "#1a56db" : "#cbd5e1",
                  position: "relative", transition: "background .2s", flexShrink: 0,
                }}
                aria-label={assuranceVie ? "Désactiver l'assurance-vie" : "Activer l'assurance-vie"}
              >
                <span style={{
                  position: "absolute", top: 3, left: assuranceVie ? 23 : 3,
                  width: 18, height: 18, borderRadius: "50%", background: "#fff",
                  transition: "left .2s", boxShadow: "0 1px 4px rgba(0,0,0,.2)",
                }} />
              </button>
            </div>
            {assuranceVie && (
              <div style={{ marginTop: 8 }}>
                <p className="fv2-field-label" style={{ marginBottom: 6 }}>Nombre de bénéficiaires</p>
                <div className="fv2-revenus-pills">
                  {[1, 2, 3, 4].map((n) => (
                    <button key={n} type="button"
                      className={`fv2-revenus-pill${nbBenef === n ? " active" : ""}`}
                      onClick={() => setNbBenef(n)}>
                      {n}
                    </button>
                  ))}
                </div>
                <p className="fv2-hint">Abattement AV total : {fmt(152500 * nbBenef)}</p>
              </div>
            )}
          </div>
        </div>

        {/* ── Results card ── */}
        <div className="fv2-card" style={{ marginBottom: 20 }}>

          {/* Verdict */}
          <div className={`sv2-verdict ${verdictClass}`} style={{ marginBottom: 20 }}>
            {lien === "conjoint" ? (
              <>
                <div className="sv2-verdict-label">Droits de succession</div>
                <div className="sv2-verdict-amount">0 €</div>
                <div className="sv2-verdict-sub">Exonération totale — conjoint / partenaire PACS</div>
              </>
            ) : (
              <>
                <div className="sv2-verdict-label">Droits de succession nets</div>
                <div className="sv2-verdict-amount">{fmt(Math.round(res.droitsNets))}</div>
                <div className="sv2-verdict-sub">
                  Taux effectif : {res.tauxEffectif.toFixed(1)} % du patrimoine
                </div>
              </>
            )}
          </div>

          {/* Line items */}
          <div className="sv2-line-items" style={{ marginBottom: 20 }}>
            {[
              { label: "Patrimoine brut transmis",  value: patrimoine,           color: "#1a56db", pct: 100 },
              { label: "Abattement total appliqué", value: res.abattTotal,       color: "#10b981", pct: (res.abattTotal / Math.max(1, patrimoine)) * 100, prefix: "− " },
              { label: "Base imposable",            value: res.baseImposable,    color: "#f59e0b", pct: (res.baseImposable / Math.max(1, patrimoine)) * 100 },
              { label: "Droits de succession nets", value: res.droitsNets,       color: "#dc2626", pct: (res.droitsNets / Math.max(1, patrimoine)) * 100 },
              { label: "Patrimoine net reçu",       value: res.patrimoineNet,    color: "#1a56db", pct: (res.patrimoineNet / Math.max(1, patrimoine)) * 100, bold: true },
            ].map(({ label, value, color, pct, prefix, bold }) => (
              <div key={label} className="sv2-line-item">
                <div className="sv2-line-item-row">
                  <span className="sv2-line-item-label">{label}</span>
                  <span className="sv2-line-item-amount" style={{ color: color, fontWeight: bold ? 800 : undefined }}>
                    {prefix || ""}{fmt(Math.round(value))}
                  </span>
                </div>
                <div className="sv2-line-bar-track">
                  <div className="sv2-line-bar-fill" style={{ width: `${Math.min(100, pct)}%`, background: color }} />
                </div>
              </div>
            ))}
          </div>

          {/* Bar chart */}
          {lien !== "conjoint" && chartData.length > 0 && (
            <div style={{ height: 190, marginBottom: 16 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} layout="vertical" margin={{ top: 0, right: 24, left: 0, bottom: 0 }}>
                  <XAxis type="number" tickFormatter={(v) => fmtK(v)}
                    tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <YAxis type="category" dataKey="name"
                    tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} width={150} />
                  <Tooltip content={<ChartTip />} />
                  <Bar dataKey="value" radius={[0, 6, 6, 0]}>
                    {chartData.map((entry, i) => (
                      <Cell key={i} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Insight */}
          {lien !== "conjoint" && res.droitsNets > 0 && (
            <div className="sv2-insight">
              Sur un patrimoine de <strong>{fmtK(patrimoine)}</strong>, les droits s'élèvent à{" "}
              <strong>{fmt(Math.round(res.droitsNets))}</strong>
              {assuranceVie
                ? ` (après abattement assurance-vie de ${fmt(152500 * nbBenef)})`
                : ""}
              . Le bénéficiaire reçoit effectivement{" "}
              <strong>{fmt(Math.round(res.patrimoineNet))}</strong>.
            </div>
          )}
          {lien !== "conjoint" && res.droitsNets === 0 && patrimoine > 0 && (
            <div className="sv2-insight" style={{ background: "linear-gradient(135deg,#f0fdf4,#dcfce7)", color: "#166534" }}>
              Le patrimoine est entièrement couvert par les abattements — aucun droit de succession n'est dû.
            </div>
          )}
          {lien === "conjoint" && (
            <div className="sv2-insight" style={{ background: "linear-gradient(135deg,#f0fdf4,#dcfce7)", color: "#166534" }}>
              Le conjoint survivant et le partenaire de PACS sont totalement exonérés de droits de succession depuis la loi TEPA de 2007.
            </div>
          )}
        </div>

        <SimCrossSell
          show={res.patrimoineNet > 200000}
          loan={Math.round(res.patrimoineNet * 0.6)}
          taux={3.5}
          dureeCredit={20}
        />
      </div>
    </SimLayout>
  );
}
