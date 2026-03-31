import { useMemo, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import Field from "../Field";
import SimLayout from "./SimLayout";
import SimFunnel from "./SimFunnel";
import { formatCurrency } from "../../utils/finance";

/**
 * Données des taux de taxe foncière par commune (taux total 2024, source DGFIP / OFCE).
 * TF = VLC × (1 - abattement 50%) × taux_total
 */
const VILLES = [
  { id: "paris",         name: "Paris (75)",           taux: 13.5,  vlcM2: { appt: 14.2, maison: 15.0 } },
  { id: "lyon",          name: "Lyon (69)",             taux: 40.5,  vlcM2: { appt: 8.8,  maison: 9.5  } },
  { id: "marseille",     name: "Marseille (13)",        taux: 37.2,  vlcM2: { appt: 7.2,  maison: 7.8  } },
  { id: "toulouse",      name: "Toulouse (31)",         taux: 33.0,  vlcM2: { appt: 7.5,  maison: 8.2  } },
  { id: "bordeaux",      name: "Bordeaux (33)",         taux: 28.2,  vlcM2: { appt: 8.2,  maison: 8.8  } },
  { id: "nantes",        name: "Nantes (44)",           taux: 40.2,  vlcM2: { appt: 7.8,  maison: 8.4  } },
  { id: "lille",         name: "Lille (59)",            taux: 37.8,  vlcM2: { appt: 6.8,  maison: 7.4  } },
  { id: "strasbourg",    name: "Strasbourg (67)",       taux: 25.8,  vlcM2: { appt: 7.0,  maison: 7.6  } },
  { id: "nice",          name: "Nice (06)",             taux: 30.4,  vlcM2: { appt: 9.0,  maison: 9.8  } },
  { id: "rennes",        name: "Rennes (35)",           taux: 43.5,  vlcM2: { appt: 7.2,  maison: 7.8  } },
  { id: "montpellier",   name: "Montpellier (34)",      taux: 27.6,  vlcM2: { appt: 7.4,  maison: 8.0  } },
  { id: "grenoble",      name: "Grenoble (38)",         taux: 35.2,  vlcM2: { appt: 6.4,  maison: 7.0  } },
  { id: "autre",         name: "Autre commune",         taux: null,  vlcM2: { appt: 7.0,  maison: 7.8  } },
];

function calcTF({ surface, villeId, typeBien, taux: tauxManuel }) {
  const ville = VILLES.find((v) => v.id === villeId) || VILLES[0];
  const vlcM2 = ville.vlcM2[typeBien === "maison" ? "maison" : "appt"];
  const tauxTotal = villeId === "autre" ? (tauxManuel || 30) : ville.taux;
  // Valeur locative cadastrale estimée
  const vlcBrute = surface * vlcM2;
  // La base imposable = VLC × 50 % (abattement légal)
  const base = vlcBrute * 0.5;
  const tfAnnuelle = base * (tauxTotal / 100);
  const tfMensuelle = tfAnnuelle / 12;
  return { vlcBrute, base, tfAnnuelle, tfMensuelle, tauxTotal, vlcM2, ville: ville.name };
}

const fmtCur = (v) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(v);

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="chart-tooltip">
      <p className="chart-tooltip-label">{label}</p>
      {payload.map((p) => (
        <div key={p.dataKey} className="chart-tooltip-row">
          <span style={{ color: p.fill }}>{p.name}</span>
          <span>{fmtCur(p.value)}</span>
        </div>
      ))}
    </div>
  );
}

