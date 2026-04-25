import { Button } from '@/atoms';
import type { AssignSubmitting } from './index';

type Props = {
  hasAssignment: boolean;
  submitting: AssignSubmitting;
  onCancel: () => void;
  onClear: () => void;
  onSubmit: () => void;
};

export function AssignModalFooter({
  hasAssignment,
  submitting,
  onCancel,
  onClear,
  onSubmit,
}: Props) {
  const busy = submitting !== null;

  return (
    <>
      <Button variant="ghost" onClick={onCancel} disabled={busy}>
        Cancel
      </Button>
      {hasAssignment ? (
        <Button variant="secondary" onClick={onClear} disabled={busy}>
          {submitting === 'clear' ? 'Clearing…' : 'Clear Assignment'}
        </Button>
      ) : null}
      <Button variant="primary" onClick={onSubmit} disabled={busy}>
        {submitting === 'assign' ? 'Assigning…' : 'Assign'}
      </Button>
    </>
  );
}
