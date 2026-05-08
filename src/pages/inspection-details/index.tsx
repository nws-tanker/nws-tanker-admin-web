import React, { useEffect } from 'react';
import { PageHeader } from '@/atoms';
import { AppShell } from '@/common-components/AppShell';
import { ROUTES } from '@/constants/routes';
import { States } from '@/store/types';
import { useNavigate, useParams } from 'react-router-dom';
import { useInspectionDetailsData } from './hooks/useInspectionData';
import ApprovedInspectionDetails from './sections/approved/ApprovedInspectionDetails';
import LabTestingInspectionDetails from './sections/lab-testing/LabTestingInspectionDetails';
import PendingReviewInspectionDetails from './sections/pending-review/PendingReviewInspectionDetails';
import RejectedInspectionDetails from './sections/rejected/RejectedInspectionDetails';

function SkeletonBlock({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-card bg-ink-100 ${className ?? ''}`}
    />
  );
}

function InspectionDetailsSkeleton() {
  return (
    <div className="grid grid-cols-[1fr_300px] gap-6 items-start">
      <div className="flex flex-col gap-4">
        {/* Traceability chain */}
        <div className="rounded-card border border-ink-200 p-4 shadow-card-sm">
          <SkeletonBlock className="mb-3 h-4 w-40" />
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((i) => (
              <SkeletonBlock key={i} className="h-7 w-24 rounded-full" />
            ))}
          </div>
        </div>

        {/* Tanker info */}
        <div className="rounded-card border border-ink-200 shadow-card-sm overflow-hidden">
          <div className="border-b border-ink-100 px-5 py-3.5">
            <SkeletonBlock className="h-4 w-36" />
          </div>
          <div className="grid grid-cols-3 gap-4 p-5">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex flex-col gap-1.5">
                <SkeletonBlock className="h-3 w-20" />
                <SkeletonBlock className="h-4 w-28" />
              </div>
            ))}
          </div>
        </div>

        {/* KPI tiles */}
        <div className="grid grid-cols-3 gap-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-card border border-ink-200 shadow-card-sm p-4"
            >
              <SkeletonBlock className="mb-2 h-3 w-24" />
              <SkeletonBlock className="h-6 w-16" />
            </div>
          ))}
        </div>

        {/* Lab report card */}
        <div className="rounded-card border border-ink-200 shadow-card-sm overflow-hidden">
          <div className="border-b border-ink-100 px-5 py-3.5">
            <SkeletonBlock className="h-4 w-32" />
          </div>
          <div className="p-5">
            <SkeletonBlock className="h-28 w-full rounded-card-lg" />
          </div>
        </div>

        {/* Checklist */}
        <div className="rounded-card border border-ink-200 shadow-card-sm overflow-hidden">
          <div className="border-b border-ink-100 px-5 py-3.5">
            <SkeletonBlock className="h-4 w-44" />
          </div>
          <div className="flex flex-col gap-2 p-5">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between py-1">
                <SkeletonBlock className="h-3 w-56" />
                <SkeletonBlock className="h-5 w-12 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="sticky top-6 flex flex-col gap-3">
        <div className="rounded-card border border-ink-200 shadow-card-sm overflow-hidden">
          <div className="bg-ink-50 border-b border-ink-100 px-4 py-2.5">
            <SkeletonBlock className="h-3 w-16" />
          </div>
          <div className="flex flex-col gap-2 p-3.5">
            <SkeletonBlock className="h-[46px] w-full rounded-card" />
            <SkeletonBlock className="h-10 w-full rounded-card" />
            <SkeletonBlock className="h-10 w-full rounded-card" />
          </div>
        </div>
        <div className="rounded-card border border-ink-200 shadow-card-sm p-4">
          <SkeletonBlock className="mb-3 h-3 w-28" />
          {[1, 2, 3].map((i) => (
            <SkeletonBlock key={i} className="mb-2 h-3 w-full" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function InspectionDetailsPage() {
  const { inspectionId } = useParams<{ inspectionId: string }>();
  const navigate = useNavigate();
  const { data, state, retry } = useInspectionDetailsData(inspectionId ?? '');

  useEffect(() => {
    if (!inspectionId) navigate(ROUTES.inspectionReview, { replace: true });
  }, [inspectionId, navigate]);

  if (!inspectionId) return null;

  const isLoading = state === States.LOADING || state === States.PRELOADING;

  const statusComponent: Record<string, React.ReactNode> = data
    ? {
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
