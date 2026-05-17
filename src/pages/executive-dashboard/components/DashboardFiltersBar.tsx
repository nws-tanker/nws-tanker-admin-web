import { Button, Select } from '@/atoms';
import { DownloadIcon } from '@/atoms/icons';
import type { SelectOption } from '@/atoms/option';
import type { Cluster } from '@/types';
import { buildQuarterOptions } from '../executiveDashboardHelpers';

type Props = {
  quarter: string;
  clusterId: number | null;
  clusters: Cluster[];
  onQuarterChange: (q: string) => void;
  onClusterChange: (id: number | null) => void;
  onExportPdf?: () => void;
};

const QUARTER_OPTIONS: SelectOption<string>[] = buildQuarterOptions().map(
  (o) => ({ value: o.value, label: o.label }),
);

export function DashboardFiltersBar({
  quarter,
  clusterId,
  clusters,
  onQuarterChange,
  onClusterChange,
  onExportPdf,
}: Props) {
  const clusterOptions: SelectOption<string>[] = [
    { value: 'all', label: 'All 3 Clusters' },
    ...clusters.map((c) => ({
      value: String(c.id),
      label: c.name,
    })),
  ];

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <Select
        value={quarter}
        options={QUARTER_OPTIONS}
        onChange={onQuarterChange}
        aria-label="Quarter"
        className="min-w-[120px]"
      />
      <Select
        value={clusterId != null ? String(clusterId) : 'all'}
        options={clusterOptions}
        onChange={(v) => onClusterChange(v === 'all' ? null : Number(v))}
        aria-label="Cluster"
        className="min-w-[160px]"
      />
      <Button
        variant="secondary"
        size="sm"
        leftIcon={<DownloadIcon className="h-3.5 w-3.5" />}
        onClick={onExportPdf}
        disabled={!onExportPdf}
      >
        Export PDF
      </Button>
    </div>
  );
}
