import type { InvoiceReportResponse } from '@/types';
import { downloadSheet } from './excelHelpers';

const HEADERS = [
  'Month',
  'Cluster',
  'Governorate',
  'Tanker Type',
  'Inspections Approved',
  'Samples Collected',
  'Permits Issued',
];

function splitContractor(contractor: string): [string, string] {
  const [cluster, governorate] = contractor.split('·').map((s) => s.trim());
  return [cluster ?? '', governorate ?? ''];
}

export function generateInvoiceExcel(
  report: InvoiceReportResponse,
  periodLabel: string,
) {
  const dataRows = report.rows.map((r) => {
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

  const totalsRow: (string | number)[] = [
    `Totals · ${periodLabel}`,
    '',
    '',
    '',
    report.totals.inspections_approved,
    report.totals.samples_collected,
    report.totals.permits_issued,
  ];

  downloadSheet(
    [HEADERS, ...dataRows, totalsRow],
    'Invoice Report',
    `invoice-report-${periodLabel.replace(/\s+/g, '-')}.xlsx`,
  );
}
