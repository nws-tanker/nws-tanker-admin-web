import { AppShell } from '@/common-components/AppShell';
import { useExecutiveDashboard } from './hooks/useExecutiveDashboard';

import DashboardSection from './components/DashboardSection';
import ExecutiveDashboardFilters from './components/ExecutiveDashboardFilters';

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
    setFiscalYear,
    setQuarter,
    setClusterId,
    lookupsState,
    summaryState,
    complianceState,
    trendState,
    clusterState,
    heatmapState,
  } = useExecutiveDashboard();

  const fiscalYearData = lookupsState.data?.fiscal_year.find(
    (f) => f.year === filters.fiscalYear,
  );
  const trendSubtitle = fiscalYearData
    ? `${fiscalYearData.start.month} ${fiscalYearData.start.year} – ${fiscalYearData.end.month} ${fiscalYearData.end.year}`
    : undefined;

  const selectedCluster = lookupsState.data?.clusters.find(
    (c) => c.id === filters.clusterId,
  );
  const complianceSubtitle = selectedCluster
    ? `${selectedCluster.name} only`
    : 'Fleet-wide · all clusters';

  return (
    <AppShell breadcrumbs={['Executive Dashboard']}>
      <div className="flex flex-col gap-6 p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-xl font-bold text-ink-800">
            Executive Dashboard
          </h1>
          <ExecutiveDashboardFilters
            lookupsData={lookupsState.data}
            filters={filters}
            onFiscalYearChange={setFiscalYear}
            onQuarterChange={setQuarter}
            onClusterChange={setClusterId}
          />
        </div>

        <DashboardSection
          state={summaryState}
          skeleton={<SummaryKpiStripSkeleton />}
          errorMessage="Failed to load summary."
        >
          {(data) => <SummaryKpiStrip data={data} />}
        </DashboardSection>

        <DashboardSection
          state={complianceState}
          skeleton={<ComplianceByTankerTypeSkeleton />}
          errorMessage="Failed to load compliance data."
        >
          {(data) => (
            <ComplianceByTankerType data={data} subtitle={complianceSubtitle} />
          )}
        </DashboardSection>

        <DashboardSection
          state={trendState}
          skeleton={<MonthlyInspectionTrendSkeleton />}
          errorMessage="Failed to load inspection trend."
        >
          {(data) => (
            <MonthlyInspectionTrend data={data} subtitle={trendSubtitle} />
          )}
        </DashboardSection>

        <DashboardSection
          state={clusterState}
          skeleton={<ClusterContractorBreakdownSkeleton />}
          errorMessage="Failed to load cluster breakdown."
        >
          {(data) => <ClusterContractorBreakdown data={data} />}
        </DashboardSection>

        <DashboardSection
          state={heatmapState}
          skeleton={<ComplianceHeatmapSkeleton />}
          errorMessage="Failed to load compliance heatmap."
        >
          {(data) => <ComplianceHeatmap data={data} />}
        </DashboardSection>
      </div>
    </AppShell>
  );
}
