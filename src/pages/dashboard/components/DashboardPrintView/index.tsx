import { useEffect, useRef } from 'react';
import type {
  ClusterContractorBreakdownResponse,
  ComplianceByTankerTypeResponse,
  ComplianceHeatmapResponse,
  ExecutiveDashboardLookupsResponse,
  MonthlyInspectionTrendResponse,
  SummaryResponse,
} from '@/types/executiveDashboard';
import type { ExecutiveDashboardFilters } from '../../hooks/useExecutiveDashboardFilters';
import SummaryKpiStrip from '../SummaryKpiStrip';
import ComplianceByTankerType from '../ComplianceByTankerType';
import MonthlyInspectionTrend from '../MonthlyInspectionTrend';
import ClusterContractorBreakdown from '../ClusterContractorBreakdown';
import ComplianceHeatmap from '../ComplianceHeatmap';

type Props = {
  filters: ExecutiveDashboardFilters;
  lookupsData: ExecutiveDashboardLookupsResponse | null;
  summaryData: SummaryResponse;
  complianceData: ComplianceByTankerTypeResponse;
  trendData: MonthlyInspectionTrendResponse;
  clusterData: ClusterContractorBreakdownResponse;
  heatmapData: ComplianceHeatmapResponse;
  // Receives ordered array of section elements — one per PDF section
  onReady: (sections: HTMLElement[]) => void;
};

function buildFilterLabel(
  filters: ExecutiveDashboardFilters,
  lookupsData: ExecutiveDashboardLookupsResponse | null,
): string {
  const parts: string[] = [`FY ${filters.fiscalYear}`];

  if (filters.quarter && lookupsData) {
    const q = lookupsData.quarters.find(
      (item) => item.quarter === filters.quarter,
    );
    parts.push(
      q
        ? `${filters.quarter} · ${q.start_month}–${q.end_month}`
        : filters.quarter,
    );
  } else {
    parts.push('All Quarters');
  }

  if (filters.clusterId && lookupsData) {
    const cluster = lookupsData.clusters.find(
      (c) => c.id === filters.clusterId,
    );
    parts.push(cluster ? cluster.name : `Cluster ${filters.clusterId}`);
  } else {
    parts.push('All Clusters');
  }

  return parts.join(' · ');
}

export function buildPdfFilename(filters: ExecutiveDashboardFilters): string {
  let name = `executive-dashboard-fy${filters.fiscalYear}`;
  if (filters.quarter) name += `-${filters.quarter}`;
  if (filters.clusterId) name += `-cluster${filters.clusterId}`;
  return `${name}.pdf`;
}

export default function DashboardPrintView({
  filters,
  lookupsData,
  summaryData,
  complianceData,
  trendData,
  clusterData,
  heatmapData,
  onReady,
}: Props) {
  const onReadyRef = useRef(onReady);
  onReadyRef.current = onReady;

  const headerRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const complianceRef = useRef<HTMLDivElement>(null);
  const trendRef = useRef<HTMLDivElement>(null);
  const clusterRef = useRef<HTMLDivElement>(null);
  const heatmapRef = useRef<HTMLDivElement>(null);

  // Fire once after mount — 600ms lets Recharts ResponsiveContainer paint
  useEffect(() => {
    const timer = setTimeout(() => {
      const sections = [
        headerRef.current,
        summaryRef.current,
        complianceRef.current,
        trendRef.current,
        clusterRef.current,
        heatmapRef.current,
      ].filter((el): el is HTMLDivElement => el !== null);
      onReadyRef.current(sections);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const filterLabel = buildFilterLabel(filters, lookupsData);
  const generatedDate = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const selectedCluster = lookupsData?.clusters.find(
    (c) => c.id === filters.clusterId,
  );
  const complianceSubtitle = selectedCluster
    ? `${selectedCluster.name} only`
    : 'Fleet-wide · all clusters';

  const fiscalYearData = lookupsData?.fiscal_year.find(
    (f) => f.year === filters.fiscalYear,
  );
  const trendSubtitle = fiscalYearData
    ? `${fiscalYearData.start.month} ${fiscalYearData.start.year} – ${fiscalYearData.end.month} ${fiscalYearData.end.year}`
    : undefined;

  return (
    // Outer wrapper gives every section a consistent 1190px render width
    <div style={{ width: 1190 }} className="bg-white">
      <div ref={headerRef} className="bg-white px-8 pb-4 pt-8">
        <div className="flex items-end justify-between border-b border-ink-200 pb-4">
          <div>
            <h1 className="text-xl font-bold text-ink-800">
              Executive Dashboard
            </h1>
            <p className="mt-1 text-sm text-ink-500">{filterLabel}</p>
          </div>
          <p className="text-xs text-ink-400">Generated {generatedDate}</p>
        </div>
      </div>

      <div ref={summaryRef} className="bg-white px-8 py-2">
        <SummaryKpiStrip data={summaryData} />
      </div>

      <div ref={complianceRef} className="bg-white px-8 py-2">
        <ComplianceByTankerType
          data={complianceData}
          subtitle={complianceSubtitle}
        />
      </div>

      <div ref={trendRef} className="bg-white px-8 py-2">
        <MonthlyInspectionTrend data={trendData} subtitle={trendSubtitle} />
      </div>

      <div ref={clusterRef} className="bg-white px-8 py-2">
        <ClusterContractorBreakdown data={clusterData} />
      </div>

      <div ref={heatmapRef} className="bg-white px-8 py-2">
        <ComplianceHeatmap data={heatmapData} />
      </div>
    </div>
  );
}
