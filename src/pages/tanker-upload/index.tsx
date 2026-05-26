import { Button, PageHeader } from '@/atoms';
import { DownloadIcon } from '@/atoms/icons';
import { AppShell } from '@/common-components/AppShell';
import { ColumnSpecTable } from './components/ColumnSpecTable';
import { DropZone } from './components/DropZone';
// import { ErrorRowsTable } from './components/ErrorRowsTable';
import { ProcessingCard } from './components/ProcessingCard';
import { UploadSummaryCard } from './components/UploadSummaryCard';
import { generateTankerUploadTemplateExcel } from './excel/tankerUploadTemplateExcel';
import { useTankerUploadColumns } from './hooks/useTankerUploadColumns';
import { useTankerUploadFlow } from './hooks/useTankerUploadFlow';
// import { parseUploadErrors } from './tankerUploadHelpers';

const TEMPLATE_FILENAME = 'tanker-upload-template.xlsx';

function handleDownloadTemplate() {
  void generateTankerUploadTemplateExcel(TEMPLATE_FILENAME);
}

export default function TankerUploadPage() {
  const { columns, state, retry } = useTankerUploadColumns();
  const { phase, submit, reset } = useTankerUploadFlow();

  return (
    <AppShell breadcrumbs={['Home', 'Tanker Upload']}>
      <div className="min-h-0 flex-1 overflow-y-auto px-7 pt-7 pb-6">
        <PageHeader
          title="Tanker Upload"
          subtitle="Bulk-import tankers from Excel / CSV · Accepts .xlsx, .csv"
          actions={
            <Button
              variant="ghost"
              size="sm"
              leftIcon={<DownloadIcon className="h-3.5 w-3.5" />}
              onClick={handleDownloadTemplate}
            >
              Download Template
            </Button>
          }
        />

        {phase.kind === 'idle' ? <DropZone onFile={submit} /> : null}
        {phase.kind === 'processing' ? (
          <ProcessingCard fileName={phase.fileName} />
        ) : null}
        {phase.kind === 'done' ? (
          <>
            <UploadSummaryCard
              fileName={phase.fileName}
              result={phase.result}
              onUploadAnother={reset}
            />
            {/* {phase.result.errors.length ? (
              <ErrorRowsTable errors={parseUploadErrors(phase.result.errors)} />
            ) : null} */}
          </>
        ) : null}

        <ColumnSpecTable columns={columns} state={state} onRetry={retry} />
      </div>
    </AppShell>
  );
}
