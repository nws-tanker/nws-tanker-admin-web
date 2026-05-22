export type AlertCategory =
  | 'PENDING_INSPECTION'
  | 'SAMPLE_COLLECTION'
  | 'SLA_DELAY'
  | 'PENDING_LAB_RESULTS'
  | 'PENDING_APPROVAL'
  | 'CERTIFICATE_EXPIRY';

export type AlertSeverity = 'WARNING' | 'CRITICAL' | 'INFO';

export type AlertReferenceType =
  | 'AGGREGATE'
  | 'INSPECTION'
  | 'PERMIT'
  | 'TANKER';

export type AlertItem = {
  category: AlertCategory;
  severity: AlertSeverity;
  title: string;
  subtitle: string;
  dismissible: boolean;
  alert_key: string;
  reference_code?: string;
  reference_type: AlertReferenceType;
  reference_id: number;
  occurred_at: string;
  age_humanized: string;
  deep_link_path: string;
};

export type AlertsFeedResponse = {
  items: AlertItem[];
  total_unread: number;
  total_returned: number;
};

export type AlertsFeedParams = {
  includeDismissed?: boolean;
  page?: number;
  size?: number;
};

export type AlertsUnreadCountResponse = {
  unread_count: number;
};
