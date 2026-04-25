import type { ReactNode } from 'react';

export type SelectOption<V extends string = string> = {
  value: V;
  label: ReactNode;
  disabled?: boolean;
};
