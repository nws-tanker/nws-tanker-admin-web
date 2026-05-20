import * as XLSX from 'xlsx';

export function downloadSheet(
  rows: (string | number)[][],
  sheetName: string,
  fileName: string,
) {
  const ws = XLSX.utils.aoa_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, sheetName);
  XLSX.writeFile(wb, fileName);
}
