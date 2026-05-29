import type { PaymentReportResponse } from '@/types';
import {
  type ExcelColumn,
  buildReportWorkbook,
  downloadWorkbook,
} from './excelHelpers';

const COLUMNS: ExcelColumn[] = [
  { header: 'Month', width: 14 },
  { header: 'Inspector', width: 24 },
  { header: 'Contractor', width: 18 },
  { header: 'Inspections Done', width: 18, align: 'right' },
  { header: 'DW', width: 10, align: 'right' },
  { header: 'SW', width: 10, align: 'right' },
  { header: 'TE', width: 10, align: 'right' },
  { header: 'Total', width: 12, align: 'right' },
];

export async function generatePaymentExcel(
  report: PaymentReportResponse,
  periodLabel: string,
) {
  const rows = report.rows.map((r) => [
    r.month,
    r.inspector,
    r.contractor,
    r.inspections_done,
    r.dw,
    r.sw,
    r.te,
    r.total,
  ]);

  const totals: (string | number)[] = [
    `Totals · ${report.totals.inspectors} inspectors`,
    '',
    '',
    report.totals.inspections_done,
    report.totals.dw,
    report.totals.sw,
    report.totals.te,
    report.totals.total,
  ];

  const wb = await buildReportWorkbook({
    sheetName: 'Payment Report',
    title: `Payment Report · ${periodLabel}`,
    subtitle: 'Permits issued per inspector by tanker type',
    columns: COLUMNS,
    rows,
    totals,
  });

  await downloadWorkbook(
    wb,
    `payment-report-${periodLabel.replace(/\s+/g, '-')}.xlsx`,
  );
}
