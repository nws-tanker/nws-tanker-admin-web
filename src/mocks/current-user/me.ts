// /api/users/me
import type { CurrentUser } from '@/types/currentUser';

export const MOCK_CURRENT_USER: CurrentUser = {
  userId: 1,
  email: 'admin@nama.gov.sa',
  firstName: 'Admin',
  lastName: 'User',
  displayName: 'Admin User',
  status: 'ACTIVE',
  clusterId: 1, // null = no cluster restriction; set to a cluster id (e.g. 1) to test locked mode
  clusterName: null,
  contractorId: null,
  contractorName: null,
  mobile: null,
  whatsappNumber: null,
  role: {
    roleId: 1,
    roleName: 'ADMIN',
    displayName: 'Administrator',
    roleGroup: 'ADMIN',
    organisation: 'NAMA',
    portal: 'ADMIN',
    permissions: [],
  },
};
