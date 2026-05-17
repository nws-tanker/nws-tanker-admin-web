import SkeletonBlock from '@/pages/inspection-details/components/SkeletonBlock';

export default function MonthlyInspectionTrendSkeleton() {
  return (
    <div className="rounded-card-lg border border-ink-200 bg-white p-5">
      <SkeletonBlock className="mb-4 h-5 w-48" />
      <SkeletonBlock className="h-64 w-full" />
      <div className="mt-4 flex gap-6">
        <SkeletonBlock className="h-4 w-24" />
        <SkeletonBlock className="h-4 w-24" />
        <SkeletonBlock className="h-4 w-24" />
      </div>
    </div>
  );
}
