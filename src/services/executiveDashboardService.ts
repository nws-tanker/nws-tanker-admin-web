import { ENDPOINTS } from '@/constants/endpoints';
import type { ApiResponse } from '@/store/types';
import type {
  ClusterBreakdown,
  DashboardQueryParams,
  ExecutiveSummary,
  Heatmap,
  MonthlyTrend,
} from '@/types/dashboard';
import {
  MOCK_CLUSTER_BREAKDOWN,
  MOCK_EXECUTIVE_SUMMARY,
  MOCK_HEATMAP,
  MOCK_MONTHLY_TREND,
} from '@/mocks/executiveDashboard';
import { get } from './http';
import { mockDelay, USE_MOCK } from './mockConfig';

function queryParams(
  params: DashboardQueryParams,
): Record<string, string | number> {
  const q: Record<string, string | number> = {};
  if (params.quarter) q.quarter = params.quarter;
  if (params.clusterId != null) q.clusterId = params.clusterId;
  return q;
}

export async function fetchExecutiveSummaryApi(
  params: DashboardQueryParams,
): Promise<ApiResponse<ExecutiveSummary>> {
  if (USE_MOCK) {
    await mockDelay();
    return {
      success: true,
      data: {
        ...MOCK_EXECUTIVE_SUMMARY,
        filters: {
          quarter: params.quarter ?? MOCK_EXECUTIVE_SUMMARY.filters.quarter,
          clusterId: params.clusterId ?? null,
        },
      },
    };
  }
  return get<ExecutiveSummary>(
    ENDPOINTS.executiveDashboardSummary,
    queryParams(params),
  );
}

export async function fetchExecutiveTrendApi(
  params: DashboardQueryParams,
): Promise<ApiResponse<MonthlyTrend>> {
  if (USE_MOCK) {
    await mockDelay();
    return { success: true, data: MOCK_MONTHLY_TREND };
  }
  return get<MonthlyTrend>(
    ENDPOINTS.executiveDashboardTrend,
    queryParams(params),
  );
}

export async function fetchExecutiveClustersApi(
  params: DashboardQueryParams,
): Promise<ApiResponse<ClusterBreakdown>> {
  if (USE_MOCK) {
    await mockDelay();
    return { success: true, data: MOCK_CLUSTER_BREAKDOWN };
  }
  return get<ClusterBreakdown>(
    ENDPOINTS.executiveDashboardClusters,
    queryParams(params),
  );
}

export async function fetchExecutiveHeatmapApi(
  params: DashboardQueryParams,
): Promise<ApiResponse<Heatmap>> {
  if (USE_MOCK) {
    await mockDelay();
    return { success: true, data: MOCK_HEATMAP };
  }
  return get<Heatmap>(ENDPOINTS.executiveDashboardHeatmap, queryParams(params));
}
