export const TANKER_TYPE = {
  DRINKING_WATER: 'drinking_water',
  SEWAGE_WATER: 'sewage_water',
  TREATED_EFFLUENT: 'treated_effluent',
} as const;

export type TankerType = (typeof TANKER_TYPE)[keyof typeof TANKER_TYPE];

export const PERMIT_STATUS = {
  ACTIVE: 'active',
  EXPIRED: 'expired',
  NO_PERMIT: 'no_permit',
  INSPECTION_IN_PROGRESS: 'inspection_in_progress',
} as const;

export type PermitStatus = (typeof PERMIT_STATUS)[keyof typeof PERMIT_STATUS];

// API code → internal enum mappings. Kept here so the type definitions and the
// values that produce them live in one place.
export const TANKER_TYPE_BY_CODE: Record<string, TankerType> = {
  DW: TANKER_TYPE.DRINKING_WATER,
  SW: TANKER_TYPE.SEWAGE_WATER,
  TE: TANKER_TYPE.TREATED_EFFLUENT,
};

export const PERMIT_STATUS_BY_API: Record<string, PermitStatus> = {
  valid: PERMIT_STATUS.ACTIVE,
  expired: PERMIT_STATUS.EXPIRED,
};

export type Permit = {
  status: PermitStatus;
  permitNumber: string | null;
  issuedAt: string | null;
  validUntil: string | null;
};

export type Tanker = {
  id: string;
  plateNo: string;
  owner: string;
  tankerType: TankerType;
  governorate: string;
  cluster: string;
  contact: string;
  permit: Permit;
};

export type Inspector = {
  id: string;
  name: string;
  clusterId: string;
};

export type SampleCollector = {
  id: string;
  name: string;
  clusterId: string;
};

export type FleetFilters = {
  search: string;
  clusterIds: string[];
  governorateIds: string[];
  tankerTypes: TankerType[];
  permitStatuses: PermitStatus[];
};
