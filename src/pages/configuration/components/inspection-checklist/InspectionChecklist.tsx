import { Button } from '@/atoms';
import { States } from '@/store/types';
import { useInspectionChecklistForm } from '../../hooks/useInspectionChecklistForm';
import { ChecklistSection } from './ChecklistSection';
import ChecklistInfoBanner from './ChecklistInfoBanner';
import ChecklistKpiStrip from './ChecklistKpiStrip';
import ChecklistSaveFooter from './ChecklistSaveFooter';

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

  if (state === States.ERROR && !data) {
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

  if (!data) {
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
      <ChecklistKpiStrip summary={summary} />

      <ChecklistInfoBanner totalItems={summary.totalItems} />

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

      <ChecklistSaveFooter
        hasOpenDrafts={hasOpenDrafts}
        saving={saving}
        onSave={handleSaveChanges}
      />
    </div>
  );
}
