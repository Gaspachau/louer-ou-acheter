import { useState } from "react";
import { Link } from "react-router-dom";
import { useSEO } from "../../utils/useSEO";
import TopBar from "../TopBar";
import Footer from "../Footer";

const FAQ_ITEMS = [
  {
    q: "Comment utiliser le simulateur louer ou acheter ?",
    a: "Entrez votre situation personnelle : la ville visée, le prix du bien, votre apport disponible, vos revenus nets et le loyer actuel ou équivalent. Le simulateur calcule en temps réel le coût total de chaque option sur 5, 10, 15, 20 et 25 ans. Il prend en compte la mensualité de crédit, les charges de copropriété, la taxe foncière, les frais de notaire, les intérêts perdus sur l'apport et l'érosion monétaire des loyers. Résultat obtenu en moins de 2 minutes, sans inscription.",
  },
  {
    q: "Quelles données faut-il entrer dans le simulateur ?",
    a: "Le simulateur demande 5 informations clés : (1) la ville ou le prix au m² de la zone visée, (2) la surface souhaitée en m², (3) votre apport personnel disponible, (4) vos revenus nets mensuels pour calculer le taux d'endettement, et (5) le loyer mensuel actuel ou le loyer du marché local. Des données avancées sont optionnelles : taux d'intérêt du crédit, durée d'emprunt, hypothèse de valorisation du marché, rendement de placement de l'apport.",
  },
  {
    q: "Comment interpréter le résultat du simulateur louer ou acheter ?",
    a: "Le simulateur affiche le point d'équilibre : le nombre d'années à partir duquel l'achat devient financièrement plus avantageux que la location. Si vous comptez rester moins longtemps, mieux vaut louer. Au-delà, acheter est généralement gagnant. Attention : ce chiffre est purement financier. D'autres facteurs entrent en jeu — stabilité professionnelle, projet familial, mobilité souhaitée, qualité de vie. Le simulateur est un outil d'aide à la décision, pas une vérité absolue.",
  },
  {
    q: "Le simulateur prend-il en compte les taux d'intérêt actuels ?",
    a: "Oui. Le simulateur utilise par défaut les taux du marché en vigueur (environ 3,5 % sur 20 ans en avril 2026), mais vous pouvez les modifier librement. Tester avec différents taux (3 %, 4 %, 4,5 %) vous permet de mesurer l'impact sur votre mensualité et le point d'équilibre. Une hausse de 1 point de taux allonge typiquement le point d'équilibre de 2 à 4 ans selon les marchés.",
  },
  {
    q: "Y a-t-il une version du simulateur par ville ?",
    a: "Oui. Notre simulateur intègre les données de prix au m² et de loyers pour plus de 200 villes françaises. Vous pouvez aussi saisir des données manuelles pour une commune non référencée. Des analyses approfondies par ville sont disponibles pour Paris, Lyon, Marseille, Bordeaux, Toulouse, Nantes, Lille, Nice, Rennes et Strasbourg.",
  },
];

