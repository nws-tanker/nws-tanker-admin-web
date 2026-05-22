import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/atoms';
import { dismissAlertApi, dismissAllAlertsApi } from '@/services/alertService';
import { useAppDispatch, useAppSelector } from '@/store';
import { fetchAlertsFeed } from '@/store/apiSlices/alertsFeedApiSlice';
import { fetchAlertsUnreadCount } from '@/store/apiSlices/alertsUnreadCountApiSlice';
import type { AlertItem } from '@/types/alerts';
import { NotificationsList } from './NotificationsList';

type Props = {
  onClose: () => void;
};

export function NotificationsPanel({ onClose }: Props) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { apiState, data, error } = useAppSelector(
    (state) => state.alertsFeedApi,
  );
  const [pendingKeys, setPendingKeys] = useState<Set<string>>(new Set());

  useEffect(() => {
    setPendingKeys(new Set());
    void dispatch(fetchAlertsFeed());
  }, [dispatch]);

  const visibleItems = (data?.items ?? []).filter(
    (a) => !pendingKeys.has(a.alert_key),
  );

  const handleSelect = (alert: AlertItem) => {
    onClose();
    if (alert.deep_link_path) navigate(alert.deep_link_path);
  };

  const refreshAlerts = () => {
    void dispatch(fetchAlertsFeed());
    void dispatch(fetchAlertsUnreadCount());
  };

  const handleDismiss = async (alert: AlertItem) => {
    setPendingKeys((prev) => new Set(prev).add(alert.alert_key));
    const response = await dismissAlertApi(alert.alert_key);
    if (!response.success) {
      setPendingKeys((prev) => {
        const next = new Set(prev);
        next.delete(alert.alert_key);
        return next;
      });
      return;
    }
    refreshAlerts();
  };

  const handleDismissAll = async () => {
    const allKeys = (data?.items ?? []).map((a) => a.alert_key);
    setPendingKeys(new Set(allKeys));
    const response = await dismissAllAlertsApi();
    if (!response.success) {
      setPendingKeys(new Set());
      return;
    }
    refreshAlerts();
  };

  return (
    <div className="absolute top-[calc(100%+8px)] right-0 z-[300] w-[380px] overflow-hidden rounded-card-lg border border-ink-200 bg-white shadow-card-lg">
      <div className="flex items-center justify-between border-b border-ink-100 px-4 py-3">
        <span className="text-[13px] font-bold text-ink-900">
          Notifications
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDismissAll}
          className="!px-1 text-[11px] text-teal-700 hover:text-teal-800"
        >
          Dismiss all
        </Button>
      </div>
      <NotificationsList
        apiState={apiState}
        items={visibleItems}
        errorMessage={error?.description ?? null}
        onSelect={handleSelect}
        onDismiss={handleDismiss}
      />
    </div>
  );
}
