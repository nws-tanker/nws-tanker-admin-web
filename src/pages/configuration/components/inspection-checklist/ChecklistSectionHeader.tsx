import { Button } from '@/atoms';

type Props = {
  color: string;
  displayIndex: string;
  name: string;
  itemsSummaryCaption: string;
  onAddDraft: () => void;
};

export default function ChecklistSectionHeader({
  color,
  displayIndex,
  name,
  itemsSummaryCaption,
  onAddDraft,
}: Props) {
  return (
    <div className="flex items-center justify-between px-5 py-4 border-b border-ink-100">
      <div className="flex items-center gap-3">
        <span
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md font-mono text-[12px] font-bold"
          style={{ background: `${color}18`, color }}
        >
          {displayIndex}
        </span>
        <div>
          <h3 className="text-[14px] font-semibold text-ink-900 leading-tight">
            {name}
          </h3>
          <p className="text-[11px] text-ink-400 mt-0.5">
            {itemsSummaryCaption}
          </p>
        </div>
      </div>
      <Button variant="ghost" size="sm" onClick={onAddDraft}>
        + Add item
      </Button>
    </div>
  );
}
