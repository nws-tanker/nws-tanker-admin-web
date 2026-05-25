import { Button } from '@/atoms';
import { UploadIcon } from '@/atoms/icons';
import { TANKER_UPLOAD_COLUMNS } from '@/constants/tankerUpload';
import type { TankerUploadResponse } from '@/types';
import { downloadCsv } from '@/utils';
import { SummaryStat } from './SummaryStat';
import { UploadResultBanner } from './UploadResultBanner';

const ERRORS_FILENAME = 'tanker-upload-errors.csv';

type Props = {
  fileName: string;
  result: TankerUploadResponse;
  onUploadAnother: () => void;
};

export function UploadSummaryCard({
  fileName,
  result,
  onUploadAnother,
}: Props) {
  const { totalRows, successRows, failedRows, failedRecords } = result;

  const handleDownloadErrors = () => {
    if (!failedRecords?.length) return;
    const headers = [...TANKER_UPLOAD_COLUMNS.map((c) => c.name), 'Errors'];
    const rows = failedRecords.map((r) => [
      ...TANKER_UPLOAD_COLUMNS.map((c) => r[c.recordKey] ?? ''),
      r.errorMsg ?? '',
    ]);
    downloadCsv(ERRORS_FILENAME, headers, rows);
  };

  return (
    <div className="mb-5 overflow-hidden rounded-card-lg border border-ink-200 bg-white shadow-card-sm">
      <div className="flex items-center justify-between gap-4 border-b border-ink-100 px-5 py-4">
        <h3 className="text-[14px] font-semibold tracking-tight text-ink-900">
          Upload Result —{' '}
          <span className="font-mono text-ink-600">{fileName}</span>
        </h3>
        <Button
          variant="ghost"
          size="sm"
          leftIcon={<UploadIcon className="h-3.5 w-3.5" />}
          onClick={onUploadAnother}
        >
          Upload another file
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-3 px-5 pt-4">
        <SummaryStat label="Total Records" value={totalRows} />
        <SummaryStat label="Imported" value={successRows} tone="success" />
        <SummaryStat
          label="Failed"
          value={failedRows}
          tone={failedRows > 0 ? 'danger' : 'muted'}
        />
      </div>

      <div className="px-5 pb-5 pt-3">
        <UploadResultBanner
          totalRows={totalRows}
          importedCount={successRows}
          failedCount={failedRows}
          onDownloadErrors={handleDownloadErrors}
        />
      </div>
    </div>
  );
}
