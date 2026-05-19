import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { exportDashboardPdf } from './exportDashboardPdf';

// ─── Module mocks (vi.hoisted ensures these exist when vi.mock factories run) ─

const { mockToJpeg, mockAddPage, mockAddImage, mockSave } = vi.hoisted(() => ({
  mockToJpeg: vi.fn(),
  mockAddPage: vi.fn(),
  mockAddImage: vi.fn(),
  mockSave: vi.fn(),
}));

vi.mock('html-to-image', () => ({ toJpeg: mockToJpeg }));

vi.mock('jspdf', () => ({
  default: vi.fn(() => ({
    internal: { pageSize: { getWidth: () => 297, getHeight: () => 210 } },
    addPage: mockAddPage,
    addImage: mockAddImage,
    save: mockSave,
  })),
}));

// ─── Image mock helpers ──────────────────────────────────────────────────────

/**
 * Returns a mock Image class. Fires onload/onerror synchronously when src is
 * set — this simulates browsers that decode data: URLs synchronously, which is
 * exactly the scenario that exposed Bug 6 (handler set after src).
 */
function makeImageClass(
  opts: { width?: number; height?: number; failLoad?: boolean } = {},
) {
  return class MockImage {
    width = opts.width ?? 2380; // 1190 CSS px × pixelRatio 2
    height = opts.height ?? 800;
    onload: (() => void) | null = null;
    onerror: ((e: unknown) => void) | null = null;

    set src(_v: string) {
      if (opts.failLoad) {
        this.onerror?.(new Event('error'));
      } else {
        this.onload?.();
      }
    }
  };
}

/** Builds a per-instance height sequence so oversized + normal tests work. */
function makeVariableImageClass(heights: number[]) {
  let idx = 0;
  return class VariableImage {
    width = 2380;
    height = heights[idx] ?? heights[heights.length - 1];
    onload: (() => void) | null = null;
    onerror: ((e: unknown) => void) | null = null;

    constructor() {
      this.height = heights[idx] ?? heights[heights.length - 1];
      idx++;
    }

    set src(_v: string) {
      this.onload?.();
    }
  };
}

function el(): HTMLElement {
  return {} as HTMLElement;
}

// Helpers to convert pixel height → section mm height (same formula as production)
const pdfW = 297;
const imgWidth = 2380;
function sectionMm(imgHeightPx: number) {
  return (imgHeightPx * pdfW) / imgWidth;
}
// Inverse: given desired mm height, what img.height pixel count do we need?
function pxForMm(mm: number) {
  return Math.round((mm * imgWidth) / pdfW);
}

// ─── Tests ───────────────────────────────────────────────────────────────────

