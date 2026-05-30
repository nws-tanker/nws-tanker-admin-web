import { format, parseISO } from 'date-fns';

/**
 * Backend timestamps are UTC but sometimes omit a timezone designator
 * (e.g. "2026-05-30T10:00:00"). JS parses such strings as *local* time, so no
 * conversion happens. Append a "Z" when no offset is present so the value is
 * read as UTC; date-fns `format` then renders it in the browser's local zone.
 */
function parseUtc(iso: string): Date {
  const hasTz = /([zZ]|[+-]\d{2}:?\d{2})$/.test(iso);
  return parseISO(hasTz ? iso : `${iso}Z`);
}

export function formatDate(iso: string | null | undefined): string {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export function formatDateTime(iso: string | null | undefined): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatTime(iso: string | null | undefined): string {
  if (!iso) return '';
  const d = parseUtc(iso);
  if (Number.isNaN(d.getTime())) return '';
  // format renders in the browser's local timezone.
  return format(d, 'HH:mm');
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
