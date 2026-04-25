import { Button } from '@/atoms';
import { States } from '@/store/types';

type Props = {
  state: States;
  onRetry?: () => void;
};

export function ScreenStatus({ state, onRetry }: Props) {
  if (state === States.LOADING || state === States.PRELOADING) {
    return (
      <div className="grid place-items-center py-20">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-ink-200 border-t-teal-600" />
      </div>
    );
  }
  if (state === States.ERROR) {
    return (
      <div className="px-8 py-16 text-center">
        <div className="mb-2 text-[15px] font-medium text-red-600">
          Something went wrong
        </div>
        <div className="mb-4 text-[13px] text-ink-500">
          Please try again in a moment.
        </div>
        {onRetry ? (
          <Button variant="secondary" onClick={onRetry}>
            Retry
          </Button>
        ) : null}
      </div>
    );
  }
  return null;
}
