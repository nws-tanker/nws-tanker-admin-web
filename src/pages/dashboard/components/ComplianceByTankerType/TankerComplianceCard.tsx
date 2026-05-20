import type { TankerTypeCompliance } from '@/types/executiveDashboard';
import { StatusBadge } from '@/common-components/StatusBadge';
import { getHealthConfig } from '../../healthHelpers';
import DonutRing from '@/assets/icons/DonutRing';
import StatCell from './StatCell';

const TANKER_LABELS: Record<string, string> = {
  dw: 'Drinking Water',
  sw: 'Sewage Water',
  te: 'Treated Effluent',
};

const TANKER_COLORS: Record<string, string> = {
  dw: '#2563eb',
  sw: '#d97706',
  te: '#059669',
};

const TANKER_CHIP: Record<string, string> = {
  dw: 'bg-blue-50 text-blue-700 border-blue-200',
  sw: 'bg-amber-50 text-amber-700 border-amber-200',
  te: 'bg-emerald-50 text-emerald-700 border-emerald-200',
};

type Props = { tankerKey: string; metrics: TankerTypeCompliance };

export default function TankerComplianceCard({ tankerKey, metrics }: Props) {
  const health = getHealthConfig(metrics.tanker_health_percentage);
  const color = TANKER_COLORS[tankerKey];
  const chipClass = TANKER_CHIP[tankerKey];

  return (
    <div className="rounded-lg border border-ink-100 bg-white p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className={`rounded border px-1.5 py-0.5 text-xs font-semibold ${chipClass}`}
          >
            {tankerKey.toUpperCase()}
          </span>
          <span className="text-sm font-semibold text-ink-800">
            {TANKER_LABELS[tankerKey]}
          </span>
        </div>
        <StatusBadge
          label={health.label}
          dotClass={health.dotClass}
          bgClass={health.bgClass}
          borderClass={health.borderClass}
          textClass={health.textClass}
        />
      </div>
      <div className="flex items-center gap-5">
        <DonutRing value={metrics.tanker_health_percentage} color={color} />
        <div className="grid flex-1 grid-cols-2 gap-x-4 gap-y-2">
          <StatCell label="Target" value={metrics.target} />
          <StatCell label="Valid" value={metrics.valid} />
          <StatCell label="Expired" value={metrics.expired} red />
          <StatCell label="No permit" value={metrics.no_permit} red />
        </div>
      </div>
    </div>
  );
}
