import { ENDPOINTS } from '@/constants/endpoints';
import type { PendingRequest } from '@/pages/configuration/configurationHelpers';
import type { ApiResponse } from '@/store/types';
import type {
  ActiveUserResponse,
  ApproveUserRequest,
  ClusterResponse,
} from '@/types';
import { get, put } from './http';

// JWT is read from localStorage at call time.
// TEMP: falls back to the hardcoded dev token when localStorage has no 'jwt' key.
const TEMP_DEV_TOKEN = import.meta.env.VITE_TEMP_JWT_TOKEN;

function getJwtToken(): string {
  return localStorage.getItem('jwt') ?? TEMP_DEV_TOKEN;
}

export async function fetchPendingUsersApi(): Promise<
  ApiResponse<PendingRequest[]>
> {
  return get<PendingRequest[]>(ENDPOINTS.pendingRegistrations, undefined, {
    headers: { Authorization: `Bearer ${getJwtToken()}` },
  });
}

export async function rejectUserApi(
  userId: string,
  reason: string,
): Promise<ApiResponse<void>> {
  const url = ENDPOINTS.rejectRegistration.replace('{userId}', userId);
  return put<void>(
    url,
    { reason },
    {
      headers: { Authorization: `Bearer ${getJwtToken()}` },
    },
  );
}

export async function approveUserApi(
  userId: string,
  body: ApproveUserRequest,
): Promise<ApiResponse<void>> {
  const url = ENDPOINTS.approveRegistration.replace('{userId}', userId);
  return put<void>(url, body, {
    headers: { Authorization: `Bearer ${getJwtToken()}` },
  });
}

export type ActiveUsersFilters = {
  roleId?: number;
  clusterId?: number;
};

export async function fetchActiveUsers(
  filters?: ActiveUsersFilters,
): Promise<ApiResponse<ActiveUserResponse[]>> {
  return get<ActiveUserResponse[]>(
    ENDPOINTS.activeUsers,
    { role: filters?.roleId, cluster: filters?.clusterId },
    {
      headers: { Authorization: `Bearer ${getJwtToken()}` },
    },
  );
}

export async function fetchClusters(): Promise<ApiResponse<ClusterResponse[]>> {
  return get<ClusterResponse[]>(ENDPOINTS.clusters, undefined, {
    headers: { Authorization: `Bearer ${getJwtToken()}` },
  });
}
