import { IconButton } from '@/atoms';
import { LogoutIcon } from '@/atoms/icons';

type Props = {
  name: string;
  role: string;
  initials: string;
  onSignOut?: () => void;
};

export function SidebarUser({ name, role, initials, onSignOut }: Props) {
  return (
    <div className="mt-auto flex items-center gap-2.5 border-t border-white/10 px-4 py-4">
      <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-teal-600 to-teal-800 text-[12px] font-semibold text-white">
        {initials}
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate text-[13px] font-medium text-white">
          {name}
        </div>
        <div className="truncate text-[11px] text-white/55">{role}</div>
      </div>
      <IconButton
        icon={<LogoutIcon />}
        variant="ghost-dark"
        size="sm"
        title="Sign out"
        aria-label="Sign out"
        onClick={onSignOut}
      />
    </div>
  );
}
