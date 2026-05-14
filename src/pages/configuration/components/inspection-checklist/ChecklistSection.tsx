import { useRef, useState } from 'react';
import { Button, Chip } from '@/atoms';
import type {
  ChecklistCategoryResponse,
  ChecklistEvidenceType,
  ChecklistSeverity,
  NewChecklistItemData,
} from '@/types/configuration';
import { ChecklistItemRow } from './ChecklistItemRow';
import { ChecklistNewItemRow } from './ChecklistNewItemRow';

const CATEGORY_COLORS = [
  '#1A8F9A',
  '#2563EB',
  '#7C3AED',
  '#D97706',
  '#059669',
  '#DC2626',
];

const TANKER_TYPES = [
  { code: 'DW' as const, tone: 'blue' as const },
  { code: 'SW' as const, tone: 'amber' as const },
  { code: 'TE' as const, tone: 'green' as const },
];

type CommittedNewItem = {
  localId: string;
  displayIndex: string;
  description: string;
  severity: ChecklistSeverity;
  evidenceType: ChecklistEvidenceType;
  appliesToDw: boolean;
  appliesToSw: boolean;
  appliesToTe: boolean;
};

function getAppliesTo(item: CommittedNewItem, code: 'DW' | 'SW' | 'TE'): boolean {
  if (code === 'DW') return item.appliesToDw;
  if (code === 'SW') return item.appliesToSw;
  return item.appliesToTe;
}

type Props = {
  category: ChecklistCategoryResponse;
  categoryIndex: number;
  onItemSave: (
    itemId: number,
    categoryId: number,
    severity: string,
    evidenceType: string,
  ) => void;
  onAddItem: (categoryId: number, item: NewChecklistItemData) => void;
  onDraftChange: (categoryId: number, openCount: number) => void;
};

export function ChecklistSection({
  category,
  categoryIndex,
  onItemSave,
  onAddItem,
  onDraftChange,
}: Props) {
  const color = CATEGORY_COLORS[categoryIndex % CATEGORY_COLORS.length];
  const [draftKeys, setDraftKeys] = useState<string[]>([]);
  const [committedItems, setCommittedItems] = useState<CommittedNewItem[]>([]);
  const draftCounter = useRef(0);

  function handleAddDraft() {
    const newKey = `draft-${draftCounter.current++}`;
    setDraftKeys((prev) => [...prev, newKey]);
    onDraftChange(category.id, draftKeys.length + 1);
  }

  function handleDraftSave(draftKey: string, item: NewChecklistItemData) {
    const totalBefore = category.items.length + committedItems.length;
    const displayIndex = `${category.displayIndex}.${String(totalBefore + 1).padStart(2, '0')}`;
    setCommittedItems((prev) => [...prev, { localId: draftKey, displayIndex, ...item }]);
    setDraftKeys((prev) => prev.filter((k) => k !== draftKey));
    onDraftChange(category.id, draftKeys.length - 1);
    onAddItem(category.id, item);
  }

  function handleDraftCancel(draftKey: string) {
    setDraftKeys((prev) => prev.filter((k) => k !== draftKey));
    onDraftChange(category.id, draftKeys.length - 1);
  }

  return (
    <div className="rounded-card border border-ink-200 bg-white shadow-card-sm overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-ink-100">
        <div className="flex items-center gap-3">
          <span
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md font-mono text-[12px] font-bold"
            style={{ background: `${color}18`, color }}
          >
            {category.displayIndex}
          </span>
          <div>
            <h3 className="text-[14px] font-semibold text-ink-900 leading-tight">
              {category.name}
            </h3>
            <p className="text-[11px] text-ink-400 mt-0.5">
              {category.itemsSummaryCaption}
            </p>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={handleAddDraft}>
          + Add item
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="border-b border-ink-100 bg-ink-50">
              <th className="w-12 px-4 py-2.5 text-left font-medium text-ink-500">#</th>
              <th className="px-4 py-2.5 text-left font-medium text-ink-500">Check Item</th>
              <th className="w-56 px-4 py-2.5 text-left font-medium text-ink-500">Applies to</th>
              <th className="w-28 px-4 py-2.5 text-left font-medium text-ink-500">Required</th>
              <th className="w-40 px-4 py-2.5 text-left font-medium text-ink-500">Evidence</th>
              <th className="w-16 px-4 py-2.5" />
            </tr>
          </thead>
          <tbody>
            {category.items.map((item) => (
              <ChecklistItemRow
                key={item.id}
                item={item}
                itemNumber={item.displayIndex}
                onSave={(severity, evidenceType) =>
                  onItemSave(item.id, category.id, severity, evidenceType)
                }
              />
            ))}
            {committedItems.map((item) => (
              <tr
                key={item.localId}
                className="border-b border-teal-100 bg-teal-25/40 last:border-0 hover:bg-teal-50/30 transition-colors"
              >
                <td className="px-4 py-3 font-mono text-[12px] text-ink-400">
                  {item.displayIndex}
                </td>
                <td className="px-4 py-3 font-medium text-ink-800">{item.description}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1.5">
                    {TANKER_TYPES.map(({ code, tone }) => {
                      const active = getAppliesTo(item, code);
                      return (
                        <Chip
                          key={code}
                          tone={active ? tone : 'gray'}
                          className={!active ? 'opacity-30 line-through' : undefined}
                        >
                          {code}
                        </Chip>
                      );
                    })}
                  </div>
                </td>
                <td className="px-4 py-3 capitalize text-ink-800">{item.severity}</td>
                <td className="px-4 py-3 capitalize text-ink-800">{item.evidenceType}</td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-teal-100 px-2.5 py-1 text-[11px] font-medium text-teal-800">
                    New
                  </span>
                </td>
              </tr>
            ))}
            {draftKeys.map((key, draftIdx) => (
              <ChecklistNewItemRow
                key={key}
                itemNumber={`${category.displayIndex}.${String(
                  category.items.length + committedItems.length + draftIdx + 1,
                ).padStart(2, '0')}`}
                onSave={(item) => handleDraftSave(key, item)}
                onCancel={() => handleDraftCancel(key)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
