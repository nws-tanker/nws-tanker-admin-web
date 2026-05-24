import { useState } from 'react';
import { Checkbox, CountBadge, EmptyState, Pagination } from '@/atoms';
import type { ApprovedInspection } from '@/types/permitRegeneration';
import { PermitPdfModal } from './PermitPdfModal';
import { PermitRegenerationRow } from './PermitRegenerationRow';

type Props = {
  rows: ApprovedInspection[];
  totalCount: number;
  selectedCount: number;
  isSelected: (id: number) => boolean;
  onToggleRow: (id: number) => void;
  onToggleAll: (ids: number[], on: boolean) => void;
  page: number;
  totalPages: number;
  onPageChange: (next: number) => void;
  loading?: boolean;
};

type Column = { header: string; width: string };

const COLUMNS: Column[] = [
  { header: '', width: '40px' },
  { header: 'Plate No.', width: '11%' },
  { header: 'Owner', width: '14%' },
  { header: 'Type', width: '11%' },
  { header: 'Cluster', width: '8%' },
  { header: 'Governorate', width: '10%' },
  { header: 'Permit No.', width: '10%' },
  { header: 'Current Permit', width: '10%' },
  { header: 'Expiry Date', width: '10%' },
  { header: 'Last Inspector', width: '12%' },
];

export function PermitRegenerationTable({
  rows,
  totalCount,
  selectedCount,
  isSelected,
  onToggleRow,
  onToggleAll,
  page,
  totalPages,
  onPageChange,
  loading,
}: Props) {
  const [pdfTarget, setPdfTarget] = useState<ApprovedInspection | null>(null);
  const pageIds = rows.map((r) => r.inspection_id);
  const allSelected = pageIds.length > 0 && pageIds.every(isSelected);
  const someSelected = !allSelected && pageIds.some(isSelected);

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-card-lg border border-ink-200 bg-white shadow-card-sm">
      <div className="flex items-center gap-3 border-b border-ink-100 px-5 py-3">
        <span className="text-[13px] font-semibold text-ink-800">Tankers</span>
        <CountBadge
          value={totalCount}
          tone="default"
          className="!bg-ink-100 !text-ink-700"
        />
        {selectedCount > 0 ? (
          <span className="text-[13px] font-medium text-teal-700">
            {selectedCount} selected
          </span>
        ) : null}
      </div>

      {totalCount === 0 ? (
        <EmptyState
          title="No approved inspections found"
          description="Try adjusting the filters above"
        />
      ) : (
        <div className="relative min-h-0 flex-1">
          {loading ? (
            <div className="pointer-events-none absolute inset-0 z-10 grid place-items-center bg-white/60 backdrop-blur-[1px]">
              <div className="h-8 w-8 animate-spin rounded-full border-[3px] border-ink-200 border-t-teal-600" />
            </div>
          ) : null}
          <div className="h-full overflow-y-auto overflow-x-auto">
            <table className="w-full table-fixed text-[13px]">
              <colgroup>
                {COLUMNS.map((col, idx) => (
                  <col key={idx} style={{ width: col.width }} />
                ))}
              </colgroup>
              <thead>
                <tr>
                  <th className="sticky top-0 border-b border-ink-200 bg-ink-50 px-4 py-2.5 text-left">
                    <Checkbox
                      checked={allSelected}
                      indeterminate={someSelected}
                      onChange={(e) => onToggleAll(pageIds, e.target.checked)}
                      aria-label="Select all on page"
                    />
                  </th>
                  {COLUMNS.slice(1).map((col, idx) => (
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
                {rows.map((r) => (
                  <PermitRegenerationRow
                    key={r.inspection_id}
                    row={r}
                    selected={isSelected(r.inspection_id)}
                    onToggle={onToggleRow}
                    onOpenPdf={setPdfTarget}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {totalPages > 1 ? (
        <div className="flex shrink-0 items-center justify-between gap-4 border-t border-ink-100 bg-ink-25 px-5 py-3">
          <div className="text-[13px] text-ink-500">
            Page <strong className="text-ink-800">{page + 1}</strong> of{' '}
            <strong className="text-ink-800">{totalPages}</strong>
          </div>
          <Pagination
            page={page + 1}
            totalPages={totalPages}
            onChange={(next) => onPageChange(next - 1)}
          />
        </div>
      ) : null}

      <PermitPdfModal
        open={pdfTarget !== null}
        onClose={() => setPdfTarget(null)}
        url={pdfTarget?.current_permit_url ?? ''}
        plateNumber={pdfTarget?.plate_number ?? ''}
        permitNumber={pdfTarget?.permit_number ?? ''}
      />
    </div>
  );
}
