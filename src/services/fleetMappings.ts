import type { PermitStatus, TankerType } from '@/types';
import { PERMIT_STATUS, TANKER_TYPE } from '@/types';

export const TANKER_TYPE_BY_CODE: Record<string, TankerType> = {
  DW: TANKER_TYPE.DRINKING_WATER,
  SW: TANKER_TYPE.SEWAGE_WATER,
  TE: TANKER_TYPE.TREATED_EFFLUENT,
};

export const PERMIT_STATUS_BY_API: Record<string, PermitStatus> = {
  valid: PERMIT_STATUS.ACTIVE,
  expired: PERMIT_STATUS.EXPIRED,
};
