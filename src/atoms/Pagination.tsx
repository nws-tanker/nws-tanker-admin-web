import { Button } from '@/atoms';
import { LeftIcon, RightIcon } from '@/atoms/icons';
import { cn } from '@/utils';

type Props = {
  page: number;
  totalPages: number;
  onChange: (next: number) => void;
};

function compactPages(page: number, totalPages: number): (number | '…')[] {
  const all = Array.from({ length: totalPages }, (_, i) => i + 1);
  const visible = all.filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1,
  );
  const result: (number | '…')[] = [];
  visible.forEach((p, idx) => {
    if (idx > 0 && p - (visible[idx - 1] as number) > 1) result.push('…');
    result.push(p);
  });
  return result;
}

export function Pagination({ page, totalPages, onChange }: Props) {
  const go = (next: number) => {
    if (next < 1 || next > totalPages || next === page) return;
    onChange(next);
  };

  return (
    <div className="flex items-center gap-1">
      <Button
        variant="ghost"
        size="sm"
        disabled={page <= 1}
        onClick={() => go(page - 1)}
        leftIcon={<LeftIcon className="h-3 w-3" />}
      >
        Prev
      </Button>
      {compactPages(page, totalPages).map((p, idx) =>
        p === '…' ? (
          <span key={`e-${idx}`} className="px-1.5 text-ink-400">
            …
          </span>
        ) : (
          <Button
            key={p}
            size="sm"
            variant={p === page ? 'primary' : 'ghost'}
            onClick={() => go(p)}
            className={cn('min-w-[32px] justify-center')}
          >
            {p}
          </Button>
        ),
      )}
      <Button
        variant="ghost"
        size="sm"
        disabled={page >= totalPages}
        onClick={() => go(page + 1)}
        rightIcon={<RightIcon className="h-3 w-3" />}
      >
        Next
      </Button>
    </div>
  );
}
