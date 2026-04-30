import { USER_ROLE } from '@/types';
import type { UserRole, RegistrationType } from '@/types';
import { REGISTRATION_TYPE } from '@/types';

export const ROLE_LABELS: Record<UserRole, string> = {
  [USER_ROLE.EXECUTIVE]: 'Executive / CXO',
  [USER_ROLE.OPERATIONS_MANAGER]: 'Operations Manager',
  [USER_ROLE.CLUSTER_MANAGER]: 'Cluster Manager',
  [USER_ROLE.SUPERVISOR]: 'Supervisor',
  [USER_ROLE.INSPECTOR]: 'Inspector',
  [USER_ROLE.LAB_TECHNICIAN]: 'Lab Technician',
};

export const ROLE_BADGE_TONE: Record<
  UserRole,
  'green' | 'red' | 'amber' | 'blue' | 'gray' | 'teal'
> = {
  [USER_ROLE.EXECUTIVE]: 'teal',
  [USER_ROLE.OPERATIONS_MANAGER]: 'teal',
  [USER_ROLE.CLUSTER_MANAGER]: 'blue',
  [USER_ROLE.SUPERVISOR]: 'amber',
  [USER_ROLE.INSPECTOR]: 'gray',
  [USER_ROLE.LAB_TECHNICIAN]: 'gray',
};

export const ALL_USER_ROLES: UserRole[] = [
  USER_ROLE.EXECUTIVE,
  USER_ROLE.OPERATIONS_MANAGER,
  USER_ROLE.CLUSTER_MANAGER,
  USER_ROLE.SUPERVISOR,
  USER_ROLE.INSPECTOR,
  USER_ROLE.LAB_TECHNICIAN,
];

export const REGISTRATION_TYPE_LABEL: Record<RegistrationType, string> = {
  [REGISTRATION_TYPE.NAMA_STAFF]: 'Nama Employee',
  [REGISTRATION_TYPE.CONTRACTOR]: 'Contractor',
};
