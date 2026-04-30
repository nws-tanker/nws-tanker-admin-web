import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { DownIcon } from './icons';
import type { SelectOption } from './option';
import { panelPositionStyle, usePanelPosition } from './usePanelPosition';
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
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const panelPos = usePanelPosition(open, triggerRef);

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

  const panel =
    open && panelPos
      ? createPortal(
          <div
            ref={panelRef}
            role="listbox"
            aria-multiselectable="true"
            style={panelPositionStyle(panelPos)}
            className="z-[500] overflow-y-auto rounded-card border border-ink-200 bg-white p-1.5 shadow-dropdown"
          >
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
          </div>,
          document.body,
        )
      : null;

  return (
    <div className="relative" style={{ minWidth }}>
      <button
        ref={triggerRef}
        type="button"
        disabled={disabled}
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
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
      {panel}
    </div>
  );
}
