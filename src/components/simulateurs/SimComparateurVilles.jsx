import { useMemo, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, Legend } from "recharts";
import SimLayout from "./SimLayout";
import SimFunnel from "./SimFunnel";
import { formatCurrency } from "../../utils/finance";

/** Prix moyen m² à l'achat et loyer m² moyen par ville et type de bien (données 2024) */
const VILLES = [
  { id: "paris",       nom: "Paris",        flag: "🗼", m2Achat: { T1: 10200, T2: 9800, T3: 9200 }, loyerM2: { T1: 38, T2: 34, T3: 30 }, surface: { T1: 24, T2: 38, T3: 60 } },
  { id: "lyon",        nom: "Lyon",          flag: "🦁", m2Achat: { T1: 5200, T2: 4700, T3: 4200 }, loyerM2: { T1: 20, T2: 18, T3: 16 }, surface: { T1: 25, T2: 40, T3: 62 } },
  { id: "bordeaux",    nom: "Bordeaux",      flag: "🍷", m2Achat: { T1: 4600, T2: 4200, T3: 3800 }, loyerM2: { T1: 17, T2: 16, T3: 14 }, surface: { T1: 25, T2: 40, T3: 62 } },
  { id: "nice",        nom: "Nice",          flag: "☀️", m2Achat: { T1: 6000, T2: 5500, T3: 5000 }, loyerM2: { T1: 22, T2: 20, T3: 18 }, surface: { T1: 24, T2: 38, T3: 58 } },
  { id: "nantes",      nom: "Nantes",        flag: "🏰", m2Achat: { T1: 4500, T2: 4100, T3: 3700 }, loyerM2: { T1: 16, T2: 15, T3: 13 }, surface: { T1: 25, T2: 40, T3: 62 } },
  { id: "toulouse",    nom: "Toulouse",      flag: "🌸", m2Achat: { T1: 4200, T2: 3800, T3: 3400 }, loyerM2: { T1: 16, T2: 15, T3: 13 }, surface: { T1: 25, T2: 40, T3: 62 } },
  { id: "montpellier", nom: "Montpellier",   flag: "🎭", m2Achat: { T1: 3900, T2: 3600, T3: 3200 }, loyerM2: { T1: 16, T2: 15, T3: 13 }, surface: { T1: 25, T2: 40, T3: 62 } },
  { id: "rennes",      nom: "Rennes",        flag: "⚓", m2Achat: { T1: 4600, T2: 4200, T3: 3700 }, loyerM2: { T1: 16, T2: 15, T3: 13 }, surface: { T1: 25, T2: 40, T3: 62 } },
  { id: "lille",       nom: "Lille",         flag: "🍺", m2Achat: { T1: 3700, T2: 3400, T3: 3000 }, loyerM2: { T1: 16, T2: 15, T3: 13 }, surface: { T1: 24, T2: 38, T3: 58 } },
  { id: "strasbourg",  nom: "Strasbourg",    flag: "🎄", m2Achat: { T1: 3800, T2: 3500, T3: 3100 }, loyerM2: { T1: 15, T2: 14, T3: 12 }, surface: { T1: 24, T2: 38, T3: 58 } },
  { id: "grenoble",    nom: "Grenoble",      flag: "⛷️", m2Achat: { T1: 3000, T2: 2800, T3: 2500 }, loyerM2: { T1: 14, T2: 13, T3: 11 }, surface: { T1: 25, T2: 40, T3: 62 } },
  { id: "marseille",   nom: "Marseille",     flag: "⚓", m2Achat: { T1: 3600, T2: 3300, T3: 2900 }, loyerM2: { T1: 15, T2: 14, T3: 12 }, surface: { T1: 25, T2: 40, T3: 62 } },
];

function calcMensualite(capital, apport, tauxAnnuel, dureeAns) {
  const principal = capital - apport;
  if (principal <= 0) return 0;
  const r = tauxAnnuel / 100 / 12;
  const n = dureeAns * 12;
  return r === 0 ? principal / n : principal * r / (1 - Math.pow(1 + r, -n));
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
          <span style={{ color: p.fill || p.stroke }}>{p.name}</span>
          <span>{fmtCur(p.value)}/mois</span>
        </div>
      ))}
    </div>
  );
}

