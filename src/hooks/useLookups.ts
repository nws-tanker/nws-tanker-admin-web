import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { fetchLookups } from '@/store/apiSlices/lookupsApiSlice';
import { States } from '@/store/types';
import type {
  Cluster,
  Governorate,
  Inspector,
  Lookups,
  SampleCollector,
} from '@/types';

export type LookupIndex<T> = Map<string, T>;

type UseLookupsResult = {
  lookups: Lookups | null;
  /** Empty maps when lookups have not loaded yet, so callers don't null-check. */
  clustersById: LookupIndex<Cluster>;
  governoratesById: LookupIndex<Governorate>;
  inspectorsById: LookupIndex<Inspector>;
  sampleCollectorsById: LookupIndex<SampleCollector>;
  state: States;
  retry: () => void;
};

function indexById<T extends { id: string | number }>(
  rows: T[],
): LookupIndex<T> {
  return new Map(rows.map((r) => [String(r.id), r]));
}

export function useLookups(): UseLookupsResult {
  const dispatch = useAppDispatch();
  const { data, apiState } = useAppSelector((s) => s.lookupsApi);

  useEffect(() => {
    if (apiState === States.PRELOADING) {
      dispatch(fetchLookups());
    }
  }, [dispatch, apiState]);

  const clustersById = useMemo(
    () => indexById(data?.clusters ?? []),
    [data?.clusters],
  );
  const governoratesById = useMemo(
    () => indexById(data?.governorates ?? []),
    [data?.governorates],
  );
  const inspectorsById = useMemo(
    () => indexById(data?.inspectors ?? []),
    [data?.inspectors],
  );
  const sampleCollectorsById = useMemo(
    () => indexById(data?.sampleCollectors ?? []),
    [data?.sampleCollectors],
  );

  return {
    lookups: data,
    clustersById,
    governoratesById,
    inspectorsById,
    sampleCollectorsById,
    state: apiState,
    retry: () => {
      dispatch(fetchLookups());
    },
  };
}
