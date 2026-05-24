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

export function LabTestingSidebar({ data, onRefetch }: Props) {
  const labUploaded = !!data.lab.report.id;

  return (
    <div className="flex flex-col gap-3">
      <FailedItemsBanner data={data} />
      {!labUploaded && (
        <div className="bg-[#f5f3ff] border border-[#ddd6fe] rounded-card p-3.5 flex gap-2.5">
          <span style={{ fontSize: 18 }}>📄</span>
          <div>
            <p className="text-[12px] font-bold text-purple-700">
              Lab Report Required
            </p>
            <p className="text-[11px] text-purple-600 mt-0.5">
              Approval and rejection are blocked until lab test report PDF is
              uploaded.
            </p>
          </div>
        </div>
      )}

      <InspectionActionsPanel
        data={data}
        onRefetch={onRefetch}
        canApprove={labUploaded}
        canReject={labUploaded}
      />

      <WhatHappensNextPanel items={NEXT_STEPS} />
      <InspectionInfoPanel data={data} />
      <NotifyOwnerPanel data={data} />
    </div>
  );
}
