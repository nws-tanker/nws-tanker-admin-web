import { ChipTone } from '@/atoms';
import {
  ClusterId,
  ConfigTab,
  FleetTarget,
  UserType,
  UserRole,
} from '@/types/configuration';
// TODO: USER_ROLE, UserRole, RegistrationType, REGISTRATION_TYPE not yet exported from @/types
// import { USER_ROLE } from '@/types';
// import type { UserRole, RegistrationType } from '@/types';
// import { REGISTRATION_TYPE } from '@/types';

// export const ROLE_LABELS: Record<UserRole, string> = {
//   [USER_ROLE.EXECUTIVE]: 'Executive / CXO',
//   [USER_ROLE.OPERATIONS_MANAGER]: 'Operations Manager',
//   [USER_ROLE.CLUSTER_MANAGER]: 'Cluster Manager',
//   [USER_ROLE.SUPERVISOR]: 'Supervisor',
//   [USER_ROLE.INSPECTOR]: 'Inspector',
//   [USER_ROLE.LAB_TECHNICIAN]: 'Lab Technician',
// };

// export const ROLE_BADGE_TONE: Record<
//   UserRole,
//   'green' | 'red' | 'amber' | 'blue' | 'gray' | 'teal'
// > = {
//   [USER_ROLE.EXECUTIVE]: 'teal',
//   [USER_ROLE.OPERATIONS_MANAGER]: 'teal',
//   [USER_ROLE.CLUSTER_MANAGER]: 'blue',
//   [USER_ROLE.SUPERVISOR]: 'amber',
//   [USER_ROLE.INSPECTOR]: 'gray',
//   [USER_ROLE.LAB_TECHNICIAN]: 'gray',
// };

// export const ALL_USER_ROLES: UserRole[] = [
//   USER_ROLE.EXECUTIVE,
//   USER_ROLE.OPERATIONS_MANAGER,
//   USER_ROLE.CLUSTER_MANAGER,
//   USER_ROLE.SUPERVISOR,
//   USER_ROLE.INSPECTOR,
//   USER_ROLE.LAB_TECHNICIAN,
// ];

// export const REGISTRATION_TYPE_LABEL: Record<RegistrationType, string> = {
//   [REGISTRATION_TYPE.NAMA_STAFF]: 'Nama Employee',
//   [REGISTRATION_TYPE.CONTRACTOR]: 'Contractor',
// };
export const CONFIG_TABS: { id: ConfigTab; label: string }[] = [
  { id: 'notifications', label: 'Notifications & Communications' },
  { id: 'permit-sla', label: 'Permit & SLA Rules' },
  { id: 'users-roles', label: 'Users & Roles' },
  { id: 'inspection-checklist', label: 'Inspection Checklist' },
  { id: 'cluster-setup', label: 'Cluster Setup' },
  { id: 'fleet-targets', label: 'Fleet Targets' },
];

export const USER_TYPE_LABELS: Record<UserType, string> = {
  nama_employee: 'Nama Employee',
  contractor: 'Contractor',
};

export const USER_TYPE_CHIP_TONE: Record<UserType, ChipTone> = {
  nama_employee: 'amber',
  contractor: 'blue',
};

export const ROLE_LABELS: Record<UserRole, string> = {
  OPERATIONS_MANAGER: 'Operations Manager',
  SUPERVISOR: 'Supervisor',
  CLUSTER_MANAGER: 'Cluster Manager',
  EXECUTIVE: 'Executive',
  INSPECTOR: 'Inspector',
};

export const ROLE_IDS: Record<UserRole, number> = {
  OPERATIONS_MANAGER: 1,
  CLUSTER_MANAGER: 2,
  SUPERVISOR: 3,
  EXECUTIVE: 4,
  INSPECTOR: 5,
};

export const ROLE_CHIP_TONE: Record<UserRole, ChipTone> = {
  OPERATIONS_MANAGER: 'teal',
  SUPERVISOR: 'amber',
  CLUSTER_MANAGER: 'blue',
  EXECUTIVE: 'gray',
  INSPECTOR: 'green',
};

export const AVATAR_PALETTE = [
  'bg-teal-700',
  'bg-blue-600',
  'bg-violet-600',
  'bg-rose-600',
  'bg-orange-500',
  'bg-cyan-700',
  'bg-emerald-700',
  'bg-indigo-600',
];

export const CLUSTER_IDS = [1, 2, 3] as const;

export const CLUSTER_COLORS: Record<number, string> = {
  1: '#117680',
  2: '#D97706',
  3: '#7C3AED',
};
export const DEFAULT_CLUSTER_COLOR = '#6B7280';

export const CLUSTER_META: Record<
  ClusterId,
  { name: string; contractor: string; manager: string; color: string }
> = {
  1: {
    name: 'Cluster 1',
    contractor: 'Aldar',
    manager: 'Hamed Al-Rashdi',
    color: '#117680',
  },
  2: {
    name: 'Cluster 2',
    contractor: 'Maulam',
    manager: 'Khalifa Al-Badi',
    color: '#D97706',
  },
  3: {
    name: 'Cluster 3',
    contractor: 'National Strategic',
    manager: 'Said Al-Mashani',
    color: '#7C3AED',
  },
};

export const GOVERNORATES: {
  name: string;
  fleet: number;
  region: string;
  cluster: ClusterId;
}[] = [
  { name: 'Muscat', fleet: 812, region: 'Central', cluster: 1 },
  { name: 'North Batinah', fleet: 704, region: 'North', cluster: 1 },
  { name: 'South Batinah', fleet: 596, region: 'North', cluster: 1 },
  { name: 'Al Buraimi', fleet: 212, region: 'North-West', cluster: 1 },
  { name: 'Al Dakhiliyah', fleet: 412, region: 'Central', cluster: 2 },
  { name: 'Al Dhahirah', fleet: 504, region: 'North-West', cluster: 2 },
  { name: 'North Sharqiyah', fleet: 548, region: 'East', cluster: 2 },
  { name: 'Musandam', fleet: 188, region: 'North', cluster: 2 },
  { name: 'Dhofar', fleet: 428, region: 'South', cluster: 3 },
  { name: 'South Sharqiyah', fleet: 482, region: 'East', cluster: 3 },
  { name: 'Al Wusta', fleet: 218, region: 'South', cluster: 3 },
];

export const DEFAULT_FLEET_TARGETS: FleetTarget[] = [
  { id: 0, gov: 'Muscat', dw: 400, sw: 200, te: 100, custom: false },
  { id: 0, gov: 'North Batinah', dw: 350, sw: 165, te: 82, custom: false },
  { id: 0, gov: 'South Batinah', dw: 300, sw: 140, te: 70, custom: false },
  { id: 0, gov: 'Al Buraimi', dw: 110, sw: 50, te: 25, custom: false },
  { id: 0, gov: 'Al Dakhiliyah', dw: 200, sw: 95, te: 48, custom: false },
  { id: 0, gov: 'Al Dhahirah', dw: 250, sw: 120, te: 60, custom: false },
  { id: 0, gov: 'North Sharqiyah', dw: 280, sw: 130, te: 65, custom: false },
  { id: 0, gov: 'Musandam', dw: 95, sw: 45, te: 22, custom: false },
  { id: 0, gov: 'Dhofar', dw: 200, sw: 100, te: 50, custom: false },
  { id: 0, gov: 'South Sharqiyah', dw: 240, sw: 110, te: 55, custom: false },
  { id: 0, gov: 'Al Wusta', dw: 55, sw: 28, te: 14, custom: false },
];
