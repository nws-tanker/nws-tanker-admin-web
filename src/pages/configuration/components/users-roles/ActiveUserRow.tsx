import { format, isValid } from 'date-fns';
import { Badge, Button, Chip } from '@/atoms';
import { ROLE_CHIP_TONE, ROLE_LABELS } from '@/constants/configuration';
import type { ActiveUser } from '@/types/configuration';
import { UserAvatar } from './UserAvatar';

type Props = {
  user: ActiveUser;
  onToggleStatus: (user: ActiveUser) => void;
};

export function ActiveUserRow({ user, onToggleStatus }: Props) {
  const isActive = user.status === 'active';
  const roleLabel = user.role ? ROLE_LABELS[user.role] : undefined;
  return (
    <tr className="hover:bg-ink-50">
      <td className="border-b border-ink-100 px-4 py-3 align-middle whitespace-nowrap">
        <div className="flex items-center gap-2.5">
          <UserAvatar name={user.name} />
          <span className="text-[13px] font-semibold text-ink-900">
            {user.name}
          </span>
        </div>
      </td>
      <td className="border-b border-ink-100 px-4 py-3 align-middle whitespace-nowrap text-[13px] text-ink-600">
        {roleLabel ? (
          <Chip tone={ROLE_CHIP_TONE[user.role]}>{roleLabel}</Chip>
        ) : (
          '-'
        )}
      </td>
      <td className="border-b border-ink-100 px-4 py-3 align-middle whitespace-nowrap text-[13px] text-ink-600">
        {user.cluster}
      </td>
      <td className="border-b border-ink-100 px-4 py-3 align-middle text-[13px] text-ink-600">
        <span className="block truncate" title={user.email}>
          {user.email}
        </span>
      </td>
      <td className="border-b border-ink-100 px-4 py-3 align-middle whitespace-nowrap">
        <Badge tone={user.status === 'active' ? 'green' : 'gray'}>
          {user.status === 'active' ? 'Active' : 'Inactive'}
        </Badge>
      </td>
      <td className="border-b border-ink-100 px-4 py-3 align-middle whitespace-nowrap text-[12px] text-ink-500">
        {(() => {
          const d = user.lastActive ? new Date(user.lastActive) : null;
          return d && isValid(d) ? format(d, 'dd MMM yyyy HH:mm') : '-';
        })()}
      </td>
      <td className="border-b border-ink-100 px-4 py-3 align-middle whitespace-nowrap text-right">
        <div className="flex justify-end gap-1">
          <Button
            variant={isActive ? 'danger' : 'primary'}
            size="sm"
            onClick={() => onToggleStatus(user)}
          >
            {isActive ? 'Deactivate' : 'Activate'}
          </Button>
        </div>
      </td>
    </tr>
  );
}
