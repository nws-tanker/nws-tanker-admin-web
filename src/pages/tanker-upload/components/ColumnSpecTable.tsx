import { ScreenStatus } from '@/common-components/ScreenStatus';
import { States } from '@/store/types';
import type { TankerUploadColumn } from '@/types';
import { ColumnSpecRow } from './ColumnSpecRow';

type Props = {
  columns: TankerUploadColumn[];
  state: States;
  onRetry: () => void;
};

const HEADERS: Array<{ label: string; width?: string }> = [
  { label: 'Column Name', width: '28%' },
  { label: 'Required', width: '12%' },
  { label: 'Description', width: 'auto' },
  { label: 'Example Value', width: '20%' },
];

export function ColumnSpecTable({ columns, state, onRetry }: Props) {
  return (
    <div className="overflow-hidden rounded-card-lg border border-ink-200 bg-white shadow-card-sm">
      <div className="flex items-center justify-between gap-4 border-b border-ink-100 px-5 py-4">
        <h3 className="text-[14px] font-semibold tracking-tight text-ink-900">
          Expected CSV / Excel Columns
        </h3>
        <div className="text-[12px] text-ink-500">
          Column names must match exactly (case-insensitive)
        </div>
      </div>
      {state === States.SUCCESS ? (
        <table className="w-full table-fixed text-[13px]">
          <colgroup>
            {HEADERS.map((h, i) => (
              <col key={i} style={h.width ? { width: h.width } : undefined} />
            ))}
          </colgroup>
          <thead>
            <tr>
              {HEADERS.map((h, i) => (
                <th
                  key={i}
                  className="whitespace-nowrap border-b border-ink-200 bg-ink-50 px-4 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wider text-ink-500"
                  style={
                    h.label === 'Required' ? { textAlign: 'center' } : undefined
                  }
                >
                  {h.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {columns.map((c) => (
              <ColumnSpecRow key={c.name} column={c} />
            ))}
          </tbody>
        </table>
      ) : (
        <ScreenStatus state={state} onRetry={onRetry} />
      )}
    </div>
  );
}
