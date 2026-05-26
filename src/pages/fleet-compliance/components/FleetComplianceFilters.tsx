import { MultiSelect } from '@/atoms/MultiSelect';
import type { Lookups, Governorate } from '@/types/lookups';
import type { FleetComplianceFilters } from '../hooks/useFleetComplianceFilters';

type Props = {
  lookupsData: Lookups | null;
  filters: FleetComplianceFilters;
  isClusterLocked: boolean;
  governorateOptions: Governorate[];
  onFiscalYearIdsChange: (ids: number[]) => void;
  onClusterIdsChange: (ids: number[]) => void;
  onGovernorateIdsChange: (ids: number[]) => void;
};

export default function FleetComplianceFilters({
  lookupsData,
  filters,
  isClusterLocked,
  governorateOptions,
  onClusterIdsChange,
  onGovernorateIdsChange,
}: Props) {
  // const fiscalYearOptions = lookupsData
  //   ? lookupsData.fiscal_year.map((fy) => ({
  //       value: String(fy.year),
  //       label: `FY ${fy.year} (${fy.start.month} ${fy.start.year} – ${fy.end.month} ${fy.end.year})`,
  //     }))
  //   : [];

  const clusterOptions = lookupsData
    ? lookupsData.clusters.map((c) => ({ value: String(c.id), label: c.name }))
    : [];

  const govOptions = governorateOptions.map((g) => ({
    value: String(g.id),
    label: g.name,
  }));

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* <MultiSelect
        placeholder="All Fiscal Years"
        options={fiscalYearOptions}
        value={filters.fiscalYearIds.map(String)}
        onChange={(vals) => onFiscalYearIdsChange(vals.map(Number))}
        minWidth={220}
        disabled={!lookupsData}
      /> */}
      <MultiSelect
        placeholder="All Clusters"
        options={clusterOptions}
        value={filters.clusterIds.map(String)}
        onChange={(vals) => onClusterIdsChange(vals.map(Number))}
        minWidth={160}
        disabled={!lookupsData || isClusterLocked}
      />
      <MultiSelect
        placeholder="All Governorates"
        options={govOptions}
        value={filters.governorateIds.map(String)}
        onChange={(vals) => onGovernorateIdsChange(vals.map(Number))}
        minWidth={180}
        disabled={!lookupsData}
      />
    </div>
  );
}
