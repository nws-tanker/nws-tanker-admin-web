import { SidebarBrand } from './SidebarBrand';
import { SidebarNavItem } from './SidebarNavItem';
import { SidebarUser } from './SidebarUser';
import { NAV_SECTIONS, type NavItem } from './navItems';
import { useSidebarData } from './useSidebarData';

export function AppSidebar() {
  const sidebar = useSidebarData() as {
    counts?: Record<string, number>;
  } | null;
  const counts = sidebar?.counts;

  const badgeFor = (item: NavItem) =>
    item.countKey && counts ? counts[item.countKey] : undefined;

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

      <SidebarUser
        name="Hamed Al-Rashdi"
        role="Operations Manager"
        initials="HR"
      />
    </aside>
  );
}
