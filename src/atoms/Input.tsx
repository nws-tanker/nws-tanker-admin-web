import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/utils';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  invalid?: boolean;
  tone?: 'default' | 'accent';
  leftSlot?: ReactNode;
  rightSlot?: ReactNode;
};

export const Input = forwardRef<HTMLInputElement, Props>(function Input(
  { className, invalid, tone = 'default', leftSlot, rightSlot, ...rest },
  ref,
) {
  const borderClass = invalid
    ? 'border-red-400 focus-within:border-red-400 focus-within:ring-red-100'
    : tone === 'accent'
      ? 'border-teal-600 focus-within:border-teal-600 focus-within:ring-teal-50'
      : 'border-gray-300 focus-within:border-teal-600 focus-within:ring-teal-50';

  if (leftSlot || rightSlot) {
    return (
      <div
        className={cn(
          'flex items-center overflow-hidden rounded-[8px] border bg-white transition-colors focus-within:ring-[3px]',
          borderClass,
        )}
      >
        {leftSlot && (
          <span className="flex shrink-0 items-center border-r border-ink-200 px-2.5 text-[13px] text-ink-500">
            {leftSlot}
          </span>
        )}
        <input
          ref={ref}
          {...rest}
          className={cn(
            'min-w-0 flex-1 border-0 bg-transparent px-3 py-[9px] text-[13px] text-ink-900 placeholder-gray-400 outline-none disabled:opacity-50 disabled:cursor-not-allowed',
            className,
          )}
        />
        {rightSlot && (
          <span className="flex shrink-0 items-center px-3 text-[12px] text-ink-500">
            {rightSlot}
          </span>
        )}
      </div>
    );
  }

  const plainBorderClass = invalid
    ? 'border-red-400 focus:border-red-400 focus:ring-red-100'
    : tone === 'accent'
      ? 'border-teal-600 focus:border-teal-600 focus:ring-teal-50'
      : 'border-gray-300 focus:border-teal-600 focus:ring-teal-50';

  return (
    <input
      ref={ref}
      {...rest}
      className={cn(
        'w-full border rounded-[8px] px-3 py-[10px] text-sm placeholder-gray-400 focus:outline-none focus:ring-[3px] transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-white',
        plainBorderClass,
        className,
      )}
    />
  );
});
