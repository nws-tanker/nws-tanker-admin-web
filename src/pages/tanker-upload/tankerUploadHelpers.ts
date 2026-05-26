import type { UploadError } from '@/types';

const ROW_PREFIX_RE = /^\s*Row\s+(\d+)\s*[:-]\s*(.*)$/i;

export function parseUploadErrors(raws: string[]): UploadError[] {
  return raws.map((raw) => {
    const match = ROW_PREFIX_RE.exec(raw);
    if (match) {
      return {
        rowNumber: Number(match[1]),
        message: match[2].trim(),
      };
    }
    return { rowNumber: null, message: raw.trim() };
  });
}
