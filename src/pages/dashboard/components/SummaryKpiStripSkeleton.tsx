import SkeletonBlock from '@/pages/inspection-details/components/SkeletonBlock';

export default function SummaryKpiStripSkeleton() {
  return (
    <div className="grid grid-cols-3 gap-4 lg:grid-cols-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <SkeletonBlock key={i} className="h-28 rounded-card-lg" />
      ))}
    </div>
  );
}
