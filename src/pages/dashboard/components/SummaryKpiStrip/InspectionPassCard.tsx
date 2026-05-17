import type { SummaryResponse } from '@/types/executiveDashboard';
import { StatusBadge } from '@/common-components/StatusBadge';
import ChangeIndicator from './ChangeIndicator';
import Sparkline from '@/assets/icons/Sparkline';

const SPARK_VALUES = [82, 84, 83, 86, 85, 87, 88, 89];

type Props = { inspectionPass: SummaryResponse['inspection_pass'] };

export default function InspectionPassCard({ inspectionPass }: Props) {
  return (
    <div className="relative overflow-hidden rounded-card-lg border border-ink-200 bg-white px-4 py-4 shadow-card-sm">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-ink-400">
        Inspection Pass Rate
      </p>
      <div className="mt-1.5 flex items-baseline">
        <span className="text-3xl font-bold tracking-tight text-ink-800">
          {inspectionPass.pass_percentage}%
        </span>
        <ChangeIndicator ratio={inspectionPass.change_ratio} />
      </div>
      <div className="mt-1.5 flex flex-col gap-1 text-xs text-ink-500">
        <span>Rolling {inspectionPass.rolling_date_duration}-day ·</span>
        <StatusBadge
          dotClass="bg-green-500"
          bgClass="bg-green-100"
          borderClass="border-green-500"
          textClass="text-green-700"
          label="Healthy"
        />
      </div>
      <Sparkline values={SPARK_VALUES} color="#059669" />
    </div>
  );
}
