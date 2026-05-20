import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { fetchExecutiveDashboardSummary } from '@/store/apiSlices/executiveDashboardSummaryApiSlice';
import {
  fetchExecutiveDashboardCompliance,
  resetExecutiveDashboardCompliance,
} from '@/store/apiSlices/executiveDashboardComplianceApiSlice';
import { fetchExecutiveDashboardTrend } from '@/store/apiSlices/executiveDashboardTrendApiSlice';
import { fetchExecutiveDashboardCluster } from '@/store/apiSlices/executiveDashboardClusterApiSlice';
import { fetchExecutiveDashboardHeatmap } from '@/store/apiSlices/executiveDashboardHeatmapApiSlice';
import type { DashboardParams } from '@/types/executiveDashboard';
import type { ExecutiveDashboardFilters } from './useExecutiveDashboardFilters';

function buildParams(filters: ExecutiveDashboardFilters): DashboardParams {
  return {
    fiscal_years: filters.fiscalYears,
    quarters: filters.quarters,
    clusters: filters.clusterIds,
    governorates: [],
  };
}

export function useExecutiveDashboardData() {
  const dispatch = useAppDispatch();

  const summaryState = useAppSelector((s) => s.executiveDashboardSummaryApi);
  const complianceState = useAppSelector(
    (s) => s.executiveDashboardComplianceApi,
  );
  const trendState = useAppSelector((s) => s.executiveDashboardTrendApi);
  const clusterState = useAppSelector((s) => s.executiveDashboardClusterApi);
  const heatmapState = useAppSelector((s) => s.executiveDashboardHeatmapApi);

  useEffect(() => {
    return () => {
      dispatch(resetExecutiveDashboardCompliance());
    };
  }, [dispatch]);

  const fetchAllData = useCallback(
    (filters: ExecutiveDashboardFilters) => {
      const params = buildParams(filters);
      dispatch(fetchExecutiveDashboardSummary(params));
      dispatch(fetchExecutiveDashboardCompliance(params));
      dispatch(fetchExecutiveDashboardTrend(params));
      dispatch(fetchExecutiveDashboardCluster(params));
      dispatch(fetchExecutiveDashboardHeatmap(params));
    },
    [dispatch],
  );

  return {
    summaryState,
    complianceState,
    trendState,
    clusterState,
    heatmapState,
    fetchAllData,
  };
}
