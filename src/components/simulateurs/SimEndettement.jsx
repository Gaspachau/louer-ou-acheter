import { useMemo, useState } from "react";
import Field from "../Field";
import SimLayout from "./SimLayout";
import { formatCurrency } from "../../utils/finance";

function calcEndettement({ revenus, chargesExistantes, taux, duree }) {
  if (!revenus || revenus <= 0) return null;
  const tauxActuel = (chargesExistantes / revenus) * 100;
  const capaciteRestante = Math.max(0, revenus * 0.35 - chargesExistantes);
  if (tauxActuel > 35) {
    return { tauxActuel, capaciteRestante: 0, montantEmpruntable: 0 };
  }
  const r = taux / 100 / 12;
  const n = duree * 12;
  const montantEmpruntable =
    r === 0 && n > 0
      ? capaciteRestante * n
      : r > 0 && n > 0
      ? capaciteRestante * (1 - Math.pow(1 + r, -n)) / r
      : 0;
  return { tauxActuel, capaciteRestante, montantEmpruntable };
}

/**
 * Semi-circular SVG gauge showing debt ratio 0–50%.
 * The arc goes left→top→right, 35% of 50% = 70% of arc = limit marker.
 */
function SemiGauge({ value }) {
  const maxPct = 50; // gauge shows 0–50%
  const fillPct = Math.min(1, Math.max(0, value / maxPct));
  const limitPct = 35 / maxPct; // where to draw the 35% tick

  const r = 54;
  const cx = 80;
  const cy = 68;
  const halfCirc = Math.PI * r; // ≈ 169.6

  const fillLen = fillPct * halfCirc;
  const limitLen = limitPct * halfCirc;

  const color = value > 35 ? "#dc2626" : value > 28 ? "#d97706" : "#06b6d4";

  // Point on arc at given fraction (0=left, 1=right through top)
  const arcPoint = (frac, rr) => {
    const angle = (1 - frac) * Math.PI; // left→top→right in screen coords
    return {
      x: cx + rr * Math.cos(angle),
      y: cy - rr * Math.sin(angle),
    };
  };

  const limitInner = arcPoint(limitPct, r - 8);
  const limitOuter = arcPoint(limitPct, r + 10);
  const limitLabel = arcPoint(limitPct, r + 20);

  return (
    <div className="semi-gauge-wrap">
      <svg viewBox="0 0 160 80" className="semi-gauge-svg" aria-hidden="true">
        {/* Track */}
        <path
          d={`M ${cx - r},${cy} A ${r},${r} 0 0,1 ${cx + r},${cy}`}
          fill="none"
          stroke="#e2e8f0"
          strokeWidth="12"
          strokeLinecap="round"
        />
        {/* Fill */}
        <path
          d={`M ${cx - r},${cy} A ${r},${r} 0 0,1 ${cx + r},${cy}`}
          fill="none"
          stroke={color}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={`${fillLen} ${halfCirc}`}
          className="gauge-fill-path"
        />
        {/* 35% limit marker */}
        <line
          x1={limitInner.x} y1={limitInner.y}
          x2={limitOuter.x} y2={limitOuter.y}
          stroke="#94a3b8"
          strokeWidth="2"
        />
        <text
          x={limitLabel.x} y={limitLabel.y + 1}
          textAnchor="middle"
          fontSize="7.5"
          fill="#94a3b8"
          fontWeight="700"
        >35%</text>

        {/* Value display */}
        <text x={cx} y={cy - 14} textAnchor="middle" fontSize="22" fontWeight="900" fill={color}>
          {value.toFixed(1)}%
        </text>
        <text x={cx} y={cy + 2} textAnchor="middle" fontSize="8.5" fill="#5e6e88">
          taux d'endettement
        </text>

        {/* Scale labels */}
        <text x={cx - r - 4} y={cy + 10} textAnchor="end" fontSize="8" fill="#5e6e88">0%</text>
        <text x={cx + r + 4} y={cy + 10} textAnchor="start" fontSize="8" fill="#5e6e88">50%</text>
      </svg>
    </div>
  );
}

