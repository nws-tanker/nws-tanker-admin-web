import { jsPDF } from 'jspdf';
import logoUrl from '@/assets/nama-logo.jpeg';

export type PdfColumn = {
  header: string;
  width: number;
  align?: 'left' | 'right' | 'center';
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
  brandTeal: [2, 71, 78] as const,
  subtitleLight: [209, 250, 229] as const,
};

const FONT = 'helvetica';

let cachedLogo: string | null = null;
async function loadLogoDataUrl(): Promise<string> {
  if (cachedLogo) return cachedLogo;
  const res = await fetch(logoUrl);
  const blob = await res.blob();
  const dataUrl: string = await new Promise((resolve) => {
    const fr = new FileReader();
    fr.onload = () => resolve(fr.result as string);
    fr.readAsDataURL(blob);
  });
  cachedLogo = dataUrl;
  return dataUrl;
}

export function createReportDoc(
  orientation: 'portrait' | 'landscape' = 'portrait',
) {
  return new jsPDF({ unit: 'mm', format: 'a4', orientation });
}

export async function drawDocHeader(
  doc: jsPDF,
  title: string,
  subtitle: string,
) {
  const margin = 14;
  const pageW = doc.internal.pageSize.getWidth();
  const logoW = 30;
  const logoH = 18;
  const bannerY = 10;
  const bannerH = 18;
  const bannerX = margin + logoW + 2;
  const bannerW = pageW - margin - bannerX;

  doc.setFillColor(...COLOR.brandTeal);
  doc.rect(bannerX, bannerY, bannerW, bannerH, 'F');

  const logoData = await loadLogoDataUrl();
  doc.addImage(logoData, 'JPEG', margin, bannerY, logoW, logoH);

  const textRightX = bannerX + bannerW - 4;
  doc.setFont(FONT, 'bold');
  doc.setFontSize(14);
  doc.setTextColor(255, 255, 255);
  doc.text(title, textRightX, bannerY + 8, { align: 'right' });

  doc.setFont(FONT, 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...COLOR.subtitleLight);
  doc.text(subtitle, textRightX, bannerY + 14, { align: 'right' });
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
  align: 'left' | 'right' | 'center',
) {
  const tx =
    align === 'right'
      ? x + w - PAD_X
      : align === 'center'
        ? x + w / 2
        : x + PAD_X;
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

  doc.setFillColor(...COLOR.ink50);
  doc.rect(startX, y, totalWidth, HEADER_H, 'F');
  doc.setDrawColor(...COLOR.ink200);
  doc.setLineWidth(0.2);
  doc.line(startX, y + HEADER_H, startX + totalWidth, y + HEADER_H);

  doc.setFont(FONT, 'bold');
  doc.setFontSize(8);
  doc.setTextColor(...COLOR.ink500);
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
      const [cr, cg, cb] = isLast ? COLOR.ink900 : COLOR.ink700;
      doc.setTextColor(cr, cg, cb);
      drawCell(doc, cell, cx, y, col.width, ROW_H, align);
      cx += col.width;
    });
    doc.setDrawColor(...COLOR.ink100);
    doc.line(startX, y + ROW_H, startX + totalWidth, y + ROW_H);
    y += ROW_H;
  });

  if (totals) {
    doc.setFillColor(...COLOR.ink50);
    doc.rect(startX, y, totalWidth, ROW_H, 'F');
    cx = startX;
    doc.setFont(FONT, 'bold');
    doc.setTextColor(...COLOR.ink900);
    totals.cells.forEach((cell, i) => {
      const col = columns[i];
      drawCell(doc, cell, cx, y, col.width, ROW_H, col.align ?? 'left');
      cx += col.width;
    });
    y += ROW_H;
  }

  return y;
}
