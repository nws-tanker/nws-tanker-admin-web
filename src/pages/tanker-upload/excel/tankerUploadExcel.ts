import ExcelJS from 'exceljs';
import { TANKER_UPLOAD_COLUMNS } from '@/constants/tankerUpload';
import type { FailedRecord } from '@/types';

const HEADER_FILL = 'FFF3F4F6';
const HEADER_TEXT = 'FF374151';
const BORDER = 'FFE5E7EB';

function downloadBlob(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function createWorkbook() {
  const wb = new ExcelJS.Workbook();
  wb.creator = 'NAMA';
  wb.created = new Date();
  return wb;
}

function styleHeaderRow(row: ExcelJS.Row) {
  row.height = 22;
  row.eachCell((cell) => {
    cell.font = { bold: true, color: { argb: HEADER_TEXT }, size: 11 };
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: HEADER_FILL },
    };
    cell.alignment = { vertical: 'middle', horizontal: 'left' };
    cell.border = {
      bottom: { style: 'thin', color: { argb: BORDER } },
    };
  });
}

async function writeAndDownload(wb: ExcelJS.Workbook, fileName: string) {
  const buffer = await wb.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
  downloadBlob(blob, fileName);
}

export async function generateTankerUploadTemplateExcel(fileName: string) {
  try {
    const wb = createWorkbook();

    const ws = wb.addWorksheet('Template', {
      views: [{ showGridLines: false }],
    });

    const headers = TANKER_UPLOAD_COLUMNS.map((c) => c.name);
    ws.columns = headers.map((h) => ({ width: Math.max(18, h.length + 2) }));

    styleHeaderRow(ws.addRow(headers));
    ws.addRow(TANKER_UPLOAD_COLUMNS.map((c) => c.example));

    ws.views = [{ state: 'frozen', ySplit: 1 }];

    await writeAndDownload(wb, fileName);
  } catch (err) {
    console.error('Failed to generate tanker upload template Excel', err);
    throw err;
  }
}

export async function generateTankerUploadErrorsExcel(
  failedRecords: FailedRecord[],
  fileName: string,
) {
  try {
    const wb = createWorkbook();

    const ws = wb.addWorksheet('Errors', {
      views: [{ showGridLines: false }],
    });

    const headers = [...TANKER_UPLOAD_COLUMNS.map((c) => c.name), 'Errors'];
    ws.columns = headers.map((h) => ({
      width: h === 'Errors' ? 50 : Math.max(16, h.length + 2),
    }));

    styleHeaderRow(ws.addRow(headers));

    failedRecords.forEach((r) => {
      const row = ws.addRow([
        ...TANKER_UPLOAD_COLUMNS.map((c) => r[c.recordKey] ?? ''),
        r.errorMsg ?? '',
      ]);
      row.eachCell((cell) => {
        cell.alignment = { vertical: 'middle', wrapText: true };
        cell.border = {
          bottom: { style: 'hair', color: { argb: BORDER } },
        };
      });
    });

    ws.views = [{ state: 'frozen', ySplit: 1 }];

    await writeAndDownload(wb, fileName);
  } catch (err) {
    console.error('Failed to generate tanker upload errors Excel', err);
    throw err;
  }
}
