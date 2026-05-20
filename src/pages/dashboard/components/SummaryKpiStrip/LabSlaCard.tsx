import type { SummaryResponse } from '@/types/executiveDashboard';
import ChangeIndicator from './ChangeIndicator';
import Sparkline from '@/assets/icons/Sparkline';

const SPARK_VALUES = [88, 87, 86, 86, 85, 85, 84, 84];

type Props = { labSla: SummaryResponse['lab_sla']; onClick?: () => void };

export default function LabSlaCard({ labSla, onClick }: Props) {
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
        Lab SLA Adherence
      </p>
      <div className="mt-1.5 flex items-baseline">
        <span className="text-3xl font-bold tracking-tight text-ink-800">
          {labSla.sla_percentage}%
        </span>
        <ChangeIndicator ratio={labSla.change_ratio} />
      </div>
      <p className="mt-1.5 text-xs text-ink-500">
        Rolling {labSla.rolling_sla_duration}-day · lab tests only
      </p>
      <Sparkline values={SPARK_VALUES} color="#d97706" />
    </div>
  );
}
