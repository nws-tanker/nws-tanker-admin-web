import { Button } from '@/atoms';
import type { InvoiceReportResponse } from '@/types';
import { generateInvoicePdf } from '../pdf/invoicePdf';

type Props = {
  report: InvoiceReportResponse;
  periodLabel: string;
};

export function InvoicePdfButton({ report, periodLabel }: Props) {
  const handleClick = () => {
    generateInvoicePdf(report, periodLabel);
  };

  return (
    <Button variant="ghost" size="sm" onClick={handleClick}>
      Export PDF
    </Button>
  );
}
