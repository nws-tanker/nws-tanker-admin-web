import { useState } from 'react';
import type { ApprovedInspectionTankerType } from '@/types/permitRegeneration';

export type PermitRegenerationFilterState = {
  startDate: string;
  endDate: string;
  clusterId: number | null;
  governorateId: number | null;
  tankerType: ApprovedInspectionTankerType | null;
  search: string;
};

const INITIAL_FILTERS: PermitRegenerationFilterState = {
  startDate: '',
  endDate: '',
  clusterId: null,
  governorateId: null,
  tankerType: null,
  search: '',
};

export function usePermitRegenerationFilters() {
  const [filters, setFilters] =
    useState<PermitRegenerationFilterState>(INITIAL_FILTERS);

  return {
    filters,
    setStartDate: (value: string) =>
      setFilters((f) => ({ ...f, startDate: value })),
    setEndDate: (value: string) =>
      setFilters((f) => ({ ...f, endDate: value })),
    setClusterId: (value: number | null) =>
      setFilters((f) => ({ ...f, clusterId: value })),
    setGovernorateId: (value: number | null) =>
      setFilters((f) => ({ ...f, governorateId: value })),
    setTankerType: (value: ApprovedInspectionTankerType | null) =>
      setFilters((f) => ({ ...f, tankerType: value })),
    setSearch: (value: string) => setFilters((f) => ({ ...f, search: value })),
    reset: () => setFilters(INITIAL_FILTERS),
  };
}
