import { useState, useCallback } from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import TopBar from "./TopBar";
import Footer from "./Footer";
import { HOMEOWNERSHIP, ownershipColor, FRANCE_RATE, COLOR_LEGEND } from "../data/homeownership";

const GEO_URL = "/world-110m.json";

/* ─── Top 10 lists ────────────────────────────────────────── */
const sorted = Object.entries(HOMEOWNERSHIP)
  .map(([, d]) => d)
  .sort((a, b) => b.rate - a.rate);

const TOP_OWNERS = sorted.slice(0, 10);
const TOP_RENTERS = sorted.slice(-10).reverse();

/* ─── Tooltip ─────────────────────────────────────────────── */
function Tooltip({ data, x, y, visible }) {
  if (!visible || !data) return null;
  const diff = data.rate - FRANCE_RATE;
  const diffStr = diff > 0 ? `+${diff} pts` : `${diff} pts`;
  const diffColor = diff > 0 ? "#1a56db" : "#0d9488";

  return (
    <div
      className="cm-tooltip"
      style={{
        left: Math.min(x + 12, window.innerWidth - 240),
        top: Math.max(y - 80, 8),
      }}
    >
      <p className="cm-tooltip-country">{data.name}</p>
      <div className="cm-tooltip-row">
        <span className="cm-tooltip-dot" style={{ background: ownershipColor(data.rate) }} />
        <span>Propriétaires</span>
        <strong>{data.rate} %</strong>
      </div>
      <div className="cm-tooltip-row">
        <span className="cm-tooltip-dot" style={{ background: "#e2e8f2" }} />
        <span>Locataires</span>
        <strong>{100 - data.rate} %</strong>
      </div>
      <div className="cm-tooltip-vs">
        vs France ({FRANCE_RATE} %) :{" "}
        <strong style={{ color: diffColor }}>{diffStr}</strong>
      </div>
    </div>
  );
}

/* ─── Country info panel (mobile/click) ──────────────────── */
function CountryPanel({ data, onClose }) {
  if (!data) return null;
  const diff = data.rate - FRANCE_RATE;
  return (
    <div className="cm-panel">
      <button className="cm-panel-close" onClick={onClose} type="button" aria-label="Fermer">✕</button>
      <p className="cm-panel-name">{data.name}</p>
      <div className="cm-panel-stat">
        <span className="cm-panel-stat-label">Propriétaires</span>
        <span className="cm-panel-stat-value" style={{ color: ownershipColor(data.rate) }}>
          {data.rate} %
        </span>
      </div>
      <div className="cm-panel-stat">
        <span className="cm-panel-stat-label">Locataires</span>
        <span className="cm-panel-stat-value">{100 - data.rate} %</span>
      </div>
      <div className="cm-panel-bar-wrap">
        <div className="cm-panel-bar">
          <div
            className="cm-panel-bar-fill"
            style={{ width: `${data.rate}%`, background: ownershipColor(data.rate) }}
          />
        </div>
        <div className="cm-panel-bar-labels">
          <span>0 %</span><span>50 %</span><span>100 %</span>
        </div>
      </div>
      <p className="cm-panel-vs">
        {diff > 0
          ? `${data.name} compte ${diff} points de plus de propriétaires que la France (${FRANCE_RATE} %).`
          : diff < 0
          ? `${data.name} compte ${Math.abs(diff)} points de moins de propriétaires que la France (${FRANCE_RATE} %).`
          : `Même taux de propriétaires que la France (${FRANCE_RATE} %).`
        }
      </p>
    </div>
  );
}

/* ─── Bar row for top lists ───────────────────────────────── */
function RankRow({ rank, name, rate, isFrance }) {
  return (
    <div className={`cm-rank-row${isFrance ? " cm-rank-france" : ""}`}>
      <span className="cm-rank-num">{rank}</span>
      <span className="cm-rank-name">{name}{isFrance ? " 🇫🇷" : ""}</span>
      <div className="cm-rank-bar-wrap">
        <div className="cm-rank-bar">
          <div
            className="cm-rank-bar-fill"
            style={{ width: `${rate}%`, background: ownershipColor(rate) }}
          />
        </div>
      </div>
      <span className="cm-rank-rate">{rate} %</span>
    </div>
  );
}