export default function PageSimulateurSEO() {
  const [faqOpen, setFaqOpen] = useState(null);

  useSEO({
    title: "Simulateur louer ou acheter gratuit 2026 — calcul personnalisé",
    description: "Utilisez notre simulateur gratuit pour savoir s'il vaut mieux louer ou acheter selon votre situation, votre ville et votre budget. Résultat en 2 minutes.",
    path: "/simulateur-louer-ou-acheter",
    schema: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": FAQ_ITEMS.map(item => ({
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
              <span>Simulateur louer ou acheter</span>
            </nav>
            <div className="seo-hero-badge">
              <span className="seo-hero-dot" />
              Gratuit · Sans inscription · Données 2026
            </div>
            <h1 className="seo-hero-title">
              Simulateur louer ou acheter<br />gratuit 2026 — calcul personnalisé
            </h1>
            <p className="seo-hero-sub">
              Notre simulateur compare le coût total de la location et de l'achat sur 5 à 30 ans, selon votre ville, votre budget et votre apport. Il calcule le point d'équilibre précis à partir duquel l'achat devient rentable.
            </p>
            <Link to="/simulateur" className="seo-hero-cta">
              Lancer le simulateur →
            </Link>
            <div className="seo-hero-trust">
              <span className="seo-hero-trust-item">Résultat en 2 minutes</span>
              <span className="seo-hero-trust-item">200+ villes couvertes</span>
              <span className="seo-hero-trust-item">Calcul tout compris</span>
            </div>
          </div>
        </section>

        {/* ── Metrics ── */}
        <section className="seo-key-data">
          <div className="seo-key-data-grid">
            <div className="seo-key-data-item">
              <span className="seo-key-data-val">200+</span>
              <span className="seo-key-data-lbl">Villes françaises<br />données intégrées</span>
            </div>
            <div className="seo-key-data-item">
              <span className="seo-key-data-val">2 min</span>
              <span className="seo-key-data-lbl">Pour obtenir<br />votre résultat</span>
            </div>
            <div className="seo-key-data-item">
              <span className="seo-key-data-val">12 ans</span>
              <span className="seo-key-data-lbl">Point d'équilibre<br />moyen en France</span>
            </div>
            <div className="seo-key-data-item">
              <span className="seo-key-data-val">0 €</span>
              <span className="seo-key-data-lbl">Coût du simulateur<br />gratuit et sans inscription</span>
            </div>
          </div>
        </section>

        {/* ── Content ── */}
        <section className="seo-content">
          <div className="seo-content-inner">

            <h2>Pourquoi utiliser un simulateur louer ou acheter ?</h2>
            <p>
              La décision d'acheter ou de louer est l'une des plus importantes de votre vie financière. Une mauvaise décision prise trop tôt ou trop tard peut coûter plusieurs dizaines de milliers d'euros. Contrairement aux idées reçues, <strong>acheter n'est pas toujours plus avantageux que louer</strong> — cela dépend de la durée d'occupation, du marché local, de votre apport et des taux d'intérêt.
            </p>
            <p>
              Notre simulateur intègre tous les paramètres financiers réels : mensualité de crédit, taxe foncière, charges de copropriété, frais d'entretien, intérêts perdus sur l'apport, frais de notaire amortis, et potentielle valorisation (ou dépréciation) du bien. Du côté location, il intègre l'indexation annuelle des loyers et le rendement potentiel de l'épargne non mobilisée dans un apport.
            </p>

            <h2>Comment fonctionne notre simulateur louer ou acheter ?</h2>
            <p>Le simulateur effectue un <strong>calcul de valeur actuelle nette (VAN)</strong> comparant deux trajectoires financières :</p>
            <ul style={{ lineHeight: 2 }}>
              <li><strong>Trajectoire achat :</strong> apport immobilisé + mensualités de crédit + charges (taxe foncière, copropriété, entretien) − capital remboursé − valorisation patrimoniale</li>
              <li><strong>Trajectoire location :</strong> loyers cumulés + placement de l'apport économisé à un taux de rendement moyen − économies de charges</li>
            </ul>
            <p>
              Le <strong>point d'équilibre</strong> est l'année à partir de laquelle la trajectoire "achat" devient moins coûteuse que la trajectoire "location". C'est votre horizon de rentabilité.
            </p>

            <h2>Les 5 informations clés à entrer dans le simulateur</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16, margin: "20px 0" }}>
              {[
                { num: "1", titre: "La ville ou le prix au m²", desc: "Sélectionnez parmi 200+ villes ou entrez un prix manuel. Le simulateur intègre les données notariales pour les grandes agglomérations." },
                { num: "2", titre: "Votre apport personnel", desc: "Le montant que vous pouvez immobiliser dans l'achat. Il réduit le crédit mais représente un coût d'opportunité (capital non placé)." },
                { num: "3", titre: "Vos revenus nets mensuels", desc: "Permet de calculer votre taux d'endettement et d'alerter si le projet dépasse 35 % de vos revenus (règle HCSF 2026)." },
                { num: "4", titre: "La surface souhaitée", desc: "En m². Le simulateur calcule automatiquement le prix d'achat et le loyer de marché selon la ville sélectionnée." },
                { num: "5", titre: "Durée d'occupation envisagée", desc: "Combien d'années comptez-vous rester dans ce bien ? C'est le paramètre le plus déterminant du calcul." },
              ].map(c => (
                <div key={c.num} style={{ background: "#fff", border: "1.5px solid #e2e8f0", borderRadius: 14, padding: "18px 20px" }}>
                  <div style={{ width: 32, height: 32, background: "#eff6ff", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 16, color: "#1a56db", marginBottom: 10 }}>{c.num}</div>
                  <strong style={{ fontSize: 14, color: "#0c1a35", display: "block", marginBottom: 6 }}>{c.titre}</strong>
                  <p style={{ fontSize: 13, color: "#64748b", margin: 0, lineHeight: 1.6 }}>{c.desc}</p>
                </div>
              ))}
            </div>

            <h2>Comment interpréter les résultats du simulateur ?</h2>
            <p>
              Le simulateur affiche un graphique comparant l'enrichissement net (ou l'appauvrissement) des deux trajectoires année par année. Plusieurs indicateurs clés sont mis en avant :
            </p>
            <ul style={{ lineHeight: 2 }}>
              <li><strong>Point d'équilibre :</strong> l'année à partir de laquelle acheter coûte moins que louer</li>
              <li><strong>Mensualité et taux d'endettement :</strong> pour vérifier la faisabilité bancaire (max 35 % des revenus)</li>
              <li><strong>Apport nécessaire :</strong> incluant les frais de notaire (7-8 % dans l'ancien, 2-3 % dans le neuf)</li>
              <li><strong>Verdict personnalisé :</strong> en fonction de votre horizon, le simulateur recommande louer ou acheter</li>
            </ul>
            <p>
              <strong>Exemple concret :</strong> Un couple à Lyon avec 50 000 € d'apport, 6 000 €/mois de revenus nets, qui envisage un T3 à 350 000 €. Loyer équivalent : 1 100 €/mois. Point d'équilibre calculé : <strong>11 ans</strong>. Si le projet est d'y rester 15 ans ou plus, l'achat est recommandé. En dessous de 11 ans, la location reste gagnante financièrement.
            </p>

            <h2>Louer ou acheter en 2026 : le contexte du marché</h2>
            <p>
              En 2026, les taux immobiliers se stabilisent autour de <strong>3,4 % à 3,8 % sur 20 ans</strong>, après le pic de 2023 à 4,5 %. Cette normalisation améliore la capacité d'emprunt des ménages, mais les prix dans les grandes métropoles restent élevés. Le point d'équilibre moyen en France est estimé à 12-14 ans. À Paris, il dépasse 25 ans en raison du ratio prix/loyer défavorable. Dans des villes comme Lille, Rennes ou Bordeaux, il peut descendre sous les 10 ans pour les profils bien dotés.
            </p>

            <h2>Les marchés les plus favorables à l'achat en 2026</h2>
            <div style={{ overflowX: "auto", margin: "16px 0" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr style={{ background: "#eff6ff" }}>
                    {["Ville", "Prix moyen m²", "Loyer T2/mois", "Point d'équilibre", "Verdict 2026"].map((h, j) => (
                      <th key={h} style={{ padding: "10px 12px", textAlign: j > 0 ? "center" : "left", borderBottom: "2px solid #bfdbfe", fontWeight: 700 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { ville: "Lille", prix: "3 200 €", loyer: "700 €", eq: "8 ans", verdict: "🟢 Acheter", verdictColor: "#059669" },
                    { ville: "Rennes", prix: "3 800 €", loyer: "820 €", eq: "9 ans", verdict: "🟢 Acheter", verdictColor: "#059669" },
                    { ville: "Toulouse", prix: "3 600 €", loyer: "790 €", eq: "9 ans", verdict: "🟢 Acheter", verdictColor: "#059669" },
                    { ville: "Bordeaux", prix: "4 200 €", loyer: "900 €", eq: "11 ans", verdict: "🟡 Selon durée", verdictColor: "#d97706" },
                    { ville: "Lyon", prix: "5 100 €", loyer: "1 000 €", eq: "13 ans", verdict: "🟡 Selon durée", verdictColor: "#d97706" },
                    { ville: "Paris", prix: "9 500 €", loyer: "1 450 €", eq: "28 ans", verdict: "🔴 Louer", verdictColor: "#dc2626" },
                  ].map((row, i) => (
                    <tr key={row.ville} style={{ background: i % 2 === 0 ? "#fff" : "#f8fafc" }}>
                      <td style={{ padding: "9px 12px", borderBottom: "1px solid #e2e8f0", fontWeight: 700, fontSize: 13 }}>
                        <Link to={`/louer-ou-acheter-${row.ville.toLowerCase()}`} style={{ color: "#2563eb", textDecoration: "none" }}>{row.ville}</Link>
                      </td>
                      <td style={{ padding: "9px 12px", borderBottom: "1px solid #e2e8f0", textAlign: "center", fontSize: 13 }}>{row.prix}</td>
                      <td style={{ padding: "9px 12px", borderBottom: "1px solid #e2e8f0", textAlign: "center", fontSize: 13 }}>{row.loyer}</td>
                      <td style={{ padding: "9px 12px", borderBottom: "1px solid #e2e8f0", textAlign: "center", fontWeight: 700, fontSize: 13 }}>{row.eq}</td>
                      <td style={{ padding: "9px 12px", borderBottom: "1px solid #e2e8f0", textAlign: "center", fontWeight: 700, color: row.verdictColor, fontSize: 13 }}>{row.verdict}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: 12, color: "#64748b" }}>Données indicatives basées sur les prix notariaux et loyers de marché du T1 2026. Utilisez le simulateur pour un calcul personnalisé.</p>

            <h2>Erreurs courantes à éviter dans la décision louer/acheter</h2>
            <ul style={{ lineHeight: 2 }}>
              <li><strong>Ne comparer que la mensualité au loyer</strong> : l'achat comporte des charges cachées (taxe foncière, copropriété, entretien, assurance PNO) qui peuvent ajouter 300 à 600 €/mois</li>
              <li><strong>Ignorer le coût d'opportunité de l'apport</strong> : 80 000 € d'apport investis à 4 % net génèrent 3 200 €/an — soit 267 €/mois à ajouter au coût réel de l'achat</li>
              <li><strong>Sous-estimer les frais de notaire</strong> : 7 à 8 % dans l'ancien (soit 28 000 € pour un bien à 380 000 €), amortis sur toute la durée d'occupation</li>
              <li><strong>Oublier la durée de détention</strong> : acheter pour revendre dans 3 ans est rarement rentable, surtout avec des frais de notaire élevés</li>
              <li><strong>Croire que les prix montent toujours</strong> : Paris a perdu 12 % entre 2022 et 2025. La valorisation n'est pas garantie</li>
            </ul>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="seo-sim-cta">
          <div className="seo-sim-cta-inner">
            <span style={{ fontSize: 40 }}>🧮</span>
            <h2 className="seo-sim-cta-title">Simulateur louer ou acheter — essayez maintenant</h2>
            <p className="seo-sim-cta-sub">
              Entrez votre ville, votre budget et votre apport : notre simulateur calcule votre point d'équilibre personnalisé en moins de 2 minutes. Gratuit, sans inscription.
            </p>
            <Link to="/simulateur" className="seo-hero-cta" style={{ alignSelf: "center" }}>
              Lancer le simulateur →
            </Link>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="seo-faq">
          <div className="seo-faq-inner">
            <p className="seo-section-kicker">Questions fréquentes</p>
            <h2 className="seo-section-title">Tout savoir sur notre simulateur</h2>
            <div className="seo-faq-list">
              {FAQ_ITEMS.map((item, i) => (
                <div key={i} className="seo-faq-item">
                  <button className="seo-faq-btn" onClick={() => setFaqOpen(faqOpen === i ? null : i)} aria-expanded={faqOpen === i}>
                    <span className="seo-faq-question">{item.q}</span>
                    <span className={`seo-faq-chevron${faqOpen === i ? " open" : ""}`}>▾</span>
                  </button>
                  {faqOpen === i && <div className="seo-faq-answer"><p>{item.a}</p></div>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Villes ── */}
        <section style={{ padding: "40px 24px", background: "#f8fafc", borderTop: "1px solid #e2e8f0" }}>
          <div style={{ maxWidth: 840, margin: "0 auto" }}>
            <p style={{ fontSize: 14, color: "#64748b", marginBottom: 12, fontWeight: 600 }}>Analyses par ville :</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {["paris","lyon","marseille","bordeaux","toulouse","nantes","lille","nice","rennes","strasbourg"].map(v => (
                <Link key={v} to={`/louer-ou-acheter-${v}`} style={{ fontSize: 14, color: "#2563eb", background: "#eff6ff", padding: "7px 16px", borderRadius: 20, textDecoration: "none", fontWeight: 500, border: "1px solid #bfdbfe", textTransform: "capitalize" }}>
                  {v.charAt(0).toUpperCase() + v.slice(1)}
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
