import SkeletonBlock from './SkeletonBlock';

export default function OperationsKpiGridSkeleton() {
  return (
    <div className="mb-5 grid grid-cols-4 gap-3.5">
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className="rounded-card-lg border border-ink-200 bg-white p-4 shadow-card-sm"
        >
          <SkeletonBlock className="mb-3 h-3 w-24" />
          <SkeletonBlock className="mb-2 h-7 w-20" />
          <SkeletonBlock className="h-3 w-28" />
        </div>
      ))}
    </div>
  );
}
