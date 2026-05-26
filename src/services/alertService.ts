import { ENDPOINTS } from '@/constants/endpoints';
import type { ApiResponse } from '@/store/types';
import type {
  AlertItem,
  AlertsFeedParams,
  AlertsFeedResponse,
  AlertsUnreadCountResponse,
} from '@/types/alerts';
import { get, post } from './http';

type AlertItemWire = {
  category: AlertItem['category'];
  severity: AlertItem['severity'];
  title: string;
  subtitle: string;
  dismissible: boolean;
  alert_key: string;
  reference_code?: string;
  reference_type: AlertItem['referenceType'];
  reference_id: number;
  occurred_at: string;
  age_humanized: string;
  deep_link_path: string;
};

type AlertsFeedWire = {
  items: AlertItemWire[];
};

type AlertsUnreadCountWire = {
  unread_count: number;
};

function toAlertItem(wire: AlertItemWire): AlertItem {
  return {
    category: wire.category,
    severity: wire.severity,
    title: wire.title,
    subtitle: wire.subtitle,
    dismissible: wire.dismissible,
    alertKey: wire.alert_key,
    referenceCode: wire.reference_code,
    referenceType: wire.reference_type,
    referenceId: wire.reference_id,
    occurredAt: wire.occurred_at,
    ageHumanized: wire.age_humanized,
    deepLinkPath: wire.deep_link_path,
  };
}

export async function fetchAlertsFeedApi(
  params: AlertsFeedParams = {},
): Promise<ApiResponse<AlertsFeedResponse>> {
  const { includeDismissed = false, page = 0, size = 20 } = params;
  const response = await get<AlertsFeedWire>(ENDPOINTS.alertsFeed, {
    includeDismissed,
    page,
    size,
  });
  if (!response.success) return response;
  return {
    success: true,
    data: { items: response.data.items.map(toAlertItem) },
  };
}

export async function fetchAlertsUnreadCountApi(): Promise<
  ApiResponse<AlertsUnreadCountResponse>
> {
  const response = await get<AlertsUnreadCountWire>(
    ENDPOINTS.alertsUnreadCount,
  );
  if (!response.success) return response;
  return { success: true, data: { unreadCount: response.data.unread_count } };
}

export async function dismissAlertApi(
  alertKey: string,
): Promise<ApiResponse<void>> {
  return post<void>(ENDPOINTS.dismissAlert, { alert_key: alertKey });
}

export async function dismissAllAlertsApi(): Promise<ApiResponse<void>> {
  return post<void>(ENDPOINTS.dismissAllAlerts);
}
