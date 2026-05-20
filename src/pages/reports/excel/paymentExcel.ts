import type { PaymentReportResponse } from '@/types';
import { downloadSheet } from './excelHelpers';

const HEADERS = ['Month', 'Inspector', 'Contractor', 'DW', 'SW', 'TE', 'Total'];

export function generatePaymentExcel(
  report: PaymentReportResponse,
  periodLabel: string,
) {
  const dataRows = report.rows.map((r) => [
    r.month,
    r.inspector,
    r.contractor,
    r.dw,
    r.sw,
    r.te,
    r.total,
  ]);

  const totalsRow: (string | number)[] = [
    `Totals · ${report.totals.inspectors} inspectors`,
    '',
    '',
    report.totals.dw,
    report.totals.sw,
    report.totals.te,
    report.totals.total,
  ];

  downloadSheet(
    [HEADERS, ...dataRows, totalsRow],
    'Payment Report',
    `payment-report-${periodLabel.replace(/\s+/g, '-')}.xlsx`,
  );
}
