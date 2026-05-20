import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { MonthlyInspectionTrendResponse } from '@/types/executiveDashboard';
import LegendLine from '@/assets/icons/LegendLine';

type Props = {
  data: MonthlyInspectionTrendResponse;
  subtitle?: string;
};

const SERIES = [
  {
    key: 'approved' as const,
    label: 'Approved',
    color: '#10B981',
    dash: undefined,
  },
  {
    key: 'rejected' as const,
    label: 'Rejected',
    color: '#EF4444',
    dash: undefined,
  },
  {
    key: 'lab_pending' as const,
    label: 'Lab Pending',
    color: '#F59E0B',
    dash: '4 4',
  },
];

export default function MonthlyInspectionTrend({ data, subtitle }: Props) {
  const { series, totals, y_axis } = data;
  const yDomain: [number, number] = [0, y_axis[y_axis.length - 1]];

  const subtitleText = subtitle
    ? `${subtitle} · Approved · Rejected · Lab Pending`
    : 'Approved · Rejected · Lab Pending';

  return (
    <div className="rounded-card-lg border border-ink-200 bg-white p-5 shadow-card-sm">
      <div className="mb-4 flex items-start justify-between gap-4">
        <h3 className="font-semibold text-ink-800">Monthly Inspection Trend</h3>
        <span className="shrink-0 text-xs text-ink-400">{subtitleText}</span>
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <LineChart
          data={series}
          margin={{ top: 4, right: 8, left: -16, bottom: 0 }}
        >
          <CartesianGrid vertical={false} stroke="#E5E7EB" strokeDasharray="" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: '#6B7280' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            ticks={y_axis}
            domain={yDomain}
            tick={{ fontSize: 12, fill: '#6B7280' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              fontSize: 12,
              borderRadius: 8,
              border: '1px solid #E5E7EB',
            }}
          />
          {SERIES.map(({ key, color, dash }) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              stroke={color}
              strokeWidth={2}
              strokeDasharray={dash}
              dot={{ r: 3.5, fill: color, strokeWidth: 0 }}
              activeDot={{ r: 5, strokeWidth: 0 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>

      <div className="mt-4 flex items-center justify-between gap-4">
        <div className="flex flex-wrap gap-5">
          {SERIES.map(({ key, label, color, dash }) => (
            <div key={key} className="flex items-center gap-1.5">
              <LegendLine color={color} dash={dash} />
              <span className="text-xs text-ink-500">{label}</span>
            </div>
          ))}
        </div>
        <div className="flex shrink-0 items-center gap-1.5 text-xs text-ink-400">
          {SERIES.map(({ key, label, color }, i) => (
            <span key={key} className="flex items-center gap-1">
              {i > 0 && <span className="mx-1">·</span>}
              <span>{label}:</span>
              <span className="font-bold" style={{ color }}>
                {totals[key].toLocaleString()}
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
