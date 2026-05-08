import type { InspectionTab } from '@/types/inspection';

export const INSPECTION_TAB_API_PARAM: Record<InspectionTab, string> = {
  'pending-review': 'in_review',
  'pending-inspection': 'pending',
  submitted: 'submitted',
  'lab-testing': 'lab_pending',
  approved: 'approved',
  rejected: 'rejected',
};

export function formatInspectionDate(iso: string | null): string {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}
