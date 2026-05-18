import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { fetchExecutiveDashboardSummary } from '@/store/apiSlices/executiveDashboardSummaryApiSlice';
import { fetchExecutiveDashboardCompliance } from '@/store/apiSlices/executiveDashboardComplianceApiSlice';
import { fetchExecutiveDashboardTrend } from '@/store/apiSlices/executiveDashboardTrendApiSlice';
import { fetchExecutiveDashboardCluster } from '@/store/apiSlices/executiveDashboardClusterApiSlice';
import { fetchExecutiveDashboardHeatmap } from '@/store/apiSlices/executiveDashboardHeatmapApiSlice';
import type { DashboardParams } from '@/types/executiveDashboard';
import type { ExecutiveDashboardFilters } from './useExecutiveDashboardFilters';

function buildParams(filters: ExecutiveDashboardFilters): DashboardParams {
  const params: DashboardParams = {};
  if (filters.fiscalYears.length > 0) params.fiscal_years = filters.fiscalYears;
  if (filters.quarters.length > 0) params.quarters = filters.quarters;
  if (filters.clusterIds.length > 0) params.clusters = filters.clusterIds;
  return params;
}

export function useExecutiveDashboardData(filters: ExecutiveDashboardFilters) {
  const dispatch = useAppDispatch();

  const summaryState = useAppSelector((s) => s.executiveDashboardSummaryApi);
  const complianceState = useAppSelector(
    (s) => s.executiveDashboardComplianceApi,
  );
  const trendState = useAppSelector((s) => s.executiveDashboardTrendApi);
  const clusterState = useAppSelector((s) => s.executiveDashboardClusterApi);
  const heatmapState = useAppSelector((s) => s.executiveDashboardHeatmapApi);

  const { fiscalYears, quarters, clusterIds } = filters;
  // Stable string keys prevent unnecessary re-fetches when array references change but values don't
  const fiscalYearsKey = fiscalYears.join(',');
  const quartersKey = quarters.join(',');
  const clusterIdsKey = clusterIds.join(',');

  useEffect(() => {
    const params = buildParams({ fiscalYears, quarters, clusterIds });
    dispatch(fetchExecutiveDashboardSummary(params));
    dispatch(fetchExecutiveDashboardCompliance(params));
    dispatch(fetchExecutiveDashboardTrend(params));
    dispatch(fetchExecutiveDashboardCluster(params));
    dispatch(fetchExecutiveDashboardHeatmap(params));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, fiscalYearsKey, quartersKey, clusterIdsKey]);

  return {
    summaryState,
    complianceState,
    trendState,
    clusterState,
    heatmapState,
  };
}
