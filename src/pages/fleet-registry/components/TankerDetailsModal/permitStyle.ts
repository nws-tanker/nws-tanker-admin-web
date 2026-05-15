import type { StatusTone } from '@/atoms';
import { PERMIT_STATUS } from '@/types';
import type { PermitStatus } from '@/types';

/**
 * Status → tone mapping. Drives `<StatusIndicator />` (dot + label colors)
 * and consistent highlight colors for related fields like the expiry value.
 */
export const PERMIT_TONE: Record<PermitStatus, StatusTone> = {
  [PERMIT_STATUS.ACTIVE]: 'green',
  [PERMIT_STATUS.EXPIRED]: 'red',
  [PERMIT_STATUS.NO_PERMIT]: 'gray',
  [PERMIT_STATUS.INSPECTION_IN_PROGRESS]: 'blue',
};

export type PermitCardStyle = {
  border: string;
  bg: string;
};

/** Border + background tint for the wrapping permit panel. */
export const PERMIT_CARD_STYLE: Record<PermitStatus, PermitCardStyle> = {
  [PERMIT_STATUS.ACTIVE]: { border: 'border-green-200', bg: 'bg-green-50' },
  [PERMIT_STATUS.EXPIRED]: { border: 'border-red-200', bg: 'bg-red-50' },
  [PERMIT_STATUS.NO_PERMIT]: { border: 'border-ink-200', bg: 'bg-ink-100' },
  [PERMIT_STATUS.INSPECTION_IN_PROGRESS]: {
    border: 'border-blue-200',
    bg: 'bg-blue-50',
  },
};
