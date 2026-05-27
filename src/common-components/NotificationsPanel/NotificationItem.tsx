import { ClickableCard, IconButton } from '@/atoms';
import { CloseIcon } from '@/atoms/icons';
import type { AlertItem } from '@/types/alerts';
import {
  CATEGORY_ICON,
  CATEGORY_LABEL,
  severityColorClass,
} from './alertHelpers';

type Props = {
  alert: AlertItem;
  onSelect: (alert: AlertItem) => void;
  onDismiss: (alert: AlertItem) => void;
};

export function NotificationItem({ alert, onSelect, onDismiss }: Props) {
  return (
    <div className="relative border-b border-ink-100">
      <ClickableCard
        onClick={() => onSelect(alert)}
        className="flex items-start gap-2.5 px-4 py-3 pr-12"
      >
        <div className="mt-0.5 flex-shrink-0 text-[18px] leading-none">
          {CATEGORY_ICON[alert.category]}
        </div>
        <div className="min-w-0 flex-1">
          <div
            className={`mb-0.5 text-[11px] font-semibold ${severityColorClass(alert.severity)}`}
          >
            {CATEGORY_LABEL[alert.category]} · {alert.ageHumanized}
          </div>
          <div className="mb-0.5 truncate text-[12px] font-semibold text-ink-900">
            {alert.title}
          </div>
          <div className="truncate text-[11px] text-ink-500">
            {alert.subtitle}
          </div>
        </div>
      </ClickableCard>
      {alert.dismissible ? (
        <span className="absolute top-3 right-3">
          <IconButton
            icon={<CloseIcon className="h-3.5 w-3.5" />}
            size="sm"
            aria-label="Dismiss"
            onClick={() => onDismiss(alert)}
          />
        </span>
      ) : null}
    </div>
  );
}
