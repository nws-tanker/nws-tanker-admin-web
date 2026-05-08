import type { PendingRequest } from '@/types/configuration';

export const MOCK_PENDING_REGISTRATIONS: PendingRequest[] = [
  {
    userID: 'pr-001',
    name: 'Ahmed Al-Balushi',
    email: 'ahmed.balushi@nama.om',
    mobile: '+968 9551 2234',
    type: 'nama_employee',
    crNumber: null,
    createdDate: '2026-04-22T11:18:00Z',
  },
  {
    userID: 'pr-002',
    name: 'Mariam Al-Saadi',
    email: 'mariam@oman-tankers.com',
    mobile: '+968 9923 4081',
    type: 'contractor',
    crNumber: 'CR-114820',
    createdDate: '2026-04-23T07:42:00Z',
  },
  {
    userID: 'pr-003',
    name: 'Yousuf Al-Mukhaini',
    email: 'yousuf@al-nahdha.om',
    mobile: '+968 9112 7800',
    type: 'contractor',
    crNumber: 'CR-073119',
    createdDate: '2026-04-23T15:10:00Z',
  },
];
