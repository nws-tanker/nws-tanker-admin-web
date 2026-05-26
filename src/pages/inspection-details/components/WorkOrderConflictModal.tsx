import { Button, Modal } from '@/atoms';

type Props = {
  open: boolean;
  uploading: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export function WorkOrderConflictModal({
  open,
  uploading,
  onCancel,
  onConfirm,
}: Props) {
  return (
    <Modal
      open={open}
      width={420}
      onClose={() => !uploading && onCancel()}
      title={
        <span className="text-amber-700">Work order reference mismatch</span>
      }
      footer={
        <div className="flex w-full justify-end gap-2">
          <Button variant="secondary" onClick={onCancel} disabled={uploading}>
            Cancel
          </Button>
          <Button variant="primary" onClick={onConfirm} disabled={uploading}>
            {uploading ? 'Uploading…' : 'Upload anyway'}
          </Button>
        </div>
      }
    >
      <p className="text-[13px] leading-relaxed text-ink-600">
        The work order reference id does not match in the document. Are you sure
        you still want to upload?
      </p>
    </Modal>
  );
}
