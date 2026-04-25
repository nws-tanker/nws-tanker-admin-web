import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import { DownIcon } from './icons';
import type { SelectOption } from './option';
import { cn } from '@/utils';

type Props<V extends string = string> = {
  options: SelectOption<V>[];
  value: V | '';
  onChange: (next: V | '') => void;
  placeholder?: string;
  invalid?: boolean;
  disabled?: boolean;
  className?: string;
  minWidth?: number;
  'aria-label'?: string;
};

type PanelPos = { top: number; left: number; width: number };

export function Select<V extends string = string>({
  options,
  value,
  onChange,
  placeholder,
  invalid,
  disabled,
  className,
  minWidth,
  'aria-label': ariaLabel,
}: Props<V>) {
  const [open, setOpen] = useState(false);
  const [panelPos, setPanelPos] = useState<PanelPos | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Position the panel relative to the viewport while open. `scroll` with
  // capture=true catches nested scrolls (e.g. modal body) so the panel stays
  // pinned to the trigger even when the user scrolls inside an ancestor.
  useLayoutEffect(() => {
    if (!open || !triggerRef.current) return;
    const updatePos = () => {
      const rect = triggerRef.current!.getBoundingClientRect();
      setPanelPos({
        top: rect.bottom + 4,
        left: rect.left,
        width: rect.width,
      });
    };
    updatePos();
    window.addEventListener('resize', updatePos);
    window.addEventListener('scroll', updatePos, true);
    return () => {
      window.removeEventListener('resize', updatePos);
      window.removeEventListener('scroll', updatePos, true);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        triggerRef.current?.contains(target) ||
        panelRef.current?.contains(target)
      )
        return;
      setOpen(false);
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, [open]);

  const selected = options.find((o) => o.value === value) ?? null;
  const hasValue = selected !== null;
  const triggerLabel = selected?.label ?? placeholder ?? '';

  const pick = (next: V | '') => {
    onChange(next);
    setOpen(false);
  };

  const panel =
    open && panelPos
      ? createPortal(
          <div
            ref={panelRef}
            role="listbox"
            style={{
              position: 'fixed',
              top: panelPos.top,
              left: panelPos.left,
              width: panelPos.width,
            }}
            className="z-[500] max-h-[260px] overflow-y-auto rounded-card border border-ink-200 bg-white p-1.5 shadow-dropdown"
          >
            {placeholder !== undefined ? (
              <Option
                label={placeholder}
                selected={!hasValue}
                muted
                onClick={() => pick('')}
              />
            ) : null}
            {options.map((opt) => (
              <Option
                key={opt.value}
                label={opt.label}
                selected={opt.value === value}
                disabled={opt.disabled}
                onClick={() => pick(opt.value)}
              />
            ))}
            {options.length === 0 ? (
              <div className="px-2 py-3 text-center text-[12px] text-ink-400">
                No options
              </div>
            ) : null}
          </div>,
          document.body,
        )
      : null;

  return (
    <div
      className={cn('relative', className)}
      style={minWidth ? { minWidth } : undefined}
    >
      <button
        ref={triggerRef}
        type="button"
        disabled={disabled}
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel}
        className={cn(
          'flex h-[38px] w-full items-center gap-1.5 rounded-card border bg-white px-3 text-left text-[13px] hover:border-ink-400 focus:border-teal-600 focus:outline-none focus:ring-1 focus:ring-teal-600/20 disabled:cursor-not-allowed disabled:bg-ink-50',
          invalid ? 'border-red-500' : 'border-ink-300',
        )}
      >
        <span
          className={cn(
            'flex-1 truncate',
            hasValue ? 'text-ink-900' : 'text-ink-400',
          )}
        >
          {triggerLabel}
        </span>
        <DownIcon className="h-3 w-3 shrink-0 text-ink-400" />
      </button>
      {panel}
    </div>
  );
}

type OptionProps = {
  label: ReactNode;
  selected: boolean;
  disabled?: boolean;
  muted?: boolean;
  onClick: () => void;
};

function Option({ label, selected, disabled, muted, onClick }: OptionProps) {
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
