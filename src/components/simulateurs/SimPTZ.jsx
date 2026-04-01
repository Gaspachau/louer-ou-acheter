import { useMemo, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import SimLayout from "./SimLayout";
import SimCrossSell from "./SimCrossSell";

const fmt = (v) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(v);
const fmtK = (v) => (v >= 1000 ? `${(v / 1000).toFixed(0)}k €` : `${v} €`);

function mortgage(p, r, y) {
  if (p <= 0 || y <= 0) return 0;
  const mr = r / 100 / 12;
  if (mr === 0) return p / (y * 12);
  return (p * mr) / (1 - Math.pow(1 + mr, -(y * 12)));
}

const ZONES = {
  "A bis": {
    plafonds: [37000, 51800, 62900, 74000, 85100],
    ptzPct: 0.50,
    ptzMax: [150000, 210000, 255000, 300000, 345000],
    label: "Zone A bis", desc: "Paris, Côte d'Azur",
  },
  "A": {
    plafonds: [37000, 51800, 62900, 74000, 85100],
    ptzPct: 0.40,
    ptzMax: [150000, 210000, 255000, 300000, 345000],
    label: "Zone A", desc: "Île-de-France, Lyon, Marseille…",
  },
  "B1": {
    plafonds: [30000, 42000, 51000, 60000, 69000],
    ptzPct: 0.40,
    ptzMax: [135000, 189000, 230000, 270000, 310500],
    label: "Zone B1", desc: "Grandes agglomérations",
  },
  "B2": {
    plafonds: [27000, 37800, 45900, 54000, 62100],
    ptzPct: 0.20,
    ptzMax: [110000, 154000, 187000, 220000, 253000],
    label: "Zone B2", desc: "Villes moyennes",
  },
  "C": {
    plafonds: [24000, 33600, 40800, 48000, 55200],
    ptzPct: 0.20,
    ptzMax: [100000, 140000, 170000, 200000, 230000],
    label: "Zone C", desc: "Zones rurales",
  },
};

const FAMILLE_OPTIONS = [
  { label: "Seul", nb: 1 },
  { label: "En couple", nb: 2 },
  { label: "Famille 1 enfant", nb: 3 },
  { label: "Famille 2 enfants", nb: 4 },
  { label: "Famille 3 enfants+", nb: 5 },
];

const REVENUS_PILLS = [20000, 30000, 40000, 50000, 60000, 80000];
const PRIX_PILLS = [150000, 200000, 250000, 300000, 400000];

export default function SimPTZ() {
  const [nbPersonnes, setNbPersonnes] = useState(1);
  const [revenus, setRevenus] = useState(42000);
  const [zone, setZone] = useState("B1");
  const [typeBien, setTypeBien] = useState("neuf");
  const [prix, setPrix] = useState(220000);
  const [tauxCredit, setTauxCredit] = useState(3.5);
  const [dureeCredit, setDureeCredit] = useState(20);

  const tauxPct = Math.min(100, ((tauxCredit - 1) / 6) * 100);

  const result = useMemo(() => {
    const zoneData = ZONES[zone];
    const idx = Math.min(nbPersonnes - 1, 4);
    const plafond = zoneData.plafonds[idx];
    const maxPTZ = zoneData.ptzMax[idx];

    // Éligibilité
    if (revenus > plafond) {
      return {
        eligible: false,
        reason: `Vos revenus fiscaux (${fmt(revenus)}) dépassent le plafond ${zoneData.label} pour ${nbPersonnes} personne${nbPersonnes > 1 ? "s" : ""} (${fmt(plafond)}).`,
        montantPTZ: 0,
      };
    }

    if (typeBien === "ancien" && (zone !== "B2" && zone !== "C")) {
      return {
        eligible: false,
        reason: "L'ancien avec travaux n'est éligible au PTZ qu'en zones B2 et C.",
        montantPTZ: 0,
      };
    }

    // Montant PTZ
    const montantPTZ = Math.min(prix * zoneData.ptzPct, maxPTZ);

    // Durée et différé PTZ (simplifiés 2026)
    const dureePTZ = revenus <= plafond * 0.5 ? 25 : revenus <= plafond * 0.7 ? 22 : 20;
    const differe = revenus <= plafond * 0.5 ? 15 : revenus <= plafond * 0.7 ? 10 : 5;
    const dureePTZRemb = dureePTZ - differe;
    const mensualitePTZ = montantPTZ / (dureePTZRemb * 12);

    // Crédit classique sur le reste
    const creditClassique = Math.max(0, prix - montantPTZ);
    const mensualiteClassique = mortgage(creditClassique, tauxCredit, dureeCredit);
    const mensualiteTotale = mensualitePTZ + mensualiteClassique;

    // Coût total sans PTZ
    const mensualiteSansPTZ = mortgage(prix, tauxCredit, dureeCredit);
    const coutSansPTZ = mensualiteSansPTZ * dureeCredit * 12;
    const coutAvecPTZ =
      mensualiteClassique * dureeCredit * 12 +
      mensualitePTZ * dureePTZRemb * 12;
    const economie = coutSansPTZ - coutAvecPTZ;

    return {
      eligible: true,
      montantPTZ: Math.round(montantPTZ),
      dureePTZ,
      differe,
      dureePTZRemb,
      mensualitePTZ: Math.round(mensualitePTZ),
      creditClassique: Math.round(creditClassique),
      mensualiteClassique: Math.round(mensualiteClassique),
      mensualiteTotale: Math.round(mensualiteTotale),
      mensualiteSansPTZ: Math.round(mensualiteSansPTZ),
      coutSansPTZ: Math.round(coutSansPTZ),
      coutAvecPTZ: Math.round(coutAvecPTZ),
      economie: Math.round(economie),
      plafond,
    };
  }, [nbPersonnes, revenus, zone, typeBien, prix, tauxCredit, dureeCredit]);

  const chartData = result.eligible ? [
    { name: "Sans PTZ", cout: result.coutSansPTZ, fill: "#94a3b8" },
    { name: "Avec PTZ", cout: result.coutAvecPTZ, fill: "#1a56db" },
  ] : [];

  return (
    <SimLayout
      icon="🏠"
      title="Êtes-vous éligible au Prêt à Taux Zéro 2026 ?"
      description="Vérifiez votre éligibilité et calculez le montant de votre aide"
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

          {/* Situation familiale */}
          <p className="fv2-field-label" style={{ marginBottom: 10 }}>Situation familiale</p>
          <div className="sv2-famille-pills" style={{ marginBottom: 24 }}>
            {FAMILLE_OPTIONS.map((opt) => (
              <button
                key={opt.nb} type="button"
                className={`sv2-famille-pill${nbPersonnes === opt.nb ? " active" : ""}`}
                onClick={() => setNbPersonnes(opt.nb)}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Revenus fiscaux */}
          <div className="fv2-revenus-wrap" style={{ marginBottom: 24 }}>
            <p className="fv2-field-label">Revenus fiscaux de référence (N-2)</p>
            <div className="fv2-revenus-input-row">
              <input
                type="number" className="fv2-revenus-input"
                value={revenus || ""} min={0} max={500000} step={1000}
                placeholder="42 000"
                onChange={(e) => setRevenus(Math.max(0, Math.min(500000, Number(e.target.value) || 0)))}
              />
              <span className="fv2-revenus-unit">€ / an</span>
            </div>
            <div className="fv2-revenus-pills">
              {REVENUS_PILLS.map((p) => (
                <button key={p} type="button" className={`fv2-revenus-pill${revenus === p ? " active" : ""}`} onClick={() => setRevenus(p)}>
                  {fmtK(p)}
                </button>
              ))}
            </div>
            <p className="fv2-hint">Revenus fiscaux de référence (N-2) de votre foyer</p>
          </div>

          {/* Zone géographique */}
          <p className="fv2-field-label" style={{ marginBottom: 10 }}>Zone géographique</p>
          <div className="sv2-zone-pills" style={{ marginBottom: 24 }}>
            {Object.entries(ZONES).map(([key, z]) => (
              <button
                key={key} type="button"
                className={`sv2-zone-pill${zone === key ? " active" : ""}`}
                onClick={() => setZone(key)}
              >
                <span className="sv2-zone-pill-name">{z.label}</span>
                <span className="sv2-zone-pill-desc">{z.desc}</span>
              </button>
            ))}
          </div>

          {/* Type de bien */}
          <p className="fv2-field-label" style={{ marginBottom: 10 }}>Type de bien</p>
          <div className="fv2-choices-row" style={{ marginBottom: 24 }}>
            <button
              type="button"
              className={`fv2-choice${typeBien === "neuf" ? " fv2-choice-active" : ""}`}
              onClick={() => setTypeBien("neuf")}
            >
              <span className="fv2-choice-body">
                <span className="fv2-choice-label">🏗️ Neuf</span>
                <span className="fv2-choice-sub">Construction neuve, VEFA</span>
              </span>
            </button>
            <button
              type="button"
              className={`fv2-choice${typeBien === "ancien" ? " fv2-choice-active" : ""}`}
              onClick={() => setTypeBien("ancien")}
            >
              <span className="fv2-choice-body">
                <span className="fv2-choice-label">🏚️ Ancien avec travaux</span>
                <span className="fv2-choice-sub">Rénovation en zone B2/C uniquement</span>
              </span>
            </button>
          </div>

          {/* Prix du bien */}
          <div className="fv2-revenus-wrap" style={{ marginBottom: 24 }}>
            <p className="fv2-field-label">Prix du bien</p>
            <div className="fv2-revenus-input-row">
              <input
                type="number" className="fv2-revenus-input"
                value={prix || ""} min={50000} max={2000000} step={5000}
                placeholder="220 000"
                onChange={(e) => setPrix(Math.max(0, Math.min(2000000, Number(e.target.value) || 0)))}
              />
              <span className="fv2-revenus-unit">€</span>
            </div>
            <div className="fv2-revenus-pills">
              {PRIX_PILLS.map((p) => (
                <button key={p} type="button" className={`fv2-revenus-pill${prix === p ? " active" : ""}`} onClick={() => setPrix(p)}>
                  {fmtK(p)}
                </button>
              ))}
            </div>
          </div>

          {/* Taux crédit classique */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <p className="fv2-field-label" style={{ margin: 0 }}>Taux du crédit classique</p>
              <span style={{ fontSize: 20, fontWeight: 900, color: "#0c1a35" }}>{tauxCredit.toFixed(1)} %</span>
            </div>
            <div className="fv2-slider-track-wrap" style={{ "--pct": `${tauxPct}%` }}>
              <input type="range" className="fv2-slider" min={1} max={7} step={0.1} value={tauxCredit}
                onChange={(e) => setTauxCredit(Number(e.target.value))}/>
              <div className="fv2-slider-fill" style={{ width: `${tauxPct}%` }}/>
            </div>
            <div className="fv2-slider-minmax"><span>1 %</span><span>7 %</span></div>
          </div>
        </div>

        {/* ── Results card ── */}
        <div className="fv2-card" style={{ marginBottom: 20 }}>

          {/* Verdict */}
          {!result.eligible ? (
            <div className="sv2-verdict sv2-verdict-amber" style={{ marginBottom: 20 }}>
              <div className="sv2-verdict-label">⚠️ Non éligible au PTZ</div>
              <div style={{ fontSize: 14, opacity: 0.85, marginTop: 8 }}>{result.reason}</div>
            </div>
          ) : (
            <>
              <div className="sv2-verdict sv2-verdict-green" style={{ marginBottom: 20 }}>
                <div className="sv2-verdict-label">✓ Félicitations, vous êtes éligible au PTZ !</div>
                <div className="sv2-verdict-amount">{fmt(result.montantPTZ)}</div>
                <div className="sv2-verdict-sub">Montant du PTZ 2026</div>
              </div>

              {/* Key cards */}
              <div className="sv2-scenarios" style={{ marginBottom: 20 }}>
                <div className="sv2-scenario-card highlight">
                  <div className="sv2-scenario-dur">Montant PTZ</div>
                  <div className="sv2-scenario-amt" style={{ fontSize: 16 }}>{fmt(result.montantPTZ)}</div>
                  <div className="sv2-scenario-badge">0 % d'intérêts</div>
                </div>
                <div className="sv2-scenario-card">
                  <div className="sv2-scenario-dur">Différé de paiement</div>
                  <div className="sv2-scenario-amt" style={{ fontSize: 16 }}>{result.differe} ans</div>
                  <div style={{ fontSize: 10, color: "#64748b", marginTop: 4 }}>Puis {result.dureePTZRemb} ans</div>
                </div>
                <div className="sv2-scenario-card">
                  <div className="sv2-scenario-dur">Mensualité totale</div>
                  <div className="sv2-scenario-amt" style={{ fontSize: 16 }}>{fmt(result.mensualiteTotale)}/mois</div>
                </div>
              </div>

              {/* Bar chart comparing costs */}
              <div style={{ height: 200, marginBottom: 16 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} barCategoryGap="40%">
                    <XAxis dataKey="name" tick={{ fontSize: 13, fill: "#64748b" }} axisLine={false} tickLine={false}/>
                    <YAxis hide/>
                    <Tooltip
                      formatter={(v) => [fmt(v), "Coût total"]}
                      contentStyle={{ borderRadius: 10, border: "none", boxShadow: "0 4px 20px rgba(0,0,0,.1)", fontSize: 13 }}
                    />
                    <Bar dataKey="cout" radius={[6, 6, 0, 0]}>
                      {chartData.map((entry, i) => (
                        <Cell key={i} fill={entry.fill}/>
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Insight */}
              <div className="sv2-insight">
                Grâce au PTZ, votre mensualité totale est de <strong>{fmt(result.mensualiteTotale)}</strong>, soit{" "}
                <strong>{fmt(result.mensualiteSansPTZ - result.mensualiteTotale)} de moins</strong> par mois pendant{" "}
                {dureeCredit} ans.
              </div>

              {result.economie > 0 && (
                <div className="sv2-insight" style={{ background: "linear-gradient(135deg,#f0fdf4,#dcfce7)", color: "#15803d" }}>
                  💰 Économie totale sur la durée du crédit :{" "}
                  <strong>{fmt(result.economie)}</strong> grâce au PTZ.
                </div>
              )}
            </>
          )}
        </div>

        <SimCrossSell
          show={true}
          loan={Math.max(0, prix - result.montantPTZ)}
          taux={tauxCredit}
          dureeCredit={dureeCredit}
        />
      </div>
    </SimLayout>
  );
}
