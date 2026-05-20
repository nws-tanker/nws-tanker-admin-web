import { useNavigate } from 'react-router-dom';
import { PageHeader } from '@/atoms';
import { AppShell } from '@/common-components/AppShell';
import { ScreenStatus } from '@/common-components/ScreenStatus';
import { ROUTES } from '@/constants/routes';
import { States } from '@/store/types';
import { formatDate } from '@/utils';
import { FleetBanner } from './components/FleetBanner';
import FleetBannerSkeleton from './components/FleetBannerSkeleton';
import { InspectionPipelineCard } from './components/InspectionPipelineCard';
import { OperationsKpiGrid } from './components/OperationsKpiGrid';
import OperationsKpiGridSkeleton from './components/OperationsKpiGridSkeleton';
import { PermitRenewalCard } from './components/PermitRenewalCard';
import TableCardSkeleton from './components/TableCardSkeleton';
import { useOperationInspections } from './hooks/useOperationInspections';
import { useOperationPermitRenewals } from './hooks/useOperationPermitRenewals';
import { useOperationsSummary } from './hooks/useOperationsSummary';

const INSPECTIONS_LIMIT = 10;
const RENEWALS_LIMIT = 10;

function isLoading(state: States): boolean {
  return state === States.LOADING || state === States.PRELOADING;
}

export default function OperationsPage() {
  const navigate = useNavigate();
  const summary = useOperationsSummary();
  const inspections = useOperationInspections(INSPECTIONS_LIMIT);
  const renewals = useOperationPermitRenewals(RENEWALS_LIMIT);

  const subtitle = summary.data ? (
    <>
      Today · {formatDate(summary.data.date)} ·{' '}
      <span className="font-medium text-teal-700">
        {summary.data.inspections_submitted_today} inspections submitted
      </span>
    </>
  ) : null;

  return (
    <AppShell breadcrumbs={['Home', 'Operations']}>
      <div className="flex flex-col px-7 pt-7 pb-6">
        <PageHeader title="Operations Dashboard" subtitle={subtitle} />

        {summary.state === States.ERROR ? (
          <ScreenStatus state={summary.state} onRetry={summary.retry} />
        ) : isLoading(summary.state) || !summary.data ? (
          <>
            <FleetBannerSkeleton />
            <OperationsKpiGridSkeleton />
          </>
        ) : (
          <>
            <FleetBanner summary={summary.data} />
            <OperationsKpiGrid summary={summary.data} />
          </>
        )}

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          {inspections.state === States.ERROR ? (
            <ScreenStatus
              state={inspections.state}
              onRetry={inspections.retry}
            />
          ) : isLoading(inspections.state) || !inspections.data ? (
            <TableCardSkeleton title="Inspection Pipeline" columns={6} />
          ) : (
            <InspectionPipelineCard
              items={inspections.data.items}
              onOpenAll={() => navigate(ROUTES.inspectionReview)}
            />
          )}

          {renewals.state === States.ERROR ? (
            <ScreenStatus state={renewals.state} onRetry={renewals.retry} />
          ) : isLoading(renewals.state) || !renewals.data ? (
            <TableCardSkeleton title="Permit Renewal Queue" columns={5} />
          ) : (
            <PermitRenewalCard
              items={renewals.data.items}
              urgentCount={renewals.data.urgent_count}
              onOpenAll={() => navigate(ROUTES.permitRenewal)}
            />
          )}
        </div>
      </div>
    </AppShell>
  );
}
