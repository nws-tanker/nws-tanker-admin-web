import { useCallback, useState } from 'react';
import { useToast } from '@/atoms';
import type { ApprovedInspection } from '@/types/permitRegeneration';
import { formatDateRangeLabel } from '@/utils';
import { generatePermitRegenerationExcel } from '../excel/permitRegenerationExcel';

type Params = {
  rows: ApprovedInspection[];
  startDate: string;
  endDate: string;
};

export function usePermitExport({ rows, startDate, endDate }: Params) {
  const toast = useToast();
  const [isExporting, setIsExporting] = useState(false);

  const exportNow = useCallback(async () => {
    if (isExporting) return;
    if (rows.length === 0) {
      toast.show('No data to export', { tone: 'error' });
      return;
    }
    setIsExporting(true);
    try {
      const periodLabel = formatDateRangeLabel(startDate, endDate);
      await generatePermitRegenerationExcel(rows, periodLabel);
      toast.show('Export downloaded');
    } catch {
      toast.show('Failed to export', { tone: 'error' });
    } finally {
      setIsExporting(false);
    }
  }, [isExporting, rows, startDate, endDate, toast]);

  return { isExporting, exportNow };
}
