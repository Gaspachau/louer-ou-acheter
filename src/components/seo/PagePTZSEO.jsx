import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useSEO } from "../../utils/useSEO";
import TopBar from "../TopBar";
import Footer from "../Footer";

/* ── Données PTZ 2026 ── */
const ZONES = {
  "A bis": { plafonds: [37000,51800,62900,74000,85100], ptzPct:0.50, ptzMax:[150000,210000,255000,300000,345000], villes:"Paris, Côte d'Azur, Genevois français" },
  "A":     { plafonds: [37000,51800,62900,74000,85100], ptzPct:0.40, ptzMax:[150000,210000,255000,300000,345000], villes:"Lyon, Marseille, Montpellier, reste Île-de-France" },
  "B1":    { plafonds: [30000,42000,51000,60000,69000], ptzPct:0.40, ptzMax:[135000,189000,230000,270000,310500], villes:"Bordeaux, Nantes, Toulouse, Lille, Rennes, Strasbourg" },
  "B2":    { plafonds: [27000,37800,45900,54000,62100], ptzPct:0.20, ptzMax:[110000,154000,187000,220000,253000], villes:"Villes moyennes, littoral, zones frontalières" },
  "C":     { plafonds: [24000,33600,40800,48000,55200], ptzPct:0.20, ptzMax:[100000,140000,170000,200000,230000], villes:"Zones rurales, villes < 50 000 habitants" },
};
const PERS_LABELS = ["1 personne","2 personnes","3 personnes","4 personnes","5 pers. et +"];
const fmt = (v) => new Intl.NumberFormat("fr-FR",{style:"currency",currency:"EUR",maximumFractionDigits:0}).format(v);
function mortgage(p,r,y){if(p<=0||y<=0)return 0;const mr=r/100/12;if(mr===0)return p/(y*12);return(p*mr)/(1-Math.pow(1+mr,-(y*12)));}

