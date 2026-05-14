import { useEffect, useState } from 'react';
import { useToast } from '@/atoms';
import { saveInspectionChecklist } from '@/services/configurationService';
import type {
  InspectionDataToBeEdited,
  NewChecklistItemData,
} from '@/types/configuration';
import { useInspectionChecklist } from './useInspectionChecklist';

export function useInspectionChecklistForm() {
  const { data, state, error, retry } = useInspectionChecklist();
  const [dataToBeEdited, setDataToBeEdited] =
    useState<InspectionDataToBeEdited>({ categories: [] });
  const [saving, setSaving] = useState(false);
  const [openDraftCounts, setOpenDraftCounts] = useState<
    Record<number, number>
  >({});
  const toast = useToast();

  const hasOpenDrafts = Object.values(openDraftCounts).some((c) => c > 0);

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

  return {
    data,
    state,
    error,
    retry,
    saving,
    hasOpenDrafts,
    handleSaveChanges,
    handleItemSave,
    handleDraftChange,
    handleAddItem,
  };
}
