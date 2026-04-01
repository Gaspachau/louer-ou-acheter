import { useState } from "react";
import { Link } from "react-router-dom";
import { useSEO } from "../../utils/useSEO";
import TopBar from "../TopBar";
import Footer from "../Footer";

const FAQ_ITEMS = [
  {
    q: "Combien sont les frais de notaire pour 200 000 euros ?",
    a: "Pour un bien ancien à 200 000 €, les frais de notaire s'élèvent à environ 14 400 à 16 000 €, soit 7,2 à 8 % du prix. Ce montant se décompose en droits de mutation (~11 600 €), émoluments du notaire (~2 400 €) et frais divers (~800 €). Pour un bien neuf au même prix, comptez environ 4 000 à 5 000 € (2 à 2,5 %), car les droits de mutation sont quasi-nuls.",
  },
  {
    q: "Les frais de notaire sont-ils négociables ?",
    a: "Les droits de mutation (la majeure partie des frais) sont fixés par la loi et ne sont pas négociables. En revanche, la rémunération du notaire peut faire l'objet d'une remise de 10 % maximum sur la partie excédant 150 000 €, depuis le décret du 26 février 2016. Dans la pratique, cette remise est rarement accordée spontanément — il faut la demander explicitement. Le vrai levier de réduction reste le choix du type de bien (neuf vs ancien) et la déduction des meubles.",
  },
  {
    q: "Quand paye-t-on les frais de notaire ?",
    a: "Les frais de notaire sont réglés le jour de la signature de l'acte authentique de vente chez le notaire. Le notaire demande un appel de fonds quelques jours avant. Il n'est pas possible de les payer à crédit dans le cadre d'un prêt immobilier standard — ils font partie intégrante de l'apport personnel nécessaire.",
  },
  {
    q: "Y a-t-il des frais de notaire réduits pour les primo-accédants ?",
    a: "Il n'existe pas de taux spécifique aux primo-accédants dans l'ancien. En revanche, acheter dans le neuf ou en VEFA réduit drastiquement les frais à 2-3 %, souvent accessible via le PTZ. De plus, certaines communes et départements offrent des exonérations ou allègements de taxe foncière pendant 2 à 5 ans pour les nouveaux acquéreurs dans le neuf.",
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

export default function PageFraisNotaireSEO() {
  useSEO({
    title: "Calculateur frais de notaire 2026 - Gratuit",
    description:
      "Calculez vos frais de notaire au centime près pour 2026. Ancien ou neuf, primo-accédant ou non : résultat immédiat sans inscription.",
    path: "/calculateur-frais-de-notaire-2026",
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
              <span>Calculateur frais de notaire 2026</span>
            </nav>
            <div className="seo-hero-badge">
              <span className="seo-hero-dot" />
              Barème 2026 · Ancien &amp; neuf
            </div>
            <h1 className="seo-hero-title">
              Calculateur frais<br />de notaire 2026
            </h1>
            <p className="seo-hero-sub">
              Calculez vos frais de notaire au centime près pour un bien ancien ou neuf. Barème officiel 2026 intégré, résultat immédiat, sans inscription.
            </p>
            <Link to="/simulateurs/frais-notaire" className="seo-hero-cta">
              Calculer mes frais de notaire →
            </Link>
            <div className="seo-hero-trust">
              <span className="seo-hero-trust-item">Barème officiel 2026</span>
              <span className="seo-hero-trust-item">Ancien et neuf</span>
              <span className="seo-hero-trust-item">Résultat en 10 secondes</span>
            </div>
          </div>
        </section>

        {/* ── Key data ── */}
        <section className="seo-key-data">
          <div className="seo-key-data-grid">
            <div className="seo-key-data-item">
              <span className="seo-key-data-val">7 – 8 %</span>
              <span className="seo-key-data-lbl">Bien ancien<br />du prix de vente</span>
            </div>
            <div className="seo-key-data-item">
              <span className="seo-key-data-val">2 – 3 %</span>
              <span className="seo-key-data-lbl">Bien neuf / VEFA<br />du prix de vente</span>
            </div>
            <div className="seo-key-data-item">
              <span className="seo-key-data-val">jusqu'à 25 k€</span>
              <span className="seo-key-data-lbl">Économie possible<br />neuf vs ancien pour 300 k€</span>
            </div>
            <div className="seo-key-data-item">
              <span className="seo-key-data-val">4,5 %</span>
              <span className="seo-key-data-lbl">Taxe départementale<br />dans 97 dép. sur 101</span>
            </div>
          </div>
        </section>

        {/* ── Content ── */}
        <section className="seo-content">
          <div className="seo-content-inner">
            <h2>Composition des frais de notaire</h2>
            <p>Les frais de notaire se décomposent en trois grandes catégories :</p>
            <ul>
              <li><strong>Droits de mutation (taxes) :</strong> La part la plus importante, environ <strong>5,8 %</strong> pour un bien ancien. Taxe départementale (4,5 % dans 97 départements) + taxe communale additionnelle (1,2 %) + contribution à la sécurité immobilière (0,1 %). Ces taxes sont reversées à l'État et aux collectivités.</li>
              <li><strong>Émoluments du notaire :</strong> La rémunération proprement dite, calculée selon un barème national dégressif (environ 1 à 2 % selon la tranche). Pour un bien à 250 000 €, les émoluments s'élèvent à environ 2 800 €.</li>
              <li><strong>Frais et débours divers :</strong> Publication au service de publicité foncière, demandes d'état civil, honoraires tiers... Généralement 0,5 à 1 % supplémentaires.</li>
            </ul>

            <p>Comparatif pour un achat à <strong>250 000 €</strong> :</p>
            <div style={{ overflowX: "auto", margin: "16px 0" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                <thead>
                  <tr style={{ background: "#eff6ff" }}>
                    {["Poste", "Bien ancien", "Bien neuf / VEFA"].map((h, j) => (
                      <th key={h} style={{ padding: "10px 14px", textAlign: j === 0 ? "left" : "right", borderBottom: "2px solid #bfdbfe" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Droits de mutation", "14 500 €", "~500 €"],
                    ["Émoluments notaire", "2 800 €", "2 800 €"],
                    ["Frais et débours", "1 200 €", "1 200 €"],
                    ["Total estimé", "18 500 € (7,4 %)", "4 500 € (1,8 %)"],
                  ].map((row, i) => (
                    <tr key={i} style={{ background: i === 3 ? "#eff6ff" : i % 2 === 0 ? "#fff" : "#f8fafc", fontWeight: i === 3 ? 700 : 400 }}>
                      {row.map((cell, j) => (
                        <td key={j} style={{ padding: "9px 14px", borderBottom: "1px solid #e2e8f0", textAlign: j > 0 ? "right" : "left", color: i === 3 && j > 0 ? "#2563eb" : "#1e293b" }}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2>Frais de notaire 2026 : le barème exact</h2>
            <p>Le barème des émoluments notariaux, fixé par décret, s'applique de manière dégressive :</p>
            <ul>
              <li>De 0 à 6 500 € : 3,87 %</li>
              <li>De 6 500 à 17 000 € : 1,596 %</li>
              <li>De 17 000 à 60 000 € : 1,064 %</li>
              <li>Au-delà de 60 000 € : 0,799 %</li>
            </ul>
            <p>À cela s'ajoute la TVA à 20 % sur les émoluments. Quatre départements (Isère, Morbihan, Mayenne et Indre) ont conservé un taux réduit à 3,8 %, ce qui se traduit par des frais totaux légèrement inférieurs.</p>

            <h2>Peut-on réduire ses frais de notaire ?</h2>
            <ul>
              <li><strong>Acheter dans le neuf ou en VEFA :</strong> Les droits de mutation sont quasi-inexistants, ce qui ramène les frais totaux à 2-3 % au lieu de 7-8 %.</li>
              <li><strong>Déduire la valeur des meubles :</strong> Cuisine équipée, climatiseurs, équipements amovibles valorisés séparément dans un contrat de vente mobilière. Sur 20 000 € de meubles bien valorisés, l'économie peut atteindre 1 000 à 1 500 €.</li>
              <li><strong>Bénéficier du PTZ :</strong> L'achat en zone éligible peut ouvrir droit à des avantages fiscaux connexes.</li>
            </ul>

            <div style={{ background: "#fefce8", border: "1px solid #fde047", borderRadius: 12, padding: "16px 20px", margin: "24px 0", display: "flex", gap: 12, alignItems: "flex-start" }}>
              <span style={{ fontSize: 20 }}>💡</span>
              <p style={{ margin: 0, fontSize: 15, color: "#713f12" }}>
                <strong>À retenir :</strong> En achetant du neuf ou sous PTZ, les frais de notaire tombent à 2-3 % au lieu de 7-8 %. Sur un achat à 300 000 €, c'est une économie potentielle de <strong>15 000 à 18 000 €</strong> à prendre en compte dans votre plan de financement.
              </p>
            </div>

            <h2>Frais de notaire et primo-accédant</h2>
            <p>Les primo-accédants bénéficient du PTZ 2026, étendu aux logements anciens en zones B2 et C, qui permet de financer jusqu'à 40 % du prix sans intérêts. Un point souvent négligé : les frais de notaire ne sont pas finançables par le prêt immobilier classique — ils doivent être couverts par l'apport personnel. Pour un bien à 250 000 €, prévoir au minimum 18 000 à 20 000 € d'apport rien que pour les frais de notaire.</p>
          </div>
        </section>

        {/* ── Simulator CTA ── */}
        <section className="seo-sim-cta">
          <div className="seo-sim-cta-inner">
            <span style={{ fontSize: 40 }}>🧾</span>
            <h2 className="seo-sim-cta-title">Calculez vos frais de notaire au centime près</h2>
            <p className="seo-sim-cta-sub">
              Notre calculateur distingue ancien / neuf, intègre le barème 2026 exact et vous donne un résultat immédiat. Gratuit, sans inscription.
            </p>
            <Link to="/simulateurs/frais-notaire" className="seo-hero-cta" style={{ alignSelf: "center" }}>
              Calculer mes frais de notaire →
            </Link>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="seo-faq">
          <div className="seo-faq-inner">
            <p className="seo-section-kicker">Questions fréquentes</p>
            <h2 className="seo-section-title">Frais de notaire : vos questions</h2>
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
                { to: "/simulateurs/ptz", label: "Simulateur PTZ 2026" },
                { to: "/simulateur", label: "Louer ou acheter ?" },
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
