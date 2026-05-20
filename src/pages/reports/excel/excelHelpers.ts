import ExcelJS from 'exceljs';
import logoUrl from '@/assets/nama-logo.jpeg';

export type ExcelColumn = {
  header: string;
  width: number;
  align?: 'left' | 'right' | 'center';
};

const BRAND_TEAL = 'FF02474E';
const HEADER_FILL = 'FFF3F4F6';
const HEADER_TEXT = 'FF374151';
const TOTAL_FILL = 'FFF9FAFB';
const BORDER = 'FFE5E7EB';

async function loadLogoBuffer(): Promise<ArrayBuffer> {
  const res = await fetch(logoUrl);
  return res.arrayBuffer();
}

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

export async function buildReportWorkbook(opts: {
  sheetName: string;
  title: string;
  subtitle: string;
  columns: ExcelColumn[];
  rows: (string | number)[][];
  totals?: (string | number)[];
}): Promise<ExcelJS.Workbook> {
  const { sheetName, title, subtitle, columns, rows, totals } = opts;

  const wb = new ExcelJS.Workbook();
  wb.creator = 'NAMA';
  wb.created = new Date();
  const ws = wb.addWorksheet(sheetName, {
    properties: { defaultRowHeight: 18 },
    views: [{ showGridLines: false }],
  });

  ws.columns = columns.map((c) => ({ width: c.width }));

  const logoBuffer = await loadLogoBuffer();
  const imageId = wb.addImage({ buffer: logoBuffer, extension: 'jpeg' });
  ws.addImage(imageId, {
    tl: { col: 0, row: 0 },
    ext: { width: 100, height: 60 },
  });

  ws.getRow(1).height = 32;
  ws.getRow(2).height = 28;

  const lastColLetter = ws.getColumn(columns.length).letter;

  const tealFill = {
    type: 'pattern' as const,
    pattern: 'solid' as const,
    fgColor: { argb: BRAND_TEAL },
  };

  for (let r = 1; r <= 2; r += 1) {
    for (let c = 2; c <= columns.length; c += 1) {
      ws.getRow(r).getCell(c).fill = tealFill;
    }
  }

  ws.mergeCells(`B1:${lastColLetter}1`);
  const titleCell = ws.getCell('B1');
  titleCell.value = title;
  titleCell.font = {
    name: 'Calibri',
    size: 16,
    bold: true,
    color: { argb: 'FFFFFFFF' },
  };
  titleCell.alignment = {
    vertical: 'middle',
    horizontal: 'right',
    indent: 1,
  };
  titleCell.fill = tealFill;

  ws.mergeCells(`B2:${lastColLetter}2`);
  const subtitleCell = ws.getCell('B2');
  subtitleCell.value = subtitle;
  subtitleCell.font = {
    name: 'Calibri',
    size: 10,
    color: { argb: 'FFD1FAE5' },
  };
  subtitleCell.alignment = {
    vertical: 'middle',
    horizontal: 'right',
    indent: 1,
  };
  subtitleCell.fill = tealFill;

  const headerRowIdx = 3;
  const headerRow = ws.getRow(headerRowIdx);
  columns.forEach((c, i) => {
    const cell = headerRow.getCell(i + 1);
    cell.value = c.header;
    cell.font = {
      name: 'Calibri',
      size: 10,
      bold: true,
      color: { argb: HEADER_TEXT },
    };
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: HEADER_FILL },
    };
    cell.alignment = { vertical: 'middle', horizontal: c.align ?? 'left' };
    cell.border = {
      top: { style: 'thin', color: { argb: BORDER } },
      bottom: { style: 'thin', color: { argb: BORDER } },
      left: { style: 'thin', color: { argb: BORDER } },
      right: { style: 'thin', color: { argb: BORDER } },
    };
  });
  headerRow.height = 22;

  rows.forEach((r) => {
    const row = ws.addRow(r);
    row.eachCell((cell, colNumber) => {
      const col = columns[colNumber - 1];
      cell.font = { name: 'Calibri', size: 10, color: { argb: 'FF1F2937' } };
      cell.alignment = { vertical: 'middle', horizontal: col?.align ?? 'left' };
      cell.border = {
        bottom: { style: 'hair', color: { argb: BORDER } },
        left: { style: 'thin', color: { argb: BORDER } },
        right: { style: 'thin', color: { argb: BORDER } },
      };
    });
  });

  if (totals) {
    const row = ws.addRow(totals);
    row.eachCell((cell, colNumber) => {
      const col = columns[colNumber - 1];
      cell.font = {
        name: 'Calibri',
        size: 10,
        bold: true,
        color: { argb: 'FF111827' },
      };
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: TOTAL_FILL },
      };
      cell.alignment = { vertical: 'middle', horizontal: col?.align ?? 'left' };
      cell.border = {
        top: { style: 'thin', color: { argb: BORDER } },
        bottom: { style: 'thin', color: { argb: BORDER } },
        left: { style: 'thin', color: { argb: BORDER } },
        right: { style: 'thin', color: { argb: BORDER } },
      };
    });
  }

  return wb;
}

export async function downloadWorkbook(wb: ExcelJS.Workbook, fileName: string) {
  const buffer = await wb.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
  downloadBlob(blob, fileName);
}
