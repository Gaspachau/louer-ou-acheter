import { useMemo, useState } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
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

const MONTANT_PILLS = [100000, 150000, 200000, 250000, 300000, 400000];
const TAUX_PILLS = [2.5, 3.0, 3.5, 4.0, 4.5];
const DUREE_OPTIONS = [10, 15, 20, 25];

export default function SimPretImmo() {
  const [montant, setMontant] = useState(200000);
  const [taux, setTaux] = useState(3.5);
  const [duree, setDuree] = useState(20);
  const [assurance, setAssurance] = useState(true);
  const [tauxAssurance, setTauxAssurance] = useState(0.3);
  const [showAmort, setShowAmort] = useState(false);

  const tauxPct = Math.min(100, ((taux - 0.5) / 6.5) * 100);
  const assurPct = Math.min(100, ((tauxAssurance - 0.1) / 0.9) * 100);

  const results = useMemo(() => {
    const mensualite = mortgage(montant, taux, duree);
    const mensualiteAssurance = assurance ? (montant * (tauxAssurance / 100)) / 12 : 0;
    const mensualiteTotale = mensualite + mensualiteAssurance;
    const totalInterets = mensualite * duree * 12 - montant;
    const totalAssurance = assurance ? mensualiteAssurance * duree * 12 : 0;

    const chartData = [];
    let totalCapital = 0;
    let totalInteretsAccum = 0;
    const r = taux / 100 / 12;
    let balance = montant;
    for (let yr = 1; yr <= duree; yr++) {
      for (let m = 0; m < 12; m++) {
        const interet = balance * r;
        const capM = mensualite - interet;
        balance = Math.max(0, balance - capM);
        totalCapital += capM;
        totalInteretsAccum += interet;
      }
      chartData.push({
        year: yr,
        capital: Math.round(Math.min(totalCapital, montant)),
        interets: Math.round(totalInteretsAccum),
      });
    }

    // Amortization table rows
    const rows = [];
    let bal = montant;
    for (let yr = 1; yr <= duree; yr++) {
      let yrInterets = 0;
      let yrCapital = 0;
      for (let m = 0; m < 12; m++) {
        const intM = bal * r;
        const capM = mensualite - intM;
        bal = Math.max(0, bal - capM);
        yrInterets += intM;
        yrCapital += capM;
      }
      rows.push({
        yr,
        mensualite: Math.round(mensualite),
        capital: Math.round(yrCapital),
        interets: Math.round(yrInterets),
        reste: Math.round(Math.max(0, bal)),
      });
    }

    const firstRows = rows.slice(0, Math.min(5, duree));
    const mid = Math.floor(duree / 2);
    const midRows = rows.slice(Math.max(firstRows.length, mid - 2), Math.min(rows.length - 5, mid + 3));
    const lastRows = rows.slice(Math.max(0, duree - 5));

    return {
      mensualite, mensualiteAssurance, mensualiteTotale,
      totalInterets, totalAssurance,
      chartData, rows, firstRows, midRows, lastRows,
    };
  }, [montant, taux, duree, assurance, tauxAssurance]);

  const pctInterets = montant > 0 ? ((results.totalInterets / montant) * 100).toFixed(0) : 0;

  return (
    <SimLayout
      icon="🏦"
      title="Calculez votre mensualité et le coût réel de votre crédit"
      description="La vraie vérité sur ce que vous allez payer"
      suggestions={[
        "/simulateurs/endettement",
        "/simulateurs/frais-notaire",
        "/simulateurs/ptz",
        "/simulateurs/assurance-pret",
        "/simulateurs/remboursement-anticipe",
        "/simulateurs/stress-test",
      ]}
    >
      <div className="sv2-container">

        {/* ── Inputs card ── */}
        <div className="fv2-card" style={{ marginBottom: 20 }}>

          {/* Montant emprunté */}
          <div className="fv2-revenus-wrap" style={{ marginBottom: 24 }}>
            <p className="fv2-field-label">Montant emprunté</p>
            <div className="fv2-revenus-input-row">
              <input
                type="number" className="fv2-revenus-input"
                value={montant || ""} min={10000} max={2000000} step={5000}
                placeholder="200 000"
                onChange={(e) => setMontant(Math.max(0, Math.min(2000000, Number(e.target.value) || 0)))}
              />
              <span className="fv2-revenus-unit">€</span>
            </div>
            <div className="fv2-revenus-pills">
              {MONTANT_PILLS.map((p) => (
                <button key={p} type="button" className={`fv2-revenus-pill${montant === p ? " active" : ""}`} onClick={() => setMontant(p)}>
                  {fmtK(p)}
                </button>
              ))}
            </div>
          </div>

          {/* Taux d'intérêt */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <p className="fv2-field-label" style={{ margin: 0 }}>Taux d'intérêt</p>
              <span style={{ fontSize: 22, fontWeight: 900, color: "#0c1a35" }}>{taux.toFixed(1)} %</span>
            </div>
            <div className="fv2-slider-track-wrap" style={{ "--pct": `${tauxPct}%` }}>
              <input type="range" className="fv2-slider" min={0.5} max={7} step={0.1} value={taux}
                onChange={(e) => setTaux(Number(e.target.value))}/>
              <div className="fv2-slider-fill" style={{ width: `${tauxPct}%` }}/>
            </div>
            <div className="fv2-slider-minmax"><span>0,5 %</span><span>7 %</span></div>
            <div className="fv2-revenus-pills" style={{ marginTop: 8 }}>
              {TAUX_PILLS.map((p) => (
                <button key={p} type="button" className={`fv2-revenus-pill${taux === p ? " active" : ""}`} onClick={() => setTaux(p)}>
                  {p.toFixed(1).replace(".", ",")} %
                </button>
              ))}
            </div>
            <p className="fv2-hint">Moyenne 2026 : 3,5 %</p>
          </div>

          {/* Durée */}
          <div style={{ marginBottom: 24 }}>
            <p className="fv2-field-label">Durée du crédit</p>
            <div className="fv2-revenus-pills">
              {DUREE_OPTIONS.map((d) => (
                <button key={d} type="button" className={`fv2-revenus-pill${duree === d ? " active" : ""}`} onClick={() => setDuree(d)}>
                  {d} ans
                </button>
              ))}
            </div>
          </div>

          {/* Assurance emprunteur */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <p className="fv2-field-label" style={{ margin: 0 }}>Assurance emprunteur</p>
              <button
                type="button"
                onClick={() => setAssurance(!assurance)}
                style={{
                  width: 44, height: 24, borderRadius: 12, border: "none", cursor: "pointer",
                  background: assurance ? "#1a56db" : "#cbd5e1",
                  position: "relative", transition: "background .2s",
                }}
                aria-label={assurance ? "Désactiver l'assurance" : "Activer l'assurance"}
              >
                <span style={{
                  position: "absolute", top: 3, left: assurance ? 23 : 3,
                  width: 18, height: 18, borderRadius: "50%", background: "#fff",
                  transition: "left .2s", boxShadow: "0 1px 4px rgba(0,0,0,.2)"
                }}/>
              </button>
            </div>
            {assurance && (
              <>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <span className="fv2-field-label" style={{ margin: 0, fontSize: 13 }}>Taux d'assurance annuel</span>
                  <span style={{ fontWeight: 700, color: "#0c1a35" }}>{tauxAssurance.toFixed(2)} %</span>
                </div>
                <div className="fv2-slider-track-wrap" style={{ "--pct": `${assurPct}%` }}>
                  <input type="range" className="fv2-slider" min={0.1} max={1} step={0.05} value={tauxAssurance}
                    onChange={(e) => setTauxAssurance(Number(e.target.value))}/>
                  <div className="fv2-slider-fill" style={{ width: `${assurPct}%` }}/>
                </div>
                <div className="fv2-slider-minmax"><span>0,10 %</span><span>1 %</span></div>
                <p className="fv2-hint">Taux moyen marché : 0,3 %</p>
              </>
            )}
          </div>
        </div>

        {/* ── Results card ── */}
        <div className="fv2-card" style={{ marginBottom: 20 }}>

          {/* Big verdict */}
          <div className="sv2-verdict sv2-verdict-blue" style={{ marginBottom: 20 }}>
            <div className="sv2-verdict-label">Votre mensualité est de</div>
            <div className="sv2-verdict-amount">{fmt(Math.round(results.mensualiteTotale))} /mois</div>
            {assurance && (
              <div className="sv2-verdict-sub">dont {fmt(Math.round(results.mensualiteAssurance))} d'assurance</div>
            )}
          </div>

          {/* Stat cards */}
          <div className={`sv2-scenarios`} style={{ gridTemplateColumns: assurance ? "repeat(3,1fr)" : "repeat(2,1fr)", marginBottom: 20 }}>
            <div className="sv2-scenario-card">
              <div className="sv2-scenario-dur">Mensualité totale</div>
              <div className="sv2-scenario-amt" style={{ fontSize: 15 }}>{fmt(Math.round(results.mensualiteTotale))}/mois</div>
            </div>
            <div className="sv2-scenario-card highlight">
              <div className="sv2-scenario-dur">Coût des intérêts</div>
              <div className="sv2-scenario-amt" style={{ fontSize: 14 }}>{fmtK(Math.round(results.totalInterets))}</div>
            </div>
            {assurance && (
              <div className="sv2-scenario-card">
                <div className="sv2-scenario-dur">Coût assurance</div>
                <div className="sv2-scenario-amt" style={{ fontSize: 14 }}>{fmtK(Math.round(results.totalAssurance))}</div>
              </div>
            )}
          </div>

          {/* Area Chart */}
          <div style={{ height: 220, marginBottom: 16 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={results.chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                <defs>
                  <linearGradient id="capGradPI" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1a56db" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#1a56db" stopOpacity={0.04}/>
                  </linearGradient>
                  <linearGradient id="intGradPI" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.04}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9"/>
                <XAxis dataKey="year" tickFormatter={(v) => `An ${v}`} tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false}/>
                <YAxis tickFormatter={(v) => fmtK(v)} tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} width={60}/>
                <Tooltip
                  formatter={(v, name) => [fmt(v), name === "capital" ? "Capital remboursé" : "Intérêts payés"]}
                  contentStyle={{ borderRadius: 10, border: "none", boxShadow: "0 4px 20px rgba(0,0,0,.1)", fontSize: 12 }}
                />
                <Area type="monotone" dataKey="capital" stroke="#1a56db" fill="url(#capGradPI)" strokeWidth={2} name="capital"/>
                <Area type="monotone" dataKey="interets" stroke="#06b6d4" fill="url(#intGradPI)" strokeWidth={2} name="interets"/>
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div style={{ display: "flex", gap: 16, justifyContent: "center", marginBottom: 16 }}>
            <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#64748b" }}>
              <span style={{ width: 12, height: 12, background: "#1a56db", borderRadius: 3, display: "inline-block" }}/> Capital remboursé
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#64748b" }}>
              <span style={{ width: 12, height: 12, background: "#06b6d4", borderRadius: 3, display: "inline-block" }}/> Intérêts payés
            </span>
          </div>

          {/* Insight */}
          <div className="sv2-insight">
            Sur <strong>{duree} ans</strong>, vous remboursez <strong>{fmt(montant)}</strong> de capital et{" "}
            <strong>{fmt(Math.round(results.totalInterets))}</strong> d'intérêts, soit{" "}
            <strong>{pctInterets} %</strong> du montant emprunté.
          </div>

          {/* Amortization table */}
          <button className="sv2-amort-btn" onClick={() => setShowAmort(!showAmort)}>
            {showAmort ? "▲ Masquer le tableau d'amortissement" : "▼ Voir le tableau d'amortissement simplifié"}
          </button>

          {showAmort && (
            <div className="sv2-amort-table-wrap">
              <table className="sv2-amort-table">
                <thead>
                  <tr>
                    <th>Année</th>
                    <th>Mensualité</th>
                    <th>Capital</th>
                    <th>Intérêts</th>
                    <th>Restant dû</th>
                  </tr>
                </thead>
                <tbody>
                  {results.firstRows.map((row) => (
                    <tr key={`f-${row.yr}`}>
                      <td>{row.yr}</td>
                      <td>{fmt(row.mensualite)}</td>
                      <td>{fmt(row.capital)}</td>
                      <td>{fmt(row.interets)}</td>
                      <td>{fmt(row.reste)}</td>
                    </tr>
                  ))}
                  {results.midRows.length > 0 && (
                    <tr className="separator"><td colSpan={5}>…</td></tr>
                  )}
                  {results.midRows.map((row) => (
                    <tr key={`m-${row.yr}`}>
                      <td>{row.yr}</td>
                      <td>{fmt(row.mensualite)}</td>
                      <td>{fmt(row.capital)}</td>
                      <td>{fmt(row.interets)}</td>
                      <td>{fmt(row.reste)}</td>
                    </tr>
                  ))}
                  {results.lastRows.filter((r) => !results.firstRows.some((f) => f.yr === r.yr) && !results.midRows.some((m) => m.yr === r.yr)).length > 0 && (
                    <tr className="separator"><td colSpan={5}>…</td></tr>
                  )}
                  {results.lastRows
                    .filter((r) => !results.firstRows.some((f) => f.yr === r.yr) && !results.midRows.some((m) => m.yr === r.yr))
                    .map((row) => (
                    <tr key={`l-${row.yr}`}>
                      <td>{row.yr}</td>
                      <td>{fmt(row.mensualite)}</td>
                      <td>{fmt(row.capital)}</td>
                      <td>{fmt(row.interets)}</td>
                      <td>{fmt(row.reste)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <SimCrossSell show={montant > 0} loan={montant} taux={taux} dureeCredit={duree} />
      </div>
    </SimLayout>
  );
}
