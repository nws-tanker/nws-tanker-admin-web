import SkeletonBlock from '@/pages/inspection-details/components/SkeletonBlock';

export default function FleetTankerTypeComplianceSkeleton() {
  return (
    <div className="rounded-card-lg border border-ink-200 bg-white shadow-card-sm">
      <div className="border-b border-ink-100 px-5 py-4">
        <SkeletonBlock className="h-4 w-48 rounded" />
      </div>
      <div className="grid grid-cols-1 gap-4 p-5 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <SkeletonBlock key={i} className="h-[104px] rounded" />
        ))}
      </div>
    </div>
  );
}
