import { useState, useRef, useCallback, useEffect } from 'react';
import { AppShell } from '@/common-components/AppShell';
import { useAppDispatch, useAppSelector } from '@/store';
import { fetchLookups } from '@/store/apiSlices/lookupsApiSlice';
import { States } from '@/store/types';
import { exportDashboardPdf } from '@/pages/dashboard/utils/exportDashboardPdf';

import DashboardSection from '@/pages/dashboard/components/DashboardSection';
import PdfExportButton from '@/pages/dashboard/components/PdfExportButton';

import FleetTankerTypeCompliance from './components/FleetTankerTypeCompliance';
import FleetTankerTypeComplianceSkeleton from './components/FleetTankerTypeComplianceSkeleton';
import FleetCompliancePrintView, {
  buildFleetCompliancePdfFilename,
} from './components/FleetCompliancePrintView';

import { useFleetComplianceFilters } from './hooks/useFleetComplianceFilters';
import { useFleetComplianceData } from './hooks/useFleetComplianceData';

import SectionErrorCard from '@/common-components/SectionErrorCard';
import FleetComplianceFilters from './components/FleetComplianceFilters';
import FleetKpiStrip from './components/FleetKpiStrip';
import FleetKpiStripSkeleton from './components/FleetKpiStripSkeleton';
import FleetComplianceBanner from './components/FleetComplianceBanner';
import FleetComplianceBannerSkeleton from './components/FleetComplianceBannerSkeleton';
import GovernorateComplianceTable from './components/GovernorateComplianceTable';
import GovernorateComplianceSkeleton from './components/GovernorateComplianceSkeleton';
import InspectorPerformanceTable from './components/InspectorPerformanceTable';
import InspectorPerformanceSkeleton from './components/InspectorPerformanceSkeleton';

