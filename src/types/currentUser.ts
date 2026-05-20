export type CurrentUserPermission = {
  permissionCode: string;
  permissionName: string;
};

export type CurrentUserRole = {
  roleId: number;
  roleName: string;
  displayName: string;
  roleGroup: string;
  organisation: string;
  portal: string;
  permissions: CurrentUserPermission[];
};

export type CurrentUser = {
  userId: number;
  email: string;
  firstName: string;
  lastName: string;
  displayName: string;
  status: string;
  clusterId: number | null;
  clusterName: string | null;
  contractorId: number | null;
  contractorName: string | null;
  mobile: string | null;
  whatsappNumber: string | null;
  role: CurrentUserRole;
};
