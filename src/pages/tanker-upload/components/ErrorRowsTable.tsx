import type { UploadError } from '@/types';
import { ErrorRow } from './ErrorRow';

type Props = {
  errors: UploadError[];
  onDismiss: (rowNumber: number) => void;
};

const HEADERS: Array<{ label: string; width?: string }> = [
  { label: 'Row #', width: '8%' },
  { label: 'Card No.', width: '12%' },
  { label: 'Field', width: '15%' },
  { label: 'Error', width: 'auto' },
  { label: '', width: '12%' },
];

export function ErrorRowsTable({ errors, onDismiss }: Props) {
  const count = errors.length;

  return (
    <div className="mb-5 overflow-hidden rounded-card-lg border border-ink-200 bg-white shadow-card-sm">
      <div className="flex items-center justify-between gap-4 border-b border-ink-100 px-5 py-4">
        <h3 className="text-[14px] font-semibold tracking-tight text-ink-900">
          Rows with Errors
        </h3>
        <div className="text-[12px] text-ink-500">
          {count} row{count !== 1 ? 's' : ''} need attention — fix each row to
          import it
        </div>
      </div>
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
              >
                {h.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {errors.map((e) => (
            <ErrorRow
              key={`${e.rowNumber}-${e.field}`}
              error={e}
              onSkip={() => onDismiss(e.rowNumber)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
