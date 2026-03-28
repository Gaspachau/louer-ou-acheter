import { useState, useEffect, useCallback, useRef } from "react";
import { geoNaturalEarth1, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import { select } from "d3-selection";
import { zoom, zoomIdentity } from "d3-zoom";
import TopBar from "./TopBar";
import Footer from "./Footer";
import { HOMEOWNERSHIP, ownershipColor, FRANCE_RATE, COLOR_LEGEND } from "../data/homeownership";

const W = 960;
const H = 500;

const projection = geoNaturalEarth1()
  .scale(153)
  .translate([W / 2, H / 2 + 20]);

const pathGen = geoPath().projection(projection);

/* ─── Pre-compute paths once ─────────────────────────────── */
let cachedFeatures = [];

/* ─── Top 10 lists ────────────────────────────────────────── */
const sorted = Object.entries(HOMEOWNERSHIP)
  .map(([, d]) => d)
  .sort((a, b) => b.rate - a.rate);

const TOP_OWNERS  = sorted.slice(0, 10);
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
        left: Math.min(x + 16, window.innerWidth - 248),
        top:  Math.max(y - 88, 8),
        pointerEvents: "none",
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

/* ─── Country info panel (click / mobile) ────────────────── */
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

/* ─── Map SVG (memoised so zoom doesn't re-render paths) ─── */
function MapPaths({ features, hoveredId, selected, onEnter, onLeave, onMove, onClick }) {
  return (
    <>
      {features.map((geo) => {
        const id      = parseInt(geo.id, 10);
        const country = HOMEOWNERSHIP[id];
        const color   = ownershipColor(country?.rate);
        const isHigh  = (hoveredId === String(geo.id) || (selected && selected.name === country?.name)) && !!country;
        const d       = pathGen(geo);
        if (!d) return null;
        return (
          <path
            key={geo.id}
            d={d}
            fill={isHigh ? "#f59e0b" : color}
            stroke="#fff"
            strokeWidth={0.3}
            style={{ cursor: country ? "pointer" : "default" }}
            onMouseEnter={country ? () => onEnter(String(geo.id)) : undefined}
            onMouseMove={country  ? (e) => onMove(e, country)    : undefined}
            onMouseLeave={onLeave}
            onClick={() => onClick(country ?? null)}
          />
        );
      })}
    </>
  );
}

/* ─── Main page ───────────────────────────────────────────── */
export default function PageCarteMondiale() {
  const [features, setFeatures]   = useState([]);
  const [tooltip,  setTooltip]    = useState({ visible: false, data: null, x: 0, y: 0 });
  const [selected, setSelected]   = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const svgRef  = useRef(null);
  const gRef    = useRef(null);
  const zoomRef = useRef(null);

  /* Load topojson */
  useEffect(() => {
    fetch("/world-110m.json")
      .then((r) => r.json())
      .then((topo) => {
        const geo = feature(topo, topo.objects.countries);
        setFeatures(geo.features);
      })
      .catch(() => {});
  }, []);

  /* Setup D3 zoom (drag + scroll + pinch) */
  useEffect(() => {
    if (!svgRef.current || features.length === 0) return;

    const svg = select(svgRef.current);

    const zoomBehavior = zoom()
      .scaleExtent([1, 8])
      .on("start", () => setIsDragging(true))
      .on("zoom",  (event) => {
        if (gRef.current) {
          gRef.current.setAttribute("transform", event.transform.toString());
        }
      })
      .on("end", () => setIsDragging(false));

    zoomRef.current = zoomBehavior;
    svg.call(zoomBehavior);

    return () => svg.on(".zoom", null);
  }, [features.length > 0]);

  /* Zoom controls */
  const zoomIn    = () => zoomRef.current && select(svgRef.current).transition().duration(300).call(zoomRef.current.scaleBy, 1.5);
  const zoomOut   = () => zoomRef.current && select(svgRef.current).transition().duration(300).call(zoomRef.current.scaleBy, 1 / 1.5);
  const zoomReset = () => zoomRef.current && select(svgRef.current).transition().duration(400).call(zoomRef.current.transform, zoomIdentity);

  const handleMouseMove = useCallback((e, data) => {
    if (isDragging) return;
    setTooltip({ visible: true, data, x: e.clientX, y: e.clientY });
  }, [isDragging]);

  const handleMouseLeave = useCallback(() => {
    setHoveredId(null);
    setTooltip((t) => ({ ...t, visible: false }));
  }, []);

  const handleEnter = useCallback((id) => {
    if (!isDragging) setHoveredId(id);
  }, [isDragging]);

  const handleClick = useCallback((data) => {
    if (isDragging) return;
    if (data) setSelected(data);
  }, [isDragging]);

  return (
    <div className="page">
      <TopBar />
      <main id="main-content" className="cm-page">

        {/* ── HERO ─────────────────────────────────────────── */}
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

        {/* ── MAP ──────────────────────────────────────────── */}
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
            <button className="cm-zoom-btn" onClick={zoomIn}    type="button" aria-label="Zoom avant">+</button>
            <button className="cm-zoom-btn" onClick={zoomOut}   type="button" aria-label="Zoom arrière">−</button>
            <button className="cm-zoom-btn" onClick={zoomReset} type="button" aria-label="Réinitialiser le zoom">↺</button>
          </div>

          <div className="cm-map-hint">
            <span>🖱️ Scroll pour zoomer · Cliquer-glisser pour naviguer · Clic sur un pays pour les détails</span>
          </div>

          <div
            className={`cm-map-wrap${isDragging ? " cm-map-dragging" : ""}`}
            role="img"
            aria-label="Carte mondiale des taux de propriétaires"
          >
            {features.length === 0 && (
              <div className="cm-map-loading">Chargement de la carte…</div>
            )}
            <svg
              ref={svgRef}
              viewBox={`0 0 ${W} ${H}`}
              style={{ width: "100%", height: "auto", display: "block", touchAction: "none" }}
            >
              <g ref={gRef}>
                <MapPaths
                  features={features}
                  hoveredId={hoveredId}
                  selected={selected}
                  onEnter={handleEnter}
                  onLeave={handleMouseLeave}
                  onMove={handleMouseMove}
                  onClick={handleClick}
                />
              </g>
            </svg>
          </div>

          {/* Tooltip (desktop hover) */}
          <Tooltip {...tooltip} />

          {/* Country panel (click / mobile) */}
          {selected && (
            <CountryPanel data={selected} onClose={() => setSelected(null)} />
          )}
        </div>

        {/* ── TOP 10 LISTS ─────────────────────────────────── */}
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
                <RankRow key={c.name} rank={i + 1} name={c.name} rate={c.rate} isFrance={c.name === "France"} />
              ))}
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
                <RankRow key={c.name} rank={i + 1} name={c.name} rate={c.rate} isFrance={c.name === "France"} />
              ))}
            </div>
          </div>
        </div>

        {/* ── WHY section ──────────────────────────────────── */}
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
                propriétaires en quelques années.
              </p>
            </div>
            <div className="cm-why-card">
              <div className="cm-why-card-icon">🏦</div>
              <h3 className="cm-why-card-title">Fiscalité et politique du logement</h3>
              <p className="cm-why-card-text">
                En Suisse (36 %), la location est culturellement valorisée et fiscalement
                traitée à égalité avec l'achat. En Allemagne (45 %), les loyers réglementés
                (<em>Mietpreisbremse</em>) rendent la location attractive. À l'inverse,
                des aides à l'accession (PTZ en France, Help to Buy au Royaume-Uni)
                poussent vers la propriété.
              </p>
            </div>
            <div className="cm-why-card">
              <div className="cm-why-card-icon">💰</div>
              <h3 className="cm-why-card-title">Revenus et prix immobiliers</h3>
              <p className="cm-why-card-text">
                Dans les pays où les prix sont très élevés par rapport aux revenus
                (Royaume-Uni, Australie, Canada), le taux de propriétaires baisse
                depuis 20 ans. En Corée du Sud (57 %), le système du <em>jeonse</em>
                (caution importante remboursée) est une alternative culturelle à l'achat.
              </p>
            </div>
            <div className="cm-why-card">
              <div className="cm-why-card-icon">🧬</div>
              <h3 className="cm-why-card-title">Culture et démographie</h3>
              <p className="cm-why-card-text">
                Les pays à forte natalité et familles élargies (Inde 87 %) ont souvent
                des taux élevés, car plusieurs générations partagent un logement familial.
                Les jeunes adultes nordiques restent locataires plus longtemps. En France,
                "la pierre" reste culturellement valorisée mais le coût élevé dans les
                grandes villes maintient le taux à 65 %.
              </p>
            </div>
          </div>

          <div className="cm-why-note">
            <p>
              <strong>Sources :</strong> Eurostat Housing Statistics 2023, OECD Affordable
              Housing Database 2022–2024, UN-Habitat World Cities Report, statistiques nationales.
            </p>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
