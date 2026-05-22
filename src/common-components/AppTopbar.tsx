import { Fragment, useEffect, useRef, useState } from 'react';
import { BellIcon, RightIcon } from '@/atoms/icons';
import { IconButton } from '@/atoms';
import { useAppDispatch, useAppSelector } from '@/store';
import { fetchAlertsUnreadCount } from '@/store/apiSlices/alertsUnreadCountApiSlice';
import { NotificationsPanel } from './NotificationsPanel';

type Props = {
  breadcrumbs: string[];
};

export function AppTopbar({ breadcrumbs }: Props) {
  const dispatch = useAppDispatch();
  const unreadCount = useAppSelector(
    (state) => state.alertsUnreadCountApi.data?.unread_count ?? 0,
  );
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    void dispatch(fetchAlertsUnreadCount());
  }, [dispatch]);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, [open]);

  const handleClose = () => {
    setOpen(false);
    void dispatch(fetchAlertsUnreadCount());
  };

  return (
    <div className="flex items-center gap-5 border-b border-ink-200 bg-white px-7 py-3.5">
      <div className="flex items-center gap-2 text-[13px] text-ink-500">
        {breadcrumbs.map((crumb, idx) => {
          const isLast = idx === breadcrumbs.length - 1;
          return (
            <Fragment key={`${crumb}-${idx}`}>
              {idx > 0 ? <RightIcon className="h-3 w-3 text-ink-300" /> : null}
              <span className={isLast ? 'font-medium text-ink-800' : ''}>
                {crumb}
              </span>
            </Fragment>
          );
        })}
      </div>

      <div className="flex-1" />

      <div ref={wrapRef} className="relative">
        <IconButton
          icon={<BellIcon />}
          count={unreadCount}
          onClick={() => setOpen((v) => !v)}
          aria-label="Notifications"
          aria-expanded={open}
        />
        {open ? <NotificationsPanel onClose={handleClose} /> : null}
      </div>
    </div>
  );
}
