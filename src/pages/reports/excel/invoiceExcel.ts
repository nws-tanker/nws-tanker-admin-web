import type { InvoiceReportResponse } from '@/types';
import {
  type ExcelColumn,
  buildReportWorkbook,
  downloadWorkbook,
} from './excelHelpers';

const COLUMNS: ExcelColumn[] = [
  { header: 'Month', width: 14 },
  { header: 'Cluster', width: 14 },
  { header: 'Governorate', width: 22 },
  { header: 'Tanker Type', width: 14 },
  { header: 'Inspections Approved', width: 22, align: 'right' },
  { header: 'Samples Collected', width: 20, align: 'right' },
  { header: 'Permits Issued', width: 18, align: 'right' },
];

function splitContractor(contractor: string): [string, string] {
  const [cluster, governorate] = contractor.split('·').map((s) => s.trim());
  return [cluster ?? '', governorate ?? ''];
}

export async function generateInvoiceExcel(
  report: InvoiceReportResponse,
  periodLabel: string,
) {
  const rows = report.rows.map((r) => {
    const [cluster, governorate] = splitContractor(r.contractor);
    return [
      r.month,
      cluster,
      governorate,
      r.tanker_type,
      r.inspections_approved,
      r.samples_collected,
      r.permits_issued,
    ];
  });

  const totals: (string | number)[] = [
    `Totals · ${periodLabel}`,
    '',
    '',
    '',
    report.totals.inspections_approved,
    report.totals.samples_collected,
    report.totals.permits_issued,
  ];

  const wb = await buildReportWorkbook({
    sheetName: 'Invoice Report',
    title: `Invoice Report · ${periodLabel}`,
    subtitle: 'Inspections approved, samples collected and permits issued',
    columns: COLUMNS,
    rows,
    totals,
  });

  await downloadWorkbook(
    wb,
    `invoice-report-${periodLabel.replace(/\s+/g, '-')}.xlsx`,
  );
}
