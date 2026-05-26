import { Button, CountBadge } from '@/atoms';
import { FileTextIcon } from '@/atoms/icons';
import SpinnerIcon from '@/assets/icons/SpinnerIcon';

type Props = {
  isRegenerating: boolean;
  selectedCount: number;
  onClick: () => void;
};

export function RegenerateButton({
  isRegenerating,
  selectedCount,
  onClick,
}: Props) {
  const icon = isRegenerating ? (
    <SpinnerIcon />
  ) : (
    <FileTextIcon className="h-3.5 w-3.5" />
  );

  const badge =
    selectedCount > 0 && !isRegenerating ? (
      <CountBadge value={selectedCount} />
    ) : undefined;

  return (
    <Button
      variant="primary"
      leftIcon={icon}
      onClick={onClick}
      disabled={selectedCount === 0 || isRegenerating}
      rightIcon={badge}
    >
      {isRegenerating ? 'Regenerating...' : 'Regenerate'}
    </Button>
  );
}
