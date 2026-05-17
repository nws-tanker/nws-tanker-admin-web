import { useCallback, useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { fetchExecutiveClusters } from '@/store/apiSlices/executiveDashboardClusterApiSlice';
import { fetchExecutiveHeatmap } from '@/store/apiSlices/executiveDashboardHeatmapApiSlice';
import { fetchExecutiveSummary } from '@/store/apiSlices/executiveDashboardSummaryApiSlice';
import { fetchExecutiveTrend } from '@/store/apiSlices/executiveDashboardTrendApiSlice';
import { States } from '@/store/types';
import type { DashboardQueryParams } from '@/types/dashboard';
import type { DashboardFiltersState } from './useDashboardFilters';

function rollupApiStates(...states: States[]): States {
  if (states.some((s) => s === States.ERROR)) return States.ERROR;
  if (states.every((s) => s === States.SUCCESS)) return States.SUCCESS;
  if (states.some((s) => s === States.LOADING || s === States.PRELOADING)) {
    return States.LOADING;
  }
  return States.PRELOADING;
}

export function useExecutiveDashboard(filters: DashboardFiltersState) {
  const dispatch = useAppDispatch();

  const summary = useAppSelector((s) => s.executiveDashboardSummaryApi);
  const trend = useAppSelector((s) => s.executiveDashboardTrendApi);
  const cluster = useAppSelector((s) => s.executiveDashboardClusterApi);
  const heatmap = useAppSelector((s) => s.executiveDashboardHeatmapApi);

  const params: DashboardQueryParams = useMemo(
    () => ({
      quarter: filters.quarter,
      clusterId: filters.clusterId,
    }),
    [filters.quarter, filters.clusterId],
  );

  const loadAll = useCallback(() => {
    dispatch(fetchExecutiveSummary(params));
    dispatch(fetchExecutiveTrend(params));
    dispatch(fetchExecutiveClusters(params));
    dispatch(fetchExecutiveHeatmap(params));
  }, [dispatch, params]);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  const pageState = rollupApiStates(
    summary.apiState,
    trend.apiState,
    cluster.apiState,
    heatmap.apiState,
  );

  return {
    pageState,
    summary,
    trend,
    cluster,
    heatmap,
    retry: loadAll,
  };
}
