import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import {
  fetchPermitSla,
  resetPermitSla,
} from '@/store/apiSlices/permitSlaApiSlice';
import { States } from '@/store/types';
import { PermitSlaForm } from './PermitSlaForm';

export function PermitSlaTab() {
  const dispatch = useAppDispatch();
  const { apiState, data, error } = useAppSelector((s) => s.permitSlaApi);

  useEffect(() => {
    dispatch(fetchPermitSla());
    return () => {
      dispatch(resetPermitSla());
    };
  }, [dispatch]);

  if (apiState === States.ERROR) {
    return (
      <div className="rounded-card-lg border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-700">
        {error?.description ?? 'Failed to load permit & SLA rules.'}
      </div>
    );
  }

  if (apiState !== States.SUCCESS || !data) {
    return (
      <div className="rounded-card-lg border border-ink-200 bg-white px-4 py-6 text-center text-[13px] text-ink-500">
        Loading…
      </div>
    );
  }

  return <PermitSlaForm key={data.id} data={data} />;
}
