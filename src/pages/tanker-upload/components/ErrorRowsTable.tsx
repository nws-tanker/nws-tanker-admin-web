import { useMemo, useState } from 'react';
import { Pagination } from '@/atoms';
import type { UploadError } from '@/types';
import { ErrorRow } from './ErrorRow';

type Props = {
  errors: UploadError[];
};

const HEADERS: Array<{ label: string; width?: string }> = [
  { label: 'Row #', width: '10%' },
  { label: 'Error', width: 'auto' },
];

const PAGE_SIZE = 10;

export function ErrorRowsTable({ errors }: Props) {
  const count = errors.length;
  const totalPages = Math.max(1, Math.ceil(count / PAGE_SIZE));
  const [page, setPage] = useState(1);

  const currentPage = Math.min(page, totalPages);
  const pageStart = (currentPage - 1) * PAGE_SIZE;
  const pageErrors = useMemo(
    () => errors.slice(pageStart, pageStart + PAGE_SIZE),
    [errors, pageStart],
  );

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
          {pageErrors.map((e, i) => (
            <ErrorRow key={`${pageStart}-${i}`} error={e} />
          ))}
        </tbody>
      </table>
      {totalPages > 1 ? (
        <div className="flex items-center justify-between gap-4 border-t border-ink-100 px-5 py-3">
          <div className="text-[12px] text-ink-500">
            Showing {pageStart + 1}–{Math.min(pageStart + PAGE_SIZE, count)} of{' '}
            {count}
          </div>
          <Pagination
            page={currentPage}
            totalPages={totalPages}
            onChange={setPage}
          />
        </div>
      ) : null}
    </div>
  );
}
