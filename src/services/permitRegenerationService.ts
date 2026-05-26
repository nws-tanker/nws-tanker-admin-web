import { ENDPOINTS } from '@/constants/endpoints';
import type { ApiResponse } from '@/store/types';
import type {
  ApprovedInspectionsParams,
  ApprovedInspectionsResponse,
  RegeneratePermitsRequest,
  RegeneratePermitsResponse,
} from '@/types/permitRegeneration';
import { get, post } from './http';

export async function fetchApprovedInspectionsApi(
  params: ApprovedInspectionsParams = {},
): Promise<ApiResponse<ApprovedInspectionsResponse>> {
  const { page = 0, size = 20, ...rest } = params;
  return get<ApprovedInspectionsResponse>(ENDPOINTS.approvedInspections, {
    page,
    size,
    ...rest,
  });
}

export async function regeneratePermitsApi(
  body: RegeneratePermitsRequest,
): Promise<ApiResponse<RegeneratePermitsResponse>> {
  return post<RegeneratePermitsResponse>(ENDPOINTS.regeneratePermits, body);
}
