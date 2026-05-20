import type { InvoiceReportResponse } from '@/types';
import {
  type PdfColumn,
  type PdfDataRow,
  createReportDoc,
  drawDocHeader,
  drawTable,
} from './pdfHelpers';

const COLUMNS: PdfColumn[] = [
  { header: 'Month', width: 26 },
  { header: 'Contractor (Cluster)', width: 72 },
  { header: 'Tanker Type', width: 28 },
  { header: 'Inspections Approved', width: 48, align: 'right' },
  { header: 'Samples Collected', width: 44, align: 'right' },
  { header: 'Permits Issued', width: 38, align: 'right' },
];

export function generateInvoicePdf(
  report: InvoiceReportResponse,
  periodLabel: string,
) {
  const doc = createReportDoc('landscape');
  drawDocHeader(
    doc,
    `Invoice Report · ${periodLabel}`,
    'Inspections approved, samples collected and permits issued per contractor',
  );

  const rows: PdfDataRow[] = report.rows.map((r) => ({
    cells: [
      r.month,
      r.contractor,
      r.tanker_type,
      String(r.inspections_approved),
      String(r.samples_collected),
      String(r.permits_issued),
    ],
    emphasizeLast: true,
  }));

  const totals: PdfDataRow = {
    cells: [
      `Totals · ${periodLabel}`,
      '',
      '',
      String(report.totals.inspections_approved),
      String(report.totals.samples_collected),
      String(report.totals.permits_issued),
    ],
  };

  drawTable(doc, 14, 33, COLUMNS, rows, totals);
  doc.save(`invoice-report-${periodLabel.replace(/\s+/g, '-')}.pdf`);
}
