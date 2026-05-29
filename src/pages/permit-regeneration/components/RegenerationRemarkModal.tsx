import { useEffect, useState } from 'react';
import { Button, Modal, Textarea } from '@/atoms';

type Props = {
  open: boolean;
  selectedCount: number;
  isSubmitting: boolean;
  onClose: () => void;
  onConfirm: (remark: string) => void;
};

export function RegenerationRemarkModal({
  open,
  selectedCount,
  isSubmitting,
  onClose,
  onConfirm,
}: Props) {
  const [remark, setRemark] = useState('');
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (!open) {
      setRemark('');
      setTouched(false);
    }
  }, [open]);

  const trimmed = remark.trim();
  const isInvalid = touched && trimmed.length === 0;

  const handleConfirm = () => {
    if (trimmed.length === 0) {
      setTouched(true);
      return;
    }
    onConfirm(trimmed);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Regenerate Permits"
      subtitle={`A remark is required to regenerate ${selectedCount} permit${selectedCount === 1 ? '' : 's'}.`}
      footer={
        <>
          <Button variant="ghost" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleConfirm}
            disabled={isSubmitting || trimmed.length === 0}
          >
            {isSubmitting ? 'Regenerating...' : 'Confirm & Regenerate'}
          </Button>
        </>
      }
    >
      <label className="flex flex-col gap-1.5">
        <span className="text-[12px] font-medium text-ink-700">
          Regeneration remark <span className="text-red-500">*</span>
        </span>
        <Textarea
          rows={4}
          value={remark}
          onChange={(e) => setRemark(e.target.value)}
          onBlur={() => setTouched(true)}
          placeholder="Explain why these permits are being regenerated"
          invalid={isInvalid}
          autoFocus
        />
        {isInvalid && (
          <span className="text-[11px] text-red-500">Remark is required.</span>
        )}
      </label>
    </Modal>
  );
}
