export type ClusterId = 1 | 2 | 3;

export type ClusterSetupSummary = {
  totalClusters: number;
  totalGovernorates: number;
  totalTankers: number;
};

export type ClusterSetupCluster = {
  clusterId: number;
  name: string;
  code: string;
  governorateCount: number;
  tankerCount: number;
  contractorId: number;
  contractorName: string;
};

export type ClusterSetupGovernorate = {
  id: number;
  name: string;
  code: string;
  clusterId: number;
  dwCount: number;
  swCount: number;
  teCount: number;
};

export type ClusterSetupContractor = {
  clusterId: number;
  clusterName: string;
  contractorId: number;
  contractorName: string;
};

export type ClusterSetupApiResponse = {
  summary: ClusterSetupSummary;
  clusters: ClusterSetupCluster[];
  governorates: ClusterSetupGovernorate[];
  contractors: ClusterSetupContractor[];
};

export type ClusterMeta = {
  name: string;
  contractor: string;
  manager: string;
  color: string;
};

export type Governorate = {
  name: string;
  fleet: number;
  region: string;
  cluster: ClusterId;
};

export type FleetTargetsApiResponse = {
  dashboard: {
    grandTotal: number;
    totalDw: number;
    totalSw: number;
    totalTe: number;
  };
  governorates: {
    id: number;
    name: string;
    code: string;
    clusterId: number;
    dwCount: number;
    swCount: number;
    teCount: number;
    rowTotal: number;
  }[];
};

export type FleetTarget = {
  id: number;
  gov: string;
  dw: number;
  sw: number;
  te: number;
  custom: boolean;
};

export type OnboardContractorRequest = {
  clusterName: string;
  contractorName: string;
  crNumber: string;
  crDocument: File | null;
};

export type GovernorateClusterMapping = {
  governorateId: number;
  clusterId: number;
};

export type UpdateGovernorateClusterMappingRequest = {
  mappings: GovernorateClusterMapping[];
};

export type SaveFleetTargetsRequest = {
  governorates: {
    id: number;
    dwCount: number;
    swCount: number;
    teCount: number;
  }[];
};

export type FleetTotals = {
  dw: number;
  sw: number;
  te: number;
  total: number;
};

export type ClusterResponse = {
  id: number;
  name: string;
  code: string;
  contractorId: number;
};

export type ApproveUserRequest = {
  roleId: number;
  clusterId?: number;
};

export type ActiveUserResponse = {
  userID: string;
  name: string;
  role: string;
  cluster?: number;
  email?: string;
  mobile?: string;
  status: 'ACTIVE' | 'INACTIVE';
  lastActive: string;
};

export type ChecklistEvidenceType = 'photo' | 'document';
export type ChecklistSeverity = 'mandatory' | 'optional';

export type ChecklistItemResponse = {
  id: number;
  itemKey: string;
  description: string;
  severity: ChecklistSeverity;
  evidenceType: ChecklistEvidenceType;
  appliesToDw: boolean;
  appliesToSw: boolean;
  appliesToTe: boolean;
  sortOrder: number;
  displayIndex: string;
  checkItem: string;
};

export type ChecklistCategoryResponse = {
  id: number;
  name: string;
  sortOrder: number;
  displayIndex: string;
  itemCount: number;
  itemsSummaryCaption: string;
  items: ChecklistItemResponse[];
};

export type ChecklistSummary = {
  totalItems: number;
  totalItemsCaption: string;
  categoryCount: number;
  appliesToDisplay: string;
  passThresholdDisplay: string;
};

export type InspectionChecklistResponse = {
  versionId: number;
  versionNumber: number;
  label: string;
  effectiveFrom: string;
  isActive: boolean;
  summary: ChecklistSummary;
  categories: ChecklistCategoryResponse[];
};

export type ConfigTab =
  | 'notifications'
  | 'permit-sla'
  | 'users-roles'
  | 'inspection-checklist'
  | 'cluster-setup'
  | 'fleet-targets';

export type UserType = 'nama_employee' | 'contractor';

export type UserRole =
  | 'OPERATIONS_MANAGER'
  | 'SUPERVISOR'
  | 'CLUSTER_MANAGER'
  | 'EXECUTIVE_CXO'
  | 'INSPECTOR';

export type UserStatus = 'active' | 'inactive';

export type PendingRequest = {
  userID: string;
  name: string;
  type: UserType;
  email: string;
  mobile: string;
  crNumber: string | null;
  createdDate: string;
};

export type ActiveUser = {
  id: string;
  name: string;
  role: UserRole;
  cluster?: number;
  email?: string;
  mobile?: string;
  status: 'active' | 'inactive';
  lastActive: string;
};

export type NewChecklistItemData = {
  description: string;
  severity: ChecklistSeverity;
  evidenceType: ChecklistEvidenceType;
  appliesToDw: boolean;
  appliesToSw: boolean;
  appliesToTe: boolean;
};

export type InspectionDataToBeEdited = {
  categories: {
    categoryId: number;
    items: {
      id: number;
      description: string;
      severity: string;
      evidenceType: string;
      appliesToDw: boolean;
      appliesToSw: boolean;
      appliesToTe: boolean;
      sortOrder: number;
    }[];
  }[];
};

export type UpdateUserStatusValue = 'ACTIVE' | 'INACTIVE';

export type UpdateEmployeeRequest = {
  firstName: string;
  lastName: string;
  mobileNo: string;
  status: UpdateUserStatusValue;
};

export type PermitSlaApiResponse = {
  id: number;
  permitValidityMonths: number;
  labSlaDays: number;
  renewalReminderDays: number;
};

export type NotificationContactsApiResponse = {
  contractorId: number | null;
  email: string;
  mobileNo: string;
  editable: boolean;
};

export type UpdatePermitSlaRequest = {
  permitValidityMonths: number;
  labSlaDays: number;
  renewalReminderDays: number;
};

export type UpdateNotificationContactsRequest = {
  contractorId: number | null;
  email: string;
  mobileNo: string;
};
