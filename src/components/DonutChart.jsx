/**
 * Animated SVG donut chart.
 * segments: [{ value, color, label }]
 */
export default function DonutChart({ segments, size = 140, thickness = 22, label, subLabel }) {
  const r = (size - thickness) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * r;

  const total = segments.reduce((s, seg) => s + Math.max(0, seg.value), 0);

  let cumulative = 0;
  const arcs = segments
    .filter((s) => s.value > 0)
    .map((seg) => {
      const pct = total > 0 ? seg.value / total : 0;
      const dash = pct * circumference;
      const gap = circumference - dash;
      const rotation = -90 + (cumulative / Math.max(total, 1)) * 360;
      cumulative += seg.value;
      return { ...seg, dash, gap, rotation };
    });

  return (
    <div className="donut-wrap">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        aria-hidden="true"
      >
        {/* Track */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#f1f5f9" strokeWidth={thickness} />
        {/* Colored arcs */}
        {arcs.map((arc, i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke={arc.color}
            strokeWidth={thickness - 2}
            strokeDasharray={`${arc.dash} ${arc.gap}`}
            strokeLinecap="butt"
            transform={`rotate(${arc.rotation} ${cx} ${cy})`}
            className="donut-arc"
          />
        ))}
      </svg>
      {(label || subLabel) && (
        <div className="donut-center">
          {label && <span className="donut-label">{label}</span>}
          {subLabel && <span className="donut-sublabel">{subLabel}</span>}
        </div>
      )}
    </div>
  );
}
