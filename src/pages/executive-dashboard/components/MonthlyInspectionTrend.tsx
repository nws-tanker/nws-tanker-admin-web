import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { MonthlyTrend } from '@/types/dashboard';
import { formatNumber, trendWindowLabel } from '../executiveDashboardHelpers';

type Props = {
  data: MonthlyTrend | null;
};

export function MonthlyInspectionTrend({ data }: Props) {
  if (!data) {
    return (
      <article className="mb-6 h-[320px] animate-pulse rounded-card-lg border border-ink-200 bg-ink-100" />
    );
  }

  const chartRows = data.points.map((p) => ({
    month: p.month,
    Approved: p.approved,
    Rejected: p.rejected,
    'Lab Pending': p.labPending,
  }));

  const windowLabel = trendWindowLabel(data.windowStart, data.windowEnd);

  return (
    <article className="mb-6 rounded-card-lg border border-ink-200 bg-white p-5 shadow-card-sm">
      <header className="mb-4 flex flex-wrap items-start justify-between gap-2">
        <h2 className="text-[15px] font-semibold text-ink-900">
          Monthly Inspection Trend
        </h2>
        <p className="text-[12px] text-ink-400">
          {windowLabel} · Approved · Rejected · Lab Pending
        </p>
      </header>

      <div className="h-[240px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartRows}
            margin={{ top: 8, right: 16, left: 0, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#E5E7EB"
              vertical={false}
            />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#6B7280' }} />
            <YAxis tick={{ fontSize: 11, fill: '#6B7280' }} />
            <Tooltip />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Line
              type="monotone"
              dataKey="Approved"
              stroke="#16A34A"
              strokeWidth={2}
              dot={{ r: 3 }}
            />
            <Line
              type="monotone"
              dataKey="Rejected"
              stroke="#DC2626"
              strokeWidth={2}
              dot={{ r: 3 }}
            />
            <Line
              type="monotone"
              dataKey="Lab Pending"
              stroke="#D97706"
              strokeWidth={2}
              strokeDasharray="4 4"
              dot={{ r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <footer className="mt-3 flex flex-wrap gap-6 text-[12px]">
        <span>
          <strong className="text-green-700">Approved</strong>{' '}
          {formatNumber(data.totals.approved)}
        </span>
        <span>
          <strong className="text-red-600">Rejected</strong>{' '}
          {formatNumber(data.totals.rejected)}
        </span>
        <span>
          <strong className="text-amber-600">Lab Pending</strong>{' '}
          {formatNumber(data.totals.labPending)}
        </span>
      </footer>
    </article>
  );
}
