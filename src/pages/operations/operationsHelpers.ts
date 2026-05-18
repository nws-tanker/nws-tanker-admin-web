import type { BadgeTone } from '@/atoms';

export const INSPECTION_STATUS_TONE: Record<string, BadgeTone> = {
  submitted: 'blue',
  lab_pending: 'teal',
  approved: 'green',
  rejected: 'red',
  pending: 'gray',
  in_review: 'amber',
};

export const INSPECTION_STATUS_LABEL: Record<string, string> = {
  submitted: 'Submitted',
  lab_pending: 'Lab Pending',
  approved: 'Approved',
  rejected: 'Rejected',
  pending: 'Pending',
  in_review: 'In Review',
};

export function inspectionStatusTone(status: string): BadgeTone {
  return INSPECTION_STATUS_TONE[status] ?? 'gray';
}

export function inspectionStatusLabel(status: string): string {
  return INSPECTION_STATUS_LABEL[status] ?? status;
}

export function daysUntil(iso: string, now: Date = new Date()): number {
  const target = new Date(iso).getTime();
  return Math.ceil((target - now.getTime()) / (1000 * 60 * 60 * 24));
}

export function daysLeftTone(days: number): BadgeTone {
  if (days <= 7) return 'red';
  if (days <= 14) return 'amber';
  return 'gray';
}
