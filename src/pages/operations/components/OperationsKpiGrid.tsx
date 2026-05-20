import type { OperationsSummary } from '@/types';

type KpiCard = {
  label: string;
  value: string;
  valueClass: string;
  footnote: string;
  accent?: 'red' | 'amber';
};

type Props = {
  summary: OperationsSummary;
};

export function OperationsKpiGrid({ summary }: Props) {
  const { permits, fleet } = summary;
  const validPct = fleet.total
    ? Math.round((permits.valid_count / fleet.total) * 100)
    : 0;

  const cards: KpiCard[] = [
    {
      label: 'Valid Permits',
      value: permits.valid_count.toLocaleString(),
      valueClass: 'text-green-700',
      footnote: `${validPct}% of fleet`,
    },
    {
      label: 'Expired Permits',
      value: permits.expired_count.toLocaleString(),
      valueClass: 'text-red-600',
      footnote: 'Needs immediate action',
      accent: 'red',
    },
    {
      label: 'Pending Review',
      value: String(permits.pending_review_count),
      valueClass: 'text-ink-800',
      footnote: 'Your approval queue',
    },
    {
      label: 'Expiring ≤ 30 days',
      value: permits.expiring_within_30_days.toLocaleString(),
      valueClass: 'text-amber-700',
      footnote: 'Plan renewals',
      accent: 'amber',
    },
  ];

  return (
    <div className="mb-5 grid grid-cols-4 gap-3.5">
      {cards.map((c) => {
        const accentBorder =
          c.accent === 'red'
            ? 'border-red-200'
            : c.accent === 'amber'
              ? 'border-amber-200'
              : 'border-ink-200';
        return (
          <div
            key={c.label}
            className={`rounded-card-lg border bg-white p-4 shadow-card-sm ${accentBorder}`}
          >
            <div className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-ink-500">
              {c.label}
            </div>
            <div
              className={`text-[28px] font-bold leading-none ${c.valueClass}`}
            >
              {c.value}
            </div>
            <div className="mt-1 text-[12px] text-ink-400">{c.footnote}</div>
          </div>
        );
      })}
    </div>
  );
}
