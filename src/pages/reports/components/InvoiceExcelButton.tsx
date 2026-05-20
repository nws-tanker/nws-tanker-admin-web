import { Button } from '@/atoms';
import DownloadIcon from '@/assets/icons/DownloadIcon';
import type { InvoiceReportResponse } from '@/types';
import { generateInvoiceExcel } from '../excel/invoiceExcel';

type Props = {
  report: InvoiceReportResponse;
  periodLabel: string;
};

export function InvoiceExcelButton({ report, periodLabel }: Props) {
  const handleClick = () => {
    generateInvoiceExcel(report, periodLabel);
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
