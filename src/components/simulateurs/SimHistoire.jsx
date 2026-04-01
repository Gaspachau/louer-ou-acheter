import { useState, useMemo } from "react";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid, ReferenceLine,
} from "recharts";
import SimLayout from "./SimLayout";
import SimCrossSell from "./SimCrossSell";

const fmt = (v) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(v);
const fmtK = (v) => (v >= 1000 ? `${(v / 1000).toFixed(0)}k €` : `${v} €`);

const VALEUR_PILLS    = [150000, 200000, 300000, 400000, 500000];
const APPORT_PCT_PILLS = [10, 20, 30];
const DUREE_PILLS     = [5, 10, 15, 20, 25, 30];
const APPREC_PILLS    = [0, 1, 2, 3, 4];
const TAUX_PILLS      = [3.0, 3.5, 4.0, 4.5];

function mortgage(principal, rate, years) {
  if (principal <= 0 || years <= 0) return 0;
  const r = rate / 100 / 12;
  if (r === 0) return principal / (years * 12);
  return (principal * r) / (1 - Math.pow(1 + r, -(years * 12)));
}

function calcTimeline({ valeur, apportPct, duree, loyerMensuel, apprecAnnuelle, taux }) {
  const apport      = Math.round(valeur * apportPct / 100);
  const emprunt     = valeur - apport;
  const fraisNotaire = valeur * 0.08;

  // Achat — charges annuelles
  const chargesCopro   = valeur * 0.003; // 0.3 %/an
  const taxeFonciere   = valeur * 0.006; // 0.6 %/an
  const assuranceHab   = valeur * 0.001; // 0.1 %/an
  const totalChargesAn = chargesCopro + taxeFonciere + assuranceHab;

  const mensualiteCredit  = mortgage(emprunt, taux, 25); // durée crédit standard 25 ans
  const mensualiteCharges = totalChargesAn / 12;
  const coutMensuelAchat  = mensualiteCredit + mensualiteCharges;

  // Location — investissement du capital
  const RENDEMENT_PLACEMENT = 0.04; // 4 %/an

  const chartData = [];
  let capitalRestant = emprunt;
  let portefeuilleLocataire = apport + fraisNotaire; // l'apport est placé
  const r = taux / 100 / 12;

  let breakEvenYear = null;

  for (let yr = 0; yr <= duree; yr++) {
    // Valeur du bien à l'année yr
    const valeurBien = valeur * Math.pow(1 + apprecAnnuelle / 100, yr);

    // Capital restant dû (mensualité sur 25 ans max)
    let cap = emprunt;
    const mois = Math.min(yr * 12, 25 * 12);
    const mensCredit = mortgage(emprunt, taux, 25);
    for (let m = 0; m < mois; m++) {
      const interetM = cap * r;
      cap = Math.max(0, cap - (mensCredit - interetM));
    }
    capitalRestant = cap;

    // Patrimoine net acheteur = valeur bien - capital restant dû - frais revente 5%
    const fraisRevente = valeurBien * 0.05;
    const patrimoineAcheteur = Math.max(0, valeurBien - capitalRestant - fraisRevente);

    // Portefeuille locataire : apport+frais placé à 4 %/an + économies mensuelles (loyer - coût achat) réinvesties
    let pf = (apport + fraisNotaire) * Math.pow(1 + RENDEMENT_PLACEMENT, yr);
    // Ajouter/soustraire la différence mensuelle réinvestie
    const diffMensuelle = loyerMensuel - coutMensuelAchat; // positif si location moins chère
    for (let m = 0; m < yr * 12; m++) {
      const monthsRemaining = yr * 12 - m;
      // simplified: lump sum adjustment
    }
    // Simple accumulated difference
    const diffAccumulee = diffMensuelle > 0
      ? diffMensuelle * 12 * yr * Math.pow(1 + RENDEMENT_PLACEMENT / 2, yr)
      : diffMensuelle * 12 * yr;

    const patrimoineLocataire = Math.max(0, pf + diffAccumulee);

    if (breakEvenYear === null && patrimoineAcheteur > 0 && patrimoineAcheteur >= patrimoineLocataire && yr > 0) {
      breakEvenYear = yr;
    }

    chartData.push({
      annee: yr,
      acheteur: Math.round(patrimoineAcheteur),
      locataire: Math.round(patrimoineLocataire),
    });
  }

  const finalData = chartData[chartData.length - 1];
  const gainAchat = finalData ? finalData.acheteur - finalData.locataire : 0;
  const achatGagne = gainAchat >= 0;

  // Frais totaux achat
  const totalInterets = Math.max(0, mensualiteCredit * Math.min(duree, 25) * 12 - emprunt);
  const totalCharges  = totalChargesAn * duree;
  const capitalRembourse = emprunt - capitalRestant;

  return {
    apport,
    emprunt,
    mensualiteCredit: Math.round(mensualiteCredit),
    mensualiteCharges: Math.round(mensualiteCharges),
    coutMensuelAchat: Math.round(coutMensuelAchat),
    chargesCopro: Math.round(chargesCopro),
    taxeFonciere: Math.round(taxeFonciere),
    assuranceHab: Math.round(assuranceHab),
    totalChargesAn: Math.round(totalChargesAn),
    totalInterets: Math.round(totalInterets),
    totalCharges: Math.round(totalCharges),
    capitalRembourse: Math.round(capitalRembourse),
    valeurFinaleBien: Math.round(valeur * Math.pow(1 + apprecAnnuelle / 100, duree)),
    chartData,
    breakEvenYear,
    achatGagne,
    gainAchat,
    finalData,
  };
}

