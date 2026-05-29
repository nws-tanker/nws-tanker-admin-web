import { useState, useRef, useCallback } from 'react';

import { AppShell } from '@/common-components/AppShell';
import SectionErrorCard from '@/common-components/SectionErrorCard';
import { formatTime } from '@/utils';
import { useExecutiveDashboard } from './hooks/useExecutiveDashboard';
import { exportDashboardPdf } from './utils/exportDashboardPdf';

import DashboardSection from './components/DashboardSection';
import ExecutiveDashboardFilters from './components/ExecutiveDashboardFilters';
import PdfExportButton from './components/PdfExportButton';
import DashboardPrintView, {
  buildPdfFilename,
} from './components/DashboardPrintView';

import SummaryKpiStrip from './components/SummaryKpiStrip';
import SummaryKpiStripSkeleton from './components/SummaryKpiStripSkeleton';

import ComplianceByTankerType from './components/ComplianceByTankerType';
import ComplianceByTankerTypeSkeleton from './components/ComplianceByTankerTypeSkeleton';

import MonthlyInspectionTrend from './components/MonthlyInspectionTrend';
import MonthlyInspectionTrendSkeleton from './components/MonthlyInspectionTrendSkeleton';

import ClusterContractorBreakdown from './components/ClusterContractorBreakdown';
import ClusterContractorBreakdownSkeleton from './components/ClusterContractorBreakdownSkeleton';

import ComplianceHeatmap from './components/ComplianceHeatmap';
import ComplianceHeatmapSkeleton from './components/ComplianceHeatmapSkeleton';

export default function ExecutiveDashboard() {
  const {
    filters,
    isClusterLocked,
    setFiscalYears,
    setQuarters,
    setClusterIds,
    lookupsState,
    summaryState,
    complianceState,
    trendState,
    clusterState,
    heatmapState,
  } = useExecutiveDashboard();

  const [isExporting, setIsExporting] = useState(false);
  const filtersRef = useRef(filters);
  filtersRef.current = filters;

  const canExport =
    summaryState.data != null &&
    complianceState.data != null &&
    trendState.data != null &&
    clusterState.data != null &&
    heatmapState.data != null;

  const handlePrintReady = useCallback(async (sections: HTMLElement[]) => {
    try {
      await exportDashboardPdf(sections, buildPdfFilename(filtersRef.current));
    } finally {
      setIsExporting(false);
    }
  }, []);

  const fiscalYearData =
    filters.fiscalYears.length === 1
      ? lookupsState.data?.fiscal_year.find(
          (f) => f.year === filters.fiscalYears[0],
        )
      : undefined;
  const trendSubtitle = fiscalYearData
    ? `${fiscalYearData.start.month} ${fiscalYearData.start.year} – ${fiscalYearData.end.month} ${fiscalYearData.end.year}`
    : filters.fiscalYears.length > 1
      ? `FY ${filters.fiscalYears.join(', ')}`
      : undefined;

  const complianceSubtitle =
    filters.clusterIds.length === 0
      ? 'Fleet-wide · all clusters'
      : filters.clusterIds.length === 1
        ? (() => {
            const c = lookupsState.data?.clusters.find(
              (cl) => cl.id === filters.clusterIds[0],
            );
            return c ? `${c.name} only` : 'Selected cluster';
          })()
        : `${filters.clusterIds.length} clusters selected`;

  return (
    <AppShell breadcrumbs={['Home', 'Executive Dashboard']}>
      <div className="flex flex-col gap-6 p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-col gap-0.5">
            <h1 className="text-xl font-bold text-ink-800">
              Executive Dashboard
            </h1>
            {summaryState.data?.refreshed_at && (
              <span className="text-xs text-ink-500">
                Last refreshed at: {formatTime(summaryState.data.refreshed_at)}
              </span>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <ExecutiveDashboardFilters
              lookupsData={lookupsState.data}
              filters={filters}
              isClusterLocked={isClusterLocked}
              onFiscalYearsChange={setFiscalYears}
              onQuartersChange={setQuarters}
              onClusterIdsChange={setClusterIds}
            />
            <PdfExportButton
              onClick={() => setIsExporting(true)}
              disabled={!canExport}
              isLoading={isExporting}
            />
          </div>
        </div>

        <DashboardSection
          state={summaryState}
          skeleton={<SummaryKpiStripSkeleton />}
          errorMessage="Failed to load summary."
          errorComponent={
            <SectionErrorCard message="Unable to load the KPI summary. Please try again." />
          }
        >
          {(data) => <SummaryKpiStrip data={data} />}
        </DashboardSection>

        <DashboardSection
          state={complianceState}
          skeleton={<ComplianceByTankerTypeSkeleton />}
          errorMessage="Failed to load compliance data."
          errorComponent={
            <SectionErrorCard
              title="Compliance by Tanker Type"
              message="Unable to load tanker type compliance data. Please try again."
            />
          }
        >
          {(data) => (
            <ComplianceByTankerType data={data} subtitle={complianceSubtitle} />
          )}
        </DashboardSection>

        <DashboardSection
          state={trendState}
          skeleton={<MonthlyInspectionTrendSkeleton />}
          errorMessage="Failed to load inspection trend."
          errorComponent={
            <SectionErrorCard
              title="Monthly Inspection Trend"
              message="Unable to load inspection trend data. Please try again."
            />
          }
        >
          {(data) => (
            <MonthlyInspectionTrend data={data} subtitle={trendSubtitle} />
          )}
        </DashboardSection>

        <DashboardSection
          state={clusterState}
          skeleton={<ClusterContractorBreakdownSkeleton />}
          errorMessage="Failed to load cluster breakdown."
          errorComponent={
            <SectionErrorCard
              title="Cluster & Contractor Breakdown"
              message="Unable to load cluster breakdown data. Please try again."
            />
          }
        >
          {(data) => <ClusterContractorBreakdown data={data} />}
        </DashboardSection>

        <DashboardSection
          state={heatmapState}
          skeleton={<ComplianceHeatmapSkeleton />}
          errorMessage="Failed to load compliance heatmap."
          errorComponent={
            <SectionErrorCard
              title="Compliance Heatmap"
              message="Unable to load the compliance heatmap. Please try again."
            />
          }
        >
          {(data) => <ComplianceHeatmap data={data} />}
        </DashboardSection>
      </div>

      {isExporting &&
        summaryState.data &&
        complianceState.data &&
        trendState.data &&
        clusterState.data &&
        heatmapState.data && (
          <div
            style={{ position: 'absolute', left: -9999, top: 0, zIndex: -1 }}
          >
            <DashboardPrintView
              filters={filters}
              lookupsData={lookupsState.data}
              summaryData={summaryState.data}
              complianceData={complianceState.data}
              trendData={trendState.data}
              clusterData={clusterState.data}
              heatmapData={heatmapState.data}
              onReady={handlePrintReady}
            />
          </div>
        )}
    </AppShell>
  );
}
