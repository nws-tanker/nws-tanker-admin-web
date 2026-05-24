import type { TankerTypeCompliance } from '@/types/executiveDashboard';
import { getHealthConfig } from '@/pages/dashboard/healthHelpers';
import { ProgressBar } from '@/common-components/ProgressBar';

export type CardConfig = {
  key: 'dw' | 'sw' | 'te';
  label: string;
  chip: { background: string; color: string; borderColor: string };
};

export const CARD_CONFIGS: CardConfig[] = [
  {
    key: 'dw',
    label: 'DW · Drinking Water',
    chip: {
      background: '#2563EB15',
      color: '#2563EB',
      borderColor: '#2563EB30',
    },
  },
  {
    key: 'sw',
    label: 'SW · Sewage Water',
    chip: {
      background: '#D9770615',
      color: '#D97706',
      borderColor: '#D9770630',
    },
  },
  {
    key: 'te',
    label: 'TE · Treated Effluent',
    chip: {
      background: '#05966915',
      color: '#059669',
      borderColor: '#05966930',
    },
  },
];

const BAR_COLOR = {
  on_track: 'green',
  at_risk: 'amber',
  critical: 'red',
} as const;

type Props = { config: CardConfig; metrics: TankerTypeCompliance };

export default function TankerCard({ config, metrics }: Props) {
  const h = getHealthConfig(metrics.tanker_health_percentage);
  return (
    <div className="rounded border border-ink-100 p-4">
      <div className="mb-2.5 flex items-center justify-between">
        <span
          className="rounded-full border px-2.5 py-0.5 text-xs font-medium"
          style={config.chip}
        >
          {config.label}
        </span>
        <span className="text-[22px] font-semibold leading-none tracking-[-0.02em] text-ink-900">
          {metrics.tanker_health_percentage}%
        </span>
      </div>

      <ProgressBar
        value={metrics.tanker_health_percentage}
        color={BAR_COLOR[h.status]}
      />

      <div className="mt-3 flex flex-wrap gap-4 text-xs">
        <div>
          <span className="text-ink-500">Total </span>
          <span className="font-semibold tabular-nums text-ink-900">
            {metrics.target.toLocaleString()}
          </span>
        </div>
        <div>
          <span className="text-ink-500">Valid </span>
          <span className="font-semibold tabular-nums text-ink-900">
            {metrics.valid.toLocaleString()}
          </span>
        </div>
        <div>
          <span className="text-ink-500">Expired </span>
          <span className="font-semibold tabular-nums text-red-600">
            {metrics.expired.toLocaleString()}
          </span>
        </div>
        <div>
          <span className="text-ink-500">N.I. </span>
          <span className="font-semibold tabular-nums text-red-600">
            {metrics.never_inspected.toLocaleString()}
          </span>
        </div>
        <div>
          <span className="text-ink-500">In Progress </span>
          <span className="font-semibold tabular-nums text-amber-600">
            {metrics.in_progress.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}