/* ── 10 FAQ PTZ optimisées featured snippets ── */
const FAQ_ITEMS = [
  {
    q: "Qui peut bénéficier du PTZ 2026 ?",
    a: "Le PTZ 2026 est accessible aux primo-accédants (ne pas avoir été propriétaire de sa résidence principale dans les 2 dernières années), sous condition de respecter les plafonds de revenus de sa zone géographique. L'achat doit concerner la résidence principale. En 2026, le dispositif est étendu aux logements anciens avec travaux (≥ 25 % du coût total) en zones B2 et C, ce qui élargit considérablement l'accès aux primo-accédants en zone rurale.",
  },
  {
    q: "Quels sont les plafonds de revenus pour le PTZ 2026 ?",
    a: "Les plafonds varient selon la zone et la composition du foyer. En Zone B1 (Bordeaux, Toulouse, Nantes…) : 30 000 €/an pour 1 personne, 42 000 € pour 2, 51 000 € pour 3, 60 000 € pour 4 et 69 000 € pour 5 personnes. En Zone A bis (Paris, Côte d'Azur) : 37 000 € pour 1 personne, 51 800 € pour 2, 62 900 € pour 3. Ces revenus correspondent au revenu fiscal de référence de l'année N-2.",
  },
  {
    q: "Quel est le montant maximum du PTZ 2026 ?",
    a: "En Zone A bis et A pour 5 personnes et plus, le montant maximal du PTZ 2026 atteint 345 000 €. Pour une famille de 2 personnes en Zone B1, le plafond est de 189 000 €. Pour un célibataire en Zone C, il est de 100 000 €. Le montant effectif est le minimum entre ce plafond et le pourcentage applicable (50 % en A bis, 40 % en A/B1, 20 % en B2/C) appliqué au prix du bien.",
  },
  {
    q: "Comment est calculé le montant du PTZ ?",
    a: "Le PTZ est calculé comme un pourcentage du coût total de l'opération (prix d'achat + frais de notaire inclus dans certains cas), plafonné par zone. Le taux est de 50 % en Zone A bis, 40 % en Zones A et B1, 20 % en Zones B2 et C. Le montant retenu est le minimum entre ce calcul et le plafond maximal de la zone selon la composition du foyer. Exemple : achat de 280 000 € en Zone B1 pour un couple → 40 % × 280 000 € = 112 000 €, plafonné à 189 000 € → PTZ = 112 000 €.",
  },
  {
    q: "Quelle est la durée de remboursement du PTZ 2026 ?",
    a: "La durée totale du PTZ varie entre 20 et 25 ans selon les revenus. Elle comprend une période de différé (0 remboursement) de 5, 10 ou 15 ans, puis une phase de remboursement. Si vos revenus sont inférieurs à 50 % du plafond : différé de 15 ans + 10 ans de remboursement (total 25 ans). Entre 50 % et 70 % du plafond : différé de 10 ans + 12 ans de remboursement (total 22 ans). Au-delà de 70 % : différé de 5 ans + 15 ans de remboursement (total 20 ans).",
  },
  {
    q: "Le PTZ 2026 est-il accessible pour l'achat d'un logement ancien ?",
    a: "Oui, depuis 2026, le PTZ est étendu aux logements anciens en zones B2 et C, à condition que les travaux de rénovation représentent au moins 25 % du coût total de l'opération (achat + travaux). En zones A bis, A et B1, le PTZ reste réservé aux logements neufs ou assimilés (VEFA, construction). Cette nouveauté ouvre le PTZ à des centaines de milliers de primo-accédants en zone rurale ou périurbaine.",
  },
  {
    q: "Peut-on cumuler PTZ et prêt Action Logement ?",
    a: "Oui, le PTZ est cumulable avec le prêt Action Logement (anciennement 1 % patronal), le PEL/CEL, le prêt à l'accession sociale (PAS) et un prêt bancaire classique. Le PTZ ne peut financer que 40 à 50 % du bien et doit être complété par d'autres financements. La règle est que le PTZ soit associé à au moins un autre prêt. Cumuler PTZ + prêt Action Logement peut réduire la mensualité de 200 à 400 €/mois par rapport à un financement 100 % bancaire.",
  },
  {
    q: "Le PTZ est-il remboursable en cas de revente ?",
    a: "Oui, si vous revendez le bien avant la fin du remboursement du PTZ, vous devrez rembourser le capital restant dû. Aucune pénalité de remboursement anticipé n'est applicable. Si la revente intervient pendant la période de différé, vous remboursez l'intégralité du capital PTZ en une fois. Le PTZ ne peut pas être transféré sur un autre achat immobilier.",
  },
  {
    q: "Quelles banques accordent le PTZ ?",
    a: "Le PTZ est accordé par toutes les banques habilitées par l'État : BNP Paribas, Crédit Agricole, Société Générale, LCL, Banque Populaire, Caisse d'Épargne, CIC, La Banque Postale, Crédit Mutuel, etc. C'est votre banque qui instruit simultanément le PTZ et le prêt principal. La banque calcule le montant PTZ auquel vous avez droit selon votre zone, vos revenus et la composition de votre foyer.",
  },
  {
    q: "Comment faire une demande de PTZ 2026 en 5 étapes ?",
    a: "1) Vérifiez votre éligibilité : primo-accédant, respect des plafonds de revenus. 2) Identifiez votre zone géographique (A bis, A, B1, B2 ou C) sur service-public.fr. 3) Constituez votre dossier : avis d'imposition N-2, justificatifs de revenus, compromis de vente, devis de travaux si applicable. 4) Déposez votre demande auprès de votre banque qui instruit le PTZ en même temps que le prêt principal. 5) Signez l'offre de prêt : le PTZ apparaît comme une ligne distincte dans l'offre globale.",
  },
];

