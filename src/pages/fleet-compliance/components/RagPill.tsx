import { getHealthConfig } from '@/pages/dashboard/healthHelpers';
import CheckCircleIcon from '@/assets/icons/CheckCircleIcon';
import AlertCircleIcon from '@/assets/icons/AlertCircleIcon';

const ICON_COLOR: Record<string, string> = {
  on_track: '#22c55e',
  at_risk: '#f97316',
  critical: '#ef4444',
};

export default function RagPill({ value }: { value: number }) {
  const h = getHealthConfig(value);
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-ink-200 bg-white px-2.5 py-0.5 text-xs font-semibold text-ink-700">
      {h.icon === 'check' ? (
        <CheckCircleIcon color={ICON_COLOR[h.status]} />
      ) : (
        <AlertCircleIcon color={ICON_COLOR[h.status]} />
      )}
      {value}%
    </span>
  );
}
