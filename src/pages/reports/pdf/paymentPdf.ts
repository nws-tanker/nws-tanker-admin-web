import type { PaymentReportResponse } from '@/types';
import {
  type PdfColumn,
  type PdfDataRow,
  createReportDoc,
  drawDocHeader,
  drawTable,
} from './pdfHelpers';

const COLUMNS: PdfColumn[] = [
  { header: 'Month', width: 26 },
  { header: 'Inspector', width: 64 },
  { header: 'Contractor', width: 48 },
  { header: 'DW', width: 28, align: 'right' },
  { header: 'SW', width: 28, align: 'right' },
  { header: 'TE', width: 28, align: 'right' },
  { header: 'Total', width: 34, align: 'right' },
];

export async function generatePaymentPdf(
  report: PaymentReportResponse,
  periodLabel: string,
) {
  const doc = createReportDoc('landscape');
  await drawDocHeader(
    doc,
    `Payment Report · ${periodLabel}`,
    'Permits issued per inspector by tanker type',
  );

  const rows: PdfDataRow[] = report.rows.map((r) => ({
    cells: [
      r.month,
      r.inspector,
      r.contractor,
      String(r.dw),
      String(r.sw),
      String(r.te),
      String(r.total),
    ],
    emphasizeLast: true,
  }));

  const totals: PdfDataRow = {
    cells: [
      `Totals · ${report.totals.inspectors} inspectors`,
      '',
      '',
      String(report.totals.dw),
      String(report.totals.sw),
      String(report.totals.te),
      String(report.totals.total),
    ],
  };

  drawTable(doc, 14, 34, COLUMNS, rows, totals);
  doc.save(`payment-report-${periodLabel.replace(/\s+/g, '-')}.pdf`);
}
