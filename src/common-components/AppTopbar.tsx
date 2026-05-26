import { Fragment } from 'react';
import { IconButton, Popover } from '@/atoms';
import { BellIcon, RightIcon } from '@/atoms/icons';
import { NotificationsPanel } from './NotificationsPanel';
import { useNotificationsDropdown } from './NotificationsPanel/useNotificationsDropdown';

type Props = {
  breadcrumbs: string[];
};

export function AppTopbar({ breadcrumbs }: Props) {
  const { open, toggle, close, triggerRef, unreadCount } =
    useNotificationsDropdown();

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

      <div ref={triggerRef}>
        <IconButton
          icon={<BellIcon />}
          count={unreadCount}
          onClick={toggle}
          aria-label="Notifications"
          aria-expanded={open}
        />
      </div>
      <Popover
        open={open}
        triggerRef={triggerRef}
        onClose={close}
        align="end"
        width={380}
      >
        <NotificationsPanel onClose={close} />
      </Popover>
    </div>
  );
}
