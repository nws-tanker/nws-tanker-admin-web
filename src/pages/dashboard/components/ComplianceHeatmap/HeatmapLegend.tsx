const LEGEND_ITEMS = [
  {
    from: 'rgba(16,185,129,0.20)',
    to: 'rgba(16,185,129,0.83)',
    label: '≥ 80%',
  },
  {
    from: 'rgba(245,158,11,0.20)',
    to: 'rgba(245,158,11,0.75)',
    label: '70–79%',
  },
  { from: 'rgba(239,68,68,0.20)', to: 'rgba(239,68,68,0.83)', label: '< 70%' },
];

export default function HeatmapLegend() {
  return (
    <div className="mt-5 flex justify-center gap-6">
      {LEGEND_ITEMS.map(({ from, to, label }) => (
        <div
          key={label}
          className="flex items-center gap-1.5 text-xs text-ink-500"
        >
          <span
            className="h-3 w-6 rounded-sm"
            style={{ background: `linear-gradient(to right, ${from}, ${to})` }}
          />
          {label}
        </div>
      ))}
    </div>
  );
}
