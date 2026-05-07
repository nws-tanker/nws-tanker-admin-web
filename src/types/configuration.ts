export type ClusterId = 1 | 2 | 3;

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

export type FleetTarget = {
  gov: string;
  dw: number;
  sw: number;
  te: number;
  custom: boolean;
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
