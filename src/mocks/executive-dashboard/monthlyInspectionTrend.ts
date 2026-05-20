// nama/v1/api/executive-dashboard/monthly-inspection-trend
import type { MonthlyInspectionTrendResponse } from '@/types/executiveDashboard';

export const MOCK_MONTHLY_INSPECTION_TREND: MonthlyInspectionTrendResponse = {
  series: [
    { month: 'May', approved: 248, rejected: 52, lab_pending: 30 },
    { month: 'Jun', approved: 232, rejected: 48, lab_pending: 22 },
    { month: 'Jul', approved: 260, rejected: 42, lab_pending: 32 },
    { month: 'Aug', approved: 275, rejected: 40, lab_pending: 25 },
    { month: 'Sep', approved: 254, rejected: 48, lab_pending: 18 },
    { month: 'Oct', approved: 283, rejected: 36, lab_pending: 22 },
    { month: 'Nov', approved: 297, rejected: 32, lab_pending: 20 },
    { month: 'Dec', approved: 245, rejected: 43, lab_pending: 32 },
    { month: 'Jan', approved: 302, rejected: 27, lab_pending: 20 },
    { month: 'Feb', approved: 315, rejected: 25, lab_pending: 16 },
    { month: 'Mar', approved: 328, rejected: 20, lab_pending: 12 },
    { month: 'Apr', approved: 281, rejected: 24, lab_pending: 20 },
  ],
  totals: {
    approved: 3320,
    rejected: 437,
    lab_pending: 269,
  },
  // max series value is 328 → rounded up to 400 → ticks [100, 200, 300, 400]
  y_axis: [100, 200, 300, 400],
};
