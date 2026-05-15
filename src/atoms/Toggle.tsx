import { cn } from '@/utils';

type Props = {
  checked: boolean;
  onChange: (next: boolean) => void;
  disabled?: boolean;
  'aria-label'?: string;
  className?: string;
};

export function Toggle({
  checked,
  onChange,
  disabled = false,
  'aria-label': ariaLabel,
  className,
}: Props) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={cn(
        'inline-flex h-[22px] w-[40px] shrink-0 items-center rounded-full px-0.5 transition-colors',
        checked ? 'bg-teal-700' : 'bg-ink-300',
        disabled && 'cursor-not-allowed opacity-50',
        className,
      )}
    >
      <span
        className={cn(
          'h-[18px] w-[18px] rounded-full bg-white shadow-sm transition-transform',
          checked ? 'translate-x-[18px]' : 'translate-x-0',
        )}
      />
    </button>
  );
}
