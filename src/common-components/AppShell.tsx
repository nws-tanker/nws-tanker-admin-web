import type { ReactNode } from 'react';
import { AppSidebar } from './AppSidebar';
import { AppTopbar } from './AppTopbar';

type Props = {
  breadcrumbs: string[];
  children: ReactNode;
};

export function AppShell({ breadcrumbs, children }: Props) {
  return (
    <div className="h-[100vh] w-full overflow-hidden bg-white">
      <div className="grid h-full" style={{ gridTemplateColumns: '240px 1fr' }}>
        <AppSidebar />
        <div className="flex h-full min-w-0 flex-col overflow-hidden bg-white">
          <AppTopbar breadcrumbs={breadcrumbs} />
          <div className="flex flex-1 flex-col overflow-y-auto">{children}</div>
        </div>
      </div>
    </div>
  );
}
