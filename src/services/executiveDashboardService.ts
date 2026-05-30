import { ENDPOINTS } from '@/constants/endpoints';
import type { ApiResponse } from '@/store/types';
import type {
  ClusterContractorBreakdownResponse,
  ComplianceByTankerTypeResponse,
  ComplianceHeatmapResponse,
  DashboardParams,
  ExecutiveDashboardLookupsResponse,
  MonthlyInspectionTrendResponse,
  SummaryResponse,
} from '@/types/executiveDashboard';
import { get, post } from './http';

export async function fetchExecutiveDashboardLookupsApi(): Promise<
  ApiResponse<ExecutiveDashboardLookupsResponse>
> {
  return get<ExecutiveDashboardLookupsResponse>(ENDPOINTS.lookups);
}

export async function fetchExecutiveDashboardSummaryApi(
  body: DashboardParams,
): Promise<ApiResponse<SummaryResponse>> {
  return post<SummaryResponse>(ENDPOINTS.executiveDashboardSummary, body);
}

export async function fetchComplianceByTankerTypeApi(
  body: DashboardParams,
): Promise<ApiResponse<ComplianceByTankerTypeResponse>> {
  return post<ComplianceByTankerTypeResponse>(
    ENDPOINTS.executiveDashboardCompliance,
    body,
  );
}

export async function fetchMonthlyInspectionTrendApi(
  body: DashboardParams,
): Promise<ApiResponse<MonthlyInspectionTrendResponse>> {
  return post<MonthlyInspectionTrendResponse>(
    ENDPOINTS.executiveDashboardTrend,
    body,
  );
}

export async function fetchClusterContractorBreakdownApi(
  body: DashboardParams,
): Promise<ApiResponse<ClusterContractorBreakdownResponse>> {
  return post<ClusterContractorBreakdownResponse>(
    ENDPOINTS.executiveDashboardCluster,
    body,
  );
}

export async function fetchComplianceHeatmapApi(
  body: DashboardParams,
): Promise<ApiResponse<ComplianceHeatmapResponse>> {
  return post<ComplianceHeatmapResponse>(
    ENDPOINTS.executiveDashboardHeatmap,
    body,
  );
}
