import { Button, Modal } from '@/atoms';

type Props = {
  open: boolean;
  onClose: () => void;
  url: string;
  plateNumber: string;
  permitNumber: string;
};

export function PermitPdfModal({
  open,
  onClose,
  url,
  plateNumber,
  permitNumber,
}: Props) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={`Permit · ${plateNumber}`}
      subtitle={permitNumber}
      width={960}
      footer={
        <Button variant="secondary" size="md" onClick={onClose}>
          Close
        </Button>
      }
    >
      <div className="-mx-6 -my-5">
        {url ? (
          <iframe
            src={url}
            title={`Permit ${permitNumber}`}
            className="h-[75vh] w-full border-0"
          />
        ) : (
          <div className="grid h-[75vh] place-items-center text-[13px] text-ink-500">
            Permit PDF is not available
          </div>
        )}
      </div>
    </Modal>
  );
}
