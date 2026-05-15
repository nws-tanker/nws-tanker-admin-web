import { format, isValid } from 'date-fns';
import { Badge, Button, Chip } from '@/atoms';
import { ROLE_CHIP_TONE, ROLE_LABELS } from '@/constants/configuration';
import type { ActiveUser } from '@/types/configuration';
import { UserAvatar } from './UserAvatar';

type Props = {
  user: ActiveUser;
  onEdit: (id: string) => void;
};

export function ActiveUserRow({ user, onEdit }: Props) {
  return (
    <tr className="hover:bg-ink-50">
      <td className="border-b border-ink-100 px-4 py-3">
        <div className="flex items-center gap-2.5">
          <UserAvatar name={user.name} />
          <span className="text-[13px] font-semibold text-ink-900">
            {user.name}
          </span>
        </div>
      </td>
      <td className="border-b border-ink-100 px-4 py-3">
        <Chip tone={ROLE_CHIP_TONE[user.role]}>{ROLE_LABELS[user.role]}</Chip>
      </td>
      <td className="border-b border-ink-100 px-4 py-3 text-[13px] text-ink-600">
        {user.cluster}
      </td>
      <td className="border-b border-ink-100 px-4 py-3 text-[13px] text-ink-600">
        {user.email}
      </td>
      <td className="border-b border-ink-100 px-4 py-3">
        <Badge tone={user.status === 'active' ? 'green' : 'gray'}>
          {user.status === 'active' ? 'Active' : 'Inactive'}
        </Badge>
      </td>
      <td className="border-b border-ink-100 px-4 py-3 text-[12px] text-ink-500">
        {(() => {
          const d = user.lastActive ? new Date(user.lastActive) : null;
          return d && isValid(d) ? format(d, 'dd MMM yyyy HH:mm') : null;
        })()}
      </td>
      <td className="border-b border-ink-100 px-4 py-3 text-right">
        <Button variant="ghost" size="sm" onClick={() => onEdit(user.id)}>
          Edit
        </Button>
      </td>
    </tr>
  );
}
