import { useState } from 'react';
import { Button, Textarea } from '@/atoms';
import { Modal } from '@/atoms/Modal';
import { rejectInspection } from '@/services/inspectionService';
import type { InspectionDetailsApiResponse } from '@/types/inspection';

type Props = {
  open: boolean;
  onClose: () => void;
  data: InspectionDetailsApiResponse;
  onSuccess: () => void;
};

export function RejectInspectionModal({
  open,
  onClose,
  data,
  onSuccess,
}: Props) {
  const { tanker, lab } = data;
  const isDW = tanker.type === 'DW';
  const labUploaded = !!lab.report.id;

  const [stage, setStage] = useState<'inspection' | 'lab' | null>(null);
  const [reason, setReason] = useState('');
  const [rejecting, setRejecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const stageRequired = isDW && stage === null;
  const canSubmit = !stageRequired && reason.trim().length > 0 && !rejecting;

  function handleClose() {
    if (rejecting) return;
    setStage(null);
    setReason('');
    setError(null);
    onClose();
  }

  async function handleConfirm() {
    if (!canSubmit) return;
    setRejecting(true);
    setError(null);

    const rejectionStage: 'physical_inspection' | 'lab_results' =
      isDW && stage === 'lab' ? 'lab_results' : 'physical_inspection';

    try {
      const res = await rejectInspection(data.id, {
        rejectionStage,
        rejectionReason: reason.trim(),
      });
      if (!res.success) {
        setError(
          res.error?.description ?? 'Rejection failed. Please try again.',
        );
        return;
      }
      onClose();
      onSuccess();
    } catch {
      setError('Rejection failed. Please try again.');
    } finally {
      setRejecting(false);
    }
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Reject Inspection"
      subtitle={`${tanker.plate} — ${data.id}`}
      width={500}
      footer={
        <>
          <Button
            variant="secondary"
            onClick={handleClose}
            disabled={rejecting}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={handleConfirm}
            disabled={!canSubmit}
          >
            {rejecting ? 'Rejecting…' : 'Confirm Rejection'}
          </Button>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        {isDW && (
          <div className="flex flex-col gap-2">
            <div>
              <label className="text-[12px] font-semibold text-ink-700">
                Rejection Stage <span className="text-red-600">*</span>
              </label>
              <p className="mt-0.5 text-[12px] text-ink-500">
                At which step is this DW tanker being rejected?
              </p>
            </div>
            <div className="flex gap-2">
              <label
                className={`flex flex-1 items-center gap-2.5 rounded-lg border px-3 py-2.5 text-[13px] transition-colors ${
                  stage === 'lab'
                    ? 'cursor-not-allowed border-ink-100 text-ink-300'
                    : stage === 'inspection'
                      ? 'cursor-pointer border-red-300 bg-red-50 text-ink-800'
                      : 'cursor-pointer border-ink-200 text-ink-700 hover:bg-ink-50'
                }`}
              >
                <input
                  type="radio"
                  name="rej-stage"
                  value="inspection"
                  disabled={stage === 'lab'}
                  checked={stage === 'inspection'}
                  onChange={() => setStage('inspection')}
                  className="accent-red-600 disabled:opacity-40"
                />
                Physical Inspection
              </label>
              <label
                className={`flex flex-1 items-center gap-2.5 rounded-lg border px-3 py-2.5 text-[13px] transition-colors ${
                  !labUploaded || stage === 'inspection'
                    ? 'cursor-not-allowed border-ink-100 text-ink-300'
                    : stage === 'lab'
                      ? 'cursor-pointer border-red-300 bg-red-50 text-ink-800'
                      : 'cursor-pointer border-ink-200 text-ink-700 hover:bg-ink-50'
                }`}
              >
                <input
                  type="radio"
                  name="rej-stage"
                  value="lab"
                  disabled={!labUploaded || stage === 'inspection'}
                  checked={stage === 'lab'}
                  onChange={() => setStage('lab')}
                  className="accent-red-600 disabled:opacity-40"
                />
                Lab Results
                {!labUploaded && (
                  <span className="text-[11px] text-ink-400">
                    (not uploaded)
                  </span>
                )}
              </label>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-1.5">
          <label className="text-[12px] font-semibold text-ink-700">
            Rejection Reason <span className="text-red-600">*</span>
          </label>
          <p className="text-[12px] text-ink-500">
            The inspector will be notified with this reason.
          </p>
          <Textarea
            rows={4}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Enter rejection reason…"
          />
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