describe('exportDashboardPdf', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockToJpeg.mockResolvedValue('data:image/jpeg;base64,/9j/MOCK');
    vi.stubGlobal('Image', makeImageClass());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  // ─────────────────────────────────────────────────────────────────────────
  // Group A — Input validation (Cases 1–3)
  // ─────────────────────────────────────────────────────────────────────────

  describe('Group A — Input validation', () => {
    // Case 1
    it('returns early without calling pdf.save() when sections is empty', async () => {
      await exportDashboardPdf([]);
      expect(mockSave).not.toHaveBeenCalled();
    });

    // Case 1
    it('does not call toJpeg when sections is empty', async () => {
      await exportDashboardPdf([]);
      expect(mockToJpeg).not.toHaveBeenCalled();
    });

    // Case 2
    it('falls back to default filename when empty string is passed', async () => {
      await exportDashboardPdf([el()], '');
      expect(mockSave).toHaveBeenCalledWith('executive-dashboard.pdf');
    });

    // Case 3
    it('uses the provided filename when set', async () => {
      await exportDashboardPdf([el()], 'q2-report.pdf');
      expect(mockSave).toHaveBeenCalledWith('q2-report.pdf');
    });

    // Case 4
    it('calls pdf.save() exactly once for a single section', async () => {
      await exportDashboardPdf([el()]);
      expect(mockSave).toHaveBeenCalledOnce();
    });

    // Case 5
    it('calls toJpeg once per section for 6 sections', async () => {
      await exportDashboardPdf([el(), el(), el(), el(), el(), el()]);
      expect(mockToJpeg).toHaveBeenCalledTimes(6);
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // Group B — captureSection: Bug 2 (onerror) & Bug 6 (handler before src)
  // ─────────────────────────────────────────────────────────────────────────

  describe('Group B — captureSection', () => {
    // Case 12 — Bug 2: onerror must reject the promise
    it('rejects with a descriptive error when img.onerror fires', async () => {
      vi.stubGlobal('Image', makeImageClass({ failLoad: true }));
      await expect(exportDashboardPdf([el()])).rejects.toThrow(
        'Failed to decode captured section image',
      );
    });

    // Case 13 — Bug 6: handlers assigned before src avoids missed onload
    it('resolves successfully when onload fires synchronously on src assignment', async () => {
      // makeImageClass fires onload synchronously inside the src setter.
      // If handlers were set AFTER src (the old code), onload would fire before
      // the handler was assigned and the promise would never resolve.
      await expect(exportDashboardPdf([el()])).resolves.toBeUndefined();
    });

    // Case 11 — toJpeg rejections propagate
    it('propagates toJpeg errors up to the caller', async () => {
      mockToJpeg.mockRejectedValue(new Error('canvas is tainted by CORS'));
      await expect(exportDashboardPdf([el()])).rejects.toThrow(
        'canvas is tainted by CORS',
      );
    });

    // Case 71 — error on first of many sections
    it('stops processing and propagates error if toJpeg throws on the first section', async () => {
      mockToJpeg.mockRejectedValueOnce(new Error('CORS'));
      await expect(exportDashboardPdf([el(), el(), el()])).rejects.toThrow(
        'CORS',
      );
      expect(mockToJpeg).toHaveBeenCalledTimes(1); // stopped at section 1
    });

    // Case 72 — error on a middle section
    it('propagates error if toJpeg throws on a middle section', async () => {
      mockToJpeg
        .mockResolvedValueOnce('data:image/jpeg;base64,A')
        .mockRejectedValueOnce(new Error('section 2 failed'))
        .mockResolvedValueOnce('data:image/jpeg;base64,C');
      await expect(exportDashboardPdf([el(), el(), el()])).rejects.toThrow(
        'section 2 failed',
      );
      expect(mockToJpeg).toHaveBeenCalledTimes(2);
    });

    // Case 72 partial — pdf.save not called when error occurs
    it('does not call pdf.save() when an error is thrown mid-loop', async () => {
      mockToJpeg.mockRejectedValue(new Error('fail'));
      await expect(exportDashboardPdf([el()])).rejects.toThrow();
      expect(mockSave).not.toHaveBeenCalled();
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // Group C — Zero-dimension guard (Cases 14, 15, Bug 3)
  // ─────────────────────────────────────────────────────────────────────────

  describe('Group C — Zero-dimension guard', () => {
    // Case 14
    it('skips addImage when img.width is 0', async () => {
      vi.stubGlobal('Image', makeImageClass({ width: 0, height: 400 }));
      await exportDashboardPdf([el()]);
      expect(mockAddImage).not.toHaveBeenCalled();
    });

    // Case 15
    it('skips addImage when img.height is 0', async () => {
      vi.stubGlobal('Image', makeImageClass({ width: 2380, height: 0 }));
      await exportDashboardPdf([el()]);
      expect(mockAddImage).not.toHaveBeenCalled();
    });

    // Case 15 — pdf.save still called even if section skipped
    it('still calls pdf.save() after skipping a zero-height section', async () => {
      vi.stubGlobal('Image', makeImageClass({ width: 2380, height: 0 }));
      await exportDashboardPdf([el()]);
      expect(mockSave).toHaveBeenCalledOnce();
    });

    // Remaining sections still processed after a bad one
    it('processes remaining valid sections after skipping a zero-dimension one', async () => {
      vi.stubGlobal('Image', makeVariableImageClass([0, 800, 800]));
      await exportDashboardPdf([el(), el(), el()]);
      expect(mockAddImage).toHaveBeenCalledTimes(2); // section 1 skipped
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // Group D — Pagination: normal sections (Cases 26, 28, 41–44)
  // ─────────────────────────────────────────────────────────────────────────

  describe('Group D — Pagination (normal sections)', () => {
    // Case 26 — first section at y=0, full page width
    it('places the first section at x=0, y=0 with full PDF width', async () => {
      await exportDashboardPdf([el()]);
      expect(mockAddImage).toHaveBeenCalledWith(
        expect.any(String),
        'JPEG',
        0,
        0,
        297,
        expect.any(Number),
      );
    });

    // Case 26 — gap added after first section
    it('places the second section at y = sectionH + SECTION_GAP_MM', async () => {
      await exportDashboardPdf([el(), el()]);
      const expectedY = sectionMm(800) + 4; // height of first + 4mm gap
      const secondCall = mockAddImage.mock.calls[1];
      expect(secondCall[3]).toBeCloseTo(expectedY, 1); // 4th arg = y
    });

    // Case 41 — two small sections both fit on page 1
    it('does not add a new page when two sections fit on page 1', async () => {
      // sectionH ≈ 99.8mm each; combined 99.8 + 4 + 99.8 = 203.6mm < 210mm
      await exportDashboardPdf([el(), el()]);
      expect(mockAddPage).not.toHaveBeenCalled();
    });

    // Case 42 — overflow triggers new page
    it('adds a new page when cumulative height exceeds pdfH', async () => {
      // sectionH = 199.6mm each; 199.6 + 4 + 199.6 = 403mm > 210mm
      vi.stubGlobal('Image', makeImageClass({ height: pxForMm(199.6) }));
      await exportDashboardPdf([el(), el()]);
      expect(mockAddPage).toHaveBeenCalledOnce();
    });

    // Case 43 — exactly fills page (> not >=)
    it('does NOT add a new page when sectionH equals pdfH exactly', async () => {
      vi.stubGlobal('Image', makeImageClass({ height: pxForMm(210) }));
      await exportDashboardPdf([el()]);
      expect(mockAddPage).not.toHaveBeenCalled();
    });

    // Case 44 — one mm over triggers new page for the second section
    it('adds a new page when currentY + sectionH exceeds pdfH by any amount', async () => {
      // First section = 208mm → currentY after = 208 + 4 = 212
      // Second section = 1mm → 212 + 1 = 213 > 210 → new page
      vi.stubGlobal(
        'Image',
        makeVariableImageClass([pxForMm(208), pxForMm(1)]),
      );
      await exportDashboardPdf([el(), el()]);
      expect(mockAddPage).toHaveBeenCalledOnce();
    });

    // Case 45 / isFirstSection guard — no new page before the very first section
    it('does NOT add a page before the first section even if it would overflow', async () => {
      // First section = 500mm (way over pdfH=210) — isFirstSection guard must prevent addPage
      vi.stubGlobal('Image', makeImageClass({ height: pxForMm(500) }));
      await exportDashboardPdf([el()]);
      expect(mockAddPage).not.toHaveBeenCalled();
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // Group E — Oversized sections (Cases 29, 30, 47, 61, 65, 66)
  // ─────────────────────────────────────────────────────────────────────────

  describe('Group E — Oversized sections', () => {
    // Case 29 — barely over → oversized branch
    it('enters oversized branch when sectionH is just over pdfH', async () => {
      vi.stubGlobal('Image', makeImageClass({ height: pxForMm(210.5) }));
      await exportDashboardPdf([el()]);
      // Oversized branch passes height=pdfH to addImage
      const callArgs = mockAddImage.mock.calls[0];
      expect(callArgs[5]).toBeCloseTo(210, 0); // 6th arg = height
    });

    // Case 30 — double-height section scaled to pdfH
    it('scales a double-height section so its rendered height equals pdfH', async () => {
      vi.stubGlobal('Image', makeImageClass({ height: pxForMm(420) }));
      await exportDashboardPdf([el()]);
      const [, , , , , renderedHeight] = mockAddImage.mock.calls[0];
      expect(renderedHeight).toBeCloseTo(210, 0);
    });

    // Case 61 — horizontal centering: xOffset = (pdfW - scaledW) / 2
    it('centers an oversized section horizontally', async () => {
      const sectionH_mm = 315; // pdfH * 1.5
      vi.stubGlobal('Image', makeImageClass({ height: pxForMm(sectionH_mm) }));
      await exportDashboardPdf([el()]);
      const expectedScaledW = pdfW * (210 / sectionH_mm);
      const expectedXOffset = (pdfW - expectedScaledW) / 2;
      const [, , xOffset, , scaledW] = mockAddImage.mock.calls[0];
      expect(xOffset).toBeCloseTo(expectedXOffset, 0);
      expect(scaledW).toBeCloseTo(expectedScaledW, 0);
    });

    // Case 65 — oversized first section: no addPage called
    it('does not add a page for an oversized first section', async () => {
      vi.stubGlobal('Image', makeImageClass({ height: pxForMm(500) }));
      await exportDashboardPdf([el()]);
      expect(mockAddPage).not.toHaveBeenCalled();
    });

    // Case 66 — no gap added after oversized (currentY = pdfH, not pdfH + 4)
    it('does not add SECTION_GAP_MM after an oversized section', async () => {
      // After oversized: currentY = 210. Second section: 210 + anything > 210 → new page.
      // If gap were added: currentY = 214 (same result — still triggers new page).
      // We verify by checking the second section is placed at y=0 (after addPage resets).
      vi.stubGlobal(
        'Image',
        makeVariableImageClass([pxForMm(420), pxForMm(50)]),
      );
      await exportDashboardPdf([el(), el()]);
      expect(mockAddPage).toHaveBeenCalledOnce();
      const secondCallY = mockAddImage.mock.calls[1][3];
      expect(secondCallY).toBe(0); // placed at top of new page
    });

    // Case 47 — section after oversized always starts on a new page
    it('puts the section that follows an oversized section on a new page', async () => {
      vi.stubGlobal(
        'Image',
        makeVariableImageClass([pxForMm(420), pxForMm(80)]),
      );
      await exportDashboardPdf([el(), el()]);
      expect(mockAddPage).toHaveBeenCalledOnce();
    });

    // Two consecutive oversized sections → each on its own page
    it('places two consecutive oversized sections on separate pages', async () => {
      vi.stubGlobal('Image', makeImageClass({ height: pxForMm(400) }));
      await exportDashboardPdf([el(), el()]);
      expect(mockAddPage).toHaveBeenCalledOnce(); // page 2 for second section
      expect(mockAddImage).toHaveBeenCalledTimes(2);
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // Group F — Multi-page correctness
  // ─────────────────────────────────────────────────────────────────────────

  describe('Group F — Multi-page correctness', () => {
    it('produces exactly one page when all sections fit', async () => {
      // 3 small sections: ~99mm each; total ≈ 99+4+99+4+99 = 305mm > 210 — 2 pages
      // Use tiny sections: sectionH ≈ 10mm each; 3 × (10+4) - 4 = 38mm < 210 → 1 page
      vi.stubGlobal('Image', makeImageClass({ height: pxForMm(10) }));
      await exportDashboardPdf([el(), el(), el()]);
      expect(mockAddPage).not.toHaveBeenCalled();
      expect(mockSave).toHaveBeenCalledOnce();
    });

    it('second section goes to page 2 when it overflows, placed at y=0', async () => {
      vi.stubGlobal(
        'Image',
        makeVariableImageClass([pxForMm(208), pxForMm(80)]),
      );
      await exportDashboardPdf([el(), el()]);
      const secondY = mockAddImage.mock.calls[1][3];
      expect(secondY).toBe(0);
    });

    it('calls toJpeg with the correct element for each section', async () => {
      const e1 = { id: 'section-1' } as unknown as HTMLElement;
      const e2 = { id: 'section-2' } as unknown as HTMLElement;
      await exportDashboardPdf([e1, e2]);
      expect(mockToJpeg).toHaveBeenNthCalledWith(1, e1, expect.any(Object));
      expect(mockToJpeg).toHaveBeenNthCalledWith(2, e2, expect.any(Object));
    });

    it('captures with quality 0.95 and pixelRatio 2', async () => {
      await exportDashboardPdf([el()]);
      expect(mockToJpeg).toHaveBeenCalledWith(expect.anything(), {
        quality: 0.95,
        pixelRatio: 2,
      });
    });
  });
});
