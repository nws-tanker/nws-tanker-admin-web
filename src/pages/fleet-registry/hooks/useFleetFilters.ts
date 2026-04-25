import { useCallback, useState } from 'react';
import { useLookups } from '@/hooks/useLookups';
import {
  EMPTY_FILTERS,
  governoratesForClusters,
} from '../fleetRegistryHelpers';
import type { FleetFilters, PermitStatus, TankerType } from '@/types';

export function useFleetFilters() {
  const { lookups } = useLookups();
  const [filters, setFilters] = useState<FleetFilters>(EMPTY_FILTERS);

  const setSearch = useCallback((search: string) => {
    setFilters((prev) => ({ ...prev, search }));
  }, []);

  const setClusterIds = useCallback(
    (clusterIds: string[]) => {
      setFilters((prev) => {
        const allowedIds = governoratesForClusters(
          lookups?.governorates ?? [],
          clusterIds,
        ).map((g) => g.id);
        return {
          ...prev,
          clusterIds,
          governorateIds: prev.governorateIds.filter((id) =>
            allowedIds.includes(id),
          ),
        };
      });
    },
    [lookups],
  );

  const setGovernorateIds = useCallback((governorateIds: string[]) => {
    setFilters((prev) => ({ ...prev, governorateIds }));
  }, []);

  const setTankerTypes = useCallback((tankerTypes: TankerType[]) => {
    setFilters((prev) => ({ ...prev, tankerTypes }));
  }, []);

  const setPermitStatuses = useCallback((permitStatuses: PermitStatus[]) => {
    setFilters((prev) => ({ ...prev, permitStatuses }));
  }, []);

  const reset = useCallback(() => setFilters(EMPTY_FILTERS), []);

  return {
    filters,
    setSearch,
    setClusterIds,
    setGovernorateIds,
    setTankerTypes,
    setPermitStatuses,
    reset,
  };
}
