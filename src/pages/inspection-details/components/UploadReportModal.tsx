import { useState } from 'react';
import { Button, FileUploadZone, Modal, useToast } from '@/atoms';
import { uploadLabReport } from '@/services/inspectionService';
import { WorkOrderConflictModal } from './WorkOrderConflictModal';

type Props = {
  open: boolean;
  onClose: () => void;
  inspectionId: string;
  onUploadSuccess: () => void;
};

export function UploadReportModal({
  open,
  onClose,
  inspectionId,
  onUploadSuccess,
}: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pendingBypass, setPendingBypass] = useState<boolean>(false);
  const toast = useToast();

  const handleClose = () => {
    if (uploading) return;
    setFile(null);
    setError(null);
    setPendingBypass(false);
    onClose();
  };

  const handleUpload = async (bypass = false) => {
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const res = await uploadLabReport(inspectionId, file, bypass);
      if (!res.success) {
        if (res.error.code === 'CONFLICT' && !bypass) {
          setPendingBypass(true);
          return;
        }
        const message =
          res.error?.description ?? 'Upload failed. Please try again.';
        setError(message);
        toast.show(message, { tone: 'error' });
        return;
      }
      setFile(null);
      setPendingBypass(false);
      onClose();
      onUploadSuccess();
      toast.show('Lab test report uploaded successfully');
    } catch {
      const message = 'Upload failed. Please try again.';
      setError(message);
      toast.show(message, { tone: 'error' });
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <Modal
        open={open && !pendingBypass}
        onClose={handleClose}
        title="Upload Lab Test Report"
        subtitle="PDF format only · Max 10 MB"
        footer={
          <div className="flex w-full justify-end gap-2">
            <Button
              variant="secondary"
              onClick={handleClose}
              disabled={uploading}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              disabled={!file || uploading}
              onClick={() => handleUpload()}
            >
              {uploading ? 'Uploading…' : 'Upload Report'}
            </Button>
          </div>
        }
      >
        <FileUploadZone accept=".pdf" file={file} onFile={setFile} />
        {error && <p className="mt-2 text-[12px] text-red-600">{error}</p>}
      </Modal>

      <WorkOrderConflictModal
        open={pendingBypass}
        uploading={uploading}
        onCancel={() => setPendingBypass(false)}
        onConfirm={() => handleUpload(true)}
      />
    </>
  );
}
