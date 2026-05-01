import { Button, Select } from '@/atoms';
import type { SelectOption } from '@/atoms';
import type { ActiveUser, UserRole } from '../configurationHelpers';
import { ROLE_LABELS } from '../configurationHelpers';
import { States } from '@/store/types';
import { ActiveUserRow } from './ActiveUserRow';

type Props = {
  users: ActiveUser[];
  usersState: States;
  roleFilter: UserRole | '';
  clusterFilter: string;
  clusterOptions: SelectOption[];
  onRoleFilter: (role: UserRole | '') => void;
  onClusterFilter: (cluster: string) => void;
  onAddUser: () => void;
  onEdit: (id: string) => void;
  onRetry: () => void;
};

const ROLE_OPTIONS: SelectOption<UserRole>[] = (
  Object.keys(ROLE_LABELS) as UserRole[]
).map((r) => ({ value: r, label: ROLE_LABELS[r] }));

type Column = { header: string; width: string };

const COLUMNS: Column[] = [
  { header: 'User', width: 'auto' },
  { header: 'Role', width: '18%' },
  { header: 'Cluster', width: '12%' },
  { header: 'Email', width: '22%' },
  { header: 'Status', width: '9%' },
  { header: 'Last Active', width: '16%' },
  { header: '', width: '7%' },
];

export function ActiveUsersTable({
  users,
  usersState,
  roleFilter,
  clusterFilter,
  clusterOptions,
  onRoleFilter,
  onClusterFilter,
  onAddUser,
  onEdit,
  onRetry,
}: Props) {
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-card-lg border border-ink-200 bg-white shadow-card-sm">
      <div className="flex shrink-0 items-center justify-between px-5 py-3.5">
        <span className="text-[14px] font-semibold text-ink-900">
          Active Users
        </span>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="text-[12px] text-ink-500">Role</span>
            <Select<UserRole>
              options={ROLE_OPTIONS}
              value={roleFilter}
              onChange={onRoleFilter}
              placeholder="All"
              aria-label="Filter by role"
              minWidth={140}
            />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[12px] text-ink-500">Cluster</span>
            <Select
              options={clusterOptions}
              value={clusterFilter}
              onChange={onClusterFilter}
              placeholder="All"
              aria-label="Filter by cluster"
              minWidth={130}
            />
          </div>
          <Button variant="primary" size="md" onClick={onAddUser}>
            + Add User
          </Button>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden border-t border-ink-200">
        <table className="w-full table-fixed text-[13px]">
          <colgroup>
            {COLUMNS.map((col, i) => (
              <col key={i} style={{ width: col.width }} />
            ))}
          </colgroup>
          <thead>
            <tr>
              {COLUMNS.map((col, i) => (
                <th
                  key={i}
                  className="sticky top-0 whitespace-nowrap border-b border-ink-200 bg-ink-50 px-4 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wider text-ink-500"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {usersState === States.LOADING && (
              <tr>
                <td
                  colSpan={COLUMNS.length}
                  className="py-12 text-center text-[13px] text-ink-400"
                >
                  Loading users…
                </td>
              </tr>
            )}
            {usersState === States.ERROR && (
              <tr>
                <td
                  colSpan={COLUMNS.length}
                  className="py-12 text-center text-[13px] text-red-500"
                >
                  Failed to load users.{' '}
                  <button
                    className="underline hover:text-red-700"
                    onClick={onRetry}
                  >
                    Retry
                  </button>
                </td>
              </tr>
            )}
            {usersState === States.SUCCESS && users.length === 0 && (
              <tr>
                <td
                  colSpan={COLUMNS.length}
                  className="py-12 text-center text-[13px] text-ink-400"
                >
                  No active users found.
                </td>
              </tr>
            )}
            {usersState === States.SUCCESS &&
              users.map((user) => (
                <ActiveUserRow key={user.id} user={user} onEdit={onEdit} />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
