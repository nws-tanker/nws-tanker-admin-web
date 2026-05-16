import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { fetchInspectorDashboard } from '@/store/apiSlices/inspectorDashboardApiSlice';
import type { SidebarData } from '@/types';

export function useSidebarData(): SidebarData | null {
  const dispatch = useAppDispatch();
  const dashboard = useAppSelector((s) => s.inspectorDashboardApi.data);

  useEffect(() => {
    dispatch(fetchInspectorDashboard());
  }, [dispatch]);

  if (!dashboard) return null;

  const stats = dashboard.statsByType.all.inspectionStats;
  return {
    counts: {
      pendingInspectionReviews: stats.review,
      expiringPermitRenewals: 0,
    },
  };
}
