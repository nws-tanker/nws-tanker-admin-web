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
  const params: DashboardParams = { fiscal_year: filters.fiscalYear };
  if (filters.quarter !== null) params.quarter = filters.quarter;
  if (filters.clusterId !== null) params.cluster = filters.clusterId;
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

  const { fiscalYear, quarter, clusterId } = filters;

  useEffect(() => {
    const params = buildParams({ fiscalYear, quarter, clusterId });
    dispatch(fetchExecutiveDashboardSummary(params));
    dispatch(fetchExecutiveDashboardCompliance(params));
    dispatch(fetchExecutiveDashboardTrend(params));
    dispatch(fetchExecutiveDashboardCluster(params));
    dispatch(fetchExecutiveDashboardHeatmap(params));
  }, [dispatch, fiscalYear, quarter, clusterId]);

  return {
    summaryState,
    complianceState,
    trendState,
    clusterState,
    heatmapState,
  };
}
