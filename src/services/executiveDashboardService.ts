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
import { get } from './http';
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
  params: DashboardParams,
): Promise<ApiResponse<SummaryResponse>> {
  if (USE_MOCK) {
    await mockDelay(600);
    const mockMap = {
      Q1: MOCK_SUMMARY_Q1,
      Q2: MOCK_SUMMARY_Q2,
      Q3: MOCK_SUMMARY_Q3,
      Q4: MOCK_SUMMARY_Q4,
    };
    const data = params.quarter
      ? (mockMap[params.quarter] ?? MOCK_SUMMARY)
      : MOCK_SUMMARY;
    return { success: true, data };
  }
  return get<SummaryResponse>(ENDPOINTS.executiveDashboardSummary, params);
}

export async function fetchComplianceByTankerTypeApi(
  params: DashboardParams,
): Promise<ApiResponse<ComplianceByTankerTypeResponse>> {
  if (USE_MOCK) {
    await mockDelay(1200);
    const mockMap = {
      '1': MOCK_COMPLIANCE_CLUSTER_1,
      '2': MOCK_COMPLIANCE_CLUSTER_2,
      '3': MOCK_COMPLIANCE_CLUSTER_3,
    };
    const data = params.cluster
      ? (mockMap[params.cluster] ?? MOCK_COMPLIANCE_BY_TANKER_TYPE)
      : MOCK_COMPLIANCE_BY_TANKER_TYPE;
    return { success: true, data };
  }
  return get<ComplianceByTankerTypeResponse>(
    ENDPOINTS.executiveDashboardCompliance,
    params,
  );
}

export async function fetchMonthlyInspectionTrendApi(
  params: DashboardParams,
): Promise<ApiResponse<MonthlyInspectionTrendResponse>> {
  if (USE_MOCK) {
    await mockDelay(1800);
    return { success: true, data: MOCK_MONTHLY_INSPECTION_TREND };
  }
  return get<MonthlyInspectionTrendResponse>(
    ENDPOINTS.executiveDashboardTrend,
    params,
  );
}

export async function fetchClusterContractorBreakdownApi(
  params: DashboardParams,
): Promise<ApiResponse<ClusterContractorBreakdownResponse>> {
  if (USE_MOCK) {
    await mockDelay(2500);
    return { success: true, data: MOCK_CLUSTER_CONTRACTOR_BREAKDOWN };
  }
  return get<ClusterContractorBreakdownResponse>(
    ENDPOINTS.executiveDashboardCluster,
    params,
  );
}

export async function fetchComplianceHeatmapApi(
  params: DashboardParams,
): Promise<ApiResponse<ComplianceHeatmapResponse>> {
  if (USE_MOCK) {
    await mockDelay(3200);
    return { success: true, data: MOCK_COMPLIANCE_HEATMAP };
  }
  return get<ComplianceHeatmapResponse>(
    ENDPOINTS.executiveDashboardHeatmap,
    params,
  );
}
