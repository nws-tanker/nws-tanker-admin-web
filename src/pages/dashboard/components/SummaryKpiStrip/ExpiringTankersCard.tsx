import type { SummaryResponse } from '@/types/executiveDashboard';
import Sparkline from '@/assets/icons/Sparkline';

const SPARK_VALUES = [310, 330, 345, 360, 355, 370, 375, 381];

type Props = { expiryTankers: SummaryResponse['expiry_tankers'] };

export default function ExpiringTankersCard({ expiryTankers }: Props) {
  return (
    <div
      className="relative overflow-hidden rounded-card-lg border border-ink-200 bg-white px-4 py-4 shadow-card-sm"
      style={{ borderLeftWidth: 3, borderLeftColor: '#f59e0b' }}
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
