import { useEffect, useMemo, useState } from 'react';
import { Button, CountBadge, PageHeader, useToast } from '@/atoms';
import { DownloadIcon, FileTextIcon } from '@/atoms/icons';
import SpinnerIcon from '@/assets/icons/SpinnerIcon';
import { AppShell } from '@/common-components/AppShell';
import { ScreenStatus } from '@/common-components/ScreenStatus';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import { useLookups } from '@/hooks/useLookups';
import { regeneratePermitsApi } from '@/services/permitRegenerationService';
import { States } from '@/store/types';
import { PermitRegenerationFilters } from './components/PermitRegenerationFilters';
import { PermitRegenerationTable } from './components/PermitRegenerationTable';
import {
  PERMIT_REGENERATION_PAGE_SIZE,
  REGENERATE_PERMITS_DEFAULTS,
} from './constants';
import { generatePermitRegenerationExcel } from './excel/permitRegenerationExcel';
import { usePermitRegenerationData } from './hooks/usePermitRegenerationData';
import { usePermitRegenerationFilters } from './hooks/usePermitRegenerationFilters';
import { useRowSelection } from './hooks/useRowSelection';

const PAGE_SIZE = PERMIT_REGENERATION_PAGE_SIZE;

export default function PermitRegenerationPage() {
  const { lookups } = useLookups();
  const filterBag = usePermitRegenerationFilters();
  const { filters } = filterBag;
  const [page, setPage] = useState(0);
  const debouncedSearch = useDebouncedValue(filters.search, 400);

  useEffect(() => {
    setPage(0);
  }, [debouncedSearch]);

  const queryParams = useMemo(
    () => ({
      page,
      size: PAGE_SIZE,
      startDate: filters.startDate || undefined,
      endDate: filters.endDate || undefined,
      clusterId: filters.clusterId ?? undefined,
      governorateId: filters.governorateId ?? undefined,
      tankerType: filters.tankerType ?? undefined,
      search: debouncedSearch.trim() || undefined,
    }),
    [
      page,
      filters.startDate,
      filters.endDate,
      filters.clusterId,
      filters.governorateId,
      filters.tankerType,
      debouncedSearch,
    ],
  );

  const { apiState, data, retry } = usePermitRegenerationData(queryParams);
  const selection = useRowSelection();
  const toast = useToast();
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const rows = data?.data ?? [];
  const totalCount = data?.total_elements ?? 0;
  const totalPages = data?.total_pages ?? 0;
  const selectedCount = selection.selectedIds.size;

  const handleFilterChange =
    <T,>(setter: (v: T) => void) =>
    (v: T) => {
      setter(v);
      setPage(0);
    };

  const handleRegenerate = async () => {
    if (selectedCount === 0 || isRegenerating) return;
    setIsRegenerating(true);
    try {
      const response = await regeneratePermitsApi({
        inspection_ids: Array.from(selection.selectedIds),
        send_email: REGENERATE_PERMITS_DEFAULTS.sendEmail,
        send_whatsapp: REGENERATE_PERMITS_DEFAULTS.sendWhatsapp,
      });
      if (response.success) {
        toast.show(
          `Regenerated ${response.data?.regenerated_count ?? selectedCount} permit${selectedCount === 1 ? '' : 's'}`,
        );
        selection.clear();
        retry();
      } else {
        toast.show(
          response.error?.description ?? 'Failed to regenerate permits',
          { tone: 'error' },
        );
      }
    } catch {
      toast.show('Failed to regenerate permits', { tone: 'error' });
    } finally {
      setIsRegenerating(false);
    }
  };

  const handleExport = async () => {
    if (isExporting) return;
    if (rows.length === 0) {
      toast.show('No data to export', { tone: 'error' });
      return;
    }
    setIsExporting(true);
    try {
      const periodLabel =
        filters.startDate && filters.endDate
          ? `${filters.startDate} to ${filters.endDate}`
          : new Date().toISOString().slice(0, 10);
      await generatePermitRegenerationExcel(rows, periodLabel);
      toast.show('Export downloaded');
    } catch {
      toast.show('Failed to export', { tone: 'error' });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <AppShell breadcrumbs={['Home', 'Permit Regeneration']}>
      <div className="flex min-h-0 flex-1 flex-col px-7 pt-7 pb-6">
        <PageHeader
          title="Permit Regeneration"
          subtitle="Filter tankers, select those to regenerate, then press Regenerate"
          actions={
            <>
              <Button
                variant="ghost"
                size="sm"
                leftIcon={
                  isExporting ? (
                    <SpinnerIcon />
                  ) : (
                    <DownloadIcon className="h-3.5 w-3.5" />
                  )
                }
                onClick={handleExport}
                disabled={isExporting || rows.length === 0}
              >
                {isExporting ? 'Exporting...' : 'Export'}
              </Button>
              <Button
                variant="primary"
                leftIcon={
                  isRegenerating ? (
                    <SpinnerIcon />
                  ) : (
                    <FileTextIcon className="h-3.5 w-3.5" />
                  )
                }
                onClick={handleRegenerate}
                disabled={selectedCount === 0 || isRegenerating}
                rightIcon={
                  selectedCount > 0 && !isRegenerating ? (
                    <CountBadge value={selectedCount} />
                  ) : undefined
                }
              >
                {isRegenerating ? 'Regenerating...' : 'Regenerate'}
              </Button>
            </>
          }
        />

        <PermitRegenerationFilters
          filters={filters}
          clusters={lookups?.clusters ?? []}
          governorates={lookups?.governorates ?? []}
          onStartDate={handleFilterChange(filterBag.setStartDate)}
          onEndDate={handleFilterChange(filterBag.setEndDate)}
          onClusterId={handleFilterChange(filterBag.setClusterId)}
          onGovernorateId={handleFilterChange(filterBag.setGovernorateId)}
          onTankerType={handleFilterChange(filterBag.setTankerType)}
          onSearch={filterBag.setSearch}
        />

        {apiState === States.SUCCESS || apiState === States.LOADING ? (
          <PermitRegenerationTable
            rows={rows}
            totalCount={totalCount}
            selectedCount={selectedCount}
            isSelected={selection.isSelected}
            onToggleRow={selection.toggle}
            onToggleAll={selection.setAll}
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
            loading={apiState === States.LOADING}
          />
        ) : (
          <ScreenStatus state={apiState} onRetry={retry} />
        )}
      </div>
    </AppShell>
  );
}
