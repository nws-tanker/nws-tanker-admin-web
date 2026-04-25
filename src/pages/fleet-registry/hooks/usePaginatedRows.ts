import { useCallback, useMemo, useState } from 'react';

type PaginatedResult<T> = {
  page: number;
  totalPages: number;
  pageRows: T[];
  from: number;
  to: number;
  setPage: (next: number) => void;
  resetPage: () => void;
};

export function usePaginatedRows<T>(
  rows: T[],
  pageSize: number,
): PaginatedResult<T> {
  const [page, setPage] = useState(1);

  // Stable identity so consumers can put `resetPage` in `useEffect` deps
  // (e.g. "reset to page 1 when filters change") without the effect re-firing
  // every time `page` itself updates.
  const resetPage = useCallback(() => setPage(1), []);

  const slice = useMemo(() => {
    const totalPages = Math.max(1, Math.ceil(rows.length / pageSize));
    const safePage = Math.min(page, totalPages);
    const pageRows = rows.slice((safePage - 1) * pageSize, safePage * pageSize);
    const from = rows.length === 0 ? 0 : (safePage - 1) * pageSize + 1;
    const to = Math.min(safePage * pageSize, rows.length);
    return { totalPages, pageRows, safePage, from, to };
  }, [rows, pageSize, page]);

  return {
    page: slice.safePage,
    totalPages: slice.totalPages,
    pageRows: slice.pageRows,
    from: slice.from,
    to: slice.to,
    setPage,
    resetPage,
  };
}