export default function SimTaxeFonciere() {
  const [v, setV] = useState({ surface: 65, villeId: "lyon", typeBien: "appt", taux: 30 });
  const set = (k) => (val) => setV((s) => ({ ...s, [k]: val }));
  const res = useMemo(() => calcTF(v), [v]);

  // Données du graphique : TF annuelle dans les principales villes (même surface)
  const compData = useMemo(() => {
    return VILLES.filter((vi) => vi.taux !== null)
      .map((vi) => {
        const r = calcTF({ surface: v.surface, villeId: vi.id, typeBien: v.typeBien, taux: v.taux });
        return { name: vi.name.split(" (")[0], value: Math.round(r.tfAnnuelle), isSelected: vi.id === v.villeId };
      })
      .sort((a, b) => a.value - b.value);
  }, [v.surface, v.villeId, v.typeBien, v.taux]);

  const tfColor = res.tfAnnuelle < 800 ? "green" : res.tfAnnuelle < 1800 ? "amber" : "red";

  return (
    <SimLayout
      icon="🏛️"
      title="Estimateur de taxe foncière"
      description="Estimez votre taxe foncière annuelle selon la ville, le type de bien et la surface — basé sur la valeur locative cadastrale."
      suggestions={["/simulateurs/charges-copro", "/simulateurs/rentabilite-locative", "/simulateurs/plus-value"]}
    >
      <SimFunnel
        steps={[
          {
            title: "Votre bien",
            icon: "🏛️",
            content: (
              <>
                <p className="sim-card-legend">Votre bien immobilier</p>
                <div className="step-fields">
                  <div className="field-full">
                    <Field label="Surface habitable" value={v.surface} onChange={set("surface")} suffix="m²"
                      hint="Surface en m² inscrite sur votre acte de propriété ou déclaration fiscale" tooltip="Surface habitable en m² inscrite sur votre acte de propriété. La taxe foncière est calculée sur la valeur locative cadastrale, elle-même liée à la superficie." />
                  </div>
                </div>

                <div style={{ marginTop: 16 }}>
                  <label className="field-label">Type de bien</label>
                  <div className="loan-type-grid" style={{ marginTop: 8 }}>
                    <button type="button" className={`loan-type-btn${v.typeBien === "appt" ? " loan-type-active" : ""}`} onClick={() => set("typeBien")("appt")}>
                      <span>🏢</span><span>Appartement</span>
                    </button>
                    <button type="button" className={`loan-type-btn${v.typeBien === "maison" ? " loan-type-active" : ""}`} onClick={() => set("typeBien")("maison")}>
                      <span>🏡</span><span>Maison</span>
                    </button>
                  </div>
                </div>

                <div style={{ marginTop: 16 }}>
                  <label className="field-label">Commune</label>
                  <select
                    className="input-select"
                    value={v.villeId}
                    onChange={(e) => set("villeId")(e.target.value)}
                  >
                    {VILLES.map((vi) => (
                      <option key={vi.id} value={vi.id}>{vi.name} {vi.taux ? `— ${vi.taux} %` : ""}</option>
                    ))}
                  </select>
                  <p className="field-hint" style={{ marginTop: 6 }}>
                    Les taux varient de 13,5 % (Paris) à 43,5 % (Rennes) selon les choix fiscaux municipaux.
                  </p>
                </div>

                {v.villeId === "autre" && (
                  <div style={{ marginTop: 12 }}>
                    <Field label="Taux total de taxe foncière (%)" value={v.taux} onChange={set("taux")} suffix="%"
                      hint="Taux communal + taux intercommunal + taux départemental. Consultez impots.gouv.fr" tooltip="Taux total de taxe foncière = taux communal + intercommunal + départemental. Consultez impots.gouv.fr pour votre commune." />
                  </div>
                )}

                <div className="sim-info-box" style={{ marginTop: 20 }}>
                  <p className="sim-info-title">📌 Comment ça marche ?</p>
                  <p className="sim-info-body">La taxe foncière est calculée sur la valeur locative cadastrale (VLC) de votre bien, réduite de moitié (abattement légal), multipliée par le taux voté par la commune. Ici, la VLC est estimée selon les surfaces et zones — l'avis d'imposition réel peut différer.</p>
                </div>
              </>
            ),
          },
        ]}
        result={
          <div className="sim-results-panel">
            <div className={`sim-stat-hero sim-hero-${tfColor}`}>
              <span className="sim-stat-label">Taxe foncière estimée</span>
              <span className="sim-stat-value">
                {formatCurrency(res.tfAnnuelle)}<span className="sim-stat-unit">/an</span>
              </span>
              <span className="sim-stat-sub">Soit {formatCurrency(res.tfMensuelle)}/mois à provisionner</span>
            </div>

            <div className="sim-stats-grid">
              <div className="sim-stat-card">
                <span className="sim-stat-card-label">Valeur locative estimée</span>
                <span className="sim-stat-card-value">{formatCurrency(res.vlcBrute)}/an</span>
              </div>
              <div className="sim-stat-card sim-stat-card-blue">
                <span className="sim-stat-card-label">Base imposable (50 %)</span>
                <span className="sim-stat-card-value">{formatCurrency(res.base)}/an</span>
              </div>
              <div className="sim-stat-card">
                <span className="sim-stat-card-label">Taux communal total</span>
                <span className="sim-stat-card-value">{res.tauxTotal} %</span>
              </div>
              <div className="sim-stat-card">
                <span className="sim-stat-card-label">VLC estimée /m²/mois</span>
                <span className="sim-stat-card-value">{res.vlcM2.toFixed(2)} €</span>
              </div>
            </div>

            <div className="sim-chart-wrap" style={{ marginTop: 0 }}>
              <p className="sim-chart-title">Comparaison inter-villes — même bien ({v.surface} m²)</p>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={compData} layout="vertical" margin={{ top: 4, right: 20, bottom: 4, left: 0 }}>
                  <XAxis type="number" tickFormatter={(v) => `${Math.round(v / 100) * 100} €`} tick={{ fontSize: 9, fill: "#5e6e88" }} axisLine={false} tickLine={false}/>
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: "#64748b" }} axisLine={false} tickLine={false} width={76}/>
                  <Tooltip content={<ChartTooltip />} cursor={{ fill: "rgba(0,0,0,.04)" }}/>
                  <Bar dataKey="value" name="TF annuelle" radius={[0, 6, 6, 0]} barSize={16}>
                    {compData.map((e, i) => (
                      <Cell key={i} fill={e.isSelected ? "#7c3aed" : "#2563eb"} opacity={e.isSelected ? 1 : 0.55}/>
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        }
      />
    </SimLayout>
  );
}
