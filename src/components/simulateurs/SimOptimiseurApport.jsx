import { useMemo, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ReferenceLine, Legend } from "recharts";
import SimLayout from "./SimLayout";
import Field from "../Field";

const fmtCur = (v) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(v);
const fmtK = (v) => (Math.abs(v) >= 1000 ? `${Math.round(v / 1000)}k€` : `${Math.round(v)}€`);

function calcMensualite(capital, taux, dureeAns) {
  if (capital <= 0) return 0;
  const r = taux / 100 / 12;
  const n = dureeAns * 12;
  return r === 0 ? capital / n : (capital * r) / (1 - Math.pow(1 + r, -n));
}

function calcCoutTotal(capital, taux, dureeAns) {
  return calcMensualite(capital, taux, dureeAns) * dureeAns * 12;
}

function buildApportCurve(prix, taux, duree, apportMin = 0, apportMax = null) {
  const max = apportMax ?? prix * 0.5;
  const step = Math.max(5000, Math.round((max - apportMin) / 20 / 5000) * 5000);
  const points = [];
  for (let a = apportMin; a <= max; a += step) {
    const capital = Math.max(0, prix * 1.08 - a);
    const mensualite = calcMensualite(capital, taux, duree);
    const coutCredit = Math.max(0, calcCoutTotal(capital, taux, duree) - capital);
    points.push({
      apport: a,
      apportK: Math.round(a / 1000),
      mensualite: Math.round(mensualite),
      coutInterets: Math.round(coutCredit),
    });
  }
  return points;
}

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="chart-tooltip">
      <p className="chart-tooltip-label">Apport {label}k€</p>
      {payload.map((p) => (
        <div key={p.dataKey} className="chart-tooltip-row">
          <span style={{ color: p.stroke }}>{p.name}</span>
          <span>{fmtK(p.value)}/mois</span>
        </div>
      ))}
    </div>
  );
}

