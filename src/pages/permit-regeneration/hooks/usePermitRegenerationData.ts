import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { fetchApprovedInspections } from '@/store/apiSlices/approvedInspectionsApiSlice';
import type { ApprovedInspectionsParams } from '@/types/permitRegeneration';

export function usePermitRegenerationData(params: ApprovedInspectionsParams) {
  const dispatch = useAppDispatch();
  const { apiState, data, error } = useAppSelector(
    (state) => state.approvedInspectionsApi,
  );

  useEffect(() => {
    void dispatch(fetchApprovedInspections(params));
  }, [dispatch, params]);

  const retry = () => {
    void dispatch(fetchApprovedInspections(params));
  };

  return { apiState, data, error, retry };
}
