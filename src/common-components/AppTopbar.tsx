import { Fragment } from 'react';
import { /* BellIcon, */ RightIcon } from '@/atoms/icons';
// import { IconButton } from '@/atoms';

type Props = {
  breadcrumbs: string[];
  onOpenNotifications?: () => void;
};

export function AppTopbar({ breadcrumbs /* onOpenNotifications */ }: Props) {
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

      {/* <IconButton
        icon={<BellIcon />}
        showDot
        onClick={onOpenNotifications}
        aria-label="Notifications"
      /> */}
    </div>
  );
}
