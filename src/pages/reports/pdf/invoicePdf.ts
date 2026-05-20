import type { InvoiceReportResponse } from '@/types';
import {
  type PdfColumn,
  type PdfDataRow,
  createReportDoc,
  drawDocHeader,
  drawTable,
} from './pdfHelpers';

const COLUMNS: PdfColumn[] = [
  { header: 'Month', width: 22 },
  { header: 'Contractor (Cluster)', width: 58 },
  { header: 'Tanker Type', width: 22 },
  { header: 'Inspections Approved', width: 32, align: 'right' },
  { header: 'Samples Collected', width: 28, align: 'right' },
  { header: 'Permits Issued', width: 20, align: 'right' },
];

export function generateInvoicePdf(
  report: InvoiceReportResponse,
  periodLabel: string,
) {
  const doc = createReportDoc();
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
