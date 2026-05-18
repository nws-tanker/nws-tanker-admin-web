import { ENDPOINTS } from '@/constants/endpoints';
import { MOCK_MASTER_LOOKUPS } from '@/mocks/lookups/masterLookups';
import {
  MOCK_SUMMARY,
  MOCK_SUMMARY_Q1,
  MOCK_SUMMARY_Q2,
  MOCK_SUMMARY_Q3,
  MOCK_SUMMARY_Q4,
} from '@/mocks/executive-dashboard/summary';
import {
  MOCK_COMPLIANCE_BY_TANKER_TYPE,
  MOCK_COMPLIANCE_CLUSTER_1,
  MOCK_COMPLIANCE_CLUSTER_2,
  MOCK_COMPLIANCE_CLUSTER_3,
} from '@/mocks/executive-dashboard/complianceByTankerType';
import { MOCK_MONTHLY_INSPECTION_TREND } from '@/mocks/executive-dashboard/monthlyInspectionTrend';
import { MOCK_CLUSTER_CONTRACTOR_BREAKDOWN } from '@/mocks/executive-dashboard/clusterContractorBreakdown';
import { MOCK_COMPLIANCE_HEATMAP } from '@/mocks/executive-dashboard/complianceHeatmap';
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
import { mockDelay, USE_MOCK } from './mockConfig';

export async function fetchExecutiveDashboardLookupsApi(): Promise<
  ApiResponse<ExecutiveDashboardLookupsResponse>
> {
  if (USE_MOCK) {
    await mockDelay(300);
    const { fiscal_year, quarters, clusters } = MOCK_MASTER_LOOKUPS;
    return { success: true, data: { fiscal_year, quarters, clusters } };
  }
  return get<ExecutiveDashboardLookupsResponse>(ENDPOINTS.lookups);
}

export async function fetchExecutiveDashboardSummaryApi(
  body: DashboardParams,
): Promise<ApiResponse<SummaryResponse>> {
  if (USE_MOCK) {
    await mockDelay(600);
    const mockMap: Record<string, SummaryResponse> = {
      Q1: MOCK_SUMMARY_Q1,
      Q2: MOCK_SUMMARY_Q2,
      Q3: MOCK_SUMMARY_Q3,
      Q4: MOCK_SUMMARY_Q4,
    };
    const firstQuarter = body.quarters?.[0];
    const data = firstQuarter
      ? (mockMap[firstQuarter] ?? MOCK_SUMMARY)
      : MOCK_SUMMARY;
    return { success: true, data };
  }
  return post<SummaryResponse>(ENDPOINTS.executiveDashboardSummary, body);
}

export async function fetchComplianceByTankerTypeApi(
  body: DashboardParams,
): Promise<ApiResponse<ComplianceByTankerTypeResponse>> {
  if (USE_MOCK) {
    await mockDelay(1200);
    const mockMap: Record<string, ComplianceByTankerTypeResponse> = {
      '1': MOCK_COMPLIANCE_CLUSTER_1,
      '2': MOCK_COMPLIANCE_CLUSTER_2,
      '3': MOCK_COMPLIANCE_CLUSTER_3,
    };
    const firstCluster = body.clusters?.[0];
    const data = firstCluster
      ? (mockMap[firstCluster] ?? MOCK_COMPLIANCE_BY_TANKER_TYPE)
      : MOCK_COMPLIANCE_BY_TANKER_TYPE;
    return { success: true, data };
  }
  return post<ComplianceByTankerTypeResponse>(
    ENDPOINTS.executiveDashboardCompliance,
    body,
  );
}

export async function fetchMonthlyInspectionTrendApi(
  body: DashboardParams,
): Promise<ApiResponse<MonthlyInspectionTrendResponse>> {
  if (USE_MOCK) {
    await mockDelay(1800);
    return { success: true, data: MOCK_MONTHLY_INSPECTION_TREND };
  }
  return post<MonthlyInspectionTrendResponse>(
    ENDPOINTS.executiveDashboardTrend,
    body,
  );
}

export async function fetchClusterContractorBreakdownApi(
  body: DashboardParams,
): Promise<ApiResponse<ClusterContractorBreakdownResponse>> {
  if (USE_MOCK) {
    await mockDelay(2500);
    return { success: true, data: MOCK_CLUSTER_CONTRACTOR_BREAKDOWN };
  }
  return post<ClusterContractorBreakdownResponse>(
    ENDPOINTS.executiveDashboardCluster,
    body,
  );
}

export async function fetchComplianceHeatmapApi(
  body: DashboardParams,
): Promise<ApiResponse<ComplianceHeatmapResponse>> {
  if (USE_MOCK) {
    await mockDelay(3200);
    return { success: true, data: MOCK_COMPLIANCE_HEATMAP };
  }
  return post<ComplianceHeatmapResponse>(
    ENDPOINTS.executiveDashboardHeatmap,
    body,
  );
}
