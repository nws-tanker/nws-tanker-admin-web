import { jsPDF } from 'jspdf';

export type PdfColumn = {
  header: string;
  width: number;
  align?: 'left' | 'right';
};

export type PdfDataRow = {
  cells: string[];
  emphasizeLast?: boolean;
};

const COLOR = {
  ink900: [17, 24, 39] as const,
  ink700: [55, 65, 81] as const,
  ink500: [107, 114, 128] as const,
  ink200: [229, 231, 235] as const,
  ink100: [243, 244, 246] as const,
  ink50: [249, 250, 251] as const,
  teal: [15, 118, 110] as const,
};

const FONT = 'helvetica';

function rgb(c: readonly [number, number, number]) {
  return c;
}

export function createReportDoc() {
  return new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
}

export function drawDocHeader(doc: jsPDF, title: string, subtitle: string) {
  const x = 14;
  doc.setFont(FONT, 'bold');
  doc.setFontSize(16);
  doc.setTextColor(...rgb(COLOR.ink900));
  doc.text(title, x, 18);

  doc.setFont(FONT, 'normal');
  doc.setFontSize(10);
  doc.setTextColor(...rgb(COLOR.ink500));
  doc.text(subtitle, x, 24);

  doc.setDrawColor(...rgb(COLOR.teal));
  doc.setLineWidth(0.6);
  doc.line(x, 27, x + 30, 27);
}

const ROW_H = 8;
const HEADER_H = 9;
const PAD_X = 3;

function drawCell(
  doc: jsPDF,
  text: string,
  x: number,
  y: number,
  w: number,
  h: number,
  align: 'left' | 'right',
) {
  const tx = align === 'right' ? x + w - PAD_X : x + PAD_X;
  const ty = y + h / 2 + 1.4;
  doc.text(text, tx, ty, { align });
}

export function drawTable(
  doc: jsPDF,
  startX: number,
  startY: number,
  columns: PdfColumn[],
  rows: PdfDataRow[],
  totals?: PdfDataRow,
) {
  const totalWidth = columns.reduce((s, c) => s + c.width, 0);
  let y = startY;

  doc.setFillColor(...rgb(COLOR.ink50));
  doc.rect(startX, y, totalWidth, HEADER_H, 'F');
  doc.setDrawColor(...rgb(COLOR.ink200));
  doc.setLineWidth(0.2);
  doc.line(startX, y + HEADER_H, startX + totalWidth, y + HEADER_H);

  doc.setFont(FONT, 'bold');
  doc.setFontSize(8);
  doc.setTextColor(...rgb(COLOR.ink500));
  let cx = startX;
  columns.forEach((col) => {
    drawCell(
      doc,
      col.header.toUpperCase(),
      cx,
      y,
      col.width,
      HEADER_H,
      col.align ?? 'left',
    );
    cx += col.width;
  });
  y += HEADER_H;

  doc.setFont(FONT, 'normal');
  doc.setFontSize(9);

  rows.forEach((row) => {
    cx = startX;
    row.cells.forEach((cell, i) => {
      const col = columns[i];
      const align = col.align ?? 'left';
      const isLast = row.emphasizeLast && i === row.cells.length - 1;
      doc.setFont(FONT, isLast ? 'bold' : 'normal');
      doc.setTextColor(...rgb(isLast ? COLOR.ink900 : COLOR.ink700));
      drawCell(doc, cell, cx, y, col.width, ROW_H, align);
      cx += col.width;
    });
    doc.setDrawColor(...rgb(COLOR.ink100));
    doc.line(startX, y + ROW_H, startX + totalWidth, y + ROW_H);
    y += ROW_H;
  });

  if (totals) {
    doc.setFillColor(...rgb(COLOR.ink50));
    doc.rect(startX, y, totalWidth, ROW_H, 'F');
    cx = startX;
    doc.setFont(FONT, 'bold');
    doc.setTextColor(...rgb(COLOR.ink900));
    totals.cells.forEach((cell, i) => {
      const col = columns[i];
      drawCell(doc, cell, cx, y, col.width, ROW_H, col.align ?? 'left');
      cx += col.width;
    });
    y += ROW_H;
  }

  return y;
}
