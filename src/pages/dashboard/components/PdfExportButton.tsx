import { Button } from '@/atoms/Button';
import DownloadIcon from '@/assets/icons/DownloadIcon';
import SpinnerIcon from '@/assets/icons/SpinnerIcon';

type Props = {
  onClick: () => void;
  disabled: boolean;
  isLoading: boolean;
};

export default function PdfExportButton({
  onClick,
  disabled,
  isLoading,
}: Props) {
  return (
    <Button
      variant="secondary"
      size="md"
      onClick={onClick}
      disabled={disabled || isLoading}
      leftIcon={isLoading ? <SpinnerIcon /> : <DownloadIcon />}
    >
      {isLoading ? 'Generating…' : 'Export PDF'}
    </Button>
  );
}
