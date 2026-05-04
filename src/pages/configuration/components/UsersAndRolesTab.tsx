import { useState } from 'react';
import { approveUserApi, rejectUserApi } from '@/services/configurationService';
import { States } from '@/store/types';
import type { PendingRequest, UserRole } from '@/types/configuration';
import { ROLE_IDS } from '@/constants/configuration';
import { useActiveUsers } from '../hooks/useActiveUsers';
import { useClusters } from '../hooks/useClusters';
import { usePendingUsers } from '../hooks/usePendingUsers';
import { ActiveUsersTable } from './ActiveUsersTable';
import { ApproveRegistrationModal } from './ApproveRegistrationModal';
import { PendingAccessRequests } from './PendingAccessRequests';
import { RejectRegistrationModal } from './RejectRegistrationModal';

export function UsersAndRolesTab() {
  const [roleFilter, setRoleFilter] = useState<UserRole | ''>('');
  const [clusterFilter, setClusterFilter] = useState('');

  const {
    requests,
    state: pendingState,
    retry: retryPending,
  } = usePendingUsers();
  console.log('the pending users are ', requests);
  const { clusterOptions } = useClusters();
  const {
    users,
    state: usersState,
    retry: retryUsers,
  } = useActiveUsers({
    roleId: roleFilter ? ROLE_IDS[roleFilter] : undefined,
    clusterId: clusterFilter ? Number(clusterFilter) : undefined,
  });
  const [approveTarget, setApproveTarget] = useState<PendingRequest | null>(
    null,
  );
  const [rejectTarget, setRejectTarget] = useState<PendingRequest | null>(null);
  const [approving, setApproving] = useState(false);
  const [rejecting, setRejecting] = useState(false);

  const handleApproveConfirm = async (
    userId: string,
    roleId: number,
    clusterId?: number,
  ) => {
    setApproving(true);
    const res = await approveUserApi(userId, { roleId, clusterId });
    setApproving(false);
    if (res.success) {
      setApproveTarget(null);
      retryPending();
      retryUsers();
    }
    // TODO: show toast on res.success === false with res.error.description
  };

  const handleRejectConfirm = async (userId: string, reason: string) => {
    setRejecting(true);
    const res = await rejectUserApi(userId, reason);
    setRejecting(false);
    if (res.success) {
      setRejectTarget(null);
      retryPending();
    }
    // TODO: show toast on res.success === false with res.error.description
  };

  // TODO: open Add User modal
  const handleAddUser = () => {};

  // TODO: open Edit User modal/drawer
  const handleEdit = () => {};

  const hasPending = pendingState === States.SUCCESS && requests.length > 0;

  return (
    <div className="flex flex-col gap-4">
      {hasPending && (
        <PendingAccessRequests
          requests={requests}
          onApprove={(request) => setApproveTarget(request)}
          onReject={(request) => setRejectTarget(request)}
        />
      )}
      <ActiveUsersTable
        users={users}
        usersState={usersState}
        roleFilter={roleFilter}
        clusterFilter={clusterFilter}
        clusterOptions={clusterOptions}
        onRoleFilter={setRoleFilter}
        onClusterFilter={setClusterFilter}
        onAddUser={handleAddUser}
        onEdit={handleEdit}
        onRetry={retryUsers}
      />

      <ApproveRegistrationModal
        key={approveTarget?.userID ?? 'approve-closed'}
        request={approveTarget}
        submitting={approving}
        onConfirm={handleApproveConfirm}
        onClose={() => setApproveTarget(null)}
      />
      <RejectRegistrationModal
        key={rejectTarget?.userID ?? 'reject-closed'}
        request={rejectTarget}
        submitting={rejecting}
        onConfirm={handleRejectConfirm}
        onClose={() => setRejectTarget(null)}
      />
    </div>
  );
}
