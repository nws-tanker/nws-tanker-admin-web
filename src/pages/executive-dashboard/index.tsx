import { PageHeader } from '@/atoms';
import { AppShell } from '@/common-components/AppShell';
import { ScreenStatus } from '@/common-components/ScreenStatus';
import { useLookups } from '@/hooks/useLookups';
import { States } from '@/store/types';
import { ComplianceByTankerType } from './components/ComplianceByTankerType';
import { ClusterContractorBreakdown } from './components/ClusterContractorBreakdown';
import { ComplianceHeatmap } from './components/ComplianceHeatmap';
import { DashboardFiltersBar } from './components/DashboardFiltersBar';
import { ExecutiveKpiStrip } from './components/ExecutiveKpiStrip';
import { MonthlyInspectionTrend } from './components/MonthlyInspectionTrend';
import { useDashboardFilters } from './hooks/useDashboardFilters';
import { useExecutiveDashboard } from './hooks/useExecutiveDashboard';

export default function ExecutiveDashboardPage() {
  const { filters, setQuarter, setClusterId } = useDashboardFilters();
  const { lookups } = useLookups();
  const { pageState, summary, trend, cluster, heatmap, retry } =
    useExecutiveDashboard(filters);

  const subtitle = (
    <>
      Fleet-wide compliance posture · {filters.quarter.replace('-', ' ')}
      {summary.data?.refreshedAt
        ? ` · refreshed ${new Date(summary.data.refreshedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
        : ''}
    </>
  );

  if (pageState === States.ERROR) {
    return (
      <AppShell breadcrumbs={['Home', 'Executive Dashboard']}>
        <div className="flex flex-1 flex-col px-7 pt-7 pb-6">
          <PageHeader title="Executive Dashboard" subtitle={subtitle} />
          <ScreenStatus state={States.ERROR} onRetry={retry} />
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell breadcrumbs={['Home', 'Executive Dashboard']}>
      <div className="flex flex-col px-7 pt-7 pb-6">
        <PageHeader
          title="Executive Dashboard"
          subtitle={subtitle}
          actions={
            <DashboardFiltersBar
              quarter={filters.quarter}
              clusterId={filters.clusterId}
              clusters={lookups?.clusters ?? []}
              onQuarterChange={setQuarter}
              onClusterChange={setClusterId}
            />
          }
        />

        <ExecutiveKpiStrip kpis={summary.data?.kpis ?? null} />
        <ComplianceByTankerType items={summary.data?.byType ?? null} />
        <MonthlyInspectionTrend data={trend.data} />
        <ClusterContractorBreakdown data={cluster.data} />
        <ComplianceHeatmap data={heatmap.data} />
      </div>
    </AppShell>
  );
}
