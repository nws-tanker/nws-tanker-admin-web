import type { FleetComplianceKpiResponse } from '@/types/fleetCompliance';

type Props = { data: FleetComplianceKpiResponse };

type Variant = 'default' | 'green' | 'red' | 'amber' | 'highlight';

type KpiCardProps = {
  label: string;
  value: number;
  sub: string;
  variant?: Variant;
};

const VARIANT_STYLES: Record<
  Variant,
  { card: string; label: string; value: string; sub: string }
> = {
  default: {
    card: 'border-ink-200 bg-white',
    label: 'text-ink-500',
    value: 'text-ink-900',
    sub: 'text-ink-400',
  },
  green: {
    card: 'border-ink-200 bg-white',
    label: 'text-ink-500',
    value: 'text-green-600',
    sub: 'text-ink-400',
  },
  red: {
    card: 'border-ink-200 bg-white border-l-4 border-l-red-500',
    label: 'text-ink-500',
    value: 'text-red-600',
    sub: 'text-ink-400',
  },
  amber: {
    card: 'border-ink-200 bg-white border-l-4 border-l-amber-400',
    label: 'text-ink-500',
    value: 'text-amber-600',
    sub: 'text-ink-400',
  },
  highlight: {
    card: 'border-blue-200 bg-blue-50',
    label: 'text-blue-600',
    value: 'text-blue-700',
    sub: 'text-blue-500',
  },
};

function KpiCard({ label, value, sub, variant = 'default' }: KpiCardProps) {
  const s = VARIANT_STYLES[variant];
  return (
    <div className={`rounded-xl border px-4 py-4 shadow-sm ${s.card}`}>
      <p className={`text-xs font-medium ${s.label}`}>{label}</p>
      <p className={`mt-1.5 text-3xl font-bold tracking-tight ${s.value}`}>
        {value.toLocaleString()}
      </p>
      <p className={`mt-1 text-xs ${s.sub}`}>{sub}</p>
    </div>
  );
}

export default function FleetKpiStrip({ data }: Props) {
  const {
    total_fleet,
    valid_permits,
    expired_permits,
    never_inspected,
    inspection_in_progress,
  } = data;
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      <KpiCard
        label="Total Fleet"
        value={total_fleet.count}
        sub={`${total_fleet.governorates} governorates · ${total_fleet.clusters} clusters`}
      />
      <KpiCard
        label="Valid Permits"
        value={valid_permits.count}
        sub={`${valid_permits.fleet_percentage}% of fleet`}
        variant="green"
      />
      <KpiCard
        label="Expired Permits"
        value={expired_permits.count}
        sub={`${expired_permits.fleet_percentage}% of fleet`}
        variant="red"
      />
      <KpiCard
        label="Never Inspected"
        value={never_inspected.count}
        sub={`${never_inspected.fleet_percentage}% of fleet`}
        variant="amber"
      />
      <KpiCard
        label="Inspection In Progress"
        value={inspection_in_progress.count}
        sub="Pipeline · not counted in compliance %"
        variant="highlight"
      />
    </div>
  );
}
