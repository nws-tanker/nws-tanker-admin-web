import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, PageHeader, useToast } from '@/atoms';
import { DownloadIcon, UploadIcon } from '@/atoms/icons';
import { AppShell } from '@/common-components/AppShell';
import { ScreenStatus } from '@/common-components/ScreenStatus';
import { FLEET_PAGE_SIZE } from '@/constants/fleet';
import { ROUTES } from '@/constants/routes';
import {
  assignInspectorApi,
  clearInspectorAssignmentApi,
} from '@/services/assignmentService';
import { useAppDispatch } from '@/store';
import { setTankerAssignment } from '@/store/apiSlices/fleetRegistryApiSlice';
import { States } from '@/store/types';
import type { Assignment, Tanker } from '@/types';
import { downloadCsv } from '@/utils';
import { AssignInspectorModal } from './components/AssignInspectorModal';
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
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    tankers,
    lookups,
    clustersById,
    governoratesById,
    inspectorsById,
    sampleCollectorsById,
    state,
    retry,
  } = useFleetRegistryData();

  const filterBag = useFleetFilters();
  const { filters } = filterBag;

  const filtered = useMemo(
    () => filterTankers(tankers, filters),
    [tankers, filters],
  );
  const { page, totalPages, pageRows, from, to, setPage, resetPage } =
    usePaginatedRows(filtered, FLEET_PAGE_SIZE);

  useEffect(() => {
    resetPage();
  }, [filters, resetPage]);

  const [assignTarget, setAssignTarget] = useState<Tanker | null>(null);
  const [viewTarget, setViewTarget] = useState<Tanker | null>(null);
  const [submitting, setSubmitting] = useState<'assign' | 'clear' | null>(null);

  const { show: showToast } = useToast();

  const filterActive = hasActiveFilters(filters);
  const total = tankers.length;

  const handleAssignSave = async (tankerId: string, assignment: Assignment) => {
    if (!assignTarget) return;
    setSubmitting('assign');
    const response = await assignInspectorApi(
      assignTarget.plateNumber,
      assignment,
    );
    setSubmitting(null);
    if (response.success) {
      dispatch(setTankerAssignment({ tankerId, assignment }));
      setAssignTarget(null);
    } else {
      showToast(response.error.description, { tone: 'error' });
    }
  };

  const handleAssignClear = async (tankerId: string) => {
    if (!assignTarget) return;
    setSubmitting('clear');
    const response = await clearInspectorAssignmentApi(
      assignTarget.plateNumber,
    );
    setSubmitting(null);
    if (response.success) {
      dispatch(setTankerAssignment({ tankerId, assignment: null }));
      setAssignTarget(null);
    } else {
      showToast(response.error.description, { tone: 'error' });
    }
  };

  const handleExport = () => {
    const rows = buildCsvRows(filtered, {
      clustersById,
      governoratesById,
      inspectorsById,
      sampleCollectorsById,
    });
    downloadCsv('fleet-tanker-report.csv', CSV_HEADER, rows);
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
                disabled={state !== States.SUCCESS || filtered.length === 0}
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

        {state === States.SUCCESS && lookups ? (
          <>
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

            <FleetRegistryTable
              rows={pageRows}
              page={page}
              totalPages={totalPages}
              from={from}
              to={to}
              total={filtered.length}
              clustersById={clustersById}
              governoratesById={governoratesById}
              inspectorsById={inspectorsById}
              sampleCollectorsById={sampleCollectorsById}
              onPageChange={setPage}
              onAssign={setAssignTarget}
              onView={setViewTarget}
            />
          </>
        ) : (
          <ScreenStatus state={state} onRetry={retry} />
        )}
      </div>

      <AssignInspectorModal
        tanker={assignTarget}
        clusterName={
          assignTarget
            ? (clustersById.get(assignTarget.clusterId)?.name ?? '')
            : ''
        }
        inspectors={lookups?.inspectors ?? []}
        samplers={lookups?.sampleCollectors ?? []}
        submitting={submitting}
        onSave={handleAssignSave}
        onClear={handleAssignClear}
        onClose={() => {
          if (submitting) return;
          setAssignTarget(null);
        }}
      />

      <TankerDetailsModal
        tanker={viewTarget}
        governorateName={
          viewTarget
            ? (governoratesById.get(viewTarget.governorateId)?.name ?? '')
            : ''
        }
        clusterName={
          viewTarget ? (clustersById.get(viewTarget.clusterId)?.name ?? '') : ''
        }
        inspectors={lookups?.inspectors ?? []}
        samplers={lookups?.sampleCollectors ?? []}
        onClose={() => setViewTarget(null)}
      />
    </AppShell>
  );
}
