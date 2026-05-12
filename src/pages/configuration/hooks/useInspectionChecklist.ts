import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { fetchInspectionChecklist } from '@/store/apiSlices/inspectionChecklistApiSlice';
import { States } from '@/store/types';
import type { InspectionChecklistResponse } from '@/types/configuration';

type UseInspectionChecklistResult = {
  data: InspectionChecklistResponse | null;
  state: States;
  error: string | null;
  retry: () => void;
};

export function useInspectionChecklist(): UseInspectionChecklistResult {
  const dispatch = useAppDispatch();
  const { apiState, data, error } = useAppSelector(
    (s) => s.inspectionChecklistApi,
  );
  const [fetchTrigger, setFetchTrigger] = useState(0);

  useEffect(() => {
    dispatch(fetchInspectionChecklist());
  }, [fetchTrigger, dispatch]);

  const retry = () => setFetchTrigger((n) => n + 1);

  return {
    data,
    state: apiState,
    error: error?.description ?? null,
    retry,
  };
}