function ChartTip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="chart-tooltip">
      <div className="chart-tooltip-label" style={{ fontWeight: 700, marginBottom: 4 }}>
        An {label}
      </div>
      {payload.map((p) => (
        <div key={p.dataKey} className="chart-tooltip-row">
          <span style={{ color: p.stroke }}>{p.name} :</span>
          <span>&nbsp;{fmt(p.value)}</span>
        </div>
      ))}
    </div>
  );
}

export default function SimHistoire() {
  const [valeur, setValeur]         = useState(300000);
  const [apportPct, setApportPct]   = useState(20);
  const [duree, setDuree]           = useState(20);
  const [loyerAuto, setLoyerAuto]   = useState(true);
  const [loyerManuel, setLoyerManuel] = useState(0);
  const [apprec, setApprec]         = useState(2);
  const [taux, setTaux]             = useState(3.5);

  const loyerCalcule = Math.round(valeur * 0.004); // 0.4 %/mois
  const loyerMensuel = loyerAuto ? loyerCalcule : (loyerManuel || loyerCalcule);

  const res = useMemo(() => calcTimeline({
    valeur, apportPct, duree,
    loyerMensuel, apprecAnnuelle: apprec, taux,
  }), [valeur, apportPct, duree, loyerMensuel, apprec, taux]);

  const verdictClass = res.achatGagne ? "sv2-verdict-green" : "sv2-verdict-amber";

  return (
    <SimLayout
      icon="📖"
      title="Loyer vs achat sur X ans"
      description="Comparez le patrimoine net de l'acheteur et du locataire sur toute la durée de simulation"
      simTime="2 min"
      suggestions={[
        "/simulateurs/pret-immobilier",
        "/simulateurs/endettement",
        "/simulateurs/machine-temps",
        "/simulateurs/comparateur-villes",
        "/simulateurs/rentabilite-locative",
        "/simulateurs/stress-test",
      ]}
    >
      <div className="sv2-container">

        {/* ── Inputs card ── */}
        <div className="fv2-card" style={{ marginBottom: 20 }}>
          <p className="fv2-card-kicker">Comparaison long terme</p>
          <p className="fv2-card-title">Renseignez les paramètres</p>

          {/* Valeur du bien */}
          <div style={{ marginBottom: 24 }}>
            <p className="fv2-field-label">Valeur du bien</p>
            <div className="fv2-revenus-input-row">
              <input
                type="number" className="fv2-revenus-input"
                value={valeur || ""} min={50000} max={2000000} step={5000}
                placeholder="300 000"
                onChange={(e) => setValeur(Math.max(0, Number(e.target.value) || 0))}
              />
              <span className="fv2-revenus-unit">€</span>
            </div>
            <div className="fv2-revenus-pills">
              {VALEUR_PILLS.map((p) => (
                <button key={p} type="button"
                  className={`fv2-revenus-pill${valeur === p ? " active" : ""}`}
                  onClick={() => setValeur(p)}>
                  {fmtK(p)}
                </button>
              ))}
            </div>
          </div>

          {/* Apport */}
          <div style={{ marginBottom: 24 }}>
            <p className="fv2-field-label">Apport personnel</p>
            <div className="fv2-revenus-pills">
              {APPORT_PCT_PILLS.map((p) => (
                <button key={p} type="button"
                  className={`fv2-revenus-pill${apportPct === p ? " active" : ""}`}
                  onClick={() => setApportPct(p)}>
                  {p} % ({fmtK(Math.round(valeur * p / 100))})
                </button>
              ))}
            </div>
          </div>

          {/* Durée de simulation */}
          <div style={{ marginBottom: 24 }}>
            <p className="fv2-field-label">Durée de simulation</p>
            <div className="fv2-revenus-pills">
              {DUREE_PILLS.map((d) => (
                <button key={d} type="button"
                  className={`fv2-revenus-pill${duree === d ? " active" : ""}`}
                  onClick={() => setDuree(d)}>
                  {d} ans
                </button>
              ))}
            </div>
          </div>

          {/* Loyer mensuel */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <p className="fv2-field-label" style={{ margin: 0 }}>Loyer mensuel équivalent</p>
              <button type="button"
                onClick={() => setLoyerAuto(!loyerAuto)}
                style={{
                  width: 44, height: 24, borderRadius: 12, border: "none", cursor: "pointer",
                  background: loyerAuto ? "#1a56db" : "#cbd5e1",
                  position: "relative", transition: "background .2s",
                }}
                aria-label={loyerAuto ? "Passer en saisie manuelle" : "Calculer automatiquement"}>
                <span style={{
                  position: "absolute", top: 3, left: loyerAuto ? 23 : 3,
                  width: 18, height: 18, borderRadius: "50%", background: "#fff",
                  transition: "left .2s", boxShadow: "0 1px 4px rgba(0,0,0,.2)",
                }} />
              </button>
            </div>
            {loyerAuto ? (
              <p className="fv2-hint">
                Loyer calculé automatiquement : <strong>{fmt(loyerCalcule)}/mois</strong>{" "}
                (0,4 % de la valeur du bien)
              </p>
            ) : (
              <>
                <div className="fv2-revenus-input-row">
                  <input
                    type="number" className="fv2-revenus-input"
                    value={loyerManuel || ""} min={100} max={10000} step={50}
                    placeholder={String(loyerCalcule)}
                    onChange={(e) => setLoyerManuel(Math.max(0, Number(e.target.value) || 0))}
                  />
                  <span className="fv2-revenus-unit">€ / mois</span>
                </div>
                <p className="fv2-hint">Loyer estimé auto : {fmt(loyerCalcule)}/mois</p>
              </>
            )}
          </div>

          {/* Revalorisation */}
          <div style={{ marginBottom: 24 }}>
            <p className="fv2-field-label">Revalorisation annuelle du bien</p>
            <div className="fv2-revenus-pills">
              {APPREC_PILLS.map((p) => (
                <button key={p} type="button"
                  className={`fv2-revenus-pill${apprec === p ? " active" : ""}`}
                  onClick={() => setApprec(p)}>
                  {p === 0 ? "Stable" : `+${p} %/an`}
                </button>
              ))}
            </div>
          </div>

          {/* Taux d'intérêt */}
          <div style={{ marginBottom: 8 }}>
            <p className="fv2-field-label">Taux d'intérêt du crédit</p>
            <div className="fv2-revenus-pills">
              {TAUX_PILLS.map((p) => (
                <button key={p} type="button"
                  className={`fv2-revenus-pill${taux === p ? " active" : ""}`}
                  onClick={() => setTaux(p)}>
                  {p.toFixed(1).replace(".", ",")} %
                </button>
              ))}
            </div>
            <p className="fv2-hint">Durée du crédit : 25 ans (standard)</p>
          </div>
        </div>

        {/* ── Results card ── */}
        <div className="fv2-card" style={{ marginBottom: 20 }}>

          {/* Verdict */}
          <div className={`sv2-verdict ${verdictClass}`} style={{ marginBottom: 20 }}>
            <div className="sv2-verdict-label">
              {res.achatGagne ? "L'achat est gagnant sur" : "La location est gagnante sur"} {duree} ans
            </div>
            <div className="sv2-verdict-amount">
              {fmt(Math.abs(res.gainAchat))} d'avance
            </div>
            <div className="sv2-verdict-sub">
              {res.breakEvenYear !== null
                ? `L'achat dépasse la location à partir de l'an ${res.breakEvenYear}`
                : res.achatGagne
                ? "L'achat est avantageux dès le départ"
                : "La location reste avantageuse sur toute la période"}
            </div>
          </div>

          {/* Scenarios */}
          <div className="sv2-scenarios" style={{ marginBottom: 20 }}>
            <div className="sv2-scenario-card">
              <div className="sv2-scenario-dur">Mensualité crédit</div>
              <div className="sv2-scenario-amt" style={{ fontSize: 14 }}>{fmt(res.mensualiteCredit)}/mois</div>
            </div>
            <div className={`sv2-scenario-card${res.achatGagne ? " highlight" : ""}`}>
              <div className="sv2-scenario-dur">Patrimoine acheteur an {duree}</div>
              <div className="sv2-scenario-amt" style={{ fontSize: 13 }}>
                {fmt(res.finalData?.acheteur ?? 0)}
              </div>
              {res.achatGagne && <div className="sv2-scenario-badge">Gagnant</div>}
            </div>
            <div className={`sv2-scenario-card${!res.achatGagne ? " highlight" : ""}`}>
              <div className="sv2-scenario-dur">Patrimoine locataire an {duree}</div>
              <div className="sv2-scenario-amt" style={{ fontSize: 13 }}>
                {fmt(res.finalData?.locataire ?? 0)}
              </div>
              {!res.achatGagne && <div className="sv2-scenario-badge">Gagnant</div>}
            </div>
          </div>

          {/* Area chart */}
          <p style={{ fontSize: 13, fontWeight: 700, color: "#0c1a35", marginBottom: 8 }}>
            Évolution du patrimoine net sur {duree} ans
          </p>
          <div style={{ height: 240, marginBottom: 16 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={res.chartData} margin={{ top: 5, right: 10, left: 5, bottom: 5 }}>
                <defs>
                  <linearGradient id="gradAchet" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#1a56db" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#1a56db" stopOpacity={0.04} />
                  </linearGradient>
                  <linearGradient id="gradLocat" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#10b981" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.04} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="annee"
                  tickFormatter={(v) => v === 0 ? "Départ" : `An ${v}`}
                  tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis tickFormatter={(v) => fmtK(v)}
                  tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} width={62} />
                <Tooltip content={<ChartTip />} />
                {res.breakEvenYear !== null && (
                  <ReferenceLine x={res.breakEvenYear} stroke="#f59e0b" strokeDasharray="5 3"
                    label={{ value: "Point d'équilibre", fontSize: 10, fill: "#d97706", position: "insideTopRight" }} />
                )}
                <Area type="monotone" dataKey="acheteur" name="Acheteur"
                  stroke="#1a56db" fill="url(#gradAchet)" strokeWidth={2} />
                <Area type="monotone" dataKey="locataire" name="Locataire (invest.)"
                  stroke="#10b981" fill="url(#gradLocat)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div style={{ display: "flex", gap: 20, justifyContent: "center", marginBottom: 16 }}>
            <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#64748b" }}>
              <span style={{ width: 12, height: 12, background: "#1a56db", borderRadius: 3, display: "inline-block" }} />
              Patrimoine acheteur
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#64748b" }}>
              <span style={{ width: 12, height: 12, background: "#10b981", borderRadius: 3, display: "inline-block" }} />
              Portefeuille locataire
            </span>
          </div>

          {/* Line items */}
          <div className="sv2-line-items" style={{ marginBottom: 16 }}>
            <div className="sv2-line-item">
              <div className="sv2-line-item-row">
                <span className="sv2-line-item-label">Charges copro annuelles</span>
                <span className="sv2-line-item-amount">{fmt(res.chargesCopro)}/an</span>
              </div>
            </div>
            <div className="sv2-line-item">
              <div className="sv2-line-item-row">
                <span className="sv2-line-item-label">Taxe foncière estimée</span>
                <span className="sv2-line-item-amount">{fmt(res.taxeFonciere)}/an</span>
              </div>
            </div>
            <div className="sv2-line-item">
              <div className="sv2-line-item-row">
                <span className="sv2-line-item-label">Assurance habitation</span>
                <span className="sv2-line-item-amount">{fmt(res.assuranceHab)}/an</span>
              </div>
            </div>
            <div className="sv2-line-item">
              <div className="sv2-line-item-row">
                <span className="sv2-line-item-label">Valeur finale du bien (an {duree})</span>
                <span className="sv2-line-item-amount" style={{ color: "#1a56db", fontWeight: 700 }}>
                  {fmt(res.valeurFinaleBien)}
                </span>
              </div>
              <div className="sv2-line-bar-track">
                <div className="sv2-line-bar-fill"
                  style={{ width: `${Math.min(100, (res.valeurFinaleBien / (valeur * 2)) * 100)}%`, background: "#1a56db" }} />
              </div>
            </div>
          </div>

          {/* Insight */}
          <div className="sv2-insight">
            Après <strong>{duree} ans</strong>, l'acheteur possède un patrimoine net estimé à{" "}
            <strong>{fmt(res.finalData?.acheteur ?? 0)}</strong> contre{" "}
            <strong>{fmt(res.finalData?.locataire ?? 0)}</strong> pour le locataire-investisseur.{" "}
            {res.breakEvenYear !== null
              ? <>Le point d'équilibre est atteint à <strong>l'an {res.breakEvenYear}</strong>.</>
              : res.achatGagne
              ? "L'achat est avantageux dès le départ avec ces paramètres."
              : "Avec ces paramètres, la location + investissement reste plus performante."}
          </div>
        </div>

        <SimCrossSell
          show={res.emprunt > 0}
          loan={res.emprunt}
          taux={taux}
          dureeCredit={25}
        />
      </div>
    </SimLayout>
  );
}
