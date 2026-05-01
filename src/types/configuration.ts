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
