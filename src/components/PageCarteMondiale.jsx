import { useState, useEffect, useCallback, useRef } from "react";
import { useSEO } from "../utils/useSEO";
import { geoNaturalEarth1, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import { select } from "d3-selection";
import { zoom, zoomIdentity } from "d3-zoom";
import TopBar from "./TopBar";
import Footer from "./Footer";
import { HOMEOWNERSHIP, ownershipColor, FRANCE_RATE, COLOR_LEGEND } from "../data/homeownership";

const W = 960;
const H = 500;

/* ─── Interesting facts per country ──────────────────────── */
const COUNTRY_FACTS = {
  "France":           { flag: "🇫🇷", fact: "La France a parmi les loyers les plus réglementés d'Europe — l'encadrement des loyers s'applique dans les grandes villes.", curiosity: "Paris compte 64 % de locataires, le taux le plus élevé de France." },
  "Allemagne":        { flag: "🇩🇪", fact: "L'Allemagne a le taux de propriétaires le plus bas d'Europe occidentale (45 %) malgré une économie solide.", curiosity: "À Berlin, 85 % des habitants sont locataires — une exception mondiale." },
  "Suisse":           { flag: "🇨🇭", fact: "La Suisse a l'un des marchés locatifs les plus matures du monde, avec des baux protégés de longue durée.", curiosity: "Le droit de préemption des locataires existe dans plusieurs cantons." },
  "Roumanie":         { flag: "🇷🇴", fact: "La Roumanie a le taux de propriétaires le plus élevé d'UE (95 %), héritage des privatisations post-communistes.", curiosity: "Dans les années 90, l'État a vendu les logements aux locataires pour 1 % de leur valeur." },
  "Lituanie":         { flag: "🇱🇹", fact: "93 % de Lituaniens propriétaires : après l'indépendance en 1990, les appartements soviétiques ont été offerts aux occupants.", curiosity: "Le marché locatif formel représente moins de 3 % du parc résidentiel." },
  "Slovaquie":        { flag: "🇸🇰", fact: "Même héritage post-soviétique que ses voisins : les logements collectivistes ont été transférés aux occupants.", curiosity: "Bratislava voit affluer les investisseurs étrangers attirés par les prix encore bas." },
  "Hongrie":          { flag: "🇭🇺", fact: "91 % des Hongrois sont propriétaires — Budapest est pourtant une ville où la location devient attractive pour les jeunes.", curiosity: "Le crédit immobilier à taux fixe sur 20 ans n'existait presque pas avant 2010." },
  "Chine":            { flag: "🇨🇳", fact: "90 % des Chinois possèdent leur logement — en partie car louer est culturellement mal vu pour une famille stable.", curiosity: "Dans des villes comme Shenzhen, des appartements ont multiplié par 100 leur valeur en 20 ans." },
  "Inde":             { flag: "🇮🇳", fact: "87 % des Indiens sont propriétaires, surtout en zones rurales. Dans les mégapoles comme Mumbai, des millions vivent en bidonvilles.", curiosity: "L'Inde manquerait de 18 millions de logements urbains selon le gouvernement." },
  "Albanie":          { flag: "🇦🇱", fact: "85 % des Albanais sont propriétaires, souvent grâce aux constructions informelles qui ont longtemps précédé toute réglementation.", curiosity: "Tirana a vu ses prix doubler entre 2018 et 2023 avec l'afflux de la diaspora." },
  "Pologne":          { flag: "🇵🇱", fact: "La Pologne oscille entre héritage soviétique (propriété collective) et boom immobilier récent.", curiosity: "Varsovie a les prix immobiliers qui ont le plus augmenté en Europe entre 2020 et 2024." },
  "Bulgarie":         { flag: "🇧🇬", fact: "83 % de Bulgares propriétaires, souvent dans des immeubles hérités de l'ère communiste.", curiosity: "La Bulgarie perd 7 % de sa population par décennie — l'immobilier dans les régions rurales vaut parfois moins de 5 000 €." },
  "Australie":        { flag: "🇦🇺", fact: "L'Australie vit une crise du logement : Sydney est la 2e ville la moins abordable du monde selon le ratio prix/revenus.", curiosity: "Un report fiscal (negative gearing) encourage les Australiens aisés à acheter pour louer à perte fiscalement." },
  "Canada":           { flag: "🇨🇦", fact: "Le Canada a interdit les achats immobiliers par des non-résidents en 2023 pour lutter contre la spéculation.", curiosity: "À Vancouver, le prix médian d'une maison dépasse 14 fois le salaire médian annuel." },
  "États-Unis":       { flag: "🇺🇸", fact: "Les États-Unis ont une longue tradition de propriété soutenue par des déductions fiscales sur les intérêts d'emprunt.", curiosity: "La crise des subprimes de 2008 a fait chuter le taux de propriétaires de 69 % à 63 %." },
  "Japon":            { flag: "🇯🇵", fact: "Au Japon, les maisons perdent de la valeur avec le temps (amortissement) — seul le terrain vaut sur le long terme.", curiosity: "Il existe au Japon 8 millions de maisons abandonnées (akiya) à vendre pour quelques milliers d'euros." },
  "Corée du Sud":     { flag: "🇰🇷", fact: "La Corée du Sud a un système unique : le 'jeonse', où le locataire verse une caution massive (~50 % du prix) sans payer de loyer.", curiosity: "Séoul a vu ses prix immobiliers doubler en 5 ans, provoquant une révolte politique." },
  "Pays-Bas":         { flag: "🇳🇱", fact: "Les Pays-Bas ont un vaste secteur social (30 % du parc) mais un marché privé très tendu.", curiosity: "Amsterdam manque officiellement de 19 000 logements. La file d'attente pour un logement social peut atteindre 15 ans." },
  "Suède":            { flag: "🇸🇪", fact: "Stockholm a un système de file d'attente pour les logements sociaux — certains attendent 20+ ans.", curiosity: "En Suède, les appartements coopératifs (bostadsrätt) sont une forme hybride entre location et propriété." },
  "Danemark":         { flag: "🇩🇰", fact: "Le Danemark a les loyers les plus chers d'Europe rapportés aux revenus, mais aussi des logements sociaux très bien construits.", curiosity: "Copenhague vise 50 % de logements abordables dans les nouveaux quartiers." },
  "Norvège":          { flag: "🇳🇴", fact: "77 % des Norvégiens sont propriétaires grâce aux prêts étudiants abordables et aux salaires élevés liés au pétrole.", curiosity: "Oslo a les prix immobiliers les plus élevés de Scandinavie — 10 000 €/m² en centre-ville." },
  "Italie":           { flag: "🇮🇹", fact: "L'Italie a un marché du logement figé par des lois protégeant fortement les locataires, décourageant les propriétaires de louer.", curiosity: "Des villages siciliens et calabrais bradent leurs maisons à 1 € pour lutter contre l'exode rural." },
  "Espagne":          { flag: "🇪🇸", fact: "Après la bulle de 2008, l'Espagne a vu ses prix chuter de 40 %. Une génération entière a perdu confiance dans la propriété.", curiosity: "Barcelone a 22 000 appartements touristiques Airbnb — plus que de logements sociaux." },
  "Portugal":         { flag: "🇵🇹", fact: "Le Portugal a attiré des milliers d'étrangers via les visas dorés, faisant flamber les prix dans les grandes villes.", curiosity: "Lisbonne est devenue moins abordable que Paris pour les locaux en 10 ans." },
  "Grèce":            { flag: "🇬🇷", fact: "La crise de 2010 a ruiné des milliers de propriétaires grecs qui n'arrivaient plus à payer leurs hypothèques.", curiosity: "Des appartements vides à Athènes ont été convertis en logements Airbnb, vidant les centres-villes de leurs habitants." },
  "Russie":           { flag: "🇷🇺", fact: "Après la chute de l'URSS, les appartements soviétiques ont été privatisés massivement — 89 % des Russes sont propriétaires.", curiosity: "Moscou est dans le top 10 des villes les plus chères du monde malgré les sanctions." },
  "Brésil":           { flag: "🇧🇷", fact: "73 % de Brésiliens propriétaires, grâce au programme Minha Casa Minha Vida qui a construit 6 millions de logements sociaux.", curiosity: "São Paulo compte 40 000 personnes sans-abri — et 500 000 logements vides simultanément." },
  "Argentine":        { flag: "🇦🇷", fact: "L'instabilité économique pousse les Argentins à investir dans la brique comme valeur refuge contre l'inflation.", curiosity: "Buenos Aires loue en dollars pour protéger les propriétaires de l'inflation en pesos (> 100 %/an)." },
  "Mexique":          { flag: "🇲🇽", fact: "80 % des Mexicains propriétaires, souvent dans des logements construits par eux-mêmes (autoconstruction) en périphérie.", curiosity: "Mexico City s'enfonce de 10 cm par an à cause de l'extraction d'eau — les immeubles se déforment." },
};


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
  const facts = COUNTRY_FACTS[data.name];
  return (
    <div className="cm-panel">
      <button className="cm-panel-close" onClick={onClose} type="button" aria-label="Fermer">✕</button>
      <p className="cm-panel-name">
        {facts?.flag && <span style={{ marginRight: 8 }}>{facts.flag}</span>}
        {data.name}
      </p>
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
      {facts && (
        <div className="cm-panel-facts">
          <div className="cm-panel-fact">
            <span className="cm-panel-fact-icon">💡</span>
            <p className="cm-panel-fact-text">{facts.fact}</p>
          </div>
          <div className="cm-panel-fact cm-panel-curiosity">
            <span className="cm-panel-fact-icon">✨</span>
            <p className="cm-panel-fact-text">{facts.curiosity}</p>
          </div>
        </div>
      )}
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
  useSEO({ title: "Carte Mondiale Immobilier — Comparez les Prix dans le Monde", description: "Explorez les prix de l'immobilier dans le monde entier sur une carte interactive. Comparez le coût de la vie et les marchés immobiliers pays par pays.", path: "/carte-mondiale" });
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
      <main id="main-content" className="cm-main-v2">

        <div className="cm-page">
        {/* ── HERO ─────────────────────────────────────────── */}
        <div className="cm-hero-v2">
          <div className="cm-hero-v2-inner">
            <span className="cm-hero-v2-badge">🌍 Comparaison mondiale</span>
            <h1 className="cm-hero-v2-title">
              Propriétaires vs locataires<br/>
              <span className="cm-hero-v2-accent">dans le monde</span>
            </h1>
            <p className="cm-hero-v2-desc">
              De la Roumanie à 95 % jusqu'à la Suisse à 36 % — les écarts sont immenses
              et révèlent l'histoire, la fiscalité et la culture de chaque pays.
              Survolez ou cliquez sur un pays pour voir ses données détaillées.
            </p>
            <div className="cm-hero-v2-stats">
              <div className="cm-hero-v2-stat">
                <span className="cm-hero-v2-stat-val">95 %</span>
                <span className="cm-hero-v2-stat-lbl">Roumanie — record mondial</span>
              </div>
              <div className="cm-hero-v2-stat-sep" />
              <div className="cm-hero-v2-stat">
                <span className="cm-hero-v2-stat-val">65 %</span>
                <span className="cm-hero-v2-stat-lbl">France — dans la moyenne UE</span>
              </div>
              <div className="cm-hero-v2-stat-sep" />
              <div className="cm-hero-v2-stat">
                <span className="cm-hero-v2-stat-val">36 %</span>
                <span className="cm-hero-v2-stat-lbl">Suisse — le taux le plus bas</span>
              </div>
              <div className="cm-hero-v2-stat-sep" />
              <div className="cm-hero-v2-stat">
                <span className="cm-hero-v2-stat-val">{Object.keys(HOMEOWNERSHIP).length}+</span>
                <span className="cm-hero-v2-stat-lbl">pays cartographiés</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── KEY INSIGHTS ─────────────────────────────────── */}
        <div className="cm-insights">
          <div className="cm-insight-card cm-insight-east">
            <span className="cm-insight-icon">🏛️</span>
            <h3 className="cm-insight-title">Héritage post-soviétique</h3>
            <p className="cm-insight-text">
              Les pays d'Europe de l'Est affichent les taux les plus élevés : Roumanie
              95 %, Lituanie 93 %, Hongrie 91 %. La privatisation des logements soviétiques
              dans les années 90 a créé des sociétés de propriétaires en quelques années.
            </p>
          </div>
          <div className="cm-insight-card cm-insight-west">
            <span className="cm-insight-icon">🏦</span>
            <h3 className="cm-insight-title">Location valorisée à l'Ouest</h3>
            <p className="cm-insight-text">
              Suisse (36 %), Allemagne (45 %), Autriche (55 %) : la location y est
              culturellement et fiscalement valorisée. Des loyers encadrés et des baux
              protégés rendent l'accession moins urgente.
            </p>
          </div>
          <div className="cm-insight-card cm-insight-crisis">
            <span className="cm-insight-icon">📉</span>
            <h3 className="cm-insight-title">Crises et effet boomerang</h3>
            <p className="cm-insight-text">
              La crise de 2008 a fait chuter les propriétaires aux États-Unis de 69 %
              à 63 %. En Espagne, une génération entière a perdu confiance après
              la bulle. La crise peut inverser durablement la tendance.
            </p>
          </div>
        </div>
        </div>{/* end .cm-page */}

        {/* ── MAP (full-width, outside max-width container) ── */}
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
        </div>{/* end .cm-map-section */}

        <div className="cm-page">
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

        {/* ── LA FRANCE DANS TOUT ÇA ───────────────────────── */}
        <section className="cm-france-section">
          <div className="cm-why-header">
            <span className="blog-kicker">Zoom France</span>
            <h2 className="cm-why-title">Et la France dans tout ça ?</h2>
            <p className="cm-why-intro">
              Avec 65 % de propriétaires, la France se situe dans la moyenne européenne —
              mais cache de fortes disparités internes.
            </p>
          </div>
          <div className="cm-france-grid">
            <div className="cm-france-card">
              <span className="cm-france-icon">🗼</span>
              <h3 className="cm-france-title">Paris, exception mondiale</h3>
              <p className="cm-france-text">
                À Paris, 64 % des ménages sont <strong>locataires</strong> — un taux proche
                de Berlin. La capitale concentre des prix au m² parmi les plus élevés d'Europe
                (9 000–10 000 €/m²), rendant l'accession hors de portée pour la plupart des ménages
                aux revenus médians.
              </p>
            </div>
            <div className="cm-france-card">
              <span className="cm-france-icon">🏘️</span>
              <h3 className="cm-france-title">La province s'en sort mieux</h3>
              <p className="cm-france-text">
                En dehors des grandes métropoles, le taux de propriétaires monte à <strong>72–75 %</strong>.
                Dans les zones rurales et les villes moyennes, l'effort d'achat reste inférieur
                à 20 % des revenus — rendant la propriété plus accessible qu'à Paris ou Lyon.
              </p>
            </div>
            <div className="cm-france-card">
              <span className="cm-france-icon">📊</span>
              <h3 className="cm-france-title">La règle HCSF protège les ménages</h3>
              <p className="cm-france-text">
                La limite à <strong>35 % d'endettement</strong> imposée par le HCSF depuis 2022
                a refroidi le marché mais protège les Français des excès de la bulle espagnole
                de 2008. Les prêts à taux variable restent marginaux, contrairement au Royaume-Uni.
              </p>
            </div>
            <div className="cm-france-card">
              <span className="cm-france-icon">🔮</span>
              <h3 className="cm-france-title">Vers quel modèle demain ?</h3>
              <p className="cm-france-text">
                La génération des 25–35 ans achète de plus en plus tard : l'âge médian
                du premier achat est passé de <strong>33 à 37 ans</strong> entre 2010 et 2024.
                La France se rapproche doucement du modèle allemand, où louer longtemps
                n'est plus une anomalie sociale.
              </p>
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────── */}
        <div className="cm-cta">
          <div className="cm-cta-inner">
            <div className="cm-cta-text">
              <p className="cm-cta-title">Louer ou acheter en France — calculez votre cas</p>
              <p className="cm-cta-sub">Utilisez notre simulateur pour comparer les deux scénarios sur votre durée de détention, dans votre ville.</p>
            </div>
            <div className="cm-cta-actions">
              <Link to="/" className="btn-primary">Simulateur louer/acheter →</Link>
              <Link to="/simulateurs/comparateur-villes" className="cm-cta-sec">Comparer 12 villes françaises</Link>
            </div>
          </div>
        </div>
        </div>{/* end .cm-page */}

      </main>
      <Footer />
    </div>
  );
}
