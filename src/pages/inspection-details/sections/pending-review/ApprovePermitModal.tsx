import { useState } from 'react';
import { Modal } from '@/atoms/Modal';
import { approveInspection } from '@/services/inspectionService';
import type { InspectionDetailsApiResponse } from '@/types/inspection';

type Props = {
  open: boolean;
  onClose: () => void;
  data: InspectionDetailsApiResponse;
  onSuccess: () => void;
};

export function ApprovePermitModal({ open, onClose, data, onSuccess }: Props) {
  const { tanker, assignment } = data;
  const hasWhatsApp = !!tanker.owner.whatsapp;
  const [approving, setApproving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClose = () => {
    if (approving) return;
    setError(null);
    onClose();
  };

  const handleConfirm = async () => {
    setApproving(true);
    setError(null);
    try {
      const res = await approveInspection(data.id);
      if (!res.success) {
        setError(
          res.error?.description ?? 'Approval failed. Please try again.',
        );
        return;
      }
      onClose();
      onSuccess();
    } catch {
      setError('Approval failed. Please try again.');
    } finally {
      setApproving(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Approve & Generate Permit"
      subtitle={`${tanker.plate} — ${data.id}`}
      width={480}
      footer={
        <>
          <button
            type="button"
            onClick={handleClose}
            disabled={approving}
            className="h-9 rounded-lg border border-ink-200 bg-white px-4 text-[13px] font-medium text-ink-700 hover:bg-ink-50 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={approving}
            className="h-9 rounded-lg bg-teal-700 px-4 text-[13px] font-semibold text-white hover:bg-teal-800 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {approving ? 'Approving…' : 'Confirm Approval'}
          </button>
        </>
      }
    >
      <div className="flex flex-col gap-4 text-[13px] text-ink-700 leading-relaxed">
        <p>
          Approving this inspection will generate a permit for{' '}
          <strong>{tanker.plate}</strong> valid for 12 months.
        </p>

        <div className="rounded-lg border border-ink-100 bg-ink-50 px-4 py-3 flex flex-col gap-1">
          <div className="text-[11px] font-semibold uppercase tracking-wide text-ink-400 mb-1">
            Tanker Details
          </div>
          <div className="flex gap-6">
            <div>
              <div className="text-[10px] text-ink-400 uppercase tracking-wide">
                Plate
              </div>
              <div className="font-mono text-[14px] font-bold text-ink-800">
                {tanker.plate}
              </div>
            </div>
            <div>
              <div className="text-[10px] text-ink-400 uppercase tracking-wide">
                Type
              </div>
              <div className="text-[13px] font-medium text-ink-700">
                {tanker.type}
              </div>
            </div>
            <div>
              <div className="text-[10px] text-ink-400 uppercase tracking-wide">
                Inspector
              </div>
              <div className="text-[13px] font-medium text-ink-700">
                {assignment.inspector_name}
              </div>
            </div>
          </div>
        </div>

        <p className="text-[12px] text-ink-500">
          {hasWhatsApp
            ? `📱 Permit will be sent automatically via WhatsApp to ${tanker.owner.whatsapp}.`
            : '⚠️ No WhatsApp number on record — permit cannot be sent automatically.'}
        </p>

        {error && (
          <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-[12px] text-red-600">
            {error}
          </p>
        )}
      </div>
    </Modal>
  );
}
