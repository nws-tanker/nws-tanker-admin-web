import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { fetchAlertsUnreadCount } from '@/store/apiSlices/alertsUnreadCountApiSlice';

export function useNotificationsDropdown() {
  const dispatch = useAppDispatch();
  const unreadCount = useAppSelector(
    (state) => state.alertsUnreadCountApi.data?.unreadCount ?? 0,
  );
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    void dispatch(fetchAlertsUnreadCount());
  }, [dispatch]);

  const close = () => {
    setOpen(false);
    void dispatch(fetchAlertsUnreadCount());
  };

  return {
    open,
    toggle: () => setOpen((v) => !v),
    close,
    triggerRef,
    unreadCount,
  };
}
