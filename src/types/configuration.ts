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
  status: 'ACTIVE' | 'INACTIVE';
  lastActive: string;
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
  | 'EXECUTIVE'
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
  status: 'active' | 'inactive';
  lastActive: string;
};