/* ── Profils types ── */
const PROFILES = [
  {
    titre: "Célibataire, 35 ans",
    desc: "Revenus 28 000 €/an — Zone B1 — Studio neuf 140 000 €",
    ptz: "56 000 €",
    detail: "40 % × 140 000 € = 56 000 € (plafond B1 pour 1 personne : 135 000 €). Différé 5 ans, remboursement sur 15 ans. Mensualité globale : ~580 €/mois vs ~820 €/mois sans PTZ. Économie totale : ~28 000 €.",
    badge: "Éligible",
    color: "#059669",
  },
  {
    titre: "Couple sans enfants",
    desc: "Revenus 48 000 €/an — Zone A (Lyon) — T2 neuf 280 000 €",
    ptz: "112 000 €",
    detail: "40 % × 280 000 € = 112 000 € (plafond A pour 2 personnes : 210 000 €). Différé 10 ans, remboursement sur 12 ans. Mensualité globale : ~1 050 €/mois vs ~1 420 €/mois sans PTZ. Économie totale : ~42 000 €.",
    badge: "Éligible",
    color: "#059669",
  },
  {
    titre: "Famille 2 enfants",
    desc: "Revenus 55 000 €/an — Zone B1 (Bordeaux) — T3 neuf 320 000 €",
    ptz: "128 000 €",
    detail: "40 % × 320 000 € = 128 000 € (plafond B1 pour 4 personnes : 270 000 €). Différé 5 ans, remboursement sur 15 ans. Mensualité globale : ~1 180 €/mois vs ~1 650 €/mois sans PTZ. Économie totale : ~46 000 €.",
    badge: "Éligible",
    color: "#059669",
  },
  {
    titre: "Primo-accédant modeste",
    desc: "Revenus 18 000 €/an — Zone C — Maison ancienne + 50 000 € travaux",
    ptz: "40 000 €",
    detail: "Maison 150 000 € + travaux 50 000 € = 200 000 €. 20 % × 200 000 € = 40 000 € (plafond C pour 1 personne : 100 000 €). Différé 15 ans, remboursement sur 10 ans. Mensualité globale : ~480 €/mois vs ~680 €/mois sans PTZ. Économie : ~21 000 €.",
    badge: "Éligible",
    color: "#059669",
  },
  {
    titre: "Primo-accédant aisé",
    desc: "Revenus 89 000 €/an — Zone A bis (IDF) — T3 neuf 550 000 €",
    ptz: "Non éligible",
    detail: "Revenus de 89 000 €/an dépassent le plafond Zone A bis pour 2 personnes (51 800 €). Même constat pour 3 personnes (62 900 €). À partir de 4 personnes dans le foyer, l'éligibilité redevient possible si les revenus ne dépassent pas 74 000 €.",
    badge: "Non éligible",
    color: "#dc2626",
  },
];

