import SkeletonBlock from '@/pages/inspection-details/components/SkeletonBlock';

export default function InspectorPerformanceSkeleton() {
  return (
    <div className="rounded-card-lg border border-ink-200 bg-white shadow-card-sm">
      <div className="border-b border-ink-100 px-5 py-4">
        <SkeletonBlock className="h-4 w-64 rounded" />
      </div>
      {/* thead row */}
      <div className="flex gap-3 border-b border-ink-100 bg-ink-50 px-5 py-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonBlock key={i} className="h-3 flex-1 rounded" />
        ))}
      </div>
      {/* 6 data rows */}
      <div className="divide-y divide-ink-50">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex gap-3 px-5 py-3">
            {Array.from({ length: 6 }).map((_, j) => (
              <SkeletonBlock key={j} className="h-4 flex-1 rounded" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
