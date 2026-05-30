import { ENDPOINTS } from '@/constants/endpoints';
import type { ApiResponse } from '@/store/types';
import type {
  FleetComplianceKpiResponse,
  FleetComplianceParams,
  GovernorateComplianceResponse,
  InspectorPerformanceResponse,
} from '@/types/fleetCompliance';
import { post } from './http';

export async function fetchFleetComplianceKpiApi(
  body: FleetComplianceParams,
): Promise<ApiResponse<FleetComplianceKpiResponse>> {
  return post<FleetComplianceKpiResponse>(ENDPOINTS.fleetComplianceKpi, body);
}

export async function fetchGovernorateComplianceApi(
  body: FleetComplianceParams,
): Promise<ApiResponse<GovernorateComplianceResponse>> {
  return post<GovernorateComplianceResponse>(
    ENDPOINTS.fleetComplianceGovernorate,
    body,
  );
}

export async function fetchInspectorPerformanceApi(
  body: FleetComplianceParams,
): Promise<ApiResponse<InspectorPerformanceResponse>> {
  return post<InspectorPerformanceResponse>(
    ENDPOINTS.fleetComplianceInspectorPerformance,
    body,
  );
}
