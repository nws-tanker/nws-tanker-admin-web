import SkeletonBlock from '@/pages/inspection-details/components/SkeletonBlock';

const COLS = 12; // governorates + AVG
const ROWS = 4; // DW, SW, TE + Avg

export default function ComplianceHeatmapSkeleton() {
  return (
    <div className="rounded-card-lg border border-ink-200 bg-white p-5">
      <SkeletonBlock className="mb-4 h-5 w-64" />
      <div
        className="grid gap-1.5"
        style={{ gridTemplateColumns: `120px repeat(${COLS}, 1fr)` }}
      >
        {Array.from({ length: (ROWS + 1) * (COLS + 1) }).map((_, i) => (
          <SkeletonBlock key={i} className="h-9 rounded-card-sm" />
        ))}
      </div>
    </div>
  );
}
