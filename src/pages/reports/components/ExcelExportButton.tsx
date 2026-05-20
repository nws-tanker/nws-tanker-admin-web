import { Button, useToast } from '@/atoms';
import DownloadIcon from '@/assets/icons/DownloadIcon';

type Props = {
  reportLabel: string;
  onExport: () => void | Promise<void>;
};

export function ExcelExportButton({ reportLabel, onExport }: Props) {
  const toast = useToast();

  const handleClick = async () => {
    try {
      await onExport();
      toast.show(`${reportLabel} Excel exported successfully`);
    } catch {
      toast.show(`Failed to export ${reportLabel.toLowerCase()} Excel`, {
        tone: 'error',
      });
    }
  };

  return (
    <Button
      variant="secondary"
      leftIcon={<DownloadIcon />}
      onClick={handleClick}
    >
      Export Excel
    </Button>
  );
}
