import { EmptyState, Pagination } from '@/atoms';
import type { LookupIndex } from '@/hooks/useLookups';
import type {
  Cluster,
  Governorate,
  Inspector,
  SampleCollector,
  Tanker,
} from '@/types';
import { FleetRegistryRow } from './FleetRegistryRow';

type Props = {
  rows: Tanker[];
  page: number;
  totalPages: number;
  from: number;
  to: number;
  total: number;
  clustersById: LookupIndex<Cluster>;
  governoratesById: LookupIndex<Governorate>;
  inspectorsById: LookupIndex<Inspector>;
  sampleCollectorsById: LookupIndex<SampleCollector>;
  onPageChange: (next: number) => void;
  onAssign: (tanker: Tanker) => void;
  onView: (tanker: Tanker) => void;
};

type Column = { header: string; width: string };

// Widths vary per column based on content needs:
// - narrow columns (plate, cluster, type chip, permit badge, contact, actions)
//   get fixed percentages sized to their content
// - "auto" columns (Owner, Assigned Inspector) flex to absorb the remaining
//   space, so the table always fills its container exactly — no horizontal
//   scrollbar, columns stay proportional on any viewport width.
const COLUMNS: Column[] = [
  { header: 'Plate No.', width: '7%' },
  { header: 'Owner', width: 'auto' },
  { header: 'Tanker Type', width: '13%' },
  { header: 'Governorate', width: '11%' },
  { header: 'Cluster', width: '8%' },
  { header: 'Contact', width: '11%' },
  { header: 'Permit Status', width: '10%' },
  { header: 'Assigned Inspector', width: 'auto' },
  { header: '', width: '11%' },
];

export function FleetRegistryTable({
  rows,
  page,
  totalPages,
  from,
  to,
  total,
  clustersById,
  governoratesById,
  inspectorsById,
  sampleCollectorsById,
  onPageChange,
  onAssign,
  onView,
}: Props) {
  if (total === 0) {
    return (
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-card-lg border border-ink-200 bg-white shadow-card-sm">
        <EmptyState
          title="No tankers match the current filters"
          description="Try adjusting or clearing the filters above"
        />
      </div>
    );
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-card-lg border border-ink-200 bg-white shadow-card-sm">
      <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden">
        <table className="w-full table-fixed text-[13px]">
          <colgroup>
            {COLUMNS.map((col, idx) => (
              <col key={idx} style={{ width: col.width }} />
            ))}
          </colgroup>
          <thead>
            <tr>
              {COLUMNS.map((col, idx) => (
                <th
                  key={idx}
                  className="sticky top-0 whitespace-nowrap border-b border-ink-200 bg-ink-50 px-4 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wider text-ink-500"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((t) => {
              const inspector = t.assignment
                ? (inspectorsById.get(t.assignment.inspectorId) ?? null)
                : null;
              const sampler =
                t.assignment && t.assignment.samplerId
                  ? (sampleCollectorsById.get(t.assignment.samplerId) ?? null)
                  : null;
              return (
                <FleetRegistryRow
                  key={t.id}
                  tanker={t}
                  governorateName={
                    governoratesById.get(t.governorateId)?.name ?? ''
                  }
                  clusterName={clustersById.get(t.clusterId)?.name ?? ''}
                  inspector={inspector}
                  sampler={sampler}
                  onAssign={onAssign}
                  onView={onView}
                />
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex shrink-0 items-center justify-between gap-4 border-t border-ink-100 bg-ink-25 px-5 py-3">
        <div className="text-[13px] text-ink-500">
          Showing{' '}
          <strong className="text-ink-800">
            {from}–{to}
          </strong>{' '}
          of <strong className="text-ink-800">{total.toLocaleString()}</strong>{' '}
          tankers
        </div>
        <Pagination
          page={page}
          totalPages={totalPages}
          onChange={onPageChange}
        />
      </div>
    </div>
  );
}
