import { useCallback, useEffect, useMemo, useState } from 'react';
import { PageHeader } from '@/atoms';
import { AppShell } from '@/common-components/AppShell';
import { CONFIG_TABS, CONFIG_TAB_ACCESS } from '@/constants/configuration';
import { useAppSelector } from '@/store';
import { selectUserAccess } from '@/store/slices/authSlice';
import type { ConfigTab } from '@/types/configuration';
import { ClusterSetupTab } from './components/cluster-setup/ClusterSetupTab';
import { ConfigurationTabs } from './components/ConfigurationTabs';
// import { FleetTargetsTab } from './components/fleet-targets/FleetTargetsTab';
import { NotificationsTab } from './components/notifications/NotificationsTab';
import { PermitSlaTab } from './components/permit-sla/PermitSlaTab';
import { UsersAndRolesTab } from './components/users-roles/UsersAndRolesTab';
import { formatDate } from '@/utils';
import InspectionChecklist from './components/inspection-checklist/InspectionChecklist';

export default function ConfigurationPage() {
  const userAccess = useAppSelector(selectUserAccess);
  const [lastModifiedBy, setLastModifiedBy] = useState<string | null>(null);
  const [lastModifiedTime, setLastModifiedTime] = useState<string | null>(null);
  const visibleTabs = useMemo(
    () =>
      CONFIG_TABS.filter((t) => userAccess.includes(CONFIG_TAB_ACCESS[t.id])),
    [userAccess],
  );

  const [activeTab, setActiveTab] = useState<ConfigTab | undefined>(
    visibleTabs[0]?.id,
  );

  useEffect(() => {
    if (!activeTab || !visibleTabs.find((t) => t.id === activeTab)) {
      setActiveTab(visibleTabs[0]?.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleTabs]);

  console.log('The last modified time is ', lastModifiedTime);

  // Clear last modified details when switching tabs to prevent stale data
  useEffect(() => {
    setLastModifiedBy(null);
    setLastModifiedTime(null);
  }, [activeTab]);

  const getModifiedValues = useCallback(
    (
      lastModifiedByPerson: string | null,
      lastModifiedOnTime: string | null,
    ) => {
      setLastModifiedBy(lastModifiedByPerson);
      setLastModifiedTime(lastModifiedOnTime);
    },
    [],
  );

  const showLastModified = activeTab && activeTab !== 'users-roles';

  return (
    <AppShell breadcrumbs={['Home', 'Configuration']}>
      <div className="flex flex-col px-7 pt-7 pb-6">
        <PageHeader
          title="Configuration"
          subtitle={
            <>
              System-wide settings
              {showLastModified && (
                <>
                  {' '}
                  &middot; last modified by{' '}
                  <strong className="font-semibold text-ink-800">
                    {lastModifiedBy ?? 'N/A'}
                  </strong>{' '}
                  on {formatDate(lastModifiedTime) ?? 'N/A'}
                </>
              )}
            </>
          }
        />

        <div className="mb-4">
          <ConfigurationTabs
            tabs={visibleTabs}
            active={activeTab ?? visibleTabs[0]?.id}
            onChange={setActiveTab}
          />
        </div>

        {activeTab === 'notifications' && (
          <NotificationsTab onValueChange={getModifiedValues} />
        )}
        {activeTab === 'permit-sla' && (
          <PermitSlaTab onValueChange={getModifiedValues} />
        )}
        {activeTab === 'users-roles' && <UsersAndRolesTab />}
        {activeTab === 'inspection-checklist' && (
          <InspectionChecklist onValueChange={getModifiedValues} />
        )}
        {activeTab === 'cluster-setup' && (
          <ClusterSetupTab onValueChange={getModifiedValues} />
        )}
        {/* {activeTab === 'fleet-targets' && <FleetTargetsTab />} */}
      </div>
    </AppShell>
  );
}
