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
  alertKey: string;
  referenceCode?: string;
  referenceType: AlertReferenceType;
  referenceId: number;
  occurredAt: string;
  ageHumanized: string;
  deepLinkPath: string;
};

export type AlertsFeedResponse = {
  items: AlertItem[];
};

export type AlertsFeedParams = {
  includeDismissed?: boolean;
  page?: number;
  size?: number;
};

export type AlertsUnreadCountResponse = {
  unreadCount: number;
};
