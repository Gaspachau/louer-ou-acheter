import { formatCurrency } from "../utils/finance";

const PAD = { top: 24, right: 24, bottom: 44, left: 80 };
const VW = 720;
const VH = 280;
const CW = VW - PAD.left - PAD.right;
const CH = VH - PAD.top - PAD.bottom;

function fmtY(val) {
  const abs = Math.abs(val);
  if (abs >= 1_000_000) return `${Math.round(val / 100_000) / 10} M€`;
  if (abs >= 1_000) return `${Math.round(val / 1_000)} k€`;
  return `${Math.round(val)} €`;
}

export default function ProgressionChart({ yearlyData }) {
  if (!yearlyData || yearlyData.length < 1) return null;

  const n = yearlyData.length;

  const allVals = yearlyData.flatMap((d) => [d.ownerNetWorth, d.renterPortfolio]);
  const rawMin = Math.min(0, ...allVals);
  const rawMax = Math.max(...allVals);
  const pad = (rawMax - rawMin) * 0.08;
  const minVal = rawMin - (rawMin < 0 ? pad : 0);
  const maxVal = rawMax + pad;
  const range = maxVal - minVal || 1;

  const xOf = (year) =>
    n === 1 ? PAD.left + CW / 2 : PAD.left + ((year - 1) / (n - 1)) * CW;
  const yOf = (val) => PAD.top + (1 - (val - minVal) / range) * CH;
  const yZero = yOf(0);

  const ownerPts = yearlyData.map((d) => [xOf(d.year), yOf(d.ownerNetWorth)]);
  const renterPts = yearlyData.map((d) => [xOf(d.year), yOf(d.renterPortfolio)]);

  const toPath = (pts) => pts.map(([x, y], i) => `${i === 0 ? "M" : "L"} ${x} ${y}`).join(" ");
  const toArea = (pts) => {
    const last = pts[pts.length - 1];
    const first = pts[0];
    return `${toPath(pts)} L ${last[0]} ${yZero} L ${first[0]} ${yZero} Z`;
  };

  // Y-axis ticks (5 evenly spaced)
  const yTicks = Array.from({ length: 5 }, (_, i) => {
    const val = minVal + (i / 4) * range;
    return { val, y: yOf(val) };
  });

  // X-axis ticks
  const xStep = n <= 5 ? 1 : n <= 12 ? 2 : 5;
  const xTicks = yearlyData.filter((d) => d.year === 1 || d.year % xStep === 0);

  // Intersection detection
  const intersections = [];
  for (let i = 1; i < yearlyData.length; i++) {
    const prev = yearlyData[i - 1];
    const curr = yearlyData[i];
    const prevDiff = prev.ownerNetWorth - prev.renterPortfolio;
    const currDiff = curr.ownerNetWorth - curr.renterPortfolio;
    if (prevDiff * currDiff < 0) {
      const t = prevDiff / (prevDiff - currDiff);
      const crossYear = prev.year + t;
      const crossVal =
        prev.ownerNetWorth + t * (curr.ownerNetWorth - prev.ownerNetWorth);
      intersections.push({ x: xOf(crossYear), y: yOf(crossVal) });
    }
  }

  const lastOwner = yearlyData[n - 1];
  const lastRenter = yearlyData[n - 1];

  return (
    <div className="prog-wrap">
      <div className="prog-legend">
        <span className="prog-dot owner-dot" />
        <span className="prog-legend-label">Patrimoine net propriétaire</span>
        <span className="prog-dot renter-dot" />
        <span className="prog-legend-label">Capital locataire</span>
      </div>

      <svg
        viewBox={`0 0 ${VW} ${VH}`}
        preserveAspectRatio="xMidYMid meet"
        className="prog-svg"
      >
        <defs>
          <linearGradient id="ownerFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0.02" />
          </linearGradient>
          <linearGradient id="renterFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#ec4899" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#ec4899" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {/* Horizontal grid lines */}
        {yTicks.map(({ y }, i) => (
          <line key={i} x1={PAD.left} y1={y} x2={VW - PAD.right} y2={y}
            stroke="#e2e8f0" strokeWidth="1" />
        ))}

        {/* Zero line */}
        {minVal < 0 && (
          <line x1={PAD.left} y1={yZero} x2={VW - PAD.right} y2={yZero}
            stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="5 3" />
        )}

        {/* Area fills */}
        <path d={toArea(renterPts)} fill="url(#renterFill)" />
        <path d={toArea(ownerPts)} fill="url(#ownerFill)" />

        {/* Lines */}
        <path d={toPath(renterPts)} fill="none"
          stroke="#ec4899" strokeWidth="2.5"
          strokeLinecap="round" strokeLinejoin="round" />
        <path d={toPath(ownerPts)} fill="none"
          stroke="#2563eb" strokeWidth="2.5"
          strokeLinecap="round" strokeLinejoin="round" />

        {/* Intersection markers */}
        {intersections.map((pt, i) => (
          <g key={i}>
            <line x1={pt.x} y1={PAD.top} x2={pt.x} y2={VH - PAD.bottom}
              stroke="#94a3b8" strokeWidth="1" strokeDasharray="4 3" />
            <circle cx={pt.x} cy={pt.y} r="5" fill="white"
              stroke="#94a3b8" strokeWidth="2" />
          </g>
        ))}

        {/* Y axis labels */}
        {yTicks.map(({ val, y }, i) => (
          <text key={i} x={PAD.left - 8} y={y + 4}
            textAnchor="end" fontSize="11" fill="#94a3b8">
            {fmtY(val)}
          </text>
        ))}

        {/* X axis labels */}
        {xTicks.map((d) => (
          <text key={d.year} x={xOf(d.year)} y={VH - 6}
            textAnchor="middle" fontSize="11" fill="#94a3b8">
            {d.year} an{d.year > 1 ? "s" : ""}
          </text>
        ))}

        {/* End-point dots + values */}
        <circle cx={ownerPts[n - 1][0]} cy={ownerPts[n - 1][1]} r="5" fill="#2563eb" />
        <circle cx={renterPts[n - 1][0]} cy={renterPts[n - 1][1]} r="5" fill="#ec4899" />

        {/* End labels */}
        <text x={ownerPts[n - 1][0] + 8} y={ownerPts[n - 1][1] + 4}
          fontSize="11" fontWeight="700" fill="#2563eb">
          {formatCurrency(lastOwner.ownerNetWorth)}
        </text>
        <text x={renterPts[n - 1][0] + 8} y={renterPts[n - 1][1] + 4}
          fontSize="11" fontWeight="700" fill="#ec4899">
          {formatCurrency(lastRenter.renterPortfolio)}
        </text>
      </svg>
    </div>
  );
}
