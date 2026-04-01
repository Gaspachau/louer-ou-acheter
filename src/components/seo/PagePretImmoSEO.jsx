import { useState } from "react";
import { Link } from "react-router-dom";
import { useSEO } from "../../utils/useSEO";
import TopBar from "../TopBar";
import Footer from "../Footer";

const FAQ_ITEMS = [
  {
    q: "Quelle mensualité pour 200 000 euros ?",
    a: "Pour un emprunt de 200 000 € à 3,6 % sur 20 ans, la mensualité hors assurance est d'environ 1 165 €/mois. Sur 25 ans au même taux, elle descend à 1 003 €/mois. En ajoutant l'assurance emprunteur (~42 €/mois), comptez respectivement 1 207 € et 1 045 €/mois. Pour respecter la règle HCSF des 35 %, il faut un revenu net mensuel d'au moins 3 450 € sur 20 ans ou 2 990 € sur 25 ans.",
  },
  {
    q: "Quel salaire pour emprunter 300 000 euros ?",
    a: "Pour emprunter 300 000 € à 3,8 % sur 20 ans, la mensualité est d'environ 1 768 € hors assurance, soit ~1 830 € avec assurance. Avec la règle des 35 % du HCSF, il faut un revenu net mensuel d'au moins 5 230 €. Sur 25 ans, la mensualité descend à environ 1 603 € assurance comprise, ce qui nécessite un revenu d'au moins 4 580 €/mois.",
  },
  {
    q: "Comment calculer le coût total de son crédit ?",
    a: "Le coût total comprend : le total des intérêts payés sur la durée (mensualité × nombre de mois − capital emprunté), le coût de l'assurance emprunteur (~0,25 % du capital par an), et les frais de dossier (500 à 1 500 €). Pour un prêt de 300 000 € à 3,8 % sur 25 ans, le coût total intérêts + assurance dépasse 200 000 €.",
  },
  {
    q: "Quelle durée choisir pour son prêt immobilier ?",
    a: "Une durée courte (15-20 ans) coûte moins cher en intérêts mais impose des mensualités plus élevées. Une durée longue (25 ans) allège la mensualité de 15 % mais augmente le coût total de 25-30 %. En 2026, la plupart des primo-accédants optent pour 20 à 25 ans. Si vous prévoyez de revendre avant 10 ans, une durée plus longue préserve votre trésorerie mensuelle.",
  },
];

