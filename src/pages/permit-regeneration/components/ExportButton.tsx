import { Button } from '@/atoms';
import { DownloadIcon } from '@/atoms/icons';
import SpinnerIcon from '@/assets/icons/SpinnerIcon';

type Props = {
  isExporting: boolean;
  disabled?: boolean;
  onClick: () => void;
};

export function ExportButton({ isExporting, disabled, onClick }: Props) {
  const icon = isExporting ? (
    <SpinnerIcon />
  ) : (
    <DownloadIcon className="h-3.5 w-3.5" />
  );

  return (
    <Button
      variant="ghost"
      size="sm"
      leftIcon={icon}
      onClick={onClick}
      disabled={isExporting || disabled}
    >
      {isExporting ? 'Exporting...' : 'Export'}
    </Button>
  );
}
