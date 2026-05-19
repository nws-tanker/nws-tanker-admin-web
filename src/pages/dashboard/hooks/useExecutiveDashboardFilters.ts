import { useState, useEffect } from 'react';
import type {
  ExecutiveDashboardLookupsResponse,
  Quarter,
} from '@/types/executiveDashboard';

export type ExecutiveDashboardFilters = {
  fiscalYears: number[];
  quarters: Quarter['quarter'][];
  clusterIds: number[];
};

type UseExecutiveDashboardFiltersReturn = {
  filters: ExecutiveDashboardFilters;
  isInitialized: boolean;
  isClusterLocked: boolean;
  setFiscalYears: (years: number[]) => void;
  setQuarters: (quarters: Quarter['quarter'][]) => void;
  setClusterIds: (ids: number[]) => void;
};

// userClusterId: undefined = currentUser still loading; null = no restriction; number = locked cluster
export function useExecutiveDashboardFilters(
  lookupsData: ExecutiveDashboardLookupsResponse | null,
  userClusterId: number | null | undefined,
): UseExecutiveDashboardFiltersReturn {
  const [filters, setFilters] = useState<ExecutiveDashboardFilters>({
    fiscalYears: [new Date().getFullYear()],
    quarters: [],
    clusterIds: [],
  });
  const [isInitialized, setIsInitialized] = useState(false);

  // Wait for both lookups and current user profile before initialising
  useEffect(() => {
    if (!lookupsData || userClusterId === undefined) return;
    const defaultYear = lookupsData.fiscal_year.find((fy) => fy.default);
    setFilters((prev) => ({
      ...prev,
      fiscalYears: defaultYear ? [defaultYear.year] : prev.fiscalYears,
      clusterIds: userClusterId !== null ? [userClusterId] : prev.clusterIds,
    }));
    setIsInitialized(true);
  }, [lookupsData, userClusterId]);

  function setFiscalYears(fiscalYears: number[]) {
    setFilters((prev) => ({ ...prev, fiscalYears }));
  }

  function setQuarters(quarters: Quarter['quarter'][]) {
    setFilters((prev) => ({ ...prev, quarters }));
  }

  function setClusterIds(clusterIds: number[]) {
    setFilters((prev) => ({ ...prev, clusterIds }));
  }

  return {
    filters,
    isInitialized,
    isClusterLocked: userClusterId !== null && userClusterId !== undefined,
    setFiscalYears,
    setQuarters,
    setClusterIds,
  };
}