export default function SimEndettement() {
  const [v, setV] = useState({ revenus: 3500, chargesExistantes: 300, taux: 3.5, duree: 20 });
  const set = (k) => (val) => setV((s) => ({ ...s, [k]: val }));

  const res = useMemo(() => calcEndettement(v), [v]);

  const verdict = !res
    ? null
    : res.tauxActuel > 35
    ? { label: "Déjà sur-endetté", color: "red", msg: `Vos charges actuelles (${formatCurrency(v.chargesExistantes)}/mois) représentent ${res.tauxActuel.toFixed(1)} % de vos revenus — au-dessus du seuil légal HCSF de 35 %. L'accès à un nouveau crédit sera difficile voire impossible sans réduire vos charges existantes.` }
    : res.capaciteRestante < 200
    ? { label: "Capacité limitée", color: "amber", msg: `Votre taux d'endettement actuel est de ${res.tauxActuel.toFixed(1)} %. Il vous reste ${formatCurrency(res.capaciteRestante)}/mois de marge avant d'atteindre le plafond de 35 % — soit un emprunt maximal de ${formatCurrency(res.montantEmpruntable)} sur ${v.duree} ans à ${v.taux} %. Prudence.` }
    : { label: "Capacité correcte", color: "green", msg: `Votre taux d'endettement actuel est de ${res.tauxActuel.toFixed(1)} %. Avec une capacité mensuelle disponible de ${formatCurrency(res.capaciteRestante)}, vous pouvez emprunter jusqu'à ${formatCurrency(res.montantEmpruntable)} sur ${v.duree} ans à ${v.taux} % tout en restant sous le seuil HCSF de 35 %.` };

  return (
    <SimLayout
      icon="📉"
      title="Calculateur d'endettement"
      description="Évaluez votre taux d'endettement et estimez votre capacité d'emprunt maximale."
    >
      <div className="sim-layout">
        <div className="sim-card">
          <p className="sim-card-legend">Votre situation financière</p>
          <div className="step-fields">
            <div className="field-full">
              <Field label="Revenus nets mensuels" value={v.revenus} onChange={set("revenus")} suffix="€/mois" hint="Tous revenus réguliers (salaires, revenus locatifs…)" tooltip="Revenus nets après impôts de tous les emprunteurs. Incluez salaires, pensions, revenus locatifs stables." />
            </div>
            <div className="field-full">
              <Field label="Charges de crédit existantes" value={v.chargesExistantes} onChange={set("chargesExistantes")} suffix="€/mois" hint="Somme de toutes vos mensualités de crédit en cours" tooltip="Mensualités de tous vos crédits en cours (auto, conso, autre immobilier). Règle HCSF : total des crédits ≤ 35 % de vos revenus." />
            </div>
          </div>

          <p className="sim-card-legend" style={{ marginTop: 16 }}>Nouveau crédit envisagé</p>
          <div className="step-fields">
            <Field label="Taux annuel" value={v.taux} onChange={set("taux")} suffix="%" hint="Taux moyen France 2026 : 3,3–3,7 % sur 20 ans" tooltip="Taux d'intérêt annuel de votre prêt. Moyenne France 2026 : 3,3–3,7 % sur 20 ans. Comparez les offres avec un courtier." />
            <Field label="Durée" value={v.duree} onChange={set("duree")} suffix="ans" tooltip="Nombre d'années de remboursement. Plus c'est long → mensualité basse mais intérêts totaux élevés. Limite légale HCSF : 25 ans (27 ans dans le neuf)." />
          </div>
        </div>

        <div className="sim-results-panel">
          {!res ? (
            <p className="sim-empty">Renseignez vos revenus pour voir les résultats.</p>
          ) : (
            <>
              {verdict && (
                <div className={`sim-verdict sim-verdict-${verdict.color}`}>
                  <strong>{verdict.label}</strong>
                  <p>{verdict.msg}</p>
                </div>
              )}

              <SemiGauge value={res.tauxActuel} />

              <div className="sim-stats-grid">
                <div className="sim-stat-card">
                  <span className="sim-stat-card-label">Revenus mensuels</span>
                  <span className="sim-stat-card-value">{formatCurrency(v.revenus)}</span>
                </div>
                <div className="sim-stat-card sim-stat-card-blue">
                  <span className="sim-stat-card-label">Capacité mensuelle dispo</span>
                  <span className="sim-stat-card-value">{formatCurrency(res.capaciteRestante)}</span>
                </div>
                <div className={`sim-stat-card ${res.montantEmpruntable > 0 ? "sim-stat-card-green" : ""}`}>
                  <span className="sim-stat-card-label">Montant empruntable max</span>
                  <span className="sim-stat-card-value">{formatCurrency(res.montantEmpruntable)}</span>
                </div>
                <div className="sim-stat-card">
                  <span className="sim-stat-card-label">Seuil HCSF (35%)</span>
                  <span className="sim-stat-card-value">{formatCurrency(v.revenus * 0.35)}/mois</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </SimLayout>
  );
}