function FAQAccordion({ items }) {
  const [open, setOpen] = useState(null);
  return (
    <div className="seo-faq-list">
      {items.map((item, i) => (
        <div key={i} className="seo-faq-item">
          <button
            className="seo-faq-btn"
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
          >
            <span className="seo-faq-question">{item.q}</span>
            <span className={`seo-faq-chevron${open === i ? " open" : ""}`}>▾</span>
          </button>
          {open === i && (
            <div className="seo-faq-answer">
              <p>{item.a}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function PagePretImmoSEO() {
  useSEO({
    title: "Simulateur prêt immobilier gratuit 2026",
    description:
      "Calculez votre mensualité, le coût total de votre crédit et le tableau d'amortissement. Gratuit, sans inscription, résultat en 30 secondes.",
    path: "/simulateur-pret-immobilier-gratuit",
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
              <span>Simulateur prêt immobilier gratuit 2026</span>
            </nav>
            <div className="seo-hero-badge">
              <span className="seo-hero-dot" />
              Taux 2026 intégrés · Mis à jour avril 2026
            </div>
            <h1 className="seo-hero-title">
              Simulateur prêt<br />immobilier gratuit
            </h1>
            <p className="seo-hero-sub">
              Calculez votre mensualité, le coût total de votre crédit et votre tableau d'amortissement complet. Sans inscription, résultat en 30 secondes.
            </p>
            <Link to="/simulateurs/pret-immobilier" className="seo-hero-cta">
              Calculer ma mensualité →
            </Link>
            <div className="seo-hero-trust">
              <span className="seo-hero-trust-item">Gratuit, sans inscription</span>
              <span className="seo-hero-trust-item">Tableau d'amortissement complet</span>
              <span className="seo-hero-trust-item">Taux 2026 intégrés</span>
            </div>
          </div>
        </section>

        {/* ── Key data ── */}
        <section className="seo-key-data">
          <div className="seo-key-data-grid">
            <div className="seo-key-data-item">
              <span className="seo-key-data-val">1 540 €</span>
              <span className="seo-key-data-lbl">Mensualité exemple<br />300 k€ · 3,8 % · 25 ans</span>
            </div>
            <div className="seo-key-data-item">
              <span className="seo-key-data-val">162 000 €</span>
              <span className="seo-key-data-lbl">Coût total crédit<br />intérêts + assurance</span>
            </div>
            <div className="seo-key-data-item">
              <span className="seo-key-data-val">3,7 %</span>
              <span className="seo-key-data-lbl">TAEG moyen 2026<br />sur 20 ans, bon dossier</span>
            </div>
            <div className="seo-key-data-item">
              <span className="seo-key-data-val">25 ans</span>
              <span className="seo-key-data-lbl">Durée max HCSF<br />autorisée par les banques</span>
            </div>
          </div>
        </section>

        {/* ── Content ── */}
        <section className="seo-content">
          <div className="seo-content-inner">
            <h2>Comment calculer sa mensualité ?</h2>
            <p>
              La mensualité d'un prêt immobilier se calcule à l'aide d'une formule mathématique basée sur le capital emprunté, le taux d'intérêt mensuel et la durée en mois :
            </p>
            <p><strong>M = C × [t / (1 − (1 + t)^−n)]</strong></p>
            <p>
              Où <em>M</em> est la mensualité, <em>C</em> le capital emprunté, <em>t</em> le taux mensuel (taux annuel divisé par 12) et <em>n</em> le nombre de mensualités.
            </p>
            <p>
              Exemple concret : pour un emprunt de 300 000 € à 3,8 % sur 25 ans, la mensualité hors assurance ressort à <strong>1 540 €/mois</strong>. En ajoutant l'assurance (~63 €/mois), la mensualité totale est d'environ <strong>1 603 €/mois</strong>.
            </p>

            <h2>Les paramètres qui influencent votre mensualité</h2>
            <p>Trois facteurs principaux déterminent le montant de votre mensualité : le montant emprunté, le taux d'intérêt et la durée du prêt.</p>
            <div style={{ overflowX: "auto", margin: "16px 0" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                <thead>
                  <tr style={{ background: "#eff6ff" }}>
                    {["Capital", "Taux", "Durée", "Mensualité", "Coût total intérêts"].map((h) => (
                      <th key={h} style={{ padding: "10px 14px", textAlign: "left", borderBottom: "2px solid #bfdbfe" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["200 000 €", "3,6 %", "20 ans", "1 165 €", "79 600 €"],
                    ["200 000 €", "3,6 %", "25 ans", "1 003 €", "100 900 €"],
                    ["300 000 €", "3,8 %", "20 ans", "1 768 €", "124 320 €"],
                    ["300 000 €", "3,8 %", "25 ans", "1 540 €", "162 000 €"],
                    ["400 000 €", "4,0 %", "25 ans", "2 107 €", "232 100 €"],
                  ].map((row, i) => (
                    <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#f8fafc" }}>
                      {row.map((cell, j) => (
                        <td key={j} style={{ padding: "9px 14px", borderBottom: "1px solid #e2e8f0", fontWeight: j === 3 ? 700 : 400, color: j === 3 ? "#2563eb" : "#1e293b" }}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p>Allonger la durée de 20 à 25 ans réduit la mensualité d'environ 13 %, mais augmente le coût total des intérêts de 25 à 30 %.</p>

            <h2>Taux immobiliers en 2026 : où en est-on ?</h2>
            <p>
              Après avoir atteint un pic à 4,5 % fin 2023, les taux immobiliers se stabilisent en 2026 dans une fourchette de <strong>3,5 à 4,0 %</strong> selon la durée et le profil. Un excellent profil (apport &gt; 20 %, CDI) peut obtenir un taux nominal autour de 3,5 % sur 20 ans. Le TAEG moyen, assurance comprise, se situe autour de 4,0 à 4,3 %.
            </p>

            <div style={{ background: "#fefce8", border: "1px solid #fde047", borderRadius: 12, padding: "16px 20px", margin: "24px 0", display: "flex", gap: 12, alignItems: "flex-start" }}>
              <span style={{ fontSize: 20 }}>💡</span>
              <p style={{ margin: 0, fontSize: 15, color: "#713f12" }}>
                <strong>Conseil :</strong> Négociez votre assurance emprunteur séparément de votre banque (délégation d'assurance). Cela peut économiser de 0,2 % à 0,5 % de TAEG, soit <strong>plusieurs milliers d'euros</strong> sur la durée totale — souvent plus que la négociation du taux lui-même.
              </p>
            </div>

            <h2>Comment obtenir le meilleur taux ?</h2>
            <ul>
              <li><strong>Maximiser l'apport personnel :</strong> Un apport d'au moins 10 à 20 % est quasi-obligatoire. Au-delà de 20 %, vous accédez aux meilleures grilles de taux.</li>
              <li><strong>Soigner son dossier :</strong> Stabilité professionnelle (CDI), absence d'incidents bancaires, taux d'endettement &lt; 30 % avant emprunt.</li>
              <li><strong>Passer par un courtier :</strong> Un courtier peut faire gagner 0,2 à 0,5 point de taux. Sa rémunération est souvent prise en charge par la banque.</li>
              <li><strong>Comparer plusieurs établissements :</strong> Banques en ligne, banques régionales et mutuelles proposent parfois des conditions plus avantageuses.</li>
              <li><strong>Déléguer l'assurance emprunteur :</strong> La loi Lemoine vous permet de changer d'assurance à tout moment — économie de 2 à 4 × sur le coût de l'assurance.</li>
            </ul>
          </div>
        </section>

        {/* ── Simulator CTA ── */}
        <section className="seo-sim-cta">
          <div className="seo-sim-cta-inner">
            <span style={{ fontSize: 40 }}>🧮</span>
            <h2 className="seo-sim-cta-title">Calculez votre mensualité en 30 secondes</h2>
            <p className="seo-sim-cta-sub">
              Notre simulateur génère votre tableau d'amortissement complet, le coût total du crédit et compare plusieurs scénarios en un clic. Gratuit, sans inscription.
            </p>
            <Link to="/simulateurs/pret-immobilier" className="seo-hero-cta" style={{ alignSelf: "center" }}>
              Calculer ma mensualité →
            </Link>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="seo-faq">
          <div className="seo-faq-inner">
            <p className="seo-section-kicker">Questions fréquentes</p>
            <h2 className="seo-section-title">Prêt immobilier : vos questions</h2>
            <FAQAccordion items={FAQ_ITEMS} />
          </div>
        </section>

        {/* ── Related ── */}
        <section style={{ padding: "40px 24px", background: "#f8fafc", borderTop: "1px solid #e2e8f0" }}>
          <div style={{ maxWidth: 840, margin: "0 auto" }}>
            <p style={{ fontSize: 14, color: "#64748b", marginBottom: 12, fontWeight: 600 }}>Simulateurs associés :</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {[
                { to: "/simulateurs/endettement", label: "Capacité d'emprunt" },
                { to: "/simulateurs/assurance-pret", label: "Assurance prêt" },
                { to: "/simulateurs/budget-maximum", label: "Budget maximum" },
                { to: "/simulateurs/remboursement-anticipe", label: "Remboursement anticipé" },
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
