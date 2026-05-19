import type { SummaryResponse } from '@/types/executiveDashboard';
import Sparkline from '@/assets/icons/Sparkline';

const SPARK_VALUES = [380, 420, 400, 450, 430, 460, 445, 440];

type Props = { permitDetail: SummaryResponse['permit_detail'] };

export default function ExpiredPermitsCard({ permitDetail }: Props) {
  return (
    <div
      className="relative overflow-hidden rounded-card-lg border border-ink-200 bg-white px-4 py-4 shadow-card-sm"
      style={{ borderLeftWidth: 3, borderLeftColor: '#ef4444' }}
    >
      <p className="text-[10px] font-semibold uppercase tracking-widest text-ink-400">
        Expired Permits
      </p>
      <div className="mt-1.5 flex items-baseline gap-2">
        <span className="text-3xl font-bold tracking-tight text-ink-800">
          {permitDetail.expired_permits.toLocaleString()}
        </span>
        <span className="text-sm text-ink-500">
          {permitDetail.expired_fleet_percentage}% fleet
        </span>
      </div>
      <p className="mt-1.5 text-xs font-medium text-red-600">
        Action required · {permitDetail.expired_cluster_count} in{' '}
        {permitDetail.cluster_name}
      </p>
      <Sparkline values={SPARK_VALUES} color="#ef4444" />
    </div>
  );
}
