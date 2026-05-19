import { toJpeg } from 'html-to-image';
import jsPDF from 'jspdf';

const SECTION_GAP_MM = 4;
const DEFAULT_FILENAME = 'executive-dashboard.pdf';

// Bug fixes applied:
// Fix 1+2: handlers assigned BEFORE .src (avoids missed onload); onerror rejects instead of hanging
async function captureSection(
  element: HTMLElement,
): Promise<{ dataUrl: string; img: HTMLImageElement }> {
  const dataUrl = await toJpeg(element, { quality: 0.95, pixelRatio: 2 });
  const img = new Image();
  await new Promise<void>((res, rej) => {
    img.onload = () => res();
    img.onerror = () =>
      rej(new Error('Failed to decode captured section image'));
    img.src = dataUrl; // src set AFTER handlers — avoids missed load event on fast browsers
  });
  return { dataUrl, img };
}

// Known limitation: on iOS Safari, pdf.save() opens the file in the browser tab
// rather than downloading it. This is a platform restriction with no programmatic fix.
export async function exportDashboardPdf(
  sections: HTMLElement[],
  filename = DEFAULT_FILENAME,
): Promise<void> {
  // Fix 3: skip no-op export rather than downloading a blank PDF
  if (sections.length === 0) return;

  const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
  const pdfW = pdf.internal.pageSize.getWidth(); // 297 mm
  const pdfH = pdf.internal.pageSize.getHeight(); // 210 mm

  let currentY = 0;
  let isFirstSection = true;

  for (const section of sections) {
    const { dataUrl, img } = await captureSection(section);

    // Fix 4: skip degenerate captures — prevents Infinity/NaN/zero-height addImage calls
    if (img.width === 0 || img.height === 0) continue;

    const ratio = pdfW / img.width;
    const sectionH = img.height * ratio;

    // Move to a new page if this section won't fully fit — never cut mid-section
    if (!isFirstSection && currentY + sectionH > pdfH) {
      pdf.addPage();
      currentY = 0;
    }

    // If a single section is taller than one full page, scale it to fit
    if (sectionH > pdfH) {
      const scale = pdfH / sectionH;
      const scaledW = pdfW * scale;
      pdf.addImage(
        dataUrl,
        'JPEG',
        (pdfW - scaledW) / 2,
        currentY,
        scaledW,
        pdfH,
      );
      currentY = pdfH;
    } else {
      pdf.addImage(dataUrl, 'JPEG', 0, currentY, pdfW, sectionH);
      currentY += sectionH + SECTION_GAP_MM;
    }

    isFirstSection = false;
  }

  // Fix 5: guard against empty-string filename — pdf.save('') has undefined browser behaviour
  pdf.save(filename || DEFAULT_FILENAME);
}
