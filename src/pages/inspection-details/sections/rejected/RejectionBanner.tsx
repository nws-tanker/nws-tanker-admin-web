import { CloseIcon } from '@/atoms/icons';
import type { InspectionDetailsApiResponse } from '@/types/inspection';

type Props = { data: InspectionDetailsApiResponse };

export function RejectionBanner({ data }: Props) {
  const { reason } = data.rejection;

  return (
    <div className="rounded-card-lg border-[1.5px] border-red-200 bg-red-50 p-5">
      <div className={`flex items-center gap-3 ${reason ? 'mb-2.5' : ''}`}>
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-600">
          <CloseIcon width={16} height={16} stroke="white" strokeWidth={3} />
        </div>
        <div>
          <div className="text-[16px] font-bold text-red-900">
            Inspection Rejected
          </div>
          <div className="mt-0.5 text-[12px] text-red-600">
            This inspection was rejected and cannot be modified.
          </div>
        </div>
      </div>
      {reason && (
        <div className="rounded-card bg-red-200 px-3.5 py-2.5 text-[12px] leading-relaxed text-red-900">
          {reason}
        </div>
      )}
    </div>
  );
}
