import { Button, useToast } from '@/atoms';

type Props = {
  reportLabel: string;
  onExport: () => void | Promise<void>;
};

export function PdfExportButton({ reportLabel, onExport }: Props) {
  const toast = useToast();

  const handleClick = async () => {
    try {
      await onExport();
      toast.show(`${reportLabel} PDF exported successfully`);
    } catch {
      toast.show(`Failed to export ${reportLabel.toLowerCase()} PDF`, {
        tone: 'error',
      });
    }
  };

  return (
    <Button variant="ghost" size="sm" onClick={handleClick}>
      Export PDF
    </Button>
  );
}
