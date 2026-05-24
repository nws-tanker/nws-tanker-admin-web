import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, useToast } from '@/atoms';
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
  const toast = useToast();
  const { apiState, data, error } = useAppSelector(
    (state) => state.alertsFeedApi,
  );
  const [pendingKeys, setPendingKeys] = useState<Set<string>>(new Set());

  useEffect(() => {
    setPendingKeys(new Set());
    void dispatch(fetchAlertsFeed());
  }, [dispatch]);

  const visibleItems = (data?.items ?? []).filter(
    (a) => !pendingKeys.has(a.alertKey),
  );

  const handleSelect = (alert: AlertItem) => {
    onClose();
    if (alert.deepLinkPath) navigate(alert.deepLinkPath);
  };

  const refreshAlerts = () => {
    void dispatch(fetchAlertsFeed());
    void dispatch(fetchAlertsUnreadCount());
  };

  const handleDismiss = async (alert: AlertItem) => {
    setPendingKeys((prev) => new Set(prev).add(alert.alertKey));
    const response = await dismissAlertApi(alert.alertKey);
    if (!response.success) {
      setPendingKeys((prev) => {
        const next = new Set(prev);
        next.delete(alert.alertKey);
        return next;
      });
      toast.show(response.error?.description ?? 'Failed to dismiss alert', {
        tone: 'error',
      });
      return;
    }
    refreshAlerts();
  };

  const handleDismissAll = async () => {
    const allKeys = (data?.items ?? []).map((a) => a.alertKey);
    setPendingKeys(new Set(allKeys));
    const response = await dismissAllAlertsApi();
    if (!response.success) {
      setPendingKeys(new Set());
      toast.show(response.error?.description ?? 'Failed to dismiss alerts', {
        tone: 'error',
      });
      return;
    }
    refreshAlerts();
  };

  return (
    <div className="overflow-hidden rounded-card-lg border border-ink-200 bg-white shadow-card-lg">
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
