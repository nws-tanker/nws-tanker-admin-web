import { Button } from '@/atoms';

type Props = {
  error: string | null;
  onRetry: () => void;
};

export default function ChecklistErrorState({ error, onRetry }: Props) {
  return (
    <div className="flex h-48 flex-col items-center justify-center gap-3">
      <p className="text-[13px] text-red-500">
        {error ?? 'Failed to load inspection checklist'}
      </p>
      <Button variant="secondary" size="sm" onClick={onRetry}>
        Retry
      </Button>
    </div>
  );
}
