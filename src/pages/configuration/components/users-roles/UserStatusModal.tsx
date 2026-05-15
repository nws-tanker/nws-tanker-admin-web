import { Button, Modal } from '@/atoms';
import type { ActiveUser } from '@/types/configuration';

type Props = {
  user: ActiveUser | null;
  submitting?: boolean;
  onConfirm: (userId: string) => void;
  onClose: () => void;
};

export function UserStatusModal({
  user,
  submitting = false,
  onConfirm,
  onClose,
}: Props) {
  const isActive = user?.status === 'active';
  const title = isActive ? 'Deactivate User' : 'Activate User';
  const confirmLabel = isActive ? 'Deactivate User' : 'Activate User';
  const confirmVariant = isActive ? 'danger' : 'primary';
  const pendingLabel = isActive ? 'Deactivating…' : 'Activating…';
  const description = isActive
    ? 'This user will immediately lose access to the system and will not be able to sign in until reactivated.'
    : 'This user will regain access to the system and be able to sign in again.';

  const handleClose = () => {
    if (submitting) return;
    onClose();
  };

  const handleConfirm = () => {
    if (!user) return;
    onConfirm(user.id);
  };

  return (
    <Modal
      open={user !== null}
      title={title}
      subtitle={user ? user.name : undefined}
      width={460}
      onClose={handleClose}
      footer={
        <>
          <Button
            variant="secondary"
            onClick={handleClose}
            disabled={submitting}
          >
            Cancel
          </Button>
          <Button
            variant={confirmVariant}
            onClick={handleConfirm}
            disabled={submitting}
          >
            {submitting ? pendingLabel : confirmLabel}
          </Button>
        </>
      }
    >
      {user && (
        <div className="flex flex-col gap-3">
          <div className="rounded-card border border-ink-200 bg-ink-50 px-4 py-3">
            <div className="text-[13px] font-semibold text-ink-900">
              {user.name}
            </div>
            {user.email && (
              <div className="mt-0.5 text-[12px] text-ink-500">
                {user.email}
              </div>
            )}
          </div>
          <p className="text-[13px] text-ink-600">{description}</p>
        </div>
      )}
    </Modal>
  );
}
