import { useEffect } from 'react';
import type { SelectOption } from '@/atoms';
import { fetchClustersThunk } from '@/store/apiSlices/clustersApiSlice';
import { useAppDispatch, useAppSelector } from '@/store';
import { States } from '@/store/types';

type ClustersState = {
  clusterOptions: SelectOption[];
  state: States;
};

export function useClusters(): ClustersState {
  const dispatch = useAppDispatch();
  const { data, apiState } = useAppSelector((s) => s.clustersApi);

  useEffect(() => {
    if (apiState === States.PRELOADING) {
      dispatch(fetchClustersThunk());
    }
  }, [apiState, dispatch]);

  const clusterOptions: SelectOption[] =
    data?.map((c) => ({ value: String(c.id), label: c.name })) ?? [];

  return { clusterOptions, state: apiState };
}
