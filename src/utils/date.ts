export function formatDate(iso: string | null | undefined): string {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export function todayIso(): string {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

/**
 * Human-readable label for a date range, falling back to today's ISO date when
 * either bound is missing. Used by report exports to stamp the period covered.
 */
export function formatDateRangeLabel(
  startDate: string | null | undefined,
  endDate: string | null | undefined,
): string {
  if (startDate && endDate) return `${startDate} to ${endDate}`;
  return todayIso();
}