export default function SimComparateurVilles() {
  const [typeBien, setTypeBien] = useState("T2");
  const [apport, setApport] = useState(40000);
  const [taux, setTaux] = useState(3.8);
  const [duree, setDuree] = useState(20);

  const data = useMemo(() => {
    return VILLES.map((v) => {
      const surface = v.surface[typeBien];
      const prixAchat = v.m2Achat[typeBien] * surface;
      const prixTotal = prixAchat * 1.08; // +8% frais notaire
      const mensualite = calcMensualite(prixTotal, apport, taux, duree);
      const loyer = v.loyerM2[typeBien] * surface;
      const delta = mensualite - loyer; // positif = achat plus cher
      // Breakeven: années pour que l'achat soit équivalent à la location
      // Simplification : capitalisation patrimoine vs loyers cumulés
      const loyerAnnuel = loyer * 12;
      const coutCreditTotal = mensualite * duree * 12 - (prixTotal - apport);
      // Seuil où patrimoine net = somme loyers payés (à ~2% revalorisation annuelle)
      let breakEvenYears = null;
      let cumLoyer = 0;
      let patrimoineNet = -apport - (prixTotal - prixAchat); // apport + frais notaire
      for (let yr = 1; yr <= 30; yr++) {
        const loyerYr = loyerAnnuel * Math.pow(1.015, yr - 1);
        cumLoyer += loyerYr;
        const propValue = prixAchat * Math.pow(1.02, yr); // +2%/an
        const r = taux / 100 / 12;
        const n = duree * 12;
        const monthsPaid = Math.min(yr * 12, n);
        let bal = prixTotal - apport;
        for (let m = 0; m < monthsPaid; m++) {
          const i = bal * r;
          bal = Math.max(0, bal - (mensualite - i));
        }
        const netWorth = propValue * 0.95 - bal;
        if (breakEvenYears === null && netWorth >= cumLoyer) {
          breakEvenYears = yr;
        }
      }
      return {
        nom: `${v.flag} ${v.nom}`,
        nomCourt: v.nom,
        flag: v.flag,
        prixAchat,
        mensualite: Math.round(mensualite),
        loyer: Math.round(loyer),
        delta: Math.round(delta),
        surface,
        m2Achat: v.m2Achat[typeBien],
        breakEvenYears,
        coutCreditTotal: Math.round(coutCreditTotal),
      };
    }).sort((a, b) => a.mensualite - b.mensualite);
  }, [typeBien, apport, taux, duree]);

  const minLoyer = Math.min(...data.map((d) => d.loyer));
  const maxMens  = Math.max(...data.map((d) => d.mensualite));

  return (
    <SimLayout
      icon="🗺️"
      title="Comparateur loyer vs mensualité par ville"
      description="Comparez le coût mensuel d'un achat versus une location dans les 12 principales villes françaises."
      suggestions={["/simulateurs/pret-immobilier", "/simulateurs/endettement", "/simulateurs/budget-maximum"]}
    >
      <SimFunnel
        steps={[
          {
            title: "Votre budget",
            icon: "💰",
            content: (
              <>
                <div className="step-fields">
                  <div className="field-row">
                    <label className="field-label">Apport personnel</label>
                    <div className="input-wrap"><input type="number" className="input-num" value={apport} onChange={(e) => setApport(Number(e.target.value))} /><span className="input-suffix">€</span></div>
                    <p className="field-hint">Somme disponible pour l'achat — réduit le capital à emprunter</p>
                  </div>
                  <div className="field-row">
                    <label className="field-label">Taux du prêt</label>
                    <div className="input-wrap"><input type="number" className="input-num" value={taux} onChange={(e) => setTaux(Number(e.target.value))} step="0.1" /><span className="input-suffix">%</span></div>
                    <p className="field-hint">Mars 2026 : entre 3,3 % et 4,0 %</p>
                  </div>
                </div>
              </>
            ),
          },
          {
            title: "Paramètres",
            icon: "⚙️",
            content: (
              <>
                <div className="step-fields">
                  <div className="field-row">
                    <label className="field-label">Durée du prêt</label>
                    <div className="input-wrap"><input type="number" className="input-num" value={duree} onChange={(e) => setDuree(Number(e.target.value))} /><span className="input-suffix">ans</span></div>
                    <p className="field-hint">15, 20 ou 25 ans — plus court = moins d'intérêts</p>
                  </div>
                </div>

                <div style={{ marginTop: 16 }}>
                  <label className="field-label">Type de bien</label>
                  <div className="loan-type-grid loan-type-grid-3" style={{ marginTop: 8 }}>
                    {["T1", "T2", "T3"].map((t) => (
                      <button key={t} type="button" className={`loan-type-btn${typeBien === t ? " loan-type-active" : ""}`} onClick={() => setTypeBien(t)}>
                        <span>{t === "T1" ? "🛏️" : t === "T2" ? "🛋️" : "🏠"}</span>
                        <span>{t === "T1" ? "Studio / T1" : t === "T2" ? "2 pièces" : "3 pièces"}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="sim-info-box" style={{ marginTop: 16 }}>
                  <p className="sim-info-title">📌 Comment lire ce comparateur</p>
                  <p className="sim-info-body">La mensualité inclut 8 % de frais de notaire. Elle ne tient pas compte de la taxe foncière, des charges de copropriété, ni de la constitution de patrimoine à long terme. La barre bleue est la mensualité de crédit, la barre teal est le loyer équivalent.</p>
                </div>
              </>
            ),
          },
        ]}
        result={
          <div className="sim-results-panel comparateur-results">
            {(() => {
              const buyWins = data.filter(d => d.delta <= 0).length;
              const rentWins = data.length - buyWins;
              const cheapestBuy = data.slice().sort((a,b) => a.mensualite - b.mensualite)[0];
              return (
                <div className="sim-stats-grid" style={{ marginBottom: 16 }}>
                  <div className="sim-stat-card sim-stat-card-blue">
                    <span className="sim-stat-card-label">Villes où acheter coûte moins</span>
                    <span className="sim-stat-card-value">{buyWins} / {data.length}</span>
                  </div>
                  <div className="sim-stat-card">
                    <span className="sim-stat-card-label">Ville la moins chère à l'achat</span>
                    <span className="sim-stat-card-value">{cheapestBuy?.flag} {cheapestBuy?.nomCourt}</span>
                  </div>
                </div>
              );
            })()}
            <p className="sim-stat-label" style={{ fontWeight: 700, fontSize: 13, marginBottom: 12, textTransform: "uppercase", letterSpacing: ".06em" }}>
              Loyer vs mensualité — {typeBien} (prix marché 2026)
            </p>

            <ResponsiveContainer width="100%" height={380}>
              <BarChart data={data} layout="vertical" margin={{ top: 4, right: 16, bottom: 4, left: 0 }}>
                <XAxis type="number" tickFormatter={(v) => `${Math.round(v / 100) * 100} €`} tick={{ fontSize: 10, fill: "#5e6e88" }} axisLine={false} tickLine={false}/>
                <YAxis type="category" dataKey="nom" tick={{ fontSize: 11, fill: "#0c1a35" }} axisLine={false} tickLine={false} width={120}/>
                <Tooltip content={<ChartTooltip />} cursor={{ fill: "rgba(0,0,0,.04)" }}/>
                <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }}/>
                <Bar dataKey="mensualite" name="Mensualité crédit" fill="#2563eb" radius={[0, 6, 6, 0]} barSize={9}/>
                <Bar dataKey="loyer" name="Loyer estimé" fill="#06b6d4" radius={[0, 6, 6, 0]} barSize={9}/>
              </BarChart>
            </ResponsiveContainer>

            {/* City cards */}
            <div className="comparateur-cards">
              {data.map((d) => {
                const cheaper = d.loyer < d.mensualite ? "loyer" : "achat";
                return (
                  <div key={d.nomCourt} className={`comparateur-city-card ${cheaper === "loyer" ? "city-card-rent" : "city-card-buy"}`}>
                    <div className="city-card-header">
                      <strong className="city-card-nom">{d.nomCourt}</strong>
                      <span className={`city-card-badge ${cheaper === "loyer" ? "badge-rent" : "badge-buy"}`}>
                        {cheaper === "loyer" ? "Location + avantageuse" : "Achat + avantageux"}
                      </span>
                    </div>
                    <div className="city-card-rows">
                      <div className="city-card-row">
                        <span>Mensualité crédit</span>
                        <strong style={{ color: "#2563eb" }}>{fmtCur(d.mensualite)}/mois</strong>
                      </div>
                      <div className="city-card-row">
                        <span>Loyer estimé</span>
                        <strong style={{ color: "#06b6d4" }}>{fmtCur(d.loyer)}/mois</strong>
                      </div>
                      <div className="city-card-row city-card-delta">
                        <span>Différence</span>
                        <strong style={{ color: d.delta > 0 ? "#dc2626" : "#059669" }}>
                          {d.delta > 0 ? "+" : ""}{fmtCur(d.delta)}/mois
                        </strong>
                      </div>
                      <div className="city-card-row" style={{ paddingTop: 4, borderTop: "1px solid var(--line)", marginTop: 4 }}>
                        <span>Prix m² achat</span>
                        <span style={{ color: "var(--muted)" }}>{fmtCur(d.m2Achat)}/m²</span>
                      </div>
                      <div className="city-card-row">
                        <span>Surface typique {typeBien}</span>
                        <span style={{ color: "var(--muted)" }}>{d.surface} m²</span>
                      </div>
                      <div className="city-card-row" style={{ paddingTop: 4, borderTop: "1px solid var(--line)", marginTop: 4 }}>
                        <span>Point de rentabilité</span>
                        <span style={{ color: d.breakEvenYears !== null && d.breakEvenYears <= 15 ? "#059669" : d.breakEvenYears !== null && d.breakEvenYears <= 22 ? "#d97706" : "#dc2626", fontWeight: 700 }}>
                          {d.breakEvenYears !== null ? `${d.breakEvenYears} ans` : "> 30 ans"}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        }
      />
    </SimLayout>
  );
}
