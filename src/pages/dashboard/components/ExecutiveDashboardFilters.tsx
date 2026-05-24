import { MultiSelect } from '@/atoms/MultiSelect';
import type { SelectOption } from '@/atoms/option';
import type {
  ExecutiveDashboardLookupsResponse,
  Quarter,
} from '@/types/executiveDashboard';
import type { ExecutiveDashboardFilters } from '../hooks/useExecutiveDashboardFilters';

type Props = {
  lookupsData: ExecutiveDashboardLookupsResponse | null;
  filters: ExecutiveDashboardFilters;
  isClusterLocked: boolean;
  onFiscalYearsChange: (years: number[]) => void;
  onQuartersChange: (quarters: Quarter['quarter'][]) => void;
  onClusterIdsChange: (ids: number[]) => void;
};

// function buildFiscalYearOptions(
//   fiscalYears: ExecutiveDashboardLookupsResponse['fiscal_year'],
// ): SelectOption<string>[] {
//   return fiscalYears.map((fy) => ({
//     value: String(fy.year),
//     label: `FY ${fy.year} (${fy.start.month} ${fy.start.year} – ${fy.end.month} ${fy.end.year})`,
//   }));
// }

// function buildQuarterOptions(
//   quarters: ExecutiveDashboardLookupsResponse['quarters'],
// ): SelectOption<string>[] {
//   return quarters.map((q) => ({
//     value: q.quarter,
//     label: `${q.quarter} (${q.start_month} – ${q.end_month})`,
//   }));
// }

function buildClusterOptions(
  clusters: ExecutiveDashboardLookupsResponse['clusters'],
): SelectOption<string>[] {
  return clusters.map((c) => ({ value: String(c.id), label: c.name }));
}

export default function ExecutiveDashboardFilters({
  lookupsData,
  filters,
  isClusterLocked,
  onClusterIdsChange,
}: Props) {
  // const fiscalYearOptions = lookupsData
  //   ? buildFiscalYearOptions(lookupsData.fiscal_year)
  //   : [];
  // const quarterOptions = lookupsData
  //   ? buildQuarterOptions(lookupsData.quarters)
  //   : [];
  const clusterOptions = lookupsData
    ? buildClusterOptions(lookupsData.clusters)
    : [];

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* <MultiSelect
        placeholder="All Fiscal Years"
        options={fiscalYearOptions}
        value={filters.fiscalYears.map(String)}
        onChange={(vals) => onFiscalYearsChange(vals.map(Number))}
        minWidth={220}
        disabled={!lookupsData}
      /> */}
      {/* <MultiSelect
        placeholder="All Quarters"
        options={quarterOptions}
        value={filters.quarters}
        onChange={(vals) => onQuartersChange(vals as Quarter['quarter'][])}
        minWidth={180}
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
    </div>
  );
}
