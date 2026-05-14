import { Button } from '@/atoms';
import { InspectionInfoPanel } from '../../components/InspectionInfoPanel';
import type { InspectionDetailsApiResponse } from '@/types/inspection';

type Props = { data: InspectionDetailsApiResponse };

export function PendingInspectionSidebar({ data }: Props) {
  return (
    <div className="flex flex-col gap-3">
      <InspectionInfoPanel data={data} />

      <div className="rounded-card border border-ink-200 shadow-card-sm overflow-hidden bg-white">
        <div className="bg-ink-50 border-b border-ink-100 px-4 py-2.5">
          <span className="text-[11px] font-bold tracking-widest uppercase text-ink-500">
            ACTIONS
          </span>
        </div>
        <div className="p-3.5 flex flex-col gap-2">
          <Button variant="secondary" className="w-full justify-center">
            Cancel Inspection
          </Button>
          <Button variant="secondary" className="w-full justify-center">
            Reassign Inspector
          </Button>
        </div>
      </div>
    </div>
  );
}