/* ── Mini simulateur intégré ── */
function MiniSimPTZ() {
  const [zone, setZone] = useState("B1");
  const [nbP, setNbP] = useState(2);
  const [revenus, setRevenus] = useState(42000);
  const [prix, setPrix] = useState(280000);
  const [type, setType] = useState("neuf");
  const [tauxCredit] = useState(3.5);
  const [duree] = useState(20);

  const result = useMemo(() => {
    const z = ZONES[zone];
    const idx = Math.min(nbP - 1, 4);
    const plafond = z.plafonds[idx];
    const maxPTZ = z.ptzMax[idx];
    if (revenus > plafond) return { eligible: false, reason: `Vos revenus (${fmt(revenus)}) dépassent le plafond de la ${zone} pour ${nbP} personne${nbP>1?"s":""} : ${fmt(plafond)}.` };
    if (type === "ancien" && zone !== "B2" && zone !== "C") return { eligible: false, reason: "L'ancien avec travaux n'est éligible au PTZ qu'en zones B2 et C." };
    const montantPTZ = Math.round(Math.min(prix * z.ptzPct, maxPTZ));
    const differe = revenus <= plafond * 0.5 ? 15 : revenus <= plafond * 0.7 ? 10 : 5;
    const dureePTZ = revenus <= plafond * 0.5 ? 25 : revenus <= plafond * 0.7 ? 22 : 20;
    const dureePTZRemb = dureePTZ - differe;
    const mensualitePTZ = Math.round(montantPTZ / (dureePTZRemb * 12));
    const creditClassique = Math.max(0, prix - montantPTZ);
    const mensualiteClassique = Math.round(mortgage(creditClassique, tauxCredit, duree));
    const mensualiteSansPTZ = Math.round(mortgage(prix, tauxCredit, duree));
    const economie = Math.round((mensualiteSansPTZ - mensualiteClassique) * duree * 12 + mensualitePTZ * dureePTZRemb * 12 - mensualiteSansPTZ * duree * 12 + mensualiteSansPTZ * duree * 12 - (mensualiteClassique * duree * 12 + mensualitePTZ * dureePTZRemb * 12));
    return { eligible: true, montantPTZ, differe, dureePTZ, mensualiteClassique, mensualitePTZ, mensualiteSansPTZ, economie: Math.max(0, Math.round(mensualiteSansPTZ * duree * 12 - creditClassique / (duree * 12) * duree * 12 - montantPTZ)) };
  }, [zone, nbP, revenus, prix, type, tauxCredit, duree]);

  return (
    <div style={{ background: "#eff6ff", border: "2px solid #bfdbfe", borderRadius: 20, padding: "28px 28px 24px", margin: "32px 0" }}>
      <h3 style={{ margin: "0 0 20px", fontSize: 20, fontWeight: 800, color: "#1e3a5f" }}>Vérifiez votre éligibilité PTZ en 30 secondes</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 20 }}>
        <label style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 13, fontWeight: 700, color: "#374151" }}>
          Ma zone géographique
          <select value={zone} onChange={e => setZone(e.target.value)} style={{ padding: "10px 12px", borderRadius: 10, border: "1.5px solid #bfdbfe", fontSize: 14, background: "#fff" }}>
            {Object.entries(ZONES).map(([k, v]) => <option key={k} value={k}>{v.label || k} — {v.villes.split(",")[0]}</option>)}
          </select>
        </label>
        <label style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 13, fontWeight: 700, color: "#374151" }}>
          Composition du foyer
          <select value={nbP} onChange={e => setNbP(Number(e.target.value))} style={{ padding: "10px 12px", borderRadius: 10, border: "1.5px solid #bfdbfe", fontSize: 14, background: "#fff" }}>
            {PERS_LABELS.map((l, i) => <option key={i} value={i+1}>{l}</option>)}
          </select>
        </label>
        <label style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 13, fontWeight: 700, color: "#374151" }}>
          Revenus fiscaux N-2 (€/an)
          <input type="number" value={revenus} onChange={e => setRevenus(Number(e.target.value))} min={0} max={200000} step={1000} style={{ padding: "10px 12px", borderRadius: 10, border: "1.5px solid #bfdbfe", fontSize: 14, background: "#fff" }} />
        </label>
        <label style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 13, fontWeight: 700, color: "#374151" }}>
          Prix du bien (€)
          <input type="number" value={prix} onChange={e => setPrix(Number(e.target.value))} min={50000} max={2000000} step={5000} style={{ padding: "10px 12px", borderRadius: 10, border: "1.5px solid #bfdbfe", fontSize: 14, background: "#fff" }} />
        </label>
        <label style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 13, fontWeight: 700, color: "#374151" }}>
          Type de bien
          <select value={type} onChange={e => setType(e.target.value)} style={{ padding: "10px 12px", borderRadius: 10, border: "1.5px solid #bfdbfe", fontSize: 14, background: "#fff" }}>
            <option value="neuf">Logement neuf / VEFA</option>
            <option value="ancien">Ancien avec travaux ≥ 25 %</option>
          </select>
        </label>
      </div>
      {result.eligible ? (
        <div style={{ background: "#f0fdf4", border: "1.5px solid #86efac", borderRadius: 14, padding: "20px 24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <span style={{ fontSize: 22 }}>✅</span>
            <strong style={{ fontSize: 17, color: "#14532d" }}>Vous êtes éligible au PTZ 2026</strong>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12 }}>
            {[
              { label: "Montant PTZ", value: fmt(result.montantPTZ), accent: true },
              { label: "Différé (sans remb.)", value: `${result.differe} ans` },
              { label: "Durée totale PTZ", value: `${result.dureePTZ} ans` },
              { label: "Mensualité estimée", value: `${fmt(result.mensualiteClassique + result.mensualitePTZ)}/mois` },
            ].map(it => (
              <div key={it.label} style={{ background: "#fff", borderRadius: 10, padding: "12px 14px", textAlign: "center" }}>
                <div style={{ fontSize: it.accent ? 20 : 17, fontWeight: 800, color: it.accent ? "#059669" : "#0c1a35" }}>{it.value}</div>
                <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>{it.label}</div>
              </div>
            ))}
          </div>
          <p style={{ margin: "14px 0 0", fontSize: 13, color: "#166534" }}>
            Simulation indicative basée sur un taux de 3,5 % sur 20 ans pour le prêt complémentaire.
            {" "}<Link to="/simulateurs/ptz" style={{ color: "#2563eb", fontWeight: 700 }}>Simulation complète →</Link>
          </p>
        </div>
      ) : (
        <div style={{ background: "#fef2f2", border: "1.5px solid #fca5a5", borderRadius: 14, padding: "18px 22px" }}>
          <span style={{ fontSize: 20 }}>⚠️</span>{" "}
          <strong style={{ color: "#991b1b" }}>Non éligible : </strong>
          <span style={{ color: "#7f1d1d", fontSize: 14 }}>{result.reason}</span>
        </div>
      )}
    </div>
  );
}

