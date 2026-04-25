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
} as const;

export type PermitStatus = (typeof PERMIT_STATUS)[keyof typeof PERMIT_STATUS];

export type Permit = {
  status: PermitStatus;
  permitNumber: string | null;
  issuedAt: string | null;
  validUntil: string | null;
};

export type Assignment = {
  inspectorId: string;
  samplerId: string | null;
};

export type Tanker = {
  id: string;
  plateNumber: string;
  ownerName: string;
  tankerType: TankerType;
  governorateId: string;
  clusterId: string;
  contact: string;
  permit: Permit;
  assignment: Assignment | null;
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
