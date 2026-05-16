import { NavLink } from 'react-router-dom';
import { CountBadge } from '@/atoms';
import { ROUTES } from '@/constants/routes';
import { cn } from '@/utils';
import type { NavItem } from './navItems';

type Props = {
  item: NavItem;
  badge?: number | string;
};

export function SidebarNavItem({ item, badge }: Props) {
  const Icon = item.icon;

  return (
    <NavLink
      to={ROUTES[item.routeKey]}
      end
      className={({ isActive }) =>
        cn(
          'relative flex items-center gap-3 rounded-md px-2.5 py-2.5 text-[13px] font-medium transition-colors',
          isActive
            ? 'bg-white/10 text-white before:absolute before:left-[-13px] before:top-1/2 before:h-4 before:w-[3px] before:-translate-y-1/2 before:rounded-sm before:bg-teal-600'
            : 'text-white/75 hover:bg-white/[0.06] hover:text-white',
        )
      }
    >
      {({ isActive }) => (
        <>
          <Icon
            className={cn(
              'h-[18px] w-[18px] shrink-0',
              isActive ? 'opacity-100' : 'opacity-75',
            )}
          />
          <span className="flex-1 truncate">{item.label}</span>
          {badge !== undefined ? <CountBadge value={badge} /> : null}
        </>
      )}
    </NavLink>
  );
}
