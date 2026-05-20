import { useEffect, useRef, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { fetchExecutiveDashboardLookups } from '@/store/apiSlices/executiveDashboardLookupsApiSlice';
import { States } from '@/store/types';
import type { Quarter } from '@/types/executiveDashboard';
import { useExecutiveDashboardFilters } from './useExecutiveDashboardFilters';
import { useExecutiveDashboardData } from './useExecutiveDashboardData';

export function useExecutiveDashboard() {
  const dispatch = useAppDispatch();
  const lookupsState = useAppSelector((s) => s.executiveDashboardLookupsApi);

  // Derive cluster restriction from current user profile
  const currentUserApi = useAppSelector((s) => s.currentUserApi);
  const isUserResolved =
    currentUserApi.apiState === States.SUCCESS ||
    currentUserApi.apiState === States.ERROR;
  const userClusterId: number | null | undefined = isUserResolved
    ? (currentUserApi.data?.clusterId ?? null)
    : undefined;

  const {
    filters,
    isInitialized,
    isClusterLocked,
    setFiscalYears,
    setQuarters,
    setClusterIds,
  } = useExecutiveDashboardFilters(lookupsState.data, userClusterId);

  const {
    summaryState,
    complianceState,
    trendState,
    clusterState,
    heatmapState,
    fetchAllData,
  } = useExecutiveDashboardData();

  useEffect(() => {
    if (lookupsState.apiState === States.PRELOADING) {
      dispatch(fetchExecutiveDashboardLookups());
    }
  }, [dispatch, lookupsState.apiState]);

  // Fire once after lookups load and default filters are initialised
  const initialFetchDone = useRef(false);
  const filtersRef = useRef(filters);
  filtersRef.current = filters;

  useEffect(() => {
    if (!isInitialized || initialFetchDone.current) return;
    initialFetchDone.current = true;
    fetchAllData(filtersRef.current);
  }, [isInitialized, fetchAllData]);

  const handleFiscalYearsChange = useCallback(
    (newYears: number[]) => {
      setFiscalYears(newYears);
      fetchAllData({
        fiscalYears: newYears,
        quarters: filters.quarters,
        clusterIds: filters.clusterIds,
      });
    },
    [setFiscalYears, fetchAllData, filters.quarters, filters.clusterIds],
  );

  const handleQuartersChange = useCallback(
    (newQuarters: Quarter['quarter'][]) => {
      setQuarters(newQuarters);
      fetchAllData({
        fiscalYears: filters.fiscalYears,
        quarters: newQuarters,
        clusterIds: filters.clusterIds,
      });
    },
    [setQuarters, fetchAllData, filters.fiscalYears, filters.clusterIds],
  );

  const handleClusterIdsChange = useCallback(
    (newIds: number[]) => {
      if (isClusterLocked) return;
      setClusterIds(newIds);
      fetchAllData({
        fiscalYears: filters.fiscalYears,
        quarters: filters.quarters,
        clusterIds: newIds,
      });
    },
    [
      isClusterLocked,
      setClusterIds,
      fetchAllData,
      filters.fiscalYears,
      filters.quarters,
    ],
  );

  return {
    filters,
    isClusterLocked,
    setFiscalYears: handleFiscalYearsChange,
    setQuarters: handleQuartersChange,
    setClusterIds: handleClusterIdsChange,
    lookupsState,
    summaryState,
    complianceState,
    trendState,
    clusterState,
    heatmapState,
  };
}
