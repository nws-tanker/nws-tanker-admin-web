import SkeletonBlock from '@/pages/inspection-details/components/SkeletonBlock';

export function ReportCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-card-lg border border-ink-200 bg-white shadow-card-sm">
      <div className="flex items-center justify-between gap-3 border-b border-ink-100 px-5 py-3">
        <SkeletonBlock className="h-4 w-48" />
        <div className="flex items-center gap-2">
          <SkeletonBlock className="h-7 w-28" />
          <SkeletonBlock className="h-7 w-24" />
        </div>
      </div>

      <div className="px-5 py-4">
        <div className="grid grid-cols-6 gap-4 border-b border-ink-100 pb-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonBlock key={i} className="h-3 w-full" />
          ))}
        </div>
        {Array.from({ length: 6 }).map((_, row) => (
          <div
            key={row}
            className="grid grid-cols-6 gap-4 border-b border-ink-100 py-3 last:border-0"
          >
            {Array.from({ length: 6 }).map((_, col) => (
              <SkeletonBlock key={col} className="h-4 w-full" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
