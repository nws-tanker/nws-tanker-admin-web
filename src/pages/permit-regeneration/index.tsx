import { useEffect, useMemo, useState } from 'react';
import { PageHeader } from '@/atoms';
import { AppShell } from '@/common-components/AppShell';
import { ScreenStatus } from '@/common-components/ScreenStatus';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import { useLookups } from '@/hooks/useLookups';
import { useUserClusterId } from '@/hooks/useUserClusterId';
import { States } from '@/store/types';
import { ExportButton } from './components/ExportButton';
import { PermitRegenerationFilters } from './components/PermitRegenerationFilters';
import { PermitRegenerationTable } from './components/PermitRegenerationTable';
import { RegenerateButton } from './components/RegenerateButton';
import { PERMIT_REGENERATION_PAGE_SIZE } from './constants';
import { usePermitExport } from './hooks/usePermitExport';
import { usePermitRegenerationData } from './hooks/usePermitRegenerationData';
import { usePermitRegenerationFilters } from './hooks/usePermitRegenerationFilters';
import { useRegeneratePermits } from './hooks/useRegeneratePermits';
import { useRowSelection } from './hooks/useRowSelection';

const PAGE_SIZE = PERMIT_REGENERATION_PAGE_SIZE;

export default function PermitRegenerationPage() {
  const { lookups } = useLookups();
  const userClusterId = useUserClusterId();

  const filterBag = usePermitRegenerationFilters();
  const { filters, setClusterId } = filterBag;
  const [page, setPage] = useState(0);
  const debouncedSearch = useDebouncedValue(filters.search, 400);

  useEffect(() => {
    setPage(0);
  }, [debouncedSearch]);

  useEffect(() => {
    if (userClusterId != null && filters.clusterId !== userClusterId) {
      setClusterId(userClusterId);
    }
  }, [userClusterId, filters.clusterId, setClusterId]);

  const allClusters = lookups?.clusters ?? [];
  const scopedClusters =
    userClusterId == null
      ? allClusters
      : allClusters.filter((c) => c.id === userClusterId);

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

  const rows = data?.data ?? [];
  const totalCount = data?.total_elements ?? 0;
  const totalPages = data?.total_pages ?? 0;
  const selectedCount = selection.selectedIds.size;

  const { isRegenerating, regenerate } = useRegeneratePermits({
    onSuccess: () => {
      selection.clear();
      retry();
    },
  });

  const { isExporting, exportNow } = usePermitExport({
    rows,
    startDate: filters.startDate,
    endDate: filters.endDate,
  });

  const handleFilterChange =
    <T,>(setter: (v: T) => void) =>
    (v: T) => {
      setter(v);
      setPage(0);
    };

  const handleRegenerate = () => regenerate(Array.from(selection.selectedIds));

  const showTable = apiState === States.SUCCESS || apiState === States.LOADING;

  return (
    <AppShell breadcrumbs={['Home', 'Permit Regeneration']}>
      <div className="flex min-h-0 flex-1 flex-col px-7 pt-7 pb-6">
        <PageHeader
          title="Permit Regeneration"
          subtitle="Filter tankers, select those to regenerate, then press Regenerate"
          actions={
            <>
              <ExportButton
                isExporting={isExporting}
                disabled={rows.length === 0}
                onClick={exportNow}
              />
              <RegenerateButton
                isRegenerating={isRegenerating}
                selectedCount={selectedCount}
                onClick={handleRegenerate}
              />
            </>
          }
        />

        <PermitRegenerationFilters
          filters={filters}
          clusters={scopedClusters}
          governorates={lookups?.governorates ?? []}
          onStartDate={handleFilterChange(filterBag.setStartDate)}
          onEndDate={handleFilterChange(filterBag.setEndDate)}
          onClusterId={handleFilterChange(filterBag.setClusterId)}
          onGovernorateId={handleFilterChange(filterBag.setGovernorateId)}
          onTankerType={handleFilterChange(filterBag.setTankerType)}
          onSearch={filterBag.setSearch}
        />

        {showTable ? (
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
