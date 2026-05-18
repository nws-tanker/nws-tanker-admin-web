import { useState, useEffect } from 'react';
import type {
  ExecutiveDashboardLookupsResponse,
  Quarter,
} from '@/types/executiveDashboard';

export type ExecutiveDashboardFilters = {
  fiscalYears: number[];
  quarters: Quarter['quarter'][];
  clusterIds: string[];
};

type UseExecutiveDashboardFiltersReturn = {
  filters: ExecutiveDashboardFilters;
  setFiscalYears: (years: number[]) => void;
  setQuarters: (quarters: Quarter['quarter'][]) => void;
  setClusterIds: (ids: string[]) => void;
};

export function useExecutiveDashboardFilters(
  lookupsData: ExecutiveDashboardLookupsResponse | null,
): UseExecutiveDashboardFiltersReturn {
  const [filters, setFilters] = useState<ExecutiveDashboardFilters>({
    fiscalYears: [new Date().getFullYear()],
    quarters: [],
    clusterIds: [],
  });

  // Once lookups load, initialise fiscalYears to the one marked default: true
  useEffect(() => {
    if (!lookupsData) return;
    const defaultYear = lookupsData.fiscal_year.find((fy) => fy.default);
    if (defaultYear) {
      setFilters((prev) => ({ ...prev, fiscalYears: [defaultYear.year] }));
    }
  }, [lookupsData]);

  function setFiscalYears(fiscalYears: number[]) {
    setFilters((prev) => ({ ...prev, fiscalYears }));
  }

  function setQuarters(quarters: Quarter['quarter'][]) {
    setFilters((prev) => ({ ...prev, quarters }));
  }

  function setClusterIds(clusterIds: string[]) {
    setFilters((prev) => ({ ...prev, clusterIds }));
  }

  return { filters, setFiscalYears, setQuarters, setClusterIds };
}
