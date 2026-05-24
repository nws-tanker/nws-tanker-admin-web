import { TYPE_LABELS } from '@/constants/fleet';
import type { ApprovedInspection } from '@/types/permitRegeneration';
import {
  type ExcelColumn,
  buildReportWorkbook,
  downloadWorkbook,
} from '@/pages/reports/excel/excelHelpers';

const COLUMNS: ExcelColumn[] = [
  { header: 'Inspection ID', width: 14, align: 'right' },
  { header: 'Plate Number', width: 16 },
  { header: 'Owner', width: 22 },
  { header: 'Tanker Type', width: 18 },
  { header: 'Cluster', width: 16 },
  { header: 'Governorate', width: 20 },
  { header: 'Permit Number', width: 18 },
  { header: 'Permit Issued', width: 16 },
  { header: 'Expiry Date', width: 16 },
  { header: 'Expiry Status', width: 16 },
  { header: 'Last Inspector', width: 22 },
  { header: 'Owner Email', width: 26 },
  { header: 'Owner Contact', width: 18 },
];

const EXPIRY_STATUS_LABEL: Record<ApprovedInspection['expiry_status'], string> =
  {
    valid: 'Valid',
    expiring_soon: 'Expiring Soon',
    expired: 'Expired',
  };

export async function generatePermitRegenerationExcel(
  rows: ApprovedInspection[],
  periodLabel: string,
) {
  const dataRows = rows.map((r) => [
    r.inspection_id,
    r.plate_number,
    r.owner,
    TYPE_LABELS[r.tanker_type] ?? r.tanker_type,
    r.cluster,
    r.governorate,
    r.permit_number,
    r.permit_issued_date,
    r.expiry_date,
    EXPIRY_STATUS_LABEL[r.expiry_status] ?? r.expiry_status,
    r.last_inspector,
    r.owner_email || '-',
    r.owner_contact || '-',
  ]);

  const wb = await buildReportWorkbook({
    sheetName: 'Permit Regeneration',
    title: `Permit Regeneration · ${periodLabel}`,
    subtitle: 'Approved inspections eligible for permit regeneration',
    columns: COLUMNS,
    rows: dataRows,
  });

  await downloadWorkbook(
    wb,
    `permit-regeneration-${periodLabel.replace(/\s+/g, '-')}.xlsx`,
  );
}
