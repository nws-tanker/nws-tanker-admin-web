import { ENDPOINTS } from '@/constants/endpoints';
import { MOCK_FLEET_COMPLIANCE_KPI } from '@/mocks/fleet-compliance/kpiSummary';
import { MOCK_GOVERNORATE_COMPLIANCE } from '@/mocks/fleet-compliance/governorateCompliance';
import { MOCK_INSPECTOR_PERFORMANCE } from '@/mocks/fleet-compliance/inspectorPerformance';
import type { ApiResponse } from '@/store/types';
import type {
  FleetComplianceKpiResponse,
  FleetComplianceParams,
  GovernorateComplianceResponse,
  InspectorPerformanceResponse,
} from '@/types/fleetCompliance';
import { post } from './http';
import { mockDelay, USE_MOCK } from './mockConfig';

export async function fetchFleetComplianceKpiApi(
  body: FleetComplianceParams,
): Promise<ApiResponse<FleetComplianceKpiResponse>> {
  if (USE_MOCK) {
    await mockDelay(500);
    return { success: true, data: MOCK_FLEET_COMPLIANCE_KPI };
  }
  return post<FleetComplianceKpiResponse>(ENDPOINTS.fleetComplianceKpi, body);
}

export async function fetchGovernorateComplianceApi(
  body: FleetComplianceParams,
): Promise<ApiResponse<GovernorateComplianceResponse>> {
  if (USE_MOCK) {
    await mockDelay(800);
    return { success: true, data: MOCK_GOVERNORATE_COMPLIANCE };
  }
  return post<GovernorateComplianceResponse>(
    ENDPOINTS.fleetComplianceGovernorate,
    body,
  );
}

export async function fetchInspectorPerformanceApi(
  body: FleetComplianceParams,
): Promise<ApiResponse<InspectorPerformanceResponse>> {
  if (USE_MOCK) {
    await mockDelay(800);
    return { success: true, data: MOCK_INSPECTOR_PERFORMANCE };
  }
  return post<InspectorPerformanceResponse>(
    ENDPOINTS.fleetComplianceInspectorPerformance,
    body,
  );
}
