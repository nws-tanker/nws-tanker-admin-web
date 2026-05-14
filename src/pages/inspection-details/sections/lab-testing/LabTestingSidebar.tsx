import { useState } from 'react';
import { Button } from '@/atoms';
import { NotifyOwnerPanel } from '../../components/NotifyOwnerPanel';
import { WhatHappensNextPanel } from '../../components/WhatHappensNextPanel';
import { ApprovePermitModal } from '../../components/ApprovePermitModal';
import { CancelInspectionModal } from '../../components/CancelInspectionModal';
import { ReassignInspectorModal } from '../../components/ReassignInspectorModal';
import { RejectInspectionModal } from '../../components/RejectInspectionModal';
import type { InspectionDetailsApiResponse } from '@/types/inspection';
import { InspectionInfoPanel } from '../../components/InspectionInfoPanel';

const NEXT_STEPS = [
  'If approved, a permit will be generated',
  'QR code will be created for verification',
  'Inspector will be notified of decision',
  'Tanker owner can collect permit',
];

type Props = { data: InspectionDetailsApiResponse; onRefetch: () => void };

export function LabTestingSidebar({ data, onRefetch }: Props) {
  const labUploaded = !!data.lab.report.id;
  const [approveOpen, setApproveOpen] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);
  const [reassignOpen, setReassignOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-3">
        {!labUploaded && (
          <div className="bg-[#f5f3ff] border border-[#ddd6fe] rounded-card p-3.5 flex gap-2.5">
            <span style={{ fontSize: 18 }}>📄</span>
            <div>
              <p className="text-[12px] font-bold text-purple-700">
                Lab Report Required
              </p>
              <p className="text-[11px] text-purple-600 mt-0.5">
                Approval is blocked until lab test report PDF is uploaded.
              </p>
            </div>
          </div>
        )}

        <div className="rounded-card border border-ink-200 shadow-card-sm overflow-hidden bg-white">
          <div className="bg-ink-50 border-b border-ink-100 px-4 py-2.5">
            <span className="text-[11px] font-bold tracking-widest uppercase text-ink-500">
              ACTIONS
            </span>
          </div>
          <div className="flex flex-col gap-2 p-3.5">
            <Button
              variant="primary"
              size="lg"
              disabled={!labUploaded}
              onClick={() => setApproveOpen(true)}
              className="w-full justify-center"
            >
              ✓ Approve &amp; Generate Permit
            </Button>
            <Button
              variant="danger"
              onClick={() => setRejectOpen(true)}
              className="w-full justify-center"
            >
              ✕ Reject Inspection
            </Button>
            <Button
              variant="secondary"
              onClick={() => setCancelOpen(true)}
              className="w-full justify-center"
            >
              Cancel Inspection
            </Button>
            <Button
              variant="secondary"
              onClick={() => setReassignOpen(true)}
              className="w-full justify-center"
            >
              Reassign Inspector
            </Button>
          </div>
        </div>

        <InspectionInfoPanel data={data} />
        <WhatHappensNextPanel items={NEXT_STEPS} />
        <NotifyOwnerPanel data={data} />
      </div>

      <ApprovePermitModal
        open={approveOpen}
        onClose={() => setApproveOpen(false)}
        data={data}
        onSuccess={onRefetch}
      />
      <RejectInspectionModal
        open={rejectOpen}
        onClose={() => setRejectOpen(false)}
        data={data}
        onSuccess={onRefetch}
      />
      <CancelInspectionModal
        open={cancelOpen}
        onClose={() => setCancelOpen(false)}
        data={data}
        onSuccess={onRefetch}
      />
      <ReassignInspectorModal
        open={reassignOpen}
        onClose={() => setReassignOpen(false)}
        data={data}
        onSuccess={onRefetch}
      />
    </>
  );
}
