import { useMemo, useState, useRef, useEffect } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend,
  ResponsiveContainer, CartesianGrid,
} from "recharts";
import SimLayout from "./SimLayout";
import SimCrossSell from "./SimCrossSell";
import { VILLES } from "../../data/villes";

/* ─── Formatters ─────────────────────────────────────────── */
const fmt = (v) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(v);
const fmtK = (v) =>
  v >= 1000 ? `${Math.round(v / 1000)}k €` : `${Math.round(v)} €`;

/* ─── Helpers ────────────────────────────────────────────── */
const normalizeStr = (s) =>
  s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

function mortgage(p, r, y) {
  if (p <= 0 || y <= 0) return 0;
  const mr = r / 100 / 12;
  if (mr === 0) return p / (y * 12);
  return (p * mr) / (1 - Math.pow(1 + mr, -(y * 12)));
}

function getLoyerByTypo(ville, typo) {
  if (typo === "t1") return ville.loyer_studio;
  if (typo === "t3") return ville.loyer_t3;
  return ville.loyer_t2;
}

function tensionColor(tension) {
  if (!tension) return "#94a3b8";
  const t = tension.toLowerCase();
  if (t.includes("très tendu")) return "#dc2626";
  if (t.includes("tendu")) return "#f59e0b";
  if (t.includes("dynamique")) return "#2563eb";
  if (t.includes("stable")) return "#059669";
  return "#94a3b8";
}

/* ─── CitySearch ─────────────────────────────────────────── */
function CitySearch({ ville, onSelect, placeholder = "Rechercher une ville..." }) {
  const [query, setQuery] = useState(ville?.nom ?? "");
  const [open, setOpen] = useState(false);
  const closeTimer = useRef(null);

  const suggestions = useMemo(() => {
    if (query.length < 1) return [];
    const norm = normalizeStr(query);
    return VILLES.filter((c) => normalizeStr(c.nom).includes(norm)).slice(0, 8);
  }, [query]);

  const select = (c) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setQuery(c.nom);
    setOpen(false);
    onSelect(c);
  };

  return (
    <div className="sf-city-search">
      <div className="sf-city-search-wrap">
        <input
          type="text" className="sf-city-search-input" value={query}
          placeholder={placeholder} autoComplete="off" spellCheck={false}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(e.target.value.length >= 1);
            if (!e.target.value) onSelect(null);
          }}
          onFocus={() => {
            if (closeTimer.current) clearTimeout(closeTimer.current);
            if (query.length >= 1) setOpen(true);
          }}
          onBlur={() => { closeTimer.current = setTimeout(() => setOpen(false), 250); }}
        />
        {query && (
          <button type="button" className="sf-city-search-clear"
            onClick={() => { setQuery(""); setOpen(false); onSelect(null); }}>
            ✕
          </button>
        )}
      </div>
      {open && suggestions.length > 0 && (
        <div className="sf-city-suggestions">
          {suggestions.map((c) => (
            <button key={c.id} type="button" className="sf-city-suggestion-item"
              onPointerDown={(e) => { e.preventDefault(); select(c); }}>
              <span className="sf-sug-name">{c.nom}</span>
              <span className="sf-sug-price">{c.prix_m2.toLocaleString("fr-FR")} €/m²</span>
            </button>
          ))}
        </div>
      )}
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
          <span style={{ color: p.fill }}>{p.name}</span>
          <span>{fmt(p.value)}</span>
        </div>
      ))}
    </div>
  );
}

/* ─── Comparison row ─────────────────────────────────────── */
function CmpRow({ label, v1, v2, highlight = false }) {
  return (
    <tr className={highlight ? "sv2-cmp-row-highlight" : ""}>
      <td className="sv2-cmp-label">{label}</td>
      <td className="sv2-cmp-v1">{v1}</td>
      <td className="sv2-cmp-v2">{v2}</td>
    </tr>
  );
}

