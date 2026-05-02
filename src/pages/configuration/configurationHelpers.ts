import type { ChipTone } from '@/atoms';

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

const AVATAR_PALETTE = [
  'bg-teal-700',
  'bg-blue-600',
  'bg-violet-600',
  'bg-rose-600',
  'bg-orange-500',
  'bg-cyan-700',
  'bg-emerald-700',
  'bg-indigo-600',
];

export function avatarColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++)
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_PALETTE[Math.abs(hash) % AVATAR_PALETTE.length];
}

export function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
