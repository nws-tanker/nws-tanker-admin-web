type Props = { className?: string };

export default function SkeletonBlock({ className }: Props) {
  return (
    <div
      className={`animate-pulse rounded-card bg-ink-100 ${className ?? ''}`}
    />
  );
}
