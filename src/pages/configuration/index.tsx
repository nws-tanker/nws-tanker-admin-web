import { useState } from 'react';
import { PageHeader } from '@/atoms';
import { AppShell } from '@/common-components/AppShell';
import type { ConfigTab } from '@/types/configuration';
import { ClusterSetupTab } from './components/cluster-setup/ClusterSetupTab';
import { ConfigurationTabs } from './components/ConfigurationTabs';
import { FleetTargetsTab } from './components/fleet-targets/FleetTargetsTab';
import { NotificationsTab } from './components/notifications/NotificationsTab';
import { PermitSlaTab } from './components/permit-sla/PermitSlaTab';
import { UsersAndRolesTab } from './components/users-roles/UsersAndRolesTab';
import InspectionChecklist from './components/inspection-checklist/InspectionChecklist';

// TODO: fetch last-modified metadata from the configuration API
const LAST_MODIFIED_BY = 'Hamed Al-Rashdi';
const LAST_MODIFIED_ON = '12 Apr 2026';

export default function ConfigurationPage() {
  const [activeTab, setActiveTab] = useState<ConfigTab>('users-roles');

  return (
    <AppShell breadcrumbs={['Home', 'Configuration']}>
      <div className="flex flex-col px-7 pt-7 pb-6">
        <PageHeader
          title="Configuration"
          subtitle={
            <>
              System-wide settings &middot; last modified by{' '}
              <strong className="font-semibold text-ink-800">
                {LAST_MODIFIED_BY}
              </strong>{' '}
              on {LAST_MODIFIED_ON}
            </>
          }
        />

        <div className="mb-4">
          <ConfigurationTabs active={activeTab} onChange={setActiveTab} />
        </div>

        {activeTab === 'notifications' && <NotificationsTab />}
        {activeTab === 'permit-sla' && <PermitSlaTab />}
        {activeTab === 'users-roles' && <UsersAndRolesTab />}
        {activeTab === 'inspection-checklist' && <InspectionChecklist />}
        {activeTab === 'cluster-setup' && <ClusterSetupTab />}
        {activeTab === 'fleet-targets' && <FleetTargetsTab />}
      </div>
    </AppShell>
  );
}
