export default function LegendLine({
  color,
  dash,
}: {
  color: string;
  dash?: string;
}) {
  return (
    <svg width="28" height="12" className="shrink-0">
      <line
        x1="0"
        y1="6"
        x2="28"
        y2="6"
        stroke={color}
        strokeWidth="2"
        strokeDasharray={dash}
      />
      <circle cx="14" cy="6" r="3" fill={color} />
    </svg>
  );
}
