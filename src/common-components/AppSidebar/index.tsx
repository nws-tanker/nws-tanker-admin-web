import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { resetAllApiData, useAppDispatch, useAppSelector } from '@/store';
import {
  clearAuth,
  selectAuthUser,
  selectUserAccess,
} from '@/store/slices/authSlice';
import { ROUTES, hasRouteAccess } from '@/constants/routes';
import { STORAGE_KEYS } from '@/constants/storageKeys';
import { clearAuthToken } from '@/services/http';
import { SidebarBrand } from './SidebarBrand';
import { SidebarNavItem } from './SidebarNavItem';
import { SidebarUser } from './SidebarUser';
import { NAV_SECTIONS, type NavItem } from './navItems';
import { useSidebarData } from './useSidebarData';
import { getInitials } from '@/utils';

export function AppSidebar() {
  const sidebar = useSidebarData();
  const counts = sidebar?.counts;
  const user = useAppSelector(selectAuthUser);
  const userAccess = useAppSelector(selectUserAccess);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const visibleSections = useMemo(() => {
    return NAV_SECTIONS.map((section) => ({
      ...section,
      items: section.items.filter((item) =>
        hasRouteAccess(item.routeKey, userAccess),
      ),
    })).filter((section) => section.items.length > 0);
  }, [userAccess]);

  const badgeFor = (item: NavItem) =>
    item.countKey && counts ? counts[item.countKey] : undefined;

  function handleSignOut() {
    localStorage.removeItem(STORAGE_KEYS.accessToken);
    localStorage.removeItem(STORAGE_KEYS.refreshToken);
    localStorage.removeItem(STORAGE_KEYS.userName);
    clearAuthToken();
    dispatch(resetAllApiData());
    dispatch(clearAuth());
    navigate(ROUTES.authentication, { replace: true });
  }

  return (
    <aside className="flex flex-col overflow-y-auto overflow-x-hidden bg-teal-900 py-5 text-white/80">
      <SidebarBrand />

      {visibleSections.map((section) => (
        <div key={section.heading} className="mt-4 first:mt-0">
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
