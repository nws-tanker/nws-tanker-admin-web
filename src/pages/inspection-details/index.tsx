import React, { useEffect } from 'react';
import { PageHeader } from '@/atoms';
import { AppShell } from '@/common-components/AppShell';
import { ROUTES } from '@/constants/routes';
import { useNavigate, useParams } from 'react-router-dom';
import { useInspectionDetailsData } from './hooks/useInspectionData';
import ApprovedInspectionDetails from './sections/ApprovedInspectionDetails';
import LabTestingInspectionDetails from './sections/LabTestingInspectionDetails';
import PendingInspectionDetails from './sections/PendingInspectionDetails';
import PendingReviewInspectionDetails from './sections/PendingReviewInspectionDetails';
import RejectedInspectionDetails from './sections/RejectedInspectionDetails';

export default function InspectionDetailsPage() {
  const { inspectionId } = useParams<{ inspectionId: string }>();
  const navigate = useNavigate();
  const { data } = useInspectionDetailsData(inspectionId ?? '');

  useEffect(() => {
    if (!inspectionId) navigate(ROUTES.inspectionReview, { replace: true });
  }, [inspectionId, navigate]);

  if (!inspectionId) return null;

  const statusComponent: Record<string, React.ReactNode> = data
    ? {
        lab_pending: <LabTestingInspectionDetails data={data} />,
        in_review: <PendingReviewInspectionDetails data={data} />,
        pending: <PendingInspectionDetails data={data} />,
        approved: <ApprovedInspectionDetails data={data} />,
        rejected: <RejectedInspectionDetails data={data} />,
      }
    : {};

  return (
    <AppShell breadcrumbs={['Home', 'Inspection Review', 'Details']}>
      <div className="flex flex-col px-7 pt-7 pb-6">
        <button
          onClick={() => navigate(ROUTES.inspectionReview)}
          className="mb-4 flex w-fit items-center gap-1 text-[13px] text-ink-500 hover:text-ink-900"
        >
          ← Back to Inspection Review
        </button>
        <PageHeader
          title="Inspection Review"
          subtitle="Review and approve/reject inspection"
        />

        <div>{data?.status && statusComponent[data.status]}</div>
      </div>
    </AppShell>
  );
}
