import { CheckIcon } from '@/atoms/icons';
import { InspectionInfoPanel } from '../../components/InspectionInfoPanel';
import type { InspectionDetailsApiResponse } from '@/types/inspection';

type Props = { data: InspectionDetailsApiResponse };

export function ApprovedSidebar({ data }: Props) {
  return (
    <div className="flex flex-col gap-3">
      <div
        className="rounded-card border border-ink-200 shadow-card-sm overflow-hidden bg-white"
        style={{ padding: '14px 16px' }}
      >
        <p className="text-[12px] font-bold text-ink-700 mb-2.5">
          Inspection Status
        </p>
        <div className="flex items-center gap-2 mb-1.5">
          <CheckIcon width={14} height={14} stroke="#059669" strokeWidth={3} />
          <span className="text-[12px] text-ink-600">
            Inspection has been reviewed
          </span>
        </div>
        <div className="flex items-center gap-2 mb-1.5">
          <CheckIcon width={14} height={14} stroke="#059669" strokeWidth={3} />
          <span className="text-[12px] text-ink-600">
            Decision recorded in system
          </span>
        </div>
        <div className="flex items-center gap-2 mb-1.5">
          <CheckIcon width={14} height={14} stroke="#059669" strokeWidth={3} />
          <span className="text-[12px] text-ink-600">
            Inspector has been notified
          </span>
        </div>
        <div className="flex items-center gap-2 mb-1.5">
          <CheckIcon width={14} height={14} stroke="#059669" strokeWidth={3} />
          <span className="text-[12px] text-ink-600">
            Permit has been generated
          </span>
        </div>
      </div>

      <InspectionInfoPanel data={data} />
    </div>
  );
}
