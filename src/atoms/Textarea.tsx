import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { cn } from '@/utils';

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  invalid?: boolean;
};

export const Textarea = forwardRef<HTMLTextAreaElement, Props>(
  function Textarea({ className, invalid, ...rest }, ref) {
    return (
      <textarea
        ref={ref}
        {...rest}
        className={cn(
          'w-full rounded-card border px-3 py-2.5 text-[13px] text-ink-900 outline-none bg-white placeholder:text-ink-400 resize-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600/20',
          invalid ? 'border-red-500' : 'border-ink-300',
          className,
        )}
      />
    );
  },
);
