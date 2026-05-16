import { Button, Modal } from '@/atoms';
import { DownloadIcon } from '@/atoms/icons';

type Props = {
  open: boolean;
  onClose: () => void;
  url: string;
  permitNumber: string;
  onDownload: () => void;
  downloading?: boolean;
};

export function PermitReportModal({
  open,
  onClose,
  url,
  permitNumber,
  onDownload,
  downloading,
}: Props) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Permit Report"
      subtitle={permitNumber}
      width={960}
      footer={
        <>
          <Button variant="secondary" size="md" onClick={onClose}>
            Close
          </Button>
          <Button
            variant="primary"
            size="md"
            leftIcon={<DownloadIcon width={14} height={14} />}
            onClick={onDownload}
            disabled={downloading}
          >
            {downloading ? 'Downloading…' : 'Download'}
          </Button>
        </>
      }
    >
      <div className="-mx-6 -my-5">
        <iframe
          src={url}
          title="Permit Report"
          className="h-[75vh] w-full border-0"
        />
      </div>
    </Modal>
  );
}
