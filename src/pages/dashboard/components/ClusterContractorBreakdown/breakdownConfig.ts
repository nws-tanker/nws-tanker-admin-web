import type { ClusterMetrics } from '@/types/executiveDashboard';

export const COLUMNS: { key: keyof ClusterMetrics; label: string }[] = [
  { key: 'fleet', label: 'Fleet' },
  { key: 'dw', label: 'DW' },
  { key: 'sw', label: 'SW' },
  { key: 'te', label: 'TE' },
  { key: 'valid', label: 'Valid' },
  { key: 'expired', label: 'Expired' },
  { key: 'renewal_tankers', label: '≤30D' },
  { key: 'sla_percentage', label: 'SLA' },
  { key: 'lab', label: 'Lab' },
  { key: 'compliance', label: 'Pass' },
];

export const RED_COLS = new Set<keyof ClusterMetrics>([
  'expired',
  'renewal_tankers',
  'lab',
]);
export const PCT_COLS = new Set<keyof ClusterMetrics>([
  'pass_percentage',
  'sla_percentage',
]);

export function formatCell(key: keyof ClusterMetrics, value: number): string {
  if (PCT_COLS.has(key)) return `${value}%`;
  return value.toLocaleString();
}
