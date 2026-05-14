import type { InspectionDetailsApiResponse } from '@/types/inspection';
import { formatDate } from '@/utils';

type Props = { data: InspectionDetailsApiResponse };

export function RecordLocked({ data }: Props) {
  const { physical_date, inspector_name } = data.assignment;

  return (
    <div className="flex items-center gap-2 rounded-card border border-green-200 bg-green-50 px-3.5 py-2">
      <span className="text-[14px]">🔒</span>
      <span className="text-[12px] font-medium text-green-900">
        Record locked — submitted on {formatDate(physical_date)} by{' '}
        {inspector_name} (Inspector)
      </span>
    </div>
  );
}
