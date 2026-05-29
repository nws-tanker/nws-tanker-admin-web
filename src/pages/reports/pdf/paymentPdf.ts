import type { PaymentReportResponse } from '@/types';
import {
  type PdfColumn,
  type PdfDataRow,
  createReportDoc,
  drawDocHeader,
  drawTable,
} from './pdfHelpers';

const COLUMNS: PdfColumn[] = [
  { header: 'Month', width: 24, align: 'center' },
  { header: 'Inspector', width: 48, align: 'center' },
  { header: 'Contractor', width: 36, align: 'center' },
  { header: 'Inspections Done', width: 36, align: 'center' },
  { header: 'DW', width: 24, align: 'center' },
  { header: 'SW', width: 24, align: 'center' },
  { header: 'TE', width: 24, align: 'center' },
  { header: 'Total', width: 30, align: 'center' },
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
      String(r.inspections_done),
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
      String(report.totals.inspections_done),
      String(report.totals.dw),
      String(report.totals.sw),
      String(report.totals.te),
      String(report.totals.total),
    ],
  };

  drawTable(doc, 14, 34, COLUMNS, rows, totals);
  doc.save(`payment-report-${periodLabel.replace(/\s+/g, '-')}.pdf`);
}
