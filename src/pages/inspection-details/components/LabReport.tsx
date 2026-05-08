import { useState } from 'react';
import { Button, FileUploadZone, Modal } from '@/atoms';
import { FilePlusIcon, FileTextIcon, UploadIcon } from '@/atoms/icons';
import { uploadLabReport } from '@/services/inspectionService';
import type { InspectionDetailsApiResponse } from '@/types/inspection';

type Props = {
  data: InspectionDetailsApiResponse;
  onUploadSuccess: () => void;
};

function ViewReportModal({
  open,
  onClose,
  url,
  reportId,
}: {
  open: boolean;
  onClose: () => void;
  url: string;
  reportId: string;
}) {
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

function UploadReportModal({
  open,
  onClose,
  inspectionId,
  onUploadSuccess,
}: {
  open: boolean;
  onClose: () => void;
  inspectionId: string;
  onUploadSuccess: () => void;
}) {
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

export function LabReport({ data, onUploadSuccess }: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);

  if (data.tanker.type !== 'DW') return null;

  const inspectionId = data.id;
  const { report } = data.lab;
  const uploaded = !!report.id;

  const uploadModal = (
    <UploadReportModal
      open={modalOpen}
      onClose={() => setModalOpen(false)}
      inspectionId={inspectionId}
      onUploadSuccess={onUploadSuccess}
    />
  );

  if (uploaded) {
    return (
      <>
        <div className="overflow-hidden rounded-card border border-ink-200 shadow-card-sm">
          <div className="flex items-center gap-2.5 border-b border-ink-100 px-5 py-3.5">
            <span className="text-[14px] font-semibold text-ink-800">
              Lab Test Report
            </span>
            <span className="flex items-center gap-1.5 rounded-full border border-green-200 bg-green-50 px-2 py-0.5 text-[10px] font-semibold text-green-700">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
              Uploaded
            </span>
          </div>
          <div className="flex items-center gap-3.5 bg-white px-5 py-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-card bg-red-100">
              <FileTextIcon width={20} height={20} stroke="#dc2626" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate font-mono text-[12px] font-semibold text-ink-800">
                {report.id}
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-1.5">
              <button
                onClick={() => setViewModalOpen(true)}
                className="rounded-card border border-ink-200 bg-white px-3 py-1.5 text-[12px] font-medium text-ink-700 hover:bg-ink-50"
              >
                View Report
              </button>
              <button
                onClick={() => setModalOpen(true)}
                className="flex items-center gap-1.5 rounded-card border border-ink-200 bg-white px-3 py-1.5 text-[12px] font-medium text-ink-600 hover:bg-ink-50"
              >
                <UploadIcon width={13} height={13} />
                Upload lab test results
              </button>
            </div>
          </div>
        </div>
        {uploadModal}
        {report.presigned_url && (
          <ViewReportModal
            open={viewModalOpen}
            onClose={() => setViewModalOpen(false)}
            url={report.presigned_url}
            reportId={report.id!}
          />
        )}
      </>
    );
  }

  return (
    <>
      <div className="overflow-hidden rounded-card border border-ink-200 shadow-card-sm">
        <div className="flex items-center justify-between border-b border-ink-100 px-5 py-3.5">
          <span className="text-[14px] font-semibold text-ink-800">
            Lab Test Report
          </span>
          <span className="text-[11px] font-medium text-amber-600">
            Required before approval
          </span>
        </div>
        <div className="bg-white p-5">
          <div className="rounded-card-lg border-2 border-dashed border-ink-200 px-6 py-7 text-center">
            <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-ink-100 text-ink-400">
              <FilePlusIcon width={20} height={20} />
            </div>
            <div className="mb-1 text-[13px] font-semibold text-ink-700">
              Upload Lab Test Report
            </div>
            <div className="mb-3.5 text-[12px] text-ink-400">
              PDF format only · Max 10 MB
            </div>
            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-card border border-ink-200 bg-white px-4 py-2 text-[12px] font-medium text-ink-700 hover:bg-ink-50"
            >
              <UploadIcon width={14} height={14} />
              Upload lab test results
            </button>
          </div>
        </div>
      </div>
      {uploadModal}
    </>
  );
}
