import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/utils';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  invalid?: boolean;
  rightSlot?: ReactNode;
};

export const Input = forwardRef<HTMLInputElement, Props>(function Input(
  { className, invalid, rightSlot, ...rest },
  ref,
) {
  return (
    <div className="relative">
      <input
        ref={ref}
        {...rest}
        className={cn(
          'w-full border rounded-[8px] px-3 py-[10px] text-sm placeholder-gray-400 focus:outline-none focus:ring-[3px] transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
          invalid
            ? 'border-red-400 focus:border-red-400 focus:ring-red-100'
            : 'border-gray-300 focus:border-teal-600 focus:ring-teal-50',
          !!rightSlot && 'pr-10',
          className,
        )}
      />
      {rightSlot && (
        <div className="absolute right-2.5 top-1/2 -translate-y-1/2">
          {rightSlot}
        </div>
      )}
    </div>
  );
});
