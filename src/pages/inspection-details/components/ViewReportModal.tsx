import { Modal } from '@/atoms';

type Props = {
  open: boolean;
  onClose: () => void;
  url: string;
  reportId: string;
};

export function ViewReportModal({ open, onClose, url, reportId }: Props) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Lab Test Report"
      subtitle={reportId}
      width={960}
    >
      <div className="-mx-6 -my-5">
        <iframe
          src={url}
          title="Lab Test Report"
          className="h-[75vh] w-full border-0"
        />
      </div>
    </Modal>
  );
}
