import { Button } from '@/atoms';

type Props = {
  hasOpenDrafts: boolean;
  saving: boolean;
  onSave: () => void;
};

export default function ChecklistSaveFooter({
  hasOpenDrafts,
  saving,
  onSave,
}: Props) {
  return (
    <div className="flex items-center justify-end gap-3 pt-1">
      {hasOpenDrafts && (
        <p className="text-[12px] text-amber-600">
          Finish or cancel all open rows before saving.
        </p>
      )}
      <Button
        variant="primary"
        onClick={onSave}
        disabled={saving || hasOpenDrafts}
      >
        {saving ? 'Saving…' : 'Save Changes'}
      </Button>
    </div>
  );
}
