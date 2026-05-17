import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
import type { ComplianceByType } from '@/types/dashboard';
import {
  formatNumber,
  formatPct,
  ragStatusLabel,
  ragToneClass,
} from '../executiveDashboardHelpers';

const TYPE_COLORS: Record<string, string> = {
  DW: '#2563EB',
  SW: '#D97706',
  TE: '#0A5E66',
};

const TYPE_LABELS: Record<string, string> = {
  DW: 'Drinking Water',
  SW: 'Sewage Water',
  TE: 'Treated Effluent',
};

type Props = {
  data: ComplianceByType;
};

export function TankerTypeComplianceCard({ data }: Props) {
  const chartData = [
    { name: 'valid', value: data.valid },
    { name: 'rest', value: Math.max(data.target - data.valid, 0) },
  ];
  const color = TYPE_COLORS[data.type] ?? '#02474E';

  return (
    <article className="rounded-card-lg border border-ink-200 bg-white p-5 shadow-card-sm">
      <header className="mb-3 flex items-start justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-ink-500">
            {data.type}
          </p>
          <h3 className="text-[15px] font-semibold text-ink-900">
            {TYPE_LABELS[data.type]}
          </h3>
        </div>
        <span
          className={`text-[12px] font-medium ${ragToneClass(data.status)}`}
        >
          {ragStatusLabel(data.status)}
        </span>
      </header>

      <div className="flex items-center gap-4">
        <div className="relative h-[88px] w-[88px] shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                innerRadius={28}
                outerRadius={40}
                startAngle={90}
                endAngle={-270}
                strokeWidth={0}
              >
                <Cell fill={color} />
                <Cell fill="#E5E7EB" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <span className="absolute inset-0 flex items-center justify-center text-[18px] font-bold text-ink-900">
            {formatPct(data.complianceRate)}
          </span>
        </div>
        <dl className="grid flex-1 grid-cols-2 gap-x-4 gap-y-2 text-[12px]">
          <Stat label="Target" value={formatNumber(data.target)} tone="ink" />
          <Stat label="Valid" value={formatNumber(data.valid)} tone="green" />
          <Stat label="Expired" value={formatNumber(data.expired)} tone="red" />
          <Stat
            label="No permit"
            value={formatNumber(data.noPermit)}
            tone="ink"
          />
        </dl>
      </div>
    </article>
  );
}

function Stat({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: 'ink' | 'green' | 'red';
}) {
  const valueClass =
    tone === 'green'
      ? 'text-green-700'
      : tone === 'red'
        ? 'text-red-600'
        : 'text-ink-800';
  return (
    <div>
      <dt className="text-ink-400">{label}</dt>
      <dd className={`font-semibold ${valueClass}`}>{value}</dd>
    </div>
  );
}
