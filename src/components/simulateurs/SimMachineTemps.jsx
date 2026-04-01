import { useState, useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ReferenceLine } from "recharts";
import SimLayout from "./SimLayout";

const fmt = (v) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(v);
const fmtK = (v) => (v >= 1000 ? `${(v / 1000).toFixed(0)}k €` : `${v} €`);

// Approximate average annual inflation per year for France
// Source: INSEE historical CPI data (simplified)
const INFLATION_HISTORY = {
  1980: 13.3, 1981: 13.4, 1982: 11.8, 1983: 9.6,  1984: 7.4,
  1985: 5.8,  1986: 2.7,  1987: 3.1,  1988: 2.7,  1989: 3.6,
  1990: 3.4,  1991: 3.2,  1992: 2.4,  1993: 2.1,  1994: 1.7,
  1995: 1.7,  1996: 2.0,  1997: 1.2,  1998: 0.7,  1999: 0.5,
  2000: 1.7,  2001: 1.7,  2002: 1.9,  2003: 2.1,  2004: 2.1,
  2005: 1.7,  2006: 1.7,  2007: 1.5,  2008: 2.8,  2009: 0.1,
  2010: 1.5,  2011: 2.1,  2012: 2.0,  2013: 0.9,  2014: 0.5,
  2015: 0.0,  2016: 0.2,  2017: 1.0,  2018: 1.8,  2019: 1.1,
  2020: 0.5,  2021: 1.6,  2022: 5.2,  2023: 4.9,  2024: 2.3,
  2025: 1.5,
};

// Approximate price per m² national average France
const PRIX_M2_HISTORY = {
  1980: 500,  1990: 1100, 2000: 1400, 2005: 2200,
  2010: 2800, 2015: 2700, 2018: 2900, 2020: 3000,
  2022: 3200, 2023: 3100, 2024: 3050, 2025: 3050,
  2026: 3100,
};

function getPrixM2(year) {
  if (PRIX_M2_HISTORY[year]) return PRIX_M2_HISTORY[year];
  const years = Object.keys(PRIX_M2_HISTORY).map(Number).sort((a, b) => a - b);
  const before = years.filter((y) => y <= year).pop();
  const after  = years.filter((y) => y > year).shift();
  if (!before) return PRIX_M2_HISTORY[years[0]];
  if (!after)  return PRIX_M2_HISTORY[years[years.length - 1]];
  const t = (year - before) / (after - before);
  return Math.round(PRIX_M2_HISTORY[before] + t * (PRIX_M2_HISTORY[after] - PRIX_M2_HISTORY[before]));
}

function calcHistoricalInflation(startYear, endYear = 2026) {
  let cumulative = 1;
  for (let y = startYear; y < endYear; y++) {
    const rate = INFLATION_HISTORY[y] ?? 2.0;
    cumulative *= 1 + rate / 100;
  }
  return cumulative;
}

const MONTANT_PILLS   = [100, 500, 1000, 5000, 10000];
const ANNEE_PILLS     = [1980, 1990, 2000, 2010, 2015, 2020];
const INFLATION_PILLS = [2, 3, 4];

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
      <div className="chart-tooltip-label" style={{ fontWeight: 700, marginBottom: 4 }}>{label}</div>
      {payload.map((p) => (
        <div key={p.dataKey} className="chart-tooltip-row">
          <span style={{ color: p.stroke }}>{p.name} :</span>
          <span>&nbsp;{fmt(p.value)}</span>
        </div>
      ))}
    </div>
  );
}

