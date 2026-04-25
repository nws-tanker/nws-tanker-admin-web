import { useMemo } from 'react';
import { Button, MultiSelect, SearchInput, type SelectOption } from '@/atoms';
import type { FleetFilters, Lookups, PermitStatus, TankerType } from '@/types';
import { governoratesForClusters } from '../fleetRegistryHelpers';

type Props = {
  filters: FleetFilters;
  hasActive: boolean;
  lookups: Lookups;
  onSearch: (value: string) => void;
  onClusterIds: (next: string[]) => void;
  onGovernorateIds: (next: string[]) => void;
  onTankerTypes: (next: TankerType[]) => void;
  onPermitStatuses: (next: PermitStatus[]) => void;
  onReset: () => void;
};

export function FleetRegistryFilters({
  filters,
  hasActive,
  lookups,
  onSearch,
  onClusterIds,
  onGovernorateIds,
  onTankerTypes,
  onPermitStatuses,
  onReset,
}: Props) {
  const clusterOptions = useMemo<SelectOption[]>(
    () => lookups.clusters.map((c) => ({ value: c.id, label: c.name })),
    [lookups.clusters],
  );

  const governorateOptions = useMemo<SelectOption[]>(
    () =>
      governoratesForClusters(lookups.governorates, filters.clusterIds).map(
        (g) => ({ value: g.id, label: g.name }),
      ),
    [lookups.governorates, filters.clusterIds],
  );

  const typeOptions = useMemo<SelectOption<TankerType>[]>(
    () => lookups.tankerTypes.map((t) => ({ value: t.id, label: t.name })),
    [lookups.tankerTypes],
  );

  const permitOptions = useMemo<SelectOption<PermitStatus>[]>(
    () => lookups.permitStatuses.map((p) => ({ value: p.id, label: p.name })),
    [lookups.permitStatuses],
  );

  return (
    <div className="mb-5 flex flex-wrap items-center gap-2.5 rounded-card-lg border border-ink-200 bg-white px-4 py-3.5">
      <SearchInput
        value={filters.search}
        onChange={onSearch}
        placeholder="Search plate, owner, contact…"
        className="flex-1"
      />

      {lookups.clusters.length > 1 ? (
        <MultiSelect
          placeholder="All Clusters"
          options={clusterOptions}
          value={filters.clusterIds}
          onChange={onClusterIds}
        />
      ) : null}
      <MultiSelect
        placeholder="All Governorates"
        options={governorateOptions}
        value={filters.governorateIds}
        onChange={onGovernorateIds}
      />
      <MultiSelect<TankerType>
        placeholder="All Types"
        options={typeOptions}
        value={filters.tankerTypes}
        onChange={onTankerTypes}
      />
      <MultiSelect<PermitStatus>
        placeholder="All Statuses"
        options={permitOptions}
        value={filters.permitStatuses}
        onChange={onPermitStatuses}
      />

      <Button
        variant="ghost"
        size="sm"
        onClick={onReset}
        className={hasActive ? undefined : 'invisible'}
      >
        Clear all
      </Button>
    </div>
  );
}
