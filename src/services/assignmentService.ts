import { ENDPOINTS } from '@/constants/endpoints';
import {
  buildAssignInspectorMock,
  buildClearAssignmentMock,
  type AssignInspectorMockResponse,
  type ClearAssignmentMockResponse,
} from '@/mocks/fleet-registry/assignment';
import type { ApiResponse } from '@/store/types';
import type { Assignment } from '@/types';
import { del, hydrateUrl, post } from './http';
import { mockDelay, USE_MOCK } from './mockConfig';

export type AssignInspectorRequest = Assignment;

export type AssignInspectorResponse = AssignInspectorMockResponse;

export async function assignInspectorApi(
  plateNumber: string,
  request: AssignInspectorRequest,
): Promise<ApiResponse<AssignInspectorResponse>> {
  if (USE_MOCK) {
    // Longer than the read endpoints so the "Assigning…" state is visible
    // and the disabled-buttons UX is clearly exercised.
    await mockDelay(1500);
    return {
      success: true,
      data: buildAssignInspectorMock(plateNumber, request),
    };
  }

  return post<AssignInspectorResponse>(
    hydrateUrl(ENDPOINTS.assignment, { plateNumber }),
    request,
  );
}

export type ClearAssignmentResponse = ClearAssignmentMockResponse;

export async function clearInspectorAssignmentApi(
  plateNumber: string,
): Promise<ApiResponse<ClearAssignmentResponse>> {
  if (USE_MOCK) {
    await mockDelay(1500);
    return { success: true, data: buildClearAssignmentMock(plateNumber) };
  }

  return del<ClearAssignmentResponse>(
    hydrateUrl(ENDPOINTS.assignment, { plateNumber }),
  );
}
