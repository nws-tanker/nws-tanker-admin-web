import { States } from '@/store/types';
import { useInspectionChecklistForm } from '../../hooks/useInspectionChecklistForm';
import ChecklistErrorState from './ChecklistErrorState';
import ChecklistInfoBanner from './ChecklistInfoBanner';
import ChecklistKpiStrip from './ChecklistKpiStrip';
import ChecklistSaveFooter from './ChecklistSaveFooter';
import { ChecklistSection } from './ChecklistSection';

export default function InspectionChecklist() {
  const {
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
  } = useInspectionChecklistForm();

  if ((state === States.LOADING || state === States.PRELOADING) && !data) {
    return (
      <div className="flex h-48 items-center justify-center text-[13px] text-ink-400">
        Loading inspection checklist…
      </div>
    );
  }

  if (!data) {
    return <ChecklistErrorState error={error} onRetry={retry} />;
  }

  const { summary, categories } = data;
  const totalItems = summary?.totalItems ?? 0;
  const isRefetching = state === States.LOADING;

  return (
    <div className="flex flex-col gap-5">
      <ChecklistKpiStrip summary={summary} />

      <ChecklistInfoBanner totalItems={totalItems} />

      <div className="flex flex-col gap-4">
        {!categories || categories.length === 0 || totalItems === 0 ? (
          <div className="flex h-32 items-center justify-center rounded-card border border-dashed border-ink-200 text-[13px] text-ink-400">
            There are currently no checklist items.
          </div>
        ) : (
          categories.map((category, index) => (
            <ChecklistSection
              key={`${category.id}-${category.items.length}`}
              category={category}
              categoryIndex={index}
              onItemSave={handleItemSave}
              onAddItem={handleAddItem}
              onDraftChange={handleDraftChange}
            />
          ))
        )}
      </div>

      <ChecklistSaveFooter
        hasOpenDrafts={hasOpenDrafts}
        saving={saving || isRefetching}
        hasItems={totalItems > 0}
        onSave={handleSaveChanges}
      />
    </div>
  );
}
