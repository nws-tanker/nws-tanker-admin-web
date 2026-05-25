import { useMemo } from 'react';
import { SearchInput, Select, TextInput, type SelectOption } from '@/atoms';
import type { Cluster, Governorate } from '@/types';
import type { ApprovedInspectionTankerType } from '@/types/permitRegeneration';
import {
  TANKER_TYPE_OPTIONS,
  governoratesForCluster,
} from '../permitRegenerationHelpers';
import { todayIso } from '@/utils/date';
import type { PermitRegenerationFilters as Filters } from '../hooks/usePermitRegenerationFilters';

type Props = {
  filters: Filters;
  clusters: Cluster[];
  governorates: Governorate[];
  onStartDate: (value: string) => void;
  onEndDate: (value: string) => void;
  onClusterId: (value: number | null) => void;
  onGovernorateId: (value: number | null) => void;
  onTankerType: (value: ApprovedInspectionTankerType | null) => void;
  onSearch: (value: string) => void;
};

export function PermitRegenerationFilters({
  filters,
  clusters,
  governorates,
  onStartDate,
  onEndDate,
  onClusterId,
  onGovernorateId,
  onTankerType,
  onSearch,
}: Props) {
  const clusterOptions = useMemo<SelectOption[]>(
    () => clusters.map((c) => ({ value: String(c.id), label: c.name })),
    [clusters],
  );

  const govOptions = useMemo<SelectOption[]>(
    () =>
      governoratesForCluster(governorates, filters.clusterId).map((g) => ({
        value: String(g.id),
        label: g.name,
      })),
    [governorates, filters.clusterId],
  );

  return (
    <div className="mb-5 flex flex-wrap items-center gap-2.5 rounded-card-lg border border-ink-200 bg-white px-4 py-3.5">
      <span className="text-[13px] font-medium text-ink-600">Filters:</span>

      <TextInput
        type="date"
        value={filters.startDate}
        onChange={(e) => onStartDate(e.target.value)}
        max={filters.endDate || todayIso()}
        className="!w-[160px]"
        aria-label="Start date"
      />
      <span className="text-ink-400">—</span>
      <TextInput
        type="date"
        value={filters.endDate}
        onChange={(e) => onEndDate(e.target.value)}
        min={filters.startDate || undefined}
        max={todayIso()}
        className="!w-[160px]"
        aria-label="End date"
      />

      {clusters.length > 1 ? (
        <Select
          placeholder="All Clusters"
          options={clusterOptions}
          value={filters.clusterId == null ? '' : String(filters.clusterId)}
          onChange={(v) => onClusterId(v === '' ? null : Number(v))}
        />
      ) : null}
      <Select
        placeholder="All Governorates"
        options={govOptions}
        value={
          filters.governorateId == null ? '' : String(filters.governorateId)
        }
        onChange={(v) => onGovernorateId(v === '' ? null : Number(v))}
      />
      <Select<ApprovedInspectionTankerType>
        placeholder="All Types"
        options={TANKER_TYPE_OPTIONS}
        value={filters.tankerType ?? ''}
        onChange={(v) => onTankerType(v === '' ? null : v)}
      />

      <SearchInput
        value={filters.search}
        onChange={onSearch}
        placeholder="Search plate no. e.g. OM 11 AC"
        className="min-w-[240px] flex-1"
      />
    </div>
  );
}
