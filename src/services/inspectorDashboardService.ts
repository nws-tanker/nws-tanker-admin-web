import { ENDPOINTS } from '@/constants/endpoints';
import type { ApiResponse } from '@/store/types';
import type { InspectorDashboardResponse } from '@/types/inspectorDashboard';
import { get } from './http';

export async function fetchInspectorDashboardApi(): Promise<
  ApiResponse<InspectorDashboardResponse>
> {
  return get<InspectorDashboardResponse>(ENDPOINTS.inspectorDashboard);
}
