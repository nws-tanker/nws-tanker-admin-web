import type { InspectionDetailsApiResponse } from '@/types/inspection';
import { formatDate } from '@/utils';

type Props = { data: InspectionDetailsApiResponse };

export function InspectionSummaryTiles({ data }: Props) {
  const { assignment, inspection } = data;
  const passed = inspection.checklistStatus.pass;
  const failed = inspection.checklistStatus.fail ?? 0;
  const total = passed + failed;
  const passRate = total > 0 ? Math.round((passed / total) * 100) : 0;

  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-card border-[1.5px] border-green-300 bg-green-50 p-4">
          <div className="mb-1 text-[11px] font-bold uppercase text-green-700">
            Passed
          </div>
          <div className="text-[44px] font-bold leading-none text-green-600">
            {passed}
          </div>
          <div className="mt-1 text-[11px] text-green-700">
            {passRate}% pass rate
          </div>
        </div>
        <div className="rounded-card border-[1.5px] border-red-200 bg-red-50 p-4">
          <div className="mb-1 text-[11px] font-bold uppercase text-red-800">
            Failed
          </div>
          <div className="text-[44px] font-bold leading-none text-red-600">
            {failed}
          </div>
          <div className="mt-1 text-[11px] text-red-800">
            {failed === 0 ? 'All items passed' : 'Requires attention'}
          </div>
        </div>
      </div>
      <div className="text-[12px] text-ink-400">
        Inspection date: {formatDate(assignment.physical_date)} · Inspector:{' '}
        {assignment.inspector_name}
      </div>
    </div>
  );
}
