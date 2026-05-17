import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { currentQuarterLabel } from '../executiveDashboardHelpers';

export type DashboardFiltersState = {
  quarter: string;
  clusterId: number | null;
};

export function useDashboardFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const quarter = searchParams.get('quarter') ?? currentQuarterLabel();
  const clusterParam = searchParams.get('clusterId');
  const clusterId =
    clusterParam && clusterParam !== 'all' ? Number(clusterParam) : null;

  const filters: DashboardFiltersState = useMemo(
    () => ({ quarter, clusterId }),
    [quarter, clusterId],
  );

  const setQuarter = useCallback(
    (value: string) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        next.set('quarter', value);
        return next;
      });
    },
    [setSearchParams],
  );

  const setClusterId = useCallback(
    (value: number | null) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        if (value == null) {
          next.delete('clusterId');
        } else {
          next.set('clusterId', String(value));
        }
        return next;
      });
    },
    [setSearchParams],
  );

  return { filters, setQuarter, setClusterId };
}
