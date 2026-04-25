import { cn } from '@/utils';

type Tone = 'default' | 'alert';

type Props = {
  value: number | string;
  tone?: Tone;
  className?: string;
};

const TONE_CLASS: Record<Tone, string> = {
  default: 'bg-white/15 text-white',
  alert: 'bg-red-500 text-white',
};

export function CountBadge({ value, tone = 'default', className }: Props) {
  return (
    <span
      className={cn(
        'rounded-full px-1.5 py-px font-mono text-[10px] leading-[1.4]',
        TONE_CLASS[tone],
        className,
      )}
    >
      {value}
    </span>
  );
}
