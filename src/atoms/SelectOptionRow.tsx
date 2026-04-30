import type { ReactNode } from 'react';
import { cn } from '@/utils';

type Props = {
  label: ReactNode;
  selected: boolean;
  disabled?: boolean;
  muted?: boolean;
  onClick: () => void;
};

/**
 * Single row inside the Select atom's dropdown panel. `muted` is used for
 * the placeholder ("— None —") row so it reads as "deselect" rather than a
 * real choice.
 */
export function SelectOptionRow({
  label,
  selected,
  disabled,
  muted,
  onClick,
}: Props) {
  return (
    <button
      type="button"
      role="option"
      aria-selected={selected}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'flex w-full items-center rounded-sm px-2 py-1.5 text-left text-[13px] transition-colors',
        selected
          ? 'bg-teal-50 font-medium text-teal-900'
          : muted
            ? 'text-ink-500 hover:bg-ink-50'
            : 'text-ink-800 hover:bg-ink-50',
        disabled && 'cursor-not-allowed opacity-40',
      )}
    >
      {label}
    </button>
  );
}
