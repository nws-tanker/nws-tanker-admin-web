import type { AlertCategory, AlertSeverity } from '@/types/alerts';

export const CATEGORY_ICON: Record<AlertCategory, string> = {
  PENDING_INSPECTION: '🔍',
  SAMPLE_COLLECTION: '🧪',
  SLA_DELAY: '⏱',
  PENDING_LAB_RESULTS: '🔬',
  PENDING_APPROVAL: '✅',
  CERTIFICATE_EXPIRY: '📄',
};

export const CATEGORY_LABEL: Record<AlertCategory, string> = {
  PENDING_INSPECTION: 'Pending Inspection',
  SAMPLE_COLLECTION: 'Sample Collection',
  SLA_DELAY: 'SLA Delay',
  PENDING_LAB_RESULTS: 'Pending Lab Results',
  PENDING_APPROVAL: 'Pending Approval',
  CERTIFICATE_EXPIRY: 'Certificate Expiry',
};

export function severityColorClass(severity: AlertSeverity): string {
  if (severity === 'CRITICAL') return 'text-red-600';
  if (severity === 'WARNING') return 'text-amber-700';
  return 'text-ink-500';
}
