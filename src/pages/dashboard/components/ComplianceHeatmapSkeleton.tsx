import SkeletonBlock from '@/pages/inspection-details/components/SkeletonBlock';

const COLS = 12; // governorates + AVG
const ROWS = 4; // DW, SW, TE + Avg row

export default function ComplianceHeatmapSkeleton() {
  return (
    <div className="rounded-card-lg border border-ink-200 bg-white p-5">
      <SkeletonBlock className="mb-5 h-5 w-64" />
      <div
        className="grid gap-x-1.5 gap-y-2 overflow-x-auto"
        style={{
          gridTemplateColumns: `64px repeat(${COLS}, minmax(72px, 1fr))`,
        }}
      >
        {Array.from({ length: (ROWS + 1) * (COLS + 1) }).map((_, i) => (
          <SkeletonBlock key={i} className="h-10 rounded-card-sm" />
        ))}
      </div>
    </div>
  );
}
