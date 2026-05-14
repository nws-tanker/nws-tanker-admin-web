import { PageHeader } from '@/atoms';
import { AppShell } from '@/common-components/AppShell';
import { ScreenStatus } from '@/common-components/ScreenStatus';
import { ROUTES } from '@/constants/routes';
import { States } from '@/store/types';
import type { ApiInspectionRecord } from '@/types/inspection';
import { useNavigate } from 'react-router-dom';
import { InspectionKpiStrip } from './components/InspectionKpiStrip';
import { InspectionTable } from './components/InspectionTable';
import { InspectionTabs } from './components/InspectionTabs';
import { useInspectionData } from './hooks/useInspectionData';
import { useInspectionFilters } from './hooks/useInspectionFilters';

export default function InspectionPage() {
  const navigate = useNavigate();
  const { activeTab, search, page, setActiveTab, setSearch, setPage } =
    useInspectionFilters();

  const { state, counts, records, totalElements, totalPages, retry } =
    useInspectionData({ activeTab, search, page });

  const subtitle = counts
    ? `${counts.in_review} pending review · ${counts.pending} pending inspection · ${counts.submitted} submitted · ${counts.lab_pending} awaiting lab · ${counts.approved} approved · ${counts.rejected} rejected`
    : 'Loading…';

  function handleNavigateToDetails(record: ApiInspectionRecord) {
    navigate(ROUTES.inspectionDetails.replace(':inspectionId', record.id));
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function handleQueueReinspection(_record: ApiInspectionRecord) {
    // TODO: open queue re-inspection modal
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function handleAssignInspector(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _record: ApiInspectionRecord,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _inspector: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _date: string,
  ) {
    // TODO: dispatch assign inspector API call
  }

  return (
    <AppShell breadcrumbs={['Home', 'Inspection Review']}>
      <div className="flex flex-col px-7 pt-7 pb-6">
        <PageHeader title="Inspection Review" subtitle={subtitle} />

        <InspectionKpiStrip
          counts={counts}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <InspectionTabs
          activeTab={activeTab}
          counts={counts}
          onChange={setActiveTab}
        />

        {state === States.ERROR ? (
          <ScreenStatus state={state} onRetry={retry} />
        ) : (
          <>
            {(state === States.LOADING || state === States.PRELOADING) &&
            records.length === 0 ? (
              <ScreenStatus state={state} />
            ) : (
              <InspectionTable
                activeTab={activeTab}
                records={records}
                totalElements={totalElements}
                totalPages={totalPages}
                page={page}
                search={search}
                onSearch={setSearch}
                onPageChange={setPage}
                onView={handleNavigateToDetails}
                onReview={handleNavigateToDetails}
                onQueueReinspection={handleQueueReinspection}
                onAssignInspector={handleAssignInspector}
              />
            )}
          </>
        )}
      </div>
    </AppShell>
  );
}
