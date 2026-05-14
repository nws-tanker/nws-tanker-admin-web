import { useEffect, useState } from 'react';
import { Button, useToast } from '@/atoms';
import { States } from '@/store/types';
import { useInspectionChecklist } from '../../hooks/useInspectionChecklist';
import { ChecklistSection } from './ChecklistSection';
import type { InspectionDataToBeEdited, NewChecklistItemData } from '@/types/configuration';
import { saveInspectionChecklist } from '@/services/configurationService';

export default function InspectionChecklist() {
  const { data, state, error, retry } = useInspectionChecklist();
  const [dataToBeEdited, setDataToBeEdited] =
    useState<InspectionDataToBeEdited>({ categories: [] });
  const [saving, setSaving] = useState(false);
  const [openDraftCounts, setOpenDraftCounts] = useState<Record<number, number>>({});

  const hasOpenDrafts = Object.values(openDraftCounts).some((c) => c > 0);
  const toast = useToast();

  useEffect(() => {
    if (!data) return;
    setDataToBeEdited({
      categories: data.categories.map((cat) => ({
        categoryId: cat.id,
        items: cat.items.map((item) => ({
          id: item.id,
          description: item.description,
          severity: item.severity,
          evidenceType: item.evidenceType,
          appliesToDw: item.appliesToDw,
          appliesToSw: item.appliesToSw,
          appliesToTe: item.appliesToTe,
          sortOrder: item.sortOrder,
        })),
      })),
    });
  }, [data]);


  async function handleSaveChanges() {
    setSaving(true);
    try {
      const response = await saveInspectionChecklist(dataToBeEdited);
      if (response.success) {
        toast.show('Checklist saved successfully');
      } else {
        toast.show(response.error?.description ?? 'Failed to save checklist', {
          tone: 'error',
        });
      }
    } catch {
      toast.show('Failed to save checklist', { tone: 'error' });
    } finally {
      setSaving(false);
    }
  }

  function handleItemSave(
    itemId: number,
    categoryId: number,
    severity: string,
    evidenceType: string,
  ) {
    setDataToBeEdited((prev) => ({
      categories: prev.categories.map((cat) =>
        cat.categoryId !== categoryId
          ? cat
          : {
              ...cat,
              items: cat.items.map((item) =>
                item.id !== itemId ? item : { ...item, severity, evidenceType },
              ),
            },
      ),
    }));
  }

  function handleDraftChange(categoryId: number, openCount: number) {
    setOpenDraftCounts((prev) => ({ ...prev, [categoryId]: openCount }));
  }

  function handleAddItem(categoryId: number, newItem: NewChecklistItemData) {
    setDataToBeEdited((prev) => ({
      categories: prev.categories.map((cat) => {
        if (cat.categoryId !== categoryId) return cat;
        const maxSortOrder = cat.items.reduce(
          (max, item) => Math.max(max, item.sortOrder),
          0,
        );
        return {
          ...cat,
          items: [
            ...cat.items,
            {
              id: 0,
              description: newItem.description,
              severity: newItem.severity,
              evidenceType: newItem.evidenceType,
              appliesToDw: newItem.appliesToDw,
              appliesToSw: newItem.appliesToSw,
              appliesToTe: newItem.appliesToTe,
              sortOrder: maxSortOrder + 1,
            },
          ],
        };
      }),
    }));
  }

  if (state === States.LOADING || state === States.PRELOADING) {
    return (
      <div className="flex h-48 items-center justify-center text-[13px] text-ink-400">
        Loading inspection checklist…
      </div>
    );
  }

  if (state === States.ERROR || !data) {
    return (
      <div className="flex h-48 flex-col items-center justify-center gap-3">
        <p className="text-[13px] text-red-500">
          {error ?? 'Failed to load inspection checklist'}
        </p>
        <Button variant="secondary" size="sm" onClick={retry}>
          Retry
        </Button>
      </div>
    );
  }

  const { summary, categories } = data;

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-3 gap-4">
        <KpiCard
          label="Total Items"
          value={summary.totalItems}
          footnote={summary.totalItemsCaption}
        />
        <KpiCard
          label="Categories"
          value={summary.categoryCount}
          footnote="Grouped sections"
        />
        <KpiCard
          label="Applies To"
          value={summary.appliesToDisplay}
          unit="types"
          footnote="DW · SW · TE (current)"
        />
      </div>

      <div
        className="flex items-start gap-3.5 rounded-card border border-teal-100 bg-teal-50/60 px-4 py-3.5"
        style={{ borderLeft: '3px solid #0f766e' }}
      >
        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-100 text-[12px] font-bold text-teal-900 mt-0.5">
          i
        </div>
        <p className="text-[13px] text-ink-700 leading-relaxed">
          All {summary.totalItems} items currently apply to{' '}
          <span className="inline-flex items-center rounded border border-blue-100 bg-blue-50 px-2 py-0.5 text-[11px] font-medium text-blue-700">
            DW
          </span>{' '}
          <span className="inline-flex items-center rounded border border-amber-100 bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-700">
            SW
          </span>{' '}
          <span className="inline-flex items-center rounded border border-green-100 bg-green-50 px-2 py-0.5 text-[11px] font-medium text-green-700">
            TE
          </span>
          . To restrict an item to only some tanker types, click the{' '}
          <strong className="font-semibold text-ink-900">Applies to</strong>{' '}
          chips in its row — deselect any type it shouldn&apos;t run on. A
          single failure still marks the inspection non-compliant for the
          covered types.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {categories.map((category, index) => (
          <ChecklistSection
            key={category.id}
            category={category}
            categoryIndex={index}
            onItemSave={handleItemSave}
            onAddItem={handleAddItem}
            onDraftChange={handleDraftChange}
          />
        ))}
      </div>

      <div className="flex items-center justify-end gap-3 pt-1">
        {hasOpenDrafts && (
          <p className="text-[12px] text-amber-600">
            Finish or cancel all open rows before saving.
          </p>
        )}
        <Button
          variant="primary"
          onClick={handleSaveChanges}
          disabled={saving || hasOpenDrafts}
        >
          {saving ? 'Saving…' : 'Save Changes'}
        </Button>
      </div>
    </div>
  );
}

type KpiCardProps = {
  label: string;
  value: string | number;
  unit?: string;
  footnote: string;
};

function KpiCard({ label, value, unit, footnote }: KpiCardProps) {
  return (
    <div className="rounded-card border border-ink-200 bg-white px-5 py-4 shadow-card-sm">
      <div className="text-[11px] font-medium uppercase tracking-wide text-ink-400">
        {label}
      </div>
      <div className="mt-1.5 flex items-baseline gap-1">
        <span className="text-[26px] font-bold leading-none text-ink-900 tabular-nums">
          {value}
        </span>
        {unit && (
          <span className="text-[13px] font-medium text-ink-400">{unit}</span>
        )}
      </div>
      <div className="mt-1 text-[11px] text-ink-400">{footnote}</div>
    </div>
  );
}
