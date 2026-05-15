import { ENDPOINTS } from '@/constants/endpoints';
import type {
  PendingRequest,
  ClusterSetupApiResponse,
  InspectionChecklistResponse,
} from '@/types/configuration';
import type { ApiResponse } from '@/store/types';
import type {
  ActiveUserResponse,
  ApproveUserRequest,
  ClusterResponse,
  InspectionDataToBeEdited,
} from '@/types';
import { get, put } from './http';

export async function fetchPendingUsersApi(): Promise<
  ApiResponse<PendingRequest[]>
> {
  return get<PendingRequest[]>(ENDPOINTS.pendingRegistrations, undefined);
}

export async function rejectUserApi(
  userId: string,
  reason: string,
): Promise<ApiResponse<void>> {
  const url = ENDPOINTS.rejectRegistration.replace('{userId}', userId);
  return put<void>(url, { reason });
}

export async function approveUserApi(
  userId: string,
  body: ApproveUserRequest,
): Promise<ApiResponse<void>> {
  const url = ENDPOINTS.approveRegistration.replace('{userId}', userId);
  return put<void>(url, body);
}

export type ActiveUsersFilters = {
  roleId?: number;
  clusterId?: number;
};

export async function fetchInspectionChecklist(): Promise<
  ApiResponse<InspectionChecklistResponse>
> {
  return get<InspectionChecklistResponse>(
    ENDPOINTS.inspectionChecklist,
    undefined,
  );
}

export async function saveInspectionChecklist(
  body: InspectionDataToBeEdited,
): Promise<ApiResponse<void>> {
  return put(ENDPOINTS.inspectionChecklist, body);
}

export async function fetchActiveUsers(
  filters?: ActiveUsersFilters,
): Promise<ApiResponse<ActiveUserResponse[]>> {
  return get<ActiveUserResponse[]>(ENDPOINTS.activeUsers, {
    role: filters?.roleId,
    cluster: filters?.clusterId,
  });
}

export async function fetchClusters(): Promise<ApiResponse<ClusterResponse[]>> {
  return get<ClusterResponse[]>(ENDPOINTS.clusters, undefined);
}

export async function fetchClusterSetupApi(): Promise<
  ApiResponse<ClusterSetupApiResponse>
> {
  return get<ClusterSetupApiResponse>(ENDPOINTS.clusterSetup, undefined);
}
