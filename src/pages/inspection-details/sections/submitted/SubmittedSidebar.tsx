import { useState } from 'react';
import { Button } from '@/atoms';
import { NotifyOwnerPanel } from '../../components/NotifyOwnerPanel';
import { WhatHappensNextPanel } from '../../components/WhatHappensNextPanel';
import type { InspectionDetailsApiResponse } from '@/types/inspection';
import { InspectionInfoPanel } from '../../components/InspectionInfoPanel';
import { CancelInspectionModal } from '../pending-review/CancelInspectionModal';
import { ReassignInspectorModal } from '../pending-review/ReassignInspectorModal';
import { RejectInspectionModal } from '../pending-review/RejectInspectionModal';

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
  const [rejectOpen, setRejectOpen] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);
  const [reassignOpen, setReassignOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-3">
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
              disabled
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
