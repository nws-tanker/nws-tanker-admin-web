import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { fetchInspectionReview } from '@/store/apiSlices/inspectionApiSlice';
import type { InspectionTab } from '@/types/inspection';

type Params = {
  activeTab: InspectionTab;
  search: string;
  page: number;
};

const PAGE_SIZE = 20;

export function useInspectionData({ activeTab, search, page }: Params) {
  const dispatch = useAppDispatch();
  const { apiState, data, error } = useAppSelector((s) => s.inspectionApi);

  useEffect(() => {
    dispatch(
      fetchInspectionReview({
        tab: activeTab,
        search: search || undefined,
        page,
        size: PAGE_SIZE,
      }),
    );
  }, [dispatch, activeTab, search, page]);

  return {
    state: apiState,
    counts: data?.counts ?? null,
    records: data?.data ?? [],
    totalElements: data?.totalElements ?? 0,
    totalPages: data?.totalPages ?? 1,
    error,
    retry: () =>
      dispatch(
        fetchInspectionReview({
          tab: activeTab,
          search: search || undefined,
          page,
          size: PAGE_SIZE,
        }),
      ),
  };
}