export default function SimMachineTemps() {
  const [montant, setMontant]         = useState(1000);
  const [annee, setAnnee]             = useState(2000);
  const [useCustomRate, setUseCustomRate] = useState(false);
  const [customRate, setCustomRate]   = useState(2.0);
  const [inflationMode, setInflationMode] = useState(2); // 2=historical, otherwise pill value

  const effectiveRate = useCustomRate ? customRate : null; // null = use historical data

  const res = useMemo(() => {
    const anneeDebut  = annee;
    const anneeFin    = 2026;
    const nbAnnees    = anneeFin - anneeDebut;

    // Valeur équivalente aujourd'hui
    let valeurAujourdhui;
    let tauxMoyen;

    if (effectiveRate !== null) {
      // Manuel: taux fixe
      valeurAujourdhui = montant * Math.pow(1 + effectiveRate / 100, nbAnnees);
      tauxMoyen = effectiveRate;
    } else {
      // Données historiques
      const cumul = calcHistoricalInflation(anneeDebut, anneeFin);
      valeurAujourdhui = montant * cumul;
      tauxMoyen = nbAnnees > 0 ? (Math.pow(cumul, 1 / nbAnnees) - 1) * 100 : 0;
    }

    const pouvoirAchatPerdu = ((valeurAujourdhui - montant) / valeurAujourdhui) * 100;

    // Prix immobilier
    const prixM2Depart     = getPrixM2(anneeDebut);
    const prixM2Aujourdhui = getPrixM2(2026);
    const surfaceAchetable = montant / prixM2Depart;
    const memeArgentAujourd = montant; // même budget nominal
    const surfaceAujourd   = memeArgentAujourd / prixM2Aujourdhui;

    // Courbe annuelle
    const chartData = [];
    for (let y = anneeDebut; y <= anneeFin; y++) {
      let val;
      if (effectiveRate !== null) {
        val = montant * Math.pow(1 + effectiveRate / 100, y - anneeDebut);
      } else {
        const c = calcHistoricalInflation(anneeDebut, y);
        val = montant * c;
      }
      chartData.push({ annee: y, valeur: Math.round(val) });
    }

    return {
      valeurAujourdhui,
      pouvoirAchatPerdu,
      tauxMoyen,
      nbAnnees,
      prixM2Depart,
      prixM2Aujourdhui,
      surfaceAchetable,
      surfaceAujourd,
      chartData,
    };
  }, [montant, annee, effectiveRate]);

  const inflationSliderPct = Math.min(100, ((customRate - 0.5) / 9.5) * 100);

  return (
    <SimLayout
      icon="⏰"
      title="Que valait 100 € en [année] ?"
      description="Mesurez l'érosion du pouvoir d'achat et comparez avec l'évolution du marché immobilier"
      simTime="1 min"
      suggestions={[
        "/simulateurs/pouvoir-achat-m2",
        "/simulateurs/comparateur-villes",
        "/simulateurs/rentabilite-locative",
        "/simulateurs/pret-immobilier",
        "/simulateurs/endettement",
        "/simulateurs/budget-maximum",
      ]}
    >
      <div className="sv2-container">

        {/* ── Inputs card ── */}
        <div className="fv2-card" style={{ marginBottom: 20 }}>
          <p className="fv2-card-kicker">Machine à remonter le temps</p>
          <p className="fv2-card-title">Comparez le pouvoir d'achat</p>

          {/* Montant */}
          <div style={{ marginBottom: 24 }}>
            <p className="fv2-field-label">Montant de départ</p>
            <div className="fv2-revenus-input-row">
              <input
                type="number" className="fv2-revenus-input"
                value={montant || ""} min={1} max={1000000} step={100}
                placeholder="1 000"
                onChange={(e) => setMontant(Math.max(1, Number(e.target.value) || 1))}
              />
              <span className="fv2-revenus-unit">€</span>
            </div>
            <Pills
              values={MONTANT_PILLS}
              current={montant}
              onSelect={setMontant}
              format={(v) => `${v.toLocaleString("fr-FR")} €`}
            />
          </div>

          {/* Année de départ */}
          <div style={{ marginBottom: 24 }}>
            <p className="fv2-field-label">Année de départ</p>
            <Pills
              values={ANNEE_PILLS}
              current={annee}
              onSelect={setAnnee}
            />
            <div style={{ marginTop: 12 }}>
              <div className="fv2-slider-header">
                <span className="fv2-slider-label">Ou choisissez une année précise</span>
                <span className="fv2-slider-val">{annee}</span>
              </div>
              <div className="fv2-slider-track-wrap"
                style={{ "--pct": `${((annee - 1975) / (2025 - 1975)) * 100}%` }}>
                <input type="range" className="fv2-slider"
                  min={1975} max={2025} step={1} value={annee}
                  onChange={(e) => setAnnee(Number(e.target.value))} />
                <div className="fv2-slider-fill"
                  style={{ width: `${((annee - 1975) / (2025 - 1975)) * 100}%` }} />
              </div>
              <div className="fv2-slider-minmax"><span>1975</span><span>2025</span></div>
            </div>
          </div>

          {/* Taux d'inflation */}
          <div style={{ marginBottom: 8 }}>
            <p className="fv2-field-label">Hypothèse d'inflation</p>
            <div className="fv2-choice-row" style={{ marginBottom: 12 }}>
              <button type="button"
                className={`fv2-choice-btn${!useCustomRate ? " active" : ""}`}
                onClick={() => setUseCustomRate(false)}>
                Données historiques INSEE
              </button>
              <button type="button"
                className={`fv2-choice-btn${useCustomRate ? " active" : ""}`}
                onClick={() => setUseCustomRate(true)}>
                Taux personnalisé
              </button>
            </div>

            {!useCustomRate ? (
              <p className="fv2-hint">
                Taux moyen reconstruit depuis {annee} : <strong>{res.tauxMoyen.toFixed(1)} %/an</strong>
              </p>
            ) : (
              <>
                <div className="fv2-slider-header">
                  <span className="fv2-slider-label">Taux d'inflation annuel moyen</span>
                  <span className="fv2-slider-val">{customRate.toFixed(1)} %</span>
                </div>
                <div className="fv2-slider-track-wrap" style={{ "--pct": `${inflationSliderPct}%` }}>
                  <input type="range" className="fv2-slider"
                    min={0.5} max={10} step={0.5} value={customRate}
                    onChange={(e) => setCustomRate(Number(e.target.value))} />
                  <div className="fv2-slider-fill" style={{ width: `${inflationSliderPct}%` }} />
                </div>
                <div className="fv2-slider-minmax"><span>0,5 %</span><span>10 %</span></div>
                <div className="fv2-revenus-pills" style={{ marginTop: 8 }}>
                  {INFLATION_PILLS.map((p) => (
                    <button key={p} type="button"
                      className={`fv2-revenus-pill${customRate === p ? " active" : ""}`}
                      onClick={() => setCustomRate(p)}>
                      {p} %
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* ── Results card ── */}
        <div className="fv2-card" style={{ marginBottom: 20 }}>

          {/* Verdict */}
          <div className="sv2-verdict sv2-verdict-amber" style={{ marginBottom: 20 }}>
            <div className="sv2-verdict-label">
              {fmt(montant)} en {annee} équivaut aujourd'hui à
            </div>
            <div className="sv2-verdict-amount">{fmt(Math.round(res.valeurAujourdhui))}</div>
            <div className="sv2-verdict-sub">
              Pouvoir d'achat perdu : {res.pouvoirAchatPerdu.toFixed(1)} % sur {res.nbAnnees} ans
            </div>
          </div>

          {/* Stat cards */}
          <div className="sv2-scenarios" style={{ marginBottom: 20 }}>
            <div className="sv2-scenario-card">
              <div className="sv2-scenario-dur">Valeur nominale {annee}</div>
              <div className="sv2-scenario-amt" style={{ fontSize: 15 }}>{fmt(montant)}</div>
            </div>
            <div className="sv2-scenario-card highlight">
              <div className="sv2-scenario-dur">Équivalent 2026</div>
              <div className="sv2-scenario-amt" style={{ fontSize: 14 }}>{fmt(Math.round(res.valeurAujourdhui))}</div>
              <div className="sv2-scenario-badge">Pouvoir d'achat</div>
            </div>
            <div className="sv2-scenario-card">
              <div className="sv2-scenario-dur">Inflation moyenne</div>
              <div className="sv2-scenario-amt" style={{ fontSize: 15 }}>{res.tauxMoyen.toFixed(1)} %/an</div>
            </div>
          </div>

          {/* Line chart */}
          <div style={{ height: 220, marginBottom: 16 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={res.chartData} margin={{ top: 5, right: 10, left: 5, bottom: 5 }}>
                <defs>
                  <linearGradient id="lineGradMT" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#1a56db" />
                    <stop offset="100%" stopColor="#f59e0b" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="annee" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis tickFormatter={(v) => fmtK(v)} tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} width={58} />
                <Tooltip content={<ChartTip />} />
                <ReferenceLine x={2026} stroke="#94a3b8" strokeDasharray="4 3"
                  label={{ value: "Auj.", fontSize: 10, fill: "#94a3b8", position: "insideTopRight" }} />
                <Line type="monotone" dataKey="valeur" name="Valeur équivalente"
                  stroke="#1a56db" strokeWidth={2.5} dot={false} activeDot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Immobilier comparison */}
          <div className="sv2-insight" style={{ marginBottom: 12 }}>
            <strong>Comparaison immobilière</strong><br />
            En {annee}, {fmt(montant)} permettaient d'acheter environ{" "}
            <strong>{res.surfaceAchetable.toFixed(1)} m²</strong> en France (prix moyen :{" "}
            {res.prixM2Depart.toLocaleString("fr-FR")} €/m²).<br />
            Aujourd'hui avec le même budget nominal, vous obtenez{" "}
            <strong>{res.surfaceAujourd.toFixed(1)} m²</strong> (prix moyen : {res.prixM2Aujourdhui.toLocaleString("fr-FR")} €/m²).
          </div>

          {/* Stats grid */}
          <div className="sim-stats-grid">
            <div className="sim-stat-card sim-stat-card-blue">
              <span className="sim-stat-card-label">Prix m² en {annee}</span>
              <span className="sim-stat-card-value">{res.prixM2Depart.toLocaleString("fr-FR")} €</span>
            </div>
            <div className="sim-stat-card">
              <span className="sim-stat-card-label">Prix m² en 2026</span>
              <span className="sim-stat-card-value">{res.prixM2Aujourdhui.toLocaleString("fr-FR")} €</span>
            </div>
            <div className="sim-stat-card">
              <span className="sim-stat-card-label">Surface {annee}</span>
              <span className="sim-stat-card-value">{res.surfaceAchetable.toFixed(1)} m²</span>
            </div>
            <div className="sim-stat-card">
              <span className="sim-stat-card-label">Surface 2026</span>
              <span className="sim-stat-card-value">{res.surfaceAujourd.toFixed(1)} m²</span>
            </div>
          </div>
        </div>
      </div>
    </SimLayout>
  );
}
