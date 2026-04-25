import { useEffect } from 'react';
import { useLookups } from '@/hooks/useLookups';
import { useAppDispatch, useAppSelector } from '@/store';
import { fetchFleetTankers } from '@/store/apiSlices/fleetRegistryApiSlice';
import { rollupApiStates, States } from '@/store/types';

export function useFleetRegistryData() {
  const dispatch = useAppDispatch();
  const fleet = useAppSelector((s) => s.fleetRegistryApi);
  const {
    lookups,
    clustersById,
    governoratesById,
    inspectorsById,
    sampleCollectorsById,
    state: lookupsState,
    retry: retryLookups,
  } = useLookups();

  useEffect(() => {
    if (fleet.apiState === States.PRELOADING) {
      dispatch(fetchFleetTankers());
    }
  }, [dispatch, fleet.apiState]);

  const rollupState = rollupApiStates(fleet.apiState, lookupsState);

  return {
    tankers: fleet.data ?? [],
    lookups,
    clustersById,
    governoratesById,
    inspectorsById,
    sampleCollectorsById,
    state: rollupState,
    retry: () => {
      dispatch(fetchFleetTankers());
      retryLookups();
    },
  };
}