export default function SimOptimiseurApport() {
  const [v, setV] = useState({
    prixBien: 280000,
    apportActuel: 40000,
    apportCible: 70000,
    taux: 3.5,
    duree: 20,
    epargneParMois: 800,
    loyerActuel: 950,
  });
  const set = (k) => (val) => setV((s) => ({ ...s, [k]: val }));

  const res = useMemo(() => {
    const { prixBien, apportActuel, apportCible, taux, duree, epargneParMois, loyerActuel } = v;
    if (!prixBien || prixBien <= 0) return null;

    const capitalActuel = Math.max(0, prixBien * 1.08 - apportActuel);
    const capitalCible = Math.max(0, prixBien * 1.08 - apportCible);

    const mensActuel = calcMensualite(capitalActuel, taux, duree);
    const mensCible = calcMensualite(capitalCible, taux, duree);
    const gainMensuel = mensActuel - mensCible;

    const interetsActuel = Math.max(0, calcCoutTotal(capitalActuel, taux, duree) - capitalActuel);
    const interetsCible = Math.max(0, calcCoutTotal(capitalCible, taux, duree) - capitalCible);
    const economieTotale = interetsActuel - interetsCible;

    const diffApport = apportCible - apportActuel;
    const moisAttente = diffApport > 0 && epargneParMois > 0
      ? Math.ceil(diffApport / epargneParMois)
      : 0;
    const coutLoyer = moisAttente * loyerActuel;

    // Breakeven: loyer payé vs économies d'intérêts
    const vraiEconomie = economieTotale - coutLoyer;
    const roi = diffApport > 0 ? (economieTotale / diffApport) * 100 : 0;

    const curve = buildApportCurve(prixBien, taux, duree, 0, prixBien * 0.4);

    return {
      mensActuel, mensCible, gainMensuel, interetsActuel, interetsCible,
      economieTotale, diffApport, moisAttente, coutLoyer, vraiEconomie, roi, curve,
      apportActuelPct: (apportActuel / prixBien) * 100,
      apportCiblePct: (apportCible / prixBien) * 100,
    };
  }, [v]);

  return (
    <SimLayout
      icon="💡"
      title="Optimiseur d'apport"
      description="Vaut-il mieux acheter maintenant ou épargner quelques mois de plus ? Comparez l'impact chiffré."
    >
      <div className="sim-layout">
        <div className="sim-card">
          <p className="sim-card-legend">Votre projet</p>
          <div className="step-fields">
            <Field label="Prix du bien" value={v.prixBien} onChange={set("prixBien")} suffix="€" tooltip="Prix d'achat hors frais de notaire. Médiane France 2026 : ~250 000 € (source : Notaires de France)." />
            <Field label="Taux du crédit" value={v.taux} onChange={set("taux")} suffix="%" step="0.1" hint="Mars 2026 : ~3,3–4,0 %" tooltip="Taux d'intérêt annuel de votre prêt. Moyenne France 2026 : 3,3–3,7 % sur 20 ans. Comparez les offres avec un courtier." />
            <Field label="Durée du prêt" value={v.duree} onChange={set("duree")} suffix="ans" tooltip="Nombre d'années de remboursement. Plus c'est long → mensualité basse mais intérêts totaux élevés. Limite légale HCSF : 25 ans (27 ans dans le neuf)." />
          </div>

          <p className="sim-card-legend" style={{ marginTop: 16 }}>Deux scénarios à comparer</p>
          <div className="optim-scenario-grid">
            <div className="optim-scenario-card optim-a">
              <p className="optim-scenario-label">Scénario A — Acheter maintenant</p>
              <Field label="Apport disponible" value={v.apportActuel} onChange={set("apportActuel")} suffix="€"
                hint={res ? `${res.apportActuelPct.toFixed(0)} % du prix` : ""} tooltip="Épargne mobilisée directement, sans emprunt. Minimum recommandé : 10 % du prix pour couvrir les frais de notaire." />
            </div>
            <div className="optim-scenario-card optim-b">
              <p className="optim-scenario-label">Scénario B — Attendre pour épargner plus</p>
              <Field label="Apport visé" value={v.apportCible} onChange={set("apportCible")} suffix="€"
                hint={res ? `${res.apportCiblePct.toFixed(0)} % du prix` : ""} tooltip="Épargne mobilisée directement, sans emprunt. Minimum recommandé : 10 % du prix pour couvrir les frais de notaire." />
            </div>
          </div>

          <p className="sim-card-legend" style={{ marginTop: 16 }}>Pendant l'attente</p>
          <div className="step-fields">
            <Field label="Épargne mensuelle possible" value={v.epargneParMois} onChange={set("epargneParMois")} suffix="€/mois"
              hint="Ce que vous pouvez économiser chaque mois" tooltip="Ce que vous pouvez mettre de côté chaque mois en attendant d'acheter, pour augmenter votre apport." />
            <Field label="Loyer actuel" value={v.loyerActuel} onChange={set("loyerActuel")} suffix="€/mois"
              hint="Loyer que vous payez pendant l'attente" tooltip="Loyer mensuel charges comprises. Moyenne nationale : ~700 €/mois. À Paris : ~1 400 €, en province : ~600–700 €." />
          </div>
        </div>

        <div className="sim-results-panel">
          {!res ? (
            <p className="sim-empty">Renseignez le prix du bien pour commencer.</p>
          ) : (
            <>
              {/* Verdict */}
              <div className={`sim-verdict ${res.vraiEconomie > 0 ? "sim-verdict-green" : "sim-verdict-amber"}`}>
                <strong>
                  {res.vraiEconomie > 0
                    ? `Attendre ${res.moisAttente} mois est rentable (+${fmtCur(res.vraiEconomie)} net)`
                    : `Acheter maintenant est préférable`}
                </strong>
                <p>
                  {res.vraiEconomie > 0
                    ? `En économisant ${fmtCur(res.diffApport)} d'apport supplémentaire (${res.moisAttente} mois), vous économisez ${fmtCur(res.economieTotale)} d'intérêts, pour ${fmtCur(res.coutLoyer)} de loyer supplémentaire.`
                    : `Le coût des loyers pendant l'attente (${fmtCur(res.coutLoyer)}) dépasse les économies d'intérêts (${fmtCur(res.economieTotale)}). Mieux vaut acheter sans attendre.`}
                </p>
              </div>

              {/* Stats comparison */}
              <div className="optim-compare-grid">
                <div className="optim-compare-col">
                  <p className="optim-compare-col-label">Scénario A — Maintenant</p>
                  <p className="optim-compare-value">{fmtCur(res.mensActuel)}<span className="optim-compare-unit">/mois</span></p>
                  <p className="optim-compare-sub">Mensualité · {fmtCur(res.interetsActuel)} d'intérêts</p>
                </div>
                <div className="optim-compare-sep">vs</div>
                <div className="optim-compare-col optim-compare-col-b">
                  <p className="optim-compare-col-label">Scénario B — Dans {res.moisAttente} mois</p>
                  <p className="optim-compare-value" style={{ color: "var(--green)" }}>{fmtCur(res.mensCible)}<span className="optim-compare-unit">/mois</span></p>
                  <p className="optim-compare-sub">Mensualité · {fmtCur(res.interetsCible)} d'intérêts</p>
                </div>
              </div>

              {/* Chart */}
              <div className="sim-chart-wrap" style={{ marginTop: 16 }}>
                <p className="sim-chart-title">Mensualité en fonction de l'apport</p>
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={res.curve} margin={{ top: 4, right: 12, bottom: 0, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="apportK" tick={{ fontSize: 10, fill: "#5e6e88" }} tickFormatter={(v) => `${v}k`} label={{ value: "Apport (k€)", position: "insideBottomRight", offset: -4, fontSize: 10, fill: "#5e6e88" }} />
                    <YAxis tick={{ fontSize: 10, fill: "#5e6e88" }} tickFormatter={fmtK} width={48} />
                    <Tooltip content={({ active, payload, label }) => {
                      if (!active || !payload?.length) return null;
                      return (
                        <div className="chart-tooltip">
                          <p className="chart-tooltip-label">Apport {label}k€</p>
                          {payload.map((p) => (
                            <div key={p.dataKey} className="chart-tooltip-row">
                              <span style={{ color: p.stroke }}>{p.name}</span>
                              <span>{fmtCur(p.value)}</span>
                            </div>
                          ))}
                        </div>
                      );
                    }} />
                    <ReferenceLine x={Math.round(v.apportActuel / 1000)} stroke="#2563eb" strokeDasharray="4 3" label={{ value: "A", fill: "#2563eb", fontSize: 10 }} />
                    <ReferenceLine x={Math.round(v.apportCible / 1000)} stroke="#059669" strokeDasharray="4 3" label={{ value: "B", fill: "#059669", fontSize: 10 }} />
                    <Line dataKey="mensualite" name="Mensualité" stroke="#2563eb" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {res.moisAttente > 0 && (() => {
                const hausseMarche = 0.03;
                const moisAtt = res.moisAttente;
                const prixFutur = v.prixBien * Math.pow(1 + hausseMarche, moisAtt / 12);
                const surplusPrix = prixFutur - v.prixBien;
                const netFinal = res.vraiEconomie - surplusPrix;
                return (
                  <div className="sim-info-box" style={{ marginTop: 16 }}>
                    <p className="sim-info-title">📈 Et si les prix montent pendant l'attente ?</p>
                    <p className="sim-info-body">
                      Si le marché progresse de +3 %/an, le bien passera de {fmtCur(v.prixBien)} à <strong>{fmtCur(Math.round(prixFutur))}</strong> dans {res.moisAttente} mois ({fmtCur(Math.round(surplusPrix))} de plus).
                      {netFinal > 0
                        ? ` Même dans ce cas, attendre reste rentable (+${fmtCur(Math.round(netFinal))} net).`
                        : ` Dans ce cas, attendre ne serait plus rentable — la hausse des prix efface les économies d'intérêts.`}
                    </p>
                  </div>
                );
              })()}

              {/* Key metrics */}
              <div className="sim-stats-grid" style={{ marginTop: 16 }}>
                <div className="sim-stat-card sim-stat-card-blue">
                  <span className="sim-stat-card-label">Gain mensuel (B vs A)</span>
                  <span className="sim-stat-card-value">{fmtCur(res.gainMensuel)}/mois</span>
                </div>
                <div className={`sim-stat-card ${res.economieTotale > res.coutLoyer ? "sim-stat-card-green" : "sim-stat-card-amber"}`}>
                  <span className="sim-stat-card-label">Économie nette d'intérêts</span>
                  <span className="sim-stat-card-value">{fmtCur(res.economieTotale)}</span>
                </div>
                <div className="sim-stat-card sim-stat-card-amber">
                  <span className="sim-stat-card-label">Loyers pendant attente</span>
                  <span className="sim-stat-card-value">{fmtCur(res.coutLoyer)}</span>
                </div>
                <div className={`sim-stat-card ${res.roi > 30 ? "sim-stat-card-green" : ""}`}>
                  <span className="sim-stat-card-label">ROI apport supplémentaire</span>
                  <span className="sim-stat-card-value">{res.roi.toFixed(0)} %</span>
                </div>
              </div>

              <div className="sim-info-box" style={{ marginTop: 16 }}>
                <p className="sim-info-title">📌 Comment interpréter le ROI d'apport</p>
                <p className="sim-info-body">Un ROI de {res.roi.toFixed(0)} % signifie que chaque euro d'apport supplémentaire économise {(res.roi / 100).toFixed(2)} € d'intérêts sur la durée du crédit — hors effet de la durée d'attente.</p>
              </div>
            </>
          )}
        </div>
      </div>
    </SimLayout>
  );
}
