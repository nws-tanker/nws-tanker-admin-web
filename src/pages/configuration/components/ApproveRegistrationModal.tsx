import { useState } from 'react';
import { Button, Modal, Select } from '@/atoms';
import type { SelectOption } from '@/atoms';
import {
  ROLE_IDS,
  ROLE_LABELS,
  USER_TYPE_LABELS,
} from '@/constants/configuration';
import type { PendingRequest, UserRole } from '@/types/configuration';

type Props = {
  request: PendingRequest | null;
  submitting: boolean;
  onConfirm: (userId: string, roleId: number, clusterId?: number) => void;
  onClose: () => void;
};

const ALL_ROLE_OPTIONS: SelectOption<UserRole>[] = (
  Object.keys(ROLE_LABELS) as UserRole[]
).map((r) => ({ value: r, label: ROLE_LABELS[r] }));

const CONTRACTOR_ROLES = new Set<UserRole>([
  'CLUSTER_MANAGER',
  'SUPERVISOR',
  'INSPECTOR',
]);
const EMPLOYEE_ROLES = new Set<UserRole>(['OPERATIONS_MANAGER', 'EXECUTIVE']);

const CONTRACTOR_ROLE_OPTIONS = ALL_ROLE_OPTIONS.filter((o) =>
  CONTRACTOR_ROLES.has(o.value),
);
const EMPLOYEE_ROLE_OPTIONS = ALL_ROLE_OPTIONS.filter((o) =>
  EMPLOYEE_ROLES.has(o.value),
);

export function ApproveRegistrationModal({
  request,
  submitting,
  onConfirm,
  onClose,
}: Props) {
  const [selectedRole, setSelectedRole] = useState<UserRole | ''>('');
  const [selectedCluster, setSelectedCluster] = useState('');
  const [roleInvalid, setRoleInvalid] = useState(false);

  const isContractor = !!request?.crNumber;
  const roleOptions = isContractor
    ? CONTRACTOR_ROLE_OPTIONS
    : EMPLOYEE_ROLE_OPTIONS;

  const handleConfirm = () => {
    let valid = true;
    if (!selectedRole) {
      setRoleInvalid(true);
      valid = false;
    }

    if (!valid || !request) return;
    console.log('The request is ', request);
    onConfirm(
      request.userID,
      ROLE_IDS[selectedRole as UserRole],
      isContractor ? Number(selectedCluster) : undefined,
    );
  };

  const handleClose = () => {
    if (submitting) return;
    setSelectedRole('');
    setSelectedCluster('');
    setRoleInvalid(false);
    onClose();
  };

  return (
    <Modal
      open={request !== null}
      title={`Approve Registration — ${request?.name ?? ''}`}
      subtitle="Assign a Nama role to activate this account."
      width={500}
      onClose={handleClose}
      footer={
        <>
          <Button
            variant="primary"
            onClick={handleConfirm}
            disabled={submitting}
          >
            {submitting ? 'Approving…' : 'Approve & Activate'}
          </Button>
          <Button
            variant="secondary"
            onClick={handleClose}
            disabled={submitting}
          >
            Cancel
          </Button>
        </>
      }
    >
      {request && (
        <div className="flex flex-col gap-5">
          <div className="rounded-card border border-amber-200 bg-amber-50 px-4 py-3.5">
            <div className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-amber-600">
              {USER_TYPE_LABELS[request.type]}
            </div>
            <div className="text-[13px] font-semibold text-ink-900">
              {request.name}
              <span className="mx-1.5 font-normal text-ink-400">·</span>
              <span className="font-normal text-ink-600">{request.email}</span>
            </div>
            <div className="mt-0.5 text-[12px] text-ink-500">
              Mobile: {request.mobile}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-ink-700">
              Assign role <span className="text-red-500">*</span>
            </label>
            <Select<UserRole>
              options={roleOptions}
              value={selectedRole}
              onChange={(v) => {
                setSelectedRole(v);
                setRoleInvalid(false);
              }}
              placeholder="Select a role"
              invalid={roleInvalid}
              aria-label="Assign role"
            />
            {roleInvalid && (
              <p className="text-[11px] text-red-500">Please select a role</p>
            )}
          </div>
        </div>
      )}
    </Modal>
  );
}
