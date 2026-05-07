import { useState } from 'react';
import { PageHeader } from '@/atoms';
import { AppShell } from '@/common-components/AppShell';
import type { ConfigTab } from '@/types/configuration';
import { ClusterSetupTab } from './components/ClusterSetupTab';
import { ConfigurationTabs } from './components/ConfigurationTabs';
import { FleetTargetsTab } from './components/FleetTargetsTab';
import { PlaceholderTab } from './components/PlaceholderTab';
import { UsersAndRolesTab } from './components/UsersAndRolesTab';

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

        {activeTab === 'notifications' && (
          <PlaceholderTab label="Notifications & Communications" />
        )}
        {activeTab === 'permit-sla' && (
          <PlaceholderTab label="Permit & SLA Rules" />
        )}
        {activeTab === 'users-roles' && <UsersAndRolesTab />}
        {activeTab === 'inspection-checklist' && (
          <PlaceholderTab label="Inspection Checklist" />
        )}
        {activeTab === 'cluster-setup' && <ClusterSetupTab />}
        {activeTab === 'fleet-targets' && <FleetTargetsTab />}
      </div>
    </AppShell>
  );
}