/* ── FAQ accordion ── */
function FAQAccordion({ items }) {
  const [open, setOpen] = useState(null);
  return (
    <div className="seo-faq-list">
      {items.map((item, i) => (
        <div key={i} className="seo-faq-item">
          <button className="seo-faq-btn" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}>
            <span className="seo-faq-question">{item.q}</span>
            <span className={`seo-faq-chevron${open === i ? " open" : ""}`}>▾</span>
          </button>
          {open === i && <div className="seo-faq-answer"><p>{item.a}</p></div>}
        </div>
      ))}
    </div>
  );
}

/* ── Table helper ── */
function TableCell({ children, right, bold, blue, gray }) {
  return (
    <td style={{
      padding: "9px 12px",
      borderBottom: "1px solid #e2e8f0",
      textAlign: right ? "right" : "left",
      fontWeight: bold ? 700 : 400,
      color: blue ? "#2563eb" : gray ? "#94a3b8" : "#1e293b",
      fontSize: 13,
      whiteSpace: "nowrap",
    }}>{children}</td>
  );
}

export default function PagePTZSEO() {
  useSEO({
    title: "PTZ 2026 : conditions, montants et simulation gratuite",
    description: "Vérifiez votre éligibilité au PTZ 2026 et calculez votre montant en 2 minutes. Plafonds de revenus par zone, montants max et simulation gratuite.",
    path: "/ptz-2026-conditions-montants",
    schema: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": FAQ_ITEMS.map((item) => ({
        "@type": "Question",
        "name": item.q,
        "acceptedAnswer": { "@type": "Answer", "text": item.a },
      })),
    },
  });

  return (
    <div className="page">
      <TopBar />
      <main>
        {/* ── Hero ── */}
        <section className="seo-hero">
          <div className="seo-hero-inner">
            <nav aria-label="Fil d'Ariane" style={{ fontSize: 13, color: "rgba(255,255,255,.5)", marginBottom: 4 }}>
              <Link to="/" style={{ color: "rgba(255,255,255,.5)" }}>Accueil</Link>{" › "}
              <span>PTZ 2026 — Conditions, montants et simulation</span>
            </nav>
            <div className="seo-hero-badge">
              <span className="seo-hero-dot" />
              Mis à jour avril 2026 · Données officielles
            </div>
            <h1 className="seo-hero-title">
              PTZ 2026 : conditions,<br />montants et simulation gratuite
            </h1>
            <p className="seo-hero-sub">
              Plafonds de revenus par zone et composition du foyer, montants maximaux, durées de remboursement et différé — tout ce qu'il faut savoir pour obtenir votre Prêt à Taux Zéro.
            </p>
            <Link to="/simulateurs/ptz" className="seo-hero-cta">
              Simuler mon PTZ 2026 →
            </Link>
            <div className="seo-hero-trust">
              <span className="seo-hero-trust-item">Taux d'intérêt 0 %</span>
              <span className="seo-hero-trust-item">Jusqu'à 345 000 € de PTZ</span>
              <span className="seo-hero-trust-item">Étendu à l'ancien en 2026</span>
            </div>
          </div>
        </section>

        {/* ── Key data ── */}
        <section className="seo-key-data">
          <div className="seo-key-data-grid">
            <div className="seo-key-data-item">
              <span className="seo-key-data-val">0 %</span>
              <span className="seo-key-data-lbl">Taux d'intérêt<br />aucun intérêt</span>
            </div>
            <div className="seo-key-data-item">
              <span className="seo-key-data-val">345 000 €</span>
              <span className="seo-key-data-lbl">Montant max<br />Zone A bis, 5+ pers.</span>
            </div>
            <div className="seo-key-data-item">
              <span className="seo-key-data-val">50 %</span>
              <span className="seo-key-data-lbl">Du prix du bien<br />en Zone A bis</span>
            </div>
            <div className="seo-key-data-item">
              <span className="seo-key-data-val">15 ans</span>
              <span className="seo-key-data-lbl">Différé max<br />pour revenus modestes</span>
            </div>
          </div>
        </section>

        {/* ── Content ── */}
        <section className="seo-content">
          <div className="seo-content-inner">

            <h2>Qu'est-ce que le PTZ 2026 ?</h2>
            <p>
              Le Prêt à Taux Zéro (PTZ) est un dispositif public permettant aux primo-accédants d'emprunter une partie du prix de leur résidence principale <strong>sans payer d'intérêts</strong>. Ce prêt aidé, accordé par les banques habilitées, est financé par l'État qui compense le manque à gagner en intérêts. En 2026, le PTZ est étendu aux logements anciens avec travaux en zones B2 et C — une nouveauté qui ouvre le dispositif à plusieurs centaines de milliers de primo-accédants supplémentaires.
            </p>

            <h2>Plafonds de revenus PTZ 2026 par zone et composition du foyer</h2>
            <p>Pour être éligible, votre <strong>revenu fiscal de référence de l'année N-2</strong> (2024 pour une demande en 2026) ne doit pas dépasser ces seuils :</p>
            <div style={{ overflowX: "auto", margin: "16px 0" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr style={{ background: "#eff6ff" }}>
                    <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #bfdbfe", fontWeight: 700 }}>Zone</th>
                    {PERS_LABELS.map(l => <th key={l} style={{ padding: "10px 12px", textAlign: "right", borderBottom: "2px solid #bfdbfe", fontWeight: 700, whiteSpace: "nowrap" }}>{l}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(ZONES).map(([key, z], i) => (
                    <tr key={key} style={{ background: i % 2 === 0 ? "#fff" : "#f8fafc" }}>
                      <td style={{ padding: "9px 12px", borderBottom: "1px solid #e2e8f0", fontWeight: 700, fontSize: 13 }}>
                        {key}<br /><span style={{ fontSize: 11, color: "#64748b", fontWeight: 400 }}>{z.villes}</span>
                      </td>
                      {z.plafonds.map((p, j) => (
                        <TableCell key={j} right blue={j === 0}>{p.toLocaleString("fr-FR")} €</TableCell>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: 12, color: "#64748b" }}>Source : SGFGAS / Ministère du Logement. Revenus fiscaux de référence N-2. Plafonds 2026 applicables aux offres émises à compter du 1er janvier 2026.</p>

            <h2>Montants maximaux du PTZ 2026 par zone et composition du foyer</h2>
            <p>Le montant PTZ est le <strong>minimum</strong> entre le pourcentage du prix du bien et le plafond ci-dessous. Taux : 50 % (Zone A bis), 40 % (Zones A et B1), 20 % (Zones B2 et C) :</p>
            <div style={{ overflowX: "auto", margin: "16px 0" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr style={{ background: "#eff6ff" }}>
                    <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #bfdbfe", fontWeight: 700 }}>Zone</th>
                    <th style={{ padding: "10px 12px", textAlign: "right", borderBottom: "2px solid #bfdbfe", fontWeight: 700, whiteSpace: "nowrap" }}>Taux PTZ</th>
                    {PERS_LABELS.map(l => <th key={l} style={{ padding: "10px 12px", textAlign: "right", borderBottom: "2px solid #bfdbfe", fontWeight: 700, whiteSpace: "nowrap" }}>{l}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(ZONES).map(([key, z], i) => (
                    <tr key={key} style={{ background: i % 2 === 0 ? "#fff" : "#f8fafc" }}>
                      <td style={{ padding: "9px 12px", borderBottom: "1px solid #e2e8f0", fontWeight: 700, fontSize: 13 }}>{key}</td>
                      <TableCell right><strong>{(z.ptzPct * 100).toFixed(0)} %</strong></TableCell>
                      {z.ptzMax.map((m, j) => (
                        <TableCell key={j} right blue>{m.toLocaleString("fr-FR")} €</TableCell>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2>Durée de remboursement et période de différé PTZ 2026</h2>
            <p>Le PTZ comprend une <strong>période de différé</strong> pendant laquelle vous ne remboursez que votre prêt classique, pas le PTZ. Plus vos revenus sont faibles, plus le différé est long :</p>
            <div style={{ overflowX: "auto", margin: "16px 0" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr style={{ background: "#eff6ff" }}>
                    {["Tranche de revenus", "Période de différé", "Période de remboursement", "Durée totale PTZ"].map((h, j) => (
                      <th key={h} style={{ padding: "10px 12px", textAlign: j > 0 ? "center" : "left", borderBottom: "2px solid #bfdbfe", fontWeight: 700 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Revenus ≤ 50 % du plafond (revenus très modestes)", "15 ans", "10 ans", "25 ans"],
                    ["Revenus entre 50 % et 70 % du plafond", "10 ans", "12 ans", "22 ans"],
                    ["Revenus > 70 % du plafond (revenus proches du max)", "5 ans", "15 ans", "20 ans"],
                  ].map((row, i) => (
                    <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#f8fafc" }}>
                      <td style={{ padding: "9px 12px", borderBottom: "1px solid #e2e8f0", fontSize: 13 }}>{row[0]}</td>
                      <td style={{ padding: "9px 12px", borderBottom: "1px solid #e2e8f0", textAlign: "center", fontWeight: 700, color: "#2563eb", fontSize: 13 }}>{row[1]}</td>
                      <td style={{ padding: "9px 12px", borderBottom: "1px solid #e2e8f0", textAlign: "center", fontSize: 13 }}>{row[2]}</td>
                      <td style={{ padding: "9px 12px", borderBottom: "1px solid #e2e8f0", textAlign: "center", fontWeight: 700, fontSize: 13 }}>{row[3]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ── Mini simulator ── */}
            <MiniSimPTZ />

            <h2>PTZ 2026 et logements anciens : la grande nouveauté</h2>
            <p>
              Jusqu'en 2024, le PTZ était réservé aux logements neufs (VEFA, construction). Depuis 2026, il est accessible aux logements anciens en <strong>zones B2 et C</strong>, à condition que les <strong>travaux de rénovation représentent au moins 25 % du coût total</strong> de l'opération (prix d'achat + travaux). Cette réforme cible particulièrement les primo-accédants des zones rurales et périurbaines, qui peuvent désormais acheter une maison ancienne à rénover avec l'aide du PTZ.
            </p>
            <div style={{ background: "#fefce8", border: "1px solid #fde047", borderRadius: 12, padding: "16px 20px", margin: "20px 0", display: "flex", gap: 12, alignItems: "flex-start" }}>
              <span style={{ fontSize: 20, flexShrink: 0 }}>💡</span>
              <p style={{ margin: 0, fontSize: 14, color: "#713f12" }}>
                <strong>Exemple concret :</strong> Vous achetez une maison de village à 120 000 € en zone C + 40 000 € de travaux = 160 000 € de coût total. PTZ = 20 % × 160 000 € = <strong>32 000 € sans intérêts</strong>. Différé de 15 ans si revenus ≤ 12 000 €/an.
              </p>
            </div>

            <h2>5 profils types : combien puis-je obtenir avec le PTZ ?</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16, margin: "20px 0" }}>
              {PROFILES.map(p => (
                <div key={p.titre} style={{ background: "#fff", border: "1.5px solid #e2e8f0", borderRadius: 16, padding: "20px", boxShadow: "0 2px 8px rgba(0,0,0,.05)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                    <strong style={{ fontSize: 15, color: "#0c1a35" }}>{p.titre}</strong>
                    <span style={{ fontSize: 12, fontWeight: 700, color: "#fff", background: p.color, borderRadius: 20, padding: "3px 10px", flexShrink: 0, marginLeft: 8 }}>{p.badge}</span>
                  </div>
                  <p style={{ fontSize: 12, color: "#64748b", margin: "0 0 10px" }}>{p.desc}</p>
                  <div style={{ fontSize: 22, fontWeight: 900, color: p.color, margin: "4px 0 8px" }}>{p.ptz}</div>
                  <p style={{ fontSize: 12, color: "#475569", margin: 0, lineHeight: 1.6 }}>{p.detail}</p>
                </div>
              ))}
            </div>

            <h2>Comment faire une demande de PTZ 2026 ?</h2>
            <ol style={{ paddingLeft: "1.4em", lineHeight: 2 }}>
              <li><strong>Vérifiez votre éligibilité</strong> avec le simulateur ci-dessus : primo-accédant, revenus N-2 sous le plafond de votre zone.</li>
              <li><strong>Identifiez votre zone</strong> (A bis, A, B1, B2, C) sur <a href="https://www.service-public.fr" target="_blank" rel="noopener" style={{ color: "#2563eb" }}>service-public.fr</a> à partir de votre code postal.</li>
              <li><strong>Rassemblez votre dossier</strong> : avis d'imposition N-2, justificatifs de revenus, compromis de vente, devis de travaux si ancien.</li>
              <li><strong>Sollicitez votre banque</strong> : elle instruit simultanément le PTZ et votre prêt principal. Toutes les banques habilitées proposent le PTZ.</li>
              <li><strong>Signez l'offre de prêt</strong> : le PTZ apparaît comme une ligne distincte, débloqué lors de la signature de l'acte authentique chez le notaire.</li>
            </ol>

            <h2>PTZ cumulable avec d'autres aides</h2>
            <p>Le PTZ se cumule avec d'autres dispositifs pour maximiser votre financement :</p>
            <ul style={{ lineHeight: 2 }}>
              <li><strong>Prêt Action Logement</strong> (1 % patronal) : jusqu'à 40 000 € à taux réduit pour les salariés du secteur privé</li>
              <li><strong>PEL / CEL</strong> : prêts épargne logement à taux préférentiel</li>
              <li><strong>Prêt à l'Accession Sociale (PAS)</strong> : taux plafonné + garantie de l'État</li>
              <li><strong>Aides locales</strong> : certaines collectivités (régions, métropoles) proposent des prêts complémentaires à taux 0</li>
            </ul>
          </div>
        </section>

        {/* ── Simulator CTA ── */}
        <section className="seo-sim-cta">
          <div className="seo-sim-cta-inner">
            <span style={{ fontSize: 40 }}>🏡</span>
            <h2 className="seo-sim-cta-title">Simulateur PTZ 2026 complet</h2>
            <p className="seo-sim-cta-sub">
              Entrez votre zone, vos revenus et le prix du bien : notre simulateur calcule instantanément le montant PTZ, le différé, votre mensualité et l'économie totale réalisée par rapport à un financement 100 % bancaire.
            </p>
            <Link to="/simulateurs/ptz" className="seo-hero-cta" style={{ alignSelf: "center" }}>
              Simuler mon PTZ 2026 →
            </Link>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="seo-faq">
          <div className="seo-faq-inner">
            <p className="seo-section-kicker">10 questions fréquentes</p>
            <h2 className="seo-section-title">PTZ 2026 : toutes vos questions</h2>
            <FAQAccordion items={FAQ_ITEMS} />
          </div>
        </section>

        {/* ── Related ── */}
        <section style={{ padding: "40px 24px", background: "#f8fafc", borderTop: "1px solid #e2e8f0" }}>
          <div style={{ maxWidth: 840, margin: "0 auto" }}>
            <p style={{ fontSize: 14, color: "#64748b", marginBottom: 12, fontWeight: 600 }}>Simulateurs associés :</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {[
                { to: "/simulateurs/ptz", label: "Simulateur PTZ complet" },
                { to: "/simulateurs/budget-maximum", label: "Budget maximum d'achat" },
                { to: "/simulateurs/pret-immobilier", label: "Simulateur prêt immo" },
                { to: "/simulateurs/endettement", label: "Capacité d'emprunt" },
                { to: "/simulateurs/frais-notaire", label: "Frais de notaire" },
              ].map((link) => (
                <Link key={link.to} to={link.to} style={{ fontSize: 14, color: "#2563eb", background: "#eff6ff", padding: "7px 16px", borderRadius: 20, textDecoration: "none", fontWeight: 500, border: "1px solid #bfdbfe" }}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
