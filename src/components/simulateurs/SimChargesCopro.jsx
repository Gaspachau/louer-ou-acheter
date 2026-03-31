import { useMemo, useState } from "react";
import { RadialBarChart, RadialBar, ResponsiveContainer, Tooltip } from "recharts";
import Field from "../Field";
import SimLayout from "./SimLayout";
import SimFunnel from "./SimFunnel";
import { formatCurrency } from "../../utils/finance";

// Moyennes nationales charges de copropriété par catégorie (€/lot/an)
const MOYENNES_NATIONALES = {
  entretien:    650,  // nettoyage, espaces verts
  ascenseur:    580,  // si immeuble avec ascenseur
  chauffage:    900,  // si chauffage collectif
  gardiennage:  850,  // si gardien
  assurance:    180,  // assurance immeuble
  administration: 350, // syndic
};

function calcCharges({ chargesAnnuelles, tantiemesLot, totalTantièmes, fondsTravauxPct, surface, ascenseur, gardien, chauffageCollectif }) {
  if (!chargesAnnuelles || totalTantièmes <= 0) return null;
  const quotePart = tantiemesLot / totalTantièmes;
  const chargesAnnuellesLot = chargesAnnuelles * quotePart;
  const fondsTravauxAnnuel = chargesAnnuellesLot * (fondsTravauxPct / 100);
  const totalAnnuel = chargesAnnuellesLot + fondsTravauxAnnuel;
  const mensuel = totalAnnuel / 12;
  const parM2An = surface > 0 ? totalAnnuel / surface : null;
  return { chargesAnnuellesLot, fondsTravauxAnnuel, totalAnnuel, mensuel, parM2An, quotePart };
}

const BENCHMARK = [
  { label: "Paris",           val: 52,  color: "#dc2626" },
  { label: "Grandes villes",  val: 38,  color: "#d97706" },
  { label: "Moyenne nationale", val: 30, color: "#2563eb" },
  { label: "Petites villes",  val: 20,  color: "#059669" },
];

