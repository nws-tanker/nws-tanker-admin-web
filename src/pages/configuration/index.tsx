import { useState } from 'react';
import { PageHeader } from '@/atoms';
import { AppShell } from '@/common-components/AppShell';
import type { ConfigTab } from '@/types/configuration';
import { ConfigurationTabs } from './components/ConfigurationTabs';
import { PlaceholderTab } from './components/PlaceholderTab';
import { UsersAndRolesTab } from './components/UsersAndRolesTab';

export default function ConfigurationPage() {
  const [activeTab, setActiveTab] = useState<ConfigTab>('users-roles');

  return (
    <AppShell breadcrumbs={['Home', 'Configuration']}>
      <div className="flex flex-col px-7 pt-7 pb-6">
        <PageHeader title="Configuration" subtitle="System-wide settings" />

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
        {activeTab === 'cluster-setup' && (
          <PlaceholderTab label="Cluster Setup" />
        )}
        {activeTab === 'fleet-targets' && (
          <PlaceholderTab label="Fleet Targets" />
        )}
      </div>
    </AppShell>
  );
}
