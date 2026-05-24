import { useEffect, useRef, useState } from 'react';
import type {
  ChecklistCategoryResponse,
  NewChecklistItemData,
} from '@/types/configuration';
import { ChecklistItemRow } from './ChecklistItemRow';
import { ChecklistNewItemRow } from './ChecklistNewItemRow';
import ChecklistSectionHeader from './ChecklistSectionHeader';
import CommittedItemRow, { type CommittedNewItem } from './CommittedItemRow';

const CATEGORY_COLORS = [
  '#1A8F9A',
  '#2563EB',
  '#7C3AED',
  '#D97706',
  '#059669',
  '#DC2626',
];

type Props = {
  category: ChecklistCategoryResponse;
  categoryIndex: number;
  onItemSave: (
    itemId: number,
    categoryId: number,
    severity: string,
    evidenceType: string,
    appliesTo: { dw: boolean; sw: boolean; te: boolean },
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

  useEffect(() => {
    setCommittedItems([]);
  }, [category.items]);

  function handleAddDraft() {
    const newKey = `draft-${draftCounter.current++}`;
    setDraftKeys((prev) => [...prev, newKey]);
    onDraftChange(category.id, draftKeys.length + 1);
  }

  function handleDraftSave(draftKey: string, item: NewChecklistItemData) {
    const totalBefore = category.items.length + committedItems.length;
    const displayIndex = `${category.displayIndex}.${String(totalBefore + 1).padStart(2, '0')}`;
    setCommittedItems((prev) => [
      ...prev,
      { localId: draftKey, displayIndex, ...item },
    ]);
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
      <ChecklistSectionHeader
        color={color}
        displayIndex={category.displayIndex}
        name={category.name}
        itemsSummaryCaption={category.itemsSummaryCaption}
        onAddDraft={handleAddDraft}
      />

      <div className="overflow-x-auto">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="border-b border-ink-100 bg-ink-50">
              <th className="w-12 px-4 py-2.5 text-left font-medium text-ink-500">
                #
              </th>
              <th className="px-4 py-2.5 text-left font-medium text-ink-500">
                Check Item
              </th>
              <th className="w-56 px-4 py-2.5 text-left font-medium text-ink-500">
                Applies to
              </th>
              <th className="w-28 px-4 py-2.5 text-left font-medium text-ink-500">
                Required
              </th>
              <th className="w-40 px-4 py-2.5 text-left font-medium text-ink-500">
                Evidence
              </th>
              <th className="w-16 px-4 py-2.5" />
            </tr>
          </thead>
          <tbody>
            {category.items.map((item) => (
              <ChecklistItemRow
                key={item.id}
                item={item}
                itemNumber={item.displayIndex}
                onSave={(severity, evidenceType, appliesTo) =>
                  onItemSave(
                    item.id,
                    category.id,
                    severity,
                    evidenceType,
                    appliesTo,
                  )
                }
              />
            ))}
            {committedItems.map((item) => (
              <CommittedItemRow key={item.localId} item={item} />
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
