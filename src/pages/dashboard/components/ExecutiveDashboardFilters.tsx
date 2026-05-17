import { Select } from '@/atoms/Select';
import type { SelectOption } from '@/atoms/option';
import type {
  ExecutiveDashboardLookupsResponse,
  Quarter,
} from '@/types/executiveDashboard';
import type { ExecutiveDashboardFilters } from '../hooks/useExecutiveDashboardFilters';

type Props = {
  lookupsData: ExecutiveDashboardLookupsResponse | null;
  filters: ExecutiveDashboardFilters;
  onFiscalYearChange: (year: number) => void;
  onQuarterChange: (quarter: Quarter['quarter'] | null) => void;
  onClusterChange: (id: string | null) => void;
};

const ALL_QUARTERS_VALUE = '__all__';
const ALL_CLUSTERS_VALUE = '__all__';

function buildFiscalYearOptions(
  fiscalYears: ExecutiveDashboardLookupsResponse['fiscal_year'],
): SelectOption<string>[] {
  return fiscalYears.map((fy) => ({
    value: String(fy.year),
    label: `FY ${fy.year} (${fy.start.month} ${fy.start.year} – ${fy.end.month} ${fy.end.year})`,
  }));
}

function buildQuarterOptions(
  quarters: ExecutiveDashboardLookupsResponse['quarters'],
): SelectOption<string>[] {
  return [
    { value: ALL_QUARTERS_VALUE, label: 'All Quarters' },
    ...quarters.map((q) => ({
      value: q.quarter,
      label: `${q.quarter} (${q.start_month} – ${q.end_month})`,
    })),
  ];
}

function buildClusterOptions(
  clusters: ExecutiveDashboardLookupsResponse['clusters'],
): SelectOption<string>[] {
  return [
    { value: ALL_CLUSTERS_VALUE, label: 'All Clusters' },
    ...clusters.map((c) => ({ value: c.id, label: c.name })),
  ];
}

export default function ExecutiveDashboardFilters({
  lookupsData,
  filters,
  onFiscalYearChange,
  onQuarterChange,
  onClusterChange,
}: Props) {
  const fiscalYearOptions = lookupsData
    ? buildFiscalYearOptions(lookupsData.fiscal_year)
    : [];
  const quarterOptions = lookupsData
    ? buildQuarterOptions(lookupsData.quarters)
    : [];
  const clusterOptions = lookupsData
    ? buildClusterOptions(lookupsData.clusters)
    : [];

  function handleFiscalYearChange(val: string) {
    onFiscalYearChange(Number(val));
  }

  function handleQuarterChange(val: string) {
    onQuarterChange(
      val === ALL_QUARTERS_VALUE ? null : (val as Quarter['quarter']),
    );
  }

  function handleClusterChange(val: string) {
    onClusterChange(val === ALL_CLUSTERS_VALUE ? null : val);
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Select
        aria-label="Fiscal year"
        options={fiscalYearOptions}
        value={String(filters.fiscalYear)}
        onChange={handleFiscalYearChange}
        placeholder="Fiscal Year"
        minWidth={220}
        disabled={!lookupsData}
      />
      <Select
        aria-label="Quarter"
        options={quarterOptions}
        value={filters.quarter ?? ALL_QUARTERS_VALUE}
        onChange={handleQuarterChange}
        placeholder="Quarter"
        minWidth={180}
        disabled={!lookupsData}
      />
      <Select
        aria-label="Cluster"
        options={clusterOptions}
        value={filters.clusterId ?? ALL_CLUSTERS_VALUE}
        onChange={handleClusterChange}
        placeholder="Cluster"
        minWidth={160}
        disabled={!lookupsData}
      />
    </div>
  );
}
