import { useEffect, useRef, useState } from 'react';
import { DownIcon } from './icons';
import type { SelectOption } from './option';
import { cn } from '@/utils';

type Props<V extends string = string> = {
  placeholder: string;
  options: SelectOption<V>[];
  value: V[];
  onChange: (next: V[]) => void;
  minWidth?: number;
  disabled?: boolean;
};

export function MultiSelect<V extends string = string>({
  placeholder,
  options,
  value,
  onChange,
  minWidth = 140,
  disabled,
}: Props<V>) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  const selectedCount = value.length;
  const anySelected = selectedCount > 0;
  const selectedLabel =
    selectedCount === 1
      ? (options.find((o) => o.value === value[0])?.label ?? value[0])
      : null;

  const triggerLabel = !anySelected
    ? placeholder
    : selectedCount === 1
      ? selectedLabel
      : `${selectedCount} selected`;

  const toggle = (optionValue: V) => {
    onChange(
      value.includes(optionValue)
        ? value.filter((v) => v !== optionValue)
        : [...value, optionValue],
    );
  };

  return (
    <div ref={wrapperRef} className="relative" style={{ minWidth }}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center gap-1.5 rounded-card border border-ink-200 bg-white px-3 py-[7px] text-left text-[13px] hover:border-ink-300 disabled:cursor-not-allowed disabled:bg-ink-50"
      >
        <span
          className={cn(
            'flex-1 truncate',
            anySelected ? 'font-medium text-ink-900' : 'text-ink-500',
          )}
        >
          {triggerLabel}
        </span>
        <DownIcon className="h-3 w-3 shrink-0 text-ink-400" />
      </button>
      {open ? (
        <div className="absolute left-0 top-[calc(100%+4px)] z-50 min-w-[200px] rounded-card border border-ink-200 bg-white p-1.5 shadow-dropdown">
          {options.length === 0 ? (
            <div className="px-2 py-3 text-center text-[12px] text-ink-400">
              No options
            </div>
          ) : (
            options.map((opt) => (
              <label
                key={opt.value}
                className="flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-[13px] text-ink-800 hover:bg-ink-50"
              >
                <input
                  type="checkbox"
                  checked={value.includes(opt.value)}
                  disabled={opt.disabled}
                  onChange={() => toggle(opt.value)}
                  className="accent-teal-600"
                />
                {opt.label}
              </label>
            ))
          )}
        </div>
      ) : null}
    </div>
  );
}
