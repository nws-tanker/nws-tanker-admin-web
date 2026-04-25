import type { ReactNode } from 'react';

type Props = {
  title: string;
  subtitle?: ReactNode;
  actions?: ReactNode;
};

export function PageHeader({ title, subtitle, actions }: Props) {
  return (
    <div className="mb-6 flex flex-wrap items-start justify-between gap-6">
      <div>
        <h1 className="text-[22px] font-semibold tracking-tight text-ink-900">
          {title}
        </h1>
        {subtitle ? (
          <div className="mt-1 text-[13px] text-ink-500">{subtitle}</div>
        ) : null}
      </div>
      {actions ? (
        <div className="flex flex-wrap items-center gap-2.5">{actions}</div>
      ) : null}
    </div>
  );
}
