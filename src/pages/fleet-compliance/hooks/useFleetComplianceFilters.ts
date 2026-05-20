import { useState, useEffect } from 'react';
import type { Lookups, Governorate } from '@/types/lookups';
import type { FleetComplianceParams } from '@/types/fleetCompliance';
import type { DashboardParams } from '@/types/executiveDashboard';
import { States } from '@/store/types';

export type FleetComplianceFilters = {
  fiscalYearIds: number[];
  clusterIds: number[];
  governorateIds: number[];
};

type UseFleetComplianceFiltersReturn = {
  filters: FleetComplianceFilters;
  isClusterLocked: boolean;
  setFiscalYearIds: (ids: number[]) => void;
  setClusterIds: (ids: number[]) => void;
  setGovernorateIds: (ids: number[]) => void;
  governorateOptions: Governorate[];
  fleetBody: FleetComplianceParams;
  tankerTypeBody: DashboardParams;
  ready: boolean;
};

// userClusterId: undefined = currentUser still loading; null = no restriction; number = locked cluster
export function useFleetComplianceFilters(
  lookupsData: Lookups | null,
  lookupsApiState: States,
  userClusterId: number | null | undefined,
): UseFleetComplianceFiltersReturn {
  const [filters, setFilters] = useState<FleetComplianceFilters>({
    fiscalYearIds: [],
    clusterIds: [],
    governorateIds: [],
  });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (
      lookupsApiState === States.PRELOADING ||
      lookupsApiState === States.LOADING
    )
      return;
    if (!lookupsData || userClusterId === undefined) return;
    const defaultYear = lookupsData.fiscal_year.find((fy) => fy.default);
    setFilters((prev) => ({
      ...prev,
      fiscalYearIds: defaultYear ? [defaultYear.year] : prev.fiscalYearIds,
      clusterIds: userClusterId !== null ? [userClusterId] : prev.clusterIds,
    }));
    setReady(true);
  }, [lookupsData, lookupsApiState, userClusterId]);

  function setFiscalYearIds(fiscalYearIds: number[]) {
    setFilters((prev) => ({ ...prev, fiscalYearIds }));
  }

  function setClusterIds(clusterIds: number[]) {
    setFilters((prev) => {
      const validGovernorateIds = prev.governorateIds.filter((gId) => {
        const gov = lookupsData?.governorates.find((g) => g.id === gId);
        return (
          gov &&
          (clusterIds.length === 0 ||
            clusterIds.some((id) => String(id) === gov.clusterId))
        );
      });
      return { ...prev, clusterIds, governorateIds: validGovernorateIds };
    });
  }

  function setGovernorateIds(governorateIds: number[]) {
    setFilters((prev) => ({ ...prev, governorateIds }));
  }

  const governorateOptions: Governorate[] = lookupsData
    ? filters.clusterIds.length === 0
      ? lookupsData.governorates
      : lookupsData.governorates.filter((g) =>
          filters.clusterIds.some((id) => String(id) === g.clusterId),
        )
    : [];

  const fleetBody: FleetComplianceParams = {
    fiscal_years: filters.fiscalYearIds,
    clusters: filters.clusterIds,
    governorates: filters.governorateIds,
  };

  const tankerTypeBody: DashboardParams = {
    fiscal_years: filters.fiscalYearIds,
    quarters: [],
    clusters: filters.clusterIds,
    governorates: filters.governorateIds,
  };

  return {
    filters,
    isClusterLocked: userClusterId !== null && userClusterId !== undefined,
    setFiscalYearIds,
    setClusterIds,
    setGovernorateIds,
    governorateOptions,
    fleetBody,
    tankerTypeBody,
    ready,
  };
}
