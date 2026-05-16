import { CheckIcon } from '@/atoms/icons';

export function ApprovalBanner() {
  return (
    <div className="rounded-card-lg border-[1.5px] border-green-200 bg-green-50 p-5">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-600">
          <CheckIcon width={16} height={16} stroke="white" strokeWidth={3} />
        </div>
        <div>
          <div className="text-[16px] font-bold text-green-900">
            Inspection Approved
          </div>
          <div className="mt-0.5 text-[12px] text-green-700">
            This inspection has been approved and a permit has been generated.
          </div>
        </div>
      </div>
    </div>
  );
}
