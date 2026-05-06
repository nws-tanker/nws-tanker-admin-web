import { PageHeader } from '@/atoms';
import { AppShell } from '@/common-components/AppShell';
import { ScreenStatus } from '@/common-components/ScreenStatus';
import { States } from '@/store/types';
// import type { InspectionRecord } from '@/types/inspection';
import { InspectionKpiStrip } from './components/InspectionKpiStrip';
import { InspectionTable } from './components/InspectionTable';
import { InspectionTabs } from './components/InspectionTabs';
import { useInspectionData } from './hooks/useInspectionData';
import { useInspectionFilters } from './hooks/useInspectionFilters';

export default function InspectionPage() {
  const { activeTab, search, page, setActiveTab, setSearch, setPage } =
    useInspectionFilters();

  const { state, counts, records, totalElements, totalPages, retry } =
    useInspectionData({ activeTab, search, page });

  const subtitle = counts
    ? `${counts.pendingReview} pending review · ${counts.pendingInspection} pending inspection · ${counts.labTesting} awaiting lab · ${counts.approved} approved · ${counts.rejected} rejected`
    : 'Loading…';

  // function handleView(_record: InspectionRecord) {
  //   // TODO: open detail drawer/modal
  // }

  // function handleReview(_record: InspectionRecord) {
  //   // TODO: open review & approve modal
  // }

  // function handleQueueReinspection(_record: InspectionRecord) {
  //   // TODO: open queue re-inspection modal
  // }

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
                onView={handleView}
                onReview={handleReview}
                onQueueReinspection={handleQueueReinspection}
              />
            )}
          </>
        )}
      </div>
    </AppShell>
  );
}
