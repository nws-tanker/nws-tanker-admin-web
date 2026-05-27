import { useEffect } from 'react';
import { useLookups } from '@/hooks/useLookups';
import { useAppDispatch, useAppSelector } from '@/store';
import { fetchFleetTankers } from '@/store/apiSlices/fleetRegistryApiSlice';
import { fetchLookups } from '@/store/apiSlices/lookupsApiSlice';

export function useFleetRegistryData() {
  const dispatch = useAppDispatch();
  const fleet = useAppSelector((s) => s.fleetRegistryApi);
  const {
    lookups,
    clustersById,
    governoratesById,
    inspectorsById,
    sampleCollectorsById,
    retry: retryLookups,
  } = useLookups();

  useEffect(() => {
    dispatch(fetchFleetTankers());
    dispatch(fetchLookups());
  }, [dispatch]);

  return {
    tankers: fleet.data ?? [],
    lookups,
    clustersById,
    governoratesById,
    inspectorsById,
    sampleCollectorsById,
    fleetState: fleet.apiState,
    retry: () => {
      dispatch(fetchFleetTankers());
      retryLookups();
    },
  };
}
