import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { fetchExecutiveDashboardLookups } from '@/store/apiSlices/executiveDashboardLookupsApiSlice';
import { States } from '@/store/types';
import { useExecutiveDashboardFilters } from './useExecutiveDashboardFilters';
import { useExecutiveDashboardData } from './useExecutiveDashboardData';

export function useExecutiveDashboard() {
  const dispatch = useAppDispatch();
  const lookupsState = useAppSelector((s) => s.executiveDashboardLookupsApi);

  const { filters, setFiscalYear, setQuarter, setClusterId } =
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
    setFiscalYear,
    setQuarter,
    setClusterId,
    lookupsState,
    summaryState,
    complianceState,
    trendState,
    clusterState,
    heatmapState,
  };
}
