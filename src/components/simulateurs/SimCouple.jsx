import { useMemo, useState } from "react";
import SimLayout from "./SimLayout";
import SimFunnel from "./SimFunnel";
import Field from "../Field";

const fmtCur = (v) => new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(v);
const fmtPct = (v) => `${v.toFixed(1)} %`;

function calcCapacity({ salary1, salary2, otherCredit, duration, rate }) {
  const totalSalary = salary1 + salary2;
  const maxMonthly = totalSalary * 0.35 - otherCredit;
  const r = rate / 100 / 12;
  const n = duration * 12;
  const principal = maxMonthly > 0 && r > 0 && n > 0
    ? maxMonthly * (1 - Math.pow(1 + r, -n)) / r
    : 0;
  const taux = totalSalary > 0 ? (otherCredit / totalSalary) * 100 : 0;
  const tauxApres = totalSalary > 0 ? ((otherCredit + maxMonthly) / totalSalary) * 100 : 0;
  const totalCost = maxMonthly * n;
  const interests = totalCost - principal;
  return { totalSalary, maxMonthly, principal, taux, tauxApres, totalCost, interests };
}

export default function SimCouple() {
  const [v, setV] = useState({
    salary1: 2800,
    salary2: 2400,
    otherCredit: 0,
    duration: 20,
    rate: 3.5,
    apport: 50000,
  });
  const set = (k) => (val) => setV((s) => ({ ...s, [k]: val }));

  const res = useMemo(() => calcCapacity(v), [v]);
  const budgetMax = res.principal + v.apport;
  const tauxEndettementCurrent = res.taux;
  const statusColor = tauxEndettementCurrent < 10 ? "#059669" : tauxEndettementCurrent < 25 ? "#d97706" : "#dc2626";

  return (
    <SimLayout
      icon="👫"
      title="Simulateur d'achat à deux"
      description="Combinez vos revenus pour calculer votre capacité d'emprunt en couple, votre taux d'endettement et votre budget immobilier total."
      simTime="3 min"
      suggestions={["/simulateurs/pret-immobilier", "/simulateurs/endettement", "/simulateurs/budget-maximum"]}
    >
      <SimFunnel
        steps={[
          {
            title: "Vos revenus",
            icon: "👫",
            content: (
              <>
                <p className="sim-card-legend">Revenus du foyer</p>
                <div className="step-fields">
                  <Field label="Salaire net mensuel — Personne 1" value={v.salary1} onChange={set("salary1")} suffix="€/mois"
                    hint="Salaire net avant impôts mais après charges sociales" />
                  <Field label="Salaire net mensuel — Personne 2" value={v.salary2} onChange={set("salary2")} suffix="€/mois"
                    hint="Laisser à 0 si achat seul" />
                  <Field label="Autres crédits en cours" value={v.otherCredit} onChange={set("otherCredit")} suffix="€/mois"
                    hint="Auto, conso, etc. Réduit directement votre capacité" />
                </div>
              </>
            ),
          },
          {
            title: "Votre projet",
            icon: "🏠",
            content: (
              <>
                <p className="sim-card-legend">Apport &amp; conditions du prêt</p>
                <div className="step-fields">
                  <Field label="Apport personnel combiné" value={v.apport} onChange={set("apport")} suffix="€"
                    hint="Épargne des deux personnes — idéalement ≥ 10 % du prix" />
                  <Field label="Taux d'intérêt" value={v.rate} onChange={set("rate")} suffix="%" hint="Taux fixe — 3,5 % en moyenne sur 20 ans en 2026" />
                  <Field label="Durée" value={v.duration} onChange={set("duration")} suffix="ans" hint="Max 25 ans (HCSF)" />
                </div>
              </>
            ),
          },
        ]}
        result={
          <div className="sim-results-panel">
            <div className="sim-stat-hero sim-hero-blue">
              <span className="sim-stat-label">Budget immobilier total</span>
              <span className="sim-stat-value">
                {fmtCur(budgetMax)}
              </span>
              <p className="sim-stat-hero-summary">
                Emprunt {fmtCur(res.principal)} + apport {fmtCur(v.apport)}.
                Mensualité maximale à 35 % : {fmtCur(res.maxMonthly)}/mois.
              </p>
            </div>

            <div className="sim-stats-grid">
              <div className="sim-stat-card sim-stat-card-blue">
                <span className="sim-stat-card-label">Revenus combinés</span>
                <span className="sim-stat-card-value">{fmtCur(res.totalSalary)}/mois</span>
              </div>
              <div className="sim-stat-card">
                <span className="sim-stat-card-label">Mensualité max (35 %)</span>
                <span className="sim-stat-card-value">{fmtCur(res.maxMonthly)}/mois</span>
              </div>
              <div className="sim-stat-card">
                <span className="sim-stat-card-label">Capacité d'emprunt</span>
                <span className="sim-stat-card-value">{fmtCur(res.principal)}</span>
              </div>
              <div className="sim-stat-card">
                <span className="sim-stat-card-label">Coût total des intérêts</span>
                <span className="sim-stat-card-value">{fmtCur(res.interests)}</span>
              </div>
            </div>

            {/* Taux endettement gauge */}
            <div style={{ marginTop: 16 }}>
              <p className="sim-bar-label">Taux d'endettement après achat</p>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 8 }}>
                <div style={{ flex: 1, height: 10, background: "var(--line)", borderRadius: 999, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${Math.min(res.tauxApres, 50) * 2}%`, background: res.tauxApres > 35 ? "#dc2626" : res.tauxApres > 28 ? "#d97706" : "#059669", borderRadius: 999, transition: "width .4s" }} />
                </div>
                <span style={{ fontWeight: 800, fontSize: 16, color: res.tauxApres > 35 ? "#dc2626" : res.tauxApres > 28 ? "#d97706" : "#059669", minWidth: 56 }}>
                  {fmtPct(res.tauxApres)}
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--muted)", marginTop: 4 }}>
                <span>0 %</span><span>Limite HCSF 35 %</span><span>50 %</span>
              </div>
            </div>

            {v.salary2 > 0 && (
              <div className="sim-info-box" style={{ marginTop: 16 }}>
                <p className="sim-info-title">👫 Avantage du co-achat</p>
                <p className="sim-info-body">
                  Acheter à deux vous permet d'emprunter {fmtCur(res.principal)} contre environ {fmtCur(Math.round(res.principal * v.salary1 / res.totalSalary))} seul(e).
                  Soit {fmtCur(res.principal - Math.round(res.principal * v.salary1 / res.totalSalary))} de capacité supplémentaire grâce aux revenus combinés.
                </p>
              </div>
            )}

            <div className="sim-info-box">
              <p className="sim-info-title">⚖️ Co-achat et protection juridique</p>
              <p className="sim-info-body">
                En indivision (50/50 par défaut), chaque partie possède sa quote-part.
                Pensez à rédiger une convention d'indivision précisant les modalités de sortie,
                ou optez pour la SCI si vous avez des héritiers différents. Consultez un notaire.
              </p>
            </div>
          </div>
        }
      />
    </SimLayout>
  );
}