/* ─── Component ──────────────────────────────────────────── */
export default function SimComparateurVilles() {
  const [ville1, setVille1] = useState(() => VILLES.find((v) => v.nom === "Paris") ?? null);
  const [ville2, setVille2] = useState(() => VILLES.find((v) => v.nom === "Lyon") ?? null);
  const [typo, setTypo] = useState("t2");

  const res = useMemo(() => {
    if (!ville1 || !ville2) return null;

    const loyer1 = getLoyerByTypo(ville1, typo);
    const loyer2 = getLoyerByTypo(ville2, typo);
    const prix1 = ville1.prix_m2 * 50;
    const prix2 = ville2.prix_m2 * 50;
    const mens1 = Math.round(mortgage(Math.max(0, prix1 - 40000), 3.5, 20));
    const mens2 = Math.round(mortgage(Math.max(0, prix2 - 40000), 3.5, 20));

    // Bar chart data
    const chartData = [
      {
        metric: "Prix m²",
        [ville1.nom]: ville1.prix_m2,
        [ville2.nom]: ville2.prix_m2,
      },
      {
        metric: "Loyer mensuel",
        [ville1.nom]: loyer1,
        [ville2.nom]: loyer2,
      },
      {
        metric: "Taxe foncière",
        [ville1.nom]: ville1.taxe_fonciere,
        [ville2.nom]: ville2.taxe_fonciere,
      },
    ];

    const better = ville1.rentabilite_annees <= ville2.rentabilite_annees ? ville1 : ville2;
    const other = better.id === ville1.id ? ville2 : ville1;

    // 10-year appreciation
    const val = 200000;
    const gain1 = Math.round(val * (Math.pow(1 + ville1.appreciation / 100, 10) - 1));
    const gain2 = Math.round(val * (Math.pow(1 + ville2.appreciation / 100, 10) - 1));

    return {
      loyer1, loyer2, prix1, prix2, mens1, mens2,
      chartData, better, other,
      gain1, gain2,
    };
  }, [ville1, ville2, typo]);

  const crossLoan = ville1 && ville2
    ? Math.min(ville1.prix_m2, ville2.prix_m2) * 50
    : 0;

  return (
    <SimLayout
      icon="🗺️"
      title="Comparez deux villes pour votre projet immobilier"
      description="Loyer, mensualité, prix et rentabilité côte à côte"
      suggestions={[
        "/simulateurs/endettement",
        "/simulateurs/frais-notaire",
        "/simulateurs/ptz",
      ]}
    >
      <div className="sv2-container">

        {/* ── Inputs ── */}
        <div className="fv2-card">
          <p className="fv2-card-kicker">Sélection</p>
          <h2 className="fv2-card-title">Choisissez vos deux villes</h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
            <div>
              <label className="fv2-field-label">Première ville</label>
              <CitySearch ville={ville1} onSelect={setVille1} placeholder="Ex : Paris…" />
            </div>
            <div>
              <label className="fv2-field-label">Deuxième ville</label>
              <CitySearch ville={ville2} onSelect={setVille2} placeholder="Ex : Lyon…" />
            </div>
          </div>

          {/* Typologie */}
          <div>
            <label className="fv2-field-label">Typologie</label>
            <div className="fv2-choices-row">
              {[
                { id: "t1", label: "T1 / Studio" },
                { id: "t2", label: "T2" },
                { id: "t3", label: "T3" },
              ].map(({ id, label }) => (
                <button key={id} type="button"
                  className={`fv2-choice${typo === id ? " fv2-choice-active" : ""}`}
                  onClick={() => setTypo(id)}>
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Results ── */}
        {ville1 && ville2 && res && (
          <>
            {/* Compare header */}
            <div className="sv2-compare-header">
              <div className="sv2-compare-city-card">
                <p className="sv2-compare-city-name">{ville1.nom}</p>
                <p className="sv2-compare-city-prix">{ville1.prix_m2.toLocaleString("fr-FR")} €/m²</p>
              </div>
              <div className="sv2-compare-vs">VS</div>
              <div className="sv2-compare-city-card">
                <p className="sv2-compare-city-name">{ville2.nom}</p>
                <p className="sv2-compare-city-prix">{ville2.prix_m2.toLocaleString("fr-FR")} €/m²</p>
              </div>
            </div>

            {/* Comparison table */}
            <div className="sv2-compare-table">
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: "left", padding: "8px 10px", fontSize: 12, color: "#64748b", fontWeight: 600 }}>Métrique</th>
                    <th style={{ textAlign: "right", padding: "8px 10px", fontSize: 13, fontWeight: 700, color: "#1e3a5f" }}>{ville1.nom}</th>
                    <th style={{ textAlign: "right", padding: "8px 10px", fontSize: 13, fontWeight: 700, color: "#1e3a5f" }}>{ville2.nom}</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      label: "Prix au m²",
                      v1: `${ville1.prix_m2.toLocaleString("fr-FR")} €/m²`,
                      v2: `${ville2.prix_m2.toLocaleString("fr-FR")} €/m²`,
                    },
                    {
                      label: `Loyer mensuel (${typo.toUpperCase()})`,
                      v1: fmt(res.loyer1),
                      v2: fmt(res.loyer2),
                    },
                    {
                      label: "Mensualité estimée (50 m²)",
                      v1: fmt(res.mens1) + "/mois",
                      v2: fmt(res.mens2) + "/mois",
                      highlight: true,
                    },
                    {
                      label: "Taxe foncière",
                      v1: fmt(ville1.taxe_fonciere) + "/an",
                      v2: fmt(ville2.taxe_fonciere) + "/an",
                    },
                    {
                      label: "Appréciation annuelle",
                      v1: `+${ville1.appreciation} %/an`,
                      v2: `+${ville2.appreciation} %/an`,
                    },
                    {
                      label: "Seuil rentabilité",
                      v1: `${ville1.rentabilite_annees} ans`,
                      v2: `${ville2.rentabilite_annees} ans`,
                      highlight: true,
                    },
                    {
                      label: "Tension du marché",
                      v1: <span style={{ color: tensionColor(ville1.tension), fontWeight: 600 }}>{ville1.tension}</span>,
                      v2: <span style={{ color: tensionColor(ville2.tension), fontWeight: 600 }}>{ville2.tension}</span>,
                    },
                  ].map(({ label, v1, v2, highlight }) => (
                    <tr key={label} style={{
                      background: highlight ? "#f8faff" : "transparent",
                      borderBottom: "1px solid #f1f5f9",
                    }}>
                      <td style={{ padding: "9px 10px", fontSize: 13, color: "#64748b" }}>{label}</td>
                      <td style={{ padding: "9px 10px", fontSize: 13, fontWeight: 600, textAlign: "right", color: "#0f172a" }}>{v1}</td>
                      <td style={{ padding: "9px 10px", fontSize: 13, fontWeight: 600, textAlign: "right", color: "#0f172a" }}>{v2}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Bar chart */}
            <div className="fv2-card" style={{ marginTop: 16 }}>
              <p className="fv2-card-kicker">Comparaison visuelle</p>
              <p className="fv2-card-title" style={{ fontSize: 15, marginBottom: 12 }}>
                Indicateurs clés côte à côte
              </p>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={res.chartData} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="metric" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 10 }} tickFormatter={fmtK} />
                  <Tooltip content={<ChartTip />} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Bar dataKey={ville1.nom} fill="#2563eb" radius={[4, 4, 0, 0]} />
                  <Bar dataKey={ville2.nom} fill="#06b6d4" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Verdict */}
            <div className="sv2-verdict sv2-verdict-blue">
              <p className="sv2-verdict-label">Meilleure ville pour acheter</p>
              <p className="sv2-verdict-amount">{res.better.nom}</p>
              <p className="sv2-verdict-sub">
                Seuil de rentabilité : {res.better.rentabilite_annees} ans vs {res.other.rentabilite_annees} ans à {res.other.nom}
              </p>
            </div>

            {/* Insight */}
            <div className="sv2-insight">
              <p>
                📈 Sur 10 ans, un bien de 200&nbsp;000 € à <strong>{ville1.nom}</strong> prendrait{" "}
                <strong style={{ color: "#059669" }}>{fmt(res.gain1)}</strong> de valeur, contre{" "}
                <strong style={{ color: "#2563eb" }}>{fmt(res.gain2)}</strong> à <strong>{ville2.nom}</strong>{" "}
                (appréciation annuelle de {ville1.appreciation} % vs {ville2.appreciation} %).
              </p>
            </div>

            {/* Cross-sell */}
            <SimCrossSell
              show
              loan={crossLoan}
              taux={3.5}
              dureeCredit={20}
            />
          </>
        )}

        {/* Empty state */}
        {(!ville1 || !ville2) && (
          <div className="sv2-insight" style={{ textAlign: "center", color: "#94a3b8" }}>
            Sélectionnez deux villes pour lancer la comparaison.
          </div>
        )}
      </div>
    </SimLayout>
  );
}
