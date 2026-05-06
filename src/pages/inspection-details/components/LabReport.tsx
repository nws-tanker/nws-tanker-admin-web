import type { InspectionDetailsApiResponse } from '@/types/inspection';

type Props = { data: InspectionDetailsApiResponse };

function UploadIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  );
}

function FileIcon({ color = 'currentColor' }: { color?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="9" y1="13" x2="15" y2="13" />
      <line x1="9" y1="17" x2="13" y2="17" />
    </svg>
  );
}

export function LabReport({ data }: Props) {
  const { report } = data.lab;
  const uploaded = !!report.id;

  if (uploaded) {
    return (
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
            <FileIcon color="#dc2626" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate font-mono text-[12px] font-semibold text-ink-800">
              {report.id}
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-1.5">
            <button className="rounded-card border border-ink-200 bg-white px-3 py-1.5 text-[12px] font-medium text-ink-700 hover:bg-ink-50">
              View Report
            </button>
            <button className="flex items-center gap-1.5 rounded-card border border-ink-200 bg-white px-3 py-1.5 text-[12px] font-medium text-ink-600 hover:bg-ink-50">
              <UploadIcon size={13} />
              Upload lab test results
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
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
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="12" y1="18" x2="12" y2="12" />
              <line x1="9" y1="15" x2="15" y2="15" />
            </svg>
          </div>
          <div className="mb-1 text-[13px] font-semibold text-ink-700">
            Upload Lab Test Report
          </div>
          <div className="mb-3.5 text-[12px] text-ink-400">
            PDF format only · Max 10 MB
          </div>
          <button className="inline-flex items-center gap-1.5 rounded-card border border-ink-200 bg-white px-4 py-2 text-[12px] font-medium text-ink-700 hover:bg-ink-50">
            <UploadIcon size={14} />
            Upload lab test results
          </button>
        </div>
      </div>
    </div>
  );
}
