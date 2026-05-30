import React, { useEffect } from 'react';
import { Button, PageHeader } from '@/atoms';
import { AppShell } from '@/common-components/AppShell';
import { ROUTES } from '@/constants/routes';
import { States } from '@/store/types';
import { useNavigate, useParams } from 'react-router-dom';
import { useInspectionDetailsData } from './hooks/useInspectionData';
import InspectionDetailsSkeleton from './components/InspectionDetailsSkeleton';
import { InspectionStatusPill } from './components/InspectionStatusPill';
import ApprovedInspectionDetails from './sections/approved/ApprovedInspectionDetails';
import LabTestingInspectionDetails from './sections/lab-testing/LabTestingInspectionDetails';
import PendingReviewInspectionDetails from './sections/pending-review/PendingReviewInspectionDetails';
import RejectedInspectionDetails from './sections/rejected/RejectedInspectionDetails';
import SubmittedInspectionDetails from './sections/submitted/SubmittedInspectionDetails';

export default function InspectionDetailsPage() {
  const { inspectionId } = useParams<{ inspectionId: string }>();
  const navigate = useNavigate();
  const { data, state, retry } = useInspectionDetailsData(inspectionId ?? '');

  useEffect(() => {
    if (!inspectionId) navigate(ROUTES.inspectionReview, { replace: true });
  }, [inspectionId, navigate]);

  if (!inspectionId) return null;

  const isLoading = state === States.LOADING || state === States.PRELOADING;

  const isTerminal = data?.status === 'approved' || data?.status === 'rejected';
  const pageTitle = isTerminal ? 'Inspection Summary' : 'Inspection Review';
  const pageSubtitle =
    data?.status === 'approved'
      ? 'View approved inspection details'
      : data?.status === 'rejected'
        ? 'View rejected inspection details'
        : 'Review and approve/reject inspection';

  const statusComponent: Record<string, React.ReactNode> = data
    ? {
        submitted: <SubmittedInspectionDetails data={data} onRefetch={retry} />,
        lab_pending: (
          <LabTestingInspectionDetails data={data} onRefetch={retry} />
        ),
        in_review: (
          <PendingReviewInspectionDetails data={data} onRefetch={retry} />
        ),
        approved: <ApprovedInspectionDetails data={data} />,
        rejected: <RejectedInspectionDetails data={data} />,
      }
    : {};

  return (
    <AppShell breadcrumbs={['Home', 'Inspection Review', 'Details']}>
      <div className="flex flex-col px-7 pt-7 pb-6">
        <Button
          variant="ghost"
          // Go back to the previous entry so the list's active tab (kept in the
          // URL as ?tab=...) is preserved instead of resetting to the default.
          onClick={() => navigate(-1)}
          className="mb-4 w-fit -ml-2.5 text-teal-800 hover:text-teal-900"
        >
          ← Back to Inspection Review
        </Button>
        <PageHeader
          title={pageTitle}
          subtitle={pageSubtitle}
          actions={
            data ? (
              <InspectionStatusPill
                status={data.status}
                inspectionRef={data.inspection_ref}
              />
            ) : null
          }
        />

        <div>
          {isLoading ? (
            <InspectionDetailsSkeleton />
          ) : (
            data?.status && statusComponent[data.status]
          )}
        </div>
      </div>
    </AppShell>
  );
}
