import { EmptyState, Pagination } from '@/atoms';
import type { Tanker } from '@/types';
import { FleetRegistryRow } from './FleetRegistryRow';

type Props = {
  rows: Tanker[];
  page: number;
  totalPages: number;
  from: number;
  to: number;
  total: number;
  onPageChange: (next: number) => void;
  onView: (tanker: Tanker) => void;
};

type Column = { header: string; width: string };

const COLUMNS: Column[] = [
  { header: 'Plate No.', width: '12%' },
  { header: 'Owner', width: '15%' },
  { header: 'Tanker Type', width: '13%' },
  { header: 'Governorate', width: '11%' },
  { header: 'Cluster', width: '8%' },
  { header: 'Contact', width: '11%' },
  { header: 'Permit Status', width: '10%' },
  { header: '', width: '11%' },
];

export function FleetRegistryTable({
  rows,
  page,
  totalPages,
  from,
  to,
  total,
  onPageChange,
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
            {rows.map((t) => (
              <FleetRegistryRow
                key={t.id}
                tanker={t}
                governorateName={t.governorate}
                clusterName={t.cluster}
                onView={onView}
              />
            ))}
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
