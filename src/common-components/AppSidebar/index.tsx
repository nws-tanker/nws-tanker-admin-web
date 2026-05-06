import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store';
import { clearAuth, selectAuthUser } from '@/store/slices/authSlice';
import { ROUTES } from '@/constants/routes';
import { STORAGE_KEYS } from '@/constants/storageKeys';
import { SidebarBrand } from './SidebarBrand';
import { SidebarNavItem } from './SidebarNavItem';
import { SidebarUser } from './SidebarUser';
import { NAV_SECTIONS, type NavItem } from './navItems';
import { useSidebarData } from './useSidebarData';
import { getInitials } from '@/pages/configuration/configurationHelpers';

export function AppSidebar() {
  const sidebar = useSidebarData() as {
    counts?: Record<string, number>;
  } | null;
  const counts = sidebar?.counts;
  const user = useAppSelector(selectAuthUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const badgeFor = (item: NavItem) =>
    item.countKey && counts ? counts[item.countKey] : undefined;

  function handleSignOut() {
    localStorage.removeItem(STORAGE_KEYS.accessToken);
    localStorage.removeItem(STORAGE_KEYS.userName);
    dispatch(clearAuth());
    navigate(ROUTES.authentication, { replace: true });
  }

  return (
    <aside className="flex flex-col overflow-y-auto overflow-x-hidden bg-teal-900 py-5 text-white/80">
      <SidebarBrand />

      {NAV_SECTIONS.map((section) => (
        <div key={section.heading} className="mt-4 first:mt-4">
          <div className="px-4 pb-1.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-white/45">
            {section.heading}
          </div>
          <nav className="flex flex-col gap-px px-2.5">
            {section.items.map((item) => (
              <SidebarNavItem
                key={item.key}
                item={item}
                badge={badgeFor(item)}
              />
            ))}
          </nav>
        </div>
      ))}

      {user && (
        <SidebarUser
          name={user.userName}
          role={user.roleName}
          initials={getInitials(user.userName)}
          onSignOut={handleSignOut}
        />
      )}
    </aside>
  );
}
