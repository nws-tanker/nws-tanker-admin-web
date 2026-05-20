import SkeletonBlock from './SkeletonBlock';

type Props = {
  title: string;
  columns: number;
  rows?: number;
};

export default function TableCardSkeleton({ title, columns, rows = 6 }: Props) {
  return (
    <div className="flex flex-col overflow-hidden rounded-card-lg border border-ink-200 bg-white shadow-card-sm">
      <div className="flex items-center justify-between gap-3 border-b border-ink-100 px-5 py-3">
        <h3 className="text-[13px] font-semibold text-ink-800">{title}</h3>
        <SkeletonBlock className="h-5 w-20" />
      </div>
      <div className="p-5">
        <div className="space-y-3">
          {Array.from({ length: rows }).map((_, r) => (
            <div key={r} className="flex items-center gap-4">
              {Array.from({ length: columns }).map((_, c) => (
                <SkeletonBlock key={c} className="h-4 flex-1" />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
