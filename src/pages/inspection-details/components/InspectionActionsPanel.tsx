import { useState } from 'react';
import { Button } from '@/atoms';
import type { InspectionDetailsApiResponse } from '@/types/inspection';
import { ApprovePermitModal } from './ApprovePermitModal';
import { CancelInspectionModal } from './CancelInspectionModal';
import { ReassignInspectorModal } from './ReassignInspectorModal';
import { RejectInspectionModal } from './RejectInspectionModal';

type Props = {
  data: InspectionDetailsApiResponse;
  onRefetch: () => void;
  canApprove?: boolean;
  canReject?: boolean;
};

export function InspectionActionsPanel({
  data,
  onRefetch,
  canApprove = true,
  canReject = true,
}: Props) {
  const [approveOpen, setApproveOpen] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);
  const [reassignOpen, setReassignOpen] = useState(false);

  return (
    <>
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
            disabled={!canApprove}
            onClick={() => setApproveOpen(true)}
            className="w-full justify-center"
          >
            ✓ Approve &amp; Generate Permit
          </Button>
          <Button
            variant="danger"
            disabled={!canReject}
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