/* ─── Main page ───────────────────────────────────────────── */
export default function PageCarteMondiale() {
  const [tooltip, setTooltip] = useState({ visible: false, data: null, x: 0, y: 0 });
  const [selected, setSelected] = useState(null);
  const [zoom, setZoom] = useState(1);

  const handleMouseMove = useCallback((geo, e) => {
    const id = parseInt(geo.id, 10);
    const data = HOMEOWNERSHIP[id];
    setTooltip({ visible: true, data: data || null, x: e.clientX, y: e.clientY });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTooltip((t) => ({ ...t, visible: false }));
  }, []);

  const handleClick = useCallback((geo) => {
    const id = parseInt(geo.id, 10);
    const data = HOMEOWNERSHIP[id];
    if (data) setSelected(data);
  }, []);

  return (
    <div className="page">
      <TopBar />
      <main id="main-content" className="cm-page">

        {/* ── HERO ───────────────────────────────────────────── */}
        <div className="cm-hero">
          <div className="cm-hero-text">
            <span className="blog-kicker">Comparaison mondiale</span>
            <h1 className="cm-hero-title">
              Propriétaires vs locataires<br/>
              <span className="cm-hero-title-sub">dans le monde</span>
            </h1>
            <p className="cm-hero-desc">
              De la Roumanie (95 % de propriétaires) à la Suisse (36 %), les écarts sont
              immenses. Survolez ou cliquez sur un pays pour voir ses données.
            </p>
          </div>
          <div className="cm-hero-stats">
            <div className="cm-hero-stat">
              <span className="cm-hero-stat-val">95 %</span>
              <span className="cm-hero-stat-label">Roumanie<br/>record mondial</span>
            </div>
            <div className="cm-hero-stat cm-hero-stat-mid">
              <span className="cm-hero-stat-val">65 %</span>
              <span className="cm-hero-stat-label">France<br/>moyenne UE</span>
            </div>
            <div className="cm-hero-stat cm-hero-stat-low">
              <span className="cm-hero-stat-val">36 %</span>
              <span className="cm-hero-stat-label">Suisse<br/>moins de l'UE</span>
            </div>
          </div>
        </div>

        {/* ── MAP ────────────────────────────────────────────── */}
        <div className="cm-map-section">
          {/* Legend */}
          <div className="cm-legend">
            <span className="cm-legend-label">Taux de propriétaires :</span>
            <div className="cm-legend-items">
              {COLOR_LEGEND.map((c) => (
                <div key={c.color} className="cm-legend-item">
                  <span className="cm-legend-dot" style={{ background: c.color }} />
                  <span>{c.label}</span>
                </div>
              ))}
              <div className="cm-legend-item">
                <span className="cm-legend-dot" style={{ background: "#e2e8f2", border: "1px solid #cbd5e1" }} />
                <span>Données indisponibles</span>
              </div>
            </div>
          </div>

          {/* Zoom controls */}
          <div className="cm-zoom-controls">
            <button className="cm-zoom-btn" onClick={() => setZoom((z) => Math.min(z * 1.5, 8))} type="button" aria-label="Zoom avant">+</button>
            <button className="cm-zoom-btn" onClick={() => setZoom((z) => Math.max(z / 1.5, 1))} type="button" aria-label="Zoom arrière">−</button>
            <button className="cm-zoom-btn" onClick={() => setZoom(1)} type="button" aria-label="Réinitialiser le zoom">↺</button>
          </div>

          <div className="cm-map-wrap" role="img" aria-label="Carte mondiale des taux de propriétaires">
            <ComposableMap
              projectionConfig={{ scale: 147, center: [0, 10] }}
              style={{ width: "100%", height: "auto" }}
            >
              <ZoomableGroup zoom={zoom} minZoom={1} maxZoom={8}>
                <Geographies geography={GEO_URL}>
                  {({ geographies }) =>
                    geographies.map((geo) => {
                      const id = parseInt(geo.id, 10);
                      const country = HOMEOWNERSHIP[id];
                      const color = ownershipColor(country?.rate);
                      const isSelected = selected && selected.name === country?.name;
                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          fill={color}
                          stroke="#fff"
                          strokeWidth={0.4}
                          style={{
                            default: {
                              fill: isSelected ? "#f59e0b" : color,
                              outline: "none",
                              cursor: country ? "pointer" : "default",
                            },
                            hover: {
                              fill: country ? "#f59e0b" : color,
                              outline: "none",
                              cursor: country ? "pointer" : "default",
                            },
                            pressed: { outline: "none" },
                          }}
                          onMouseMove={country ? (e) => handleMouseMove(geo, e) : undefined}
                          onMouseLeave={handleMouseLeave}
                          onClick={() => handleClick(geo)}
                        />
                      );
                    })
                  }
                </Geographies>
              </ZoomableGroup>
            </ComposableMap>
          </div>

          {/* Tooltip (desktop) */}
          <Tooltip {...tooltip} />

          {/* Country panel (click / mobile) */}
          {selected && (
            <CountryPanel data={selected} onClose={() => setSelected(null)} />
          )}
        </div>

        {/* ── TOP 10 LISTS ───────────────────────────────────── */}
        <div className="cm-rankings">
          <div className="cm-ranking-col">
            <div className="cm-ranking-header cm-ranking-owners">
              <span className="cm-ranking-icon">🏠</span>
              <div>
                <p className="cm-ranking-kicker">Classement</p>
                <h2 className="cm-ranking-title">Top 10 — Plus de propriétaires</h2>
              </div>
            </div>
            <div className="cm-ranking-list">
              {TOP_OWNERS.map((c, i) => (
                <RankRow
                  key={c.name}
                  rank={i + 1}
                  name={c.name}
                  rate={c.rate}
                  isFrance={c.name === "France"}
                />
              ))}
              {/* France if not in top 10 */}
              {!TOP_OWNERS.find((c) => c.name === "France") && (
                <>
                  <div className="cm-rank-ellipsis">…</div>
                  <RankRow
                    rank={sorted.findIndex((c) => c.name === "France") + 1}
                    name="France"
                    rate={FRANCE_RATE}
                    isFrance
                  />
                </>
              )}
            </div>
          </div>

          <div className="cm-ranking-col">
            <div className="cm-ranking-header cm-ranking-renters">
              <span className="cm-ranking-icon">🔑</span>
              <div>
                <p className="cm-ranking-kicker">Classement</p>
                <h2 className="cm-ranking-title">Top 10 — Plus de locataires</h2>
              </div>
            </div>
            <div className="cm-ranking-list">
              {TOP_RENTERS.map((c, i) => (
                <RankRow
                  key={c.name}
                  rank={i + 1}
                  name={c.name}
                  rate={c.rate}
                  isFrance={c.name === "France"}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ── WHY section ────────────────────────────────────── */}
        <section className="cm-why-section">
          <div className="cm-why-header">
            <span className="blog-kicker">Analyse</span>
            <h2 className="cm-why-title">Pourquoi ces écarts si importants ?</h2>
            <p className="cm-why-intro">
              Le taux de propriétaires n'est pas qu'un indicateur économique : il reflète
              l'histoire, les politiques publiques et la culture d'un pays.
            </p>
          </div>

          <div className="cm-why-grid">
            <div className="cm-why-card">
              <div className="cm-why-card-icon">🏛️</div>
              <h3 className="cm-why-card-title">Héritage post-communiste</h3>
              <p className="cm-why-card-text">
                Les pays d'Europe de l'Est (Roumanie 95 %, Slovaquie 92 %, Hongrie 91 %)
                affichent les taux les plus élevés du monde. La privatisation massive des
                logements sociaux dans les années 1990 a transféré la propriété à des prix
                symboliques aux locataires d'État. Ces pays ont ainsi créé une société de
                propriétaires en quelques années — sans que le marché immobilier ait eu le
                temps de se développer.
              </p>
            </div>

            <div className="cm-why-card">
              <div className="cm-why-card-icon">🏦</div>
              <h3 className="cm-why-card-title">Fiscalité et politique du logement</h3>
              <p className="cm-why-card-text">
                En Suisse (36 %), la location est culturellement valorisée et fiscalement
                traitée à égalité avec l'achat — les loyers sont encadrés, le marché locatif
                est stable et de qualité. En Allemagne (45 %), les loyers réglementés
                (<em>Mietpreisbremse</em>) et des droits très forts pour les locataires
                rendent la location attractive. À l'inverse, des aides à l'accession
                (PTZ en France, Help to Buy au Royaume-Uni) poussent vers la propriété.
              </p>
            </div>

            <div className="cm-why-card">
              <div className="cm-why-card-icon">💰</div>
              <h3 className="cm-why-card-title">Revenus et prix immobiliers</h3>
              <p className="cm-why-card-text">
                Dans les pays où les prix immobiliers sont très élevés par rapport aux revenus
                (Royaume-Uni, Australie, Canada), le taux de propriétaires baisse tendanciellement
                depuis 20 ans. En Corée du Sud (57 %), le système du <em>jeonse</em>
                (location avec caution importante remboursée) est une alternative culturelle
                à l'achat. Dans les pays en développement, l'accès au crédit immobilier étant
                limité, on observe des taux élevés de propriétaires de logements informels.
              </p>
            </div>

            <div className="cm-why-card">
              <div className="cm-why-card-icon">🧬</div>
              <h3 className="cm-why-card-title">Culture et démographie</h3>
              <p className="cm-why-card-text">
                La taille des ménages joue un rôle : les pays à forte natalité et familles
                élargies (Inde 87 %, Afrique subsaharienne) ont souvent des taux de propriétaires
                élevés, car plusieurs générations partagent un logement familial transmis.
                Les jeunes adultes nordiques, plus mobiles et individualistes, restent locataires
                plus longtemps. En France, "la pierre" reste un placement culturellement
                valorisé, mais le coût élevé dans les grandes villes maintient le taux à 65 %.
              </p>
            </div>
          </div>

          <div className="cm-why-note">
            <p>
              <strong>Sources :</strong> Eurostat Housing Statistics 2023, OECD Affordable
              Housing Database 2022–2024, UN-Habitat World Cities Report, statistiques nationales.
              Les données reflètent les ménages résidents — les résidences secondaires et
              logements vacants ne sont pas comptabilisés.
            </p>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
