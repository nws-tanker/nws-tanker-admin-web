import { NotifyOwnerPanel } from '../../components/NotifyOwnerPanel';
import { WhatHappensNextPanel } from '../../components/WhatHappensNextPanel';
import type { InspectionDetailsApiResponse } from '@/types/inspection';
import { InspectionInfoPanel } from '../../components/InspectionInfoPanel';
import { FailedItemsBanner } from '../../components/FailedItemsBanner';
import { InspectionActionsPanel } from '../../components/InspectionActionsPanel';

const NEXT_STEPS = [
  'Inspection moves to pending review queue',
  'Admin will review submitted data',
  'A decision will be recorded in the system',
  'Inspector will be notified of the outcome',
];

type Props = {
  data: InspectionDetailsApiResponse;
  onRefetch: () => void;
};

export function SubmittedSidebar({ data, onRefetch }: Props) {
  return (
    <div className="flex flex-col gap-3">
      <FailedItemsBanner data={data} />
      <div className="bg-[#fefce8] border border-[#fde68a] rounded-card p-3.5 flex gap-2.5">
        <span style={{ fontSize: 18 }}>⏳</span>
        <div>
          <p className="text-[12px] font-bold text-yellow-700">
            Awaiting Review
          </p>
          <p className="text-[11px] text-yellow-600 mt-0.5">
            This inspection has been submitted and is pending review. Actions
            will be available once it enters review.
          </p>
        </div>
      </div>

      <InspectionActionsPanel
        data={data}
        onRefetch={onRefetch}
        canApprove={false}
      />

      <InspectionInfoPanel data={data} />
      <WhatHappensNextPanel items={NEXT_STEPS} />
      <NotifyOwnerPanel data={data} />
    </div>
  );
}
