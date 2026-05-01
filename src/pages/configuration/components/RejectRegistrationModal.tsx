import { useState } from 'react';
import { Button, Modal, Textarea } from '@/atoms';
import type { PendingRequest } from '../configurationHelpers';

type Props = {
  request: PendingRequest | null;
  submitting?: boolean;
  onConfirm: (id: string, reason: string) => void;
  onClose: () => void;
};

export function RejectRegistrationModal({
  request,
  submitting = false,
  onConfirm,
  onClose,
}: Props) {
  const [reason, setReason] = useState('');
  const [invalid, setInvalid] = useState(false);

  const handleConfirm = () => {
    if (!reason.trim() || !request) {
      setInvalid(true);
      return;
    }
    onConfirm(request.userID, reason.trim());
  };

  const handleClose = () => {
    if (submitting) return;
    setReason('');
    setInvalid(false);
    onClose();
  };

  return (
    <Modal
      open={request !== null}
      title="Reject Registration"
      subtitle={request ? `Request from ${request.name}` : undefined}
      width={500}
      onClose={handleClose}
      footer={
        <>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirm}>
            Confirm Rejection
          </Button>
        </>
      }
    >
      {request && (
        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-medium text-ink-700">
            Reason for rejection <span className="text-red-500">*</span>
          </label>
          <Textarea
            rows={4}
            value={reason}
            onChange={(e) => {
              setReason(e.target.value);
              setInvalid(false);
            }}
            placeholder="Provide a reason that will be communicated to the applicant..."
            invalid={invalid}
          />
          {invalid && (
            <p className="text-[11px] text-red-500">Please provide a reason</p>
          )}
        </div>
      )}
    </Modal>
  );
}
