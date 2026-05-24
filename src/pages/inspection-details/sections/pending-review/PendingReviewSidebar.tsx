import { NotifyOwnerPanel } from '../../components/NotifyOwnerPanel';
import { WhatHappensNextPanel } from '../../components/WhatHappensNextPanel';
import type { InspectionDetailsApiResponse } from '@/types/inspection';
import { InspectionInfoPanel } from '../../components/InspectionInfoPanel';
import { FailedItemsBanner } from '../../components/FailedItemsBanner';
import { InspectionActionsPanel } from '../../components/InspectionActionsPanel';

const NEXT_STEPS = [
  'If approved, a permit will be generated',
  'QR code will be created for verification',
  'Inspector will be notified of decision',
  'Tanker owner can collect permit',
];

type Props = { data: InspectionDetailsApiResponse; onRefetch: () => void };

export function PendingReviewSidebar({ data, onRefetch }: Props) {
  return (
    <div className="flex flex-col gap-3">
      <FailedItemsBanner data={data} />
      <InspectionActionsPanel data={data} onRefetch={onRefetch} />
      <InspectionInfoPanel data={data} />
      <WhatHappensNextPanel items={NEXT_STEPS} />
      <NotifyOwnerPanel data={data} />
    </div>
  );
}
