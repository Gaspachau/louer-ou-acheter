import { useState } from "react";
import { Link } from "react-router-dom";
import { useSEO } from "../../utils/useSEO";
import TopBar from "../TopBar";
import Footer from "../Footer";

const FAQ_ITEMS = [
  {
    q: "Qui peut bénéficier du PTZ 2026 ?",
    a: "Le PTZ 2026 est réservé aux primo-accédants (ne pas avoir été propriétaire de sa résidence principale dans les 2 dernières années), sous condition de respecter les plafonds de revenus de sa zone géographique et d'acheter pour en faire sa résidence principale. Depuis 2026, le PTZ est accessible pour l'achat de logements anciens avec travaux en zones B2 et C, élargissant considérablement le nombre de bénéficiaires potentiels.",
  },
  {
    q: "Peut-on cumuler PTZ et prêt immobilier classique ?",
    a: "Oui, le PTZ est conçu pour être cumulé avec un prêt classique. Il ne peut pas financer la totalité d'un achat et doit être complété par d'autres financements : prêt bancaire classique, apport personnel, prêt action logement, PEL/CEL ou autres aides. Le PTZ réduit la part du prêt principal à rembourser avec intérêts, ce qui allège la mensualité globale.",
  },
  {
    q: "Quelle est la durée de remboursement du PTZ ?",
    a: "La durée totale du PTZ varie entre 20 et 25 ans selon les revenus et la zone. Elle comprend une période de différé (entre 5 et 15 ans selon les revenus) pendant laquelle vous ne remboursez pas le PTZ, puis une période de remboursement proprement dit. Plus vos revenus sont faibles, plus le différé est long.",
  },
  {
    q: "Le PTZ est-il remboursable si je revends ?",
    a: "Oui, si vous revendez votre bien avant la fin du remboursement du PTZ, vous devrez rembourser le capital restant dû au moment de la vente. Aucune pénalité de remboursement anticipé n'est applicable. Si vous revendez pendant la période de différé, vous remboursez l'intégralité du capital PTZ en une fois. Le PTZ ne peut pas être transféré sur un autre achat.",
  },
];

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

