import type { PaymentReportResponse } from '@/types';
import {
  type PdfColumn,
  type PdfDataRow,
  createReportDoc,
  drawDocHeader,
  drawTable,
} from './pdfHelpers';

const COLUMNS: PdfColumn[] = [
  { header: 'Month', width: 22 },
  { header: 'Inspector', width: 48 },
  { header: 'Contractor', width: 38 },
  { header: 'DW', width: 18, align: 'right' },
  { header: 'SW', width: 18, align: 'right' },
  { header: 'TE', width: 18, align: 'right' },
  { header: 'Total', width: 20, align: 'right' },
];

export function generatePaymentPdf(
  report: PaymentReportResponse,
  periodLabel: string,
) {
  const doc = createReportDoc();
  drawDocHeader(
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

  drawTable(doc, 14, 33, COLUMNS, rows, totals);
  doc.save(`payment-report-${periodLabel.replace(/\s+/g, '-')}.pdf`);
}
