import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import {
  fetchNotificationContacts,
  resetNotificationContacts,
} from '@/store/apiSlices/notificationContactsApiSlice';
import { States } from '@/store/types';

export function useNotificationContacts() {
  const dispatch = useAppDispatch();
  const { apiState, data } = useAppSelector((s) => s.notificationContactsApi);

  useEffect(() => {
    dispatch(fetchNotificationContacts());
    return () => {
      dispatch(resetNotificationContacts());
    };
  }, [dispatch]);

  return {
    mobileNo: data?.mobileNo ?? null,
    email: data?.email ?? null,
    loading: apiState === States.LOADING || apiState === States.PRELOADING,
  };
}