export default function FleetCompliancePage() {
  const dispatch = useAppDispatch();
  const lookupsState = useAppSelector((s) => s.lookupsApi);

  useEffect(() => {
    if (lookupsState.apiState === States.PRELOADING) {
      dispatch(fetchLookups());
    }
  }, [dispatch, lookupsState.apiState]);

  const currentUserApi = useAppSelector((s) => s.currentUserApi);
  const isUserResolved =
    currentUserApi.apiState === States.SUCCESS ||
    currentUserApi.apiState === States.ERROR;
  const userClusterId: number | null | undefined = isUserResolved
    ? (currentUserApi.data?.clusterId ?? null)
    : undefined;

  const {
    filters,
    isClusterLocked,
    setFiscalYearIds,
    setClusterIds,
    setGovernorateIds,
    governorateOptions,
    fleetBody,
    tankerTypeBody,
    ready,
  } = useFleetComplianceFilters(
    lookupsState.data,
    lookupsState.apiState,
    userClusterId,
  );

  const {
    kpiState,
    governorateState,
    inspectorState,
    tankerTypeState,
    fetchFleetData,
  } = useFleetComplianceData();

  // Fire once after lookups load and default filters are initialised
  const initialFetchDone = useRef(false);
  const fleetBodyRef = useRef(fleetBody);
  fleetBodyRef.current = fleetBody;
  const tankerBodyRef = useRef(tankerTypeBody);
  tankerBodyRef.current = tankerTypeBody;

  useEffect(() => {
    if (!ready || initialFetchDone.current) return;
    initialFetchDone.current = true;
    fetchFleetData(fleetBodyRef.current, tankerBodyRef.current);
  }, [ready, fetchFleetData]);

  const handleFiscalYearChange = useCallback(
    (newIds: number[]) => {
      setFiscalYearIds(newIds);
      fetchFleetData(
        {
          fiscal_years: newIds,
          clusters: filters.clusterIds,
          governorates: filters.governorateIds,
        },
        {
          fiscal_years: newIds,
          quarters: [],
          clusters: filters.clusterIds,
          governorates: filters.governorateIds,
        },
      );
    },
    [
      setFiscalYearIds,
      fetchFleetData,
      filters.clusterIds,
      filters.governorateIds,
    ],
  );

  const handleClusterChange = useCallback(
    (newIds: number[]) => {
      if (isClusterLocked) return;
      // Cascade: compute valid governorates synchronously before state updates
      const validGovIds = filters.governorateIds.filter((gId) => {
        const gov = lookupsState.data?.governorates.find((g) => g.id === gId);
        return (
          gov &&
          (newIds.length === 0 ||
            newIds.some((id) => String(id) === gov.clusterId))
        );
      });
      setClusterIds(newIds);
      fetchFleetData(
        {
          fiscal_years: filters.fiscalYearIds,
          clusters: newIds,
          governorates: validGovIds,
        },
        {
          fiscal_years: filters.fiscalYearIds,
          quarters: [],
          clusters: newIds,
          governorates: validGovIds,
        },
      );
    },
    [
      isClusterLocked,
      setClusterIds,
      fetchFleetData,
      filters,
      lookupsState.data,
    ],
  );

  const handleGovernorateChange = useCallback(
    (newIds: number[]) => {
      setGovernorateIds(newIds);
      fetchFleetData(
        {
          fiscal_years: filters.fiscalYearIds,
          clusters: filters.clusterIds,
          governorates: newIds,
        },
        {
          fiscal_years: filters.fiscalYearIds,
          quarters: [],
          clusters: filters.clusterIds,
          governorates: newIds,
        },
      );
    },
    [
      setGovernorateIds,
      fetchFleetData,
      filters.fiscalYearIds,
      filters.clusterIds,
    ],
  );

  // ── PDF export ──────────────────────────────────────────────────────────────

  const [isExporting, setIsExporting] = useState(false);
  const filtersRef = useRef(filters);
  filtersRef.current = filters;

  const canExport =
    kpiState.data != null &&
    tankerTypeState.data != null &&
    governorateState.data != null &&
    inspectorState.data != null;

  const handlePrintReady = useCallback(async (sections: HTMLElement[]) => {
    try {
      await exportDashboardPdf(
        sections,
        buildFleetCompliancePdfFilename(filtersRef.current),
      );
    } finally {
      setIsExporting(false);
    }
  }, []);

  return (
    <AppShell breadcrumbs={['Home', 'Fleet Compliance']}>
      <div className="flex flex-col gap-6 p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-xl font-bold text-ink-800">Fleet Compliance</h1>
          <div className="flex flex-wrap items-center gap-3">
            <FleetComplianceFilters
              lookupsData={lookupsState.data}
              filters={filters}
              isClusterLocked={isClusterLocked}
              governorateOptions={governorateOptions}
              onFiscalYearIdsChange={handleFiscalYearChange}
              onClusterIdsChange={handleClusterChange}
              onGovernorateIdsChange={handleGovernorateChange}
            />
            <PdfExportButton
              onClick={() => setIsExporting(true)}
              disabled={!canExport}
              isLoading={isExporting}
            />
          </div>
        </div>

        <DashboardSection
          state={kpiState}
          skeleton={
            <div className="flex flex-col gap-4">
              <FleetKpiStripSkeleton />
              <FleetComplianceBannerSkeleton />
            </div>
          }
          errorMessage="Failed to load KPI summary."
          errorComponent={
            <SectionErrorCard message="Unable to load fleet KPI summary. Please try again." />
          }
        >
          {(kpiData) => (
            <div className="flex flex-col gap-4">
              <FleetKpiStrip data={kpiData} />
              <FleetComplianceBanner data={kpiData.fleet_wide_compliance} />
            </div>
          )}
        </DashboardSection>

        <DashboardSection
          state={tankerTypeState}
          skeleton={<FleetTankerTypeComplianceSkeleton />}
          errorMessage="Failed to load tanker type compliance."
          errorComponent={
            <SectionErrorCard
              title="Compliance by Tanker Type"
              message="Unable to load tanker type compliance data. Please try again."
            />
          }
        >
          {(tankerData) => <FleetTankerTypeCompliance data={tankerData} />}
        </DashboardSection>

        <DashboardSection
          state={governorateState}
          skeleton={<GovernorateComplianceSkeleton />}
          errorMessage="Failed to load governorate compliance."
          errorComponent={
            <GovernorateComplianceTable error="Failed to load governorate compliance." />
          }
        >
          {(govData) => <GovernorateComplianceTable data={govData} />}
        </DashboardSection>

        <DashboardSection
          state={inspectorState}
          skeleton={<InspectorPerformanceSkeleton />}
          errorMessage="Failed to load inspector performance."
          errorComponent={
            <InspectorPerformanceTable error="Failed to load inspector performance." />
          }
        >
          {(inspectorData) => (
            <InspectorPerformanceTable data={inspectorData} />
          )}
        </DashboardSection>
      </div>

      {/* Off-screen print view — rendered only while export is in progress */}
      {isExporting &&
        kpiState.data != null &&
        tankerTypeState.data != null &&
        governorateState.data != null &&
        inspectorState.data != null && (
          <div
            style={{ position: 'absolute', left: -9999, top: 0, zIndex: -1 }}
          >
            <FleetCompliancePrintView
              filters={filters}
              lookupsData={lookupsState.data}
              kpiData={kpiState.data}
              tankerTypeData={tankerTypeState.data}
              governorateData={governorateState.data}
              inspectorData={inspectorState.data}
              onReady={handlePrintReady}
            />
          </div>
        )}
    </AppShell>
  );
}