export default function PagePTZSEO() {
  useSEO({
    title: "PTZ 2026 : conditions, montants et simulateur",
    description:
      "Découvrez si vous êtes éligible au PTZ 2026. Zones A/B1/B2/C, plafonds de revenus et montants max. Simulation gratuite et immédiate.",
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
              <Link to="/" style={{ color: "rgba(255,255,255,.5)" }}>Accueil</Link>
              {" › "}
              <span>PTZ 2026 — Conditions, montants et simulateur</span>
            </nav>
            <div className="seo-hero-badge">
              <span className="seo-hero-dot" />
              Étendu à l'ancien en 2026 · Zones A / B1 / B2 / C
            </div>
            <h1 className="seo-hero-title">
              PTZ 2026 : tout ce qu'il<br />faut savoir
            </h1>
            <p className="seo-hero-sub">
              Êtes-vous éligible au Prêt à Taux Zéro 2026 ? Zones, plafonds de revenus, montants maximaux et démarches expliqués clairement.
            </p>
            <Link to="/simulateurs/ptz" className="seo-hero-cta">
              Simuler mon PTZ 2026 →
            </Link>
            <div className="seo-hero-trust">
              <span className="seo-hero-trust-item">Taux d'intérêt 0 %</span>
              <span className="seo-hero-trust-item">Étendu aux logements anciens</span>
              <span className="seo-hero-trust-item">Simulation gratuite</span>
            </div>
          </div>
        </section>

        {/* ── Key data ── */}
        <section className="seo-key-data">
          <div className="seo-key-data-grid">
            <div className="seo-key-data-item">
              <span className="seo-key-data-val">0 %</span>
              <span className="seo-key-data-lbl">Taux d'intérêt<br />aucun intérêt à payer</span>
            </div>
            <div className="seo-key-data-item">
              <span className="seo-key-data-val">240 000 €</span>
              <span className="seo-key-data-lbl">Montant max Zone A<br />Paris, IDF, grandes agglos</span>
            </div>
            <div className="seo-key-data-item">
              <span className="seo-key-data-val">40 %</span>
              <span className="seo-key-data-lbl">Du coût total<br />en zones A bis / A / B1</span>
            </div>
            <div className="seo-key-data-item">
              <span className="seo-key-data-val">A/B1/B2/C</span>
              <span className="seo-key-data-lbl">Zones éligibles<br />étendu à l'ancien en 2026</span>
            </div>
          </div>
        </section>

        {/* ── Content ── */}
        <section className="seo-content">
          <div className="seo-content-inner">
            <h2>Les zones PTZ 2026 : où suis-je éligible ?</h2>
            <p>Le territoire français est divisé en quatre zones selon la tension du marché immobilier local. Cette classification détermine les plafonds de revenus et les montants maximaux du PTZ :</p>
            <div style={{ overflowX: "auto", margin: "16px 0" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                <thead>
                  <tr style={{ background: "#eff6ff" }}>
                    {["Zone", "Villes / Exemples", "Plafond revenus (2 pers.)", "PTZ max (neuf, 2 pers.)"].map((h, j) => (
                      <th key={h} style={{ padding: "10px 14px", textAlign: j >= 2 ? "right" : "left", borderBottom: "2px solid #bfdbfe" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Zone A bis", "Paris, Hauts-de-Seine, Yvelines (certaines communes)", "58 000 €/an", "172 800 €"],
                    ["Zone A", "Lyon, Marseille, Côte d'Azur, Montpellier, Île-de-France", "53 000 €/an", "144 000 €"],
                    ["Zone B1", "Bordeaux, Nantes, Toulouse, Lille, Strasbourg, Grenoble", "43 000 €/an", "115 200 €"],
                    ["Zone B2", "Villes moyennes (50k–250k hab.), littoral, zones frontalières", "35 000 €/an", "100 800 €"],
                    ["Zone C", "Reste du territoire (zones rurales, villes < 50k hab.)", "31 000 €/an", "86 400 €"],
                  ].map((row, i) => (
                    <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#f8fafc" }}>
                      {row.map((cell, j) => (
                        <td key={j} style={{ padding: "9px 14px", borderBottom: "1px solid #e2e8f0", textAlign: j >= 2 ? "right" : "left", fontWeight: j === 0 ? 700 : 400, color: j === 3 ? "#2563eb" : "#1e293b" }}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: 13, color: "#64748b" }}>Les plafonds de revenus correspondent au revenu fiscal de référence de l'année N-2, et varient selon la composition du ménage. Les montants PTZ max indiqués sont pour 2 personnes dans le neuf.</p>

            <h2>Combien puis-je emprunter avec le PTZ ?</h2>
            <p>
              Le montant du PTZ est calculé comme un pourcentage du coût total de l'opération (prix + frais de notaire), plafonné par zone et par composition de ménage. Ce pourcentage est de <strong>40 %</strong> dans les zones A bis, A et B1 pour un logement neuf. Il est de 20 % en zones B2 et C. Pour les logements anciens (nouveauté 2026), le taux est de 20 % en zones B2 et C, sous condition de travaux de rénovation représentant au moins 25 % du coût total.
            </p>

            <h2>PTZ 2026 et logements anciens : la nouveauté</h2>
            <p>
              L'évolution majeure du PTZ 2026 est son extension aux logements anciens dans les zones B2 et C. Jusqu'en 2024, le PTZ était réservé au neuf. Désormais, un primo-accédant qui achète une maison ancienne dans une commune rurale peut bénéficier d'un PTZ à condition d'engager des travaux de rénovation équivalant à au moins 25 % du coût total.
            </p>
            <p>
              En pratique, pour une maison achetée 180 000 € en zone C avec 45 000 € de travaux, le coût total est de 225 000 €. Le PTZ peut financer 20 % de ce montant, soit <strong>45 000 € sans intérêts</strong>.
            </p>

            <div style={{ background: "#fefce8", border: "1px solid #fde047", borderRadius: 12, padding: "16px 20px", margin: "24px 0", display: "flex", gap: 12, alignItems: "flex-start" }}>
              <span style={{ fontSize: 20 }}>💡</span>
              <p style={{ margin: 0, fontSize: 15, color: "#713f12" }}>
                <strong>Économie concrète :</strong> Cumuler PTZ + prêt classique peut réduire votre mensualité globale de 200 à 400 €/mois par rapport à un financement 100 % classique, car une partie du capital est remboursée sans intérêts pendant la période de différé.
              </p>
            </div>

            <h2>Comment faire une demande de PTZ ?</h2>
            <ol>
              <li><strong>Vérifiez votre éligibilité :</strong> Primo-accédant, respect des plafonds de revenus de votre zone, achat pour résidence principale.</li>
              <li><strong>Identifiez votre zone :</strong> Utilisez le moteur de recherche officiel (service-public.fr) ou notre simulateur PTZ avec votre code postal.</li>
              <li><strong>Constituez votre dossier :</strong> Avis d'imposition N-2, justificatifs de revenus, compromis de vente, devis de travaux si applicable.</li>
              <li><strong>Déposez une demande auprès de votre banque :</strong> La banque instruit simultanément le PTZ et le prêt principal, et calcule le montant auquel vous avez droit.</li>
              <li><strong>Signez l'offre de prêt :</strong> Le PTZ figure comme une ligne distincte dans l'offre globale, débloqué lors de la signature de l'acte authentique.</li>
            </ol>
          </div>
        </section>

        {/* ── Simulator CTA ── */}
        <section className="seo-sim-cta">
          <div className="seo-sim-cta-inner">
            <span style={{ fontSize: 40 }}>🏡</span>
            <h2 className="seo-sim-cta-title">Simulez votre PTZ 2026 en quelques secondes</h2>
            <p className="seo-sim-cta-sub">
              Entrez votre code postal, vos revenus et la composition de votre ménage : notre simulateur calcule instantanément le montant PTZ auquel vous pouvez prétendre.
            </p>
            <Link to="/simulateurs/ptz" className="seo-hero-cta" style={{ alignSelf: "center" }}>
              Simuler mon PTZ 2026 →
            </Link>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="seo-faq">
          <div className="seo-faq-inner">
            <p className="seo-section-kicker">Questions fréquentes</p>
            <h2 className="seo-section-title">PTZ 2026 : vos questions</h2>
            <FAQAccordion items={FAQ_ITEMS} />
          </div>
        </section>

        {/* ── Related ── */}
        <section style={{ padding: "40px 24px", background: "#f8fafc", borderTop: "1px solid #e2e8f0" }}>
          <div style={{ maxWidth: 840, margin: "0 auto" }}>
            <p style={{ fontSize: 14, color: "#64748b", marginBottom: 12, fontWeight: 600 }}>Simulateurs associés :</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {[
                { to: "/simulateurs/budget-maximum", label: "Budget maximum" },
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
