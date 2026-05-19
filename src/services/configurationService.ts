import { ENDPOINTS } from '@/constants/endpoints';
import type {
  PendingRequest,
  ClusterSetupApiResponse,
  InspectionChecklistResponse,
  UpdateEmployeeRequest,
  PermitSlaApiResponse,
  NotificationContactsApiResponse,
  UpdatePermitSlaRequest,
  UpdateNotificationContactsRequest,
  UpdateGovernorateClusterMappingRequest,
  OnboardContractorRequest,
} from '@/types/configuration';
import type { ApiResponse } from '@/store/types';
import type {
  ActiveUserResponse,
  ApproveUserRequest,
  ClusterResponse,
  InspectionDataToBeEdited,
} from '@/types';
import { get, put } from './http';

export async function onboardContractorApi(
  body: OnboardContractorRequest,
): Promise<ApiResponse<void>> {
  const formData = new FormData();
  formData.append('clusterName', body.clusterName);
  formData.append('contractorName', body.contractorName);
  formData.append('crNumber', body.crNumber);
  if (body.crDocument) formData.append('crDocument', body.crDocument);
  return put<void>(ENDPOINTS.contractorOnboarding, formData);
}

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

export async function updateUserStatusApi(
  userId: string,
  body: UpdateEmployeeRequest,
): Promise<ApiResponse<void>> {
  const url = ENDPOINTS.updateEmployeeStatus.replace('{userId}', userId);
  return put<void>(url, body);
}

export async function fetchPermitSlaApi(): Promise<
  ApiResponse<PermitSlaApiResponse>
> {
  return get<PermitSlaApiResponse>(ENDPOINTS.permitSla);
}

export async function fetchNotificationContactsApi(): Promise<
  ApiResponse<NotificationContactsApiResponse>
> {
  return get<NotificationContactsApiResponse>(ENDPOINTS.notificationContacts);
}

export async function updatePermitSlaApi(
  body: UpdatePermitSlaRequest,
): Promise<ApiResponse<PermitSlaApiResponse>> {
  return put<PermitSlaApiResponse>(ENDPOINTS.permitSla, body);
}

export async function updateNotificationContactsApi(
  body: UpdateNotificationContactsRequest,
): Promise<ApiResponse<NotificationContactsApiResponse>> {
  return put<NotificationContactsApiResponse>(
    ENDPOINTS.notificationContacts,
    body,
  );
}

export async function fetchClusters(): Promise<ApiResponse<ClusterResponse[]>> {
  return get<ClusterResponse[]>(ENDPOINTS.clusters, undefined);
}

export async function fetchClusterSetupApi(): Promise<
  ApiResponse<ClusterSetupApiResponse>
> {
  return get<ClusterSetupApiResponse>(ENDPOINTS.clusterSetup, undefined);
}

export async function updateGovernorateClusterMappingApi(
  body: UpdateGovernorateClusterMappingRequest,
): Promise<ApiResponse<void>> {
  return put<void>(ENDPOINTS.governorateClusterMapping, body);
}
