import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import {
  fetchNotificationContacts,
  resetNotificationContacts,
} from '@/store/apiSlices/notificationContactsApiSlice';
import { States } from '@/store/types';
import { NotificationsForm } from './NotificationsForm';

type Props = {
  onValueChange: (modifiedBy: string | null, modifiedOn: string | null) => void;
};

export function NotificationsTab({ onValueChange }: Props) {
  const dispatch = useAppDispatch();
  const { apiState, data, error } = useAppSelector(
    (s) => s.notificationContactsApi,
  );

  useEffect(() => {
    dispatch(fetchNotificationContacts());
    return () => {
      dispatch(resetNotificationContacts());
    };
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      onValueChange(data.lastModifiedBy, data.lastModifiedTime);
    }
  }, [onValueChange, data]);

  if (apiState === States.ERROR) {
    return (
      <div className="rounded-card-lg border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-700">
        {error?.description ?? 'Failed to load notification contacts.'}
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

  return (
    <NotificationsForm key={data.contractorId ?? 'singleton'} data={data} />
  );
}
