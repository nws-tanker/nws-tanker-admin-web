import { PERMIT_STATUS, TANKER_TYPE } from '@/types';
import type { PermitStatus, TankerType } from '@/types';

// UI mappings — labels and colors for types/statuses. The runtime lists of
// allowed tanker types / permit statuses come from the /lookups API, not from
// here; these maps are pure presentation.

export const TYPE_LABELS: Record<TankerType, string> = {
  [TANKER_TYPE.DRINKING_WATER]: 'Drinking Water',
  [TANKER_TYPE.SEWAGE_WATER]: 'Sewage Water',
  [TANKER_TYPE.TREATED_EFFLUENT]: 'Treated Effluent',
};

export const TYPE_CHIP_COLOR: Record<TankerType, 'blue' | 'amber' | 'green'> = {
  [TANKER_TYPE.DRINKING_WATER]: 'blue',
  [TANKER_TYPE.SEWAGE_WATER]: 'amber',
  [TANKER_TYPE.TREATED_EFFLUENT]: 'green',
};

export const PERMIT_LABELS: Record<PermitStatus, string> = {
  [PERMIT_STATUS.ACTIVE]: 'Valid',
  [PERMIT_STATUS.EXPIRED]: 'Expired',
  [PERMIT_STATUS.NO_PERMIT]: 'No Permit',
  [PERMIT_STATUS.INSPECTION_IN_PROGRESS]: 'In Progress',
};

export const PERMIT_BADGE_COLOR: Record<
  PermitStatus,
  'green' | 'red' | 'gray' | 'blue'
> = {
  [PERMIT_STATUS.ACTIVE]: 'green',
  [PERMIT_STATUS.EXPIRED]: 'red',
  [PERMIT_STATUS.NO_PERMIT]: 'gray',
  [PERMIT_STATUS.INSPECTION_IN_PROGRESS]: 'blue',
};

export const FLEET_PAGE_SIZE = 25;

// API code → internal enum mappings. Used by services that translate raw API
// payloads into the typed domain shapes.
export const TANKER_TYPE_BY_CODE: Record<string, TankerType> = {
  DW: TANKER_TYPE.DRINKING_WATER,
  SW: TANKER_TYPE.SEWAGE_WATER,
  TE: TANKER_TYPE.TREATED_EFFLUENT,
};

export const PERMIT_STATUS_BY_API: Record<string, PermitStatus> = {
  valid: PERMIT_STATUS.ACTIVE,
  expired: PERMIT_STATUS.EXPIRED,
};
