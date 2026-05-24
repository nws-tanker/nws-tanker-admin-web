import { ChipTone } from '@/atoms';
import { ConfigTab, UserType, UserRole } from '@/types/configuration';
import { USER_ACCESS, type UserAccess } from '@/constants/userAccess';
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
  // { id: 'fleet-targets', label: 'Fleet Targets' },
];

/* Per-tab access requirements. The user must hold the mapped permission for
   the tab to be visible inside the Configuration page. The page itself is
   gated at the route level by any-of these (see ROUTE_ACCESS.configuration). */
export const CONFIG_TAB_ACCESS: Record<ConfigTab, UserAccess> = {
  notifications: USER_ACCESS.CONFIG_NOTIFICATIONS,
  'permit-sla': USER_ACCESS.CONFIG_PERMIT_SLA_RULES,
  'users-roles': USER_ACCESS.CONFIG_USERS_ROLES,
  'inspection-checklist': USER_ACCESS.CONFIG_INSPECTION_CHECKLIST,
  'cluster-setup': USER_ACCESS.CONFIG_CLUSTER_SETUP,
  'fleet-targets': USER_ACCESS.CONFIG_FLEET_TARGETS,
};

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
