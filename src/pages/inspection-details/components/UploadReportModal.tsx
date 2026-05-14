import { useState } from 'react';
import { Button, FileUploadZone, Modal } from '@/atoms';
import { uploadLabReport } from '@/services/inspectionService';

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

  const handleClose = () => {
    if (uploading) return;
    setFile(null);
    setError(null);
    onClose();
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const res = await uploadLabReport(inspectionId, file);
      if (!res.success) {
        setError(res.error?.description ?? 'Upload failed. Please try again.');
        return;
      }
      setFile(null);
      onClose();
      onUploadSuccess();
    } catch {
      setError('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <Modal
      open={open}
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
            onClick={handleUpload}
          >
            {uploading ? 'Uploading…' : 'Upload Report'}
          </Button>
        </div>
      }
    >
      <FileUploadZone accept=".pdf" file={file} onFile={setFile} />
      {error && <p className="mt-2 text-[12px] text-red-600">{error}</p>}
    </Modal>
  );
}
