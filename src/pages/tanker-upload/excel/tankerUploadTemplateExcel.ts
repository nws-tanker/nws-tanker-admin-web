import ExcelJS from 'exceljs';
import { TANKER_UPLOAD_COLUMNS } from '@/constants/tankerUpload';

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

export async function generateTankerUploadTemplateExcel(fileName: string) {
  const wb = new ExcelJS.Workbook();
  wb.creator = 'NAMA';
  wb.created = new Date();

  const ws = wb.addWorksheet('Template', {
    views: [{ showGridLines: false }],
  });

  const headers = TANKER_UPLOAD_COLUMNS.map((c) => c.name);
  ws.columns = headers.map((h) => ({ width: Math.max(18, h.length + 2) }));

  const headerRow = ws.addRow(headers);
  headerRow.height = 22;
  headerRow.eachCell((cell) => {
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

  ws.addRow(TANKER_UPLOAD_COLUMNS.map((c) => c.example));

  ws.views = [{ state: 'frozen', ySplit: 1 }];

  const buffer = await wb.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
  downloadBlob(blob, fileName);
}
