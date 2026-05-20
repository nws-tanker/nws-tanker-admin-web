import type { SummaryResponse } from '@/types/executiveDashboard';
import { StatusBadge } from '@/common-components/StatusBadge';
import { getHealthConfig } from '../../healthHelpers';
import Sparkline from '@/assets/icons/Sparkline';

const SPARK_VALUES = [70, 72, 71, 74, 73, 75, 76, 76];

type Props = {
  compliance: SummaryResponse['compliance'];
  onClick?: () => void;
};

export default function ComplianceRateCard({ compliance, onClick }: Props) {
  const health = getHealthConfig(compliance.compliance_rate);
  return (
    <div
      className={`relative overflow-hidden rounded-card-lg border border-ink-200 bg-white px-4 py-4 shadow-card-sm${onClick ? ' cursor-pointer transition-shadow hover:shadow-md hover:ring-1 hover:ring-teal-700/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600' : ''}`}
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
        Compliance Rate
      </p>
      <div className="mt-1.5 flex items-baseline">
        <span className="text-3xl font-bold tracking-tight text-ink-800">
          {compliance.compliance_rate}%
        </span>
      </div>
      <div className="mt-1.5 flex flex-col gap-1 text-xs text-ink-500">
        <span>Target ≥ {compliance.threshold_percentage}% ·</span>
        <StatusBadge
          dotClass={health.dotClass}
          bgClass={health.bgClass}
          borderClass={health.borderClass}
          textClass={health.textClass}
          label={health.label}
        />
      </div>
      <Sparkline values={SPARK_VALUES} color="#117680" />
    </div>
  );
}
