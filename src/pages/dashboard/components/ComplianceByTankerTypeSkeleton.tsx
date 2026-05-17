import SkeletonBlock from '@/pages/inspection-details/components/SkeletonBlock';

export default function ComplianceByTankerTypeSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <SkeletonBlock key={i} className="h-56 rounded-card-lg" />
      ))}
    </div>
  );
}
