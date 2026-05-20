import { Button } from '@/atoms';
import type { PaymentReportResponse } from '@/types';
import { generatePaymentPdf } from '../pdf/paymentPdf';

type Props = {
  report: PaymentReportResponse;
  periodLabel: string;
};

export function PaymentPdfButton({ report, periodLabel }: Props) {
  const handleClick = () => {
    generatePaymentPdf(report, periodLabel);
  };

  return (
    <Button variant="ghost" size="sm" onClick={handleClick}>
      Export PDF
    </Button>
  );
}
