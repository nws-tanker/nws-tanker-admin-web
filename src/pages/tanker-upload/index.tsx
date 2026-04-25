import { useState } from 'react';
import { Button, PageHeader, useToast } from '@/atoms';
import { DownloadIcon } from '@/atoms/icons';
import { AppShell } from '@/common-components/AppShell';
import { downloadTankerUploadTemplateApi } from '@/services/tankerUploadService';
import { ColumnSpecTable } from './components/ColumnSpecTable';
import { DropZone } from './components/DropZone';
// import { ErrorRowsTable } from './components/ErrorRowsTable';
import { ProcessingCard } from './components/ProcessingCard';
import { UploadSummaryCard } from './components/UploadSummaryCard';
import { useTankerUploadColumns } from './hooks/useTankerUploadColumns';
import { useTankerUploadFlow } from './hooks/useTankerUploadFlow';

export default function TankerUploadPage() {
  const { columns, state: columnsState, retry } = useTankerUploadColumns();
  const { phase, submit, reset } = useTankerUploadFlow();
  const { show: showToast } = useToast();
  const [downloadingTemplate, setDownloadingTemplate] = useState(false);

  const handleDownloadTemplate = async () => {
    setDownloadingTemplate(true);
    const response = await downloadTankerUploadTemplateApi();
    setDownloadingTemplate(false);
    if (response.success) {
      showToast(
        'Template downloaded — fill in the required columns and re-upload.',
      );
    } else {
      showToast(response.error.description, { tone: 'error' });
    }
  };

  return (
    <AppShell breadcrumbs={['Home', 'Tanker Upload']}>
      <div className="min-h-0 flex-1 overflow-y-auto px-7 pt-7 pb-6">
        <PageHeader
          title="Tanker Upload"
          subtitle="Bulk-import tankers from Excel / CSV · Accepts .xlsx, .xls, .csv"
          actions={
            <Button
              variant="ghost"
              size="sm"
              leftIcon={<DownloadIcon className="h-3.5 w-3.5" />}
              onClick={handleDownloadTemplate}
              disabled={downloadingTemplate}
            >
              {downloadingTemplate ? 'Preparing…' : 'Download Template'}
            </Button>
          }
        />

        {phase.kind === 'idle' ? <DropZone onFile={submit} /> : null}
        {phase.kind === 'processing' ? (
          <ProcessingCard fileName={phase.fileName} />
        ) : null}
        {phase.kind === 'done' ? (
          <>
            <UploadSummaryCard result={phase.result} onUploadAnother={reset} />
            {/* Hidden until per-row fix-and-import flow is wired up.
            {phase.result.errors.length > 0 ? (
              <ErrorRowsTable
                errors={phase.result.errors}
                onDismiss={dismissError}
              />
            ) : null}
            */}
          </>
        ) : null}

        <ColumnSpecTable
          columns={columns}
          state={columnsState}
          onRetry={retry}
        />
      </div>
    </AppShell>
  );
}
