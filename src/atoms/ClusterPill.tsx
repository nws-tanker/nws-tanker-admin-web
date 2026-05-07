import { cn } from '@/utils';

type Props = {
  label: string;
  color: string;
  active: boolean;
  onClick?: () => void;
};

export function ClusterPill({ label, color, active, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-[5px] text-[12px] font-semibold tracking-tight transition-all',
        active ? 'shadow-card-sm' : 'bg-white hover:bg-ink-50',
      )}
      style={
        active
          ? { backgroundColor: color, borderColor: color, color: 'white' }
          : { color, borderColor: `${color}55` }
      }
    >
      <span
        className="h-[7px] w-[7px] shrink-0 rounded-full"
        style={{ backgroundColor: active ? 'white' : color }}
      />
      {label}
    </button>
  );
}
