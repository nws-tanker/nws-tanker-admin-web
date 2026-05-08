import { useState } from 'react';
import { Modal } from '@/atoms/Modal';
import { cancelInspection } from '@/services/inspectionService';
import type { InspectionDetailsApiResponse } from '@/types/inspection';

type Props = {
  open: boolean;
  onClose: () => void;
  data: InspectionDetailsApiResponse;
  onSuccess: () => void;
};

export function CancelInspectionModal({
  open,
  onClose,
  data,
  onSuccess,
}: Props) {
  const { tanker } = data;
  const [reason, setReason] = useState('');
  const [reasonError, setReasonError] = useState(false);
  const [cancelling, setCancelling] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClose = () => {
    if (cancelling) return;
    setReason('');
    setReasonError(false);
    setError(null);
    onClose();
  };

  const handleConfirm = async () => {
    if (!reason.trim()) {
      setReasonError(true);
      return;
    }
    setCancelling(true);
    setError(null);
    try {
      const res = await cancelInspection(data.id, reason.trim());
      if (!res.success) {
        setError(
          res.error?.description ?? 'Cancellation failed. Please try again.',
        );
        return;
      }
      onClose();
      onSuccess();
    } catch {
      setError('Cancellation failed. Please try again.');
    } finally {
      setCancelling(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Cancel Inspection"
      subtitle={`${tanker.plate} — ${data.id}`}
      width={460}
      footer={
        <>
          <button
            type="button"
            onClick={handleClose}
            disabled={cancelling}
            className="h-9 rounded-lg border border-ink-200 bg-white px-4 text-[13px] font-medium text-ink-700 hover:bg-ink-50 disabled:opacity-50"
          >
            Go Back
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={cancelling}
            className="h-9 rounded-lg bg-red-600 px-4 text-[13px] font-semibold text-white hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {cancelling ? 'Cancelling…' : 'Confirm Cancellation'}
          </button>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-start gap-3">
          <span className="text-[22px] leading-none mt-0.5">🔴</span>
          <p className="text-[13px] text-ink-700 leading-relaxed">
            This will permanently cancel this inspection. It remains visible
            with <strong>Cancelled</strong> status and cannot be resumed.
          </p>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[12px] font-semibold text-ink-700">
            Cancellation Reason <span className="text-red-600">*</span>
          </label>
          <p className="text-[11px] text-ink-500">
            This reason will be recorded in the audit trail and visible to all
            stakeholders.
          </p>
          <textarea
            rows={3}
            value={reason}
            onChange={(e) => {
              setReason(e.target.value);
              if (e.target.value.trim()) setReasonError(false);
            }}
            placeholder="Enter reason…"
            className={`w-full resize-vertical rounded-lg border px-3 py-2 text-[13px] text-ink-700 placeholder:text-ink-300 focus:outline-none focus:ring-2 ${
              reasonError
                ? 'border-red-500 focus:border-red-500 focus:ring-red-100'
                : 'border-ink-200 focus:border-ink-400 focus:ring-ink-100'
            }`}
          />
          {reasonError && (
            <p className="text-[11px] text-red-600">
              Please enter a cancellation reason.
            </p>
          )}
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
