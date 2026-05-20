import type { ComplianceByTankerTypeResponse } from '@/types/executiveDashboard';
import TankerCard, { CARD_CONFIGS } from './TankerCard';

type Props = { data: ComplianceByTankerTypeResponse; subtitle?: string };

export default function FleetTankerTypeCompliance({
  data,
  subtitle = 'Fleet-wide · all clusters',
}: Props) {
  return (
    <div className="rounded-card-lg border border-ink-200 bg-white shadow-card-sm">
      <div className="flex items-center justify-between border-b border-ink-100 px-5 py-4">
        <h3 className="text-sm font-semibold text-ink-800">
          Compliance by Tanker Type
        </h3>
        <span className="text-xs text-ink-400">{subtitle}</span>
      </div>
      <div className="grid grid-cols-1 gap-4 p-5 md:grid-cols-3">
        {CARD_CONFIGS.map((cfg) => (
          <TankerCard key={cfg.key} config={cfg} metrics={data[cfg.key]} />
        ))}
      </div>
    </div>
  );
}
