type Props = {
  label: string;
  value: string | number;
  unit?: string;
  footnote: string;
};

export default function KpiCard({ label, value, unit, footnote }: Props) {
  return (
    <div className="rounded-card border border-ink-200 bg-white px-5 py-4 shadow-card-sm">
      <div className="text-[11px] font-medium uppercase tracking-wide text-ink-400">
        {label}
      </div>
      <div className="mt-1.5 flex items-baseline gap-1">
        <span className="text-[26px] font-bold leading-none text-ink-900 tabular-nums">
          {value}
        </span>
        {unit && (
          <span className="text-[13px] font-medium text-ink-400">{unit}</span>
        )}
      </div>
      <div className="mt-1 text-[11px] text-ink-400">{footnote}</div>
    </div>
  );
}
