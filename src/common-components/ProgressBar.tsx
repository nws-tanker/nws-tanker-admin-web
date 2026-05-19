type Color = 'green' | 'amber' | 'red' | 'blue' | 'teal';
type Height = 'xs' | 'sm' | 'md' | 'lg';

type Props = {
  value: number; // 0–100
  color?: Color;
  height?: Height;
  className?: string; // applied to the track
};

const COLOR_CLASS: Record<Color, string> = {
  green: 'bg-green-500',
  amber: 'bg-amber-400',
  red: 'bg-red-500',
  blue: 'bg-blue-500',
  teal: 'bg-teal-600',
};

const HEIGHT_CLASS: Record<Height, string> = {
  xs: 'h-px',
  sm: 'h-1.5',
  md: 'h-2',
  lg: 'h-3',
};

export function ProgressBar({
  value,
  color = 'green',
  height = 'sm',
  className = '',
}: Props) {
  const pct = Math.min(100, Math.max(0, value));
  return (
    <div
      className={`w-full overflow-hidden rounded-full bg-ink-100 ${HEIGHT_CLASS[height]} ${className}`}
    >
      <div
        className={`h-full rounded-full transition-all ${COLOR_CLASS[color]}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
