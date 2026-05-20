import SkeletonBlock from '@/pages/inspection-details/components/SkeletonBlock';

function KpiCardSkeleton() {
  return (
    <div className="rounded-xl border border-ink-200 bg-white px-4 py-4 shadow-sm">
      <SkeletonBlock className="h-4 w-20" />
      <SkeletonBlock className="mt-1.5 h-9 w-16" />
      <SkeletonBlock className="mt-1 h-4 w-28" />
    </div>
  );
}

export default function FleetKpiStripSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {Array.from({ length: 5 }).map((_, i) => (
        <KpiCardSkeleton key={i} />
      ))}
    </div>
  );
}
