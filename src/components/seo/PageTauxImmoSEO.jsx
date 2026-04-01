import { useState } from "react";
import { Link } from "react-router-dom";
import { useSEO } from "../../utils/useSEO";
import TopBar from "../TopBar";
import Footer from "../Footer";

const FAQ_ITEMS = [
  {
    q: "Quel est le taux immobilier actuel en 2026 ?",
    a: "En avril 2026, les taux immobiliers en France se situent entre 3,4 % et 4,1 % selon la durée et le profil de l'emprunteur. Pour un emprunt sur 20 ans avec un bon profil (apport 15-20 %, CDI stable), le taux nominal oscille autour de 3,5 à 3,7 %. Le TAEG moyen, assurance comprise, se situe entre 3,9 et 4,3 %. Ces taux sont en baisse de 0,5 à 0,8 point par rapport au pic de fin 2023.",
  },
  {
    q: "Les taux vont-ils encore baisser en 2026 ?",
    a: "La tendance de fond est baissière, mais l'ampleur reste incertaine. La majorité des économistes anticipent une baisse modérée de 0,2 à 0,4 point d'ici fin 2026, portant le taux moyen sur 20 ans vers 3,3 à 3,5 %. Un choc externe (géopolitique, énergétique) pourrait inverser cette tendance. Attendre une baisse supplémentaire pour emprunter est risqué : une bonne opportunité immobilière peut valoir plus que 0,2 point de taux.",
  },
  {
    q: "Quelle différence entre TAEG et taux nominal ?",
    a: "Le taux nominal est le taux d'intérêt pur appliqué au capital emprunté. Le TAEG (Taux Annuel Effectif Global) inclut en plus le coût de l'assurance emprunteur, les frais de dossier et les frais de garantie. C'est le TAEG qui représente le coût réel du crédit et qui est utilisé pour comparer deux offres. En 2026, la différence entre taux nominal et TAEG est généralement de 0,2 à 0,5 point.",
  },
  {
    q: "Vaut-il mieux emprunter sur 20 ou 25 ans en 2026 ?",
    a: "Sur 20 ans, le taux est plus bas (~0,2 point de moins), les intérêts totaux sont inférieurs, et vous constituez du patrimoine plus vite. Sur 25 ans, la mensualité est allégée d'environ 15 %, ce qui peut être décisif pour respecter les 35 % d'endettement. Si votre capacité mensuelle le permet, 20 ans est généralement plus avantageux. Si vous êtes en limite de capacité d'emprunt, 25 ans vous permet d'accéder à un bien plus grand.",
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

export default function PageTauxImmoSEO() {
  useSEO({
    title: "Taux immobilier 2026 : baromètre et prévisions",
    description:
      "Taux immobilier 2026 : où en sont les taux, quelles prévisions pour la suite ? Analyse et simulateur pour calculer votre mensualité.",
    path: "/taux-immobilier-2026",
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
              <span>Taux immobilier 2026 — Baromètre et prévisions</span>
            </nav>
            <div className="seo-hero-badge">
              <span className="seo-hero-dot" />
              Baromètre avril 2026 · Données actualisées
            </div>
            <h1 className="seo-hero-title">
              Taux immobilier 2026 :<br />baromètre &amp; prévisions
            </h1>
            <p className="seo-hero-sub">
              Où en sont les taux en 2026 ? Évolution depuis le pic de 2023, analyse par profil et durée, prévisions pour la fin de l'année.
            </p>
            <Link to="/simulateurs/pret-immobilier" className="seo-hero-cta">
              Simuler avec les taux 2026 →
            </Link>
            <div className="seo-hero-trust">
              <span className="seo-hero-trust-item">Baromètre mis à jour</span>
              <span className="seo-hero-trust-item">Analyse par profil</span>
              <span className="seo-hero-trust-item">Prévisions experts</span>
            </div>
          </div>
        </section>

        {/* ── Key data ── */}
        <section className="seo-key-data">
          <div className="seo-key-data-grid">
            <div className="seo-key-data-item">
              <span className="seo-key-data-val">3,7 %</span>
              <span className="seo-key-data-lbl">Taux moyen 20 ans<br />profil standard, avril 2026</span>
            </div>
            <div className="seo-key-data-item">
              <span className="seo-key-data-val">4,5 %</span>
              <span className="seo-key-data-lbl">Pic 2023<br />taux le plus haut depuis 2012</span>
            </div>
            <div className="seo-key-data-item">
              <span className="seo-key-data-val">3,5 – 4,0 %</span>
              <span className="seo-key-data-lbl">Fourchette 2026<br />selon profil et durée</span>
            </div>
            <div className="seo-key-data-item">
              <span className="seo-key-data-val">−0,8 pt</span>
              <span className="seo-key-data-lbl">Baisse depuis le pic<br />fenêtre favorable</span>
            </div>
          </div>
        </section>

        {/* ── Content ── */}
        <section className="seo-content">
          <div className="seo-content-inner">
            <h2>Évolution des taux depuis 2020</h2>
            <p>La décennie 2010-2020 avait été marquée par une baisse quasi continue des taux immobiliers. Le choc inflationniste post-Covid de 2022 a mis fin brutalement à cette ère.</p>
            <div style={{ overflowX: "auto", margin: "16px 0" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                <thead>
                  <tr style={{ background: "#eff6ff" }}>
                    {["Année", "Taux moyen 20 ans", "Contexte"].map((h, j) => (
                      <th key={h} style={{ padding: "10px 14px", textAlign: j === 1 ? "right" : "left", borderBottom: "2px solid #bfdbfe" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["2020", "1,2 %", "Covid, taux BCE à 0 %, inflation basse"],
                    ["2021", "1,1 %", "Plus bas historique, marché en surchauffe"],
                    ["2022", "2,4 %", "Début du resserrement monétaire BCE"],
                    ["2023", "4,2 %", "Pic des taux, chute du volume de transactions"],
                    ["2024", "3,8 %", "Premières baisses BCE, légère détente"],
                    ["2026", "3,5 – 3,9 %", "Stabilisation, fenêtre favorable"],
                  ].map((row, i) => (
                    <tr key={i} style={{ background: i === 5 ? "#eff6ff" : i % 2 === 0 ? "#fff" : "#f8fafc", fontWeight: i === 5 ? 700 : 400 }}>
                      {row.map((cell, j) => (
                        <td key={j} style={{ padding: "9px 14px", borderBottom: "1px solid #e2e8f0", textAlign: j === 1 ? "right" : "left", color: i === 3 && j === 1 ? "#dc2626" : i === 5 && j === 1 ? "#16a34a" : "#1e293b" }}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2>Les taux en 2026 selon la durée</h2>
            <div style={{ overflowX: "auto", margin: "16px 0" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                <thead>
                  <tr style={{ background: "#eff6ff" }}>
                    {["Durée", "Excellent profil", "Bon profil", "Profil standard"].map((h, j) => (
                      <th key={h} style={{ padding: "10px 14px", textAlign: j > 0 ? "right" : "left", borderBottom: "2px solid #bfdbfe" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["15 ans", "3,20 %", "3,40 %", "3,65 %"],
                    ["20 ans", "3,40 %", "3,65 %", "3,90 %"],
                    ["25 ans", "3,60 %", "3,85 %", "4,10 %"],
                  ].map((row, i) => (
                    <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#f8fafc" }}>
                      {row.map((cell, j) => (
                        <td key={j} style={{ padding: "9px 14px", borderBottom: "1px solid #e2e8f0", textAlign: j > 0 ? "right" : "left", fontWeight: j === 0 ? 600 : 400, color: j === 1 ? "#16a34a" : "#1e293b" }}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: 13, color: "#64748b" }}>Taux nominaux hors assurance. TAEG effectif : ajouter 0,2 à 0,4 % selon l'assurance emprunteur et les frais de dossier.</p>

            <h2>Prévisions pour la suite de 2026</h2>
            <p>
              Les économistes s'accordent sur une stabilisation progressive avec une légère tendance baissière si la BCE poursuit son cycle d'assouplissement. Les prévisions tablent sur une fourchette de <strong>3,3 à 3,7 %</strong> sur 20 ans d'ici fin 2026, en supposant une inflation européenne maîtrisée sous 2,5 %.
            </p>

            <div style={{ background: "#fefce8", border: "1px solid #fde047", borderRadius: 12, padding: "16px 20px", margin: "24px 0", display: "flex", gap: 12, alignItems: "flex-start" }}>
              <span style={{ fontSize: 20 }}>💡</span>
              <p style={{ margin: 0, fontSize: 15, color: "#713f12" }}>
                <strong>Fenêtre 2026 :</strong> La BCE a amorcé la baisse des taux directeurs depuis mi-2024. Une fenêtre favorable s'ouvre en 2026 avec des taux en baisse et des prix immobiliers qui se sont corrigés dans beaucoup de villes. C'est une combinaison favorable pour les primo-accédants qui ont attendu.
              </p>
            </div>

            <h2>Comment obtenir le meilleur taux en 2026 ?</h2>
            <ul>
              <li><strong>Maximiser l'apport personnel :</strong> Un apport d'au moins 20 % ouvre les meilleures grilles de taux.</li>
              <li><strong>Opter pour une durée courte :</strong> Emprunter sur 15 ans plutôt que 25 ans peut faire gagner jusqu'à 0,8 point de taux.</li>
              <li><strong>Constituer un dossier solide :</strong> CDI, épargne résiduelle visible après achat, absence d'incidents bancaires.</li>
              <li><strong>Passer par un courtier :</strong> Un bon courtier négocie des taux que vous ne pourriez pas obtenir seul. Sa rémunération est souvent supportée par la banque.</li>
              <li><strong>Déléguer l'assurance emprunteur :</strong> En passant par un assureur externe (délégation loi Lemoine), vous pouvez réduire le TAEG effectif de 0,2 à 0,5 point.</li>
            </ul>

            <h2>Taux fixe ou taux variable ?</h2>
            <p>
              En France, le taux fixe est largement dominant (plus de 95 % des prêts). Il offre la sécurité d'une mensualité identique pendant toute la durée, quelles que soient les évolutions des marchés. Dans le contexte de 2026, le taux fixe reste la recommandation dominante. Le taux variable ne présente un intérêt marginal que si vous prévoyez de revendre rapidement (dans les 5-7 ans) et si les taux variables affichent un avantage significatif (0,5 point ou plus).
            </p>
          </div>
        </section>

        {/* ── Simulator CTA ── */}
        <section className="seo-sim-cta">
          <div className="seo-sim-cta-inner">
            <span style={{ fontSize: 40 }}>📈</span>
            <h2 className="seo-sim-cta-title">Simulez votre prêt avec les taux 2026</h2>
            <p className="seo-sim-cta-sub">
              Entrez votre montant, durée et taux pour calculer votre mensualité, le coût total du crédit et visualiser votre tableau d'amortissement.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <Link to="/simulateur" className="seo-hero-cta">
                Simuler avec mon taux →
              </Link>
              <Link to="/simulateurs/pret-immobilier" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "white", color: "#2563eb", border: "2px solid #2563eb", fontWeight: 700, fontSize: 16, padding: "0 32px", height: 54, borderRadius: 12, textDecoration: "none", whiteSpace: "nowrap" }}>
                Calculateur de mensualité
              </Link>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="seo-faq">
          <div className="seo-faq-inner">
            <p className="seo-section-kicker">Questions fréquentes</p>
            <h2 className="seo-section-title">Taux immobiliers 2026 : vos questions</h2>
            <FAQAccordion items={FAQ_ITEMS} />
          </div>
        </section>

        {/* ── Related ── */}
        <section style={{ padding: "40px 24px", background: "#f8fafc", borderTop: "1px solid #e2e8f0" }}>
          <div style={{ maxWidth: 840, margin: "0 auto" }}>
            <p style={{ fontSize: 14, color: "#64748b", marginBottom: 12, fontWeight: 600 }}>Simulateurs associés :</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {[
                { to: "/simulateurs/stress-test", label: "Stress test financier" },
                { to: "/simulateurs/assurance-pret", label: "Assurance prêt" },
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
