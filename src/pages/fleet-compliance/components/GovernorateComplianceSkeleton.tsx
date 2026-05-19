import SkeletonBlock from '@/pages/inspection-details/components/SkeletonBlock';

export default function GovernorateComplianceSkeleton() {
  return (
    <div className="rounded-card-lg border border-ink-200 bg-white shadow-card-sm">
      <div className="border-b border-ink-100 px-5 py-4">
        <SkeletonBlock className="h-4 w-52 rounded" />
      </div>
      {/* thead row */}
      <div className="flex gap-3 border-b border-ink-100 bg-ink-50 px-5 py-3">
        <div className="flex-[4]">
          <SkeletonBlock className="h-3 rounded" />
        </div>
        <div className="flex-[2]">
          <SkeletonBlock className="h-3 rounded" />
        </div>
        <div className="flex-[2]">
          <SkeletonBlock className="h-3 rounded" />
        </div>
        <div className="flex-[2]">
          <SkeletonBlock className="h-3 rounded" />
        </div>
        <div className="flex-[2]">
          <SkeletonBlock className="h-3 rounded" />
        </div>
        <div className="flex-[4]">
          <SkeletonBlock className="h-3 rounded" />
        </div>
      </div>
      {/* 11 data rows */}
      <div className="divide-y divide-ink-50">
        {Array.from({ length: 11 }).map((_, i) => (
          <div key={i} className="flex gap-3 px-5 py-3">
            <div className="flex-[4]">
              <SkeletonBlock className="h-4 rounded" />
            </div>
            <div className="flex-[2]">
              <SkeletonBlock className="h-4 rounded" />
            </div>
            <div className="flex-[2]">
              <SkeletonBlock className="h-4 rounded" />
            </div>
            <div className="flex-[2]">
              <SkeletonBlock className="h-4 rounded" />
            </div>
            <div className="flex-[2]">
              <SkeletonBlock className="h-4 rounded" />
            </div>
            <div className="flex-[4]">
              <SkeletonBlock className="h-4 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
