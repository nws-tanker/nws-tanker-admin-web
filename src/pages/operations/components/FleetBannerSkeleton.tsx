import SkeletonBlock from './SkeletonBlock';

export default function FleetBannerSkeleton() {
  return (
    <div
      className="relative mb-5 overflow-hidden rounded-card-lg px-6 py-5"
      style={{
        background:
          'linear-gradient(135deg, #02474E 0%, #0A5E66 60%, #117680 100%)',
      }}
    >
      <div className="relative flex flex-wrap items-center justify-between gap-6">
        <div className="flex items-center gap-12">
          <div>
            <SkeletonBlock className="mb-2 h-3 w-20 !bg-white/15" />
            <SkeletonBlock className="h-8 w-32 !bg-white/15" />
          </div>
          <div className="h-12 w-px bg-white/15" />
          <div className="flex gap-9">
            {[0, 1, 2].map((i) => (
              <div key={i}>
                <SkeletonBlock className="mb-2 h-3 w-24 !bg-white/15" />
                <SkeletonBlock className="h-6 w-16 !bg-white/15" />
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-5">
          {[0, 1, 2].map((i) => (
            <div key={i}>
              <SkeletonBlock className="mb-2 h-3 w-16 !bg-white/15" />
              <SkeletonBlock className="h-6 w-12 !bg-white/15" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
