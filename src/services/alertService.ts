import { ENDPOINTS } from '@/constants/endpoints';
import type { ApiResponse } from '@/store/types';
import type {
  AlertsFeedParams,
  AlertsFeedResponse,
  AlertsUnreadCountResponse,
} from '@/types/alerts';
import { get, post } from './http';

export async function fetchAlertsFeedApi(
  params: AlertsFeedParams = {},
): Promise<ApiResponse<AlertsFeedResponse>> {
  const { includeDismissed = false, page = 0, size = 20 } = params;
  return get<AlertsFeedResponse>(ENDPOINTS.alertsFeed, {
    includeDismissed,
    page,
    size,
  });
}

export async function fetchAlertsUnreadCountApi(): Promise<
  ApiResponse<AlertsUnreadCountResponse>
> {
  return get<AlertsUnreadCountResponse>(ENDPOINTS.alertsUnreadCount);
}

export async function dismissAlertApi(
  alertKey: string,
): Promise<ApiResponse<void>> {
  return post<void>(ENDPOINTS.dismissAlert, { alert_key: alertKey });
}

export async function dismissAllAlertsApi(): Promise<ApiResponse<void>> {
  return post<void>(ENDPOINTS.dismissAllAlerts);
}
