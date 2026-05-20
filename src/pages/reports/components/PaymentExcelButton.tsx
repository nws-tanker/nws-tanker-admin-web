import { Button } from '@/atoms';
import DownloadIcon from '@/assets/icons/DownloadIcon';
import type { PaymentReportResponse } from '@/types';
import { generatePaymentExcel } from '../excel/paymentExcel';

type Props = {
  report: PaymentReportResponse;
  periodLabel: string;
};

export function PaymentExcelButton({ report, periodLabel }: Props) {
  const handleClick = () => {
    generatePaymentExcel(report, periodLabel);
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
