import type { ReactNode } from 'react';
import type { ApiState } from '@/store/types';
import { States } from '@/store/types';
import SectionError from './SectionError';

function isPending(apiState: States) {
  return apiState === States.LOADING || apiState === States.PRELOADING;
}

type Props<T> = {
  state: ApiState<T>;
  skeleton: ReactNode;
  errorMessage: string;
  errorComponent?: ReactNode;
  children: (data: NonNullable<T>) => ReactNode;
};

export default function DashboardSection<T>({
  state,
  skeleton,
  errorMessage,
  errorComponent,
  children,
}: Props<T>) {
  if (isPending(state.apiState)) return <>{skeleton}</>;
  if (state.apiState === States.ERROR)
    return (
      <>
        {errorComponent ?? (
          <SectionError message={errorMessage} onRetry={() => {}} />
        )}
      </>
    );
  if (state.data != null) return <>{children(state.data)}</>;
  return null;
}
