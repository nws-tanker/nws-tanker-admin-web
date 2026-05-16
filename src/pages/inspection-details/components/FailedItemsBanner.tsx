import type { InspectionDetailsApiResponse } from '@/types/inspection';

type Props = { data: InspectionDetailsApiResponse };

export function FailedItemsBanner({ data }: Props) {
  const failedCount = data.inspection.checklistStatus.fail ?? 0;
  if (failedCount <= 0) return null;

  return (
    <div className="flex gap-2.5 rounded-card border border-amber-100 bg-amber-50 p-3.5">
      <span style={{ fontSize: 18 }} className="shrink-0">
        ⚠️
      </span>
      <div>
        <p className="text-[12px] font-bold text-amber-700">Failed Items</p>
        <p className="mt-0.5 text-[11px] text-amber-600">
          This inspection has {failedCount} failed item
          {failedCount > 1 ? 's' : ''}. Consider carefully before approving.
        </p>
      </div>
    </div>
  );
}
