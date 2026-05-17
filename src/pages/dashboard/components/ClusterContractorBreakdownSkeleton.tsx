import SkeletonBlock from '@/pages/inspection-details/components/SkeletonBlock';

export default function ClusterContractorBreakdownSkeleton() {
  return (
    <div className="rounded-card-lg border border-ink-200 bg-white">
      {/* header row */}
      <div className="flex gap-4 border-b border-ink-200 px-5 py-3">
        {Array.from({ length: 12 }).map((_, i) => (
          <SkeletonBlock key={i} className="h-3 flex-1" />
        ))}
      </div>
      {/* 3 data rows + totals row */}
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="flex gap-4 border-b border-ink-100 px-5 py-4 last:border-b-0"
        >
          {Array.from({ length: 12 }).map((_, j) => (
            <SkeletonBlock key={j} className="h-4 flex-1" />
          ))}
        </div>
      ))}
    </div>
  );
}
