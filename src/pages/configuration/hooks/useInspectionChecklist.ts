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

  return {
    data,
    state: apiState,
    error: error?.description ?? null,
    retry: () => dispatch(fetchInspectionChecklist()),
  };
}
