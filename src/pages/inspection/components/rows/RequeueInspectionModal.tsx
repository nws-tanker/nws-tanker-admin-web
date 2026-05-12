import { useState } from 'react';
import { Modal } from '@/atoms';
import { requeueInspection } from '@/services/inspectionService';
import type { ApiInspectionRecord } from '@/types/inspection';

type Props = {
  open: boolean;
  onClose: () => void;
  record: ApiInspectionRecord;
  onSuccess?: () => void;
};

const TANKER_TYPE_LABEL: Record<string, string> = {
  DW: 'Drinking Water',
  SW: 'Sewage Water',
  TE: 'Treated Effluent',
};

export default function RequeueInspectionModal({
  open,
  onClose,
  record,
  onSuccess,
}: Props) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isLabRejection = record.rejection_stage === 'lab_results';
  const typeLabel = TANKER_TYPE_LABEL[record.tanker_type] ?? record.tanker_type;

  const handleClose = () => {
    if (submitting) return;
    setError(null);
    onClose();
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError(null);
    try {
      const res = await requeueInspection(record.id);
      if (!res.success) {
        setError(
          res.error?.description ??
            'Failed to queue re-inspection. Please try again.',
        );
        return;
      }
      handleClose();
      onSuccess?.();
    } catch {
      setError('Failed to queue re-inspection. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Queue Re-inspection"
      subtitle={`${record.plate} · ${typeLabel} · ${record.cluster}`}
      width={520}
      footer={
        <>
          <button
            type="button"
            onClick={handleClose}
            disabled={submitting}
            className="h-9 rounded-lg border border-ink-200 bg-white px-4 text-[13px] font-medium text-ink-700 hover:bg-ink-50 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting}
            className="h-9 rounded-lg bg-orange-600 px-4 text-[13px] font-semibold text-white hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? 'Queuing…' : 'Confirm & Queue'}
          </button>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        {record.rejection_reason && (
          <div className="rounded-lg border border-orange-300 bg-orange-50 px-4 py-3">
            <div className="mb-1 text-[12px] font-semibold text-orange-800">
              Rejection reason
            </div>
            <div className="text-[12px] leading-relaxed text-orange-700">
              {record.rejection_reason}
            </div>
            {isLabRejection && (
              <div className="mt-2 text-[11px] text-orange-600">
                Rejected at: <strong>Lab Results</strong> — physical inspection
                will be skipped, tanker moves straight to Lab Testing after
                assignment.
              </div>
            )}
          </div>
        )}

        <div className="rounded-lg border border-ink-200 bg-ink-50 px-4 py-3 text-[13px] text-ink-700">
          This will requeue <strong>{record.plate}</strong> for re-inspection.
          An inspector will be assigned once queued.
        </div>

        {error && (
          <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-[12px] text-red-600">
            {error}
          </p>
        )}
      </div>
    </Modal>
  );
}
