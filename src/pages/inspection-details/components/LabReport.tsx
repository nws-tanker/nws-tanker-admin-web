import { useState } from 'react';
import { Button } from '@/atoms';
import { FilePlusIcon, FileTextIcon, UploadIcon } from '@/atoms/icons';
import type { InspectionDetailsApiResponse } from '@/types/inspection';
import { LabReportHeader } from './LabReportHeader';
import { UploadReportModal } from './UploadReportModal';
import { ViewReportModal } from './ViewReportModal';

type Props = {
  data: InspectionDetailsApiResponse;
  onUploadSuccess: () => void;
};

export function LabReport({ data, onUploadSuccess }: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);

  if (data.tanker.type !== 'DW') return null;

  const inspectionId = data.id;
  const { report } = data.lab;
  const uploaded = !!report.id;
  const workOrderRef = data.sample_collection?.work_order_reference;

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
          <LabReportHeader
            workOrderRef={workOrderRef}
            status={
              <span className="flex items-center gap-1.5 rounded-full border border-green-200 bg-green-50 px-2 py-0.5 text-[10px] font-semibold text-green-700">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                Uploaded
              </span>
            }
          />
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
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setViewModalOpen(true)}
              >
                View Report
              </Button>
              <Button
                variant="secondary"
                size="sm"
                leftIcon={<UploadIcon width={13} height={13} />}
                onClick={() => setModalOpen(true)}
              >
                Upload lab test results
              </Button>
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
        <LabReportHeader
          workOrderRef={workOrderRef}
          status={
            <span className="text-[11px] font-medium text-amber-600">
              Required before approval
            </span>
          }
        />
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
            <Button
              variant="secondary"
              leftIcon={<UploadIcon width={14} height={14} />}
              onClick={() => setModalOpen(true)}
            >
              Upload lab test results
            </Button>
          </div>
        </div>
      </div>
      {uploadModal}
    </>
  );
}
