import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import {
  fetchInspectionDetailsThunk,
  resetInspectionDetails,
} from '@/store/apiSlices/inspectionDetailsApiSlice';

export function useInspectionDetailsData(inspectionId: string) {
  const dispatch = useAppDispatch();
  const { apiState, data, error } = useAppSelector(
    (s) => s.inspectionDetailsApi,
  );

  useEffect(() => {
    dispatch(fetchInspectionDetailsThunk(inspectionId));
    return () => {
      dispatch(resetInspectionDetails());
    };
  }, [dispatch, inspectionId]);

  return {
    state: apiState,
    data,
    error,
    retry: () => dispatch(fetchInspectionDetailsThunk(inspectionId)),
  };
}
