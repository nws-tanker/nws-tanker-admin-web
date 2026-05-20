export default function DonutRing({
  value,
  color,
}: {
  value: number;
  color: string;
}) {
  const size = 72,
    r = size / 2 - 5,
    circ = 2 * Math.PI * r,
    cx = size / 2;
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="shrink-0"
    >
      <circle
        cx={cx}
        cy={cx}
        r={r}
        fill="none"
        stroke="#f3f4f6"
        strokeWidth="8"
      />
      <circle
        cx={cx}
        cy={cx}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray={`${(value / 100) * circ} ${circ}`}
        transform={`rotate(-90 ${cx} ${cx})`}
      />
      <text
        x={cx}
        y={cx + 5}
        textAnchor="middle"
        fill="#111827"
        style={{
          fontSize: 13,
          fontWeight: 700,
          fontFamily: 'Inter, sans-serif',
        }}
      >
        {value}%
      </text>
    </svg>
  );
}
