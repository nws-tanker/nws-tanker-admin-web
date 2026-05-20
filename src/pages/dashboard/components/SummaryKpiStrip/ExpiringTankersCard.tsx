import type { SummaryResponse } from '@/types/executiveDashboard';
import Sparkline from '@/assets/icons/Sparkline';

const SPARK_VALUES = [310, 330, 345, 360, 355, 370, 375, 381];

type Props = {
  expiryTankers: SummaryResponse['expiry_tankers'];
  onClick?: () => void;
};

export default function ExpiringTankersCard({ expiryTankers, onClick }: Props) {
  return (
    <div
      className={`relative overflow-hidden rounded-card-lg border border-ink-200 bg-white px-4 py-4 shadow-card-sm${onClick ? ' cursor-pointer transition-shadow hover:shadow-md hover:ring-1 hover:ring-teal-700/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600' : ''}`}
      style={{ borderLeftWidth: 3, borderLeftColor: '#f59e0b' }}
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
        Expiring ≤ {expiryTankers.expire_duration} days
      </p>
      <div className="mt-1.5">
        <span className="text-3xl font-bold tracking-tight text-ink-800">
          {expiryTankers.renewal_tankers.toLocaleString()}
        </span>
      </div>
      <p className="mt-1.5 text-xs text-ink-500">Renewal queue</p>
      <Sparkline values={SPARK_VALUES} color="#f59e0b" />
    </div>
  );
}
