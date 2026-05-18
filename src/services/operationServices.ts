import { ENDPOINTS } from '@/constants/endpoints';
import { get, hydrateUrl } from './http';
import type { ApiResponse } from '@/store/types';
import type {
  OperationInspectionsResponse,
  OperationPermitRenewalsResponse,
  OperationsSummary,
} from '@/types';

export async function fetchOperationsSummary(): Promise<
  ApiResponse<OperationsSummary>
> {
  return get<OperationsSummary>(ENDPOINTS.operationsSummary);
}

export async function fetchOperationInspections(
  limit: number,
): Promise<ApiResponse<OperationInspectionsResponse>> {
  return get<OperationInspectionsResponse>(
    hydrateUrl(ENDPOINTS.operationInspections, { limit }),
  );
}

export async function fetchOperationPermitRenewals(
  limit: number,
): Promise<ApiResponse<OperationPermitRenewalsResponse>> {
  return get<OperationPermitRenewalsResponse>(
    hydrateUrl(ENDPOINTS.operationsPermitRenewal, { limit }),
  );
}
