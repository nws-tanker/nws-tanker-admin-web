import type { InspectionDetailsApiResponse } from '@/types/inspection';
import { buildSteps } from './buildSteps';
import { TimelineRow } from './TimelineRow';

type Props = { data: InspectionDetailsApiResponse };

export function ActivityTimeline({ data }: Props) {
  const steps = buildSteps(data);

  return (
    <div className="overflow-hidden rounded-card border border-ink-200 shadow-card-sm">
      <div className="border-b border-ink-100 bg-white px-5 py-3.5">
        <span className="text-[14px] font-semibold text-ink-800">
          Activity Timeline
        </span>
      </div>
      <div className="bg-white px-5 py-6">
        {steps.map((step, i) => (
          <TimelineRow
            key={step.key}
            step={step}
            isLast={i === steps.length - 1}
          />
        ))}
      </div>
    </div>
  );
}
