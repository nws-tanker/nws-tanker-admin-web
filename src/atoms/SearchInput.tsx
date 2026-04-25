import { CloseIcon, SearchIcon } from './icons';
import { cn } from '@/utils';

type Props = {
  value: string;
  onChange: (next: string) => void;
  placeholder?: string;
  className?: string;
};

export function SearchInput({
  value,
  onChange,
  placeholder,
  className,
}: Props) {
  return (
    <div
      className={cn(
        'flex min-w-[220px] items-center gap-2 rounded-card border border-ink-300 bg-ink-50 px-3 py-2',
        className,
      )}
    >
      <SearchIcon className="text-ink-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="min-w-0 flex-1 border-none bg-transparent text-[13px] text-ink-900 outline-none placeholder:text-ink-400"
      />
      {value ? (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="Clear search"
          className="grid h-5 w-5 place-items-center text-ink-400 hover:text-ink-700"
        >
          <CloseIcon className="h-3 w-3" />
        </button>
      ) : null}
    </div>
  );
}
