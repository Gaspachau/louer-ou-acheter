import { useState } from "react";
import { Link } from "react-router-dom";
import { useSEO } from "../../utils/useSEO";
import TopBar from "../TopBar";
import Footer from "../Footer";

const FAQ_ITEMS = [
  {
    q: "Quel revenu pour emprunter 200 000 euros ?",
    a: "Pour emprunter 200 000 € à 3,8 % sur 20 ans, la mensualité avec assurance est d'environ 1 220 €. Avec la règle des 35 % du HCSF, il faut un revenu net mensuel d'au moins 3 490 €. Sur 25 ans, la mensualité descend à environ 1 040 €, nécessitant un revenu minimal de 2 970 €. Ces chiffres supposent aucune autre charge de crédit en cours.",
  },
  {
    q: "Comment la banque calcule-t-elle ma capacité d'emprunt ?",
    a: "La banque additionne tous vos revenus réguliers nets (salaires, revenus fonciers à 70 %, pensions) et en déduit toutes vos charges de crédit actuelles. Le solde disponible pour le futur prêt correspond à 35 % de vos revenus nets moins les charges existantes. Elle calcule ensuite le capital empruntable qui génère cette mensualité sur la durée choisie, et vérifie aussi le reste à vivre minimum après remboursement.",
  },
  {
    q: "Peut-on dépasser 35 % d'endettement ?",
    a: "Oui, mais de manière limitée. Le HCSF autorise les banques à déroger à la règle des 35 % pour 20 % de leur production trimestrielle. Ces dérogations sont prioritairement accordées aux primo-accédants et aux achats de résidence principale. Si votre reste à vivre est confortable et votre dossier solide (apport > 20 %, CDI), une banque peut accepter jusqu'à 37-38 % d'endettement.",
  },
  {
    q: "Quel apport minimum pour emprunter ?",
    a: "Il n'existe pas d'apport minimum légalement fixé, mais les banques exigent en pratique un apport d'au moins 10 % du prix d'achat pour couvrir les frais de notaire et de garantie. Sans apport (prêt à 110 %), les dossiers sont très rarement acceptés. Un apport de 10 à 15 % est le standard ; au-delà de 20 %, vous accédez aux meilleures conditions de taux.",
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

export default function PageCapaciteEmpruntSEO() {
  useSEO({
    title: "Capacité d'emprunt - Calcul gratuit 2026",
    description:
      "Calculez votre capacité d'emprunt immobilier selon vos revenus et charges. Règle HCSF 35% expliquée. Résultat en 30 secondes, gratuit.",
    path: "/capacite-emprunt-calcul-gratuit",
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
              <span>Capacité d'emprunt — Calcul gratuit 2026</span>
            </nav>
            <div className="seo-hero-badge">
              <span className="seo-hero-dot" />
              Règle HCSF 35 % · Mise à jour 2026
            </div>
            <h1 className="seo-hero-title">
              Calculez votre<br />capacité d'emprunt
            </h1>
            <p className="seo-hero-sub">
              Découvrez le montant maximum que vous pouvez emprunter selon vos revenus, vos charges et la règle HCSF des 35 %. Résultat en 30 secondes.
            </p>
            <Link to="/simulateurs/endettement" className="seo-hero-cta">
              Calculer ma capacité d'emprunt →
            </Link>
            <div className="seo-hero-trust">
              <span className="seo-hero-trust-item">Règle HCSF intégrée</span>
              <span className="seo-hero-trust-item">Charges existantes prises en compte</span>
              <span className="seo-hero-trust-item">Gratuit, sans inscription</span>
            </div>
          </div>
        </section>

        {/* ── Key data ── */}
        <section className="seo-key-data">
          <div className="seo-key-data-grid">
            <div className="seo-key-data-item">
              <span className="seo-key-data-val">35 %</span>
              <span className="seo-key-data-lbl">Taux d'endettement max<br />règle HCSF 2026</span>
            </div>
            <div className="seo-key-data-item">
              <span className="seo-key-data-val">27 ans</span>
              <span className="seo-key-data-lbl">Durée max HCSF<br />avec différé inclus</span>
            </div>
            <div className="seo-key-data-item">
              <span className="seo-key-data-val">~198 k€</span>
              <span className="seo-key-data-lbl">Capacité exemple<br />3 500 €/mois sur 20 ans</span>
            </div>
            <div className="seo-key-data-item">
              <span className="seo-key-data-val">~238 k€</span>
              <span className="seo-key-data-lbl">Capacité exemple<br />3 500 €/mois sur 25 ans</span>
            </div>
          </div>
        </section>

        {/* ── Content ── */}
        <section className="seo-content">
          <div className="seo-content-inner">
            <h2>La règle HCSF des 35 % : comment ça marche ?</h2>
            <p>
              La règle HCSF des 35 % signifie que l'ensemble de vos charges de remboursement de crédits (crédit immobilier + assurance + tout autre crédit en cours) ne doit pas dépasser 35 % de vos revenus nets mensuels :
            </p>
            <p><strong>Mensualité max = Revenus nets × 35 %</strong></p>
            <p>
              Pour un ménage avec 3 500 € de revenus nets, la mensualité maximale (assurance comprise) est de <strong>1 225 €/mois</strong>. Avec un taux de 3,8 % sur 20 ans, cela correspond à une capacité d'emprunt d'environ <strong>198 000 €</strong>. Sur 25 ans : environ <strong>238 000 €</strong>.
            </p>

            <h2>Exemples concrets selon les revenus</h2>
            <div style={{ overflowX: "auto", margin: "16px 0" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                <thead>
                  <tr style={{ background: "#eff6ff" }}>
                    {["Revenus nets", "Mensualité max (35 %)", "Capacité sur 20 ans", "Capacité sur 25 ans"].map((h, j) => (
                      <th key={h} style={{ padding: "10px 14px", textAlign: j === 0 ? "left" : "right", borderBottom: "2px solid #bfdbfe" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["2 500 €/mois", "875 €", "~142 k€", "~170 k€"],
                    ["3 000 €/mois", "1 050 €", "~170 k€", "~204 k€"],
                    ["3 500 €/mois", "1 225 €", "~198 k€", "~238 k€"],
                    ["4 000 €/mois", "1 400 €", "~227 k€", "~272 k€"],
                    ["5 000 €/mois", "1 750 €", "~284 k€", "~340 k€"],
                    ["7 000 €/mois", "2 450 €", "~397 k€", "~476 k€"],
                  ].map((row, i) => (
                    <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#f8fafc" }}>
                      {row.map((cell, j) => (
                        <td key={j} style={{ padding: "9px 14px", borderBottom: "1px solid #e2e8f0", textAlign: j > 0 ? "right" : "left", fontWeight: j === 0 ? 600 : 400, color: j >= 2 ? "#2563eb" : "#1e293b" }}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ background: "#fefce8", border: "1px solid #fde047", borderRadius: 12, padding: "16px 20px", margin: "24px 0", display: "flex", gap: 12, alignItems: "flex-start" }}>
              <span style={{ fontSize: 20 }}>💡</span>
              <p style={{ margin: 0, fontSize: 15, color: "#713f12" }}>
                <strong>Emprunt en couple :</strong> À deux, votre capacité d'emprunt peut être 1,8 à 2 fois celle de chacun individuellement. En mutualisant les revenus, vous atteignez des seuils de mensualité plus élevés tout en respectant les 35 % d'endettement global.
              </p>
            </div>

            <h2>Les charges qui réduisent votre capacité d'emprunt</h2>
            <p>La banque intègre dans son calcul toutes les charges de crédit existantes :</p>
            <ul>
              <li>Mensualités de crédits à la consommation en cours (auto, travaux, personnel)</li>
              <li>Mensualités de prêts étudiants non remboursés</li>
              <li>Loyers de crédit-bail ou LOA (auto, matériel professionnel)</li>
              <li>Pensions alimentaires versées (déduites des revenus)</li>
              <li>Mensualités d'un précédent prêt immobilier (investissement locatif)</li>
            </ul>
            <p>En revanche, les loyers payés, les charges courantes et les dépenses de loisirs ne sont pas intégrés dans le calcul. Seules les charges de remboursement de dettes sont comptabilisées.</p>

            <h2>Comment augmenter sa capacité d'emprunt ?</h2>
            <ul>
              <li><strong>Augmenter l'apport personnel :</strong> Un apport plus important réduit le capital à emprunter. Les banques accordent de meilleures conditions à partir de 10 %, et encore mieux au-delà de 20 %.</li>
              <li><strong>Allonger la durée du prêt :</strong> Passer de 20 à 25 ans réduit la mensualité de 15 à 20 %, augmentant d'autant la capacité d'emprunt.</li>
              <li><strong>Solder les crédits en cours :</strong> Rembourser par anticipation un crédit conso libère de la capacité. Un crédit à 300 €/mois restant peut amputer votre capacité de 40 000 à 60 000 €.</li>
              <li><strong>Ajouter un co-emprunteur :</strong> Emprunter à deux permet de cumuler les revenus — souvent la solution la plus efficace dans les zones chères.</li>
              <li><strong>Optimiser l'assurance emprunteur :</strong> Une assurance moins chère réduit la mensualité globale, libérant de la marge dans le calcul des 35 %.</li>
            </ul>
          </div>
        </section>

        {/* ── Simulator CTA ── */}
        <section className="seo-sim-cta">
          <div className="seo-sim-cta-inner">
            <span style={{ fontSize: 40 }}>💰</span>
            <h2 className="seo-sim-cta-title">Calculez votre capacité d'emprunt en 30 secondes</h2>
            <p className="seo-sim-cta-sub">
              Notre simulateur intègre la règle HCSF des 35 %, vos charges actuelles et les taux 2026 pour vous donner votre budget réel.
            </p>
            <Link to="/simulateurs/endettement" className="seo-hero-cta" style={{ alignSelf: "center" }}>
              Calculer ma capacité d'emprunt →
            </Link>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="seo-faq">
          <div className="seo-faq-inner">
            <p className="seo-section-kicker">Questions fréquentes</p>
            <h2 className="seo-section-title">Capacité d'emprunt : vos questions</h2>
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
                { to: "/simulateurs/simulateur-couple", label: "Simulation couple" },
                { to: "/simulateurs/stress-test", label: "Stress test financier" },
                { to: "/simulateurs/pret-immobilier", label: "Simulateur prêt immo" },
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
