import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { fetchExecutiveDashboardLookups } from '@/store/apiSlices/executiveDashboardLookupsApiSlice';
import { States } from '@/store/types';
import { useExecutiveDashboardFilters } from './useExecutiveDashboardFilters';
import { useExecutiveDashboardData } from './useExecutiveDashboardData';

export function useExecutiveDashboard() {
  const dispatch = useAppDispatch();
  const lookupsState = useAppSelector((s) => s.executiveDashboardLookupsApi);

  const { filters, setFiscalYears, setQuarters, setClusterIds } =
    useExecutiveDashboardFilters(lookupsState.data);

  const {
    summaryState,
    complianceState,
    trendState,
    clusterState,
    heatmapState,
  } = useExecutiveDashboardData(filters);

  useEffect(() => {
    if (lookupsState.apiState === States.PRELOADING) {
      dispatch(fetchExecutiveDashboardLookups());
    }
  }, [dispatch, lookupsState.apiState]);

  return {
    filters,
    setFiscalYears,
    setQuarters,
    setClusterIds,
    lookupsState,
    summaryState,
    complianceState,
    trendState,
    clusterState,
    heatmapState,
  };
}
