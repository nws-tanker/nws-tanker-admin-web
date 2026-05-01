import type { PendingRequest } from '@/pages/configuration/configurationHelpers';

export const MOCK_PENDING_USERS: PendingRequest[] = [
  {
    userId: '1',
    name: 'Ahmed Al-Balushi',
    type: 'nama_employee',
    email: 'ahmed.balushi@nama.om',
    mobile: '9551 2234',
    crNumber: null,
    submittedAt: '22 Apr 2026, 11:18',
  },
  {
    userId: '2',
    name: 'Sara Al-Harthi',
    type: 'contractor',
    email: 'sara.harthi@dhofar.om',
    mobile: '9923 1100',
    crNumber: 'CR-20394',
    submittedAt: '21 Apr 2026, 09:42',
  },
];
