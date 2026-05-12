import type { ChecklistCategoryResponse } from '@/types/configuration';
import { ChecklistItemRow } from './ChecklistItemRow';

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
    categoryId: number,
    itemId: number,
    severity: string,
    evidenceType: string,
  ) => void;
};

export function ChecklistSection({
  category,
  categoryIndex,
  onItemSave,
}: Props) {
  const color = CATEGORY_COLORS[categoryIndex % CATEGORY_COLORS.length];

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
        <button className="flex items-center gap-1.5 rounded border border-ink-200 px-2.5 py-1 text-[12px] font-medium text-ink-600 hover:bg-ink-50 transition-colors">
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add item
        </button>
      </div>

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
                onSave={(severity, evidenceType) =>
                  onItemSave(category.id, item.id, severity, evidenceType)
                }
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
