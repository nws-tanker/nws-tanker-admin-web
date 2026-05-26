import { States } from '@/store/types';
import type { AlertItem } from '@/types/alerts';
import { NotificationItem } from './NotificationItem';

type Props = {
  apiState: States;
  items: AlertItem[];
  errorMessage: string | null;
  onSelect: (alert: AlertItem) => void;
  onDismiss: (alert: AlertItem) => void;
};

export function NotificationsList({
  apiState,
  items,
  errorMessage,
  onSelect,
  onDismiss,
}: Props) {
  if (apiState === States.LOADING || apiState === States.PRELOADING) {
    return (
      <div className="px-8 py-10 text-center text-[13px] text-ink-400">
        Loading…
      </div>
    );
  }

  if (apiState === States.ERROR) {
    return (
      <div className="px-8 py-10 text-center text-[13px] text-red-600">
        {errorMessage ?? 'Failed to load notifications'}
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="px-8 py-10 text-center text-[13px] text-ink-400">
        ✅ All caught up
      </div>
    );
  }

  return (
    <div className="max-h-[60vh] overflow-y-auto">
      {items.map((alert) => (
        <NotificationItem
          key={alert.alertKey}
          alert={alert}
          onSelect={onSelect}
          onDismiss={onDismiss}
        />
      ))}
    </div>
  );
}