export default function SimChargesCopro() {
  const [v, setV] = useState({
    chargesAnnuelles: 25000,
    tantiemesLot: 150,
    totalTantièmes: 1000,
    fondsTravauxPct: 5,
    surface: 55,
    ascenseur: true,
    gardien: false,
    chauffageCollectif: false,
  });
  const set = (k) => (val) => setV((s) => ({ ...s, [k]: val }));
  const res = useMemo(() => calcCharges(v), [v]);

  const benchmark = res?.parM2An
    ? res.parM2An < 22 ? "green"
    : res.parM2An < 38 ? "amber"
    : "red"
    : "blue";

  const benchmarkMsg = {
    green: "Charges faibles — en dessous de la moyenne nationale (30 €/m²/an).",
    amber: "Charges dans la moyenne des grandes villes françaises.",
    red: "Charges élevées — au-dessus de la moyenne nationale. Vérifiez les contrats de services et la gestion du syndic.",
  };

  return (
    <SimLayout
      icon="🏢"
      title="Calculateur de charges de copropriété"
      description="Estimez votre quote-part de charges mensuelles et annuelles selon vos tantièmes de copropriété."
      simTime="1 min"
      suggestions={["/simulateurs/taxe-fonciere", "/simulateurs/rentabilite-locative", "/simulateurs/frais-notaire"]}
    >
      <SimFunnel
        steps={[
          {
            title: "Votre copropriété",
            icon: "🏢",
            content: (
              <>
                <p className="sim-card-legend">Votre copropriété</p>
                <div className="step-fields">
                  <div className="field-full">
                    <Field label="Budget prévisionnel annuel de la copro" value={v.chargesAnnuelles} onChange={set("chargesAnnuelles")} suffix="€/an"
                      hint="Total voté en assemblée générale (hors fonds de travaux). Mentionné dans le carnet d'entretien ou le PV d'AG." tooltip="Total du budget voté en assemblée générale de copropriété, hors fonds de travaux. Mentionné sur le PV d'AG ou le carnet d'entretien." />
                  </div>
                  <Field label="Tantièmes de votre lot" value={v.tantiemesLot} onChange={set("tantiemesLot")} suffix="tantièmes"
                    hint="Part du bien dans l'immeuble — figurant dans votre titre de propriété ou l'état descriptif de division" tooltip="Part de l'immeuble que représente votre appartement. Figure sur votre titre de propriété ou l'état descriptif de division. Ex. : 150/1000." />
                  <Field label="Total tantièmes de l'immeuble" value={v.totalTantièmes} onChange={set("totalTantièmes")} suffix="tantièmes"
                    hint="Généralement 1000 ou 10 000 — précisé dans le règlement de copropriété" />
                </div>

                <p className="sim-card-legend" style={{ marginTop: 16 }}>Fonds de travaux (loi Alur)</p>
                <div className="step-fields">
                  <Field label="Fonds de travaux" value={v.fondsTravauxPct} onChange={set("fondsTravauxPct")} suffix="%"
                    hint="Minimum légal : 5 % des charges courantes. Certains immeubles votent davantage (8–15 %)" />
                  <Field label="Surface habitable" value={v.surface} onChange={set("surface")} suffix="m²"
                    hint="Permet de calculer les charges au m²/an pour comparer" tooltip="Surface en m² mentionnée dans votre acte de propriété ou déclaration de surface Carrez." />
                </div>

                <p className="sim-card-legend" style={{ marginTop: 16 }}>Services de l'immeuble</p>
                <div className="services-checks">
                  {[
                    { key: "ascenseur", label: "Ascenseur", hint: "+500–700 €/an de charges typiques" },
                    { key: "gardien", label: "Gardien / concierge", hint: "+700–1000 €/an" },
                    { key: "chauffageCollectif", label: "Chauffage collectif", hint: "+800–1200 €/an" },
                  ].map((s) => (
                    <label key={s.key} className="service-check-label">
                      <input type="checkbox" checked={v[s.key]} onChange={(e) => set(s.key)(e.target.checked)} className="service-check-input" />
                      <div>
                        <span className="service-check-text">{s.label}</span>
                        <span className="field-hint">{s.hint}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </>
            ),
          },
        ]}
        result={
          <div className="sim-results-panel">
            {!res ? (
              <p className="sim-empty">Renseignez les données de la copropriété pour calculer.</p>
            ) : (
              <>
                <div className={`sim-stat-hero sim-hero-${benchmark}`}>
                  <span className="sim-stat-label">Charges mensuelles à votre charge</span>
                  <span className="sim-stat-value">
                    {formatCurrency(res.mensuel)}<span className="sim-stat-unit">/mois</span>
                  </span>
                  {res.parM2An && (
                    <span className="sim-stat-sub">{res.parM2An.toFixed(1)} €/m²/an · votre quote-part : {(res.quotePart * 100).toFixed(2)} %</span>
                  )}
                </div>

                <div className="sim-stats-grid">
                  <div className="sim-stat-card sim-stat-card-blue">
                    <span className="sim-stat-card-label">Charges annuelles</span>
                    <span className="sim-stat-card-value">{formatCurrency(res.chargesAnnuellesLot)}</span>
                  </div>
                  <div className="sim-stat-card">
                    <span className="sim-stat-card-label">Fonds de travaux/an</span>
                    <span className="sim-stat-card-value">{formatCurrency(res.fondsTravauxAnnuel)}</span>
                  </div>
                  <div className="sim-stat-card sim-stat-card-blue">
                    <span className="sim-stat-card-label">Total annuel</span>
                    <span className="sim-stat-card-value">{formatCurrency(res.totalAnnuel)}</span>
                  </div>
                  <div className={`sim-stat-card ${benchmark === "green" ? "sim-stat-card-green" : benchmark === "red" ? "sim-stat-card-red" : "sim-stat-card-amber"}`}>
                    <span className="sim-stat-card-label">Charges au m²/an</span>
                    <span className="sim-stat-card-value">{res.parM2An ? `${res.parM2An.toFixed(1)} €` : "—"}</span>
                  </div>
                </div>

                {res.parM2An && (
                  <div className={`sim-verdict sim-verdict-${benchmark}`}>
                    <strong>
                      {benchmark === "green" ? "✅ Charges raisonnables" : benchmark === "amber" ? "📊 Charges dans la moyenne" : "⚠️ Charges élevées"}
                    </strong>
                    <p>{benchmarkMsg[benchmark]}</p>
                  </div>
                )}

                <div className="sim-chart-wrap">
                  <p className="sim-chart-title">Comparaison €/m²/an par type de ville</p>
                  <div className="benchmark-bars">
                    {BENCHMARK.map((b) => {
                      const isYou = res.parM2An && Math.abs(res.parM2An - b.val) < 5;
                      return (
                        <div key={b.label} className="benchmark-bar-row">
                          <span className="benchmark-bar-label">{b.label}</span>
                          <div className="benchmark-bar-track">
                            <div className="benchmark-bar-fill" style={{ width: `${(b.val / 60) * 100}%`, background: b.color }} />
                          </div>
                          <span className="benchmark-bar-val">{b.val} €</span>
                        </div>
                      );
                    })}
                    {res.parM2An && (
                      <div className="benchmark-bar-row benchmark-bar-you">
                        <span className="benchmark-bar-label">⭐ Votre bien</span>
                        <div className="benchmark-bar-track">
                          <div className="benchmark-bar-fill" style={{ width: `${Math.min(100, (res.parM2An / 60) * 100)}%`, background: "#7c3aed" }} />
                        </div>
                        <span className="benchmark-bar-val">{res.parM2An.toFixed(0)} €</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="sim-info-box">
                  <p className="sim-info-title">💡 À retenir avant d'acheter</p>
                  <p className="sim-info-body">Demandez le carnet d'entretien, les 3 derniers PV d'AG et les appels de fonds. Un ravalement ou une réfection de toiture peut représenter plusieurs milliers d'euros en fonds de travaux exceptionnels.</p>
                </div>
              </>
            )}
          </div>
        }
      />
    </SimLayout>
  );
}
