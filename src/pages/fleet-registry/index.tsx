import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, PageHeader } from '@/atoms';
import { DownloadIcon, UploadIcon } from '@/atoms/icons';
import { AppShell } from '@/common-components/AppShell';
import { ScreenStatus } from '@/common-components/ScreenStatus';
import { FLEET_PAGE_SIZE } from '@/constants/fleet';
import { ROUTES } from '@/constants/routes';
import { States } from '@/store/types';
import type { Tanker } from '@/types';
import { downloadCsv } from '@/utils';
import { FleetRegistryFilters } from './components/FleetRegistryFilters';
import { FleetRegistryTable } from './components/FleetRegistryTable';
import { TankerDetailsModal } from './components/TankerDetailsModal';
import {
  CSV_HEADER,
  buildCsvRows,
  filterTankers,
  hasActiveFilters,
} from './fleetRegistryHelpers';
import { useFleetFilters } from './hooks/useFleetFilters';
import { useFleetRegistryData } from './hooks/useFleetRegistryData';
import { usePaginatedRows } from './hooks/usePaginatedRows';

export default function FleetRegistryPage() {
  const navigate = useNavigate();
  const { tankers, lookups, fleetState, retry } = useFleetRegistryData();

  const filterBag = useFleetFilters();
  const { filters } = filterBag;

  const filtered = useMemo(
    () =>
      filterTankers(
        tankers,
        filters,
        lookups?.clusters ?? [],
        lookups?.governorates ?? [],
      ),
    [tankers, filters, lookups?.clusters, lookups?.governorates],
  );
  const { page, totalPages, pageRows, from, to, setPage, resetPage } =
    usePaginatedRows(filtered, FLEET_PAGE_SIZE);

  useEffect(() => {
    resetPage();
  }, [filters, resetPage]);

  const [viewTarget, setViewTarget] = useState<Tanker | null>(null);

  const filterActive = hasActiveFilters(filters);
  const total = tankers.length;

  const handleExport = () => {
    downloadCsv('fleet-tanker-report.csv', CSV_HEADER, buildCsvRows(filtered));
  };

  return (
    <AppShell breadcrumbs={['Home', 'Fleet Registry']}>
      <div className="flex min-h-0 flex-1 flex-col px-7 pt-7 pb-6">
        <PageHeader
          title="Fleet Registry"
          subtitle={
            <>
              {total.toLocaleString()} tankers registered
              {filterActive
                ? ` · ${filtered.length.toLocaleString()} match filters`
                : ''}
            </>
          }
          actions={
            <>
              <Button
                variant="ghost"
                size="sm"
                leftIcon={<DownloadIcon className="h-3.5 w-3.5" />}
                onClick={handleExport}
                disabled={
                  fleetState !== States.SUCCESS || filtered.length === 0
                }
              >
                Export Report{filterActive ? ' (filtered)' : ''}
              </Button>
              <Button
                variant="secondary"
                leftIcon={<UploadIcon className="h-3.5 w-3.5" />}
                onClick={() => navigate(ROUTES.tankerUpload)}
              >
                Upload Registrations
              </Button>
            </>
          }
        />

        {fleetState === States.SUCCESS ? (
          <>
            {lookups && (
              <FleetRegistryFilters
                filters={filters}
                hasActive={filterActive}
                lookups={lookups}
                onSearch={filterBag.setSearch}
                onClusterIds={filterBag.setClusterIds}
                onGovernorateIds={filterBag.setGovernorateIds}
                onTankerTypes={filterBag.setTankerTypes}
                onPermitStatuses={filterBag.setPermitStatuses}
                onReset={filterBag.reset}
              />
            )}

            <FleetRegistryTable
              rows={pageRows}
              page={page}
              totalPages={totalPages}
              from={from}
              to={to}
              total={filtered.length}
              onPageChange={setPage}
              onView={setViewTarget}
            />
          </>
        ) : (
          <ScreenStatus state={fleetState} onRetry={retry} />
        )}
      </div>

      <TankerDetailsModal
        tanker={viewTarget}
        governorateName={viewTarget?.governorate ?? ''}
        clusterName={viewTarget?.cluster ?? ''}
        onClose={() => setViewTarget(null)}
      />
    </AppShell>
  );
}
