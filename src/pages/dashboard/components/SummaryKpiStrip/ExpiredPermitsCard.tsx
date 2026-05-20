import type { SummaryResponse } from '@/types/executiveDashboard';
import Sparkline from '@/assets/icons/Sparkline';

const SPARK_VALUES = [380, 420, 400, 450, 430, 460, 445, 440];

type Props = {
  permitDetail: SummaryResponse['permit_detail'];
  onClick?: () => void;
};

export default function ExpiredPermitsCard({ permitDetail, onClick }: Props) {
  return (
    <div
      className={`relative overflow-hidden rounded-card-lg border border-ink-200 bg-white px-4 py-4 shadow-card-sm${onClick ? ' cursor-pointer transition-shadow hover:shadow-md hover:ring-1 hover:ring-teal-700/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600' : ''}`}
      style={{ borderLeftWidth: 3, borderLeftColor: '#ef4444' }}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
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
