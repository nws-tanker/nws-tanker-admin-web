import { useState, useEffect } from 'react';
import type {
  ExecutiveDashboardLookupsResponse,
  Quarter,
} from '@/types/executiveDashboard';

export type ExecutiveDashboardFilters = {
  fiscalYear: number;
  quarter: Quarter['quarter'] | null; // null = All quarters
  clusterId: string | null; // null = All clusters
};

type UseExecutiveDashboardFiltersReturn = {
  filters: ExecutiveDashboardFilters;
  setFiscalYear: (year: number) => void;
  setQuarter: (quarter: Quarter['quarter'] | null) => void;
  setClusterId: (id: string | null) => void;
};

export function useExecutiveDashboardFilters(
  lookupsData: ExecutiveDashboardLookupsResponse | null,
): UseExecutiveDashboardFiltersReturn {
  const [filters, setFilters] = useState<ExecutiveDashboardFilters>({
    fiscalYear: new Date().getFullYear(),
    quarter: null,
    clusterId: null,
  });

  // Once lookups load, initialise fiscalYear to the one marked default: true
  useEffect(() => {
    if (!lookupsData) return;
    const defaultYear = lookupsData.fiscal_year.find((fy) => fy.default);
    if (defaultYear) {
      setFilters((prev) => ({ ...prev, fiscalYear: defaultYear.year }));
    }
  }, [lookupsData]);

  function setFiscalYear(year: number) {
    setFilters((prev) => ({ ...prev, fiscalYear: year }));
  }

  function setQuarter(quarter: Quarter['quarter'] | null) {
    setFilters((prev) => ({ ...prev, quarter }));
  }

  function setClusterId(clusterId: string | null) {
    setFilters((prev) => ({ ...prev, clusterId }));
  }

  return { filters, setFiscalYear, setQuarter, setClusterId };
}
